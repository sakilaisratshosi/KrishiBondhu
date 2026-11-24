import { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, MapPin, Search, X } from 'lucide-react';
import {
  BANGLADESH_DISTRICTS,
  BangladeshDistrict,
  findDistrictById,
  normalizeDistrictQuery,
  searchBangladeshDistricts,
} from '../data/bangladeshDistricts';
import { Language } from '../types/krishi';

interface DistrictAutocompleteProps {
  language: Language;
  valueId: string;
  onChange: (district: BangladeshDistrict | null) => void;
  inputId?: string;
}

export function DistrictAutocomplete({
  language,
  valueId,
  onChange,
  inputId = 'profile-district-autocomplete',
}: DistrictAutocompleteProps) {
  const bn = language === 'bn';
  const selectedDistrict = useMemo(() => findDistrictById(valueId), [valueId]);

  const formatLabel = (d: BangladeshDistrict) =>
    bn ? `${d.bn} (${d.en})` : `${d.en} (${d.bn})`;

  const [query, setQuery] = useState<string>(() =>
    selectedDistrict ? formatLabel(selectedDistrict) : ''
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Sync display query whenever committed valueId or active language changes
  useEffect(() => {
    if (selectedDistrict) {
      setQuery(formatLabel(selectedDistrict));
    } else if (!isOpen) {
      setQuery('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueId, language]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (selectedDistrict) {
          setQuery(formatLabel(selectedDistrict));
        }
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistrict, language]);

  // Compute filtered & prefix-prioritized list across all 64 districts
  const suggestions = useMemo(() => {
    // When a district is already selected and query still matches its display label,
    // allow browsing all 64 districts in the dropdown until the user types or clears.
    if (selectedDistrict && query === formatLabel(selectedDistrict)) {
      return BANGLADESH_DISTRICTS;
    }

    const q = normalizeDistrictQuery(query);
    const matches = searchBangladeshDistricts(query);
    if (!q) return matches;

    return [...matches].sort((a, b) => {
      const aStarts =
        normalizeDistrictQuery(a.en).startsWith(q) ||
        normalizeDistrictQuery(a.bn).startsWith(q);
      const bStarts =
        normalizeDistrictQuery(b.en).startsWith(q) ||
        normalizeDistrictQuery(b.bn).startsWith(q);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.en.localeCompare(b.en);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, selectedDistrict, language]);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const activeEl = listRef.current.children[highlightedIndex] as
      | HTMLElement
      | undefined;
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen]);

  const handleSelectDistrict = (district: BangladeshDistrict) => {
    onChange(district);
    setQuery(formatLabel(district));
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange(null);
    setQuery('');
    setIsOpen(true);
    setHighlightedIndex(0);
    inputRef.current?.focus();
  };

  const handleInputChange = (nextText: string) => {
    setQuery(nextText);
    setIsOpen(true);
    if (selectedDistrict && nextText !== formatLabel(selectedDistrict)) {
      onChange(null);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      if (suggestions.length > 0) {
        setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      if (suggestions.length > 0) {
        setHighlightedIndex(
          (prev) => (prev - 1 + suggestions.length) % suggestions.length
        );
      }
    } else if (e.key === 'Enter') {
      if (isOpen && suggestions.length > 0) {
        e.preventDefault();
        const chosen = suggestions[highlightedIndex] || suggestions[0];
        if (chosen) {
          handleSelectDistrict(chosen);
        }
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      if (selectedDistrict) {
        setQuery(formatLabel(selectedDistrict));
      }
    }
  };

  return (
    <div ref={containerRef} className="relative space-y-1.5">
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-[var(--kb-ink-muted)] absolute left-3.5 pointer-events-none" />
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="bd-district-listbox"
          aria-autocomplete="list"
          aria-activedescendant={
            isOpen && suggestions[highlightedIndex]
              ? `district-opt-${suggestions[highlightedIndex].id}`
              : undefined
          }
          value={query}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          placeholder={
            bn
              ? 'জেলার নাম খুঁজুন (বাংলা বা English, যেমন: ঢাকা, রংপুর, Dh...)'
              : 'Search any of 64 districts (e.g., Dhaka, রংপুর, Bogura...)'
          }
          className={`w-full min-h-[44px] pl-10 pr-16 py-2 text-sm rounded-lg border transition-colors text-[var(--kb-ink)] placeholder:text-[var(--kb-ink-muted)]/70 ${
            selectedDistrict
              ? 'bg-[var(--kb-surface-sage)]/80 border-[var(--kb-accent)]'
              : 'bg-[var(--kb-surface-muted)] border-[var(--kb-border)] focus:bg-[var(--kb-surface)] focus:border-[var(--kb-accent)]'
          }`}
        />

        <div className="absolute right-2 flex items-center gap-1">
          {(query || selectedDistrict) && (
            <button
              type="button"
              onClick={handleClear}
              aria-label={bn ? 'নির্বাচিত জেলা মুছুন' : 'Clear selected district'}
              title={bn ? 'মুছে পুনরায় খুঁজুন' : 'Clear and search again'}
              className="p-1.5 rounded-md text-[var(--kb-ink-muted)] hover:text-[var(--kb-danger-text)] hover:bg-[var(--kb-danger-bg)] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setIsOpen((prev) => !prev);
              inputRef.current?.focus();
            }}
            aria-label={bn ? 'জেলার তালিকা খুলুন' : 'Toggle district list'}
            className="p-1.5 rounded-md text-[var(--kb-ink-muted)] hover:text-[var(--kb-brand-text)] hover:bg-[var(--kb-surface-sage)] transition-colors cursor-pointer"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Selected District Readout */}
      {selectedDistrict ? (
        <p className="text-xs text-[var(--kb-brand-text)] font-medium flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[var(--kb-accent)] shrink-0" />
          <span>
            {bn
              ? `নির্বাচিত জেলা: ${selectedDistrict.bn} (${selectedDistrict.en}) · ${selectedDistrict.divisionBn} বিভাগ`
              : `Selected District: ${selectedDistrict.en} (${selectedDistrict.bn}) · ${selectedDistrict.divisionEn} Division`}
          </span>
        </p>
      ) : (
        <p className="text-xs text-[var(--kb-ink-muted)]">
          {bn
            ? 'বাংলাদেশের ৬৪টি জেলার তালিকা থেকে খুঁজে নির্বাচন করুন (উপজেলা নয়)।'
            : 'Type in Bangla or English to select from all 64 official districts of Bangladesh.'}
        </p>
      )}

      {/* Dropdown Suggestion List */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-[48px] z-30 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl shadow-lg overflow-hidden">
          <div className="px-3.5 py-2 bg-[var(--kb-surface-muted)] border-b border-[var(--kb-border-subtle)] flex items-center justify-between text-[11px] font-semibold text-[var(--kb-ink-muted)]">
            <span>
              {bn
                ? 'বাংলাদেশের ৬৪টি সরকারি জেলা'
                : '64 Official Districts of Bangladesh'}
            </span>
            <span className="font-mono tabular-nums">
              {suggestions.length}/64
            </span>
          </div>

          {suggestions.length === 0 ? (
            <div className="p-4 text-center space-y-1">
              <p className="text-sm font-semibold text-[var(--kb-ink)]">
                {bn
                  ? `"${query}" নামে কোনো জেলা পাওয়া যায়নি`
                  : `No district matches "${query}"`}
              </p>
              <p className="text-xs text-[var(--kb-ink-muted)] leading-relaxed">
                {bn
                  ? 'এটি বাংলাদেশের ৬৪টি জেলার একটি নাও হতে পারে (যেমন: সাভার একটি উপজেলা, জেলা ঢাকা)। উপজেলা ঘরে উপজেলা লিখুন এবং এখান থেকে ৬৪ জেলার একটি বেছে নিন।'
                  : 'Only the 64 official districts of Bangladesh can be selected here (for example, Savar is an Upazila under Dhaka District).'}
              </p>
            </div>
          ) : (
            <ul
              ref={listRef}
              id="bd-district-listbox"
              role="listbox"
              aria-label={bn ? 'জেলার পরামর্শ তালিকা' : 'District suggestions'}
              className="max-h-60 overflow-y-auto divide-y divide-[var(--kb-border-subtle)]"
            >
              {suggestions.map((district, index) => {
                const isSelected = selectedDistrict?.id === district.id;
                const isHighlighted = index === highlightedIndex;
                return (
                  <li
                    key={district.id}
                    id={`district-opt-${district.id}`}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelectDistrict(district);
                    }}
                    className={`px-3.5 py-2.5 flex items-center justify-between gap-3 text-sm cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[var(--kb-surface-sage)] text-[var(--kb-brand-text)] font-semibold'
                        : isHighlighted
                        ? 'bg-[var(--kb-surface-muted)] text-[var(--kb-ink)]'
                        : 'text-[var(--kb-ink)] hover:bg-[var(--kb-surface-muted)]'
                    }`}
                  >
                    <div className="min-w-0">
                      <span className="font-semibold">
                        {bn ? district.bn : district.en}
                      </span>
                      <span className="text-[var(--kb-ink-muted)] mx-1.5">·</span>
                      <span className="text-xs text-[var(--kb-ink-muted)]">
                        {bn ? district.en : district.bn}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-[var(--kb-ink-muted)]">
                        {bn ? `${district.divisionBn} বিভাগ` : `${district.divisionEn} Div.`}
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
  );
}
