import { BilingualText } from '../types/krishi';
import { CEREAL_CROPS } from './crops/cereals';
import { VEGETABLE_CROPS } from './crops/vegetables';
import { FRUIT_CROPS } from './crops/fruits';
import { OILSEED_AND_PULSE_CROPS } from './crops/oilseedsAndPulses';
import { CASH_SPICE_EMERGING_CROPS } from './crops/cashSpicesEmerging';
import {
  CROP_ASSETS,
  CROP_CATEGORY_LABELS,
  CROP_CATEGORY_ORDER,
  CropCategory,
  CropCultivationGuide,
  CropSourceType,
  CultivationTimelineStep,
  GrowthStageCareItem,
} from './crops/types';

export type {
  CropCategory,
  CropCultivationGuide,
  CropSourceType,
  CultivationTimelineStep,
  GrowthStageCareItem,
};

export { CROP_ASSETS, CROP_CATEGORY_LABELS, CROP_CATEGORY_ORDER };

export const CROP_CULTIVATION_GUIDES: CropCultivationGuide[] = [
  ...CEREAL_CROPS,
  ...VEGETABLE_CROPS,
  ...FRUIT_CROPS,
  ...OILSEED_AND_PULSE_CROPS,
  ...CASH_SPICE_EMERGING_CROPS,
];

const CUSTOM_CROPS_STORAGE_KEY = 'krishibondhu_custom_user_crops_v1';

export interface CustomUserCropRequest {
  id: string;
  nameBn: string;
  nameEn: string;
  category: CropCategory;
  note: string;
  createdAt: string;
}

export function loadCustomUserCropRequests(): CustomUserCropRequest[] {
  try {
    const raw = window.localStorage.getItem(CUSTOM_CROPS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCustomUserCropRequests(list: CustomUserCropRequest[]): void {
  try {
    window.localStorage.setItem(CUSTOM_CROPS_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // Ignore storage quota restrictions
  }
}

export function customRequestToGuide(req: CustomUserCropRequest): CropCultivationGuide {
  const catLabel = CROP_CATEGORY_LABELS[req.category];
  const displayBn = req.nameBn.trim() || req.nameEn.trim();
  const displayEn = req.nameEn.trim() || req.nameBn.trim();
  const placeholderNotice: BilingualText = {
    bn: 'এই ফসলটি আপনার যোগ করা ডেমো অনুরোধ তালিকায় রয়েছে। কোনো যাচাইকৃত নির্দেশনা এই ফসলের জন্য এখনো যুক্ত হয়নি—অনুগ্রহ করে উপজেলা কৃষি অফিস বা ১৬১২৩ নম্বরে পরামর্শ নিন।',
    en: 'This crop is a user-submitted demo entry. Verified variety-specific cultivation data is not yet available in this local prototype—please consult your Upazila Agriculture Office or dial 16123.',
  };

  return {
    id: req.id,
    name: { bn: displayBn, en: displayEn },
    aliases: [displayBn, displayEn],
    category: req.category,
    categoryLabel: catLabel,
    imageUrl: CROP_ASSETS.resilientFarm,
    sourceType: 'user_requested',
    waterDemandLevel: 'moderate',
    overview: req.note.trim()
      ? {
          bn: `${placeholderNotice.bn} আপনার নোট: ${req.note.trim()}`,
          en: `${placeholderNotice.en} Farmer note: ${req.note.trim()}`,
        }
      : placeholderNotice,
    suitableVarieties: {
      bn: 'উপজেলা কৃষি অফিস বা BARI/BRRI/BINA আঞ্চলিক কেন্দ্র থেকে এলাকা-উপযোগী অনুমোদিত জাত জেনে নিন।',
      en: 'Confirm locally adapted varieties with your Upazila Agriculture Officer or BARI/BRRI/BINA regional station.',
    },
    suitableRegions: {
      bn: 'স্থানীয় AEZ (Agro-Ecological Zone) ও জলাবদ্ধতা-মুক্ত জমির উপযোগিতা যাচাই সাপেক্ষ।',
      en: 'Depends on local Agro-Ecological Zone (AEZ) suitability and flood/drainage elevation.',
    },
    seasonAndPlanting: {
      bn: 'আঞ্চলিক তাপমাত্রা ও বৃষ্টিপাতের ধরন অনুযায়ী স্থানীয় কৃষি অফিসের বর্ষপঞ্জি দেখে সময় নির্ধারণ করুন।',
      en: 'Schedule planting according to regional temperature, rainfall pattern, and local extension calendar.',
    },
    soilAndPh: {
      bn: 'সঠিক মাটি ও অম্ল-ক্ষার মাত্রা (pH) জানতে SRDI বা স্থানীয় অফিসে মাটি পরীক্ষা করুন।',
      en: 'Test local soil texture and pH through SRDI or Upazila testing before large-scale planting.',
    },
    landPreparation: {
      bn: 'জমি আগাছামুক্ত, সমতল ও পানি নিষ্কাশনযোগ্য করে প্রস্তুত রাখুন।',
      en: 'Ensure weed-free tilth and clean perimeter drainage appropriate to upland or lowland plots.',
    },
    seedSelectionAndTreatment: {
      bn: 'প্রত্যয়িত, সুস্থ ও রোগমুক্ত বীজ বা কলম চারা নির্ভরযোগ্য উৎস থেকে সংগ্রহ করুন।',
      en: 'Source healthy, disease-free certified seed or grafted saplings from reputable nurseries.',
    },
    plantingMethod: {
      bn: 'জাত ও বৃদ্ধির ধরন অনুযায়ী উপযুক্ত সারি ও দূরত্ব বজায় রাখুন।',
      en: 'Follow spacing suitable for the crop canopy habit and airflow.',
    },
    fertilizerManagement: {
      bn: 'এই ফসলের জন্য কোনো অনুমানভিত্তিক সার মাত্রা দেওয়া হয়নি। SRDI মাটি পরীক্ষা ও ১৬১২৩ পরামর্শ অনুযায়ী সুষম জৈব ও খনিজ সার প্রয়োগ করুন।',
      en: 'No fabricated dosages are provided for user-submitted crops. Rely on SRDI soil testing and 16123 extension advice.',
    },
    irrigationSchedule: {
      bn: 'মাটির আর্দ্রতা, বৃষ্টির পূর্বাভাস ও শিকড়ের অবস্থা পর্যবেক্ষণ করে পরিমিত সেচ ও নিষ্কাশন নিশ্চিত করুন।',
      en: 'Adjust irrigation and drainage conservatively based on observed root-zone moisture and rain forecasts.',
    },
    growthStageCare: [
      {
        stage: { bn: 'প্রাথমিক প্রতিষ্ঠা', en: 'Establishment Check' },
        guidance: {
          bn: 'অঙ্কুরোদগম ও চারার অবস্থা নিয়মিত পর্যবেক্ষণ করুন এবং আগাছা পরিষ্কার রাখুন।',
          en: 'Monitor germination, stand establishment, and early weed pressure closely.',
        },
      },
      {
        stage: { bn: 'মাঠ পর্যবেক্ষণ', en: 'Field Scouting' },
        guidance: {
          bn: 'যেকোনো পাতার দাগ বা পোকামাকড় দেখলে কৃষি অফিসারের সহায়তা নিন।',
          en: 'Inspect foliage regularly and consult local agriculture officers at early symptom signs.',
        },
      },
    ],
    weedManagement: {
      bn: 'চারা ও প্রাথমিক বৃদ্ধির পর্যায়ে সাবধানে আগাছা পরিষ্কার রাখুন।',
      en: 'Keep early establishment stages clean of competing weeds.',
    },
    commonDiseasesAndPests: {
      bn: 'যাচাইকৃত তথ্য যুক্ত না থাকায় স্থানীয় কৃষি অফিসের মাধ্যমে এই ফসলের প্রচলিত রোগ-পোকা সম্পর্কে জেনে নিন।',
      en: 'Verified pest and disease list is not yet cataloged for this custom entry; ask your local Upazila Agriculture Officer.',
    },
    preventionAndSafeManagement: {
      bn: 'সুস্থ বীজ, পরিচ্ছন্ন চাষাবাদ ও ১৬১২৩ হেল্পলাইনের পরামর্শ অনুযায়ী নিরাপদ সমন্বিত ব্যবস্থাপনা অনুসরণ করুন।',
      en: 'Practice clean sanitation, crop rotation, and consult 16123 before any chemical intervention.',
    },
    harvesting: {
      bn: 'জাতের পরিপক্বতার লক্ষণ ও স্থানীয় বাজারের মানদণ্ড অনুযায়ী পরিষ্কার আবহাওয়ায় সংগ্রহ করুন।',
      en: 'Harvest at physiological maturity suited to the specific cultivar during dry weather.',
    },
    postHarvestStorage: {
      bn: 'সংগ্রহের পর পরিষ্কার, ছায়াযুক্ত ও বায়ুচলাচলযুক্ত স্থানে নিরাপদভাবে রাখুন।',
      en: 'Handle cleanly post-harvest in shaded, ventilated storage suitable for the crop type.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'পরিকল্পনা ও মাটি যাচাই', en: 'Planning & Soil Check' },
        window: { bn: 'রোপণের আগে', en: 'Pre-Planting' },
        action: { bn: 'উপজেলা কৃষি অফিস বা ১৬১২৩-এ পরামর্শ নেওয়া।', en: 'Consult Upazila Agriculture Office or 16123.' },
      },
      {
        step: 2,
        stage: { bn: 'বীজ ও চারা প্রতিষ্ঠা', en: 'Establishment' },
        window: { bn: 'শুরু', en: 'Start' },
        action: { bn: 'প্রত্যয়িত বীজ/চারা সুনিষ্কাশিত জমিতে লাগানো।', en: 'Establish certified seed/plants on drained land.' },
      },
      {
        step: 3,
        stage: { bn: 'বৃদ্ধি ও পর্যবেক্ষণ', en: 'Growth & Scouting' },
        window: { bn: 'মাঝামাঝি পর্যায়', en: 'Mid-Cycle' },
        action: { bn: 'আগাছা দমন, জৈব যত্ন ও রোগ-পোকা দেখা।', en: 'Weed cleanly and monitor moisture and pests.' },
      },
      {
        step: 4,
        stage: { bn: 'সংগ্রহ ও সংরক্ষণ', en: 'Harvest & Handling' },
        window: { bn: 'জাতভেদে পরিপক্বতা', en: 'At Maturity' },
        action: { bn: 'পরিপক্ব হলে পরিচ্ছন্নভাবে তোলা।', en: 'Harvest cleanly at variety-specific maturity.' },
      },
    ],
  };
}

export function searchCultivationCrops(
  query: string,
  crops: CropCultivationGuide[] = CROP_CULTIVATION_GUIDES
): CropCultivationGuide[] {
  const q = query.trim().toLowerCase();
  if (!q) return crops;

  return crops.filter((crop) => {
    const bn = crop.name.bn.toLowerCase();
    const en = crop.name.en.toLowerCase();
    const catBn = crop.categoryLabel.bn.toLowerCase();
    const catEn = crop.categoryLabel.en.toLowerCase();
    const aliasMatch = crop.aliases.some((a) => a.toLowerCase().includes(q));
    return (
      bn.includes(q) ||
      en.includes(q) ||
      catBn.includes(q) ||
      catEn.includes(q) ||
      aliasMatch
    );
  });
}

export function getEnglishInitialLetter(crop: CropCultivationGuide): string {
  const first = crop.name.en.trim().charAt(0).toUpperCase();
  return /[A-Z]/.test(first) ? first : '#';
}
