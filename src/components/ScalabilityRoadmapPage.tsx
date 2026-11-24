import { useState } from 'react';
import {
  ArrowRight,
  CheckSquare,
  Compass,
  Cpu,
  Globe2,
  Layers,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { BilingualText, Language, PageRoute } from '../types/krishi';
import { SourceQualityNotice } from './SourceQualityNotice';
import { WorkspaceHeader } from './WorkspaceHeader';

interface ScalabilityRoadmapPageProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
}

interface RoadmapPhase {
  id: 'phase-1' | 'phase-2' | 'phase-3' | 'phase-4';
  phaseNumber: string;
  shortLabel: BilingualText;
  title: BilingualText;
  geography: BilingualText;
  statusTag: BilingualText;
  summary: BilingualText;
  objectives: BilingualText[];
  deliverables: BilingualText[];
  prerequisites: BilingualText[];
  relatedModules: {
    route: PageRoute;
    label: BilingualText;
  }[];
  icon: typeof MapPin;
}

const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: 'phase-1',
    phaseNumber: '01',
    shortLabel: {
      bn: 'ধাপ ১ · সাভার পাইলট',
      en: 'Phase 1 · Savar Pilot',
    },
    title: {
      bn: 'সাভারের নির্বাচিত এলাকায় পাইলট চালু',
      en: 'Pilot Launch in Selected Communities Around Savar',
    },
    geography: {
      bn: 'সাভার ও পার্শ্ববর্তী নির্বাচিত কৃষি গ্রামসমূহ (ঢাকা জেলা)',
      en: 'Selected farming communities around Savar Upazila, Dhaka District',
    },
    statusTag: {
      bn: 'পরিকল্পিত সূচনা ধাপ (প্রস্তাবিত)',
      en: 'Planned Initial Stage (Proposed)',
    },
    summary: {
      bn: 'মাঠ পর্যায়ে ক্ষুদ্র ও সবজি চাষিদের সাথে বাংলা-প্রথম ইন্টারফেস, অফলাইন ফসল নির্দেশিকা এবং আবহাওয়া পরামর্শের ব্যবহারিক উপযোগিতা যাচাই করার জন্য সীমিত পরিসরে পাইলট পরীক্ষা।',
      en: 'Focused community pilot to evaluate Bangla-first clarity, offline crop guide usability, and weather-aware workflow adoption alongside local farmer feedback.',
    },
    objectives: [
      {
        bn: 'সবজি ও ধান চাষিদের দৈনন্দিন তথ্য চাহিদা ও ভাষাগত সহজবোধ্যতা পর্যবেক্ষণ করা।',
        en: 'Evaluate Bangla terminology clarity and everyday navigation comfort with local vegetable and paddy growers.',
      },
      {
        bn: 'দুর্বল ইন্টারনেট সংযোগে অফলাইন-ক্যাশড চাষাবাদ নির্দেশিকার কার্যকারিতা পরীক্ষা করা।',
        en: 'Test offline-saved cultivation guides under intermittent rural mobile connectivity.',
      },
      {
        bn: 'উপজেলা কৃষি অফিস ও সরকারি ১৬১২৩ হেল্পলাইন রেফারেল প্রবাহ মাঠ পর্যায়ে যাচাই করা।',
        en: 'Refine escalation workflows connecting farmers to Upazila Agriculture Officers and the 16123 helpline.',
      },
    ],
    deliverables: [
      {
        bn: 'মোবাইল-বান্ধব বাংলা চাষাবাদ ও মাটি-সেচ নির্দেশিকা',
        en: 'Mobile-friendly Bangla crop & soil-water guides',
      },
      {
        bn: 'ব্যবহারযোগ্যতা ও নকশা উন্নয়ন চেকলিস্ট',
        en: 'Structured usability & accessibility feedback checklist',
      },
      {
        bn: 'সাভার এলাকাভিত্তিক মৌসুমি ফসল ও ঝুঁকি ড্যাশবোর্ড',
        en: 'Localized seasonal calendar & risk awareness view',
      },
    ],
    prerequisites: [
      {
        bn: 'উপজেলা পর্যায়ের পরামর্শদাতা ও স্বেচ্ছাসেবক সমন্বয়',
        en: 'Local field orientation and community volunteer coordination',
      },
      {
        bn: 'অফলাইন ব্রাউজার ক্যাশিং ও ৩২০px মোবাইল স্ক্রিন যাচাই',
        en: 'Verified offline caching and entry-level smartphone readability',
      },
    ],
    relatedModules: [
      {
        route: 'cultivation',
        label: { bn: 'চাষাবাদ জ্ঞানভাণ্ডার', en: 'Crop Library' },
      },
      {
        route: 'detect',
        label: { bn: 'রোগ শনাক্ত ডেমো', en: 'Crop Doctor Demo' },
      },
    ],
    icon: MapPin,
  },
  {
    id: 'phase-2',
    phaseNumber: '02',
    shortLabel: {
      bn: 'ধাপ ২ · ঢাকা বিভাগ',
      en: 'Phase 2 · Dhaka Division',
    },
    title: {
      bn: 'ঢাকা বিভাগের অন্যান্য জেলা ও এলাকায় সম্প্রসারণ',
      en: 'Expand to Other Areas in Dhaka Division',
    },
    geography: {
      bn: 'ঢাকা বিভাগের ১৩টি জেলা (গাজীপুর, টাঙ্গাইল, মানিকগঞ্জ, ফরিদপুর, কিশোরগঞ্জ প্রভৃতি)',
      en: 'Across all 13 districts of Dhaka Division (Gazipur, Tangail, Manikganj, Faridpur, Kishoreganj, and neighboring belts)',
    },
    statusTag: {
      bn: 'আঞ্চলিক বিস্তার ধাপ (পরিকল্পিত)',
      en: 'Regional Expansion Stage (Planned)',
    },
    summary: {
      bn: 'সাভার পাইলটের অভিজ্ঞতা কাজে লাগিয়ে ঢাকা বিভাগের বৈচিত্র্যময় কৃষি অঞ্চল—মধুপুর গড়, নিম্ন গঙ্গা প্লাবনভূমি ও নদীতীরবর্তী চরাঞ্চলে ফসল-নির্দিষ্ট পরামর্শ ও খরচ হিসাব সুবিধা পৌঁছে দেওয়া।',
      en: 'Applying Phase 1 learnings to extend localized crop calendars, input expense tracking, and regional weather advisories across Dhaka Division’s varied agro-zones.',
    },
    objectives: [
      {
        bn: 'অঞ্চলভেদে পাট, পেঁয়াজ, আনারস, কলা, সরিষা ও বোরো ধানের মৌসুমি নির্দেশিকা সমৃদ্ধ করা।',
        en: 'Tailor crop guides for jute, onion, pineapple, banana, mustard, and Boro rice across divisional sub-zones.',
      },
      {
        bn: 'কৃষি ডায়েরি ও খরচ-লাভ হিসাব মডিউলের মাধ্যমে মৌসুমভিত্তিক হিসাব সংরক্ষণ সহজ করা।',
        en: 'Support season-long expense and field observation logging across multiple districts.',
      },
      {
        bn: 'প্রাকৃতিক দুর্যোগ ও আকস্মিক বৃষ্টিপাতের সতর্কতা বার্তা আঞ্চলিক উপযোগী করা।',
        en: 'Improve regional clarity for pre-monsoon drainage and winter fog alerts.',
      },
    ],
    deliverables: [
      {
        bn: 'ঢাকা বিভাগের ১৩ জেলার কৃষি-পরিবেশ অঞ্চলভিত্তিক সুপারিশ',
        en: 'Agro-ecological recommendations across all 13 divisional districts',
      },
      {
        bn: 'বহু-ফসল কৃষি ডায়েরি ও মাসভিত্তিক খরচ সারসংক্ষেপ',
        en: 'Multi-crop farming journal & monthly expense tracking',
      },
      {
        bn: 'আঞ্চলিক ফসল-নির্দিষ্ট কমিউনিটি আলোচনা কাঠামো',
        en: 'Crop-categorized community knowledge exchange structure',
      },
    ],
    prerequisites: [
      {
        bn: 'ধাপ ১ পাইলটের ব্যবহারযোগ্যতা ও বিষয়বস্তু সংশোধন সম্পন্ন হওয়া',
        en: 'Completion of Phase 1 usability refinements and content review',
      },
      {
        bn: 'টেকসই পরিচালনা ব্যয় ও সাপোর্ট কাঠামো নির্ধারণ',
        en: 'Sustainable support & operational cost planning validated',
      },
    ],
    relatedModules: [
      {
        route: 'dashboard',
        label: { bn: 'জেলাভিত্তিক ড্যাশবোর্ড', en: 'District Dashboard' },
      },
      {
        route: 'finance',
        label: { bn: 'খরচ ও লাভ হিসাব', en: 'Expense Tracker' },
      },
    ],
    icon: Compass,
  },
  {
    id: 'phase-3',
    phaseNumber: '03',
    shortLabel: {
      bn: 'ধাপ ৩ · সারা বাংলাদেশ',
      en: 'Phase 3 · All Bangladesh',
    },
    title: {
      bn: 'সারা বাংলাদেশের ৬৪ জেলায় সম্প্রসারণ',
      en: 'Expand Across Bangladesh',
    },
    geography: {
      bn: '৮ বিভাগের ৬৪ জেলা (বরেন্দ্র, হাওর, উপকূলীয় লবণাক্ত অঞ্চল ও পার্বত্য চট্টগ্রামসহ)',
      en: 'All 64 districts across 8 divisions—covering Barind tracts, Haor basins, coastal salinity belts, and hill tracts',
    },
    statusTag: {
      bn: 'জাতীয় পর্যায়ের লক্ষ্যমাত্রা (পরিকল্পিত)',
      en: 'Nationwide Reach Stage (Planned)',
    },
    summary: {
      bn: 'দেশের ৬৪ জেলার বৈচিত্র্যপূর্ণ জলবায়ু ও মাটির ধরন অনুযায়ী সম্পূর্ণ বাংলাদেশ কৃষি জ্ঞানভাণ্ডার, লবণসহিষ্ণু ও খরা-সহনশীল চাষাবাদ তথ্য এবং সহজলভ্য উপদেষ্টা সেবা পৌঁছে দেওয়া।',
      en: 'Scaling comprehensive Bangla crop knowledge, soil-water stewardship, and seasonal resilience workflows to growers across all 64 districts.',
    },
    objectives: [
      {
        bn: 'উপকূলীয় লবণাক্ততা, উত্তরবঙ্গের ঘন কুয়াশা ও হাওরের আগাম ঢল—প্রতিটি আঞ্চলিক ঝুঁকি অন্তর্ভুক্ত করা।',
        en: 'Cover zone-specific challenges including coastal salinity, northern winter fog, and haor flash-flood timing.',
      },
      {
        bn: 'সকল প্রধান শস্য, সবজি, ফল, মসলা, ডাল ও তৈলবীজের তথ্যভাণ্ডার হালনাগাদ রাখা।',
        en: 'Maintain comprehensive, offline-accessible cultivation guides across cereals, vegetables, fruits, spices, pulses, and oilseeds.',
      },
      {
        bn: 'টেকসই ও সাশ্রয়ী সাবস্ক্রিপশন বা প্রাতিষ্ঠানিক সহায়তা মডেলের মাধ্যমে দীর্ঘমেয়াদি ধারাবাহিকতা নিশ্চিত করা।',
        en: 'Establish financially sustainable delivery combining open basic access with optional value-added services.',
      },
    ],
    deliverables: [
      {
        bn: '৬৪ জেলা ও উপজেলাভিত্তিক ফসল পরামর্শ ও মাটি নির্দেশিকা',
        en: '64-district & Upazila crop advisory and soil-care coverage',
      },
      {
        bn: 'অফলাইন-ফার্স্ট নলেজ ক্যাশিং ও দ্বিভাষিক (বাংলা/ইংরেজি) প্রবেশাধিকার',
        en: 'Offline-first knowledge library with full Bangla/English parity',
      },
      {
        bn: 'আর্থিক টেকসইতা ও বহু-অঞ্চল সম্প্রসারণ কাঠামো',
        en: 'Sustainable multi-region operations & support structure',
      },
    ],
    prerequisites: [
      {
        bn: 'কৃষিবিদ ও স্থানীয় সম্প্রসারণ তথ্যসূত্রের নিয়মিত পর্যালোচনা',
        en: 'Ongoing agronomic review aligned with public research advisories',
      },
      {
        bn: 'জাতীয় পর্যায়ে টেকসই হোস্টিং ও ব্যবহারকারী সহায়তা প্রস্তুতি',
        en: 'Verified infrastructure stability and user support readiness',
      },
    ],
    relatedModules: [
      {
        route: 'weather',
        label: { bn: 'আবহাওয়া সতর্কতা', en: 'Weather Advisory' },
      },
      {
        route: 'soil',
        label: { bn: 'মাটি ও সেচ ব্যবস্থাপনা', en: 'Soil & Water Care' },
      },
    ],
    icon: Globe2,
  },
  {
    id: 'phase-4',
    phaseNumber: '04',
    shortLabel: {
      bn: 'ধাপ ৪ · ভবিষ্যৎ এআই ও ডেটা সেবা',
      en: 'Phase 4 · Future AI & Data',
    },
    title: {
      bn: 'অনুমোদন ও কারিগরি প্রস্তুতি সাপেক্ষে উন্নত এআই ও ডেটা-সমর্থিত কৃষি সেবা',
      en: 'Develop Advanced AI-Powered & Data-Supported Agriculture Services (When Permitted & Technically Ready)',
    },
    geography: {
      bn: 'অনুমোদিত পরীক্ষামূলক অঞ্চল থেকে ক্রমান্বয়ে জাতীয় পরিসরে (ভবিষ্যৎ ধাপ)',
      en: 'Gradual rollout from validated test zones to national availability upon formal readiness',
    },
    statusTag: {
      bn: 'ভবিষ্যৎ অনুমোদন-সাপেক্ষ ধাপ (বর্তমান প্রোটোটাইপে সক্রিয় নয়)',
      en: 'Future Conditional Stage (Not Active in Round 1 Prototype)',
    },
    summary: {
      bn: 'প্রয়োজনীয় প্রাতিষ্ঠানিক অনুমোদন, ডেটা সুরক্ষা মানদণ্ড ও কারিগরি প্রস্তুতি সম্পন্ন হলে ধাপে ধাপে যাচাইকৃত পাতার ছবি বিশ্লেষণ, আবহাওয়া API সংযোগ এবং বিশেষজ্ঞ-সমর্থিত সিদ্ধান্ত সহায়তা যুক্ত করা হবে।',
      en: 'Only when permitted and technically ready, introduce validated vision-assisted leaf screening, authorized weather data feeds, and officer-in-the-loop decision support.',
    },
    objectives: [
      {
        bn: 'বাংলাদেশের ফসলের সুনির্দিষ্ট ও যাচাইকৃত ডেটাসেটের ওপর ভিত্তি করে রোগ শনাক্তকরণ মডেলের নির্ভুলতা পরীক্ষা।',
        en: 'Validate computer-vision screening models rigorously against curated local crop disease datasets before deployment.',
      },
      {
        bn: 'সরকারি আবহাওয়া ও মৃত্তিকা তথ্যসূত্রের অনুমোদিত সংযোগের মাধ্যমে স্থানীয় পূর্বাভাস উন্নত করা।',
        en: 'Integrate authorized meteorological and soil-health data feeds where permitted.',
      },
      {
        bn: 'মানব বিশেষজ্ঞ (SAAO/কৃষিবিদ) যাচাইকরণ ধাপ অক্ষুণ্ণ রেখে দায়িত্বশীল প্রযুক্তি ব্যবহার নিশ্চিত করা।',
        en: 'Keep human-in-the-loop agricultural officer verification mandatory before chemical or treatment decisions.',
      },
    ],
    deliverables: [
      {
        bn: 'যাচাইকৃত এআই পাতা পর্যালোচনা ও অনিশ্চয়তা-সতর্কতা ব্যবস্থা',
        en: 'Validated AI leaf screening with explicit confidence guardrails',
      },
      {
        bn: 'অনুমোদিত রিয়েল-টাইম আবহাওয়া ও সতর্কতা ইন্টিগ্রেশন',
        en: 'Authorized meteorological feed & seasonal risk alerts',
      },
      {
        bn: 'ডেটা সুরক্ষা, গোপনীয়তা ও নৈতিক এআই ব্যবহারের নীতিমালা',
        en: 'Farmer data privacy, consent, and responsible AI governance',
      },
    ],
    prerequisites: [
      {
        bn: 'কারিগরি নির্ভুলতা পরীক্ষা ও প্রাতিষ্ঠানিক/নিয়ন্ত্রক অনুমোদন',
        en: 'Technical validation benchmarks and required institutional/regulatory permissions',
      },
      {
        bn: 'স্বচ্ছ ফলাফল ব্যাখ্যা ও ১৬১২৩ বিশেষজ্ঞ যাচাইয়ের বাধ্যবাধকতা',
        en: 'Strict human-verified safety guardrails and non-prescriptive guidance standards',
      },
    ],
    relatedModules: [
      {
        route: 'risk',
        label: { bn: 'ঝুঁকি পূর্বাভাস ডেমো', en: 'Risk Predictor Demo' },
      },
      {
        route: 'assistant',
        label: { bn: 'বাংলা সহায়ক ডেমো', en: 'Bangla Assistant Demo' },
      },
    ],
    icon: Cpu,
  },
];

export function ScalabilityRoadmapPage({
  language,
  onToggleLanguage,
  onNavigate,
}: ScalabilityRoadmapPageProps) {
  const bn = language === 'bn';
  const [selectedPhaseId, setSelectedPhaseId] = useState<RoadmapPhase['id']>('phase-1');
  const [viewMode, setViewMode] = useState<'explorer' | 'matrix'>('explorer');

  const activePhase =
    ROADMAP_PHASES.find((p) => p.id === selectedPhaseId) || ROADMAP_PHASES[0];
  const ActiveIcon = activePhase.icon;

  return (
    <div className="bg-[var(--kb-canvas-alt)] min-h-screen">
      <WorkspaceHeader
        breadcrumbLabel={bn ? 'স্কেলেবিলিটি রোডম্যাপ' : 'Scalability Roadmap'}
        title={
          bn
            ? 'ধাপভিত্তিক বিস্তার ও ভবিষ্যৎ প্রযুক্তি রোডম্যাপ'
            : 'Phased Scalability & Future Readiness Roadmap'
        }
        subtitle={
          bn
            ? 'সাভারের পাইলট থেকে শুরু করে ঢাকা বিভাগ, সারা বাংলাদেশ এবং ভবিষ্যতে অনুমোদন ও প্রস্তুতি সাপেক্ষে উন্নত এআই-সমর্থিত কৃষি সেবার পরিকল্পিত রূপরেখা।'
            : 'A realistic four-phase expansion plan—from a focused Savar pilot to Dhaka Division, nationwide Bangladesh, and future AI-supported services when permitted and technically ready.'
        }
        language={language}
        onToggleLanguage={onToggleLanguage}
        onNavigate={onNavigate}
        backRoute="dashboard"
        backLabel={bn ? 'ড্যাশবোর্ড' : 'Dashboard'}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Scope & Non-Claim Notice + View Switch */}
        <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--kb-brand-text)]">
              <ShieldCheck className="w-4 h-4 text-[var(--kb-accent)] shrink-0" />
              <span>
                {bn
                  ? 'পরিকল্পিত বিস্তার রূপরেখা · বাস্তবায়িত দাবি নয়'
                  : 'Planned Rollout Framework · Not Completed Deployment Claims'}
              </span>
            </div>
            <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
              {bn
                ? 'এই রোডম্যাপটি রাউন্ড ১ প্রোটোটাইপের ভবিষ্যৎ সম্প্রসারণ পরিকল্পনা প্রদর্শন করে। প্রতিটি পরবর্তী ধাপ পূর্ববর্তী ধাপের ব্যবহারিক অভিজ্ঞতা, কারিগরি প্রস্তুতি এবং প্রয়োজনীয় অনুমোদনের ওপর নির্ভরশীল।'
                : 'This roadmap outlines intended expansion stages for KrishiBondhu. Each phase depends on prior validation learnings, operational sustainability, technical readiness, and required permissions.'}
            </p>
          </div>

          <div
            role="tablist"
            aria-label={bn ? 'রোডম্যাপ প্রদর্শন ধরন' : 'Roadmap view mode'}
            className="inline-flex items-center p-1 bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-lg self-start lg:self-auto shrink-0"
          >
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'explorer'}
              onClick={() => setViewMode('explorer')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                viewMode === 'explorer'
                  ? 'bg-[var(--kb-surface)] text-[var(--kb-brand-text)] shadow-xs'
                  : 'text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)]'
              }`}
            >
              {bn ? 'ধাপভিত্তিক বিবরণ' : 'Phase Explorer'}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'matrix'}
              onClick={() => setViewMode('matrix')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-[var(--kb-surface)] text-[var(--kb-brand-text)] shadow-xs'
                  : 'text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)]'
              }`}
            >
              {bn ? '৪ ধাপের তুলনা' : 'All 4 Phases Matrix'}
            </button>
          </div>
        </div>

        {/* 4-Phase Interactive Stepper Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROADMAP_PHASES.map((phase) => {
            const PhaseIcon = phase.icon;
            const isSelected = phase.id === selectedPhaseId;
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => {
                  setSelectedPhaseId(phase.id);
                  setViewMode('explorer');
                }}
                className={`text-left p-5 rounded-xl border transition-colors flex flex-col justify-between gap-4 cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                    : 'bg-[var(--kb-surface)] text-[var(--kb-ink)] border-[var(--kb-border)] hover:border-[var(--kb-accent)]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-mono text-xs font-semibold tabular-nums ${
                        isSelected ? 'text-[#6EE7B7]' : 'text-[var(--kb-accent)]'
                      }`}
                    >
                      {bn ? `ধাপ ${phase.phaseNumber}` : `Phase ${phase.phaseNumber}`}
                    </span>
                    <PhaseIcon
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-[#6EE7B7]' : 'text-[var(--kb-brand-text)]'
                      }`}
                    />
                  </div>
                  <h2 className="text-base font-bold leading-snug">
                    {bn ? phase.title.bn : phase.title.en}
                  </h2>
                </div>
                <p
                  className={`text-xs leading-relaxed ${
                    isSelected ? 'text-[#D1E2D7]' : 'text-[var(--kb-ink-muted)]'
                  }`}
                >
                  {bn ? phase.geography.bn : phase.geography.en}
                </p>
              </button>
            );
          })}
        </div>

        {viewMode === 'explorer' ? (
          /* Active Phase Deep-Dive View */
          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-[var(--kb-border-subtle)] flex flex-col md:flex-row md:items-start justify-between gap-5">
              <div className="space-y-2.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[var(--kb-ink-muted)]">
                  <span className="font-mono font-semibold text-[var(--kb-accent)] tabular-nums">
                    {bn
                      ? `ধাপ ${activePhase.phaseNumber}`
                      : `Phase ${activePhase.phaseNumber}`}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {bn ? activePhase.statusTag.bn : activePhase.statusTag.en}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--kb-ink)]">
                  {bn ? activePhase.title.bn : activePhase.title.en}
                </h2>
                <p className="text-sm sm:text-base text-[var(--kb-ink-muted)] leading-relaxed">
                  {bn ? activePhase.summary.bn : activePhase.summary.en}
                </p>
              </div>

              <div className="p-4 bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg md:max-w-xs w-full shrink-0 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--kb-brand-text)]">
                  <ActiveIcon className="w-4 h-4 text-[var(--kb-accent)]" />
                  <span>{bn ? 'লক্ষ্যমাত্রা এলাকা' : 'Target Scope'}</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--kb-ink)] font-medium leading-relaxed">
                  {bn ? activePhase.geography.bn : activePhase.geography.en}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Objectives */}
              <div className="lg:col-span-5 space-y-3">
                <h3 className="text-sm font-bold text-[var(--kb-ink)]">
                  {bn ? 'প্রধান কার্যক্রম ও লক্ষ্য' : 'Key Phase Objectives'}
                </h3>
                <ul className="space-y-3 text-sm text-[var(--kb-ink-muted)]">
                  {activePhase.objectives.map((item, idx) => (
                    <li
                      key={idx}
                      className="pb-3 border-b border-[var(--kb-border-subtle)] last:border-b-0 last:pb-0 flex items-start gap-2.5"
                    >
                      <span className="font-mono text-xs font-semibold text-[var(--kb-accent)] tabular-nums pt-0.5">
                        0{idx + 1}.
                      </span>
                      <span className="leading-relaxed">
                        {bn ? item.bn : item.en}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables & Readiness Gates */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--kb-ink)]">
                    <Layers className="w-4 h-4 text-[var(--kb-brand-text)]" />
                    <span>
                      {bn ? 'প্রত্যাশিত সেবা কাঠামো' : 'Planned Capabilities'}
                    </span>
                  </div>
                  <ul className="space-y-2.5 text-sm text-[var(--kb-ink-muted)]">
                    {activePhase.deliverables.map((d, idx) => (
                      <li key={idx} className="leading-relaxed">
                        · {bn ? d.bn : d.en}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--kb-ink)]">
                    <CheckSquare className="w-4 h-4 text-[var(--kb-accent)]" />
                    <span>
                      {bn ? 'পূর্বশর্ত ও যাচাই ধাপ' : 'Readiness Prerequisites'}
                    </span>
                  </div>
                  <ul className="space-y-2.5 text-sm text-[var(--kb-ink-muted)]">
                    {activePhase.prerequisites.map((req, idx) => (
                      <li key={idx} className="leading-relaxed">
                        · {bn ? req.bn : req.en}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer Action Links inside Active Phase */}
            <div className="px-6 sm:px-8 py-4 bg-[var(--kb-surface-muted)] border-t border-[var(--kb-border)] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-medium text-[var(--kb-ink-muted)]">
                {bn
                  ? 'এই ধাপের সাথে সম্পর্কিত প্রোটোটাইপ মডিউল দেখুন:'
                  : 'Explore prototype modules aligned with this phase:'}
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {activePhase.relatedModules.map((mod) => (
                  <button
                    key={mod.route}
                    type="button"
                    onClick={() => onNavigate(mod.route)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface)] hover:bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>{bn ? mod.label.bn : mod.label.en}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* All 4 Phases Comparison Table */
          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl overflow-hidden">
            <div className="p-6 border-b border-[var(--kb-border-subtle)]">
              <h2 className="text-lg font-bold text-[var(--kb-ink)]">
                {bn
                  ? '৪ ধাপের সমন্বিত বিস্তার ও প্রস্তুতি সারণি'
                  : 'Four-Phase Scalability Comparison Matrix'}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[720px]">
                <thead>
                  <tr className="bg-[var(--kb-surface-muted)] border-b border-[var(--kb-border)] text-xs font-semibold text-[var(--kb-ink-muted)]">
                    <th className="py-3.5 px-5">{bn ? 'ধাপ' : 'Phase'}</th>
                    <th className="py-3.5 px-5">{bn ? 'ভৌগোলিক পরিসর' : 'Geographic Scope'}</th>
                    <th className="py-3.5 px-5">{bn ? 'মূল লক্ষ্য' : 'Primary Focus'}</th>
                    <th className="py-3.5 px-5">{bn ? 'অবস্থা' : 'Prototype Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--kb-border-subtle)] text-sm">
                  {ROADMAP_PHASES.map((phase) => (
                    <tr
                      key={phase.id}
                      className="hover:bg-[var(--kb-surface-muted)] transition-colors align-top"
                    >
                      <td className="py-4 px-5 font-semibold text-[var(--kb-brand-text)] whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPhaseId(phase.id);
                            setViewMode('explorer');
                          }}
                          className="hover:underline text-left cursor-pointer"
                        >
                          {bn ? phase.shortLabel.bn : phase.shortLabel.en}
                        </button>
                      </td>
                      <td className="py-4 px-5 text-[var(--kb-ink)]">
                        {bn ? phase.geography.bn : phase.geography.en}
                      </td>
                      <td className="py-4 px-5 text-[var(--kb-ink-muted)] leading-relaxed">
                        {bn ? phase.summary.bn : phase.summary.en}
                      </td>
                      <td className="py-4 px-5 text-xs font-medium text-[var(--kb-ink-muted)]">
                        {bn ? phase.statusTag.bn : phase.statusTag.en}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Cross-Navigation Strip */}
        <div className="bg-[#113520] dark:bg-[#0F2C1B] dark:border dark:border-[#1E5133] text-white rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              {bn
                ? 'পরিকল্পনার আর্থিক ও এসডিজি কাঠামো দেখুন'
                : 'Review Financial Sustainability & SDG 2.4 Alignment'}
            </h2>
            <p className="text-sm text-[#D1E2D7]">
              {bn
                ? 'কাল্পনিক সাবস্ক্রিপশন প্রাক্কলন এবং এসডিজি ২.৪ উদ্দেশ্যমূলক অবদান পরীক্ষা করুন।'
                : 'Test hypothetical subscription projections and explore intended UN SDG 2.4 contributions.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('financial-model')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#14532D] bg-white dark:bg-[#ECF4EE] hover:bg-[#EEF2EC] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>{bn ? 'আর্থিক মডেল' : 'Financial Model'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('sdg')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#1E5133] hover:bg-[#276741] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>{bn ? 'এসডিজি ২.৪ অবদান' : 'UN SDG 2.4'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <SourceQualityNotice
          language={language}
          verifiedSource={{
            bn: 'বাংলাদেশের প্রশাসনিক বিভাগ/জেলা কাঠামো (৬৪ জেলা) ও সাধারণ কৃষি-পরিবেশ অঞ্চল (AEZ) ধারণা।',
            en: 'Bangladesh administrative structure (Savar Upazila, Dhaka Division, 64 districts) and regional Agro-Ecological Zone framing.',
          }}
          demoScope={{
            bn: 'এই রোডম্যাপটি কেবল পরিকল্পিত ধাপ ও ভবিষ্যৎ প্রস্তুতি কাঠামো দেখায়; সাভার বা অন্যান্য এলাকার প্রাথমিক কৃষক সাক্ষাৎকার ও মাঠ যাচাই এখনো সম্পন্ন হয়নি এবং কোনো অংশীদারিত্ব, পাইলট ফলাফল বা অনুমোদন প্রাপ্তির দাবি করা হয়নি।',
            en: 'Represents planned deployment phases only; primary farmer interviews and Savar community field validation remain pending, and no completed pilots, institutional partnerships, or active AI approvals are claimed.',
          }}
        />
      </div>
    </div>
  );
}
