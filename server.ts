import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const MAX_DECODED_IMAGE_BYTES = 8 * 1024 * 1024; // 8 MB decoded payload limit
const ALLOWED_IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
]);

interface AnalyzeCropRequestBody {
  imageDataUrl?: unknown;
  fieldObservations?: unknown;
}

interface ParsedImagePayload {
  mimeType: string;
  base64Data: string;
}

interface GeminiVisionCropAnalysis {
  isPlantAndClear: boolean;
  unclearOrNonPlantReasonBn: string;
  unclearOrNonPlantReasonEn: string;
  identifiedCropBn: string;
  identifiedCropEn: string;
  cropCategoryKey: 'rice' | 'tomato' | 'potato' | 'eggplant' | 'other';
  scientificName: string;
  healthStatus:
    | 'healthy'
    | 'diseased'
    | 'pest'
    | 'nutrient_deficiency'
    | 'abiotic_stress';
  currentConditionBn: string;
  currentConditionEn: string;
  detectedProblemBn: string;
  detectedProblemEn: string;
  severity: 'low' | 'moderate' | 'high';
  severityLabelBn: string;
  severityLabelEn: string;
  confidencePercent: number;
  summaryBn: string;
  summaryEn: string;
  symptomsBn: string[];
  symptomsEn: string[];
  causesBn: string[];
  causesEn: string[];
  actionsBn: string[];
  actionsEn: string[];
  preventionBn: string[];
  preventionEn: string[];
  expertAdviceBn: string;
  expertAdviceEn: string;
}

function parseImageDataUrl(raw: unknown): ParsedImagePayload | null {
  if (typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  const match = trimmed.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=]+)$/);
  if (!match) return null;

  const normalizedMime = match[1].toLowerCase() === 'image/jpg' ? 'image/jpeg' : match[1].toLowerCase();
  if (!ALLOWED_IMAGE_MIME_TYPES.has(normalizedMime)) {
    return null;
  }

  const base64Data = match[2];
  const estimatedBytes = Math.floor((base64Data.length * 3) / 4);
  if (estimatedBytes < 64 || estimatedBytes > MAX_DECODED_IMAGE_BYTES) {
    return null;
  }

  return {
    mimeType: normalizedMime,
    base64Data,
  };
}

function sanitizeStringList(value: unknown, maxItems = 6): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    .map((item) => item.trim())
    .slice(0, maxItems);
}

function clampConfidence(value: unknown): number {
  const num = Number(value);
  if (!Number.isFinite(num)) return 50;
  return Math.max(0, Math.min(100, Math.round(num)));
}

function normalizeCropKey(
  raw: unknown
): 'rice' | 'tomato' | 'potato' | 'eggplant' | 'other' {
  if (
    raw === 'rice' ||
    raw === 'tomato' ||
    raw === 'potato' ||
    raw === 'eggplant'
  ) {
    return raw;
  }
  return 'other';
}

function normalizeHealthStatus(
  raw: unknown
): GeminiVisionCropAnalysis['healthStatus'] {
  if (
    raw === 'healthy' ||
    raw === 'diseased' ||
    raw === 'pest' ||
    raw === 'nutrient_deficiency' ||
    raw === 'abiotic_stress'
  ) {
    return raw;
  }
  return 'diseased';
}

function normalizeSeverity(raw: unknown): 'low' | 'moderate' | 'high' {
  if (raw === 'low' || raw === 'moderate' || raw === 'high') {
    return raw;
  }
  return 'moderate';
}

const CROP_ANALYSIS_SYSTEM_INSTRUCTION = `You are an expert plant pathologist and agronomist assisting farmers in Bangladesh through KrishiBondhu.
Analyze ONLY the actual visual pixels of the uploaded crop/plant photo.

CRITICAL ACCURACY RULES:
1. NEVER assume the crop is rice/paddy unless the visual anatomy clearly shows rice. Identify the true plant species strictly from leaves, stems, fruits, veins, leaf margins, or flowers visible in the image (e.g., Tomato, Potato, Eggplant/Brinjal, Rice, Chili, Cucumber, Mango, Banana, Papaya, Jute, Wheat, Maize, Mustard, Bottle Gourd, Okra, Onion, etc.).
2. NEVER return rice disease advice for a non-rice plant. Every identified crop, disease, symptom, action, and prevention item MUST match the actual crop seen in the photo.
3. NON-PLANT OR UNCLEAR IMAGES: If the image does NOT show a real agricultural plant/crop/leaf/fruit/stem (e.g., human face, indoor room, vehicle, animal, document, solid color, unrelated object) OR is far too blurry, dark, or overexposed to inspect plant tissues, you MUST set "isPlantAndClear": false and write polite, clear Bangla and English instructions explaining why the photo cannot be analyzed and asking for a bright, focused close-up photo of the crop leaf or plant.
4. HEALTHY PLANTS: If the crop looks healthy with no visible disease spots, pest damage, curling, yellowing, or nutrient deficiency, clearly report it as healthy ("healthStatus": "healthy", "severity": "low"), state "কোনো দৃশ্যমান রোগ বা সমস্যা পাওয়া যায়নি (গাছটি সুস্থ)" in detectedProblemBn, and provide helpful preventive care instead of inventing a disease.
5. BANGLA CLARITY: Write natural, respectful, practical Bangladeshi Bangla suitable for farmers in all Bangla fields, and matching accurate English in English fields.
6. SAFE STEWARDSHIP: Emphasize sanitation, balanced fertilization, drainage, and IPM first. Recommend consulting the local Upazila Agriculture Officer or Bangladesh Agriculture Helpline 16123 before applying chemical pesticides.`;

const CROP_ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    isPlantAndClear: {
      type: Type.BOOLEAN,
      description:
        'True ONLY if the image clearly depicts an actual plant, leaf, crop, stem, or fruit suitable for visual plant health inspection. False for non-plant images or severely blurry/unreadable photos.',
    },
    unclearOrNonPlantReasonBn: {
      type: Type.STRING,
      description:
        'If isPlantAndClear is false, a polite Bangla message explaining what was seen or why it is unclear, asking for a clear close-up crop photo. Empty string if true.',
    },
    unclearOrNonPlantReasonEn: {
      type: Type.STRING,
      description:
        'If isPlantAndClear is false, a polite English message explaining why it cannot be diagnosed and asking for a clear close-up crop photo. Empty string if true.',
    },
    identifiedCropBn: {
      type: Type.STRING,
      description: 'Crop/plant name in Bangla identified strictly from the image.',
    },
    identifiedCropEn: {
      type: Type.STRING,
      description: 'Crop/plant name in English identified strictly from the image.',
    },
    cropCategoryKey: {
      type: Type.STRING,
      description:
        'Must be one of: "rice", "tomato", "potato", "eggplant", or "other". Use "other" for any crop besides those four.',
    },
    scientificName: {
      type: Type.STRING,
      description:
        'Scientific name of the identified crop or pathogen (e.g., Solanum lycopersicum / Alternaria solani).',
    },
    healthStatus: {
      type: Type.STRING,
      description:
        'Must be one of: "healthy", "diseased", "pest", "nutrient_deficiency", "abiotic_stress".',
    },
    currentConditionBn: {
      type: Type.STRING,
      description:
        'গাছের বর্তমান অবস্থা in Bangla (e.g., "সুস্থ ও স্বাভাবিক", "ছত্রাকজনিত রোগে আক্রান্ত", "পোকার আক্রমণ লক্ষণীয়", "পুষ্টির ঘাটতির লক্ষণ").',
    },
    currentConditionEn: {
      type: Type.STRING,
      description: 'Current plant health condition summary in English.',
    },
    detectedProblemBn: {
      type: Type.STRING,
      description:
        'শনাক্তকৃত রোগ বা সমস্যা in Bangla (or "কোনো দৃশ্যমান রোগ বা সমস্যা পাওয়া যায়নি (গাছটি সুস্থ)" if healthy).',
    },
    detectedProblemEn: {
      type: Type.STRING,
      description:
        'Detected disease, pest, deficiency, or healthy confirmation in English.',
    },
    severity: {
      type: Type.STRING,
      description: 'Must be one of: "low", "moderate", or "high". Use "low" when healthy.',
    },
    severityLabelBn: {
      type: Type.STRING,
      description:
        'Severity label in Bangla (e.g., "স্বাভাবিক / কম ঝুঁকি", "মাঝারি সতর্কতা", "উচ্চ সতর্কতা").',
    },
    severityLabelEn: {
      type: Type.STRING,
      description: 'Severity label in English.',
    },
    confidencePercent: {
      type: Type.INTEGER,
      description: 'AI visual confidence percentage from 0 to 100.',
    },
    summaryBn: {
      type: Type.STRING,
      description: '2-3 sentence Bangla summary of what is visually observed in this specific photo.',
    },
    summaryEn: {
      type: Type.STRING,
      description: '2-3 sentence English summary of what is visually observed in this specific photo.',
    },
    symptomsBn: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'List of 2-4 specific visible symptoms (or healthy leaf traits) in Bangla.',
    },
    symptomsEn: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'List of 2-4 specific visible symptoms (or healthy leaf traits) in English.',
    },
    causesBn: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'List of 2-4 possible causes of the visible issue (or normal care factors if healthy) in Bangla.',
    },
    causesEn: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'List of 2-4 possible causes in English.',
    },
    actionsBn: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'List of 3-4 immediate actionable steps (করণীয়) for the farmer in Bangla.',
    },
    actionsEn: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'List of 3-4 immediate actionable steps in English.',
    },
    preventionBn: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'List of 3-4 prevention methods (প্রতিরোধের উপায়) in Bangla.',
    },
    preventionEn: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'List of 3-4 prevention methods in English.',
    },
    expertAdviceBn: {
      type: Type.STRING,
      description:
        'Bangla guidance recommending consultation with Upazila Agriculture Officer or helpline 16123 before chemical application.',
    },
    expertAdviceEn: {
      type: Type.STRING,
      description:
        'English guidance recommending consultation with Upazila Agriculture Officer or helpline 16123 before chemical application.',
    },
  },
  required: [
    'isPlantAndClear',
    'unclearOrNonPlantReasonBn',
    'unclearOrNonPlantReasonEn',
    'identifiedCropBn',
    'identifiedCropEn',
    'cropCategoryKey',
    'scientificName',
    'healthStatus',
    'currentConditionBn',
    'currentConditionEn',
    'detectedProblemBn',
    'detectedProblemEn',
    'severity',
    'severityLabelBn',
    'severityLabelEn',
    'confidencePercent',
    'summaryBn',
    'summaryEn',
    'symptomsBn',
    'symptomsEn',
    'causesBn',
    'causesEn',
    'actionsBn',
    'actionsEn',
    'preventionBn',
    'preventionEn',
    'expertAdviceBn',
    'expertAdviceEn',
  ],
};

function createGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '12mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  app.post('/api/analyze-crop-image', async (req: Request, res: Response) => {
    const body = (req.body || {}) as AnalyzeCropRequestBody;
    const parsedImage = parseImageDataUrl(body.imageDataUrl);

    if (!parsedImage) {
      res.status(400).json({
        status: 'error',
        errorCode: 'INVALID_IMAGE_INPUT',
        messageBn:
          'সঠিক ফরম্যাটের (JPG, PNG বা WebP, সর্বোচ্চ ৮ মেগাবাইট) একটি পাতার ছবি প্রদান করুন।',
        messageEn:
          'Please provide a valid crop image (JPG, PNG, or WebP, under 8 MB).',
      });
      return;
    }

    const ai = createGeminiClient();
    if (!ai) {
      res.status(503).json({
        status: 'error',
        errorCode: 'MISSING_API_KEY',
        messageBn:
          'সার্ভারে Gemini API কী কনফিগার করা নেই। অনুগ্রহ করে Settings > Secrets প্যানেলে GEMINI_API_KEY সেট করুন।',
        messageEn:
          'Gemini API key is not configured on the server. Please check GEMINI_API_KEY in the Settings > Secrets panel.',
      });
      return;
    }

    const observations = Array.isArray(body.fieldObservations)
      ? body.fieldObservations
          .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
          .slice(0, 6)
      : [];

    const observationsNote =
      observations.length > 0
        ? `\nOptional farmer-reported field context (secondary to visual evidence; trust the actual pixels above all else): ${observations.join('; ')}`
        : '';

    const promptText = `Inspect this uploaded image carefully using vision.
1. Determine strictly from the pixels whether this is a clear photo of an agricultural plant, crop leaf, stem, or fruit.
2. Identify the actual crop species shown (do not guess or default to rice unless it truly is rice).
3. Detect any visible disease, pest infestation, nutrient deficiency, or abiotic stress—or confirm if the plant looks healthy with no visible problem.
4. Provide an accurate, structured Bangla and English report following the JSON schema.${observationsNote}`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: parsedImage.mimeType,
                data: parsedImage.base64Data,
              },
            },
            {
              text: promptText,
            },
          ],
        },
        config: {
          systemInstruction: CROP_ANALYSIS_SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          responseSchema: CROP_ANALYSIS_SCHEMA,
        },
      });

      const rawText = (response.text ?? '').trim();
      if (!rawText) {
        res.status(502).json({
          status: 'error',
          errorCode: 'EMPTY_AI_RESPONSE',
          messageBn:
            'এআই মডেল থেকে কোনো বিশ্লেষণ ফলাফল পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
          messageEn:
            'The AI model returned an empty response. Please try analyzing the image again.',
        });
        return;
      }

      let parsedResult: Record<string, unknown>;
      try {
        parsedResult = JSON.parse(rawText) as Record<string, unknown>;
      } catch {
        res.status(502).json({
          status: 'error',
          errorCode: 'INVALID_AI_FORMAT',
          messageBn:
            'এআই ফলাফলটি প্রক্রিয়াকরণ করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
          messageEn:
            'Unable to parse structured analysis from the AI response. Please try again.',
        });
        return;
      }

      if (parsedResult.isPlantAndClear !== true) {
        res.status(200).json({
          status: 'invalid_image',
          reasonBn:
            typeof parsedResult.unclearOrNonPlantReasonBn === 'string' &&
            parsedResult.unclearOrNonPlantReasonBn.trim()
              ? parsedResult.unclearOrNonPlantReasonBn.trim()
              : 'ছবিটি স্পষ্ট নয় অথবা এটি কোনো ফসলের গাছ বা পাতার ছবি বলে মনে হচ্ছে না। অনুগ্রহ করে পর্যাপ্ত আলোতে ফসলের পাতা বা আক্রান্ত অংশের একটি স্পষ্ট কাছের ছবি তুলুন বা আপলোড করুন।',
          reasonEn:
            typeof parsedResult.unclearOrNonPlantReasonEn === 'string' &&
            parsedResult.unclearOrNonPlantReasonEn.trim()
              ? parsedResult.unclearOrNonPlantReasonEn.trim()
              : 'The image is unclear or does not appear to show a crop plant or leaf. Please upload or capture a bright, focused close-up photo of the crop leaf or plant.',
        });
        return;
      }

      const healthStatus = normalizeHealthStatus(parsedResult.healthStatus);
      const severity =
        healthStatus === 'healthy'
          ? 'low'
          : normalizeSeverity(parsedResult.severity);

      const analysis: GeminiVisionCropAnalysis = {
        isPlantAndClear: true,
        unclearOrNonPlantReasonBn: '',
        unclearOrNonPlantReasonEn: '',
        identifiedCropBn:
          typeof parsedResult.identifiedCropBn === 'string' &&
          parsedResult.identifiedCropBn.trim()
            ? parsedResult.identifiedCropBn.trim()
            : 'অজ্ঞাত ফসল',
        identifiedCropEn:
          typeof parsedResult.identifiedCropEn === 'string' &&
          parsedResult.identifiedCropEn.trim()
            ? parsedResult.identifiedCropEn.trim()
            : 'Unidentified Crop',
        cropCategoryKey: normalizeCropKey(parsedResult.cropCategoryKey),
        scientificName:
          typeof parsedResult.scientificName === 'string' &&
          parsedResult.scientificName.trim()
            ? parsedResult.scientificName.trim()
            : 'Visual Plant Inspection',
        healthStatus,
        currentConditionBn:
          typeof parsedResult.currentConditionBn === 'string' &&
          parsedResult.currentConditionBn.trim()
            ? parsedResult.currentConditionBn.trim()
            : healthStatus === 'healthy'
            ? 'সুস্থ ও স্বাভাবিক'
            : 'রোগ বা সমস্যার লক্ষণ রয়েছে',
        currentConditionEn:
          typeof parsedResult.currentConditionEn === 'string' &&
          parsedResult.currentConditionEn.trim()
            ? parsedResult.currentConditionEn.trim()
            : healthStatus === 'healthy'
            ? 'Healthy & Normal'
            : 'Visible Issue Detected',
        detectedProblemBn:
          typeof parsedResult.detectedProblemBn === 'string' &&
          parsedResult.detectedProblemBn.trim()
            ? parsedResult.detectedProblemBn.trim()
            : healthStatus === 'healthy'
            ? 'কোনো দৃশ্যমান রোগ বা সমস্যা পাওয়া যায়নি (গাছটি সুস্থ)'
            : 'দৃশ্যমান পাতার সমস্যা',
        detectedProblemEn:
          typeof parsedResult.detectedProblemEn === 'string' &&
          parsedResult.detectedProblemEn.trim()
            ? parsedResult.detectedProblemEn.trim()
            : healthStatus === 'healthy'
            ? 'No visible disease or pest detected (Healthy)'
            : 'Visible Plant Health Issue',
        severity,
        severityLabelBn:
          typeof parsedResult.severityLabelBn === 'string' &&
          parsedResult.severityLabelBn.trim()
            ? parsedResult.severityLabelBn.trim()
            : severity === 'high'
            ? 'উচ্চ সতর্কতা'
            : severity === 'moderate'
            ? 'মাঝারি সতর্কতা'
            : 'স্বাভাবিক / কম ঝুঁকি',
        severityLabelEn:
          typeof parsedResult.severityLabelEn === 'string' &&
          parsedResult.severityLabelEn.trim()
            ? parsedResult.severityLabelEn.trim()
            : severity === 'high'
            ? 'High Attention'
            : severity === 'moderate'
            ? 'Moderate Watch'
            : 'Healthy / Low Risk',
        confidencePercent: clampConfidence(parsedResult.confidencePercent),
        summaryBn:
          typeof parsedResult.summaryBn === 'string'
            ? parsedResult.summaryBn.trim()
            : '',
        summaryEn:
          typeof parsedResult.summaryEn === 'string'
            ? parsedResult.summaryEn.trim()
            : '',
        symptomsBn: sanitizeStringList(parsedResult.symptomsBn),
        symptomsEn: sanitizeStringList(parsedResult.symptomsEn),
        causesBn: sanitizeStringList(parsedResult.causesBn),
        causesEn: sanitizeStringList(parsedResult.causesEn),
        actionsBn: sanitizeStringList(parsedResult.actionsBn),
        actionsEn: sanitizeStringList(parsedResult.actionsEn),
        preventionBn: sanitizeStringList(parsedResult.preventionBn),
        preventionEn: sanitizeStringList(parsedResult.preventionEn),
        expertAdviceBn:
          typeof parsedResult.expertAdviceBn === 'string' &&
          parsedResult.expertAdviceBn.trim()
            ? parsedResult.expertAdviceBn.trim()
            : 'চূড়ান্ত বালাইনাশক প্রয়োগের আগে আপনার উপজেলা কৃষি অফিসার বা সরকারি কৃষি কল সেন্টার (১৬১২৩) থেকে পরামর্শ নিন।',
        expertAdviceEn:
          typeof parsedResult.expertAdviceEn === 'string' &&
          parsedResult.expertAdviceEn.trim()
            ? parsedResult.expertAdviceEn.trim()
            : 'Consult your Upazila Agriculture Officer or call the Bangladesh Agriculture Helpline 16123 before applying chemical pesticides.',
      };

      res.status(200).json({
        status: 'success',
        analysis,
      });
    } catch (error) {
      const errObj = error as { status?: number; message?: string };
      const statusCode = Number(errObj?.status) || 500;
      const errMsg = String(errObj?.message || '');
      console.error('[analyze-crop-image] Gemini error:', statusCode, errMsg.slice(0, 300));

      if (
        statusCode === 401 ||
        statusCode === 403 ||
        errMsg.includes('API_KEY_INVALID') ||
        errMsg.includes('PERMISSION_DENIED')
      ) {
        res.status(403).json({
          status: 'error',
          errorCode: 'API_KEY_INVALID',
          messageBn:
            'Gemini API কী সঠিক নয় বা অনুমতি পাওয়া যায়নি। অনুগ্রহ করে Settings > Secrets প্যানেলে API কী যাচাই করুন।',
          messageEn:
            'Gemini API key is invalid or unauthorized. Please verify your API key in the Settings > Secrets panel.',
        });
        return;
      }

      if (statusCode === 429 || errMsg.includes('RESOURCE_EXHAUSTED')) {
        res.status(429).json({
          status: 'error',
          errorCode: 'RATE_LIMITED',
          messageBn:
            'এই মুহূর্তে অনেক বেশি অনুরোধ পাঠানো হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।',
          messageEn:
            'API quota or rate limit reached temporarily. Please wait a moment and try again.',
        });
        return;
      }

      res.status(500).json({
        status: 'error',
        errorCode: 'GEMINI_REQUEST_FAILED',
        messageBn:
          'ছবি বিশ্লেষণ করতে সার্ভারের সাথে সংযোগ ব্যর্থ হয়েছে। অনুগ্রহ করে ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।',
        messageEn:
          'Image analysis failed while contacting Gemini Vision. Please check your connection and try again.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('/{*splat}', (_req: Request, res: Response) => {
      const indexHtml = path.join(distDir, 'index.html');
      if (fs.existsSync(indexHtml)) {
        res.sendFile(indexHtml);
      } else {
        res.status(404).send('Build output not found. Run npm run build first.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KrishiBondhu server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
