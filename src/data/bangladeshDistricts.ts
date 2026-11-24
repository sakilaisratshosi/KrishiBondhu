export interface BangladeshDistrict {
  id: string;
  en: string;
  bn: string;
  divisionEn: string;
  divisionBn: string;
  aliases?: string[];
}

export const BANGLADESH_DISTRICTS: BangladeshDistrict[] = [
  // Dhaka Division (13)
  { id: 'dhaka', en: 'Dhaka', bn: 'ঢাকা', divisionEn: 'Dhaka', divisionBn: 'ঢাকা' },
  { id: 'faridpur', en: 'Faridpur', bn: 'ফরিদপুর', divisionEn: 'Dhaka', divisionBn: 'ঢাকা' },
  { id: 'gazipur', en: 'Gazipur', bn: 'গাজীপুর', divisionEn: 'Dhaka', divisionBn: 'ঢাকা' },
  { id: 'gopalganj', en: 'Gopalganj', bn: 'গোপালগঞ্জ', divisionEn: 'Dhaka', divisionBn: 'ঢাকা' },
  { id: 'kishoreganj', en: 'Kishoreganj', bn: 'কিশোরগঞ্জ', divisionEn: 'Dhaka', divisionBn: 'ঢাকা' },
  { id: 'madaripur', en: 'Madaripur', bn: 'মাদারীপুর', divisionEn: 'Dhaka', divisionBn: 'ঢাকা' },
  { id: 'manikganj', en: 'Manikganj', bn: 'মানিকগঞ্জ', divisionEn: 'Dhaka', divisionBn: 'ঢাকা' },
  { id: 'munshiganj', en: 'Munshiganj', bn: 'মুন্সীগঞ্জ', divisionEn: 'Dhaka', divisionBn: 'ঢাকা', aliases: ['মুন্সিগঞ্জ'] },
  { id: 'narayanganj', en: 'Narayanganj', bn: 'নারায়ণগঞ্জ', divisionEn: 'Dhaka', divisionBn: 'ঢাকা', aliases: ['নারায়নগঞ্জ'] },
  { id: 'narsingdi', en: 'Narsingdi', bn: 'নরসিংদী', divisionEn: 'Dhaka', divisionBn: 'ঢাকা', aliases: ['নরসিংদি'] },
  { id: 'rajbari', en: 'Rajbari', bn: 'রাজবাড়ী', divisionEn: 'Dhaka', divisionBn: 'ঢাকা', aliases: ['রাজবাড়ি'] },
  { id: 'shariatpur', en: 'Shariatpur', bn: 'শরীয়তপুর', divisionEn: 'Dhaka', divisionBn: 'ঢাকা', aliases: ['শরিয়তপুর'] },
  { id: 'tangail', en: 'Tangail', bn: 'টাঙ্গাইল', divisionEn: 'Dhaka', divisionBn: 'ঢাকা', aliases: ['টাংগাইল'] },

  // Barishal Division (6)
  { id: 'barguna', en: 'Barguna', bn: 'বরগুনা', divisionEn: 'Barishal', divisionBn: 'বরিশাল' },
  { id: 'barishal', en: 'Barishal', bn: 'বরিশাল', divisionEn: 'Barishal', divisionBn: 'বরিশাল', aliases: ['barisal'] },
  { id: 'bhola', en: 'Bhola', bn: 'ভোলা', divisionEn: 'Barishal', divisionBn: 'বরিশাল' },
  { id: 'jhalokati', en: 'Jhalokati', bn: 'ঝালকাঠি', divisionEn: 'Barishal', divisionBn: 'বরিশাল', aliases: ['jhalokathi', 'ঝালকাঠী'] },
  { id: 'patuakhali', en: 'Patuakhali', bn: 'পটুয়াখালী', divisionEn: 'Barishal', divisionBn: 'বরিশাল', aliases: ['পটুয়াখালি'] },
  { id: 'pirojpur', en: 'Pirojpur', bn: 'পিরোজপুর', divisionEn: 'Barishal', divisionBn: 'বরিশাল' },

  // Chattogram Division (11)
  { id: 'bandarban', en: 'Bandarban', bn: 'বান্দরবান', divisionEn: 'Chattogram', divisionBn: 'চট্টগ্রাম' },
  { id: 'brahmanbaria', en: 'Brahmanbaria', bn: 'ব্রাহ্মণবাড়িয়া', divisionEn: 'Chattogram', divisionBn: 'চট্টগ্রাম', aliases: ['ব্রাহ্মনবাড়িয়া'] },
  { id: 'chandpur', en: 'Chandpur', bn: 'চাঁদপুর', divisionEn: 'Chattogram', divisionBn: 'চট্টগ্রাম' },
  { id: 'chattogram', en: 'Chattogram', bn: 'চট্টগ্রাম', divisionEn: 'Chattogram', divisionBn: 'চট্টগ্রাম', aliases: ['chittagong'] },
  { id: 'cumilla', en: 'Cumilla', bn: 'কুমিল্লা', divisionEn: 'Chattogram', divisionBn: 'চট্টগ্রাম', aliases: ['comilla'] },
  { id: 'coxs-bazar', en: "Cox's Bazar", bn: 'কক্সবাজার', divisionEn: 'Chattogram', divisionBn: 'চট্টগ্রাম', aliases: ['coxs bazar', 'coxsbazar'] },
  { id: 'feni', en: 'Feni', bn: 'ফেনী', divisionEn: 'Chattogram', divisionBn: 'চট্টগ্রাম', aliases: ['ফেনি'] },
  { id: 'khagrachhari', en: 'Khagrachhari', bn: 'খাগড়াছড়ি', divisionEn: 'Chattogram', divisionBn: 'চট্টগ্রাম', aliases: ['khagrachari', 'খাগড়াছড়ী'] },
  { id: 'lakshmipur', en: 'Lakshmipur', bn: 'লক্ষ্মীপুর', divisionEn: 'Chattogram', divisionBn: 'চট্টগ্রাম', aliases: ['laxmipur'] },
  { id: 'noakhali', en: 'Noakhali', bn: 'নোয়াখালী', divisionEn: 'Chattogram', divisionBn: 'চট্টগ্রাম', aliases: ['নোয়াখালি'] },
  { id: 'rangamati', en: 'Rangamati', bn: 'রাঙ্গামাটি', divisionEn: 'Chattogram', divisionBn: 'চট্টগ্রাম', aliases: ['রাঙামাটি'] },

  // Sylhet Division (4)
  { id: 'habiganj', en: 'Habiganj', bn: 'হবিগঞ্জ', divisionEn: 'Sylhet', divisionBn: 'সিলেট' },
  { id: 'moulvibazar', en: 'Moulvibazar', bn: 'মৌলভীবাজার', divisionEn: 'Sylhet', divisionBn: 'সিলেট', aliases: ['maulvibazar'] },
  { id: 'sunamganj', en: 'Sunamganj', bn: 'সুনামগঞ্জ', divisionEn: 'Sylhet', divisionBn: 'সিলেট' },
  { id: 'sylhet', en: 'Sylhet', bn: 'সিলেট', divisionEn: 'Sylhet', divisionBn: 'সিলেট' },

  // Khulna Division (10)
  { id: 'bagerhat', en: 'Bagerhat', bn: 'বাগেরহাট', divisionEn: 'Khulna', divisionBn: 'খুলনা' },
  { id: 'chuadanga', en: 'Chuadanga', bn: 'চুয়াডাঙ্গা', divisionEn: 'Khulna', divisionBn: 'খুলনা' },
  { id: 'jashore', en: 'Jashore', bn: 'যশোর', divisionEn: 'Khulna', divisionBn: 'খুলনা', aliases: ['jessore'] },
  { id: 'jhenaidah', en: 'Jhenaidah', bn: 'ঝিনাইদহ', divisionEn: 'Khulna', divisionBn: 'খুলনা', aliases: ['jhenidah'] },
  { id: 'khulna', en: 'Khulna', bn: 'খুলনা', divisionEn: 'Khulna', divisionBn: 'খুলনা' },
  { id: 'kushtia', en: 'Kushtia', bn: 'কুষ্টিয়া', divisionEn: 'Khulna', divisionBn: 'খুলনা' },
  { id: 'magura', en: 'Magura', bn: 'মাগুরা', divisionEn: 'Khulna', divisionBn: 'খুলনা' },
  { id: 'meherpur', en: 'Meherpur', bn: 'মেহেরপুর', divisionEn: 'Khulna', divisionBn: 'খুলনা' },
  { id: 'narail', en: 'Narail', bn: 'নড়াইল', divisionEn: 'Khulna', divisionBn: 'খুলনা' },
  { id: 'satkhira', en: 'Satkhira', bn: 'সাতক্ষীরা', divisionEn: 'Khulna', divisionBn: 'খুলনা', aliases: ['সাতক্ষিরা'] },

  // Mymensingh Division (4)
  { id: 'jamalpur', en: 'Jamalpur', bn: 'জামালপুর', divisionEn: 'Mymensingh', divisionBn: 'ময়মনসিংহ' },
  { id: 'mymensingh', en: 'Mymensingh', bn: 'ময়মনসিংহ', divisionEn: 'Mymensingh', divisionBn: 'ময়মনসিংহ' },
  { id: 'netrokona', en: 'Netrokona', bn: 'নেত্রকোণা', divisionEn: 'Mymensingh', divisionBn: 'ময়মনসিংহ', aliases: ['নেত্রকোনা', 'netrakona'] },
  { id: 'sherpur', en: 'Sherpur', bn: 'শেরপুর', divisionEn: 'Mymensingh', divisionBn: 'ময়মনসিংহ' },

  // Rajshahi Division (8)
  { id: 'bogura', en: 'Bogura', bn: 'বগুড়া', divisionEn: 'Rajshahi', divisionBn: 'রাজশাহী', aliases: ['bogra'] },
  { id: 'joypurhat', en: 'Joypurhat', bn: 'জয়পুরহাট', divisionEn: 'Rajshahi', divisionBn: 'রাজশাহী' },
  { id: 'naogaon', en: 'Naogaon', bn: 'নওগাঁ', divisionEn: 'Rajshahi', divisionBn: 'রাজশাহী' },
  { id: 'natore', en: 'Natore', bn: 'নাটোর', divisionEn: 'Rajshahi', divisionBn: 'রাজশাহী' },
  { id: 'chapainawabganj', en: 'Chapainawabganj', bn: 'চাঁপাইনবাবগঞ্জ', divisionEn: 'Rajshahi', divisionBn: 'রাজশাহী', aliases: ['nawabganj', 'chapai nawabganj'] },
  { id: 'pabna', en: 'Pabna', bn: 'পাবনা', divisionEn: 'Rajshahi', divisionBn: 'রাজশাহী' },
  { id: 'rajshahi', en: 'Rajshahi', bn: 'রাজশাহী', divisionEn: 'Rajshahi', divisionBn: 'রাজশাহী' },
  { id: 'sirajganj', en: 'Sirajganj', bn: 'সিরাজগঞ্জ', divisionEn: 'Rajshahi', divisionBn: 'রাজশাহী' },

  // Rangpur Division (8)
  { id: 'dinajpur', en: 'Dinajpur', bn: 'দিনাজপুর', divisionEn: 'Rangpur', divisionBn: 'রংপুর' },
  { id: 'gaibandha', en: 'Gaibandha', bn: 'গাইবান্ধা', divisionEn: 'Rangpur', divisionBn: 'রংপুর' },
  { id: 'kurigram', en: 'Kurigram', bn: 'কুড়িগ্রাম', divisionEn: 'Rangpur', divisionBn: 'রংপুর' },
  { id: 'lalmonirhat', en: 'Lalmonirhat', bn: 'লালমনিরহাট', divisionEn: 'Rangpur', divisionBn: 'রংপুর' },
  { id: 'nilphamari', en: 'Nilphamari', bn: 'নীলফামারী', divisionEn: 'Rangpur', divisionBn: 'রংপুর', aliases: ['নীলফামারি'] },
  { id: 'panchagarh', en: 'Panchagarh', bn: 'পঞ্চগড়', divisionEn: 'Rangpur', divisionBn: 'রংপুর' },
  { id: 'rangpur', en: 'Rangpur', bn: 'রংপুর', divisionEn: 'Rangpur', divisionBn: 'রংপুর' },
  { id: 'thakurgaon', en: 'Thakurgaon', bn: 'ঠাকুরগাঁও', divisionEn: 'Rangpur', divisionBn: 'রংপুর' },
];

export function normalizeDistrictQuery(value: string): string {
  return value.normalize('NFC').trim().toLowerCase();
}

export function findDistrictById(id?: string): BangladeshDistrict | undefined {
  if (!id) return undefined;
  return BANGLADESH_DISTRICTS.find((d) => d.id === id);
}

export function searchBangladeshDistricts(query: string): BangladeshDistrict[] {
  const q = normalizeDistrictQuery(query);
  if (!q) return BANGLADESH_DISTRICTS;

  return BANGLADESH_DISTRICTS.filter((d) => {
    const candidates = [d.en, d.bn, ...(d.aliases || [])].map((s) =>
      normalizeDistrictQuery(s)
    );
    return candidates.some((c) => c.includes(q));
  });
}
