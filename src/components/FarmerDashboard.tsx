import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BookMarked,
  BookOpen,
  Calculator,
  CalendarDays,
  CheckSquare,
  CloudRain,
  CloudSun,
  Droplets,
  FileText,
  Layers,
  MapPin,
  MessageSquare,
  ScanSearch,
  Sprout,
  Square,
  Thermometer,
  User,
  Users,
  Wind,
} from 'lucide-react';
import {
  findDistrictById,
  BangladeshDistrict,
} from '../data/bangladeshDistricts';
import {
  CROP_CULTIVATION_GUIDES,
  CropCultivationGuide,
} from '../data/cropCultivationData';
import { getDistrictFarmingSuggestion } from '../data/districtFarmingGuidance';
import { CROP_OPTIONS, DISTRICT_WEATHER } from '../data/krishiData';
import {
  CropKey,
  DistrictWeather,
  FarmerProfile,
  HistoryRecord,
  Language,
  PageRoute,
} from '../types/krishi';
import { DistrictAutocomplete } from './DistrictAutocomplete';
import { ResilientImage } from './ResilientImage';
import { SourceQualityNotice } from './SourceQualityNotice';
import { WorkspaceHeader } from './WorkspaceHeader';

interface FarmerDashboardProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
  locations?: DistrictWeather[];
  selectedDistrictId: string;
  onSelectDistrict: (id: string) => void;
  farmerProfile?: FarmerProfile | null;
  onUpdateProfile?: (profile: FarmerProfile) => void;
  history: HistoryRecord[];
  onOpenHistoryRecord: (record: HistoryRecord) => void;
  allCrops?: CropCultivationGuide[];
  onOpenCultivationForCrop?: (cropId: string) => void;
}

function getClosestWeatherModel(
  districtId: string,
  locations: DistrictWeather[],
  districtMeta?: BangladeshDistrict
): { weather: DistrictWeather; isDirectMatch: boolean } {
  const direct = locations.find((d) => d.id === districtId);
  if (direct) return { weather: direct, isDirectMatch: true };

  const div = districtMeta?.divisionEn;
  const fallbackId =
    div === 'Rajshahi'
      ? 'rajshahi'
      : div === 'Rangpur'
      ? 'rangpur'
      : div === 'Sylhet'
      ? 'sylhet'
      : div === 'Chattogram'
      ? 'cumilla'
      : 'bogura';

  const fallback = locations.find((d) => d.id === fallbackId) || locations[0];
  return { weather: fallback, isDirectMatch: false };
}

function readJournalCount(): number {
  try {
    const raw = window.localStorage.getItem('krishibondhu_farming_journal_v1');
    if (!raw) return 2;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.length : 2;
  } catch {
    return 2;
  }
}

export function FarmerDashboard({
  language,
  onToggleLanguage,
  onNavigate,
  locations = DISTRICT_WEATHER,
  selectedDistrictId,
  onSelectDistrict,
  farmerProfile,
  onUpdateProfile,
  history,
  onOpenHistoryRecord,
  allCrops = CROP_CULTIVATION_GUIDES,
  onOpenCultivationForCrop,
}: FarmerDashboardProps) {
  const bn = language === 'bn';
  const [editingProfile, setEditingProfile] = useState(false);
  const [draftName, setDraftName] = useState(farmerProfile?.name || '');
  const [draftCrop, setDraftCrop] = useState<CropKey>(
    farmerProfile?.primaryCrop || 'rice'
  );
  const [draftSize, setDraftSize] = useState(
    String(farmerProfile?.farmSizeBigha || 2)
  );
  const [draftSeason, setDraftSeason] = useState(
    farmerProfile?.phoneNote || (bn ? 'বোরো ও রবি মৌসুম' : 'Boro & Rabi Season')
  );
  const [upazilaInput, setUpazilaInput] = useState<string>(
    farmerProfile?.upazila || (bn ? 'শিবগঞ্জ' : 'Shibganj')
  );
  const [journalCount, setJournalCount] = useState<number>(() =>
    readJournalCount()
  );

  useEffect(() => {
    setJournalCount(readJournalCount());
  }, []);

  useEffect(() => {
    if (farmerProfile?.upazila) {
      setUpazilaInput(farmerProfile.upazila);
    }
  }, [farmerProfile?.upazila]);

  const activeDistrict = useMemo(
    () => findDistrictById(selectedDistrictId),
    [selectedDistrictId]
  );

  const { weather, isDirectMatch } = useMemo(
    () => getClosestWeatherModel(selectedDistrictId, locations, activeDistrict),
    [selectedDistrictId, locations, activeDistrict]
  );

  const districtSuggestion = useMemo(
    () => getDistrictFarmingSuggestion(selectedDistrictId, upazilaInput),
    [selectedDistrictId, upazilaInput]
  );

  const recommendedCropGuides = useMemo(
    () =>
      districtSuggestion.recommendedCropIds
        .map((id) => allCrops.find((c) => c.id === id))
        .filter((c): c is CropCultivationGuide => Boolean(c)),
    [districtSuggestion.recommendedCropIds, allCrops]
  );

  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({
    'task-1': true,
    'task-2': false,
    'task-3': false,
  });

  const dailyTasks = [
    {
      id: 'task-1',
      label: bn
        ? 'ভোরের শিশির শুকানোর পর নিচের পাতা পর্যবেক্ষণ'
        : 'Inspect lower foliage after morning dew dries',
    },
    {
      id: 'task-2',
      label: bn
        ? 'জমির পানি নিষ্কাশন নালা ও আইল পরিষ্কার রাখা'
        : 'Keep drainage trenches and plot bunds clear',
    },
    {
      id: 'task-3',
      label: bn
        ? 'স্প্রে করার আগে বৃষ্টির পূর্বাভাস যাচাই'
        : 'Check rain forecast before applying any spray',
    },
  ];

  const completedCount = dailyTasks.filter((t) => completedTasks[t.id]).length;
  const recentReports = history.slice(0, 3);

  const toggleTask = (id: string) => {
    setCompletedTasks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const displayName = farmerProfile
    ? farmerProfile.name
    : bn
    ? 'অতিথি কৃষক'
    : 'Guest Farmer';

  const handleDistrictChange = (district: BangladeshDistrict | null) => {
    if (!district) return;
    onSelectDistrict(district.id);
    if (farmerProfile && onUpdateProfile) {
      onUpdateProfile({
        ...farmerProfile,
        districtId: district.id,
        upazila: upazilaInput.trim() || farmerProfile.upazila,
      });
    }
  };

  const handleUpazilaBlur = () => {
    if (farmerProfile && onUpdateProfile && upazilaInput.trim()) {
      if (upazilaInput.trim() !== farmerProfile.upazila) {
        onUpdateProfile({
          ...farmerProfile,
          upazila: upazilaInput.trim(),
        });
      }
    }
  };

  return (
    <div className="bg-[var(--kb-canvas)] min-h-screen">
      <WorkspaceHeader
        breadcrumbLabel={bn ? 'কৃষক ড্যাশবোর্ড' : 'Farmer Dashboard'}
        title={
          bn
            ? `স্বাগতম, ${displayName} (${farmerProfile ? 'নমুনা কৃষক প্রোফাইল' : 'ডেমো'})`
            : `Welcome, ${displayName} (${farmerProfile ? 'Sample Farmer Profile' : 'Demo'})`
        }
        subtitle={
          farmerProfile
            ? bn
              ? `${farmerProfile.phoneNote} · জমির পরিমাণ: ${farmerProfile.farmSizeBigha} বিঘা · জেলাভিত্তিক ফসল ও আবহাওয়া পরামর্শ।`
              : `${farmerProfile.phoneNote} · Farm Size: ${farmerProfile.farmSizeBigha} bigha · Location-based crop & sample weather guidance.`
            : bn
            ? 'কোনো প্রোফাইল সংরক্ষিত নেই — "আমার প্রোফাইল" থেকে তথ্য যোগ করুন।'
            : 'No profile saved yet — add your details from My Profile.'
        }
        language={language}
        onToggleLanguage={onToggleLanguage}
        onNavigate={onNavigate}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Location Bar (64 Districts + Upazila) & Action Strip */}
        <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
            <div className="lg:col-span-5 space-y-1.5">
              <label
                htmlFor="dashboard-district-autocomplete"
                className="flex items-center gap-1.5 text-xs font-semibold text-[var(--kb-ink)]"
              >
                <MapPin className="w-3.5 h-3.5 text-[var(--kb-accent)]" />
                <span>
                  {bn
                    ? 'জেলা নির্বাচন করুন (বাংলাদেশের ৬৪ জেলা)'
                    : 'Select District (All 64 Bangladesh Districts)'}
                </span>
              </label>
              <DistrictAutocomplete
                language={language}
                valueId={districtSuggestion.district.id}
                onChange={handleDistrictChange}
                inputId="dashboard-district-autocomplete"
              />
            </div>

            <div className="lg:col-span-3 space-y-1.5">
              <label
                htmlFor="dashboard-upazila"
                className="block text-xs font-semibold text-[var(--kb-ink)]"
              >
                {bn ? 'উপজেলা লিখুন (এলাকাভিত্তিক নোট)' : 'Upazila (Local Context)'}
              </label>
              <input
                id="dashboard-upazila"
                type="text"
                value={upazilaInput}
                onChange={(e) => setUpazilaInput(e.target.value)}
                onBlur={handleUpazilaBlur}
                placeholder={bn ? 'যেমন: শিবগঞ্জ' : 'e.g., Shibganj'}
                className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
              />
              <p className="text-[11px] text-[var(--kb-ink-muted)] truncate">
                {!isDirectMatch
                  ? bn
                    ? `আবহাওয়া নমুনা: নিকটবর্তী ${weather.name.bn} অঞ্চল`
                    : `Sample weather baseline: ${weather.name.en} region`
                  : bn
                  ? `সরাসরি আবহাওয়া অঞ্চল: ${weather.region.bn}`
                  : `Regional weather model: ${weather.region.en}`}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap items-center lg:justify-end gap-2.5">
              <button
                type="button"
                onClick={() => onNavigate('profile')}
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface-muted)] hover:bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>{bn ? 'আমার প্রোফাইল' : 'My Profile'}</span>
              </button>
              {farmerProfile && (
                <button
                  type="button"
                  onClick={() => {
                    setDraftName(farmerProfile.name);
                    setDraftCrop(farmerProfile.primaryCrop);
                    setDraftSize(String(farmerProfile.farmSizeBigha));
                    setDraftSeason(farmerProfile.phoneNote);
                    setEditingProfile((prev) => !prev);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 text-xs font-semibold text-[var(--kb-ink-muted)] bg-[var(--kb-surface)] hover:bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>{bn ? 'দ্রুত সম্পাদনা' : 'Quick Edit'}</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => onNavigate('detect')}
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 text-xs font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ScanSearch className="w-3.5 h-3.5" />
                <span>{bn ? 'ক্রপ ডক্টর' : 'Crop Doctor'}</span>
              </button>
            </div>
          </div>

          {editingProfile && farmerProfile && (
            <div className="pt-4 border-t border-[var(--kb-border-subtle)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
              <div className="space-y-1">
                <label htmlFor="prof-name" className="block text-xs font-semibold text-[var(--kb-ink)]">
                  {bn ? 'কৃষকের নাম (নমুনা)' : 'Farmer Name'}
                </label>
                <input
                  id="prof-name"
                  type="text"
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  className="w-full min-h-[40px] px-3 py-1.5 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="prof-crop" className="block text-xs font-semibold text-[var(--kb-ink)]">
                  {bn ? 'প্রধান ফসল' : 'Primary Crop'}
                </label>
                <select
                  id="prof-crop"
                  value={draftCrop}
                  onChange={(e) => setDraftCrop(e.target.value as CropKey)}
                  className="w-full min-h-[40px] px-3 py-1.5 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                >
                  {CROP_OPTIONS.map((c) => (
                    <option key={c.key} value={c.key}>
                      {bn ? c.label.bn : c.label.en}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label htmlFor="prof-size" className="block text-xs font-semibold text-[var(--kb-ink)]">
                  {bn ? 'জমি (বিঘা)' : 'Area (Bigha)'}
                </label>
                <input
                  id="prof-size"
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={draftSize}
                  onChange={(e) => setDraftSize(e.target.value)}
                  className="w-full min-h-[40px] px-3 py-1.5 text-sm font-mono bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="prof-season" className="block text-xs font-semibold text-[var(--kb-ink)]">
                  {bn ? 'মৌসুম নোট' : 'Season Note'}
                </label>
                <input
                  id="prof-season"
                  type="text"
                  value={draftSeason}
                  onChange={(e) => setDraftSeason(e.target.value)}
                  className="w-full min-h-[40px] px-3 py-1.5 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onUpdateProfile) {
                      const updatedCrops = farmerProfile.preferredCrops.includes(draftCrop)
                        ? farmerProfile.preferredCrops
                        : [draftCrop, ...farmerProfile.preferredCrops];
                      onUpdateProfile({
                        ...farmerProfile,
                        name: draftName.trim() || farmerProfile.name,
                        districtId: selectedDistrictId,
                        upazila: upazilaInput.trim() || farmerProfile.upazila,
                        primaryCrop: draftCrop,
                        preferredCrops: updatedCrops,
                        farmSizeBigha: Math.max(0.5, Number(draftSize) || 1),
                        phoneNote: draftSeason.trim() || farmerProfile.phoneNote,
                      });
                    }
                    setEditingProfile(false);
                  }}
                  className="flex-1 min-h-[40px] px-4 py-2 text-xs font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg cursor-pointer"
                >
                  {bn ? 'সংরক্ষণ করুন' : 'Save Profile'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* LOCATION-BASED FARMING SUGGESTIONS CARD */}
        <section
          aria-label={bn ? 'অঞ্চলভিত্তিক ফসল পরামর্শ' : 'Location-Based Crop Suggestions'}
          className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 sm:p-6 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--kb-border-subtle)]">
            <div>
              <p className="text-xs font-semibold text-[var(--kb-accent)]">
                {bn ? districtSuggestion.zoneLabel.bn : districtSuggestion.zoneLabel.en} ·{' '}
                {bn ? districtSuggestion.lastReviewed.bn : districtSuggestion.lastReviewed.en}
              </p>
              <h2 className="text-lg font-bold text-[var(--kb-ink)] mt-0.5">
                {bn
                  ? `${districtSuggestion.district.bn}${upazilaInput.trim() ? ` (${upazilaInput.trim()})` : ''} — এলাকাভিত্তিক উপযোগী ফসল ও নমুনা পরামর্শ`
                  : `${districtSuggestion.district.en}${upazilaInput.trim() ? ` (${upazilaInput.trim()})` : ''} — Location-Based Crop Suggestions`}
              </h2>
            </div>
            <span className="text-[11px] font-medium text-[var(--kb-ink-muted)]">
              {bn ? districtSuggestion.sourceLabel.bn : districtSuggestion.sourceLabel.en}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-6 space-y-2.5 text-sm text-[var(--kb-ink-muted)] leading-relaxed">
              <p>
                <strong className="text-[var(--kb-ink)] font-semibold">
                  {bn ? 'মাটি ও জলবায়ু প্রোফাইল: ' : 'Soil & Climate Profile: '}
                </strong>
                {bn
                  ? districtSuggestion.soilAndClimateNote.bn
                  : districtSuggestion.soilAndClimateNote.en}
              </p>
              <p>
                <strong className="text-[var(--kb-brand-text)] font-semibold">
                  {bn ? 'মাঠ পরামর্শ: ' : 'Regional Tip: '}
                </strong>
                {bn
                  ? districtSuggestion.seasonalTip.bn
                  : districtSuggestion.seasonalTip.en}
              </p>
            </div>

            <div className="lg:col-span-6 space-y-2.5">
              <p className="text-xs font-semibold text-[var(--kb-ink)]">
                {bn
                  ? 'এই জেলার জন্য প্রস্তাবিত নমুনা ফসল (বিস্তারিত গাইড দেখতে ক্লিক করুন):'
                  : 'Recommended Sample Crops for This District (Click to Open Guide):'}
              </p>
              <div className="flex flex-wrap gap-2">
                {recommendedCropGuides.map((crop) => (
                  <button
                    key={crop.id}
                    type="button"
                    onClick={() =>
                      onOpenCultivationForCrop
                        ? onOpenCultivationForCrop(crop.id)
                        : onNavigate('cultivation')
                    }
                    className="inline-flex items-center gap-2 min-h-[40px] px-3.5 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface-sage)] hover:bg-[var(--kb-surface-sage-strong)] border border-[var(--kb-border)] hover:border-[var(--kb-accent)] rounded-lg transition-colors cursor-pointer"
                  >
                    <Sprout className="w-3.5 h-3.5 text-[var(--kb-accent)] shrink-0" />
                    <span>
                      {bn
                        ? `${crop.name.bn} (${crop.name.en})`
                        : `${crop.name.en} (${crop.name.bn})`}
                    </span>
                    <ArrowRight className="w-3 h-3 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4-Column KPI Summary Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-[var(--kb-ink-muted)]">
              <span>{bn ? 'তাপমাত্রা (নমুনা)' : 'Sample Temp'}</span>
              <Thermometer className="w-4 h-4 text-[var(--kb-accent)]" />
            </div>
            <p className="font-mono text-2xl sm:text-3xl font-bold text-[var(--kb-ink)] tabular-nums">
              {weather.tempC}°C
            </p>
            <p className="text-xs text-[var(--kb-ink-muted)] truncate">
              {bn ? weather.condition.bn : weather.condition.en}
            </p>
          </div>

          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-[var(--kb-ink-muted)]">
              <span>{bn ? 'আর্দ্রতা (নমুনা)' : 'Sample Humidity'}</span>
              <Droplets className="w-4 h-4 text-[var(--kb-accent)]" />
            </div>
            <p className="font-mono text-2xl sm:text-3xl font-bold text-[var(--kb-ink)] tabular-nums">
              {weather.humidityPercent}%
            </p>
            <p className="text-xs text-[var(--kb-ink-muted)]">
              {weather.humidityPercent >= 80
                ? bn
                  ? 'ছত্রাক পর্যবেক্ষণ প্রয়োজন'
                  : 'Fungal watch elevated'
                : bn
                ? 'স্বাভাবিক আর্দ্রতা'
                : 'Moderate humidity'}
            </p>
          </div>

          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-[var(--kb-ink-muted)]">
              <span>{bn ? 'বৃষ্টিপাত (নমুনা)' : 'Sample Rainfall'}</span>
              <CloudRain className="w-4 h-4 text-[var(--kb-blue)]" />
            </div>
            <p className="font-mono text-2xl sm:text-3xl font-bold text-[var(--kb-ink)] tabular-nums">
              {weather.rainfallMm} mm
            </p>
            <p className="text-xs text-[var(--kb-ink-muted)] tabular-nums">
              {bn
                ? `বাতাস: ${weather.windKmh} কিমি/ঘণ্টা`
                : `Wind: ${weather.windKmh} km/h`}
            </p>
          </div>

          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-medium text-[var(--kb-ink-muted)]">
              <span>{bn ? 'ডায়েরি ও প্রতিবেদন' : 'Journal & Reports'}</span>
              <FileText className="w-4 h-4 text-[var(--kb-brand-text)]" />
            </div>
            <p className="font-mono text-2xl sm:text-3xl font-bold text-[var(--kb-ink)] tabular-nums">
              {history.length} · {journalCount}
            </p>
            <div className="flex items-center justify-between gap-2 text-xs">
              <button
                type="button"
                onClick={() => onNavigate('history')}
                className="font-semibold text-[var(--kb-brand-text)] hover:text-[var(--kb-accent)] cursor-pointer"
              >
                {bn ? 'রিপোর্ট →' : 'History →'}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('calendar')}
                className="font-semibold text-[var(--kb-accent)] hover:text-[var(--kb-brand-text)] cursor-pointer"
              >
                {bn ? 'ডায়েরি →' : 'Journal →'}
              </button>
            </div>
          </div>
        </div>

        {/* Weather Warning Demonstration Banner */}
        <div
          role="region"
          aria-label={bn ? 'আবহাওয়া সতর্কতা প্রদর্শনী' : 'Weather warning demo'}
          className="bg-[var(--kb-warn-bg)] border border-[var(--kb-warn-border)] rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
        >
          <div className="flex items-start gap-3.5">
            <AlertTriangle className="w-5 h-5 text-[var(--kb-warn-icon)] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-bold text-[var(--kb-warn-title)]">
                  {bn ? weather.warningTitle.bn : weather.warningTitle.en}
                </h2>
                <span className="text-xs font-medium text-[var(--kb-warn-icon)]">
                  · {bn ? 'নমুনা সতর্কতা' : 'Demo Alert'}
                </span>
              </div>
              <p className="text-sm text-[var(--kb-warn-text)] leading-relaxed max-w-3xl">
                {bn ? weather.warningBody.bn : weather.warningBody.en}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('weather')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kb-warn-title)] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>{bn ? 'পূর্ণ আবহাওয়া দেখুন' : 'Full Forecast'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 9-Module Quick Access Strip */}
        <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[var(--kb-ink)]">
              {bn ? '৯টি ডেমো মডিউলে দ্রুত প্রবেশ' : 'Quick Launch — All 9 Demo Modules'}
            </h2>
            <span className="text-xs text-[var(--kb-ink-muted)]">
              {bn ? 'নমুনা প্রোটোটাইপ' : 'Interactive Demo'}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {[
              { route: 'detect' as PageRoute, icon: ScanSearch, bn: 'ক্রপ ডক্টর', en: 'Crop Doctor' },
              { route: 'cultivation' as PageRoute, icon: BookOpen, bn: 'চাষাবাদ গাইড', en: 'Cultivation' },
              { route: 'soil' as PageRoute, icon: Layers, bn: 'মাটি ও সেচ', en: 'Soil & Water' },
              { route: 'weather' as PageRoute, icon: CloudSun, bn: 'আবহাওয়া', en: 'Weather' },
              { route: 'assistant' as PageRoute, icon: MessageSquare, bn: 'বাংলা চ্যাট', en: 'Assistant' },
              { route: 'calendar' as PageRoute, icon: CalendarDays, bn: 'ক্যালেন্ডার ও ডায়েরি', en: 'Calendar & Journal' },
              { route: 'risk' as PageRoute, icon: Activity, bn: 'ঝুঁকি পূর্বাভাস', en: 'Risk Check' },
              { route: 'finance' as PageRoute, icon: Calculator, bn: 'খরচ ও লাভ', en: 'Expenses' },
              { route: 'community' as PageRoute, icon: Users, bn: 'কমিউনিটি', en: 'Community' },
            ].map((mod) => {
              const Icon = mod.icon;
              return (
                <button
                  key={mod.route}
                  type="button"
                  onClick={() => onNavigate(mod.route)}
                  className="flex flex-col items-start gap-2 p-3 rounded-lg bg-[var(--kb-surface-muted)] hover:bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] hover:border-[var(--kb-accent)] text-left transition-colors cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-[var(--kb-brand-text)]" />
                  <span className="text-xs font-semibold text-[var(--kb-ink)]">
                    {bn ? mod.bn : mod.en}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Farming Advice + Interactive Daily Checklist */}
          <div className="lg:col-span-7 space-y-6">
            {/* Actionable Farming Advice Cards */}
            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between gap-4 pb-3 border-b border-[var(--kb-border-subtle)]">
                <div>
                  <h2 className="text-lg font-bold text-[var(--kb-ink)]">
                    {bn
                      ? 'আবহাওয়াভিত্তিক করণীয় পরামর্শ (নমুনা)'
                      : 'Weather-Based Farming Advice (Sample)'}
                  </h2>
                  <p className="text-xs text-[var(--kb-ink-muted)]">
                    {bn
                      ? 'নির্বাচিত এলাকার আবহাওয়া অনুযায়ী দৈনন্দিন মাঠ পরামর্শ'
                      : 'Tailored to the selected sample district outlook'}
                  </p>
                </div>
                <Wind className="w-5 h-5 text-[var(--kb-brand-text)] shrink-0" />
              </div>

              <div className="divide-y divide-[var(--kb-border-subtle)]">
                {weather.farmingGuidance.map((item) => (
                  <div
                    key={item.id}
                    className="py-4 first:pt-1 last:pb-1 space-y-1.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-[var(--kb-ink)]">
                        {bn ? item.title.bn : item.title.en}
                      </h3>
                      <span
                        className={`text-xs font-semibold ${
                          item.priority === 'caution'
                            ? 'text-[var(--kb-amber)]'
                            : 'text-[var(--kb-accent)]'
                        }`}
                      >
                        {bn ? item.priorityLabel.bn : item.priorityLabel.en}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                      {bn ? item.detail.bn : item.detail.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Field Checklist */}
            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between gap-4 pb-3 border-b border-[var(--kb-border-subtle)]">
                <div>
                  <h2 className="text-lg font-bold text-[var(--kb-ink)]">
                    {bn
                      ? 'আজকের টেকসই মাঠ চেকলিস্ট'
                      : 'Daily Sustainable Field Checklist'}
                  </h2>
                  <p className="text-xs text-[var(--kb-ink-muted)]">
                    {bn
                      ? 'ক্লিক করে আজকের কাজগুলো সম্পন্ন চিহ্নিত করুন'
                      : 'Click items to track daily field practices locally'}
                  </p>
                </div>
                <span className="font-mono text-xs font-semibold text-[var(--kb-accent)] tabular-nums">
                  {completedCount}/{dailyTasks.length}{' '}
                  {bn ? 'সম্পন্ন' : 'Done'}
                </span>
              </div>

              <div className="space-y-2.5">
                {dailyTasks.map((task) => {
                  const checked = !!completedTasks[task.id];
                  return (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => toggleTask(task.id)}
                      className={`w-full text-left flex items-center gap-3 p-3.5 rounded-lg border transition-colors cursor-pointer ${
                        checked
                          ? 'bg-[var(--kb-surface-sage)] border-[var(--kb-accent)]/40 text-[var(--kb-brand-text)]'
                          : 'bg-[var(--kb-surface-muted)] border-[var(--kb-border)] text-[var(--kb-ink)] hover:border-[var(--kb-accent)]'
                      }`}
                    >
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-[var(--kb-accent)] shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-[var(--kb-ink-muted)] shrink-0" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          checked ? 'line-through opacity-80' : ''
                        }`}
                      >
                        {task.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Recent Disease Reports + Journal Quick Card + Quick Crop Doctor */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between gap-4 pb-3 border-b border-[var(--kb-border-subtle)]">
                <div>
                  <h2 className="text-lg font-bold text-[var(--kb-ink)]">
                    {bn ? 'সাম্প্রতিক রোগের প্রতিবেদন (নমুনা)' : 'Recent Sample Reports'}
                  </h2>
                  <p className="text-xs text-[var(--kb-ink-muted)]">
                    {bn
                      ? 'বিস্তারিত দেখতে যেকোনো রিপোর্টে ক্লিক করুন'
                      : 'Click any entry to review full sample diagnosis'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('history')}
                  className="text-xs font-semibold text-[var(--kb-brand-text)] hover:text-[var(--kb-accent)] whitespace-nowrap cursor-pointer"
                >
                  {bn ? 'সব দেখুন' : 'View All'}
                </button>
              </div>

              <div className="space-y-3">
                {recentReports.map((record) => (
                  <button
                    key={record.id}
                    type="button"
                    onClick={() => onOpenHistoryRecord(record)}
                    className="w-full text-left flex items-center gap-4 p-3 rounded-lg border border-[var(--kb-border-subtle)] hover:border-[var(--kb-accent)] hover:bg-[var(--kb-surface-muted)] transition-colors cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-[var(--kb-border)]">
                      <ResilientImage
                        src={record.imageUrl}
                        alt={bn ? record.diseaseName.bn : record.diseaseName.en}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-[var(--kb-ink-muted)]">
                        <span>{bn ? record.cropLabel.bn : record.cropLabel.en}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">
                          {bn ? record.date.bn : record.date.en}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-[var(--kb-ink)] truncate">
                        {bn ? record.diseaseName.bn : record.diseaseName.en}
                      </h3>
                      <p
                        className={`text-xs font-medium ${
                          record.severity === 'high'
                            ? 'text-[var(--kb-danger-text)]'
                            : 'text-[var(--kb-amber)]'
                        }`}
                      >
                        {bn ? record.severityLabel.bn : record.severityLabel.en}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--kb-ink-muted)] shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Farming Journal Quick Card */}
            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[var(--kb-brand-text)]">
                  <BookMarked className="w-4 h-4 text-[var(--kb-accent)]" />
                  <h2 className="text-base font-bold text-[var(--kb-ink)]">
                    {bn ? 'কৃষি ডায়েরি ও পর্যবেক্ষণ' : 'Farming Journal Notes'}
                  </h2>
                </div>
                <span className="font-mono text-xs font-semibold text-[var(--kb-accent)] tabular-nums">
                  {journalCount} {bn ? 'টি নোট' : 'entries'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? 'ফসলের রোপণের তারিখ, সেচ ও মাঠের দৈনন্দিন পর্যবেক্ষণ ব্রাউজারে সংরক্ষণ করুন এবং সময়মতো যাচাই করুন।'
                  : 'Keep local records of planting dates, soil moisture checks, and field observations inside your browser.'}
              </p>
              <button
                type="button"
                onClick={() => onNavigate('calendar')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--kb-brand-text)] hover:text-[var(--kb-accent)] cursor-pointer"
              >
                <span>{bn ? 'কৃষি ডায়েরি খুলুন' : 'Open Farming Journal'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Launch Card */}
            <div className="bg-[#14532D] dark:bg-[#113520] border border-[#1E5133] text-white rounded-xl p-6 space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-[#A7F3D0]">
                  {bn ? 'দ্রুত পরীক্ষা (প্রোটোটাইপ ডেমো)' : 'Quick Inspection (Demo)'}
                </p>
                <h2 className="text-xl font-bold text-white">
                  {bn
                    ? 'পাতায় কোনো দাগ বা পরিবর্তন দেখছেন?'
                    : 'Noticing unusual leaf spots on your crop?'}
                </h2>
                <p className="text-sm text-[#D1E2D7] leading-relaxed">
                  {bn
                    ? 'ফসল নির্বাচন করে পাতার ছবি আপলোড করুন এবং পূর্বনির্ধারিত নমুনা নির্দেশিকা দেখুন। চূড়ান্ত সিদ্ধান্তে অবশ্যই কৃষি কর্মকর্তার সহায়তা নিন।'
                    : 'Select a crop and preview a leaf photo to inspect sample symptoms and preventive steps, then verify with your local agriculture officer.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('detect')}
                className="w-full min-h-[44px] py-3 px-4 bg-white dark:bg-[#ECF4EE] text-[#14532D] hover:bg-[#EEF2EC] font-semibold text-sm rounded-lg transition-colors cursor-pointer"
              >
                {bn ? 'পাতার ছবি পরীক্ষা করুন' : 'Start Sample Leaf Check'}
              </button>
            </div>
          </div>
        </div>

        <SourceQualityNotice
          language={language}
          verifiedSource={{
            bn: 'বাংলাদেশের ৬৪ জেলা ও কৃষি-পরিবেশগত অঞ্চলের (AEZ / BARI / DAE) সাধারণ ফসল উপযোগিতা কাঠামো।',
            en: 'General crop suitability patterns across 64 Bangladesh districts modeled on AEZ / BARI / DAE guidelines.',
          }}
          demoScope={{
            bn: 'আবহাওয়া, ডায়েরি লগ, প্রোফাইল ও রোগ প্রতিবেদনসমূহ সম্পূর্ণ ব্রাউজারভিত্তিক নমুনা ডেমো। বাস্তব সিদ্ধান্তে ১৬১২৩-এ পরামর্শ নিন।',
            en: 'Weather values, journal logs, and diagnostic cards are browser-local prototype demos. Consult 16123 or local SAAO before field action.',
          }}
        />
      </div>
    </div>
  );
}
