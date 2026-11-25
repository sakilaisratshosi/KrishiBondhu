export type Language = 'bn' | 'en';

export type PageRoute =
  | 'home'
  | 'dashboard'
  | 'detect'
  | 'result'
  | 'weather'
  | 'assistant'
  | 'calendar'
  | 'risk'
  | 'finance'
  | 'community'
  | 'history'
  | 'sdg'
  | 'roadmap'
  | 'financial-model'
  | 'fair-price'
  | 'profile'
  | 'cultivation'
  | 'soil';

export type ProfileSectionTarget =
  | 'overview'
  | 'edit'
  | 'farming'
  | 'locations'
  | 'language';

export type CropKey = 'rice' | 'tomato' | 'potato' | 'eggplant';

export type SeverityLevel = 'low' | 'moderate' | 'high';

export type PlantHealthStatus =
  | 'healthy'
  | 'diseased'
  | 'pest'
  | 'nutrient_deficiency'
  | 'abiotic_stress';

export interface BilingualText {
  bn: string;
  en: string;
}

export interface DiseaseProfile {
  id: string;
  crop: CropKey | 'other';
  cropLabel: BilingualText;
  diseaseName: BilingualText;
  scientificName: string;
  severity: SeverityLevel;
  severityLabel: BilingualText;
  illustrativeMatchPercent: number;
  defaultImage: string;
  summary: BilingualText;
  symptoms: BilingualText[];
  causes: BilingualText[];
  prevention: BilingualText[];
  responsibleTreatment: BilingualText[];
  expertVerification: BilingualText;
}

export interface ActiveDiagnosis {
  id: string;
  profile: DiseaseProfile;
  previewImageUrl: string;
  isCustomUpload: boolean;
  uploadedFileName?: string;
  fieldObservations?: BilingualText[];
  analyzedAt: BilingualText;
  districtId: string;
  analysisSource?: 'gemini-vision' | 'history-sample';
  plantCondition?: BilingualText;
  healthStatus?: PlantHealthStatus;
  aiConfidencePercent?: number;
}

export interface WeatherForecastDay {
  day: BilingualText;
  condition: BilingualText;
  icon: 'sun' | 'cloud-rain' | 'cloud' | 'wind';
  tempMax: number;
  tempMin: number;
  rainChance: number;
}

export interface WeatherAdviceItem {
  id: string;
  title: BilingualText;
  detail: BilingualText;
  priority: 'caution' | 'normal';
  priorityLabel: BilingualText;
}

export interface DistrictWeather {
  id: string;
  name: BilingualText;
  region: BilingualText;
  tempC: number;
  feelsLikeC: number;
  humidityPercent: number;
  rainfallMm: number;
  windKmh: number;
  condition: BilingualText;
  warningTitle: BilingualText;
  warningBody: BilingualText;
  forecast: WeatherForecastDay[];
  farmingGuidance: WeatherAdviceItem[];
}

export interface HistoryRecord {
  id: string;
  date: BilingualText;
  isoDate: string;
  districtId: string;
  districtName: BilingualText;
  crop: CropKey | 'other';
  cropLabel: BilingualText;
  profileId: string;
  diseaseName: BilingualText;
  severity: SeverityLevel;
  severityLabel: BilingualText;
  imageUrl: string;
  notes: BilingualText;
  diagnosisSnapshot?: ActiveDiagnosis;
}

export interface ChatMessage {
  id: string;
  sender: 'farmer' | 'assistant';
  text: BilingualText;
  timestamp: BilingualText;
  category?: BilingualText;
}

export interface SuggestedQuestion {
  id: string;
  prompt: BilingualText;
  answer: BilingualText;
  keywords: string[];
}

export interface CropCalendarTask {
  id: string;
  stage: BilingualText;
  dayRange: BilingualText;
  title: BilingualText;
  detail: BilingualText;
  reminderText: BilingualText;
  defaultDone?: boolean;
}

export interface CropCalendarSchedule {
  crop: CropKey;
  cropLabel: BilingualText;
  seasonSummary: BilingualText;
  durationDays: number;
  tasks: CropCalendarTask[];
}

export type RiskLevel = 'low' | 'medium' | 'high';

export type ExpenseCategory =
  | 'seed'
  | 'fertilizer'
  | 'irrigation'
  | 'labor'
  | 'protection';

export interface ExpenseEntry {
  id: string;
  title: string;
  category: ExpenseCategory;
  crop: CropKey;
  amountBdt: number;
  date: string;
}

export interface CommunityComment {
  id: string;
  author: BilingualText;
  role?: BilingualText;
  isExpert?: boolean;
  text: BilingualText;
  timestamp: BilingualText;
}

export interface CommunityPost {
  id: string;
  authorName: BilingualText;
  location: BilingualText;
  crop: CropKey;
  cropLabel: BilingualText;
  timestamp: BilingualText;
  title: BilingualText;
  body: BilingualText;
  imageUrl?: string;
  likes: number;
  likedByMe?: boolean;
  expertAdvice: BilingualText;
  comments: CommunityComment[];
}

export interface FarmerProfile {
  name: string;
  photoUrl?: string;
  mobileNumber: string;
  districtId: string;
  customDistrictName?: string;
  upazila: string;
  village: string;
  preferredCrops: CropKey[];
  primaryCrop: CropKey;
  farmingExperience: string;
  farmSizeBigha: number;
  preferredLanguage: Language;
  phoneNote: string;
}

