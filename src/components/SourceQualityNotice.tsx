import { ShieldCheck } from 'lucide-react';
import { Language } from '../types/krishi';

interface SourceQualityNoticeProps {
  language: Language;
  verifiedSource: { bn: string; en: string };
  demoScope: { bn: string; en: string };
  lastReviewed?: { bn: string; en: string };
}

export function SourceQualityNotice({
  language,
  verifiedSource,
  demoScope,
  lastReviewed = { bn: 'নভেম্বর ২০২৬', en: 'November 2026' },
}: SourceQualityNoticeProps) {
  const bn = language === 'bn';

  return (
    <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-4 sm:p-5 space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--kb-ink-muted)]">
        <div className="flex items-center gap-2 font-semibold text-[var(--kb-brand-text)]">
          <ShieldCheck className="w-4 h-4 text-[var(--kb-accent)] shrink-0" />
          <span>
            {bn
              ? 'তথ্যের উৎস ও মান যাচাই (স্বচ্ছতা নোট)'
              : 'Source & Information Quality'}
          </span>
        </div>
        <span className="font-mono tabular-nums">
          {bn
            ? `সর্বশেষ পর্যালোচনা: ${lastReviewed.bn}`
            : `Last Reviewed: ${lastReviewed.en}`}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
        <div className="p-3 rounded-lg bg-[var(--kb-surface-sage)]/80 border border-[var(--kb-border)] space-y-0.5">
          <p className="font-semibold text-[var(--kb-brand-text)]">
            {bn ? 'সাধারণ কৃষি রেফারেন্স উৎস' : 'Reference Agronomy Basis'}
          </p>
          <p className="text-[var(--kb-ink-muted)]">
            {bn ? verifiedSource.bn : verifiedSource.en}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-[var(--kb-warn-bg)] border border-[var(--kb-warn-border)] space-y-0.5">
          <p className="font-semibold text-[var(--kb-warn-title)]">
            {bn ? 'ডেমো সিমুলেশন অংশ' : 'Prototype Demo Boundary'}
          </p>
          <p className="text-[var(--kb-warn-text)]">{bn ? demoScope.bn : demoScope.en}</p>
        </div>
      </div>
    </div>
  );
}
