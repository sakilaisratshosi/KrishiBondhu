import { CROP_ASSETS, CROP_CATEGORY_LABELS, CropCultivationGuide } from './types';

export const CEREAL_CROPS: CropCultivationGuide[] = [
  {
    id: 'rice',
    name: { bn: 'ধান', en: 'Rice (Paddy)' },
    aliases: ['paddy', 'dhan', 'boro', 'aman', 'aus', 'বোরো', 'আমন', 'আউশ', 'brri'],
    category: 'cereal',
    categoryLabel: CROP_CATEGORY_LABELS.cereal,
    imageUrl: CROP_ASSETS.paddyField,
    sourceType: 'verified_reference',
    waterDemandLevel: 'high',
    overview: {
      bn: 'ধান বাংলাদেশের প্রধান খাদ্যশস্য। আউশ, আমন ও বোরো—এই তিন মৌসুমে দেশজুড়ে ধানের চাষ হয়। সুস্থ চারা, সুষম সার ও নিয়ন্ত্রিত সেচ ফলন বাড়াতে সহায়তা করে।',
      en: 'Rice is the staple food crop of Bangladesh, cultivated across Aus, Aman, and Boro seasons. Healthy nursery seedlings, balanced nutrition, and controlled water management sustain resilient yields.',
    },
    suitableVarieties: {
      bn: 'বোরোতে BRRI dhan28, BRRI dhan29, BRRI dhan89, BRRI dhan92; আমনে BRRI dhan49, BRRI dhan87, Binadhan-17; আউশে BRRI dhan48 ও BRRI dhan98 জনপ্রিয়।',
      en: 'Popular Boro varieties include BRRI dhan29, BRRI dhan89, and BRRI dhan92; Aman includes BRRI dhan49, BRRI dhan87, and Binadhan-17; Aus includes BRRI dhan48 and BRRI dhan98.',
    },
    suitableRegions: {
      bn: 'বগুড়া, দিনাজপুর, নওগাঁ, ময়মনসিংহ, কুমিল্লা, সিলেট হাওরাঞ্চল ও বরিশালসহ দেশের প্রায় সব জেলায়।',
      en: 'Cultivated nationwide across Bogura, Dinajpur, Naogaon, Mymensingh, Cumilla, Sylhet haor basin, and southern coastal plains.',
    },
    seasonAndPlanting: {
      bn: 'আমন (জুলাই–আগস্ট রোপণ), বোরো (ডিসেম্বর–জানুয়ারি রোপণ) এবং আউশ (এপ্রিল–মে রোপণ)।',
      en: 'Aman (transplanted Jul–Aug), Boro (Dec–Jan), and Aus (Apr–May), matched to flood recession and temperature.',
    },
    soilAndPh: {
      bn: 'পানি ধরে রাখতে পারে এমন এঁটেল-দোআঁশ ও পলি-দোআঁশ মাটি সবচেয়ে ভালো; আদর্শ মাটির অম্ল-ক্ষার মাত্রা প্রায় pH ৫.৫ থেকে ৭.০।',
      en: 'Moisture-retentive clay-loam and silty-loam floodplain soils; preferred soil reaction sits around pH 5.5 to 7.0.',
    },
    landPreparation: {
      bn: 'জমিতে পরিমিত পানি দিয়ে ২–৩ বার চাষ ও মই দিয়ে কাদা তৈরি (puddling) করুন, আগাছা পচিয়ে ফেলুন এবং আইল মেরামত করে জমি সমতল করুন।',
      en: 'Plough 2–3 times under wet conditions, puddle and level evenly to avoid low spots, and repair bunds to stop seepage.',
    },
    seedSelectionAndTreatment: {
      bn: 'BRRI বা BINA প্রত্যয়িত পুষ্ট বীজ লবণ-পানিতে ভাসমান অপুষ্ট বীজ বাদ দিয়ে শোধন করুন এবং জাগ দিয়ে অঙ্কুর বের করে বীজতলায় ফেলুন।',
      en: 'Use certified BRRI/BINA seed, separate unfilled grains via clean saltwater floatation, treat seed safely, and pre-germinate before nursery sowing.',
    },
    plantingMethod: {
      bn: 'বয়স অনুযায়ী সুস্থ চারা (বোরোতে ৩৫–৪০ দিন, আমনে ২৫–৩০ দিন) নির্দিষ্ট লাইনে ২০×১৫ বা ২০×২০ সেমি দূরত্বে রোপণ করুন।',
      en: 'Transplant vigorous seedlings (25–30 days old in Aman, 35–40 days in Boro) in straight rows for sunlight and airflow.',
    },
    fertilizerManagement: {
      bn: 'জমি তৈরিতে জৈব সার, ফসফরাস, পটাশ ও জিংক-সালফার ব্যবহার করুন এবং ইউরিয়া ৩ কিস্তিতে বা লিফ কালার চার্ট (LCC) দেখে প্রয়োগ করুন। চূড়ান্ত মাত্রা SRDI বা ১৬১২৩ অনুযায়ী ঠিক করুন।',
      en: 'Incorporate compost with basal phosphorus, potassium, sulfur, and zinc; split nitrogen top-dressing using Leaf Color Chart (LCC) checks and SRDI soil tests.',
    },
    irrigationSchedule: {
      bn: 'চারা রোপণের পর ছিপছিপে পানি রাখুন। বোরোতে কুশি অবস্থায় পর্যায়ক্রমে ভেজানো ও শুকানো (AWD) পদ্ধতি পানি সাশ্রয় করে; থোড় থেকে দুধ-দানা পর্যায়ে শুকাতে দেবেন না।',
      en: 'Keep shallow water at establishment, apply Alternate Wetting and Drying (AWD) during Boro vegetative tillering, ensure moisture at flowering, and drain before maturity.',
    },
    growthStageCare: [
      {
        stage: { bn: 'চারা ও কুশি পর্যায়', en: 'Establishment & Tillering' },
        guidance: {
          bn: 'প্রথম ২ সপ্তাহের মধ্যে মরা বা ফাঁকা গোছায় পুনঃরোপণ করুন এবং পার্চিং (ডাল পোঁতা) স্থাপন করুন।',
          en: 'Gap-fill missing hills within two weeks and install bird perches across the paddy.',
        },
      },
      {
        stage: { bn: 'থোড় ও ফুল আসা', en: 'Panicle Initiation & Flowering' },
        guidance: {
          bn: 'এ সময় পানির ঘাটতি এড়ান এবং পাতা ব্লাস্ট বা মাজরা পোকার আক্রমণ নিয়মিত পর্যবেক্ষণ করুন।',
          en: 'Avoid moisture stress during booting and scout closely for neck/leaf blast and stem borers.',
        },
      },
      {
        stage: { bn: 'দানা গঠন ও পাকা', en: 'Grain Filling & Ripening' },
        guidance: {
          bn: 'গাছের গোড়ায় বাদামি গাছফড়িং (BPH) দেখুন এবং দানা শক্ত হতে শুরু করলে পানি সরিয়ে নিন।',
          en: 'Part hills to inspect stems for brown planthopper and gradually drain standing water as grains harden.',
        },
      },
    ],
    weedManagement: {
      bn: 'রোপণের ১৫–৪০ দিনের মধ্যে হাত নিড়ানি বা জাপানিজ রাইস উইডার ব্যবহার করে ২ বার আগাছা পরিষ্কার করুন।',
      en: 'Control early weeds twice between 15 and 40 days after transplanting via hand weeding or rotary weeders.',
    },
    commonDiseasesAndPests: {
      bn: 'পাতা ও শীষ ব্লাস্ট, খোলপোড়া, ব্যাকটেরিয়াল লিফ ব্লাইট, মাজরা পোকা ও বাদামি গাছফড়িং।',
      en: 'Rice Leaf & Neck Blast, Sheath Blight, Bacterial Leaf Blight, Stem Borer, and Brown Planthopper.',
    },
    preventionAndSafeManagement: {
      bn: 'অতিরিক্ত ইউরিয়া পরিহার, আলোক ফাঁদ ও পার্চিং ব্যবহার এবং প্রতিরোধী জাত চাষ করুন। প্রয়োজনে ১৬১২৩ বা উপজেলা কৃষি অফিসারের পরামর্শ ছাড়া বালাইনাশক দেবেন না।',
      en: 'Avoid excess urea, use light traps and perches, plant resistant varieties, and consult 16123 or Upazila officers before any chemical spray.',
    },
    harvesting: {
      bn: 'শীষের প্রায় ৮০% ধান সোনালি রঙ ধারণ করলে এবং গোড়ার দানা শক্ত হলে ফসল কাটুন।',
      en: 'Harvest when about 80% of spikelets turn golden-straw and lower grains feel firm.',
    },
    postHarvestStorage: {
      bn: 'দ্রুত মাড়াই ও পরিষ্কার করে রোদে ভালোভাবে শুকিয়ে ঠান্ডা অবস্থায় বায়ুরোধী ড্রাম বা প্লাস্টিক-লাইনার বস্তায় সংরক্ষণ করুন।',
      en: 'Thresh cleanly, sun-dry promptly to safe dryness, cool before bagging, and seal in airtight drums or lined bags.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'বীজতলা ও কাদা তৈরি', en: 'Nursery & Puddling' },
        window: { bn: '৩–৪ সপ্তাহ আগে', en: '3–4 wks pre-transplant' },
        action: { bn: 'সুস্থ বীজ শোধন ও বীজতলায় বপন।', en: 'Treat seed and raise vigorous nursery seedlings.' },
      },
      {
        step: 2,
        stage: { bn: 'সারিবদ্ধ রোপণ', en: 'Line Transplanting' },
        window: { bn: '০ দিন', en: 'Day 0' },
        action: { bn: 'সমান জমিতে লাইনে চারা রোপণ।', en: 'Transplant in neat rows with shallow water.' },
      },
      {
        step: 3,
        stage: { bn: 'কুশি ও আগাছা দমন', en: 'Tillering & AWD' },
        window: { bn: '১৫–৪০ দিন', en: 'Days 15–40' },
        action: { bn: 'আগাছা পরিষ্কার ও AWD সেচ ব্যবস্থাপনা।', en: 'Weed twice and practice AWD water saving.' },
      },
      {
        step: 4,
        stage: { bn: 'থোড় ও ফুল পর্যায়', en: 'Booting & Flowering' },
        window: { bn: '৫৫–৮০ দিন', en: 'Days 55–80' },
        action: { bn: 'আর্দ্রতা রক্ষা ও ব্লাস্ট-পোকা পর্যবেক্ষণ।', en: 'Protect panicle moisture and scout pests.' },
      },
      {
        step: 5,
        stage: { bn: 'কাটা ও শুকানো', en: 'Harvest & Storage' },
        window: { bn: '১১০–১৪০ দিন', en: 'Days 110–140' },
        action: { bn: '৮০% পাকলে কাটা, মাড়াই ও শুকানো।', en: 'Cut at 80% gold maturity, thresh, and dry.' },
      },
    ],
  },
  {
    id: 'wheat',
    name: { bn: 'গম', en: 'Wheat' },
    aliases: ['gom', 'winter wheat', 'রবি গম', 'bari gom'],
    category: 'cereal',
    categoryLabel: CROP_CATEGORY_LABELS.cereal,
    imageUrl: CROP_ASSETS.paddyField,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'গম বাংলাদেশের দ্বিতীয় প্রধান দানাদার ফসল, যা মূলত শীতকালীন (রবি) মৌসুমে উত্তরাঞ্চল ও মধ্যাঞ্চলে চাষ হয়। সময়মতো বপন তাপ-সহনশীলতা ও পুষ্ট দানার জন্য জরুরি।',
      en: 'Wheat is Bangladesh’s second major cereal crop, cultivated during the cool Rabi season. Timely sowing before late-winter heat is essential for plump grains.',
    },
    suitableVarieties: {
      bn: 'ব্লাস্ট-সহনশীল BARI Gom-30, BARI Gom-32, BARI Gom-33 এবং WMRI Gom-1 ও WMRI Gom-3।',
      en: 'Blast-tolerant BARI Gom-30, BARI Gom-32, BARI Gom-33, WMRI Gom-1, and WMRI Gom-3.',
    },
    suitableRegions: {
      bn: 'দিনাজপুর, ঠাকুরগাঁও, রংপুর, রাজশাহী, পাবনা, ফরিদপুর, যশোর ও কুষ্টিয়া অঞ্চলে ব্যাপক চাষ হয়।',
      en: 'Major hubs include Dinajpur, Thakurgaon, Rangpur, Rajshahi, Pabna, Faridpur, Jashore, and Kushtia.',
    },
    seasonAndPlanting: {
      bn: '১৫ নভেম্বর থেকে ৭ ডিসেম্বর পর্যন্ত বপনের উত্তম সময়; দেরি হলে গরমে দানা ছোট হয়ে যায়।',
      en: 'Optimal sowing runs mid-November to early December to avoid late-February terminal heat.',
    },
    soilAndPh: {
      bn: 'পানি নিষ্কাশন সুবিধাযুক্ত উর্বর দোআঁশ ও বেলে-দোআঁশ মাটি; আদর্শ pH প্রায় ৬.০ থেকে ৭.০।',
      en: 'Well-drained fertile loamy and sandy-loam soils around pH 6.0 to 7.0.',
    },
    landPreparation: {
      bn: 'রস থাকা অবস্থায় ৩–৪ বার চাষ ও মই দিয়ে মাটি ঝুরঝুরে, ঢেলাহীন ও আগাছামুক্ত করুন।',
      en: 'Plough and harrow 3–4 times at optimum moisture to prepare a fine, friable, weed-free seedbed.',
    },
    seedSelectionAndTreatment: {
      bn: 'অন্তত ৮০–৮৫% গজানোর ক্ষমতাসম্পন্ন প্রত্যয়িত বীজ বাছাই করে ছত্রাকজনিত পাতা দাগ প্রতিরোধে বীজ শোধন করুন।',
      en: 'Choose certified seed with high germination vigor and apply safe seed treatment per local extension advice.',
    },
    plantingMethod: {
      bn: '২০ সেমি দূরত্বে সারিতে ৩–৪ সেমি গভীরে বীজ বুনুন এবং হালকা মই দিয়ে ঢেকে দিন।',
      en: 'Sow in lines 20 cm apart at shallow depth and cover lightly so emergence stays uniform.',
    },
    fertilizerManagement: {
      bn: 'জমি তৈরির সময় পচা গোবর, ফসফরাস, পটাশ, জিপসাম ও বোরন সমন্বিত ভিত্তি সার দিন এবং মুকুট শিকড়ের সময় ইউরিয়া উপরি প্রয়োগ করুন (মাটি পরীক্ষা অনুসারে)।',
      en: 'Apply organic manure and basal minerals at final ploughing, then top-dress nitrogen at crown root initiation based on SRDI soil test guidance.',
    },
    irrigationSchedule: {
      bn: 'সবচেয়ে জরুরি সেচ হলো মুকুট শিকড় গজানো (১৭–২১ দিন), থোড় বের হওয়া (৫০–৫৫ দিন) ও দানা বাঁধার সময় (৭৫–৮০ দিন)। জলাবদ্ধতা এড়ান।',
      en: 'Prioritize moisture at Crown Root Initiation (CRI), booting, and grain filling; drain excess rain immediately.',
    },
    growthStageCare: [
      {
        stage: { bn: 'মুকুট শিকড় (CRI)', en: 'Crown Root Initiation' },
        guidance: {
          bn: 'বপনের ১৭–২১ দিনের মধ্যে প্রথম হালকা সেচ ও নিড়ানি দিন।',
          en: 'Provide first light irrigation and shallow weeding around days 17–21.',
        },
      },
      {
        stage: { bn: 'শীষ বের হওয়া ও ফুল', en: 'Heading & Anthesis' },
        guidance: {
          bn: 'শীষে সাদা হয়ে যাওয়া বা হুইট ব্লাস্টের লক্ষণ দেখা দেয় কি না প্রতিদিন দেখুন।',
          en: 'Inspect emerging spikes closely for bleached spikelets indicating wheat blast.',
        },
      },
    ],
    weedManagement: {
      bn: 'বপনের ২৫–৩০ দিনের মধ্যে বথুয়া ও শেয়ালকাঁটাসহ চওড়া পাতার আগাছা হাত নিড়ানি দিয়ে তুলে ফেলুন।',
      en: 'Remove broadleaf and grassy weeds manually around 25–30 days after sowing.',
    },
    commonDiseasesAndPests: {
      bn: 'হুইট ব্লাস্ট, পাতার মরিচা ও পাতা ঝলসানো রোগ, জাবপোকা ও ইঁদুর।',
      en: 'Wheat Blast, Leaf Rust, Bipolaris Leaf Blight, aphids, and field rodents.',
    },
    preventionAndSafeManagement: {
      bn: 'ব্লাস্ট-প্রতিরোধী জাত চাষ, সঠিক সময়ে বপন ও ধানের পর গম চাষে ফসল আবর্তন বজায় রাখুন। জরুরি রোগে ১৬১২৩-এ যোগাযোগ করুন।',
      en: 'Plant tolerant varieties, sow on time, rotate crops, and contact 16123 immediately if spike bleaching appears.',
    },
    harvesting: {
      bn: 'গাছ ও শীষ খড়ের মতো হলুদ হয়ে শুকিয়ে গেলে এবং দানা দাঁতে কাটলে শক্ত কট শব্দ করলে কাটুন।',
      en: 'Harvest when straw turns golden yellow and kernels are dry and hard.',
    },
    postHarvestStorage: {
      bn: 'ভালোভাবে মাড়াই করে রোদে শুকিয়ে ঠান্ডা করে আর্দ্রতামুক্ত ড্রামে রাখুন ও পোকা ঠেকাতে শুকনো নিমপাতা ব্যবহার করুন।',
      en: 'Thresh cleanly, sun-dry thoroughly, cool completely, and seal in airtight drums.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'বপন', en: 'Timely Sowing' },
        window: { bn: 'নভেম্বর মধ্য – ডিসেম্বর শুরু', en: 'Mid Nov – Early Dec' },
        action: { bn: 'সারিতে শোধিত বীজ বপন।', en: 'Line-sow treated seed in fine tilth.' },
      },
      {
        step: 2,
        stage: { bn: 'CRI ও প্রথম সেচ', en: 'CRI Stage' },
        window: { bn: '১৭–২১ দিন', en: 'Days 17–21' },
        action: { bn: 'হালকা সেচ, উপরি সার ও নিড়ানি।', en: 'First light moisture, top-dress, and weed.' },
      },
      {
        step: 3,
        stage: { bn: 'থোড় ও শীষ', en: 'Booting & Heading' },
        window: { bn: '৫০–৬৫ দিন', en: 'Days 50–65' },
        action: { bn: 'দ্বিতীয় সেচ ও ব্লাস্ট পর্যবেক্ষণ।', en: 'Second moisture check and spike scouting.' },
      },
      {
        step: 4,
        stage: { bn: 'দানা পুষ্ট হওয়া', en: 'Grain Filling' },
        window: { bn: '৭৫–৯০ দিন', en: 'Days 75–90' },
        action: { bn: 'গরম ও শুষ্কতা থাকলে হালকা আর্দ্রতা রক্ষা।', en: 'Light irrigation if dry winds occur.' },
      },
      {
        step: 5,
        stage: { bn: 'সংগ্রহ ও সংরক্ষণ', en: 'Harvest & Dry' },
        window: { bn: '১০৫–১১৫ দিন', en: 'Days 105–115' },
        action: { bn: 'কাটা, মাড়াই ও রোদে শুকিয়ে ড্রামে তোলা।', en: 'Reap, thresh, sun-dry, and seal.' },
      },
    ],
  },
  {
    id: 'maize',
    name: { bn: 'ভুট্টা', en: 'Maize (Corn)' },
    aliases: ['corn', 'bhutta', 'vutta', 'মোচা', 'hybrid maize'],
    category: 'cereal',
    categoryLabel: CROP_CATEGORY_LABELS.cereal,
    imageUrl: CROP_ASSETS.paddyField,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'ভুট্টা বাংলাদেশে পোল্ট্রি, মৎস্য ও গবাদিপশুর খাদ্য এবং মানবখাদ্য হিসেবে অত্যন্ত লাভজনক ফসল। রবি ও খরিপ-১ উভয় মৌসুমে এর ফলন খুব ভালো হয়।',
      en: 'Maize is a high-value cereal cultivated widely across Bangladesh in Rabi and Kharif-1 for food and livestock feed.',
    },
    suitableVarieties: {
      bn: 'BARI Hybrid Maize-9, BARI Hybrid Maize-16, BARI Hybrid Maize-17 এবং তাপসহনশীল বিভিন্ন অনুমোদিত হাইব্রিড জাত।',
      en: 'BARI Hybrid Maize-9, BARI Hybrid Maize-16, BARI Hybrid Maize-17, and approved adaptive hybrids.',
    },
    suitableRegions: {
      bn: 'দিনাজপুর, ঠাকুরগাঁও, চুয়াডাঙ্গা, লালমনিরহাট, রংপুর, বগুড়া ও মানিকগঞ্জ জেলায় সর্বাধিক আবাদ হয়।',
      en: 'Concentrated in Dinajpur, Thakurgaon, Chuadanga, Lalmonirhat, Rangpur, Bogura, and Manikganj.',
    },
    seasonAndPlanting: {
      bn: 'রবি মৌসুমে মধ্য অক্টোবর থেকে নভেম্বর এবং খরিপ-১ মৌসুমে মধ্য ফেব্রুয়ারি থেকে মার্চ।',
      en: 'Rabi sowing mid-October to November; Kharif-1 sowing mid-February to March.',
    },
    soilAndPh: {
      bn: 'গভীর, উর্বর ও সুনিষ্কাশিত দোআঁশ ও বেলে-দোআঁশ মাটি; অনুকূল মাটির pH প্রায় ৫.৫ থেকে ৭.০।',
      en: 'Deep, well-drained fertile loamy and sandy-loam soils with pH 5.5 to 7.0.',
    },
    landPreparation: {
      bn: 'গভীর চাষ ও মই দিয়ে জমি সমতল করুন এবং ভারী বৃষ্টিতে জল সরানোর জন্য জমির পাশে নিকাশ নালা রাখুন।',
      en: 'Deeply plough, pulverize clods, and dig border drainage channels to avoid standing water.',
    },
    seedSelectionAndTreatment: {
      bn: 'নতুন মৌসুমের নির্ভরযোগ্য হাইব্রিড বীজ বেছে নিন (আগের হাইব্রিডের বীজ পরের মৌসুমে ফলন কমায়) ও ছত্রাকরোধী বীজ শোধন করুন।',
      en: 'Buy fresh certified hybrid seed each season and treat seed gently before sowing.',
    },
    plantingMethod: {
      bn: '৬০×২০ সেমি দূরত্বে সারিতে প্রতিটি গর্তে ১টি সুস্থ বীজ বপন করুন।',
      en: 'Dibbling single seeds in neat rows for strong stalks and even cob exposure.',
    },
    fertilizerManagement: {
      bn: 'পচা গোবর/কম্পোস্টের সাথে মূল সার ও ২–৩ কিস্তিতে উপরি সার এবং জিংক-বোরনের ঘাটতি থাকলে মাটি পরীক্ষা অনুযায়ী প্রয়োগ করুন।',
      en: 'Pair compost and basal minerals with split side-dressings during knee-high and tasseling stages based on SRDI tests.',
    },
    irrigationSchedule: {
      bn: 'চারা ৪–৫ পাতা, হাঁটু-সমান উচ্চতা, মোচা বের হওয়া (tasseling/silking) এবং দানা পূরণের সময় সেচ অত্যন্ত জরুরি।',
      en: 'Critical moisture phases are 4–5 leaf stage, knee-high growth, tasseling/silking, and grain filling.',
    },
    growthStageCare: [
      {
        stage: { bn: 'হাঁটু-সমান পর্যায়', en: 'Knee-High Stage' },
        guidance: {
          bn: 'গোড়ায় মাটি তুলে দিন (earthing up) যাতে ঝড়ো বাতাসে গাছ হেলে না পড়ে।',
          en: 'Mound soil up around stalk bases to boost anchorage and suppress weeds.',
        },
      },
      {
        stage: { bn: 'মোচা ও সিল্কিং পর্যায়', en: 'Tasseling & Silking' },
        guidance: {
          bn: 'পাতায় ফল আর্মিওয়ার্ম (FAW) পোকার আক্রমণ ও ছিদ্র পরীক্ষা করুন।',
          en: 'Inspect plant whorls carefully for Fall Armyworm caterpillars and fresh frass.',
        },
      },
    ],
    weedManagement: {
      bn: 'বপনের প্রথম ৪০ দিন জমি আগাছামুক্ত রাখুন; মাটি তোলার সময় আগাছা দমন সহজ হয়।',
      en: 'Keep fields weed-free during the first 40 days; earthing up helps bury emerging weeds.',
    },
    commonDiseasesAndPests: {
      bn: 'ফল আর্মিওয়ার্ম (Fall Armyworm), কাটুই পোকা, মাজরা ও টার্সিকাম পাতা ঝলসানো রোগ।',
      en: 'Fall Armyworm, Cutworm, Stem Borer, and Turcicum Leaf Blight.',
    },
    preventionAndSafeManagement: {
      bn: 'ফেরোমন ফাঁদ ব্যবহার, ডিমের গাদা হাত দিয়ে ধ্বংস এবং সমন্বিত বালাই ব্যবস্থাপনার জন্য ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Install pheromone traps, hand-crush early egg clusters, and consult 16123 for approved IPM control.',
    },
    harvesting: {
      bn: 'মোচার খোসা খড়ের রঙ ধারণ করলে ও দানার গোড়ায় কালো স্তর (black layer) দেখা দিলে সংগ্রহ করুন।',
      en: 'Harvest when husks dry straw-brown and kernel bases develop a dark maturity layer.',
    },
    postHarvestStorage: {
      bn: 'মোচা ছাড়িয়ে দানা ভালোভাবে রোদে শুকিয়ে বায়ুরোধী ড্রামে সংরক্ষণ করুন যাতে আফ্লাটক্সিন ছত্রাক না জন্মায়।',
      en: 'Shell cobs cleanly, sun-dry kernels well, and store in dry airtight containers to prevent mold.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'সারিবদ্ধ বপন', en: 'Row Sowing' },
        window: { bn: '০ দিন', en: 'Day 0' },
        action: { bn: 'রসযুক্ত জমিতে নির্দিষ্ট দূরত্বে বপন।', en: 'Plant single seeds in spaced lines.' },
      },
      {
        step: 2,
        stage: { bn: 'মাটি তোলা ও আগাছা', en: 'Earthing Up' },
        window: { bn: '২৫–৩৫ দিন', en: 'Days 25–35' },
        action: { bn: 'উপরি সার দিয়ে গোড়ায় মাটি তোলা।', en: 'Side-dress and hill soil around stems.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল ও মোচা', en: 'Tasseling & Silking' },
        window: { bn: '৫৫–৭৫ দিন', en: 'Days 55–75' },
        action: { bn: 'নিশ্চিত সেচ ও আর্মিওয়ার্ম পর্যবেক্ষণ।', en: 'Protect moisture and check whorls.' },
      },
      {
        step: 4,
        stage: { bn: 'দানা পূরণ', en: 'Cob Maturation' },
        window: { bn: '৮৫–১০৫ দিন', en: 'Days 85–105' },
        action: { bn: 'দানা পুষ্ট হওয়া ও পাখি-ইঁদুর নিয়ন্ত্রণ।', en: 'Support grain filling and guard field.' },
      },
      {
        step: 5,
        stage: { bn: 'সংগ্রহ ও শুকানো', en: 'Harvest & Shelling' },
        window: { bn: '১২০–১৪০ দিন', en: 'Days 120–140' },
        action: { bn: 'মোচা তুলে মাড়াই ও রোদে শুকানো।', en: 'Pick dry cobs, shell, and dry cleanly.' },
      },
    ],
  },
  {
    id: 'barley',
    name: { bn: 'যব (বার্লি)', en: 'Barley' },
    aliases: ['job', 'barley', 'বাল্লি', 'হালকা লবণাক্ত সহিষ্ণু'],
    category: 'cereal',
    categoryLabel: CROP_CATEGORY_LABELS.cereal,
    imageUrl: CROP_ASSETS.paddyField,
    sourceType: 'sample_demo',
    waterDemandLevel: 'low',
    overview: {
      bn: 'যব একটি খরা ও হালকা লবণাক্ততা-সহিষ্ণু শীতকালীন দানাদার ফসল। গমের তুলনায় কম সেচে চর ও শুষ্ক এলাকায় সহজেই চাষ করা যায়।',
      en: 'Barley is a hardy winter cereal tolerant of mild drought and moderate salinity, well suited to low-input char and drylands.',
    },
    suitableVarieties: {
      bn: 'BARI Barley-5, BARI Barley-6 (খোসা ছাড়া/নগ্ন যব), BARI Barley-7 এবং BARI Barley-8।',
      en: 'BARI Barley-5, hulless BARI Barley-6, BARI Barley-7, and BARI Barley-8.',
    },
    suitableRegions: {
      bn: 'পাবনা, সিরাজগঞ্জ, ফরিদপুর, মানিকগঞ্জ, টাঙ্গাইল ও চরাঞ্চলসহ হালকা লবণাক্ত উপকূলীয় এলাকায় উপযোগী।',
      en: 'Well suited to Pabna, Sirajganj, Faridpur, Tangail riverine chars, and mildly saline coastal margins.',
    },
    seasonAndPlanting: {
      bn: 'নভেম্বর মাস থেকে ডিসেম্বরের প্রথম সপ্তাহ পর্যন্ত রবি মৌসুমে বপন করা হয়।',
      en: 'Sown in Rabi season from November through early December.',
    },
    soilAndPh: {
      bn: 'বেলে-দোআঁশ থেকে দোআঁশ ও হালকা লবণাক্ত মাটি; আদর্শ মাটির pH প্রায় ৬.০ থেকে ৭.৮।',
      en: 'Sandy-loam to loamy soils including mildly saline plots; pH 6.0 to 7.8.',
    },
    landPreparation: {
      bn: '২–৩ বার চাষ ও মই দিয়ে মাটি ঝুরঝুরে ও সমতল করে বপন উপযোগী করুন।',
      en: 'Give 2–3 light ploughings and harrow evenly while soil retains residual moisture.',
    },
    seedSelectionAndTreatment: {
      bn: 'রোগমুক্ত BARI অনুমোদিত বীজ বেছে ছত্রাকনাশক শোধন বা জৈব শোধন করে বুনুন।',
      en: 'Select clean BARI-approved seeds and treat safely against seed-borne smut and blight.',
    },
    plantingMethod: {
      bn: '২৫ সেমি দূরত্বে সারিতে বীজ বপন করলে নিড়ানি ও বাতাস চলাচল সহজ হয়।',
      en: 'Sow in rows 25 cm apart for uniform emergence and easy hand weeding.',
    },
    fertilizerManagement: {
      bn: 'গমের চেয়ে কম সার লাগে; জৈব সারের পাশাপাশি সুষম ভিত্তি সার ও এক কিস্তি উপরি সার কৃষি অফিসের পরামর্শে দিন।',
      en: 'Requires lower fertilizer than wheat; combine compost with modest basal nutrients and a single early top-dress.',
    },
    irrigationSchedule: {
      bn: 'রস থাকলে ১টি হালকা সেচই যথেষ্ট; খরা হলে বপনের ২৫–৩০ দিন ও শীষ বের হওয়ার সময় হালকা সেচ দিন।',
      en: 'Often succeeds with minimal moisture; if dry, give 1–2 light irrigations around tillering and heading.',
    },
    growthStageCare: [
      {
        stage: { bn: 'কুশি পর্যায়', en: 'Tillering Stage' },
        guidance: {
          bn: 'প্রয়োজনে একবার পাতলা নিড়ানি ও হালকা সেচ দিন।',
          en: 'Remove competing weeds once and apply light irrigation if dry.',
        },
      },
      {
        stage: { bn: 'শীষ বের হওয়া', en: 'Heading & Filling' },
        guidance: {
          bn: 'দানা ভরাটের সময় গাছ হেলে পড়া বা পাতা দাগ হচ্ছে কি না দেখুন।',
          en: 'Check for lodging and leaf spot lesions during grain fill.',
        },
      },
    ],
    weedManagement: {
      bn: 'বপনের ২০–২৫ দিন পর একবার নিড়ানি দিলে ফসল দ্রুত জমি ঢেকে ফেলে।',
      en: 'One early weeding at 20–25 days allows barley to shade out later weeds naturally.',
    },
    commonDiseasesAndPests: {
      bn: 'পাতার দাগ রোগ, মরিচা, আলগা ঝুল রোগ এবং জাবপোকা।',
      en: 'Spot blotch, leaf rust, loose smut, and aphids.',
    },
    preventionAndSafeManagement: {
      bn: 'স্বাস্থ্যকর বীজ, বীজ শোধন ও সময়মতো বপনই প্রধান প্রতিরোধ। প্রয়োজনে ১৬১২৩-এ যোগাযোগ করুন।',
      en: 'Clean treated seed and timely sowing prevent most outbreaks; consult 16123 if aphids surge.',
    },
    harvesting: {
      bn: 'শীষ হলুদ হয়ে নুয়ে পড়লে ও দানা শক্ত হলে সকালের দিকে কাটুন যাতে দানা ঝরে না পড়ে।',
      en: 'Harvest in the morning once spikes turn pale yellow and grains turn hard to avoid shattering.',
    },
    postHarvestStorage: {
      bn: 'মাড়াই করে ভালোভাবে শুকিয়ে বায়ুরোধী পাত্রে সংরক্ষণ করুন।',
      en: 'Thresh cleanly, sun-dry well, and store in sealed moisture-proof containers.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'জমি ও বপন', en: 'Sowing' },
        window: { bn: 'নভেম্বর', en: 'November' },
        action: { bn: 'সারিতে শোধিত বীজ বপন।', en: 'Sow treated seed on residual moisture.' },
      },
      {
        step: 2,
        stage: { bn: 'কুশি ও নিড়ানি', en: 'Tillering Care' },
        window: { bn: '২০–৩০ দিন', en: 'Days 20–30' },
        action: { bn: 'হালকা নিড়ানি ও প্রয়োজনে প্রথম সেচ।', en: 'Single weeding and optional light water.' },
      },
      {
        step: 3,
        stage: { bn: 'শীষ ও ফুল', en: 'Heading' },
        window: { bn: '৫০–৬০ দিন', en: 'Days 50–60' },
        action: { bn: 'পাতা দাগ ও জাবপোকা পর্যবেক্ষণ।', en: 'Scout leaves and manage dry stress.' },
      },
      {
        step: 4,
        stage: { bn: 'দানা পাকা', en: 'Ripening' },
        window: { bn: '৮০–৯৫ দিন', en: 'Days 80–95' },
        action: { bn: 'সেচ বন্ধ ও পাখি থেকে সুরক্ষা।', en: 'Keep dry and guard maturing spikes.' },
      },
      {
        step: 5,
        stage: { bn: 'কাটা ও মাড়াই', en: 'Harvest' },
        window: { bn: '১০০–১১০ দিন', en: 'Days 100–110' },
        action: { bn: 'সকালে কেটে মাড়াই ও শুকানো।', en: 'Harvest early morning, thresh, and dry.' },
      },
    ],
  },
  {
    id: 'sorghum',
    name: { bn: 'জোয়ার (সরগাম)', en: 'Sorghum' },
    aliases: ['jowar', 'jowar', 'sorghum', 'জোয়ার', 'পশুখাদ্য'],
    category: 'cereal',
    categoryLabel: CROP_CATEGORY_LABELS.cereal,
    imageUrl: CROP_ASSETS.paddyField,
    sourceType: 'sample_demo',
    waterDemandLevel: 'low',
    overview: {
      bn: 'জোয়ার অত্যন্ত খরা-সহনশীল দানাদার ও গোখাদ্য ফসল। বরেন্দ্র, পাহাড়ি ঢাল ও শুষ্ক চরাঞ্চলে কম পানিতে দানা ও সবুজ ঘাস উভয়ের জন্য এটি উপযোগী।',
      en: 'Sorghum is a drought-resilient cereal grown for grain and nutritious green fodder in dry uplands and Barind regions.',
    },
    suitableVarieties: {
      bn: 'BARI Sorghum-1 এবং স্থানীয় উন্নত দানা ও সবুজ খাদ্য উপযোগী জাত।',
      en: 'BARI Sorghum-1 and improved dual-purpose grain/fodder varieties.',
    },
    suitableRegions: {
      bn: 'রাজশাহীর বরেন্দ্র অঞ্চল, চাঁপাইনবাবগঞ্জ, কুষ্টিয়া, পার্বত্য জেলা ও চরাঞ্চল।',
      en: 'Well adapted to Barind tracts (Rajshahi, Chapainawabganj), Kushtia, hill slopes, and char lands.',
    },
    seasonAndPlanting: {
      bn: 'খরিপ মৌসুমে মার্চ–মে এবং আগাম রবি মৌসুমে সেপ্টেম্বর–অক্টোবর।',
      en: 'Kharif sowing Mar–May or post-monsoon sowing Sep–Oct.',
    },
    soilAndPh: {
      bn: 'বেলে-দোআঁশ থেকে ভারী দোআঁশ ও পানি জমে না এমন মাটি; pH ৫.৫ থেকে ৮.০ পর্যন্ত সহ্য করতে পারে।',
      en: 'Wide adaptability across sandy-loam to heavy loam with drainage; tolerates pH 5.5 to 8.0.',
    },
    landPreparation: {
      bn: '২–৩ বার চাষ দিয়ে মাটি তৈরি করুন এবং বৃষ্টির পানি বের হওয়ার নালা রাখুন।',
      en: 'Prepare land with 2–3 ploughings and ensure open drainage furrows.',
    },
    seedSelectionAndTreatment: {
      bn: 'স্বাস্থ্যকর ও সতেজ বীজ বেছে ছত্রাকনাশক বা জৈব বীজ শোধন করুন।',
      en: 'Use high-germination healthy seeds treated safely against kernel smut.',
    },
    plantingMethod: {
      bn: '৪৫×১৫ সেমি দূরত্বে সারিতে বপন করুন; পশুখাদ্যের জন্য ঘন করে বোনা যায়।',
      en: 'Sow in 45 cm rows for grain; plant denser spacing when intended primarily for green fodder.',
    },
    fertilizerManagement: {
      bn: 'জৈব সারের পাশাপাশি মাঝারি মাত্রায় ভিত্তি ও এক কিস্তি উপরি সার প্রয়োগ যথেষ্ট।',
      en: 'Pair farmyard compost with modest basal nutrients and one early side-dress.',
    },
    irrigationSchedule: {
      bn: 'বৃষ্টি-নির্ভর হিসেবেই চলে; একটানা খরায় ফুল ও দানা আসার সময় ১–২টি সম্পূরক সেচ দিন।',
      en: 'Mostly rainfed; provide supplemental moisture only during prolonged flowering or grain-fill drought.',
    },
    growthStageCare: [
      {
        stage: { bn: 'প্রাথমিক বৃদ্ধি', en: 'Seedling Stage' },
        guidance: {
          bn: 'অতিরিক্ত ঘন চারা পাতলা করে দিন এবং গোড়ার মাটি সামান্য তুলে দিন।',
          en: 'Thin overcrowded seedlings and lightly mound soil for wind stability.',
        },
      },
      {
        stage: { bn: 'শীষ বের হওয়া ও পাখি তাড়ানো', en: 'Heading & Bird Guard' },
        guidance: {
          bn: 'দানা দুধ পর্যায়ে এলে পাখির আক্রমণ থেকে রক্ষা করুন।',
          en: 'Guard maturing grain heads from birds during milk and dough stages.',
        },
      },
    ],
    weedManagement: {
      bn: 'প্রথম ৩০ দিনে ১–২ বার নিড়ানি দিলে জোয়ার দ্রুত লম্বা হয়ে আগাছা দমন করে।',
      en: 'Weed once or twice in the first 30 days until canopy closure suppresses weeds.',
    },
    commonDiseasesAndPests: {
      bn: 'অ্যানথ্রাকনোজ, শীষের ছত্রাক দাগ, শুট ফ্লাই ও কাণ্ড ছিদ্রকারী পোকা।',
      en: 'Anthracnose, grain mold, shoot fly, and stem borer.',
    },
    preventionAndSafeManagement: {
      bn: 'ফসল আবর্তন, সময়মতো বপন ও গোখাদ্য হিসেবে খাওয়ানোর ক্ষেত্রে কচি খরাগ্রস্ত গাছ (প্রুসিক অ্যাসিড ঝুঁকি) না খাওয়ানোর সতর্কতা মানুন।',
      en: 'Rotate crops, sow timely, and never feed drought-stressed young shoots as fodder until mature/cured (consult veterinary/16123 advice).',
    },
    harvesting: {
      bn: 'শীষের দানা শক্ত ও শুষ্ক হলে শীষ কেটে সংগ্রহ করুন; সবুজ ঘাসের জন্য ৫০% ফুল এলে কাটুন।',
      en: 'Cut grain heads once seeds harden; cut for green fodder around 50% flowering.',
    },
    postHarvestStorage: {
      bn: 'শীষ রোদে শুকিয়ে মাড়াই করুন এবং দানা শুষ্ক অবস্থায় বায়ুরোধী পাত্রে রাখুন।',
      en: 'Sun-dry panicles cleanly, thresh, and seal dry grain against weevils.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'বপন', en: 'Sowing' },
        window: { bn: '০ দিন', en: 'Day 0' },
        action: { bn: 'সারিতে বা ছিটিয়ে বীজ বপন।', en: 'Sow in lines on prepared soil.' },
      },
      {
        step: 2,
        stage: { bn: 'পাতলা করা ও নিড়ানি', en: 'Thinning & Weeding' },
        window: { bn: '১৫–২৫ দিন', en: 'Days 15–25' },
        action: { bn: 'চারা পাতলা ও আগাছা পরিষ্কার।', en: 'Thin weak plants and clear weeds.' },
      },
      {
        step: 3,
        stage: { bn: 'কাণ্ড বৃদ্ধি', en: 'Stem Elongation' },
        window: { bn: '৩৫–৫৫ দিন', en: 'Days 35–55' },
        action: { bn: 'উপরি সার ও পোকা পর্যবেক্ষণ।', en: 'Apply side-dress and scout borers.' },
      },
      {
        step: 4,
        stage: { bn: 'ফুল ও দুধ দানা', en: 'Flowering & Grain Fill' },
        window: { bn: '৬৫–৯০ দিন', en: 'Days 65–90' },
        action: { bn: 'পাখি রক্ষা ও খরায় হালকা সেচ।', en: 'Protect panicles from birds.' },
      },
      {
        step: 5,
        stage: { bn: 'সংগ্রহ', en: 'Harvest & Thresh' },
        window: { bn: '১০০–১২০ দিন', en: 'Days 100–120' },
        action: { bn: 'শীষ কেটে শুকানো ও মাড়াই।', en: 'Cut mature heads, dry, and thresh.' },
      },
    ],
  },
  {
    id: 'millet',
    name: { bn: 'কাউন ও চীনা (মিলেট)', en: 'Millet (Kaon & Cheena)' },
    aliases: ['kaon', 'cheena', 'foxtail millet', 'proso millet', 'কাউন', 'চীনা'],
    category: 'cereal',
    categoryLabel: CROP_CATEGORY_LABELS.cereal,
    imageUrl: CROP_ASSETS.paddyField,
    sourceType: 'verified_reference',
    waterDemandLevel: 'low',
    overview: {
      bn: 'কাউন (Foxtail Millet) ও চীনা (Proso Millet) বাংলাদেশের ঐতিহ্যবাহী ও পুষ্টিগুণসমৃদ্ধ ক্ষুদ্র দানাশস্য। চরাঞ্চলে খুব কম খরচে ও স্বল্প পানিতে এই ফসল ফলে।',
      en: 'Foxtail millet (Kaon) and Proso millet (Cheena) are climate-resilient, nutrient-dense minor cereals thriving with low water across char lands.',
    },
    suitableVarieties: {
      bn: 'কাউনের জন্য BARI Kaon-1 (তিতাস), BARI Kaon-2, BARI Kaon-3 এবং চীনাবাদে BARI Cheena-1।',
      en: 'BARI Kaon-1 (Titas), BARI Kaon-2, BARI Kaon-3 for foxtail millet, and BARI Cheena-1 for proso millet.',
    },
    suitableRegions: {
      bn: 'বগুড়া, সিরাজগঞ্জ, জামালপুর, গাইবান্ধা, কুড়িগ্রাম ও নদী-তীরবর্তী চরাঞ্চল।',
      en: 'Widely grown in Bogura, Sirajganj, Jamalpur, Gaibandha, Kurigram, and Brahmaputra river chars.',
    },
    seasonAndPlanting: {
      bn: 'রবি ও আগাম খরিপ-১ মৌসুমে (নভেম্বর থেকে ফেব্রুয়ারি) বপন করা যায়।',
      en: 'Sown between November and February across char and upland belts.',
    },
    soilAndPh: {
      bn: 'হালকা বেলে-দোআঁশ ও পলি-দোআঁশ মাটি সবচেয়ে ভালো; অনুকূল pH প্রায় ৫.৫ থেকে ৭.৫।',
      en: 'Light sandy-loam and alluvial silt-loam soils around pH 5.5 to 7.5.',
    },
    landPreparation: {
      bn: 'বীজ খুব ছোট হওয়ায় ২–৩ বার চাষ ও মই দিয়ে মাটি অতি মিহি ও সমতল করতে হবে।',
      en: 'Because seeds are tiny, prepare a very fine, level seedbed with 2–3 harrowings.',
    },
    seedSelectionAndTreatment: {
      bn: 'রোগমুক্ত ও পুষ্ট বীজ বেছে সমানভাবে ছড়ানোর জন্য শুকনো ছাই বা বালির সাথে মিশিয়ে বপন করুন।',
      en: 'Mix clean seed with dry sand or ash for even distribution during sowing.',
    },
    plantingMethod: {
      bn: '২৫–৩০ সেমি সারিতে বা ছিটিয়ে ১–২ সেমি গভীরতার মধ্যে অগভীরভাবে বপন করুন।',
      en: 'Sow shallowly (1–2 cm deep) in 25–30 cm lines or broadcast evenly.',
    },
    fertilizerManagement: {
      bn: 'স্বল্প সারেও ভালো ফলে; জমি তৈরিতে কম্পোস্ট ও সামান্য ভিত্তি সার এবং খরা না থাকলে হালকা উপরি সার দিন।',
      en: 'Thrives on low inputs; use modest compost and basal nutrients with a small vegetative boost if moisture allows.',
    },
    irrigationSchedule: {
      bn: 'অত্যন্ত খরা-সহিষ্ণু; সাধারণত সেচ ছাড়াই হয়, তবে প্রচণ্ড শুষ্কতায় ফুল আসার আগে ১টি হালকা সেচ ফলন বাড়ায়।',
      en: 'Highly drought-tolerant; typically rainfed, though one light irrigation at panicle emergence boosts grain weight.',
    },
    growthStageCare: [
      {
        stage: { bn: 'অঙ্কুরোদগম ও পাতলা করা', en: 'Emergence & Thinning' },
        guidance: {
          bn: 'চারা খুব ঘন হলে ১৫–২০ দিনের মাথায় পাতলা করে দিন।',
          en: 'Thin dense patches around 15–20 days after emergence.',
        },
      },
      {
        stage: { bn: 'শীষ পাকা পর্যায়', en: 'Panicle Ripening' },
        guidance: {
          bn: 'চড়ুই ও মুনিয়া পাখি তাড়ানোর ব্যবস্থা রাখুন।',
          en: 'Protect ripening panicles from small flocking birds.',
        },
      },
    ],
    weedManagement: {
      bn: 'প্রাথমিক অবস্থায় চারা ধীরগতির হওয়ায় ২০ দিনের মধ্যে একবার সাবধানে নিড়ানি দিন।',
      en: 'Hand-weed gently within 20 days while young millet seedlings establish.',
    },
    commonDiseasesAndPests: {
      bn: 'পাতার দাগ রোগ, ডাউনি মিলডিউ, বিছা পোকা ও পাখির উপদ্রব।',
      en: 'Leaf blast/spot, downy mildew, hairy caterpillar, and bird damage.',
    },
    preventionAndSafeManagement: {
      bn: 'পরিষ্কার বীজ ও শস্য আবর্তন মেনে চলুন; রোগের লক্ষণে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Use clean seed and rotate fields annually; ask 16123 if fungal blight appears.',
    },
    harvesting: {
      bn: 'শীষের ৮০–৮৫% দানা পেকে খড়ের রঙ হলে শুধু শীষগুলো কেটে সংগ্রহ করুন।',
      en: 'Cut mature golden panicles when 80–85% of grains turn hard.',
    },
    postHarvestStorage: {
      bn: 'রোদে শুকিয়ে মাড়াই করে পরিষ্কার বাতাসহীন ড্রাম বা মটকায় সংরক্ষণ করুন।',
      en: 'Dry harvested heads in sunlight, thresh cleanly, and seal in dry jars or drums.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'মিহি জমি ও বপন', en: 'Fine Prep & Sowing' },
        window: { bn: '০ দিন', en: 'Day 0' },
        action: { bn: 'অগভীরভাবে ছোট বীজ বপন।', en: 'Shallow sowing on fine soil.' },
      },
      {
        step: 2,
        stage: { bn: 'পাতলা ও নিড়ানি', en: 'Thin & Weed' },
        window: { bn: '১৫–২০ দিন', en: 'Days 15–20' },
        action: { bn: 'আগাছা পরিষ্কার ও চারা ফাঁকা করা।', en: 'Weed gently and space seedlings.' },
      },
      {
        step: 3,
        stage: { bn: 'শীষ বের হওয়া', en: 'Panicle Emergence' },
        window: { bn: '৪৫–৫৫ দিন', en: 'Days 45–55' },
        action: { bn: 'শুষ্ক হলে ১টি হালকা সেচ বিবেচনা।', en: 'Optional light irrigation if very dry.' },
      },
      {
        step: 4,
        stage: { bn: 'দানা ভরাট', en: 'Grain Maturation' },
        window: { bn: '৬৫–৮০ দিন', en: 'Days 65–80' },
        action: { bn: 'পাখি থেকে শীষ রক্ষা করা।', en: 'Scare birds away from golden heads.' },
      },
      {
        step: 5,
        stage: { bn: 'সংগ্রহ ও মাড়াই', en: 'Harvest & Storage' },
        window: { bn: '৮৫–১০০ দিন', en: 'Days 85–100' },
        action: { bn: 'শীষ কেটে শুকানো ও সংরক্ষণ।', en: 'Clip panicles, dry, thresh, and store.' },
      },
    ],
  },
];
