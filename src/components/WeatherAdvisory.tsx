import { FormEvent, useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Cloud,
  CloudRain,
  Droplets,
  Info,
  MapPin,
  Plus,
  Search,
  Sun,
  Thermometer,
  Wind,
} from 'lucide-react';
import { DISTRICT_WEATHER } from '../data/krishiData';
import {
  DistrictWeather,
  Language,
  PageRoute,
  WeatherForecastDay,
} from '../types/krishi';
import { SourceQualityNotice } from './SourceQualityNotice';
import { WorkspaceHeader } from './WorkspaceHeader';

interface WeatherAdvisoryProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
  locations?: DistrictWeather[];
  selectedDistrictId: string;
  onSelectDistrict: (id: string) => void;
  onAddLocation?: (loc: DistrictWeather) => void;
}

function ForecastIcon({ icon }: { icon: WeatherForecastDay['icon'] }) {
  switch (icon) {
    case 'sun':
      return <Sun className="w-6 h-6 text-[var(--kb-amber)]" />;
    case 'cloud-rain':
      return <CloudRain className="w-6 h-6 text-[var(--kb-blue)]" />;
    case 'wind':
      return <Wind className="w-6 h-6 text-[var(--kb-accent)]" />;
    default:
      return <Cloud className="w-6 h-6 text-[var(--kb-ink-muted)]" />;
  }
}

export function WeatherAdvisory({
  language,
  onToggleLanguage,
  onNavigate,
  locations = DISTRICT_WEATHER,
  selectedDistrictId,
  onSelectDistrict,
  onAddLocation,
}: WeatherAdvisoryProps) {
  const bn = language === 'bn';
  const [locationQuery, setLocationQuery] = useState('');
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [newLocName, setNewLocName] = useState('');
  const [newLocRegion, setNewLocRegion] = useState('');
  const [newLocTemp, setNewLocTemp] = useState('29');
  const [newLocHumidity, setNewLocHumidity] = useState('78');
  const [newLocRain, setNewLocRain] = useState('10');
  const [addError, setAddError] = useState('');

  const filteredLocations = useMemo(() => {
    const q = locationQuery.trim().toLowerCase();
    if (!q) return locations;
    return locations.filter(
      (d) =>
        d.name.bn.toLowerCase().includes(q) ||
        d.name.en.toLowerCase().includes(q) ||
        d.region.bn.toLowerCase().includes(q) ||
        d.region.en.toLowerCase().includes(q)
    );
  }, [locations, locationQuery]);

  const weather =
    locations.find((d) => d.id === selectedDistrictId) || locations[0];

  const spraySafe = weather.rainfallMm < 12 && weather.windKmh <= 15;
  const highHumidityRisk = weather.humidityPercent >= 82;
  const irrigationNeeded = weather.rainfallMm < 5 && weather.tempC >= 29;

  const handleAddLocationSubmit = (e: FormEvent) => {
    e.preventDefault();
    setAddError('');
    if (!newLocName.trim()) {
      setAddError(
        bn
          ? 'অনুগ্রহ করে এলাকার নাম (যেমন: যশোর সদর) লিখুন।'
          : 'Please enter a location name (e.g., Jashore Sadar).'
      );
      return;
    }

    const tempVal = Math.min(45, Math.max(5, Number(newLocTemp) || 28));
    const humidityVal = Math.min(100, Math.max(20, Number(newLocHumidity) || 75));
    const rainVal = Math.min(200, Math.max(0, Number(newLocRain) || 8));
    const regionLabel = newLocRegion.trim() || (bn ? 'নমুনা যোগকৃত অঞ্চল' : 'Custom Sample Region');

    const created: DistrictWeather = {
      id: `loc-${Date.now()}`,
      name: { bn: newLocName.trim(), en: newLocName.trim() },
      region: { bn: `${regionLabel} (নমুনা)`, en: `${regionLabel} (Sample)` },
      tempC: tempVal,
      feelsLikeC: tempVal + 2,
      humidityPercent: humidityVal,
      rainfallMm: rainVal,
      windKmh: 12,
      condition: {
        bn:
          rainVal >= 15
            ? 'বৃষ্টি ও আর্দ্র আবহাওয়া (নমুনা)'
            : humidityVal >= 82
            ? 'উচ্চ আর্দ্রতা ও মেঘলা (নমুনা)'
            : 'আংশিক রোদ ও সহনীয় আবহাওয়া (নমুনা)',
        en:
          rainVal >= 15
            ? 'Rainy & Humid (Sample)'
            : humidityVal >= 82
            ? 'High Humidity & Cloudy (Sample)'
            : 'Partly Sunny & Moderate (Sample)',
      },
      warningTitle: {
        bn: 'নমুনা এলাকা সতর্কতা প্রদর্শনী',
        en: 'Sample Custom Location Advisory',
      },
      warningBody: {
        bn: `${newLocName.trim()} এলাকার নমুনা তথ্য অনুযায়ী আর্দ্রতা ${humidityVal}% ও বৃষ্টিপাত ${rainVal} মি.মি.। পাতার দাগ পর্যবেক্ষণ ও আবহাওয়া দেখে স্প্রে পরিকল্পনা করুন।`,
        en: `Modeled for ${newLocName.trim()}: ${humidityVal}% humidity and ${rainVal} mm rainfall. Monitor leaf surfaces and schedule sprays during dry windows.`,
      },
      forecast: [
        { day: { bn: 'আজ', en: 'Today' }, condition: { bn: 'নমুনা অবস্থা', en: 'Modeled' }, icon: rainVal >= 15 ? 'cloud-rain' : 'cloud', tempMax: tempVal, tempMin: tempVal - 7, rainChance: rainVal >= 15 ? 70 : 25 },
        { day: { bn: 'আগামীকাল', en: 'Tomorrow' }, condition: { bn: 'আংশিক মেঘলা', en: 'Cloudy' }, icon: 'cloud', tempMax: tempVal - 1, tempMin: tempVal - 7, rainChance: 30 },
        { day: { bn: 'পরশু', en: 'Day 3' }, condition: { bn: 'রৌদ্রোজ্জ্বল', en: 'Sunny' }, icon: 'sun', tempMax: tempVal + 1, tempMin: tempVal - 6, rainChance: 10 },
        { day: { bn: '৪র্থ দিন', en: 'Day 4' }, condition: { bn: 'মৃদু বাতাস', en: 'Breezy' }, icon: 'wind', tempMax: tempVal, tempMin: tempVal - 7, rainChance: 15 },
        { day: { bn: '৫ম দিন', en: 'Day 5' }, condition: { bn: 'আংশিক রোদ', en: 'Mild Sun' }, icon: 'sun', tempMax: tempVal + 1, tempMin: tempVal - 6, rainChance: 20 },
      ],
      farmingGuidance: [
        {
          id: `custom-g1-${Date.now()}`,
          title: { bn: 'সেচ ও স্প্রে সময়সূচি', en: 'Irrigation & Spray Timing' },
          detail: {
            bn: 'সকালের শিশির শুকানোর পর ক্ষেত পরিদর্শন করুন এবং বৃষ্টির সম্ভাবনা থাকলে স্প্রে স্থগিত রাখুন।',
            en: 'Inspect foliage after morning dew dries and hold foliar sprays if rain is likely.',
          },
          priority: rainVal >= 15 || humidityVal >= 82 ? 'caution' : 'normal',
          priorityLabel: {
            bn: rainVal >= 15 || humidityVal >= 82 ? 'সতর্কতামূলক পরামর্শ' : 'নিয়মিত পরিচর্যা',
            en: rainVal >= 15 || humidityVal >= 82 ? 'Caution Advisory' : 'Routine Care',
          },
        },
        {
          id: `custom-g2-${Date.now()}`,
          title: { bn: 'জমির পানি নিষ্কাশন ও আগাছা পরিষ্কার', en: 'Drainage & Weeding Check' },
          detail: {
            bn: 'নালা ও আইল পরিষ্কার রেখে ফসলের গোড়ায় বাতাস চলাচল নিশ্চিত করুন।',
            en: 'Keep drainage trenches clear to prevent standing moisture around roots.',
          },
          priority: 'normal',
          priorityLabel: { bn: 'নিয়মিত পরিচর্যা', en: 'Routine Care' },
        },
      ],
    };

    if (onAddLocation) {
      onAddLocation(created);
    }
    setNewLocName('');
    setNewLocRegion('');
    setShowAddLocation(false);
    setLocationQuery('');
  };

  return (
    <div className="bg-[var(--kb-canvas)] min-h-screen">
      <WorkspaceHeader
        breadcrumbLabel={bn ? 'আবহাওয়া পরামর্শ' : 'Weather Advisory'}
        title={
          bn
            ? 'আবহাওয়াভিত্তিক কৃষি পরামর্শ (নমুনা ডেটা)'
            : 'Weather-Based Farming Advisory (Sample Data)'
        }
        subtitle={
          bn
            ? 'জেলা খুঁজুন, নতুন নমুনা এলাকা যোগ করুন এবং তাপমাত্রা, আর্দ্রতা, বৃষ্টিপাত ও ৫ দিনের পূর্বাভাস দেখুন।'
            : 'Search districts, add custom sample locations, and view modeled temperature, rainfall, humidity, and crop-care timing.'
        }
        language={language}
        onToggleLanguage={onToggleLanguage}
        onNavigate={onNavigate}
        backRoute="dashboard"
        backLabel={bn ? 'ড্যাশবোর্ড' : 'Dashboard'}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Sample Weather Disclaimer */}
        <div className="bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-xl p-4 sm:p-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-[var(--kb-brand-text)] shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--kb-ink)]">
            <strong className="font-semibold">
              {bn
                ? 'নমুনা আবহাওয়া তথ্য নির্দেশিকা: '
                : 'Sample Data Disclaimer: '}
            </strong>
            <span className="text-[var(--kb-ink-muted)]">
              {bn
                ? 'এখানে প্রদর্শিত তাপমাত্রা, বৃষ্টিপাত, আর্দ্রতা ও পূর্বাভাস সম্পূর্ণভাবে প্রোটোটাইপ প্রদর্শনের জন্য পূর্বনির্ধারিত নমুনা ডেটা—কোনো লাইভ আবহাওয়া API যুক্ত নয়।'
                : 'All temperature, rainfall, humidity, and 5-day forecast values shown here are static sample scenarios for demonstration purposes—no external weather API is connected.'}
            </span>
          </p>
        </div>

        {/* Location Search, Add Location & District Selector Tabs */}
        <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--kb-ink)]">
              <MapPin className="w-4 h-4 text-[var(--kb-accent)]" />
              <span>{bn ? 'নমুনা কৃষি অঞ্চল খুঁজুন ও নির্বাচন করুন' : 'Search & Select Sample Location'}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-[var(--kb-ink-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <label htmlFor="weather-location-search" className="sr-only">
                  {bn ? 'এলাকা খুঁজুন' : 'Search location'}
                </label>
                <input
                  id="weather-location-search"
                  type="search"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder={bn ? 'এলাকা বা অঞ্চল খুঁজুন...' : 'Search district or region...'}
                  className="w-full min-h-[40px] pl-9 pr-3 py-1.5 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowAddLocation((prev) => !prev)}
                className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>
                  {showAddLocation
                    ? bn
                      ? 'বন্ধ করুন'
                      : 'Close'
                    : bn
                    ? 'নতুন এলাকা যোগ করুন'
                    : 'Add Location'}
                </span>
              </button>
            </div>
          </div>

          {showAddLocation && (
            <form
              onSubmit={handleAddLocationSubmit}
              className="p-4 bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-xl space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="space-y-1 lg:col-span-2">
                  <label htmlFor="new-loc-name" className="block text-xs font-semibold text-[var(--kb-ink)]">
                    {bn ? 'উপজেলা / জেলার নাম' : 'District / Upazila Name'}
                  </label>
                  <input
                    id="new-loc-name"
                    type="text"
                    value={newLocName}
                    onChange={(e) => setNewLocName(e.target.value)}
                    placeholder={bn ? 'যেমন: যশোর সদর' : 'e.g., Jashore Sadar'}
                    className="w-full min-h-[38px] px-3 py-1.5 text-sm bg-[var(--kb-surface)] text-[var(--kb-ink)] border border-[var(--kb-border)] rounded-lg"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="new-loc-region" className="block text-xs font-semibold text-[var(--kb-ink)]">
                    {bn ? 'অঞ্চল' : 'Region'}
                  </label>
                  <input
                    id="new-loc-region"
                    type="text"
                    value={newLocRegion}
                    onChange={(e) => setNewLocRegion(e.target.value)}
                    placeholder={bn ? 'দক্ষিণ-পশ্চিম' : 'Southwest'}
                    className="w-full min-h-[38px] px-3 py-1.5 text-sm bg-[var(--kb-surface)] text-[var(--kb-ink)] border border-[var(--kb-border)] rounded-lg"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="new-loc-temp" className="block text-xs font-semibold text-[var(--kb-ink)]">
                    {bn ? 'তাপমাত্রা (°C)' : 'Temp (°C)'}
                  </label>
                  <input
                    id="new-loc-temp"
                    type="number"
                    value={newLocTemp}
                    onChange={(e) => setNewLocTemp(e.target.value)}
                    className="w-full min-h-[38px] px-3 py-1.5 text-sm font-mono bg-[var(--kb-surface)] text-[var(--kb-ink)] border border-[var(--kb-border)] rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label htmlFor="new-loc-rh" className="block text-xs font-semibold text-[var(--kb-ink)]">
                      {bn ? 'আর্দ্রতা %' : 'RH %'}
                    </label>
                    <input
                      id="new-loc-rh"
                      type="number"
                      value={newLocHumidity}
                      onChange={(e) => setNewLocHumidity(e.target.value)}
                      className="w-full min-h-[38px] px-2.5 py-1.5 text-sm font-mono bg-[var(--kb-surface)] text-[var(--kb-ink)] border border-[var(--kb-border)] rounded-lg"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="new-loc-rain" className="block text-xs font-semibold text-[var(--kb-ink)]">
                      {bn ? 'বৃষ্টি mm' : 'Rain mm'}
                    </label>
                    <input
                      id="new-loc-rain"
                      type="number"
                      value={newLocRain}
                      onChange={(e) => setNewLocRain(e.target.value)}
                      className="w-full min-h-[38px] px-2.5 py-1.5 text-sm font-mono bg-[var(--kb-surface)] text-[var(--kb-ink)] border border-[var(--kb-border)] rounded-lg"
                    />
                  </div>
                </div>
              </div>
              {addError && (
                <p role="alert" className="text-xs font-medium text-[var(--kb-danger-text)]">
                  {addError}
                </p>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="min-h-[38px] px-4 py-1.5 text-xs font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg cursor-pointer"
                >
                  {bn ? 'নমুনা এলাকা সংরক্ষণ করুন' : 'Save Sample Location'}
                </button>
              </div>
            </form>
          )}

          {filteredLocations.length === 0 ? (
            <div className="py-3 flex items-center justify-between text-sm text-[var(--kb-ink-muted)]">
              <span>
                {bn
                  ? `"${locationQuery}" নামে কোনো নমুনা এলাকা পাওয়া যায়নি।`
                  : `No sample locations matched "${locationQuery}".`}
              </span>
              <button
                type="button"
                onClick={() => setLocationQuery('')}
                className="text-xs font-semibold text-[var(--kb-brand-text)] hover:underline cursor-pointer"
              >
                {bn ? 'রিসেট' : 'Clear search'}
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {filteredLocations.map((d) => {
                const active = d.id === weather.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => onSelectDistrict(d.id)}
                    className={`min-h-[40px] px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                        : 'bg-[var(--kb-surface-muted)] text-[var(--kb-ink-muted)] border-[var(--kb-border)] hover:text-[var(--kb-ink)] hover:border-[var(--kb-accent)]'
                    }`}
                  >
                    {bn ? d.name.bn : d.name.en}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Current Sample Conditions + Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 bg-[#113520] dark:bg-[#0F2C1B] border border-[#1E5133] text-white rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-2">
              <p className="text-xs font-medium text-[#A7F3D0]">
                {bn ? weather.region.bn : weather.region.en} ·{' '}
                {bn ? 'নমুনা অবস্থা' : 'Sample Condition'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {bn ? weather.name.bn : weather.name.en}
              </h2>
              <p className="text-sm text-[#D1E2D7]">
                {bn ? weather.condition.bn : weather.condition.en}
              </p>
            </div>

            <div className="flex items-end justify-between pt-4 border-t border-[#1E5133]">
              <div>
                <span className="font-mono text-5xl font-bold text-white tabular-nums">
                  {weather.tempC}°C
                </span>
                <p className="text-xs text-[#A7F3D0] mt-1 tabular-nums">
                  {bn
                    ? `অনুভূত তাপমাত্রা: ${weather.feelsLikeC}° সে.`
                    : `Feels like ${weather.feelsLikeC}°C`}
                </p>
              </div>
              <Thermometer className="w-10 h-10 text-[#6EE7B7]" />
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between text-[var(--kb-ink-muted)]">
                <span className="text-sm font-semibold">
                  {bn ? 'আর্দ্রতা' : 'Humidity'}
                </span>
                <Droplets className="w-5 h-5 text-[var(--kb-accent)]" />
              </div>
              <div>
                <p className="font-mono text-3xl font-bold text-[var(--kb-ink)] tabular-nums">
                  {weather.humidityPercent}%
                </p>
                <p className="text-xs text-[var(--kb-ink-muted)] mt-1">
                  {highHumidityRisk
                    ? bn
                      ? 'উচ্চ আর্দ্রতা — ছত্রাক পর্যবেক্ষণ জরুরি'
                      : 'High — monitor leaf surfaces'
                    : bn
                    ? 'সহনীয় মাত্রা'
                    : 'Moderate level'}
                </p>
              </div>
            </div>

            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between text-[var(--kb-ink-muted)]">
                <span className="text-sm font-semibold">
                  {bn ? 'বৃষ্টিপাত (নমুনা)' : 'Rainfall (Sample)'}
                </span>
                <CloudRain className="w-5 h-5 text-[var(--kb-blue)]" />
              </div>
              <div>
                <p className="font-mono text-3xl font-bold text-[var(--kb-ink)] tabular-nums">
                  {weather.rainfallMm} mm
                </p>
                <p className="text-xs text-[var(--kb-ink-muted)] mt-1">
                  {weather.rainfallMm >= 15
                    ? bn
                      ? 'স্প্রে স্থগিত ও নালা পরিষ্কার রাখুন'
                      : 'Pause sprays; check drainage'
                    : bn
                    ? 'স্বাভাবিক কাজকর্মের উপযোগী'
                    : 'Manageable field moisture'}
                </p>
              </div>
            </div>

            <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between text-[var(--kb-ink-muted)]">
                <span className="text-sm font-semibold">
                  {bn ? 'বাতাসের গতি' : 'Wind Speed'}
                </span>
                <Wind className="w-5 h-5 text-[var(--kb-brand-text)]" />
              </div>
              <div>
                <p className="font-mono text-3xl font-bold text-[var(--kb-ink)] tabular-nums">
                  {weather.windKmh} km/h
                </p>
                <p className="text-xs text-[var(--kb-ink-muted)] mt-1">
                  {bn
                    ? 'স্প্রে করার সময় বাতাসের দিক খেয়াল রাখুন'
                    : 'Check wind drift before spraying'}
                </p>
              </div>
            </div>

            {/* Warning Strip spanning 3 cols */}
            <div className="sm:col-span-3 bg-[var(--kb-warn-bg)] border border-[var(--kb-warn-border)] rounded-xl p-5 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[var(--kb-warn-icon)] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[var(--kb-warn-title)]">
                  {bn ? weather.warningTitle.bn : weather.warningTitle.en}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--kb-warn-text)] leading-relaxed">
                  {bn ? weather.warningBody.bn : weather.warningBody.en}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Field Suitability Summary Strip */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[var(--kb-ink)]">
                {bn ? 'স্প্রে করার উপযুক্ততা' : 'Spray Window Status'}
              </h3>
              {spraySafe ? (
                <CheckCircle2 className="w-4 h-4 text-[var(--kb-accent)]" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-[var(--kb-amber)]" />
              )}
            </div>
            <p
              className={`text-sm font-semibold ${
                spraySafe ? 'text-[var(--kb-accent)]' : 'text-[var(--kb-amber)]'
              }`}
            >
              {spraySafe
                ? bn
                  ? 'অনুকূল (শুষ্ক ও কম বাতাস)'
                  : 'Favorable (Dry & Calm)'
                : bn
                ? 'সতর্কতা: স্প্রে স্থগিত রাখুন'
                : 'Caution: Hold Spraying'}
            </p>
            <p className="text-xs text-[var(--kb-ink-muted)]">
              {spraySafe
                ? bn
                  ? 'সকালে বা বিকেলে প্রয়োজনে কৃষি কর্মকর্তার নির্দেশিত স্প্রে করা যাবে।'
                  : 'Low wind and rain chance allow safer foliar timing if advised.'
                : bn
                ? 'বৃষ্টি বা বেশি বাতাসের কারণে স্প্রে ধুয়ে যাওয়ার ঝুঁকি রয়েছে।'
                : 'High rain or wind increases runoff and drift loss.'}
            </p>
          </div>

          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[var(--kb-ink)]">
                {bn ? 'সেচ পরামর্শ (নমুনা)' : 'Irrigation Guidance'}
              </h3>
              <Droplets className="w-4 h-4 text-[var(--kb-blue)]" />
            </div>
            <p className="text-sm font-semibold text-[var(--kb-brand-text)]">
              {irrigationNeeded
                ? bn
                  ? 'বিকেলে হালকা সেচ প্রয়োজন'
                  : 'Evening Light Irrigation'
                : bn
                ? 'অতিরিক্ত সেচের প্রয়োজন নেই'
                : 'Hold Heavy Irrigation'}
            </p>
            <p className="text-xs text-[var(--kb-ink-muted)]">
              {irrigationNeeded
                ? bn
                  ? 'শুষ্ক আবহাওয়ায় বাষ্পীভবন কমাতে দুপুরের পরিবর্তে বিকেলে সেচ দিন।'
                  : 'Irrigate late afternoon to reduce daytime evaporation.'
                : bn
                ? 'বাতাসে আর্দ্রতা ও বৃষ্টির সম্ভাবনা থাকায় মাটির আর্দ্রতা দেখে সেচ দিন।'
                : 'Check soil moisture first to avoid waterlogging.'}
            </p>
          </div>

          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[var(--kb-ink)]">
                {bn ? 'ছত্রাকজনিত রোগের ঝুঁকি (নমুনা)' : 'Fungal Watch Level'}
              </h3>
              {highHumidityRisk ? (
                <AlertTriangle className="w-4 h-4 text-[var(--kb-danger-text)]" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-[var(--kb-accent)]" />
              )}
            </div>
            <p
              className={`text-sm font-semibold ${
                highHumidityRisk ? 'text-[var(--kb-danger-text)]' : 'text-[var(--kb-accent)]'
              }`}
            >
              {highHumidityRisk
                ? bn
                  ? 'উচ্চ নজরদারি (আর্দ্রতা ৮২%+)'
                  : 'Elevated Watch (82%+ RH)'
                : bn
                ? 'স্বাভাবিক নজরদারি'
                : 'Standard Scouting'}
            </p>
            <p className="text-xs text-[var(--kb-ink-muted)]">
              {highHumidityRisk
                ? bn
                  ? 'ধানের ব্লাস্ট ও আলুর মড়ক রোগের লক্ষণ সকালে নিয়মিত পরীক্ষা করুন।'
                  : 'Scout rice and potato foliage early for blast or blight lesions.'
                : bn
                ? 'নিয়মিত সাপ্তাহিক পাতা পর্যবেক্ষণ বজায় রাখুন।'
                : 'Maintain routine weekly canopy checks.'}
            </p>
          </div>
        </section>

        {/* 5-Day Sample Forecast with Visual Rain & Temp Bars */}
        <section className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--kb-border-subtle)]">
            <h2 className="text-lg font-bold text-[var(--kb-ink)]">
              {bn ? '৫ দিনের নমুনা পূর্বাভাস' : '5-Day Sample Forecast'}
            </h2>
            <span className="text-xs text-[var(--kb-ink-muted)]">
              {bn
                ? 'তাপমাত্রা ও বৃষ্টির সম্ভাবনা (দৃষ্টান্তমূলক ডেটা)'
                : 'Max/Min Temperature & Rain Chance (Illustrative Data)'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {weather.forecast.map((day, idx) => (
              <div
                key={idx}
                className="p-4 bg-[var(--kb-surface-muted)] border border-[var(--kb-border-subtle)] rounded-xl flex flex-col justify-between gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[var(--kb-ink)]">
                    {bn ? day.day.bn : day.day.en}
                  </span>
                  <ForecastIcon icon={day.icon} />
                </div>
                <p className="text-xs text-[var(--kb-ink-muted)]">
                  {bn ? day.condition.bn : day.condition.en}
                </p>

                {/* Rain probability bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-[var(--kb-ink-muted)]">
                    <span>{bn ? 'বৃষ্টি' : 'Rain'}</span>
                    <span className="text-[var(--kb-blue)] font-semibold">
                      {day.rainChance}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[var(--kb-border)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--kb-blue)] rounded-full"
                      style={{ width: `${day.rainChance}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--kb-border)] flex items-center justify-between text-xs font-mono tabular-nums">
                  <span className="font-bold text-[var(--kb-ink)]">
                    {day.tempMax}° / {day.tempMin}°C
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weather-Based Farming Guidance */}
        <section className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-5">
          <h2 className="text-lg font-bold text-[var(--kb-ink)]">
            {bn
              ? 'আবহাওয়া অনুযায়ী ফসল পরিচর্যা নির্দেশনা'
              : 'Weather-Based Farming Guidance'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {weather.farmingGuidance.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-xl space-y-2.5"
              >
                <span
                  className={`inline-block text-xs font-semibold ${
                    item.priority === 'caution'
                      ? 'text-[var(--kb-amber)]'
                      : 'text-[var(--kb-accent)]'
                  }`}
                >
                  {bn ? item.priorityLabel.bn : item.priorityLabel.en}
                </span>
                <h3 className="text-base font-bold text-[var(--kb-ink)]">
                  {bn ? item.title.bn : item.title.en}
                </h3>
                <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                  {bn ? item.detail.bn : item.detail.en}
                </p>
              </div>
            ))}
          </div>
        </section>

        <SourceQualityNotice
          language={language}
          verifiedSource={{
            bn: 'বৃষ্টি ও বাতাসের পূর্বাভাস বিবেচনা করে স্প্রে, সার ও সেচ সমন্বয়ের কৃষি আবহাওয়া (Agro-Meteorology / BAMIS) নীতি।',
            en: 'Agro-meteorological timing rules for avoiding pre-rain spraying, managing wind drift, and planning irrigation.',
          }}
          demoScope={{
            bn: 'জেলাগুলোর তাপমাত্রা, আর্দ্রতা, বৃষ্টি ও ৫ দিনের পূর্বাভাস প্রদর্শনের জন্য স্থির নমুনা ডেটা—কোনো লাইভ আবহাওয়া API যুক্ত নয়।',
            en: 'Temperatures, rainfall, humidity, and 5-day forecasts are static sample datasets with no live external weather API.',
          }}
        />
      </div>
    </div>
  );
}
