import { AlertTriangle, CheckCircle2, MapPin, PhoneCall } from 'lucide-react';
import { Language } from '../types/krishi';

interface ExpertSupportCardProps {
  language: Language;
  context?: 'disease' | 'risk' | 'cultivation' | 'soil' | 'assistant';
  compact?: boolean;
}

export function ExpertSupportCard({
  language,
  context = 'disease',
  compact = false,
}: ExpertSupportCardProps) {
  const bn = language === 'bn';

  const urgentTriggers =
    context === 'soil'
      ? [
          {
            bn: 'মাটির pH, লবণাক্ততা বা দীর্ঘদিনের কম ফলন বুঝতে SRDI মাটি পরীক্ষার আগে সার কিনবেন না।',
            en: 'Before investing heavily in lime or fertilizers, verify soil pH and salinity via an SRDI soil test.',
          },
          {
            bn: 'টানা জলাবদ্ধতায় হঠাৎ গাছ নেতিয়ে পড়লে দ্রুত উপসহকারী কৃষি কর্মকর্তাকে (SAAO) জমি দেখান।',
            en: 'If crops suddenly wilt after waterlogging, consult your local SAAO promptly.',
          },
        ]
      : [
          {
            bn: 'পাতার দাগ বা মড়ক ২–৩ দিনের মধ্যে পাশের সারিতে দ্রুত ছড়িয়ে পড়তে দেখলে।',
            en: 'Leaf lesions or blight patches begin spreading rapidly across rows within 2–3 days.',
          },
          {
            bn: 'কোনো রাসায়নিক ছত্রাকনাশক বা কীটনাশক কেনা ও স্প্রে করার আগে সঠিক নাম ও মাত্রা নিশ্চিত করতে।',
            en: 'Before buying or mixing any fungicide or pesticide, to verify approved product and safe dosage.',
          },
          {
            bn: 'হঠাৎ গাছের গোড়া পচে নেতিয়ে পড়া, শিষ সাদা হওয়া বা অচেনা ভাইরাস/হলদে মোজাইক লক্ষণ দেখা দিলে।',
            en: 'Sudden root/collar rot, white heads in cereal crops, or unfamiliar mosaic yellowing appears.',
          },
        ];

  const channels = [
    {
      title: bn ? '১. কৃষি কল সেন্টার: ১৬১২৩' : '1. Krishi Call Center: 16123',
      detail: bn
        ? 'যেকোনো মোবাইল থেকে ১৬১২৩ নম্বরে কল করে ফসলের রোগ, সার ও আবহাওয়া বিষয়ে সরকারি পরামর্শ নিন।'
        : 'Call 16123 from a local mobile phone for government agricultural guidance on crops and pests.',
    },
    {
      title: bn
        ? '২. ইউনিয়ন ও উপজেলা কৃষি অফিস (SAAO)'
        : '2. Union / Upazila Agriculture Office (SAAO)',
      detail: bn
        ? 'আপনার এলাকার উপসহকারী কৃষি কর্মকর্তা বা উপজেলা কৃষি অফিসে আক্রান্ত পাতার স্পষ্ট ছবি বা সদ্য তোলা নমুনা দেখান।'
        : 'Visit your Union Sub-Assistant Agriculture Officer (SAAO) or Upazila Agriculture Office with clear photos or fresh samples.',
    },
    {
      title: bn ? '৩. মৃত্তিকা সম্পদ উন্নয়ন ইনস্টিটিউট (SRDI)' : '3. SRDI Soil Testing Services',
      detail: bn
        ? 'মাটির অম্লতা (pH), লবণাক্ততা ও সুষম সারের সঠিক পরিমাণ নির্ণয়ে নিকটস্থ SRDI গবেষণাগারের সহায়তা নিন।'
        : 'Use nearby SRDI laboratories or mobile soil-testing units to determine exact pH and fertilizer needs.',
    },
  ];

  return (
    <section
      aria-label={
        bn ? 'স্থানীয় কৃষি কর্মকর্তার সহায়তা নির্দেশিকা' : 'Local Agricultural Officer Support Guide'
      }
      className={`bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl ${
        compact ? 'p-5 space-y-4' : 'p-6 sm:p-7 space-y-5'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[var(--kb-border-subtle)]">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-[var(--kb-accent)]">
            {bn
              ? 'বিশেষজ্ঞ সহায়তা · বাস্তব মাঠ যাচাই নির্দেশিকা'
              : 'Expert Support · When & How to Seek Field Help'}
          </p>
          <h2 className="text-lg font-bold text-[var(--kb-ink)]">
            {bn
              ? 'কখন এবং কীভাবে স্থানীয় কৃষি কর্মকর্তার পরামর্শ নেবেন'
              : 'When and How to Contact Local Agricultural Officers'}
          </h2>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[var(--kb-brand)] text-white text-xs font-bold font-mono tabular-nums whitespace-nowrap shrink-0 self-start sm:self-center">
          <PhoneCall className="w-3.5 h-3.5 text-[#6EE7B7]" />
          <span>{bn ? 'হেল্পলাইন: ১৬১২৩' : 'Helpline: 16123'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* When to seek help */}
        <div className="lg:col-span-5 p-4 rounded-xl bg-[var(--kb-warn-bg)] border border-[var(--kb-warn-border)] space-y-3">
          <div className="flex items-center gap-2 text-[var(--kb-warn-icon)]">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <h3 className="text-sm font-bold text-[var(--kb-warn-title)]">
              {bn ? 'কখন দ্রুত যোগাযোগ করবেন' : 'When to Escalate Promptly'}
            </h3>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-[var(--kb-warn-title)] leading-relaxed">
            {urgentTriggers.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-mono text-xs font-bold mt-0.5 tabular-nums">
                  0{idx + 1}.
                </span>
                <span>{bn ? item.bn : item.en}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-[var(--kb-warn-text)] pt-2 border-t border-[var(--kb-warn-border)]">
            {bn
              ? 'প্রস্তুতি: ফসলের নাম ও বয়স, পাতার ওপর-নিচের ছবি এবং সাম্প্রতিক সেচ/সার দেওয়ার তথ্য সাথে রাখুন।'
              : 'Prepare before calling: crop variety & age, clear photos of upper/lower leaves, and recent irrigation or fertilizer history.'}
          </p>
        </div>

        {/* How to reach help */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {channels.map((ch, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] space-y-1.5"
            >
              <div className="flex items-center gap-1.5 text-[var(--kb-brand-text)]">
                {idx === 0 ? (
                  <PhoneCall className="w-3.5 h-3.5 text-[var(--kb-accent)] shrink-0" />
                ) : idx === 1 ? (
                  <MapPin className="w-3.5 h-3.5 text-[var(--kb-accent)] shrink-0" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--kb-accent)] shrink-0" />
                )}
                <h3 className="text-xs sm:text-sm font-bold text-[var(--kb-ink)]">
                  {ch.title}
                </h3>
              </div>
              <p className="text-xs text-[var(--kb-ink-muted)] leading-relaxed">{ch.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
