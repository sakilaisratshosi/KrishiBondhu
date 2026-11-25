import { ArrowLeft, Globe, Home } from 'lucide-react';
import { Language, PageRoute } from '../types/krishi';

interface WorkspaceHeaderProps {
  title: string;
  subtitle: string;
  breadcrumbLabel: string;
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
  backRoute?: PageRoute;
  backLabel?: string;
}

export function WorkspaceHeader({
  title,
  subtitle,
  breadcrumbLabel,
  language,
  onToggleLanguage,
  onNavigate,
  backRoute = 'home',
  backLabel,
}: WorkspaceHeaderProps) {
  const bn = language === 'bn';

  return (
    <div className="bg-[var(--kb-surface)] border-b border-[var(--kb-border)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[var(--kb-ink-muted)]">
              <button
                type="button"
                onClick={() => onNavigate(backRoute)}
                className="inline-flex items-center gap-1.5 hover:text-[var(--kb-brand-text)] transition-colors cursor-pointer whitespace-nowrap"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>
                  {backLabel || (bn ? 'হোম' : 'Home')}
                </span>
              </button>
              {backRoute !== 'home' && (
                <>
                  <span aria-hidden="true">/</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('home')}
                    className="inline-flex items-center gap-1 hover:text-[var(--kb-brand-text)] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>{bn ? 'হোম' : 'Home'}</span>
                  </button>
                </>
              )}
              <span aria-hidden="true">/</span>
              <span className="text-[var(--kb-brand-text)]">{breadcrumbLabel}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--kb-ink)]">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-[var(--kb-ink-muted)] max-w-2xl">
              {subtitle}
            </p>
          </div>

          {/* Language Segmented Control */}
          <div className="flex items-center gap-3 self-start sm:self-center shrink-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--kb-ink-muted)]">
              <Globe className="w-3.5 h-3.5 text-[var(--kb-brand-text)]" />
              <span className="hidden sm:inline">
                {language === 'bn' ? 'ভাষা:' : 'Language:'}
              </span>
            </span>
            <div
              role="group"
              aria-label={language === 'bn' ? 'ভাষা পরিবর্তন' : 'Switch language'}
              className="inline-flex items-center p-1 bg-[var(--kb-surface-sage)] rounded-lg border border-[var(--kb-border)]"
            >
              <button
                type="button"
                onClick={() => onToggleLanguage('bn')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  language === 'bn'
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
                  language === 'en'
                    ? 'bg-[var(--kb-surface)] text-[var(--kb-brand-text)] shadow-xs'
                    : 'text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)]'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
