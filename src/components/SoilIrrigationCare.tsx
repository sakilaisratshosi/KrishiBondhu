import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  CloudRain,
  Droplets,
  Info,
  Layers,
  Leaf,
  RefreshCw,
  ShieldCheck,
  Sprout,
} from 'lucide-react';
import {
  CROP_CATEGORY_LABELS,
  CROP_CATEGORY_ORDER,
  CROP_CULTIVATION_GUIDES,
  CropCultivationGuide,
} from '../data/cropCultivationData';
import {
  GrowthStageKey,
  IRRIGATION_STAGE_GUIDES,
  SOIL_HEALTH_TOPICS,
  SOIL_IMPROVEMENT_PILLARS,
  SOIL_TYPE_PROFILES,
  SoilMoistureKey,
  SoilTypeKey,
  generateSoilIrrigationDemoPlan,
} from '../data/soilIrrigationData';
import { Language, PageRoute } from '../types/krishi';
import { ExpertSupportCard } from './ExpertSupportCard';
import { SourceQualityNotice } from './SourceQualityNotice';
import { WorkspaceHeader } from './WorkspaceHeader';

interface SoilIrrigationCareProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
  allCrops?: CropCultivationGuide[];
  selectedCropId?: string;
  onSelectCropId?: (cropId: string) => void;
}

export function SoilIrrigationCare({
  language,
  onToggleLanguage,
  onNavigate,
  allCrops = CROP_CULTIVATION_GUIDES,
  selectedCropId,
  onSelectCropId,
}: SoilIrrigationCareProps) {
  const bn = language === 'bn';

  // Interactive Planner States
  const [plannerCropId, setPlannerCropId] = useState<string>(
    selectedCropId || 'rice'
  );
  const [plannerSoil, setPlannerSoil] = useState<SoilTypeKey>('loamy');
  const [plannerStage, setPlannerStage] = useState<GrowthStageKey>('vegetative');
  const [plannerMoisture, setPlannerMoisture] =
    useState<SoilMoistureKey>('moist');
  const [planUpdatedAt, setPlanUpdatedAt] = useState<string>('');

  // Active Soil Type Card in Guide
  const [activeSoilTab, setActiveSoilTab] = useState<SoilTypeKey>('loamy');

  useEffect(() => {
    if (selectedCropId) {
      setPlannerCropId(selectedCropId);
    }
  }, [selectedCropId]);

  const selectedCrop = useMemo(
    () =>
      allCrops.find((c) => c.id === plannerCropId) ||
      allCrops[0] ||
      CROP_CULTIVATION_GUIDES[0],
    [allCrops, plannerCropId]
  );

  const cropsByCategory = useMemo(() => {
    return CROP_CATEGORY_ORDER.map((cat) => ({
      category: cat,
      label: CROP_CATEGORY_LABELS[cat],
      crops: allCrops
        .filter((c) => c.category === cat)
        .sort((a, b) => a.name.en.localeCompare(b.name.en)),
    })).filter((g) => g.crops.length > 0);
  }, [allCrops]);

  const demoPlan = useMemo(
    () =>
      generateSoilIrrigationDemoPlan(
        selectedCrop,
        plannerSoil,
        plannerStage,
        plannerMoisture
      ),
    [selectedCrop, plannerSoil, plannerStage, plannerMoisture]
  );

  const activeSoilProfile = useMemo(
    () =>
      SOIL_TYPE_PROFILES.find((s) => s.key === activeSoilTab) ||
      SOIL_TYPE_PROFILES[0],
    [activeSoilTab]
  );

  const handleGenerateClick = () => {
    const timeLabel = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setPlanUpdatedAt(timeLabel);
  };

  return (
    <div className="bg-[var(--kb-canvas)] min-h-screen">
      <WorkspaceHeader
        breadcrumbLabel={bn ? 'স্মার্ট মাটি ও সেচ ব্যবস্থাপনা' : 'Soil & Irrigation Care'}
        title={
          bn
            ? 'স্মার্ট মাটি ও সেচ ব্যবস্থাপনা ড্যাশবোর্ড (নমুনা)'
            : 'Smart Soil & Irrigation Care (Sample Guide)'
        }
        subtitle={
          bn
            ? 'বাংলাদেশের মাটির ধরন, মাটির স্বাস্থ্য ও pH, পর্যায়ভিত্তিক সেচ সময়সূচি এবং জলাবদ্ধতা প্রতিরোধের নির্দেশিকা দেখুন।'
            : 'Explore Bangladesh soil types, soil health, crop-stage irrigation timing, drainage practices, and an interactive demo planner.'
        }
        language={language}
        onToggleLanguage={onToggleLanguage}
        onNavigate={onNavigate}
        backRoute="dashboard"
        backLabel={bn ? 'ড্যাশবোর্ড' : 'Dashboard'}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Transparent Demo & Responsible Science Disclaimer */}
        <div className="bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-xl p-4 sm:p-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-[var(--kb-brand-text)] shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--kb-ink)] leading-relaxed">
            <strong className="font-semibold">
              {bn
                ? 'নমুনা নির্দেশিকা (ডেমো — নির্ধারিত মাত্রা নয়): '
                : 'Sample Agricultural Guide (Demo — Non-Prescriptive): '}
            </strong>
            <span className="text-[var(--kb-ink-muted)]">
              {bn
                ? 'সেচ ও সারের প্রকৃত পরিমাণ ফসলের জাত, বৃদ্ধির ধাপ, মাটি পরীক্ষা (SRDI), বৃষ্টিপাত ও জমির অবস্থার ওপর নির্ভরশীল। এলাকাভিত্তিক সিদ্ধান্তে উপজেলা কৃষি অফিস বা ১৬১২৩ নম্বরের সহায়তা নিন।'
                : 'Actual irrigation volume and fertilizer rates depend on crop variety, growth stage, SRDI soil testing, rainfall, and local field conditions. Consult local extension officers (16123) before field application.'}
            </span>
          </p>
        </div>

        {/* 1. INTERACTIVE SOIL & CROP PLANNER */}
        <section
          aria-label={bn ? 'ইন্টারঅ্যাক্টিভ মাটি ও সেচ পরিকল্পনাকারী' : 'Interactive Soil & Crop Planner'}
          className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--kb-border-subtle)]">
            <div>
              <p className="text-xs font-semibold text-[var(--kb-accent)]">
                {bn ? 'ইন্টারঅ্যাক্টিভ ডেমো টুল' : 'Interactive Demo Tool'}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--kb-ink)]">
                {bn
                  ? 'স্মার্ট মাটি ও ফসল সেচ পরিকল্পনাকারী'
                  : 'Interactive Soil & Crop Planner'}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => onNavigate('cultivation')}
                className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3.5 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface-sage)] hover:bg-[var(--kb-surface-sage-strong)] border border-[var(--kb-border)] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{bn ? 'ফসল জ্ঞানভাণ্ডার' : 'Crop Library'}</span>
              </button>
              <button
                type="button"
                onClick={handleGenerateClick}
                className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 text-xs font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>
                  {bn ? 'ডেমো পরামর্শ হালনাগাদ করুন' : 'Update Demo Plan'}
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Planner Selectors */}
            <div className="lg:col-span-5 space-y-4">
              {/* Crop Selector grouped by 8 categories */}
              <div className="space-y-1.5">
                <label
                  htmlFor="planner-crop"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn
                    ? `১. ফসল নির্বাচন করুন (${allCrops.length}টি ফসল)`
                    : `1. Select Crop (${allCrops.length} Crops)`}
                </label>
                <select
                  id="planner-crop"
                  value={plannerCropId}
                  onChange={(e) => {
                    setPlannerCropId(e.target.value);
                    onSelectCropId?.(e.target.value);
                  }}
                  className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                >
                  {cropsByCategory.map((group) => (
                    <optgroup
                      key={group.category}
                      label={bn ? group.label.bn : group.label.en}
                    >
                      {group.crops.map((crop) => (
                        <option key={crop.id} value={crop.id}>
                          {bn
                            ? `${crop.name.bn} (${crop.name.en})`
                            : `${crop.name.en} (${crop.name.bn})`}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Soil Type Selector */}
              <div className="space-y-1.5">
                <label
                  htmlFor="planner-soil"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn ? '২. মাটির ধরন নির্বাচন করুন' : '2. Select Soil Type'}
                </label>
                <select
                  id="planner-soil"
                  value={plannerSoil}
                  onChange={(e) => setPlannerSoil(e.target.value as SoilTypeKey)}
                  className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                >
                  {SOIL_TYPE_PROFILES.map((soil) => (
                    <option key={soil.key} value={soil.key}>
                      {bn ? soil.name.bn : soil.name.en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Growth Stage */}
              <div className="space-y-1.5">
                <span className="block text-xs font-semibold text-[var(--kb-ink)]">
                  {bn ? '৩. ফসলের বৃদ্ধির পর্যায়' : '3. Crop Growth Stage'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      {
                        key: 'planting',
                        bn: 'জমি তৈরি ও রোপণ',
                        en: 'Planting / Sowing',
                      },
                      {
                        key: 'vegetative',
                        bn: 'বাড়ন্ত পর্যায়',
                        en: 'Vegetative Growth',
                      },
                      {
                        key: 'flowering',
                        bn: 'ফুল ও ফল/দানা',
                        en: 'Flowering / Set',
                      },
                      {
                        key: 'ripening',
                        bn: 'পরিপক্বতা পর্যায়',
                        en: 'Ripening / Harvest',
                      },
                    ] as { key: GrowthStageKey; bn: string; en: string }[]
                  ).map((st) => (
                    <button
                      key={st.key}
                      type="button"
                      onClick={() => setPlannerStage(st.key)}
                      className={`min-h-[42px] px-3 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        plannerStage === st.key
                          ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                          : 'bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] border-[var(--kb-border)] hover:border-[var(--kb-accent)]'
                      }`}
                    >
                      {bn ? st.bn : st.en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sample Soil Moisture Condition */}
              <div className="space-y-1.5">
                <span className="block text-xs font-semibold text-[var(--kb-ink)]">
                  {bn
                    ? '৪. মাটির বর্তমান আর্দ্রতা (নমুনা অবস্থা)'
                    : '4. Sample Soil Moisture Condition'}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { key: 'dry', bn: 'শুষ্ক মাটি', en: 'Dry' },
                      { key: 'moist', bn: 'সহনীয় আর্দ্র', en: 'Moist' },
                      {
                        key: 'waterlogged',
                        bn: 'জলাবদ্ধ / ভেজা',
                        en: 'Waterlogged',
                      },
                    ] as { key: SoilMoistureKey; bn: string; en: string }[]
                  ).map((m) => (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setPlannerMoisture(m.key)}
                      className={`min-h-[42px] px-2.5 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        plannerMoisture === m.key
                          ? m.key === 'waterlogged'
                            ? 'bg-[#B45309] text-white border-[#B45309]'
                            : 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                          : 'bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] border-[var(--kb-border)] hover:border-[var(--kb-accent)]'
                      }`}
                    >
                      {bn ? m.bn : m.en}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Planner Demo Output Panel */}
            <div className="lg:col-span-7 bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-xl p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--kb-border)]">
                <h3 className="text-base sm:text-lg font-bold text-[var(--kb-ink)]">
                  {bn
                    ? `${selectedCrop.name.bn} — নমুনা মাটি ও সেচ পরামর্শ (ডেমো)`
                    : `${selectedCrop.name.en} — Demo Soil & Irrigation Guidance`}
                </h3>
                <span className="text-xs font-mono text-[var(--kb-accent)] tabular-nums">
                  {planUpdatedAt
                    ? bn
                      ? `হালনাগাদ: ${planUpdatedAt}`
                      : `Updated: ${planUpdatedAt}`
                    : bn
                    ? 'নমুনা প্রদর্শনী'
                    : 'Sample Demo'}
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[var(--kb-surface)] border border-[var(--kb-border)] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--kb-blue)]">
                    <Droplets className="w-4 h-4 shrink-0" />
                    <span>{bn ? 'সেচ পরামর্শ' : 'Irrigation Guidance'}</span>
                  </div>
                  <p className="text-sm text-[var(--kb-ink)] leading-relaxed">
                    {bn
                      ? demoPlan.irrigationAction.bn
                      : demoPlan.irrigationAction.en}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[var(--kb-surface)] border border-[var(--kb-border)] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--kb-brand-text)]">
                    <Layers className="w-4 h-4 shrink-0" />
                    <span>{bn ? 'মাটির যত্ন' : 'Soil Care Action'}</span>
                  </div>
                  <p className="text-sm text-[var(--kb-ink)] leading-relaxed">
                    {bn ? demoPlan.soilCareAction.bn : demoPlan.soilCareAction.en}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-[var(--kb-surface)] border border-[var(--kb-border)] space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-[var(--kb-accent)]">
                      <Leaf className="w-4 h-4 shrink-0" />
                      <span>{bn ? 'পুষ্টি ও সার সতর্কতা' : 'Nutrient Note'}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                      {bn ? demoPlan.nutrientNote.bn : demoPlan.nutrientNote.en}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--kb-surface)] border border-[var(--kb-border)] space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-[var(--kb-amber)]">
                      <CloudRain className="w-4 h-4 shrink-0" />
                      <span>
                        {bn ? 'বৃষ্টি ও নিষ্কাশন সতর্কতা' : 'Rainfall & Drainage'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                      {bn ? demoPlan.drainageWatch.bn : demoPlan.drainageWatch.en}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. SOIL TYPE GUIDE */}
        <section className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 sm:p-8 space-y-5">
          <div className="space-y-1 pb-3 border-b border-[var(--kb-border-subtle)]">
            <h2 className="text-xl font-bold text-[var(--kb-ink)]">
              {bn
                ? 'বাংলাদেশের মাটির ধরন ও ব্যবস্থাপনা গাইড'
                : 'Soil Type Guide (Bangladesh Agricultural Soils)'}
            </h2>
            <p className="text-sm text-[var(--kb-ink-muted)]">
              {bn
                ? 'এঁটেল, বেলে, দোআঁশ, পলি ও অন্যান্য মাটির বৈশিষ্ট্য ও উপযোগী ফসল দেখতে নির্বাচন করুন:'
                : 'Select a soil type below to inspect water retention, drainage behavior, and care tips:'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {SOIL_TYPE_PROFILES.map((soil) => {
              const active = soil.key === activeSoilTab;
              return (
                <button
                  key={soil.key}
                  type="button"
                  onClick={() => setActiveSoilTab(soil.key)}
                  className={`min-h-[42px] px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                      : 'bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] border-[var(--kb-border)] hover:border-[var(--kb-accent)]'
                  }`}
                >
                  {bn ? soil.name.bn : soil.name.en}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            <div className="lg:col-span-6 p-5 rounded-xl bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] space-y-4">
              <h3 className="text-lg font-bold text-[var(--kb-ink)]">
                {bn ? activeSoilProfile.name.bn : activeSoilProfile.name.en}
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[var(--kb-surface)] border border-[var(--kb-border)]">
                  <span className="text-[var(--kb-ink-muted)] block">
                    {bn ? 'পানি ধারণক্ষমতা' : 'Water Retention'}
                  </span>
                  <span className="font-bold text-[var(--kb-brand-text)] mt-0.5 block">
                    {bn
                      ? activeSoilProfile.waterRetention.bn
                      : activeSoilProfile.waterRetention.en}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[var(--kb-surface)] border border-[var(--kb-border)]">
                  <span className="text-[var(--kb-ink-muted)] block">
                    {bn ? 'পানি নিষ্কাশন' : 'Drainage Speed'}
                  </span>
                  <span className="font-bold text-[var(--kb-brand-text)] mt-0.5 block">
                    {bn
                      ? activeSoilProfile.drainageSpeed.bn
                      : activeSoilProfile.drainageSpeed.en}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-[var(--kb-ink)]">
                  {bn ? 'মূল বৈশিষ্ট্য' : 'Characteristics'}
                </h4>
                <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                  {bn
                    ? activeSoilProfile.characteristics.bn
                    : activeSoilProfile.characteristics.en}
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-[var(--kb-ink)]">
                  {bn ? 'উপযোগী ফসল' : 'Suitable Crops'}
                </h4>
                <p className="text-sm text-[var(--kb-brand-text)] font-medium leading-relaxed">
                  {bn
                    ? activeSoilProfile.suitableCrops.bn
                    : activeSoilProfile.suitableCrops.en}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 p-5 rounded-xl bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] space-y-3">
              <h4 className="text-base font-bold text-[var(--kb-ink)]">
                {bn ? 'মাটি পরিচর্যা ও ব্যবস্থাপনা পরামর্শ' : 'Soil Management Tips'}
              </h4>
              <ul className="space-y-3 text-sm text-[var(--kb-ink)]">
                {activeSoilProfile.careTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[var(--kb-accent)] shrink-0 mt-0.5" />
                    <span>{bn ? tip.bn : tip.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. SOIL HEALTH GUIDE */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-[var(--kb-ink)]">
              {bn
                ? 'মাটির স্বাস্থ্য নির্দেশিকা (pH, জৈব পদার্থ ও পুষ্টি)'
                : 'Soil Health Guide (pH, Fertility & Nutrients)'}
            </h2>
            <p className="text-sm text-[var(--kb-ink-muted)]">
              {bn
                ? 'দীর্ঘমেয়াদি সুস্থ ফলনের জন্য মাটির গুণাগুণ বোঝা ও বজায় রাখার মৌলিক নীতি'
                : 'Core principles for soil pH, organic matter, balanced plant nutrition, and land upkeep'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SOIL_HEALTH_TOPICS.map((topic) => (
              <div
                key={topic.id}
                className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-3"
              >
                <h3 className="text-base sm:text-lg font-bold text-[var(--kb-brand-text)]">
                  {bn ? topic.title.bn : topic.title.en}
                </h3>
                <p className="text-sm text-[var(--kb-ink)] leading-relaxed">
                  {bn ? topic.summary.bn : topic.summary.en}
                </p>
                <ul className="space-y-2 pt-1 text-sm text-[var(--kb-ink-muted)]">
                  {topic.keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="font-mono text-xs font-bold text-[var(--kb-accent)] mt-0.5">
                        ·
                      </span>
                      <span>{bn ? pt.bn : pt.en}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 4. SMART IRRIGATION GUIDE & WATERLOGGING PREVENTION */}
        <section className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--kb-border-subtle)]">
            <div>
              <h2 className="text-xl font-bold text-[var(--kb-ink)]">
                {bn
                  ? 'স্মার্ট সেচ, বৃষ্টিপাত বিবেচনা ও জলাবদ্ধতা প্রতিরোধ গাইড'
                  : 'Smart Irrigation Schedule & Waterlogging Prevention'}
              </h2>
              <p className="text-sm text-[var(--kb-ink-muted)]">
                {bn
                  ? 'বৃদ্ধির পর্যায়ভেদে নমুনা সেচের সময়সূচি এবং জল-নিকাশ ব্যবস্থাপনা'
                  : 'Sample stage-based irrigation timing, rain checks, and drainage safeguards'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('weather')}
              className="text-xs font-semibold text-[var(--kb-brand-text)] hover:text-[var(--kb-accent)] whitespace-nowrap cursor-pointer"
            >
              {bn ? 'আবহাওয়ার পূর্বাভাস দেখুন →' : 'Check Weather Forecast →'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {IRRIGATION_STAGE_GUIDES.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] space-y-2"
              >
                <h3 className="text-sm font-bold text-[var(--kb-ink)]">
                  {bn ? item.stage.bn : item.stage.en}
                </h3>
                <p className="text-xs font-semibold text-[var(--kb-blue)]">
                  {bn ? item.waterNeed.bn : item.waterNeed.en}
                </p>
                <p className="text-xs sm:text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                  {bn ? item.guidance.bn : item.guidance.en}
                </p>
              </div>
            ))}
          </div>

          {/* Rainfall Consideration & Waterlogging Prevention */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] space-y-2.5">
              <div className="flex items-center gap-2 text-[var(--kb-brand-text)]">
                <CloudRain className="w-5 h-5 shrink-0" />
                <h3 className="text-base font-bold text-[var(--kb-ink)]">
                  {bn
                    ? 'বৃষ্টিপাত ও মাটির আর্দ্রতা যাচাই'
                    : 'Rainfall & Soil Moisture Checks'}
                </h3>
              </div>
              <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? 'সেচ দেওয়ার আগে আগামী ৩–৫ দিনের বৃষ্টির পূর্বাভাস দেখে নিন। মাটির ৩–৪ ইঞ্চি নিচ থেকে এক মুঠো মাটি হাতে নিয়ে চাপ দিলে দলা পাকলে সাধারণত তাৎক্ষণিক সেচের প্রয়োজন হয় না।'
                  : 'Review 3–5 day rain forecasts before running pumps. Gently squeezing a handful of soil from root depth helps judge moisture: if it forms a damp ball cleanly, hold irrigation.'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--kb-warn-bg)] border border-[var(--kb-warn-border)] space-y-2.5">
              <div className="flex items-center gap-2 text-[var(--kb-warn-icon)]">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <h3 className="text-base font-bold text-[var(--kb-warn-title)]">
                  {bn
                    ? 'জলাবদ্ধতা প্রতিরোধ ও পানি নিষ্কাশন'
                    : 'Waterlogging Prevention & Drainage'}
                </h3>
              </div>
              <p className="text-sm text-[var(--kb-warn-text)] leading-relaxed">
                {bn
                  ? 'আলু, মরিচ, টমেটো, পেঁপে ও ডাল ফসলে কয়েক ঘণ্টার জলাবদ্ধতাও শিকড় পচা ও ঢলে পড়া রোগ ডেকে আনে। উঁচু বেডে চাষ করুন এবং ভারী বৃষ্টির আগে জমির আইলের নিকাশ মুখ খুলে রাখুন।'
                  : 'Even brief waterlogging damages potato, chili, tomato, papaya, and pulses. Use raised beds and clear perimeter drainage outlets ahead of heavy downpours.'}
              </p>
            </div>
          </div>
        </section>

        {/* 5. SOIL IMPROVEMENT RECOMMENDATIONS */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-[var(--kb-ink)]">
              {bn
                ? 'মাটির মান উন্নয়ন ও টেকসই সংরক্ষণ সুপারিশ'
                : 'Soil Improvement & Conservation Recommendations'}
            </h2>
            <p className="text-sm text-[var(--kb-ink-muted)]">
              {bn
                ? 'কম্পোস্ট, সুষম পুষ্টি ও পরিবেশবান্ধব সংরক্ষণের মাধ্যমে দীর্ঘমেয়াদি উর্বরতা রক্ষা'
                : 'Practical organic matter, responsible nutrient stewardship, and soil conservation practices'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOIL_IMPROVEMENT_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-3"
              >
                <div className="flex items-center gap-2 text-[var(--kb-brand-text)]">
                  {pillar.id === 'compost' ? (
                    <Sprout className="w-5 h-5 text-[var(--kb-accent)]" />
                  ) : pillar.id === 'nutrients' ? (
                    <ShieldCheck className="w-5 h-5 text-[var(--kb-brand-text)]" />
                  ) : (
                    <Leaf className="w-5 h-5 text-[var(--kb-accent)]" />
                  )}
                  <h3 className="text-base font-bold text-[var(--kb-ink)]">
                    {bn ? pillar.title.bn : pillar.title.en}
                  </h3>
                </div>
                <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                  {bn ? pillar.description.bn : pillar.description.en}
                </p>
                <ul className="space-y-2 pt-1 text-sm text-[var(--kb-ink)]">
                  {pillar.practices.map((pr, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[var(--kb-accent)] shrink-0 mt-0.5" />
                      <span>{bn ? pr.bn : pr.en}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <ExpertSupportCard language={language} context="soil" />

        <SourceQualityNotice
          language={language}
          verifiedSource={{
            bn: 'মৃত্তিকা সম্পদ উন্নয়ন ইনস্টিটিউট (SRDI), BARI এবং BRRI-এর মাটির ধরন, AWD সাশ্রয়ী সেচ ও জলাবদ্ধতা প্রতিরোধ নির্দেশিকা।',
            en: 'Bangladesh Soil Resource Development Institute (SRDI), BARI, and BRRI principles for soil texture, AWD irrigation, and drainage.',
          }}
          demoScope={{
            bn: 'পরিকল্পনাকারীর পরামর্শগুলো নমুনা নির্দেশিকা—জমিতে চুন বা সারের সুনির্দিষ্ট মাত্রার জন্য SRDI মাটি পরীক্ষা ও ১৬১২৩-এর পরামর্শ আবশ্যক।',
            en: 'Interactive planner outputs are non-prescriptive demo guides; verify field lime and fertilizer amounts via SRDI soil labs and 16123.',
          }}
        />
      </div>
    </div>
  );
}
