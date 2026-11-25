import { ReactNode } from 'react';
import {
  Activity,
  ArrowLeft,
  BookOpen,
  Calculator,
  CalendarDays,
  CloudSun,
  History,
  Home,
  Layers,
  LayoutDashboard,
  MessageSquare,
  PhoneCall,
  Route,
  Scale,
  ScanSearch,
  Sprout,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import { Language, PageRoute } from '../types/krishi';

interface WorkspaceShellProps {
  activePage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onGoBack?: (fallback?: PageRoute) => void;
  canGoBack?: boolean;
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  children: ReactNode;
}

export function WorkspaceShell({
  activePage,
  onNavigate,
  onGoBack,
  canGoBack = false,
  language,
  onToggleLanguage,
  children,
}: WorkspaceShellProps) {
  const bn = language === 'bn';

  const sidebarGroups: {
    groupLabel: { bn: string; en: string };
    items: {
      route: PageRoute;
      bn: string;
      en: string;
      icon: typeof LayoutDashboard;
      matchRoutes?: PageRoute[];
    }[];
  }[] = [
    {
      groupLabel: { bn: 'সারসংক্ষেপ', en: 'Overview' },
      items: [
        {
          route: 'home',
          bn: 'হোম পেজ',
          en: 'Home Page',
          icon: Home,
        },
        {
          route: 'dashboard',
          bn: 'কৃষক ড্যাশবোর্ড',
          en: 'Farmer Dashboard',
          icon: LayoutDashboard,
        },
      ],
    },
    {
      groupLabel: { bn: '৯টি মূল মডিউল', en: '9 Core Modules' },
      items: [
        {
          route: 'detect',
          matchRoutes: ['detect', 'result'],
          bn: '১. এআই ক্রপ ডক্টর',
          en: '1. AI Crop Doctor',
          icon: ScanSearch,
        },
        {
          route: 'cultivation',
          bn: '২. স্মার্ট চাষাবাদ গাইড',
          en: '2. Cultivation Guide',
          icon: BookOpen,
        },
        {
          route: 'soil',
          bn: '৩. মাটি ও সেচ ব্যবস্থাপনা',
          en: '3. Soil & Irrigation',
          icon: Layers,
        },
        {
          route: 'weather',
          bn: '৪. স্মার্ট আবহাওয়া সতর্কতা',
          en: '4. Smart Weather Alert',
          icon: CloudSun,
        },
        {
          route: 'assistant',
          bn: '৫. বাংলা কৃষি সহায়ক',
          en: '5. Bangla AI Assistant',
          icon: MessageSquare,
        },
        {
          route: 'calendar',
          bn: '৬. স্মার্ট ফসল ক্যালেন্ডার',
          en: '6. Smart Crop Calendar',
          icon: CalendarDays,
        },
        {
          route: 'risk',
          bn: '৭. রোগের ঝুঁকি পূর্বাভাস',
          en: '7. Disease Risk Predictor',
          icon: Activity,
        },
        {
          route: 'finance',
          bn: '৮. খরচ ও লাভ হিসাব',
          en: '8. Expense & Profit',
          icon: Calculator,
        },
        {
          route: 'community',
          bn: '৯. কৃষক কমিউনিটি',
          en: '9. Farmer Community',
          icon: Users,
        },
      ],
    },
    {
      groupLabel: { bn: 'নথি, আয় ও বিস্তার', en: 'Records, Income & Strategy' },
      items: [
        {
          route: 'fair-price',
          bn: 'আয় ও ন্যায্যমূল্য ট্র্যাকার',
          en: 'Income & Fair Price',
          icon: Scale,
        },
        {
          route: 'history',
          bn: 'রোগের ইতিহাস',
          en: 'Disease History',
          icon: History,
        },
        {
          route: 'roadmap',
          bn: 'স্কেলেবিলিটি রোডম্যাপ',
          en: 'Scalability Roadmap',
          icon: Route,
        },
        {
          route: 'financial-model',
          bn: 'আর্থিক মডেল',
          en: 'Financial Model',
          icon: TrendingUp,
        },
        {
          route: 'sdg',
          bn: 'এসডিজি ২.৪ প্রভাব',
          en: 'SDG 2.4 Impact',
          icon: Sprout,
        },
        {
          route: 'profile',
          bn: 'আমার প্রোফাইল',
          en: 'My Profile',
          icon: User,
        },
      ],
    },
  ];

  const allFlatItems = sidebarGroups.flatMap((g) => g.items);

  return (
    <div className="bg-[var(--kb-canvas)] min-h-screen">
      {/* Mobile / Tablet Quick Module Strip (< lg) */}
      <div className="lg:hidden bg-[var(--kb-surface)] border-b border-[var(--kb-border)] px-4 py-2.5 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {onGoBack && (
            <button
              type="button"
              onClick={() => onGoBack('home')}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer bg-[var(--kb-surface-sage)] text-[var(--kb-brand-text)] border-[var(--kb-border)] hover:border-[var(--kb-accent)]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{bn ? (canGoBack ? 'পিছনে' : 'হোম') : canGoBack ? 'Back' : 'Home'}</span>
            </button>
          )}
          {allFlatItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.matchRoutes
              ? item.matchRoutes.includes(activePage)
              : activePage === item.route;
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => onNavigate(item.route)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                    : 'bg-[var(--kb-surface-muted)] text-[var(--kb-ink-muted)] border-[var(--kb-border)] hover:text-[var(--kb-ink)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{bn ? item.bn : item.en}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto flex items-stretch">
        {/* Desktop Sidebar Navigation (lg+) */}
        <aside
          aria-label={bn ? 'মডিউল সাইডবার' : 'Workspace Sidebar'}
          className="hidden lg:flex lg:flex-col lg:w-68 shrink-0 bg-[var(--kb-surface)] border-r border-[var(--kb-border)] p-4 justify-between"
        >
          <div className="space-y-6 sticky top-20">
            {sidebarGroups.map((group) => (
              <div key={group.groupLabel.en} className="space-y-1.5">
                <p className="px-3 text-[11px] font-semibold text-[var(--kb-ink-muted)]">
                  {bn ? group.groupLabel.bn : group.groupLabel.en}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.matchRoutes
                      ? item.matchRoutes.includes(activePage)
                      : activePage === item.route;
                    return (
                      <button
                        key={item.route}
                        type="button"
                        onClick={() => onNavigate(item.route)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors text-left cursor-pointer ${
                          isActive
                            ? 'bg-[var(--kb-brand)] text-white font-semibold'
                            : 'text-[var(--kb-ink-muted)] hover:bg-[var(--kb-surface-sage)] hover:text-[var(--kb-ink)]'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">
                          {bn ? item.bn : item.en}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Sidebar Language & 16123 Helpline Card */}
            <div className="pt-4 border-t border-[var(--kb-border-subtle)] space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-medium text-[var(--kb-ink-muted)]">
                  {bn ? 'ভাষা:' : 'Language:'}
                </span>
                <div className="inline-flex items-center p-0.5 bg-[var(--kb-surface-sage)] rounded-lg border border-[var(--kb-border)]">
                  <button
                    type="button"
                    onClick={() => onToggleLanguage('bn')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
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
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                      !bn
                        ? 'bg-[var(--kb-surface)] text-[var(--kb-brand-text)] shadow-xs'
                        : 'text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)]'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              <div className="p-3.5 bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--kb-brand-text)]">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{bn ? 'কৃষি কল সেন্টার: ১৬১২৩' : 'Krishi Helpline: 16123'}</span>
                </div>
                <p className="text-[11px] text-[var(--kb-ink-muted)] leading-relaxed">
                  {bn
                    ? 'রাউন্ড ১ স্ট্যাটিক প্রোটোটাইপ · নমুনা ডেটা'
                    : 'Round 1 Static Prototype · Sample Data'}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Workspace Content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
