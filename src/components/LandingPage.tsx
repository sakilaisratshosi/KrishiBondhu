import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  ArrowRight,
  BookOpen,
  Calculator,
  CalendarDays,
  CloudSun,
  Droplets,
  History,
  MessageSquare,
  Scale,
  ScanSearch,
  ShieldCheck,
  Sprout,
  User,
  Users,
} from 'lucide-react';
import { CROP_CULTIVATION_GUIDES } from '../data/cropCultivationData';
import { ASSETS } from '../data/krishiData';
import { Language, PageRoute } from '../types/krishi';
import { ResilientImage } from './ResilientImage';
import { SdgTopicId, SdgTopicModal } from './SdgTopicModal';

interface LandingPageProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
}

export function LandingPage({
  language,
  onToggleLanguage,
  onNavigate,
}: LandingPageProps) {
  const bn = language === 'bn';
  const [activeSdgTopic, setActiveSdgTopic] = useState<SdgTopicId | null>(null);

  const summaryStrip: {
    number: string;
    title: string;
    detail: string;
    route: PageRoute;
  }[] = [
    {
      number: '০১',
      title: bn ? 'বাংলা-প্রথম ইন্টারফেস' : 'Bangla-First Clarity',
      detail: bn
        ? 'সহজ বাংলা ও ইংরেজি সুইচসহ কৃষকবান্ধব নকশা'
        : 'Natural Bangla & English switch tailored for local growers',
      route: 'dashboard',
    },
    {
      number: '০২',
      title: bn ? 'নমুনা রোগ নির্দেশিকা' : 'Sample Leaf Inspection',
      detail: bn
        ? 'ধান, আলু, টমেটো ও বেগুনের লক্ষণভিত্তিক ডেমো'
        : 'Structured demo profiles for Rice, Potato, Tomato & Eggplant',
      route: 'detect',
    },
    {
      number: '০৩',
      title: bn ? 'জেলাভিত্তিক আবহাওয়া' : 'District Weather Timing',
      detail: bn
        ? '৫টি কৃষি অঞ্চলের নমুনা পূর্বাভাস ও সেচ-স্প্রে পরামর্শ'
        : 'Sample forecasts and spray timing across 5 regions',
      route: 'weather',
    },
    {
      number: '০৪',
      title: bn ? 'UN SDG 2.4 লক্ষ্যমাত্রা' : 'UN SDG 2.4 Alignment',
      detail: bn
        ? 'টেকসই খাদ্য উৎপাদন ও জলবায়ু সহনশীল কৃষি চর্চা'
        : 'Supporting resilient farming & reduced crop loss',
      route: 'sdg',
    },
  ];

  const workflowSteps: {
    step: string;
    title: string;
    detail: string;
    cta: string;
    route: PageRoute;
  }[] = [
    {
      step: '০১',
      title: bn ? 'ফসল ও পাতার ছবি নির্বাচন' : 'Select Crop & Leaf Photo',
      detail: bn
        ? 'ধান, আলু বা সবজি নির্বাচন করে পাতার ছবি আপলোড বা নমুনা ছবি লোড করুন।'
        : 'Choose a crop and upload a leaf image or test with built-in field samples.',
      cta: bn ? 'রোগ শনাক্তে যান' : 'Open Crop Doctor',
      route: 'detect',
    },
    {
      step: '০২',
      title: bn ? 'আবহাওয়া ও লক্ষণ মিলিয়ে দেখা' : 'Review Weather & Symptoms',
      detail: bn
        ? 'আর্দ্রতা, বৃষ্টি ও কুয়াশার নমুনা তথ্যের সাথে পাতার লক্ষণ ও কারণ যাচাই করুন।'
        : 'Match sample humidity and rainfall outlooks with preventive crop guidance.',
      cta: bn ? 'আবহাওয়া দেখুন' : 'Check Weather',
      route: 'weather',
    },
    {
      step: '০৩',
      title: bn ? 'দায়িত্বশীল পরিচর্যা ও ১৬১২৩' : 'Responsible Care & 16123',
      detail: bn
        ? 'বাংলা সহায়ক থেকে পরামর্শ জেনে উপজেলা কৃষি অফিসারের মাধ্যমে যাচাই করুন।'
        : 'Use the Bangla assistant and verify with your Upazila Agriculture Officer.',
      cta: bn ? 'বাংলা সহায়ক খুলুন' : 'Ask Assistant',
      route: 'assistant',
    },
  ];

  return (
    <div className="bg-[var(--kb-canvas)]">
      {/* HERO SECTION */}
      <section className="bg-[var(--kb-surface)] border-b border-[var(--kb-border)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
          >
            {/* Hero Copy Column */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-8 py-1">
              <div className="space-y-6">
                {/* Quiet Metadata + Language Switch Strip */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--kb-border-subtle)]">
                  <p className="text-xs font-medium text-[var(--kb-ink-muted)]">
                    {bn
                      ? 'AETHERMIND Hackathon 2026 · টিম INNOVORA · UN SDG 2.4 · বাংলাদেশ এগ্রিটেক'
                      : 'AETHERMIND Hackathon 2026 · Team INNOVORA · UN SDG 2.4 · Bangladesh AgriTech'}
                  </p>
                  <div
                    role="group"
                    aria-label={bn ? 'ভাষা পরিবর্তন' : 'Language switcher'}
                    className="inline-flex items-center p-1 bg-[var(--kb-surface-sage)] rounded-lg border border-[var(--kb-border)]"
                  >
                    <button
                      type="button"
                      onClick={() => onToggleLanguage('bn')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        bn
                          ? 'bg-[var(--kb-surface)] text-[var(--kb-brand-text)] shadow-xs'
                          : 'text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)]'
                      }`}
                    >
                      বাংলা
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleLanguage('en')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        !bn
                          ? 'bg-[var(--kb-surface)] text-[var(--kb-brand-text)] shadow-xs'
                          : 'text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)]'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                {/* Primary Hero Headline */}
                <h1
                  className={`text-[clamp(2rem,3.7vw,3.25rem)] font-bold tracking-tight text-[var(--kb-ink)] ${
                    bn ? 'leading-[1.28]' : 'leading-[1.14]'
                  }`}
                >
                  {bn
                    ? 'ফসলের রোগ শনাক্ত ও আবহাওয়া পরামর্শ—সহজ বাংলায় কৃষকের পাশে'
                    : 'Crop Disease Guidance and Weather Advice Built for Bangladeshi Farmers'}
                </h1>

                <p className="text-xs sm:text-sm font-semibold text-[var(--kb-accent)] tracking-wide">
                  {bn
                    ? '“স্মার্ট কৃষি, উন্নত চাষাবাদ, উজ্জ্বল ভবিষ্যৎ।” — Smart Agriculture, Better Farming, Better Future.'
                    : '“Smart Agriculture, Better Farming, Better Future.”'}
                </p>

                <p className="text-[15px] sm:text-lg text-[var(--kb-ink-muted)] leading-[1.72] max-w-[58ch]">
                  {bn
                    ? 'বাংলাদেশের ক্ষুদ্র ও প্রান্তিক কৃষকদের জন্য নির্মিত একটি স্ট্যাটিক এগ্রিটেক প্রোটোটাইপ—যেখানে পাতার ছবি দেখে নমুনা রোগের ধারণা, আবহাওয়াভিত্তিক সেচ ও স্প্রে সময়সূচি, চাষাবাদ জ্ঞানভাণ্ডার এবং আয়-ব্যয় হিসাব একসাথে পাওয়া যায়।'
                    : 'Built for Bangladeshi smallholder farmers, KrishiBondhu combines sample leaf-symptom inspection, localized weather-timed field guidance, crop libraries, and farm finance tracking in one Bangla-first workspace.'}
                </p>

                {/* Primary & Secondary CTAs */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => onNavigate('detect')}
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <ScanSearch className="w-4 h-4" />
                    <span>{bn ? 'রোগ শনাক্ত করুন' : 'Check Crop Disease'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('weather')}
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 text-sm sm:text-base font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface-sage)] hover:bg-[var(--kb-surface-sage-strong)] border border-[var(--kb-border)] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <CloudSun className="w-4 h-4" />
                    <span>{bn ? 'আবহাওয়া দেখুন' : 'View Weather Advisory'}</span>
                  </button>
                </div>
              </div>

              {/* Quick Workspace Access Link */}
              <div className="pt-4 border-t border-[var(--kb-border-subtle)] flex flex-wrap items-center justify-between gap-4 text-sm">
                <span className="text-[var(--kb-ink-muted)]">
                  {bn
                    ? 'নমুনা ডেটাসহ সরাসরি কৃষক ড্যাশবোর্ড ঘুরে দেখুন'
                    : 'Explore the interactive farmer workspace with sample data'}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className="inline-flex items-center gap-1.5 font-semibold text-[var(--kb-brand-text)] hover:text-[var(--kb-accent)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>{bn ? 'কৃষক ড্যাশবোর্ড দেখুন' : 'Open Farmer Dashboard'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Hero Visual Column */}
            <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-[var(--kb-border)] min-h-[280px] sm:min-h-[360px] lg:min-h-[470px]">
              <ResilientImage
                src={ASSETS.heroPaddy}
                alt={
                  bn
                    ? 'বাংলাদেশের সবুজ ধানক্ষেতের ভোরের দৃশ্য'
                    : 'Lush green rice paddy fields in rural Bangladesh at sunrise'
                }
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D12]/90 via-[#0A1D12]/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-[#0A1D12]/80 backdrop-blur-md border border-white/15 rounded-xl p-4 sm:p-5 text-white">
                <p className="text-xs font-medium text-[#6EE7B7] mb-1">
                  {bn
                    ? 'নমুনা প্রদর্শনী · টেকসই কৃষি সহায়তা'
                    : 'Prototype Showcase · Resilient Crop Care'}
                </p>
                <p className="text-sm sm:text-base font-medium leading-relaxed text-white/95">
                  {bn
                    ? 'সঠিক সময়ে লক্ষণ শনাক্তকরণ ও আবহাওয়া অনুযায়ী সিদ্ধান্ত ফসল ও মাটি উভয়কেই সুরক্ষিত রাখে।'
                    : 'Timely symptom checks paired with weather-aware irrigation and spray timing help safeguard smallholder harvests.'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* 4-Column Summary Strip Below Hero Split */}
          <div className="mt-10 pt-8 border-t border-[var(--kb-border)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryStrip.map((item) => (
              <button
                key={item.number}
                type="button"
                onClick={() => onNavigate(item.route)}
                className="group text-left rounded-xl p-3.5 border border-transparent hover:border-[var(--kb-border)] hover:bg-[var(--kb-surface-sage)]/55 transition-colors space-y-1.5 cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-semibold text-[var(--kb-accent)] tabular-nums">
                    {item.number}.
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--kb-ink-muted)] group-hover:text-[var(--kb-accent)] group-hover:translate-x-0.5 transition-all" />
                </div>
                <h2 className="text-base font-bold text-[var(--kb-ink)] group-hover:text-[var(--kb-brand-text)] transition-colors">
                  {item.title}
                </h2>
                <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                  {item.detail}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3-STEP WORKFLOW STRIP */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16">
        <div className="bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-6 border-b border-[var(--kb-border)]">
            <div>
              <p className="text-xs font-semibold text-[var(--kb-accent)]">
                {bn ? 'কার্যপ্রণালী' : 'How It Works'}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--kb-ink)] mt-1">
                {bn
                  ? 'সহজ ৩ ধাপে মাঠ পর্যায়ের নমুনা সহায়তা'
                  : 'Three clear steps from leaf check to field guidance'}
              </h2>
            </div>
            <span className="text-xs text-[var(--kb-ink-muted)]">
              {bn
                ? 'সকল ধাপ সরাসরি ব্রাউজারে কাজ করে'
                : 'Interactive locally in browser'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {workflowSteps.map((item) => (
              <button
                key={item.step}
                type="button"
                onClick={() => onNavigate(item.route)}
                className="group text-left bg-[var(--kb-surface)] border border-[var(--kb-border)] hover:border-[var(--kb-accent)] transition-colors rounded-xl p-5 flex flex-col justify-between gap-4 cursor-pointer"
              >
                <div className="space-y-2">
                  <span className="font-mono text-xs font-semibold text-[var(--kb-accent)] tabular-nums">
                    {bn ? `ধাপ ${item.step}` : `Step ${item.step}`}
                  </span>
                  <h3 className="text-base font-bold text-[var(--kb-ink)] group-hover:text-[var(--kb-brand-text)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kb-brand-text)] group-hover:text-[var(--kb-accent)] transition-colors self-start">
                  <span>{item.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM & SOLUTION EXPLANATION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="max-w-2xl mb-10 space-y-2">
          <p className="text-xs font-semibold text-[var(--kb-accent)]">
            {bn ? '০১. সমস্যা ও সমাধানের রূপরেখা' : '01. Problem & Solution'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--kb-ink)]">
            {bn
              ? 'ক্ষুদ্র কৃষকদের দৈনন্দিন চ্যালেঞ্জ ও কৃষিবন্ধুর প্রস্তাবিত সমাধান'
              : 'Addressing everyday field uncertainty for smallholder farmers'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Problem Card */}
          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 sm:p-8 space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[var(--kb-amber)]">
                {bn ? 'মাঠ পর্যায়ের সংকট' : 'Field Challenges'}
              </span>
              <h3 className="text-xl font-bold text-[var(--kb-ink)]">
                {bn
                  ? 'দেরিতে রোগ বোঝা ও অনিশ্চিত আবহাওয়ার ক্ষতি'
                  : 'Delayed symptom recognition & weather guesswork'}
              </h3>
            </div>
            <ul className="space-y-4 text-sm sm:text-[15px] text-[var(--kb-ink-muted)]">
              <li className="pb-4 border-b border-[var(--kb-border-subtle)]">
                <strong className="block text-[var(--kb-ink)] font-semibold mb-1">
                  {bn
                    ? 'প্রাথমিক রোগের লক্ষণ বুঝতে বিলম্ব'
                    : 'Late identification of leaf diseases'}
                </strong>
                {bn
                  ? 'ধানের ব্লাস্ট বা আলুর মড়ক রোগ শুরুতে শনাক্ত না হলে কয়েক দিনের মধ্যেই পুরো ক্ষেতে ছড়িয়ে পড়ে।'
                  : 'Fungal outbreaks such as rice blast or potato late blight spread rapidly across fields when early leaf signs are missed.'}
              </li>
              <li className="pb-4 border-b border-[var(--kb-border-subtle)]">
                <strong className="block text-[var(--kb-ink)] font-semibold mb-1">
                  {bn
                    ? 'বৃষ্টি ও আর্দ্রতার সাথে অসামঞ্জস্যপূর্ণ স্প্রে'
                    : 'Untimed spraying before rainfall'}
                </strong>
                {bn
                  ? 'বৃষ্টির পূর্বাভাস না জেনে সার বা বালাইনাশক প্রয়োগ করলে তা ধুয়ে গিয়ে কৃষকের আর্থিক ক্ষতি ও মাটির দূষণ ঘটায়।'
                  : 'Applying fertilizer or crop protection before rain causes runoff waste, higher costs, and soil degradation.'}
              </li>
              <li>
                <strong className="block text-[var(--kb-ink)] font-semibold mb-1">
                  {bn
                    ? 'জটিল ও ইংরেজি-নির্ভর তথ্য'
                    : 'Fragmented, non-local technical guidance'}
                </strong>
                {bn
                  ? 'সহজ বাংলায় ফসল-নির্দিষ্ট ও দায়িত্বশীল পরামর্শ এক জায়গায় না থাকায় কৃষকরা অনুমাননির্ভর সিদ্ধান্ত নিতে বাধ্য হন।'
                  : 'Farmers often lack clear Bangla guidance connecting weather patterns, crop symptoms, and extension services.'}
              </li>
            </ul>
          </div>

          {/* Solution Card */}
          <div className="bg-[#113520] dark:bg-[#0F2C1B] text-white border border-[#1A4B2E] dark:border-[#245638] rounded-xl p-6 sm:p-8 space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#6EE7B7]">
                {bn ? 'কৃষিবন্ধু পদ্ধতি' : 'The KrishiBondhu Approach'}
              </span>
              <h3 className="text-xl font-bold text-white">
                {bn
                  ? 'সহজ বাংলায় সচেতন সিদ্ধান্ত ও বিশেষজ্ঞ সংযোগ'
                  : 'Clear Bangla guidance paired with expert verification'}
              </h3>
            </div>
            <ul className="space-y-4 text-sm sm:text-[15px] text-[#D1E2D7]">
              <li className="pb-4 border-b border-[#1E5133]">
                <strong className="block text-white font-semibold mb-1">
                  {bn
                    ? 'ধাপে ধাপে পাতার লক্ষণ পর্যালোচনা (ডেমো)'
                    : 'Guided leaf inspection workflow (Demo)'}
                </strong>
                {bn
                  ? 'ফসলের ধরন ও পাতার ছবি নির্বাচন করে তাৎক্ষণিক নমুনা লক্ষণ, কারণ ও প্রতিরোধমূলক দিকনির্দেশনা দেখা যায়।'
                  : 'Select a crop and preview a leaf image to review structured sample symptoms, causes, and preventive practices.'}
              </li>
              <li className="pb-4 border-b border-[#1E5133]">
                <strong className="block text-white font-semibold mb-1">
                  {bn
                    ? 'আবহাওয়াভিত্তিক চাষাবাদ পরামর্শ'
                    : 'Weather-linked field timing'}
                </strong>
                {bn
                  ? 'আর্দ্রতা ও বৃষ্টির নমুনা পূর্বাভাসের সাথে মিলিয়ে কখন সেচ, সার বা স্প্রে করা নিরাপদ তা সহজেই বোঝা যায়।'
                  : 'Matches sample district humidity and rain outlooks with practical windows for irrigation, mulching, and spraying.'}
              </li>
              <li>
                <strong className="block text-white font-semibold mb-1">
                  {bn
                    ? 'দায়িত্বশীল কৃষি ও উপজেলা অফিস সংযোগ'
                    : 'Responsible stewardship & 16123 referral'}
                </strong>
                {bn
                  ? 'অযথা রাসায়নিক ব্যবহার নিরুৎসাহিত করে এবং চূড়ান্ত পদক্ষেপের আগে উপজেলা কৃষি অফিস বা ১৬১২৩ নম্বরে যাচাইয়ের পরামর্শ দেয়।'
                  : 'Encourages preventive care first and recommends verifying with an Upazila Agriculture Officer or 16123 before chemical use.'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* MAIN FEATURE SHOWCASE (ASYMMETRIC BENTO GRID) */}
      <section className="bg-[var(--kb-surface)] border-y border-[var(--kb-border)] py-14 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-semibold text-[var(--kb-accent)]">
                {bn ? '০২. মূল সুবিধাসমূহ' : '02. Core Capabilities'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--kb-ink)]">
                {bn
                  ? 'একটি সমন্বিত কৃষি কর্মক্ষেত্র—প্রতিটি ফিচার সরাসরি ব্যবহারযোগ্য'
                  : 'Integrated AgriTech tools designed for daily field decisions'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kb-brand-text)] hover:text-[var(--kb-accent)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{bn ? 'ড্যাশবোর্ড খুলুন' : 'Open Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Marquee Feature 1: Crop Disease Detection (Span 2) */}
            <button
              type="button"
              onClick={() => onNavigate('detect')}
              className="group text-left lg:col-span-2 bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] hover:border-[var(--kb-accent)] transition-colors rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 cursor-pointer"
            >
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-[var(--kb-ink-muted)]">
                    <span>{bn ? 'ফিচার ০১' : 'Feature 01'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{bn ? 'AI ভিশন বিশ্লেষণ' : 'Gemini Vision AI'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--kb-ink)] group-hover:text-[var(--kb-brand-text)] transition-colors">
                    {bn
                      ? 'ফসলের রোগ শনাক্তকরণ ও দায়িত্বশীল পরামর্শ'
                      : 'Crop Disease Detection & Care Guide'}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-[var(--kb-ink-muted)] leading-relaxed">
                    {bn
                      ? 'ক্যামেরায় তোলা বা গ্যালারির ফসলের ছবি পাঠিয়ে Gemini Vision AI-এর মাধ্যমে তাৎক্ষণিক ফসল শনাক্তকরণ, রোগ ও সমস্যার লক্ষণ, কারণ, করণীয় এবং প্রতিরোধের উপায় জানুন।'
                      : 'Capture a camera photo or upload from your gallery to get real-time Gemini Vision crop identification, symptom analysis, causes, action steps, and prevention guidance.'}
                  </p>
                </div>
                <div>
                  <span className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 text-sm font-semibold text-white bg-[var(--kb-brand)] group-hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors whitespace-nowrap">
                    <ScanSearch className="w-4 h-4" />
                    <span>{bn ? 'রোগ শনাক্ত পেজে যান' : 'Try Crop Doctor'}</span>
                  </span>
                </div>
              </div>
              <div className="md:col-span-5 min-h-[220px] border-t md:border-t-0 md:border-l border-[var(--kb-border)]">
                <ResilientImage
                  src={ASSETS.riceBlast}
                  alt={bn ? 'ধানের পাতার নমুনা ছবি' : 'Sample rice leaf blast lesion'}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>

            {/* Feature 2: Weather Advisory */}
            <button
              type="button"
              onClick={() => onNavigate('weather')}
              className="group text-left bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] hover:border-[var(--kb-accent)] transition-colors rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6 cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-medium text-[var(--kb-ink-muted)]">
                  <span>{bn ? 'ফিচার ০২' : 'Feature 02'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{bn ? '৫টি জেলা' : '5 Districts'}</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--kb-ink)] group-hover:text-[var(--kb-brand-text)] transition-colors">
                  {bn
                    ? 'আবহাওয়াভিত্তিক কৃষি সতর্কতা'
                    : 'Weather-Timed Field Advisory'}
                </h3>
                <p className="text-sm sm:text-[15px] text-[var(--kb-ink-muted)] leading-relaxed">
                  {bn
                    ? 'তাপমাত্রা, আর্দ্রতা ও বৃষ্টিপাতের নমুনা পূর্বাভাস দেখে কখন সেচ, সার বা স্প্রে করা নিরাপদ তা জেনে নিন।'
                    : 'Review sample temperature, rainfall, and humidity outlooks paired with clear spraying and drainage guidance.'}
                </p>
              </div>
              <div className="w-full pt-4 border-t border-[var(--kb-border)] flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-[var(--kb-ink-muted)] tabular-nums">
                  {bn ? 'নমুনা পূর্বাভাস: ৫ দিন' : 'Sample Forecast: 5 Days'}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kb-brand-text)] group-hover:text-[var(--kb-accent)] transition-colors whitespace-nowrap">
                  <span>{bn ? 'আবহাওয়া দেখুন' : 'View Weather'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </button>

            {/* Feature 3: Bangla Farming Assistant */}
            <button
              type="button"
              onClick={() => onNavigate('assistant')}
              className="group text-left bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] hover:border-[var(--kb-accent)] transition-colors rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6 cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-medium text-[var(--kb-ink-muted)]">
                  <span>{bn ? 'ফিচার ০৩' : 'Feature 03'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{bn ? 'অফলাইন ডেমো' : 'Local Demo'}</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--kb-ink)] group-hover:text-[var(--kb-brand-text)] transition-colors">
                  {bn
                    ? 'বাংলা কৃষি সহায়ক চ্যাট'
                    : 'Bangla Farming Assistant'}
                </h3>
                <p className="text-sm sm:text-[15px] text-[var(--kb-ink-muted)] leading-relaxed">
                  {bn
                    ? 'প্রস্তাবিত প্রশ্ন বা নিজের ভাষায় ধান, আলু, টমেটো ও সারের ব্যবহার সম্পর্কে তাৎক্ষণিক নমুনা উত্তর পান।'
                    : 'Explore a responsive local chat experience with suggested Bangladeshi crop questions and safe guidance.'}
                </p>
              </div>
              <div className="w-full pt-4 border-t border-[var(--kb-border)] flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-[var(--kb-ink-muted)]">
                  <MessageSquare className="w-3.5 h-3.5 text-[var(--kb-brand-text)]" />
                  <span>{bn ? 'বাংলা ও ইংরেজি' : 'Bangla & English'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kb-brand-text)] group-hover:text-[var(--kb-accent)] transition-colors whitespace-nowrap">
                  <span>{bn ? 'চ্যাট খুলুন' : 'Open Chat'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </button>

            {/* Feature 4: Disease History (Span 2) */}
            <button
              type="button"
              onClick={() => onNavigate('history')}
              className="group text-left lg:col-span-2 bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] hover:border-[var(--kb-accent)] transition-colors rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 cursor-pointer"
            >
              <div className="md:col-span-5 min-h-[200px] border-b md:border-b-0 md:border-r border-[var(--kb-border)]">
                <ResilientImage
                  src={ASSETS.potatoBlight}
                  alt={bn ? 'আলুর পাতার নমুনা ছবি' : 'Sample potato leaf late blight'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-[var(--kb-ink-muted)]">
                    <span>{bn ? 'ফিচার ০৪' : 'Feature 04'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{bn ? 'অনুসন্ধান ও ফিল্টার' : 'Search & Filter'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--kb-ink)] group-hover:text-[var(--kb-brand-text)] transition-colors">
                    {bn
                      ? 'পূর্ববর্তী রোগ পরীক্ষার ইতিহাস ও নথি'
                      : 'Crop Inspection History & Searchable Log'}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-[var(--kb-ink-muted)] leading-relaxed">
                    {bn
                      ? 'কোন তারিখে কোন জমির ফসলে কী নমুনা সমস্যা দেখা দিয়েছিল তা তারিখ, ফসল ও সতর্কতার ধরন অনুযায়ী খুঁজে বের করুন এবং বিস্তারিত রিপোর্ট আবার দেখুন।'
                      : 'Track sample inspection records by crop, district, date, and severity level—and reopen any report in full detail.'}
                  </p>
                </div>
                <div>
                  <span className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 text-sm font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface)] group-hover:bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-lg transition-colors whitespace-nowrap">
                    <History className="w-4 h-4" />
                    <span>{bn ? 'রোগের ইতিহাস দেখুন' : 'Browse History'}</span>
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Extended 8 Modules Grid (Modules 05-12) */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <button
              type="button"
              onClick={() => onNavigate('cultivation')}
              className="group text-left bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] hover:border-[var(--kb-accent)] transition-colors rounded-xl p-6 flex flex-col justify-between gap-4 cursor-pointer"
            >
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[var(--kb-ink-muted)]">
                    {bn ? 'মডিউল ০৫' : 'Module 05'}
                  </span>
                  <BookOpen className="w-4 h-4 text-[var(--kb-brand-text)]" />
                </div>
                <h3 className="text-base font-bold text-[var(--kb-ink)] group-hover:text-[var(--kb-brand-text)] transition-colors">
                  {bn ? 'বাংলাদেশ ফসল জ্ঞানভাণ্ডার' : 'Bangladesh Crop Library'}
                </h3>
                <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                  {bn
                    ? `${CROP_CULTIVATION_GUIDES.length}টি দেশীয় ফসলের চাষাবাদ নির্দেশিকা (৮টি শ্রেণি), অফলাইন সংরক্ষণ ও বাংলা-ইংরেজি সার্চ।`
                    : `${CROP_CULTIVATION_GUIDES.length} Bangladeshi crop guides across 8 categories with offline-saved access.`}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kb-brand-text)] group-hover:text-[var(--kb-accent)] self-start">
                <span>{bn ? 'জ্ঞানভাণ্ডার খুলুন' : 'Open Crop Library'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('soil')}
              className="group text-left bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] hover:border-[var(--kb-accent)] transition-colors rounded-xl p-6 flex flex-col justify-between gap-4 cursor-pointer"
            >
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[var(--kb-ink-muted)]">
                    {bn ? 'মডিউল ০৬' : 'Module 06'}
                  </span>
                  <Droplets className="w-4 h-4 text-[var(--kb-brand-text)]" />
                </div>
                <h3 className="text-base font-bold text-[var(--kb-ink)] group-hover:text-[var(--kb-brand-text)] transition-colors">
                  {bn ? 'মাটি ও সেচ ব্যবস্থাপনা' : 'Soil & Irrigation Care'}
                </h3>
                <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                  {bn
                    ? 'ফসল ও মাটির ধরন অনুযায়ী পিএইচ (pH), জৈব সার ও নিরাপদ সেচ পরিকল্পনা।'
                    : 'Soil pH alignment, organic care, and moisture-aware irrigation tips.'}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kb-brand-text)] group-hover:text-[var(--kb-accent)] self-start">
                <span>{bn ? 'মাটি ও সেচ দেখুন' : 'Open Soil Guide'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('calendar')}
              className="group text-left bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] hover:border-[var(--kb-accent)] transition-colors rounded-xl p-6 flex flex-col justify-between gap-4 cursor-pointer"
            >
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[var(--kb-ink-muted)]">
                    {bn ? 'মডিউল ০৭' : 'Module 07'}
                  </span>
                  <CalendarDays className="w-4 h-4 text-[var(--kb-brand-text)]" />
                </div>
                <h3 className="text-base font-bold text-[var(--kb-ink)] group-hover:text-[var(--kb-brand-text)] transition-colors">
                  {bn ? 'ক্যালেন্ডার ও কৃষি ডায়েরি' : 'Calendar & Farming Journal'}
                </h3>
                <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                  {bn
                    ? 'মৌসুমি চাষাবাদ সূচি, কাজের চেকলিস্ট এবং ব্যক্তিগত জমির পর্যবেক্ষণ ডায়েরি।'
                    : 'Crop stage schedules, task checklists, and persistent field journal notes.'}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kb-brand-text)] group-hover:text-[var(--kb-accent)] self-start">
                <span>{bn ? 'ক্যালেন্ডার ও ডায়েরি' : 'Open Calendar'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('risk')}
              className="group text-left bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] hover:border-[var(--kb-accent)] transition-colors rounded-xl p-6 flex flex-col justify-between gap-4 cursor-pointer"
            >
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[var(--kb-ink-muted)]">
                    {bn ? 'মডিউল ০৮' : 'Module 08'}
                  </span>
                  <Activity className="w-4 h-4 text-[var(--kb-brand-text)]" />
                </div>
                <h3 className="text-base font-bold text-[var(--kb-ink)] group-hover:text-[var(--kb-brand-text)] transition-colors">
                  {bn ? 'রোগের ঝুঁকি পূর্বাভাস' : 'Disease Risk Predictor'}
                </h3>
                <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                  {bn
                    ? 'আর্দ্রতা, তাপমাত্রা ও কুয়াশা অনুযায়ী নিম্ন/মাঝারি/উচ্চ ঝুঁকির ডেমো বিশ্লেষণ।'
                    : 'Interactive Low, Medium, High risk simulation with factor explanations.'}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kb-brand-text)] group-hover:text-[var(--kb-accent)] self-start">
                <span>{bn ? 'ঝুঁকি যাচাই করুন' : 'Predict Risk'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('finance')}
              className="group text-left bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] hover:border-[var(--kb-accent)] transition-colors rounded-xl p-6 flex flex-col justify-between gap-4 cursor-pointer"
            >
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[var(--kb-ink-muted)]">
                    {bn ? 'মডিউল ০৯' : 'Module 09'}
                  </span>
                  <Calculator className="w-4 h-4 text-[var(--kb-brand-text)]" />
                </div>
                <h3 className="text-base font-bold text-[var(--kb-ink)] group-hover:text-[var(--kb-brand-text)] transition-colors">
                  {bn ? 'খরচ ও লাভ হিসাব' : 'Expense & Profit Tracker'}
                </h3>
                <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                  {bn
                    ? 'মাসভিত্তিক খরচ, বীজ-সার-সেচ হিসাব, সম্ভাব্য আয় এবং লাভ-ক্ষতির চার্ট।'
                    : 'Track BDT expenses, monthly summaries, estimated revenue, and profit charts.'}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kb-brand-text)] group-hover:text-[var(--kb-accent)] self-start">
                <span>{bn ? 'হিসাব খুলুন' : 'Open Tracker'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('fair-price')}
              className="group text-left bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] hover:border-[var(--kb-accent)] transition-colors rounded-xl p-6 flex flex-col justify-between gap-4 cursor-pointer"
            >
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[var(--kb-ink-muted)]">
                    {bn ? 'মডিউল ১০' : 'Module 10'}
                  </span>
                  <Scale className="w-4 h-4 text-[var(--kb-brand-text)]" />
                </div>
                <h3 className="text-base font-bold text-[var(--kb-ink)] group-hover:text-[var(--kb-brand-text)] transition-colors">
                  {bn ? 'আয় ও ন্যায্যমূল্য ট্র্যাকার' : 'Income & Fair Price Tracker'}
                </h3>
                <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                  {bn
                    ? 'ফসল বিক্রয়ের নিট আয় হিসাব এবং স্থানীয় বাজারের রেফারেন্স দরের সাথে তুলনা।'
                    : 'Calculate net crop sale income and compare prices against local references.'}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kb-brand-text)] group-hover:text-[var(--kb-accent)] self-start">
                <span>{bn ? 'ন্যায্যমূল্য দেখুন' : 'Open Fair Price'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('community')}
              className="group text-left bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] hover:border-[var(--kb-accent)] transition-colors rounded-xl p-6 flex flex-col justify-between gap-4 cursor-pointer"
            >
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[var(--kb-ink-muted)]">
                    {bn ? 'মডিউল ১১' : 'Module 11'}
                  </span>
                  <Users className="w-4 h-4 text-[var(--kb-brand-text)]" />
                </div>
                <h3 className="text-base font-bold text-[var(--kb-ink)] group-hover:text-[var(--kb-brand-text)] transition-colors">
                  {bn ? 'কৃষক কমিউনিটি' : 'Farmer Community'}
                </h3>
                <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                  {bn
                    ? 'ফসলের ছবি শেয়ার, লাইক, মন্তব্য ও নমুনা কৃষি বিশেষজ্ঞ পরামর্শ দেখুন।'
                    : 'Share demo field posts, like, comment, and view sample expert advice.'}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kb-brand-text)] group-hover:text-[var(--kb-accent)] self-start">
                <span>{bn ? 'কমিউনিটি দেখুন' : 'Open Community'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('profile')}
              className="group text-left bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] hover:border-[var(--kb-accent)] transition-colors rounded-xl p-6 flex flex-col justify-between gap-4 cursor-pointer"
            >
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[var(--kb-ink-muted)]">
                    {bn ? 'মডিউল ১২' : 'Module 12'}
                  </span>
                  <User className="w-4 h-4 text-[var(--kb-brand-text)]" />
                </div>
                <h3 className="text-base font-bold text-[var(--kb-ink)] group-hover:text-[var(--kb-brand-text)] transition-colors">
                  {bn ? 'আমার কৃষক প্রোফাইল' : 'My Farmer Profile'}
                </h3>
                <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                  {bn
                    ? 'কৃষকের তথ্য, জেলা-উপজেলা, পছন্দের ফসল, জমি ও সংরক্ষিত এলাকা ব্যবস্থাপনা।'
                    : 'Manage farmer details, district & upazila, crops, and saved farm locations.'}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kb-brand-text)] group-hover:text-[var(--kb-accent)] self-start">
                <span>{bn ? 'প্রোফাইল খুলুন' : 'Open Profile'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* SDG 2.4 ALIGNMENT SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 min-h-[260px] lg:min-h-[420px]">
            <ResilientImage
              src={ASSETS.sdgFarming}
              alt={
                bn
                  ? 'বাংলাদেশের টেকসই সমন্বিত কৃষি ও সবজি চাষ'
                  : 'Sustainable smallholder rice and vegetable plots in deltaic Bangladesh'
              }
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--kb-accent)]">
                <Sprout className="w-4 h-4" />
                <span>
                  {bn
                    ? 'জাতিসংঘ টেকসই উন্নয়ন লক্ষ্যমাত্রা ২.৪ (UN SDG 2.4)'
                    : 'UN Sustainable Development Goal Target 2.4'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--kb-ink)]">
                {bn
                  ? 'টেকসই খাদ্য উৎপাদন ও জলবায়ু সহনশীল কৃষি ব্যবস্থা'
                  : 'Advancing resilient agricultural practices and sustainable harvests'}
              </h2>
              <p className="text-sm sm:text-[15px] text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? 'কৃষিবন্ধুর প্রতিটি উপাদান এসডিজি ২.৪ লক্ষ্যমাত্রার সাথে সামঞ্জস্য রেখে নকশা করা হয়েছে—যাতে ক্ষুদ্র কৃষকরা অপ্রয়োজনীয় রাসায়নিক কমিয়ে, আবহাওয়ার ঝুঁকি বুঝে ও সময়মতো সতর্ক হয়ে ফসল রক্ষা করতে পারেন।'
                  : 'Every workflow in KrishiBondhu aligns with UN SDG 2.4 by emphasizing preventive field management, climate-aware timing, reduced preventable crop loss, and responsible input stewardship.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveSdgTopic('crop-loss')}
                  className="group text-left p-4 bg-[var(--kb-surface-muted)] hover:bg-[var(--kb-surface-sage)] rounded-xl border border-[var(--kb-border-subtle)] hover:border-[var(--kb-accent)] transition-colors flex flex-col justify-between gap-2.5 cursor-pointer"
                >
                  <div>
                    <h3 className="text-sm font-bold text-[var(--kb-ink)] group-hover:text-[var(--kb-brand-text)] mb-1 transition-colors">
                      {bn ? 'প্রতিরোধযোগ্য ফসলহানি হ্রাস' : 'Reduced Preventable Loss'}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                      {bn
                        ? 'প্রাথমিক পর্যায়ে পাতার রোগ শনাক্ত ও দ্রুত কৃষি পরামর্শ গ্রহণ।'
                        : 'Early symptom awareness and timely expert escalation.'}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--kb-brand-text)] group-hover:text-[var(--kb-accent)]">
                    <span>{bn ? 'বিস্তারিত নির্দেশিকা দেখুন' : 'View Disease Prevention Guide'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSdgTopic('resource-use')}
                  className="group text-left p-4 bg-[var(--kb-surface-muted)] hover:bg-[var(--kb-surface-sage)] rounded-xl border border-[var(--kb-border-subtle)] hover:border-[var(--kb-accent)] transition-colors flex flex-col justify-between gap-2.5 cursor-pointer"
                >
                  <div>
                    <h3 className="text-sm font-bold text-[var(--kb-ink)] group-hover:text-[var(--kb-brand-text)] mb-1 transition-colors">
                      {bn ? 'সম্পদের দায়িত্বশীল ব্যবহার' : 'Responsible Resource Use'}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                      {bn
                        ? 'বৃষ্টির আগে স্প্রে এড়িয়ে মাটি, পানি ও কৃষি ব্যয় সুরক্ষা।'
                        : 'Avoiding wasteful pre-rain spraying to protect soil and water.'}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--kb-brand-text)] group-hover:text-[var(--kb-accent)]">
                    <span>{bn ? 'সম্পদ ব্যবহারের নিয়ম দেখুন' : 'View Resource Stewardship'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-[var(--kb-border-subtle)]">
              <span className="inline-flex items-center gap-1.5 text-xs text-[var(--kb-ink-muted)]">
                <ShieldCheck className="w-4 h-4 text-[var(--kb-accent)]" />
                {bn
                  ? 'উদ্দেশ্যমূলক অবদান · বাস্তব প্রভাব বা পরিসংখ্যানের দাবি নয়'
                  : 'Intended contributions · No fabricated field claims'}
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('sdg')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kb-brand-text)] hover:text-[var(--kb-accent)] transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>{bn ? 'এসডিজি ২.৪ বিস্তারিত' : 'UN SDG 2.4 Impact'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span aria-hidden="true" className="text-[var(--kb-border)]">|</span>
                <button
                  type="button"
                  onClick={() => onNavigate('roadmap')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kb-brand-text)] hover:text-[var(--kb-accent)] transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>{bn ? 'বিস্তার রোডম্যাপ' : 'Scalability Roadmap'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span aria-hidden="true" className="text-[var(--kb-border)]">|</span>
                <button
                  type="button"
                  onClick={() => onNavigate('financial-model')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kb-brand-text)] hover:text-[var(--kb-accent)] transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>
                    {bn
                      ? 'আর্থিক মডেল (ফ্রি ৳০ / প্রস্তাবিত ৳৯৯)'
                      : 'Business & Financial Model'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span aria-hidden="true" className="text-[var(--kb-border)]">|</span>
                <button
                  type="button"
                  onClick={() => onNavigate('fair-price')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--kb-brand-text)] hover:text-[var(--kb-accent)] transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>{bn ? 'আয় ও ন্যায্যমূল্য' : 'Income & Fair Price'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SdgTopicModal
        topic={activeSdgTopic}
        language={language}
        onClose={() => setActiveSdgTopic(null)}
        onNavigate={onNavigate}
      />
    </div>
  );
}
