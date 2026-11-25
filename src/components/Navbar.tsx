import { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  Edit3,
  Globe,
  LogOut,
  MapPin,
  Menu,
  Moon,
  Sprout,
  Sun,
  User,
  X,
} from 'lucide-react';
import { findDistrictById } from '../data/bangladeshDistricts';
import {
  FarmerProfile,
  Language,
  PageRoute,
  ProfileSectionTarget,
} from '../types/krishi';
import type { ThemeMode } from '../App';

interface NavbarProps {
  activePage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onSetTheme: (theme: ThemeMode) => void;
  farmerProfile: FarmerProfile | null;
  onOpenProfileSection: (section: ProfileSectionTarget) => void;
  onDemoLogout: () => void;
}

export function Navbar({
  activePage,
  onNavigate,
  language,
  onToggleLanguage,
  theme,
  onToggleTheme,
  onSetTheme,
  farmerProfile,
  onOpenProfileSection,
  onDemoLogout,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const toolsDropdownRef = useRef<HTMLDivElement>(null);
  const bn = language === 'bn';

  const primaryNavItems: { route: PageRoute; bn: string; en: string }[] = [
    { route: 'home', bn: 'হোম', en: 'Home' },
    { route: 'dashboard', bn: 'ড্যাশবোর্ড', en: 'Dashboard' },
    { route: 'detect', bn: 'ক্রপ ডক্টর', en: 'Crop Doctor' },
    { route: 'cultivation', bn: 'চাষাবাদ', en: 'Cultivation' },
    { route: 'weather', bn: 'আবহাওয়া', en: 'Weather' },
    { route: 'finance', bn: 'খরচ ও লাভ', en: 'Expenses' },
    { route: 'roadmap', bn: 'রোডম্যাপ', en: 'Roadmap' },
    { route: 'financial-model', bn: 'আর্থিক মডেল', en: 'Financial Model' },
    { route: 'sdg', bn: 'এসডিজি ২.৪', en: 'SDG 2.4' },
  ];

  const moreToolItems: { route: PageRoute; bn: string; en: string }[] = [
    { route: 'fair-price', bn: 'আয় ও ন্যায্যমূল্য ট্র্যাকার', en: 'Income & Fair Price' },
    { route: 'soil', bn: 'মাটি ও সেচ ব্যবস্থা', en: 'Soil & Water Care' },
    { route: 'assistant', bn: 'বাংলা কৃষি সহায়ক', en: 'Bangla Assistant' },
    { route: 'calendar', bn: 'ক্যালেন্ডার ও ডায়েরি', en: 'Calendar & Journal' },
    { route: 'risk', bn: 'রোগের ঝুঁকি পূর্বাভাস', en: 'Disease Risk Predictor' },
    { route: 'community', bn: 'কৃষক কমিউনিটি', en: 'Farmer Community' },
    { route: 'history', bn: 'রোগের ইতিহাস', en: 'Disease History' },
  ];

  const allMobileNavItems: { route: PageRoute; bn: string; en: string }[] = [
    { route: 'dashboard', bn: 'ড্যাশবোর্ড', en: 'Dashboard' },
    { route: 'detect', bn: 'ক্রপ ডক্টর', en: 'Crop Doctor' },
    { route: 'cultivation', bn: 'চাষাবাদ গাইড', en: 'Cultivation Guide' },
    { route: 'soil', bn: 'মাটি ও সেচ', en: 'Soil & Water' },
    { route: 'weather', bn: 'আবহাওয়া', en: 'Weather' },
    { route: 'assistant', bn: 'বাংলা সহায়ক', en: 'Assistant' },
    { route: 'calendar', bn: 'ক্যালেন্ডার ও ডায়েরি', en: 'Calendar & Journal' },
    { route: 'risk', bn: 'ঝুঁকি পূর্বাভাস', en: 'Risk Predictor' },
    { route: 'finance', bn: 'খরচ ও লাভ', en: 'Expenses' },
    { route: 'fair-price', bn: 'আয় ও ন্যায্যমূল্য', en: 'Income & Fair Price' },
    { route: 'community', bn: 'কমিউনিটি', en: 'Community' },
    { route: 'history', bn: 'রোগের ইতিহাস', en: 'Disease History' },
    { route: 'roadmap', bn: 'স্কেলেবিলিটি রোডম্যাপ', en: 'Scalability Roadmap' },
    { route: 'financial-model', bn: 'আর্থিক মডেল', en: 'Financial Model' },
    { route: 'sdg', bn: 'এসডিজি ২.৪ প্রভাব', en: 'SDG 2.4 Impact' },
  ];

  const isMoreToolActive = moreToolItems.some((item) => item.route === activePage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
      if (
        toolsDropdownRef.current &&
        !toolsDropdownRef.current.contains(event.target as Node)
      ) {
        setToolsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setProfileMenuOpen(false);
        setToolsMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
    setToolsMenuOpen(false);
  };

  const handleDropdownAction = (section: ProfileSectionTarget) => {
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
    onOpenProfileSection(section);
  };

  const handleLogoutClick = () => {
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
    onDemoLogout();
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--kb-surface-header)] backdrop-blur-sm border-b border-[var(--kb-border)] transition-colors duration-150">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-6">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          aria-label={bn ? 'কৃষিবন্ধু হোম পেজ' : 'KrishiBondhu Home'}
          className="flex items-center gap-2.5 text-[var(--kb-ink)] hover:text-[var(--kb-brand-text)] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1"
        >
          <span className="w-8 h-8 rounded-lg bg-[var(--kb-brand)] text-white flex items-center justify-center shrink-0">
            <Sprout className="w-4 h-4" strokeWidth={2.2} />
          </span>
          <span className="text-lg font-bold tracking-tight font-display">
            {bn ? 'কৃষিবন্ধু' : 'KrishiBondhu'}
          </span>
        </button>

        {/* Zone 2: Main Navigation Links + More Tools Dropdown */}
        <nav
          aria-label={bn ? 'প্রধান নেভিগেশন' : 'Primary Navigation'}
          className="hidden xl:flex items-center gap-2.5 2xl:gap-4 text-[12.5px] 2xl:text-[13px] font-medium text-[var(--kb-ink-muted)]"
        >
          {primaryNavItems.map((item) => {
            const isActive =
              activePage === item.route ||
              (item.route === 'detect' && activePage === 'result');
            return (
              <button
                key={item.route}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleNavClick(item.route)}
                className={`py-1.5 whitespace-nowrap shrink-0 transition-colors border-b-2 cursor-pointer ${
                  isActive
                    ? 'text-[var(--kb-brand-text)] font-semibold border-[var(--kb-accent)]'
                    : 'border-transparent hover:text-[var(--kb-ink)] hover:border-[var(--kb-border)]'
                }`}
              >
                {bn ? item.bn : item.en}
              </button>
            );
          })}

          <div ref={toolsDropdownRef} className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={toolsMenuOpen}
              onClick={() => {
                setToolsMenuOpen((prev) => !prev);
                setProfileMenuOpen(false);
              }}
              className={`py-1.5 inline-flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors border-b-2 cursor-pointer ${
                isMoreToolActive
                  ? 'text-[var(--kb-brand-text)] font-semibold border-[var(--kb-accent)]'
                  : 'border-transparent hover:text-[var(--kb-ink)] hover:border-[var(--kb-border)]'
              }`}
            >
              <span>{bn ? 'আরও টুলস' : 'More Tools'}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  toolsMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {toolsMenuOpen && (
              <div
                role="menu"
                aria-label={bn ? 'অতিরিক্ত কৃষি টুলস' : 'Additional farming tools'}
                className="absolute right-0 mt-2 w-60 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl shadow-lg py-1.5 z-50"
              >
                {moreToolItems.map((item) => {
                  const isActive = activePage === item.route;
                  return (
                    <button
                      key={item.route}
                      type="button"
                      role="menuitem"
                      onClick={() => handleNavClick(item.route)}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[var(--kb-surface-sage)] text-[var(--kb-brand-text)] font-semibold'
                          : 'text-[var(--kb-ink)] hover:bg-[var(--kb-surface-muted)]'
                      }`}
                    >
                      {bn ? item.bn : item.en}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: Primary CTA + Theme Toggle + Mobile Menu Trigger + Profile Avatar */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('detect')}
            className="hidden xl:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {bn ? 'রোগ শনাক্ত করুন' : 'Check Crop'}
          </button>

          {/* Theme Toggle (Desktop & Mobile) */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-pressed={theme === 'dark'}
            aria-label={
              theme === 'dark'
                ? bn
                  ? 'লাইট মোড চালু করুন'
                  : 'Switch to Light Mode'
                : bn
                ? 'ডার্ক মোড চালু করুন'
                : 'Switch to Dark Mode'
            }
            title={
              theme === 'dark'
                ? bn
                  ? 'লাইট মোড'
                  : 'Light Mode'
                : bn
                ? 'ডার্ক মোড'
                : 'Dark Mode'
            }
            className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[var(--kb-border)] bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] hover:border-[var(--kb-accent)] hover:bg-[var(--kb-surface-sage)] transition-colors shrink-0 cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-[#FBBF24]" strokeWidth={2} />
            ) : (
              <Moon className="w-5 h-5 text-[#14532D]" strokeWidth={2} />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen((prev) => !prev);
              setProfileMenuOpen(false);
              setToolsMenuOpen(false);
            }}
            aria-expanded={mobileMenuOpen}
            aria-label={bn ? 'মেনু খুলুন' : 'Toggle menu'}
            className="xl:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[var(--kb-border)] bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] hover:bg-[var(--kb-surface-sage)] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Top-Right Circular Profile Avatar & Dropdown */}
          <div ref={profileDropdownRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileMenuOpen((prev) => !prev);
                setMobileMenuOpen(false);
              }}
              aria-haspopup="menu"
              aria-expanded={profileMenuOpen}
              aria-label={bn ? 'আমার প্রোফাইল মেনু' : 'Open profile menu'}
              title={
                farmerProfile
                  ? farmerProfile.name
                  : bn
                  ? 'আমার প্রোফাইল (ডেমো)'
                  : 'My Profile (Demo)'
              }
              className={`w-11 h-11 rounded-full border-2 overflow-hidden flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                activePage === 'profile' || profileMenuOpen
                  ? 'border-[var(--kb-brand)] bg-[var(--kb-brand)] text-white ring-2 ring-[var(--kb-accent)]/30'
                  : 'border-[var(--kb-accent)]/55 bg-[var(--kb-surface-sage)] text-[var(--kb-brand-text)] hover:border-[var(--kb-accent)] hover:bg-[var(--kb-surface-sage-strong)]'
              }`}
            >
              {farmerProfile?.photoUrl ? (
                <img
                  src={farmerProfile.photoUrl}
                  alt={farmerProfile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-5 h-5" strokeWidth={2} />
              )}
            </button>

            {profileMenuOpen && (
              <div
                role="menu"
                aria-label={bn ? 'প্রোফাইল অপশনসমূহ' : 'Profile options'}
                className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-2rem)] bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl shadow-lg py-2 z-50"
              >
                {/* Compact Profile Identity Summary */}
                <div className="px-4 py-3 border-b border-[var(--kb-border-subtle)] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] overflow-hidden flex items-center justify-center shrink-0">
                    {farmerProfile?.photoUrl ? (
                      <img
                        src={farmerProfile.photoUrl}
                        alt={farmerProfile.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-[var(--kb-brand-text)]" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[var(--kb-ink)] truncate">
                      {farmerProfile
                        ? farmerProfile.name
                        : bn
                        ? 'অতিথি কৃষক (ডেমো)'
                        : 'Guest Farmer (Demo)'}
                    </p>
                    <p className="text-xs text-[var(--kb-ink-muted)] truncate">
                      {farmerProfile
                        ? (() => {
                            const d = findDistrictById(farmerProfile.districtId);
                            const distLabel = d
                              ? bn
                                ? d.bn
                                : d.en
                              : farmerProfile.districtId;
                            return `${farmerProfile.upazila}, ${distLabel} · ${farmerProfile.farmSizeBigha} ${
                              bn ? 'বিঘা' : 'Bigha'
                            }`;
                          })()
                        : bn
                        ? 'কোনো প্রোফাইল সংরক্ষিত নেই'
                        : 'No profile saved yet'}
                    </p>
                  </div>
                </div>

                {/* Dropdown Links */}
                <div className="py-1">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => handleDropdownAction('overview')}
                    className="w-full px-4 py-2.5 text-left text-sm font-medium text-[var(--kb-ink)] hover:bg-[var(--kb-surface-sage)] hover:text-[var(--kb-brand-text)] flex items-center gap-3 transition-colors cursor-pointer"
                  >
                    <User className="w-4 h-4 text-[var(--kb-brand-text)] shrink-0" />
                    <span>{bn ? 'আমার প্রোফাইল' : 'My Profile'}</span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => handleDropdownAction('edit')}
                    className="w-full px-4 py-2.5 text-left text-sm font-medium text-[var(--kb-ink)] hover:bg-[var(--kb-surface-sage)] hover:text-[var(--kb-brand-text)] flex items-center gap-3 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4 text-[var(--kb-brand-text)] shrink-0" />
                    <span>{bn ? 'প্রোফাইল সম্পাদনা' : 'Edit Profile'}</span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => handleDropdownAction('farming')}
                    className="w-full px-4 py-2.5 text-left text-sm font-medium text-[var(--kb-ink)] hover:bg-[var(--kb-surface-sage)] hover:text-[var(--kb-brand-text)] flex items-center gap-3 transition-colors cursor-pointer"
                  >
                    <Sprout className="w-4 h-4 text-[var(--kb-accent)] shrink-0" />
                    <span>{bn ? 'আমার চাষাবাদের তথ্য' : 'My Farming Details'}</span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => handleDropdownAction('locations')}
                    className="w-full px-4 py-2.5 text-left text-sm font-medium text-[var(--kb-ink)] hover:bg-[var(--kb-surface-sage)] hover:text-[var(--kb-brand-text)] flex items-center gap-3 transition-colors cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-[var(--kb-brand-text)] shrink-0" />
                    <span>{bn ? 'সংরক্ষিত এলাকা' : 'Saved Locations'}</span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => handleDropdownAction('language')}
                    className="w-full px-4 py-2.5 text-left text-sm font-medium text-[var(--kb-ink)] hover:bg-[var(--kb-surface-sage)] hover:text-[var(--kb-brand-text)] flex items-center justify-between gap-3 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-[var(--kb-brand-text)] shrink-0" />
                      <span>{bn ? 'ভাষার সেটিংস' : 'Language Settings'}</span>
                    </span>
                    <span className="text-xs font-semibold text-[var(--kb-accent)]">
                      {bn ? 'বাংলা' : 'EN'}
                    </span>
                  </button>
                </div>

                <div className="border-t border-[var(--kb-border-subtle)] mt-1 pt-1">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogoutClick}
                    className="w-full px-4 py-2.5 text-left text-sm font-medium text-[var(--kb-danger-text)] hover:bg-[var(--kb-danger-bg)] flex items-center gap-3 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 shrink-0" />
                    <span>{bn ? 'লগআউট (শুধুমাত্র ডেমো)' : 'Logout (demo only)'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Responsive Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[var(--kb-surface)] border-b border-[var(--kb-border)] px-4 py-4 space-y-3 shadow-sm max-h-[82vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3.5 min-h-[44px] flex items-center rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activePage === 'home'
                  ? 'bg-[var(--kb-surface-sage)] text-[var(--kb-brand-text)] font-semibold'
                  : 'text-[var(--kb-ink)] hover:bg-[var(--kb-surface-muted)]'
              }`}
            >
              {bn ? 'হোম' : 'Home'}
            </button>
            {allMobileNavItems.map((item) => {
              const isActive =
                activePage === item.route ||
                (item.route === 'detect' && activePage === 'result');
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => handleNavClick(item.route)}
                  className={`w-full text-left px-3.5 min-h-[44px] flex items-center rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[var(--kb-surface-sage)] text-[var(--kb-brand-text)] font-semibold'
                      : 'text-[var(--kb-ink)] hover:bg-[var(--kb-surface-muted)]'
                  }`}
                >
                  {bn ? item.bn : item.en}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => handleDropdownAction('overview')}
              className={`w-full text-left px-3.5 min-h-[44px] flex items-center rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activePage === 'profile'
                  ? 'bg-[var(--kb-surface-sage)] text-[var(--kb-brand-text)] font-semibold'
                  : 'text-[var(--kb-ink)] hover:bg-[var(--kb-surface-muted)]'
              }`}
            >
              {bn ? 'আমার প্রোফাইল' : 'My Profile'}
            </button>
          </div>

          <div className="pt-3 border-t border-[var(--kb-border-subtle)] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[var(--kb-ink-muted)]">
                {bn ? 'থিম' : 'Theme'}
              </span>
              <div className="inline-flex items-center p-1 bg-[var(--kb-surface-sage)] rounded-lg border border-[var(--kb-border)]">
                <button
                  type="button"
                  onClick={() => onSetTheme('light')}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    theme === 'light'
                      ? 'bg-[var(--kb-surface)] text-[var(--kb-brand-text)] shadow-xs'
                      : 'text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)]'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>{bn ? 'লাইট' : 'Light'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSetTheme('dark')}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-[var(--kb-surface)] text-[var(--kb-brand-text)] shadow-xs'
                      : 'text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)]'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>{bn ? 'ডার্ক' : 'Dark'}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[var(--kb-ink-muted)]">
                {bn ? 'ভাষা' : 'Language'}
              </span>
              <div className="inline-flex items-center p-1 bg-[var(--kb-surface-sage)] rounded-lg border border-[var(--kb-border)]">
                <button
                  type="button"
                  onClick={() => onToggleLanguage('bn')}
                  className={`px-3 py-1.5 min-h-[36px] text-xs font-semibold rounded-md transition-colors cursor-pointer ${
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
                  className={`px-3 py-1.5 min-h-[36px] text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    !bn
                      ? 'bg-[var(--kb-surface)] text-[var(--kb-brand-text)] shadow-xs'
                      : 'text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)]'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleNavClick('detect')}
            className="w-full min-h-[44px] py-3 px-4 text-sm font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors cursor-pointer"
          >
            {bn ? 'রোগ শনাক্ত করুন' : 'Check Crop'}
          </button>
        </div>
      )}
    </header>
  );
}

