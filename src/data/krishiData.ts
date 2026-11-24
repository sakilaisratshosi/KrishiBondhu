import {
  ChatMessage,
  CommunityPost,
  CropCalendarSchedule,
  CropKey,
  DiseaseProfile,
  DistrictWeather,
  ExpenseCategory,
  ExpenseEntry,
  FarmerProfile,
  HistoryRecord,
  SuggestedQuestion,
} from '../types/krishi';

export const ASSETS = {
  heroPaddy: '/src/assets/images/hero_bangladesh_paddy_1795480211999.jpg',
  riceBlast: '/src/assets/images/sample_rice_blast_1795480213380.jpg',
  tomatoBlight: '/src/assets/images/sample_tomato_blight_1795480212577.jpg',
  potatoBlight: '/src/assets/images/sample_potato_late_blight_1795480212988.jpg',
  sdgFarming: '/src/assets/images/sdg_resilient_farming_1795480214900.jpg',
};

export const CROP_OPTIONS: {
  key: CropKey;
  label: { bn: string; en: string };
  season: { bn: string; en: string };
  sampleImage: string;
}[] = [
  {
    key: 'rice',
    label: { bn: 'ধান', en: 'Rice (Paddy)' },
    season: { bn: 'বোরো ও আমন', en: 'Boro & Aman' },
    sampleImage: ASSETS.riceBlast,
  },
  {
    key: 'tomato',
    label: { bn: 'টমেটো', en: 'Tomato' },
    season: { bn: 'রবি মৌসুম', en: 'Rabi Season' },
    sampleImage: ASSETS.tomatoBlight,
  },
  {
    key: 'potato',
    label: { bn: 'আলু', en: 'Potato' },
    season: { bn: 'শীতকালীন', en: 'Winter Crop' },
    sampleImage: ASSETS.potatoBlight,
  },
  {
    key: 'eggplant',
    label: { bn: 'বেগুন', en: 'Eggplant' },
    season: { bn: 'সারা বছর', en: 'Year-round' },
    sampleImage: ASSETS.tomatoBlight,
  },
];

export const DISEASE_PROFILES: Record<CropKey, DiseaseProfile> = {
  rice: {
    id: 'profile-rice-blast',
    crop: 'rice',
    cropLabel: { bn: 'ধান', en: 'Rice (Paddy)' },
    diseaseName: {
      bn: 'ধানের পাতা ব্লাস্ট রোগ (নমুনা)',
      en: 'Rice Leaf Blast (Sample)',
    },
    scientificName: 'Pyricularia oryzae',
    severity: 'high',
    severityLabel: {
      bn: 'উচ্চ সতর্কতা (নমুনা)',
      en: 'High Attention (Sample)',
    },
    illustrativeMatchPercent: 86,
    defaultImage: ASSETS.riceBlast,
    summary: {
      bn: 'পাতায় মাকু বা চোখের মতো ধূসর কেন্দ্রবিশিষ্ট বাদামি দাগ ধানের ব্লাস্ট রোগের একটি প্রচলিত নমুনা লক্ষণ। আর্দ্র আবহাওয়া ও অতিরিক্ত ইউরিয়া প্রয়োগে এটি দ্রুত ছড়াতে পারে।',
      en: 'Diamond-shaped lesions with gray centers and brown borders on paddy leaves are a classic sample indicator of Rice Leaf Blast, especially during humid mornings or excess nitrogen use.',
    },
    symptoms: [
      {
        bn: 'ধানের পাতায় চোখের বা মাকু আকৃতির দাগ, যার মাঝখান ধূসর-সাদা এবং কিনারা গাঢ় বাদামি।',
        en: 'Spindle- or diamond-shaped spots with grayish-white centers and dark brown margins.',
      },
      {
        bn: 'সংক্রমণ বাড়লে একাধিক দাগ একসাথে মিশে পাতা ঝলসে যাওয়া বা শুকিয়ে যাওয়া।',
        en: 'Multiple lesions coalesce as progression increases, causing leaf scorching and drying.',
      },
      {
        bn: 'সকালের শিশির বা মেঘলা আবহাওয়ায় আক্রান্ত স্থানে হালকা ছত্রাকের আবরণ দেখা যেতে পারে।',
        en: 'Faint fungal sporulation may appear on lesions during dewy mornings or overcast weather.',
      },
    ],
    causes: [
      {
        bn: 'রাতে ঠান্ডা ও দিনে গরম আবহাওয়ার সাথে উচ্চ আর্দ্রতা (৮৫% বা তার বেশি)।',
        en: 'High relative humidity (85%+) paired with cool nights and warm daytime temperatures.',
      },
      {
        bn: 'জমিতে মাত্রাতিরিক্ত ইউরিয়া বা নাইট্রোজেন সার প্রয়োগ এবং ঘন রোপণ।',
        en: 'Excessive urea/nitrogen fertilization and overly dense crop spacing reducing airflow.',
      },
      {
        bn: 'আগের ফসলের আক্রান্ত খড় বা আগাছার মধ্যে জীবাণু থেকে যাওয়া।',
        en: 'Pathogen survival on infected crop residues or neighboring grassy weeds.',
      },
    ],
    prevention: [
      {
        bn: 'ব্রি ধান-২৮ বা সংবেদনশীল জাতের বদলে ব্লাস্ট সহনশীল অনুমোদিত জাত বেছে নিন।',
        en: 'Prefer locally recommended blast-tolerant rice varieties for upcoming planting cycles.',
      },
      {
        bn: 'সুপারিশকৃত মাত্রায় সুষম সার (পটাশ ও ফসফরাসসহ) প্রয়োগ করুন এবং অতিরিক্ত ইউরিয়া এড়িয়ে চলুন।',
        en: 'Apply balanced fertilization (including potash) and avoid excessive top-dressing of urea.',
      },
      {
        bn: 'জমিতে সারি করে রোপণ করুন যাতে পর্যাপ্ত বাতাস ও সূর্যালোক প্রবেশ করতে পারে।',
        en: 'Maintain proper row spacing so sunlight and airflow dry morning leaf wetness faster.',
      },
    ],
    responsibleTreatment: [
      {
        bn: 'প্রাথমিক পর্যায়ে আক্রান্ত পাতা ও আগাছা পরিষ্কার করে জমি থেকে দূরে সরিয়ে ফেলুন।',
        en: 'In early stages, carefully remove heavily affected weeds and manage standing water balance.',
      },
      {
        bn: 'কোনো ছত্রাকনাশক স্প্রে করার আগে অবশ্যই নিকটস্থ উপসহকারী কৃষি কর্মকর্তা বা উপজেলা কৃষি অফিসের পরামর্শ অনুযায়ী সঠিক মাত্রা নিশ্চিত করুন।',
        en: 'Before applying any fungicide, verify exact product choice and safe dosage with your local agriculture extension officer.',
      },
      {
        bn: 'বৃষ্টির পূর্বাভাস থাকলে স্প্রে স্থগিত রাখুন যাতে ওষুধ ধুয়ে গিয়ে অপচয় ও পরিবেশ দূষণ না হয়।',
        en: 'Avoid spraying right before forecasted rainfall to prevent runoff, waste, and environmental harm.',
      },
    ],
    expertVerification: {
      bn: 'এই ফলাফল কেবল শিক্ষামূলক প্রদর্শনের জন্য নমুনা ডেটা। জমিতে কোনো রাসায়নিক বালাইনাশক ব্যবহারের আগে উপজেলা কৃষি অফিস অথবা কৃষি কল সেন্টার (১৬১২৩)-এ যোগাযোগ করে নিশ্চিত হন।',
      en: 'This output is illustrative sample data for demonstration only. Always consult your Upazila Agriculture Office or call 16123 (Krishi Call Center) to verify before applying field treatments.',
    },
  },
  tomato: {
    id: 'profile-tomato-blight',
    crop: 'tomato',
    cropLabel: { bn: 'টমেটো', en: 'Tomato' },
    diseaseName: {
      bn: 'টমেটোর আগাম ধসা রোগ (নমুনা)',
      en: 'Tomato Early Blight (Sample)',
    },
    scientificName: 'Alternaria solani',
    severity: 'moderate',
    severityLabel: {
      bn: 'মাঝারি সতর্কতা (নমুনা)',
      en: 'Moderate Watch (Sample)',
    },
    illustrativeMatchPercent: 84,
    defaultImage: ASSETS.tomatoBlight,
    summary: {
      bn: 'টমেটোর নিচের দিকের পাতায় গোলাকার বলয়যুক্ত গাঢ় বাদামি দাগ এবং চারপাশে হলুদ আভা আগাম ধসা বা আর্লি ব্লাইটের সাধারণ নমুনা লক্ষণ।',
      en: 'Concentric dark brown rings surrounded by a yellow halo on lower tomato leaves are a typical sample pattern associated with Early Blight.',
    },
    symptoms: [
      {
        bn: 'প্রথমে বয়স্ক ও নিচের পাতায় গোল চাকতির মতো বাদামি দাগ, যাতে বৃত্তাকার বলয় দেখা যায়।',
        en: 'Circular brown lesions with concentric target-like rings appearing first on older lower leaves.',
      },
      {
        bn: 'দাগের চারপাশে পাতা হলুদ হয়ে যাওয়া এবং ধীরে ধীরে পাতা ঝরে পড়া।',
        en: 'Yellowing halo surrounding lesions followed by premature leaf drop.',
      },
      {
        bn: 'আক্রমণ বাড়লে কাণ্ড ও ফলের বোঁটার কাছে কালচে দাগ দেখা দিতে পারে।',
        en: 'Severe progression may cause dark sunken lesions near stems and fruit calyxes.',
      },
    ],
    causes: [
      {
        bn: 'উষ্ণ ও স্যাঁতসেঁতে আবহাওয়া এবং সেচের পানিতে পাতা দীর্ঘ সময় ভেজা থাকা।',
        en: 'Warm, humid weather combined with prolonged leaf wetness from overhead watering.',
      },
      {
        bn: 'মাটির কণা ও স্পোর বৃষ্টির ছিটায় নিচের পাতায় লেগে যাওয়া।',
        en: 'Soil splash during rain or irrigation transferring fungal spores onto lower foliage.',
      },
    ],
    prevention: [
      {
        bn: 'গাছের গোড়ায় খড় বা মাল্চিং ব্যবহার করুন যাতে মাটির পানি ছিটে পাতায় না লাগে।',
        en: 'Apply organic straw mulch at the base to reduce soil splash onto lower leaves.',
      },
      {
        bn: 'সকালের দিকে গাছের গোড়ায় সেচ দিন; পাতার ওপর পানি ছিটানো থেকে বিরত থাকুন।',
        en: 'Water at the root zone in the morning rather than wetting foliage in the evening.',
      },
      {
        bn: 'একই জমিতে প্রতি বছর টমেটো বা আলু জাতীয় ফসল চাষ না করে শস্য পর্যায় অনুসরণ করুন।',
        en: 'Practice crop rotation instead of planting tomato or potato consecutively in the same plot.',
      },
    ],
    responsibleTreatment: [
      {
        bn: 'নিচের আক্রান্ত পাতাগুলো সাবধানে ছাঁটাই করে জমি থেকে সরিয়ে মাটিতে পুঁতে ফেলুন।',
        en: 'Carefully prune heavily spotted lower leaves and dispose of them away from healthy rows.',
      },
      {
        bn: 'বাঁশের খুঁটি বা মাচা দিয়ে গাছ সোজা রাখুন যাতে বাতাস চলাচল সহজ হয়।',
        en: 'Stake plants properly to lift foliage off damp soil and improve air circulation.',
      },
      {
        bn: 'প্রয়োজনে কৃষি কর্মকর্তার পরামর্শ নিয়ে অনুমোদিত ও নিরাপদ মাত্রার পরিচর্যা গ্রহণ করুন।',
        en: 'Consult a local agricultural extension officer before selecting any crop protection spray.',
      },
    ],
    expertVerification: {
      bn: 'নমুনা প্রদর্শনী ফলাফল। নিশ্চিত রোগ নির্ণয় ও সঠিক বালাই ব্যবস্থাপনার জন্য স্থানীয় উপসহকারী কৃষি কর্মকর্তার পরামর্শ নিন।',
      en: 'Illustrative demo result. Please verify field symptoms with a local agricultural officer before making input decisions.',
    },
  },
  potato: {
    id: 'profile-potato-blight',
    crop: 'potato',
    cropLabel: { bn: 'আলু', en: 'Potato' },
    diseaseName: {
      bn: 'আলুর নাবি ধসা / মড়ক রোগ (নমুনা)',
      en: 'Potato Late Blight (Sample)',
    },
    scientificName: 'Phytophthora infestans',
    severity: 'high',
    severityLabel: {
      bn: 'উচ্চ সতর্কতা (নমুনা)',
      en: 'High Attention (Sample)',
    },
    illustrativeMatchPercent: 89,
    defaultImage: ASSETS.potatoBlight,
    summary: {
      bn: 'শীতকালীন কুয়াশা ও গুঁড়ি গুঁড়ি বৃষ্টির সময় আলুর পাতায় পানি-ভেজা কালচে পচন দাগ মড়ক বা লেট ব্লাইট রোগের একটি গুরুত্বপূর্ণ সতর্ক সংকেত।',
      en: 'Water-soaked dark lesions with pale margins during foggy winter mornings are a high-priority warning sign of Potato Late Blight.',
    },
    symptoms: [
      {
        bn: 'পাতার কিনারা বা ডগায় পানি-ভেজা ফ্যাকাশে সবুজ থেকে কালচে বাদামি বড় দাগ।',
        en: 'Water-soaked pale green to dark brown irregular patches starting near leaf tips or edges.',
      },
      {
        bn: 'সকালের শিশিরে আক্রান্ত পাতার নিচে সাদা তুলার মতো ছত্রাকের আস্তরণ দেখা যায়।',
        en: 'White cottony mold ring visible on the underside of lesions in morning dew.',
      },
      {
        bn: 'অনুকূল কুয়াশাচ্ছন্ন আবহাওয়ায় কয়েক দিনের মধ্যে পুরো ক্ষেত ঝলসে যেতে পারে।',
        en: 'Can rapidly blacken entire foliage canopies within days under cool foggy conditions.',
      },
    ],
    causes: [
      {
        bn: 'টানা ঘন কুয়াশা, মেঘলা আকাশ ও রাতের তাপমাত্রা ১০-১৮° সেলসিয়াসের মধ্যে থাকা।',
        en: 'Persistent dense fog, overcast skies, and cool night temperatures (10–18°C).',
      },
      {
        bn: 'আক্রান্ত বীজ আলু ব্যবহার অথবা পাশের ক্ষেত থেকে বাতাসের মাধ্যমে জীবাণু আসা।',
        en: 'Infected seed tubers or wind-borne sporangia spreading from neighboring fields.',
      },
    ],
    prevention: [
      {
        bn: 'রোগমুক্ত ও প্রত্যয়িত (BADC/অনুমোদিত) বীজ আলু ব্যবহার করুন।',
        en: 'Use certified disease-free seed tubers from trusted agricultural sources.',
      },
      {
        bn: 'ঘন কুয়াশার পূর্বাভাস থাকলে জমিতে সকাল-বিকেল নিয়মিত পর্যবেক্ষণ বাড়ান।',
        en: 'Increase morning field scouting whenever prolonged winter fog advisories are issued.',
      },
      {
        bn: 'জমির আলু গাছের গোড়ায় পর্যাপ্ত মাটি তুলে দিন (আর্দিং আপ) যাতে কন্দ সুরক্ষিত থাকে।',
        en: 'Ensure proper soil hilling (earthing up) to protect developing tubers from spore wash-down.',
      },
    ],
    responsibleTreatment: [
      {
        bn: 'প্রথম লক্ষণ দেখামাত্র আক্রান্ত অংশ চিহ্নিত করুন এবং অতিরিক্ত সেচ সাময়িকভাবে বন্ধ রাখুন।',
        en: 'Flag affected rows immediately and pause unnecessary irrigation during foggy spells.',
      },
      {
        bn: 'কোনো অনুমোদিত ছত্রাকনাশক ব্যবহারের আগে উপসহকারী কৃষি কর্মকর্তা বা কৃষি কল সেন্টার (১৬১২৩)-এর সঠিক নির্দেশনা অনুসরণ করুন।',
        en: 'Follow guidance from your Upazila Agriculture Officer or 16123 helpline for approved timing and dosage.',
      },
    ],
    expertVerification: {
      bn: 'মড়ক রোগ দ্রুত ছড়ায়—তাই ডেমো তথ্যের ওপর নির্ভর না করে অবিলম্বে স্থানীয় কৃষি অফিসের পরামর্শ নিন।',
      en: 'Late blight spreads rapidly in winter fog. Do not rely solely on demo screens—contact your local agriculture extension office promptly.',
    },
  },
  eggplant: {
    id: 'profile-eggplant-spot',
    crop: 'eggplant',
    cropLabel: { bn: 'বেগুন', en: 'Eggplant' },
    diseaseName: {
      bn: 'বেগুনের পাতা দাগ রোগ (নমুনা)',
      en: 'Eggplant Cercospora Leaf Spot (Sample)',
    },
    scientificName: 'Cercospora melongenae',
    severity: 'moderate',
    severityLabel: {
      bn: 'মাঝারি সতর্কতা (নমুনা)',
      en: 'Moderate Watch (Sample)',
    },
    illustrativeMatchPercent: 81,
    defaultImage: ASSETS.tomatoBlight,
    summary: {
      bn: 'বেগুনের পাতায় অনিয়মিত ধূসর-বাদামি দাগ ও পাতা হলুদ হয়ে ঝরে পড়া বর্ষা-পরবর্তী আর্দ্র আবহাওয়ায় দেখা যায়।',
      en: 'Irregular gray-brown leaf spots with gradual yellowing commonly appear on eggplant foliage during humid post-monsoon weeks.',
    },
    symptoms: [
      {
        bn: 'পাতায় ছোট ছোট গোল বা অনিয়মিত বাদামি-ধূসর দাগ যা পরে বড় হতে থাকে।',
        en: 'Small circular to irregular gray-brown lesions that slowly expand across older leaves.',
      },
      {
        bn: 'আক্রান্ত পাতা হলুদ হয়ে গাছ দুর্বল হওয়া এবং ফলন কিছুটা কমে যাওয়া।',
        en: 'Premature yellowing and shedding of older leaves, reducing plant vigor.',
      },
    ],
    causes: [
      {
        bn: 'দীর্ঘস্থায়ী উচ্চ আর্দ্রতা ও জমিতে পানি জমে থাকা।',
        en: 'Extended high humidity and poor drainage in heavy soils.',
      },
      {
        bn: 'আগাছা বেশি থাকা এবং ডালপালা ঘন হয়ে যাওয়া।',
        en: 'Weedy borders and dense canopies restricting sunlight penetration.',
      },
    ],
    prevention: [
      {
        bn: 'জমির পানি নিষ্কাশন ব্যবস্থা ভালো রাখুন যাতে বৃষ্টির পানি জমে না থাকে।',
        en: 'Maintain clean field drainage channels so rainwater does not stagnate around roots.',
      },
      {
        bn: 'নিয়মিত আগাছা পরিষ্কার ও মরা নিচের পাতা সরিয়ে ফেলুন।',
        en: 'Weed regularly and remove senescent lower leaves to improve airflow.',
      },
    ],
    responsibleTreatment: [
      {
        bn: 'প্রাথমিক পর্যায়ে আক্রান্ত পাতা তুলে মাটির নিচে পুঁতে ফেলুন।',
        en: 'Hand-pick early affected leaves and bury them outside the crop plot.',
      },
      {
        bn: 'সুষম জৈব ও রাসায়নিক সার ব্যবস্থাপনার জন্য স্থানীয় কৃষি পরামর্শ কেন্দ্রের সহায়তা নিন।',
        en: 'Seek local extension advice for balanced organic and mineral nutrient management.',
      },
    ],
    expertVerification: {
      bn: 'এটি একটি প্রোটোটাইপ নমুনা প্রতিবেদন। চূড়ান্ত পদক্ষেপের আগে উপজেলা কৃষি অফিসারের সাথে পরামর্শ করুন।',
      en: 'This is a prototype sample report. Verify with a local agricultural specialist before taking chemical action.',
    },
  },
};

export const DISTRICT_WEATHER: DistrictWeather[] = [
  {
    id: 'bogura',
    name: { bn: 'বগুড়া সদর, বগুড়া', en: 'Bogura Sadar, Bogura' },
    region: { bn: 'উত্তরাঞ্চল (নমুনা)', en: 'Northern Region (Sample)' },
    tempC: 27,
    feelsLikeC: 30,
    humidityPercent: 84,
    rainfallMm: 14,
    windKmh: 11,
    condition: {
      bn: 'আংশিক মেঘলা ও ভোরের দিকে কুয়াশা/আর্দ্রতা',
      en: 'Partly Cloudy · High Morning Humidity',
    },
    warningTitle: {
      bn: 'আর্দ্রতা সতর্কতা প্রদর্শনী (নমুনা ডেটা)',
      en: 'Sample Humidity Watch Demonstration',
    },
    warningBody: {
      bn: 'আগামী ৪৮ ঘণ্টায় সকালের আর্দ্রতা ৮৪%+ থাকতে পারে। আলু ও ধানের পাতায় ছত্রাকজনিত দাগ (ব্লাস্ট/মড়ক) পর্যবেক্ষণের পরামর্শ দেওয়া হচ্ছে।',
      en: 'Morning humidity is modeled above 84% over the next 48 hours. Farmers are advised to scout potato and paddy leaves early for fungal spots.',
    },
    forecast: [
      { day: { bn: 'আজ', en: 'Today' }, condition: { bn: 'আর্দ্র ও মেঘলা', en: 'Humid' }, icon: 'cloud', tempMax: 28, tempMin: 19, rainChance: 35 },
      { day: { bn: 'আগামীকাল', en: 'Tomorrow' }, condition: { bn: 'হালকা বৃষ্টি', en: 'Light Rain' }, icon: 'cloud-rain', tempMax: 26, tempMin: 18, rainChance: 65 },
      { day: { bn: 'পরশু', en: 'Day 3' }, condition: { bn: 'রোদ ও পরিষ্কার', en: 'Clear Sun' }, icon: 'sun', tempMax: 29, tempMin: 18, rainChance: 10 },
      { day: { bn: '৪র্থ দিন', en: 'Day 4' }, condition: { bn: 'রোদ ও মৃদু বাতাস', en: 'Breezy Sun' }, icon: 'wind', tempMax: 30, tempMin: 19, rainChance: 15 },
      { day: { bn: '৫ম দিন', en: 'Day 5' }, condition: { bn: 'আংশিক মেঘলা', en: 'Partly Cloudy' }, icon: 'cloud', tempMax: 28, tempMin: 19, rainChance: 25 },
    ],
    farmingGuidance: [
      {
        id: 'bg-1',
        title: { bn: 'স্প্রে ও সার প্রয়োগের সময়সূচি', en: 'Spraying & Fertilizer Window' },
        detail: {
          bn: 'আগামীকাল হালকা বৃষ্টির সম্ভাবনা থাকায় আজ বিকেলে বা বৃষ্টি শেষ হওয়ার পর শুষ্ক দিনে সার ও অনুমোদিত স্প্রে প্রয়োগ করুন।',
          en: 'Because light rain is modeled tomorrow (65% chance), postpone foliar sprays until a dry, calm morning window.',
        },
        priority: 'caution',
        priorityLabel: { bn: 'সতর্কতামূলক পরামর্শ', en: 'Caution Advisory' },
      },
      {
        id: 'bg-2',
        title: { bn: 'আলু ও সবজি ক্ষেতে পানি নিষ্কাশন', en: 'Drainage Check for Winter Plots' },
        detail: {
          bn: 'জমির আইল ও নালা পরিষ্কার রাখুন যাতে হঠাৎ বৃষ্টিতে গোড়ায় পানি না জমে।',
          en: 'Keep furrow drainage channels clear so sudden showers do not pool around potato or tomato roots.',
        },
        priority: 'normal',
        priorityLabel: { bn: 'নিয়মিত পরিচর্যা', en: 'Routine Care' },
      },
      {
        id: 'bg-3',
        title: { bn: 'ভোরের পাতা পর্যবেক্ষণ', en: 'Early Morning Leaf Scouting' },
        detail: {
          bn: 'উচ্চ আর্দ্রতার কারণে সকালে ক্ষেত ঘুরে ধান বা আলুর নিচের পাতায় কোনো নতুন দাগ দেখা যায় কিনা দেখুন।',
          en: 'Inspect lower crop foliage during morning rounds for fresh lesions favored by high humidity.',
        },
        priority: 'normal',
        priorityLabel: { bn: 'নিয়মিত পরিচর্যা', en: 'Routine Care' },
      },
    ],
  },
  {
    id: 'rajshahi',
    name: { bn: 'পবা, রাজশাহী', en: 'Paba, Rajshahi' },
    region: { bn: 'বরেন্দ্র অঞ্চল (নমুনা)', en: 'Barind Tract (Sample)' },
    tempC: 31,
    feelsLikeC: 33,
    humidityPercent: 58,
    rainfallMm: 2,
    windKmh: 14,
    condition: {
      bn: 'শুষ্ক ও রৌদ্রোজ্জ্বল আবহাওয়া',
      en: 'Dry & Mostly Sunny',
    },
    warningTitle: {
      bn: 'মৃদু শুষ্কতা ও সেচ পরিকল্পনা (নমুনা)',
      en: 'Sample Dry Spell & Irrigation Advisory',
    },
    warningBody: {
      bn: 'আগামী তিন দিন বৃষ্টির সম্ভাবনা কম ও দিনের তাপমাত্রা ৩১° সে. থাকতে পারে। মাটির আর্দ্রতা দেখে বিকেলে হালকা সেচ পরিকল্পনা করুন।',
      en: 'Low rainfall probability and 31°C daytime highs modeled over the next 3 days. Check topsoil moisture and plan evening irrigation.',
    },
    forecast: [
      { day: { bn: 'আজ', en: 'Today' }, condition: { bn: 'রৌদ্রোজ্জ্বল', en: 'Sunny' }, icon: 'sun', tempMax: 31, tempMin: 20, rainChance: 5 },
      { day: { bn: 'আগামীকাল', en: 'Tomorrow' }, condition: { bn: 'রৌদ্রোজ্জ্বল', en: 'Sunny' }, icon: 'sun', tempMax: 32, tempMin: 21, rainChance: 10 },
      { day: { bn: 'পরশু', en: 'Day 3' }, condition: { bn: 'হালকা বাতাস', en: 'Windy' }, icon: 'wind', tempMax: 31, tempMin: 20, rainChance: 10 },
      { day: { bn: '৪র্থ দিন', en: 'Day 4' }, condition: { bn: 'আংশিক মেঘলা', en: 'Partly Cloudy' }, icon: 'cloud', tempMax: 30, tempMin: 20, rainChance: 20 },
      { day: { bn: '৫ম দিন', en: 'Day 5' }, condition: { bn: 'রৌদ্রোজ্জ্বল', en: 'Sunny' }, icon: 'sun', tempMax: 31, tempMin: 21, rainChance: 10 },
    ],
    farmingGuidance: [
      {
        id: 'rj-1',
        title: { bn: 'সাশ্রয়ী সেচ ব্যবস্থাপনা (AWD)', en: 'Water-Saving Irrigation Timing' },
        detail: {
          bn: 'দুপুরের প্রখর রোদে সেচ না দিয়ে সকাল বা বিকেলে সেচ দিন—এতে পানির বাষ্পীভবন ও অপচয় কমবে।',
          en: 'Irrigate early morning or late afternoon instead of midday to minimize evaporation loss.',
        },
        priority: 'caution',
        priorityLabel: { bn: 'সতর্কতামূলক পরামর্শ', en: 'Caution Advisory' },
      },
      {
        id: 'rj-2',
        title: { bn: 'সবজি ক্ষেতে মাল্চিং', en: 'Soil Moisture Retention' },
        detail: {
          bn: 'টমেটো ও বেগুন গাছের গোড়ায় শুকনো খড় বিছিয়ে মাটির আর্দ্রতা ধরে রাখুন।',
          en: 'Use straw mulch around tomato and eggplant beds to conserve soil moisture.',
        },
        priority: 'normal',
        priorityLabel: { bn: 'নিয়মিত পরিচর্যা', en: 'Routine Care' },
      },
    ],
  },
  {
    id: 'sylhet',
    name: { bn: 'জৈন্তাপুর, সিলেট', en: 'Jaintiapur, Sylhet' },
    region: { bn: 'হাওর ও উত্তর-পূর্ব (নমুনা)', en: 'Northeast / Haor Belt (Sample)' },
    tempC: 25,
    feelsLikeC: 28,
    humidityPercent: 89,
    rainfallMm: 32,
    windKmh: 16,
    condition: {
      bn: 'মাঝারি বৃষ্টি ও উচ্চ আর্দ্রতা',
      en: 'Moderate Rain · High Humidity',
    },
    warningTitle: {
      bn: 'বৃষ্টি ও জলাবদ্ধতা সতর্কতা প্রদর্শনী (নমুনা)',
      en: 'Sample Rainfall & Runoff Advisory',
    },
    warningBody: {
      bn: '৩২ মি.মি. নমুনা বৃষ্টিপাত ও ৮৯% আর্দ্রতার কারণে ফসল কাটার উপযোগী ধান দ্রুত নিরাপদ স্থানে সংরক্ষণ ও স্প্রে স্থগিত রাখার পরামর্শ।',
      en: 'With 32 mm sample rainfall and 89% humidity, pause chemical spraying and protect harvested paddy from moisture.',
    },
    forecast: [
      { day: { bn: 'আজ', en: 'Today' }, condition: { bn: 'বৃষ্টিপাত', en: 'Rainy' }, icon: 'cloud-rain', tempMax: 25, tempMin: 20, rainChance: 80 },
      { day: { bn: 'আগামীকাল', en: 'Tomorrow' }, condition: { bn: 'বৃষ্টিপাত', en: 'Showers' }, icon: 'cloud-rain', tempMax: 26, tempMin: 20, rainChance: 70 },
      { day: { bn: 'পরশু', en: 'Day 3' }, condition: { bn: 'মেঘলা', en: 'Overcast' }, icon: 'cloud', tempMax: 27, tempMin: 20, rainChance: 40 },
      { day: { bn: '৪র্থ দিন', en: 'Day 4' }, condition: { bn: 'আংশিক রোদ', en: 'Mild Sun' }, icon: 'sun', tempMax: 28, tempMin: 21, rainChance: 20 },
      { day: { bn: '৫ম দিন', en: 'Day 5' }, condition: { bn: 'আংশিক মেঘলা', en: 'Partly Cloudy' }, icon: 'cloud', tempMax: 27, tempMin: 20, rainChance: 30 },
    ],
    farmingGuidance: [
      {
        id: 'sy-1',
        title: { bn: 'পাকা ধান দ্রুত সংগ্রহ ও শুকানো', en: 'Protect Mature Paddy Harvest' },
        detail: {
          bn: '৮০% ধান পেকে গেলে বৃষ্টির বিরতিতে দ্রুত কেটে উঁচু ও শুষ্ক ত্রিপলে ঢেকে রাখুন।',
          en: 'If 80% of grain is mature, harvest during dry breaks and store under waterproof tarps.',
        },
        priority: 'caution',
        priorityLabel: { bn: 'সতর্কতামূলক পরামর্শ', en: 'Caution Advisory' },
      },
      {
        id: 'sy-2',
        title: { bn: 'স্প্রে ও ইউরিয়া প্রয়োগ বিরতি', en: 'Pause Spraying & Top-Dressing' },
        detail: {
          bn: 'বৃষ্টির সময় সার বা বালাইনাশক দিলে তা জলে ভেসে নষ্ট হয়; আবহাওয়া পরিষ্কার হওয়া পর্যন্ত অপেক্ষা করুন।',
          en: 'Hold fertilizer and spray applications during showers to prevent nutrient leaching.',
        },
        priority: 'normal',
        priorityLabel: { bn: 'নিয়মিত পরিচর্যা', en: 'Routine Care' },
      },
    ],
  },
  {
    id: 'cumilla',
    name: { bn: 'চান্দিনা, কুমিল্লা', en: 'Chandina, Cumilla' },
    region: { bn: 'মধ্য-পূর্ব অঞ্চল (নমুনা)', en: 'Central-East (Sample)' },
    tempC: 28,
    feelsLikeC: 31,
    humidityPercent: 76,
    rainfallMm: 8,
    windKmh: 10,
    condition: {
      bn: 'মৃদু রোদ ও সহনীয় বাতাস',
      en: 'Mild Sun & Gentle Breeze',
    },
    warningTitle: {
      bn: 'সবজি ক্ষেতে স্বাভাবিক পরিচর্যা পরিবেশ (নমুনা)',
      en: 'Favorable Field Scouting Window (Sample)',
    },
    warningBody: {
      bn: 'আজ বাতাসের গতি কম ও আবহাওয়া সহনীয় রয়েছে—সবজি ও ধানের ক্ষেত পরিদর্শন ও আগাছা দমনের জন্য উপযোগী সময়।',
      en: 'Calm winds and moderate humidity provide a good window for weeding, staking, and crop inspection.',
    },
    forecast: [
      { day: { bn: 'আজ', en: 'Today' }, condition: { bn: 'আংশিক রোদ', en: 'Mild Sun' }, icon: 'sun', tempMax: 28, tempMin: 20, rainChance: 20 },
      { day: { bn: 'আগামীকাল', en: 'Tomorrow' }, condition: { bn: 'মেঘলা', en: 'Cloudy' }, icon: 'cloud', tempMax: 27, tempMin: 20, rainChance: 35 },
      { day: { bn: 'পরশু', en: 'Day 3' }, condition: { bn: 'হালকা বৃষ্টি', en: 'Light Rain' }, icon: 'cloud-rain', tempMax: 26, tempMin: 19, rainChance: 55 },
      { day: { bn: '৪র্থ দিন', en: 'Day 4' }, condition: { bn: 'রোদ', en: 'Sunny' }, icon: 'sun', tempMax: 29, tempMin: 20, rainChance: 15 },
      { day: { bn: '৫ম দিন', en: 'Day 5' }, condition: { bn: 'রোদ', en: 'Sunny' }, icon: 'sun', tempMax: 30, tempMin: 20, rainChance: 10 },
    ],
    farmingGuidance: [
      {
        id: 'cm-1',
        title: { bn: 'টমেটো ও বেগুন ক্ষেতে মাচা সংস্কার', en: 'Check Vegetable Stakes' },
        detail: {
          bn: 'ফল ধরা টমেটো গাছ হেলে পড়া রোধ করতে খুঁটি ও বাঁধন পরীক্ষা করে নিন।',
          en: 'Reinforce bamboo stakes on fruiting tomato and eggplant rows before mid-week showers.',
        },
        priority: 'normal',
        priorityLabel: { bn: 'নিয়মিত পরিচর্যা', en: 'Routine Care' },
      },
      {
        id: 'cm-2',
        title: { bn: 'সমন্বিত বালাই ব্যবস্থাপনা (IPM)', en: 'Integrated Pest Monitoring' },
        detail: {
          bn: 'জমিতে ফেরোমন ফাঁদ ও হলুদ আঠালো ফাঁদ ঠিক আছে কিনা পরীক্ষা করুন।',
          en: 'Inspect pheromone traps and yellow sticky cards to monitor pests without unnecessary sprays.',
        },
        priority: 'normal',
        priorityLabel: { bn: 'নিয়মিত পরিচর্যা', en: 'Routine Care' },
      },
    ],
  },
  {
    id: 'rangpur',
    name: { bn: 'মিঠাপুকুর, রংপুর', en: 'Mithapukur, Rangpur' },
    region: { bn: 'তিস্তা অববাহিকা (নমুনা)', en: 'Teesta Basin (Sample)' },
    tempC: 23,
    feelsLikeC: 24,
    humidityPercent: 88,
    rainfallMm: 4,
    windKmh: 9,
    condition: {
      bn: 'শীতল সকাল ও ঘন কুয়াশার সম্ভাবনা',
      en: 'Cool Morning · Fog Advisory',
    },
    warningTitle: {
      bn: 'শীতল কুয়াশা ও আলু মড়ক সতর্কতা প্রদর্শনী (নমুনা)',
      en: 'Sample Fog & Potato Blight Watch',
    },
    warningBody: {
      bn: 'রাতের তাপমাত্রা কম ও সকালের আর্দ্রতা ৮৮% থাকায় আলু ও টমেটো ক্ষেতে নাবি ধসা (মড়ক) রোগের ঝুঁকি বাড়তে পারে।',
      en: 'Cool nights and 88% morning humidity elevate late blight watch levels for winter potato and tomato plots.',
    },
    forecast: [
      { day: { bn: 'আজ', en: 'Today' }, condition: { bn: 'কুয়াশাচ্ছন্ন', en: 'Misty' }, icon: 'cloud', tempMax: 23, tempMin: 14, rainChance: 20 },
      { day: { bn: 'আগামীকাল', en: 'Tomorrow' }, condition: { bn: 'কুয়াশা ও মেঘ', en: 'Foggy' }, icon: 'cloud', tempMax: 22, tempMin: 13, rainChance: 25 },
      { day: { bn: 'পরশু', en: 'Day 3' }, condition: { bn: 'হালকা রোদ', en: 'Mild Sun' }, icon: 'sun', tempMax: 25, tempMin: 14, rainChance: 10 },
      { day: { bn: '৪র্থ দিন', en: 'Day 4' }, condition: { bn: 'রৌদ্রোজ্জ্বল', en: 'Sunny' }, icon: 'sun', tempMax: 26, tempMin: 15, rainChance: 5 },
      { day: { bn: '৫ম দিন', en: 'Day 5' }, condition: { bn: 'আংশিক মেঘলা', en: 'Partly Cloudy' }, icon: 'cloud', tempMax: 25, tempMin: 15, rainChance: 15 },
    ],
    farmingGuidance: [
      {
        id: 'rp-1',
        title: { bn: 'আলু ক্ষেতে নিয়মিত পরিদর্শন', en: 'Daily Potato Canopy Check' },
        detail: {
          bn: 'বেলা ১০টার পর কুয়াশা কাটলে পাতার নিচে ও কিনারায় পানি-ভেজা দাগ আছে কিনা দেখুন।',
          en: 'Inspect leaf undersides after 10 AM fog clears for any water-soaked lesions.',
        },
        priority: 'caution',
        priorityLabel: { bn: 'সতর্কতামূলক পরামর্শ', en: 'Caution Advisory' },
      },
      {
        id: 'rp-2',
        title: { bn: 'হালকা সেচ নিয়ন্ত্রণ', en: 'Moderate Irrigation Only' },
        detail: {
          bn: 'কুয়াশাচ্ছন্ন দিনে অতিরিক্ত সেচ দিলে মাটি দীর্ঘক্ষণ ভেজা থাকে, তাই প্রয়োজন ছাড়া সেচ দেবেন না।',
          en: 'Avoid over-irrigating during foggy spells so soil surfaces dry properly.',
        },
        priority: 'normal',
        priorityLabel: { bn: 'নিয়মিত পরিচর্যা', en: 'Routine Care' },
      },
    ],
  },
];

export const INITIAL_HISTORY: HistoryRecord[] = [
  {
    id: 'hist-101',
    date: { bn: '১৮ নভেম্বর ২০২৬', en: '18 Nov 2026' },
    isoDate: '2026-11-18',
    districtId: 'bogura',
    districtName: { bn: 'বগুড়া সদর', en: 'Bogura Sadar' },
    crop: 'rice',
    cropLabel: { bn: 'ধান', en: 'Rice' },
    profileId: 'profile-rice-blast',
    diseaseName: { bn: 'ধানের পাতা ব্লাস্ট রোগ (নমুনা)', en: 'Rice Leaf Blast (Sample)' },
    severity: 'high',
    severityLabel: { bn: 'উচ্চ সতর্কতা', en: 'High Attention' },
    imageUrl: ASSETS.riceBlast,
    notes: {
      bn: 'উত্তর দিকের প্লটে পাতায় চোখের মতো দাগ দেখা গেছে; কৃষি অফিসের পরামর্শ অনুযায়ী সার সমন্বয়।',
      en: 'Spindle spots noted on north plot; balanced potash advisory followed.',
    },
  },
  {
    id: 'hist-102',
    date: { bn: '১৫ নভেম্বর ২০২৬', en: '15 Nov 2026' },
    isoDate: '2026-11-15',
    districtId: 'rangpur',
    districtName: { bn: 'মিঠাপুকুর, রংপুর', en: 'Mithapukur, Rangpur' },
    crop: 'potato',
    cropLabel: { bn: 'আলু', en: 'Potato' },
    profileId: 'profile-potato-blight',
    diseaseName: { bn: 'আলুর নাবি ধসা / মড়ক (নমুনা)', en: 'Potato Late Blight (Sample)' },
    severity: 'high',
    severityLabel: { bn: 'উচ্চ সতর্কতা', en: 'High Attention' },
    imageUrl: ASSETS.potatoBlight,
    notes: {
      bn: 'সকালের কুয়াশার পর পাতার কিনারায় কালচে দাগ; সেচ সাময়িক বিরতি ও কৃষি অফিসারকে প্রদর্শন।',
      en: 'Water-soaked edges seen after dense fog; irrigation paused and local officer notified.',
    },
  },
  {
    id: 'hist-103',
    date: { bn: '১১ নভেম্বর ২০২৬', en: '11 Nov 2026' },
    isoDate: '2026-11-11',
    districtId: 'cumilla',
    districtName: { bn: 'চান্দিনা, কুমিল্লা', en: 'Chandina, Cumilla' },
    crop: 'tomato',
    cropLabel: { bn: 'টমেটো', en: 'Tomato' },
    profileId: 'profile-tomato-blight',
    diseaseName: { bn: 'টমেটোর আগাম ধসা (নমুনা)', en: 'Tomato Early Blight (Sample)' },
    severity: 'moderate',
    severityLabel: { bn: 'মাঝারি সতর্কতা', en: 'Moderate Watch' },
    imageUrl: ASSETS.tomatoBlight,
    notes: {
      bn: 'নিচের পাতায় বৃত্তাকার দাগ; আক্রান্ত পাতা ছাঁটাই ও গোড়ায় খড়ের মাল্চিং।',
      en: 'Concentric spots on lower foliage; pruned affected leaves and added straw mulch.',
    },
  },
  {
    id: 'hist-104',
    date: { bn: '০৬ নভেম্বর ২০২৬', en: '06 Nov 2026' },
    isoDate: '2026-11-06',
    districtId: 'bogura',
    districtName: { bn: 'বগুড়া সদর', en: 'Bogura Sadar' },
    crop: 'eggplant',
    cropLabel: { bn: 'বেগুন', en: 'Eggplant' },
    profileId: 'profile-eggplant-spot',
    diseaseName: { bn: 'বেগুনের পাতা দাগ রোগ (নমুনা)', en: 'Eggplant Leaf Spot (Sample)' },
    severity: 'moderate',
    severityLabel: { bn: 'মাঝারি সতর্কতা', en: 'Moderate Watch' },
    imageUrl: ASSETS.tomatoBlight,
    notes: {
      bn: 'পানি নিষ্কাশন নালা পরিষ্কার করা হয়েছে এবং আগাছা সরানো হয়েছে।',
      en: 'Drainage trenches cleared and lower weeds removed.',
    },
  },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    category: { bn: 'স্বাগতম বার্তা (নমুনা)', en: 'Sample Greeting' },
    timestamp: { bn: '০৯:০০ পূর্বাহ্ণ', en: '09:00 AM' },
    text: {
      bn: 'আসসালামু আলাইকুম! আমি কৃষিবন্ধুর নমুনা বাংলা সহায়ক। এটি একটি প্রোটোটাইপ ডেমো—এখানে ধান, আলু, টমেটো, সার ও আবহাওয়া ভিত্তিক সাধারণ কৃষি পরামর্শ দেখতে পারবেন। নিচের যেকোনো প্রশ্ন নির্বাচন করুন বা নিজের প্রশ্ন লিখুন।',
      en: 'Welcome to KrishiBondhu Sample Assistant! This is an offline prototype demonstration providing curated guidance on rice, potato, tomato care, and weather planning. Pick a suggested question below or type your own.',
    },
  },
  {
    id: 'msg-2',
    sender: 'farmer',
    timestamp: { bn: '০৯:০২ পূর্বাহ্ণ', en: '09:02 AM' },
    text: {
      bn: 'আগামীকাল হালকা বৃষ্টির পূর্বাভাস আছে। আজ কি ধানের জমিতে ইউরিয়া সার দেওয়া ঠিক হবে?',
      en: 'Light rain is forecasted tomorrow. Should I apply urea fertilizer to my paddy field today?',
    },
  },
  {
    id: 'msg-3',
    sender: 'assistant',
    category: { bn: 'নমুনা আবহাওয়া ও সার পরামর্শ', en: 'Sample Fertilizer Advice' },
    timestamp: { bn: '০৯:০২ পূর্বাহ্ণ', en: '09:02 AM' },
    text: {
      bn: 'ভারী বা মাঝারি বৃষ্টির আগে ইউরিয়া সার দিলে সার পানিতে ধুয়ে অপচয় হতে পারে। আবহাওয়া শুষ্ক থাকলে এবং জমিতে ছিপছিপে পানি থাকলে সার প্রয়োগ করা ভালো। পাশাপাশি অতিরিক্ত ইউরিয়া এড়িয়ে সুষম মাত্রায় সার দিলে ধানের ব্লাস্ট রোগের ঝুঁকি কমে।',
      en: 'Applying urea right before rain increases nutrient runoff and waste. Wait for a calm, dry window with shallow standing water. Avoiding excess urea also lowers the risk of Rice Leaf Blast.',
    },
  },
];

export const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  {
    id: 'sq-1',
    keywords: ['ধান', 'ব্লাস্ট', 'দাগ', 'পাতা', 'rice', 'blast', 'spot'],
    prompt: {
      bn: 'ধানের পাতায় চোখের মতো বাদামি দাগ পড়লে কী করব?',
      en: 'What should I do if paddy leaves show diamond-shaped brown spots?',
    },
    answer: {
      bn: 'চোখের বা মাকু আকৃতির ধূসর কেন্দ্রযুক্ত বাদামি দাগ ধানের ব্লাস্ট রোগের লক্ষণ হতে পারে। প্রথমত: জমিতে অতিরিক্ত ইউরিয়া সার দেওয়া বন্ধ রাখুন এবং পটাশ সারের ভারসাম্য যাচাই করুন। দ্বিতীয়ত: আগাছা পরিষ্কার রাখুন। কোনো ছত্রাকনাশক ব্যবহারের আগে নিকটস্থ উপসহকারী কৃষি কর্মকর্তা বা ১৬১২৩ নম্বরে কল করে নিশ্চিত পরামর্শ নিন।',
      en: 'Diamond-shaped lesions with gray centers can indicate Rice Leaf Blast. Pause excess urea top-dressing, check potassium balance, clear grassy weeds, and consult your Upazila Agriculture Officer or call 16123 before spraying any fungicide.',
    },
  },
  {
    id: 'sq-2',
    keywords: ['আলু', 'মড়ক', 'কুয়াশা', 'ধসা', 'potato', 'blight', 'fog'],
    prompt: {
      bn: 'ঘন কুয়াশায় আলুর মড়ক রোগ প্রতিরোধের উপায় কী?',
      en: 'How can I protect potato crops from late blight during winter fog?',
    },
    answer: {
      bn: 'ঘন কুয়াশা ও আর্দ্র আবহাওয়ায় আলুর মড়ক রোগ দ্রুত ছড়ায়। প্রতিদিন সকালে ক্ষেত পর্যবেক্ষণ করুন, অতিরিক্ত সেচ দেবেন না এবং গাছের গোড়ায় পর্যাপ্ত মাটি তুলে দিন। পাতায় পানি-ভেজা কালচে দাগ দেখামাত্র স্থানীয় কৃষি অফিসের নির্দেশনায় দ্রুত ব্যবস্থা নিন।',
      en: 'Late blight accelerates in dense winter fog. Inspect lower foliage daily, avoid excess irrigation, ensure proper soil hilling around tubers, and contact your local agriculture extension office immediately if water-soaked lesions appear.',
    },
  },
  {
    id: 'sq-3',
    keywords: ['বৃষ্টি', 'স্প্রে', 'সার', 'আবহাওয়া', 'rain', 'spray', 'weather', 'fertilizer'],
    prompt: {
      bn: 'বৃষ্টির আগে কীটনাশক বা ছত্রাকনাশক স্প্রে করা কি উচিত?',
      en: 'Should I spray crop protection inputs before forecasted rainfall?',
    },
    answer: {
      bn: 'না—বৃষ্টির ৪ থেকে ৬ ঘণ্টার মধ্যে স্প্রে করলে ওষুধ ধুয়ে মাটিতে ও পানিতে মিশে যায়, যা ফসলের কোনো উপকারে আসে না বরং খরচ বাড়ায় ও পরিবেশের ক্ষতি করে। সবসময় আবহাওয়া পরামর্শ দেখে রোদ ও কম বাতাসের সময় বেছে নিন।',
      en: 'No—spraying within 4–6 hours before rain washes inputs away, wasting money and harming soil/water ecosystems. Check weather guidance first and wait for a dry, low-wind morning or late afternoon window.',
    },
  },
  {
    id: 'sq-4',
    keywords: ['টমেটো', 'বেগুন', 'মাল্চিং', 'সবজি', 'tomato', 'eggplant', 'mulch'],
    prompt: {
      bn: 'টমেটো ও বেগুনের পাতায় দাগ কমাতে ঘরোয়া ও টেকসই উপায় কী?',
      en: 'What sustainable steps reduce leaf spots on tomato and eggplant?',
    },
    answer: {
      bn: 'গাছের গোড়ায় শুকনো খড়ের মাল্চিং দিন যেন সেচ বা বৃষ্টির মাটি ছিটে পাতায় না লাগে। নিচের পুরোনো দাগযুক্ত পাতা ছাঁটাই করে সরিয়ে ফেলুন, সকালে সরাসরি গাছের গোড়ায় পানি দিন এবং একই জমিতে বারবার টমেটো/আলু চাষ না করে শস্য পর্যায় মেনে চলুন।',
      en: 'Place straw mulch at the plant base to prevent soil splash, prune spotted lower leaves, water directly at roots in the morning, and rotate crops across seasons.',
    },
  },
  {
    id: 'sq-5',
    keywords: ['কৃষি অফিস', '১৬১২৩', 'কর্মকর্তা', 'যোগাযোগ', 'expert', 'officer', '16123', 'help'],
    prompt: {
      bn: 'উপজেলা কৃষি অফিস বা ১৬১২৩ নম্বরের সাথে কখন যোগাযোগ করব?',
      en: 'When should I contact the Upazila Agriculture Office or 16123?',
    },
    answer: {
      bn: 'যেকোনো নতুন বা দ্রুত ছড়ানো রোগের লক্ষণ দেখলে, অথবা কোনো রাসায়নিক বালাইনাশক কেনার ও স্প্রে করার আগে অবশ্যই আপনার ইউনিয়নের উপসহকারী কৃষি কর্মকর্তা (SAAO) অথবা সরকারি কৃষি কল সেন্টার ১৬১২৩-এ কথা বলুন। সঠিক মাত্রা জানলে খরচ ও পরিবেশগত ঝুঁকি দুটোই কমে।',
      en: 'Contact your local Sub-Assistant Agriculture Officer (SAAO) or dial 16123 whenever you notice spreading symptoms and always before buying or mixing chemical treatments. Proper diagnosis saves cost and protects soil health.',
    },
  },
  {
    id: 'sq-6',
    keywords: ['সেচ', 'পানি', 'খরা', 'awd', 'irrigation', 'water', 'dry'],
    prompt: {
      bn: 'ধান ও সবজি ক্ষেতে কখন ও কীভাবে সাশ্রয়ী সেচ দেব?',
      en: 'When and how should I schedule water-saving irrigation?',
    },
    answer: {
      bn: 'বোরো ধানে পর্যায়ক্রমিক ভেজানো ও শুকানো (AWD) পদ্ধতিতে সেচ দিলে ২৫-৩০% পর্যন্ত পানি ও জ্বালানি খরচ সাশ্রয় হয়। সবজি ক্ষেতে দুপুরের প্রখর রোদের বদলে সকাল বা বিকেলে গাছের গোড়ায় সেচ দিন এবং বৃষ্টির পূর্বাভাস থাকলে সেচ স্থগিত রাখুন।',
      en: 'Using Alternate Wetting and Drying (AWD) in Boro rice can reduce irrigation water and fuel costs. For vegetables, irrigate at the root zone in early morning or late afternoon and pause watering before forecasted rain.',
    },
  },
  {
    id: 'sq-7',
    keywords: ['সার', 'ইউরিয়া', 'পটাশ', 'টিএসপি', 'fertilizer', 'urea', 'potash', 'nutrient'],
    prompt: {
      bn: 'বোরো ধানে ইউরিয়া ও পটাশ সার কখন ও কীভাবে প্রয়োগ করা ভালো?',
      en: 'When is the best time to apply urea and potash in Boro rice?',
    },
    answer: {
      bn: 'ইউরিয়া সার একবারে না দিয়ে রোপণের ১৫-২০ দিন, ৩০-৩৫ দিন এবং ৪৫-৫০ দিন পর তিন কিস্তিতে প্রয়োগ করা উত্তম। লিফ কালার চার্ট (LCC) দেখে পাতার রঙ অনুযায়ী মাত্রা ঠিক করুন এবং জমি তৈরির সময় সুষম পটাশ ও ফসফরাস নিশ্চিত করুন।',
      en: 'Apply urea in three split doses rather than all at once, guided by a Leaf Color Chart (LCC), alongside balanced basal phosphate and potash to improve stem strength and lower blast risk.',
    },
  },
];

export const CROP_CALENDAR_SCHEDULES: Record<CropKey, CropCalendarSchedule> = {
  rice: {
    crop: 'rice',
    cropLabel: { bn: 'ধান (বোরো / আমন)', en: 'Rice (Boro / Aman)' },
    seasonSummary: {
      bn: 'নমুনা ১৪০ দিনের বোরো ধান পরিচর্যা সূচি (বগুড়া অঞ্চল মডেল)',
      en: 'Sample 140-day Boro paddy schedule (Bogura model)',
    },
    durationDays: 140,
    tasks: [
      {
        id: 'cal-rice-1',
        stage: { bn: 'বীজতলা ও প্রস্তুতি', en: 'Seedbed Prep' },
        dayRange: { bn: 'দিন ১ – ২৫', en: 'Days 1 – 25' },
        title: { bn: 'সুস্থ বীজ শোধন ও আদর্শ বীজতলা তৈরি', en: 'Seed selection & raised nursery bed' },
        detail: {
          bn: 'অনুমোদিত সহনশীল জাত নির্বাচন করে ছায়ামুক্ত স্থানে বীজতলা তৈরি ও হালকা সেচ দিন।',
          en: 'Choose blast-tolerant certified seed and maintain shallow nursery moisture.',
        },
        reminderText: {
          bn: 'বীজতলায় রোপণের আগে চারা শক্ত আছে কিনা যাচাই করুন।',
          en: 'Check seedling vigor before transplanting.',
        },
        defaultDone: true,
      },
      {
        id: 'cal-rice-2',
        stage: { bn: 'চারা রোপণ', en: 'Transplanting' },
        dayRange: { bn: 'দিন ২৬ – ৩৫', en: 'Days 26 – 35' },
        title: { bn: 'সারিবদ্ধ রোপণ ও লোগো পদ্ধতি অনুসরণ', en: 'Line transplanting with proper spacing' },
        detail: {
          bn: '২০×২০ সেমি দূরত্বে ২-৩টি চারা রোপণ করুন যাতে বাতাস ও আলো সহজে পৌঁছায়।',
          en: 'Space hills at 20×20 cm so airflow reduces humidity buildup.',
        },
        reminderText: {
          bn: 'প্রতি ১০ সারি পর ১ সারি ফাঁকা রাখলে পরিচর্যা ও বাতাস চলাচল সহজ হয়।',
          en: 'Leave aeration alleys every 10 rows for easier scouting.',
        },
        defaultDone: true,
      },
      {
        id: 'cal-rice-3',
        stage: { bn: 'কুশি ও সার প্রয়োগ', en: 'Tillering & Top-Dress' },
        dayRange: { bn: 'দিন ৪০ – ৬৫', en: 'Days 40 – 65' },
        title: { bn: 'আগাছা দমন ও সুষম ইউরিয়া-পটাশ সমন্বয়', en: 'Weeding & balanced fertilizer split' },
        detail: {
          bn: 'লিফ কালার চার্ট (LCC) বা কৃষি অফিসের মাত্রা দেখে কিস্তিতে সার দিন এবং AWD সেচ অনুসরণ করুন।',
          en: 'Follow balanced split urea/potash dosing and Alternate Wetting & Drying (AWD).',
        },
        reminderText: {
          bn: 'বৃষ্টির পূর্বাভাস থাকলে ইউরিয়া প্রয়োগ ১-২ দিন পিছিয়ে দিন।',
          en: 'Delay urea top-dressing if rain is forecast within 24 hours.',
        },
        defaultDone: false,
      },
      {
        id: 'cal-rice-4',
        stage: { bn: 'থোড় ও ফুল অবস্থা', en: 'Panicle Initiation' },
        dayRange: { bn: 'দিন ৭৫ – ১০৫', en: 'Days 75 – 105' },
        title: { bn: 'ব্লাস্ট রোগ ও মাজরা পোকা পর্যবেক্ষণ', en: 'Blast & stem borer scouting' },
        detail: {
          bn: 'সকালে পাতার দাগ পরীক্ষা করুন; প্রয়োজন হলে ১৬১২৩ বা উপসহকারী কৃষি কর্মকর্তার পরামর্শ নিন।',
          en: 'Inspect leaves in the morning and verify symptoms with 16123 if spots spread.',
        },
        reminderText: {
          bn: 'আর্দ্রতা ৮৫%-এর উপরে গেলে থোড় অবস্থায় বাড়তি সতর্কতা নিন।',
          en: 'Increase morning canopy checks if humidity stays above 85%.',
        },
        defaultDone: false,
      },
      {
        id: 'cal-rice-5',
        stage: { bn: 'ফসল সংগ্রহ', en: 'Harvesting' },
        dayRange: { bn: 'দিন ১২০ – ১৪০', en: 'Days 120 – 140' },
        title: { bn: '৮০% ধান পাকলে নিরাপদ আবহাওয়ায় কাটা', en: 'Harvest at 80% golden maturity' },
        detail: {
          bn: 'রোদেলা দিনে ধান কেটে মাড়াই ও শুকিয়ে আর্দ্রতা ১২% এর নিচে সংরক্ষণ করুন।',
          en: 'Harvest on clear days and dry grain below 12% moisture for safe storage.',
        },
        reminderText: {
          bn: 'কাটার আগে ৫ দিনের আবহাওয়া পূর্বাভাস দেখে ত্রিপল প্রস্তুত রাখুন।',
          en: 'Check the 5-day rain forecast and keep drying tarps ready.',
        },
        defaultDone: false,
      },
    ],
  },
  potato: {
    crop: 'potato',
    cropLabel: { bn: 'আলু (শীতকালীন রবি)', en: 'Potato (Winter Rabi)' },
    seasonSummary: {
      bn: 'নমুনা ৯৫ দিনের আলু চাষ ও মড়ক প্রতিরোধ সূচি',
      en: 'Sample 95-day potato cultivation & blight watch schedule',
    },
    durationDays: 95,
    tasks: [
      {
        id: 'cal-pot-1',
        stage: { bn: 'বীজ ও রোপণ', en: 'Seed & Planting' },
        dayRange: { bn: 'দিন ১ – ১৫', en: 'Days 1 – 15' },
        title: { bn: 'প্রত্যয়িত বীজ আলু শোধন ও ভেলি তৈরি', en: 'Certified seed tubers & ridge planting' },
        detail: {
          bn: 'রোগমুক্ত BADC বা অনুমোদিত বীজ আলু ৬০×২৫ সেমি দূরত্বে রোপণ করুন।',
          en: 'Plant disease-free seed tubers on raised ridges for proper drainage.',
        },
        reminderText: {
          bn: 'রোপণের সময় মাটিতে অতিরিক্ত কাদা না থাকে তা নিশ্চিত করুন।',
          en: 'Avoid planting in waterlogged soil.',
        },
        defaultDone: true,
      },
      {
        id: 'cal-pot-2',
        stage: { bn: 'গোড়ায় মাটি তোলা', en: 'Earthing Up' },
        dayRange: { bn: 'দিন ৩০ – ৪০', en: 'Days 30 – 40' },
        title: { bn: 'আগাছা পরিষ্কার ও গাছের গোড়ায় মাটি দেওয়া', en: 'Weeding & soil hilling' },
        detail: {
          bn: 'হালকা সেচের পর গাছের গোড়ায় উঁচু করে মাটি তুলে দিন যেন কন্দ রোদে সবুজ না হয়।',
          en: 'Hill soil around stems so developing tubers remain covered.',
        },
        reminderText: {
          bn: 'দুপুরের পরিবর্তে সকাল বা বিকেলে হালকা সেচ দিন।',
          en: 'Irrigate lightly in morning or late afternoon.',
        },
        defaultDone: false,
      },
      {
        id: 'cal-pot-3',
        stage: { bn: 'কুয়াশা ও মড়ক নজরদারি', en: 'Fog & Blight Watch' },
        dayRange: { bn: 'দিন ৪৫ – ৭৫', en: 'Days 45 – 75' },
        title: { bn: 'ঘন কুয়াশায় প্রতিদিন পাতা পরীক্ষা', en: 'Daily late blight scouting' },
        detail: {
          bn: 'সকালে কুয়াশা কাটলে নিচের পাতায় কালচে পানি-ভেজা দাগ আছে কিনা দেখুন।',
          en: 'Check leaf undersides after fog clears for water-soaked blotches.',
        },
        reminderText: {
          bn: 'কুয়াশার সময় অপ্রয়োজনীয় সেচ বন্ধ রাখুন এবং কৃষি অফিসের সাথে যোগাযোগ রাখুন।',
          en: 'Pause unnecessary irrigation during prolonged dense fog.',
        },
        defaultDone: false,
      },
      {
        id: 'cal-pot-4',
        stage: { bn: 'হাল্ম পুলিং ও সংগ্রহ', en: 'Dehaulming & Harvest' },
        dayRange: { bn: 'দিন ৮০ – ৯৫', en: 'Days 80 – 95' },
        title: { bn: 'খোসা শক্ত করে আলু উত্তোলন ও বাছাই', en: 'Skin curing & sorting harvest' },
        detail: {
          bn: 'সংগ্রহের ৭-১০ দিন আগে গাছ কেটে দিলে আলুর ত্বক শক্ত হয় ও সংরক্ষণ ক্ষমতা বাড়ে।',
          en: 'Cut haulms 7–10 days before digging to toughen tuber skin.',
        },
        reminderText: {
          bn: 'কাটা বা পচা আলু আলাদা করে ভালো আলু শুষ্ক ও বাতাসযুক্ত ঘরে রাখুন।',
          en: 'Sort bruised tubers out before cool ventilated storage.',
        },
        defaultDone: false,
      },
    ],
  },
  tomato: {
    crop: 'tomato',
    cropLabel: { bn: 'টমেটো', en: 'Tomato' },
    seasonSummary: {
      bn: 'নমুনা ১১০ দিনের টমেটো চাষ ও পাতা দাগ নিয়ন্ত্রণ সূচি',
      en: 'Sample 110-day tomato staking & leaf-spot prevention schedule',
    },
    durationDays: 110,
    tasks: [
      {
        id: 'cal-tom-1',
        stage: { bn: 'চারা রোপণ ও মাল্চিং', en: 'Transplant & Mulch' },
        dayRange: { bn: 'দিন ১ – ২০', en: 'Days 1 – 20' },
        title: { bn: 'উঁচু বেডে চারা রোপণ ও খড়ের মাল্চিং', en: 'Raised-bed transplanting & straw mulch' },
        detail: {
          bn: '২৫-৩০ দিনের সুস্থ চারা রোপণ করে গোড়ায় শুকনো খড় বিছিয়ে দিন।',
          en: 'Transplant healthy seedlings and add dry straw mulch to prevent soil splash.',
        },
        reminderText: {
          bn: 'চারা লাগানোর প্রথম সপ্তাহে বিকেলে হালকা পানি দিন।',
          en: 'Water lightly at the root base during the first week.',
        },
        defaultDone: true,
      },
      {
        id: 'cal-tom-2',
        stage: { bn: 'খুঁটি ও ডাল ছাঁটাই', en: 'Staking & Pruning' },
        dayRange: { bn: 'দিন ২৫ – ৫০', en: 'Days 25 – 50' },
        title: { bn: 'বাঁশের খুঁটি স্থাপন ও নিচের পাতা ছাঁটাই', en: 'Bamboo staking & lower leaf pruning' },
        detail: {
          bn: 'গাছ মাটি থেকে ওপরে রাখুন এবং মাটির কাছের বয়স্ক/দাগযুক্ত পাতা সাবধানে সরান।',
          en: 'Tie plants to bamboo stakes and remove soil-touching lower leaves.',
        },
        reminderText: {
          bn: 'হলুদ আঠালো ফাঁদ বসিয়ে সাদামাছি পর্যবেক্ষণ করুন।',
          en: 'Monitor whiteflies using yellow sticky traps.',
        },
        defaultDone: false,
      },
      {
        id: 'cal-tom-3',
        stage: { bn: 'ফুল ও ফল ধারণ', en: 'Flowering & Fruiting' },
        dayRange: { bn: 'দিন ৫৫ – ৮৫', en: 'Days 55 – 85' },
        title: { bn: 'নিয়মিত সেচ ও আগাম ধসা পর্যবেক্ষণ', en: 'Consistent root watering & blight check' },
        detail: {
          bn: 'পাতার ওপর পানি না ছিটিয়ে সরাসরি গোড়ায় সেচ দিন যেন ফল ফাটা ও ছত্রাক কমে।',
          en: 'Irrigate roots in the morning and inspect leaves for concentric spots.',
        },
        reminderText: {
          bn: 'বৃষ্টি হলে বেডের পাশের নালা পরিষ্কার রাখুন।',
          en: 'Keep furrow drainage clear after showers.',
        },
        defaultDone: false,
      },
      {
        id: 'cal-tom-4',
        stage: { bn: 'ফল সংগ্রহ', en: 'Harvesting' },
        dayRange: { bn: 'দিন ৯০ – ১১০', en: 'Days 90 – 110' },
        title: { bn: 'পর্যায়ক্রমে পাকা টমেটো সংগ্রহ ও গ্রেডিং', en: 'Staggered harvest & grading' },
        detail: {
          bn: 'সকালের ঠান্ডা সময়ে টমেটো তুলে ছায়ায় প্লাস্টিকের ক্যারেটে সংরক্ষণ করুন।',
          en: 'Pick in cool morning hours and store in ventilated crates.',
        },
        reminderText: {
          bn: 'আক্রান্ত ফল ক্ষেতে না ফেলে আলাদা স্থানে সরিয়ে রাখুন।',
          en: 'Remove damaged fruit from rows to keep pests down.',
        },
        defaultDone: false,
      },
    ],
  },
  eggplant: {
    crop: 'eggplant',
    cropLabel: { bn: 'বেগুন', en: 'Eggplant' },
    seasonSummary: {
      bn: 'নমুনা ১২০ দিনের বেগুন চাষ ও সমন্বিত বালাই ব্যবস্থাপনা সূচি',
      en: 'Sample 120-day eggplant & IPM schedule',
    },
    durationDays: 120,
    tasks: [
      {
        id: 'cal-egg-1',
        stage: { bn: 'বেড ও রোপণ', en: 'Bed & Planting' },
        dayRange: { bn: 'দিন ১ – ২০', en: 'Days 1 – 20' },
        title: { bn: 'পানি নিষ্কাশনযোগ্য বেডে চারা রোপণ', en: 'Well-drained bed transplanting' },
        detail: {
          bn: '৭৫×৬০ সেমি দূরত্বে সুস্থ চারা লাগিয়ে জৈব সার প্রয়োগ করুন।',
          en: 'Transplant seedlings at 75×60 cm spacing with composted organic matter.',
        },
        reminderText: {
          bn: 'জমিতে যেন পানি না জমে সেদিকে নজর রাখুন।',
          en: 'Ensure standing rainwater drains freely.',
        },
        defaultDone: true,
      },
      {
        id: 'cal-egg-2',
        stage: { bn: 'ফেরোমন ফাঁদ স্থাপন', en: 'Pheromone Traps' },
        dayRange: { bn: 'দিন ৩০ – ৬০', en: 'Days 30 – 60' },
        title: { bn: 'ডগা ও ফল ছিদ্রকারী পোকা দমনে ফেরোমন ফাঁদ', en: 'Install pheromone traps for shoot borer' },
        detail: {
          bn: 'প্রতি বিঘায় ৩-৪টি ফেরোমন ফাঁদ বসান এবং আক্রান্ত ডগা হাত দিয়ে ভেঙে পুঁতে ফেলুন।',
          en: 'Place 3–4 pheromone traps per bigha and clip infested shoots early.',
        },
        reminderText: {
          bn: 'সপ্তাহে একবার ফাঁদের সাবান-পানি পরিবর্তন করুন।',
          en: 'Refresh trap soapy water weekly.',
        },
        defaultDone: false,
      },
      {
        id: 'cal-egg-3',
        stage: { bn: 'ফল সংগ্রহ ও পরিচর্যা', en: 'Harvest & Pruning' },
        dayRange: { bn: 'দিন ৬৫ – ১২০', en: 'Days 65 – 120' },
        title: { bn: 'নিয়মিত ফসল তোলা ও পাতার দাগ পর্যবেক্ষণ', en: 'Regular harvest & leaf-spot check' },
        detail: {
          bn: 'কচি অবস্থায় বেগুন সংগ্রহ করুন এবং নিচের শুকনো পাতা ছাঁটাই করুন।',
          en: 'Harvest tender fruits regularly and prune old lower leaves.',
        },
        reminderText: {
          bn: 'পাতার দাগ বাড়লে ১৬১২৩-এ যোগাযোগ করে পরামর্শ নিন।',
          en: 'Consult 16123 if leaf spots spread across upper foliage.',
        },
        defaultDone: false,
      },
    ],
  },
};

export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, { bn: string; en: string; color: string }> = {
  seed: { bn: 'বীজ', en: 'Seeds', color: '#14532D' },
  fertilizer: { bn: 'সার', en: 'Fertilizer', color: '#059669' },
  irrigation: { bn: 'সেচ', en: 'Irrigation', color: '#0284C7' },
  labor: { bn: 'শ্রমিক', en: 'Labor', color: '#D97706' },
  protection: { bn: 'অন্যান্য', en: 'Other', color: '#43584B' },
};

export const INITIAL_EXPENSES: ExpenseEntry[] = [
  {
    id: 'exp-1',
    title: 'ব্রি ধান-৮৯ বীজ ও বীজতলা প্রস্তুতি (নমুনা)',
    category: 'seed',
    crop: 'rice',
    amountBdt: 3800,
    date: '2026-10-24',
  },
  {
    id: 'exp-2',
    title: 'সুষম ইউরিয়া, টিএসপি ও এমওপি সার',
    category: 'fertilizer',
    crop: 'rice',
    amountBdt: 6400,
    date: '2026-11-08',
  },
  {
    id: 'exp-3',
    title: 'নলকূপ সেচ ও নালা পরিষ্কার খরচ',
    category: 'irrigation',
    crop: 'rice',
    amountBdt: 4200,
    date: '2026-11-12',
  },
  {
    id: 'exp-4',
    title: 'চারা রোপণ ও আগাছা নিড়ানি শ্রমিক',
    category: 'labor',
    crop: 'rice',
    amountBdt: 7500,
    date: '2026-11-15',
  },
  {
    id: 'exp-5',
    title: 'ফেরোমন ফাঁদ ও জৈব বালাই ব্যবস্থাপনা',
    category: 'protection',
    crop: 'tomato',
    amountBdt: 2100,
    date: '2026-11-19',
  },
];

export const INITIAL_ESTIMATED_REVENUE_BDT = 42500;

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: { bn: 'আব্দুল করিম (নমুনা পোস্ট)', en: 'Abdul Karim (Sample Post)' },
    location: { bn: 'বগুড়া সদর, বগুড়া', en: 'Bogura Sadar, Bogura' },
    crop: 'rice',
    cropLabel: { bn: 'ধান', en: 'Rice' },
    timestamp: { bn: '২ ঘণ্টা আগে', en: '2 hours ago' },
    title: {
      bn: 'সারিবদ্ধ রোপণ ও সুষম পটাশ প্রয়োগে এবার বোরো ক্ষেত অনেক সুস্থ আছে',
      en: 'Line transplanting and balanced potash kept our Boro plot healthy',
    },
    body: {
      bn: 'গত বছর ঘন করে চারা লাগানোয় ব্লাস্টের সমস্যা হয়েছিল। এবার ১০ সারি পর ১ সারি ফাঁকা রেখে লাগিয়েছি এবং ইউরিয়া পরিমিত দিয়েছি। ভোরের কুয়াশার পরও পাতা পরিষ্কার আছে।',
      en: 'Last season dense spacing triggered leaf blast. This cycle we left aeration alleys every 10 rows and kept urea balanced—leaves look much cleaner.',
    },
    imageUrl: ASSETS.heroPaddy,
    likes: 24,
    likedByMe: false,
    expertAdvice: {
      bn: 'নমুনা কৃষি কর্মকর্তা পরামর্শ: সারিবদ্ধ রোপণ ও সুষম পটাশ সার ব্লাস্ট প্রতিরোধে কার্যকর ভূমিকা রাখে। আর্দ্রতা ৮৫% ছাড়ালে সকালের পর্যবেক্ষণ চালিয়ে যান।',
      en: 'Sample Expert Advice: Proper spacing and balanced potassium lower blast susceptibility. Keep scouting on humid mornings above 85% RH.',
    },
    comments: [
      {
        id: 'com-101',
        author: { bn: 'রফিকুল ইসলাম', en: 'Rafiqul Islam' },
        text: {
          bn: 'খুব ভালো উদ্যোগ ভাই! আমিও আগামী মৌসুমে এই লোগো পদ্ধতি ব্যবহার করব।',
          en: 'Great result! I plan to try the aeration-row layout next season too.',
        },
        timestamp: { bn: '১ ঘণ্টা আগে', en: '1 hour ago' },
      },
      {
        id: 'com-102',
        author: { bn: 'উপসহকারী কৃষি কর্মকর্তা (নমুনা)', en: 'Sample Agriculture Officer' },
        role: { bn: 'বিশেষজ্ঞ নমুনা মন্তব্য', en: 'Sample Expert Note' },
        isExpert: true,
        text: {
          bn: 'জমিতে পাতার রঙ দেখে লিফ কালার চার্ট অনুযায়ী কিস্তিতে ইউরিয়া দিলে খরচও সাশ্রয় হয়।',
          en: 'Using a Leaf Color Chart for split urea application also lowers input cost.',
        },
        timestamp: { bn: '৪৫ মিনিট আগে', en: '45 mins ago' },
      },
    ],
  },
  {
    id: 'post-2',
    authorName: { bn: 'সালমা বেগম (নমুনা পোস্ট)', en: 'Salma Begum (Sample Post)' },
    location: { bn: 'মিঠাপুকুর, রংপুর', en: 'Mithapukur, Rangpur' },
    crop: 'potato',
    cropLabel: { bn: 'আলু', en: 'Potato' },
    timestamp: { bn: 'গতকাল', en: 'Yesterday' },
    title: {
      bn: 'সকালের কুয়াশার পর আলুর নিচের পাতায় কালচে দাগ দেখে সেচ বন্ধ রেখেছি',
      en: 'Paused irrigation after spotting dark lesions on lower potato leaves',
    },
    body: {
      bn: 'রংপুরে কয়েকদিন ধরে ঘন কুয়াশা পড়ছে। পাতার কিনারায় পানি-ভেজা দাগ দেখে উপজেলা কৃষি অফিসে ছবি পাঠিয়েছি এবং পরামর্শ ছাড়া কোনো ওষুধ দিইনি।',
      en: 'Dense fog settled over Mithapukur this week. After seeing water-soaked edges on lower leaves, I held irrigation and contacted the local extension officer before spraying.',
    },
    imageUrl: ASSETS.potatoBlight,
    likes: 31,
    likedByMe: true,
    expertAdvice: {
      bn: 'নমুনা কৃষি কর্মকর্তা পরামর্শ: কুয়াশাচ্ছন্ন দিনে অতিরিক্ত সেচ বন্ধ রাখা এবং অনুমান করে স্প্রে না করে ১৬১২৩ বা কৃষি অফিসারের নির্দেশনা নেওয়া সঠিক পদক্ষেপ।',
      en: 'Sample Expert Advice: Pausing irrigation during fog and verifying with 16123 before spraying is the safest response to suspected late blight.',
    },
    comments: [
      {
        id: 'com-201',
        author: { bn: 'মাহবুব আলম', en: 'Mahbub Alam' },
        text: {
          bn: 'সচেতন সিদ্ধান্ত নেওয়ার জন্য ধন্যবাদ আপা, আমাদের এলাকায়ও কুয়াশা বাড়ছে।',
          en: 'Smart precaution—morning fog is thickening in our union as well.',
        },
        timestamp: { bn: '১৮ ঘণ্টা আগে', en: '18 hours ago' },
      },
    ],
  },
  {
    id: 'post-3',
    authorName: { bn: 'জাহিদুল হক (নমুনা পোস্ট)', en: 'Zahidul Haque (Sample Post)' },
    location: { bn: 'চান্দিনা, কুমিল্লা', en: 'Chandina, Cumilla' },
    crop: 'tomato',
    cropLabel: { bn: 'টমেটো', en: 'Tomato' },
    timestamp: { bn: '৩ দিন আগে', en: '3 days ago' },
    title: {
      bn: 'টমেটো ক্ষেতে খড়ের মাল্চিং দেওয়ায় মাটি ছিটে পাতার দাগ অনেক কমেছে',
      en: 'Straw mulching around tomato beds reduced lower leaf spotting',
    },
    body: {
      bn: 'গত বছর নিচের পাতায় আগাম ধসা ধরেছিল। এবার বাঁশের খুঁটি ও শুকনো খড়ের মাল্চিং ব্যবহার করায় এবং সকালে গোড়ায় পানি দেওয়ায় গাছ সুস্থ আছে।',
      en: 'Staking with bamboo and adding dry straw mulch prevented soil splash during morning watering.',
    },
    imageUrl: ASSETS.tomatoBlight,
    likes: 19,
    likedByMe: false,
    expertAdvice: {
      bn: 'নমুনা কৃষি কর্মকর্তা পরামর্শ: জৈব মাল্চিং মাটির আর্দ্রতা ধরে রাখে এবং Alternaria ছত্রাকের স্পোর পাতায় ছিটকে পড়া কমায়।',
      en: 'Sample Expert Advice: Organic mulching retains moisture while blocking fungal soil splash onto lower foliage.',
    },
    comments: [],
  },
];

export const DEFAULT_FARMER_PROFILE: FarmerProfile = {
  name: 'করিম মিয়া',
  mobileNumber: '01700-123456 (ডেমো)',
  districtId: 'bogura',
  upazila: 'শিবগঞ্জ',
  village: 'মহাস্থান পূর্ব পাড়া',
  preferredCrops: ['rice', 'potato'],
  primaryCrop: 'rice',
  farmingExperience: '১২ বছর',
  farmSizeBigha: 4.5,
  preferredLanguage: 'bn',
  phoneNote: 'বোরো ও রবি মৌসুম',
};

