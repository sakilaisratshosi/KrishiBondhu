import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  Bell,
  BookMarked,
  CalendarDays,
  CheckCircle2,
  CheckSquare,
  Edit3,
  Info,
  Plus,
  RotateCcw,
  Square,
  Trash2,
  X,
} from 'lucide-react';
import {
  CROP_CULTIVATION_GUIDES,
  CropCultivationGuide,
} from '../data/cropCultivationData';
import { CROP_CALENDAR_SCHEDULES, CROP_OPTIONS } from '../data/krishiData';
import { CropKey, Language, PageRoute } from '../types/krishi';
import { SourceQualityNotice } from './SourceQualityNotice';
import { WorkspaceHeader } from './WorkspaceHeader';

interface CropCalendarProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
  allCrops?: CropCultivationGuide[];
}

export type JournalEntryType =
  | 'planting'
  | 'observation'
  | 'irrigation_fertilizer'
  | 'pest_watch'
  | 'harvest';

export interface FarmingJournalEntry {
  id: string;
  cropId: string;
  cropNameBn: string;
  cropNameEn: string;
  date: string;
  entryType: JournalEntryType;
  note: string;
}

const JOURNAL_STORAGE_KEY = 'krishibondhu_farming_journal_v1';

const JOURNAL_TYPE_LABELS: Record<
  JournalEntryType,
  { bn: string; en: string }
> = {
  planting: { bn: 'রোপণ / বপন তারিখ', en: 'Planting / Sowing' },
  observation: { bn: 'মাঠ পর্যবেক্ষণ', en: 'Field Observation' },
  irrigation_fertilizer: { bn: 'সেচ ও সার নোট', en: 'Irrigation & Fertilizer' },
  pest_watch: { bn: 'রোগ ও পোকা নজরদারি', en: 'Pest / Disease Watch' },
  harvest: { bn: 'ফসল সংগ্রহ', en: 'Harvest Record' },
};

const INITIAL_JOURNAL_ENTRIES: FarmingJournalEntry[] = [
  {
    id: 'jr-1',
    cropId: 'rice',
    cropNameBn: 'ধান',
    cropNameEn: 'Rice',
    date: '2026-11-15',
    entryType: 'planting',
    note: 'পূর্ব ব্লকের ২ বিঘা জমিতে ২০×২০ সেমি সারিতে ব্রি ধান-৮৯ রোপণ সম্পন্ন (নমুনা লগ)।',
  },
  {
    id: 'jr-2',
    cropId: 'potato',
    cropNameBn: 'আলু',
    cropNameEn: 'Potato',
    date: '2026-11-20',
    entryType: 'observation',
    note: 'ভোরের কুয়াশার পর নিচের পাতা পরীক্ষা করা হয়েছে; কোনো পানি-ভেজা কালচে দাগ দেখা যায়নি।',
  },
];

function loadFarmingJournal(): FarmingJournalEntry[] {
  try {
    const raw = window.localStorage.getItem(JOURNAL_STORAGE_KEY);
    if (!raw) return INITIAL_JOURNAL_ENTRIES;
    const parsed = JSON.parse(raw) as FarmingJournalEntry[] | null;
    return Array.isArray(parsed) ? parsed : INITIAL_JOURNAL_ENTRIES;
  } catch {
    return INITIAL_JOURNAL_ENTRIES;
  }
}

export function CropCalendar({
  language,
  onToggleLanguage,
  onNavigate,
  allCrops = CROP_CULTIVATION_GUIDES,
}: CropCalendarProps) {
  const bn = language === 'bn';
  const [selectedCrop, setSelectedCrop] = useState<CropKey>('rice');
  const [plantingDate, setPlantingDate] = useState<string>('2026-11-15');

  const formatStageDateWindow = (dayRangeText: string) => {
    const bnToEn = (s: string) =>
      s.replace(/[০-৯]/g, (d) => String('০১২৩৪৫৬৭৮৯'.indexOf(d)));
    const parsed = bnToEn(dayRangeText).match(/\d+/g);
    const startOffset = parsed?.[0] ? Math.max(0, Number(parsed[0]) - 1) : 0;
    const endOffset = parsed?.[1]
      ? Math.max(startOffset, Number(parsed[1]) - 1)
      : startOffset;
    const base = new Date(`${plantingDate || '2026-11-15'}T00:00:00`);
    if (Number.isNaN(base.getTime())) return dayRangeText;
    const start = new Date(base);
    start.setDate(base.getDate() + startOffset);
    const end = new Date(base);
    end.setDate(base.getDate() + endOffset);
    const fmt = (d: Date) =>
      d.toLocaleDateString(bn ? 'bn-BD' : 'en-GB', {
        day: '2-digit',
        month: 'short',
      });
    return `${fmt(start)} – ${fmt(end)}`;
  };

  const initialCheckedState = (): Record<string, boolean> => {
    const map: Record<string, boolean> = {};
    Object.values(CROP_CALENDAR_SCHEDULES).forEach((sched) => {
      sched.tasks.forEach((task) => {
        map[task.id] = !!task.defaultDone;
      });
    });
    return map;
  };

  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>(
    initialCheckedState
  );
  const [reminderTaskId, setReminderTaskId] = useState<string>('cal-rice-3');
  const [reminderTime, setReminderTime] = useState<string>('07:30');
  const [customNote, setCustomNote] = useState<string>('');
  const [activeNotification, setActiveNotification] = useState<{
    title: string;
    detail: string;
    time: string;
  } | null>(null);

  // Farming Journal State (localStorage persisted)
  const [journalEntries, setJournalEntries] = useState<FarmingJournalEntry[]>(() =>
    loadFarmingJournal()
  );
  const [journalFilterCrop, setJournalFilterCrop] = useState<string>('all');
  const [editingJournalId, setEditingJournalId] = useState<string | null>(null);
  const [journalCropId, setJournalCropId] = useState<string>('rice');
  const [journalDate, setJournalDate] = useState<string>('2026-11-23');
  const [journalType, setJournalType] = useState<JournalEntryType>('observation');
  const [journalNote, setJournalNote] = useState<string>('');
  const [journalError, setJournalError] = useState<string>('');

  useEffect(() => {
    try {
      window.localStorage.setItem(
        JOURNAL_STORAGE_KEY,
        JSON.stringify(journalEntries)
      );
    } catch {
      // Ignore storage errors in restricted frames
    }
  }, [journalEntries]);

  const sortedCrops = useMemo(
    () => [...allCrops].sort((a, b) => a.name.en.localeCompare(b.name.en)),
    [allCrops]
  );

  const visibleJournalEntries = useMemo(() => {
    if (journalFilterCrop === 'all') return journalEntries;
    return journalEntries.filter((e) => e.cropId === journalFilterCrop);
  }, [journalEntries, journalFilterCrop]);

  const schedule = CROP_CALENDAR_SCHEDULES[selectedCrop];
  const completedCount = schedule.tasks.filter(
    (t) => !!checkedTasks[t.id]
  ).length;
  const progressPercent = Math.round(
    (completedCount / schedule.tasks.length) * 100
  );

  const handleSelectCrop = (crop: CropKey) => {
    setSelectedCrop(crop);
    const firstPending =
      CROP_CALENDAR_SCHEDULES[crop].tasks.find((t) => !checkedTasks[t.id]) ||
      CROP_CALENDAR_SCHEDULES[crop].tasks[0];
    setReminderTaskId(firstPending.id);
  };

  const toggleTask = (taskId: string) => {
    setCheckedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const handleResetCropTasks = () => {
    setCheckedTasks((prev) => {
      const next = { ...prev };
      schedule.tasks.forEach((t) => {
        next[t.id] = !!t.defaultDone;
      });
      return next;
    });
  };

  const handleTriggerDemoReminder = () => {
    const task =
      schedule.tasks.find((t) => t.id === reminderTaskId) || schedule.tasks[0];
    setActiveNotification({
      title: bn ? task.title.bn : task.title.en,
      detail:
        customNote.trim() ||
        (bn ? task.reminderText.bn : task.reminderText.en),
      time: reminderTime,
    });
  };

  const resetJournalForm = () => {
    setEditingJournalId(null);
    setJournalCropId('rice');
    setJournalDate('2026-11-23');
    setJournalType('observation');
    setJournalNote('');
    setJournalError('');
  };

  const handleSaveJournal = (e: FormEvent) => {
    e.preventDefault();
    setJournalError('');
    if (!journalNote.trim()) {
      setJournalError(
        bn
          ? 'অনুগ্রহ করে আপনার পর্যবেক্ষণ বা নোট লিখুন।'
          : 'Please enter a crop observation or farming note.'
      );
      return;
    }

    const matchedCrop =
      allCrops.find((c) => c.id === journalCropId) || allCrops[0];
    const cropNameBn = matchedCrop?.name.bn || 'ফসল';
    const cropNameEn = matchedCrop?.name.en || 'Crop';

    if (editingJournalId) {
      setJournalEntries((prev) =>
        prev.map((item) =>
          item.id === editingJournalId
            ? {
                ...item,
                cropId: journalCropId,
                cropNameBn,
                cropNameEn,
                date: journalDate || item.date,
                entryType: journalType,
                note: journalNote.trim(),
              }
            : item
        )
      );
    } else {
      const created: FarmingJournalEntry = {
        id: `jr-${Date.now()}`,
        cropId: journalCropId,
        cropNameBn,
        cropNameEn,
        date: journalDate || '2026-11-23',
        entryType: journalType,
        note: journalNote.trim(),
      };
      setJournalEntries((prev) => [created, ...prev]);
    }
    resetJournalForm();
  };

  const handleEditJournal = (entry: FarmingJournalEntry) => {
    setEditingJournalId(entry.id);
    setJournalCropId(entry.cropId);
    setJournalDate(entry.date);
    setJournalType(entry.entryType);
    setJournalNote(entry.note);
    setJournalError('');
  };

  const handleDeleteJournal = (id: string) => {
    setJournalEntries((prev) => prev.filter((item) => item.id !== id));
    if (editingJournalId === id) {
      resetJournalForm();
    }
  };

  const handleResetJournal = () => {
    setJournalEntries(INITIAL_JOURNAL_ENTRIES);
    setJournalFilterCrop('all');
    resetJournalForm();
  };

  return (
    <div className="bg-[var(--kb-canvas)] min-h-screen">
      <WorkspaceHeader
        breadcrumbLabel={
          bn ? 'ফসল ক্যালেন্ডার ও কৃষি ডায়েরি' : 'Crop Calendar & Journal'
        }
        title={
          bn
            ? 'স্মার্ট ফসল ক্যালেন্ডার ও কৃষি ডায়েরি (নমুনা)'
            : 'Smart Crop Calendar & Farming Journal (Demo)'
        }
        subtitle={
          bn
            ? 'ফসলের মৌসুমি সময়সূচি, রিমাইন্ডার এবং প্রতিদিনের রোপণ ও মাঠ পর্যবেক্ষণ নোট সংরক্ষণ করুন।'
            : 'Track crop-specific stage schedules, preview demo reminders, and save daily planting & field notes locally.'
        }
        language={language}
        onToggleLanguage={onToggleLanguage}
        onNavigate={onNavigate}
        backRoute="dashboard"
        backLabel={bn ? 'ড্যাশবোর্ড' : 'Dashboard'}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Demo Disclaimer */}
        <div className="bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-[var(--kb-brand-text)] shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--kb-ink)]">
            <strong className="font-semibold">
              {bn ? 'নমুনা ফসল ক্যালেন্ডার: ' : 'Sample Schedule Notice: '}
            </strong>
            <span className="text-[var(--kb-ink-muted)]">
              {bn
                ? 'এখানে প্রদর্শিত দিন-ভিত্তিক সময়সূচি ও রিমাইন্ডার স্থানীয় ব্রাউজার ডেমো। জমির জাত ও অঞ্চলভেদে উপজেলা কৃষি অফিসের পরামর্শ অনুযায়ী দিন পরিবর্তন হতে পারে।'
                : 'These crop schedules and reminder alerts run locally in your browser using sample timelines. Confirm variety-specific dates with your Upazila Agriculture Office.'}
            </span>
          </p>
        </div>

        {/* Live Demo Notification Toast Banner */}
        {activeNotification && (
          <div
            role="status"
            className="bg-[#113520] dark:bg-[#0F2C1B] text-white border border-[#059669] rounded-xl p-4 sm:p-5 flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-[#6EE7B7] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-semibold text-[#6EE7B7]">
                  {bn
                    ? `ডেমো রিমাইন্ডার অ্যালার্ট · নির্ধারিত সময় ${activeNotification.time}`
                    : `Demo Reminder Triggered · Scheduled for ${activeNotification.time}`}
                </p>
                <p className="text-sm font-bold text-white">
                  {activeNotification.title}
                </p>
                <p className="text-xs sm:text-sm text-[#D1E2D7]">
                  {activeNotification.detail}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveNotification(null)}
              aria-label={bn ? 'বিজ্ঞপ্তি বন্ধ করুন' : 'Dismiss notification'}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Crop Selector, Planting Date & Progress Summary */}
        <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[var(--kb-ink-muted)]">
              {bn ? 'ফসল নির্বাচন করুন:' : 'Select Crop Schedule:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {CROP_OPTIONS.map((crop) => {
                const active = selectedCrop === crop.key;
                return (
                  <button
                    key={crop.key}
                    type="button"
                    onClick={() => handleSelectCrop(crop.key)}
                    className={`min-h-[40px] px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg border transition-colors cursor-pointer ${
                      active
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

          <div className="flex flex-wrap items-center gap-6">
            <div className="space-y-1">
              <label
                htmlFor="planting-date-input"
                className="block text-xs font-semibold text-[var(--kb-ink-muted)]"
              >
                {bn ? 'নমুনা রোপণের তারিখ' : 'Sample Planting Date'}
              </label>
              <input
                id="planting-date-input"
                type="date"
                value={plantingDate}
                onChange={(e) => setPlantingDate(e.target.value)}
                className="min-h-[40px] px-3 py-1.5 text-xs font-mono bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
              />
            </div>

            <div className="min-w-[200px] space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[var(--kb-ink-muted)]">
                  {bn ? 'কাজের অগ্রগতি' : 'Checklist Progress'}
                </span>
                <span className="font-mono text-[var(--kb-brand-text)] tabular-nums">
                  {completedCount}/{schedule.tasks.length} ({progressPercent}%)
                </span>
              </div>
              <div className="w-full h-2 bg-[var(--kb-surface-sage)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--kb-accent)] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Checklist Timeline */}
          <div className="lg:col-span-8 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--kb-border-subtle)]">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-[var(--kb-accent)]">
                  <CalendarDays className="w-4 h-4" />
                  <span>
                    {bn ? schedule.cropLabel.bn : schedule.cropLabel.en} ·{' '}
                    <span className="font-mono tabular-nums">
                      {schedule.durationDays} {bn ? 'দিন' : 'Days'}
                    </span>
                  </span>
                </div>
                <h2 className="text-lg font-bold text-[var(--kb-ink)] mt-1">
                  {bn ? schedule.seasonSummary.bn : schedule.seasonSummary.en}
                </h2>
              </div>

              <button
                type="button"
                onClick={handleResetCropTasks}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[var(--kb-ink-muted)] hover:text-[var(--kb-brand-text)] bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{bn ? 'রিসেট' : 'Reset'}</span>
              </button>
            </div>

            <div className="space-y-3">
              {schedule.tasks.map((task) => {
                const done = !!checkedTasks[task.id];
                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl border transition-colors ${
                      done
                        ? 'bg-[var(--kb-surface-sage)] border-[var(--kb-accent)]/40'
                        : 'bg-[var(--kb-surface-muted)] border-[var(--kb-border)]'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <button
                        type="button"
                        onClick={() => toggleTask(task.id)}
                        aria-pressed={done}
                        className="mt-0.5 text-[var(--kb-brand-text)] cursor-pointer shrink-0"
                      >
                        {done ? (
                          <CheckSquare className="w-5 h-5 text-[var(--kb-accent)]" />
                        ) : (
                          <Square className="w-5 h-5 text-[var(--kb-ink-muted)]" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                          <span className="font-semibold text-[var(--kb-accent)]">
                            {bn ? task.stage.bn : task.stage.en}
                          </span>
                          <span className="font-mono text-[var(--kb-ink-muted)] tabular-nums">
                            {formatStageDateWindow(task.dayRange.en)} ·{' '}
                            {bn ? task.dayRange.bn : task.dayRange.en}
                          </span>
                        </div>

                        <h3
                          className={`text-base font-bold ${
                            done
                              ? 'line-through text-[var(--kb-ink-muted)]'
                              : 'text-[var(--kb-ink)]'
                          }`}
                        >
                          {bn ? task.title.bn : task.title.en}
                        </h3>

                        <p className="text-sm text-[var(--kb-ink-muted)] leading-relaxed">
                          {bn ? task.detail.bn : task.detail.en}
                        </p>

                        <p className="text-xs text-[var(--kb-brand-text)] font-medium pt-1">
                          {bn ? 'পরামর্শ: ' : 'Tip: '}
                          {bn ? task.reminderText.bn : task.reminderText.en}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Demo Reminder Panel */}
          <aside className="lg:col-span-4 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-5 lg:sticky lg:top-24">
            <div className="flex items-center gap-2 pb-3 border-b border-[var(--kb-border-subtle)]">
              <Bell className="w-5 h-5 text-[var(--kb-brand-text)]" />
              <h2 className="text-base font-bold text-[var(--kb-ink)]">
                {bn ? 'রিমাইন্ডার সেট করুন (ডেমো)' : 'Demo Reminder Builder'}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="reminder-task"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn ? 'কাজের ধাপ নির্বাচন করুন' : 'Select Stage Task'}
                </label>
                <select
                  id="reminder-task"
                  value={reminderTaskId}
                  onChange={(e) => setReminderTaskId(e.target.value)}
                  className="w-full min-h-[42px] px-3 py-2 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                >
                  {schedule.tasks.map((t) => (
                    <option key={t.id} value={t.id}>
                      {bn ? t.title.bn : t.title.en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="reminder-time"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn ? 'সতর্কতার সময়' : 'Reminder Time'}
                </label>
                <input
                  id="reminder-time"
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-full min-h-[42px] px-3 py-2 text-sm font-mono bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="reminder-note"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn ? 'নিজস্ব নোট (ঐচ্ছিক)' : 'Custom Note (Optional)'}
                </label>
                <input
                  id="reminder-note"
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder={
                    bn
                      ? 'যেমন: সকাল ৭টায় পূর্ব প্লটে সেচ যাচাই'
                      : 'e.g., Check east plot irrigation at 7 AM'
                  }
                  className="w-full min-h-[42px] px-3 py-2 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                />
              </div>

              <button
                type="button"
                onClick={handleTriggerDemoReminder}
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span>
                  {bn
                    ? 'ডেমো রিমাইন্ডার দেখান'
                    : 'Trigger Demo Notification'}
                </span>
              </button>

              <p className="text-xs text-[var(--kb-ink-muted)] flex items-start gap-1.5 leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--kb-accent)] shrink-0 mt-0.5" />
                <span>
                  {bn
                    ? 'বাটনে ক্লিক করলে পেজের ওপরে একটি নমুনা রিমাইন্ডার বিজ্ঞপ্তি প্রদর্শিত হবে।'
                    : 'Clicking triggers an interactive sample notification banner at the top of this page.'}
                </span>
              </p>
            </div>
          </aside>
        </div>

        {/* FARMING JOURNAL SECTION */}
        <section
          id="farming-journal"
          aria-label={bn ? 'কৃষি ডায়েরি ও পর্যবেক্ষণ' : 'Farming Journal'}
          className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--kb-border-subtle)]">
            <div className="flex items-start gap-3">
              <BookMarked className="w-5 h-5 text-[var(--kb-brand-text)] shrink-0 mt-1" />
              <div>
                <p className="text-xs font-semibold text-[var(--kb-accent)]">
                  {bn
                    ? 'মাঠ পর্যবেক্ষণ, রোপণ তারিখ ও নোট (localStorage)'
                    : 'Crop Observations, Planting Dates & Field Notes'}
                </p>
                <h2 className="text-xl font-bold text-[var(--kb-ink)]">
                  {bn
                    ? 'আমার কৃষি ডায়েরি (Farming Journal)'
                    : 'My Farming Journal'}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetJournal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface-muted)] hover:bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-lg whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-center"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{bn ? 'নমুনা ডায়েরি রিসেট' : 'Reset Journal'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Add/Edit Journal Form */}
            <form
              onSubmit={handleSaveJournal}
              className="lg:col-span-5 bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-xl p-5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[var(--kb-ink)]">
                  {editingJournalId
                    ? bn
                      ? 'ডায়েরির নোট সম্পাদনা করুন'
                      : 'Edit Journal Entry'
                    : bn
                    ? 'নতুন পর্যবেক্ষণ বা রোপণ নোট লিখুন'
                    : 'Log New Planting Date or Note'}
                </h3>
                {editingJournalId && (
                  <button
                    type="button"
                    onClick={resetJournalForm}
                    className="text-xs font-semibold text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)] cursor-pointer"
                  >
                    {bn ? 'বাতিল' : 'Cancel'}
                  </button>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="journal-crop"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn ? 'ফসল নির্বাচন করুন' : 'Crop'}
                </label>
                <select
                  id="journal-crop"
                  value={journalCropId}
                  onChange={(e) => setJournalCropId(e.target.value)}
                  className="w-full min-h-[42px] px-3 py-2 text-sm bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                >
                  {sortedCrops.map((crop) => (
                    <option key={crop.id} value={crop.id}>
                      {bn
                        ? `${crop.name.bn} (${crop.name.en})`
                        : `${crop.name.en} (${crop.name.bn})`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label
                    htmlFor="journal-date"
                    className="block text-xs font-semibold text-[var(--kb-ink)]"
                  >
                    {bn ? 'তারিখ' : 'Date'}
                  </label>
                  <input
                    id="journal-date"
                    type="date"
                    value={journalDate}
                    onChange={(e) => setJournalDate(e.target.value)}
                    className="w-full min-h-[42px] px-3 py-2 text-xs font-mono bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="journal-type"
                    className="block text-xs font-semibold text-[var(--kb-ink)]"
                  >
                    {bn ? 'নোটের ধরন' : 'Entry Type'}
                  </label>
                  <select
                    id="journal-type"
                    value={journalType}
                    onChange={(e) =>
                      setJournalType(e.target.value as JournalEntryType)
                    }
                    className="w-full min-h-[42px] px-2.5 py-2 text-xs font-medium bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                  >
                    {(
                      Object.keys(JOURNAL_TYPE_LABELS) as JournalEntryType[]
                    ).map((k) => (
                      <option key={k} value={k}>
                        {bn ? JOURNAL_TYPE_LABELS[k].bn : JOURNAL_TYPE_LABELS[k].en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="journal-note"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn ? 'মাঠের পর্যবেক্ষণ ও নোট' : 'Observations & Notes'}
                </label>
                <textarea
                  id="journal-note"
                  rows={3}
                  value={journalNote}
                  onChange={(e) => setJournalNote(e.target.value)}
                  placeholder={
                    bn
                      ? 'যেমন: আজ সকালে ভুট্টা ক্ষেতে প্রথম সেচ দেওয়া হয়েছে এবং পাতা পরিষ্কার দেখা গেছে...'
                      : 'e.g., Completed first morning irrigation on maize plot; foliage clean...'
                  }
                  className="w-full p-3 text-sm bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                />
              </div>

              {journalError && (
                <p role="alert" className="text-xs font-semibold text-[var(--kb-danger-text)]">
                  {journalError}
                </p>
              )}

              <button
                type="submit"
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>
                  {editingJournalId
                    ? bn
                      ? 'ডায়েরি আপডেট করুন'
                      : 'Save Entry Changes'
                    : bn
                    ? 'ডায়েরিতে সংরক্ষণ করুন'
                    : 'Save to Journal'}
                </span>
              </button>
            </form>

            {/* Saved Journal Entries List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-semibold text-[var(--kb-ink-muted)] tabular-nums">
                  {visibleJournalEntries.length}{' '}
                  {bn ? 'টি সংরক্ষিত নোট' : 'saved entries'}
                </span>
                <div className="flex items-center gap-2">
                  <label htmlFor="journal-filter" className="sr-only">
                    {bn ? 'ফসল অনুযায়ী ফিল্টার' : 'Filter journal by crop'}
                  </label>
                  <select
                    id="journal-filter"
                    value={journalFilterCrop}
                    onChange={(e) => setJournalFilterCrop(e.target.value)}
                    className="min-h-[36px] px-3 py-1 text-xs font-medium bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                  >
                    <option value="all">
                      {bn ? 'সব ফসলের নোট' : 'All Crops'}
                    </option>
                    {sortedCrops.map((c) => (
                      <option key={c.id} value={c.id}>
                        {bn ? c.name.bn : c.name.en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {visibleJournalEntries.length === 0 ? (
                <div className="p-8 text-center rounded-xl bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] space-y-2">
                  <p className="text-sm font-bold text-[var(--kb-ink)]">
                    {bn
                      ? 'এই ফসলের জন্য এখনো কোনো ডায়েরি নোট নেই'
                      : 'No journal notes for this crop filter yet'}
                  </p>
                  <p className="text-xs text-[var(--kb-ink-muted)]">
                    {bn
                      ? 'বাম পাশের ফর্ম ব্যবহার করে আপনার চাষাবাদের তারিখ ও পর্যবেক্ষণ লিখে রাখুন।'
                      : 'Use the form to record planting dates, observations, and field notes.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {visibleJournalEntries.map((entry) => {
                    const typeLabel = JOURNAL_TYPE_LABELS[entry.entryType];
                    return (
                      <div
                        key={entry.id}
                        className="p-4 rounded-xl bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                      >
                        <div className="space-y-1.5 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--kb-ink-muted)]">
                            <span className="font-mono font-semibold text-[var(--kb-brand-text)] tabular-nums">
                              {entry.date}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-bold text-[var(--kb-ink)]">
                              {bn ? entry.cropNameBn : entry.cropNameEn}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-semibold text-[var(--kb-accent)]">
                              {bn ? typeLabel.bn : typeLabel.en}
                            </span>
                          </div>
                          <p className="text-sm text-[var(--kb-ink)] leading-relaxed">
                            {entry.note}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleEditJournal(entry)}
                            aria-label={bn ? 'নোট সম্পাদনা' : 'Edit note'}
                            className="p-2 rounded-lg border border-[var(--kb-border)] bg-[var(--kb-surface)] hover:bg-[var(--kb-surface-sage)] text-[var(--kb-brand-text)] cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteJournal(entry.id)}
                            aria-label={bn ? 'নোট মুছুন' : 'Delete note'}
                            className="p-2 rounded-lg border border-[var(--kb-danger-border)] bg-[var(--kb-surface)] hover:bg-[var(--kb-danger-bg)] text-[var(--kb-danger-text)] cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        <SourceQualityNotice
          language={language}
          verifiedSource={{
            bn: 'বাংলাদেশ কৃষি গবেষণা ও সম্প্রসারণ নির্দেশিকা অনুযায়ী সাধারণ ফসল-পর্যায় কাঠামো।',
            en: 'Seasonal stage milestones modeled after Bangladesh public crop calendar practices.',
          }}
          demoScope={{
            bn: 'চেকলিস্ট, রিমাইন্ডার বিজ্ঞপ্তি ও কৃষি ডায়েরি এন্ট্রিগুলো সম্পূর্ণ ব্রাউজারে (localStorage) কাজ করে।',
            en: 'Checklists, simulated notifications, and Farming Journal notes run locally in browser storage.',
          }}
        />
      </div>
    </div>
  );
}
