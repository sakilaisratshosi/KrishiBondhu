import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Award,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  Calendar,
  Check,
  Droplets,
  FlaskConical,
  HardDriveDownload,
  Info,
  Layers,
  Leaf,
  MapPin,
  Package,
  PlusCircle,
  Search,
  Scissors,
  ShieldCheck,
  Shovel,
  Sprout,
  Trash2,
  Wheat,
  WifiOff,
  X,
} from 'lucide-react';
import {
  CROP_CATEGORY_LABELS,
  CROP_CATEGORY_ORDER,
  CropCategory,
  CropCultivationGuide as CropGuideType,
  CustomUserCropRequest,
  getEnglishInitialLetter,
  searchCultivationCrops,
} from '../data/cropCultivationData';
import { Language, PageRoute } from '../types/krishi';
import { ExpertSupportCard } from './ExpertSupportCard';
import { ResilientImage } from './ResilientImage';
import { SourceQualityNotice } from './SourceQualityNotice';
import { WorkspaceHeader } from './WorkspaceHeader';

interface CropCultivationGuideProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
  allCrops: CropGuideType[];
  customRequests: CustomUserCropRequest[];
  onAddCustomCrop: (req: Omit<CustomUserCropRequest, 'id' | 'createdAt'>) => CropGuideType;
  onRemoveCustomCrop: (id: string) => void;
  onOpenSoilForCrop: (cropId: string) => void;
  initialCropId?: string;
}

const ALPHABET_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const OFFLINE_GUIDES_STORAGE_KEY = 'krishibondhu_offline_guides_v1';

interface OfflineGuideStore {
  cached: Record<string, CropGuideType>;
  pinnedIds: string[];
}

function loadOfflineGuideStore(): OfflineGuideStore {
  try {
    const raw = window.localStorage.getItem(OFFLINE_GUIDES_STORAGE_KEY);
    if (!raw) return { cached: {}, pinnedIds: [] };
    const parsed = JSON.parse(raw) as Partial<OfflineGuideStore> | null;
    if (!parsed) return { cached: {}, pinnedIds: [] };
    return {
      cached: parsed.cached && typeof parsed.cached === 'object' ? parsed.cached : {},
      pinnedIds: Array.isArray(parsed.pinnedIds) ? parsed.pinnedIds : [],
    };
  } catch {
    return { cached: {}, pinnedIds: [] };
  }
}

export function CropCultivationGuide({
  language,
  onToggleLanguage,
  onNavigate,
  allCrops,
  customRequests,
  onAddCustomCrop,
  onRemoveCustomCrop,
  onOpenSoilForCrop,
  initialCropId,
}: CropCultivationGuideProps) {
  const bn = language === 'bn';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | CropCategory>('all');
  const [activeLetter, setActiveLetter] = useState<'ALL' | string>('ALL');
  const [selectedCropId, setSelectedCropId] = useState<string>(
    initialCropId || 'rice'
  );
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [highlightedIdx, setHighlightedIdx] = useState(0);

  // Offline-Friendly Guides State
  const [offlineStore, setOfflineStore] = useState<OfflineGuideStore>(() =>
    loadOfflineGuideStore()
  );
  const [showOfflineOnly, setShowOfflineOnly] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  // "Can't find your crop? Add another crop" modal/drawer state
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [customNameBn, setCustomNameBn] = useState('');
  const [customNameEn, setCustomNameEn] = useState('');
  const [customCategory, setCustomCategory] = useState<CropCategory>('vegetable');
  const [customNote, setCustomNote] = useState('');
  const [customError, setCustomError] = useState('');

  const searchBoxRef = useRef<HTMLDivElement>(null);
  const guideDetailRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (initialCropId) {
      setSelectedCropId(initialCropId);
    }
  }, [initialCropId]);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  const offlineSavedIds = useMemo(
    () => new Set<string>(Object.keys(offlineStore.cached)),
    [offlineStore.cached]
  );

  const selectedCrop: CropGuideType = useMemo(
    () =>
      allCrops.find((c) => c.id === selectedCropId) ||
      offlineStore.cached[selectedCropId] ||
      allCrops[0],
    [allCrops, offlineStore.cached, selectedCropId]
  );

  // Automatically cache any opened cultivation guide to localStorage for offline browsing
  useEffect(() => {
    if (!selectedCrop) return;
    setOfflineStore((prev) => {
      const existing = prev.cached[selectedCrop.id];
      if (
        existing &&
        existing.name.bn === selectedCrop.name.bn &&
        existing.name.en === selectedCrop.name.en &&
        existing.overview.en === selectedCrop.overview.en
      ) {
        return prev;
      }
      const nextCached = { ...prev.cached, [selectedCrop.id]: selectedCrop };
      const nextStore: OfflineGuideStore = {
        cached: nextCached,
        pinnedIds: prev.pinnedIds,
      };
      try {
        window.localStorage.setItem(
          OFFLINE_GUIDES_STORAGE_KEY,
          JSON.stringify(nextStore)
        );
      } catch {
        // Ignore storage quota errors in restricted preview frames
      }
      return nextStore;
    });
  }, [selectedCrop]);

  const togglePinOfflineGuide = (crop: CropGuideType) => {
    setOfflineStore((prev) => {
      const isPinned = prev.pinnedIds.includes(crop.id);
      const nextPinned = isPinned
        ? prev.pinnedIds.filter((id) => id !== crop.id)
        : [crop.id, ...prev.pinnedIds];
      const nextStore: OfflineGuideStore = {
        cached: { ...prev.cached, [crop.id]: crop },
        pinnedIds: nextPinned,
      };
      try {
        window.localStorage.setItem(
          OFFLINE_GUIDES_STORAGE_KEY,
          JSON.stringify(nextStore)
        );
      } catch {
        // Ignore storage quota errors
      }
      return nextStore;
    });
  };

  const autocompleteMatches = useMemo(
    () => searchCultivationCrops(searchQuery, allCrops),
    [searchQuery, allCrops]
  );

  // Letters present in the current category/search pool
  const availableLetters = useMemo(() => {
    const set = new Set<string>();
    for (const crop of allCrops) {
      if (activeCategory === 'all' || crop.category === activeCategory) {
        set.add(getEnglishInitialLetter(crop));
      }
    }
    return set;
  }, [allCrops, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<CropCategory, number> = {
      cereal: 0,
      vegetable: 0,
      fruit: 0,
      oilseed: 0,
      pulse: 0,
      cash_crop: 0,
      spice: 0,
      emerging: 0,
    };
    for (const c of allCrops) {
      counts[c.category] = (counts[c.category] || 0) + 1;
    }
    return counts;
  }, [allCrops]);

  const filteredCards = useMemo(() => {
    const list = autocompleteMatches.filter((c) => {
      const matchCategory =
        activeCategory === 'all' || c.category === activeCategory;
      const matchLetter =
        activeLetter === 'ALL' || getEnglishInitialLetter(c) === activeLetter;
      const matchOffline = !showOfflineOnly || offlineSavedIds.has(c.id);
      return matchCategory && matchLetter && matchOffline;
    });
    return [...list].sort((a, b) => a.name.en.localeCompare(b.name.en));
  }, [
    autocompleteMatches,
    activeCategory,
    activeLetter,
    showOfflineOnly,
    offlineSavedIds,
  ]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(e.target as Node)
      ) {
        setAutocompleteOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  useEffect(() => {
    setHighlightedIdx(0);
  }, [searchQuery]);

  const handleSelectCrop = (crop: CropGuideType, scrollToDetail = true) => {
    setSelectedCropId(crop.id);
    setAutocompleteOpen(false);
    if (scrollToDetail && guideDetailRef.current) {
      window.setTimeout(() => {
        guideDetailRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 40);
    }
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setAutocompleteOpen(true);
      if (autocompleteMatches.length > 0) {
        setHighlightedIdx((prev) => (prev + 1) % autocompleteMatches.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setAutocompleteOpen(true);
      if (autocompleteMatches.length > 0) {
        setHighlightedIdx(
          (prev) =>
            (prev - 1 + autocompleteMatches.length) % autocompleteMatches.length
        );
      }
    } else if (
      e.key === 'Enter' &&
      autocompleteOpen &&
      autocompleteMatches.length > 0
    ) {
      e.preventDefault();
      const chosen =
        autocompleteMatches[highlightedIdx] || autocompleteMatches[0];
      if (chosen) {
        setSearchQuery(bn ? chosen.name.bn : chosen.name.en);
        handleSelectCrop(chosen, true);
      }
    } else if (e.key === 'Escape') {
      setAutocompleteOpen(false);
    }
  };

  const openAddCropWithPrefill = (prefillText = '') => {
    const trimmed = prefillText.trim();
    const looksBengali = /[\u0980-\u09FF]/.test(trimmed);
    setCustomNameBn(looksBengali ? trimmed : '');
    setCustomNameEn(!looksBengali ? trimmed : '');
    setCustomError('');
    setAutocompleteOpen(false);
    setAddFormOpen(true);
  };

  const handleSubmitCustomCrop = (e: FormEvent) => {
    e.preventDefault();
    if (!customNameBn.trim() && !customNameEn.trim()) {
      setCustomError(
        bn
          ? 'অনুগ্রহ করে বাংলা বা ইংরেজিতে ফসলের নাম লিখুন।'
          : 'Please enter the crop name in Bangla or English.'
      );
      return;
    }
    const created = onAddCustomCrop({
      nameBn: customNameBn.trim(),
      nameEn: customNameEn.trim(),
      category: customCategory,
      note: customNote.trim(),
    });
    setAddFormOpen(false);
    setCustomNameBn('');
    setCustomNameEn('');
    setCustomNote('');
    setCustomError('');
    setSearchQuery('');
    setActiveCategory('all');
    setActiveLetter('ALL');
    setShowOfflineOnly(false);
    handleSelectCrop(created, true);
  };

  const sourceLabel = (sourceType: CropGuideType['sourceType']) => {
    if (sourceType === 'verified_reference') {
      return bn
        ? 'যাচাইকৃত কৃষি নির্দেশিকা (BARI/BRRI/DAE নমুনা রেফারেন্স)'
        : 'Verified Reference (BARI/BRRI/DAE Sample Guide)';
    }
    if (sourceType === 'user_requested') {
      return bn
        ? 'ব্যবহারকারী-যুক্ত ডেমো ফসল (যাচাইকৃত তথ্য নেই)'
        : 'User-Submitted Demo Request (No verified guide yet)';
    }
    return bn
      ? 'আঞ্চলিক নমুনা নির্দেশিকা (ডেমো)'
      : 'Sample Regional Reference (Demo)';
  };

  const shortSourceLabel = (sourceType: CropGuideType['sourceType']) => {
    if (sourceType === 'verified_reference') {
      return bn ? 'রেফারেন্স গাইড' : 'Ref. Guide';
    }
    if (sourceType === 'user_requested') {
      return bn ? 'ব্যবহারকারীর অনুরোধ' : 'User Request';
    }
    return bn ? 'নমুনা ডেমো' : 'Sample Demo';
  };

  const waterDemandText = (level: CropGuideType['waterDemandLevel']) => {
    if (level === 'high') {
      return bn ? 'সেচ চাহিদা: উচ্চ (পর্যায়ভিত্তিক)' : 'Water Need: High (Staged)';
    }
    if (level === 'moderate') {
      return bn ? 'সেচ চাহিদা: মাঝারি' : 'Water Need: Moderate';
    }
    return bn ? 'সেচ চাহিদা: তুলনামূলক কম' : 'Water Need: Low–Moderate';
  };

  const isCustomSelected = selectedCrop.sourceType === 'user_requested';
  const isPinnedOffline = offlineStore.pinnedIds.includes(selectedCrop.id);

  return (
    <div className="bg-[var(--kb-canvas)] min-h-screen">
      <WorkspaceHeader
        breadcrumbLabel={
          bn ? 'বাংলাদেশ ফসল জ্ঞানভাণ্ডার' : 'Bangladesh Crop Library'
        }
        title={
          bn
            ? 'বাংলাদেশ স্মার্ট ফসল চাষাবাদ জ্ঞানভাণ্ডার'
            : 'Bangladesh Smart Crop Knowledge Library'
        }
        subtitle={
          bn
            ? `${allCrops.length}টি ফসল ও ৮টি শ্রেণিতে বাংলা-ইংরেজিতে খুঁজুন — জাত, অঞ্চল, মাটি ও pH, বীজ শোধন, সার-সেচ, অফলাইন সংরক্ষণ ও ধাপে ধাপে সময়রেখা।`
            : `Browse ${allCrops.length} Bangladesh crops across 8 categories with varieties, soil pH, offline guide saving, growth timelines, and Soil & Irrigation linking.`
        }
        language={language}
        onToggleLanguage={onToggleLanguage}
        onNavigate={onNavigate}
        backRoute="dashboard"
        backLabel={bn ? 'ড্যাশবোর্ড' : 'Dashboard'}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Transparent Demo & Offline Readiness Banner */}
        <div className="bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[var(--kb-brand-text)] shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--kb-ink)] leading-relaxed">
              <strong className="font-semibold">
                {bn
                  ? 'প্রসারণযোগ্য ও অফলাইন-সহায়ক জ্ঞানভাণ্ডার: '
                  : 'Offline-Friendly Agricultural Library: '}
              </strong>
              <span className="text-[var(--kb-ink-muted)]">
                {bn
                  ? 'আপনি যেকোনো ফসল খুললে তা স্বয়ংক্রিয়ভাবে ব্রাউজারের localStorage-এ সংরক্ষিত হয়—যাতে ইন্টারনেট ধীর বা অফলাইন থাকলেও পড়া যায়। সর্বশেষ পর্যালোচনা: নভেম্বর ২০২৬।'
                  : 'Opened crop guides automatically save to browser localStorage so they stay accessible even offline. Last Reviewed: Nov 2026.'}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-lg px-3 py-1.5 font-mono tabular-nums">
              {!isOnline ? (
                <WifiOff className="w-3.5 h-3.5 text-[var(--kb-amber)]" />
              ) : (
                <HardDriveDownload className="w-3.5 h-3.5 text-[var(--kb-accent)]" />
              )}
              <span>
                {!isOnline
                  ? bn
                    ? `অফলাইন মোড · ${offlineSavedIds.size}টি সংরক্ষিত`
                    : `Offline · ${offlineSavedIds.size} Cached`
                  : bn
                  ? `অফলাইন প্রস্তুত · ${offlineSavedIds.size}টি ক্যাশড`
                  : `Offline Ready · ${offlineSavedIds.size} Cached`}
              </span>
            </span>

            <button
              type="button"
              onClick={() => setShowOfflineOnly((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                showOfflineOnly
                  ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                  : 'bg-[var(--kb-surface)] text-[var(--kb-brand-text)] border-[var(--kb-border)] hover:border-[var(--kb-accent)]'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span className="tabular-nums">
                {bn
                  ? `অফলাইন-সংরক্ষিত (${offlineSavedIds.size})`
                  : `Offline-Saved (${offlineSavedIds.size})`}
              </span>
            </button>
          </div>
        </div>

        {/* Universal Search + 8 Categories + Alphabetical Browser + Crop Grid */}
        <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 sm:p-6 space-y-5">
          {/* Top Search Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div ref={searchBoxRef} className="flex-1 relative">
              <label
                htmlFor="cultivation-crop-search"
                className="block text-xs font-semibold text-[var(--kb-ink)] mb-1.5"
              >
                {bn
                  ? 'সার্বজনীন ফসল অনুসন্ধান (বাংলা, English বা প্রচলিত নাম লিখুন)'
                  : 'Universal Crop Search (Bangla, English, or local crop aliases)'}
              </label>
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-[var(--kb-ink-muted)] absolute left-3.5 pointer-events-none" />
                <input
                  id="cultivation-crop-search"
                  type="text"
                  role="combobox"
                  aria-expanded={autocompleteOpen}
                  aria-controls="crop-guide-listbox"
                  aria-autocomplete="list"
                  value={searchQuery}
                  onFocus={() => setAutocompleteOpen(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setAutocompleteOpen(true);
                  }}
                  onKeyDown={handleSearchKeyDown}
                  placeholder={
                    bn
                      ? 'যেকোনো ফসল লিখুন (যেমন: ধান, Dragon Fruit, মসুর, জিরা, পাট, আম)...'
                      : 'Search any crop (e.g., Rice, Dragon Fruit, কালোজিরা, Lentil, Jute, Onion)...'
                  }
                  className="w-full min-h-[44px] pl-10 pr-10 py-2 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] focus:bg-[var(--kb-surface)] focus:border-[var(--kb-accent)] rounded-lg text-[var(--kb-ink)]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setAutocompleteOpen(true);
                    }}
                    aria-label={bn ? 'খোঁজা মুছুন' : 'Clear search'}
                    className="absolute right-2.5 p-1.5 rounded-md text-[var(--kb-ink-muted)] hover:text-[var(--kb-danger-text)] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Autocomplete Suggestions Dropdown */}
              {autocompleteOpen && (
                <div className="absolute left-0 right-0 top-[70px] z-30 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl shadow-lg overflow-hidden">
                  <div className="px-3.5 py-2 bg-[var(--kb-surface-muted)] border-b border-[var(--kb-border-subtle)] flex items-center justify-between text-[11px] font-semibold text-[var(--kb-ink-muted)]">
                    <span>
                      {bn ? 'সমর্থিত ফসলের ফলাফল' : 'Matching Crop Library Entries'}
                    </span>
                    <span className="font-mono tabular-nums">
                      {autocompleteMatches.length}/{allCrops.length}
                    </span>
                  </div>
                  {autocompleteMatches.length === 0 ? (
                    <div className="p-4 text-center space-y-2.5">
                      <p className="text-sm text-[var(--kb-ink-muted)]">
                        {bn
                          ? `"${searchQuery}" ফসলটি এখনো আমাদের স্থানীয় জ্ঞানভাণ্ডারে নেই।`
                          : `"${searchQuery}" is not yet in our local crop knowledge library.`}
                      </p>
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          openAddCropWithPrefill(searchQuery);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg cursor-pointer"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>
                          {bn
                            ? `"${searchQuery}" ডেমো অনুরোধ হিসেবে যোগ করুন`
                            : `Add "${searchQuery}" as a Demo Crop Request`}
                        </span>
                      </button>
                    </div>
                  ) : (
                    <ul
                      id="crop-guide-listbox"
                      role="listbox"
                      className="max-h-64 overflow-y-auto divide-y divide-[var(--kb-border-subtle)]"
                    >
                      {autocompleteMatches.map((crop, idx) => {
                        const isSelected = crop.id === selectedCrop.id;
                        const isHighlighted = idx === highlightedIdx;
                        return (
                          <li
                            key={crop.id}
                            role="option"
                            aria-selected={isSelected}
                            onMouseEnter={() => setHighlightedIdx(idx)}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setSearchQuery(bn ? crop.name.bn : crop.name.en);
                              handleSelectCrop(crop, true);
                            }}
                            className={`px-3.5 py-2.5 flex items-center justify-between gap-3 text-sm cursor-pointer ${
                              isSelected
                                ? 'bg-[var(--kb-surface-sage)] text-[var(--kb-brand-text)] font-semibold'
                                : isHighlighted
                                ? 'bg-[var(--kb-surface-muted)] text-[var(--kb-ink)]'
                                : 'text-[var(--kb-ink)] hover:bg-[var(--kb-surface-muted)]'
                            }`}
                          >
                            <div className="min-w-0">
                              <span className="font-semibold">
                                {bn ? crop.name.bn : crop.name.en}
                              </span>
                              <span className="text-[var(--kb-ink-muted)] mx-1.5">·</span>
                              <span className="text-xs text-[var(--kb-ink-muted)]">
                                {bn ? crop.name.en : crop.name.bn}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[var(--kb-ink-muted)] shrink-0">
                              <span>
                                {bn ? crop.categoryLabel.bn : crop.categoryLabel.en}
                              </span>
                              {isSelected && (
                                <Check className="w-4 h-4 text-[var(--kb-accent)]" />
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => openAddCropWithPrefill(searchQuery)}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface-sage)] hover:bg-[var(--kb-surface-sage-strong)] border border-[var(--kb-border)] rounded-lg transition-colors sm:whitespace-nowrap shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 shrink-0" />
              <span>
                {bn
                  ? 'আপনার ফসল খুঁজে পাননি? নতুন ফসল যোগ করুন'
                  : "Can't find your crop? Add another crop"}
              </span>
            </button>
          </div>

          {/* Add Custom Crop Inline Drawer */}
          {addFormOpen && (
            <form
              onSubmit={handleSubmitCustomCrop}
              className="p-5 rounded-xl bg-[var(--kb-surface-muted)] border border-[var(--kb-accent)]/30 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-[var(--kb-ink)]">
                    {bn
                      ? 'নতুন ফসল অনুরোধ যোগ করুন (স্থানীয় ডেমো)'
                      : 'Add Another Crop to Local Demo Library'}
                  </h3>
                  <p className="text-xs text-[var(--kb-ink-muted)]">
                    {bn
                      ? 'নতুন ফসলের জন্য কোনো বানানো তথ্য দেখানো হবে না; এটি কেবল আপনার ব্রাউজারে নমুনা অনুরোধ হিসেবে সংরক্ষিত হবে।'
                      : 'No fabricated agronomy advice will be generated; the entry is saved locally in your browser as a transparent user request.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAddFormOpen(false)}
                  aria-label={bn ? 'বন্ধ করুন' : 'Close'}
                  className="p-1 text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {customError && (
                <p className="text-xs font-semibold text-[var(--kb-danger-text)]">
                  {customError}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label
                    htmlFor="custom-crop-bn"
                    className="block text-xs font-semibold text-[var(--kb-ink)] mb-1"
                  >
                    {bn ? 'বাংলা নাম' : 'Crop Name (Bangla)'}
                  </label>
                  <input
                    id="custom-crop-bn"
                    type="text"
                    value={customNameBn}
                    onChange={(e) => setCustomNameBn(e.target.value)}
                    placeholder={bn ? 'যেমন: ড্রাগন বা অ্যাভোকাডো' : 'e.g., অ্যাভোকাডো'}
                    className="w-full min-h-[40px] px-3 py-1.5 text-sm bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="custom-crop-en"
                    className="block text-xs font-semibold text-[var(--kb-ink)] mb-1"
                  >
                    {bn ? 'ইংরেজি নাম (English)' : 'Crop Name (English)'}
                  </label>
                  <input
                    id="custom-crop-en"
                    type="text"
                    value={customNameEn}
                    onChange={(e) => setCustomNameEn(e.target.value)}
                    placeholder="e.g., Avocado or Quinoa"
                    className="w-full min-h-[40px] px-3 py-1.5 text-sm bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="custom-crop-cat"
                    className="block text-xs font-semibold text-[var(--kb-ink)] mb-1"
                  >
                    {bn ? 'ফসলের শ্রেণি' : 'Category'}
                  </label>
                  <select
                    id="custom-crop-cat"
                    value={customCategory}
                    onChange={(e) =>
                      setCustomCategory(e.target.value as CropCategory)
                    }
                    className="w-full min-h-[40px] px-3 py-1.5 text-sm bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                  >
                    {CROP_CATEGORY_ORDER.map((cat) => (
                      <option key={cat} value={cat}>
                        {bn
                          ? CROP_CATEGORY_LABELS[cat].bn
                          : CROP_CATEGORY_LABELS[cat].en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
                <div className="flex-1">
                  <label
                    htmlFor="custom-crop-note"
                    className="block text-xs font-semibold text-[var(--kb-ink)] mb-1"
                  >
                    {bn ? 'এলাকা বা সংক্ষিপ্ত নোট (ঐচ্ছিক)' : 'Region / Note (Optional)'}
                  </label>
                  <input
                    id="custom-crop-note"
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder={
                      bn
                        ? 'যেমন: পাহাড়ি বাগানের জন্য পরীক্ষামূলক চাষ'
                        : 'e.g., Trial planting on upland terrace plot'
                    }
                    className="w-full min-h-[40px] px-3 py-1.5 text-sm bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                  />
                </div>
                <button
                  type="submit"
                  className="min-h-[40px] px-5 py-2 text-xs font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg cursor-pointer whitespace-nowrap"
                >
                  {bn ? 'ডেমো তালিকায় যোগ করুন' : 'Add Crop Entry'}
                </button>
              </div>
            </form>
          )}

          {/* 8 Category Filter Buttons */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold text-[var(--kb-ink)]">
              {bn
                ? 'ফসলের শ্রেণি অনুযায়ী ব্রাউজ করুন (৮টি শ্রেণি)'
                : 'Browse by Category (8 Crop Groups)'}
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setActiveLetter('ALL');
                }}
                className={`min-h-[38px] px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer tabular-nums ${
                  activeCategory === 'all'
                    ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                    : 'bg-[var(--kb-surface-muted)] text-[var(--kb-ink-muted)] border-[var(--kb-border)] hover:text-[var(--kb-ink)]'
                }`}
              >
                {bn ? `সব ফসল (${allCrops.length})` : `All Crops (${allCrops.length})`}
              </button>
              {CROP_CATEGORY_ORDER.map((catKey) => (
                <button
                  key={catKey}
                  type="button"
                  onClick={() => {
                    setActiveCategory(catKey);
                    setActiveLetter('ALL');
                  }}
                  className={`min-h-[38px] px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer tabular-nums ${
                    activeCategory === catKey
                      ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                      : 'bg-[var(--kb-surface-muted)] text-[var(--kb-ink-muted)] border-[var(--kb-border)] hover:text-[var(--kb-ink)]'
                  }`}
                >
                  {bn
                    ? `${CROP_CATEGORY_LABELS[catKey].bn} (${categoryCounts[catKey]})`
                    : `${CROP_CATEGORY_LABELS[catKey].en} (${categoryCounts[catKey]})`}
                </button>
              ))}
            </div>
          </div>

          {/* Alphabetical Quick-Filter Strip */}
          <div className="space-y-2 pt-1 border-t border-[var(--kb-border-subtle)]">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[var(--kb-ink)]">
                {bn
                  ? 'বর্ণানুক্রমিক ব্রাউজিং (A–Z আদ্যক্ষর)'
                  : 'Alphabetical Browse (A–Z)'}
              </span>
              <span className="text-[11px] font-mono text-[var(--kb-ink-muted)] tabular-nums">
                {bn
                  ? `প্রদর্শিত: ${filteredCards.length}টি ফসল`
                  : `Showing ${filteredCards.length} crops`}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setActiveLetter('ALL')}
                className={`min-h-[30px] px-2.5 text-[11px] font-bold rounded-md border cursor-pointer ${
                  activeLetter === 'ALL'
                    ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                    : 'bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] border-[var(--kb-border)] hover:border-[var(--kb-accent)]'
                }`}
              >
                {bn ? 'সব' : 'All'}
              </button>
              {ALPHABET_LETTERS.map((letter) => {
                const hasCrops = availableLetters.has(letter);
                const isActive = activeLetter === letter;
                return (
                  <button
                    key={letter}
                    type="button"
                    disabled={!hasCrops}
                    onClick={() => setActiveLetter(letter)}
                    className={`min-w-[30px] min-h-[30px] px-1.5 text-[11px] font-mono font-bold rounded-md border transition-colors ${
                      !hasCrops
                        ? 'bg-[var(--kb-surface-muted)]/40 text-[var(--kb-ink-muted)]/35 border-[var(--kb-border-subtle)] cursor-not-allowed'
                        : isActive
                        ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)] cursor-pointer'
                        : 'bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] border-[var(--kb-border)] hover:border-[var(--kb-accent)] cursor-pointer'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Searchable Crop Cards Grid */}
          {filteredCards.length === 0 ? (
            <div className="p-8 text-center bg-[var(--kb-surface-muted)] rounded-xl border border-[var(--kb-border)] space-y-3">
              <p className="text-sm font-bold text-[var(--kb-ink)]">
                {bn
                  ? 'এই অনুসন্ধান বা ফিল্টারে কোনো ফসল পাওয়া যায়নি'
                  : 'No crops matched your search or selected filters'}
              </p>
              <p className="text-xs text-[var(--kb-ink-muted)] max-w-md mx-auto">
                {bn
                  ? 'অন্য নামে খুঁজুন, ফিল্টার রিসেট করুন, অথবা আপনার ফসলটি ডেমো অনুরোধ হিসেবে লাইব্রেরিতে যোগ করুন।'
                  : 'Try another Bangla/English name, reset filters, or add the crop to your local demo library.'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                    setActiveLetter('ALL');
                    setShowOfflineOnly(false);
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-lg cursor-pointer"
                >
                  {bn ? 'সব ফিল্টার রিসেট করুন' : 'Reset Filters'}
                </button>
                <button
                  type="button"
                  onClick={() => openAddCropWithPrefill(searchQuery)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>
                    {bn ? 'নতুন ফসল যোগ করুন' : 'Add Another Crop'}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="max-h-[380px] overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredCards.map((crop) => {
                  const active = crop.id === selectedCrop.id;
                  const isCached = offlineSavedIds.has(crop.id);
                  return (
                    <button
                      key={crop.id}
                      type="button"
                      onClick={() => handleSelectCrop(crop, true)}
                      className={`p-3 rounded-xl border text-left transition-colors cursor-pointer flex items-center gap-3 ${
                        active
                          ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                          : 'bg-[var(--kb-surface-muted)] hover:bg-[var(--kb-surface-sage)] text-[var(--kb-ink)] border-[var(--kb-border)] hover:border-[var(--kb-accent)]'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-black/10 bg-[var(--kb-surface)]">
                        <ResilientImage
                          src={crop.imageUrl}
                          alt={bn ? crop.name.bn : crop.name.en}
                          fallbackTitle={crop.name.en}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-sm font-bold truncate">
                            {bn ? crop.name.bn : crop.name.en}
                          </span>
                          {isCached ? (
                            <BookmarkCheck
                              className={`w-3.5 h-3.5 shrink-0 ${
                                active ? 'text-[#6EE7B7]' : 'text-[var(--kb-accent)]'
                              }`}
                            />
                          ) : (
                            <Sprout
                              className={`w-3.5 h-3.5 shrink-0 ${
                                active ? 'text-[#6EE7B7]' : 'text-[var(--kb-accent)]'
                              }`}
                            />
                          )}
                        </div>
                        <p
                          className={`text-xs truncate ${
                            active ? 'text-[#D1E2D7]' : 'text-[var(--kb-ink-muted)]'
                          }`}
                        >
                          {bn ? crop.name.en : crop.name.bn}
                        </p>
                        <p
                          className={`text-[10px] truncate ${
                            active ? 'text-[#A7F3D0]' : 'text-[var(--kb-accent)]'
                          }`}
                        >
                          {bn ? crop.categoryLabel.bn : crop.categoryLabel.en} ·{' '}
                          {shortSourceLabel(crop.sourceType)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* User-Added Crops Quick Management Row if any */}
          {customRequests.length > 0 && (
            <div className="pt-3 border-t border-[var(--kb-border-subtle)] flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--kb-ink-muted)]">
              <span>
                {bn
                  ? `আপনার যোগ করা ডেমো অনুরোধ: ${customRequests.length}টি`
                  : `Your added demo crop requests: ${customRequests.length}`}
              </span>
              {isCustomSelected && (
                <button
                  type="button"
                  onClick={() => {
                    const removingId = selectedCrop.id;
                    setSelectedCropId('rice');
                    onRemoveCustomCrop(removingId);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--kb-danger-text)] hover:underline cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>
                    {bn
                      ? 'এই ব্যবহারকারী অনুরোধটি মুছুন'
                      : 'Remove Selected Custom Crop'}
                  </span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Detailed Selected Crop Cultivation Guide */}
        <section
          ref={guideDetailRef}
          aria-label={
            bn ? 'বিস্তারিত চাষাবাদ নির্দেশিকা' : 'Detailed Cultivation Guide'
          }
          className="space-y-6 scroll-mt-24"
        >
          {/* Crop Overview Hero Card (1. Crop Introduction) */}
          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 sm:p-8 space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 border-b border-[var(--kb-border-subtle)]">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-[var(--kb-border)]">
                  <ResilientImage
                    src={selectedCrop.imageUrl}
                    alt={bn ? selectedCrop.name.bn : selectedCrop.name.en}
                    fallbackTitle={selectedCrop.name.en}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-[var(--kb-accent)]">
                    {bn
                      ? selectedCrop.categoryLabel.bn
                      : selectedCrop.categoryLabel.en}{' '}
                    · {waterDemandText(selectedCrop.waterDemandLevel)} ·{' '}
                    {sourceLabel(selectedCrop.sourceType)} ·{' '}
                    {bn ? 'পর্যালোচনা: নভেম্বর ২০২৬' : 'Reviewed: Nov 2026'}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--kb-ink)]">
                    {bn
                      ? `${selectedCrop.name.bn} (${selectedCrop.name.en}) চাষাবাদ নির্দেশিকা`
                      : `${selectedCrop.name.en} (${selectedCrop.name.bn}) Cultivation Guide`}
                  </h2>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => togglePinOfflineGuide(selectedCrop)}
                  className={`inline-flex items-center gap-1.5 min-h-[42px] px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                    isPinnedOffline
                      ? 'bg-[var(--kb-surface-sage)] text-[var(--kb-brand-text)] border-[var(--kb-accent)]'
                      : 'bg-[var(--kb-surface)] text-[var(--kb-ink-muted)] border-[var(--kb-border)] hover:text-[var(--kb-brand-text)]'
                  }`}
                >
                  {isPinnedOffline ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-[var(--kb-accent)]" />
                      <span>
                        {bn ? 'অফলাইনে সংরক্ষিত' : 'Saved Offline'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{bn ? 'অফলাইনে পিন করুন' : 'Pin Offline'}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onOpenSoilForCrop(selectedCrop.id)}
                  className="inline-flex items-center gap-1.5 min-h-[42px] px-4 py-2 text-xs font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg sm:whitespace-nowrap cursor-pointer"
                >
                  <Droplets className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {bn
                      ? `${selectedCrop.name.bn}-এর মাটি ও সেচ পরিকল্পনা`
                      : `Soil & Irrigation for ${selectedCrop.name.en}`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('detect')}
                  className="inline-flex items-center gap-1.5 min-h-[42px] px-3.5 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface-sage)] hover:bg-[var(--kb-surface-sage-strong)] border border-[var(--kb-border)] rounded-lg whitespace-nowrap cursor-pointer"
                >
                  <span>{bn ? 'রোগ শনাক্তকরণ' : 'Crop Doctor'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[var(--kb-brand-text)]">
                <BookOpen className="w-4 h-4 shrink-0" />
                <h3 className="text-sm sm:text-base font-bold text-[var(--kb-ink)]">
                  {bn ? '১. ফসলের পরিচিতি ও গুরুত্ব' : '1. Crop Introduction'}
                </h3>
              </div>
              <p className="text-sm sm:text-[15px] text-[var(--kb-ink-muted)] leading-relaxed">
                {bn ? selectedCrop.overview.bn : selectedCrop.overview.en}
              </p>
            </div>
          </div>

          {/* Visual Step-by-Step Growth Stage Timeline */}
          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--kb-border-subtle)]">
              <div>
                <h3 className="text-lg font-bold text-[var(--kb-ink)]">
                  {bn
                    ? `${selectedCrop.name.bn} — বৃদ্ধির ধাপ অনুযায়ী সময়রেখা (জমি তৈরি থেকে সংগ্রহ)`
                    : `${selectedCrop.name.en} — Growth Stage Timeline (Prep to Harvest)`}
                </h3>
                <p className="text-xs text-[var(--kb-ink-muted)]">
                  {bn
                    ? 'জাত, মাটি ও আঞ্চলিক আবহাওয়া ভেদে সময়সীমা পরিবর্তিত হতে পারে'
                    : 'Windows vary by cultivar, planting season, and regional weather'}
                </p>
              </div>
            </div>

            <div
              className={`grid grid-cols-1 gap-4 ${
                selectedCrop.timeline.length <= 4
                  ? 'md:grid-cols-4'
                  : 'md:grid-cols-5'
              }`}
            >
              {selectedCrop.timeline.map((step) => (
                <div
                  key={step.step}
                  className="p-4 rounded-xl bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="w-7 h-7 rounded-full bg-[var(--kb-brand)] text-white font-mono text-xs font-bold flex items-center justify-center tabular-nums">
                        {step.step}
                      </span>
                      <span className="text-[11px] font-mono font-semibold text-[var(--kb-accent)] tabular-nums text-right">
                        {bn ? step.window.bn : step.window.en}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[var(--kb-ink)]">
                      {bn ? step.stage.bn : step.stage.en}
                    </h4>
                  </div>
                  <p className="text-xs text-[var(--kb-ink-muted)] leading-relaxed">
                    {bn ? step.action.bn : step.action.en}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 2–10 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-2.5">
              <div className="flex items-center gap-2 text-[var(--kb-brand-text)]">
                <Award className="w-4 h-4 shrink-0" />
                <h3 className="text-base font-bold text-[var(--kb-ink)]">
                  {bn ? '২. বাংলাদেশে উপযোগী জাত' : '2. Suitable Varieties'}
                </h3>
              </div>
              <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? selectedCrop.suitableVarieties.bn
                  : selectedCrop.suitableVarieties.en}
              </p>
            </div>

            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-2.5">
              <div className="flex items-center gap-2 text-[var(--kb-brand-text)]">
                <MapPin className="w-4 h-4 shrink-0" />
                <h3 className="text-base font-bold text-[var(--kb-ink)]">
                  {bn
                    ? '৩. উপযোগী জেলা ও চাষাবাদ অঞ্চল'
                    : '3. Suitable Districts & Growing Regions'}
                </h3>
              </div>
              <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? selectedCrop.suitableRegions.bn
                  : selectedCrop.suitableRegions.en}
              </p>
            </div>

            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-2.5">
              <div className="flex items-center gap-2 text-[var(--kb-brand-text)]">
                <Calendar className="w-4 h-4 shrink-0" />
                <h3 className="text-base font-bold text-[var(--kb-ink)]">
                  {bn ? '৪. উপযুক্ত মৌসুম ও সময়' : '4. Suitable Season'}
                </h3>
              </div>
              <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? selectedCrop.seasonAndPlanting.bn
                  : selectedCrop.seasonAndPlanting.en}
              </p>
            </div>

            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-2.5">
              <div className="flex items-center gap-2 text-[var(--kb-brand-text)]">
                <Layers className="w-4 h-4 shrink-0" />
                <h3 className="text-base font-bold text-[var(--kb-ink)]">
                  {bn
                    ? '৫. উপযোগী মাটির ধরন ও মাটির pH'
                    : '5. Soil Type & Soil pH'}
                </h3>
              </div>
              <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                {bn ? selectedCrop.soilAndPh.bn : selectedCrop.soilAndPh.en}
              </p>
            </div>

            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-2.5">
              <div className="flex items-center gap-2 text-[var(--kb-brand-text)]">
                <Shovel className="w-4 h-4 shrink-0" />
                <h3 className="text-base font-bold text-[var(--kb-ink)]">
                  {bn ? '৬. জমি তৈরি' : '6. Land Preparation'}
                </h3>
              </div>
              <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? selectedCrop.landPreparation.bn
                  : selectedCrop.landPreparation.en}
              </p>
            </div>

            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-2.5">
              <div className="flex items-center gap-2 text-[var(--kb-accent)]">
                <FlaskConical className="w-4 h-4 shrink-0" />
                <h3 className="text-base font-bold text-[var(--kb-ink)]">
                  {bn
                    ? '৭. বীজ বাছাই ও বীজ শোধন'
                    : '7. Seed Selection & Seed Treatment'}
                </h3>
              </div>
              <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? selectedCrop.seedSelectionAndTreatment.bn
                  : selectedCrop.seedSelectionAndTreatment.en}
              </p>
            </div>

            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-2.5">
              <div className="flex items-center gap-2 text-[var(--kb-brand-text)]">
                <Sprout className="w-4 h-4 shrink-0" />
                <h3 className="text-base font-bold text-[var(--kb-ink)]">
                  {bn ? '৮. রোপণ ও বপন পদ্ধতি' : '8. Planting & Sowing Method'}
                </h3>
              </div>
              <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? selectedCrop.plantingMethod.bn
                  : selectedCrop.plantingMethod.en}
              </p>
            </div>

            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-2.5">
              <div className="flex items-center gap-2 text-[var(--kb-accent)]">
                <Leaf className="w-4 h-4 shrink-0" />
                <h3 className="text-base font-bold text-[var(--kb-ink)]">
                  {bn
                    ? '৯. সার ও পুষ্টি ব্যবস্থাপনা'
                    : '9. Fertilizer & Nutrient Management'}
                </h3>
              </div>
              <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? selectedCrop.fertilizerManagement.bn
                  : selectedCrop.fertilizerManagement.en}
              </p>
              <p className="text-xs text-[var(--kb-brand-text)] pt-1">
                {bn
                  ? '* প্রকৃত মাত্রা SRDI মাটি পরীক্ষা, ফসলের জাত ও ১৬১২৩ কৃষি অফিসারের পরামর্শে নির্ধারণ করুন।'
                  : '* Confirm exact field application rates via SRDI soil tests and local officer guidance (16123).'}
              </p>
            </div>

            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-2.5 md:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-[var(--kb-blue)]">
                  <Droplets className="w-4 h-4 shrink-0" />
                  <h3 className="text-base font-bold text-[var(--kb-ink)]">
                    {bn
                      ? '১০. পর্যায়ভিত্তিক সেচ ও নিষ্কাশন সময়সূচি'
                      : '10. Irrigation & Drainage Schedule'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenSoilForCrop(selectedCrop.id)}
                  className="text-xs font-semibold text-[var(--kb-brand-text)] hover:text-[var(--kb-accent)] sm:whitespace-nowrap cursor-pointer text-left sm:text-right"
                >
                  {bn
                    ? `মাটি ও সেচ পরিকল্পনাকারীতে ${selectedCrop.name.bn} খুলুন →`
                    : `Open ${selectedCrop.name.en} in Soil & Irrigation Planner →`}
                </button>
              </div>
              <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? selectedCrop.irrigationSchedule.bn
                  : selectedCrop.irrigationSchedule.en}
              </p>
            </div>
          </div>

          {/* 11. Growth Stage Care */}
          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-[var(--kb-ink)] pb-3 border-b border-[var(--kb-border-subtle)]">
              {bn
                ? '১১. বিভিন্ন বৃদ্ধির পর্যায়ে ফসলের পরিচর্যা'
                : '11. Growth-Stage Care'}
            </h3>
            <div
              className={`grid grid-cols-1 gap-4 ${
                selectedCrop.growthStageCare.length >= 3
                  ? 'md:grid-cols-3'
                  : 'md:grid-cols-2'
              }`}
            >
              {selectedCrop.growthStageCare.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] space-y-1.5"
                >
                  <h4 className="text-sm font-bold text-[var(--kb-brand-text)]">
                    {bn ? item.stage.bn : item.stage.en}
                  </h4>
                  <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                    {bn ? item.guidance.bn : item.guidance.en}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 12–16 Final Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-2.5 md:col-span-2">
              <div className="flex items-center gap-2 text-[var(--kb-brand-text)]">
                <Scissors className="w-4 h-4 shrink-0" />
                <h3 className="text-base font-bold text-[var(--kb-ink)]">
                  {bn ? '১২. আগাছা ব্যবস্থাপনা' : '12. Weed Management'}
                </h3>
              </div>
              <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? selectedCrop.weedManagement.bn
                  : selectedCrop.weedManagement.en}
              </p>
            </div>

            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-2.5">
              <div className="flex items-center gap-2 text-[var(--kb-amber)]">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <h3 className="text-base font-bold text-[var(--kb-ink)]">
                  {bn
                    ? '১৩. প্রচলিত রোগ ও পোকামাকড়'
                    : '13. Common Diseases & Pests'}
                </h3>
              </div>
              <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? selectedCrop.commonDiseasesAndPests.bn
                  : selectedCrop.commonDiseasesAndPests.en}
              </p>
            </div>

            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-2.5">
              <div className="flex items-center gap-2 text-[var(--kb-accent)]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <h3 className="text-base font-bold text-[var(--kb-ink)]">
                  {bn
                    ? '১৪. প্রতিরোধ ও নিরাপদ ব্যবস্থাপনা (IPM)'
                    : '14. Prevention & Safe Management'}
                </h3>
              </div>
              <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? selectedCrop.preventionAndSafeManagement.bn
                  : selectedCrop.preventionAndSafeManagement.en}
              </p>
            </div>

            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-2.5">
              <div className="flex items-center gap-2 text-[var(--kb-brand-text)]">
                <Wheat className="w-4 h-4 shrink-0" />
                <h3 className="text-base font-bold text-[var(--kb-ink)]">
                  {bn
                    ? '১৫. ফসল সংগ্রহের সময় ও পদ্ধতি'
                    : '15. Harvesting Time & Method'}
                </h3>
              </div>
              <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                {bn ? selectedCrop.harvesting.bn : selectedCrop.harvesting.en}
              </p>
            </div>

            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-2.5">
              <div className="flex items-center gap-2 text-[var(--kb-brand-text)]">
                <Package className="w-4 h-4 shrink-0" />
                <h3 className="text-base font-bold text-[var(--kb-ink)]">
                  {bn
                    ? '১৬. সংগ্রহ-পরবর্তী সংরক্ষণ'
                    : '16. Post-Harvest Storage'}
                </h3>
              </div>
              <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? selectedCrop.postHarvestStorage.bn
                  : selectedCrop.postHarvestStorage.en}
              </p>
            </div>
          </div>

          <ExpertSupportCard language={language} context="cultivation" />

          <SourceQualityNotice
            language={language}
            verifiedSource={{
              bn: 'বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI), বাংলাদেশ ধান গবেষণা ইনস্টিটিউট (BRRI), কৃষি সম্প্রসারণ অধিদপ্তর (DAE) ও SRDI-এর সাধারণ চাষাবাদ নীতির ভিত্তিতে সংকলিত।',
              en: 'Synthesized from standard Bangladesh public agronomy principles (BARI, BRRI, DAE, and SRDI guidelines).',
            }}
            demoScope={{
              bn: 'আঞ্চলিক নমুনা ফসল ও ব্যবহারকারী-যুক্ত অনুরোধসমূহ ব্রাউজারে সংরক্ষিত থাকে। জমিতে সার/বালাইনাশকের সুনির্দিষ্ট মাত্রার জন্য সর্বদা ১৬১২৩ বা SAAO-এর সাথে পরামর্শ করুন।',
              en: 'Regional sample profiles and user-submitted crop requests are local browser demos. Confirm exact field doses with SRDI and 16123 officers.',
            }}
          />
        </section>
      </div>
    </div>
  );
}
