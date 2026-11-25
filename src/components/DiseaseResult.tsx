import { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Camera,
  Check,
  CheckCircle2,
  Copy,
  PhoneCall,
  RotateCcw,
  ShieldCheck,
  Sparkles,
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
  const {
    profile,
    previewImageUrl,
    analyzedAt,
    fieldObservations,
    analysisSource,
    plantCondition,
    healthStatus,
    aiConfidencePercent,
  } = diagnosis;
  const [copied, setCopied] = useState(false);

  const isRealAi = analysisSource === 'gemini-vision';
  const isHealthy = healthStatus === 'healthy' || profile.severity === 'low';
  const confidenceValue =
    typeof aiConfidencePercent === 'number'
      ? aiConfidencePercent
      : profile.illustrativeMatchPercent;

  const conditionText = plantCondition
    ? bn
      ? plantCondition.bn
      : plantCondition.en
    : bn
    ? profile.severity === 'high'
      ? 'উচ্চ সতর্কতা — রোগের লক্ষণ দৃশ্যমান'
      : 'মাঝারি সতর্কতা — পর্যবেক্ষণ প্রয়োজন'
    : profile.severity === 'high'
    ? 'High Attention — Disease Signs Visible'
    : 'Moderate Watch — Monitoring Needed';

  const handleCopySummary = async () => {
    const summaryText = bn
      ? `কৃষিবন্ধু ${isRealAi ? 'AI বিশ্লেষণ প্রতিবেদন' : 'নমুনা প্রতিবেদন'}\n১. শনাক্তকৃত ফসল: ${profile.cropLabel.bn}\n২. গাছের বর্তমান অবস্থা: ${conditionText}\n৩. শনাক্তকৃত রোগ বা সমস্যা: ${profile.diseaseName.bn}\n৪. সমস্যার লক্ষণ: ${profile.symptoms
          .map((s) => s.bn)
          .join(' | ')}\n৫. সমস্যার সম্ভাব্য কারণ: ${profile.causes
          .map((c) => c.bn)
          .join(' | ')}\n৬. করণীয়: ${profile.responsibleTreatment
          .map((a) => a.bn)
          .join(' | ')}\n৭. প্রতিরোধের উপায়: ${profile.prevention
          .map((p) => p.bn)
          .join(' | ')}\n৮. AI কনফিডেন্স লেভেল: ${confidenceValue}%\nযাচাই: ${profile.expertVerification.bn}`
      : `KrishiBondhu ${isRealAi ? 'AI Analysis Report' : 'Sample Report'}\n1. Identified Crop: ${profile.cropLabel.en}\n2. Current Plant Condition: ${conditionText}\n3. Detected Disease/Problem: ${profile.diseaseName.en}\n4. Symptoms: ${profile.symptoms
          .map((s) => s.en)
          .join(' | ')}\n5. Possible Causes: ${profile.causes
          .map((c) => c.en)
          .join(' | ')}\n6. Recommended Actions: ${profile.responsibleTreatment
          .map((a) => a.en)
          .join(' | ')}\n7. Prevention Methods: ${profile.prevention
          .map((p) => p.en)
          .join(' | ')}\n8. AI Confidence Level: ${confidenceValue}%\nVerification: ${profile.expertVerification.en}`;

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
        breadcrumbLabel={
          isRealAi
            ? bn
              ? 'AI বিশ্লেষণ প্রতিবেদন'
              : 'AI Diagnosis Report'
            : bn
            ? 'নমুনা রোগের ফলাফল'
            : 'Sample Disease Result'
        }
        title={bn ? profile.diseaseName.bn : profile.diseaseName.en}
        subtitle={
          bn
            ? `শনাক্তকৃত ফসল: ${profile.cropLabel.bn} · বৈজ্ঞানিক তথ্য: ${profile.scientificName}`
            : `Identified Crop: ${profile.cropLabel.en} · Scientific Reference: ${profile.scientificName}`
        }
        language={language}
        onToggleLanguage={onToggleLanguage}
        onNavigate={onNavigate}
        backRoute="detect"
        backLabel={bn ? 'রোগ শনাক্তকরণ' : 'Crop Doctor'}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Status Banner + Quick Actions */}
        {isRealAi ? (
          <div
            className={`rounded-xl border p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              isHealthy
                ? 'bg-[var(--kb-surface-sage)] border-[var(--kb-accent)]/50'
                : 'bg-[var(--kb-warn-bg)] border-[var(--kb-warn-border)]'
            }`}
          >
            <div className="flex items-start gap-3">
              {isHealthy ? (
                <CheckCircle2 className="w-5 h-5 text-[var(--kb-accent)] shrink-0 mt-0.5" />
              ) : (
                <Sparkles className="w-5 h-5 text-[var(--kb-warn-icon)] shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5">
                <p
                  className={`text-sm font-bold ${
                    isHealthy
                      ? 'text-[var(--kb-brand-text)]'
                      : 'text-[var(--kb-warn-title)]'
                  }`}
                >
                  {isHealthy
                    ? bn
                      ? 'AI বিশ্লেষণ সম্পন্ন — গাছটি সুস্থ ও স্বাভাবিক দেখা যাচ্ছে'
                      : 'Gemini Vision Analysis Complete — Plant Appears Healthy'
                    : bn
                    ? 'Gemini Vision AI দিয়ে ছবির প্রকৃত বিশ্লেষণ সম্পন্ন হয়েছে'
                    : 'Real-Time Gemini Vision Image Analysis Complete'}
                </p>
                <p
                  className={`text-xs sm:text-sm ${
                    isHealthy
                      ? 'text-[var(--kb-ink-muted)]'
                      : 'text-[var(--kb-warn-text)]'
                  }`}
                >
                  {bn
                    ? 'প্রদর্শিত ফসল ও রোগের প্রতিবেদনটি সরাসরি আপনার আপলোড বা ক্যামেরায় তোলা ছবির পিক্সেল পরীক্ষা করে তৈরি করা হয়েছে।'
                    : 'This report was generated strictly from the visual pixels of your captured or uploaded crop image.'}
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
                    <span>{bn ? 'রিপোর্ট কপি করুন' : 'Copy Report'}</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('detect')}
                className="inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 text-xs font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{bn ? 'নতুন ছবি তুলুন / পরীক্ষা করুন' : 'Analyze Another Photo'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[var(--kb-warn-bg)] border border-[var(--kb-warn-border)] rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[var(--kb-warn-icon)] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-[var(--kb-warn-title)]">
                  {bn
                    ? 'পূর্বের নমুনা রেকর্ড — নতুন ছবি দিয়ে প্রকৃত AI পরীক্ষা করুন'
                    : 'Historical Sample Record — Upload a Photo for Live AI Analysis'}
                </p>
                <p className="text-xs sm:text-sm text-[var(--kb-warn-text)]">
                  {bn
                    ? 'এটি পূর্বসংরক্ষিত একটি উদাহরণ প্রতিবেদন। আপনার নিজের ফসলের ছবি বিশ্লেষণ করতে নতুন ছবি তুলুন বা আপলোড করুন।'
                    : 'Viewing a saved reference sample record. Capture or upload your own crop photo for live Gemini Vision analysis.'}
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
                <span>{bn ? 'নতুন ছবি বিশ্লেষণ করুন' : 'Scan Real Photo'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Top Summary Split: Image Preview + Core Report Overview */}
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
              <span>{bn ? 'পর্যালোচনার সময়:' : 'Analyzed:'}</span>
              <span className="font-medium text-[var(--kb-ink)] tabular-nums">
                {bn ? analyzedAt.bn : analyzedAt.en}
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              {/* Structured Required Metadata Cards (Crop, Condition, Detected Problem) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-lg bg-[var(--kb-surface-muted)] border border-[var(--kb-border-subtle)] space-y-1">
                  <p className="text-[11px] font-semibold text-[var(--kb-ink-muted)]">
                    {bn ? 'শনাক্তকৃত ফসল' : 'Identified Crop'}
                  </p>
                  <p className="text-sm font-bold text-[var(--kb-ink)]">
                    {bn ? profile.cropLabel.bn : profile.cropLabel.en}
                  </p>
                  <p className="text-[11px] italic text-[var(--kb-ink-muted)] truncate">
                    {profile.scientificName}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[var(--kb-surface-muted)] border border-[var(--kb-border-subtle)] space-y-1">
                  <p className="text-[11px] font-semibold text-[var(--kb-ink-muted)]">
                    {bn ? 'গাছের বর্তমান অবস্থা' : 'Current Plant Condition'}
                  </p>
                  <p
                    className={`text-sm font-bold ${
                      isHealthy
                        ? 'text-[var(--kb-accent)]'
                        : profile.severity === 'high'
                        ? 'text-[var(--kb-danger-text)]'
                        : 'text-[var(--kb-amber)]'
                    }`}
                  >
                    {conditionText}
                  </p>
                  <p className="text-[11px] text-[var(--kb-ink-muted)]">
                    {bn ? profile.severityLabel.bn : profile.severityLabel.en}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[var(--kb-surface-muted)] border border-[var(--kb-border-subtle)] space-y-1">
                  <p className="text-[11px] font-semibold text-[var(--kb-ink-muted)]">
                    {bn ? 'শনাক্তকৃত রোগ বা সমস্যা' : 'Detected Disease / Issue'}
                  </p>
                  <p className="text-sm font-bold text-[var(--kb-ink)]">
                    {bn ? profile.diseaseName.bn : profile.diseaseName.en}
                  </p>
                </div>
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

              {/* AI Confidence Level Indicator */}
              <div className="p-4 bg-[var(--kb-surface-muted)] rounded-lg border border-[var(--kb-border-subtle)] space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--kb-ink)]">
                    <Activity className="w-3.5 h-3.5 text-[var(--kb-accent)]" />
                    <span>
                      {isRealAi
                        ? bn
                          ? 'AI কনফিডেন্স লেভেল (AI Confidence Level)'
                          : 'AI Confidence Level'
                        : bn
                        ? 'দৃষ্টান্তমূলক মিলের হার (নমুনা ডেটা)'
                        : 'Illustrative Match Indicator (Sample Data)'}
                    </span>
                  </span>
                  <span className="font-mono font-bold text-[var(--kb-brand-text)] tabular-nums">
                    {confidenceValue}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[var(--kb-surface-sage-strong)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--kb-accent)] rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(0, Math.min(100, confidenceValue))}%` }}
                  />
                </div>
                <p className="text-xs text-[var(--kb-ink-muted)]">
                  {isRealAi
                    ? bn
                      ? 'ছবির আলোর মান, পাতার স্পষ্টতা এবং দৃশ্যমান লক্ষণের ভিত্তিতে AI এই কনফিডেন্স লেভেল নির্ধারণ করেছে।'
                      : 'Reflects Gemini Vision visual confidence based on image clarity, lighting, and visible plant traits.'
                    : bn
                    ? 'সতর্কতা: এই নমুনা মানটি পূর্বের উদাহরণ রেকর্ডের অংশ।'
                    : 'Note: This value comes from a static historical sample record.'}
                </p>
              </div>
            </div>

            {/* Expert Verification Box */}
            <div className="p-4 sm:p-5 bg-[#113520] dark:bg-[#0F2C1B] border border-[#1E5133] text-white rounded-lg flex items-start gap-3.5">
              <PhoneCall className="w-5 h-5 text-[#6EE7B7] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h2 className="text-sm font-bold text-white">
                  {bn
                    ? 'কৃষি বিশেষজ্ঞের মাধ্যমে যাচাই ও নিরাপদ পরামর্শ'
                    : 'Agricultural Expert Guidance'}
                </h2>
                <p className="text-xs sm:text-sm text-[#D1E2D7] leading-relaxed">
                  {bn ? profile.expertVerification.bn : profile.expertVerification.en}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Card Report Detail Grid: Symptoms, Possible Causes, Recommended Actions, Prevention */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* সমস্যার লক্ষণ (Symptoms) */}
          <section className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[var(--kb-brand-text)] pb-3 border-b border-[var(--kb-border-subtle)]">
              <Sprout className="w-5 h-5" />
              <h2 className="text-lg font-bold text-[var(--kb-ink)]">
                {bn ? 'সমস্যার লক্ষণ' : 'Observable Symptoms'}
              </h2>
            </div>
            <ul className="space-y-3 text-sm sm:text-[15px] text-[var(--kb-ink-muted)]">
              {profile.symptoms.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="font-mono text-xs font-semibold text-[var(--kb-accent)] mt-1 tabular-nums">
                    0{idx + 1}.
                  </span>
                  <span>{bn ? item.bn : item.en}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* সমস্যার সম্ভাব্য কারণ (Possible Causes) */}
          <section className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[var(--kb-amber)] pb-3 border-b border-[var(--kb-border-subtle)]">
              <AlertTriangle className="w-5 h-5" />
              <h2 className="text-lg font-bold text-[var(--kb-ink)]">
                {bn ? 'সমস্যার সম্ভাব্য কারণ' : 'Possible Causes'}
              </h2>
            </div>
            <ul className="space-y-3 text-sm sm:text-[15px] text-[var(--kb-ink-muted)]">
              {profile.causes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="font-mono text-xs font-semibold text-[var(--kb-amber)] mt-1 tabular-nums">
                    0{idx + 1}.
                  </span>
                  <span>{bn ? item.bn : item.en}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* করণীয় (Recommended Actions) */}
          <section className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[var(--kb-brand-text)] pb-3 border-b border-[var(--kb-border-subtle)]">
              <CheckCircle2 className="w-5 h-5" />
              <h2 className="text-lg font-bold text-[var(--kb-ink)]">
                {bn ? 'করণীয়' : 'Recommended Actions'}
              </h2>
            </div>
            <ul className="space-y-3 text-sm sm:text-[15px] text-[var(--kb-ink-muted)]">
              {profile.responsibleTreatment.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[var(--kb-brand-text)] shrink-0 mt-1" />
                  <span>{bn ? item.bn : item.en}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* প্রতিরোধের উপায় (Prevention Methods) */}
          <section className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-[var(--kb-accent)] pb-3 border-b border-[var(--kb-border-subtle)]">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="text-lg font-bold text-[var(--kb-ink)]">
                {bn ? 'প্রতিরোধের উপায়' : 'Prevention Methods'}
              </h2>
            </div>
            <ul className="space-y-3 text-sm sm:text-[15px] text-[var(--kb-ink-muted)]">
              {profile.prevention.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[var(--kb-accent)] shrink-0 mt-1" />
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
            bn: 'Google Gemini Vision AI ভিজ্যুয়াল বিশ্লেষণ এবং কৃষি সম্প্রসারণ অধিদপ্তর (DAE), BRRI ও BARI-এর সমন্বিত বালাই ব্যবস্থাপনা (IPM) নীতিমালা।',
            en: 'Visual inspection powered by Google Gemini Vision AI alongside DAE, BRRI, and BARI Integrated Pest Management (IPM) stewardship practices.',
          }}
          demoScope={
            isRealAi
              ? {
                  bn: 'মাঠের চূড়ান্ত চিকিৎসা বা বালাইনাশক স্প্রে করার আগে আপনার এলাকার উপ-সহকারী কৃষি কর্মকর্তা অথবা ১৬১২৩ হেল্পলাইনে পরামর্শ যাচাই করা নিরাপদ।',
                  en: 'Always verify chemical dosages or field treatments with your local Sub-Assistant Agriculture Officer or Bangladesh Agriculture Helpline 16123.',
                }
              : {
                  bn: 'এটি পূর্বসংরক্ষিত একটি নমুনা রেকর্ড—নতুন ছবি তুলে প্রকৃত AI বিশ্লেষণ দেখুন।',
                  en: 'This view shows a saved historical sample record—capture or upload a photo for live Gemini Vision analysis.',
                }
          }
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
