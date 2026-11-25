import { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  Check,
  Layers,
  RotateCcw,
  ShieldCheck,
  Sprout,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { BilingualText, Language, PageRoute } from '../types/krishi';
import { SourceQualityNotice } from './SourceQualityNotice';
import { WorkspaceHeader } from './WorkspaceHeader';

interface FinancialModelPageProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
}

interface ScenarioPreset {
  id: string;
  label: BilingualText;
  description: BilingualText;
  subscribers: number;
  monthlyPriceBdt: number;
  monthlyOperatingCostsBdt: number;
}

const DEFAULT_ASSUMPTIONS = {
  subscribers: 500,
  monthlyPriceBdt: 50,
  monthlyOperatingCostsBdt: 18000,
};

const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: 'savar-pilot',
    label: {
      bn: 'সাভার পাইলট (কাল্পনিক)',
      en: 'Savar Pilot (Hypothetical)',
    },
    description: {
      bn: 'প্রাথমিক কমিউনিটি পরীক্ষা ও কম ব্যবহারকারী পর্যায়',
      en: 'Early community validation stage assumptions',
    },
    subscribers: 250,
    monthlyPriceBdt: 40,
    monthlyOperatingCostsBdt: 14000,
  },
  {
    id: 'dhaka-division',
    label: {
      bn: 'ঢাকা বিভাগ বিস্তার (কাল্পনিক)',
      en: 'Dhaka Division (Hypothetical)',
    },
    description: {
      bn: 'আঞ্চলিক বিস্তারের মধ্যম স্তরের অনুমান',
      en: 'Regional divisional scale assumption example',
    },
    subscribers: 1500,
    monthlyPriceBdt: 50,
    monthlyOperatingCostsBdt: 38000,
  },
  {
    id: 'nationwide',
    label: {
      bn: 'জাতীয় পরিসর (কাল্পনিক)',
      en: 'Nationwide Scale (Hypothetical)',
    },
    description: {
      bn: '৬৪ জেলায় দীর্ঘমেয়াদি কাল্পনিক অনুমান',
      en: 'Long-term 64-district hypothetical scenario',
    },
    subscribers: 8000,
    monthlyPriceBdt: 50,
    monthlyOperatingCostsBdt: 190000,
  },
];

function sanitizeNumberInput(raw: string): number {
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }
  return Math.round(parsed);
}

export function FinancialModelPage({
  language,
  onToggleLanguage,
  onNavigate,
}: FinancialModelPageProps) {
  const bn = language === 'bn';

  const [subscribers, setSubscribers] = useState<number>(
    DEFAULT_ASSUMPTIONS.subscribers
  );
  const [monthlyPriceBdt, setMonthlyPriceBdt] = useState<number>(
    DEFAULT_ASSUMPTIONS.monthlyPriceBdt
  );
  const [monthlyOperatingCostsBdt, setMonthlyOperatingCostsBdt] =
    useState<number>(DEFAULT_ASSUMPTIONS.monthlyOperatingCostsBdt);
  const [activePresetId, setActivePresetId] = useState<string>('custom');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly'
  );
  const [demoUpgradeNotice, setDemoUpgradeNotice] = useState<boolean>(false);

  // Dynamic JavaScript Financial Calculations
  const monthlyEstimatedRevenueBdt = subscribers * monthlyPriceBdt;
  const monthlyProfitLossBdt =
    monthlyEstimatedRevenueBdt - monthlyOperatingCostsBdt;
  const isSurplus = monthlyProfitLossBdt >= 0;

  const annualProjectedRevenueBdt = monthlyEstimatedRevenueBdt * 12;
  const annualProjectedCostsBdt = monthlyOperatingCostsBdt * 12;
  const annualProjectedProfitLossBdt = monthlyProfitLossBdt * 12;

  const breakEvenSubscribers =
    monthlyPriceBdt > 0
      ? Math.ceil(monthlyOperatingCostsBdt / monthlyPriceBdt)
      : null;

  const marginPercent =
    monthlyEstimatedRevenueBdt > 0
      ? Math.round((monthlyProfitLossBdt / monthlyEstimatedRevenueBdt) * 100)
      : null;

  const maxBarValue = Math.max(
    monthlyEstimatedRevenueBdt,
    monthlyOperatingCostsBdt,
    1
  );
  const revenueBarWidthPct = Math.round(
    (monthlyEstimatedRevenueBdt / maxBarValue) * 100
  );
  const costBarWidthPct = Math.round(
    (monthlyOperatingCostsBdt / maxBarValue) * 100
  );

  const formatBdt = (value: number) => {
    const absFormatted = Math.abs(value).toLocaleString('en-US');
    return value < 0 ? `-৳ ${absFormatted}` : `৳ ${absFormatted}`;
  };

  const applyPreset = (preset: ScenarioPreset) => {
    setSubscribers(preset.subscribers);
    setMonthlyPriceBdt(preset.monthlyPriceBdt);
    setMonthlyOperatingCostsBdt(preset.monthlyOperatingCostsBdt);
    setActivePresetId(preset.id);
  };

  const handleReset = () => {
    setSubscribers(DEFAULT_ASSUMPTIONS.subscribers);
    setMonthlyPriceBdt(DEFAULT_ASSUMPTIONS.monthlyPriceBdt);
    setMonthlyOperatingCostsBdt(DEFAULT_ASSUMPTIONS.monthlyOperatingCostsBdt);
    setActivePresetId('custom');
  };

  return (
    <div className="bg-[var(--kb-canvas-alt)] min-h-screen">
      <WorkspaceHeader
        breadcrumbLabel={bn ? 'আর্থিক মডেল' : 'Financial Model'}
        title={
          bn
            ? 'আর্থিক মডেল ও আয়-ব্যয় প্রাক্কলন ক্যালকুলেটর'
            : 'Financial Model & Hypothetical Projection Calculator'
        }
        subtitle={
          bn
            ? 'প্রিমিয়াম গ্রাহক সংখ্যা, মাসিক ফি এবং পরিচালন ব্যয়ের অনুমান পরিবর্তন করে তাৎক্ষণিক মাসিক আয় ও লাভ-ক্ষতি হিসাব করুন।'
            : 'Adjust editable assumptions for premium subscribers, monthly subscription price, and operating costs to compute hypothetical revenue and profit/loss dynamically.'
        }
        language={language}
        onToggleLanguage={onToggleLanguage}
        onNavigate={onNavigate}
        backRoute="roadmap"
        backLabel={bn ? 'রোডম্যাপ' : 'Roadmap'}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Mandatory Hypothetical Projection Disclaimer */}
        <div
          role="note"
          className="bg-[var(--kb-warn-bg)] border border-[var(--kb-warn-border)] rounded-xl p-4 sm:p-5 flex items-start gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-[var(--kb-warn-icon)] shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm">
            <p className="font-bold text-[var(--kb-warn-title)]">
              {bn
                ? 'কাল্পনিক প্রাক্কলন — বাস্তব ব্যবসায়িক ফলাফল নয়'
                : 'Hypothetical Projections — Not Actual Business Performance'}
            </p>
            <p className="text-[var(--kb-warn-text)] text-xs sm:text-sm leading-relaxed">
              {bn
                ? 'নিচের সকল সংখ্যা, গ্রাহক অনুমান, মাসিক আয় এবং লাভ-ক্ষতির হিসাব কেবল পরিকল্পনা ও প্রদর্শনীর জন্য ব্রাউজারে জাভাস্ক্রিপ্ট দিয়ে গণনা করা কাল্পনিক প্রাক্কলন। এটি কোনো বাস্তব আয় বা যাচাইকৃত বাজার ফলাফল নির্দেশ করে না।'
                : 'All figures, subscriber assumptions, monthly revenues, and profit/loss outputs below are hypothetical projections calculated locally in JavaScript for planning purposes only—not actual revenue or proven business performance.'}
            </p>
          </div>
        </div>

        {/* Scenario Presets + Reset Strip */}
        <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h2 className="text-sm font-bold text-[var(--kb-ink)]">
              {bn
                ? 'কাল্পনিক দৃশ্যপট প্রিসেট (পরীক্ষা করুন)'
                : 'Hypothetical Scenario Presets'}
            </h2>
            <p className="text-xs text-[var(--kb-ink-muted)]">
              {bn
                ? 'যেকোনো ধাপের অনুমান লোড করুন অথবা নিচের ঘরে নিজের সংখ্যা লিখুন।'
                : 'Load an illustrative stage preset or edit any assumption value manually below.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {SCENARIO_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                  activePresetId === preset.id
                    ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                    : 'bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] border-[var(--kb-border)] hover:border-[var(--kb-accent)]'
                }`}
              >
                {bn ? preset.label.bn : preset.label.en}
              </button>
            ))}
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)] bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{bn ? 'রিসেট' : 'Reset'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Calculator Grid: Editable Inputs + Computed KPI Outputs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Editable Assumption Fields */}
          <div className="lg:col-span-5 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-6">
            <div className="space-y-1 pb-4 border-b border-[var(--kb-border-subtle)]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--kb-accent)]">
                <Calculator className="w-4 h-4" />
                <span>
                  {bn
                    ? 'সম্পাদনাযোগ্য অনুমানসমূহ (কাল্পনিক)'
                    : 'Editable Assumptions (Hypothetical)'}
                </span>
              </div>
              <h2 className="text-lg font-bold text-[var(--kb-ink)]">
                {bn ? 'আয় ও ব্যয়ের অনুমান নির্ধারণ করুন' : 'Configure Model Inputs'}
              </h2>
            </div>

            {/* Field 1: Number of premium subscribers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="input-subscribers"
                  className="text-sm font-semibold text-[var(--kb-ink)]"
                >
                  {bn
                    ? 'প্রিমিয়াম গ্রাহকের সংখ্যা'
                    : 'Number of Premium Subscribers'}
                </label>
                <span className="font-mono text-xs text-[var(--kb-ink-muted)] tabular-nums">
                  {subscribers.toLocaleString('en-US')} {bn ? 'জন' : 'users'}
                </span>
              </div>
              <input
                id="input-subscribers"
                type="number"
                min={0}
                max={1000000}
                value={subscribers}
                onChange={(e) => {
                  setSubscribers(sanitizeNumberInput(e.target.value));
                  setActivePresetId('custom');
                }}
                className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] focus:outline-none focus:border-[var(--kb-accent)]"
              />
              <input
                type="range"
                aria-label={
                  bn ? 'প্রিমিয়াম গ্রাহক স্লাইডার' : 'Premium subscribers slider'
                }
                min={0}
                max={20000}
                step={50}
                value={Math.min(subscribers, 20000)}
                onChange={(e) => {
                  setSubscribers(sanitizeNumberInput(e.target.value));
                  setActivePresetId('custom');
                }}
                className="w-full accent-[#14532D] dark:accent-[#34D399] cursor-pointer"
              />
            </div>

            {/* Field 2: Monthly subscription price */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="input-price"
                  className="text-sm font-semibold text-[var(--kb-ink)]"
                >
                  {bn
                    ? 'মাসিক সাবস্ক্রিপশন মূল্য (টাকা)'
                    : 'Monthly Subscription Price (BDT)'}
                </label>
                <span className="font-mono text-xs text-[var(--kb-ink-muted)] tabular-nums">
                  ৳ {monthlyPriceBdt.toLocaleString('en-US')} / {bn ? 'মাস' : 'mo'}
                </span>
              </div>
              <input
                id="input-price"
                type="number"
                min={0}
                max={50000}
                value={monthlyPriceBdt}
                onChange={(e) => {
                  setMonthlyPriceBdt(sanitizeNumberInput(e.target.value));
                  setActivePresetId('custom');
                }}
                className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] focus:outline-none focus:border-[var(--kb-accent)]"
              />
              <input
                type="range"
                aria-label={
                  bn ? 'সাবস্ক্রিপশন মূল্য স্লাইডার' : 'Subscription price slider'
                }
                min={0}
                max={500}
                step={10}
                value={Math.min(monthlyPriceBdt, 500)}
                onChange={(e) => {
                  setMonthlyPriceBdt(sanitizeNumberInput(e.target.value));
                  setActivePresetId('custom');
                }}
                className="w-full accent-[#14532D] dark:accent-[#34D399] cursor-pointer"
              />
            </div>

            {/* Field 3: Estimated monthly operating costs */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="input-costs"
                  className="text-sm font-semibold text-[var(--kb-ink)]"
                >
                  {bn
                    ? 'আনুমানিক মাসিক পরিচালন ব্যয় (টাকা)'
                    : 'Estimated Monthly Operating Costs (BDT)'}
                </label>
                <span className="font-mono text-xs text-[var(--kb-ink-muted)] tabular-nums">
                  ৳ {monthlyOperatingCostsBdt.toLocaleString('en-US')}
                </span>
              </div>
              <input
                id="input-costs"
                type="number"
                min={0}
                max={50000000}
                value={monthlyOperatingCostsBdt}
                onChange={(e) => {
                  setMonthlyOperatingCostsBdt(
                    sanitizeNumberInput(e.target.value)
                  );
                  setActivePresetId('custom');
                }}
                className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] focus:outline-none focus:border-[var(--kb-accent)]"
              />
              <input
                type="range"
                aria-label={
                  bn ? 'পরিচালন ব্যয় স্লাইডার' : 'Operating costs slider'
                }
                min={0}
                max={500000}
                step={2000}
                value={Math.min(monthlyOperatingCostsBdt, 500000)}
                onChange={(e) => {
                  setMonthlyOperatingCostsBdt(
                    sanitizeNumberInput(e.target.value)
                  );
                  setActivePresetId('custom');
                }}
                className="w-full accent-[#14532D] dark:accent-[#34D399] cursor-pointer"
              />
            </div>

            <div className="pt-3 border-t border-[var(--kb-border-subtle)] text-xs text-[var(--kb-ink-muted)] leading-relaxed space-y-1.5">
              <p>
                {bn
                  ? 'সূত্র: মাসিক আনুমানিক আয় = গ্রাহক সংখ্যা × মাসিক মূল্য; আনুমানিক লাভ/ক্ষতি = মাসিক আয় − মাসিক পরিচালন ব্যয়।'
                  : 'Formula: Monthly Estimated Revenue = Subscribers × Monthly Price; Estimated Profit/Loss = Monthly Revenue − Monthly Operating Costs.'}
              </p>
              <p>
                {bn
                  ? 'পরিচালন ব্যয়ের কাল্পনিক উপাদান: সার্ভার হোস্টিং ও রক্ষণাবেক্ষণ, আবহাওয়া/SMS সেবা ব্যয়, যাচাইকৃত কৃষি তথ্য হালনাগাদ এবং কৃষক সহায়তা।'
                  : 'Illustrative operating cost drivers: cloud hosting & maintenance, weather/alert feed fees, agronomic content review, and farmer support.'}
              </p>
            </div>
          </div>

          {/* Right Column: Live Calculated Outputs & Visual Breakdown */}
          <div className="lg:col-span-7 space-y-6">
            {/* 5-Field Summary Cards (clearly displaying all 5 required lines) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 space-y-1.5">
                <p className="text-xs font-medium text-[var(--kb-ink-muted)]">
                  {bn
                    ? 'মাসিক আনুমানিক আয় (কাল্পনিক প্রাক্কলন)'
                    : 'Monthly Estimated Revenue (Hypothetical)'}
                </p>
                <p className="text-2xl font-bold font-mono tabular-nums text-[var(--kb-brand-text)]">
                  {formatBdt(monthlyEstimatedRevenueBdt)}
                </p>
                <p className="text-xs text-[var(--kb-ink-muted)] tabular-nums">
                  {subscribers.toLocaleString('en-US')} × ৳{' '}
                  {monthlyPriceBdt.toLocaleString('en-US')}
                </p>
              </div>

              <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 space-y-1.5">
                <p className="text-xs font-medium text-[var(--kb-ink-muted)]">
                  {bn
                    ? 'আনুমানিক মাসিক লাভ / ক্ষতি (কাল্পনিক প্রাক্কলন)'
                    : 'Estimated Monthly Profit / Loss (Hypothetical)'}
                </p>
                <div className="flex items-center gap-2">
                  {isSurplus ? (
                    <TrendingUp className="w-5 h-5 text-[var(--kb-accent)] shrink-0" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-[var(--kb-danger-text)] shrink-0" />
                  )}
                  <p
                    className={`text-2xl font-bold font-mono tabular-nums ${
                      isSurplus ? 'text-[var(--kb-accent)]' : 'text-[var(--kb-danger-text)]'
                    }`}
                  >
                    {monthlyProfitLossBdt > 0 ? '+' : ''}
                    {formatBdt(monthlyProfitLossBdt)}
                  </p>
                </div>
                <p className="text-xs font-medium text-[var(--kb-ink-muted)]">
                  {isSurplus
                    ? bn
                      ? 'প্রাক্কলিত উদ্বৃত্ত (লাভ)'
                      : 'Projected Monthly Surplus (Hypothetical)'
                    : bn
                    ? 'প্রাক্কলিত ঘাটতি (ক্ষতি)'
                    : 'Projected Monthly Deficit (Hypothetical)'}
                </p>
              </div>
            </div>

            {/* Visual Comparison Bar & Key Planning Ratios */}
            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold text-[var(--kb-ink)]">
                  {bn
                    ? 'মাসিক আয় বনাম পরিচালন ব্যয় তুলনা (কাল্পনিক)'
                    : 'Monthly Revenue vs. Operating Costs (Hypothetical)'}
                </h3>
                <span className="text-xs text-[var(--kb-ink-muted)]">
                  {bn ? 'রিয়েল-টাইম গণনা' : 'Dynamic JS Calculation'}
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-[var(--kb-ink)]">
                      {bn ? 'মাসিক আনুমানিক আয়' : 'Monthly Estimated Revenue'}
                    </span>
                    <span className="font-mono font-semibold text-[var(--kb-brand-text)] tabular-nums">
                      {formatBdt(monthlyEstimatedRevenueBdt)}
                    </span>
                  </div>
                  <div className="h-3.5 bg-[var(--kb-surface-sage)] rounded-md overflow-hidden">
                    <div
                      className="h-full bg-[#059669] dark:bg-[#34D399] transition-all duration-200"
                      style={{ width: `${revenueBarWidthPct}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-[var(--kb-ink)]">
                      {bn ? 'মাসিক পরিচালন ব্যয়' : 'Monthly Operating Costs'}
                    </span>
                    <span className="font-mono font-semibold text-[var(--kb-amber)] tabular-nums">
                      {formatBdt(monthlyOperatingCostsBdt)}
                    </span>
                  </div>
                  <div className="h-3.5 bg-[var(--kb-surface-sage)] rounded-md overflow-hidden">
                    <div
                      className="h-full bg-[#D97706] dark:bg-[#FBBF24] transition-all duration-200"
                      style={{ width: `${costBarWidthPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* 3 Secondary Planning Indicators */}
              <div className="pt-4 border-t border-[var(--kb-border-subtle)] grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-[var(--kb-ink-muted)]">
                    {bn ? 'ব্রেক-ইভেন গ্রাহক (কাল্পনিক)' : 'Break-Even Subscribers'}
                  </p>
                  <p className="text-base font-bold font-mono tabular-nums text-[var(--kb-ink)] mt-0.5">
                    {breakEvenSubscribers !== null
                      ? `${breakEvenSubscribers.toLocaleString('en-US')} ${
                          bn ? 'জন' : 'users'
                        }`
                      : bn
                      ? 'প্রযোজ্য নয় (৳০)'
                      : 'N/A (৳0 price)'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--kb-ink-muted)]">
                    {bn ? 'প্রাক্কলিত মার্জিন' : 'Projected Margin'}
                  </p>
                  <p className="text-base font-bold font-mono tabular-nums text-[var(--kb-ink)] mt-0.5">
                    {marginPercent !== null ? `${marginPercent}%` : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--kb-ink-muted)]">
                    {bn ? '১২ মাসের কাল্পনিক নিট' : '12-Month Hypothetical Net'}
                  </p>
                  <p
                    className={`text-base font-bold font-mono tabular-nums mt-0.5 ${
                      annualProjectedProfitLossBdt >= 0
                        ? 'text-[var(--kb-accent)]'
                        : 'text-[var(--kb-danger-text)]'
                    }`}
                  >
                    {annualProjectedProfitLossBdt > 0 ? '+' : ''}
                    {formatBdt(annualProjectedProfitLossBdt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Structured 5-Line Summary Table */}
            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[var(--kb-border-subtle)] flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-[var(--kb-ink)]">
                  {bn
                    ? 'পূর্ণাঙ্গ অনুমান ও প্রাক্কলন বিবরণী (কাল্পনিক)'
                    : 'Complete Assumption & Projection Summary (Hypothetical)'}
                </h3>
                <span className="text-xs text-[var(--kb-ink-muted)]">
                  {bn ? '১২ মাসের হিসাবসহ' : 'Monthly & 12-Month View'}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-[var(--kb-surface-muted)] border-b border-[var(--kb-border)] text-xs font-semibold text-[var(--kb-ink-muted)]">
                      <th className="py-3 px-5">{bn ? 'বিবরণ' : 'Line Item'}</th>
                      <th className="py-3 px-5 text-right">{bn ? 'মাসিক (কাল্পনিক)' : 'Monthly (Hypothetical)'}</th>
                      <th className="py-3 px-5 text-right">{bn ? 'বার্ষিক ১২× (কাল্পনিক)' : 'Annual 12× (Hypothetical)'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--kb-border-subtle)] text-sm">
                    <tr>
                      <td className="py-3 px-5 text-[var(--kb-ink)]">
                        {bn ? 'প্রিমিয়াম গ্রাহকের সংখ্যা' : 'Number of premium subscribers'}
                      </td>
                      <td className="py-3 px-5 text-right font-mono tabular-nums text-[var(--kb-ink)]">
                        {subscribers.toLocaleString('en-US')}
                      </td>
                      <td className="py-3 px-5 text-right font-mono tabular-nums text-[var(--kb-ink-muted)]">
                        —
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-5 text-[var(--kb-ink)]">
                        {bn ? 'মাসিক সাবস্ক্রিপশন মূল্য' : 'Monthly subscription price'}
                      </td>
                      <td className="py-3 px-5 text-right font-mono tabular-nums text-[var(--kb-ink)]">
                        {formatBdt(monthlyPriceBdt)}
                      </td>
                      <td className="py-3 px-5 text-right font-mono tabular-nums text-[var(--kb-ink-muted)]">
                        {formatBdt(monthlyPriceBdt * 12)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-5 font-semibold text-[var(--kb-brand-text)]">
                        {bn ? 'মাসিক আনুমানিক আয়' : 'Monthly estimated revenue'}
                      </td>
                      <td className="py-3 px-5 text-right font-mono font-semibold tabular-nums text-[var(--kb-brand-text)]">
                        {formatBdt(monthlyEstimatedRevenueBdt)}
                      </td>
                      <td className="py-3 px-5 text-right font-mono font-semibold tabular-nums text-[var(--kb-brand-text)]">
                        {formatBdt(annualProjectedRevenueBdt)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-5 text-[var(--kb-ink)]">
                        {bn ? 'আনুমানিক মাসিক পরিচালন ব্যয়' : 'Estimated monthly operating costs'}
                      </td>
                      <td className="py-3 px-5 text-right font-mono tabular-nums text-[var(--kb-amber)]">
                        {formatBdt(monthlyOperatingCostsBdt)}
                      </td>
                      <td className="py-3 px-5 text-right font-mono tabular-nums text-[var(--kb-amber)]">
                        {formatBdt(annualProjectedCostsBdt)}
                      </td>
                    </tr>
                    <tr className="bg-[var(--kb-surface-muted)]">
                      <td className="py-3.5 px-5 font-bold text-[var(--kb-ink)]">
                        {bn ? 'আনুমানিক মাসিক লাভ / ক্ষতি' : 'Estimated monthly profit/loss'}
                      </td>
                      <td
                        className={`py-3.5 px-5 text-right font-mono font-bold tabular-nums ${
                          isSurplus ? 'text-[var(--kb-accent)]' : 'text-[var(--kb-danger-text)]'
                        }`}
                      >
                        {monthlyProfitLossBdt > 0 ? '+' : ''}
                        {formatBdt(monthlyProfitLossBdt)}
                      </td>
                      <td
                        className={`py-3.5 px-5 text-right font-mono font-bold tabular-nums ${
                          annualProjectedProfitLossBdt >= 0
                            ? 'text-[var(--kb-accent)]'
                            : 'text-[var(--kb-danger-text)]'
                        }`}
                      >
                        {annualProjectedProfitLossBdt > 0 ? '+' : ''}
                        {formatBdt(annualProjectedProfitLossBdt)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* FREE VS PROPOSED PREMIUM SUBSCRIPTION COMPARISON */}
        <section
          aria-labelledby="subscription-tiers-heading"
          className="space-y-6 pt-2"
        >
          {/* Section Header + Monthly/Yearly Toggle */}
          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--kb-accent)]">
                <Layers className="w-4 h-4" />
                <span>
                  {bn
                    ? 'প্রস্তাবিত সাবস্ক্রিপশন কাঠামো · বাজার যাচাই সাপেক্ষ'
                    : 'Proposed Subscription Tiers · Subject to Market Validation'}
                </span>
              </div>
              <h2
                id="subscription-tiers-heading"
                className="text-xl sm:text-2xl font-bold text-[var(--kb-ink)]"
              >
                {bn
                  ? 'ফ্রি বনাম প্রস্তাবিত প্রিমিয়াম পরিকল্পনা তুলনা'
                  : 'Free vs. Proposed Premium Subscription Plans'}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? 'সকল কৃষকের জন্য প্রয়োজনীয় মৌলিক চাষাবাদ তথ্য ফ্রি প্ল্যানে উন্মুক্ত থাকবে। প্রিমিয়াম মূল্য এবং সেবাসমূহ প্রস্তাবিত এবং এখনো বাণিজ্যিকভাবে চালু করা হয়নি।'
                  : 'Essential farming information always remains free. Premium pricing and services are proposed and not yet commercially launched.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
              <div
                role="group"
                aria-label={bn ? 'বিলিং সময়কাল প্রদর্শন' : 'Billing display toggle'}
                className="inline-flex items-center p-1 bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-lg self-start"
              >
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'bg-[var(--kb-surface)] text-[var(--kb-brand-text)] shadow-xs'
                      : 'text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)]'
                  }`}
                >
                  {bn ? 'মাসিক দেখুন' : 'Monthly Display'}
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    billingCycle === 'yearly'
                      ? 'bg-[var(--kb-surface)] text-[var(--kb-brand-text)] shadow-xs'
                      : 'text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)]'
                  }`}
                >
                  {bn ? 'বাৎসরিক দেখুন' : 'Yearly Display'}
                </button>
              </div>
            </div>
          </div>

          {/* Demo-Only Upgrade Confirmation Banner (when triggered) */}
          {demoUpgradeNotice && (
            <div
              role="status"
              className="bg-[var(--kb-surface-sage)] border border-[var(--kb-accent)] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[var(--kb-brand-text)] shrink-0 mt-0.5" />
                <div className="space-y-1 text-sm">
                  <p className="font-bold text-[var(--kb-brand-text)]">
                    {bn
                      ? 'ডেমো প্রিমিয়াম প্রিভিউ সক্রিয় (কোনো পেমেন্ট সংগ্রহ করা হয়নি)'
                      : 'Demo-Only Upgrade Preview Triggered (No Real Payment or Subscription)'}
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                    {bn
                      ? 'এটি কেবল একটি ডেমো বোতাম। কোনো পেমেন্ট নেওয়া হয়নি বা প্রকৃত সাবস্ক্রিপশন চালু হয়নি—প্রস্তাবিত ৳৯৯/মাস হার কেবল পরিকল্পনার অংশ। আপনি চাইলে ওপরের ক্যালকুলেটরে ৳৯৯ বসিয়ে হিসাব পরীক্ষা করতে পারেন।'
                      : 'This is a static Round 1 demonstration preview only. No payment is collected and no real subscription is activated. You can also apply Proposed ৳99/month into the calculator above to model projections.'}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setMonthlyPriceBdt(99);
                    setActivePresetId('custom');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  {bn ? 'ক্যালকুলেটরে ৳৯৯ বসিয়ে দেখুন' : 'Test ৳99 in Calculator'}
                </button>
                <button
                  type="button"
                  onClick={() => setDemoUpgradeNotice(false)}
                  className="px-3 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  {bn ? 'বন্ধ করুন' : 'Dismiss'}
                </button>
              </div>
            </div>
          )}

          {/* Free vs Proposed Premium Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* FREE PLAN CARD */}
            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div className="space-y-5">
                <div className="space-y-1.5 pb-5 border-b border-[var(--kb-border-subtle)]">
                  <p className="text-xs font-semibold text-[var(--kb-ink-muted)]">
                    {bn
                      ? 'ফ্রি প্ল্যান · সাধারণ ও ক্ষুদ্র কৃষকদের জন্য সর্বদা উন্মুক্ত'
                      : 'Free Plan · Open Core Access for All Farmers'}
                  </p>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-2xl font-bold text-[var(--kb-ink)]">
                      {bn ? 'ফ্রি প্ল্যান' : 'FREE PLAN'}
                    </h3>
                    <div className="text-right">
                      <span className="text-3xl font-bold font-mono tabular-nums text-[var(--kb-brand-text)]">
                        ৳ 0
                      </span>
                      <span className="text-xs text-[var(--kb-ink-muted)] ml-1">
                        /{billingCycle === 'monthly' ? (bn ? 'মাস' : 'month') : (bn ? 'বছর' : 'year')}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--kb-ink-muted)] tabular-nums">
                    {bn
                      ? 'মাসিক: ৳ ০/মাস · বাৎসরিক: ৳ ০/বছর (মৌলিক কৃষি তথ্য সর্বদা বিনামূল্যে)'
                      : 'Monthly: BDT 0/month · Yearly: BDT 0/year (Essential knowledge always free)'}
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-semibold text-[var(--kb-ink)]">
                    {bn ? 'অন্তর্ভুক্ত মৌলিক সুবিধাসমূহ:' : 'Included Essential Farming Features:'}
                  </p>
                  <ul className="space-y-2.5 text-sm text-[var(--kb-ink-muted)]">
                    {[
                      {
                        bn: 'মৌলিক ফসল চাষাবাদ নির্দেশিকা (Basic Crop Guide)',
                        en: 'Basic Crop Guide',
                      },
                      {
                        bn: 'সাধারণ আবহাওয়া তথ্য ও সতর্কতা (General Weather Information)',
                        en: 'General Weather Information',
                      },
                      {
                        bn: 'মৌলিক ক্রপ ডক্টর ব্যবহার (Basic Crop Doctor access)',
                        en: 'Basic Crop Doctor access',
                      },
                      {
                        bn: 'মৌলিক বাংলা কৃষি সহায়ক (Basic Farming Assistant)',
                        en: 'Basic Farming Assistant',
                      },
                      {
                        bn: 'সাধারণ মাটি ও সেচ নির্দেশিকা (General Soil & Irrigation Guide)',
                        en: 'General Soil & Irrigation Guide',
                      },
                      {
                        bn: 'মৌলিক খরচ হিসাব (Basic Expense Tracking)',
                        en: 'Basic Expense Tracking',
                      },
                    ].map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[var(--kb-accent)] shrink-0 mt-0.5" />
                        <span>{bn ? feat.bn : feat.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--kb-border-subtle)] flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-medium text-[var(--kb-ink-muted)]">
                  {bn ? 'বর্তমান প্রোটোটাইপে সক্রিয়' : 'Included in Prototype Demo'}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface-sage)] hover:bg-[var(--kb-surface-sage-strong)] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>{bn ? 'ফ্রি টুলস ব্যবহার করুন' : 'Use Free Features'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PROPOSED PREMIUM PLAN CARD */}
            <div className="bg-[#113520] dark:bg-[#0F2C1B] text-white border border-[#1E5133] rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div className="space-y-5">
                <div className="space-y-1.5 pb-5 border-b border-[#1E5133]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-[#6EE7B7]">
                      {bn
                        ? 'প্রস্তাবিত প্ল্যান · বাজার যাচাই সাপেক্ষ (ডেমো প্রদর্শনী)'
                        : 'Proposed Plan · Subject to Market Validation (Demo Only)'}
                    </p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#6EE7B7]/20 text-[#A7F3D0] border border-[#6EE7B7]/40">
                      {bn ? 'সুপারিশকৃত' : 'Recommended'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-2xl font-bold text-white">
                      {bn ? 'প্রিমিয়াম প্ল্যান' : 'PREMIUM PLAN'}
                    </h3>
                    <div className="text-right">
                      <span className="text-xs font-medium text-[#6EE7B7] block">
                        {bn ? 'প্রস্তাবিত মূল্য' : 'Proposed'}
                      </span>
                      <span className="text-3xl font-bold font-mono tabular-nums text-white">
                        {billingCycle === 'monthly' ? '৳ 99' : '৳ 990'}
                      </span>
                      <span className="text-xs text-[#D1E2D7] ml-1">
                        /{billingCycle === 'monthly' ? (bn ? 'মাস' : 'month') : (bn ? 'বছর' : 'year')}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#D1E2D7] tabular-nums">
                    {billingCycle === 'monthly'
                      ? bn
                        ? 'মাসিক: প্রস্তাবিত ৳৯৯/মাস · বাৎসরিক বিকল্প: প্রস্তাবিত ৳৯৯০/বছর (বাজার যাচাই সাপেক্ষ)'
                        : 'Monthly: Proposed BDT 99/month · Yearly option: Proposed BDT 990/year (subject to validation)'
                      : bn
                      ? 'বাৎসরিক: প্রস্তাবিত ৳৯৯০/বছর (মাসে ~৳৮২.৫ · প্রস্তাবিত ৳৯৯/মাস ভিত্তিক)'
                      : 'Yearly: Proposed BDT 990/year (~BDT 82.5/mo equiv. vs Proposed BDT 99/month)'}
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-semibold text-[#6EE7B7]">
                    {bn
                      ? 'ফ্রি প্ল্যানের সব সুবিধাসহ অতিরিক্ত প্রিমিয়াম সুবিধা:'
                      : 'Everything in Free, plus Additional Premium Capabilities:'}
                  </p>
                  <ul className="space-y-2.5 text-sm text-[#E6ECE7]">
                    {[
                      {
                        bn: 'ব্যক্তিগতকৃত ফসল পরিকল্পনা (Personalized Crop Planning)',
                        en: 'Personalized Crop Planning',
                      },
                      {
                        bn: 'একাধিক জমি ও খামার ব্যবস্থাপনা (Multiple Farm Management)',
                        en: 'Multiple Farm Management',
                      },
                      {
                        bn: 'উন্নত ফসল ক্যালেন্ডার ও রিমাইন্ডার (Advanced Crop Calendar and Reminders)',
                        en: 'Advanced Crop Calendar and Reminders',
                      },
                      {
                        bn: 'বিস্তারিত আয় ও ব্যয় প্রতিবেদন (Detailed Income & Expense Reports)',
                        en: 'Detailed Income & Expense Reports',
                      },
                      {
                        bn: 'ফসল বিক্রয় ও ন্যায্যমূল্য তুলনা (Crop Sales and Fair Price Comparison)',
                        en: 'Crop Sales and Fair Price Comparison',
                      },
                      {
                        bn: 'চাষাবাদের ইতিহাস ও প্রতিবেদন এক্সপোর্ট (Farming History and Report Export)',
                        en: 'Farming History and Report Export',
                      },
                      {
                        bn: 'ব্যক্তিগতকৃত চাষাবাদ রিমাইন্ডার (Personalized Farming Reminders)',
                        en: 'Personalized Farming Reminders',
                      },
                      {
                        bn: 'অগ্রাধিকারভিত্তিক বিশেষজ্ঞ পরামর্শ (Priority Expert Consultation Access — ভবিষ্যৎ সেবা)',
                        en: 'Priority Expert Consultation Access (future service)',
                      },
                    ].map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#6EE7B7] shrink-0 mt-0.5" />
                        <span>{bn ? feat.bn : feat.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1E5133] flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-[#D1E2D7]">
                  {bn
                    ? 'ডেমো বাটন · বাস্তব পেমেন্ট নয়'
                    : 'Demo-only action · No real billing'}
                </span>
                <button
                  type="button"
                  onClick={() => setDemoUpgradeNotice(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#14532D] bg-white dark:bg-[#ECF4EE] hover:bg-[#EEF2EC] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>
                    {bn
                      ? 'ডেমো আপগ্রেড দেখুন (প্রিভিউ)'
                      : 'Upgrade (Demo Only)'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Feature Comparison Matrix Table */}
          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--kb-border-subtle)] flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-[var(--kb-ink)]">
                  {bn
                    ? 'বিস্তারিত সুবিধা তুলনামূলক সারণি (ফ্রি বনাম প্রস্তাবিত প্রিমিয়াম)'
                    : 'Free vs. Proposed Premium Feature Comparison Matrix'}
                </h3>
                <p className="text-xs text-[var(--kb-ink-muted)] mt-0.5">
                  {bn
                    ? 'প্রস্তাবিত মূল্য (৳০ বনাম ৳৯৯/মাস বা ৳৯৯০/বছর) বাজার যাচাই সাপেক্ষ।'
                    : 'Proposed pricing (BDT 0 vs. BDT 99/month or BDT 990/year) is illustrative and subject to market validation.'}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[680px]">
                <thead>
                  <tr className="bg-[var(--kb-surface-muted)] border-b border-[var(--kb-border)] text-xs font-semibold text-[var(--kb-ink-muted)]">
                    <th className="py-3.5 px-5">{bn ? 'বৈশিষ্ট্য / সেবা' : 'Capability'}</th>
                    <th className="py-3.5 px-5">
                      {bn ? 'ফ্রি প্ল্যান (৳ ০/মাস)' : 'Free Plan (BDT 0/mo)'}
                    </th>
                    <th className="py-3.5 px-5 text-[var(--kb-brand-text)]">
                      {bn
                        ? 'প্রিমিয়াম (প্রস্তাবিত ৳ ৯৯/মাস)'
                        : 'Premium (Proposed BDT 99/mo)'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--kb-border-subtle)] text-sm">
                  {[
                    {
                      capability: {
                        bn: 'ফসল চাষাবাদ ও মাটি-সেচ নির্দেশিকা',
                        en: 'Crop, Soil & Irrigation Guides',
                      },
                      free: {
                        bn: 'সাধারণ ফসল, মাটি ও সেচ গাইড (সর্বদা উন্মুক্ত)',
                        en: 'Basic crop, soil & irrigation guides (always open)',
                      },
                      premium: {
                        bn: 'সম্পূর্ণ নির্দেশিকা + ব্যক্তিগতকৃত ফসল পরিকল্পনা',
                        en: 'Full library + Personalized Crop Planning',
                      },
                    },
                    {
                      capability: {
                        bn: 'ক্রপ ডক্টর ও বাংলা কৃষি সহায়ক',
                        en: 'Crop Doctor & Farming Assistant',
                      },
                      free: {
                        bn: 'মৌলিক ক্রপ ডক্টর ও বাংলা সহায়ক সুবিধা',
                        en: 'Basic Crop Doctor & Bangla Assistant access',
                      },
                      premium: {
                        bn: 'অগ্রাধিকার বিশেষজ্ঞ পরামর্শ (ভবিষ্যৎ সেবা)',
                        en: 'Includes Priority Expert Consultation (future service)',
                      },
                    },
                    {
                      capability: {
                        bn: 'আবহাওয়া ও ফসল ক্যালেন্ডার',
                        en: 'Weather & Crop Calendar',
                      },
                      free: {
                        bn: 'সাধারণ আবহাওয়া তথ্য ও মৌলিক সূচি',
                        en: 'General weather information & basic stage view',
                      },
                      premium: {
                        bn: 'উন্নত ক্যালেন্ডার ও ব্যক্তিগতকৃত রিমাইন্ডার',
                        en: 'Advanced Crop Calendar & Personalized Reminders',
                      },
                    },
                    {
                      capability: {
                        bn: 'খামার ও জমি ব্যবস্থাপনা',
                        en: 'Farm & Plot Management',
                      },
                      free: {
                        bn: 'একক সাধারণ খামার প্রোফাইল',
                        en: 'Single basic farm profile',
                      },
                      premium: {
                        bn: 'একাধিক জমি ও খামার ব্যবস্থাপনা',
                        en: 'Multiple Farm & Plot Management',
                      },
                    },
                    {
                      capability: {
                        bn: 'আয়, ব্যয় ও ন্যায্যমূল্য হিসাব',
                        en: 'Income, Expense & Fair Price',
                      },
                      free: {
                        bn: 'মৌলিক খরচ হিসাব',
                        en: 'Basic Expense Tracking',
                      },
                      premium: {
                        bn: 'বিস্তারিত আয়-ব্যয় প্রতিবেদন ও ফসল বিক্রয় ন্যায্যমূল্য তুলনা',
                        en: 'Detailed Income/Expense Reports & Fair Price Comparison',
                      },
                    },
                    {
                      capability: {
                        bn: 'ইতিহাস ও প্রতিবেদন সংরক্ষণ',
                        en: 'Farming History & Export',
                      },
                      free: {
                        bn: 'অ্যাপের ভেতরে সাধারণ ইতিহাস দেখা',
                        en: 'Standard in-app history view',
                      },
                      premium: {
                        bn: 'সম্পূর্ণ চাষাবাদ ইতিহাস ও প্রতিবেদন রপ্তানি (Export)',
                        en: 'Full Farming History & Report Export',
                      },
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-[var(--kb-surface-muted)] transition-colors">
                      <td className="py-3.5 px-5 font-semibold text-[var(--kb-ink)]">
                        {bn ? row.capability.bn : row.capability.en}
                      </td>
                      <td className="py-3.5 px-5 text-[var(--kb-ink-muted)]">
                        {bn ? row.free.bn : row.free.en}
                      </td>
                      <td className="py-3.5 px-5 font-medium text-[var(--kb-brand-text)]">
                        {bn ? row.premium.bn : row.premium.en}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Why Upgrade to Premium? Practical Farmer Benefits */}
          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 sm:p-8 space-y-5">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--kb-accent)]">
                <Sprout className="w-4 h-4" />
                <span>{bn ? 'কৃষকের ব্যবহারিক উপকারিতা' : 'Practical Farmer Value'}</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--kb-ink)]">
                {bn ? 'কেন প্রিমিয়াম প্ল্যানে উন্নীত হবেন?' : 'Why Upgrade to Premium?'}
              </h3>
              <p className="text-sm text-[var(--kb-ink-muted)]">
                {bn
                  ? 'মৌলিক তথ্য ফ্রি রেখেই বড় বা বাণিজ্যিক চাষিদের জন্য বাড়তি পরিকল্পনা ও আয়-ব্যয় বিশ্লেষণ সুবিধা।'
                  : 'Designed for farmers managing multiple plots or commercial harvests who need deeper financial and seasonal planning beyond free basics.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  index: '01',
                  title: {
                    bn: 'নিট আয় ও ন্যায্যমূল্যের স্পষ্ট হিসাব',
                    en: 'Clear Net Profit & Fair Price Tracking',
                  },
                  body: {
                    bn: 'পরিবহন, শ্রমিক ও বাজার ফি বাদ দিয়ে প্রকৃত লাভ এবং স্থানীয় বাজারের রেফারেন্স দরের পার্থক্য সহজে বোঝা যায়।',
                    en: 'See real take-home income after transport and market fees alongside local reference price comparisons.',
                  },
                },
                {
                  index: '02',
                  title: {
                    bn: 'একাধিক জমির ফসল পরিকল্পনা',
                    en: 'Manage Multiple Farms & Crop Cycles',
                  },
                  body: {
                    bn: 'আলাদা জমির ফসল, রোপণ তারিখ ও কাজের সূচি এক ড্যাশবোর্ডে গুছিয়ে রাখা সম্ভব হয়।',
                    en: 'Keep separate crop schedules, planting dates, and field records organized across multiple plots.',
                  },
                },
                {
                  index: '03',
                  title: {
                    bn: 'সময়মতো সেচ ও পরিচর্যার রিমাইন্ডার',
                    en: 'Timely Stage Reminders',
                  },
                  body: {
                    bn: 'রোগের ঝুঁকি দেখা দিলে বা সারের ধাপ এলে ব্যক্তিগতকৃত রিমাইন্ডারের মাধ্যমে সময়মতো ব্যবস্থা নেওয়া সহজ হয়।',
                    en: 'Personalized stage reminders help avoid missed scouting, drainage, or top-dressing windows.',
                  },
                },
                {
                  index: '04',
                  title: {
                    bn: 'মৌসুমি প্রতিবেদন ও ভবিষ্যৎ বিশেষজ্ঞ সহায়তা',
                    en: 'Exportable History & Future Priority Help',
                  },
                  body: {
                    bn: 'সারা বছরের আয়-ব্যয় ও রোগের নথি সংরক্ষণ করে কৃষি অফিসার বা ঋণ সহায়তার জন্য প্রতিবেদন তৈরি করা যায়।',
                    en: 'Export seasonal histories for record reviews and access priority expert consultation once introduced.',
                  },
                },
              ].map((card) => (
                <div
                  key={card.index}
                  className="p-5 bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-xl space-y-2"
                >
                  <span className="font-mono text-xs font-semibold text-[var(--kb-accent)] tabular-nums">
                    {card.index}.
                  </span>
                  <h4 className="text-sm font-bold text-[var(--kb-ink)]">
                    {bn ? card.title.bn : card.title.en}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                    {bn ? card.body.bn : card.body.en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Access Principle & Cross-Link */}
        <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <h3 className="text-base font-bold text-[var(--kb-ink)]">
              {bn
                ? 'মূল ফসল নির্দেশিকা সর্বদা উন্মুক্ত রাখার নীতি'
                : 'Open Core Access Principle'}
            </h3>
            <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
              {bn
                ? 'ক্ষুদ্র ও প্রান্তিক কৃষকদের জন্য মৌলিক রোগ সচেতনতা, ১৬১২৩ রেফারেল ও চাষাবাদ জ্ঞানভাণ্ডার উন্মুক্ত রেখে একাধিক জমি/বাণিজ্যিক চাষিদের জন্য ঐচ্ছিক প্রিমিয়াম টুলস বিবেচনা করা হয়েছে। ভবিষ্যতে অগ্রাধিকার পরামর্শ বা কৃষি-উপকরণ অংশীদারিত্বের মতো B2B/পার্টনারশিপ ধারণা কেবল অনিশ্চিত ভবিষ্যৎ সম্ভাবনা—বর্তমানে কোনো অংশীদারিত্ব নিশ্চিত নয়।'
                : 'Essential disease awareness, 16123 referrals, and crop guides stay free for smallholders, while optional Premium tools target multi-plot or commercial growers. Potential future concepts like priority consultations or ethical B2B/input partnerships are unconfirmed ideas only.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('roadmap')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface-sage)] hover:bg-[var(--kb-surface-sage-strong)] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>{bn ? 'স্কেলেবিলিটি রোডম্যাপ' : 'View Roadmap'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('finance')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>{bn ? 'কৃষকের খরচ হিসাব' : 'Farmer Expense Tracker'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <SourceQualityNotice
          language={language}
          verifiedSource={{
            bn: 'সাধারণ সাবস্ক্রিপশন ইউনিট অর্থনীতি সূত্র (আয় = গ্রাহক সংখ্যা × মূল্য; নিট = আয় − পরিচালন ব্যয়)।',
            en: 'Standard unit-economics arithmetic (Revenue = Subscribers × Price; Profit/Loss = Revenue − Operating Costs).',
          }}
          demoScope={{
            bn: 'সকল প্রদর্শিত সংখ্যা ও ৳৯৯/মাস মূল্য সম্পূর্ণ কাল্পনিক প্রাক্কলন। প্রাথমিক কৃষক সাক্ষাৎকার ও মূল্য পরিশোধের সক্ষমতা যাচাই (market validation) এখনো সম্পন্ন হয়নি এবং কোনো বাস্তব আয় বা অংশীদারিত্ব দাবি করা হয়নি।',
            en: 'All inputs, BDT 99/month proposed pricing, and outputs are strictly hypothetical projections. Primary farmer field interviews and willingness-to-pay validation remain pending; no actual revenue or partnerships are claimed.',
          }}
        />
      </div>
    </div>
  );
}
