import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CloudSun,
  Droplets,
  Info,
  Leaf,
  ScanSearch,
  ShieldCheck,
  Sprout,
} from 'lucide-react';
import { ASSETS } from '../data/krishiData';
import { BilingualText, Language, PageRoute } from '../types/krishi';
import { ResilientImage } from './ResilientImage';
import { SdgTopicId, SdgTopicModal } from './SdgTopicModal';
import { SourceQualityNotice } from './SourceQualityNotice';
import { WorkspaceHeader } from './WorkspaceHeader';

interface SdgImpactPageProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
}

interface ContributionPathway {
  id: 'knowledge' | 'sustainable' | 'climate';
  index: string;
  icon: typeof BookOpen;
  title: BilingualText;
  shortLabel: BilingualText;
  intendedOutcome: BilingualText;
  mechanism: BilingualText;
  modules: {
    route: PageRoute;
    label: BilingualText;
  }[];
  boundaryNote: BilingualText;
}

const INTENDED_PATHWAYS: ContributionPathway[] = [
  {
    id: 'knowledge',
    index: '01',
    icon: BookOpen,
    title: {
      bn: 'কৃষি জ্ঞানে সহজ ও বাংলাভিত্তিক প্রবেশাধিকার',
      en: 'Improved Access to Farming Knowledge',
    },
    shortLabel: {
      bn: 'কৃষি জ্ঞানে প্রবেশাধিকার',
      en: 'Farming Knowledge Access',
    },
    intendedOutcome: {
      bn: 'উদ্দেশ্যমূলক অবদান: সহজ বাংলায় ফসল চাষাবাদ, পাতার লক্ষণ পরিচিতি এবং স্থানীয় কৃষি অফিসের রেফারেল এক জায়গায় পৌঁছে দিয়ে তথ্যগত দূরত্ব কমানোর চেষ্টা।',
      en: 'Intended Contribution: Reducing information barriers by presenting crop cultivation guidance, leaf symptom awareness, and Upazila officer referral steps in clear Bangla and English.',
    },
    mechanism: {
      bn: '৬০+ দেশীয় ফসলের অফলাইন-বান্ধব চাষাবাদ জ্ঞানভাণ্ডার, ৬৪ জেলার আঞ্চলিক ফসল পরামর্শ, বাংলা কৃষি সহায়ক এবং ১৬১২৩ কল সেন্টার সংযোগ।',
      en: 'Offline-capable 60+ crop library, 64-district localized crop tips, Bangla assistant demo, and direct 16123 helpline referrals.',
    },
    modules: [
      {
        route: 'cultivation',
        label: { bn: 'চাষাবাদ জ্ঞানভাণ্ডার', en: 'Crop Library' },
      },
      {
        route: 'assistant',
        label: { bn: 'বাংলা কৃষি সহায়ক', en: 'Bangla Assistant' },
      },
    ],
    boundaryNote: {
      bn: 'প্রমাণিত প্রভাব নয়: এটি কেবল সহজলভ্য তথ্য প্রবাহের একটি নকশাগত অবদান।',
      en: 'Intended contribution only—not proven adoption metrics or verified yield outcomes.',
    },
  },
  {
    id: 'sustainable',
    index: '02',
    icon: Sprout,
    title: {
      bn: 'টেকসই ও পরিবেশবান্ধব কৃষি চর্চা',
      en: 'Sustainable Agricultural Practices',
    },
    shortLabel: {
      bn: 'টেকসই কৃষি চর্চা',
      en: 'Sustainable Practices',
    },
    intendedOutcome: {
      bn: 'উদ্দেশ্যমূলক অবদান: জমির মাটির স্বাস্থ্য রক্ষা, জৈব কম্পোস্ট ব্যবহার এবং অপ্রয়োজনীয় রাসায়নিক স্প্রে এড়িয়ে চলার অভ্যাস গড়ে তুলতে উৎসাহিত করা।',
      en: 'Intended Contribution: Encouraging soil-first stewardship—organic compost, balanced nutrition, crop rotation, and avoiding unnecessary pesticide application.',
    },
    mechanism: {
      bn: 'মাটি ও সেচ ব্যবস্থাপনা নির্দেশিকা (SRDI পরীক্ষার পরামর্শসহ), পাতার লক্ষণ যাচাই ও নিরাপদ পরিচর্যা ধাপ এবং উপকরণ ব্যয়-লাভ হিসাব।',
      en: 'Soil & Irrigation Care guides (referring to SRDI testing), preventive crop care before chemical sprays, and transparent farm expense logging.',
    },
    modules: [
      {
        route: 'soil',
        label: { bn: 'মাটি ও সেচ ব্যবস্থা', en: 'Soil & Irrigation' },
      },
      {
        route: 'detect',
        label: { bn: 'ক্রপ ডক্টর ডেমো', en: 'Crop Doctor Demo' },
      },
    ],
    boundaryNote: {
      bn: 'প্রমাণিত প্রভাব নয়: কোনো নির্ধারিত সার/বালাইনাশক মাত্রা বা রাসায়নিক হ্রাসের পরিসংখ্যান দাবি করা হয়নি।',
      en: 'Intended contribution only—no measured chemical reduction statistics or prescriptive field dosages are claimed.',
    },
  },
  {
    id: 'climate',
    index: '03',
    icon: CloudSun,
    title: {
      bn: 'জলবায়ু সহনশীল কৃষি সিদ্ধান্ত',
      en: 'Climate-Resilient Farming Decisions',
    },
    shortLabel: {
      bn: 'জলবায়ু সহনশীল সিদ্ধান্ত',
      en: 'Climate-Resilient Decisions',
    },
    intendedOutcome: {
      bn: 'উদ্দেশ্যমূলক অবদান: অনিয়মিত বৃষ্টি, শীতল কুয়াশা, খরা কিংবা উচ্চ আর্দ্রতার ঝুঁকি বিবেচনা করে সেচ, পানি নিষ্কাশন ও বপনের সময় নির্ধারণে সহায়তা করা।',
      en: 'Intended Contribution: Helping farmers align drainage, irrigation timing, and seasonal scouting with local weather shifts such as heavy rain, fog, or dry spells.',
    },
    mechanism: {
      bn: 'আবহাওয়াভিত্তিক সতর্কতা, রোগের ঝুঁকি পূর্বাভাস সিমুলেশন, স্মার্ট ফসল ক্যালেন্ডার এবং ব্যক্তিগত কৃষি পর্যবেক্ষণ ডায়েরি।',
      en: 'District weather advisories, interactive disease risk simulation, crop calendar checklists, and persistent farming journal logs.',
    },
    modules: [
      {
        route: 'weather',
        label: { bn: 'আবহাওয়া সতর্কতা', en: 'Weather Alert' },
      },
      {
        route: 'risk',
        label: { bn: 'ঝুঁকি পূর্বাভাস', en: 'Risk Predictor' },
      },
      {
        route: 'calendar',
        label: { bn: 'ক্যালেন্ডার ও ডায়েরি', en: 'Calendar & Journal' },
      },
    ],
    boundaryNote: {
      bn: 'প্রমাণিত প্রভাব নয়: আবহাওয়া ও ঝুঁকি পূর্বাভাস প্রোটোটাইপে নমুনা ডেটা হিসেবে প্রদর্শিত।',
      en: 'Intended contribution only—weather and risk modules currently operate as static sample demonstrations.',
    },
  },
];

export function SdgImpactPage({
  language,
  onToggleLanguage,
  onNavigate,
}: SdgImpactPageProps) {
  const bn = language === 'bn';
  const [activePathwayId, setActivePathwayId] =
    useState<ContributionPathway['id']>('knowledge');
  const [activeSdgTopic, setActiveSdgTopic] = useState<SdgTopicId | null>(null);

  const activePathway =
    INTENDED_PATHWAYS.find((p) => p.id === activePathwayId) ||
    INTENDED_PATHWAYS[0];
  const ActiveIcon = activePathway.icon;

  const pillars: {
    index: string;
    icon: typeof Sprout;
    title: string;
    body: string;
    topicId?: SdgTopicId;
  }[] = [
    {
      index: '01',
      icon: Sprout,
      title: bn ? 'টেকসই খাদ্য উৎপাদন' : 'Sustainable Food Production',
      body: bn
        ? 'প্রাথমিক রোগের লক্ষণ ও প্রতিরোধমূলক পরিচর্যা (সুষম সার, মাল্চিং, শস্য পর্যায়) সম্পর্কে সচেতনতা বাড়িয়ে জমির উর্বরতা ও উৎপাদনশীলতা রক্ষায় সহায়তা করার উদ্দেশ্য।'
        : 'Designed to promote preventive agronomy—balanced nutrition, organic mulching, and crop rotation—to support long-term soil health.',
    },
    {
      index: '02',
      icon: CloudSun,
      title: bn ? 'জলবায়ু সহনশীল কৃষি চর্চা' : 'Climate Resilience',
      body: bn
        ? 'হঠাৎ বৃষ্টি, উচ্চ আর্দ্রতা কিংবা শীতল কুয়াশার নমুনা পূর্বাভাসের সাথে মিলিয়ে সেচ ও ফসল সুরক্ষার সময়সূচি বিবেচনায় সহায়তা করার উদ্দেশ্য।'
        : 'Connects localized weather outlooks—humidity spikes, showers, and winter fog—with timely drainage, irrigation, and harvest planning.',
    },
    {
      index: '03',
      icon: ShieldCheck,
      title: bn
        ? 'প্রতিরোধযোগ্য ফসলহানি কমানোর উদ্যোগ'
        : 'Addressing Preventable Crop Loss',
      body: bn
        ? 'ধানের ব্লাস্ট বা আলুর মড়কের মতো রোগের প্রাথমিক লক্ষণ সহজে বুঝতে ও সময়মতো উপজেলা কৃষি অফিস এবং ১৬১২৩ নম্বরের সহায়তা নিতে উৎসাহিত করে।'
        : 'Encourages earlier recognition of leaf symptoms and prompt verification with Upazila agricultural extension officers.',
      topicId: 'crop-loss',
    },
    {
      index: '04',
      icon: Droplets,
      title: bn
        ? 'সম্পদ ও বালাইনাশকের দায়িত্বশীল ব্যবহার'
        : 'Responsible Resource Stewardship',
      body: bn
        ? 'বৃষ্টির আগে অযথা স্প্রে বন্ধ রাখা এবং অতিরিক্ত ইউরিয়া এড়িয়ে চলার পরামর্শ দিয়ে পানি, মাটি ও উৎপাদন ব্যয় রক্ষায় সচেতনতা তৈরি করে।'
        : 'Discourages pre-rain spraying and excess nitrogen use—intended to reduce runoff waste and protect soil quality.',
      topicId: 'resource-use',
    },
  ];

  return (
    <div className="bg-[var(--kb-canvas-alt)] min-h-screen">
      <WorkspaceHeader
        breadcrumbLabel={bn ? 'এসডিজি ২.৪ প্রভাব' : 'SDG 2.4 Impact'}
        title={
          bn
            ? 'জাতিসংঘ এসডিজি ২.৪ ও উদ্দেশ্যমূলক টেকসই অবদান'
            : 'Supporting UN SDG Target 2.4: Intended Contributions'
        }
        subtitle={
          bn
            ? 'কীভাবে কৃষিবন্ধু উন্নত কৃষি জ্ঞান, টেকসই চর্চা এবং জলবায়ু-সহনশীল সিদ্ধান্তের মাধ্যমে জাতিসংঘ এসডিজি ২.৪-এ অবদান রাখার লক্ষ্য নিয়ে নকশা করা হয়েছে।'
            : 'How KrishiBondhu is designed to support UN SDG 2.4 through improved farming knowledge access, sustainable practices, and climate-resilient decisions—framed strictly as intended contributions.'
        }
        language={language}
        onToggleLanguage={onToggleLanguage}
        onNavigate={onNavigate}
        backRoute="home"
        backLabel={bn ? 'হোম' : 'Home'}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Intended Contributions vs Proven Impact Framing Banner */}
        <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 sm:p-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-[var(--kb-brand-text)] shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm">
            <p className="font-bold text-[var(--kb-ink)]">
              {bn
                ? 'উদ্দেশ্যমূলক অবদান — প্রমাণিত বা পরিমাপকৃত প্রভাব নয়'
                : 'Intended Contributions — Not Proven Field Impact'}
            </p>
            <p className="text-[var(--kb-ink-muted)] text-xs sm:text-sm leading-relaxed">
              {bn
                ? 'নিচের সকল এসডিজি ২.৪ বিশ্লেষণ কৃষিবন্ধু প্রোটোটাইপের পরিকল্পিত ও উদ্দেশ্যমূলক অবদান ব্যাখ্যা করে। এতে কোনো মনগড়া মাঠ পর্যায়ের ফলাফল, জরিপ পরিসংখ্যান, অংশীদারিত্ব কিংবা প্রমাণিত প্রভাবের দাবি অন্তর্ভুক্ত নেই।'
                : 'All UN SDG 2.4 statements on this page describe intended design contributions of the KrishiBondhu workflow—not proven impact, completed field trials, external partnerships, or empirical yield statistics.'}
            </p>
          </div>
        </div>

        {/* Editorial Hero Card */}
        <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--kb-accent)]">
                <Leaf className="w-4 h-4" />
                <span>
                  {bn
                    ? 'UN SDG 2.4 · টেকসই ও সহনশীল খাদ্য ব্যবস্থা'
                    : 'UN SDG 2.4 · Sustainable Food Systems'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--kb-ink)]">
                {bn
                  ? 'জ্ঞান, টেকসই চর্চা ও জলবায়ু-সহনশীল সিদ্ধান্তের সমন্বয়'
                  : 'Aligning Bangla farm guidance with UN SDG Target 2.4'}
              </h2>
              <p className="text-sm sm:text-base text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? 'জাতিসংঘের টেকসই উন্নয়ন লক্ষ্যমাত্রা ২.৪-এর লক্ষ্য হলো এমন টেকসই খাদ্য উৎপাদন ব্যবস্থা ও সহনশীল কৃষি চর্চা নিশ্চিত করা যা উৎপাদনশীলতা ও বাস্তুতন্ত্র রক্ষা করে এবং জলবায়ু পরিবর্তনের সাথে খাপ খাইয়ে নেওয়ার সক্ষমতা বাড়ায়।'
                  : 'UN SDG Target 2.4 promotes sustainable food production systems and resilient agricultural practices that strengthen capacity for climate adaptation and progressively improve land and soil quality.'}
              </p>
            </div>

            <div className="p-4 bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-lg text-xs text-[var(--kb-ink-muted)]">
              {bn
                ? 'স্বচ্ছতা নোট: রাউন্ড ১ স্ট্যাটিক প্রোটোটাইপে কেবল কর্মপ্রবাহ ও নকশার উদ্দেশ্য দেখানো হয়েছে; বাস্তব মাঠ পর্যায়ের প্রভাব যাচাই ভবিষ্যৎ পাইলট ধাপের ওপর নির্ভরশীল।'
                : 'Transparency Note: This Round 1 static prototype demonstrates workflow alignment and intended design contributions; actual field effectiveness would require future real-world evaluation.'}
            </div>
          </div>

          <div className="lg:col-span-6 min-h-[260px] lg:min-h-[380px]">
            <ResilientImage
              src={ASSETS.sdgFarming}
              alt={
                bn
                  ? 'বাংলাদেশের টেকসই সমন্বিত ফসল ও সবজি চাষ'
                  : 'Sustainable mixed rice and vegetable cultivation in Bangladesh'
              }
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Interactive 3 Core Intended Contribution Pathways */}
        <section className="space-y-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[var(--kb-accent)]">
                {bn
                  ? 'উদ্দেশ্যমূলক অবদানের ৩টি প্রধান ক্ষেত্র'
                  : 'Three Core Pathways (Intended Contributions)'}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--kb-ink)]">
                {bn
                  ? 'কীভাবে কৃষিবন্ধু এসডিজি ২.৪ লক্ষ্যকে সমর্থন করার চেষ্টা করে'
                  : 'How KrishiBondhu is Designed to Support UN SDG 2.4'}
              </h2>
            </div>

            {/* Interactive Pathway Tabs */}
            <div
              role="tablist"
              aria-label={bn ? 'এসডিজি অবদান পথসমূহ' : 'SDG contribution pathways'}
              className="flex flex-wrap gap-1.5 p-1 bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-lg"
            >
              {INTENDED_PATHWAYS.map((pathway) => (
                <button
                  key={pathway.id}
                  type="button"
                  role="tab"
                  aria-selected={activePathwayId === pathway.id}
                  onClick={() => setActivePathwayId(pathway.id)}
                  className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    activePathwayId === pathway.id
                      ? 'bg-[var(--kb-surface)] text-[var(--kb-brand-text)] shadow-xs'
                      : 'text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)]'
                  }`}
                >
                  {bn ? pathway.shortLabel.bn : pathway.shortLabel.en}
                </button>
              ))}
            </div>
          </div>

          {/* Active Pathway Detail Card */}
          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-[var(--kb-border-subtle)]">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-medium text-[var(--kb-ink-muted)]">
                  <span className="font-mono font-semibold text-[var(--kb-accent)] tabular-nums">
                    {activePathway.index}.
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {bn
                      ? 'উদ্দেশ্যমূলক অবদান (প্রমাণিত প্রভাব নয়)'
                      : 'Intended Contribution (Not Proven Impact)'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--kb-ink)]">
                  {bn ? activePathway.title.bn : activePathway.title.en}
                </h3>
              </div>
              <span className="w-10 h-10 rounded-lg bg-[var(--kb-surface-sage)] text-[var(--kb-brand-text)] flex items-center justify-center shrink-0">
                <ActiveIcon className="w-5 h-5" />
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[var(--kb-ink)]">
                  {bn ? 'পরিকল্পিত অবদান' : 'Intended Contribution'}
                </h4>
                <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                  {bn
                    ? activePathway.intendedOutcome.bn
                    : activePathway.intendedOutcome.en}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[var(--kb-ink)]">
                  {bn ? 'প্রোটোটাইপে সংযুক্ত বৈশিষ্ট্য' : 'Supporting Prototype Workflows'}
                </h4>
                <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                  {bn ? activePathway.mechanism.bn : activePathway.mechanism.en}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--kb-border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-[var(--kb-ink-muted)]">
                {bn
                  ? activePathway.boundaryNote.bn
                  : activePathway.boundaryNote.en}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {activePathway.modules.map((mod) => (
                  <button
                    key={mod.route}
                    type="button"
                    onClick={() => onNavigate(mod.route)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface-muted)] hover:bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>{bn ? mod.label.bn : mod.label.en}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3-Column Overview Cards for Quick Scanning */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {INTENDED_PATHWAYS.map((pathway) => {
              const Icon = pathway.icon;
              const isSelected = pathway.id === activePathwayId;
              return (
                <button
                  key={pathway.id}
                  type="button"
                  onClick={() => setActivePathwayId(pathway.id)}
                  className={`text-left p-5 rounded-xl border transition-colors flex flex-col justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--kb-surface-sage)] border-[var(--kb-accent)]'
                      : 'bg-[var(--kb-surface)] border-[var(--kb-border)] hover:border-[var(--kb-accent)]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-[var(--kb-accent)] tabular-nums">
                        {pathway.index}.
                      </span>
                      <Icon className="w-4 h-4 text-[var(--kb-brand-text)]" />
                    </div>
                    <h3 className="text-base font-bold text-[var(--kb-ink)]">
                      {bn ? pathway.title.bn : pathway.title.en}
                    </h3>
                    <p className="text-xs text-[var(--kb-ink-muted)] leading-relaxed">
                      {bn ? pathway.mechanism.bn : pathway.mechanism.en}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[var(--kb-brand-text)]">
                    {bn ? 'বিস্তারিত দেখুন →' : 'Inspect pathway →'}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4 SDG Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            if (pillar.topicId) {
              const targetTopic = pillar.topicId;
              return (
                <button
                  key={pillar.index}
                  type="button"
                  onClick={() => setActiveSdgTopic(targetTopic)}
                  className="group text-left bg-[var(--kb-surface)] hover:bg-[var(--kb-surface-sage)]/55 border border-[var(--kb-border)] hover:border-[var(--kb-accent)] transition-colors rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-[var(--kb-accent)] tabular-nums">
                        {pillar.index}.
                      </span>
                      <Icon className="w-5 h-5 text-[var(--kb-brand-text)]" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--kb-ink)] group-hover:text-[var(--kb-brand-text)] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[var(--kb-ink-muted)] leading-relaxed">
                      {pillar.body}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--kb-brand-text)] group-hover:text-[var(--kb-accent)]">
                    <span>
                      {bn ? 'বিস্তারিত নির্দেশিকা খুলুন' : 'Open Detailed Guide'}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </button>
              );
            }
            return (
              <div
                key={pillar.index}
                className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 sm:p-8 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[var(--kb-accent)] tabular-nums">
                    {pillar.index}.
                  </span>
                  <Icon className="w-5 h-5 text-[var(--kb-brand-text)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--kb-ink)]">
                  {pillar.title}
                </h3>
                <p className="text-sm sm:text-base text-[var(--kb-ink-muted)] leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Strip */}
        <div className="bg-[#113520] dark:bg-[#0F2C1B] dark:border dark:border-[#1E5133] text-white rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">
              {bn
                ? 'প্রোটোটাইপের বিস্তার পরিকল্পনা ও কর্মপ্রবাহ দেখুন'
                : 'Explore rollout plans and interactive prototype workflows'}
            </h2>
            <p className="text-sm text-[#D1E2D7]">
              {bn
                ? 'স্কেলেবিলিটি রোডম্যাপ, কাল্পনিক আর্থিক মডেল এবং ক্রপ ডক্টর ডেমো ঘুরে দেখুন।'
                : 'Inspect the scalability roadmap, hypothetical financial model, or sample Crop Doctor flow.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('roadmap')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#14532D] bg-white dark:bg-[#ECF4EE] hover:bg-[#EEF2EC] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>{bn ? 'স্কেলেবিলিটি রোডম্যাপ' : 'Roadmap'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('financial-model')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#1E5133] hover:bg-[#276741] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>{bn ? 'আর্থিক মডেল' : 'Financial Model'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('detect')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#1E5133] hover:bg-[#276741] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <ScanSearch className="w-4 h-4" />
              <span>{bn ? 'রোগ শনাক্ত ডেমো' : 'Crop Doctor'}</span>
            </button>
          </div>
        </div>

        <SourceQualityNotice
          language={language}
          verifiedSource={{
            bn: 'জাতিসংঘ টেকসই উন্নয়ন লক্ষ্যমাত্রা ২.৪ (UN SDG Target 2.4) ও বাংলাদেশের জলবায়ু-সহনশীল কৃষি কৌশলগত কাঠামো।',
            en: 'UN Sustainable Development Goal Target 2.4 principles for resilient, ecosystem-protective food production.',
          }}
          demoScope={{
            bn: 'এই পৃষ্ঠাটি প্রোটোটাইপের উদ্দেশ্যমূলক অবদান ব্যাখ্যা করে; কোনো মনগড়া প্রভাব পরিসংখ্যান, জরিপ কিংবা প্রমাণিত ফলাফল দাবি করা হয়নি।',
            en: 'Explains intended contributions only; no fabricated empirical farmer metrics, surveys, partnerships, or proven impact claims are made.',
          }}
        />
      </div>

      <SdgTopicModal
        topic={activeSdgTopic}
        language={language}
        onClose={() => setActiveSdgTopic(null)}
        onNavigate={onNavigate}
      />
    </div>
  );
}
