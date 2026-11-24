import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Edit3,
  Info,
  Plus,
  RotateCcw,
  Scale,
  Sprout,
  Trash2,
  TrendingUp,
} from 'lucide-react';
import { CropCultivationGuide } from '../data/cropCultivationData';
import { BilingualText, Language, PageRoute } from '../types/krishi';
import { SourceQualityNotice } from './SourceQualityNotice';
import { WorkspaceHeader } from './WorkspaceHeader';

export type SaleWeightUnit = 'kg' | 'maund' | 'ton';

export type ReferenceSourceType =
  | 'farmer-entered'
  | 'local-market-verified';

export interface CropSaleRecord {
  id: string;
  cropId: string;
  cropName: BilingualText;
  harvestedQty: number;
  soldQty: number;
  unit: SaleWeightUnit;
  sellingPricePerUnit: number;
  buyerName: string;
  saleDate: string;
  transportCostBdt: number;
  laborCostBdt: number;
  marketFeeBdt: number;
  otherExpenseBdt: number;
  hasReferencePrice: boolean;
  referencePricePerUnit: number;
  referenceMarketName: string;
  referenceDate: string;
  referenceSourceType: ReferenceSourceType;
  referenceSourceNote: string;
  isDemoSample?: boolean;
}

interface FarmerIncomeFairPricePageProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
  allCrops: CropCultivationGuide[];
}

const STORAGE_KEY = 'krishibondhu_farmer_sales_v1';

const UNIT_TO_KG: Record<SaleWeightUnit, number> = {
  kg: 1,
  maund: 40,
  ton: 1000,
};

const UNIT_LABELS: Record<SaleWeightUnit, BilingualText> = {
  kg: { bn: 'কেজি', en: 'kg' },
  maund: { bn: 'মণ (৪০ কেজি)', en: 'maund (40 kg)' },
  ton: { bn: 'টন (১,০০০ কেজি)', en: 'ton (1,000 kg)' },
};

const UNIT_SHORT: Record<SaleWeightUnit, BilingualText> = {
  kg: { bn: 'কেজি', en: 'kg' },
  maund: { bn: 'মণ', en: 'maund' },
  ton: { bn: 'টন', en: 'ton' },
};

const INITIAL_DEMO_SALES: CropSaleRecord[] = [
  {
    id: 'sale-demo-1',
    cropId: 'rice',
    cropName: { bn: 'ধান (বোরো)', en: 'Rice (Boro)' },
    harvestedQty: 42,
    soldQty: 35,
    unit: 'maund',
    sellingPricePerUnit: 1280,
    buyerName: 'করিম গ্রেইন ট্রেডার্স',
    saleDate: '2026-11-12',
    transportCostBdt: 1400,
    laborCostBdt: 900,
    marketFeeBdt: 350,
    otherExpenseBdt: 200,
    hasReferencePrice: true,
    referencePricePerUnit: 1360,
    referenceMarketName: 'বগুড়া হাট (নমুনা স্থানীয় বাজার)',
    referenceDate: '2026-11-12',
    referenceSourceType: 'farmer-entered',
    referenceSourceNote: 'Farmer-entered reference price (Sample Demo)',
    isDemoSample: true,
  },
  {
    id: 'sale-demo-2',
    cropId: 'potato',
    cropName: { bn: 'আলু', en: 'Potato' },
    harvestedQty: 1800,
    soldQty: 1500,
    unit: 'kg',
    sellingPricePerUnit: 32,
    buyerName: 'স্থানীয় পাইকার',
    saleDate: '2026-11-05',
    transportCostBdt: 1800,
    laborCostBdt: 1100,
    marketFeeBdt: 400,
    otherExpenseBdt: 250,
    hasReferencePrice: true,
    referencePricePerUnit: 30,
    referenceMarketName: 'রংপুর কাঁচামাল হাট (নমুনা)',
    referenceDate: '2026-11-05',
    referenceSourceType: 'farmer-entered',
    referenceSourceNote: 'Farmer-entered reference price (Sample Demo)',
    isDemoSample: true,
  },
  {
    id: 'sale-demo-3',
    cropId: 'tomato',
    cropName: { bn: 'টমেটো', en: 'Tomato' },
    harvestedQty: 650,
    soldQty: 580,
    unit: 'kg',
    sellingPricePerUnit: 46,
    buyerName: '',
    saleDate: '2026-10-28',
    transportCostBdt: 950,
    laborCostBdt: 600,
    marketFeeBdt: 250,
    otherExpenseBdt: 150,
    hasReferencePrice: true,
    referencePricePerUnit: 52,
    referenceMarketName: 'কুমিল্লা চকবাজার (নমুনা)',
    referenceDate: '2026-10-28',
    referenceSourceType: 'farmer-entered',
    referenceSourceNote: 'Farmer-entered reference price (Sample Demo)',
    isDemoSample: true,
  },
];

function loadSavedSales(): CropSaleRecord[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_DEMO_SALES;
    const parsed = JSON.parse(raw) as CropSaleRecord[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [];
  } catch {
    return INITIAL_DEMO_SALES;
  }
}

function sanitizePositive(raw: string): number {
  const num = Number(raw);
  if (!Number.isFinite(num) || num < 0) return 0;
  return num;
}

function computeRecordMetrics(record: CropSaleRecord) {
  const totalRevenueBdt = Math.round(
    record.soldQty * record.sellingPricePerUnit
  );
  const totalExpensesBdt = Math.round(
    record.transportCostBdt +
      record.laborCostBdt +
      record.marketFeeBdt +
      record.otherExpenseBdt
  );
  const netIncomeBdt = totalRevenueBdt - totalExpensesBdt;
  const soldKg = record.soldQty * UNIT_TO_KG[record.unit];
  const harvestedKg = record.harvestedQty * UNIT_TO_KG[record.unit];

  const sellingPricePerKg = record.sellingPricePerUnit / UNIT_TO_KG[record.unit];
  const referencePricePerKg = record.hasReferencePrice
    ? record.referencePricePerUnit / UNIT_TO_KG[record.unit]
    : null;

  const priceDiffPerUnit = record.hasReferencePrice
    ? record.sellingPricePerUnit - record.referencePricePerUnit
    : null;
  const estimatedTotalDiffBdt =
    priceDiffPerUnit !== null
      ? Math.round(priceDiffPerUnit * record.soldQty)
      : null;

  return {
    totalRevenueBdt,
    totalExpensesBdt,
    netIncomeBdt,
    soldKg,
    harvestedKg,
    sellingPricePerKg,
    referencePricePerKg,
    priceDiffPerUnit,
    estimatedTotalDiffBdt,
  };
}

export function FarmerIncomeFairPricePage({
  language,
  onToggleLanguage,
  onNavigate,
  allCrops,
}: FarmerIncomeFairPricePageProps) {
  const bn = language === 'bn';

  const [records, setRecords] = useState<CropSaleRecord[]>(() =>
    loadSavedSales()
  );
  const [filterCropId, setFilterCropId] = useState<string>('all');
  const [chartMode, setChartMode] = useState<'per-kg' | 'per-unit'>('per-kg');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState<boolean>(true);
  const [formError, setFormError] = useState<string>('');
  const [saveToast, setSaveToast] = useState<string>('');

  // Form state
  const [cropId, setCropId] = useState<string>('rice');
  const [harvestedQty, setHarvestedQty] = useState<string>('25');
  const [soldQty, setSoldQty] = useState<string>('20');
  const [unit, setUnit] = useState<SaleWeightUnit>('maund');
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState<string>('1320');
  const [buyerName, setBuyerName] = useState<string>('');
  const [saleDate, setSaleDate] = useState<string>('2026-11-23');

  const [transportCostBdt, setTransportCostBdt] = useState<string>('800');
  const [laborCostBdt, setLaborCostBdt] = useState<string>('600');
  const [marketFeeBdt, setMarketFeeBdt] = useState<string>('250');
  const [otherExpenseBdt, setOtherExpenseBdt] = useState<string>('100');

  const [hasReferencePrice, setHasReferencePrice] = useState<boolean>(true);
  const [referencePricePerUnit, setReferencePricePerUnit] =
    useState<string>('1350');
  const [referenceMarketName, setReferenceMarketName] = useState<string>('');
  const [referenceDate, setReferenceDate] = useState<string>('2026-11-23');
  const [referenceSourceType, setReferenceSourceType] =
    useState<ReferenceSourceType>('farmer-entered');
  const [referenceSourceNote, setReferenceSourceNote] = useState<string>('');

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch {
      // Ignore storage quota errors
    }
  }, [records]);

  const cropOptions = useMemo(() => {
    const map = new Map<string, BilingualText>();
    for (const crop of allCrops) {
      map.set(crop.id, crop.name);
    }
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [allCrops]);

  const filteredRecords = useMemo(() => {
    if (filterCropId === 'all') return records;
    return records.filter((r) => r.cropId === filterCropId);
  }, [records, filterCropId]);

  const dashboardTotals = useMemo(() => {
    let totalSoldKg = 0;
    let totalRevenueBdt = 0;
    let totalExpensesBdt = 0;
    let netIncomeBdt = 0;
    let totalFairPriceGapBdt = 0;
    let comparedCount = 0;

    for (const r of filteredRecords) {
      const m = computeRecordMetrics(r);
      totalSoldKg += m.soldKg;
      totalRevenueBdt += m.totalRevenueBdt;
      totalExpensesBdt += m.totalExpensesBdt;
      netIncomeBdt += m.netIncomeBdt;
      if (m.estimatedTotalDiffBdt !== null) {
        totalFairPriceGapBdt += m.estimatedTotalDiffBdt;
        comparedCount += 1;
      }
    }

    return {
      totalSoldKg,
      totalSoldMaunds: totalSoldKg / 40,
      totalRevenueBdt,
      totalExpensesBdt,
      netIncomeBdt,
      totalFairPriceGapBdt,
      comparedCount,
    };
  }, [filteredRecords]);

  // Crop-wise breakdown
  const cropBreakdown = useMemo(() => {
    const map = new Map<
      string,
      {
        cropId: string;
        cropName: BilingualText;
        salesCount: number;
        totalSoldKg: number;
        totalRevenueBdt: number;
        totalExpensesBdt: number;
        netIncomeBdt: number;
      }
    >();

    for (const r of records) {
      const m = computeRecordMetrics(r);
      const existing = map.get(r.cropId);
      if (existing) {
        existing.salesCount += 1;
        existing.totalSoldKg += m.soldKg;
        existing.totalRevenueBdt += m.totalRevenueBdt;
        existing.totalExpensesBdt += m.totalExpensesBdt;
        existing.netIncomeBdt += m.netIncomeBdt;
      } else {
        map.set(r.cropId, {
          cropId: r.cropId,
          cropName: r.cropName,
          salesCount: 1,
          totalSoldKg: m.soldKg,
          totalRevenueBdt: m.totalRevenueBdt,
          totalExpensesBdt: m.totalExpensesBdt,
          netIncomeBdt: m.netIncomeBdt,
        });
      }
    }
    return Array.from(map.values());
  }, [records]);

  // Live form preview calculation
  const liveFormPreview = useMemo(() => {
    const sold = sanitizePositive(soldQty);
    const price = sanitizePositive(sellingPricePerUnit);
    const revenue = Math.round(sold * price);
    const expenses = Math.round(
      sanitizePositive(transportCostBdt) +
        sanitizePositive(laborCostBdt) +
        sanitizePositive(marketFeeBdt) +
        sanitizePositive(otherExpenseBdt)
    );
    const netIncome = revenue - expenses;
    const refPrice = sanitizePositive(referencePricePerUnit);
    const unitDiff =
      hasReferencePrice && refPrice > 0 ? price - refPrice : null;
    const totalDiff = unitDiff !== null ? Math.round(unitDiff * sold) : null;
    return { revenue, expenses, netIncome, unitDiff, totalDiff };
  }, [
    soldQty,
    sellingPricePerUnit,
    transportCostBdt,
    laborCostBdt,
    marketFeeBdt,
    otherExpenseBdt,
    hasReferencePrice,
    referencePricePerUnit,
  ]);

  const resetFormFields = () => {
    setEditingId(null);
    setCropId('rice');
    setHarvestedQty('25');
    setSoldQty('20');
    setUnit('maund');
    setSellingPricePerUnit('1320');
    setBuyerName('');
    setSaleDate('2026-11-23');
    setTransportCostBdt('800');
    setLaborCostBdt('600');
    setMarketFeeBdt('250');
    setOtherExpenseBdt('100');
    setHasReferencePrice(true);
    setReferencePricePerUnit('1350');
    setReferenceMarketName('');
    setReferenceDate('2026-11-23');
    setReferenceSourceType('farmer-entered');
    setReferenceSourceNote('');
    setFormError('');
  };

  const handleEditRecord = (rec: CropSaleRecord) => {
    setEditingId(rec.id);
    setCropId(rec.cropId);
    setHarvestedQty(String(rec.harvestedQty));
    setSoldQty(String(rec.soldQty));
    setUnit(rec.unit);
    setSellingPricePerUnit(String(rec.sellingPricePerUnit));
    setBuyerName(rec.buyerName);
    setSaleDate(rec.saleDate);
    setTransportCostBdt(String(rec.transportCostBdt));
    setLaborCostBdt(String(rec.laborCostBdt));
    setMarketFeeBdt(String(rec.marketFeeBdt));
    setOtherExpenseBdt(String(rec.otherExpenseBdt));
    setHasReferencePrice(rec.hasReferencePrice);
    setReferencePricePerUnit(String(rec.referencePricePerUnit || ''));
    setReferenceMarketName(rec.referenceMarketName);
    setReferenceDate(rec.referenceDate || rec.saleDate);
    setReferenceSourceType(rec.referenceSourceType);
    setReferenceSourceNote(rec.referenceSourceNote);
    setFormOpen(true);
    setFormError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      resetFormFields();
    }
  };

  const handleResetDemo = () => {
    setRecords(INITIAL_DEMO_SALES);
    setFilterCropId('all');
    resetFormFields();
    setSaveToast(
      bn
        ? 'নমুনা ডেমো বিক্রয় তথ্য পুনরায় লোড করা হয়েছে।'
        : 'Demo crop sales records restored.'
    );
    window.setTimeout(() => setSaveToast(''), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const harvested = sanitizePositive(harvestedQty);
    const sold = sanitizePositive(soldQty);
    const sellPrice = sanitizePositive(sellingPricePerUnit);

    if (sold <= 0 || sellPrice <= 0) {
      setFormError(
        bn
          ? 'অনুগ্রহ করে বিক্রয় পরিমাণ এবং প্রতি একক বিক্রয়মূল্য ০-এর বেশি দিন।'
          : 'Please enter sold quantity and selling price per unit greater than 0.'
      );
      return;
    }

    if (harvested > 0 && sold > harvested) {
      setFormError(
        bn
          ? 'বিক্রয় পরিমাণ কাটা ফসলের পরিমাণের চেয়ে বেশি হতে পারে না।'
          : 'Sold quantity cannot exceed harvested quantity.'
      );
      return;
    }

    const refPriceNum = sanitizePositive(referencePricePerUnit);
    const includeRef = hasReferencePrice && refPriceNum > 0;

    const matchedCrop = cropOptions.find((c) => c.id === cropId);
    const cropName: BilingualText = matchedCrop?.name || {
      bn: cropId,
      en: cropId,
    };

    const effectiveSourceType: ReferenceSourceType =
      referenceSourceType === 'local-market-verified' &&
      referenceSourceNote.trim().length > 0
        ? 'local-market-verified'
        : 'farmer-entered';

    const effectiveSourceNote =
      effectiveSourceType === 'local-market-verified'
        ? referenceSourceNote.trim()
        : bn
        ? 'কৃষকের প্রবেশকৃত রেফারেন্স দর (Farmer-entered reference price)'
        : 'Farmer-entered reference price';

    const nextRecord: CropSaleRecord = {
      id: editingId || `sale-${Date.now()}`,
      cropId,
      cropName,
      harvestedQty: harvested > 0 ? harvested : sold,
      soldQty: sold,
      unit,
      sellingPricePerUnit: sellPrice,
      buyerName: buyerName.trim(),
      saleDate: saleDate || '2026-11-23',
      transportCostBdt: Math.round(sanitizePositive(transportCostBdt)),
      laborCostBdt: Math.round(sanitizePositive(laborCostBdt)),
      marketFeeBdt: Math.round(sanitizePositive(marketFeeBdt)),
      otherExpenseBdt: Math.round(sanitizePositive(otherExpenseBdt)),
      hasReferencePrice: includeRef,
      referencePricePerUnit: includeRef ? refPriceNum : 0,
      referenceMarketName: includeRef
        ? referenceMarketName.trim() ||
          (bn ? 'স্থানীয় বাজার (কৃষকের তথ্য)' : 'Local Market (Farmer-entered)')
        : '',
      referenceDate: includeRef ? referenceDate || saleDate : '',
      referenceSourceType: effectiveSourceType,
      referenceSourceNote: includeRef ? effectiveSourceNote : '',
      isDemoSample: false,
    };

    if (editingId) {
      setRecords((prev) =>
        prev.map((item) => (item.id === editingId ? nextRecord : item))
      );
      setSaveToast(
        bn ? 'বিক্রয় তথ্য হালনাগাদ হয়েছে।' : 'Sale record updated.'
      );
    } else {
      setRecords((prev) => [nextRecord, ...prev]);
      setSaveToast(
        bn
          ? 'নতুন ফসল বিক্রয় ও ন্যায্যমূল্য হিসাব সংরক্ষিত হয়েছে।'
          : 'New crop sale and fair price record saved.'
      );
    }

    resetFormFields();
    window.setTimeout(() => setSaveToast(''), 3000);
  };

  const formatBdt = (amount: number) => {
    const abs = Math.abs(Math.round(amount)).toLocaleString('en-US');
    return amount < 0 ? `-৳ ${abs}` : `৳ ${abs}`;
  };

  // Chart calculations (records with reference price vs selling price)
  const chartRecords = filteredRecords.slice(0, 6);
  const maxChartPrice = useMemo(() => {
    let max = 1;
    for (const r of chartRecords) {
      const m = computeRecordMetrics(r);
      const sellVal =
        chartMode === 'per-kg' ? m.sellingPricePerKg : r.sellingPricePerUnit;
      const refVal =
        chartMode === 'per-kg'
          ? m.referencePricePerKg || 0
          : r.hasReferencePrice
          ? r.referencePricePerUnit
          : 0;
      max = Math.max(max, sellVal, refVal);
    }
    return max;
  }, [chartRecords, chartMode]);

  return (
    <div className="bg-[var(--kb-canvas-alt)] min-h-screen">
      <WorkspaceHeader
        breadcrumbLabel={
          bn ? 'আয় ও ন্যায্যমূল্য হিসাব' : 'Farmer Income & Fair Price'
        }
        title={
          bn
            ? 'কৃষকের আয় ও ন্যায্যমূল্য ট্র্যাকার'
            : 'Farmer Income & Fair Price Tracker'
        }
        subtitle={
          bn
            ? 'আপনার ফসল বিক্রয়ের পরিমাণ, পরিবহন-শ্রমিক-বাজার খরচ, নিট আয় এবং স্থানীয় বাজারের রেফারেন্স দরের সাথে তুলনা এক জায়গায় হিসাব করুন।'
            : 'Record individual crop harvests and sales, deduct transport, labor, and market fees to calculate net income, and compare selling prices against local reference prices.'
        }
        language={language}
        onToggleLanguage={onToggleLanguage}
        onNavigate={onNavigate}
        backRoute="dashboard"
        backLabel={bn ? 'ড্যাশবোর্ড' : 'Dashboard'}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Transparent Demo & Reference Price Policy Notice */}
        <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[var(--kb-brand-text)] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm text-[var(--kb-ink-muted)]">
              <p className="font-bold text-[var(--kb-ink)]">
                {bn
                  ? 'কৃষকের ব্যক্তিগত হিসাব · লাইভ বাজারদর API যুক্ত নয়'
                  : 'Personal Farm Sales Ledger · No Invented Live Market Prices'}
              </p>
              <p className="leading-relaxed">
                {bn
                  ? 'প্রাথমিক ৩টি রেকর্ড শুধুমাত্র ডেমো উদাহরণ। যাচাইকৃত বাজারদর পাওয়া না গেলে আপনি নিজে রেফারেন্স দর লিখতে পারেন—যা "কৃষকের প্রবেশকৃত রেফারেন্স দর" হিসেবে প্রদর্শিত হয় এবং ব্রাউজারে সংরক্ষিত থাকে।'
                  : 'Preloaded entries are demo samples. Since live market feeds are not connected, farmers can manually enter any local reference price—automatically labeled "Farmer-entered reference price" unless a verified source is specified.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setFormOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>
                {formOpen
                  ? bn
                    ? 'ফর্ম লুকান'
                    : 'Hide Sale Form'
                  : bn
                  ? 'নতুন বিক্রয় যোগ করুন'
                  : 'Add Crop Sale'}
              </span>
            </button>
            <button
              type="button"
              onClick={handleResetDemo}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)] bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{bn ? 'ডেমো রিসেট' : 'Reset Demo'}</span>
            </button>
          </div>
        </div>

        {saveToast && (
          <div
            role="status"
            className="bg-[var(--kb-surface-sage)] border border-[var(--kb-accent)] text-[var(--kb-brand-text)] px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2"
          >
            <Check className="w-4 h-4 shrink-0" />
            <span>{saveToast}</span>
          </div>
        )}

        {/* 4 Dashboard KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 space-y-1.5">
            <p className="text-xs font-medium text-[var(--kb-ink-muted)]">
              {bn ? 'মোট বিক্রিত ফসল পরিমাণ' : 'Total Crop Quantity Sold'}
            </p>
            <p className="text-2xl font-bold font-mono tabular-nums text-[var(--kb-ink)]">
              {Math.round(dashboardTotals.totalSoldKg).toLocaleString('en-US')}{' '}
              <span className="text-sm font-semibold">{bn ? 'কেজি' : 'kg'}</span>
            </p>
            <p className="text-xs text-[var(--kb-ink-muted)] tabular-nums">
              ≈ {dashboardTotals.totalSoldMaunds.toFixed(1)}{' '}
              {bn ? 'মণ' : 'maunds'} · {filteredRecords.length}{' '}
              {bn ? 'টি বিক্রয়' : 'sales'}
            </p>
          </div>

          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 space-y-1.5">
            <p className="text-xs font-medium text-[var(--kb-ink-muted)]">
              {bn ? 'মোট ফসল বিক্রয় আয়' : 'Total Sales Revenue'}
            </p>
            <p className="text-2xl font-bold font-mono tabular-nums text-[var(--kb-brand-text)]">
              {formatBdt(dashboardTotals.totalRevenueBdt)}
            </p>
            <p className="text-xs text-[var(--kb-ink-muted)]">
              {bn ? 'স্বয়ংক্রিয় হিসাব (পরিমাণ × দর)' : 'Auto-calculated (Qty × Price)'}
            </p>
          </div>

          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 space-y-1.5">
            <p className="text-xs font-medium text-[var(--kb-ink-muted)]">
              {bn ? 'মোট পরিবহন ও বাজার খরচ' : 'Total Sales Expenses'}
            </p>
            <p className="text-2xl font-bold font-mono tabular-nums text-[var(--kb-amber)]">
              {formatBdt(dashboardTotals.totalExpensesBdt)}
            </p>
            <p className="text-xs text-[var(--kb-ink-muted)]">
              {bn ? 'পরিবহন, শ্রমিক, খাজনা ও অন্যান্য' : 'Transport, labor, market & other'}
            </p>
          </div>

          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 space-y-1.5">
            <p className="text-xs font-medium text-[var(--kb-ink-muted)]">
              {bn ? 'কৃষকের নিট প্রাপ্ত আয়' : 'Net Income Received'}
            </p>
            <p
              className={`text-2xl font-bold font-mono tabular-nums ${
                dashboardTotals.netIncomeBdt >= 0
                  ? 'text-[var(--kb-accent)]'
                  : 'text-[var(--kb-danger-text)]'
              }`}
            >
              {dashboardTotals.netIncomeBdt > 0 ? '+' : ''}
              {formatBdt(dashboardTotals.netIncomeBdt)}
            </p>
            <p className="text-xs text-[var(--kb-ink-muted)] tabular-nums">
              {dashboardTotals.comparedCount > 0
                ? `${bn ? 'বাজার তুলনায় পার্থক্য:' : 'Ref price variance:'} ${
                    dashboardTotals.totalFairPriceGapBdt > 0 ? '+' : ''
                  }${formatBdt(dashboardTotals.totalFairPriceGapBdt)}`
                : bn
                ? 'কোনো রেফারেন্স তুলনা নেই'
                : 'No reference comparisons'}
            </p>
          </div>
        </div>

        {/* Add / Edit Crop Sale Record Form */}
        {formOpen && (
          <form
            onSubmit={handleSubmit}
            className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 sm:p-8 space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--kb-border-subtle)]">
              <div>
                <h2 className="text-lg font-bold text-[var(--kb-ink)]">
                  {editingId
                    ? bn
                      ? 'বিক্রয় রেকর্ড সম্পাদনা করুন'
                      : 'Edit Crop Sale Record'
                    : bn
                    ? 'নতুন ফসল বিক্রয় ও ন্যায্যমূল্য যোগ করুন'
                    : 'Add New Crop Sale & Fair Price Entry'}
                </h2>
                <p className="text-xs text-[var(--kb-ink-muted)] mt-0.5">
                  {bn
                    ? 'বিক্রয়ের তথ্য ও খরচ লিখলেই মোট আয়, নিট আয় এবং দরের পার্থক্য স্বয়ংক্রিয়ভাবে হিসাব হবে।'
                    : 'Revenue, total expenses, net income, and reference price gap calculate dynamically as you type.'}
                </p>
              </div>
              {editingId && (
                <button
                  type="button"
                  onClick={resetFormFields}
                  className="text-xs font-semibold text-[var(--kb-danger-text)] hover:underline cursor-pointer"
                >
                  {bn ? 'সম্পাদনা বাতিল' : 'Cancel Edit'}
                </button>
              )}
            </div>

            {formError && (
              <div
                role="alert"
                className="bg-[var(--kb-danger-bg)] border border-[var(--kb-danger-border)] text-[var(--kb-danger-text)] px-4 py-3 rounded-lg text-sm flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Section A: Crop Sale Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[var(--kb-brand-text)] flex items-center gap-2">
                <Sprout className="w-4 h-4" />
                <span>
                  {bn ? '১. ফসল ও বিক্রয়ের তথ্য' : '1. Crop & Sale Details'}
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="sale-crop"
                    className="block text-xs font-semibold text-[var(--kb-ink)]"
                  >
                    {bn ? 'ফসলের নাম *' : 'Crop Name *'}
                  </label>
                  <select
                    id="sale-crop"
                    value={cropId}
                    onChange={(e) => setCropId(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] focus:outline-none focus:border-[var(--kb-accent)]"
                  >
                    {cropOptions.map((c) => (
                      <option key={c.id} value={c.id}>
                        {bn ? `${c.name.bn} (${c.name.en})` : `${c.name.en} (${c.name.bn})`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="sale-unit"
                    className="block text-xs font-semibold text-[var(--kb-ink)]"
                  >
                    {bn ? 'ওজনের একক *' : 'Unit *'}
                  </label>
                  <select
                    id="sale-unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as SaleWeightUnit)}
                    className="w-full px-3 py-2.5 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] focus:outline-none focus:border-[var(--kb-accent)]"
                  >
                    <option value="kg">
                      {bn ? UNIT_LABELS.kg.bn : UNIT_LABELS.kg.en}
                    </option>
                    <option value="maund">
                      {bn ? UNIT_LABELS.maund.bn : UNIT_LABELS.maund.en}
                    </option>
                    <option value="ton">
                      {bn ? UNIT_LABELS.ton.bn : UNIT_LABELS.ton.en}
                    </option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="sale-harvested"
                    className="block text-xs font-semibold text-[var(--kb-ink)]"
                  >
                    {bn ? 'উৎপাদিত / কাটা পরিমাণ' : 'Harvested Quantity'}
                  </label>
                  <input
                    id="sale-harvested"
                    type="number"
                    min={0}
                    step="any"
                    value={harvestedQty}
                    onChange={(e) => setHarvestedQty(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm font-mono tabular-nums bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] focus:outline-none focus:border-[var(--kb-accent)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="sale-sold"
                    className="block text-xs font-semibold text-[var(--kb-ink)]"
                  >
                    {bn ? 'বিক্রিত পরিমাণ *' : 'Sold Quantity *'}
                  </label>
                  <input
                    id="sale-sold"
                    type="number"
                    min={0}
                    step="any"
                    required
                    value={soldQty}
                    onChange={(e) => setSoldQty(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm font-mono tabular-nums bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] focus:outline-none focus:border-[var(--kb-accent)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="sale-price"
                    className="block text-xs font-semibold text-[var(--kb-ink)]"
                  >
                    {bn
                      ? `প্রতি ${UNIT_SHORT[unit].bn} বিক্রয়মূল্য (৳) *`
                      : `Selling Price per ${UNIT_SHORT[unit].en} (BDT) *`}
                  </label>
                  <input
                    id="sale-price"
                    type="number"
                    min={0}
                    step="any"
                    required
                    value={sellingPricePerUnit}
                    onChange={(e) => setSellingPricePerUnit(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm font-mono tabular-nums bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] focus:outline-none focus:border-[var(--kb-accent)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="sale-date"
                    className="block text-xs font-semibold text-[var(--kb-ink)]"
                  >
                    {bn ? 'বিক্রয়ের তারিখ *' : 'Sale Date *'}
                  </label>
                  <input
                    id="sale-date"
                    type="date"
                    required
                    value={saleDate}
                    onChange={(e) => setSaleDate(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm font-mono tabular-nums bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] focus:outline-none focus:border-[var(--kb-accent)]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label
                    htmlFor="sale-buyer"
                    className="block text-xs font-semibold text-[var(--kb-ink)]"
                  >
                    {bn ? 'ক্রেতা / আড়তদারের নাম (ঐচ্ছিক)' : 'Buyer Name (Optional)'}
                  </label>
                  <input
                    id="sale-buyer"
                    type="text"
                    placeholder={
                      bn ? 'যেমন: স্থানীয় পাইকার বা সমবায়' : 'e.g., Local trader or co-op'
                    }
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] focus:outline-none focus:border-[var(--kb-accent)]"
                  />
                </div>
              </div>
            </div>

            {/* Section B: Post-Harvest & Selling Expenses */}
            <div className="pt-4 border-t border-[var(--kb-border-subtle)] space-y-4">
              <h3 className="text-sm font-bold text-[var(--kb-brand-text)] flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>
                  {bn
                    ? '২. বিক্রয়-সংক্রান্ত খরচসমূহ (টাকা)'
                    : '2. Selling & Marketing Expenses (BDT)'}
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="exp-transport"
                    className="block text-xs font-semibold text-[var(--kb-ink)]"
                  >
                    {bn ? 'পরিবহন খরচ (৳)' : 'Transportation (BDT)'}
                  </label>
                  <input
                    id="exp-transport"
                    type="number"
                    min={0}
                    value={transportCostBdt}
                    onChange={(e) => setTransportCostBdt(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm font-mono tabular-nums bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] focus:outline-none focus:border-[var(--kb-accent)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="exp-labor"
                    className="block text-xs font-semibold text-[var(--kb-ink)]"
                  >
                    {bn ? 'শ্রমিক / কুলি খরচ (৳)' : 'Labor Cost (BDT)'}
                  </label>
                  <input
                    id="exp-labor"
                    type="number"
                    min={0}
                    value={laborCostBdt}
                    onChange={(e) => setLaborCostBdt(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm font-mono tabular-nums bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] focus:outline-none focus:border-[var(--kb-accent)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="exp-market"
                    className="block text-xs font-semibold text-[var(--kb-ink)]"
                  >
                    {bn ? 'হাট / বাজার খাজনা (৳)' : 'Market Fees (BDT)'}
                  </label>
                  <input
                    id="exp-market"
                    type="number"
                    min={0}
                    value={marketFeeBdt}
                    onChange={(e) => setMarketFeeBdt(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm font-mono tabular-nums bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] focus:outline-none focus:border-[var(--kb-accent)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="exp-other"
                    className="block text-xs font-semibold text-[var(--kb-ink)]"
                  >
                    {bn ? 'বস্তা ও অন্যান্য খরচ (৳)' : 'Other Expenses (BDT)'}
                  </label>
                  <input
                    id="exp-other"
                    type="number"
                    min={0}
                    value={otherExpenseBdt}
                    onChange={(e) => setOtherExpenseBdt(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm font-mono tabular-nums bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] focus:outline-none focus:border-[var(--kb-accent)]"
                  />
                </div>
              </div>
            </div>

            {/* Section C: Fair Price Reference Input */}
            <div className="pt-4 border-t border-[var(--kb-border-subtle)] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-[var(--kb-brand-text)] flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  <span>
                    {bn
                      ? '৩. ন্যায্যমূল্য তুলনা (স্থানীয় রেফারেন্স বাজারদর)'
                      : '3. Fair Price Reference Comparison'}
                  </span>
                </h3>
                <label className="inline-flex items-center gap-2 text-xs font-medium text-[var(--kb-ink)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasReferencePrice}
                    onChange={(e) => setHasReferencePrice(e.target.checked)}
                    className="accent-[#14532D] dark:accent-[#34D399] w-4 h-4 cursor-pointer"
                  />
                  <span>
                    {bn
                      ? 'রেফারেন্স বাজারদরের সাথে তুলনা যুক্ত করুন'
                      : 'Compare with local reference market price'}
                  </span>
                </label>
              </div>

              {hasReferencePrice && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-xl p-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="ref-price"
                      className="block text-xs font-semibold text-[var(--kb-ink)]"
                    >
                      {bn
                        ? `রেফারেন্স দর / ${UNIT_SHORT[unit].bn} (৳)`
                        : `Reference Price / ${UNIT_SHORT[unit].en} (BDT)`}
                    </label>
                    <input
                      id="ref-price"
                      type="number"
                      min={0}
                      step="any"
                      value={referencePricePerUnit}
                      onChange={(e) => setReferencePricePerUnit(e.target.value)}
                      className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] focus:outline-none focus:border-[var(--kb-accent)]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="ref-market"
                      className="block text-xs font-semibold text-[var(--kb-ink)]"
                    >
                      {bn ? 'বাজারের নাম' : 'Reference Market Name'}
                    </label>
                    <input
                      id="ref-market"
                      type="text"
                      placeholder={
                        bn
                          ? 'যেমন: সাভার কাঁচাবাজার / হাট'
                          : 'e.g., Savar Wholesale Market'
                      }
                      value={referenceMarketName}
                      onChange={(e) => setReferenceMarketName(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] focus:outline-none focus:border-[var(--kb-accent)]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="ref-date"
                      className="block text-xs font-semibold text-[var(--kb-ink)]"
                    >
                      {bn ? 'রেফারেন্স দরের তারিখ' : 'Reference Price Date'}
                    </label>
                    <input
                      id="ref-date"
                      type="date"
                      value={referenceDate}
                      onChange={(e) => setReferenceDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] focus:outline-none focus:border-[var(--kb-accent)]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="ref-source-type"
                      className="block text-xs font-semibold text-[var(--kb-ink)]"
                    >
                      {bn ? 'দরের উৎস' : 'Reference Price Source'}
                    </label>
                    <select
                      id="ref-source-type"
                      value={referenceSourceType}
                      onChange={(e) =>
                        setReferenceSourceType(
                          e.target.value as ReferenceSourceType
                        )
                      }
                      className="w-full px-3 py-2 text-sm bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] focus:outline-none focus:border-[var(--kb-accent)]"
                    >
                      <option value="farmer-entered">
                        {bn
                          ? 'কৃষকের প্রবেশকৃত রেফারেন্স দর'
                          : 'Farmer-entered reference price'}
                      </option>
                      <option value="local-market-verified">
                        {bn
                          ? 'যাচাইকৃত স্থানীয় বাজার উৎস (নাম লিখুন)'
                          : 'Verified local market source (specify below)'}
                      </option>
                    </select>
                  </div>

                  {referenceSourceType === 'local-market-verified' && (
                    <div className="sm:col-span-2 lg:col-span-4 space-y-1.5">
                      <label
                        htmlFor="ref-source-note"
                        className="block text-xs font-semibold text-[var(--kb-ink)]"
                      >
                        {bn
                          ? 'যাচাইকৃত উৎসের নাম (যেমন: কৃষি বিপণন অধিদপ্তর / উপজেলা নোটিশ বোর্ড)'
                          : 'Verified Source Citation (e.g., DAM bulletin / Upazila notice board)'}
                      </label>
                      <input
                        id="ref-source-note"
                        type="text"
                        placeholder={
                          bn
                            ? 'উৎস খালি থাকলে "কৃষকের প্রবেশকৃত রেফারেন্স দর" হিসেবে সংরক্ষিত হবে'
                            : 'If left blank, it will be labeled "Farmer-entered reference price"'
                        }
                        value={referenceSourceNote}
                        onChange={(e) => setReferenceSourceNote(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] focus:outline-none focus:border-[var(--kb-accent)]"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Live Form Preview & Submit Strip */}
            <div className="pt-4 border-t border-[var(--kb-border)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm">
                <span>
                  <span className="text-[var(--kb-ink-muted)]">
                    {bn ? 'মোট বিক্রয় আয়:' : 'Est. Revenue:'}{' '}
                  </span>
                  <strong className="font-mono tabular-nums text-[var(--kb-brand-text)]">
                    {formatBdt(liveFormPreview.revenue)}
                  </strong>
                </span>
                <span>
                  <span className="text-[var(--kb-ink-muted)]">
                    {bn ? 'মোট খরচ:' : 'Expenses:'}{' '}
                  </span>
                  <strong className="font-mono tabular-nums text-[var(--kb-amber)]">
                    {formatBdt(liveFormPreview.expenses)}
                  </strong>
                </span>
                <span>
                  <span className="text-[var(--kb-ink-muted)]">
                    {bn ? 'নিট আয়:' : 'Net Income:'}{' '}
                  </span>
                  <strong
                    className={`font-mono tabular-nums ${
                      liveFormPreview.netIncome >= 0
                        ? 'text-[var(--kb-accent)]'
                        : 'text-[var(--kb-danger-text)]'
                    }`}
                  >
                    {liveFormPreview.netIncome > 0 ? '+' : ''}
                    {formatBdt(liveFormPreview.netIncome)}
                  </strong>
                </span>
                {liveFormPreview.unitDiff !== null &&
                  liveFormPreview.totalDiff !== null && (
                    <span>
                      <span className="text-[var(--kb-ink-muted)]">
                        {bn ? 'বাজার তুলনা:' : 'vs. Reference:'}{' '}
                      </span>
                      <strong
                        className={`font-mono tabular-nums ${
                          liveFormPreview.unitDiff >= 0
                            ? 'text-[var(--kb-accent)]'
                            : 'text-[var(--kb-danger-text)]'
                        }`}
                      >
                        {liveFormPreview.totalDiff > 0 ? '+' : ''}
                        {formatBdt(liveFormPreview.totalDiff)}
                      </strong>
                    </span>
                  )}
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>
                  {editingId
                    ? bn
                      ? 'পরিবর্তন সংরক্ষণ করুন'
                      : 'Update Sale Record'
                    : bn
                    ? 'বিক্রয় রেকর্ড সংরক্ষণ করুন'
                    : 'Save Crop Sale'}
                </span>
              </button>
            </div>
          </form>
        )}

        {/* Filter Bar + Fair Price Comparison Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Fair Price Comparison Chart */}
          <div className="lg:col-span-7 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--kb-accent)]">
                  <BarChart3 className="w-4 h-4" />
                  <span>
                    {bn
                      ? 'বিক্রয়মূল্য বনাম রেফারেন্স বাজারদর'
                      : 'Selling Price vs. Reference Price Chart'}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-[var(--kb-ink)] mt-0.5">
                  {bn
                    ? 'ন্যায্যমূল্য তুলনা চার্ট'
                    : 'Fair Price Comparison Overview'}
                </h2>
              </div>

              <div className="inline-flex items-center p-1 bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-lg self-start">
                <button
                  type="button"
                  onClick={() => setChartMode('per-kg')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    chartMode === 'per-kg'
                      ? 'bg-[var(--kb-surface)] text-[var(--kb-brand-text)] shadow-xs'
                      : 'text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)]'
                  }`}
                >
                  {bn ? 'প্রতি কেজি (৳/কেজি)' : 'Normalized (৳/kg)'}
                </button>
                <button
                  type="button"
                  onClick={() => setChartMode('per-unit')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    chartMode === 'per-unit'
                      ? 'bg-[var(--kb-surface)] text-[var(--kb-brand-text)] shadow-xs'
                      : 'text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)]'
                  }`}
                >
                  {bn ? 'বিক্রিত এককে' : 'Original Unit'}
                </button>
              </div>
            </div>

            {chartRecords.length === 0 ? (
              <div className="py-10 text-center text-sm text-[var(--kb-ink-muted)]">
                {bn
                  ? 'চার্ট দেখানোর জন্য কোনো বিক্রয় রেকর্ড নেই।'
                  : 'No sales records available to plot.'}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--kb-ink-muted)]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#14532D] dark:bg-[#34D399] inline-block" />
                    <span>
                      {bn ? 'কৃষকের বিক্রয়মূল্য' : 'Farmer Selling Price'}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#D97706] dark:bg-[#FBBF24] inline-block" />
                    <span>
                      {bn
                        ? 'রেফারেন্স বাজারদর'
                        : 'Reference Market Price'}
                    </span>
                  </span>
                </div>

                <div className="space-y-4">
                  {chartRecords.map((rec) => {
                    const m = computeRecordMetrics(rec);
                    const sellVal =
                      chartMode === 'per-kg'
                        ? m.sellingPricePerKg
                        : rec.sellingPricePerUnit;
                    const refVal =
                      chartMode === 'per-kg'
                        ? m.referencePricePerKg
                        : rec.hasReferencePrice
                        ? rec.referencePricePerUnit
                        : null;
                    const unitTag =
                      chartMode === 'per-kg'
                        ? bn
                          ? 'কেজি'
                          : 'kg'
                        : bn
                        ? UNIT_SHORT[rec.unit].bn
                        : UNIT_SHORT[rec.unit].en;

                    const sellPct = Math.max(
                      Math.round((sellVal / maxChartPrice) * 100),
                      4
                    );
                    const refPct =
                      refVal !== null
                        ? Math.max(Math.round((refVal / maxChartPrice) * 100), 4)
                        : 0;

                    return (
                      <div
                        key={rec.id}
                        className="p-3.5 bg-[var(--kb-surface-muted)] border border-[var(--kb-border-subtle)] rounded-lg space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                          <span className="font-bold text-[var(--kb-ink)]">
                            {bn ? rec.cropName.bn : rec.cropName.en}{' '}
                            <span className="font-normal text-[var(--kb-ink-muted)] font-mono tabular-nums">
                              · {rec.saleDate}
                            </span>
                          </span>
                          {m.priceDiffPerUnit !== null && (
                            <span
                              className={`font-mono font-semibold tabular-nums inline-flex items-center gap-0.5 ${
                                m.priceDiffPerUnit >= 0
                                  ? 'text-[var(--kb-accent)]'
                                  : 'text-[var(--kb-danger-text)]'
                              }`}
                            >
                              {m.priceDiffPerUnit >= 0 ? (
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              ) : (
                                <ArrowDownRight className="w-3.5 h-3.5" />
                              )}
                              {m.priceDiffPerUnit > 0 ? '+' : ''}
                              ৳ {Math.round(m.priceDiffPerUnit).toLocaleString('en-US')}/
                              {bn ? UNIT_SHORT[rec.unit].bn : UNIT_SHORT[rec.unit].en}
                            </span>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2.5 bg-[var(--kb-surface)] rounded-sm overflow-hidden border border-[var(--kb-border)]">
                              <div
                                className="h-full bg-[#14532D] dark:bg-[#34D399]"
                                style={{ width: `${sellPct}%` }}
                              />
                            </div>
                            <span className="w-24 text-right font-mono text-xs font-semibold tabular-nums text-[var(--kb-brand-text)]">
                              ৳ {sellVal.toFixed(chartMode === 'per-kg' ? 1 : 0)}/{unitTag}
                            </span>
                          </div>

                          {refVal !== null ? (
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2.5 bg-[var(--kb-surface)] rounded-sm overflow-hidden border border-[var(--kb-border)]">
                                <div
                                  className="h-full bg-[#D97706] dark:bg-[#FBBF24]"
                                  style={{ width: `${refPct}%` }}
                                />
                              </div>
                              <span className="w-24 text-right font-mono text-xs font-semibold tabular-nums text-[var(--kb-amber)]">
                                ৳ {refVal.toFixed(chartMode === 'per-kg' ? 1 : 0)}/{unitTag}
                              </span>
                            </div>
                          ) : (
                            <p className="text-[11px] text-[var(--kb-ink-muted)]">
                              {bn
                                ? 'রেফারেন্স বাজারদর দেওয়া হয়নি'
                                : 'No reference price entered'}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Crop-wise Summary Card */}
          <div className="lg:col-span-5 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-[var(--kb-ink)]">
                  {bn ? 'ফসলভিত্তিক বিক্রয় সারসংক্ষেপ' : 'Crop-Wise Sales Summary'}
                </h2>
                <p className="text-xs text-[var(--kb-ink-muted)] mt-0.5">
                  {bn
                    ? 'কোনো ফসলে ক্লিক করলে নিচের তালিকা ফিল্টার হবে।'
                    : 'Click any crop row to filter sales history below.'}
                </p>
              </div>
              {filterCropId !== 'all' && (
                <button
                  type="button"
                  onClick={() => setFilterCropId('all')}
                  className="text-xs font-semibold text-[var(--kb-brand-text)] hover:underline cursor-pointer"
                >
                  {bn ? 'সব দেখুন' : 'Show All'}
                </button>
              )}
            </div>

            {cropBreakdown.length === 0 ? (
              <p className="text-sm text-[var(--kb-ink-muted)] py-6 text-center">
                {bn ? 'কোনো ফসলের বিক্রয় তথ্য নেই।' : 'No crop sales recorded yet.'}
              </p>
            ) : (
              <div className="space-y-3">
                {cropBreakdown.map((item) => {
                  const isActive = filterCropId === item.cropId;
                  return (
                    <button
                      key={item.cropId}
                      type="button"
                      onClick={() =>
                        setFilterCropId(isActive ? 'all' : item.cropId)
                      }
                      className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[var(--kb-surface-sage)] border-[var(--kb-accent)]'
                          : 'bg-[var(--kb-surface-muted)] border-[var(--kb-border)] hover:border-[var(--kb-accent)]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-[var(--kb-ink)]">
                          {bn ? item.cropName.bn : item.cropName.en}
                        </span>
                        <span
                          className={`font-mono text-sm font-bold tabular-nums ${
                            item.netIncomeBdt >= 0
                              ? 'text-[var(--kb-accent)]'
                              : 'text-[var(--kb-danger-text)]'
                          }`}
                        >
                          {item.netIncomeBdt > 0 ? '+' : ''}
                          {formatBdt(item.netIncomeBdt)}
                        </span>
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--kb-ink-muted)] tabular-nums">
                        <span>
                          {Math.round(item.totalSoldKg).toLocaleString('en-US')}{' '}
                          {bn ? 'কেজি' : 'kg'}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {bn ? 'আয়:' : 'Rev:'} {formatBdt(item.totalRevenueBdt)}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {bn ? 'খরচ:' : 'Exp:'} {formatBdt(item.totalExpensesBdt)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Crop-wise Sales History & Fair Price Comparison Table */}
        <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-[var(--kb-border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[var(--kb-ink)]">
                {bn
                  ? 'ফসল বিক্রয় ও ন্যায্যমূল্য ইতিহাস'
                  : 'Crop Sales & Fair Price Comparison History'}
              </h2>
              <p className="text-xs text-[var(--kb-ink-muted)] mt-0.5">
                {bn
                  ? 'প্রতিটি বিক্রয়ের নিট আয় এবং রেফারেন্স বাজারদরের উৎস, তারিখ ও পার্থক্য।'
                  : 'Net farmer income and detailed reference market comparison per sale.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="filter-crop-select"
                className="text-xs font-medium text-[var(--kb-ink-muted)] whitespace-nowrap"
              >
                {bn ? 'ফসল ফিল্টার:' : 'Filter crop:'}
              </label>
              <select
                id="filter-crop-select"
                value={filterCropId}
                onChange={(e) => setFilterCropId(e.target.value)}
                className="px-3 py-1.5 text-xs font-medium bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)]"
              >
                <option value="all">
                  {bn ? 'সকল ফসল' : 'All Crops'} ({records.length})
                </option>
                {cropBreakdown.map((c) => (
                  <option key={c.cropId} value={c.cropId}>
                    {bn ? c.cropName.bn : c.cropName.en} ({c.salesCount})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredRecords.length === 0 ? (
            <div className="p-10 text-center space-y-3">
              <p className="text-sm text-[var(--kb-ink-muted)]">
                {bn
                  ? 'নির্বাচিত ফিল্টারে কোনো বিক্রয় রেকর্ড পাওয়া যায়নি।'
                  : 'No crop sale records match this filter.'}
              </p>
              <div className="flex justify-center gap-3">
                {filterCropId !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setFilterCropId('all')}
                    className="px-4 py-2 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface-sage)] rounded-lg cursor-pointer"
                  >
                    {bn ? 'ফিল্টার সরান' : 'Clear Filter'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setFormOpen(true)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[var(--kb-brand)] rounded-lg cursor-pointer"
                >
                  {bn ? 'বিক্রয় যোগ করুন' : 'Add Crop Sale'}
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[920px]">
                <thead>
                  <tr className="bg-[var(--kb-surface-muted)] border-b border-[var(--kb-border)] text-xs font-semibold text-[var(--kb-ink-muted)]">
                    <th className="py-3.5 px-4">{bn ? 'ফসল ও তারিখ' : 'Crop & Date'}</th>
                    <th className="py-3.5 px-4">{bn ? 'বিক্রিত / কাটা' : 'Sold / Harvested'}</th>
                    <th className="py-3.5 px-4 text-right">{bn ? 'বিক্রয়মূল্য' : 'Sell Price'}</th>
                    <th className="py-3.5 px-4 text-right">{bn ? 'মোট আয় ও খরচ' : 'Revenue / Exp.'}</th>
                    <th className="py-3.5 px-4 text-right">{bn ? 'নিট আয়' : 'Net Income'}</th>
                    <th className="py-3.5 px-4">{bn ? 'রেফারেন্স বাজারদর ও পার্থক্য' : 'Reference Comparison & Source'}</th>
                    <th className="py-3.5 px-4 text-right">{bn ? 'পদক্ষেপ' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--kb-border-subtle)] text-sm">
                  {filteredRecords.map((rec) => {
                    const m = computeRecordMetrics(rec);
                    const uLabel = bn
                      ? UNIT_SHORT[rec.unit].bn
                      : UNIT_SHORT[rec.unit].en;

                    return (
                      <tr
                        key={rec.id}
                        className="hover:bg-[var(--kb-surface-muted)] transition-colors align-top"
                      >
                        <td className="py-4 px-4 space-y-1">
                          <div className="font-bold text-[var(--kb-ink)]">
                            {bn ? rec.cropName.bn : rec.cropName.en}
                          </div>
                          <div className="text-xs text-[var(--kb-ink-muted)] font-mono tabular-nums">
                            {rec.saleDate}
                            {rec.isDemoSample
                              ? bn
                                ? ' · ডেমো নমুনা'
                                : ' · Demo Sample'
                              : ''}
                          </div>
                          {rec.buyerName && (
                            <div className="text-xs text-[var(--kb-ink-muted)]">
                              {bn ? 'ক্রেতা:' : 'Buyer:'} {rec.buyerName}
                            </div>
                          )}
                        </td>

                        <td className="py-4 px-4 font-mono tabular-nums text-xs space-y-1">
                          <div className="text-sm font-semibold text-[var(--kb-ink)]">
                            {rec.soldQty.toLocaleString('en-US')} {uLabel}
                          </div>
                          <div className="text-[var(--kb-ink-muted)]">
                            {bn ? 'উৎপাদিত:' : 'Harv:'}{' '}
                            {rec.harvestedQty.toLocaleString('en-US')} {uLabel}
                          </div>
                        </td>

                        <td className="py-4 px-4 text-right font-mono tabular-nums">
                          <div className="font-semibold text-[var(--kb-ink)]">
                            ৳ {rec.sellingPricePerUnit.toLocaleString('en-US')}
                          </div>
                          <div className="text-xs text-[var(--kb-ink-muted)]">
                            / {uLabel}
                          </div>
                        </td>

                        <td className="py-4 px-4 text-right font-mono tabular-nums text-xs space-y-1">
                          <div className="text-sm font-semibold text-[var(--kb-brand-text)]">
                            {formatBdt(m.totalRevenueBdt)}
                          </div>
                          <div className="text-[var(--kb-amber)]">
                            - {formatBdt(m.totalExpensesBdt)}
                          </div>
                        </td>

                        <td className="py-4 px-4 text-right font-mono font-bold tabular-nums">
                          <span
                            className={
                              m.netIncomeBdt >= 0
                                ? 'text-[var(--kb-accent)]'
                                : 'text-[var(--kb-danger-text)]'
                            }
                          >
                            {m.netIncomeBdt > 0 ? '+' : ''}
                            {formatBdt(m.netIncomeBdt)}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-xs space-y-1 max-w-xs">
                          {rec.hasReferencePrice &&
                          m.priceDiffPerUnit !== null &&
                          m.estimatedTotalDiffBdt !== null ? (
                            <>
                              <div className="flex flex-wrap items-center gap-1.5 font-mono tabular-nums">
                                <span className="font-semibold text-[var(--kb-ink)]">
                                  {bn ? 'রেফ:' : 'Ref:'} ৳{' '}
                                  {rec.referencePricePerUnit.toLocaleString('en-US')}
                                  /{uLabel}
                                </span>
                                <span aria-hidden="true">·</span>
                                <span
                                  className={`font-bold ${
                                    m.priceDiffPerUnit >= 0
                                      ? 'text-[var(--kb-accent)]'
                                      : 'text-[var(--kb-danger-text)]'
                                  }`}
                                >
                                  {m.priceDiffPerUnit > 0 ? '+' : ''}
                                  ৳ {Math.round(m.priceDiffPerUnit).toLocaleString('en-US')}
                                  /{uLabel} (
                                  {m.estimatedTotalDiffBdt > 0 ? '+' : ''}
                                  {formatBdt(m.estimatedTotalDiffBdt)})
                                </span>
                              </div>
                              <div className="text-[var(--kb-ink-muted)]">
                                {rec.referenceMarketName} ·{' '}
                                <span className="font-mono tabular-nums">
                                  {rec.referenceDate}
                                </span>
                              </div>
                              <div className="text-[var(--kb-ink-muted)]">
                                {bn ? 'উৎস:' : 'Source:'}{' '}
                                {rec.referenceSourceType === 'local-market-verified'
                                  ? rec.referenceSourceNote
                                  : bn
                                  ? 'কৃষকের প্রবেশকৃত রেফারেন্স দর (Farmer-entered reference price)'
                                  : 'Farmer-entered reference price'}
                              </div>
                            </>
                          ) : (
                            <span className="text-[var(--kb-ink-muted)]">
                              {bn
                                ? 'কোনো রেফারেন্স দর যুক্ত করা হয়নি'
                                : 'No reference price recorded'}
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleEditRecord(rec)}
                              aria-label={bn ? 'সম্পাদনা করুন' : 'Edit record'}
                              className="p-2 text-[var(--kb-brand-text)] hover:bg-[var(--kb-surface-sage)] rounded-lg transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteRecord(rec.id)}
                              aria-label={bn ? 'মুছে ফেলুন' : 'Delete record'}
                              className="p-2 text-[var(--kb-danger-text)] hover:bg-[var(--kb-danger-bg)] rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <SourceQualityNotice
          language={language}
          verifiedSource={{
            bn: 'বাংলাদেশের প্রচলিত ওজন একক (১ মণ = ৪০ কেজি, ১ টন = ১,০০০ কেজি) এবং সাধারণ নিট আয় হিসাব (মোট বিক্রয় আয় − পরিবহন, শ্রমিক ও বাজার খরচ)।',
            en: 'Standard Bangladesh weight conversions (1 maund = 40 kg, 1 ton = 1,000 kg) and net farm income arithmetic (Sales Revenue − Selling Expenses).',
          }}
          demoScope={{
            bn: 'প্রারম্ভিক ৩টি ফসল বিক্রয় রেকর্ড নমুনা ডেমো। কোনো লাইভ সরকারি বাজারদর API যুক্ত নয়—রেফারেন্স দর কৃষকের নিজের দেওয়া তথ্য হিসেবে চিহ্নিত।',
            en: 'Initial 3 crop sales are demo samples. No live market-price API is queried; manual comparisons are explicitly labeled "Farmer-entered reference price".',
          }}
        />
      </div>
    </div>
  );
}
