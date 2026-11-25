import { useEffect } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Bug,
  CheckCircle2,
  Droplets,
  Leaf,
  PackageCheck,
  PhoneCall,
  ScanSearch,
  ShieldCheck,
  Sprout,
  Wheat,
  X,
} from 'lucide-react';
import { Language, PageRoute } from '../types/krishi';

export type SdgTopicId = 'crop-loss' | 'resource-use';

interface SdgTopicModalProps {
  topic: SdgTopicId | null;
  language: Language;
  onClose: () => void;
  onNavigate: (page: PageRoute) => void;
}

export function SdgTopicModal({
  topic,
  language,
  onClose,
  onNavigate,
}: SdgTopicModalProps) {
  const bn = language === 'bn';

  useEffect(() => {
    if (!topic) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [topic, onClose]);

  if (!topic) return null;

  const isCropLoss = topic === 'crop-loss';

  const handleGoToRoute = (route: PageRoute) => {
    onClose();
    onNavigate(route);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sdg-topic-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[90vh] flex flex-col bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-2xl shadow-2xl overflow-hidden text-[var(--kb-ink)]"
      >
        {/* Sticky Modal Header */}
        <div className="px-5 sm:px-7 py-4 sm:py-5 border-b border-[var(--kb-border)] bg-[var(--kb-surface-sage)] flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--kb-accent)]">
              {isCropLoss ? (
                <ShieldCheck className="w-4 h-4" />
              ) : (
                <Droplets className="w-4 h-4" />
              )}
              <span>
                {bn
                  ? 'UN SDG 2.4 · কৃষক সহায়ক নির্দেশিকা'
                  : 'UN SDG 2.4 · Farmer Field Guide'}
              </span>
            </div>
            <h2
              id="sdg-topic-modal-title"
              className="text-lg sm:text-xl font-bold text-[var(--kb-ink)]"
            >
              {isCropLoss
                ? bn
                  ? 'প্রতিরোধযোগ্য ফসলহানি হ্রাস (Preventable Crop Loss)'
                  : 'Reduced Preventable Crop Loss'
                : bn
                ? 'সম্পদের দায়িত্বশীল ব্যবহার (Responsible Resource Use)'
                : 'Responsible Resource Use'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={bn ? 'বিস্তারিত বন্ধ করুন' : 'Close details modal'}
            className="w-9 h-9 rounded-lg border border-[var(--kb-border)] bg-[var(--kb-surface)] hover:bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] inline-flex items-center justify-center shrink-0 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {isCropLoss ? (
            <>
              <p className="text-sm sm:text-[15px] text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? 'বাংলাদেশে ধানের ব্লাস্ট, আলুর মড়ক বা সবজির ছত্রাকজনিত রোগ শুরুতে ধরা পড়লে বড় ধরনের ফলন ক্ষতি এড়ানো সম্ভব। নিচে সাধারণ রোগ, প্রাথমিক লক্ষণ, প্রতিরোধ ও করণীয় দেওয়া হলো:'
                  : 'Recognizing crop diseases early in Bangladesh helps prevent severe yield loss across rice, potato, and vegetable plots. Review common outbreaks, early warning signs, prevention methods, and safe action steps below.'}
              </p>

              {/* Section 1: Common Crop Diseases */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[var(--kb-ink)]">
                  <Bug className="w-4 h-4 text-[var(--kb-brand-text)]" />
                  <h3>
                    {bn
                      ? '১. বাংলাদেশে সাধারণ ফসলের রোগসমূহ'
                      : '1. Common Crop Diseases in Bangladesh'}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      crop: bn ? 'ধান (Rice)' : 'Rice (Paddy)',
                      disease: bn ? 'ব্লাস্ট ও পাতা পোড়া রোগ' : 'Rice Blast & Bacterial Leaf Blight',
                      note: bn
                        ? 'আর্দ্র আবহাওয়া ও অতিরিক্ত ইউরিয়া প্রয়োগে দ্রুত ছড়ায়।'
                        : 'Spreads rapidly in humid weather or with excess urea.',
                    },
                    {
                      crop: bn ? 'আলু (Potato)' : 'Potato',
                      disease: bn ? 'নাবি ধসা বা লেট ব্লাইট (মড়ক)' : 'Potato Late Blight',
                      note: bn
                        ? 'শীতের কুয়াশা ও মেঘলা আবহাওয়ায় ২–৪ দিনে ক্ষেত নষ্ট করতে পারে।'
                        : 'Can devastate foliage within 2–4 days during dense winter fog.',
                    },
                    {
                      crop: bn ? 'টমেটো ও মরিচ' : 'Tomato & Chili',
                      disease: bn ? 'আগাম ধসা ও পাতা কোঁকড়ানো ভাইরাস' : 'Early Blight & Leaf Curl Virus',
                      note: bn
                        ? 'সাদামাছি ও চারা অবস্থায় সংক্রমণ থেকে ফলন মারাত্মকভাবে কমে।'
                        : 'Spread via whiteflies or infected soil residue, reducing fruit set.',
                    },
                    {
                      crop: bn ? 'বেগুন (Eggplant)' : 'Eggplant (Brinjal)',
                      disease: bn ? 'ঢলে পড়া (ব্যাকটেরিয়াল উইল্ট) ও ডগা ছিদ্রকারী' : 'Bacterial Wilt & Shoot Borer',
                      note: bn
                        ? 'জলাবদ্ধ মাটি ও আক্রান্ত ডগা না সরালে গাছ দ্রুত শুকিয়ে যায়।'
                        : 'Triggered by waterlogged roots and unpruned infested shoots.',
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[var(--kb-surface-muted)] border border-[var(--kb-border-subtle)] space-y-1"
                    >
                      <p className="text-xs font-semibold text-[var(--kb-accent)]">
                        {item.crop}
                      </p>
                      <p className="text-sm font-bold text-[var(--kb-ink)]">
                        {item.disease}
                      </p>
                      <p className="text-xs text-[var(--kb-ink-muted)] leading-relaxed">
                        {item.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Early Warning Signs & Prevention */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[var(--kb-warn-bg)] border border-[var(--kb-warn-border)] space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--kb-warn-title)]">
                    <AlertTriangle className="w-4 h-4 text-[var(--kb-warn-icon)]" />
                    <h3>
                      {bn ? '২. প্রাথমিক সতর্কতামূলক লক্ষণ' : '2. Early Warning Signs'}
                    </h3>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--kb-warn-text)]">
                    {(bn
                      ? [
                          'পাতায় চোখের আকৃতির ধূসর-সাদা বা বাদামি দাগ (ব্লাস্ট)।',
                          'সকালের কুয়াশায় পাতার কিনারায় পানি-ভেজা কালচে পচন।',
                          'কচি পাতা হলুদ হয়ে যাওয়া, কুঁকড়ে যাওয়া বা হঠাৎ ঢলে পড়া।',
                          'পাতার নিচে সাদা পাউডারের মতো আস্তরণ বা সূক্ষ্ম পোকার ডিম।',
                        ]
                      : [
                          'Diamond/spindle-shaped gray or brown spots on young rice leaves.',
                          'Water-soaked dark patches along leaf edges after cold fog.',
                          'Sudden wilting, upward curling, or yellowing of lower leaves.',
                          'Powdery undersides or visible sap-sucking whiteflies/aphids.',
                        ]
                    ).map((sign, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-mono text-[11px] font-bold mt-0.5">
                          •
                        </span>
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--kb-brand-text)]">
                    <ShieldCheck className="w-4 h-4 text-[var(--kb-accent)]" />
                    <h3>
                      {bn ? '৩. প্রতিরোধমূলক পদ্ধতি' : '3. Prevention Methods'}
                    </h3>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--kb-ink)]">
                    {(bn
                      ? [
                          'রোগ-সহনশীল ও সুস্থ প্রত্যয়িত (BARI/BRRI) বীজ ব্যবহার।',
                          'সুষম ইউরিয়া-পটাশ-জৈব সার প্রয়োগ ও সঠিক দূরত্ব রেখে রোপণ।',
                          'আগাছা পরিষ্কার রাখা ও বৃষ্টির পর দ্রুত পানি নিষ্কাশন নালা খোলা।',
                          'একই জমিতে বারবার একই পরিবারের ফসল না করে শস্য পর্যায় মানা।',
                        ]
                      : [
                          'Use disease-tolerant certified varieties (BARI/BRRI lines).',
                          'Maintain proper row spacing for airflow and balanced NPK nutrition.',
                          'Keep drainage channels clear and remove weeds around plot bunds.',
                          'Rotate crops (e.g., pulses after cereals) to break pathogen cycles.',
                        ]
                    ).map((method, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--kb-accent)] shrink-0 mt-1" />
                        <span>{method}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Section 3: Recommended Solutions & Practical Farmer Advice */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] space-y-2.5">
                  <h3 className="text-sm font-bold text-[var(--kb-ink)]">
                    {bn ? '৪. সুপারিশকৃত নিরাপদ সমাধান' : '4. Recommended Safe Solutions'}
                  </h3>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--kb-ink-muted)]">
                    {(bn
                      ? [
                          'রোগের শুরুতে আক্রান্ত ডগা বা পাতা সাবধানে তুলে জমি থেকে দূরে নষ্ট করুন।',
                          'প্রথম ধাপে নিম তেল বা সমন্বিত বালাই ব্যবস্থাপনা (IPM) অনুসরণ করুন।',
                          'নমুনা লক্ষণ বুঝতে ক্রপ ডক্টরে ছবি দেখুন এবং ঝুঁকি সূচক যাচাই করুন।',
                          'বালাইনাশক ব্যবহারের আগে অবশ্যই উপজেলা কৃষি অফিসার বা ১৬১২৩-এ পরামর্শ নিন।',
                        ]
                      : [
                          'Carefully prune and destroy first infected leaves away from healthy rows.',
                          'Prioritize IPM hygiene, pheromone traps, or neem-based sprays early on.',
                          'Use Crop Doctor (Demo) and Disease Risk Predictor to inspect conditions.',
                          'Consult your Upazila Agriculture Officer or dial 16123 before chemical sprays.',
                        ]
                    ).map((sol, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-mono text-xs font-semibold text-[var(--kb-accent)]">
                          0{i + 1}.
                        </span>
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#113520] dark:bg-[#0F2C1B] text-white border border-[#1E5133] space-y-2.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#A7F3D0]">
                    <PhoneCall className="w-4 h-4" />
                    <h3>
                      {bn
                        ? '৫. কৃষকের জন্য ব্যবহারিক পরামর্শ'
                        : '5. Practical Field Advice for Farmers'}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#D1E2D7] leading-relaxed">
                    {bn
                      ? 'প্রতিদিন সকালে শিশির শুকানোর পর ২–৩ মিনিট জমির চারদিক ঘুরে নিচের পাতা দেখুন। ঘন কুয়াশা বা টানা বৃষ্টির পরপরই পাতা পর্যবেক্ষণ করুন এবং কোনো সন্দেহ হলে কৃষি ডায়েরিতে তারিখসহ নোট লিখে রাখুন—অজানা ওষুধ মিশিয়ে স্প্রে করবেন না।'
                      : 'Walk plot edges for 2–3 minutes each morning after dew dries to inspect lower leaves. Increase scouting after dense fog or heavy rain, log symptom dates in your Farming Journal, and never mix unverified pesticide cocktails.'}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm sm:text-[15px] text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? 'পানি, মাটি, বীজ, সার ও বালাইনাশকের পরিকল্পিত ব্যবহার কেবল পরিবেশই রক্ষা করে না, কৃষকের মৌসুমি উৎপাদন খরচও উল্লেখযোগ্যভাবে কমায়। নিচে প্রতিটি সম্পদের দায়িত্বশীল ব্যবহারের নির্দেশিকা দেখুন:'
                  : 'Thoughtful stewardship of water, soil, seeds, fertilizers, and farm inputs protects long-term land health while lowering seasonal production waste. Review practical guidance for each resource below.'}
              </p>

              {/* 5 Resource Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    icon: Droplets,
                    title: bn ? '১. পানি ও সেচ ব্যবস্থাপনা' : '1. Responsible Water Use',
                    desc: bn
                      ? 'ধান ক্ষেতে পর্যায়ক্রমে ভেজানো ও শুকানো (AWD) পদ্ধতি অনুসরণ করুন; দুপুরের রোদে নয় বরং সকাল বা বিকেলে সেচ দিন যাতে বাষ্পীভবনে পানি নষ্ট না হয়।'
                      : 'Use Alternate Wetting & Drying (AWD) in rice paddies and irrigate in early morning or late afternoon to minimize evaporation loss.',
                  },
                  {
                    icon: Leaf,
                    title: bn ? '২. মাটির স্বাস্থ্য সুরক্ষা' : '2. Soil Health & Organic Care',
                    desc: bn
                      ? 'জৈব কম্পোস্ট বা ভার্মিকম্পোস্ট ব্যবহার করুন, ফসলের অবশিষ্টাংশ না পুড়িয়ে মাটিতে মেশান এবং সুযোগ হলে SRDI ল্যাবে মাটি পরীক্ষা করে সার নির্ধারণ করুন।'
                      : 'Mix compost or vermicompost regularly, avoid burning crop stubble, and test soil pH/nutrients with SRDI before heavy amendments.',
                  },
                  {
                    icon: Wheat,
                    title: bn ? '৩. মানসম্মত বীজ ব্যবহার' : '3. Seed Selection & Spacing',
                    desc: bn
                      ? 'বপনের আগে অঙ্কুরোদগম পরীক্ষা করুন এবং অনুমোদিত দূরত্ব মেনে বীজ বপন করুন—অতিরিক্ত ঘন বপনে বীজের অপচয় হয় ও রোগ বাড়ে।'
                      : 'Run a simple germination test before sowing and follow recommended spacing—over-seeding wastes money and traps fungal humidity.',
                  },
                  {
                    icon: Sprout,
                    title: bn ? '৪. সুষম সার ব্যবস্থাপনা' : '4. Balanced Fertilizer Use',
                    desc: bn
                      ? 'একসাথে অতিরিক্ত ইউরিয়া না দিয়ে কিস্তিতে প্রয়োগ করুন; লিফ কালার চার্ট (LCC) বা পাতার রঙ দেখে নাইট্রোজেনের চাহিদা বুঝুন।'
                      : 'Split nitrogen/urea applications across growth stages and check leaf greenness (LCC) rather than applying excess fertilizer at once.',
                  },
                ].map((res, idx) => {
                  const Icon = res.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] space-y-1.5"
                    >
                      <div className="flex items-center gap-2 text-sm font-bold text-[var(--kb-brand-text)]">
                        <Icon className="w-4 h-4 text-[var(--kb-accent)] shrink-0" />
                        <h3>{res.title}</h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                        {res.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Resource 5: Agricultural Resources & Inputs */}
              <div className="p-4 rounded-xl bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-[var(--kb-brand-text)]">
                  <PackageCheck className="w-4 h-4 text-[var(--kb-accent)] shrink-0" />
                  <h3>
                    {bn
                      ? '৫. কৃষি উপকরণ ও বালাইনাশকের সাশ্রয়ী প্রয়োগ'
                      : '5. Agricultural Inputs & Spray Stewardship'}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--kb-ink)] leading-relaxed">
                  {bn
                    ? 'আবহাওয়ার পূর্বাভাস দেখে বৃষ্টির ৬–১২ ঘণ্টা আগে স্প্রে বা সার প্রয়োগ এড়িয়ে চলুন। জমির আইল ও নালা ঠিক রাখলে সার ও পানি ধুয়ে যাওয়া বন্ধ হয় এবং খরচ ও লাভের হিসাবে প্রতিটি উপকরণের খরচ লিপিবদ্ধ করে অপচয় কমানো যায়।'
                    : 'Always check rain forecasts and avoid spraying or top-dressing within 6–12 hours of expected rain. Maintaining strong plot bunds prevents nutrient runoff, while logging every seed/fertilizer purchase in the Expense Tracker highlights waste quickly.'}
                </p>
              </div>

              {/* Practical Tips for Reducing Waste */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#113520] dark:bg-[#0F2C1B] text-white border border-[#1E5133] space-y-3">
                <h3 className="text-sm font-bold text-[#A7F3D0]">
                  {bn
                    ? 'সম্পদের অপচয় কমানোর ৪টি ব্যবহারিক কৌশল'
                    : '4 Practical Tips to Reduce Farm Resource Waste'}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#D1E2D7]">
                  {(bn
                    ? [
                        'মাল্চিং (খড় বা পলিথিন আচ্ছাদন) ব্যবহার করে মাটির আর্দ্রতা ও সেচ খরচ ২৫–৩০% পর্যন্ত বাঁচান।',
                        'বৃষ্টির পূর্বাভাস দেখে তবেই স্প্রে ও ইউরিয়া উপরি-প্রয়োগের দিন ঠিক করুন।',
                        'ফাঁদ ও উপকারী পোকা সংরক্ষণ করে অপ্রয়োজনীয় রাসায়নিক স্প্রে কমান।',
                        'মৌসুম শেষে প্রতিটি বীজ, সার ও সেচের খরচ হিসাব করে পরবর্তী মৌসুমের বাজেট করুন।',
                      ]
                    : [
                        'Apply organic straw mulch to retain moisture and reduce frequent irrigation.',
                        'Schedule sprays and urea top-dressing strictly around clear, dry weather windows.',
                        'Use pheromone traps and field scouting so sprays are used only when truly needed.',
                        'Track seed, irrigation, and fertilizer BDT expenses each season to eliminate hidden waste.',
                      ]
                  ).map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#6EE7B7] shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer with Useful Cross-Links + Close Button */}
        <div className="px-5 sm:px-7 py-4 border-t border-[var(--kb-border)] bg-[var(--kb-surface-muted)] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            {isCropLoss ? (
              <>
                <button
                  type="button"
                  onClick={() => handleGoToRoute('detect')}
                  className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors cursor-pointer"
                >
                  <ScanSearch className="w-3.5 h-3.5" />
                  <span>{bn ? 'ক্রপ ডক্টর খুলুন' : 'Open Crop Doctor'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleGoToRoute('risk')}
                  className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface)] hover:bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-lg transition-colors cursor-pointer"
                >
                  <span>{bn ? 'রোগের ঝুঁকি পূর্বাভাস' : 'Check Disease Risk'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleGoToRoute('soil')}
                  className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors cursor-pointer"
                >
                  <Droplets className="w-3.5 h-3.5" />
                  <span>{bn ? 'মাটি ও সেচ গাইড' : 'Open Soil & Water Guide'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleGoToRoute('weather')}
                  className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface)] hover:bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-lg transition-colors cursor-pointer"
                >
                  <span>{bn ? 'আবহাওয়া পরামর্শ' : 'View Weather Advisory'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 text-xs sm:text-sm font-semibold text-[var(--kb-ink)] bg-[var(--kb-surface)] hover:bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-lg transition-colors cursor-pointer"
          >
            {bn ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
