import { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  ShieldAlert,
} from 'lucide-react';
import { CROP_OPTIONS } from '../data/krishiData';
import {
  BilingualText,
  CropKey,
  Language,
  PageRoute,
  RiskLevel,
} from '../types/krishi';
import { ExpertSupportCard } from './ExpertSupportCard';
import { SourceQualityNotice } from './SourceQualityNotice';
import { WorkspaceHeader } from './WorkspaceHeader';

interface DiseaseRiskPredictionProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
}

type RainFogCondition = 'dry' | 'cloudy' | 'rain_fog';
type FieldPractice = 'balanced' | 'dense_urea';

interface SimulatedRiskOutput {
  level: RiskLevel;
  score: number;
  headline: BilingualText;
  summary: BilingualText;
  factors: BilingualText[];
  actions: BilingualText[];
}

export function DiseaseRiskPrediction({
  language,
  onToggleLanguage,
  onNavigate,
}: DiseaseRiskPredictionProps) {
  const bn = language === 'bn';
  const [selectedCrop, setSelectedCrop] = useState<CropKey>('rice');
  const [humidity, setHumidity] = useState<number>(85);
  const [tempC, setTempC] = useState<number>(26);
  const [rainFog, setRainFog] = useState<RainFogCondition>('rain_fog');
  const [practice, setPractice] = useState<FieldPractice>('balanced');
  const [isPredicting, setIsPredicting] = useState<boolean>(false);

  const computeSimulatedRisk = (
    crop: CropKey,
    rh: number,
    temp: number,
    weatherCond: RainFogCondition,
    fieldPrac: FieldPractice
  ): SimulatedRiskOutput => {
    let points = 15;
    const factors: BilingualText[] = [];

    if (rh >= 82) {
      points += 35;
      factors.push({
        bn: `উচ্চ আর্দ্রতা (${rh}%) পাতায় দীর্ঘক্ষণ ভেজা ভাব তৈরি করে, যা ছত্রাকের বংশবিস্তার বাড়ায়।`,
        en: `High relative humidity (${rh}%) prolongs leaf wetness and favors fungal spore germination.`,
      });
    } else if (rh >= 68) {
      points += 18;
      factors.push({
        bn: `মাঝারি আর্দ্রতা (${rh}%) সকালের শিশিরের সাথে মিলিত হলে প্রাথমিক দাগের ঝুঁকি থাকে।`,
        en: `Moderate humidity (${rh}%) combined with morning dew creates mild lesion pressure.`,
      });
    } else {
      factors.push({
        bn: `নিম্ন থেকে সহনীয় আর্দ্রতা (${rh}%) অধিকাংশ ছত্রাকজনিত রোগের বিস্তার সীমিত রাখে।`,
        en: `Lower humidity (${rh}%) naturally limits rapid fungal spread across leaves.`,
      });
    }

    if (weatherCond === 'rain_fog') {
      points += 25;
      factors.push({
        bn:
          crop === 'potato'
            ? 'ঘন কুয়াশা ও গুঁড়ি গুঁড়ি বৃষ্টি আলুর মড়ক (Late Blight) রোগের প্রধান অনুঘটক।'
            : 'টানা বৃষ্টি বা ঘন কুয়াশা ফসলের পাতায় জীবাণু সংক্রমণের পরিবেশ তৈরি করে।',
        en:
          crop === 'potato'
            ? 'Persistent fog or drizzle is a primary driver for Potato Late Blight.'
            : 'Prolonged rain or fog sustains leaf wetness and spore splash.',
      });
    } else if (weatherCond === 'cloudy') {
      points += 12;
      factors.push({
        bn: 'মেঘলা আকাশে পর্যাপ্ত রোদ না থাকায় সকালের শিশির দেরিতে শুকায়।',
        en: 'Overcast skies slow down morning leaf drying.',
      });
    } else {
      factors.push({
        bn: 'শুষ্ক ও রৌদ্রোজ্জ্বল আবহাওয়া পাতার উপরিভাগ দ্রুত শুষ্ক রাখে।',
        en: 'Sunny, dry weather helps dry foliage rapidly after sunrise.',
      });
    }

    if (crop === 'potato' && temp >= 12 && temp <= 20) {
      points += 15;
      factors.push({
        bn: `শীতল তাপমাত্রা (${temp}° সে.) আলুর নাবি ধসা ছত্রাকের জন্য অনুকূল।`,
        en: `Cool temperatures (${temp}°C) align closely with late blight activity windows.`,
      });
    } else if (crop === 'rice' && temp >= 22 && temp <= 30) {
      points += 12;
      factors.push({
        bn: `নাতিশীতোষ্ণ তাপমাত্রা (${temp}° সে.) ও আর্দ্র রাত ধানের ব্লাস্টের ঝুঁকি বাড়ায়।`,
        en: `Moderate warmth (${temp}°C) paired with humid nights increases Rice Leaf Blast watch.`,
      });
    } else {
      factors.push({
        bn: `বর্তমান তাপমাত্রা (${temp}° সে.) ফসলের জন্য তুলনামূলক স্বাভাবিক পরিসরে রয়েছে।`,
        en: `Temperature (${temp}°C) remains within a manageable range for this crop.`,
      });
    }

    if (fieldPrac === 'dense_urea') {
      points += 15;
      factors.push({
        bn: 'অতিরিক্ত ইউরিয়া ও ঘন রোপণে গাছ নরম হয় এবং ভেতরে বাতাস চলাচল কমে যায়।',
        en: 'Excess nitrogen and dense spacing produce tender foliage with poor canopy airflow.',
      });
    } else {
      factors.push({
        bn: 'সুষম সার ও ফাঁকা সারিবদ্ধ রোপণ রোগের প্রাদুর্ভাব কমাতে সহায়তা করে।',
        en: 'Balanced fertilization and row spacing strengthen natural plant resilience.',
      });
    }

    const boundedScore = Math.min(96, Math.max(12, points));
    let level: RiskLevel = 'low';
    if (boundedScore >= 68) level = 'high';
    else if (boundedScore >= 42) level = 'medium';

    const cropName =
      CROP_OPTIONS.find((c) => c.key === crop)?.label || CROP_OPTIONS[0].label;

    const headline: BilingualText =
      level === 'high'
        ? {
            bn: `উচ্চ ঝুঁকি প্রদর্শনী — ${cropName.bn}`,
            en: `High Risk Demo — ${cropName.en}`,
          }
        : level === 'medium'
        ? {
            bn: `মাঝারি ঝুঁকি প্রদর্শনী — ${cropName.bn}`,
            en: `Medium Risk Demo — ${cropName.en}`,
          }
        : {
            bn: `নিম্ন ঝুঁকি প্রদর্শনী — ${cropName.bn}`,
            en: `Low Risk Demo — ${cropName.en}`,
          };

    const summary: BilingualText =
      level === 'high'
        ? {
            bn: 'নির্বাচিত আবহাওয়া ও মাঠের অবস্থায় রোগের অনুকূল পরিবেশ তৈরি হয়েছে। প্রতিদিন সকালে ক্ষেত পর্যবেক্ষণ ও কৃষি কর্মকর্তার পরামর্শ নেওয়ার প্রস্তুতি রাখুন।',
            en: 'Selected inputs reflect favorable conditions for leaf disease spread. Increase morning scouting and consult an agricultural officer before applying inputs.',
          }
        : level === 'medium'
        ? {
            bn: 'মাঝারি মাত্রার সতর্কতা প্রয়োজন। পাতার নিচের অংশ নিয়মিত দেখুন এবং আবহাওয়া আরও আর্দ্র হলে সতর্ক ব্যবস্থা নিন।',
            en: 'Moderate watch conditions simulated. Scout lower foliage regularly and monitor humidity shifts.',
          }
        : {
            bn: 'বর্তমান নমুনা শর্তে রোগ ছড়ানোর ঝুঁকি তুলনামূলক কম। নিয়মিত সাপ্তাহিক পরিচর্যা ও সুষম সার ব্যবস্থাপনা বজায় রাখুন।',
            en: 'Simulated disease pressure is low under current inputs. Maintain routine weekly field checks.',
          };

    const actions: BilingualText[] =
      level === 'high'
        ? [
            {
              bn: 'প্রতিদিন সকালে আক্রান্ত বা সন্দেহজনক পাতা পরীক্ষা করুন।',
              en: 'Inspect lower and middle canopy leaves every morning.',
            },
            {
              bn: 'অতিরিক্ত ইউরিয়া ও বিকেলের সেচ সাময়িকভাবে নিয়ন্ত্রণ করুন।',
              en: 'Avoid excess urea top-dressing and evening overhead watering.',
            },
            {
              bn: 'লক্ষণ দেখা দিলে উপজেলা কৃষি অফিস বা ১৬১২৩ নম্বরে যাচাই করুন।',
              en: 'Contact 16123 or your local officer if lesions appear.',
            },
          ]
        : level === 'medium'
        ? [
            {
              bn: 'সপ্তাহে ২-৩ দিন ক্ষেত ঘুরে আগাছা ও পুরোনো দাগযুক্ত পাতা সরিয়ে ফেলুন।',
              en: 'Scout 2–3 times weekly and remove weeds or heavily spotted lower leaves.',
            },
            {
              bn: 'বৃষ্টির পূর্বাভাস দেখে সার ও স্প্রে সময়সূচি ঠিক করুন।',
              en: 'Check rain forecasts before scheduling fertilizer or sprays.',
            },
          ]
        : [
            {
              bn: 'স্বাভাবিক সুষম সার ও পানি নিষ্কাশন ব্যবস্থা বজায় রাখুন।',
              en: 'Continue balanced nutrition and clear drainage channels.',
            },
            {
              bn: 'আবহাওয়া হঠাৎ মেঘলা বা কুয়াশাচ্ছন্ন হলে পুনরায় ঝুঁকি যাচাই করুন।',
              en: 'Re-check conditions if overcast or foggy weather arrives.',
            },
          ];

    return {
      level,
      score: boundedScore,
      headline,
      summary,
      factors,
      actions,
    };
  };

  const [result, setResult] = useState<SimulatedRiskOutput>(() =>
    computeSimulatedRisk('rice', 85, 26, 'rain_fog', 'balanced')
  );

  const handlePredict = () => {
    setIsPredicting(true);
    window.setTimeout(() => {
      setResult(
        computeSimulatedRisk(selectedCrop, humidity, tempC, rainFog, practice)
      );
      setIsPredicting(false);
    }, 550);
  };

  const levelStyles: Record<
    RiskLevel,
    { badgeText: string; container: string; iconColor: string; bar: string }
  > = {
    low: {
      badgeText: bn
        ? 'নিম্ন ঝুঁকি · DEMO SIMULATION'
        : 'Low Risk · DEMO SIMULATION',
      container:
        'bg-[var(--kb-surface-sage)] border-[var(--kb-accent)]/40 text-[var(--kb-brand-text)]',
      iconColor: 'text-[var(--kb-accent)]',
      bar: 'bg-[var(--kb-accent)]',
    },
    medium: {
      badgeText: bn
        ? 'মাঝারি ঝুঁকি · DEMO SIMULATION'
        : 'Medium Risk · DEMO SIMULATION',
      container:
        'bg-[var(--kb-warn-bg)] border-[var(--kb-warn-border)] text-[var(--kb-warn-title)]',
      iconColor: 'text-[var(--kb-warn-icon)]',
      bar: 'bg-[#D97706]',
    },
    high: {
      badgeText: bn
        ? 'উচ্চ ঝুঁকি · DEMO SIMULATION'
        : 'High Risk · DEMO SIMULATION',
      container:
        'bg-[var(--kb-danger-bg)] border-[var(--kb-danger-border)] text-[var(--kb-danger-strong)]',
      iconColor: 'text-[var(--kb-danger-text)]',
      bar: 'bg-[#B91C1C]',
    },
  };

  const activeStyle = levelStyles[result.level];

  return (
    <div className="bg-[var(--kb-canvas)] min-h-screen">
      <WorkspaceHeader
        breadcrumbLabel={bn ? 'রোগের ঝুঁকি পূর্বাভাস' : 'Disease Risk Prediction'}
        title={
          bn
            ? 'ফসলের রোগের ঝুঁকি পূর্বাভাস (নমুনা সিমুলেশন)'
            : 'Crop Disease Risk Prediction (Prototype Demo)'
        }
        subtitle={
          bn
            ? 'ফসল ও আবহাওয়ার শর্ত নির্বাচন করে নিম্ন, মাঝারি বা উচ্চ ঝুঁকির সিমুলেশন এবং কারণগুলো দেখুন।'
            : 'Adjust crop and weather parameters to see a simulated Low, Medium, or High risk assessment and explanation.'
        }
        language={language}
        onToggleLanguage={onToggleLanguage}
        onNavigate={onNavigate}
        backRoute="dashboard"
        backLabel={bn ? 'ড্যাশবোর্ড' : 'Dashboard'}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Transparent Demo Label */}
        <div className="bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-[var(--kb-brand-text)] shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--kb-ink)]">
            <strong className="font-semibold">
              {bn
                ? 'DEMO SIMULATION — এটি প্রকৃত পূর্বাভাস নয়: '
                : 'DEMO SIMULATION — Not a real prediction: '}
            </strong>
            <span className="text-[var(--kb-ink-muted)]">
              {bn
                ? 'এটি কেবল প্রোটোটাইপ প্রদর্শনের জন্য ব্রাউজারে নিয়মভিত্তিক নমুনা হিসাব। বাস্তব মাঠ সিদ্ধান্তের আগে কৃষি কর্মকর্তার পরামর্শ নিন।'
                : 'This module simulates rule-based educational risk levels locally in your browser and is not a real predictive model.'}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Parameter Controls */}
          <div className="lg:col-span-5 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-[var(--kb-ink)] pb-3 border-b border-[var(--kb-border-subtle)]">
              {bn ? 'শর্তাবলী নির্বাচন করুন' : 'Configure Field Conditions'}
            </h2>

            {/* Crop Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[var(--kb-ink)]">
                {bn ? '১. ফসল' : '1. Crop'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CROP_OPTIONS.map((crop) => {
                  const active = selectedCrop === crop.key;
                  return (
                    <button
                      key={crop.key}
                      type="button"
                      onClick={() => setSelectedCrop(crop.key)}
                      className={`min-h-[40px] px-3 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        active
                          ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                          : 'bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] border-[var(--kb-border)] hover:border-[var(--kb-accent)]'
                      }`}
                    >
                      {bn ? crop.label.bn : crop.label.en}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Humidity Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="risk-humidity" className="font-semibold text-[var(--kb-ink)]">
                  {bn ? '২. আপেক্ষিক আর্দ্রতা (%)' : '2. Relative Humidity (%)'}
                </label>
                <span className="font-mono font-bold text-[var(--kb-brand-text)] tabular-nums">
                  {humidity}%
                </span>
              </div>
              <input
                id="risk-humidity"
                type="range"
                min={40}
                max={98}
                value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                className="w-full accent-[#14532D] dark:accent-[#34D399] cursor-pointer"
              />
            </div>

            {/* Temperature Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="risk-temp" className="font-semibold text-[var(--kb-ink)]">
                  {bn ? '৩. তাপমাত্রা (°C)' : '3. Temperature (°C)'}
                </label>
                <span className="font-mono font-bold text-[var(--kb-brand-text)] tabular-nums">
                  {tempC}°C
                </span>
              </div>
              <input
                id="risk-temp"
                type="range"
                min={12}
                max={38}
                value={tempC}
                onChange={(e) => setTempC(Number(e.target.value))}
                className="w-full accent-[#14532D] dark:accent-[#34D399] cursor-pointer"
              />
            </div>

            {/* Weather Condition */}
            <div className="space-y-2">
              <label
                htmlFor="risk-weather"
                className="block text-xs font-semibold text-[var(--kb-ink)]"
              >
                {bn ? '৪. আবহাওয়ার ধরন' : '4. Weather Pattern'}
              </label>
              <select
                id="risk-weather"
                value={rainFog}
                onChange={(e) => setRainFog(e.target.value as RainFogCondition)}
                className="w-full min-h-[42px] px-3 py-2 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
              >
                <option value="dry">
                  {bn ? 'শুষ্ক ও রৌদ্রোজ্জ্বল' : 'Dry & Sunny'}
                </option>
                <option value="cloudy">
                  {bn ? 'মেঘলা বা মৃদু শিশির' : 'Cloudy / Moderate Dew'}
                </option>
                <option value="rain_fog">
                  {bn ? 'টানা বৃষ্টি বা ঘন কুয়াশা' : 'Heavy Rain or Dense Fog'}
                </option>
              </select>
            </div>

            {/* Field Practice */}
            <div className="space-y-2">
              <label
                htmlFor="risk-practice"
                className="block text-xs font-semibold text-[var(--kb-ink)]"
              >
                {bn ? '৫. সার ও রোপণ অবস্থা' : '5. Fertilizer & Spacing'}
              </label>
              <select
                id="risk-practice"
                value={practice}
                onChange={(e) => setPractice(e.target.value as FieldPractice)}
                className="w-full min-h-[42px] px-3 py-2 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
              >
                <option value="balanced">
                  {bn ? 'সুষম সার ও সারিবদ্ধ ফাঁকা রোপণ' : 'Balanced Fertilizer & Row Spacing'}
                </option>
                <option value="dense_urea">
                  {bn ? 'অতিরিক্ত ইউরিয়া বা ঘন রোপণ' : 'Excess Urea or Dense Canopy'}
                </option>
              </select>
            </div>

            <button
              type="button"
              onClick={handlePredict}
              disabled={isPredicting}
              className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] disabled:opacity-70 rounded-lg transition-colors cursor-pointer"
            >
              {isPredicting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>
                    {bn ? 'ঝুঁকি হিসাব হচ্ছে...' : 'Calculating Demo Risk...'}
                  </span>
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4" />
                  <span>
                    {bn ? 'ঝুঁকি বিশ্লেষণ করুন (ডেমো)' : 'Predict Risk (Demo)'}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Right Risk Result Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`border rounded-xl p-6 sm:p-8 space-y-5 ${activeStyle.container}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-sm font-bold">
                  {result.level === 'low' ? (
                    <CheckCircle2 className={`w-5 h-5 ${activeStyle.iconColor}`} />
                  ) : (
                    <ShieldAlert className={`w-5 h-5 ${activeStyle.iconColor}`} />
                  )}
                  <span>{activeStyle.badgeText}</span>
                </div>
                <span className="font-mono text-xs font-bold tabular-nums">
                  {bn
                    ? `নমুনা সূচক: ${result.score}/১০০ (ডেমো)`
                    : `Demo Index: ${result.score}/100`}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold">
                {bn ? result.headline.bn : result.headline.en}
              </h2>

              <div className="w-full h-2.5 bg-white/70 dark:bg-black/30 rounded-full overflow-hidden border border-black/5 dark:border-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${activeStyle.bar}`}
                  style={{ width: `${result.score}%` }}
                />
              </div>

              <p className="text-sm sm:text-[15px] leading-relaxed">
                {bn ? result.summary.bn : result.summary.en}
              </p>
            </div>

            {/* Explaining Factors */}
            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[var(--kb-border-subtle)]">
                <AlertTriangle className="w-5 h-5 text-[var(--kb-brand-text)]" />
                <h3 className="text-base sm:text-lg font-bold text-[var(--kb-ink)]">
                  {bn
                    ? 'এই নমুনা ফলাফলের পেছনের কারণসমূহ'
                    : 'Factors Behind This Simulated Result'}
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-[var(--kb-ink-muted)]">
                {result.factors.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="font-mono text-xs font-semibold text-[var(--kb-accent)] mt-0.5 tabular-nums">
                      0{idx + 1}.
                    </span>
                    <span>{bn ? f.bn : f.en}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preventive Actions */}
            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-[var(--kb-ink)] pb-3 border-b border-[var(--kb-border-subtle)]">
                {bn ? 'প্রস্তাবিত প্রতিরোধমূলক পদক্ষেপ' : 'Recommended Preventive Steps'}
              </h3>
              <ul className="space-y-2.5 text-sm text-[var(--kb-ink-muted)]">
                {result.actions.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[var(--kb-accent)] shrink-0 mt-0.5" />
                    <span>{bn ? act.bn : act.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <ExpertSupportCard language={language} context="risk" />

        <SourceQualityNotice
          language={language}
          verifiedSource={{
            bn: 'উচ্চ আর্দ্রতা, কুয়াশা, তাপমাত্রা ও অতিরিক্ত নাইট্রোজেন সার কীভাবে রোগের ঝুঁকি বাড়ায়—সে বিষয়ে প্রচলিত উদ্ভিদ রোগতত্ত্ব নীতি।',
            en: 'General plant-pathology links between prolonged humidity, fog, temperature, excess nitrogen, and fungal disease pressure.',
          }}
          demoScope={{
            bn: 'ঝুঁকি সূচক ও নিম্ন/মাঝারি/উচ্চ সিমুলেশন সম্পূর্ণ শিক্ষামূলক নিয়মভিত্তিক ডেমো—কোনো বাস্তব আবহাওয়া বা AI পূর্বাভাস নয়।',
            en: 'The numeric index and Low/Medium/High simulation are rule-based educational demos, not real-time field forecasting.',
          }}
        />
      </div>
    </div>
  );
}
