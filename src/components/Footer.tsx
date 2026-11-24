import { Sprout } from 'lucide-react';
import { Language, PageRoute } from '../types/krishi';

interface FooterProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
}

export function Footer({ language, onToggleLanguage, onNavigate }: FooterProps) {
  const links: { route: PageRoute; bn: string; en: string }[] = [
    { route: 'home', bn: 'হোম', en: 'Home' },
    { route: 'dashboard', bn: 'কৃষক ড্যাশবোর্ড', en: 'Dashboard' },
    { route: 'detect', bn: 'এআই ক্রপ ডক্টর', en: 'AI Crop Doctor' },
    { route: 'cultivation', bn: 'স্মার্ট চাষাবাদ গাইড', en: 'Cultivation Guide' },
    { route: 'soil', bn: 'মাটি ও সেচ', en: 'Soil & Irrigation' },
    { route: 'weather', bn: 'স্মার্ট আবহাওয়া', en: 'Weather Alert' },
    { route: 'assistant', bn: 'বাংলা সহায়ক', en: 'Bangla Assistant' },
    { route: 'calendar', bn: 'ফসল ক্যালেন্ডার', en: 'Crop Calendar' },
    { route: 'risk', bn: 'ঝুঁকি পূর্বাভাস', en: 'Risk Predictor' },
    { route: 'finance', bn: 'খরচ ও লাভ হিসাব', en: 'Expense Tracker' },
    { route: 'fair-price', bn: 'আয় ও ন্যায্যমূল্য', en: 'Income & Fair Price' },
    { route: 'community', bn: 'কৃষক কমিউনিটি', en: 'Community' },
    { route: 'history', bn: 'রোগের ইতিহাস', en: 'Disease History' },
    { route: 'roadmap', bn: 'স্কেলেবিলিটি রোডম্যাপ', en: 'Scalability Roadmap' },
    { route: 'financial-model', bn: 'আর্থিক মডেল', en: 'Financial Model' },
    { route: 'sdg', bn: 'এসডিজি ২.৪ প্রভাব', en: 'SDG 2.4 Impact' },
    { route: 'profile', bn: 'আমার প্রোফাইল', en: 'My Profile' },
  ];

  return (
    <footer className="bg-[#0A1D12] dark:bg-[#07110C] text-[#E6ECE7] border-t border-[#1A3824] dark:border-[#1D2F25]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#1D3E29]">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <Sprout className="w-5 h-5 text-[#10B981]" />
              <span className="text-lg font-bold font-display tracking-tight">
                {language === 'bn' ? 'কৃষিবন্ধু (KrishiBondhu)' : 'KrishiBondhu'}
              </span>
            </div>
            <p className="text-xs font-semibold text-[#6EE7B7]">
              Smart Agriculture, Better Farming, Better Future.
            </p>
            <p className="text-sm text-[#B7C7BC] leading-relaxed max-w-md">
              {language === 'bn'
                ? 'বাংলাদেশের কৃষকদের জন্য ফসলের রোগ বিষয়ক প্রাথমিক দিকনির্দেশনা, আবহাওয়া ভিত্তিক কৃষি পরামর্শ এবং জাতিসংঘ এসডিজি ২.৪ টেকসই খাদ্য উৎপাদন সহায়ক একটি স্ট্যাটিক প্রোটোটাইপ।'
                : 'A static AgriTech prototype crafted for Bangladeshi farmers—demonstrating accessible crop disease guidance, district weather advisories, and UN SDG 2.4 resilient agricultural practices.'}
            </p>
            <p className="text-xs text-[#8DA696]">
              {language === 'bn'
                ? 'জরুরি কৃষি পরামর্শের জন্য সরকারি কৃষি কল সেন্টার: ১৬১২৩'
                : 'Bangladesh Agriculture Call Center Helpline: 16123'}
            </p>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="text-sm font-semibold text-white">
              {language === 'bn' ? 'প্ল্যাটফর্মের অংশসমূহ' : 'Platform Views'}
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {links.map((item) => (
                <li key={item.route}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.route)}
                    className="text-[#B7C7BC] hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {language === 'bn' ? item.bn : item.en}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold text-white">
              {language === 'bn' ? 'ভাষা ও প্রোটোটাইপ তথ্য' : 'Language & Scope'}
            </h3>
            <div className="inline-flex items-center p-1 bg-[#14301E] rounded-lg border border-[#244E34]">
              <button
                type="button"
                onClick={() => onToggleLanguage('bn')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  language === 'bn'
                    ? 'bg-[#10B981] text-[#0A1D12]'
                    : 'text-[#B7C7BC] hover:text-white'
                }`}
              >
                বাংলা
              </button>
              <button
                type="button"
                onClick={() => onToggleLanguage('en')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#10B981] text-[#0A1D12]'
                    : 'text-[#B7C7BC] hover:text-white'
                }`}
              >
                English
              </button>
            </div>
            <p className="text-xs text-[#8DA696] leading-relaxed">
              {language === 'bn'
                ? 'রাউন্ড ১ ফ্রন্টএন্ড প্রোটোটাইপ। সকল আবহাওয়া, রোগ শনাক্তকরণ ও চ্যাট ডেটা পূর্বনির্ধারিত নমুনা হিসেবে প্রদর্শিত।'
                : 'Round 1 Static Frontend Prototype. All weather metrics, crop results, and assistant replies use predefined sample data locally in-browser.'}
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#8DA696]">
          <span>
            {language === 'bn'
              ? '© ২০২৬ কৃষিবন্ধু · টিম INNOVORA · AETHERMIND Hackathon 2026 · UN SDG 2.4'
              : '© 2026 KrishiBondhu · Team INNOVORA · AETHERMIND Hackathon 2026 · UN SDG 2.4'}
          </span>
          <span>
            {language === 'bn'
              ? 'নমুনা ডেটা প্রদর্শনী · কোনো ব্যাকএন্ড বা লাইভ AI সংযুক্ত নয়'
              : 'Sample Data Demonstration · Browser-Only Static Prototype'}
          </span>
        </div>
      </div>
    </footer>
  );
}
