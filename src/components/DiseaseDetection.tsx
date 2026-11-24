import { ChangeEvent, DragEvent, useState } from 'react';
import {
  Camera,
  CheckCircle2,
  Info,
  Loader2,
  ScanSearch,
  Trash2,
  Upload,
} from 'lucide-react';
import { ASSETS, CROP_OPTIONS, DISEASE_PROFILES } from '../data/krishiData';
import {
  ActiveDiagnosis,
  BilingualText,
  CropKey,
  Language,
  PageRoute,
} from '../types/krishi';
import { ResilientImage } from './ResilientImage';
import { WorkspaceHeader } from './WorkspaceHeader';

interface DiseaseDetectionProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
  selectedDistrictId: string;
  onCompleteAnalysis: (diagnosis: ActiveDiagnosis) => void;
}

const OBSERVATION_OPTIONS: { id: string; text: BilingualText }[] = [
  {
    id: 'obs-spots',
    text: {
      bn: 'পাতায় বাদামি, কালচে বা ধূসর দাগ দেখা যাচ্ছে',
      en: 'Brown, dark, or grayish spots visible on leaves',
    },
  },
  {
    id: 'obs-dew',
    text: {
      bn: 'গত কয়েকদিন সকালে ঘন কুয়াশা বা শিশির ছিল',
      en: 'Heavy morning dew or winter fog in recent days',
    },
  },
  {
    id: 'obs-lower',
    text: {
      bn: 'সমস্যাটি নিচের পুরোনো পাতায় বেশি দেখা যাচ্ছে',
      en: 'Symptoms appear mostly on older lower leaves',
    },
  },
];

export function DiseaseDetection({
  language,
  onToggleLanguage,
  onNavigate,
  selectedDistrictId,
  onCompleteAnalysis,
}: DiseaseDetectionProps) {
  const bn = language === 'bn';
  const [selectedCrop, setSelectedCrop] = useState<CropKey>('rice');
  const [previewUrl, setPreviewUrl] = useState<string>(
    DISEASE_PROFILES.rice.defaultImage
  );
  const [isCustomUpload, setIsCustomUpload] = useState<boolean>(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [uploadedFileSize, setUploadedFileSize] = useState<string>('');
  const [selectedObsIds, setSelectedObsIds] = useState<string[]>(['obs-spots']);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>('');

  const handleSelectCrop = (crop: CropKey) => {
    setSelectedCrop(crop);
    setUploadError('');
    if (!isCustomUpload) {
      setPreviewUrl(DISEASE_PROFILES[crop].defaultImage);
    }
  };

  const processFile = (file: File) => {
    setUploadError('');
    if (!file.type.startsWith('image/')) {
      setUploadError(
        bn
          ? 'অনুগ্রহ করে একটি বৈধ ছবির ফাইল (JPG, PNG, WebP) নির্বাচন করুন।'
          : 'Please select a valid image file (JPG, PNG, or WebP).'
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError(
        bn
          ? 'ছবির আকার ৫ মেগাবাইটের কম হতে হবে।'
          : 'Please choose an image smaller than 5 MB for browser preview.'
      );
      return;
    }

    const sizeKb = Math.max(1, Math.round(file.size / 1024));
    const sizeText =
      sizeKb >= 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreviewUrl(reader.result);
        setIsCustomUpload(true);
        setUploadedFileName(file.name);
        setUploadedFileSize(sizeText);
      }
    };
    reader.onerror = () => {
      setUploadError(
        bn
          ? 'ছবিটি পড়তে সমস্যা হয়েছে। অনুগ্রহ করে অন্য একটি ছবি নির্বাচন করুন।'
          : 'Could not read the selected image file. Please try another photo.'
      );
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (file) processFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleClearUpload = () => {
    setIsCustomUpload(false);
    setUploadedFileName('');
    setUploadedFileSize('');
    setUploadError('');
    setPreviewUrl(DISEASE_PROFILES[selectedCrop].defaultImage);
  };

  const handleUsePresetSample = (crop: CropKey) => {
    setSelectedCrop(crop);
    setPreviewUrl(DISEASE_PROFILES[crop].defaultImage);
    setIsCustomUpload(false);
    setUploadedFileName('');
    setUploadedFileSize('');
    setUploadError('');
  };

  const toggleObservation = (id: string) => {
    setSelectedObsIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAnalyze = () => {
    if (!previewUrl) {
      setUploadError(
        bn
          ? 'বিশ্লেষণের আগে একটি পাতার ছবি আপলোড করুন বা নমুনা ছবি নির্বাচন করুন।'
          : 'Please upload a leaf photo or choose a sample leaf preset first.'
      );
      return;
    }

    setIsAnalyzing(true);
    window.setTimeout(() => {
      const profile = DISEASE_PROFILES[selectedCrop];
      const now = new Date();
      const formattedTimeEn = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });

      const fieldObservations = OBSERVATION_OPTIONS.filter((o) =>
        selectedObsIds.includes(o.id)
      ).map((o) => o.text);

      onCompleteAnalysis({
        id: `diag-${Date.now()}`,
        profile,
        previewImageUrl: previewUrl,
        isCustomUpload,
        uploadedFileName: uploadedFileName || undefined,
        fieldObservations,
        analyzedAt: {
          bn: `আজ (${formattedTimeEn}) · নমুনা ডেমো`,
          en: `Today (${formattedTimeEn}) · Sample Demo`,
        },
        districtId: selectedDistrictId,
      });
      setIsAnalyzing(false);
    }, 700);
  };

  const samplePresets: { crop: CropKey; title: BilingualText; img: string }[] = [
    {
      crop: 'rice',
      title: { bn: 'নমুনা: ধানের পাতা', en: 'Sample: Rice Leaf' },
      img: ASSETS.riceBlast,
    },
    {
      crop: 'tomato',
      title: { bn: 'নমুনা: টমেটো পাতা', en: 'Sample: Tomato Leaf' },
      img: ASSETS.tomatoBlight,
    },
    {
      crop: 'potato',
      title: { bn: 'নমুনা: আলুর পাতা', en: 'Sample: Potato Leaf' },
      img: ASSETS.potatoBlight,
    },
  ];

  return (
    <div className="bg-[var(--kb-canvas)] min-h-screen">
      <WorkspaceHeader
        breadcrumbLabel={bn ? 'রোগ শনাক্তকরণ (ডেমো)' : 'Crop Disease Detection'}
        title={
          bn
            ? 'এআই ক্রপ ডক্টর — পাতার রোগ পর্যালোচনা (নমুনা ডেমো)'
            : 'AI Crop Doctor — Leaf Inspection (Sample Demo)'
        }
        subtitle={
          bn
            ? 'ফসল নির্বাচন করে পাতার ছবি আপলোড বা টেনে আনুন, অথবা নিচের নমুনা ছবি দিয়ে পূর্বনির্ধারিত ডেমো ফলাফল দেখুন।'
            : 'Select a crop, drag & drop or upload a leaf image, or load a sample leaf preset to view predefined demo guidance.'
        }
        language={language}
        onToggleLanguage={onToggleLanguage}
        onNavigate={onNavigate}
        backRoute="dashboard"
        backLabel={bn ? 'ড্যাশবোর্ড' : 'Dashboard'}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Transparent Static Prototype Notice */}
        <div className="bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-xl p-4 sm:p-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-[var(--kb-brand-text)] shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm text-[var(--kb-ink)]">
            <p className="font-semibold">
              {bn
                ? 'নমুনা প্রদর্শনী মোড — প্রকৃত AI মডেল সংযুক্ত নয়'
                : 'Sample Demo Mode — No Live AI Model Connected'}
            </p>
            <p className="text-[var(--kb-ink-muted)]">
              {bn
                ? 'এই রাউন্ড ১ প্রোটোটাইপটি শুধুমাত্র ব্রাউজারে পূর্বনির্ধারিত নমুনা ফলাফল দেখায়। কোনো ছবি সার্ভারে পাঠানো হয় না এবং এটি প্রকৃত রোগ নির্ণয়ের বিকল্প নয়।'
                : 'This Round 1 static prototype demonstrates the user workflow using predefined local sample results only. Uploaded images stay in your browser and are never sent to a server or AI model.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-7 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 sm:p-8 space-y-7">
            {/* Step 1: Select Crop */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-bold text-[var(--kb-ink)]">
                  {bn ? '১. ফসল নির্বাচন করুন' : '1. Select Crop'}
                </h2>
                <span className="text-xs text-[var(--kb-ink-muted)]">
                  {bn ? '৪টি নমুনা ফসল' : '4 sample crops'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CROP_OPTIONS.map((crop) => {
                  const active = selectedCrop === crop.key;
                  return (
                    <button
                      key={crop.key}
                      type="button"
                      onClick={() => handleSelectCrop(crop.key)}
                      className={`min-h-[60px] p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
                        active
                          ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                          : 'bg-[var(--kb-surface-muted)] text-[var(--kb-ink)] border-[var(--kb-border)] hover:border-[var(--kb-accent)]'
                      }`}
                    >
                      <span className="block text-sm font-bold">
                        {bn ? crop.label.bn : crop.label.en}
                      </span>
                      <span
                        className={`block text-xs mt-0.5 ${
                          active ? 'text-[#D1FAE5]' : 'text-[var(--kb-ink-muted)]'
                        }`}
                      >
                        {bn ? crop.season.bn : crop.season.en}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Drag & Drop Upload + Sample Leaf Presets */}
            <div className="space-y-4 pt-5 border-t border-[var(--kb-border-subtle)]">
              <h2 className="text-base sm:text-lg font-bold text-[var(--kb-ink)]">
                {bn
                  ? '২. আক্রান্ত পাতার ছবি আপলোড করুন'
                  : '2. Upload Leaf Photo or Choose Sample'}
              </h2>

              <label
                htmlFor="leaf-upload-input"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center gap-3 p-6 sm:p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors ${
                  isDragging
                    ? 'border-[var(--kb-accent)] bg-[var(--kb-surface-sage)]'
                    : 'border-[var(--kb-border)] hover:border-[var(--kb-accent)] bg-[var(--kb-surface-muted)]'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[var(--kb-surface)] border border-[var(--kb-border)] flex items-center justify-center text-[var(--kb-brand-text)]">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-[var(--kb-ink)]">
                    {bn
                      ? 'ছবি এখানে টেনে আনুন অথবা ক্লিক করে ফাইল বেছে নিন'
                      : 'Drag and drop a leaf photo here, or click to browse'}
                  </p>
                  <p className="text-xs text-[var(--kb-ink-muted)]">
                    {bn
                      ? 'JPG, PNG বা WebP · ছবি শুধু আপনার ব্রাউজারেই প্রিভিউ হবে'
                      : 'JPG, PNG, WebP · Previewed locally in your browser only'}
                  </p>
                </div>
                <input
                  id="leaf-upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>

              {uploadError && (
                <p role="alert" className="text-sm font-medium text-[var(--kb-danger-text)]">
                  {uploadError}
                </p>
              )}

              {/* Camera Input UI + File Upload Quick Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <label
                  htmlFor="leaf-camera-input"
                  className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 text-xs sm:text-sm font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface-sage)] hover:bg-[var(--kb-surface-sage-strong)] border border-[var(--kb-border)] rounded-lg transition-colors cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>
                    {bn
                      ? 'ক্যামেরা দিয়ে ছবি তুলুন (ডেমো ইনপুট)'
                      : 'Use Camera Input (Demo)'}
                  </span>
                  <input
                    id="leaf-camera-input"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>

                <label
                  htmlFor="leaf-upload-input"
                  className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 text-xs sm:text-sm font-semibold text-[var(--kb-ink)] bg-[var(--kb-surface)] hover:bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg transition-colors cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>{bn ? 'গ্যালারি থেকে নির্বাচন' : 'Browse Device Files'}</span>
                </label>
              </div>

              {/* Built-in Sample Leaf Presets with Thumbnails */}
              <div className="pt-1 space-y-2.5">
                <p className="text-xs font-semibold text-[var(--kb-ink-muted)]">
                  {bn
                    ? 'অথবা দ্রুত ডেমো পরীক্ষার জন্য নমুনা পাতা নির্বাচন করুন:'
                    : 'Or test immediately with a built-in sample leaf photo:'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {samplePresets.map((preset) => {
                    const isSelected =
                      !isCustomUpload && selectedCrop === preset.crop;
                    return (
                      <button
                        key={preset.crop}
                        type="button"
                        onClick={() => handleUsePresetSample(preset.crop)}
                        className={`flex items-center gap-3 p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[var(--kb-surface-sage)] text-[var(--kb-brand-text)] border-[var(--kb-accent)]'
                            : 'bg-[var(--kb-surface)] text-[var(--kb-ink-muted)] border-[var(--kb-border)] hover:border-[var(--kb-accent)] hover:text-[var(--kb-ink)]'
                        }`}
                      >
                        <div className="w-12 h-10 rounded overflow-hidden shrink-0 border border-[var(--kb-border)]">
                          <ResilientImage
                            src={preset.img}
                            alt={bn ? preset.title.bn : preset.title.en}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-semibold leading-snug">
                          {bn ? preset.title.bn : preset.title.en}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Optional Field Observations */}
            <div className="space-y-3 pt-5 border-t border-[var(--kb-border-subtle)]">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-bold text-[var(--kb-ink)]">
                  {bn
                    ? '৩. মাঠের পর্যবেক্ষণ (ঐচ্ছিক)'
                    : '3. Field Observations (Optional)'}
                </h2>
                <span className="text-xs text-[var(--kb-ink-muted)]">
                  {bn ? 'রিপোর্টে যুক্ত হবে' : 'Included in report'}
                </span>
              </div>
              <div className="space-y-2">
                {OBSERVATION_OPTIONS.map((opt) => {
                  const checked = selectedObsIds.includes(opt.id);
                  return (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border text-sm cursor-pointer transition-colors ${
                        checked
                          ? 'bg-[var(--kb-surface-sage)] border-[var(--kb-accent)]/45 text-[var(--kb-ink)] font-medium'
                          : 'bg-[var(--kb-surface-muted)] border-[var(--kb-border)] text-[var(--kb-ink-muted)]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleObservation(opt.id)}
                        className="w-4 h-4 accent-[#059669] rounded cursor-pointer"
                      />
                      <span>{bn ? opt.text.bn : opt.text.en}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Analyze Action */}
            <div className="pt-5 border-t border-[var(--kb-border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-[var(--kb-ink-muted)]">
                {bn
                  ? 'নির্বাচিত ফসল ও ছবির জন্য নমুনা রোগের ফলাফল দেখানো হবে।'
                  : 'Displays predefined sample disease report for your selection.'}
              </p>
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 text-sm font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] disabled:opacity-70 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>
                      {bn
                        ? 'নমুনা ফলাফল প্রস্তুত হচ্ছে...'
                        : 'Preparing Sample Result...'}
                    </span>
                  </>
                ) : (
                  <>
                    <ScanSearch className="w-4 h-4" />
                    <span>
                      {bn
                        ? 'বিশ্লেষণ করুন (নমুনা ডেমো)'
                        : 'Analyze Sample (Demo)'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Live Image Preview */}
          <div className="lg:col-span-5 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4 lg:sticky lg:top-24">
            <div className="flex items-center justify-between border-b border-[var(--kb-border-subtle)] pb-3">
              <h2 className="text-base font-bold text-[var(--kb-ink)]">
                {bn ? 'ছবির প্রিভিউ' : 'Image Preview'}
              </h2>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--kb-accent)]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {isCustomUpload
                    ? bn
                      ? 'আপলোডকৃত ছবি'
                      : 'Custom Upload'
                    : bn
                    ? 'নমুনা ছবি প্রস্তুত'
                    : 'Sample Ready'}
                </span>
              </span>
            </div>

            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[var(--kb-border)] bg-[var(--kb-surface-muted)]">
              <ResilientImage
                src={previewUrl}
                alt={
                  bn
                    ? 'পরীক্ষার জন্য নির্বাচিত পাতার ছবি'
                    : 'Selected crop leaf preview'
                }
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 bg-[var(--kb-surface-muted)] rounded-lg border border-[var(--kb-border-subtle)] space-y-2 text-xs text-[var(--kb-ink-muted)]">
              <div className="flex items-center justify-between">
                <span>{bn ? 'নির্বাচিত ফসল:' : 'Selected Crop:'}</span>
                <span className="font-semibold text-[var(--kb-ink)]">
                  {bn
                    ? DISEASE_PROFILES[selectedCrop].cropLabel.bn
                    : DISEASE_PROFILES[selectedCrop].cropLabel.en}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span>{bn ? 'ছবির উৎস:' : 'Image Source:'}</span>
                <span className="font-medium text-[var(--kb-ink)] truncate max-w-[200px]">
                  {isCustomUpload
                    ? `${uploadedFileName || (bn ? 'ব্যবহারকারীর ফাইল' : 'User file')}${
                        uploadedFileSize ? ` (${uploadedFileSize})` : ''
                      }`
                    : bn
                    ? 'বিল্ট-ইন নমুনা ছবি'
                    : 'Built-in sample photo'}
                </span>
              </div>
            </div>

            {isCustomUpload && (
              <button
                type="button"
                onClick={handleClearUpload}
                className="w-full min-h-[40px] inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-[var(--kb-danger-text)] bg-[var(--kb-danger-bg)] hover:opacity-90 border border-[var(--kb-danger-border)] rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>
                  {bn
                    ? 'আপলোডকৃত ছবি সরিয়ে নমুনায় ফিরুন'
                    : 'Clear Upload & Revert to Sample'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
