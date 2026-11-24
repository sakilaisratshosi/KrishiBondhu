import { BilingualText } from '../../types/krishi';

export type CropCategory =
  | 'cereal'
  | 'vegetable'
  | 'fruit'
  | 'oilseed'
  | 'pulse'
  | 'cash_crop'
  | 'spice'
  | 'emerging';

export type CropSourceType =
  | 'verified_reference'
  | 'sample_demo'
  | 'user_requested';

export interface CultivationTimelineStep {
  step: number;
  stage: BilingualText;
  window: BilingualText;
  action: BilingualText;
}

export interface GrowthStageCareItem {
  stage: BilingualText;
  guidance: BilingualText;
}

export interface CropCultivationGuide {
  id: string;
  name: BilingualText;
  aliases: string[];
  category: CropCategory;
  categoryLabel: BilingualText;
  imageUrl: string;
  sourceType: CropSourceType;
  waterDemandLevel: 'low' | 'moderate' | 'high';
  // 16 Comprehensive Crop-Specific Sections
  overview: BilingualText;
  suitableVarieties: BilingualText;
  suitableRegions: BilingualText;
  seasonAndPlanting: BilingualText;
  soilAndPh: BilingualText;
  landPreparation: BilingualText;
  seedSelectionAndTreatment: BilingualText;
  plantingMethod: BilingualText;
  fertilizerManagement: BilingualText;
  irrigationSchedule: BilingualText;
  growthStageCare: GrowthStageCareItem[];
  weedManagement: BilingualText;
  commonDiseasesAndPests: BilingualText;
  preventionAndSafeManagement: BilingualText;
  harvesting: BilingualText;
  postHarvestStorage: BilingualText;
  timeline: CultivationTimelineStep[];
}

export const CROP_CATEGORY_LABELS: Record<CropCategory, BilingualText> = {
  cereal: { bn: 'দানাদার শস্য', en: 'Cereals' },
  vegetable: { bn: 'শাকসবজি ও কন্দ', en: 'Vegetables' },
  fruit: { bn: 'ফলমূল', en: 'Fruits' },
  oilseed: { bn: 'তৈলবীজ', en: 'Oilseeds' },
  pulse: { bn: 'ডাল ফসল', en: 'Pulses' },
  cash_crop: { bn: 'অর্থকরী ও আঁশ ফসল', en: 'Cash Crops' },
  spice: { bn: 'মসলা ফসল', en: 'Spices' },
  emerging: { bn: 'অন্যান্য ও নতুন উপযোগী', en: 'Other & Emerging' },
};

export const CROP_CATEGORY_ORDER: CropCategory[] = [
  'cereal',
  'vegetable',
  'fruit',
  'oilseed',
  'pulse',
  'cash_crop',
  'spice',
  'emerging',
];

export const CROP_ASSETS = {
  paddyField: '/src/assets/images/hero_bangladesh_paddy_1795480211999.jpg',
  riceLeaf: '/src/assets/images/sample_rice_blast_1795480213380.jpg',
  potato: '/src/assets/images/sample_potato_late_blight_1795480212988.jpg',
  tomato: '/src/assets/images/sample_tomato_blight_1795480212577.jpg',
  vegetables: '/src/assets/images/crop_vegetables_bangladesh_1795486783880.jpg',
  fruits: '/src/assets/images/crop_fruits_bangladesh_1795486783879.jpg',
  oilseeds: '/src/assets/images/crop_oilseeds_mustard_1795486784463.jpg',
  pulsesJute: '/src/assets/images/crop_pulses_jute_1795486784747.jpg',
  spices: '/src/assets/images/crop_spices_harvest_1795486785525.jpg',
  resilientFarm: '/src/assets/images/sdg_resilient_farming_1795480214900.jpg',
};
