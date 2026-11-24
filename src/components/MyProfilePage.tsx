import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Edit3,
  Globe,
  Info,
  MapPin,
  Phone,
  RotateCcw,
  Save,
  Sprout,
  Trash2,
  User,
  X,
} from 'lucide-react';
import { findDistrictById } from '../data/bangladeshDistricts';
import {
  CROP_CULTIVATION_GUIDES,
  CropCultivationGuide,
} from '../data/cropCultivationData';
import { getDistrictFarmingSuggestion } from '../data/districtFarmingGuidance';
import { CROP_OPTIONS, DEFAULT_FARMER_PROFILE } from '../data/krishiData';
import {
  CropKey,
  DistrictWeather,
  FarmerProfile,
  Language,
  PageRoute,
  ProfileSectionTarget,
} from '../types/krishi';
import { DistrictAutocomplete } from './DistrictAutocomplete';
import { SourceQualityNotice } from './SourceQualityNotice';
import { WorkspaceHeader } from './WorkspaceHeader';

interface MyProfilePageProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
  farmerProfile: FarmerProfile | null;
  onSaveProfile: (profile: FarmerProfile) => void;
  onClearProfile: () => void;
  locations: DistrictWeather[];
  selectedDistrictId: string;
  onSelectDistrict: (id: string) => void;
  sectionTarget: ProfileSectionTarget;
  sectionNonce: number;
  allCrops?: CropCultivationGuide[];
  onOpenCultivationForCrop?: (cropId: string) => void;
}

export function MyProfilePage({
  language,
  onToggleLanguage,
  onNavigate,
  farmerProfile,
  onSaveProfile,
  onClearProfile,
  locations,
  selectedDistrictId,
  onSelectDistrict,
  sectionTarget,
  sectionNonce,
  allCrops = CROP_CULTIVATION_GUIDES,
  onOpenCultivationForCrop,
}: MyProfilePageProps) {
  const bn = language === 'bn';

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [photoError, setPhotoError] = useState<string>('');

  // Editable form state
  const [name, setName] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [districtId, setDistrictId] = useState<string>('bogura');
  const [upazila, setUpazila] = useState<string>('');
  const [village, setVillage] = useState<string>('');
  const [preferredCrops, setPreferredCrops] = useState<CropKey[]>(['rice']);
  const [farmingExperience, setFarmingExperience] = useState<string>('');
  const [farmSizeInput, setFarmSizeInput] = useState<string>('4.5');
  const [preferredLanguage, setPreferredLanguage] = useState<Language>(language);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const farmingSectionRef = useRef<HTMLElement>(null);
  const locationsSectionRef = useRef<HTMLElement>(null);
  const languageSectionRef = useRef<HTMLElement>(null);

  const syncDraftFromProfile = (source: FarmerProfile | null) => {
    if (source) {
      setName(source.name);
      setPhotoUrl(source.photoUrl);
      setMobileNumber(source.mobileNumber);
      setDistrictId(findDistrictById(source.districtId)?.id || 'bogura');
      setUpazila(source.upazila);
      setVillage(source.village);
      setPreferredCrops(
        source.preferredCrops.length > 0 ? source.preferredCrops : [source.primaryCrop]
      );
      setFarmingExperience(source.farmingExperience);
      setFarmSizeInput(String(source.farmSizeBigha));
      setPreferredLanguage(source.preferredLanguage || language);
    } else {
      setName('');
      setPhotoUrl(undefined);
      setMobileNumber('');
      setDistrictId(findDistrictById(selectedDistrictId)?.id || '');
      setUpazila('');
      setVillage('');
      setPreferredCrops(['rice']);
      setFarmingExperience('');
      setFarmSizeInput('2.0');
      setPreferredLanguage(language);
    }
    setFormError('');
    setPhotoError('');
  };

  useEffect(() => {
    syncDraftFromProfile(farmerProfile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [farmerProfile]);

  // Respond to dropdown section target
  useEffect(() => {
    if (sectionTarget === 'edit') {
      syncDraftFromProfile(farmerProfile);
      setIsEditing(true);
      setStatusMessage('');
      return;
    }

    setIsEditing(false);

    const scrollTarget =
      sectionTarget === 'farming'
        ? farmingSectionRef.current
        : sectionTarget === 'locations'
        ? locationsSectionRef.current
        : sectionTarget === 'language'
        ? languageSectionRef.current
        : null;

    if (scrollTarget) {
      window.setTimeout(() => {
        scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionTarget, sectionNonce]);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setPhotoError(
        bn
          ? 'অনুগ্রহ করে কেবল ছবির ফাইল (JPG, PNG, WebP) নির্বাচন করুন।'
          : 'Please select a valid image file (JPG, PNG, or WebP).'
      );
      return;
    }
    if (file.size > 2.5 * 1024 * 1024) {
      setPhotoError(
        bn
          ? 'প্রোফাইল ছবির আকার ২.৫ মেগাবাইটের কম হতে হবে।'
          : 'Profile photo must be smaller than 2.5 MB.'
      );
      return;
    }
    setPhotoError('');
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotoUrl(reader.result);
      }
    };
    reader.onerror = () => {
      setPhotoError(
        bn
          ? 'ছবিটি পড়তে সমস্যা হয়েছে। অনুগ্রহ করে অন্য একটি ছবি নির্বাচন করুন।'
          : 'Could not read the selected image file. Please try another photo.'
      );
    };
    reader.readAsDataURL(file);
  };

  const toggleCropSelection = (cropKey: CropKey) => {
    setPreferredCrops((prev) => {
      if (prev.includes(cropKey)) {
        return prev.length > 1 ? prev.filter((c) => c !== cropKey) : prev;
      }
      return [...prev, cropKey];
    });
  };

  const handleOpenEdit = () => {
    syncDraftFromProfile(farmerProfile);
    setIsEditing(true);
    setStatusMessage('');
  };

  const handleCancelEdit = () => {
    syncDraftFromProfile(farmerProfile);
    setIsEditing(false);
    setFormError('');
  };

  const handleSaveSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError(
        bn ? 'অনুগ্রহ করে সম্পূর্ণ নাম লিখুন।' : 'Please enter your full name.'
      );
      return;
    }

    const validDistrict = findDistrictById(districtId);
    if (!validDistrict) {
      setFormError(
        bn
          ? 'অনুগ্রহ করে বাংলাদেশের ৬৪টি জেলার তালিকা থেকে একটি জেলা নির্বাচন করুন।'
          : 'Please select an official district from the 64-district list.'
      );
      return;
    }

    const parsedSize = Number(farmSizeInput);
    const validSize =
      Number.isFinite(parsedSize) && parsedSize > 0 ? parsedSize : 1;

    const chosenCrops: CropKey[] =
      preferredCrops.length > 0 ? preferredCrops : ['rice'];

    const updated: FarmerProfile = {
      name: name.trim(),
      photoUrl,
      mobileNumber:
        mobileNumber.trim() || (bn ? '০১৭০০-০০০০০০ (ডেমো)' : '01700-000000 (Demo)'),
      districtId: validDistrict.id,
      customDistrictName: undefined,
      upazila: upazila.trim() || (bn ? 'সদর' : 'Sadar'),
      village: village.trim() || (bn ? 'পূর্ব পাড়া' : 'Purba Para'),
      preferredCrops: chosenCrops,
      primaryCrop: chosenCrops[0],
      farmingExperience:
        farmingExperience.trim() || (bn ? '৫ বছর' : '5 years'),
      farmSizeBigha: validSize,
      preferredLanguage,
      phoneNote:
        farmerProfile?.phoneNote || (bn ? 'বোরো ও রবি মৌসুম' : 'Boro & Rabi Season'),
    };

    onSaveProfile(updated);
    onSelectDistrict(validDistrict.id);
    if (preferredLanguage !== language) {
      onToggleLanguage(preferredLanguage);
    }

    setIsEditing(false);
    setStatusMessage(
      bn
        ? 'প্রোফাইল তথ্য ব্রাউজারে (localStorage) সংরক্ষিত হয়েছে — ডেমো মোড।'
        : 'Profile saved locally in browser storage (Frontend Demo).'
    );
  };

  const handleLoadSampleProfile = () => {
    const sampleWithLang: FarmerProfile = {
      ...DEFAULT_FARMER_PROFILE,
      preferredLanguage: language,
    };
    onSaveProfile(sampleWithLang);
    onSelectDistrict(sampleWithLang.districtId);
    setIsEditing(false);
    setStatusMessage(
      bn
        ? 'নমুনা কৃষক প্রোফাইল লোড করা হয়েছে।'
        : 'Sample farmer profile loaded locally.'
    );
  };

  const resolveDistrictLabel = (profile: FarmerProfile) => {
    const official = findDistrictById(profile.districtId);
    if (official) {
      return bn ? official.bn : official.en;
    }
    if (profile.customDistrictName) return profile.customDistrictName;
    const found = locations.find((l) => l.id === profile.districtId);
    if (!found) return profile.districtId;
    return bn ? found.name.bn : found.name.en;
  };

  const handleLanguageChange = (lang: Language) => {
    onToggleLanguage(lang);
    if (farmerProfile) {
      onSaveProfile({ ...farmerProfile, preferredLanguage: lang });
      setStatusMessage(
        lang === 'bn'
          ? 'ভাষা বাংলায় পরিবর্তন ও সংরক্ষণ করা হয়েছে।'
          : 'Language preference updated to English.'
      );
    }
  };

  const districtSuggestion = useMemo(
    () =>
      getDistrictFarmingSuggestion(
        farmerProfile?.districtId || selectedDistrictId,
        farmerProfile?.upazila
      ),
    [farmerProfile?.districtId, farmerProfile?.upazila, selectedDistrictId]
  );

  const recommendedCropGuides = useMemo(
    () =>
      districtSuggestion.recommendedCropIds
        .map((id) => allCrops.find((c) => c.id === id))
        .filter((c): c is CropCultivationGuide => Boolean(c)),
    [districtSuggestion.recommendedCropIds, allCrops]
  );

  return (
    <div className="bg-[var(--kb-canvas)] min-h-screen">
      <WorkspaceHeader
        breadcrumbLabel={bn ? 'আমার প্রোফাইল' : 'My Profile'}
        title={
          bn ? 'আমার কৃষক প্রোফাইল (ডেমো)' : 'My Farmer Profile (Demo)'
        }
        subtitle={
          bn
            ? 'ব্যক্তিগত তথ্য, চাষাবাদের বিবরণ, সংরক্ষিত এলাকা ও ভাষার পছন্দ পরিচালনা করুন (ব্রাউজারভিত্তিক ডেমো)।'
            : 'Manage your personal details, preferred crops, saved districts, and language settings locally.'
        }
        language={language}
        onToggleLanguage={handleLanguageChange}
        onNavigate={onNavigate}
        backRoute="dashboard"
        backLabel={bn ? 'ড্যাশবোর্ড' : 'Dashboard'}
      />

      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Local Demo Notice */}
        <div className="bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[var(--kb-brand-text)] shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--kb-ink)]">
              <strong className="font-semibold">
                {bn ? 'ফ্রন্টএন্ড ডেমো প্রোফাইল: ' : 'Frontend Demo Profile: '}
              </strong>
              <span className="text-[var(--kb-ink-muted)]">
                {bn
                  ? 'কোনো সার্ভার বা লগইন ছাড়াই আপনার প্রোফাইল কেবল ব্রাউজারের localStorage-এ সংরক্ষিত থাকে।'
                  : 'Accessible without authentication. Profile data is stored locally in your browser (localStorage).'}
              </span>
            </p>
          </div>
          {farmerProfile && !isEditing && (
            <button
              type="button"
              onClick={handleOpenEdit}
              className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 py-2 text-xs font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{bn ? 'প্রোফাইল সম্পাদনা' : 'Edit Profile'}</span>
            </button>
          )}
        </div>

        {/* Save / Action Confirmation */}
        {statusMessage && (
          <div
            role="status"
            className="bg-[var(--kb-surface)] border border-[var(--kb-accent)]/40 rounded-xl p-4 flex items-center justify-between gap-3 text-sm text-[var(--kb-brand-text)]"
          >
            <div className="flex items-center gap-2.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[var(--kb-accent)] shrink-0" />
              <span>{statusMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setStatusMessage('')}
              aria-label={bn ? 'বার্তা বন্ধ করুন' : 'Dismiss'}
              className="p-1.5 rounded-lg text-[var(--kb-ink-muted)] hover:bg-[var(--kb-surface-sage)] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* EMPTY PROFILE STATE (when no profile exists & not editing) */}
        {!farmerProfile && !isEditing && (
          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-8 sm:p-12 text-center space-y-5">
            <div className="w-20 h-20 rounded-full bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] text-[var(--kb-brand-text)] flex items-center justify-center mx-auto">
              <User className="w-9 h-9" />
            </div>
            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--kb-ink)]">
                {bn
                  ? 'এখনো কোনো প্রোফাইল তথ্য সংরক্ষিত নেই'
                  : 'No Profile Information Saved Yet'}
              </h2>
              <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? 'আপনার নাম, ছবি, এলাকা, পছন্দের ফসল এবং খামারের আয়তন যোগ করতে নিচের বোতামে ক্লিক করুন। চাইলে দ্রুত দেখার জন্য নমুনা প্রোফাইলও লোড করতে পারেন।'
                  : 'Create your local farmer profile by clicking Edit Profile below, or load the sample profile to preview all fields immediately.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleOpenEdit}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 text-sm font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>{bn ? 'প্রোফাইল সম্পাদনা করুন' : 'Edit Profile'}</span>
              </button>
              <button
                type="button"
                onClick={handleLoadSampleProfile}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface-sage)] hover:bg-[var(--kb-surface-sage-strong)] border border-[var(--kb-border)] rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>
                  {bn ? 'নমুনা প্রোফাইল লোড করুন' : 'Load Sample Profile'}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* EDIT PROFILE FORM */}
        {isEditing && (
          <form
            onSubmit={handleSaveSubmit}
            className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 sm:p-8 space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--kb-border-subtle)]">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[var(--kb-ink)]">
                  {bn ? 'প্রোফাইল তথ্য সম্পাদনা করুন' : 'Edit Profile Information'}
                </h2>
                <p className="text-xs text-[var(--kb-ink-muted)]">
                  {bn
                    ? 'তথ্য পরিবর্তন করে নিচের "পরিবর্তন সংরক্ষণ করুন" বোতামে চাপুন।'
                    : 'Update your fields below and click Save Changes to store locally.'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-semibold text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)] bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>{bn ? 'বাতিল করুন' : 'Cancel'}</span>
              </button>
            </div>

            {/* Profile Photo Upload & Preview */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-4 rounded-xl bg-[var(--kb-surface-muted)] border border-[var(--kb-border)]">
              <div className="w-20 h-20 rounded-full bg-[var(--kb-surface)] border-2 border-[var(--kb-accent)]/40 overflow-hidden flex items-center justify-center shrink-0">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={name || (bn ? 'প্রোফাইল ছবি' : 'Profile photo preview')}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-[var(--kb-brand-text)]" />
                )}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-[var(--kb-ink)]">
                  {bn ? 'প্রোফাইল ছবি (আপলোড ও প্রিভিউ)' : 'Profile Photo (Upload & Preview)'}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface)] hover:bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-lg cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{bn ? 'ছবি আপলোড করুন' : 'Upload Photo'}</span>
                  </button>
                  {photoUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoUrl(undefined);
                        setPhotoError('');
                      }}
                      className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2 text-xs font-semibold text-[var(--kb-danger-text)] bg-[var(--kb-surface)] hover:bg-[var(--kb-danger-bg)] border border-[var(--kb-danger-border)] rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{bn ? 'ছবি সরান' : 'Remove Photo'}</span>
                    </button>
                  )}
                </div>
                {photoError && (
                  <p role="alert" className="text-xs font-medium text-[var(--kb-danger-text)]">
                    {photoError}
                  </p>
                )}
              </div>
            </div>

            {/* 2-Column Editable Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* 1. Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="profile-full-name"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn ? 'সম্পূর্ণ নাম *' : 'Full Name *'}
                </label>
                <input
                  id="profile-full-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={bn ? 'যেমন: করিম মিয়া' : 'e.g., Karim Mia'}
                  className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                />
              </div>

              {/* 2. Mobile Number (demo field) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="profile-mobile"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn ? 'মোবাইল নম্বর (ডেমো ফিল্ড)' : 'Mobile Number (Demo Field)'}
                </label>
                <input
                  id="profile-mobile"
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder={bn ? '০১৭০০-১২৩৪৫৬' : '01700-123456'}
                  className="w-full min-h-[44px] px-3.5 py-2 text-sm font-mono bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                />
              </div>

              {/* 3. District (Searchable 64-District Autocomplete) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="profile-district-autocomplete"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn ? 'জেলা (বাংলাদেশের ৬৪ জেলা) *' : 'District (64 Districts) *'}
                </label>
                <DistrictAutocomplete
                  language={language}
                  valueId={districtId}
                  onChange={(district) => {
                    setDistrictId(district ? district.id : '');
                    if (formError) setFormError('');
                  }}
                  inputId="profile-district-autocomplete"
                />
              </div>

              {/* 4. Upazila */}
              <div className="space-y-1.5">
                <label
                  htmlFor="profile-upazila"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn ? 'উপজেলা' : 'Upazila'}
                </label>
                <input
                  id="profile-upazila"
                  type="text"
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  placeholder={bn ? 'যেমন: শিবগঞ্জ' : 'e.g., Shibganj'}
                  className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                />
              </div>

              {/* 5. Village */}
              <div className="space-y-1.5">
                <label
                  htmlFor="profile-village"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn ? 'গ্রাম / ইউনিয়ন' : 'Village'}
                </label>
                <input
                  id="profile-village"
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder={bn ? 'যেমন: মহাস্থান পূর্ব পাড়া' : 'e.g., Mahasthan Purba Para'}
                  className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                />
              </div>

              {/* 6. Farming Experience */}
              <div className="space-y-1.5">
                <label
                  htmlFor="profile-experience"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn ? 'চাষাবাদের অভিজ্ঞতা' : 'Farming Experience'}
                </label>
                <input
                  id="profile-experience"
                  type="text"
                  value={farmingExperience}
                  onChange={(e) => setFarmingExperience(e.target.value)}
                  placeholder={bn ? 'যেমন: ১২ বছর' : 'e.g., 12 years'}
                  className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                />
              </div>

              {/* 7. Farm Size */}
              <div className="space-y-1.5">
                <label
                  htmlFor="profile-farm-size"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn ? 'জমির পরিমাণ (বিঘা)' : 'Farm Size (Bigha)'}
                </label>
                <input
                  id="profile-farm-size"
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={farmSizeInput}
                  onChange={(e) => setFarmSizeInput(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2 text-sm font-mono bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                />
              </div>

              {/* 8. Preferred Language */}
              <div className="space-y-1.5">
                <span className="block text-xs font-semibold text-[var(--kb-ink)]">
                  {bn ? 'পছন্দের ভাষা' : 'Preferred Language'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPreferredLanguage('bn')}
                    className={`min-h-[44px] px-4 py-2 text-sm font-semibold rounded-lg border transition-colors cursor-pointer ${
                      preferredLanguage === 'bn'
                        ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                        : 'bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] border-[var(--kb-border)]'
                    }`}
                  >
                    বাংলা (Bangla)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredLanguage('en')}
                    className={`min-h-[44px] px-4 py-2 text-sm font-semibold rounded-lg border transition-colors cursor-pointer ${
                      preferredLanguage === 'en'
                        ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                        : 'bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] border-[var(--kb-border)]'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>
            </div>

            {/* 9. Preferred Crops (multi-select) */}
            <div className="space-y-2">
              <span className="block text-xs font-semibold text-[var(--kb-ink)]">
                {bn
                  ? 'পছন্দের ফসলসমূহ (একাধিক নির্বাচন করা যাবে)'
                  : 'Preferred Crops (Select one or more)'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {CROP_OPTIONS.map((crop) => {
                  const selected = preferredCrops.includes(crop.key);
                  return (
                    <button
                      key={crop.key}
                      type="button"
                      onClick={() => toggleCropSelection(crop.key)}
                      className={`min-h-[44px] px-3.5 py-2 text-sm font-semibold rounded-lg border transition-colors cursor-pointer ${
                        selected
                          ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                          : 'bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] border-[var(--kb-border)] hover:border-[var(--kb-accent)]'
                      }`}
                    >
                      {bn ? crop.label.bn : crop.label.en}
                    </button>
                  );
                })}
              </div>
            </div>

            {formError && (
              <p role="alert" className="text-xs font-semibold text-[var(--kb-danger-text)]">
                {formError}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[var(--kb-border-subtle)]">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="min-h-[44px] px-5 py-2.5 text-sm font-semibold text-[var(--kb-ink-muted)] bg-[var(--kb-surface-muted)] hover:bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-lg cursor-pointer"
              >
                {bn ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 text-sm font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{bn ? 'পরিবর্তন সংরক্ষণ করুন' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        )}

        {/* SAVED PROFILE VIEW */}
        {farmerProfile && !isEditing && (
          <div className="space-y-6">
            {/* Top Summary Banner Card */}
            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="w-24 h-24 rounded-full bg-[var(--kb-surface-sage)] border-2 border-[var(--kb-accent)]/40 overflow-hidden flex items-center justify-center shrink-0">
                  {farmerProfile.photoUrl ? (
                    <img
                      src={farmerProfile.photoUrl}
                      alt={farmerProfile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-[var(--kb-brand-text)]" />
                  )}
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-[var(--kb-accent)]">
                    {bn ? 'সংরক্ষিত কৃষক প্রোফাইল (ডেমো)' : 'Saved Farmer Profile (Demo)'}
                  </p>
                  <h2 className="text-2xl font-bold text-[var(--kb-ink)]">
                    {farmerProfile.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--kb-ink-muted)]">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[var(--kb-accent)]" />
                      <span>
                        {farmerProfile.village}, {farmerProfile.upazila},{' '}
                        {resolveDistrictLabel(farmerProfile)}
                      </span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1.5 font-mono tabular-nums">
                      <Phone className="w-3.5 h-3.5 text-[var(--kb-brand-text)]" />
                      <span>{farmerProfile.mobileNumber}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleOpenEdit}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>{bn ? 'প্রোফাইল সম্পাদনা' : 'Edit Profile'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClearProfile();
                    setStatusMessage(
                      bn
                        ? 'ডেমো প্রোফাইল খালি করা হয়েছে।'
                        : 'Demo profile cleared locally.'
                    );
                  }}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 text-sm font-semibold text-[var(--kb-danger-text)] bg-[var(--kb-surface)] hover:bg-[var(--kb-danger-bg)] border border-[var(--kb-danger-border)] rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{bn ? 'প্রোফাইল মুছুন (ডেমো)' : 'Clear (Demo)'}</span>
                </button>
              </div>
            </div>

            {/* Detail Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Personal & Address Details */}
              <section className="lg:col-span-6 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[var(--kb-border-subtle)]">
                  <User className="w-4 h-4 text-[var(--kb-brand-text)]" />
                  <h3 className="text-base sm:text-lg font-bold text-[var(--kb-ink)]">
                    {bn ? 'ব্যক্তিগত ও ঠিকানা তথ্য' : 'Personal & Address Details'}
                  </h3>
                </div>

                <dl className="divide-y divide-[var(--kb-border-subtle)] text-sm">
                  <div className="py-3 flex items-center justify-between gap-4">
                    <dt className="text-[var(--kb-ink-muted)]">{bn ? 'সম্পূর্ণ নাম' : 'Full Name'}</dt>
                    <dd className="font-semibold text-[var(--kb-ink)] text-right">
                      {farmerProfile.name}
                    </dd>
                  </div>
                  <div className="py-3 flex items-center justify-between gap-4">
                    <dt className="text-[var(--kb-ink-muted)]">
                      {bn ? 'মোবাইল নম্বর (ডেমো)' : 'Mobile Number (Demo)'}
                    </dt>
                    <dd className="font-mono font-semibold text-[var(--kb-ink)] tabular-nums text-right">
                      {farmerProfile.mobileNumber}
                    </dd>
                  </div>
                  <div className="py-3 flex items-center justify-between gap-4">
                    <dt className="text-[var(--kb-ink-muted)]">{bn ? 'জেলা' : 'District'}</dt>
                    <dd className="font-semibold text-[var(--kb-ink)] text-right">
                      {resolveDistrictLabel(farmerProfile)}
                    </dd>
                  </div>
                  <div className="py-3 flex items-center justify-between gap-4">
                    <dt className="text-[var(--kb-ink-muted)]">{bn ? 'উপজেলা' : 'Upazila'}</dt>
                    <dd className="font-semibold text-[var(--kb-ink)] text-right">
                      {farmerProfile.upazila}
                    </dd>
                  </div>
                  <div className="py-3 flex items-center justify-between gap-4">
                    <dt className="text-[var(--kb-ink-muted)]">{bn ? 'গ্রাম' : 'Village'}</dt>
                    <dd className="font-semibold text-[var(--kb-ink)] text-right">
                      {farmerProfile.village}
                    </dd>
                  </div>
                </dl>
              </section>

              {/* My Farming Details */}
              <section
                ref={farmingSectionRef}
                id="profile-farming"
                className="lg:col-span-6 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4 scroll-mt-24"
              >
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[var(--kb-border-subtle)]">
                  <div className="flex items-center gap-2">
                    <Sprout className="w-4 h-4 text-[var(--kb-accent)]" />
                    <h3 className="text-base sm:text-lg font-bold text-[var(--kb-ink)]">
                      {bn ? 'আমার চাষাবাদের তথ্য' : 'My Farming Details'}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleOpenEdit}
                    className="text-xs font-semibold text-[var(--kb-brand-text)] hover:text-[var(--kb-accent)] cursor-pointer"
                  >
                    {bn ? 'সম্পাদনা' : 'Edit'}
                  </button>
                </div>

                <dl className="divide-y divide-[var(--kb-border-subtle)] text-sm">
                  <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <dt className="text-[var(--kb-ink-muted)]">
                      {bn ? 'পছন্দের ফসলসমূহ' : 'Preferred Crops'}
                    </dt>
                    <dd className="font-semibold text-[var(--kb-brand-text)] sm:text-right">
                      {(farmerProfile.preferredCrops.length > 0
                        ? farmerProfile.preferredCrops
                        : [farmerProfile.primaryCrop]
                      )
                        .map((cropKey) => {
                          const found = CROP_OPTIONS.find((c) => c.key === cropKey);
                          return found ? (bn ? found.label.bn : found.label.en) : cropKey;
                        })
                        .join(' · ')}
                    </dd>
                  </div>
                  <div className="py-3 flex items-center justify-between gap-4">
                    <dt className="text-[var(--kb-ink-muted)]">
                      {bn ? 'চাষাবাদের অভিজ্ঞতা' : 'Farming Experience'}
                    </dt>
                    <dd className="font-semibold text-[var(--kb-ink)] text-right">
                      {farmerProfile.farmingExperience}
                    </dd>
                  </div>
                  <div className="py-3 flex items-center justify-between gap-4">
                    <dt className="text-[var(--kb-ink-muted)]">
                      {bn ? 'জমির পরিমাণ' : 'Farm Size'}
                    </dt>
                    <dd className="font-mono font-semibold text-[var(--kb-ink)] tabular-nums text-right">
                      {farmerProfile.farmSizeBigha}{' '}
                      {bn ? 'বিঘা' : 'Bigha'}
                    </dd>
                  </div>
                  <div className="py-3 flex items-center justify-between gap-4">
                    <dt className="text-[var(--kb-ink-muted)]">
                      {bn ? 'মৌসুম নোট' : 'Seasonal Focus'}
                    </dt>
                    <dd className="font-semibold text-[var(--kb-ink)] text-right">
                      {farmerProfile.phoneNote}
                    </dd>
                  </div>
                </dl>
              </section>

              {/* Saved Locations */}
              <section
                ref={locationsSectionRef}
                id="profile-locations"
                className="lg:col-span-7 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4 scroll-mt-24"
              >
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--kb-border-subtle)]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[var(--kb-brand-text)]" />
                    <h3 className="text-base sm:text-lg font-bold text-[var(--kb-ink)]">
                      {bn ? 'সংরক্ষিত এলাকা (নমুনা তালিকা)' : 'Saved Locations'}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('weather')}
                    className="text-xs font-semibold text-[var(--kb-brand-text)] hover:text-[var(--kb-accent)] cursor-pointer"
                  >
                    {bn ? 'নতুন এলাকা যোগ করুন →' : 'Manage in Weather →'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {locations.map((loc) => {
                    const isPrimary = loc.id === selectedDistrictId;
                    return (
                      <div
                        key={loc.id}
                        className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                          isPrimary
                            ? 'bg-[var(--kb-surface-sage)] border-[var(--kb-accent)]'
                            : 'bg-[var(--kb-surface-muted)] border-[var(--kb-border)]'
                        }`}
                      >
                        <div className="min-w-0 space-y-0.5">
                          <p className="text-sm font-bold text-[var(--kb-ink)] truncate">
                            {bn ? loc.name.bn : loc.name.en}
                          </p>
                          <p className="text-xs text-[var(--kb-ink-muted)] truncate">
                            {bn ? loc.region.bn : loc.region.en} · {loc.tempC}°C
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            onSelectDistrict(loc.id);
                            onSaveProfile({ ...farmerProfile, districtId: loc.id });
                            setStatusMessage(
                              bn
                                ? `${loc.name.bn} সক্রিয় এলাকা হিসেবে সংরক্ষিত হয়েছে।`
                                : `${loc.name.en} set as active saved location.`
                            );
                          }}
                          className={`px-3 py-1.5 min-h-[36px] text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 cursor-pointer ${
                            isPrimary
                              ? 'bg-[var(--kb-brand)] text-white'
                              : 'bg-[var(--kb-surface)] text-[var(--kb-brand-text)] border border-[var(--kb-border)] hover:bg-[var(--kb-surface-sage)]'
                          }`}
                        >
                          {isPrimary
                            ? bn
                              ? 'সক্রিয়'
                              : 'Active'
                            : bn
                            ? 'নির্বাচন'
                            : 'Select'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Language Settings */}
              <section
                ref={languageSectionRef}
                id="profile-language"
                className="lg:col-span-5 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4 scroll-mt-24 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-[var(--kb-border-subtle)]">
                    <Globe className="w-4 h-4 text-[var(--kb-brand-text)]" />
                    <h3 className="text-base sm:text-lg font-bold text-[var(--kb-ink)]">
                      {bn ? 'ভাষার সেটিংস' : 'Language Settings'}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                    {bn
                      ? 'আপনার পছন্দের ভাষা নির্বাচন করুন। পুরো কৃষিবন্ধু অ্যাপের মেনু ও পরামর্শ তাৎক্ষণিকভাবে পরিবর্তিত হবে।'
                      : 'Choose your preferred interface language. All KrishiBondhu pages and advisories update immediately.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleLanguageChange('bn')}
                    className={`min-h-[48px] px-4 py-2.5 text-sm font-semibold rounded-lg border transition-colors cursor-pointer ${
                      language === 'bn'
                        ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                        : 'bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] border-[var(--kb-border)] hover:border-[var(--kb-accent)]'
                    }`}
                  >
                    বাংলা (Bangla)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLanguageChange('en')}
                    className={`min-h-[48px] px-4 py-2.5 text-sm font-semibold rounded-lg border transition-colors cursor-pointer ${
                      language === 'en'
                        ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                        : 'bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] border-[var(--kb-border)] hover:border-[var(--kb-accent)]'
                    }`}
                  >
                    English
                  </button>
                </div>
              </section>
            </div>

            {/* Location-Based Crop Suggestions */}
            <section
              aria-label={bn ? 'অঞ্চলভিত্তিক ফসল পরামর্শ' : 'Location-Based Crop Suggestions'}
              className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--kb-border-subtle)]">
                <div>
                  <p className="text-xs font-semibold text-[var(--kb-accent)]">
                    {bn ? districtSuggestion.zoneLabel.bn : districtSuggestion.zoneLabel.en} ·{' '}
                    {bn ? districtSuggestion.lastReviewed.bn : districtSuggestion.lastReviewed.en}
                  </p>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--kb-ink)]">
                    {bn
                      ? `${resolveDistrictLabel(farmerProfile)} (${farmerProfile.upazila}) — উপযোগী নমুনা ফসল`
                      : `Sample Crop Suggestions for ${farmerProfile.upazila}, ${resolveDistrictLabel(farmerProfile)}`}
                  </h3>
                </div>
                <span className="text-xs text-[var(--kb-ink-muted)]">
                  {bn ? districtSuggestion.sourceLabel.bn : districtSuggestion.sourceLabel.en}
                </span>
              </div>

              <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? districtSuggestion.soilAndClimateNote.bn
                  : districtSuggestion.soilAndClimateNote.en}{' '}
                <strong className="text-[var(--kb-brand-text)] font-semibold">
                  {bn ? districtSuggestion.seasonalTip.bn : districtSuggestion.seasonalTip.en}
                </strong>
              </p>

              <div className="flex flex-wrap gap-2.5 pt-1">
                {recommendedCropGuides.map((crop) => (
                  <button
                    key={crop.id}
                    type="button"
                    onClick={() =>
                      onOpenCultivationForCrop
                        ? onOpenCultivationForCrop(crop.id)
                        : onNavigate('cultivation')
                    }
                    className="inline-flex items-center gap-2 min-h-[40px] px-3.5 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface-sage)] hover:bg-[var(--kb-surface-sage-strong)] border border-[var(--kb-border)] hover:border-[var(--kb-accent)] rounded-lg transition-colors cursor-pointer"
                  >
                    <Sprout className="w-3.5 h-3.5 text-[var(--kb-accent)] shrink-0" />
                    <span>
                      {bn
                        ? `${crop.name.bn} (${crop.name.en})`
                        : `${crop.name.en} (${crop.name.bn})`}
                    </span>
                    <ArrowRight className="w-3 h-3 shrink-0" />
                  </button>
                ))}
              </div>
            </section>

            <SourceQualityNotice
              language={language}
              verifiedSource={{
                bn: 'বাংলাদেশের ৬৪ জেলা ও কৃষি-পরিবেশগত অঞ্চলের (AEZ / BARI / DAE) সাধারণ ফসল উপযোগিতা কাঠামো।',
                en: 'District crop suggestions align with Bangladesh 64-district official boundaries and AEZ / BARI / DAE models.',
              }}
              demoScope={{
                bn: 'কৃষকের প্রোফাইল ও ছবি কেবল ব্রাউজারের localStorage-এ সংরক্ষিত হয়; কোনো সার্ভার অ্যাকাউন্ট বা বাস্তব অথেনটিকেশন নেই।',
                en: 'Profile details and uploaded avatar previews stay inside browser localStorage with no live server account.',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
