import { useState } from 'react';
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Copy,
  PhoneCall,
  RotateCcw,
  ShieldCheck,
  Sprout,
} from 'lucide-react';
import { ActiveDiagnosis, Language, PageRoute } from '../types/krishi';
import { ExpertSupportCard } from './ExpertSupportCard';
import { ResilientImage } from './ResilientImage';
import { SourceQualityNotice } from './SourceQualityNotice';
import { WorkspaceHeader } from './WorkspaceHeader';

interface DiseaseResultProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
  diagnosis: ActiveDiagnosis;
}

export function DiseaseResult({
  language,
  onToggleLanguage,
  onNavigate,
  diagnosis,
}: DiseaseResultProps) {
  const bn = language === 'bn';
  const { profile, previewImageUrl, analyzedAt, fieldObservations } = diagnosis;
  const [copied, setCopied] = useState(false);

  const handleCopySummary = async () => {
    const summaryText = bn
      ? `কৃষিবন্ধু নমুনা প্রতিবেদন\nফসল: ${profile.cropLabel.bn}\nসম্ভাব্য নমুনা রোগ: ${profile.diseaseName.bn}\nসতর্কতা: ${profile.severityLabel.bn}\nপ্রতিরোধ: ${profile.prevention
          .map((p) => p.bn)
          .join(' | ')}\nজরুরি যাচাই: উপজেলা কৃষি অফিস বা ১৬১২৩ নম্বরে যোগাযোগ করুন।`
      : `KrishiBondhu Sample Report\nCrop: ${profile.cropLabel.en}\nSample Disease: ${profile.diseaseName.en}\nSeverity: ${profile.severityLabel.en}\nPrevention: ${profile.prevention
          .map((p) => p.en)
          .join(' | ')}\nVerify with your Upazila Agriculture Officer or call 16123.`;

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(summaryText);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
        return;
      }
    } catch {
      // Fall back to execCommand below inside restricted iFrames
    }

    try {
      const textarea = document.createElement('textarea');
      textarea.value = summaryText;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const succeeded = document.execCommand('copy');
      document.body.removeChild(textarea);
      if (succeeded) {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      // Ignore if environment completely blocks clipboard access
    }
  };

  return (
    <div className="bg-[var(--kb-canvas)] min-h-screen">
      <WorkspaceHeader
        breadcrumbLabel={bn ? 'নমুনা রোগের ফলাফল' : 'Sample Disease Result'}
        title={bn ? profile.diseaseName.bn : profile.diseaseName.en}
        subtitle={
          bn
            ? `ফসল: ${profile.cropLabel.bn} · বৈজ্ঞানিক নাম: ${profile.scientificName}`
            : `Crop: ${profile.cropLabel.en} · Scientific Reference: ${profile.scientificName}`
        }
        language={language}
        onToggleLanguage={onToggleLanguage}
        onNavigate={onNavigate}
        backRoute="detect"
        backLabel={bn ? 'রোগ শনাক্তকরণ' : 'Crop Doctor'}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Prominent Sample Demo Result Label + Quick Actions */}
        <div className="bg-[var(--kb-warn-bg)] border border-[var(--kb-warn-border)] rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[var(--kb-warn-icon)] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-sm font-bold text-[var(--kb-warn-title)]">
                {bn
                  ? 'নমুনা ডেমো ফলাফল — এটি প্রকৃত AI নির্ণয় নয় (Sample Demo Result — Not a real AI diagnosis)'
                  : 'Sample Demo Result — Not a real AI diagnosis'}
              </p>
              <p className="text-xs sm:text-sm text-[var(--kb-warn-text)]">
                {bn
                  ? 'প্রদর্শনের জন্য পূর্বনির্ধারিত নমুনা রোগ, লক্ষণ, কারণ ও নিরাপদ পরিচর্যা পরামর্শ দেখানো হচ্ছে।'
                  : 'Displaying predefined sample disease data, symptoms, causes, and safe guidance for prototype demonstration.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface)] hover:bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[var(--kb-accent)]" />
                  <span>{bn ? 'কপি হয়েছে' : 'Copied'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{bn ? 'পরামর্শ কপি করুন' : 'Copy Advice'}</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('detect')}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 text-xs font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{bn ? 'আরেকটি পাতা দেখুন' : 'Test Another Image'}</span>
            </button>
          </div>
        </div>

        {/* Top Summary Split: Image Preview + Core Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 flex flex-col justify-between gap-4">
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[var(--kb-border)]">
              <ResilientImage
                src={previewImageUrl}
                alt={bn ? profile.diseaseName.bn : profile.diseaseName.en}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-[var(--kb-ink-muted)] pt-2 border-t border-[var(--kb-border-subtle)]">
              <span>{bn ? 'পর্যালোচনার সময়:' : 'Reviewed:'}</span>
              <span className="font-medium text-[var(--kb-ink)] tabular-nums">
                {bn ? analyzedAt.bn : analyzedAt.en}
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--kb-border-subtle)]">
                <div className="flex items-center gap-2 text-xs text-[var(--kb-ink-muted)]">
                  <span className="font-semibold text-[var(--kb-ink)]">
                    {bn ? profile.cropLabel.bn : profile.cropLabel.en}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="italic">{profile.scientificName}</span>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                    profile.severity === 'high'
                      ? 'text-[var(--kb-danger-text)]'
                      : 'text-[var(--kb-amber)]'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>
                    {bn ? profile.severityLabel.bn : profile.severityLabel.en}
                  </span>
                </span>
              </div>

              <p className="text-[15px] sm:text-base text-[var(--kb-ink)] leading-relaxed">
                {bn ? profile.summary.bn : profile.summary.en}
              </p>

              {/* Selected Field Observations if present */}
              {fieldObservations && fieldObservations.length > 0 && (
                <div className="p-4 bg-[var(--kb-surface-sage)] rounded-lg border border-[var(--kb-border)] space-y-1.5">
                  <p className="text-xs font-semibold text-[var(--kb-brand-text)]">
                    {bn
                      ? 'আপনার উল্লেখিত মাঠের পর্যবেক্ষণ:'
                      : 'Your Selected Field Observations:'}
                  </p>
                  <ul className="space-y-1 text-xs sm:text-sm text-[var(--kb-ink)]">
                    {fieldObservations.map((obs, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span aria-hidden="true">·</span>
                        <span>{bn ? obs.bn : obs.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Illustrative Confidence Bar (Clearly Labeled Static Demo) */}
              <div className="p-4 bg-[var(--kb-surface-muted)] rounded-lg border border-[var(--kb-border-subtle)] space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-[var(--kb-ink)]">
                    {bn
                      ? 'দৃষ্টান্তমূলক মিলের হার (Illustrative Demo Data Only)'
                      : 'Illustrative Match Indicator (Static Demo Data Only)'}
                  </span>
                  <span className="font-mono font-bold text-[var(--kb-brand-text)] tabular-nums">
                    {profile.illustrativeMatchPercent}% ({bn ? 'নমুনা মান' : 'Sample'})
                  </span>
                </div>
                <div className="w-full h-2 bg-[var(--kb-surface-sage-strong)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--kb-accent)] rounded-full"
                    style={{ width: `${profile.illustrativeMatchPercent}%` }}
                  />
                </div>
                <p className="text-xs text-[var(--kb-ink-muted)]">
                  {bn
                    ? 'সতর্কতা: এই শতকরা হার কোনো কৃত্রিম বুদ্ধিমত্তা বা ল্যাবরেটরি পরীক্ষার নির্ভুলতা নির্দেশ করে না।'
                    : 'Disclaimer: This illustrative value is static prototype data and does not represent real AI accuracy or lab verification.'}
                </p>
              </div>
            </div>

            {/* Expert Verification Box */}
            <div className="p-4 sm:p-5 bg-[#113520] dark:bg-[#0F2C1B] border border-[#1E5133] text-white rounded-lg flex items-start gap-3.5">
              <PhoneCall className="w-5 h-5 text-[#6EE7B7] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-white">
                  {bn
                    ? 'কৃষি বিশেষজ্ঞের মাধ্যমে যাচাই আবশ্যক'
                    : 'Agricultural Expert Verification Recommended'}
                </h2>
                <p className="text-xs sm:text-sm text-[#D1E2D7] leading-relaxed">
                  {bn ? profile.expertVerification.bn : profile.expertVerification.en}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Card Guidance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Symptoms */}
          <section className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[var(--kb-brand-text)] pb-3 border-b border-[var(--kb-border-subtle)]">
              <Sprout className="w-5 h-5" />
              <h2 className="text-lg font-bold text-[var(--kb-ink)]">
                {bn ? 'প্রধান লক্ষণসমূহ' : 'Observable Symptoms'}
              </h2>
            </div>
            <ul className="space-y-3 text-sm sm:text-[15px] text-[var(--kb-ink-muted)]">
              {profile.symptoms.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 leading-relaxed"
                >
                  <span className="font-mono text-xs font-semibold text-[var(--kb-accent)] mt-1 tabular-nums">
                    0{idx + 1}.
                  </span>
                  <span>{bn ? item.bn : item.en}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Possible Causes */}
          <section className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[var(--kb-amber)] pb-3 border-b border-[var(--kb-border-subtle)]">
              <AlertTriangle className="w-5 h-5" />
              <h2 className="text-lg font-bold text-[var(--kb-ink)]">
                {bn ? 'সম্ভাব্য কারণসমূহ' : 'Possible Contributing Causes'}
              </h2>
            </div>
            <ul className="space-y-3 text-sm sm:text-[15px] text-[var(--kb-ink-muted)]">
              {profile.causes.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 leading-relaxed"
                >
                  <span className="font-mono text-xs font-semibold text-[var(--kb-amber)] mt-1 tabular-nums">
                    0{idx + 1}.
                  </span>
                  <span>{bn ? item.bn : item.en}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Prevention Guidance */}
          <section className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[var(--kb-accent)] pb-3 border-b border-[var(--kb-border-subtle)]">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="text-lg font-bold text-[var(--kb-ink)]">
                {bn ? 'প্রতিরোধমূলক ব্যবস্থা' : 'Prevention Guidance'}
              </h2>
            </div>
            <ul className="space-y-3 text-sm sm:text-[15px] text-[var(--kb-ink-muted)]">
              {profile.prevention.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-[var(--kb-accent)] shrink-0 mt-1" />
                  <span>{bn ? item.bn : item.en}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Responsible Treatment Guidance */}
          <section className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[var(--kb-brand-text)] pb-3 border-b border-[var(--kb-border-subtle)]">
              <CheckCircle2 className="w-5 h-5" />
              <h2 className="text-lg font-bold text-[var(--kb-ink)]">
                {bn
                  ? 'দায়িত্বশীল পরিচর্যা ও পরামর্শ'
                  : 'Responsible Care & Treatment Guidance'}
              </h2>
            </div>
            <ul className="space-y-3 text-sm sm:text-[15px] text-[var(--kb-ink-muted)]">
              {profile.responsibleTreatment.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-[var(--kb-brand-text)] shrink-0 mt-1" />
                  <span>{bn ? item.bn : item.en}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <ExpertSupportCard language={language} context="disease" />

        <SourceQualityNotice
          language={language}
          verifiedSource={{
            bn: 'BRRI, BARI এবং কৃষি সম্প্রসারণ অধিদপ্তরের (DAE) রোগ শনাক্তকরণ ও সমন্বিত বালাই ব্যবস্থাপনা (IPM) নির্দেশিকা।',
            en: 'General symptom descriptions and preventive IPM hygiene modeled on BRRI, BARI, and DAE field handbooks.',
          }}
          demoScope={{
            bn: 'প্রদর্শিত রোগ নির্ণয় ও দৃষ্টান্তমূলক মিলের হার সম্পূর্ণ স্থির ডেমো ডেটা—এটি কোনো AI মডেল বা ল্যাবরেটরি পরীক্ষা নয়।',
            en: 'Displayed disease selection and illustrative match percentage are static demo outputs, not real AI vision or laboratory tests.',
          }}
        />

        {/* Bottom Navigation Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('history')}
            className="min-h-[44px] px-5 py-2.5 text-sm font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface)] hover:bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-lg transition-colors cursor-pointer"
          >
            {bn ? 'রোগের ইতিহাস দেখুন' : 'View Disease History'}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('assistant')}
            className="min-h-[44px] px-5 py-2.5 text-sm font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors cursor-pointer"
          >
            {bn ? 'বাংলা সহায়কে প্রশ্ন করুন' : 'Ask Farming Assistant'}
          </button>
        </div>
      </div>
    </div>
  );
}
