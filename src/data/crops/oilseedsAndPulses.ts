import { CROP_ASSETS, CROP_CATEGORY_LABELS, CropCultivationGuide } from './types';

export const OILSEED_AND_PULSE_CROPS: CropCultivationGuide[] = [
  // ======================== OILSEEDS (5) ========================
  {
    id: 'mustard',
    name: { bn: 'সরিষা', en: 'Mustard' },
    aliases: ['sorisha', 'shorisha', 'tori', 'সরিষা', 'টরি-৭', 'বারি সরিষা'],
    category: 'oilseed',
    categoryLabel: CROP_CATEGORY_LABELS.oilseed,
    imageUrl: CROP_ASSETS.oilseeds,
    sourceType: 'verified_reference',
    waterDemandLevel: 'low',
    overview: {
      bn: 'সরিষা বাংলাদেশের প্রধান তৈলবীজ ফসল। রোপা আমন ও বোরো ধানের মাঝে স্বল্পমেয়াদি (৮০–৮৫ দিন) সরিষা চাষ ভোজ্যতেলের উৎপাদন বাড়াতে ও জমির উর্বরতা রক্ষায় দারুণ কার্যকর।',
      en: 'Mustard is Bangladesh’s #1 oilseed crop, fitting cleanly into the 80–85 day window between Aman and Boro rice.',
    },
    suitableVarieties: {
      bn: 'স্বল্পমেয়াদি BARI Sarisha-14, BARI Sarisha-15, BARI Sarisha-17 ও BINA Sarisha-9 (রাই ও টরি জাতীয় জাত)।',
      en: 'Short-duration BARI Sarisha-14, BARI Sarisha-15, BARI Sarisha-17, and BINA Sarisha-9.',
    },
    suitableRegions: {
      bn: 'সিরাজগঞ্জ, পাবনা, টাঙ্গাইল, মানিকগঞ্জ, জামালপুর, বগুড়া, যশোর ও ফরিদপুরে ব্যাপক চাষ হয়।',
      en: 'Major belts span Sirajganj, Pabna, Tangail, Manikganj, Jamalpur, Bogura, Jashore, and Faridpur.',
    },
    seasonAndPlanting: {
      bn: 'মধ্য অক্টোবর থেকে মধ্য নভেম্বর (কার্তিক) পর্যন্ত বপনের উত্তম সময়।',
      en: 'Optimal sowing runs mid-October to mid-November right after Aman harvest.',
    },
    soilAndPh: {
      bn: 'সুনিষ্কাশিত দোআঁশ, বেলে-দোআঁশ ও পলি-দোআঁশ মাটি; অনুকূল pH ৬.০ থেকে ৭.০।',
      en: 'Well-drained loamy, sandy-loam, and silty soils around pH 6.0 to 7.0.',
    },
    landPreparation: {
      bn: 'মাটিতে রস থাকা অবস্থায় ৩–৪ বার চাষ ও মই দিয়ে মিহি ও ঝুরঝুরে করে তুলুন এবং জমিতে জল না জমতে নালা রাখুন।',
      en: 'Plough 3–4 times at residual moisture to create fine tilth and clean perimeter drains.',
    },
    seedSelectionAndTreatment: {
      bn: 'সতেজ ও পুষ্ট বীজ বেছে অল্টারনারিয়া দাগ প্রতিরোধে বীজ শোধন করে বুনুন।',
      en: 'Choose vigorous certified seed treated safely against Alternaria blight.',
    },
    plantingMethod: {
      bn: '২৫–৩০ সেমি সারিতে বা ছিটিয়ে অগভীরভাবে বুনুন; সারিতে বুনলে আগাছা দমন ও ফলন ভালো হয়।',
      en: 'Sow shallowly in 25–30 cm rows (or evenly broadcast) and cover lightly.',
    },
    fertilizerManagement: {
      bn: 'সরিষায় তেলের পরিমাণ ও দানা ভরতে সালফার (গন্ধক) ও বোরন অত্যন্ত জরুরি—SRDI ও ১৬১২৩-এর পরামর্শে সুষম সার দিন।',
      en: 'Sulfur and boron are key for oil content and pod fill alongside balanced NPK and compost—confirm via soil guidance.',
    },
    irrigationSchedule: {
      bn: 'ফলন বৃদ্ধিতে বপনের ২০–২৫ দিন (ফুলের আগে) এবং ৫৫–৬০ দিন (শুঁটি গঠন) সময়ে ১–২টি হালকা সেচই যথেষ্ট; জল দাঁড়াতে দেবেন না।',
      en: '1–2 light irrigations (pre-bloom and pod fill) suffice if dry; never allow waterlogging.',
    },
    growthStageCare: [
      {
        stage: { bn: 'পাতলা ও নিড়ানি', en: 'Thinning & Weeding' },
        guidance: {
          bn: 'চারা গজানোর ১৫ দিনের মধ্যে অতিরিক্ত ঘন গাছ পাতলা করে দিন।',
          en: 'Thin overly dense stands around 15 days so branches spread evenly.',
        },
      },
      {
        stage: { bn: 'ফুল ও মৌচাষ', en: 'Flowering & Bees' },
        guidance: {
          bn: 'ফুল ফোটার সময় জাবপোকার জন্য বিকেলে নিরাপদ ব্যবস্থা নিন—মৌমাছি সুরক্ষায় দিনে স্প্রে এড়িয়ে চলুন।',
          en: 'Protect foraging honeybees during bloom—avoid daytime spraying and scout shoot tips for aphids.',
        },
      },
    ],
    weedManagement: {
      bn: 'বপনের ১৫–২০ দিনের মধ্যে একবার নিড়ানি দিলে সরিষা দ্রুত জমি ঢেকে ফেলে।',
      en: 'A single weeding at 15–20 days keeps beds clean until canopy closure.',
    },
    commonDiseasesAndPests: {
      bn: 'অল্টারনারিয়া পাতা ও শুঁটি ঝলসানো রোগ, জাবপোকা (Aphid) ও করাত পোকা (Sawfly)।',
      en: 'Alternaria Blight, Mustard Aphid, and Mustard Sawfly.',
    },
    preventionAndSafeManagement: {
      bn: 'সময়মতো আগাম বপন (জাবপোকা কমে), পরজীবী প্রাকৃতিক পোকা রক্ষা এবং আক্রান্ত হলে ১৬১২৩-এ পরামর্শ নিয়ে সন্ধ্যায় ব্যবস্থাপনা করুন।',
      en: 'Timely sowing reduces winter aphid pressure; protect bees and consult 16123 if aphids colonize pods.',
    },
    harvesting: {
      bn: 'গাছ ও শুঁটির ৭৫–৮০% হালকা খড়-হলুদ রঙ ধরলে সকালে শিশির থাকা অবস্থায় কাটুন যাতে শুঁটি ফেটে বীজ ঝরে না পড়ে।',
      en: 'Cut in cool mornings when 75–80% of pods turn straw-yellow to prevent shattering losses.',
    },
    postHarvestStorage: {
      bn: '৩–৪ দিন রোদে শুকিয়ে মাড়াই করে পরিষ্কার বাতাসমুক্ত ড্রাম বা টিনে রাখুন।',
      en: 'Sun-dry harvested bundles 3–4 days, thresh cleanly, and seal dry seed in airtight tins.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'মিহি জমি ও বপন', en: 'Fine Prep & Sow' },
        window: { bn: 'অক্টোবর মধ্য – নভেম্বর', en: 'Mid Oct – Nov' },
        action: { bn: 'শোধিত বীজ সারিতে অগভীর বপন।', en: 'Sow treated seed shallowly in rows.' },
      },
      {
        step: 2,
        stage: { bn: 'পাতলা ও প্রথম সেচ', en: 'Thin & Early Water' },
        window: { bn: '১৮–২৫ দিন', en: 'Days 18–25' },
        action: { bn: 'চারা পাতলা ও প্রয়োজনে হালকা সেচ।', en: 'Thin stands and water lightly if dry.' },
      },
      {
        step: 3,
        stage: { bn: 'পূর্ণ ফুল ও মৌমাছি', en: 'Flowering & Pollinate' },
        window: { bn: '৩০–৪৮ দিন', en: 'Days 30–48' },
        action: { bn: 'মৌমাছি সুরক্ষা ও জাবপোকা নজরদারি।', en: 'Guard bees and monitor aphids.' },
      },
      {
        step: 4,
        stage: { bn: 'শুঁটি ও দানা', en: 'Pod Fill' },
        window: { bn: '৫৫–৭০ দিন', en: 'Days 55–70' },
        action: { bn: 'দ্বিতীয় হালকা সেচ ও ব্লাইট পর্যবেক্ষণ।', en: 'Optional moisture and blight check.' },
      },
      {
        step: 5,
        stage: { bn: 'সকালে কাটা ও মাড়াই', en: 'Morning Harvest' },
        window: { bn: '৮০–৯০ দিন', en: 'Days 80–90' },
        action: { bn: '৮০% শুঁটি হলুদ হলে সকালে কাটা।', en: 'Cut dewy morning crops and sun-dry.' },
      },
    ],
  },
  {
    id: 'sesame',
    name: { bn: 'তিল', en: 'Sesame (Til)' },
    aliases: ['til', 'kalo til', 'সাদা তিল', 'তিল'],
    category: 'oilseed',
    categoryLabel: CROP_CATEGORY_LABELS.oilseed,
    imageUrl: CROP_ASSETS.oilseeds,
    sourceType: 'verified_reference',
    waterDemandLevel: 'low',
    overview: {
      bn: 'তিল একটি অত্যন্ত খরা-সহনশীল ও স্বল্প পানির তৈলবীজ ফসল। তবে তিলের শিকড় জলাবদ্ধতা একদমই সহ্য করতে পারে না—তাই পানি নিষ্কাশনই প্রধান শর্ত।',
      en: 'Sesame is a drought-hardy oilseed grown across Bangladesh in Kharif-1, requiring minimal irrigation but strict protection from monsoon waterlogging.',
    },
    suitableVarieties: {
      bn: 'BARI Til-3, BARI Til-4 (বহুফলি ও কালচে-বাদামি), BINA Til-1 ও BINA Til-2।',
      en: 'BARI Til-3, BARI Til-4, BINA Til-1, and BINA Til-2.',
    },
    suitableRegions: {
      bn: 'ফরিদপুর, যশোর, কুষ্টিয়া, পাবনা, রাজশাহী, টাঙ্গাইল ও চরাঞ্চলে ব্যাপকভাবে চাষ হয়।',
      en: 'Major hubs in Faridpur, Jashore, Kushtia, Pabna, Rajshahi, Tangail, and river chars.',
    },
    seasonAndPlanting: {
      bn: 'খরিপ-১ (মধ্য ফেব্রুয়ারি থেকে মার্চ) প্রধান মৌসুম; শরতেও (আগস্ট–সেপ্টেম্বর) উঁচু জমিতে চাষ হয়।',
      en: 'Mainly Kharif-1 (mid-February to March), with late-summer crops in August–September.',
    },
    soilAndPh: {
      bn: 'জল-নিকাশযুক্ত বেলে-দোআঁশ ও দোআঁশ মাটি; অনুকূল pH ৫.৮ থেকে ৭.২।',
      en: 'Well-drained sandy-loam and loamy soils around pH 5.8 to 7.2.',
    },
    landPreparation: {
      bn: 'মাটি মিহি ঝুরঝুরে করে সমতল করুন এবং প্রতি ৫–৬ মিটার পরপর দ্রুত বৃষ্টির পানি সরানোর নালা কেটে দিন।',
      en: 'Prepare a fine seedbed and cut drainage furrows every 5–6 m so sudden pre-monsoon storms exit fast.',
    },
    seedSelectionAndTreatment: {
      bn: 'খুব ছোট বীজ সমানভাবে ফেলতে শুকনো ছাই বা বালির সাথে মিশিয়ে নিন এবং গোড়া পচা রোধে বীজ শোধন করুন।',
      en: 'Mix tiny seeds with dry sand or ash for even distribution and treat against stem rot.',
    },
    plantingMethod: {
      bn: '৩০×৫–৮ সেমি দূরত্বে সারিতে অগভীর বপন করলে কালবৈশাখীর পানি নিষ্কাশন ও নিড়ানি সহজ হয়।',
      en: 'Sow shallowly in 30 cm rows for easy weeding and drainage.',
    },
    fertilizerManagement: {
      bn: 'ভিত্তি জৈব সারের সাথে অল্প সুষম সার ও সালফার-বোরন যথেষ্ট; বেশি নাইট্রোজেন দিলে গাছ লম্বা হয়ে ঝড়ে ভেঙে পড়ে।',
      en: 'Modest basal NPK plus sulfur and boron suffice; heavy nitrogen causes tall weak stems prone to lodging.',
    },
    irrigationSchedule: {
      bn: 'খরা-সহনশীল; তীব্র খরায় ফুল আসার সময় মাত্র ১টি হালকা সেচ দেওয়া যায়। কোনো অবস্থাতেই পানি জমতে দেবেন না।',
      en: 'Needs virtually no watering unless severe drought strikes at flowering; zero waterlogging tolerance.',
    },
    growthStageCare: [
      {
        stage: { bn: 'অঙ্কুর ও পাতলা করা', en: 'Early Thinning' },
        guidance: {
          bn: '১৫–২০ দিনে ঘন চারা পাতলা করে ১০ সেমি ফাঁকা রাখুন।',
          en: 'Thin seedlings by 15–20 days so plants branch sturdily.',
        },
      },
      {
        stage: { bn: 'পাতা জড়ানো পোকা ও নিকাশ', en: 'Webworm & Drainage Watch' },
        guidance: {
          bn: 'কচি ডগায় পাতা জড়ানো পোকা (Leaf Roller) ও কালবৈশাখীর পর নালা পরীক্ষা করুন।',
          en: 'Inspect growing tips for sesame leaf roller and clear drains after spring thunderstorms.',
        },
      },
    ],
    weedManagement: {
      bn: 'বপনের ২০ ও ৩৫ দিনে ২ বার হালকা নিড়ানি দিন।',
      en: 'Weed gently at 20 and 35 days before canopy shading.',
    },
    commonDiseasesAndPests: {
      bn: 'কাণ্ড ও গোড়া পচা (Stem Rot), ফাইলোডি (পাতা ফুলের মতো জটা), পাতা জড়ানো ও শুঁটি ছিদ্রকারী পোকা, বিছা পোকা।',
      en: 'Stem/Root Rot, Phyllody (leafy flower malformation), Leaf & Pod Caterpillar, and Hairy Caterpillar.',
    },
    preventionAndSafeManagement: {
      bn: 'জল নিষ্কাশন নিশ্চিত করা, ফাইলোডি-আক্রান্ত গাছ উপড়ে ফেলা ও পোকা দমনে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Maintain sharp drainage, rogue phyllody plants early, and consult 16123 for webworms.',
    },
    harvesting: {
      bn: 'গাছের নিচের ও মাঝের ৭৫–৮০% শুঁটি (ফল) হলুদাভ হলে এবং পাতা ঝরতে শুরু করলে কেটে ফেলুন—বেশি শুকালে শুঁটি ফেটে বীজ পড়ে যায়।',
      en: 'Harvest when lower leaves shed and 75–80% of capsules turn yellow—over-ripe pods pop open and spill seed.',
    },
    postHarvestStorage: {
      bn: 'আঁটি বেঁধে রোদে খাড়া করে (কাপড় বা চটের ওপর) শুকিয়ে ঝেড়ে পরিষ্কার তিল বায়ুরোধী পাত্রে রাখুন।',
      en: 'Stand bundles upright on clean tarps in sunlight to cure, shake out seeds cleanly, and seal dry.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'নিকাশ-সহ বপন', en: 'Drained Sowing' },
        window: { bn: 'ফেব্রুয়ারি মধ্য – মার্চ', en: 'Mid Feb – Mar' },
        action: { bn: 'নালা কেটে সারিতে অগভীর বপন।', en: 'Prepare drains and sow shallowly in rows.' },
      },
      {
        step: 2,
        stage: { bn: 'পাতলা ও নিড়ানি', en: 'Thin & Weed' },
        window: { bn: '১৫–২৫ দিন', en: 'Days 15–25' },
        action: { bn: 'চারা ফাঁকা করা ও আগাছা পরিষ্কার।', en: 'Thin crowded stands and hand-weed.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল ও শুঁটি শুরু', en: 'Bloom & Capsule Set' },
        window: { bn: '৪০–৫৫ দিন', en: 'Days 40–55' },
        action: { bn: 'বিছা ও ডগা জড়ানো পোকা পরীক্ষা।', en: 'Scout tips for caterpillars and phyllody.' },
      },
      {
        step: 4,
        stage: { bn: 'শুঁটি পাকা', en: 'Capsule Maturation' },
        window: { bn: '৬৫–৮০ দিন', en: 'Days 65–80' },
        action: { bn: 'ঝড়ের পানি দ্রুত সরানো ও রঙ দেখা।', en: 'Keep drains open and watch yellowing.' },
      },
      {
        step: 5,
        stage: { bn: 'ফাটার আগে সংগ্রহ', en: 'Shatter-Safe Cut' },
        window: { bn: '৮৫–৯৫ দিন', en: 'Days 85–95' },
        action: { bn: '৮০% শুঁটি হলুদ হলে কাটা ও শুকানো।', en: 'Cut cleanly before capsules split and sun-cure.' },
      },
    ],
  },
  {
    id: 'sunflower',
    name: { bn: 'সূর্যমুখী', en: 'Sunflower' },
    aliases: ['surjomukhi', 'sunflower', 'সূর্যমুখী', 'উপকূলীয় তৈলবীজ'],
    category: 'oilseed',
    categoryLabel: CROP_CATEGORY_LABELS.oilseed,
    imageUrl: CROP_ASSETS.oilseeds,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'সূর্যমুখী উচ্চ তেলসমৃদ্ধ (৪০–৪৫% তেল) এবং উপকূলীয় হালকা লবণাক্ততা ও খরা-সহিষ্ণু লাভজনক তৈলবীজ ফসল।',
      en: 'Sunflower yields high-quality edible oil (40–45%) and performs well across coastal mild-saline belts after Aman rice harvest.',
    },
    suitableVarieties: {
      bn: 'BARI Surjomukhi-2, BARI Surjomukhi-3 (খাটো ও হেলে পড়া-সহনশীল) এবং হাইসান-৩৩ হাইব্রিড।',
      en: 'BARI Surjomukhi-2, dwarf BARI Surjomukhi-3, and adapted commercial hybrids like Hysun-33.',
    },
    suitableRegions: {
      bn: 'বরিশাল, পটুয়াখালী, বরগুনা, খুলনা, ভোলা, সাতক্ষীরা, যশোর ও ফরিদপুর অঞ্চলে জনপ্রিয়।',
      en: 'Widely adopted in Barishal, Patuakhali, Barguna, Khulna, Bhola, Satkhira, and Faridpur.',
    },
    seasonAndPlanting: {
      bn: 'রবি মৌসুমে (মধ্য নভেম্বর থেকে ডিসেম্বর) প্রধান আবাদ; সারা বছরও চাষযোগ্য।',
      en: 'Main Rabi sowing runs mid-November to December.',
    },
    soilAndPh: {
      bn: 'পানি নিষ্কাশনযুক্ত দোআঁশ, এঁটেল-দোআঁশ ও হালকা লবণাক্ত উপকূলীয় মাটি; pH ৬.০ থেকে ৭.৫।',
      en: 'Well-drained loamy, clay-loam, and mildly saline soils around pH 6.0 to 7.5.',
    },
    landPreparation: {
      bn: '৩–৪ বার চাষ ও মই দিয়ে ঢেলা ভেঙে মাটি তৈরি করুন এবং পানি নিকাশের নালা রাখুন।',
      en: 'Plough 3–4 times to fine tilth and create perimeter drains.',
    },
    seedSelectionAndTreatment: {
      bn: 'পচা ও ছত্রাক দমনে সুস্থ পুষ্ট বীজ শোধন করে বুনুন।',
      en: 'Treat healthy certified seeds gently against seedling damping-off.',
    },
    plantingMethod: {
      bn: '৫০×২৫ সেমি দূরত্বে সারিতে প্রতিটি গর্তে ৩–৪ সেমি গভীরে ১–২টি বীজ ডিবলিং করে চারা গজানোর পর ১টি রাখুন।',
      en: 'Dibble seeds at 50×25 cm spacing and thin to one sturdy plant per hill.',
    },
    fertilizerManagement: {
      bn: 'কম্পোস্ট, NPK-এর সাথে বোরন ও সালফার প্রয়োগ করলে ফুলের মাঝখানের অপুষ্ট দানা (hollow seeds) কমে।',
      en: 'Pair compost and NPK with boron and sulfur via local guidance so center florets fill completely.',
    },
    irrigationSchedule: {
      bn: 'চারা অবস্থায় (২০–২৫ দিন), ফুলের কুঁড়ি আসার সময় (৪৫–৫০ দিন) ও দানা গঠনের সময় (৬৫–৭০ দিন) পরিমিত সেচ দিন।',
      en: 'Critical moisture windows: seedling stage, star-bud initiation, and seed filling.',
    },
    growthStageCare: [
      {
        stage: { bn: 'মাটি তোলা ও পরাগায়ন', en: 'Earthing Up & Bees' },
        guidance: {
          bn: 'গোড়ায় হালকা মাটি তুলে দিন; মৌমাছি কম থাকলে নরম সুতির কাপড় দিয়ে ফুলের মুখে আলতো বুলিয়ে পরাগায়ন সহায়তা করুন।',
          en: 'Earth up stalk bases against wind; gently brush heads with soft cloth if honeybees are scarce.',
        },
      },
      {
        stage: { bn: 'পাখি থেকে রক্ষা', en: 'Bird Protection' },
        guidance: {
          bn: 'দানা ভরাটের সময় টিয়া-কাকের হাত থেকে ফুল রক্ষা করতে নেট বা রিফ্লেক্টিভ রিবন ব্যবহার করুন।',
          en: 'Protect ripening seed heads from parrots and crows using netting or reflective tape.',
        },
      },
    ],
    weedManagement: {
      bn: 'বপনের ২০–২৫ দিনের মধ্যে নিড়ানি ও মাটি তোলার মাধ্যমে আগাছা দমন করুন।',
      en: 'Weed once around days 20–25 before broad leaves cover rows.',
    },
    commonDiseasesAndPests: {
      bn: 'পাতার দাগ/ব্লাইট, গোড়া পচা (Sclerotium), বিছা পোকা ও পাখির আক্রমণ।',
      en: 'Alternaria Leaf Blight, Sclerotium Collar Rot, Hairy Caterpillar, and Birds.',
    },
    preventionAndSafeManagement: {
      bn: 'রোগাক্রান্ত পাতা-গাছ সরানো, সুষম বোরন-পুষ্টি এবং বিছা পোকায় আলোর ফাঁদ বা ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Ensure drainage, remove sclerotium-wilted plants, hand-collect hairy caterpillars early, and consult 16123.',
    },
    harvesting: {
      bn: 'পুষ্পমঞ্জরির পেছন দিক সবুজ থেকে হলদে-বাদামি হলে এবং পাপড়ি শুকিয়ে ঝরে পড়লে মাথা কেটে নিন।',
      en: 'Cut heads once backs turn lemon-yellow to brown and ray petals dry.',
    },
    postHarvestStorage: {
      bn: 'মাথা ২–৩ দিন রোদে শুকিয়ে মাড়াই করে পরিষ্কার শুকনো বীজ বায়ুরোধী ড্রামে সংরক্ষণ করুন।',
      en: 'Sun-dry heads, thresh seeds cleanly, dry further, and seal in dry airtight containers.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'ডিবলিং বপন', en: 'Hill Dibbling' },
        window: { bn: 'নভেম্বর মধ্য – ডিসেম্বর', en: 'Mid Nov – Dec' },
        action: { bn: '৫০×২৫ সেমি দূরত্বে বীজ বপন।', en: 'Dibble seeds cleanly at 50×25 cm.' },
      },
      {
        step: 2,
        stage: { bn: 'পাতলা ও মাটি তোলা', en: 'Thin & Earth Up' },
        window: { bn: '২০–২৫ দিন', en: 'Days 20–25' },
        action: { bn: 'নিড়ানি, গোড়ায় মাটি ও প্রথম সেচ।', en: 'Weed, earth up stalks, and water.' },
      },
      {
        step: 3,
        stage: { bn: 'কুঁড়ি ও ফুল', en: 'Bud & Flowering' },
        window: { bn: '৪৫–৬০ দিন', en: 'Days 45–60' },
        action: { bn: 'মৌমাছি পরাগায়ন ও দ্বিতীয় সেচ।', en: 'Support pollination and moisture.' },
      },
      {
        step: 4,
        stage: { bn: 'দানা ভরাট', en: 'Seed Filling' },
        window: { bn: '৭০–৮৫ দিন', en: 'Days 70–85' },
        action: { bn: 'তৃতীয় সেচ ও পাখি তাড়ানো।', en: 'Third irrigation and guard seed heads.' },
      },
      {
        step: 5,
        stage: { bn: 'মাথা কাটা ও মাড়াই', en: 'Head Harvest' },
        window: { bn: '৯৫–১১০ দিন', en: 'Days 95–110' },
        action: { bn: 'মাথার পেছন হলুদ হলে কেটে শুকানো।', en: 'Cut heads once backs yellow and sun-dry.' },
      },
    ],
  },
  {
    id: 'soybean',
    name: { bn: 'সয়াবিন', en: 'Soybean' },
    aliases: ['soya', 'soybean', 'সয়াবিন', 'নোয়াখালী', 'লক্ষ্মীপুর'],
    category: 'oilseed',
    categoryLabel: CROP_CATEGORY_LABELS.oilseed,
    imageUrl: CROP_ASSETS.oilseeds,
    sourceType: 'verified_reference',
    waterDemandLevel: 'low',
    overview: {
      bn: 'সয়াবিন প্রোটিন (৪০%) ও ভোজ্যতেল (২০%) সমৃদ্ধ বাংলাদেশের দক্ষিণাঞ্চলের একটি অত্যন্ত অর্থকরী রবি ফসল, যা শিকড়ের অর্বুদে নাইট্রোজেন জমা করে মাটির উর্বরতা বাড়ায়।',
      en: 'Soybean is an anchor coastal Rabi oilseed-legume crop in Bangladesh (40% protein, 20% oil) that naturally enriches soil nitrogen.',
    },
    suitableVarieties: {
      bn: 'BARI Soybean-5, BARI Soybean-6, BU Soybean-1 ও BINA Soybean-5।',
      en: 'BARI Soybean-5, BARI Soybean-6, BU Soybean-1, and BINA Soybean-5.',
    },
    suitableRegions: {
      bn: 'লক্ষ্মীপুর, নোয়াখালী, চাঁদপুর, ভোলা, বরিশাল, ফেনী ও যশোর জেলায় ব্যাপক বাণিজ্যিক চাষ হয়।',
      en: 'Concentrated in Lakshmipur, Noakhali, Chandpur, Bhola, Barishal, Feni, and Jashore.',
    },
    seasonAndPlanting: {
      bn: 'রবি মৌসুম (মধ্য ডিসেম্বর থেকে মধ্য জানুয়ারি) প্রধান বপনের সময়; খরিপে (জুলাই–আগস্ট) বীজ ফসলের জন্য চাষ হয়।',
      en: 'Main Rabi sowing mid-December to mid-January; Kharif seed plots Jul–Aug.',
    },
    soilAndPh: {
      bn: 'সুনিষ্কাশিত দোআঁশ, পলি-দোআঁশ ও হালকা লবণাক্ত উপকূলীয় মাটি; আদর্শ pH ৬.০ থেকে ৭.০।',
      en: 'Well-drained loamy, alluvial silt, and mildly coastal soils around pH 6.0 to 7.0.',
    },
    landPreparation: {
      bn: 'জো অবস্থায় ৩ বার চাষ ও মই দিয়ে জমি সমতল ও আগাছামুক্ত করুন।',
      en: 'Prepare a level, weed-free seedbed with 3 ploughings at optimal soil moisture.',
    },
    seedSelectionAndTreatment: {
      bn: 'রাইজোবিয়াম (Rhizobium) জীবাণু সার দিয়ে বীজ মাখিয়ে (inoculation) বুনলে ইউরিয়া খুব কম লাগে এবং শুঁটি বেশি ধরে; সতেজ বীজ (৮০%+ গজানো) নিন।',
      en: 'Inoculate fresh, high-germination seed with Bradyrhizobium biofertilizer before sowing to maximize nodulation.',
    },
    plantingMethod: {
      bn: '৩০×৫–৭ সেমি সারিতে ৩ সেমি গভীরে বীজ বুনুন (গভীর করে বুনলে চারা মাটি ফুঁড়ে বেরোতে পারে না)।',
      en: 'Sow shallowly (3 cm) in 30 cm lines; deeper planting impairs cotyledon emergence.',
    },
    fertilizerManagement: {
      bn: 'জীবাণু সার ব্যবহার করলে ইউরিয়ার চাহিদা অত্যন্ত কমে যায়; ফসফরাস, পটাশ, সালফার ও বোরন ভিত্তি সার হিসেবে দিন।',
      en: 'Inoculated crops need minimal nitrogen; emphasize basal phosphorus, potassium, sulfur, and molybdenum via SRDI advice.',
    },
    irrigationSchedule: {
      bn: 'ফুল ফোটার আগে (৩০–৩৫ দিন) ও শুঁটি ভরাটের সময় (৫৫–৬০ দিন) ১–২টি হালকা সেচ দিন; জলাবদ্ধতা এড়ান।',
      en: 'Provide 1–2 light irrigations during flowering and pod fill if dry; avoid standing water.',
    },
    growthStageCare: [
      {
        stage: { bn: 'পাতা মোড়ানো ও বিছা পোকা', en: 'Foliage Scouting' },
        guidance: {
          bn: 'অঙ্গজ বৃদ্ধির সময় পাতা মোড়ানো পোকা ও বিছা পোকার আক্রমণ হলে পাতাসহ পোকা সংগ্রহ করে নষ্ট করুন।',
          en: 'Hand-pick gregarious hairy caterpillars and inspect leaves for leaf folders early.',
        },
      },
      {
        stage: { bn: 'হলুদ মোজাইক দেখা', en: 'Virus Check' },
        guidance: {
          bn: 'হলুদ মোজাইক ভাইরাসে আক্রান্ত কুঁকড়ে যাওয়া গাছ তুলে সরিয়ে দিন।',
          en: 'Rogue yellow mosaic virus plants early and monitor whiteflies.',
        },
      },
    ],
    weedManagement: {
      bn: 'বপনের ২০ ও ৪০ দিনের মধ্যে ২ বার নিড়ানি দিন।',
      en: 'Weed twice around 20 and 40 days after sowing.',
    },
    commonDiseasesAndPests: {
      bn: 'হলুদ মোজাইক ভাইরাস (YMV), অ্যানথ্রাকনোজ, বিছা পোকা, পাতা মোড়ানো ও শুঁটি ছিদ্রকারী পোকা।',
      en: 'Soybean Yellow Mosaic Virus, Anthracnose, Hairy Caterpillar, Leaf Folder, and Pod Borer.',
    },
    preventionAndSafeManagement: {
      bn: 'রোগমুক্ত সতেজ বীজ, হলুদ আঠালো ফাঁদ, পাখি বসার ডাল পোঁতা (perching) ও প্রয়োজনে ১৬১২৩-এর পরামর্শ নিন।',
      en: 'Sow clean seed, install bird perches for caterpillars, use yellow sticky traps, and consult 16123.',
    },
    harvesting: {
      bn: 'গাছের পাতা হলুদ হয়ে ঝরে পড়লে ও ৯০% শুঁটি বাদামি-খড়ের রঙ ধারণ করলে শুঁটি ফেটে যাওয়ার আগে কাটুন।',
      en: 'Harvest once leaves drop and 90% of pods turn golden-brown before shattering.',
    },
    postHarvestStorage: {
      bn: 'ভালোভাবে শুকিয়ে মাড়াই করে ঠান্ডা ও আর্দ্রতামুক্ত বায়ুরোধী ড্রামে রাখুন (সয়াবিন বীজের গজানোর ক্ষমতা খুব দ্রুত কমে)।',
      en: 'Dry gently in sun/shade, thresh cleanly, and store in airtight moisture-proof containers (seed viability drops fast in humidity).',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'জীবাণু সার ও বপন', en: 'Inoculate & Sow' },
        window: { bn: 'ডিসেম্বর মধ্য – জানুয়ারি মধ্য', en: 'Mid Dec – Mid Jan' },
        action: { bn: 'রাইজোবিয়াম মিশিয়ে অগভীর সারিতে বপন।', en: 'Inoculate seed and sow shallowly.' },
      },
      {
        step: 2,
        stage: { bn: 'নিড়ানি ও পোকা দেখা', en: 'Weeding' },
        window: { bn: '২০–৩০ দিন', en: 'Days 20–30' },
        action: { bn: 'প্রথম নিড়ানি ও বিছা পোকা বাছাই।', en: 'Weed rows and inspect for caterpillars.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল ও প্রথম সেচ', en: 'Flowering' },
        window: { bn: '৩৫–৫০ দিন', en: 'Days 35–50' },
        action: { bn: 'শুঁটি ধরার সময় হালকা সেচ ও পার্চিং।', en: 'Light irrigation and bird perches.' },
      },
      {
        step: 4,
        stage: { bn: 'শুঁটি পুষ্ট হওয়া', en: 'Pod Filling' },
        window: { bn: '৫৫–৮০ দিন', en: 'Days 55–80' },
        action: { bn: 'রস বজায় রাখা ও রোগ নজরদারি।', en: 'Maintain light moisture until pods fill.' },
      },
      {
        step: 5,
        stage: { bn: 'সংগ্রহ ও শুকানো', en: 'Harvest & Seal' },
        window: { bn: '৯৫–১১০ দিন', en: 'Days 95–110' },
        action: { bn: 'পাতা ঝরে শুঁটি বাদামি হলে কাটা ও সংরক্ষণ।', en: 'Reap at 90% brown pods, thresh, and seal.' },
      },
    ],
  },
  {
    id: 'groundnut',
    name: { bn: 'চিনাবাদাম', en: 'Groundnut (Peanut)' },
    aliases: ['chinabadam', 'badam', 'peanut', 'চিনাবাদাম', 'বাদাম'],
    category: 'oilseed',
    categoryLabel: CROP_CATEGORY_LABELS.oilseed,
    imageUrl: CROP_ASSETS.oilseeds,
    sourceType: 'verified_reference',
    waterDemandLevel: 'low',
    overview: {
      bn: 'চিনাবাদাম বাংলাদেশের চরাঞ্চল ও বেলে-দোআঁশ মাটির অত্যন্ত লাভজনক তৈল ও প্রোটিন ফসল। মাটির নিচে পেগ (peg) ঢুকে বাদাম তৈরি হয় বলে ঝুরঝুরে মাটি ও ক্যালসিয়াম-জিপসাম খুবই জরুরি।',
      en: 'Groundnut thrives in Bangladesh’s sandy river chars and light loams; friable topsoil and gypsum (calcium/sulfur) support underground pod formation.',
    },
    suitableVarieties: {
      bn: 'BARI Chinabadam-8, BARI Chinabadam-9, BINA Chinabadam-4 ও ঢাকা-১।',
      en: 'BARI Chinabadam-8, BARI Chinabadam-9, BINA Chinabadam-4, and Dhaka-1.',
    },
    suitableRegions: {
      bn: 'বগুড়া, সিরাজগঞ্জ, জামালপুর, কিশোরগঞ্জ (হাওর-উঁচু জমি), নোয়াখালী, ভোলা, চরফ্যাশন ও কুড়িগ্রাম।',
      en: 'Widely grown in Bogura, Sirajganj, Jamalpur, Kishoreganj, Noakhali, Bhola, and Kurigram chars.',
    },
    seasonAndPlanting: {
      bn: 'রবি (অক্টোবর–ডিসেম্বর) এবং খরিপ-১ (মার্চ–এপ্রিল) উভয় মৌসুমে চাষ হয়; রবিতে ফলন বেশি।',
      en: 'Rabi (Oct–Dec) yields highest; Kharif-1 sowing runs Mar–Apr.',
    },
    soilAndPh: {
      bn: 'অতি ঝুরঝুরে বেলে, বেলে-দোআঁশ ও পলি মাটি (পেগ সহজে মাটিতে ঢোকে ও দাগ ছাড়া বাদাম তোলা যায়); pH ৬.০ থেকে ৭.০।',
      en: 'Loose, well-drained sandy and sandy-loam soils around pH 6.0 to 7.0 so pegs penetrate easily.',
    },
    landPreparation: {
      bn: '৩–৪ বার চাষ ও মই দিয়ে মাটি ঝুরঝুরে এবং আগাছামুক্ত করে নিন।',
      en: 'Plough 3–4 times to create a fine, deep, weed-free seedbed.',
    },
    seedSelectionAndTreatment: {
      bn: 'বপনের মাত্র কয়েক দিন আগে বাদামের খোসা ছাড়ান (আগে খোসা ছাড়ালে গজানোর হার কমে), পুষ্ট দানা বেছে শোধন করুন।',
      en: 'Shell pods only a few days prior to sowing (early shelling loses vigor), pick plump kernels, and treat safely.',
    },
    plantingMethod: {
      bn: '৩০×১৫ সেমি দূরত্বে সারিতে ৪–৫ সেমি গভীরে দানা পুঁতে দিন।',
      en: 'Plant single kernels 4–5 cm deep along 30×15 cm rows.',
    },
    fertilizerManagement: {
      bn: 'জৈব সার ও ভিত্তি ফসফরাস-পটাশের পাশাপাশি ফুল ফোটার সময় (৩০–৩৫ দিনে) মাটিতে জিপসাম ও বোরন মিশিয়ে দিলে বাদামের খোসার ভেতর ফাঁকা থাকে না।',
      en: 'Combine compost and basal NPK with gypsum/calcium around early flowering so shells fill solidly without "pops".',
    },
    irrigationSchedule: {
      bn: 'খরা-সহনশীল ফসল; চরের রসেই হয়ে যায়—শুষ্ক জমিতে ফুল ও পেগ মাটিতে ঢোকার সময় ১–২টি হালকা সেচ উপকারী।',
      en: 'Thrives on residual char moisture; in dry uplands, light water at flowering and pegging boosts pod fill.',
    },
    growthStageCare: [
      {
        stage: { bn: 'পেগ ঢোকা ও গোড়ায় মাটি', en: 'Pegging Stage (Care)' },
        guidance: {
          bn: 'ফুল থেকে সরু পেগ মাটিতে ঢোকার সময় (৪০–৫০ দিন) গোড়ার মাটি হালকা ঝুরঝুরে করে দিন, তবে শিকড় বা পেগ ছিঁড়বেন না।',
          en: 'Loosen crusting gently before pegs enter soil around days 40–50; never disturb anchored pegs afterward.',
        },
      },
      {
        stage: { bn: 'পাতা দাগ ও ক্যাটারপিলার', en: 'Leaf Spot Watch' },
        guidance: {
          bn: 'নিচের পাতায় গোল কালচে-বাদামি টিক্কা দাগ দেখা যায় কি না নজর রাখুন।',
          en: 'Inspect lower foliage for circular dark-brown Tikka leaf spots.',
        },
      },
    ],
    weedManagement: {
      bn: 'পেগ মাটিতে ঢোকার আগেই ২০ ও ৩৫ দিনের মধ্যে দুবার নিড়ানি শেষ করে ফেলুন।',
      en: 'Complete both weedings before day 35 ahead of underground pegging.',
    },
    commonDiseasesAndPests: {
      bn: 'পাতার টিক্কা দাগ (Tikka Leaf Spot), মরিচা, গোড়া পচা, জ্যাসিড ও বিছা পোকা।',
      en: 'Tikka Leaf Spot, Rust, Collar Rot, Jassids, and Hairy Caterpillar.',
    },
    preventionAndSafeManagement: {
      bn: 'ফসল আবর্তন, রোগ-সহনশীল জাত (BARI-8/9) ও পাতায় টিক্কা দাগ বাড়লে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Rotate crops, grow BARI-8/9 tolerant varieties, and consult 16123 if Tikka spots spread upward.',
    },
    harvesting: {
      bn: 'পাতা হলুদ হয়ে ঝরে গেলে ও কয়েকটি গাছ তুলে খোসার ভেতর কালচে দাগ (অন্তত ৭৫% বাদাম পুষ্ট) দেখলে মাটি থেকে তুলে ফেলুন।',
      en: 'Pull plants when leaves yellow and 75% of opened sample pods show dark inner shell mottling.',
    },
    postHarvestStorage: {
      bn: 'বাদাম ছড়িয়ে ৫–৬ দিন ভালোভাবে রোদে শুকিয়ে ঠান্ডা করে চট বা লাইনারযুক্ত বস্তায় শুষ্ক মাচায় রাখুন (আর্দ্রতা ছত্রাক/আফ্লাটক্সিন বাড়ায়)।',
      en: 'Sun-dry pods thoroughly for 5–6 days until kernels rattle inside shells, then store dry off the floor to prevent mold.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'তাজা দানা বপন', en: 'Fresh Kernel Sow' },
        window: { bn: 'অক্টোবর–ডিসেম্বর', en: 'Oct – Dec' },
        action: { bn: 'খোসা ছাড়িয়েই দ্রুত শোধন ও বপন।', en: 'Shell, treat safely, and sow at 30×15 cm.' },
      },
      {
        step: 2,
        stage: { bn: 'প্রাথমিক নিড়ানি', en: 'Early Weeding' },
        window: { bn: '১৫–৩০ দিন', en: 'Days 15–30' },
        action: { bn: 'পেগ নামার আগেই আগাছা পরিষ্কার।', en: 'Weed completely before pegs descend.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল, জিপসাম ও পেগিং', en: 'Bloom & Pegging' },
        window: { bn: '৩৫–৫৫ দিন', en: 'Days 35–55' },
        action: { bn: 'গোড়ায় মাটি আলগা ও ক্যালসিয়াম-জিপসাম।', en: 'Side-dress gypsum gently and keep crust loose.' },
      },
      {
        step: 4,
        stage: { bn: 'বাদাম পুষ্ট হওয়া', en: 'Pod Maturation' },
        window: { bn: '৬৫–১১০ দিন', en: 'Days 65–110' },
        action: { bn: 'টিক্কা রোগ ও ইঁদুর পর্যবেক্ষণ।', en: 'Scout leaf spots and guard against rodents.' },
      },
      {
        step: 5,
        stage: { bn: 'উত্তোলন ও শুকানো', en: 'Pull & Sun-Dry' },
        window: { bn: '১২০–১৪০ দিন', en: 'Days 120–140' },
        action: { bn: 'খোসার ভেতর দাগ দেখে তোলা ও রোদে শুকানো।', en: 'Lift at 75% pod maturity and dry thoroughly.' },
      },
    ],
  },

  // ======================== PULSES (6) ========================
  {
    id: 'lentil',
    name: { bn: 'মসুর ডাল', en: 'Lentil (Mosur)' },
    aliases: ['mosur', 'masoor', 'dal', 'মসুর', 'বারি মসুর'],
    category: 'pulse',
    categoryLabel: CROP_CATEGORY_LABELS.pulse,
    imageUrl: CROP_ASSETS.pulsesJute,
    sourceType: 'verified_reference',
    waterDemandLevel: 'low',
    overview: {
      bn: 'মসুর বাংলাদেশের মানুষের সবচেয়ে জনপ্রিয় ও আমিষসমৃদ্ধ ডাল ফসল। জলাবদ্ধতা-মুক্ত জমিতে স্বল্প খরচ ও কম পানিতে শীতকালে খুব ভালো ফলন দেয়।',
      en: 'Lentil is Bangladesh’s leading pulse crop—an affordable, nitrogen-fixing Rabi staple thriving on residual soil moisture.',
    },
    suitableVarieties: {
      bn: 'স্টেমফিলিয়াম ব্লাইট-সহনশীল BARI Masur-6, BARI Masur-7, BARI Masur-8, BARI Masur-9 ও BINA Masur-8।',
      en: 'Stemphylium-tolerant BARI Masur-6, 7, 8, and 9 alongside BINA Masur-8.',
    },
    suitableRegions: {
      bn: 'ফরিদপুর, রাজবাড়ী, যশোর, ঝিনাইদহ, কুষ্টিয়া, নাটোর, পাবনা ও রাজশাহী অঞ্চলে ব্যাপক।',
      en: 'Major pulse belt covers Faridpur, Rajbari, Jashore, Jhenaidah, Kushtia, Natore, Pabna, and Rajshahi.',
    },
    seasonAndPlanting: {
      bn: 'অক্টোবর শেষ থেকে মধ্য নভেম্বর (কার্তিক) পর্যন্ত বপনের উত্তম সময়।',
      en: 'Best sown late October through mid-November.',
    },
    soilAndPh: {
      bn: 'জল জমে না এমন দোআঁশ ও পলি-দোআঁশ মাটি; অনুকূল pH ৬.০ থেকে ৭.৫।',
      en: 'Well-drained loamy and silt-loam soils around pH 6.0 to 7.5.',
    },
    landPreparation: {
      bn: '২–৩ বার চাষ ও মই দিয়ে আগাছা পরিষ্কার ও সমতল করুন; নিকাশ নালা রাখুন।',
      en: 'Prepare with 2–3 light ploughings, clean weeds, and maintain surface drains.',
    },
    seedSelectionAndTreatment: {
      bn: 'উন্নত প্রত্যয়িত বীজ গোড়া পচা রোধে শোধন করে এবং ভালো ফলনের জন্য রাইজোবিয়াম জীবাণু সার দিয়ে মাখিয়ে বুনুন।',
      en: 'Treat against root rot and inoculate seed with lentil Rhizobium biofertilizer.',
    },
    plantingMethod: {
      bn: '৩০ সেমি সারিতে বা ছিটিয়ে ৩–৪ সেমি গভীরে বপন করুন।',
      en: 'Sow in 30 cm lines or evenly broadcast at 3–4 cm depth.',
    },
    fertilizerManagement: {
      bn: 'ডাল ফসল নিজ শিকড়ে নাইট্রোজেন জমা করে; তাই জমি তৈরিতে স্বল্প ফসফরাস, পটাশ, সালফার ও বোরন ভিত্তি সারই যথেষ্ট।',
      en: 'Legume nodules supply most nitrogen; focus on modest basal phosphorus, potash, sulfur, and boron per soil guidance.',
    },
    irrigationSchedule: {
      bn: 'সাধারণত বৃষ্টির বা মাটির রসেই হয়; অতিরিক্ত শুষ্ক হলে শুধুমাত্র ১ বার ফুল ফোটার আগে হালকা স্প্রে/প্লাবন না করে ছিপছিপে সেচ দিন।',
      en: 'Usually grown on residual moisture; if soil cracks dry, give a single very light flush before bloom without waterlogging.',
    },
    growthStageCare: [
      {
        stage: { bn: 'আগাছা ও প্রাথমিক চারা', en: 'Seedling Stage' },
        guidance: {
          bn: 'বপনের ২৫–৩০ দিনে একবার আগাছা পরিষ্কার করলে গাছ দ্রুত শাখা ছড়ায়।',
          en: 'Hand-weed cleanly at 25–30 days so delicate seedlings branch out.',
        },
      },
      {
        stage: { bn: 'কুয়াশা ও ফুল-শুঁটি পর্যায়', en: 'Fog & Pod Stage' },
        guidance: {
          bn: 'ঘন কুয়াশায় ডগার পাতা ঝলসে যাওয়া (Stemphylium Blight) ও জাবপোকা নিয়মিত দেখুন।',
          en: 'Scout closely during winter fog for Stemphylium leaf drop and aphids on flower tips.',
        },
      },
    ],
    weedManagement: {
      bn: 'বপনের ৩০ দিনের মধ্যে ১ বার হাত নিড়ানি অত্যন্ত গুরুত্বপূর্ণ।',
      en: 'One thorough hand weeding within 30 days prevents shading.',
    },
    commonDiseasesAndPests: {
      bn: 'স্টেমফিলিয়াম ব্লাইট (কুয়াশায় পাতা ও ফুল ঝলসানো), মরিচা রোগ, গোড়া পচা, জাবপোকা ও পড বোরার।',
      en: 'Stemphylium Blight, Rust, Foot/Collar Rot, Aphids, and Pod Borer.',
    },
    preventionAndSafeManagement: {
      bn: 'আগাম বপন, BARI Masur-6/8 জাতীয় সহনশীল জাত ও কুয়াশায় ব্লাইট-জাবপোকা দেখা দিলে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Sow on time, use tolerant varieties (BARI-6/8), and consult 16123 immediately if Stemphylium blight starts in fog.',
    },
    harvesting: {
      bn: 'গাছ হলুদ-বাদামি হয়ে ৮০% শুঁটি পেকে গেলে সকালের দিকে তুলে নিন যাতে শুঁটি না ফেটে যায়।',
      en: 'Pull or cut in early morning once 80% of pods turn straw-brown to prevent shattering.',
    },
    postHarvestStorage: {
      bn: 'রোদে ভালোভাবে শুকিয়ে মাড়াই করে পোকামুক্ত বায়ুরোধী ড্রামে নিমপাতাসহ সংরক্ষণ করুন।',
      en: 'Sun-dry cleanly, thresh, dry grain thoroughly, and seal against pulse beetles (bruchids).',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'শোধন ও বপন', en: 'Treat & Sow' },
        window: { bn: 'নভেম্বর', en: 'November' },
        action: { bn: 'রাইজোবিয়াম মিশিয়ে সারিতে বপন।', en: 'Inoculate and sow in 30 cm rows.' },
      },
      {
        step: 2,
        stage: { bn: 'একবার নিড়ানি', en: 'Hand Weeding' },
        window: { bn: '২৫–৩০ দিন', en: 'Days 25–30' },
        action: { bn: 'আগাছা পরিষ্কার ও গোড়া পচা দেখা।', en: 'Weed once cleanly and check stand.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল ও ব্লাইট দেখা', en: 'Bloom & Fog Watch' },
        window: { bn: '৫০–৭০ দিন', en: 'Days 50–70' },
        action: { bn: 'কুয়াশায় স্টেমফিলিয়াম ও জাবপোকা দেখা।', en: 'Scout fog blight and flower aphids.' },
      },
      {
        step: 4,
        stage: { bn: 'শুঁটি ভরাট', en: 'Pod Maturation' },
        window: { bn: '৮০–৯৫ দিন', en: 'Days 80–95' },
        action: { bn: 'পড বোরার পর্যবেক্ষণ ও শুকানো।', en: 'Monitor pod borers as foliage yellows.' },
      },
      {
        step: 5,
        stage: { bn: 'সকালে সংগ্রহ', en: 'Harvest & Seal' },
        window: { bn: '১০৫–১১৫ দিন', en: 'Days 105–115' },
        action: { bn: '৮০% শুঁটি পাকলে তোলা ও মাড়াই।', en: 'Pull at dawn, dry, thresh, and seal.' },
      },
    ],
  },
  {
    id: 'mung-bean',
    name: { bn: 'মুগ ডাল', en: 'Mung Bean' },
    aliases: ['mug dal', 'moong', 'mug', 'মুগ', 'সোনা মুগ', 'বারি মুগ-৬'],
    category: 'pulse',
    categoryLabel: CROP_CATEGORY_LABELS.pulse,
    imageUrl: CROP_ASSETS.pulsesJute,
    sourceType: 'verified_reference',
    waterDemandLevel: 'low',
    overview: {
      bn: 'মুগ ডাল বাংলাদেশের গ্রীষ্ম-রবি অন্তর্বর্তী (খরিপ-১) মৌসুমের অতি স্বল্পমেয়াদি (৬০–৬৫ দিন) অর্থকরী ডাল ফসল। এটি মাটির জৈব পদার্থ ও নাইট্রোজেন সমৃদ্ধ করে।',
      en: 'Mung bean is a rapid 60–65 day summer pulse bridging Rabi and Aman crops across Bangladesh while rebuilding soil nitrogen.',
    },
    suitableVarieties: {
      bn: 'BARI Mung-6 (একসাথে পাকে ও বড় দানা), BARI Mung-8, BINA Mung-5 ও BINA Mung-8।',
      en: 'Synchronized-maturing BARI Mung-6, BARI Mung-8, BINA Mung-5, and BINA Mung-8.',
    },
    suitableRegions: {
      bn: 'পটুয়াখালী, বরিশাল, ভোলা, বরগুনা, যশোর, ঝিনাইদহ, ফরিদপুর ও নাটোরে ব্যাপক চাষ।',
      en: 'Major belts span Patuakhali, Barishal, Bhola, Barguna, Jashore, Jhenaidah, Faridpur, and Natore.',
    },
    seasonAndPlanting: {
      bn: 'খরিপ-১ (মধ্য ফেব্রুয়ারি থেকে মধ্য মার্চ) প্রধান মৌসুম; শরতে (আগস্ট–সেপ্টেম্বর) উঁচু জমিতেও চাষ হয়।',
      en: 'Mainly Kharif-1 (mid-February to mid-March); also late-summer Aug–Sep on uplands.',
    },
    soilAndPh: {
      bn: 'জল-নিকাশযুক্ত দোআঁশ, পলি-দোআঁশ ও বেলে-দোআঁশ মাটি; অনুকূল pH ৬.২ থেকে ৭.২।',
      en: 'Well-drained loamy, silt-loam, and sandy-loam soils around pH 6.2 to 7.2.',
    },
    landPreparation: {
      bn: '২–৩ বার চাষ ও মই দিয়ে সমতল করে কালবৈশাখীর জল সরানোর নালা রাখুন।',
      en: 'Plough 2–3 times and cut drainage channels to prevent spring-storm waterlogging.',
    },
    seedSelectionAndTreatment: {
      bn: 'হলুদ মোজাইক-মুক্ত সুস্থ বীজ রাইজোবিয়াম জীবাণু সার দিয়ে মাখিয়ে বুনুন।',
      en: 'Inoculate clean YMV-tolerant seed with Rhizobium biofertilizer before sowing.',
    },
    plantingMethod: {
      bn: '৩০×১০ সেমি সারিতে ৩–৪ সেমি গভীরে বপন করুন।',
      en: 'Sow in 30×10 cm lines at 3–4 cm depth.',
    },
    fertilizerManagement: {
      bn: 'জীবাণু সার দিলে ইউরিয়া খুব সামান্যই লাগে; জমি তৈরিতে ফসফরাস-পটাশ ও সালফার ভিত্তি সার হিসেবে দিন।',
      en: 'Minimal starter nitrogen with basal phosphorus, potash, and sulfur works best for nodulating plants.',
    },
    irrigationSchedule: {
      bn: 'মাটিতে রস না থাকলে ফুল ও শুঁটি বাঁধার সময় মাত্র ১টি হালকা সেচ যথেষ্ট; জল দাঁড়াতে দেবেন না।',
      en: 'Typically rainfed; a single light irrigation at flowering helps if dry, while standing water kills roots quickly.',
    },
    growthStageCare: [
      {
        stage: { bn: 'থ্রিপস ও সাদা মাছি দেখা', en: 'Thrips & Whitefly Care' },
        guidance: {
          bn: 'ফুল কুঁড়ি ঝরে যাওয়া (থ্রিপস) ও পাতা হলুদ হওয়া (YMV বাহক সাদা মাছি) প্রাথমিক অবস্থায় পরীক্ষা করুন।',
          en: 'Scout flower buds early for thrips and monitor whiteflies to protect against Yellow Mosaic Virus.',
        },
      },
      {
        stage: { bn: 'সবুজ সার (পচিয়ে দেওয়া)', en: 'Residue Incorporation' },
        guidance: {
          bn: 'শুঁটি তোলার পর সবুজ মুগ গাছ মাটিতে চাষ দিয়ে মিশিয়ে দিলে পরের আমন ধানের সার খরচ কমে।',
          en: 'Plough remaining green haulms into soil after picking pods to nourish the following Aman rice crop.',
        },
      },
    ],
    weedManagement: {
      bn: 'বপনের ১৫–২০ দিনের মধ্যে একবার নিড়ানি দিলেই মুগ দ্রুত জমি ঢেকে ফেলে।',
      en: 'One early weeding around days 15–20 keeps fields clean until canopy closure.',
    },
    commonDiseasesAndPests: {
      bn: 'হলুদ মোজাইক ভাইরাস (YMV), পাউডারি মিলডিউ, থ্রিপস, জাবপোকা ও পড বোরার।',
      en: 'Mungbean Yellow Mosaic Virus, Powdery Mildew, Flower Thrips, Aphids, and Pod Borer.',
    },
    preventionAndSafeManagement: {
      bn: 'রোগ-প্রতিরোধী BARI Mung-6/8 চাষ, হলুদ-নীল ফাঁদ, আক্রান্ত গাছ সরানো এবং থ্রিপস-বোরারের জন্য ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Grow YMV-resistant BARI Mung-6/8, use blue/yellow traps, rogue mosaic plants, and consult 16123.',
    },
    harvesting: {
      bn: 'শুঁটি কালো-বাদামি হয়ে পাকলে BARI Mung-6 প্রায় একসাথে (১–২ বারে) তোলা যায়।',
      en: 'Pick pods in 1–2 synchronized rounds once they turn dark brown/black.',
    },
    postHarvestStorage: {
      bn: 'ভালোভাবে রোদে শুকিয়ে মাড়াই করে পরিষ্কার ও বায়ুরোধী ড্রামে রাখুন যাতে ঘুণ পোকা (bruchid) না লাগে।',
      en: 'Sun-dry pods thoroughly, thresh cleanly, dry kernels well, and seal tightly against bruchid weevils.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'জীবাণু সার ও বপন', en: 'Inoculate & Sow' },
        window: { bn: 'ফেব্রুয়ারি মধ্য – মার্চ', en: 'Mid Feb – Mar' },
        action: { bn: '৩০ সেমি সারিতে শোধিত বীজ বপন।', en: 'Sow inoculated seeds in 30 cm rows.' },
      },
      {
        step: 2,
        stage: { bn: 'একবার নিড়ানি', en: 'Early Weed' },
        window: { bn: '১৫–২০ দিন', en: 'Days 15–20' },
        action: { bn: 'আগাছা পরিষ্কার ও মোজাইক গাছ বাছাই।', en: 'Hand-weed and rogue mosaic plants.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল ও থ্রিপস রক্ষা', en: 'Flowering Care' },
        window: { bn: '৩০–৪২ দিন', en: 'Days 30–42' },
        action: { bn: 'কুঁড়িতে থ্রিপস দেখা ও হালকা সেচ।', en: 'Scout flower buds for thrips; water if dry.' },
      },
      {
        step: 4,
        stage: { bn: 'শুঁটি ভরাট', en: 'Pod Sizing' },
        window: { bn: '৪৫–৫৫ দিন', en: 'Days 45–55' },
        action: { bn: 'পড বোরার নজরদারি ও ঝড়ের নালা পরিষ্কার।', en: 'Monitor pod borers and keep drains open.' },
      },
      {
        step: 5,
        stage: { bn: 'শুঁটি তোলা ও মাটিতে মিশানো', en: 'Pick & Green Manure' },
        window: { bn: '৬০–৭০ দিন', en: 'Days 60–70' },
        action: { bn: 'পাকা শুঁটি তুলে গাছ জমিতে মিশিয়ে দেওয়া।', en: 'Pick mature pods and plough green haulms under.' },
      },
    ],
  },
  {
    id: 'black-gram',
    name: { bn: 'মাষকলাই', en: 'Black Gram (Mashkalai)' },
    aliases: ['mashkalai', 'urid', 'black gram', 'মাষকলাই', 'কলাই'],
    category: 'pulse',
    categoryLabel: CROP_CATEGORY_LABELS.pulse,
    imageUrl: CROP_ASSETS.pulsesJute,
    sourceType: 'verified_reference',
    waterDemandLevel: 'low',
    overview: {
      bn: 'মাষকলাই বাংলাদেশের চরাঞ্চল ও বরেন্দ্র এলাকার অত্যন্ত কষ্টসহিষ্ণু ও ঐতিহ্যবাহী ডাল ফসল। বর্ষা শেষে বন্যার পানি নেমে যাওয়া পলি জমিতে বিনা চাষেও দারুণ ফলে।',
      en: 'Black gram (Mashkalai) is a hardy pulse widely sown onto receding floodwater silts and Barind uplands with minimal inputs.',
    },
    suitableVarieties: {
      bn: 'BARI Mash-1 (পান্থা), BARI Mash-3 (হেমন্ত), BARI Mash-4 ও BINA Mash-1।',
      en: 'BARI Mash-1, BARI Mash-3 (Hemanta), BARI Mash-4, and BINA Mash-1.',
    },
    suitableRegions: {
      bn: 'চাঁপাইনবাবগঞ্জ, রাজশাহী, পাবনা, সিরাজগঞ্জ, জামালপুর, শেরপুর ও কুষ্টিয়ার চরাঞ্চল।',
      en: 'Key zones include Chapainawabganj, Rajshahi, Pabna, Sirajganj, Jamalpur, Sherpur, and Kushtia chars.',
    },
    seasonAndPlanting: {
      bn: 'খরিপ-২ (মধ্য আগস্ট থেকে মধ্য সেপ্টেম্বর) প্রধান বপনের সময়।',
      en: 'Mainly Kharif-2 (mid-August through mid-September).',
    },
    soilAndPh: {
      bn: 'পলি-দোআঁশ, দোআঁশ ও মাঝারি ভারী জল-নিকাশযোগ্য মাটি; pH ৬.০ থেকে ৭.৫।',
      en: 'Alluvial silt-loam and well-drained loamy soils around pH 6.0 to 7.5.',
    },
    landPreparation: {
      bn: 'চরে পানি নেমে কাদা-রস অবস্থায় বিনা চাষে বা ১–২ বার হালকা চাষ দিয়েই বপন করা যায়।',
      en: 'Often zero-tilled directly into soft receding silt or sown after 1–2 light ploughings.',
    },
    seedSelectionAndTreatment: {
      bn: 'মোজাইক-সহনশীল BARI-3/4 বীজ বেছে রাইজোবিয়াম দিয়ে শোধন করে বুনুন।',
      en: 'Use tolerant BARI-3/4 seed treated safely and inoculated with Rhizobium.',
    },
    plantingMethod: {
      bn: 'ছিটিয়ে বা ৩০ সেমি দূরত্বে সারিতে বপন করুন।',
      en: 'Broadcast evenly onto moist silt or sow in 30 cm rows.',
    },
    fertilizerManagement: {
      bn: 'স্বল্প সারেই চলে; উঁচু জমিতে চাষ করলে অল্প ফসফরাস-পটাশ ও সালফার ভিত্তি সার হিসেবে দিন।',
      en: 'Minimal fertilizer needed on fertile silts; upland plots benefit from modest basal phosphorus and sulfur.',
    },
    irrigationSchedule: {
      bn: 'সম্পূর্ণ বৃষ্টি-নির্ভর বা মাটির অবশিষ্ট রসেই হয়; সেচের তেমন প্রয়োজন নেই, তবে জল জমতে দেবেন না।',
      en: 'Normally needs no irrigation; keep fields free of stagnant late-monsoon water.',
    },
    growthStageCare: [
      {
        stage: { bn: 'অঙ্গজ ও মোজাইক বাছাই', en: 'Vegetative & Rogueing' },
        guidance: {
          bn: 'হলুদ মোজাইক আক্রান্ত গাছ দেখলেই তুলে সরিয়ে ফেলুন।',
          en: 'Pull yellow-mottled YMV plants early to halt spread.',
        },
      },
      {
        stage: { bn: 'শুঁটি গঠন', en: 'Pod Formation' },
        guidance: {
          bn: 'পাতায় পাউডারি মিলডিউ (সাদা পাউডার) ও বিছা পোকা আছে কি না দেখুন।',
          en: 'Inspect foliage for white powdery mildew patches and hairy caterpillars.',
        },
      },
    ],
    weedManagement: {
      bn: 'চারা অবস্থায় ২০ দিনের মাথায় একবার নিড়ানি দিলে দ্রুত জমি ঢেকে যায়।',
      en: 'One early weeding around day 20 helps bushy canopies suppress later weeds.',
    },
    commonDiseasesAndPests: {
      bn: 'হলুদ মোজাইক ভাইরাস, পাউডারি মিলডিউ, সারকোস্পোরা পাতা দাগ ও বিছা পোকা।',
      en: 'Yellow Mosaic Virus, Powdery Mildew, Cercospora Leaf Spot, and Hairy Caterpillar.',
    },
    preventionAndSafeManagement: {
      bn: 'প্রতিরোধী BARI-3/4 জাত, সময়মতো বপন ও মিলডিউ-বিছা পোকার আক্রমণে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Plant BARI-3/4 tolerant cultivars, sow timely, and consult 16123 if powdery mildew flares.',
    },
    harvesting: {
      bn: '৮০% শুঁটি কালচে হয়ে গেলে গাছ কেটে বা উপড়ে রোদে শুকান।',
      en: 'Harvest once 80% of pods turn black.',
    },
    postHarvestStorage: {
      bn: 'শুকিয়ে মাড়াই করে পরিষ্কার ড্রাম বা পলিথিন-লাইনার বস্তায় রাখুন।',
      en: 'Dry plants thoroughly, thresh cleanly, and seal dry beans against storage weevils.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'পানি নেমে বপন', en: 'Post-Flood Sow' },
        window: { bn: 'আগস্ট মধ্য – সেপ্টেম্বর', en: 'Mid Aug – Sep' },
        action: { bn: 'নরম পলি বা হালকা চাষে বপন।', en: 'Sow directly onto silt or light tilth.' },
      },
      {
        step: 2,
        stage: { bn: 'একবার নিড়ানি', en: 'Weeding & Rogue' },
        window: { bn: '২০ দিন', en: 'Day 20' },
        action: { bn: 'আগাছা ও মোজাইক চারা বাছাই।', en: 'Weed once and remove YMV seedlings.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল পর্যায়', en: 'Flowering' },
        window: { bn: '৩৫–৪৫ দিন', en: 'Days 35–45' },
        action: { bn: 'পোকা ও মিলডিউ নজরদারি।', en: 'Monitor leaves for mildew and caterpillars.' },
      },
      {
        step: 4,
        stage: { bn: 'শুঁটি ভরাট', en: 'Pod Maturity' },
        window: { bn: '৫৫–৭০ দিন', en: 'Days 55–70' },
        action: { bn: 'শুঁটি কালো হয়ে পাকতে দেওয়া।', en: 'Allow pods to darken evenly.' },
      },
      {
        step: 5,
        stage: { bn: 'সংগ্রহ ও মাড়াই', en: 'Harvest & Seal' },
        window: { bn: '৭৫–৮৫ দিন', en: 'Days 75–85' },
        action: { bn: '৮০% শুঁটি কালো হলে কাটা ও শুকানো।', en: 'Cut at 80% black pods, dry, and thresh.' },
      },
    ],
  },
  {
    id: 'grass-pea',
    name: { bn: 'খেসারি ডাল', en: 'Grass Pea (Khesari)' },
    aliases: ['khesari', 'lathyrus', 'খেসারি', 'বারি খেসারি'],
    category: 'pulse',
    categoryLabel: CROP_CATEGORY_LABELS.pulse,
    imageUrl: CROP_ASSETS.pulsesJute,
    sourceType: 'verified_reference',
    waterDemandLevel: 'low',
    overview: {
      bn: 'খেসারি বাংলাদেশের নিম্নাঞ্চল ও আমন ধানের জমিতে সাথী বা রিলে ফসল (Relay Crop) হিসেবে অত্যন্ত কম খরচে চাষ হয় এবং মাটির নাইট্রোজেন সমৃদ্ধ করে।',
      en: 'Grass pea (Khesari) is Bangladesh’s most resilient low-cost pulse, widely relay-sown into standing Aman paddy fields before harvest.',
    },
    suitableVarieties: {
      bn: 'নিম্ন-টক্সিন (low ODAP) ও উচ্চফলনশীল BARI Khesari-1, BARI Khesari-2, BARI Khesari-3, BARI Khesari-5 ও BINA Khesari-1।',
      en: 'Safe low-ODAP varieties BARI Khesari-1, 2, 3, 5, and BINA Khesari-1.',
    },
    suitableRegions: {
      bn: 'ফরিদপুর, মাদারীপুর, শরীয়তপুর, বরিশাল, পটুয়াখালী, নড়াইল ও গোপালগঞ্জ।',
      en: 'Dominant across Faridpur, Madaripur, Shariatpur, Barishal, Patuakhali, Narail, and Gopalganj.',
    },
    seasonAndPlanting: {
      bn: 'অক্টোবর শেষ থেকে নভেম্বর (রোপা আমন কাটার ১৫–২০ দিন আগে)।',
      en: 'Late October to November (often broadcast 15–20 days before Aman rice harvest).',
    },
    soilAndPh: {
      bn: 'পলি ও ভারী এঁটেল-দোআঁশ নিচু জমি; pH ৬.০ থেকে ৭.৫।',
      en: 'Floodplain silt and heavy clay-loam lowlands around pH 6.0 to 7.5.',
    },
    landPreparation: {
      bn: 'রোপা আমন ধানে বিনা চাষে (relay cropping) কাদা-রসে সরাসরি ছিটানো হয় অথবা ধান কাটার পর হালকা চাষে বপন করা যায়।',
      en: 'Typically zero-tilled as a relay crop onto wet Aman paddy mud, or sown after 1–2 light ploughings.',
    },
    seedSelectionAndTreatment: {
      bn: 'স্বাস্থ্য-নিরাপদ নিম্ন-ODAP যুক্ত BARI খেসারি বীজ ৬–৮ ঘণ্টা ভিজিয়ে ছড়িয়ে দিলে দ্রুত গজায়।',
      en: 'Use low-ODAP BARI varieties; soaking seed 6–8 hours speeds germination in relay mud.',
    },
    plantingMethod: {
      bn: 'আমন ধান কাটার আগে জমির পানি সরে গেলে কাঁদা মাটিতে সমানভাবে ছিটিয়ে দিন এবং ধান কাটার সময় নাড়া সামান্য উঁচু রাখুন।',
      en: 'Broadcast onto drained wet mud beneath standing rice and leave tall rice stubble for support.',
    },
    fertilizerManagement: {
      bn: 'রিলে ফসলে প্রায় কোনো সার লাগে না—পূর্বের ধানের অবশিষ্ট সার ও খেসারির নিজস্ব নাইট্রোজেন সংবদ্ধনই যথেষ্ট।',
      en: 'Relay crops thrive without additional fertilizer using residual rice nutrients and root-nodule fixation.',
    },
    irrigationSchedule: {
      bn: 'সম্পূর্ণ মাটির অবশিষ্ট রসেই ফলে; সেচের প্রয়োজন হয় না।',
      en: 'Grows wholly on residual post-monsoon soil moisture without irrigation.',
    },
    growthStageCare: [
      {
        stage: { bn: 'ধান কাটার সময় যত্ন', en: 'Rice Harvest Care' },
        guidance: {
          bn: 'রিলে খেসারির কচি চারা যাতে পায়ে বা ধানের আঁটিতে চাপা না পড়ে সেজন্য সাবধানে ধান কাটুন।',
          en: 'Cut overlying Aman rice carefully without trampling delicate emerging khesari seedlings.',
        },
      },
      {
        stage: { bn: 'ডাউনি মিলডিউ ও জাবপোকা', en: 'Mildew & Aphid Check' },
        guidance: {
          bn: 'শীতের কুয়াশায় জাবপোকা ও ডাউনি মিলডিউ দেখা দিলে ডগা পরীক্ষা করুন।',
          en: 'Check lush shoots during winter fog for aphids and downy mildew.',
        },
      },
    ],
    weedManagement: {
      bn: 'ধানের নাড়া ও ঘন লতা আগাছাকে স্বাভাবিকভাবেই দমন করে রাখে।',
      en: 'Rice stubble and rapid spreading vines suppress weeds naturally.',
    },
    commonDiseasesAndPests: {
      bn: 'ডাউনি মিলডিউ, পাউডারি মিলডিউ, পড বোরার ও জাবপোকা।',
      en: 'Downy Mildew, Powdery Mildew, Pod Borer, and Aphids.',
    },
    preventionAndSafeManagement: {
      bn: 'BARI-3 বা BARI-5 নিরাপদ জাত চাষ করুন এবং পোকার আক্রমণ বাড়লে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Plant safe low-toxin BARI-3/5 cultivars and consult 16123 if pod borers appear.',
    },
    harvesting: {
      bn: 'শুঁটি ও গাছ হলুদ-বাদামি হলে সকালে শিশির থাকা অবস্থায় কাটুন বা উপড়ে নিন।',
      en: 'Harvest at dawn once pods and haulms turn straw-brown.',
    },
    postHarvestStorage: {
      bn: 'রোদে শুকিয়ে মাড়াই করে পোকামুক্ত বায়ুরোধী ড্রামে সংরক্ষণ করুন।',
      en: 'Sun-dry, thresh cleanly, and store in sealed weevil-proof containers.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'আমনে রিলে বপন', en: 'Relay Sowing' },
        window: { bn: 'অক্টোবর শেষ – নভেম্বর', en: 'Late Oct – Nov' },
        action: { bn: 'ধান কাটার ২ সপ্তাহ আগে কাদায় বীজ ছিটানো।', en: 'Broadcast into wet Aman rice mud.' },
      },
      {
        step: 2,
        stage: { bn: 'ধান কাটা ও প্রতিষ্ঠা', en: 'Rice Cut & Emerge' },
        window: { bn: '১৫–২৫ দিন', en: 'Days 15–25' },
        action: { bn: 'উঁচু নাড়া রেখে ধান কাটা, চারা বাড়া।', en: 'Harvest rice cleanly over young sprouts.' },
      },
      {
        step: 3,
        stage: { bn: 'শাখা বিস্তার', en: 'Vine Spread' },
        window: { bn: '৩০–৫৫ দিন', en: 'Days 30–55' },
        action: { bn: 'মাটির রসে দ্রুত বিস্তার ও জাবপোকা দেখা।', en: 'Spreads on residual moisture; scout aphids.' },
      },
      {
        step: 4,
        stage: { bn: 'ফুল ও শুঁটি', en: 'Bloom & Pods' },
        window: { bn: '৬০–৮৫ দিন', en: 'Days 60–85' },
        action: { bn: 'পড বোরার ও মিলডিউ নজরদারি।', en: 'Watch pods for borers and mildew.' },
      },
      {
        step: 5,
        stage: { bn: 'সংগ্রহ ও শুকানো', en: 'Harvest & Seal' },
        window: { bn: '৯৫–১১৫ দিন', en: 'Days 95–115' },
        action: { bn: 'হলুদ-বাদামি হলে তোলা ও মাড়াই।', en: 'Pull at dawn, dry, thresh, and store.' },
      },
    ],
  },
  {
    id: 'chickpea',
    name: { bn: 'ছোলা (বুট)', en: 'Chickpea (Bengal Gram)' },
    aliases: ['chola', 'boot', 'kabuli chola', 'ছোলা', 'বুট ডাল'],
    category: 'pulse',
    categoryLabel: CROP_CATEGORY_LABELS.pulse,
    imageUrl: CROP_ASSETS.pulsesJute,
    sourceType: 'verified_reference',
    waterDemandLevel: 'low',
    overview: {
      bn: 'ছোলা বরেন্দ্র ও শুষ্ক পশ্চিমাঞ্চলের একটি অত্যন্ত পুষ্টিকর ও খরা-সহিষ্ণু শীতকালীন ডাল ফসল। রোপা আমন কাটার পর অবশিষ্ট মাটির রসেই চমৎকার ফলন দেয়।',
      en: 'Chickpea is a drought-tolerant Rabi pulse flourishing across the Barind tract and western Bangladesh on residual post-Aman moisture.',
    },
    suitableVarieties: {
      bn: 'BARI Chhola-5, BARI Chhola-9, BARI Chhola-10, BARI Chhola-11 এবং BINA Chhola-4।',
      en: 'BARI Chhola-5, BARI Chhola-9, BARI Chhola-10, BARI Chhola-11, and BINA Chhola-4.',
    },
    suitableRegions: {
      bn: 'রাজশাহী, চাঁপাইনবাবগঞ্জ, নওগাঁ (বরেন্দ্র অঞ্চল), ফরিদপুর, যশোর, ঝিনাইদহ ও কুষ্টিয়া।',
      en: 'Major belt covers Rajshahi, Chapainawabganj, Naogaon (Barind), Faridpur, Jashore, and Kushtia.',
    },
    seasonAndPlanting: {
      bn: 'নভেম্বর মাস থেকে ডিসেম্বরের প্রথম সপ্তাহ পর্যন্ত বপনের উত্তম সময়।',
      en: 'Sown from November through early December.',
    },
    soilAndPh: {
      bn: 'সুনিষ্কাশিত দোআঁশ, এঁটেল-দোআঁশ ও বরেন্দ্রের শক্ত দোআঁশ মাটি; pH ৬.০ থেকে ৭.৫।',
      en: 'Well-drained loam and Barind clay-loam soils around pH 6.0 to 7.5.',
    },
    landPreparation: {
      bn: 'রস হারানোর আগেই আমন কাটার পরপর ২–৩ বার চাষ ও মই দিয়ে বপন করুন (বরেন্দ্রে "প্রাইমিং" পদ্ধতি উপকারী)।',
      en: 'Plough promptly after Aman harvest to trap soil moisture; seed priming (overnight soaking) helps in dry Barind clays.',
    },
    seedSelectionAndTreatment: {
      bn: 'রোগমুক্ত বীজ বাছাই করে ছোলার উপযোগী রাইজোবিয়াম ও বোরন-মলিবডেনামসহ (প্রয়োজনে) শোধন করে বুনুন।',
      en: 'Use clean seed, prime briefly in dry Barind plots, treat against wilt, and inoculate with chickpea Rhizobium.',
    },
    plantingMethod: {
      bn: '৩০–৪০×১০ সেমি সারিতে ৪–৫ সেমি গভীরে বপন করুন।',
      en: 'Sow in 30–40 cm rows at 4–5 cm depth.',
    },
    fertilizerManagement: {
      bn: 'বরেন্দ্রে বোরন ও ফসফরাসের সাথে সামান্য প্রাইমারি সার ও জীবাণু সার যথেষ্ট; বেশি ইউরিয়ায় গাছ লম্বা হয়ে ফলন কমে।',
      en: 'Basal phosphorus, potash, and soil-guided boron with Rhizobium work best; avoid excessive urea.',
    },
    irrigationSchedule: {
      bn: 'গভীর মূল হওয়ায় সাধারণত সেচ ছাড়াই হয়; তীব্র খরায় শুঁটি বাঁধার সময় মাত্র ১টি হালকা সেচ দেওয়া যায়।',
      en: 'Deep taproots tap subsoil water; only one very light irrigation at pod initiation is needed in extreme drought.',
    },
    growthStageCare: [
      {
        stage: { bn: 'অঙ্গজ ও ডগা খোঁটা (Nipping)', en: 'Early Nipping' },
        guidance: {
          bn: 'গাছ ২৫–৩০ দিন বয়সে ডগার আগা হালকা ভেঙে দিলে (কচি ছোলা শাক) বেশি ডাল ও শুঁটি হয়।',
          en: 'Pinching top 2–3 cm shoot tips around 30 days stimulates bushier branching and more pods.',
        },
      },
      {
        stage: { bn: 'বট্রাইটিস গ্রে মোল্ড ও পড বোরার', en: 'BGM & Pod Borer Watch' },
        guidance: {
          bn: 'ঘন কুয়াশায় ফুল পচে যাওয়া (BGM) এবং শুঁটি ছিদ্রকারী পোকা (Helicoverpa) দমনে পার্চিং ও ফেরোমন ফাঁদ দিন।',
          en: 'Install bird perches and Helicoverpa pheromone traps; scout flowers during winter fog for Botrytis Gray Mold.',
        },
      },
    ],
    weedManagement: {
      bn: 'বপনের ২৫–৩০ দিনে একবার নিড়ানি দিলে আর আগাছা বাড়ে না।',
      en: 'One thorough hand weeding around 25–30 days suffices.',
    },
    commonDiseasesAndPests: {
      bn: 'বট্রাইটিস গ্রে মোল্ড (BGM), ফিউসারিয়াম উইল্ট, শুঁটি ছিদ্রকারী পোকা (Pod Borer) ও কাটুই।',
      en: 'Botrytis Gray Mold, Fusarium Wilt, Helicoverpa Pod Borer, and Cutworm.',
    },
    preventionAndSafeManagement: {
      bn: 'সারিতে ফাঁকা বপন (আলো-বাতাস চলাচল), ডাল পোঁতা (পার্চিং), ফেরোমন ফাঁদ এবং BGM/বোরারের জন্য ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Use wider row spacing for airflow, place bird perches and pheromone traps, and consult 16123 for BGM.',
    },
    harvesting: {
      bn: 'গাছ খড়ের মতো শুকিয়ে পাতা ঝরলে ও শুঁটির ভেতরের দানা শক্ত হয়ে ঝনঝন শব্দ করলে কাটুন।',
      en: 'Harvest once plants dry straw-yellow and seeds rattle cleanly inside mature pods.',
    },
    postHarvestStorage: {
      bn: 'রোদে শুকিয়ে মাড়াই করে বায়ুরোধী ড্রামে সংরক্ষণ করুন।',
      en: 'Sun-dry, thresh cleanly, dry kernels thoroughly, and store in sealed beetle-proof drums.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'আমন কাটার পর বপন', en: 'Post-Aman Sow' },
        window: { bn: 'নভেম্বর – ডিসেম্বর শুরু', en: 'Nov – Early Dec' },
        action: { bn: 'প্রাইমড ও শোধিত বীজ সারিতে বপন।', en: 'Sow primed, inoculated seed quickly.' },
      },
      {
        step: 2,
        stage: { bn: 'নিড়ানি ও ডগা খোঁটা', en: 'Weed & Nipping' },
        window: { bn: '২৫–৩৫ দিন', en: 'Days 25–35' },
        action: { bn: 'আগাছা দমন ও ডাল বাড়াতে আগা খোঁটা।', en: 'Weed once and nip tops for branching.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল ও কুয়াশা রক্ষা', en: 'Flowering & BGM' },
        window: { bn: '৫৫–৭৫ দিন', en: 'Days 55–75' },
        action: { bn: 'পার্চিং, ফাঁদ ও BGM পর্যবেক্ষণ।', en: 'Set perches/traps and scout winter fog.' },
      },
      {
        step: 4,
        stage: { bn: 'শুঁটি ভরাট', en: 'Pod Sizing' },
        window: { bn: '৮৫–১০৫ দিন', en: 'Days 85–105' },
        action: { bn: 'শুঁটি ছিদ্রকারী পোকা পরীক্ষা।', en: 'Watch pods for Helicoverpa larvae.' },
      },
      {
        step: 5,
        stage: { bn: 'সংগ্রহ ও মাড়াই', en: 'Harvest & Dry' },
        window: { bn: '১১৫–১৩০ দিন', en: 'Days 115–130' },
        action: { bn: 'গাছ শুকালে কেটে মাড়াই ও সংরক্ষণ।', en: 'Cut dry plants, thresh, and seal.' },
      },
    ],
  },
  {
    id: 'pea',
    name: { bn: 'মটরশুঁটি', en: 'Field & Garden Pea' },
    aliases: ['motorshuti', 'motor', 'green pea', 'মটরশুঁটি', 'মটর'],
    category: 'pulse',
    categoryLabel: CROP_CATEGORY_LABELS.pulse,
    imageUrl: CROP_ASSETS.pulsesJute,
    sourceType: 'verified_reference',
    waterDemandLevel: 'low',
    overview: {
      bn: 'মটরশুঁটি কাঁচা সবজি ও শুকনো ডাল উভয় হিসেবেই বাংলাদেশের শীতকালে অত্যন্ত জনপ্রিয় ও লাভজনক ফসল।',
      en: 'Pea (Motorshuti) is a high-demand Rabi legume harvested both as sweet green vegetable pods and dry pulse grain.',
    },
    suitableVarieties: {
      bn: 'BARI Motorshuti-1 (সবুজ ও বড় শুঁটি), BARI Motorshuti-2, BARI Motorshuti-3 (আগাম ও কাঁচা খাওয়ার সেরা) এবং IPSA Motorshuti-3।',
      en: 'BARI Motorshuti-1, 2, 3 (sweet early green pods), and IPSA Motorshuti-3.',
    },
    suitableRegions: {
      bn: 'নাটোর, পাবনা (ঈশ্বরদী), রাজশাহী, যশোর, ফরিদপুর, মানিকগঞ্জ ও রংপুরে ব্যাপক চাষ।',
      en: 'Widely grown in Natore, Ishwardi (Pabna), Rajshahi, Jashore, Faridpur, Manikganj, and Rangpur.',
    },
    seasonAndPlanting: {
      bn: 'নভেম্বর থেকে ডিসেম্বরের প্রথম সপ্তাহ পর্যন্ত বপনের উত্তম সময়।',
      en: 'Optimal sowing runs November through early December.',
    },
    soilAndPh: {
      bn: 'জল-নিকাশযুক্ত উর্বর দোআঁশ ও পলি-দোআঁশ মাটি; অনুকূল pH ৬.০ থেকে ৭.২।',
      en: 'Well-drained fertile loamy and silty-loam soils around pH 6.0 to 7.2.',
    },
    landPreparation: {
      bn: '৩–৪ বার চাষ ও মই দিয়ে মাটি ঝুরঝুরে ও সমতল করুন।',
      en: 'Plough 3–4 times to a clean, level, well-drained seedbed.',
    },
    seedSelectionAndTreatment: {
      bn: 'সতেজ, পোকা-মুক্ত বীজ রাইজোবিয়াম জীবাণু সার দিয়ে মাখিয়ে বুনুন।',
      en: 'Select clean, plump seed and inoculate with pea Rhizobium biofertilizer.',
    },
    plantingMethod: {
      bn: '৩০×১০ সেমি সারিতে ৪–৫ সেমি গভীরে বপন করুন; লম্বা জাতে হালকা কঞ্চির ঠেকা দিলে শুঁটি পচে না।',
      en: 'Sow in 30×10 cm lines at 4–5 cm depth; light bamboo twigs support taller climbing varieties.',
    },
    fertilizerManagement: {
      bn: 'কম্পোস্টের সাথে ফসফরাস-পটাশ ভিত্তি সার ও অল্প স্টার্টার নাইট্রোজেন দিন; শুঁটি ধরার সময় অতিরিক্ত ইউরিয়া দেবেন না।',
      en: 'Apply compost plus basal phosphorus and potassium; avoid heavy nitrogen that delays pod maturity.',
    },
    irrigationSchedule: {
      bn: 'ফল-ফুল আসার সময় (৩৫–৪০ দিন) ও শুঁটি ভরাটের সময় (৫৫–৬০ দিন) হালকা সেচ দিলে শুঁটি রসালো ও মিষ্টি হয়।',
      en: 'Give 1–2 light irrigations around flowering and pod filling for plump, sweet pods; avoid waterlogging.',
    },
    growthStageCare: [
      {
        stage: { bn: 'আগাছা ও ঠেকা', en: 'Weeding & Support' },
        guidance: {
          bn: '২০–২৫ দিনে নিড়ানি দিন এবং প্রয়োজনে শুকনো কঞ্চি পুঁতে দিন।',
          en: 'Weed once at 20–25 days and insert light brushwood twigs if varieties climb.',
        },
      },
      {
        stage: { bn: 'পাউডারি মিলডিউ দেখা', en: 'Powdery Mildew Watch' },
        guidance: {
          bn: 'শীতের শেষে পাতা-শুঁটিতে সাদা পাউডারের মতো আস্তরণ পড়ে কি না দেখুন।',
          en: 'Inspect foliage in late winter for white powdery mildew patches.',
        },
      },
    ],
    weedManagement: {
      bn: 'বপনের ২০–২৫ দিনের মধ্যে একবার নিড়ানি দিন।',
      en: 'Complete hand weeding by days 20–25.',
    },
    commonDiseasesAndPests: {
      bn: 'পাউডারি মিলডিউ, অ্যাস্কোকাইটা ব্লাইট, গোড়া পচা, জাবপোকা ও পড বোরার।',
      en: 'Powdery Mildew, Ascochyta Blight, Root Rot, Aphids, and Pod Borer.',
    },
    preventionAndSafeManagement: {
      bn: 'আগাম বপন, ফসল আবর্তন এবং মিলডিউ-জাবপোকা দেখা দিলে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Sow timely, rotate legumes, and consult 16123 early for powdery mildew or aphids.',
    },
    harvesting: {
      bn: 'সবজি মটরশুঁটির জন্য শুঁটি কচি-সবুজ ও দানা মিষ্টি থাকতেই ৬০–৭৫ দিনে ২–৩ বারে তুলুন; শুকনো বীজের জন্য ৯৫–১০০ দিনে।',
      en: 'Pick sweet green pods across 2–3 harvests at 60–75 days, or leave until dry brown (95–100 days) for pulse/seed.',
    },
    postHarvestStorage: {
      bn: 'সবুজ মটরশুঁটি ঠান্ডা ছায়ায় রেখে দ্রুত বাজারজাত করুন; শুকনো বীজ ভালোভাবে শুকিয়ে বায়ুরোধী পাত্রে রাখুন।',
      en: 'Market green pods fresh in cool breathable bags; dry mature pulse seeds thoroughly before sealing.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'বপন', en: 'Sowing' },
        window: { bn: 'নভেম্বর', en: 'November' },
        action: { bn: 'রাইজোবিয়াম মিশিয়ে সারিতে বপন।', en: 'Sow inoculated seeds in 30 cm rows.' },
      },
      {
        step: 2,
        stage: { bn: 'নিড়ানি ও ঠেকা', en: 'Weed & Stake' },
        window: { bn: '২০–২৫ দিন', en: 'Days 20–25' },
        action: { bn: 'আগাছা পরিষ্কার ও কঞ্চি পুঁতে দেওয়া।', en: 'Hand-weed and place light twigs.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল ও সেচ', en: 'Bloom & Light Water' },
        window: { bn: '৩৫–৪৫ দিন', en: 'Days 35–45' },
        action: { bn: 'হালকা সেচ ও জাবপোকা দেখা।', en: 'Light irrigation and aphid inspection.' },
      },
      {
        step: 4,
        stage: { bn: 'সবুজ শুঁটি সংগ্রহ', en: 'Green Pod Pick' },
        window: { bn: '৬০–৭৫ দিন', en: 'Days 60–75' },
        action: { bn: 'মিষ্টি সবুজ মটরশুঁটি ২–৩ বারে তোলা।', en: 'Pick crisp green pods in 2–3 rounds.' },
      },
      {
        step: 5,
        stage: { bn: 'শুকনো ডাল/বীজ', en: 'Dry Seed Harvest' },
        window: { bn: '৯৫–১০৫ দিন', en: 'Days 95–105' },
        action: { bn: 'বীজ-ডালের জন্য শুঁটি শুকিয়ে মাড়াই।', en: 'Harvest dry pods, thresh, and seal.' },
      },
    ],
  },
];
