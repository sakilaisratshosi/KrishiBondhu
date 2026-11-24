import { useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_FARMER_PROFILE,
  DISEASE_PROFILES,
  DISTRICT_WEATHER,
  INITIAL_HISTORY,
} from './data/krishiData';
import {
  ActiveDiagnosis,
  DistrictWeather,
  FarmerProfile,
  HistoryRecord,
  Language,
  PageRoute,
  ProfileSectionTarget,
} from './types/krishi';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WorkspaceShell } from './components/WorkspaceShell';
import { LandingPage } from './components/LandingPage';
import { FarmerDashboard } from './components/FarmerDashboard';
import { DiseaseDetection } from './components/DiseaseDetection';
import { DiseaseResult } from './components/DiseaseResult';
import { WeatherAdvisory } from './components/WeatherAdvisory';
import { FarmingAssistant } from './components/FarmingAssistant';
import { CropCalendar } from './components/CropCalendar';
import { DiseaseRiskPrediction } from './components/DiseaseRiskPrediction';
import { ExpenseTracker } from './components/ExpenseTracker';
import { FarmerCommunity } from './components/FarmerCommunity';
import { DiseaseHistory } from './components/DiseaseHistory';
import { SdgImpactPage } from './components/SdgImpactPage';
import { ScalabilityRoadmapPage } from './components/ScalabilityRoadmapPage';
import { FinancialModelPage } from './components/FinancialModelPage';
import { FarmerIncomeFairPricePage } from './components/FarmerIncomeFairPricePage';
import { MyProfilePage } from './components/MyProfilePage';
import { CropCultivationGuide } from './components/CropCultivationGuide';
import { SoilIrrigationCare } from './components/SoilIrrigationCare';
import {
  CROP_CULTIVATION_GUIDES,
  CustomUserCropRequest,
  customRequestToGuide,
  loadCustomUserCropRequests,
  saveCustomUserCropRequests,
} from './data/cropCultivationData';

const PROFILE_STORAGE_KEY = 'krishibondhu_farmer_profile_v1';
const THEME_STORAGE_KEY = 'krishibondhu_theme_v1';

export type ThemeMode = 'light' | 'dark';

function getInitialTheme(): ThemeMode {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark';
    }
  } catch {
    // Ignore storage access failures in restricted frames
  }
  return 'light';
}

function loadInitialProfile(): FarmerProfile | null {
  try {
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (raw === null) {
      return DEFAULT_FARMER_PROFILE;
    }
    const parsed = JSON.parse(raw) as FarmerProfile | null;
    if (!parsed) return null;
    return {
      ...DEFAULT_FARMER_PROFILE,
      ...parsed,
      preferredCrops:
        Array.isArray(parsed.preferredCrops) && parsed.preferredCrops.length > 0
          ? parsed.preferredCrops
          : [parsed.primaryCrop || 'rice'],
    };
  } catch {
    return DEFAULT_FARMER_PROFILE;
  }
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile | null>(() =>
    loadInitialProfile()
  );
  const [language, setLanguage] = useState<Language>(
    () => farmerProfile?.preferredLanguage || 'bn'
  );
  const [activePage, setActivePage] = useState<PageRoute>('home');
  const [locations, setLocations] = useState<DistrictWeather[]>(DISTRICT_WEATHER);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(
    () => farmerProfile?.districtId || 'bogura'
  );
  const [profileSectionTarget, setProfileSectionTarget] =
    useState<ProfileSectionTarget>('overview');
  const [profileSectionNonce, setProfileSectionNonce] = useState<number>(0);
  const [logoutBannerVisible, setLogoutBannerVisible] = useState<boolean>(false);

  const [customCropRequests, setCustomCropRequests] = useState<
    CustomUserCropRequest[]
  >(() => loadCustomUserCropRequests());
  const [selectedSoilCropId, setSelectedSoilCropId] = useState<string>('rice');
  const [selectedCultivationCropId, setSelectedCultivationCropId] =
    useState<string>('rice');

  const allLibraryCrops = useMemo(
    () => [
      ...CROP_CULTIVATION_GUIDES,
      ...customCropRequests.map(customRequestToGuide),
    ],
    [customCropRequests]
  );

  const [history, setHistory] = useState<HistoryRecord[]>(INITIAL_HISTORY);
  const [activeDiagnosis, setActiveDiagnosis] = useState<ActiveDiagnosis>({
    id: 'diag-initial',
    profile: DISEASE_PROFILES.rice,
    previewImageUrl: DISEASE_PROFILES.rice.defaultImage,
    isCustomUpload: false,
    analyzedAt: {
      bn: '১৮ নভেম্বর ২০২৬ · নমুনা ডেমো',
      en: '18 Nov 2026 · Sample Demo',
    },
    districtId: 'bogura',
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (event: MediaQueryListEvent) => {
      try {
        const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
        if (saved !== 'light' && saved !== 'dark') {
          setTheme(event.matches ? 'dark' : 'light');
        }
      } catch {
        setTheme(event.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const handleSetTheme = (nextTheme: ThemeMode) => {
    setTheme(nextTheme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Ignore storage quota errors in restricted frames
    }
  };

  const handleToggleTheme = () => {
    handleSetTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.lang = language === 'bn' ? 'bn' : 'en';
  }, [language]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activePage]);

  const persistProfile = (nextProfile: FarmerProfile | null) => {
    setFarmerProfile(nextProfile);
    if (nextProfile) {
      setLogoutBannerVisible(false);
    }
    try {
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(nextProfile));
    } catch {
      // Ignore storage quota errors in restricted frames
    }
  };

  const handleOpenProfileSection = (section: ProfileSectionTarget) => {
    setProfileSectionTarget(section);
    setProfileSectionNonce((n) => n + 1);
    setActivePage('profile');
  };

  const handleDemoLogout = () => {
    persistProfile(null);
    setLogoutBannerVisible(true);
    setProfileSectionTarget('overview');
    setProfileSectionNonce((n) => n + 1);
    setActivePage('profile');
  };

  const handleAddCustomCrop = (
    req: Omit<CustomUserCropRequest, 'id' | 'createdAt'>
  ) => {
    const created: CustomUserCropRequest = {
      ...req,
      id: `custom-crop-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const next = [created, ...customCropRequests];
    setCustomCropRequests(next);
    saveCustomUserCropRequests(next);
    return customRequestToGuide(created);
  };

  const handleRemoveCustomCrop = (id: string) => {
    const next = customCropRequests.filter((item) => item.id !== id);
    setCustomCropRequests(next);
    saveCustomUserCropRequests(next);
    if (selectedSoilCropId === id) {
      setSelectedSoilCropId('rice');
    }
  };

  const handleOpenSoilForCrop = (cropId: string) => {
    setSelectedSoilCropId(cropId);
    setActivePage('soil');
  };

  const handleOpenCultivationForCrop = (cropId: string) => {
    setSelectedCultivationCropId(cropId);
    setActivePage('cultivation');
  };

  const handleCompleteAnalysis = (diagnosis: ActiveDiagnosis) => {
    setActiveDiagnosis(diagnosis);

    const district =
      locations.find((d) => d.id === diagnosis.districtId) || locations[0];

    const newRecord: HistoryRecord = {
      id: `hist-${Date.now()}`,
      date: diagnosis.analyzedAt,
      isoDate: new Date().toISOString().slice(0, 10),
      districtId: district.id,
      districtName: district.name,
      crop: diagnosis.profile.crop,
      cropLabel: diagnosis.profile.cropLabel,
      profileId: diagnosis.profile.id,
      diseaseName: diagnosis.profile.diseaseName,
      severity: diagnosis.profile.severity,
      severityLabel: diagnosis.profile.severityLabel,
      imageUrl: diagnosis.previewImageUrl,
      notes: {
        bn: diagnosis.isCustomUpload
          ? 'আপনার আপলোডকৃত পাতার ছবির ওপর ভিত্তি করে নমুনা ডেমো প্রতিবেদন তৈরি হয়েছে।'
          : 'নমুনা পাতার ছবির ওপর ভিত্তি করে পূর্বনির্ধারিত ডেমো প্রতিবেদন তৈরি হয়েছে।',
        en: diagnosis.isCustomUpload
          ? 'Generated sample demo report for user-uploaded leaf preview.'
          : 'Generated predefined sample demo report for selected leaf preset.',
      },
    };

    setHistory((prev) => [newRecord, ...prev]);
    setActivePage('result');
  };

  const handleAddLocation = (newLoc: DistrictWeather) => {
    setLocations((prev) => [newLoc, ...prev]);
    setSelectedDistrictId(newLoc.id);
  };

  const handleOpenHistoryRecord = (record: HistoryRecord) => {
    const profile = DISEASE_PROFILES[record.crop] || DISEASE_PROFILES.rice;
    setActiveDiagnosis({
      id: record.id,
      profile,
      previewImageUrl: record.imageUrl,
      isCustomUpload: false,
      analyzedAt: record.date,
      districtId: record.districtId,
    });
    setActivePage('result');
  };

  const renderWorkspacePage = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <FarmerDashboard
            language={language}
            onToggleLanguage={setLanguage}
            onNavigate={setActivePage}
            locations={locations}
            selectedDistrictId={selectedDistrictId}
            onSelectDistrict={setSelectedDistrictId}
            farmerProfile={farmerProfile}
            onUpdateProfile={persistProfile}
            history={history}
            onOpenHistoryRecord={handleOpenHistoryRecord}
            allCrops={allLibraryCrops}
            onOpenCultivationForCrop={handleOpenCultivationForCrop}
          />
        );
      case 'detect':
        return (
          <DiseaseDetection
            language={language}
            onToggleLanguage={setLanguage}
            onNavigate={setActivePage}
            selectedDistrictId={selectedDistrictId}
            onCompleteAnalysis={handleCompleteAnalysis}
          />
        );
      case 'result':
        return (
          <DiseaseResult
            language={language}
            onToggleLanguage={setLanguage}
            onNavigate={setActivePage}
            diagnosis={activeDiagnosis}
          />
        );
      case 'weather':
        return (
          <WeatherAdvisory
            language={language}
            onToggleLanguage={setLanguage}
            onNavigate={setActivePage}
            locations={locations}
            selectedDistrictId={selectedDistrictId}
            onSelectDistrict={setSelectedDistrictId}
            onAddLocation={handleAddLocation}
          />
        );
      case 'assistant':
        return (
          <FarmingAssistant
            language={language}
            onToggleLanguage={setLanguage}
            onNavigate={setActivePage}
          />
        );
      case 'calendar':
        return (
          <CropCalendar
            language={language}
            onToggleLanguage={setLanguage}
            onNavigate={setActivePage}
            allCrops={allLibraryCrops}
          />
        );
      case 'risk':
        return (
          <DiseaseRiskPrediction
            language={language}
            onToggleLanguage={setLanguage}
            onNavigate={setActivePage}
          />
        );
      case 'finance':
        return (
          <ExpenseTracker
            language={language}
            onToggleLanguage={setLanguage}
            onNavigate={setActivePage}
          />
        );
      case 'community':
        return (
          <FarmerCommunity
            language={language}
            onToggleLanguage={setLanguage}
            onNavigate={setActivePage}
            farmerProfile={farmerProfile}
          />
        );
      case 'history':
        return (
          <DiseaseHistory
            language={language}
            onToggleLanguage={setLanguage}
            onNavigate={setActivePage}
            history={history}
            onOpenHistoryRecord={handleOpenHistoryRecord}
          />
        );
      case 'sdg':
        return (
          <SdgImpactPage
            language={language}
            onToggleLanguage={setLanguage}
            onNavigate={setActivePage}
          />
        );
      case 'roadmap':
        return (
          <ScalabilityRoadmapPage
            language={language}
            onToggleLanguage={setLanguage}
            onNavigate={setActivePage}
          />
        );
      case 'financial-model':
        return (
          <FinancialModelPage
            language={language}
            onToggleLanguage={setLanguage}
            onNavigate={setActivePage}
          />
        );
      case 'fair-price':
        return (
          <FarmerIncomeFairPricePage
            language={language}
            onToggleLanguage={setLanguage}
            onNavigate={setActivePage}
            allCrops={allLibraryCrops}
          />
        );
      case 'profile':
        return (
          <MyProfilePage
            language={language}
            onToggleLanguage={setLanguage}
            onNavigate={setActivePage}
            farmerProfile={farmerProfile}
            onSaveProfile={persistProfile}
            onClearProfile={() => persistProfile(null)}
            locations={locations}
            selectedDistrictId={selectedDistrictId}
            onSelectDistrict={setSelectedDistrictId}
            sectionTarget={profileSectionTarget}
            sectionNonce={profileSectionNonce}
            allCrops={allLibraryCrops}
            onOpenCultivationForCrop={handleOpenCultivationForCrop}
          />
        );
      case 'cultivation':
        return (
          <CropCultivationGuide
            language={language}
            onToggleLanguage={setLanguage}
            onNavigate={setActivePage}
            allCrops={allLibraryCrops}
            customRequests={customCropRequests}
            onAddCustomCrop={handleAddCustomCrop}
            onRemoveCustomCrop={handleRemoveCustomCrop}
            onOpenSoilForCrop={handleOpenSoilForCrop}
            initialCropId={selectedCultivationCropId}
          />
        );
      case 'soil':
        return (
          <SoilIrrigationCare
            language={language}
            onToggleLanguage={setLanguage}
            onNavigate={setActivePage}
            allCrops={allLibraryCrops}
            selectedCropId={selectedSoilCropId}
            onSelectCropId={setSelectedSoilCropId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--kb-canvas)] text-[var(--kb-ink)] overflow-x-hidden transition-colors duration-150">
      <Navbar
        activePage={activePage}
        onNavigate={setActivePage}
        language={language}
        onToggleLanguage={setLanguage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onSetTheme={handleSetTheme}
        farmerProfile={farmerProfile}
        onOpenProfileSection={handleOpenProfileSection}
        onDemoLogout={handleDemoLogout}
      />

      {logoutBannerVisible && (
        <div
          role="status"
          className="bg-[var(--kb-surface-sage)] border-b border-[var(--kb-border)] px-4 py-2.5 text-xs sm:text-sm text-[var(--kb-brand-text)] flex flex-wrap items-center justify-center gap-3"
        >
          <span>
            {language === 'bn'
              ? 'ডেমো লগআউট সম্পন্ন হয়েছে — স্থানীয় প্রোফাইল তথ্য খালি করা হয়েছে।'
              : 'Logged out (demo only) — local demo profile has been cleared.'}
          </span>
          <button
            type="button"
            onClick={() => setLogoutBannerVisible(false)}
            className="font-semibold underline hover:no-underline cursor-pointer"
          >
            {language === 'bn' ? 'বন্ধ করুন' : 'Dismiss'}
          </button>
        </div>
      )}

      <main className="flex-1">
        {activePage === 'home' ? (
          <LandingPage
            language={language}
            onToggleLanguage={setLanguage}
            onNavigate={setActivePage}
          />
        ) : (
          <WorkspaceShell
            activePage={activePage}
            onNavigate={setActivePage}
            language={language}
            onToggleLanguage={setLanguage}
          >
            {renderWorkspacePage()}
          </WorkspaceShell>
        )}
      </main>

      <Footer
        language={language}
        onToggleLanguage={setLanguage}
        onNavigate={setActivePage}
      />
    </div>
  );
}

