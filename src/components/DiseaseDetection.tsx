import { ChangeEvent, DragEvent, useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Camera,
  CheckCircle2,
  Loader2,
  RefreshCw,
  ScanSearch,
  Sparkles,
  Trash2,
  Upload,
} from 'lucide-react';
import { ASSETS } from '../data/krishiData';
import {
  ActiveDiagnosis,
  BilingualText,
  CropKey,
  Language,
  PageRoute,
  PlantHealthStatus,
  SeverityLevel,
} from '../types/krishi';
import { ResilientImage } from './ResilientImage';
import { WorkspaceHeader } from './WorkspaceHeader';

interface DiseaseDetectionProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
  selectedDistrictId: string;
  onCompleteAnalysis: (diagnosis: ActiveDiagnosis) => void;
}

interface ServerSuccessAnalysis {
  isPlantAndClear: true;
  identifiedCropBn: string;
  identifiedCropEn: string;
  cropCategoryKey: CropKey | 'other';
  scientificName: string;
  healthStatus: PlantHealthStatus;
  currentConditionBn: string;
  currentConditionEn: string;
  detectedProblemBn: string;
  detectedProblemEn: string;
  severity: SeverityLevel;
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

type AnalyzeApiResponse =
  | {
      status: 'success';
      analysis: ServerSuccessAnalysis;
    }
  | {
      status: 'invalid_image';
      reasonBn: string;
      reasonEn: string;
    }
  | {
      status: 'error';
      errorCode?: string;
      messageBn: string;
      messageEn: string;
    };

const OBSERVATION_OPTIONS: { id: string; text: BilingualText }[] = [
  {
    id: 'obs-spots',
    text: {
      bn: 'পাতায় বাদামি, কালচে, হলুদ বা সাদা দাগ দেখা যাচ্ছে',
      en: 'Brown, dark, yellow, or white spots visible on leaves',
    },
  },
  {
    id: 'obs-dew',
    text: {
      bn: 'গত কয়েকদিন ঘন কুয়াশা, শিশির বা অতিরিক্ত আর্দ্রতা ছিল',
      en: 'Heavy morning dew, fog, or high humidity in recent days',
    },
  },
  {
    id: 'obs-lower',
    text: {
      bn: 'সমস্যাটি নিচের পুরোনো পাতায় বা কাণ্ডে বেশি দেখা যাচ্ছে',
      en: 'Symptoms appear mostly on older lower leaves or stems',
    },
  },
];

const MAX_UPLOAD_INPUT_BYTES = 20 * 1024 * 1024;
const MAX_DIMENSION_PX = 1400;

function readBlobAsDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to encode image data.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read image data.'));
    reader.readAsDataURL(blob);
  });
}

async function prepareImageDataUrlFromBlob(blob: Blob): Promise<string> {
  const rawDataUrl = await readBlobAsDataUrl(blob);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        if (!width || !height) {
          resolve(rawDataUrl);
          return;
        }

        const scale = Math.min(1, MAX_DIMENSION_PX / Math.max(width, height));
        const targetWidth = Math.max(1, Math.round(width * scale));
        const targetHeight = Math.max(1, Math.round(height * scale));

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(rawDataUrl);
          return;
        }

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve(jpegDataUrl);
      } catch {
        resolve(rawDataUrl);
      }
    };
    img.onerror = () => {
      if (blob.size <= 7.5 * 1024 * 1024 && rawDataUrl.startsWith('data:image/')) {
        resolve(rawDataUrl);
      } else {
        reject(new Error('UNSUPPORTED_IMAGE_FORMAT'));
      }
    };
    img.src = rawDataUrl;
  });
}

function pairBilingualLists(bnList: string[], enList: string[]): BilingualText[] {
  const length = Math.max(bnList.length, enList.length);
  const paired: BilingualText[] = [];
  for (let i = 0; i < length; i += 1) {
    const bnVal = (bnList[i] || enList[i] || '').trim();
    const enVal = (enList[i] || bnList[i] || '').trim();
    if (bnVal || enVal) {
      paired.push({ bn: bnVal, en: enVal });
    }
  }
  return paired;
}

export function DiseaseDetection({
  language,
  onToggleLanguage,
  onNavigate,
  selectedDistrictId,
  onCompleteAnalysis,
}: DiseaseDetectionProps) {
  const bn = language === 'bn';
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [imageSourceKind, setImageSourceKind] = useState<
    'camera' | 'gallery' | 'sample' | null
  >(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [uploadedFileSize, setUploadedFileSize] = useState<string>('');
  const [selectedObsIds, setSelectedObsIds] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isPreparingImage, setIsPreparingImage] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [errorBanner, setErrorBanner] = useState<{
    type: 'error' | 'invalid_image';
    titleBn: string;
    titleEn: string;
    messageBn: string;
    messageEn: string;
  } | null>(null);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const cancelOngoingAnalysis = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsAnalyzing(false);
  };

  const runGeminiAnalysis = async (
    targetImageDataUrl: string,
    sourceKind: 'camera' | 'gallery' | 'sample',
    fileName?: string
  ) => {
    if (!targetImageDataUrl) {
      setErrorBanner({
        type: 'error',
        titleBn: 'ছবি পাওয়া যায়নি',
        titleEn: 'No Image Selected',
        messageBn:
          'বিশ্লেষণ শুরু করার আগে অনুগ্রহ করে ক্যামেরায় ছবি তুলুন অথবা গ্যালারি থেকে একটি পাতার ছবি আপলোড করুন।',
        messageEn:
          'Please capture a photo with your camera or upload a crop image before starting analysis.',
      });
      return;
    }

    cancelOngoingAnalysis();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setErrorBanner(null);
    setIsAnalyzing(true);

    const fieldObservations = OBSERVATION_OPTIONS.filter((o) =>
      selectedObsIds.includes(o.id)
    ).map((o) => o.text);

    try {
      const response = await fetch('/api/analyze-crop-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageDataUrl: targetImageDataUrl,
          fieldObservations: fieldObservations.map((o) => o.en),
        }),
        signal: controller.signal,
      });

      const payload = (await response.json().catch(() => null)) as AnalyzeApiResponse | null;

      if (controller.signal.aborted) {
        return;
      }

      if (!payload) {
        setErrorBanner({
          type: 'error',
          titleBn: 'বিশ্লেষণ ব্যর্থ হয়েছে',
          titleEn: 'Analysis Failed',
          messageBn:
            'সার্ভার থেকে সঠিক উত্তর পাওয়া যায়নি। অনুগ্রহ করে ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।',
          messageEn:
            'Could not read a valid response from the analysis server. Please check your connection and try again.',
        });
        return;
      }

      if (payload.status === 'invalid_image') {
        setErrorBanner({
          type: 'invalid_image',
          titleBn: 'উপযুক্ত ফসলের ছবি প্রয়োজন',
          titleEn: 'Clear Crop Photo Required',
          messageBn: payload.reasonBn,
          messageEn: payload.reasonEn,
        });
        return;
      }

      if (!response.ok || payload.status === 'error') {
        const msgBn =
          payload.status === 'error'
            ? payload.messageBn
            : 'এআই মডেল দিয়ে ছবিটি বিশ্লেষণ করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।';
        const msgEn =
          payload.status === 'error'
            ? payload.messageEn
            : 'Unable to analyze this photo with Gemini Vision. Please try again.';

        setErrorBanner({
          type: 'error',
          titleBn: 'এআই বিশ্লেষণে সমস্যা হয়েছে',
          titleEn: 'AI Analysis Error',
          messageBn: msgBn,
          messageEn: msgEn,
        });
        return;
      }

      const ai = payload.analysis;
      const now = new Date();
      const formattedTimeEn = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      const formattedTimeBn = now.toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      const diagnosis: ActiveDiagnosis = {
        id: `diag-${Date.now()}`,
        analysisSource: 'gemini-vision',
        plantCondition: {
          bn: ai.currentConditionBn,
          en: ai.currentConditionEn,
        },
        healthStatus: ai.healthStatus,
        aiConfidencePercent: ai.confidencePercent,
        profile: {
          id: `gemini-${ai.cropCategoryKey}-${Date.now()}`,
          crop: ai.cropCategoryKey,
          cropLabel: {
            bn: ai.identifiedCropBn,
            en: ai.identifiedCropEn,
          },
          diseaseName: {
            bn: ai.detectedProblemBn,
            en: ai.detectedProblemEn,
          },
          scientificName: ai.scientificName,
          severity: ai.severity,
          severityLabel: {
            bn: ai.severityLabelBn,
            en: ai.severityLabelEn,
          },
          illustrativeMatchPercent: ai.confidencePercent,
          defaultImage: targetImageDataUrl,
          summary: {
            bn: ai.summaryBn,
            en: ai.summaryEn,
          },
          symptoms: pairBilingualLists(ai.symptomsBn, ai.symptomsEn),
          causes: pairBilingualLists(ai.causesBn, ai.causesEn),
          responsibleTreatment: pairBilingualLists(ai.actionsBn, ai.actionsEn),
          prevention: pairBilingualLists(ai.preventionBn, ai.preventionEn),
          expertVerification: {
            bn: ai.expertAdviceBn,
            en: ai.expertAdviceEn,
          },
        },
        previewImageUrl: targetImageDataUrl,
        isCustomUpload: sourceKind !== 'sample',
        uploadedFileName: fileName || undefined,
        fieldObservations:
          fieldObservations.length > 0 ? fieldObservations : undefined,
        analyzedAt: {
          bn: `আজ (${formattedTimeBn}) · Gemini Vision AI`,
          en: `Today (${formattedTimeEn}) · Gemini Vision AI`,
        },
        districtId: selectedDistrictId,
      };

      onCompleteAnalysis(diagnosis);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return;
      }
      setErrorBanner({
        type: 'error',
        titleBn: 'নেটওয়ার্ক বা সার্ভার ত্রুটি',
        titleEn: 'Connection Error',
        messageBn:
          'ছবি বিশ্লেষণ সার্ভারে পাঠানো যায়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।',
        messageEn:
          'Unable to reach the image analysis server. Please check your internet connection and retry.',
      });
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
        setIsAnalyzing(false);
      }
    }
  };

  const processSelectedFile = async (
    file: File,
    sourceKind: 'camera' | 'gallery'
  ) => {
    setErrorBanner(null);
    cancelOngoingAnalysis();

    if (file.type && !file.type.startsWith('image/')) {
      setErrorBanner({
        type: 'error',
        titleBn: 'অকার্যকর ফাইল',
        titleEn: 'Invalid File Type',
        messageBn:
          'অনুগ্রহ করে একটি বৈধ ছবির ফাইল (JPG, PNG বা WebP) নির্বাচন করুন।',
        messageEn: 'Please choose a valid image file (JPG, PNG, or WebP).',
      });
      return;
    }

    if (file.size > MAX_UPLOAD_INPUT_BYTES) {
      setErrorBanner({
        type: 'error',
        titleBn: 'ছবির আকার অনেক বড়',
        titleEn: 'Image Too Large',
        messageBn: 'অনুগ্রহ করে ২০ মেগাবাইটের কম আকারের ছবি নির্বাচন করুন।',
        messageEn: 'Please select a photo smaller than 20 MB.',
      });
      return;
    }

    const sizeKb = Math.max(1, Math.round(file.size / 1024));
    const sizeText =
      sizeKb >= 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;

    setIsPreparingImage(true);
    try {
      const preparedDataUrl = await prepareImageDataUrlFromBlob(file);
      setPreviewUrl(preparedDataUrl);
      setImageSourceKind(sourceKind);
      setUploadedFileName(
        file.name ||
          (sourceKind === 'camera' ? 'camera-capture.jpg' : 'gallery-photo.jpg')
      );
      setUploadedFileSize(sizeText);
      setIsPreparingImage(false);

      // Immediately send the actual captured/uploaded pixels to Gemini Vision
      await runGeminiAnalysis(preparedDataUrl, sourceKind, file.name);
    } catch {
      setIsPreparingImage(false);
      setErrorBanner({
        type: 'error',
        titleBn: 'ছবি প্রক্রিয়াকরণে সমস্যা',
        titleEn: 'Could Not Process Image',
        messageBn:
          'ছবিটি প্রক্রিয়াকরণ করা যায়নি। অনুগ্রহ করে JPG বা PNG ফরম্যাটে আরেকটি স্পষ্ট ছবি তুলে চেষ্টা করুন।',
        messageEn:
          'Unable to process this image format. Please capture or upload a clear JPG or PNG photo.',
      });
    }
  };

  const handleCameraChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (file) {
      void processSelectedFile(file, 'camera');
    }
  };

  const handleGalleryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (file) {
      void processSelectedFile(file, 'gallery');
    }
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      void processSelectedFile(file, 'gallery');
    }
  };

  const handleTestSamplePhoto = async (imgUrl: string, label: string) => {
    setErrorBanner(null);
    cancelOngoingAnalysis();
    setIsPreparingImage(true);
    try {
      const res = await fetch(imgUrl);
      const blob = await res.blob();
      const preparedDataUrl = await prepareImageDataUrlFromBlob(blob);
      setPreviewUrl(preparedDataUrl);
      setImageSourceKind('sample');
      setUploadedFileName(label);
      setUploadedFileSize('');
      setIsPreparingImage(false);
      await runGeminiAnalysis(preparedDataUrl, 'sample', label);
    } catch {
      setIsPreparingImage(false);
      setErrorBanner({
        type: 'error',
        titleBn: 'নমুনা ছবি লোড করা যায়নি',
        titleEn: 'Sample Load Failed',
        messageBn:
          'নমুনা ছবিটি লোড করা যায়নি। অনুগ্রহ করে ক্যামেরা বা গ্যালারি থেকে একটি ছবি দিন।',
        messageEn:
          'Could not load the sample leaf photo. Please capture or upload a photo instead.',
      });
    }
  };

  const handleRetakeCamera = () => {
    cancelOngoingAnalysis();
    setErrorBanner(null);
    cameraInputRef.current?.click();
  };

  const handleChooseGallery = () => {
    cancelOngoingAnalysis();
    setErrorBanner(null);
    galleryInputRef.current?.click();
  };

  const handleClearImage = () => {
    cancelOngoingAnalysis();
    setPreviewUrl('');
    setImageSourceKind(null);
    setUploadedFileName('');
    setUploadedFileSize('');
    setErrorBanner(null);
  };

  const toggleObservation = (id: string) => {
    setSelectedObsIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const sampleTestImages = [
    {
      id: 'sample-rice',
      title: { bn: 'ধানের পাতার ছবি', en: 'Rice Leaf Photo' },
      img: ASSETS.riceBlast,
    },
    {
      id: 'sample-tomato',
      title: { bn: 'টমেটো পাতার ছবি', en: 'Tomato Leaf Photo' },
      img: ASSETS.tomatoBlight,
    },
    {
      id: 'sample-potato',
      title: { bn: 'আলুর পাতার ছবি', en: 'Potato Leaf Photo' },
      img: ASSETS.potatoBlight,
    },
  ];

  return (
    <div className="bg-[var(--kb-canvas)] min-h-screen">
      <WorkspaceHeader
        breadcrumbLabel={bn ? 'AI রোগ শনাক্তকরণ' : 'AI Crop Disease Detection'}
        title={
          bn
            ? 'এআই ক্রপ ডক্টর — প্রকৃত ছবি বিশ্লেষণ'
            : 'AI Crop Doctor — Real-Time Vision Analysis'
        }
        subtitle={
          bn
            ? 'মোবাইল ক্যামেরায় তোলা বা গ্যালারির ফসলের ছবি সরাসরি Google Gemini Vision AI-তে পাঠিয়ে ফসল, রোগ, পোকা বা পুষ্টির ঘাটতি শনাক্ত করুন।'
            : 'Capture a photo with your phone camera or upload from your gallery. Google Gemini Vision analyzes the actual pixels to identify the crop and any visible issue.'
        }
        language={language}
        onToggleLanguage={onToggleLanguage}
        onNavigate={onNavigate}
        backRoute="dashboard"
        backLabel={bn ? 'ড্যাশবোর্ড' : 'Dashboard'}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Vision Analysis Info Banner */}
        <div className="bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-xl p-4 sm:p-5 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-[var(--kb-brand-text)] shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm text-[var(--kb-ink)]">
            <p className="font-semibold">
              {bn
                ? 'ছবির পিক্সেল থেকে স্বয়ংক্রিয় ফসল ও রোগ শনাক্তকরণ (Gemini Vision AI)'
                : 'Automatic Crop & Health Detection from Actual Image Pixels'}
            </p>
            <p className="text-[var(--kb-ink-muted)]">
              {bn
                ? 'এখানে আগে থেকে কোনো ফসল বা রোগ ধরে নেওয়া হয় না। আপনার তোলা বা আপলোড করা ছবির পাতা, ফল বা কাণ্ড সরাসরি AI বিশ্লেষণ করে ফসল ও অবস্থা নির্ণয় করে।'
                : 'No crop or disease is assumed in advance. Gemini Vision inspects the actual leaf, stem, or plant pixels to identify the species and report diseases, pests, nutrient deficiencies, or healthy condition.'}
            </p>
          </div>
        </div>

        {/* Hidden Inputs for Mobile Camera Capture & Gallery Upload */}
        <input
          ref={cameraInputRef}
          id="leaf-camera-input"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCameraChange}
          className="sr-only"
        />
        <input
          ref={galleryInputRef}
          id="leaf-upload-input"
          type="file"
          accept="image/*"
          onChange={handleGalleryChange}
          className="sr-only"
        />

        {/* Error / Invalid Image Alert Banner */}
        {errorBanner && (
          <div
            role="alert"
            className={`rounded-xl border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
              errorBanner.type === 'invalid_image'
                ? 'bg-[var(--kb-warn-bg)] border-[var(--kb-warn-border)] text-[var(--kb-warn-title)]'
                : 'bg-[var(--kb-danger-bg)] border-[var(--kb-danger-border)] text-[var(--kb-danger-text)]'
            }`}
          >
            <div className="flex items-start gap-3">
              {errorBanner.type === 'invalid_image' ? (
                <AlertTriangle className="w-5 h-5 text-[var(--kb-warn-icon)] shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <p className="text-sm font-bold">
                  {bn ? errorBanner.titleBn : errorBanner.titleEn}
                </p>
                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    errorBanner.type === 'invalid_image'
                      ? 'text-[var(--kb-warn-text)]'
                      : 'text-[var(--kb-danger-text)]'
                  }`}
                >
                  {bn ? errorBanner.messageBn : errorBanner.messageEn}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleRetakeCamera}
                className="inline-flex items-center gap-1.5 min-h-[38px] px-3.5 py-2 text-xs font-semibold bg-[var(--kb-surface)] text-[var(--kb-ink)] border border-[var(--kb-border)] rounded-lg hover:bg-[var(--kb-surface-muted)] cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{bn ? 'আবার ছবি তুলুন' : 'Retake Photo'}</span>
              </button>
              {previewUrl && errorBanner.type === 'error' && (
                <button
                  type="button"
                  onClick={() =>
                    void runGeminiAnalysis(
                      previewUrl,
                      imageSourceKind || 'gallery',
                      uploadedFileName
                    )
                  }
                  className="inline-flex items-center gap-1.5 min-h-[38px] px-3.5 py-2 text-xs font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{bn ? 'আবার চেষ্টা করুন' : 'Retry Analysis'}</span>
                </button>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Capture / Upload + Field Observations */}
          <div className="lg:col-span-7 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 sm:p-8 space-y-7">
            {/* Step 1: Camera & Gallery Upload */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-base sm:text-lg font-bold text-[var(--kb-ink)]">
                  {bn
                    ? '১. ফসল বা আক্রান্ত পাতার ছবি তুলুন / আপলোড করুন'
                    : '1. Capture or Upload Crop / Leaf Photo'}
                </h2>
                <span className="text-xs font-medium text-[var(--kb-accent)]">
                  {bn ? 'অ্যান্ড্রয়েড ক্যামেরা সমর্থিত' : 'Mobile Camera Ready'}
                </span>
              </div>

              {/* Primary Mobile-Friendly Camera & Gallery Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleRetakeCamera}
                  disabled={isPreparingImage || isAnalyzing}
                  className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-5 py-3 text-sm font-bold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] disabled:opacity-60 rounded-xl transition-colors cursor-pointer"
                >
                  <Camera className="w-5 h-5" />
                  <span>
                    {previewUrl && imageSourceKind === 'camera'
                      ? bn
                        ? 'ক্যামেরায় আবার ছবি তুলুন'
                        : 'Retake with Camera'
                      : bn
                      ? 'ক্যামেরা দিয়ে ছবি তুলুন'
                      : 'Take Photo with Camera'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleChooseGallery}
                  disabled={isPreparingImage || isAnalyzing}
                  className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-5 py-3 text-sm font-bold text-[var(--kb-brand-text)] bg-[var(--kb-surface-sage)] hover:bg-[var(--kb-surface-sage-strong)] disabled:opacity-60 border border-[var(--kb-border)] rounded-xl transition-colors cursor-pointer"
                >
                  <Upload className="w-5 h-5" />
                  <span>
                    {bn ? 'গ্যালারি থেকে ছবি বেছে নিন' : 'Upload from Gallery'}
                  </span>
                </button>
              </div>

              {/* Drag & Drop Area */}
              <label
                htmlFor="leaf-upload-input"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center gap-2.5 p-6 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors ${
                  isDragging
                    ? 'border-[var(--kb-accent)] bg-[var(--kb-surface-sage)]'
                    : 'border-[var(--kb-border)] hover:border-[var(--kb-accent)] bg-[var(--kb-surface-muted)]'
                }`}
              >
                <div className="w-11 h-11 rounded-full bg-[var(--kb-surface)] border border-[var(--kb-border)] flex items-center justify-center text-[var(--kb-brand-text)]">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-[var(--kb-ink)]">
                    {bn
                      ? 'অথবা ছবি এখানে টেনে আনুন / ক্লিক করে ফাইল নির্বাচন করুন'
                      : 'Or drag & drop a leaf photo here, or click to browse'}
                  </p>
                  <p className="text-xs text-[var(--kb-ink-muted)]">
                    {bn
                      ? 'পরিষ্কার আলোতে পাতা বা আক্রান্ত অংশের কাছের ছবি তুলুন (JPG, PNG, WebP)'
                      : 'Take a bright, focused close-up of the plant leaf or affected area (JPG, PNG, WebP)'}
                  </p>
                </div>
              </label>

              {/* Real Image Test Options (Sends actual image to Gemini Vision) */}
              <div className="pt-2 space-y-2.5">
                <p className="text-xs font-semibold text-[var(--kb-ink-muted)]">
                  {bn
                    ? 'অথবা সাথে সাথে এআই ভিশন পরীক্ষা করতে বাস্তব পাতার নমুনা ছবি পাঠান:'
                    : 'Or test Gemini Vision immediately with a real crop leaf photo:'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {sampleTestImages.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      disabled={isPreparingImage || isAnalyzing}
                      onClick={() =>
                        void handleTestSamplePhoto(
                          item.img,
                          bn ? item.title.bn : item.title.en
                        )
                      }
                      className="flex items-center gap-3 p-2.5 rounded-lg border bg-[var(--kb-surface)] text-[var(--kb-ink-muted)] border-[var(--kb-border)] hover:border-[var(--kb-accent)] hover:text-[var(--kb-ink)] disabled:opacity-60 text-left transition-colors cursor-pointer"
                    >
                      <div className="w-12 h-10 rounded overflow-hidden shrink-0 border border-[var(--kb-border)]">
                        <ResilientImage
                          src={item.img}
                          alt={bn ? item.title.bn : item.title.en}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs font-semibold leading-snug">
                        {bn ? item.title.bn : item.title.en}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Optional Field Observations */}
            <div className="space-y-3 pt-5 border-t border-[var(--kb-border-subtle)]">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-bold text-[var(--kb-ink)]">
                  {bn
                    ? '২. মাঠের বাড়তি পর্যবেক্ষণ (ঐচ্ছিক)'
                    : '2. Optional Field Context'}
                </h2>
                <span className="text-xs text-[var(--kb-ink-muted)]">
                  {bn ? 'AI বিশ্লেষণে সহায়ক' : 'Optional context for AI'}
                </span>
              </div>
              <div className="space-y-2">
                {OBSERVATION_OPTIONS.map((opt) => {
                  const checked = selectedObsIds.includes(opt.id);
                  return (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border text-sm cursor-pointer transition-colors ${
                        checked
                          ? 'bg-[var(--kb-surface-sage)] border-[var(--kb-accent)]/45 text-[var(--kb-ink)] font-medium'
                          : 'bg-[var(--kb-surface-muted)] border-[var(--kb-border)] text-[var(--kb-ink-muted)]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleObservation(opt.id)}
                        className="w-4 h-4 accent-[#059669] rounded cursor-pointer"
                      />
                      <span>{bn ? opt.text.bn : opt.text.en}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Manual Re-Analyze / Submit Action */}
            <div className="pt-5 border-t border-[var(--kb-border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-[var(--kb-ink-muted)]">
                {bn
                  ? 'ছবি নির্বাচন করার সাথে সাথেই AI বিশ্লেষণ শুরু হয়। পর্যবেক্ষণ বদলে আবার পরীক্ষা করতে বাটনে ক্লিক করুন।'
                  : 'AI analysis starts automatically on capture/upload. Click to re-analyze with updated observations.'}
              </p>
              <button
                type="button"
                onClick={() =>
                  void runGeminiAnalysis(
                    previewUrl,
                    imageSourceKind || 'gallery',
                    uploadedFileName
                  )
                }
                disabled={!previewUrl || isPreparingImage || isAnalyzing}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 text-sm font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>
                      {bn ? 'AI ছবি বিশ্লেষণ করছে...' : 'Analyzing with AI...'}
                    </span>
                  </>
                ) : (
                  <>
                    <ScanSearch className="w-4 h-4" />
                    <span>
                      {bn
                        ? 'AI দিয়ে বিশ্লেষণ করুন'
                        : 'Analyze Photo with AI'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Live Captured/Uploaded Image Preview & Status */}
          <div className="lg:col-span-5 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4 lg:sticky lg:top-24">
            <div className="flex items-center justify-between border-b border-[var(--kb-border-subtle)] pb-3">
              <h2 className="text-base font-bold text-[var(--kb-ink)]">
                {bn ? 'ছবির প্রিভিউ ও অবস্থা' : 'Image Preview & Status'}
              </h2>
              {isAnalyzing ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--kb-brand-text)]">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{bn ? 'বিশ্লেষণ চলছে' : 'Analyzing'}</span>
                </span>
              ) : previewUrl ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--kb-accent)]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {imageSourceKind === 'camera'
                      ? bn
                        ? 'ক্যামেরায় তোলা ছবি'
                        : 'Camera Capture'
                      : bn
                      ? 'ছবি প্রস্তুত'
                      : 'Image Ready'}
                  </span>
                </span>
              ) : (
                <span className="text-xs text-[var(--kb-ink-muted)]">
                  {bn ? 'ছবি অপেক্ষমাণ' : 'Awaiting Photo'}
                </span>
              )}
            </div>

            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[var(--kb-border)] bg-[var(--kb-surface-muted)] flex items-center justify-center">
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    alt={
                      bn
                        ? 'বিশ্লেষণের জন্য তোলা বা আপলোডকৃত ফসলের ছবি'
                        : 'Captured or uploaded crop preview'
                    }
                    className="w-full h-full object-cover"
                  />
                  {(isAnalyzing || isPreparingImage) && (
                    <div className="absolute inset-0 bg-[#0A1F13]/70 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 p-4 text-center text-white">
                      <Loader2 className="w-9 h-9 animate-spin text-[#6EE7B7]" />
                      <div className="space-y-1">
                        <p className="text-sm font-bold">
                          {isPreparingImage
                            ? bn
                              ? 'ছবি প্রস্তুত করা হচ্ছে...'
                              : 'Preparing photo...'
                            : bn
                            ? 'Gemini Vision AI ছবিটি পরীক্ষা করছে...'
                            : 'Gemini Vision AI is inspecting pixels...'}
                        </p>
                        <p className="text-xs text-[#D1E2D7]">
                          {bn
                            ? 'ফসলের ধরন ও পাতার রোগ/সমস্যা শনাক্ত করা হচ্ছে'
                            : 'Identifying plant species and visible health conditions'}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-6 text-center space-y-2.5 text-[var(--kb-ink-muted)]">
                  <Camera className="w-10 h-10 mx-auto opacity-60" />
                  <p className="text-sm font-semibold text-[var(--kb-ink)]">
                    {bn ? 'এখনও কোনো ছবি নেওয়া হয়নি' : 'No photo selected yet'}
                  </p>
                  <p className="text-xs leading-relaxed max-w-xs mx-auto">
                    {bn
                      ? 'উপরের "ক্যামেরা দিয়ে ছবি তুলুন" বা "গ্যালারি থেকে ছবি বেছে নিন" বাটনে চাপ দিয়ে ফসলের ছবি দিন।'
                      : 'Use "Take Photo with Camera" or "Upload from Gallery" to inspect your crop.'}
                  </p>
                </div>
              )}
            </div>

            {previewUrl && (
              <div className="p-4 bg-[var(--kb-surface-muted)] rounded-lg border border-[var(--kb-border-subtle)] space-y-2 text-xs text-[var(--kb-ink-muted)]">
                <div className="flex items-center justify-between gap-2">
                  <span>{bn ? 'ফসল শনাক্তকরণ:' : 'Crop Identification:'}</span>
                  <span className="font-semibold text-[var(--kb-ink)]">
                    {bn
                      ? 'AI ছবি দেখে স্বয়ংক্রিয়ভাবে নির্ণয় করবে'
                      : 'Auto-detected from photo'}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span>{bn ? 'ছবির উৎস:' : 'Image Source:'}</span>
                  <span className="font-medium text-[var(--kb-ink)] truncate max-w-[200px]">
                    {uploadedFileName || (bn ? 'ক্যামেরা / গ্যালারি' : 'Camera / Gallery')}
                    {uploadedFileSize ? ` (${uploadedFileSize})` : ''}
                  </span>
                </div>
              </div>
            )}

            {previewUrl && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleRetakeCamera}
                  className="min-h-[42px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface-sage)] hover:bg-[var(--kb-surface-sage-strong)] border border-[var(--kb-border)] rounded-lg transition-colors cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{bn ? 'আবার ছবি তুলুন' : 'Retake Photo'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="min-h-[42px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[var(--kb-danger-text)] bg-[var(--kb-danger-bg)] hover:opacity-90 border border-[var(--kb-danger-border)] rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{bn ? 'ছবি মুছুন' : 'Clear Photo'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
