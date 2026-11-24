import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  Calculator,
  Calendar,
  Edit3,
  Info,
  Plus,
  RotateCcw,
  Trash2,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import {
  CROP_OPTIONS,
  EXPENSE_CATEGORY_LABELS,
  INITIAL_ESTIMATED_REVENUE_BDT,
  INITIAL_EXPENSES,
} from '../data/krishiData';
import {
  CropKey,
  ExpenseCategory,
  ExpenseEntry,
  Language,
  PageRoute,
} from '../types/krishi';
import { SourceQualityNotice } from './SourceQualityNotice';
import { WorkspaceHeader } from './WorkspaceHeader';

interface ExpenseTrackerProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
}

const EXPENSE_STORAGE_KEY = 'krishibondhu_expenses_v1';

interface StoredFinanceState {
  expenses: ExpenseEntry[];
  estimatedIncome: number;
}

function loadStoredFinance(): StoredFinanceState {
  try {
    const raw = window.localStorage.getItem(EXPENSE_STORAGE_KEY);
    if (!raw) {
      return {
        expenses: INITIAL_EXPENSES,
        estimatedIncome: INITIAL_ESTIMATED_REVENUE_BDT,
      };
    }
    const parsed = JSON.parse(raw) as Partial<StoredFinanceState> | null;
    if (!parsed || !Array.isArray(parsed.expenses)) {
      return {
        expenses: INITIAL_EXPENSES,
        estimatedIncome: INITIAL_ESTIMATED_REVENUE_BDT,
      };
    }
    return {
      expenses: parsed.expenses,
      estimatedIncome:
        typeof parsed.estimatedIncome === 'number' && parsed.estimatedIncome >= 0
          ? parsed.estimatedIncome
          : INITIAL_ESTIMATED_REVENUE_BDT,
    };
  } catch {
    return {
      expenses: INITIAL_EXPENSES,
      estimatedIncome: INITIAL_ESTIMATED_REVENUE_BDT,
    };
  }
}

export function ExpenseTracker({
  language,
  onToggleLanguage,
  onNavigate,
}: ExpenseTrackerProps) {
  const bn = language === 'bn';
  const initialFinance = useMemo(() => loadStoredFinance(), []);
  const [expenses, setExpenses] = useState<ExpenseEntry[]>(initialFinance.expenses);
  const [estimatedIncome, setEstimatedIncome] = useState<number>(
    initialFinance.estimatedIncome
  );
  const [incomeInput, setIncomeInput] = useState<string>(() =>
    String(initialFinance.estimatedIncome)
  );
  const [filterCategory, setFilterCategory] = useState<'all' | ExpenseCategory>('all');
  const [filterMonth, setFilterMonth] = useState<'all' | string>('all');

  // Form states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('fertilizer');
  const [crop, setCrop] = useState<CropKey>('rice');
  const [amountInput, setAmountInput] = useState('');
  const [dateInput, setDateInput] = useState('2026-11-23');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    try {
      window.localStorage.setItem(
        EXPENSE_STORAGE_KEY,
        JSON.stringify({ expenses, estimatedIncome })
      );
    } catch {
      // Ignore storage quota errors in restricted preview frames
    }
  }, [expenses, estimatedIncome]);

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, item) => sum + item.amountBdt, 0),
    [expenses]
  );

  const netProfit = estimatedIncome - totalExpenses;
  const isProfit = netProfit >= 0;

  const categoryTotals = useMemo(() => {
    const keys = Object.keys(EXPENSE_CATEGORY_LABELS) as ExpenseCategory[];
    return keys.map((cat) => {
      const sum = expenses
        .filter((e) => e.category === cat)
        .reduce((acc, cur) => acc + cur.amountBdt, 0);
      const percent = totalExpenses > 0 ? Math.round((sum / totalExpenses) * 100) : 0;
      return {
        category: cat,
        meta: EXPENSE_CATEGORY_LABELS[cat],
        sum,
        percent,
      };
    });
  }, [expenses, totalExpenses]);

  const formatMonthLabel = (ym: string) => {
    const [y, m] = ym.split('-').map(Number);
    if (!y || !m) return ym;
    const d = new Date(y, m - 1, 1);
    return d.toLocaleDateString(bn ? 'bn-BD' : 'en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const monthlySummaries = useMemo(() => {
    const grouped = new Map<string, { sum: number; count: number }>();
    for (const item of expenses) {
      const ym = /^\d{4}-\d{2}/.test(item.date) ? item.date.slice(0, 7) : 'unknown';
      const cur = grouped.get(ym) || { sum: 0, count: 0 };
      grouped.set(ym, { sum: cur.sum + item.amountBdt, count: cur.count + 1 });
    }
    return Array.from(grouped.entries())
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([monthKey, stats]) => ({
        monthKey,
        label:
          monthKey === 'unknown'
            ? bn
              ? 'তারিখহীন'
              : 'Undated'
            : formatMonthLabel(monthKey),
        sum: stats.sum,
        count: stats.count,
        percent:
          totalExpenses > 0 ? Math.round((stats.sum / totalExpenses) * 100) : 0,
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses, totalExpenses, bn]);

  const filteredExpenses = useMemo(
    () =>
      expenses.filter((item) => {
        const matchCat =
          filterCategory === 'all' || item.category === filterCategory;
        const itemMonth = /^\d{4}-\d{2}/.test(item.date)
          ? item.date.slice(0, 7)
          : 'unknown';
        const matchMonth = filterMonth === 'all' || itemMonth === filterMonth;
        return matchCat && matchMonth;
      }),
    [expenses, filterCategory, filterMonth]
  );

  const formatBdt = (value: number) => `৳ ${value.toLocaleString('en-US')}`;

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCategory('fertilizer');
    setCrop('rice');
    setAmountInput('');
    setDateInput('2026-11-23');
    setFormError('');
  };

  const handleSubmitExpense = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    const parsedAmount = Number(amountInput);
    if (!title.trim()) {
      setFormError(
        bn
          ? 'অনুগ্রহ করে খরচের বিবরণ লিখুন।'
          : 'Please enter an expense description.'
      );
      return;
    }
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setFormError(
        bn
          ? 'সঠিক টাকার পরিমাণ (০-এর বেশি) লিখুন।'
          : 'Please enter a valid positive amount in BDT.'
      );
      return;
    }

    if (editingId) {
      setExpenses((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                title: title.trim(),
                category,
                crop,
                amountBdt: Math.round(parsedAmount),
                date: dateInput || item.date,
              }
            : item
        )
      );
    } else {
      const newEntry: ExpenseEntry = {
        id: `exp-${Date.now()}`,
        title: title.trim(),
        category,
        crop,
        amountBdt: Math.round(parsedAmount),
        date: dateInput || '2026-11-23',
      };
      setExpenses((prev) => [newEntry, ...prev]);
    }
    resetForm();
  };

  const handleStartEdit = (entry: ExpenseEntry) => {
    setEditingId(entry.id);
    setTitle(entry.title);
    setCategory(entry.category);
    setCrop(entry.crop);
    setAmountInput(String(entry.amountBdt));
    setDateInput(entry.date);
    setFormError('');
  };

  const handleDelete = (id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  const handleRestoreSample = () => {
    setExpenses(INITIAL_EXPENSES);
    setEstimatedIncome(INITIAL_ESTIMATED_REVENUE_BDT);
    setIncomeInput(String(INITIAL_ESTIMATED_REVENUE_BDT));
    setFilterCategory('all');
    setFilterMonth('all');
    resetForm();
  };

  const maxBarValue = Math.max(estimatedIncome, totalExpenses, 1);
  const incomeHeightPercent = Math.round((estimatedIncome / maxBarValue) * 100);
  const expenseHeightPercent = Math.round((totalExpenses / maxBarValue) * 100);

  return (
    <div className="bg-[var(--kb-canvas)] min-h-screen">
      <WorkspaceHeader
        breadcrumbLabel={bn ? 'খরচ ও লাভ হিসাব' : 'Expense & Profit Tracker'}
        title={
          bn
            ? 'খামার খরচ ও লাভ-ক্ষতি হিসাব (নমুনা ডেমো)'
            : 'Farm Expense & Profit Tracker (Demo)'
        }
        subtitle={
          bn
            ? 'বীজ, সার, সেচ ও শ্রমিক খরচ যোগ/সম্পাদনা করুন এবং মাসভিত্তিক সারসংক্ষেপ, আনুমানিক আয় ও লাভ-ক্ষতির চার্ট দেখুন।'
            : 'Add, edit, or remove farm expenses, inspect monthly summaries, adjust estimated revenue, and track live profit/loss charts.'
        }
        language={language}
        onToggleLanguage={onToggleLanguage}
        onNavigate={onNavigate}
        backRoute="dashboard"
        backLabel={bn ? 'ড্যাশবোর্ড' : 'Dashboard'}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Sample Data Notice */}
        <div className="bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[var(--kb-brand-text)] shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--kb-ink)]">
              <strong className="font-semibold">
                {bn ? 'নমুনা হিসাব প্রদর্শনী: ' : 'Sample Financial Demo: '}
              </strong>
              <span className="text-[var(--kb-ink-muted)]">
                {bn
                  ? 'প্রাথমিকভাবে বাংলাদেশের খামার খরচের নমুনা ডেটা দেওয়া আছে। আপনার সকল পরিবর্তন ব্রাউজারের localStorage-এ সংরক্ষিত থাকে।'
                  : 'Pre-populated with sample Bangladeshi farm expenses. All edits calculate and save locally in your browser.'}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={handleRestoreSample}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface)] hover:bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{bn ? 'নমুনা ডেটা রিসেট' : 'Reset Sample Data'}</span>
          </button>
        </div>

        {/* 3 KPI Summary Cards + Editable Revenue */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-2">
            <span className="text-xs font-semibold text-[var(--kb-ink-muted)]">
              {bn ? 'মোট উৎপাদন খরচ' : 'Total Expenses'}
            </span>
            <p className="font-mono text-2xl sm:text-3xl font-bold text-[var(--kb-ink)] tabular-nums">
              {formatBdt(totalExpenses)}
            </p>
            <p className="text-xs text-[var(--kb-ink-muted)] tabular-nums">
              {bn
                ? `মোট ${expenses.length}টি খরচের খাত`
                : `Across ${expenses.length} entries`}
            </p>
          </div>

          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="estimated-income-input"
                className="text-xs font-semibold text-[var(--kb-ink-muted)]"
              >
                {bn ? 'আনুমানিক ফসল বিক্রি আয় (৳)' : 'Estimated Revenue (BDT)'}
              </label>
            </div>
            <input
              id="estimated-income-input"
              type="number"
              min={0}
              step={500}
              value={incomeInput}
              onChange={(e) => {
                const raw = e.target.value;
                setIncomeInput(raw);
                if (raw.trim() === '') {
                  setEstimatedIncome(0);
                  return;
                }
                const parsed = Number(raw);
                if (Number.isFinite(parsed) && parsed >= 0) {
                  setEstimatedIncome(Math.round(parsed));
                }
              }}
              onBlur={() => setIncomeInput(String(estimatedIncome))}
              className="w-full font-mono text-2xl font-bold text-[var(--kb-brand-text)] bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg px-3 py-1.5 tabular-nums"
            />
            <p className="text-xs text-[var(--kb-ink-muted)]">
              {bn ? 'আয় পরিবর্তন করে লাভ-ক্ষতি দেখুন' : 'Edit value to recalculate margin'}
            </p>
          </div>

          <div
            className={`border rounded-xl p-6 space-y-2 ${
              isProfit
                ? 'bg-[var(--kb-surface-sage)] border-[var(--kb-accent)]/40 text-[var(--kb-brand-text)]'
                : 'bg-[var(--kb-danger-bg)] border-[var(--kb-danger-border)] text-[var(--kb-danger-strong)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">
                {isProfit
                  ? bn
                    ? 'আনুমানিক নিট লাভ'
                    : 'Estimated Net Profit'
                  : bn
                  ? 'আনুমানিক ঘাটতি / ক্ষতি'
                  : 'Estimated Net Loss'}
              </span>
              {isProfit ? (
                <TrendingUp className="w-5 h-5 text-[var(--kb-accent)]" />
              ) : (
                <TrendingDown className="w-5 h-5 text-[var(--kb-danger-text)]" />
              )}
            </div>
            <p className="font-mono text-2xl sm:text-3xl font-bold tabular-nums">
              {isProfit ? '+' : '-'} {formatBdt(Math.abs(netProfit))}
            </p>
            <p className="text-xs opacity-90">
              {isProfit
                ? bn
                  ? 'আয় খরচের চেয়ে বেশি (নমুনা হিসাব)'
                  : 'Revenue exceeds expenses (Sample)'
                : bn
                ? 'খরচ আয়ের চেয়ে বেশি (নমুনা হিসাব)'
                : 'Expenses exceed estimated revenue (Sample)'}
            </p>
          </div>
        </div>

        {/* Interactive Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Category Breakdown Chart */}
          <div className="lg:col-span-7 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--kb-border-subtle)]">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[var(--kb-ink)]">
                  {bn ? 'খাতভিত্তিক খরচের চার্ট' : 'Expense Breakdown by Category'}
                </h2>
                <p className="text-xs text-[var(--kb-ink-muted)]">
                  {bn
                    ? 'যেকোনো খাতে ক্লিক করে নিচের তালিকা ফিল্টার করুন'
                    : 'Click any category bar to filter entries below'}
                </p>
              </div>
              <span className="font-mono text-xs text-[var(--kb-ink-muted)] tabular-nums">
                {formatBdt(totalExpenses)}
              </span>
            </div>

            <div className="space-y-2.5">
              {categoryTotals.map((row) => {
                const isSelected = filterCategory === row.category;
                return (
                  <button
                    key={row.category}
                    type="button"
                    onClick={() =>
                      setFilterCategory((prev) =>
                        prev === row.category ? 'all' : row.category
                      )
                    }
                    className={`w-full text-left p-2.5 rounded-lg border transition-colors cursor-pointer space-y-1.5 ${
                      isSelected
                        ? 'bg-[var(--kb-surface-sage)] border-[var(--kb-accent)]'
                        : 'bg-transparent border-transparent hover:bg-[var(--kb-surface-muted)]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-medium text-[var(--kb-ink)]">
                        {bn ? row.meta.bn : row.meta.en}
                      </span>
                      <span className="font-mono text-[var(--kb-ink-muted)] tabular-nums">
                        {formatBdt(row.sum)} ({row.percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-[var(--kb-surface-sage)] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${row.percent}%`,
                          backgroundColor: row.meta.color,
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Income vs Expense Visual Bar Chart */}
          <div className="lg:col-span-5 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 flex flex-col justify-between gap-4">
            <div className="pb-3 border-b border-[var(--kb-border-subtle)]">
              <h2 className="text-base sm:text-lg font-bold text-[var(--kb-ink)]">
                {bn ? 'আয় বনাম খরচ তুলনা' : 'Revenue vs. Expenses'}
              </h2>
              <p className="text-xs text-[var(--kb-ink-muted)]">
                {bn
                  ? 'আনুমানিক বিক্রয় আয় ও মোট খরচের আনুপাতিক চিত্র'
                  : 'Proportional comparison in BDT'}
              </p>
            </div>

            <div className="flex items-end justify-around gap-6 h-44 pt-4 px-4 border-b border-[var(--kb-border)]">
              <div className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
                <span className="font-mono text-xs font-bold text-[var(--kb-brand-text)] tabular-nums">
                  {formatBdt(estimatedIncome)}
                </span>
                <div
                  className="w-full max-w-[72px] bg-[#059669] rounded-t-lg transition-all duration-300"
                  style={{ height: `${Math.max(8, incomeHeightPercent)}%` }}
                />
              </div>

              <div className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
                <span className="font-mono text-xs font-bold text-[var(--kb-amber)] tabular-nums">
                  {formatBdt(totalExpenses)}
                </span>
                <div
                  className="w-full max-w-[72px] bg-[#D97706] rounded-t-lg transition-all duration-300"
                  style={{ height: `${Math.max(8, expenseHeightPercent)}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-around text-xs font-semibold text-[var(--kb-ink)]">
              <span>{bn ? 'আনুমানিক আয়' : 'Est. Revenue'}</span>
              <span>{bn ? 'মোট খরচ' : 'Total Expenses'}</span>
            </div>
          </div>
        </div>

        {/* Monthly Summary Card */}
        <section className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--kb-border-subtle)]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--kb-brand-text)]" />
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[var(--kb-ink)]">
                  {bn ? 'মাসভিত্তিক খরচের সারসংক্ষেপ' : 'Monthly Expense Summary'}
                </h2>
                <p className="text-xs text-[var(--kb-ink-muted)]">
                  {bn
                    ? 'কোন মাসে কত খরচ হয়েছে দেখুন; ক্লিক করে সেই মাসের তালিকা ফিল্টার করুন'
                    : 'Compare spending across months; click any month to filter entries below'}
                </p>
              </div>
            </div>
            {filterMonth !== 'all' && (
              <button
                type="button"
                onClick={() => setFilterMonth('all')}
                className="text-xs font-semibold text-[var(--kb-accent)] hover:text-[var(--kb-brand-text)] cursor-pointer"
              >
                {bn ? 'সব মাস দেখান' : 'Show All Months'}
              </button>
            )}
          </div>

          {monthlySummaries.length === 0 ? (
            <p className="text-sm text-[var(--kb-ink-muted)]">
              {bn
                ? 'মাসভিত্তিক হিসাব দেখার জন্য অন্তত একটি খরচ যোগ করুন।'
                : 'Add at least one expense entry to inspect monthly totals.'}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {monthlySummaries.map((m) => {
                const selected = filterMonth === m.monthKey;
                return (
                  <button
                    key={m.monthKey}
                    type="button"
                    onClick={() =>
                      setFilterMonth((prev) =>
                        prev === m.monthKey ? 'all' : m.monthKey
                      )
                    }
                    className={`p-4 rounded-xl border text-left transition-colors cursor-pointer space-y-2 ${
                      selected
                        ? 'bg-[var(--kb-surface-sage)] border-[var(--kb-accent)]'
                        : 'bg-[var(--kb-surface-muted)] border-[var(--kb-border)] hover:border-[var(--kb-accent)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-[var(--kb-ink)]">{m.label}</span>
                      <span className="font-mono text-[var(--kb-ink-muted)] tabular-nums">
                        {m.count} {bn ? 'টি খাত' : m.count === 1 ? 'entry' : 'entries'}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-mono text-lg font-bold text-[var(--kb-brand-text)] tabular-nums">
                        {formatBdt(m.sum)}
                      </span>
                      <span className="font-mono text-xs text-[var(--kb-accent)] tabular-nums">
                        {m.percent}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--kb-surface)] rounded-full overflow-hidden border border-[var(--kb-border)]">
                      <div
                        className="h-full bg-[var(--kb-accent)] rounded-full transition-all duration-300"
                        style={{ width: `${m.percent}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* Add/Edit Form + Expense Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <form
            onSubmit={handleSubmitExpense}
            className="lg:col-span-4 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--kb-border-subtle)]">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[var(--kb-brand-text)]" />
                <h2 className="text-base font-bold text-[var(--kb-ink)]">
                  {editingId
                    ? bn
                      ? 'খরচ সম্পাদনা করুন'
                      : 'Edit Expense Entry'
                    : bn
                    ? 'নতুন খরচ যোগ করুন'
                    : 'Add New Expense'}
                </h2>
              </div>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs font-semibold text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)] cursor-pointer"
                >
                  {bn ? 'বাতিল' : 'Cancel'}
                </button>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="exp-title"
                className="block text-xs font-semibold text-[var(--kb-ink)]"
              >
                {bn ? 'খরচের বিবরণ' : 'Description'}
              </label>
              <input
                id="exp-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  bn ? 'যেমন: পটাশ সার ২ বস্তা' : 'e.g., 2 bags Potash fertilizer'
                }
                className="w-full min-h-[42px] px-3 py-2 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label
                  htmlFor="exp-category"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn ? 'খাত' : 'Category'}
                </label>
                <select
                  id="exp-category"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as ExpenseCategory)
                  }
                  className="w-full min-h-[42px] px-2.5 py-2 text-xs font-medium bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                >
                  {(
                    Object.keys(EXPENSE_CATEGORY_LABELS) as ExpenseCategory[]
                  ).map((cat) => (
                    <option key={cat} value={cat}>
                      {bn
                        ? EXPENSE_CATEGORY_LABELS[cat].bn
                        : EXPENSE_CATEGORY_LABELS[cat].en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="exp-crop"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn ? 'ফসল' : 'Crop'}
                </label>
                <select
                  id="exp-crop"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value as CropKey)}
                  className="w-full min-h-[42px] px-2.5 py-2 text-xs font-medium bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                >
                  {CROP_OPTIONS.map((c) => (
                    <option key={c.key} value={c.key}>
                      {bn ? c.label.bn : c.label.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label
                  htmlFor="exp-amount"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn ? 'টাকা (৳)' : 'Amount (BDT)'}
                </label>
                <input
                  id="exp-amount"
                  type="number"
                  min={1}
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  placeholder="1500"
                  className="w-full min-h-[42px] px-3 py-2 text-sm font-mono bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="exp-date"
                  className="block text-xs font-semibold text-[var(--kb-ink)]"
                >
                  {bn ? 'তারিখ' : 'Date'}
                </label>
                <input
                  id="exp-date"
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="w-full min-h-[42px] px-2.5 py-2 text-xs font-mono bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
                />
              </div>
            </div>

            {formError && (
              <p role="alert" className="text-xs font-medium text-[var(--kb-danger-text)]">
                {formError}
              </p>
            )}

            <button
              type="submit"
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>
                {editingId
                  ? bn
                    ? 'আপডেট সংরক্ষণ করুন'
                    : 'Save Changes'
                  : bn
                  ? 'খরচ যুক্ত করুন'
                  : 'Add Expense'}
              </span>
            </button>
          </form>

          {/* Expense Ledger Table / List */}
          <div className="lg:col-span-8 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--kb-border-subtle)] flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-base sm:text-lg font-bold text-[var(--kb-ink)]">
                  {bn ? 'খরচের তালিকা' : 'Recorded Expenses'}
                </h2>
                {(filterCategory !== 'all' || filterMonth !== 'all') && (
                  <button
                    type="button"
                    onClick={() => {
                      setFilterCategory('all');
                      setFilterMonth('all');
                    }}
                    className="text-xs font-semibold text-[var(--kb-accent)] hover:text-[var(--kb-brand-text)] cursor-pointer"
                  >
                    {bn ? 'সব ফিল্টার মুছুন' : 'Clear Filters'}
                  </button>
                )}
              </div>
              <span className="font-mono text-xs text-[var(--kb-ink-muted)] tabular-nums">
                {filteredExpenses.length} {bn ? 'টি এন্ট্রি' : 'entries'}
              </span>
            </div>

            {expenses.length === 0 ? (
              <div className="p-10 text-center space-y-4">
                <h3 className="text-base font-bold text-[var(--kb-ink)]">
                  {bn ? 'কোনো খরচ যোগ করা হয়নি' : 'No expense entries yet'}
                </h3>
                <p className="text-sm text-[var(--kb-ink-muted)] max-w-md mx-auto">
                  {bn
                    ? 'বাম পাশের ফর্ম ব্যবহার করে নতুন খরচ যোগ করুন অথবা নমুনা ডেটা ফিরিয়ে আনুন।'
                    : 'Add a new expense using the form or restore sample farm data.'}
                </p>
                <button
                  type="button"
                  onClick={handleRestoreSample}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{bn ? 'নমুনা ডেটা ফিরিয়ে আনুন' : 'Restore Sample Data'}</span>
                </button>
              </div>
            ) : filteredExpenses.length === 0 ? (
              <div className="p-10 text-center space-y-3">
                <h3 className="text-base font-bold text-[var(--kb-ink)]">
                  {bn
                    ? 'নির্বাচিত ফিল্টারে কোনো খরচের এন্ট্রি নেই'
                    : 'No entries match the active filters'}
                </h3>
                <p className="text-sm text-[var(--kb-ink-muted)] max-w-md mx-auto">
                  {bn
                    ? 'ফিল্টার সরিয়ে সব খরচ দেখুন অথবা এই খাত/মাসে নতুন খরচ যোগ করুন।'
                    : 'Clear filters to view all entries or record a new expense.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFilterCategory('all');
                    setFilterMonth('all');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface-sage)] hover:bg-[var(--kb-surface-sage-strong)] rounded-lg cursor-pointer"
                >
                  {bn ? 'সব খরচ দেখান' : 'Show All Expenses'}
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[var(--kb-border-subtle)]">
                {filteredExpenses.map((item) => {
                  const catMeta = EXPENSE_CATEGORY_LABELS[item.category];
                  const cropMeta =
                    CROP_OPTIONS.find((c) => c.key === item.crop)?.label ||
                    CROP_OPTIONS[0].label;

                  return (
                    <div
                      key={item.id}
                      className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[var(--kb-surface-muted)] transition-colors"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--kb-ink-muted)]">
                          <span className="font-mono tabular-nums">
                            {item.date}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-medium text-[var(--kb-brand-text)]">
                            {bn ? catMeta.bn : catMeta.en}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{bn ? cropMeta.bn : cropMeta.en}</span>
                        </div>
                        <p className="text-sm sm:text-base font-semibold text-[var(--kb-ink)] truncate">
                          {item.title}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                        <span className="font-mono text-base font-bold text-[var(--kb-ink)] tabular-nums">
                          {formatBdt(item.amountBdt)}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(item)}
                            aria-label={bn ? 'সম্পাদনা করুন' : 'Edit entry'}
                            className="p-2 rounded-lg border border-[var(--kb-border)] bg-[var(--kb-surface)] hover:bg-[var(--kb-surface-sage)] text-[var(--kb-brand-text)] cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            aria-label={bn ? 'মুছে ফেলুন' : 'Delete entry'}
                            className="p-2 rounded-lg border border-[var(--kb-danger-border)] bg-[var(--kb-surface)] hover:bg-[var(--kb-danger-bg)] text-[var(--kb-danger-text)] cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <SourceQualityNotice
          language={language}
          verifiedSource={{
            bn: 'সাধারণ খামার হিসাব কাঠামো (বীজ, সার, সেচ, শ্রমিক ও আনুষঙ্গিক খাত) — প্রকৃত বাজারদরের জন্য স্থানীয় হাট/ডিলার দর যাচাই করুন।',
            en: 'Standard farm ledger categories (Seeds, Fertilizer, Irrigation, Labor, Other) — verify current input and crop prices at local markets.',
          }}
          demoScope={{
            bn: 'প্রদর্শিত প্রাথমিক খরচ, আয় (৳ ৪২,৫০০) ও লাভ-ক্ষতি স্থানীয় ডেমো ডেটা এবং আপনার ব্রাউজারের localStorage-এ সংরক্ষিত হয়।',
            en: 'Pre-loaded expenses, estimated revenue (৳ 42,500), and monthly summaries are browser-local demo calculations saved in localStorage.',
          }}
        />
      </div>
    </div>
  );
}
