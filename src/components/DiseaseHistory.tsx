import { useMemo, useState } from 'react';
import { ArrowRight, RotateCcw, Search } from 'lucide-react';
import { CROP_OPTIONS } from '../data/krishiData';
import {
  CropKey,
  HistoryRecord,
  Language,
  PageRoute,
  SeverityLevel,
} from '../types/krishi';
import { ResilientImage } from './ResilientImage';
import { WorkspaceHeader } from './WorkspaceHeader';

interface DiseaseHistoryProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
  history: HistoryRecord[];
  onOpenHistoryRecord: (record: HistoryRecord) => void;
}

export function DiseaseHistory({
  language,
  onToggleLanguage,
  onNavigate,
  history,
  onOpenHistoryRecord,
}: DiseaseHistoryProps) {
  const bn = language === 'bn';
  const [searchQuery, setSearchQuery] = useState('');
  const [cropFilter, setCropFilter] = useState<'all' | CropKey | 'other'>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | SeverityLevel>(
    'all'
  );

  const filteredRecords = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return history.filter((rec) => {
      if (cropFilter !== 'all' && rec.crop !== cropFilter) return false;
      if (severityFilter !== 'all' && rec.severity !== severityFilter)
        return false;

      if (!q) return true;
      const haystack = [
        rec.diseaseName.bn,
        rec.diseaseName.en,
        rec.cropLabel.bn,
        rec.cropLabel.en,
        rec.districtName.bn,
        rec.districtName.en,
        rec.notes.bn,
        rec.notes.en,
        rec.date.bn,
        rec.date.en,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [history, searchQuery, cropFilter, severityFilter]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setCropFilter('all');
    setSeverityFilter('all');
  };

  return (
    <div className="bg-[var(--kb-canvas-alt)] min-h-screen">
      <WorkspaceHeader
        breadcrumbLabel={bn ? 'রোগের ইতিহাস' : 'Disease History'}
        title={
          bn
            ? 'পূর্ববর্তী ফসল পরীক্ষার নমুনা ইতিহাস'
            : 'Sample Crop Inspection History'
        }
        subtitle={
          bn
            ? 'তারিখ, ফসল ও সতর্কতার ধরন অনুযায়ী নমুনা প্রতিবেদন খুঁজুন এবং বিস্তারিত দেখতে ক্লিক করুন।'
            : 'Search and filter sample inspection records by crop, severity, district, or notes.'
        }
        language={language}
        onToggleLanguage={onToggleLanguage}
        onNavigate={onNavigate}
        backRoute="dashboard"
        backLabel={bn ? 'ড্যাশবোর্ড' : 'Dashboard'}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Search and Filter Controls */}
        <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <Search className="w-4 h-4 text-[var(--kb-ink-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <label htmlFor="history-search" className="sr-only">
                {bn ? 'রিপোর্ট খুঁজুন' : 'Search reports'}
              </label>
              <input
                id="history-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  bn
                    ? 'রোগের নাম, ফসল বা এলাকা লিখে খুঁজুন...'
                    : 'Search by disease, crop, district, or note...'
                }
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] placeholder:text-[var(--kb-ink-muted)]/75"
              />
            </div>

            {/* Crop Filter Buttons */}
            <div className="lg:col-span-7 flex flex-wrap items-center justify-between gap-3">
              <div
                role="group"
                aria-label={bn ? 'ফসল ফিল্টার' : 'Filter by crop'}
                className="flex flex-wrap items-center gap-1.5 p-1 bg-[var(--kb-surface-sage)] rounded-lg border border-[var(--kb-border)]"
              >
                <button
                  type="button"
                  onClick={() => setCropFilter('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    cropFilter === 'all'
                      ? 'bg-[var(--kb-surface)] text-[var(--kb-brand-text)] shadow-xs'
                      : 'text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)]'
                  }`}
                >
                  {bn ? 'সব ফসল' : 'All Crops'}
                </button>
                {CROP_OPTIONS.map((crop) => (
                  <button
                    key={crop.key}
                    type="button"
                    onClick={() => setCropFilter(crop.key)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      cropFilter === crop.key
                        ? 'bg-[var(--kb-surface)] text-[var(--kb-brand-text)] shadow-xs'
                        : 'text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)]'
                    }`}
                  >
                    {bn ? crop.label.bn : crop.label.en}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setCropFilter('other')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    cropFilter === 'other'
                      ? 'bg-[var(--kb-surface)] text-[var(--kb-brand-text)] shadow-xs'
                      : 'text-[var(--kb-ink-muted)] hover:text-[var(--kb-ink)]'
                  }`}
                >
                  {bn ? 'অন্যান্য ফসল' : 'Other Crops'}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="severity-filter" className="sr-only">
                  {bn ? 'সতর্কতার মাত্রা' : 'Severity filter'}
                </label>
                <select
                  id="severity-filter"
                  value={severityFilter}
                  onChange={(e) =>
                    setSeverityFilter(e.target.value as 'all' | SeverityLevel)
                  }
                  className="px-3 py-2 text-xs font-semibold bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] cursor-pointer"
                >
                  <option value="all">
                    {bn ? 'সকল সতর্কতা' : 'All Severities'}
                  </option>
                  <option value="high">
                    {bn ? 'উচ্চ সতর্কতা' : 'High Attention'}
                  </option>
                  <option value="moderate">
                    {bn ? 'মাঝারি সতর্কতা' : 'Moderate Watch'}
                  </option>
                  <option value="low">
                    {bn ? 'স্বাভাবিক / সুস্থ' : 'Healthy / Low Risk'}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[var(--kb-ink-muted)] pt-2 border-t border-[var(--kb-border-subtle)]">
            <span className="tabular-nums">
              {bn
                ? `মোট ${filteredRecords.length}টি নমুনা প্রতিবেদন পাওয়া গেছে`
                : `Showing ${filteredRecords.length} sample report${
                    filteredRecords.length === 1 ? '' : 's'
                  }`}
            </span>
            {(searchQuery || cropFilter !== 'all' || severityFilter !== 'all') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--kb-brand-text)] hover:text-[var(--kb-accent)] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{bn ? 'ফিল্টার রিসেট' : 'Reset Filters'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Records List or Empty State */}
        {filteredRecords.length === 0 ? (
          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-10 text-center space-y-4">
            <h2 className="text-lg font-bold text-[var(--kb-ink)]">
              {bn
                ? 'কোনো মিল থাকা প্রতিবেদন পাওয়া যায়নি'
                : 'No matching sample reports found'}
            </h2>
            <p className="text-sm text-[var(--kb-ink-muted)] max-w-md mx-auto">
              {bn
                ? 'আপনার অনুসন্ধান বা ফসল ফিল্টারের সাথে কোনো নমুনা রেকর্ড মেলেনি। ফিল্টার পরিবর্তন করে আবার দেখুন।'
                : 'No sample records match your current search or crop filters. Reset filters to view all sample records.'}
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{bn ? 'সব প্রতিবেদন দেখান' : 'Show All Reports'}</span>
            </button>
          </div>
        ) : (
          <div className="bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl divide-y divide-[var(--kb-border-subtle)] overflow-hidden">
            {filteredRecords.map((record) => (
              <button
                key={record.id}
                type="button"
                onClick={() => onOpenHistoryRecord(record)}
                className="w-full text-left p-5 sm:p-6 hover:bg-[var(--kb-surface-muted)] transition-colors flex flex-col md:flex-row md:items-center gap-5 cursor-pointer"
              >
                <div className="w-full md:w-28 h-36 md:h-20 rounded-lg overflow-hidden border border-[var(--kb-border)] shrink-0">
                  <ResilientImage
                    src={record.imageUrl}
                    alt={bn ? record.diseaseName.bn : record.diseaseName.en}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--kb-ink-muted)]">
                    <span className="tabular-nums font-medium text-[var(--kb-ink)]">
                      {bn ? record.date.bn : record.date.en}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{bn ? record.cropLabel.bn : record.cropLabel.en}</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {bn ? record.districtName.bn : record.districtName.en}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[var(--kb-ink)]">
                    {bn ? record.diseaseName.bn : record.diseaseName.en}
                  </h3>

                  <p className="text-sm text-[var(--kb-ink-muted)] line-clamp-2">
                    {bn ? record.notes.bn : record.notes.en}
                  </p>
                </div>

                <div className="flex items-center justify-between md:flex-col md:items-end gap-2 shrink-0">
                  <span
                    className={`text-xs font-bold ${
                      record.severity === 'high'
                        ? 'text-[var(--kb-danger-text)]'
                        : record.severity === 'low'
                        ? 'text-[var(--kb-accent)]'
                        : 'text-[var(--kb-amber)]'
                    }`}
                  >
                    {bn ? record.severityLabel.bn : record.severityLabel.en}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--kb-brand-text)]">
                    <span>{bn ? 'রিপোর্ট খুলুন' : 'Open Report'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
