import { CROP_ASSETS, CROP_CATEGORY_LABELS, CropCultivationGuide } from './types';

export const CASH_SPICE_EMERGING_CROPS: CropCultivationGuide[] = [
  // ======================== CASH CROPS (3) ========================
  {
    id: 'jute',
    name: { bn: 'পাট', en: 'Jute' },
    aliases: ['pat', 'tosha', 'deshi pat', 'পাট', 'তোষা পাট', 'সোনালী আঁশ'],
    category: 'cash_crop',
    categoryLabel: CROP_CATEGORY_LABELS.cash_crop,
    imageUrl: CROP_ASSETS.pulsesJute,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'পাট বাংলাদেশের "সোনালী আঁশ" ও প্রধান অর্থকরী আঁশ ফসল। পাটকাঠি জ্বালানি ও ঘরবাড়ির কাজে এবং পচা পাতা জমির উর্বরতা বৃদ্ধিতে অপরিসীম ভূমিকা রাখে।',
      en: 'Jute is Bangladesh’s iconic "Golden Fiber" cash crop, enriching crop rotations with fallen leaf biomass while yielding valuable fiber and jute sticks.',
    },
    suitableVarieties: {
      bn: 'তোষা পাটের BJRI Tossa Pat-8 (রবি-১), O-9897 এবং দেশি পাটের CVL-1 ও BJRI Deshi Pat-10।',
      en: 'Tossa varieties BJRI Tossa Pat-8 (Robi-1) & O-9897; Deshi varieties CVL-1 & BJRI Deshi Pat-10.',
    },
    suitableRegions: {
      bn: 'ফরিদপুর, রাজবাড়ী, মাদারীপুর, জামালপুর, সিরাজগঞ্জ, পাবনা, যশোর, কুষ্টিয়া ও কুমিল্লা অঞ্চল।',
      en: 'Major belts span Faridpur, Rajbari, Madaripur, Jamalpur, Sirajganj, Pabna, Jashore, Kushtia, and Cumilla.',
    },
    seasonAndPlanting: {
      bn: 'দেশি পাট মধ্য মার্চ থেকে মধ্য এপ্রিল এবং তোষা পাট মধ্য এপ্রিল থেকে মে পর্যন্ত বপন করা হয়।',
      en: 'Deshi jute is sown mid-Mar to mid-Apr; Tossa jute mid-Apr through May.',
    },
    soilAndPh: {
      bn: 'নদীর পলি-দোআঁশ ও দোআঁশ মাটি সবচেয়ে ভালো (দেশি পাট অপেক্ষাকৃত নিচু জমিও সহ্য করে); আদর্শ pH ৬.০ থেকে ৭.২।',
      en: 'Alluvial silt-loam and loamy soils (Deshi tolerates slightly lower flood-prone lands than Tossa); pH 6.0 to 7.2.',
    },
    landPreparation: {
      bn: '৪–৫ বার গভীর চাষ ও মই দিয়ে মাটি ঝুরঝুরে ও আগাছা-মূলমুক্ত করে বুনুন।',
      en: 'Plough deeply 4–5 times and harrow clean so tiny jute seeds establish evenly.',
    },
    seedSelectionAndTreatment: {
      bn: 'রোগমুক্ত ও সতেজ BJRI প্রত্যয়িত বীজ বেছে কাণ্ড পচা রোধে শোধন করে নিন।',
      en: 'Select clean certified BJRI seed and treat against stem rot and seedling blight.',
    },
    plantingMethod: {
      bn: '২৫–৩০ সেমি দূরত্বে সারিতে বা সমানভাবে ছিটিয়ে বপন করুন ও চারা গজানোর পর ৫–৭ সেমি পরপর রাখুন (হ্যান্ড উইডার/পাতলা করা)।',
      en: 'Sow in 25–30 cm lines (or evenly broadcast) and thin seedlings cleanly to 5–7 cm spacing.',
    },
    fertilizerManagement: {
      bn: 'জৈব সার ও ভিত্তি ফসফরাস-পটাশের পাশাপাশি ৩০–৪০ দিনের মধ্যে নিড়ানি ও পাতলা করার পর একবার ইউরিয়া উপরি প্রয়োগ করুন।',
      en: 'Combine compost and basal P/K with a single split nitrogen top-dress right after thinning and weeding.',
    },
    irrigationSchedule: {
      bn: 'সাধারণত বৃষ্টির পানিতেই হয়; বৈশাখ-জ্যৈষ্ঠে অতিরিক্ত খরা থাকলে চারা বয়সে ১টি হালকা সেচ দেওয়া যায়। তোষা পাটে জল জমতে দেবেন না।',
      en: 'Mostly rainfed; a light pre-monsoon watering helps during severe April drought while avoiding standing water in Tossa plots.',
    },
    growthStageCare: [
      {
        stage: { bn: 'নিড়ানি ও পাতলা করা', en: 'Weeding & Thinning' },
        guidance: {
          bn: 'বপনের ১৫–২৫ দিনের মধ্যে ২ বার পাতলা ও নিড়ানি না দিলে গাছ লম্বা ও মোটা হয় না।',
          en: 'Thin twice between days 15 and 25 so remaining stalks grow tall, uniform, and thick.',
        },
      },
      {
        stage: { bn: 'জাগ ও আঁশ ছাড়ানো (Retting)', en: 'Clean-Water & Ribbon Retting' },
        guidance: {
          bn: 'পরিষ্কার বদ্ধ না করে হালকা প্রবহমান জলে জাগ দিন এবং কলাগাছ বা মাটির ঢেলা দিয়ে না ডুবিয়ে চটের বস্তা ও কচুরিপানা ব্যবহার করলে সোনালী রঙের আঁশ হয়।',
          en: 'Ret in slow-moving clean water weighted with water hyacinth/sandbags (never mud clods or banana logs that stain fiber dark) or use ribbon retting where water is scarce.',
        },
      },
    ],
    weedManagement: {
      bn: 'প্রথম ৩০ দিনে দুবার নিড়ানি দিলে পাট দ্রুত ছায়া তৈরি করে আগাছা দমন করে।',
      en: 'Two early weedings within 30 days carry the crop cleanly to canopy closure.',
    },
    commonDiseasesAndPests: {
      bn: 'কাণ্ড পচা (Stem Rot), কালো পট্টি (Black Band), বিছা পোকা, ঘোড়া পোকা (Semilooper) ও হলুদ মাকড়।',
      en: 'Stem Rot, Black Band, Jute Hairy Caterpillar, Semilooper, and Yellow Mite.',
    },
    preventionAndSafeManagement: {
      bn: 'শোধনকৃত বীজ, ডিম-সহ বিছা পাতা সংগ্রহ ও ধ্বংস, পাখি বসার ডাল (perching) স্থাপন এবং মাকড়/রোগ বাড়লে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Use treated seed, hand-destroy early hairy caterpillar leaf clusters, install bird perches, and consult 16123 for yellow mite.',
    },
    harvesting: {
      bn: 'বপনের ১১০–১২০ দিন পর ছোট গাছে ফুল আসতে শুরু করলেই কাটুন এবং মাঠে ২–৩ দিন রেখে পাতা ঝরিয়ে নিন (জমির সার হিসেবে)।',
      en: 'Cut at 110–120 days when flower buds begin opening; leave cut bundles in field 2–3 days so nutrient-rich leaves shed back onto soil.',
    },
    postHarvestStorage: {
      bn: 'আঁশ ভালোভাবে ধুয়ে বাঁশের আড়ে শুকিয়ে পরিষ্কার বান্ডিল বেঁধে শুষ্ক গুদামে রাখুন।',
      en: 'Wash fibers cleanly, sun-dry on bamboo racks, and store dry bales off damp floors.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'বীজ বপন', en: 'Sowing' },
        window: { bn: 'মার্চ মধ্য – মে', en: 'Mid Mar – May' },
        action: { bn: 'শোধিত বীজ সারিতে বা ছিটিয়ে বপন।', en: 'Sow treated seed cleanly in rows.' },
      },
      {
        step: 2,
        stage: { bn: 'পাতলা ও নিড়ানি', en: 'Thin & Weed' },
        window: { bn: '১৫–৩০ দিন', en: 'Days 15–30' },
        action: { bn: 'দুবার আগাছা পরিষ্কার ও চারা পাতলা।', en: 'Thin twice and apply nitrogen top-dress.' },
      },
      {
        step: 3,
        stage: { bn: 'দ্রুত কাণ্ড বৃদ্ধি', en: 'Stalk Elongation' },
        window: { bn: '৪৫–৮৫ দিন', en: 'Days 45–85' },
        action: { bn: 'বিছা-ঘোড়া পোকা ও মাকড় পর্যবেক্ষণ।', en: 'Scout caterpillars, semiloopers, and mites.' },
      },
      {
        step: 4,
        stage: { bn: 'কাটা ও পাতা ঝরানো', en: 'Cut & Defoliate' },
        window: { bn: '১১০–১২০ দিন', en: 'Days 110–120' },
        action: { bn: 'ফুল শুরুতে কেটে মাঠে পাতা ঝরানো।', en: 'Cut at early bloom; shed leaves onto field.' },
      },
      {
        step: 5,
        stage: { bn: 'জাগ, ধোয়া ও শুকানো', en: 'Ret & Wash Fiber' },
        window: { bn: 'সংগ্রহের ১২–২০ দিন', en: '12–20 days post-cut' },
        action: { bn: 'পরিষ্কার পানিতে জাগ দিয়ে সোনালী আঁশ তোলা।', en: 'Ret cleanly without mud, strip, wash, and dry.' },
      },
    ],
  },
  {
    id: 'sugarcane',
    name: { bn: 'আখ', en: 'Sugarcane' },
    aliases: ['akh', 'ikh', 'ganderi', 'আখ', 'ইক্ষু', 'গুড়', 'চিনি'],
    category: 'cash_crop',
    categoryLabel: CROP_CATEGORY_LABELS.cash_crop,
    imageUrl: CROP_ASSETS.resilientFarm,
    sourceType: 'verified_reference',
    waterDemandLevel: 'high',
    overview: {
      bn: 'আখ বাংলাদেশের একটি দীর্ঘমেয়াদি (১০–১৪ মাস) প্রধান অর্থকরী ফসল, যা থেকে চিনি, গুড় ও চিবিয়ে খাওয়ার আখ উৎপাদিত হয়। শুরুর ৩–৪ মাস সারির মাঝে সাথী ফসল (আলু, পেঁয়াজ, মসুর) করে দ্বিগুণ আয় সম্ভব।',
      en: 'Sugarcane is a 10–14 month cash crop supplying sugar mills and jaggery producers across Bangladesh; intercropping winter vegetables/pulses between rows boosts early income.',
    },
    suitableVarieties: {
      bn: 'BSRI Akh-41 (অমৃত), BSRI Akh-42 (চিবিয়ে খাওয়ার রংবিলাস), BSRI Akh-44 ও BSRI Akh-46।',
      en: 'BSRI Akh-41, BSRI Akh-42 (chewing cane), BSRI Akh-44, and BSRI Akh-46.',
    },
    suitableRegions: {
      bn: 'পাবনা (ঈশ্বরদী), নাটোর, রাজশাহী, কুষ্টিয়া, চুয়াডাঙ্গা, ঝিনাইদহ, ঠাকুরগাঁও, দিনাজপুর ও জামালপুর।',
      en: 'Major hubs in Ishwardi (Pabna), Natore, Rajshahi, Kushtia, Chuadanga, Jhenaidah, Thakurgaon, and Jamalpur.',
    },
    seasonAndPlanting: {
      bn: 'অক্টোবর–ডিসেম্বর (অগ্রাহায়ণী রোপণ—সর্বোত্তম ফলন) এবং ফেব্রুয়ারি–মার্চ (বসন্তকালীন রোপণ)।',
      en: 'Main autumn planting Oct–Dec (highest yields); spring planting Feb–Mar.',
    },
    soilAndPh: {
      bn: 'গভীর, সুনিষ্কাশিত দোআঁশ, পলি-দোআঁশ ও এঁটেল-দোআঁশ মাটি; অনুকূল pH ৬.০ থেকে ৭.৫।',
      en: 'Deep, well-drained loam, silty-loam, and clay-loam soils around pH 6.0 to 7.5.',
    },
    landPreparation: {
      bn: 'গভীর সাব-সয়েলিং/চাষ দিয়ে ২০–২৫ সেমি গভীর নালা (trench) ৯০–১০০ সেমি দূরে দূরে তৈরি করুন ও নালার তলায় কম্পোস্ট মেশান।',
      en: 'Deeply plough and cut planting trenches 90–100 cm apart with well-rotted compost mixed into trench bottoms.',
    },
    seedSelectionAndTreatment: {
      bn: 'লাল পচা (Red Rot) ও উইল্ট-মুক্ত ৮–১০ মাস বয়সী আখের উপরের ২-চোখ বিশিষ্ট কাটিং (sett) বা BSRI স্পেসড ট্রান্সপ্ল্যান্টিং (STP) পলিব্যাগ চারা ব্যবহার করুন।',
      en: 'Select clean 2-budded setts from top portions of healthy 8–10 month cane (or raise spaced-transplanting STP polybag plantlets) free of Red Rot.',
    },
    plantingMethod: {
      bn: 'নালার মধ্যে চোখ দুই পাশে রেখে সেট বসিয়ে হালকা মাটি ঢেকে দিন (STP চারা হলে ৪৫ সেমি দূরে লাগান)।',
      en: 'Lay treated setts flat in trenches with buds facing sideways and cover lightly (or plant STP seedlings 45 cm apart).',
    },
    fertilizerManagement: {
      bn: 'কম্পোস্ট, সবুজ সার ও ভিত্তি NPK-এর পাশাপাশি কুশি পর্যায় ও মাটি বাঁধার সময় কিস্তিতে পুষ্টি দিন; জিংক-সালফার-ম্যাগনেসিয়ামের ঘাটতি হলে মাটি পরীক্ষার পর দিন।',
      en: 'Pair compost and basal NPK with split dressings at tillering and earthing up based on SRDI soil test guidance.',
    },
    irrigationSchedule: {
      bn: 'অঙ্কুরোদগম ও শুষ্ক চৈত্র-বৈশাখ কুশি পর্যায়ে ১৫–২০ দিন পরপর নালায় সেচ দিন; বর্ষায় দ্রুত পানি নিকাশ করুন।',
      en: 'Irrigate trenches every 15–20 days during dry winter/spring tillering; ensure quick monsoon drainage.',
    },
    growthStageCare: [
      {
        stage: { bn: 'মাটি বাঁধা ও ডাল বাঁধা (Tying/Earthing)', en: 'Earthing Up & Tying' },
        guidance: {
          bn: 'জুলাই–আগস্টে গোড়ায় উঁচু করে মাটি তুলে দিন এবং ঝড়ে পড়ে যাওয়া ঠেকাতে পাশের ২–৩টি ঝাড়ের পাতা একসাথে বেঁধে দিন (propping)।',
          en: 'Earth up trenches strongly before monsoon storms and tie adjacent cane clumps together (trashing/propping) against lodging.',
        },
      },
      {
        stage: { bn: 'মাজরা পোকা ও শুকনো পাতা ছাড়ানো', en: 'Trashing & Borer Control' },
        guidance: {
          bn: 'নিচের মরা শুকনো পাতা ছাড়িয়ে সারি পরিষ্কার রাখলে ডগা ও কাণ্ড মাজরা এবং ইঁদুরের উপদ্রব কমে।',
          en: 'Strip dry lower leaves (detrashing) in late summer to reduce borers, scale insects, and rats.',
        },
      },
    ],
    weedManagement: {
      bn: 'প্রথম ৪ মাস নিড়ানি ও সাথী ফসল/মাল্চ দিয়ে আগাছা নিয়ন্ত্রণ করুন।',
      en: 'Intercrop winter pulses/onion or weed/mulch cleanly during the first 4 months.',
    },
    commonDiseasesAndPests: {
      bn: 'লাল পচা রোগ (Red Rot), স্মাট, সাদা মাছি, ডগা মাজরা (Top Shoot Borer), কাণ্ড মাজরা ও গোড়া পচা।',
      en: 'Red Rot, Whip Smut, Sugarcane Whitefly, Top Shoot Borer, and Stem Borer.',
    },
    preventionAndSafeManagement: {
      bn: 'লাল পচা-সহনশীল BSRI জাত ও রোগমুক্ত বীজ আখ (moist hot-air treated), আক্রান্ত ঝাড় সমূলে ধ্বংস এবং মাজরার জন্য ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Plant Red-Rot-resistant BSRI varieties, rogue smut/red-rot clumps immediately, use pheromone/egg-parasitoid IPM, and consult 16123.',
    },
    harvesting: {
      bn: '১০–১৪ মাস পর পাতা হলুদাভ হয়ে কাণ্ড শক্ত ও মিষ্টি হলে (Brix পরিমাপ বা কুঁড়ি শুকালে) মাটির একদম সমান থেকে ধারালো দা দিয়ে কাটুন।',
      en: 'Cut flush with ground level at 10–14 months once lower leaves dry and juice sweetness peaks.',
    },
    postHarvestStorage: {
      bn: 'কাটার ২৪ ঘণ্টার মধ্যেই মিলে বা গুড় মাড়াইয়ে পাঠান—তা নাহলে রসের মিষ্টতা দ্রুত নষ্ট হয়।',
      en: 'Crush canes within 24–48 hours of cutting to prevent rapid sucrose inversion losses.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'নালা ও সেট রোপণ', en: 'Trench & Sett Plant' },
        window: { bn: 'অক্টোবর–ডিসেম্বর', en: 'Oct – Dec' },
        action: { bn: 'কম্পোস্টযুক্ত নালায় শোধিত কাটিং/STP চারা রোপণ।', en: 'Plant treated setts or STP saplings in trenches.' },
      },
      {
        step: 2,
        stage: { bn: 'অঙ্কুর ও সাথী ফসল', en: 'Emerge & Intercrop' },
        window: { bn: '১–৪ মাস', en: 'Months 1–4' },
        action: { bn: 'আগাছা দমন, সাথী ফসল পরিচর্যা ও কিস্তি সার।', en: 'Manage intercrops, weed, and early side-dress.' },
      },
      {
        step: 3,
        stage: { bn: 'কুশি ও খরা সেচ', en: 'Tillering & Dry Care' },
        window: { bn: '৪–৬ মাস', en: 'Months 4–6' },
        action: { bn: 'শুকনো চৈত্র-বৈশাখে সেচ ও মাজরা পর্যবেক্ষণ।', en: 'Irrigate in dry heat and scout top shoot borers.' },
      },
      {
        step: 4,
        stage: { bn: 'মাটি বাঁধা ও প্রপিং', en: 'Earthing & Tying' },
        window: { bn: '৭–৯ মাস', en: 'Months 7–9' },
        action: { bn: 'উঁচু ভেলি তৈরি, শুকনো পাতা ছাড়ানো ও ঝাড় বাঁধা।', en: 'Hill trenches high, detlash, and prop clumps.' },
      },
      {
        step: 5,
        stage: { bn: 'পরিপক্বতা ও সংগ্রহ', en: 'Maturity & Harvest' },
        window: { bn: '১১–১৪ মাস', en: 'Months 11–14' },
        action: { bn: 'মাটি সমান করে কাটা ও দ্রুত মাড়াই।', en: 'Cut flush at soil and crush within 24–48 hrs.' },
      },
    ],
  },
  {
    id: 'cotton',
    name: { bn: 'তুলা', en: 'Cotton' },
    aliases: ['tula', 'karpas', 'hill cotton', 'তুলা', 'কার্পাস', 'হাইব্রিড তুলা'],
    category: 'cash_crop',
    categoryLabel: CROP_CATEGORY_LABELS.cash_crop,
    imageUrl: CROP_ASSETS.resilientFarm,
    sourceType: 'sample_demo',
    waterDemandLevel: 'low',
    overview: {
      bn: 'তুলা বাংলাদেশের বস্ত্রশিল্পের জন্য অত্যন্ত গুরুত্বপূর্ণ অর্থকরী আঁশ ফসল। সমতল উচ্চভূমিতে আপল্যান্ড (American) তুলা এবং পাহাড়ি জুমে পার্বত্য তুলা চাষ হয়।',
      en: 'Cotton is a strategic industrial fiber crop grown across well-drained western/northern uplands (Upland cotton) and hill tracts (Comilla/Hill cotton).',
    },
    suitableVarieties: {
      bn: 'CDB (Cotton Development Board) উদ্ভাবিত CB-12, CB-14, CB-15, রুপা-৪ এবং হিল কটন জাত (HC-1, HC-2)।',
      en: 'CDB varieties CB-12, CB-14, CB-15, Rupali/CB-Hybrid-1, and Hill Cotton HC-1/HC-2.',
    },
    suitableRegions: {
      bn: 'যশোর, ঝিনাইদহ, কুষ্টিয়া, চুয়াডাঙ্গা, রংপুর, বগুড়া, টাঙ্গাইল ও তিন পার্বত্য জেলা (বান্দরবান, খাগড়াছড়ি, রাঙ্গামাটি)।',
      en: 'Major zones in Jashore, Jhenaidah, Kushtia, Chuadanga, Rangpur, Bogura, Tangail, and CHT.',
    },
    seasonAndPlanting: {
      bn: 'মধ্য জুলাই থেকে মধ্য আগস্ট (শ্রাবণ) সমতলে রোপণের সেরা সময়; পাহাড়ে বৈশাখ–জ্যৈষ্ঠ (এপ্রিল–মে)।',
      en: 'Upland cotton sown mid-Jul to mid-Aug; Hill cotton planted Apr–May.',
    },
    soilAndPh: {
      bn: 'সুনিষ্কাশিত গভীর দোআঁশ ও এঁটেল-দোআঁশ উঁচু জমি (জলাবদ্ধতা তুলা সহ্য করে না); pH ৬.০ থেকে ৭.৫।',
      en: 'Deep, flood-free, well-drained loamy and upland clay-loam soils around pH 6.0 to 7.5.',
    },
    landPreparation: {
      bn: '৩–৪ বার গভীর চাষ দিয়ে সমতল করে প্রতি ৩–৪ সারি পরপর পানি নিকাশের নালা তৈরি করুন।',
      en: 'Deep-plough 3–4 times and lay out field drainage channels every few rows.',
    },
    seedSelectionAndTreatment: {
      bn: 'CDB থেকে প্রত্যয়িত ছাঁটা (acid-delinted) বীজ নিলে বপনের সময় জট পাকায় না ও দ্রুত গজায়।',
      en: 'Use certified acid-delinted CDB seed for smooth sowing and strong seedling vigor.',
    },
    plantingMethod: {
      bn: '৯০×৪৫ সেমি দূরত্বে সারিতে ডিবলিং করে চারা গজানোর পর প্রতি গর্তে ১টি সুস্থ গাছ রাখুন।',
      en: 'Dibble at 90×45 cm spacing and thin to one healthy plant per station.',
    },
    fertilizerManagement: {
      bn: 'কম্পোস্ট, ফসফরাস-পটাশ ও বোরনের সাথে কিস্তিতে নাইট্রোজেন দিন; বোরন ঘাটতি থাকলে বোল (ফল) ঝরে যায়।',
      en: 'Combine compost and balanced NPK with sulfur and boron (boron deficiency causes square and boll shedding).',
    },
    irrigationSchedule: {
      bn: 'বর্ষায় পানি নিকাশ প্রধান; নভেম্বর–ডিসেম্বরে শুষ্ক আবহাওয়ায় বোল বড় হওয়ার সময় ১–২টি হালকা নালা সেচ ফলন বাড়ায়।',
      en: 'Keep monsoon beds drained; provide 1–2 light furrow irrigations in dry Nov–Dec boll-filling if needed.',
    },
    growthStageCare: [
      {
        stage: { bn: 'ডগা খোঁটা (Topping) ও জ্যাসিড দেখা', en: 'Canopy & Sucking Pests' },
        guidance: {
          bn: 'গাছ অতি লম্বা হয়ে গেলে ৯০–১০০ দিনে ডগা ভেঙে দিলে পাশের ডাল ও বোল ভালো পুষ্ট হয়; পাতা কুঁকড়ানো জ্যাসিড ও সাদা মাছি দেখুন।',
          en: 'Top runaway stems around 90–100 days to direct energy into bolls, and scout leaf undersides for jassids and whiteflies.',
        },
      },
      {
        stage: { bn: 'বোল ওয়ার্ম ও পটকা ফাটা', en: 'Bollworm & Boll Opening' },
        guidance: {
          bn: 'ফেরোমন ফাঁদ ও আলোর ফাঁদ স্থাপন করুন এবং আক্রান্ত ফুল-বোল অপসারণ করুন।',
          en: 'Deploy pheromone traps for pink/spotted bollworms and collect dropped squares cleanly.',
        },
      },
    ],
    weedManagement: {
      bn: 'প্রথম ৬০ দিন জমি আগাছামুক্ত রাখতে ২–৩ বার নিড়ানি ও গোড়ায় হালকা মাটি তুলুন।',
      en: 'Weed 2–3 times during the first 60 days and earth up lightly.',
    },
    commonDiseasesAndPests: {
      bn: 'জ্যাসিড (পাতা শোষক), বোল ওয়ার্ম (Pink/Spotted Bollworm), এফিড, সাদা মাছি ও কৌণিক পাতা দাগ (Bacterial Blight)।',
      en: 'Jassids, Spotted/Pink Bollworm, Aphids, Whiteflies, and Bacterial Angular Leaf Spot.',
    },
    preventionAndSafeManagement: {
      bn: 'সমন্বিত বালাই ব্যবস্থাপনা (হলুদ ফাঁদ, ফেরোমন ফাঁদ, ডাল পোঁতা) অনুসরণ করুন এবং CDB বা ১৬১২৩-এর পরামর্শে পদক্ষেপ নিন।',
      en: 'Use sticky traps, pheromone traps, and bird perches; consult CDB field staff or 16123 before spraying.',
    },
    harvesting: {
      bn: 'বোল পুরোপুরি ফেটে সাদা আঁশ বের হয়ে রোদে শুকালে (বর্ষা বা কুয়াশা ছাড়া শুকনো দুপুরে) ৩–৪ দফায় পরিষ্কার হাতে তুলুন।',
      en: 'Hand-pick clean dry seed cotton across 3–4 rounds once bolls burst fully in dry sunshine (avoid morning dew).',
    },
    postHarvestStorage: {
      bn: 'পোকা-দাগহীন ও দাগযুক্ত তুলা আলাদা করে রোদে শুকিয়ে পরিষ্কার সুতি/চটের বস্তায় শুষ্ক ঘরে রাখুন।',
      en: 'Keep stained cotton separate, sun-dry cleanly, and store in dry breathable bags away from polythene fibers.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'ডিবলিং বপন', en: 'Dibble Sowing' },
        window: { bn: 'জুলাই মধ্য – আগস্ট মধ্য', en: 'Mid Jul – Mid Aug' },
        action: { bn: 'ডিলিন্টেড বীজ ৯০×৪৫ সেমি সারিতে বপন।', en: 'Sow delinted seed on drained beds.' },
      },
      {
        step: 2,
        stage: { bn: 'পাতলা ও নিড়ানি', en: 'Thin & Weed' },
        window: { bn: '২০–৪০ দিন', en: 'Days 20–40' },
        action: { bn: '১টি সুস্থ গাছ রাখা, নিড়ানি ও জ্যাসিড দেখা।', en: 'Thin to 1 plant/hill and check jassids.' },
      },
      {
        step: 3,
        stage: { bn: 'কুঁড়ি ও ফুল (Square)', en: 'Squaring & Bloom' },
        window: { bn: '৫৫–৯০ দিন', en: 'Days 55–90' },
        action: { bn: 'ফেরোমন ফাঁদ, বোরন ও কিস্তি সার।', en: 'Hang bollworm traps and side-dress.' },
      },
      {
        step: 4,
        stage: { bn: 'টপিং ও বোল ভরাট', en: 'Topping & Boll Fill' },
        window: { bn: '৯৫–১৩৫ দিন', en: 'Days 95–135' },
        action: { bn: 'আগা ভেঙে দেওয়া ও শুষ্কতায় হালকা সেচ।', en: 'Top tall stems and irrigate once if dry.' },
      },
      {
        step: 5,
        stage: { bn: 'দফায় দফায় সংগ্রহ', en: 'Staged Picking' },
        window: { bn: '১৪০–১৭৫ দিন', en: 'Days 140–175' },
        action: { bn: 'বোল ফেটে শুকালে পরিষ্কার তুলা তোলা।', en: 'Pick dry burst cotton in 3–4 rounds.' },
      },
    ],
  },

  // ======================== SPICES (7) ========================
  {
    id: 'onion',
    name: { bn: 'পেঁয়াজ', en: 'Onion' },
    aliases: ['peyaj', 'piaj', 'taherpuri', 'murikata', 'পেঁয়াজ', 'মুড়িকাটা', 'হালি'],
    category: 'spice',
    categoryLabel: CROP_CATEGORY_LABELS.spice,
    imageUrl: CROP_ASSETS.spices,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'পেঁয়াজ বাংলাদেশের সবচেয়ে গুরুত্বপূর্ণ মসলা ফসল। দেশে মূলত হালি চারা (শীতকালীন দীর্ঘ-সংরক্ষণযোগ্য), মুড়িকাটা (কন্দ রোপণ, আগাম) এবং গ্রীষ্মকালীন—এই তিন পদ্ধতিতে চাষ হয়।',
      en: 'Onion is Bangladesh’s highest-demand spice, cultivated via nursery transplants (Hali, for storage), early sets (Murikata), and summer monsoon varieties.',
    },
    suitableVarieties: {
      bn: 'শীত ও সংরক্ষণের জন্য BARI Piaz-1 (তাহেরপুরী), BARI Piaz-4, BARI Piaz-6; গ্রীষ্মকালীন চাষের জন্য BARI Piaz-5।',
      en: 'BARI Piaz-1 (Taherpuri), BARI Piaz-4, BARI Piaz-6 (storage); BARI Piaz-5 for summer production.',
    },
    suitableRegions: {
      bn: 'পাবনা, ফরিদপুর, রাজবাড়ী, কুষ্টিয়া, মানিকগঞ্জ, রাজশাহী ও মেহেরপুর জেলা।',
      en: 'Core belts cover Pabna, Faridpur, Rajbari, Kushtia, Manikganj, Rajshahi, and Meherpur.',
    },
    seasonAndPlanting: {
      bn: 'মুড়িকাটা অক্টোবর–নভেম্বর; হালি চারা রোপণ ডিসেম্বর–জানুয়ারি; গ্রীষ্মকালীন চারা মার্চ–জুলাই।',
      en: 'Murikata set planting Oct–Nov; main Hali transplanting Dec–Jan; summer BARI-5 Mar–Jul.',
    },
    soilAndPh: {
      bn: 'ঝুরঝুরে, জৈব পদার্থসমৃদ্ধ ও সুনিষ্কাশিত পলি-দোআঁশ এবং বেলে-দোআঁশ মাটি; অনুকূল pH ৬.০ থেকে ৭.০।',
      en: 'Friable, well-drained silt-loam and sandy-loam soils around pH 6.0 to 7.0.',
    },
    landPreparation: {
      bn: '৪–৫ বার চাষ ও মই দিয়ে মিহি ও সমতল বেড তৈরি করুন যাতে পানি জমে কন্দ না পচে।',
      en: 'Prepare fine, level raised beds with good perimeter drainage so bulbs never sit in puddles.',
    },
    seedSelectionAndTreatment: {
      bn: 'শীতকালীন হালি চারার জন্য সতেজ কালো বীজ (১ বছর আগের পুরোনো বীজ গজায় না!) বীজতলায় বুনে ৪৫–৫০ দিনের চারা তুলুন।',
      en: 'Always use fresh current-season black onion seed (old seed loses germination rapidly); grow nursery seedlings 45–50 days before transplanting.',
    },
    plantingMethod: {
      bn: '১৫×১০ সেমি দূরত্বে অগভীরভাবে (শিকড় ঢেকে, কন্দের গোড়া নয়) রোপণ করুন—অধিক গভীরে লাগালে কন্দ ছোট ও লম্বাটে হয়।',
      en: 'Transplant shallowly at 15×10 cm (covering roots only—deep planting restricts bulb swelling).',
    },
    fertilizerManagement: {
      bn: 'পচা গোবর ও NPK-এর সাথে পেঁয়াজে সালফার (জিপসাম), জিংক ও বোরন দিলে ঝাঁঝ, রঙ ও সংরক্ষণ ক্ষমতা অনেক বাড়ে।',
      en: 'Pair compost and NPK with sulfur, zinc, and boron guidance to improve pungency, skin color, and storage keeping quality.',
    },
    irrigationSchedule: {
      bn: 'শিকড় অগভীর হওয়ায় কন্দ বড় হওয়ার সময় ১০–১২ দিন অন্তর হালকা সেচ দিন; তোলার ১৫–২০ দিন আগে সেচ বন্ধ করলে পচে কম।',
      en: 'Provide light frequent moisture during bulking; stop watering 15–20 days before harvest so necks cure cleanly.',
    },
    growthStageCare: [
      {
        stage: { bn: 'বল্টিং (ফুল-ডাঁটা) ভাঙা', en: 'Flower Stalk Removal' },
        guidance: {
          bn: 'কদম ফুলের ডাঁটা বের হলেই গোড়া থেকে ভেঙে দিন, নতুবা কন্দ পুষ্ট হয় না।',
          en: 'Snap off premature flower stalks (bolting) immediately so bulbs stay dense and storable.',
        },
      },
      {
        stage: { bn: 'থ্রিপস ও পার্পল ব্লচ দেখা', en: 'Thrips & Purple Blotch' },
        guidance: {
          bn: 'পাতার মাথা শুকিয়ে যাওয়া বা বেগুনি দাগ (Purple Blotch) এবং পাতার খাঁজে থ্রিপস পোকা নিয়মিত পরীক্ষা করুন।',
          en: 'Inspect leaf tips for purple blotch lesions and leaf axils for silvery thrips scraping.',
        },
      },
    ],
    weedManagement: {
      bn: 'অগভীর শিকড় থাকায় কোদাল না দিয়ে ছোট নিড়ানি (khurpi) দিয়ে ২–৩ বার আগাছা তুলুন।',
      en: 'Hand-weed shallowly 2–3 times without disturbing surface roots.',
    },
    commonDiseasesAndPests: {
      bn: 'পার্পল ব্লচ (পাতা ও ডাঁটা পচা), ড্যাম্পিং-অফ, গোড়া পচা ও পেঁয়াজের থ্রিপস পোকা।',
      en: 'Purple Blotch (Alternaria/Stemphylium), Nursery Damping-off, Basal Rot, and Onion Thrips.',
    },
    preventionAndSafeManagement: {
      bn: 'নিকাশযুক্ত বীজতলা, শস্য আবর্তন, নীল আঠালো ফাঁদ (থ্রিপসের জন্য) এবং পার্পল ব্লচ বাড়লে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Use drained seedbeds, rotate fields, place blue sticky traps for thrips, and consult 16123 at first purple blotch.',
    },
    harvesting: {
      bn: 'জমির ৭০–৮০% গাছের গলা (neck) নরম হয়ে মাটিতে নুয়ে পড়লে পেঁয়াজ তুলে fields-এ পাতাসহ ২–৩ দিন হালকা শুকিয়ে (curing) পাতা কাটুন।',
      en: 'Lift bulbs when 70–80% of tops fall over naturally; cure in field shade for 2–3 days before trimming tops 2–3 cm above the neck.',
    },
    postHarvestStorage: {
      bn: 'গলা ভালোভাবে শুকালে বাঁশের বাতাসযুক্ত মাচায় পাতলা স্তরে রাখুন—বেশি ইউরিয়া ও আর্দ্র পেঁয়াজ পচে যায়।',
      en: 'Store well-cured bulbs in thin layers on elevated bamboo racks with constant airflow.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'হালি বীজতলা', en: 'Nursery Seedbed' },
        window: { bn: 'নভেম্বর (৬–৭ সপ্তাহ আগে)', en: '6–7 wks pre-plant' },
        action: { bn: 'তাজা বীজ থেকে সুস্থ চারা তৈরি।', en: 'Grow seedlings from fresh current-year seed.' },
      },
      {
        step: 2,
        stage: { bn: 'অগভীর রোপণ', en: 'Shallow Transplant' },
        window: { bn: 'ডিসেম্বর–জানুয়ারি', en: 'Dec – Jan' },
        action: { bn: '১৫×১০ সেমি সারিতে চারা রোপণ।', en: 'Transplant shallowly at 15×10 cm.' },
      },
      {
        step: 3,
        stage: { bn: 'নিড়ানি ও থ্রিপস দেখা', en: 'Weed & Thrips Care' },
        window: { bn: '২৫–৫০ দিন', en: 'Days 25–50' },
        action: { bn: 'অগভীর নিড়ানি, সার ও নীল ফাঁদ।', en: 'Shallow weeding, sulfur-feed, and traps.' },
      },
      {
        step: 4,
        stage: { bn: 'কন্দ বড় হওয়া', en: 'Bulb Swelling' },
        window: { bn: '৫৫–৮৫ দিন', en: 'Days 55–85' },
        action: { bn: 'হালকা সেচ, ফুল ভাঙা ও পার্পল ব্লচ দেখা।', en: 'Irrigate lightly; break any flower stalks.' },
      },
      {
        step: 5,
        stage: { bn: 'গলা নুয়ে পড়া ও মাচা সংরক্ষণ', en: 'Cure & Rack Store' },
        window: { bn: '৯৫–১১০ দিন', en: 'Days 95–110' },
        action: { bn: 'সেচ বন্ধ করে তোলা, কিউরিং ও মাচায় রাখা।', en: 'Stop water 15d prior, lift, cure, and rack.' },
      },
    ],
  },
  {
    id: 'garlic',
    name: { bn: 'রসুন', en: 'Garlic' },
    aliases: ['roshun', 'rosun', 'bina roshun', 'রসুন', 'বিনা চাষের রসুন'],
    category: 'spice',
    categoryLabel: CROP_CATEGORY_LABELS.spice,
    imageUrl: CROP_ASSETS.spices,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'রসুন বাংলাদেশের দ্বিতীয় প্রধান মসলা ফসল। চলনবিল ও নাটোর-পাবনা অঞ্চলে বন্যার পানি নেমে যাওয়ার পর কাদামাটিতে বিনা চাষে ও খড়ের মাল্চিং দিয়ে রসুন চাষ অত্যন্ত বিখ্যাত ও লাভজনক।',
      en: 'Garlic is a major winter spice across Bangladesh, famously cultivated both on tilled beds and via zero-tillage straw-mulched planting across Chalan Beel.',
    },
    suitableVarieties: {
      bn: 'BARI Rosun-1, BARI Rosun-2, BARI Rosun-3, BARI Rosun-4 এবং BAU Rosun-1/2 (বড় কোয়া)।',
      en: 'BARI Rosun-1, 2, 3, and 4 alongside bold-cloved BAU Rosun-1/2.',
    },
    suitableRegions: {
      bn: 'নাটোর (গুরুদাসপুর-চলনবিল), পাবনা, রাজশাহী, ফরিদপুর, রাজবাড়ী ও দিনাজপুর।',
      en: 'Major hubs in Natore (Chalan Beel), Pabna, Rajshahi, Faridpur, Rajbari, and Dinajpur.',
    },
    seasonAndPlanting: {
      bn: 'অক্টোবর শেষ থেকে নভেম্বর (শীতের শুরু) পর্যন্ত কোয়া রোপণের উত্তম সময়।',
      en: 'Optimal clove planting runs late October through November.',
    },
    soilAndPh: {
      bn: 'জৈব পদার্থসমৃদ্ধ ও সুনিষ্কাশিত দোআঁশ এবং পলি-দোআঁশ মাটি; অনুকূল pH ৬.০ থেকে ৭.০।',
      en: 'Fertile, well-drained loam and alluvial silt-loam around pH 6.0 to 7.0.',
    },
    landPreparation: {
      bn: 'সাধারণ চাষে মাটি ঝুরঝুরে করে বেড তৈরি করুন; তবে বিল এলাকায় বন্যার পানি নেমে কাদামাটিতে সরাসরি কোয়া পুঁতে ওপর থেকে ধানের খড়/কচুরিপানা দিয়ে ঢেকে দেওয়া হয়।',
      en: 'Either till into fine raised beds or—in Chalan Beel wetlands—press cloves directly into receding soft mud and blanket immediately with rice straw.',
    },
    seedSelectionAndTreatment: {
      bn: 'বড় আকারের সুস্থ কন্দের বাইরের সারির পুষ্ট ও বড় কোয়া (চিকন ভেতরের কোয়া বাদ দিয়ে) রোপণের জন্য আলাদা করুন।',
      en: 'Separate clean outer plump cloves from large cured bulbs (discard tiny inner cloves for higher bulb weight).',
    },
    plantingMethod: {
      bn: '১৫×১০ সেমি দূরত্বে কোয়ার চিকন মাথা উপরের দিকে রেখে ৩ সেমি গভীরে পুঁতে দিন এবং ওপরে খড়ের মাল্চ দিন।',
      en: 'Plant pointed tips upward at 15×10 cm spacing, 3 cm deep, and cover beds with light straw mulch.',
    },
    fertilizerManagement: {
      bn: 'ভালো পচা গোবর, সালফার, পটাশ ও জিংক-বোরনসহ সুষম সার দিলে কোয়া বড় ও ঝাঁঝালো হয়।',
      en: 'Provide well-rotted compost plus balanced NPK, sulfur, and zinc/boron guidance for firm, bold cloves.',
    },
    irrigationSchedule: {
      bn: 'বিনা-চাষে মাল্চিং থাকলে সেচ অনেক কম লাগে; সাধারণ জমিতে ১৫–২০ দিন পরপর হালকা সেচ দিন ও তোলার ২ সপ্তাহ আগে বন্ধ করুন।',
      en: 'Straw mulch dramatically cuts irrigation needs; water lightly every 15–20 days in tilled beds and stop 2 weeks pre-harvest.',
    },
    growthStageCare: [
      {
        stage: { bn: 'মাল্চিং ও আগাছা দেখা', en: 'Mulch Check' },
        guidance: {
          bn: 'চারা গজিয়ে উঠলে খড় পাতলা জায়গায় সমান করে দিন যাতে আগাছা বের না হয়।',
          en: 'Adjust straw mulch evenly around emerging shoots to conserve moisture and suppress weeds.',
        },
      },
      {
        stage: { bn: 'পাতার আগা শুকানো ও থ্রিপস', en: 'Tip Burn & Thrips' },
        guidance: {
          bn: 'পাতার খাঁজে থ্রিপস ও ডগায় স্টেমফিলিয়াম/পার্পল ব্লচ দাগ পরীক্ষা করুন।',
          en: 'Scout leaf whorls for tiny yellow thrips and leaf tips for purple blotch.',
        },
      },
    ],
    weedManagement: {
      bn: 'খড়ের মাল্চিংয়ের কারণে আগাছা প্রায় হয় না; দেখা দিলে হাত দিয়ে তুলে ফেলুন।',
      en: 'Thick straw mulch suppresses most weeds; pull occasional stragglers gently by hand.',
    },
    commonDiseasesAndPests: {
      bn: 'পার্পল ব্লচ, স্টেমফিলিয়াম পাতা ঝলসানো, গোড়া পচা ও থ্রিপস পোকা।',
      en: 'Purple Blotch, Stemphylium Blight, Basal Rot, and Thrips.',
    },
    preventionAndSafeManagement: {
      bn: 'সুস্থ-শোধনকৃত কোয়া, মাল্চিং, শস্য আবর্তন ও রোগবালাই দেখা দিলে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Use clean treated cloves, straw mulching, crop rotation, and consult 16123 if purple blotch spreads.',
    },
    harvesting: {
      bn: 'পাতার ৬০–৭০% হলুদ হয়ে শুকিয়ে নুয়ে পড়লে মাটি থেকে তুলে ছায়ায় শুকান।',
      en: 'Lift bulbs when 60–70% of leaves yellow and droop; cure in shaded airy piles.',
    },
    postHarvestStorage: {
      bn: 'শুকনো পাতাসহ বেণী গেঁথে (braiding) বা পাতা কেটে বাতাসযুক্ত ঝুড়ি ও মাচায় ঝুলিয়ে রাখলে ৮–১০ মাস ভালো থাকে।',
      en: 'Braid dry tops to hang on rafters or rack well-cured trimmed bulbs in dry airy sheds.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'কোয়া বাছাই ও রোপণ', en: 'Clove Planting' },
        window: { bn: 'নভেম্বর', en: 'November' },
        action: { bn: 'বড় কোয়া রোপণ ও খড়ের মাল্চিং।', en: 'Plant plump outer cloves and apply straw mulch.' },
      },
      {
        step: 2,
        stage: { bn: 'চারা ও মাল্চ সমন্বয়', en: 'Emergence Care' },
        window: { bn: '১৫–২৫ দিন', en: 'Days 15–25' },
        action: { bn: 'চারা ওঠা দেখা ও হালকা আগাছা তোলা।', en: 'Check emergence through mulch; pull weeds.' },
      },
      {
        step: 3,
        stage: { bn: 'পাতা ও থ্রিপস পর্যবেক্ষণ', en: 'Vegetative Growth' },
        window: { bn: '৪০–৭৫ দিন', en: 'Days 40–75' },
        action: { bn: 'সুষম পুষ্টি, সেচ ও থ্রিপস দেখা।', en: 'Side-dress, check thrips, and water lightly.' },
      },
      {
        step: 4,
        stage: { bn: 'কন্দ ও কোয়া গঠন', en: 'Bulb & Clove Fill' },
        window: { bn: '৮৫–১১৫ দিন', en: 'Days 85–115' },
        action: { bn: 'পটাশ-আর্দ্রতা বজায় রাখা ও শেষ ২ সপ্তাহ সেচ বন্ধ।', en: 'Support bulking, then dry off 2 wks pre-harvest.' },
      },
      {
        step: 5,
        stage: { bn: 'উত্তোলন ও বেণী সংরক্ষণ', en: 'Lift & Braid Store' },
        window: { bn: '১২৫–১৪০ দিন', en: 'Days 125–140' },
        action: { bn: 'তুলে ছায়ায় শুকিয়ে বেণী বেঁধে ঝোলানো।', en: 'Lift, shade-cure, braid, and hang dry.' },
      },
    ],
  },
  {
    id: 'ginger',
    name: { bn: 'আদা', en: 'Ginger' },
    aliases: ['ada', 'ginger', 'আদা', 'বস্তায় আদা', 'পাহাড়ি আদা'],
    category: 'spice',
    categoryLabel: CROP_CATEGORY_LABELS.spice,
    imageUrl: CROP_ASSETS.spices,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'আদা আংশিক ছায়াপ্রিয় ও উচ্চমূল্যের মসলা ফসল। ফল বাগানের নিচে সাথী ফসল হিসেবে এবং জলাবদ্ধতামুক্ত বস্তা-পদ্ধতিতেও (sack farming) দেশে আদা চাষ দারুণ জনপ্রিয়।',
      en: 'Ginger is a high-value rhizome spice thriving in partial shade under orchards and in well-drained raised beds or sack gardens across Bangladesh.',
    },
    suitableVarieties: {
      bn: 'BARI Ada-1, BARI Ada-2, BARI Ada-3 এবং পাহাড়ি/লালপটি ও রংপুরের স্থানীয় জাত।',
      en: 'BARI Ada-1, BARI Ada-2, BARI Ada-3, and aromatic hill cultivars.',
    },
    suitableRegions: {
      bn: 'খাগড়াছড়ি, বান্দরবান, রাঙ্গামাটি, রংপুর, নীলফামারী, টাঙ্গাইল, গাজীপুর ও ময়মনসিংহ।',
      en: 'Hubs include Khagrachari, Bandarban, Rangamati, Rangpur, Nilphamari, Tangail, Gazipur, and Mymensingh.',
    },
    seasonAndPlanting: {
      bn: 'এপ্রিল থেকে মে (বৈশাখ–জ্যৈষ্ঠ) বীজ কন্দ রোপণের সেরা সময়।',
      en: 'Best planted April through May ahead of steady monsoon moisture.',
    },
    soilAndPh: {
      bn: 'অত্যন্ত ঝুরঝুরে, জৈব পদার্থসমৃদ্ধ ও সম্পূর্ণ জলাবদ্ধতামুক্ত বেলে-দোআঁশ ও পাহাড়ি দোআঁশ মাটি; pH ৫.৫ থেকে ৬.৫।',
      en: 'Loose, humus-rich, strictly well-drained sandy-loam and hill loams at pH 5.5 to 6.5.',
    },
    landPreparation: {
      bn: 'গভীর চাষ দিয়ে ২০–২৫ সেমি উঁচু বেড ও গভীর নিকাশ নালা তৈরি করুন; বস্তায় চাষ করলে বালি-মাটি-গোবর ও কোকোডাস্ট/ছাই মিশিয়ে ভরে নিন।',
      en: 'Prepare high 20–25 cm raised beds with deep stormwater drains—or fill breathable sacks with loose loam, sand, and cured compost.',
    },
    seedSelectionAndTreatment: {
      bn: 'কন্দ পচা রোগ (Rhizome Rot) ঠেকাতে সুস্থ বাগান থেকে পুষ্ট অঙ্কুরযুক্ত (২–৩টি চোখসহ) বীজ আদা ছত্রাকনাশক বা ট্রাইকোডার্মা দিয়ে শোধন করে ছায়ায় শুকিয়ে রোপণ করুন।',
      en: 'Select plump disease-free seed rhizomes with 2–3 buds, treat safely (e.g., Trichoderma/approved dip) against soft rot, and shade-dry before planting.',
    },
    plantingMethod: {
      bn: '৪৫×২৫ সেমি দূরত্বে ৪–৫ সেমি গভীরে কন্দ বসিয়ে ওপরে পুরু খড় বা শুকনো পাতার মাল্চিং বিছিয়ে দিন।',
      en: 'Plant 4–5 cm deep at 45×25 cm spacing and immediately blanket beds with thick leaf or straw mulch.',
    },
    fertilizerManagement: {
      bn: 'আদায় প্রচুর পচা গোবর/কম্পোস্ট, পটাশ ও অণুপুষ্টি (বোরন-জিংক) দরকার হয়—রোপণের সময়, ৫০ ও ৯০ দিনে মাটি তোলার সময় কিস্তিতে প্রয়োগ করুন।',
      en: 'Provide heavy decomposed compost plus split potash and micronutrient additions at 50 and 90 days during earthing up.',
    },
    irrigationSchedule: {
      bn: 'গ্রীষ্মে মাল্চের ওপর হালকা সেচ দিন; বর্ষায় কোনোভাবেই গোড়ায় পানি জমতে দেবেন না—জলাবদ্ধতা আদা পচার প্রধান কারণ।',
      en: 'Mist dry spring beds lightly over mulch; drain monsoon storms instantly because standing water triggers rhizome rot.',
    },
    growthStageCare: [
      {
        stage: { bn: 'মাল্চিং ও গোড়ায় মাটি তোলা', en: 'Mulching & Earthing Up' },
        guidance: {
          bn: 'রোপণের ৫০ ও ৯০ দিন পর আগাছা পরিষ্কার করে, সার দিয়ে নতুন করে মাটি তুলে দিন ও পুনরায় খড় বিছিয়ে দিন।',
          en: 'At days 50 and 90, side-dress, mound soil cleanly over growing rhizomes, and refresh mulch.',
        },
      },
      {
        stage: { bn: 'রাইজোম রট নজরদারি', en: 'Rhizome Rot Vigilance' },
        guidance: {
          bn: 'হঠাৎ কোনো ঝাড়ের পাতা হলুদ হয়ে গোড়া নরম পচে গেলে ঝাড়টি মাটিসহ তুলে দূরে পুঁতে ফেলুন ও পানি সরান।',
          en: 'If shoots suddenly yellow and base stems turn soft/smelly, dig out the clump with soil, improve drainage, and treat surrounding pits.',
        },
      },
    ],
    weedManagement: {
      bn: 'পুরু খড়ের মাল্চিং আগাছা ব্যাপকভাবে দমন করে; মাটি তোলার আগে হাত নিড়ানি দিন।',
      en: 'Thick straw mulch cuts weeds sharply; hand-weed ahead of each earthing-up round.',
    },
    commonDiseasesAndPests: {
      bn: 'কন্দ পচা রোগ (Soft/Rhizome Rot — সবচেয়ে ক্ষতিকর), ব্যাকটেরিয়াল ঢলে পড়া, পাতা দাগ ও ডগা মাজরা পোকা।',
      en: 'Rhizome Soft Rot (Pythium/Fusarium), Bacterial Wilt, Leaf Spot, and Shoot Borer.',
    },
    preventionAndSafeManagement: {
      bn: 'রোগমুক্ত বীজ আদা, শোধন, উঁচু বেড/বস্তা পদ্ধতি, ট্রাইকোডার্মা-কম্পোস্ট ও পচা রোগ দেখা দিলেই ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Use clean seed rhizomes, Trichoderma-enriched compost, raised beds or sack farming, and consult 16123 at the first yellowing shoot.',
    },
    harvesting: {
      bn: 'রোপণের ৮–৯ মাস পর (ডিসেম্বর–ফেব্রুয়ারি) পাতা ও ডাঁটা হলুদ হয়ে শুকিয়ে গেলে মাটি খুঁড়ে আদা তুলুন।',
      en: 'Dig rhizomes 8–9 months after planting (Dec–Feb) once tops yellow and dry back.',
    },
    postHarvestStorage: {
      bn: 'মাটি ঝেড়ে রোদে না শুকিয়ে ছায়ায় ২–৩ দিন বাতাসে রাখুন; বীজের আদা মাটির নিচের গর্ত বা শুকনো বালির স্তরে সংরক্ষণ করা যায়।',
      en: 'Clean off soil and cure in airy shade (never harsh sun); seed rhizomes store cleanly in cool ventilated sand pits.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'শোধন ও মাল্চ-সহ রোপণ', en: 'Treat, Plant & Mulch' },
        window: { bn: 'এপ্রিল–মে', en: 'Apr – May' },
        action: { bn: 'উঁচু বেড বা বস্তায় শোধিত আদা বসিয়ে খড় বিছানো।', en: 'Plant cured setts in high beds/sacks and mulch.' },
      },
      {
        step: 2,
        stage: { bn: 'প্রথম মাটি তোলা', en: 'First Earthing Up' },
        window: { bn: '৪৫–৫৫ দিন', en: 'Days 45–55' },
        action: { bn: 'নিড়ানি, কিস্তি সার ও গোড়ায় মাটি।', en: 'Weed, feed, and hill soil over roots.' },
      },
      {
        step: 3,
        stage: { bn: 'বর্ষা ও রোগ নজরদারি', en: 'Monsoon Drainage' },
        window: { bn: '৩–৬ মাস', en: 'Months 3–6' },
        action: { bn: 'নিকাশ নালা পরিষ্কার ও পচা ঝাড় বাছাই।', en: 'Keep drains open and watch for yellowing.' },
      },
      {
        step: 4,
        stage: { bn: 'কন্দ বৃদ্ধি ও হলুদ হওয়া', en: 'Rhizome Bulking' },
        window: { bn: '৬–৮ মাস', en: 'Months 6–8' },
        action: { bn: 'দ্বিতীয় মাটি তোলা ও শুষ্কতায় পরিমিত রস।', en: 'Support bulking until leaves dry.' },
      },
      {
        step: 5,
        stage: { bn: 'খনন ও ছায়া সংরক্ষণ', en: 'Dig & Shade Cure' },
        window: { bn: '৮–৯ মাস (ডিসে–ফেব্রু)', en: 'Months 8–9' },
        action: { bn: 'সাবধানে খুঁড়ে ছায়ায় বাতাসে রাখা।', en: 'Lift cleanly and cure in cool shade.' },
      },
    ],
  },
  {
    id: 'turmeric',
    name: { bn: 'হলুদ', en: 'Turmeric' },
    aliases: ['holud', 'dimla', 'sinduri', 'হলুদ', 'ডিমলা'],
    category: 'spice',
    categoryLabel: CROP_CATEGORY_LABELS.spice,
    imageUrl: CROP_ASSETS.spices,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'হলুদ বাংলাদেশের প্রতিটি পরিবারের অপরিহার্য মসলা। আদার চেয়ে রোগবালাই কম ও কষ্টসহিষ্ণু হওয়ায় আম বা কাঁঠাল বাগানের ছায়াযুক্ত সাথী ফসল হিসেবে অত্যন্ত লাভজনক।',
      en: 'Turmeric is a hardy, shade-tolerant rhizome spice widely intercropped beneath mango, jackfruit, and litchi orchards across Bangladesh.',
    },
    suitableVarieties: {
      bn: 'BARI Holud-3, BARI Holud-4, BARI Holud-5, ডিমলা ও সিন্দুরি জাত।',
      en: 'BARI Holud-3, BARI Holud-4, BARI Holud-5, Dimla, and Sinduri.',
    },
    suitableRegions: {
      bn: 'পাবনা, নাটোর, নীলফামারী, রংপুর, টাঙ্গাইল, রাঙ্গামাটি, বান্দরবান, খাগড়াছড়ি ও যশোর।',
      en: 'Major belts in Pabna, Natore, Nilphamari, Rangpur, Tangail, hill districts, and Jashore.',
    },
    seasonAndPlanting: {
      bn: 'এপ্রিল থেকে মে (বৈশাখ–জ্যৈষ্ঠ) বীজ হলুদ রোপণের উত্তম সময়।',
      en: 'Plant seed rhizomes April through May.',
    },
    soilAndPh: {
      bn: 'জলাবদ্ধতামুক্ত দোআঁশ, বেলে-দোআঁশ ও উঁচু লাল মাটি; অনুকূল pH ৫.৫ থেকে ৭.০।',
      en: 'Well-drained loamy, sandy-loam, and upland terrace soils around pH 5.5 to 7.0.',
    },
    landPreparation: {
      bn: 'গভীর চাষ দিয়ে ১৫–২০ সেমি উঁচু বেড ও নিকাশের নালা বানিয়ে প্রচুর গোবর মিশিয়ে নিন।',
      en: 'Deeply till, mix generous compost, and form 15–20 cm raised beds with drainage trenches.',
    },
    seedSelectionAndTreatment: {
      bn: 'নিরোগ মাতৃকন্দ (mother rhizome) বা পুষ্ট ছড়া থেকে ২–৩ চোখওয়ালা বীজ বেছে শোধন করে ছায়ায় শুকিয়ে রোপণ করুন।',
      en: 'Choose plump healthy mother or finger rhizomes with 2–3 buds, treat safely against rot, and shade-dry.',
    },
    plantingMethod: {
      bn: '৫০×২৫ সেমি দূরত্বে ৬–৭ সেমি গভীরে লাগিয়ে ওপরে খড় বা পাতার মাল্চ দিন।',
      en: 'Plant 6–7 cm deep at 50×25 cm spacing and cover beds cleanly with dry straw/leaf mulch.',
    },
    fertilizerManagement: {
      bn: 'গোবর, ছাই ও ভিত্তি সারের পাশাপাশি রোপণের ৫০ ও ৮৫ দিনে পটাশ-নাইট্রোজেন কিস্তি প্রয়োগ করলে হলুদের রঙ ও কন্দের ওজন বাড়ে।',
      en: 'Apply basal compost plus split potash and nitrogen top-dressings at days 50 and 85 when earthing up.',
    },
    irrigationSchedule: {
      bn: 'বর্ষায় পানি নিকাশ নিশ্চিত করুন; বর্ষা-পরবর্তী অক্টোবর–নভেম্বরে খরা থাকলে ২–৩টি হালকা সেচ দিলে কন্দ পুষ্ট হয়।',
      en: 'Drain monsoon storms cleanly; give 2–3 light irrigations if October–November turns very dry.',
    },
    growthStageCare: [
      {
        stage: { bn: 'মাটি তোলা ও মাল্চিং', en: 'Earthing Up' },
        guidance: {
          bn: '২ বার নিড়ানি ও গোড়ায় মাটি তুলে দিন যাতে নতুন গজানো হলুদ মাটির বাইরে বের না হয়।',
          en: 'Earth up twice (days 50 and 85) so swelling rhizomes remain buried and sheltered.',
        },
      },
      {
        stage: { bn: 'পাতার দাগ ও ডগা পোকা', en: 'Leaf Blotch & Borer' },
        guidance: {
          bn: 'পাতায় বাদামি-হলুদ দাগ (Taphrina/Colletotrichum) এবং কাণ্ড ছিদ্রকারী পোকার জন্য মরা ডগা দেখুন।',
          en: 'Inspect broad leaves for leaf blotch spots and dead central shoots caused by borers.',
        },
      },
    ],
    weedManagement: {
      bn: 'মাল্চিং ও ২ বার নিড়ানি দিলে চওড়া পাতা পুরো জমি ঢেকে ফেলে।',
      en: 'Straw mulching plus 2 early weedings carry beds until broad leaves shade the soil.',
    },
    commonDiseasesAndPests: {
      bn: 'কন্দ পচা, পাতার দাগ রোগ (Leaf Blotch/Spot), ডগা মাজরা ও স্কেল পোকা।',
      en: 'Rhizome Rot, Taphrina Leaf Blotch, Shoot Borer, and Rhizome Scale.',
    },
    preventionAndSafeManagement: {
      bn: 'শোধনকৃত বীজ কন্দ, নিকাশ নালা, ফসল আবর্তন ও রোগবালাইয়ের জন্য ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Use clean treated seed rhizomes, raised beds, rotation, and consult 16123 if leaf blotch spreads.',
    },
    harvesting: {
      bn: '৮–৯ মাস পর (জানুয়ারি–ফেব্রুয়ারি) গাছ ও পাতা সম্পূর্ণ হলুদ হয়ে শুকিয়ে গেলে কোদাল বা লাঙল দিয়ে সাবধানে তুলুন।',
      en: 'Dig carefully 8–9 months after planting (Jan–Feb) once all foliage dries brown.',
    },
    postHarvestStorage: {
      bn: 'মসলার জন্য পরিষ্কার হলুদ ফুটন্ত পানিতে সেদ্ধ করে রোদে ১০–১২ দিন ভালোভাবে শুকিয়ে পালিশ করে সংরক্ষণ করুন; বীজের হলুদ কাঁচা অবস্থায় ছায়ায় বালিতে রাখুন।',
      en: 'Boil culinary rhizomes cleanly, sun-dry 10–12 days until brittle, and store dry; keep raw seed rhizomes cool under dry sand.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'রোপণ ও মাল্চিং', en: 'Plant & Mulch' },
        window: { bn: 'এপ্রিল–মে', en: 'Apr – May' },
        action: { bn: 'উঁচু বেডে বীজ হলুদ ও খড় বিছানো।', en: 'Plant treated rhizomes and mulch.' },
      },
      {
        step: 2,
        stage: { bn: '১ম নিড়ানি ও সার', en: '1st Hill & Feed' },
        window: { bn: '৫০ দিন', en: 'Day 50' },
        action: { bn: 'আগাছা পরিষ্কার ও গোড়ায় মাটি দেওয়া।', en: 'Weed, side-dress, and mound beds.' },
      },
      {
        step: 3,
        stage: { bn: '২য় মাটি তোলা', en: '2nd Earthing Up' },
        window: { bn: '৮৫–৯০ দিন', en: 'Days 85–90' },
        action: { bn: 'পটাশ-সার দিয়ে পুনরায় মাটি তোলা।', en: 'Second potash feed and hilling.' },
      },
      {
        step: 4,
        stage: { bn: 'বর্ষা ও কন্দ ভরাট', en: 'Rhizome Expansion' },
        window: { bn: '৪–৭ মাস', en: 'Months 4–7' },
        action: { bn: 'নিকাশ নালা রাখা ও পাতা দাগ পর্যবেক্ষণ।', en: 'Keep drains clear and watch foliage.' },
      },
      {
        step: 5,
        stage: { bn: 'উত্তোলন ও প্রক্রিয়াজাত', en: 'Dig, Boil & Dry' },
        window: { bn: '৮.৫–৯ মাস (জানু–ফেব্রু)', en: 'Months 8.5–9' },
        action: { bn: 'গাছ শুকালে তোলা, সেদ্ধ ও রোদে শুকানো।', en: 'Harvest, boil cleanly, and sun-dry.' },
      },
    ],
  },
  {
    id: 'coriander',
    name: { bn: 'ধনিয়া', en: 'Coriander' },
    aliases: ['dhoniya', 'dhonia', 'cilantro', 'ধনিয়া', 'ধনে পাতা'],
    category: 'spice',
    categoryLabel: CROP_CATEGORY_LABELS.spice,
    imageUrl: CROP_ASSETS.spices,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'ধনিয়া বাংলাদেশের শীতকালে পাতা (ধনে পাতা) ও শুকনো বীজ-মসলা উভয় উদ্দেশ্যেই চাষ হয়। বীজ দুই ভাগ করে ভিজিয়ে বুনলে চারা খুব সুন্দর গজায়।',
      en: 'Coriander (Dhoniya) is grown across Bangladesh for aromatic fresh cilantro greens (40–50 days) and dried spice seeds (95–110 days).',
    },
    suitableVarieties: {
      bn: 'BARI Dhonia-1, BARI Dhonia-2 (গ্রীষ্মকালেও পাতা হয়) ও স্থানীয় সুগন্ধি জাত।',
      en: 'BARI Dhonia-1, BARI Dhonia-2 (tolerant for year-round leaf harvest), and aromatic landraces.',
    },
    suitableRegions: {
      bn: 'ফরিদপুর, শরীয়তপুর, মাদারীপুর, পাবনা, মানিকগঞ্জ, নরসিংদী ও সাভারসহ দেশব্যাপী।',
      en: 'Major spice hubs in Faridpur, Shariatpur, Madaripur, Pabna; leafy production nationwide.',
    },
    seasonAndPlanting: {
      bn: 'মসলা-বীজের জন্য অক্টোবর–নভেম্বর; পাতার জন্য সেপ্টেম্বর থেকে জানুয়ারি (শেডে গ্রীষ্মকালেও)।',
      en: 'For spice seed: Oct–Nov; for fresh greens: Sep–Jan (and shaded summer BARI Dhonia-2).',
    },
    soilAndPh: {
      bn: 'ঝুরঝুরে ও জল-নিকাশযুক্ত দোআঁশ এবং বেলে-দোআঁশ মাটি; pH ৬.০ থেকে ৭.৫।',
      en: 'Loose, well-drained loamy and sandy-loam soils around pH 6.0 to 7.5.',
    },
    landPreparation: {
      bn: '৩–৪ বার চাষ ও মই দিয়ে মিহি ঢেলাহীন বেড তৈরি করুন।',
      en: 'Plough 3–4 times to fine tilth and build neat flat beds with light drains.',
    },
    seedSelectionAndTreatment: {
      bn: 'গোল আস্ত ধনিয়া বীজ বোতল বা বেলন দিয়ে হালকা ঘষে দুই ভাগে ভেঙে (split) এবং ১০–১২ ঘণ্টা ভিজিয়ে তারপর ছায়ায় শুকিয়ে বুনলে দ্রুত ও ঘন চারা গজায়।',
      en: 'Gently crack whole fruits into two half-seeds and soak 10–12 hours before sowing to cut germination time in half.',
    },
    plantingMethod: {
      bn: 'পাতার জন্য ১৫–২০ সেমি সারিতে বা ছিটিয়ে; বীজের জন্য ২৫–৩০ সেমি সারিতে ১.৫–২ সেমি গভীরে বপন করুন।',
      en: 'Sow shallowly (1.5–2 cm) in 15–20 cm rows for leaf cuts or 25–30 cm rows for seed spice.',
    },
    fertilizerManagement: {
      bn: 'পচা গোবরের সাথে ভিত্তি সার দিন; পাতার ফসলে গজানোর ২০ দিন পর হালকা নাইট্রোজেন দিলে পাতা সতেজ হয়।',
      en: 'Mix decomposed compost with basal NPK; give a light leaf boost at day 20 for leafy greens.',
    },
    irrigationSchedule: {
      bn: 'গজানোর আগ পর্যন্ত ঝাঁঝরি দিয়ে হালকা আর্দ্রতা রাখুন; পরে মাটির রস বুঝে ১০–১২ দিন পরপর হালকা সেচ দিন।',
      en: 'Keep topsoil gently moist until sprouting, then water lightly every 10–12 days.',
    },
    growthStageCare: [
      {
        stage: { bn: 'অঙ্কুর ও পাতলা করা', en: 'Emergence & Thinning' },
        guidance: {
          bn: 'বীজ ফসলের ক্ষেত্রে চারা বেশি ঘন হলে পাতলা করে দিলে ডাল ও ছাতা (umbel) ভালো হয়।',
          en: 'Thin seed-crop stands slightly at 20 days for stronger branching.',
        },
      },
      {
        stage: { bn: 'গল রোগ ও পাউডারি মিলডিউ', en: 'Stem Gall & Mildew Watch' },
        guidance: {
          bn: 'পাতা-ডাঁটায় ফোলা গল (Stem Gall) বা সাদা পাউডারি মিলডিউ দেখা দিলে আক্রান্ত অংশ সরিয়ে ফেলুন।',
          en: 'Check stems for swollen stem-gall tumors and foliage for white powdery mildew.',
        },
      },
    ],
    weedManagement: {
      bn: 'ধনিয়া গজাতে ১০–১২ দিন লাগে বলে আগাছা আগে বড় হয়—সাবধানে ২ বার নিড়ানি দিন।',
      en: 'Because coriander sprouts slowly, weed carefully twice once tiny feathery leaves emerge.',
    },
    commonDiseasesAndPests: {
      bn: 'স্টেম গল (কাণ্ড ফোলা রোগ), পাউডারি মিলডিউ, জাবপোকা ও পাতাখেকো পোকা।',
      en: 'Stem Gall, Powdery Mildew, Aphids, and Leaf Caterpillars.',
    },
    preventionAndSafeManagement: {
      bn: 'শোধনকৃত সুস্থ বীজ, ফসল আবর্তন, জাবপোকায় নিম তেল/সাবান জল এবং ধনে পাতা তোলার আগে বিষাক্ত স্প্রে এড়িয়ে চলুন; প্রয়োজনে ১৬১২৩-এ জানুন।',
      en: 'Use clean treated seed and crop rotation; keep fresh leafy harvests chemical-free and consult 16123 for seed-crop mildew.',
    },
    harvesting: {
      bn: 'কাঁচা পাতা ৪০–৫০ দিনে ফুল আসার আগেই তুলুন; মসলার জন্য ৫০–৬০% দানা হলদে-বাদামি হলে সকালে কাটুন।',
      en: 'Pull fresh cilantro at 40–50 days before bolting; harvest spice seed at 95–110 days once 50–60% of fruits turn golden-brown.',
    },
    postHarvestStorage: {
      bn: 'বীজ ছায়া-রোদে শুকিয়ে মাড়াই করে সুগন্ধ ধরে রাখতে বায়ুরোধী পাত্রে সংরক্ষণ করুন।',
      en: 'Shade-and-sun cure seed umbels to preserve volatile aroma, thresh, and seal airtight.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'বীজ ভেঙে ভেজানো ও বপন', en: 'Split, Soak & Sow' },
        window: { bn: '০ দিন', en: 'Day 0' },
        action: { bn: 'দুই ভাগ করে ভিজানো বীজ বপন।', en: 'Split fruits, soak 12h, and sow shallowly.' },
      },
      {
        step: 2,
        stage: { bn: 'গজানো ও প্রথম নিড়ানি', en: 'Sprout & Weed' },
        window: { bn: '১২–২২ দিন', en: 'Days 12–22' },
        action: { bn: 'সাবধানে নিড়ানি ও হালকা সেচ।', en: 'Gentle hand weeding and light moisture.' },
      },
      {
        step: 3,
        stage: { bn: 'ধনে পাতা সংগ্রহ (ঐচ্ছিক)', en: 'Leaf Harvest Option' },
        window: { bn: '৪০–৫০ দিন', en: 'Days 40–50' },
        action: { bn: 'পাতার ফসলের জন্য তোলা ও আঁটি বাঁধা।', en: 'Pull aromatic greens before bolting.' },
      },
      {
        step: 4,
        stage: { bn: 'ফুল ও দানা গঠন', en: 'Umbel & Seed Set' },
        window: { bn: '৬০–৮৫ দিন', en: 'Days 60–85' },
        action: { bn: 'মৌমাছি রক্ষা ও মিলডিউ-গল দেখা।', en: 'Protect bees; scout mildew and stem gall.' },
      },
      {
        step: 5,
        stage: { bn: 'মসলা-বীজ সংগ্রহ', en: 'Spice Seed Harvest' },
        window: { bn: '৯৫–১১০ দিন', en: 'Days 95–110' },
        action: { bn: 'সকালে কেটে শুকানো ও বায়ুরোধী সংরক্ষণ।', en: 'Cut at dawn, shade-dry, thresh, and seal.' },
      },
    ],
  },
  {
    id: 'cumin',
    name: { bn: 'জিরা', en: 'Cumin' },
    aliases: ['jira', 'zeera', 'bari jira', 'জিরা', 'বারি জিরা-১'],
    category: 'spice',
    categoryLabel: CROP_CATEGORY_LABELS.spice,
    imageUrl: CROP_ASSETS.spices,
    sourceType: 'sample_demo',
    waterDemandLevel: 'low',
    overview: {
      bn: 'জিরা বাংলাদেশে দীর্ঘদিন আমদানিনির্ভর ছিল, তবে BARI জিরা-১ উদ্ভাবনের পর উত্তর-পশ্চিমাঞ্চলের শুষ্ক ও বেলে-দোআঁশ অঞ্চলে সীমিত পরিসরে চাষ শুরু হয়েছে। অতিরিক্ত আর্দ্রতা ও কুয়াশা এর প্রধান চ্যালেঞ্জ।',
      en: 'Cumin is an emerging high-value winter spice in dry north-western Bangladesh following BARI Jira-1; strict drainage and fog blight protection are essential.',
    },
    suitableVarieties: {
      bn: 'BARI Jira-1 এবং পরীক্ষামূলক শুষ্ক শীত উপযোগী জাত।',
      en: 'BARI Jira-1 and adapted dry-winter lines.',
    },
    suitableRegions: {
      bn: 'রাজশাহী, চাঁপাইনবাবগঞ্জ, নাটোর, পাবনা, বগুড়া ও চুয়াডাঙ্গার শুষ্ক ও সুনিষ্কাশিত উঁচু জমি।',
      en: 'Dry, well-drained upland districts including Rajshahi, Chapainawabganj, Natore, Pabna, Bogura, and Chuadanga.',
    },
    seasonAndPlanting: {
      bn: 'মধ্য নভেম্বর থেকে ডিসেম্বরের প্রথম সপ্তাহ পর্যন্ত (খুব ঠান্ডা-কুয়াশা এড়িয়ে পরিষ্কার আবহাওয়ায়) বপন করুন।',
      en: 'Sow mid-November to early December in clean, well-drained upland beds.',
    },
    soilAndPh: {
      bn: 'অত্যন্ত সুনিষ্কাশিত, জৈব পদার্থযুক্ত বেলে-দোআঁশ ও হালকা দোআঁশ মাটি; অনুকূল pH ৬.৫ থেকে ৭.৮।',
      en: 'Very well-drained sandy-loam and light loam soils around pH 6.5 to 7.8.',
    },
    landPreparation: {
      bn: '৪–৫ বার চাষ দিয়ে মাটি অতি ঝুরঝুরে ও ঢেলাহীন করে উঁচু বেড (raised bed) তৈরি করুন যাতে কোনো জল না জমে।',
      en: 'Prepare raised, fine-tilth beds with sharp side drains to guarantee zero standing moisture.',
    },
    seedSelectionAndTreatment: {
      bn: 'ভালো মানের শোধনকৃত বীজ ৬–৮ ঘণ্টা ভিজিয়ে ছায়ায় হালকা শুকিয়ে বুনুন (জিরা গজাতে ৭–১০ দিন লাগে)।',
      en: 'Treat healthy seed safely against blight/wilt and pre-soak briefly to aid slow germination.',
    },
    plantingMethod: {
      bn: '২০–২৫ সেমি দূরত্বে অগভীর সারিতে (১–১.৫ সেমি গভীর) বপন করে হালকা মাটি দিয়ে ঢেকে দিন।',
      en: 'Sow shallowly (1–1.5 cm) in 20–25 cm rows and cover lightly.',
    },
    fertilizerManagement: {
      bn: 'সম্পূর্ণ পচা জৈব সার ও পরিমিত সুষম NPK—বেশি নাইট্রোজেন দিলে গাছ নরম হয়ে ব্লাইট রোগে মারা যায়।',
      en: 'Use well-rotted compost and modest balanced NPK; excessive nitrogen softens stems and worsens Alternaria blight.',
    },
    irrigationSchedule: {
      bn: 'অত্যন্ত সংবেদনশীল সেচ—শুধুমাত্র গজানোর জন্য হালকা স্প্রে ও শুষ্কতায় ২–৩টি খুব হালকা সেচ; কুয়াশা বা মেঘলা দিনে কখনোই সেচ দেবেন না।',
      en: 'Give only minimal light moisture at sowing and 2–3 light checks if dry—never irrigate during cloudy or foggy weather.',
    },
    growthStageCare: [
      {
        stage: { bn: 'আগাছা দমন (চারা অবস্থায়)', en: 'Slow Early Stand' },
        guidance: {
          bn: 'চারা ছোট ও সরু থাকায় ২০–২৫ দিনে সাবধানে আগাছা তুলে ফেলুন।',
          en: 'Hand-weed carefully around days 20–25 while delicate threadlike seedlings establish.',
        },
      },
      {
        stage: { bn: 'কুয়াশায় ব্লাইট ও জাবপোকা রক্ষা', en: 'Fog Blight & Aphid Watch' },
        guidance: {
          bn: 'মেঘলা বা ঘন কুয়াশায় পাতার আগা ঝলসে যাওয়া (Alternaria Blight) ও জাবপোকা দ্রুত ছড়াতে পারে—প্রতিদিন মাঠ দেখুন।',
          en: 'Inspect crops daily during foggy or humid spells for Alternaria blight and umbel aphids.',
        },
      },
    ],
    weedManagement: {
      bn: 'বপনের ২০ ও ৪০ দিনে হাত দিয়ে অত্যন্ত সাবধানে আগাছা পরিষ্কার করুন।',
      en: 'Hand-weed delicately twice at 20 and 40 days.',
    },
    commonDiseasesAndPests: {
      bn: 'অল্টারনারিয়া ব্লাইট (ঝলসানো), ফিউসারিয়াম উইল্ট (ঢলে পড়া), পাউডারি মিলডিউ ও জাবপোকা।',
      en: 'Alternaria Blight, Fusarium Wilt, Powdery Mildew, and Aphids.',
    },
    preventionAndSafeManagement: {
      bn: 'জিরা অত্যন্ত রোগ-সংবেদনশীল তাই শস্য আবর্তন, উঁচু বেড, কুয়াশায় সেচ বন্ধ রাখা এবং ব্লাইট-উইল্ট দেখা দিলে সাথে সাথে ১৬১২৩ বা BARI মসলা গবেষণা কেন্দ্রের পরামর্শ নিন।',
      en: 'Strictly rotate out of umbellifers, grow on raised beds, avoid foggy irrigation, and contact 16123 immediately at early blight signs.',
    },
    harvesting: {
      bn: 'বপনের ১০০–১১০ দিন পর গাছ ও দানা হলদে-বাদামি হলে সকালের দিকে উপড়ে বা কেটে রোদে শুকান।',
      en: 'Cut or pull in early morning at 100–110 days once plants and umbels turn golden-brown.',
    },
    postHarvestStorage: {
      bn: 'ভালোভাবে রোদে শুকিয়ে হালকা পিটিয়ে দানা আলাদা করে সুগন্ধ ও রঙ বজায় রাখতে বায়ুরোধী পাত্রে রাখুন।',
      en: 'Sun-dry neatly on tarps, thresh gently, winnow cleanly, and seal airtight.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'উঁচু বেডে বপন', en: 'Raised-Bed Sow' },
        window: { bn: 'নভেম্বর মধ্য – ডিসেম্বর', en: 'Mid Nov – Dec' },
        action: { bn: 'শোধিত বীজ অগভীর সারিতে বপন।', en: 'Sow treated seed shallowly on fine beds.' },
      },
      {
        step: 2,
        stage: { bn: 'গজানো ও নিড়ানি', en: 'Emerge & Weed' },
        window: { bn: '২০–৩০ দিন', en: 'Days 20–30' },
        action: { bn: 'সাবধানে আগাছা তোলা ও পাতলা করা।', en: 'Delicate weeding and stand inspection.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল ও কুয়াশা সতর্কতা', en: 'Bloom & Fog Watch' },
        window: { bn: '৫০–৭০ দিন', en: 'Days 50–70' },
        action: { bn: 'কুয়াশায় সেচ বিরতি ও ব্লাইট পর্যবেক্ষণ।', en: 'Avoid foggy watering; scout blight daily.' },
      },
      {
        step: 4,
        stage: { bn: 'দানা গঠন', en: 'Seed Filling' },
        window: { bn: '৭৫–৯৫ দিন', en: 'Days 75–95' },
        action: { bn: 'জাবপোকা ও মিলডিউ নজরদারি।', en: 'Monitor umbels for aphids and mildew.' },
      },
      {
        step: 5,
        stage: { bn: 'সকালে সংগ্রহ', en: 'Morning Harvest' },
        window: { bn: '১০০–১১০ দিন', en: 'Days 100–110' },
        action: { bn: 'সকালে কেটে শুকানো ও মাড়াই।', en: 'Harvest at dawn, sun-dry, and seal.' },
      },
    ],
  },
  {
    id: 'black-seed',
    name: { bn: 'কালোজিরা', en: 'Black Seed (Kalojira)' },
    aliases: ['kalojira', 'kalonji', 'nigella sativa', 'কালোজিরা', 'বারি কালোজিরা'],
    category: 'spice',
    categoryLabel: CROP_CATEGORY_LABELS.spice,
    imageUrl: CROP_ASSETS.spices,
    sourceType: 'verified_reference',
    waterDemandLevel: 'low',
    overview: {
      bn: 'কালোজিরা অত্যন্ত কম খরচে ও স্বল্প পানিতে চাষযোগ্য বাংলাদেশের জনপ্রিয় ভেষজ মসলা ফসল। রোগবালাই কম হওয়ায় প্রান্তিক জমিতেও ভালো লাভ দেয়।',
      en: 'Black seed (Kalojira) is a hardy, low-water winter spice and medicinal seed crop well suited to upland soils across Bangladesh.',
    },
    suitableVarieties: {
      bn: 'BARI Kalojira-1 এবং ফরিদপুর-মাদারীপুরের উচ্চফলনশীল স্থানীয় জাত।',
      en: 'BARI Kalojira-1 and adapted Faridpur/Madaripur cultivars.',
    },
    suitableRegions: {
      bn: 'ফরিদপুর, শরীয়তপুর, মাদারীপুর, পাবনা, নাটোর, সিরাজগঞ্জ, রাজবাড়ী ও বগুড়া।',
      en: 'Main production belt spans Faridpur, Shariatpur, Madaripur, Pabna, Natore, Sirajganj, and Bogura.',
    },
    seasonAndPlanting: {
      bn: 'নভেম্বর মাস থেকে ডিসেম্বরের প্রথম সপ্তাহ পর্যন্ত রবি মৌসুমে বপন করা হয়।',
      en: 'Sown in Rabi season during November through early December.',
    },
    soilAndPh: {
      bn: 'সুনিষ্কাশিত দোআঁশ, পলি-দোআঁশ ও বেলে-দোআঁশ মাটি; অনুকূল pH ৬.০ থেকে ৭.৫।',
      en: 'Well-drained loamy, silt-loam, and sandy-loam soils around pH 6.0 to 7.5.',
    },
    landPreparation: {
      bn: '৩–৪ বার চাষ ও মই দিয়ে মাটি ঝুরঝুরে করে সমতল করুন যাতে পানি জমে না থাকে।',
      en: 'Plough 3–4 times to fine tilth with perimeter drains to prevent standing moisture.',
    },
    seedSelectionAndTreatment: {
      bn: 'স্বাস্থ্যকর ও সুগন্ধি পুষ্ট বীজ ছত্রাকনাশক বা জৈব শোধন করে বুনুন (অতিরিক্ত পুরোনো বীজ গজায় কম)।',
      en: 'Use fresh current-year seed (old seed germinates poorly) treated safely against damping-off.',
    },
    plantingMethod: {
      bn: '২০–২৫ সেমি সারিতে ২ সেমি গভীরে বীজ বপন করে হালকা মাটি দিয়ে ঢেকে দিন।',
      en: 'Sow 2 cm deep in 20–25 cm rows and cover lightly.',
    },
    fertilizerManagement: {
      bn: 'গোবর ও পরিমিত ভিত্তি সারই যথেষ্ট; ফুলের আগে সামান্য নাইট্রোজেন উপরি প্রয়োগ শাখা বাড়ায়।',
      en: 'Apply compost plus modest basal NPK and a single light vegetative side-dress if needed.',
    },
    irrigationSchedule: {
      bn: 'অত্যন্ত খরা-সহনশীল; শীতের মাটিতে রস না থাকলে গজানোর পর ও ফুল আসার সময় ১–২টি হালকা সেচ যথেষ্ট।',
      en: 'Drought-hardy; 1–2 very light irrigations around early growth and flowering suffice in dry soils.',
    },
    growthStageCare: [
      {
        stage: { bn: 'অঙ্কুর ও নিড়ানি', en: 'Early Stand & Weed' },
        guidance: {
          bn: 'চারা ২০–২৫ দিন বয়সে ঘন অংশ পাতলা করে আগাছা পরিষ্কার করুন।',
          en: 'Thin dense patches and weed cleanly around days 20–25.',
        },
      },
      {
        stage: { bn: 'ফল (ক্যাপসুল) ভরাট', en: 'Capsule Set' },
        guidance: {
          bn: 'ফুল ফোটার সময় মৌমাছি পরাগায়নে সহায়তা করে—তাই অপ্রয়োজনীয় স্প্রে পরিহার করুন।',
          en: 'Avoid unnecessary sprays during flowering so bees boost capsule pollination.',
        },
      },
    ],
    weedManagement: {
      bn: 'বপনের ২০–২৫ ও ৪০ দিনে ২ বার হাত নিড়ানি দিন।',
      en: 'Hand-weed twice at 20–25 and 40 days after sowing.',
    },
    commonDiseasesAndPests: {
      bn: 'গোড়া পচা, পাউডারি মিলডিউ, জাবপোকা ও পাতাখেকো লেদা।',
      en: 'Root/Collar Rot, Powdery Mildew, Aphids, and occasional foliage caterpillars.',
    },
    preventionAndSafeManagement: {
      bn: 'জলাবদ্ধতা এড়ানো, সময়মতো বপন ও রোগ-পোকায় প্রয়োজনে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Ensure clean drainage, sow on time, and consult 16123 if powdery mildew occurs.',
    },
    harvesting: {
      bn: 'গাছ হলুদ হয়ে ৭০–৮০% ফলের ক্যাপসুল বাদামি-খড় রঙ ধারণ করলে ও কালো বীজ দেখা দিলে সকালে কাটুন।',
      en: 'Harvest at dawn once 70–80% of seed capsules turn dry straw-brown and seeds inside turn jet-black.',
    },
    postHarvestStorage: {
      bn: 'রোদে শুকিয়ে মাড়াই করে পরিষ্কার শুকনো বীজ বায়ুরোধী ড্রাম বা কাচের/টিনের পাত্রে রাখুন।',
      en: 'Sun-dry cleanly on mats, thresh, winnow, and store in airtight moisture-free containers.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'সারিতে বপন', en: 'Row Sowing' },
        window: { bn: 'নভেম্বর – ডিসেম্বর শুরু', en: 'Nov – Early Dec' },
        action: { bn: 'মিহি জমিতে ২ সেমি গভীরে বপন।', en: 'Sow 2 cm deep in 20–25 cm lines.' },
      },
      {
        step: 2,
        stage: { bn: 'নিড়ানি ও পাতলা', en: 'Thin & Weed' },
        window: { bn: '২০–২৫ দিন', en: 'Days 20–25' },
        action: { bn: 'আগাছা পরিষ্কার ও প্রথম হালকা সেচ।', en: 'Weed rows and water lightly if dry.' },
      },
      {
        step: 3,
        stage: { bn: 'শাখা ও ফুল', en: 'Branch & Bloom' },
        window: { bn: '৪৫–৬৫ দিন', en: 'Days 45–65' },
        action: { bn: 'মৌমাছি পরাগায়ন ও দ্বিতীয় নিড়ানি।', en: 'Protect bees and complete final weed check.' },
      },
      {
        step: 4,
        stage: { bn: 'ক্যাপসুল ভরাট', en: 'Capsule Maturation' },
        window: { bn: '৭৫–১০০ দিন', en: 'Days 75–100' },
        action: { bn: 'দানা কালো হয়ে পাকা ও সেচ বন্ধ।', en: 'Keep dry as capsules turn brown.' },
      },
      {
        step: 5,
        stage: { bn: 'সংগ্রহ ও মাড়াই', en: 'Harvest & Dry' },
        window: { bn: '১১০–১২৫ দিন', en: 'Days 110–125' },
        action: { bn: 'ক্যাপসুল বাদামি হলে কেটে শুকানো ও ঝাড়া।', en: 'Cut at dawn, sun-dry, thresh, and seal.' },
      },
    ],
  },

  // ======================== OTHER & EMERGING CROPS (5) ========================
  {
    id: 'sweet-potato',
    name: { bn: 'মিষ্টি আলু', en: 'Sweet Potato' },
    aliases: ['misti alu', 'kamala sundari', 'রাঙ্গা আলু', 'মিষ্টি আলু'],
    category: 'emerging',
    categoryLabel: CROP_CATEGORY_LABELS.emerging,
    imageUrl: CROP_ASSETS.potato,
    sourceType: 'verified_reference',
    waterDemandLevel: 'low',
    overview: {
      bn: 'মিষ্টি আলু বাংলাদেশের চরাঞ্চল ও উপকূলীয় অঞ্চলের অত্যন্ত পুষ্টিকর (বিশেষ করে ভিটামিন-এ সমৃদ্ধ কমলা শাঁস) ও খরা-সহিষ্ণু ফসল। গোল আলুর মতো হিমাগারের চেয়েও কম খরচে এটি ফলানো যায়।',
      en: 'Sweet potato is a drought-hardy, beta-carotene-rich root crop thriving across river chars and light coastal soils with low production costs.',
    },
    suitableVarieties: {
      bn: 'BARI Misti Alu-4 (কমলা সুন্দরী), BARI Misti Alu-8, BARI Misti Alu-12, BARI Misti Alu-15 (বেগুনি ও কমলা) ও স্থানীয় তৃপ্তি।',
      en: 'BARI Misti Alu-4 (Kamala Sundari), BARI Misti Alu-8, 12, and 15 (biofortified orange/purple types).',
    },
    suitableRegions: {
      bn: 'ভোলা, নোয়াখালী, পটুয়াখালী, ফরিদপুর, বগুড়া, জামালপুর, গাইবান্ধা ও নদী-চরাঞ্চল।',
      en: 'Widely grown in Bhola, Noakhali, Patuakhali, Faridpur, Bogura, Jamalpur, Gaibandha, and river chars.',
    },
    seasonAndPlanting: {
      bn: 'মধ্য অক্টোবর থেকে ডিসেম্বর পর্যন্ত লতা কাটিং রোপণের সেরা সময়।',
      en: 'Vine cuttings are planted from mid-October through December.',
    },
    soilAndPh: {
      bn: 'ঝুরঝুরে বেলে-দোআঁশ, চরের পলি-বেলে ও দোআঁশ মাটি; অনুকূল pH ৫.৫ থেকে ৬.৮।',
      en: 'Loose sandy-loam and riverine silt-sand soils around pH 5.5 to 6.8.',
    },
    landPreparation: {
      bn: '৩–৪ বার গভীর চাষ দিয়ে ৬০ সেমি দূরে দূরে উঁচু ভেলি বা সারি (ridge) তৈরি করে নিন।',
      en: 'Plough deeply 3–4 times and form raised ridges 60 cm apart.',
    },
    seedSelectionAndTreatment: {
      bn: 'উইভিল পোকা ও ভাইরাসমুক্ত সুস্থ লতার আগার দিকের ২৫–৩০ সেমি লম্বা (৪–৫ গিঁটযুক্ত) কাটিং সংগ্রহ করুন।',
      en: 'Cut 25–30 cm healthy vine-tip cuttings (4–5 nodes) free of sweet potato weevil and virus.',
    },
    plantingMethod: {
      bn: 'ভেলির মাথায় ৬০×৩০ সেমি দূরত্বে মাঝের ২–৩টি গিঁট মাটির ভেতরে এবং আগা ও ২ পাতা বাইরে রেখে তির্যকভাবে রোপণ করুন।',
      en: 'Bury 2–3 middle nodes diagonally along ridges at 60×30 cm spacing, leaving leaf tips exposed.',
    },
    fertilizerManagement: {
      bn: 'জৈব সার ও পটাশ মিষ্টি আলুর কন্দ বড় করতে সবচেয়ে কার্যকর—বেশি ইউরিয়া দিলে শুধু লতাপাতা বাড়ে, আলু ছোট থাকে।',
      en: 'Emphasize decomposed compost and potassium for tuber swelling; excessive nitrogen produces dense vines with small roots.',
    },
    irrigationSchedule: {
      bn: 'চরের রসেই ভালো হয়; রোপণের পরপর ও ৬০ দিনে ১–২টি হালকা নালা সেচ যথেষ্ট, তবে তোলার আগে মাটি শুকনো রাখুন।',
      en: 'Grows well on char moisture; 1–2 light furrow waterings suffice in dry uplands before keeping harvest beds dry.',
    },
    growthStageCare: [
      {
        stage: { bn: 'লতা উল্টিয়ে দেওয়া (Vine Lifting)', en: 'Vine Lifting' },
        guidance: {
          bn: 'মাঝখানে লতার গিঁট মাটিতে লেগে অপ্রয়োজনীয় শিকড় গজালে ৬০–৭০ দিনে লতা আলতোভাবে উল্টিয়ে দিন যাতে মূল আলু বড় হয়।',
          en: 'Gently lift trailing vines off the furrows at days 60–70 so energy concentrates in main ridge tubers instead of tiny side roots.',
        },
      },
      {
        stage: { bn: 'উইভিল ও ফাটল ঢাকা', en: 'Weevil Crack Sealing' },
        guidance: {
          bn: 'আলু বড় হয়ে ভেলিতে ফাটল ধরলে মাটি দিয়ে ঢেকে দিন যাতে ঘুণ পোকা (Weevil) ডিম পাড়তে না পারে।',
          en: 'Seal soil cracks along ridges promptly so sweet potato weevils cannot crawl down to lay eggs.',
        },
      },
    ],
    weedManagement: {
      bn: 'রোপণের ২৫ ও ৪৫ দিনে নিড়ানি ও মাটি তুলে দিন; এরপর লতা মাটি ঢেকে ফেলে।',
      en: 'Weed once or twice ahead of rapid vine canopy cover.',
    },
    commonDiseasesAndPests: {
      bn: 'মিষ্টি আলুর উইভিল (ঘুণ পোকা — প্রধান শত্রু), ফেদারি মটল ভাইরাস ও কন্দ পচা।',
      en: 'Sweet Potato Weevil (primary pest), Feathery Mottle Virus, and Storage Rot.',
    },
    preventionAndSafeManagement: {
      bn: 'সুস্থ নতুন আগার কাটিং ব্যবহার, ভেলির ফাটল ঢেকে রাখা, ফসল আবর্তন ও উইভিল ফেরোমন ফাঁদের জন্য ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Plant clean vine tips, seal soil cracks, rotate away from previous plots, and consult 16123 for weevil pheromone traps.',
    },
    harvesting: {
      bn: '১২০–১৪০ দিন পর পাতা হলদে হলে ও ১টি আলু কেটে দেখলে দুধের মতো কষ দ্রুত শুকালে কোদাল দিয়ে সাবধানে তুলুন।',
      en: 'Dig gently at 120–140 days when foliage yellows and cut sample sap dries quickly without blackening.',
    },
    postHarvestStorage: {
      bn: 'ক্ষতহীন আলু ছায়ায় ৩–৪ দিন রেখে চামড়া শক্ত (curing) করে শুকনো বালির স্তরে বা বাতাসযুক্ত মাচায় রাখুন।',
      en: 'Shade-cure intact roots 3–4 days to heal surface scuffs, then store on airy slatted racks.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'ভেলিতে লতা রোপণ', en: 'Vine Cutting Plant' },
        window: { bn: 'নভেম্বর', en: 'November' },
        action: { bn: 'উঁচু ভেলিতে ২৫–৩০ সেমি আগার কাটিং রোপণ।', en: 'Plant healthy vine tips on 60 cm ridges.' },
      },
      {
        step: 2,
        stage: { bn: 'নিড়ানি ও পটাশ সার', en: 'Weed & Potash' },
        window: { bn: '২৫–৩৫ দিন', en: 'Days 25–35' },
        action: { bn: 'আগাছা পরিষ্কার ও গোড়ায় মাটি তোলা।', en: 'Weed and side-dress potash at hilling.' },
      },
      {
        step: 3,
        stage: { bn: 'লতা উল্টানো', en: 'Vine Lifting' },
        window: { bn: '৬০–৭০ দিন', en: 'Days 60–70' },
        action: { bn: 'অপ্রয়োজনীয় গিঁট-শিকড় ছাড়াতে লতা তোলা।', en: 'Lift trailing runners to focus root size.' },
      },
      {
        step: 4,
        stage: { bn: 'ফাটল ঢাকা ও উইভিল রক্ষা', en: 'Crack Sealing' },
        window: { bn: '৮৫–১১০ দিন', en: 'Days 85–110' },
        action: { bn: 'ভেলির ফাটলে মাটি দেওয়া ও ফেরোমন ফাঁদ।', en: 'Cover soil cracks against weevils.' },
      },
      {
        step: 5,
        stage: { bn: 'খুঁড়ে তোলা ও কিউরিং', en: 'Dig & Cure' },
        window: { bn: '১২০–১৪০ দিন', en: 'Days 120–140' },
        action: { bn: 'অক্ষত অবস্থায় তুলে ছায়ায় সংরক্ষণ।', en: 'Lift without bruising and shade-cure.' },
      },
    ],
  },
  {
    id: 'taro',
    name: { bn: 'মুখীকচু (কচু)', en: 'Taro (Mukhi Kachu)' },
    aliases: ['mukhi kachu', 'kochu', 'bilashi', 'মুখীকচু', 'কচু', 'লতিরাজ'],
    category: 'emerging',
    categoryLabel: CROP_CATEGORY_LABELS.emerging,
    imageUrl: CROP_ASSETS.vegetables,
    sourceType: 'verified_reference',
    waterDemandLevel: 'high',
    overview: {
      bn: 'মুখীকচু ও পানি কচু বাংলাদেশের চরম আবহাওয়া ও খরিপ মৌসুমের অত্যন্ত সহনশীল এবং পুষ্টিকর কন্দ ফসল।',
      en: 'Taro (Mukhi Kachu) is a resilient Kharif tuber crop across Bangladesh thriving in humid warm-season weather where many other vegetables struggle.',
    },
    suitableVarieties: {
      bn: 'BARI Mukhikachu-1 (বিলাসী), BARI Mukhikachu-2 এবং পানি কচুর BARI Panikachu-1 (লতিরাজ)।',
      en: 'BARI Mukhikachu-1 (Bilashi), BARI Mukhikachu-2, and aquatic stolon type BARI Panikachu-1 (Latiraj).',
    },
    suitableRegions: {
      bn: 'যশোর, বগুড়া, রংপুর, জয়পুরহাট, ময়মনসিংহ, কুমিল্লা ও ব্রাহ্মণবাড়িয়া।',
      en: 'Major belts in Jashore, Bogura, Rangpur, Joypurhat, Mymensingh, Cumilla, and Brahmanbaria.',
    },
    seasonAndPlanting: {
      bn: 'ফেব্রুয়ারি থেকে মধ্য এপ্রিল পর্যন্ত বীজ-মুখী রোপণ করা হয়।',
      en: 'Planted February through mid-April.',
    },
    soilAndPh: {
      bn: 'গভীর, জৈব পদার্থসমৃদ্ধ দোআঁশ ও পলি-দোআঁশ মাটি (মুখীকচুতে পানি নিকাশ জরুরি, পানিকচু ভেজা জমি পছন্দ করে); pH ৫.৫ থেকে ৬.৮।',
      en: 'Rich loamy and silty-loam soil around pH 5.5 to 6.8 (upland Mukhi requires drainage; Pani Kachu tolerates shallow water).',
    },
    landPreparation: {
      bn: 'গভীর চাষ ও মই দিয়ে প্রচুর পচা গোবর মিশিয়ে ৬০ সেমি দূরে দূরে সারিবদ্ধ নালা ও ভেলি করুন।',
      en: 'Deeply till, mix generous compost, and shape 60 cm ridges.',
    },
    seedSelectionAndTreatment: {
      bn: '২৫–৩০ গ্রাম ওজনের সুস্থ, কুঁড়িযুক্ত গোল বীজ কন্দ (cormel) শোধন করে রোপণ করুন।',
      en: 'Choose healthy 25–30 g sprouted cormels free of soft rot.',
    },
    plantingMethod: {
      bn: '৬০×৪৫ সেমি দূরত্বে ৬–৭ সেমি গভীরে বীজ মুখী বসিয়ে দিন এবং ওপরে হালকা খড় বা কচুরিপানা বিছিয়ে দিন।',
      en: 'Plant 6–7 cm deep at 60×45 cm spacing and mulch lightly for moisture.',
    },
    fertilizerManagement: {
      bn: 'প্রচুর গোবর, ভিত্তি সার ও রোপণের ৪৫ ও ৯০ দিনে মাটি তোলার সময় কিস্তিতে পটাশ ও নাইট্রোজেন দিন।',
      en: 'Combine heavy compost with split potassium and nitrogen top-dressings at 45 and 90 days.',
    },
    irrigationSchedule: {
      bn: 'গ্রীষ্মকালে গজানো ও পাতা বৃদ্ধির সময় ১০–১২ দিন পরপর সেচ দিন; বর্ষায় মুখীকচুর জমিতে পানি নিকাশ বজায় রাখুন।',
      en: 'Water every 10–12 days during dry spring growth; keep upland Mukhi Kachu drained during heavy monsoon.',
    },
    growthStageCare: [
      {
        stage: { bn: 'ভেলি উঁচু করা', en: 'Hilling Ridges' },
        guidance: {
          bn: '৪৫ ও ৯০ দিনে সার দিয়ে দুপাশের মাটি তুলে ভেলি উঁচু করলে মুখীগুলো ভালোভাবে বাড়ে।',
          en: 'Mound soil up rows at days 45 and 90 so developing cormels stay covered.',
        },
      },
      {
        stage: { bn: 'লিফ ব্লাইট ও মাকড় দেখা', en: 'Leaf Blight Watch' },
        guidance: {
          bn: 'বর্ষায় পাতায় গোল পানি-ভেজা দাগ (Taro Leaf Blight) দ্রুত ছড়ায় কি না দেখুন।',
          en: 'Inspect broad heart-shaped leaves during rains for water-soaked Phytophthora blight.',
        },
      },
    ],
    weedManagement: {
      bn: 'রোপণের প্রথম ৫০ দিনে ২ বার নিড়ানি ও মাল্চিং দিয়ে আগাছা নিয়ন্ত্রণ করুন।',
      en: 'Weed twice in the first 50 days before big umbrella leaves shade rows.',
    },
    commonDiseasesAndPests: {
      bn: 'পাতা মড়ক রোগ (Taro Leaf Blight — Phytophthora), মাকড়, জাবপোকা ও পাতাখেকো পোকা।',
      en: 'Taro Leaf Blight, Spider Mite, Aphids, and Leaf-eating Caterpillars.',
    },
    preventionAndSafeManagement: {
      bn: 'সহনশীল BARI-1/2 চাষ, ফসল আবর্তন, আক্রান্ত পাতা ছেঁটে ফেলা ও লিফ ব্লাইটের জন্য ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Grow tolerant varieties, rotate plots, prune first spotted leaves, and consult 16123 if blight advances.',
    },
    harvesting: {
      bn: 'রোপণের ৬–৭ মাস পর (অক্টোবর–নভেম্বর) গাছ ও পাতা হলুদ হয়ে শুকিয়ে গেলে মাটি খুঁড়ে মুখী সংগ্রহ করুন।',
      en: 'Dig cormels 6–7 months after planting (Oct–Nov) once stems dry back.',
    },
    postHarvestStorage: {
      bn: 'মাটি পরিষ্কার করে ছায়ায় শুকিয়ে ঠান্ডা ঝুড়ি বা ঘরের মেঝেতে রাখলে কয়েক মাস ভালো থাকে।',
      en: 'Clean off soil, air-cure in shade, and store on cool ventilated indoor floors.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'বীজ-মুখী রোপণ', en: 'Cormel Planting' },
        window: { bn: 'ফেব্রুয়ারি–এপ্রিল', en: 'Feb – Apr' },
        action: { bn: 'সারযুক্ত ভেলিতে বীজ মুখী ও মাল্চ দেওয়া।', en: 'Plant healthy cormels on compost ridges.' },
      },
      {
        step: 2,
        stage: { bn: '১ম নিড়ানি ও মাটি তোলা', en: '1st Weed & Hill' },
        window: { bn: '৪৫ দিন', en: 'Day 45' },
        action: { bn: 'আগাছা দমন, সার ও ভেলি তোলা।', en: 'Weed, top-dress, and mound soil.' },
      },
      {
        step: 3,
        stage: { bn: '২য় মাটি তোলা', en: '2nd Earthing Up' },
        window: { bn: '৯০ দিন', en: 'Day 90' },
        action: { bn: 'কন্দ বৃদ্ধির জন্য পুনরায় সার ও মাটি।', en: 'Second potash feed and deep ridge hilling.' },
      },
      {
        step: 4,
        stage: { bn: 'বর্ষা ও পাতা মড়ক দেখা', en: 'Monsoon Care' },
        window: { bn: '৪–৬ মাস', en: 'Months 4–6' },
        action: { bn: 'নিকাশ রক্ষা ও লিফ ব্লাইট পর্যবেক্ষণ।', en: 'Maintain drainage and scout leaf blight.' },
      },
      {
        step: 5,
        stage: { bn: 'খনন ও সংরক্ষণ', en: 'Dig & Store' },
        window: { bn: '৬.৫–৭.৫ মাস', en: 'Months 6.5–7.5' },
        action: { bn: 'গাছ শুকালে মুখী তোলা ও ছায়ায় রাখা।', en: 'Dig mature cormels and cure in shade.' },
      },
    ],
  },
  {
    id: 'strawberry',
    name: { bn: 'স্ট্রবেরি', en: 'Strawberry' },
    aliases: ['strawberry', 'bari strawberry', 'স্ট্রবেরি', 'রঙিন ফল'],
    category: 'emerging',
    categoryLabel: CROP_CATEGORY_LABELS.emerging,
    imageUrl: CROP_ASSETS.fruits,
    sourceType: 'sample_demo',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'স্ট্রবেরি বাংলাদেশের শীতকালীন উচ্চমূল্যের একটি আধুনিক উদ্যান ফসল। উঁচু বেড, পলি-মাল্চিং বা খড়ের বিছানা এবং পাখি রক্ষা জাল ব্যবহার করে উত্তরাঞ্চল ও শহরের পাশে ভালো ফলন হয়।',
      en: 'Strawberry is a high-value winter specialty fruit adapted to northern and peri-urban Bangladesh using raised beds, mulch, and protective bird netting.',
    },
    suitableVarieties: {
      bn: 'BARI Strawberry-1, BARI Strawberry-2, BARI Strawberry-3, রুবি গেম ও ফেস্টিভাল জাত।',
      en: 'BARI Strawberry-1, 2, 3, Festival, and Ruby Gem.',
    },
    suitableRegions: {
      bn: 'রাজশাহী, চাঁপাইনবাবগঞ্জ, জয়পুরহাট, বগুড়া, সাভার, গাজীপুর ও ময়মনসিংহের শীতল এলাকা।',
      en: 'Growing pockets in Rajshahi, Chapainawabganj, Joypurhat, Bogura, Savar, Gazipur, and Mymensingh.',
    },
    seasonAndPlanting: {
      bn: 'অক্টোবর মধ্য থেকে নভেম্বর মাস চারা রোপণের উত্তম সময় (ফল পাওয়া যায় জানুয়ারি–মার্চ)।',
      en: 'Transplant runner plantlets mid-October through November for Jan–Mar harvests.',
    },
    soilAndPh: {
      bn: 'হালকা অম্লীয়, জৈব পদার্থসমৃদ্ধ ও অতি সুনিষ্কাশিত বেলে-দোআঁশ মাটি; আদর্শ pH ৫.৫ থেকে ৬.৫।',
      en: 'Slightly acidic, humus-rich, perfectly drained sandy-loam soil at pH 5.5 to 6.5.',
    },
    landPreparation: {
      bn: 'কেঁচো সার/পচা গোবর মিশিয়ে ২০ সেমি উঁচু ও ৯০ সেমি চওড়া বেড তৈরি করে কালো-রুপালি পলিথিন মাল্চ বা পরিষ্কার খড় বিছানোর ব্যবস্থা করুন।',
      en: 'Build 20-cm raised beds enriched with vermicompost and fit silver-black poly-mulch or clean dry straw.',
    },
    seedSelectionAndTreatment: {
      bn: 'রোগমুক্ত টিস্যু কালচার বা সুস্থ রানার চারা (crown পচা মুক্ত) বাছাই করে শিকড় শোধন করে নিন।',
      en: 'Use certified tissue-culture or healthy disease-free runner plantlets dipped safely against crown rot.',
    },
    plantingMethod: {
      bn: 'দ্বি-সারি বেডে ৩০×৩০ সেমি দূরত্বে গাছের মুকুট (crown) মাটির ঠিক সমতলে রেখে রোপণ করুন—মুকুট পুঁতে দিলে পচে যায়।',
      en: 'Plant in double rows at 30×30 cm spacing keeping the central crown flush with soil—burying crowns rots plants.',
    },
    fertilizerManagement: {
      bn: 'প্রচুর কেঁচো সার ও পটাশ-ক্যালসিয়াম-বোরন সমৃদ্ধ সুষম সার কিস্তিতে দিলে ফলের মিষ্টতা ও দৃঢ়তা বাড়ে।',
      en: 'Emphasize vermicompost and balanced split potassium/calcium/boron feeds for sweet, firm berries.',
    },
    irrigationSchedule: {
      bn: 'হালকা ড্রিপ বা ঝাঁঝরি-নালা সেচে শিকড় অঞ্চল সিক্ত রাখুন; ফল ও ফুলের ওপর সরাসরি পানি দেবেন না যাতে ধূসর পচা (Gray Mold) না হয়।',
      en: 'Use gentle furrow or drip irrigation keeping soil evenly moist without wetting flowers or ripe berries.',
    },
    growthStageCare: [
      {
        stage: { bn: 'মাল্চিং ও রানার ছাঁটাই', en: 'Mulch & Runner Removal' },
        guidance: {
          bn: 'ফল মাটির সংস্পর্শে এলে পচে যায়—খড় বা পলি মাল্চ রাখুন এবং ফলের মৌসুমে অপ্রয়োজনীয় নতুন রানার কেটে দিন।',
          en: 'Ensure berries rest on clean plastic/straw mulch instead of bare soil, and snip excess runners during fruiting.',
        },
      },
      {
        stage: { bn: 'পাখি ও লাল মাকড় থেকে রক্ষা', en: 'Netting & Mite Control' },
        guidance: {
          bn: 'ফল লাল হওয়া শুরু করলে উপরে হালকা জাল দিন ও পাতার নিচে লাল মাকড় দেখুন।',
          en: 'Cover beds with lightweight bird netting as berries blush and watch undersides for two-spotted spider mites.',
        },
      },
    ],
    weedManagement: {
      bn: 'পলিমাল্চ বা পুরু খড় আগাছা দমন করে; গোড়ার গর্তের আগাছা হাত দিয়ে তুলুন।',
      en: 'Poly-mulch blocks bed weeds; pull weeds inside planting holes gently by hand.',
    },
    commonDiseasesAndPests: {
      bn: 'গ্রে মোল্ড (ফল পচা), ক্রাউন রট, লাল মাকড় (Red Spider Mite), থ্রিপস ও পাখি।',
      en: 'Botrytis Gray Mold, Crown Rot, Two-Spotted Spider Mite, Thrips, and Birds.',
    },
    preventionAndSafeManagement: {
      bn: 'রোগমুক্ত চারা, মাল্চিং, সকালের সেচ (সন্ধ্যায় ভেজালে ছত্রাক বাড়ে), পচা ফল সাথে সাথে সরানো এবং মাকড়ে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Plant clean stock, water early morning only, remove gray-molded berries promptly, and consult 16123 for spider mites.',
    },
    harvesting: {
      bn: 'ফল ৭৫–৯০% উজ্জ্বল লাল হলে বোঁটার সামান্য অংশসহ ১–২ দিন পরপর ভোরবেলায় তুলুন।',
      en: 'Pick berries with calyx and short stems every 1–2 days in cool morning hours once 75–90% red.',
    },
    postHarvestStorage: {
      bn: 'অত্যন্ত নাজুক ফল—তুলার বা ফোম-প্যাডেড ছিদ্রযুক্ত ক্লিয়ার প্লাস্টিক বক্সে এক স্তরে সাজিয়ে দ্রুত ঠান্ডা স্থানে রাখুন।',
      en: 'Pack single layers gently in ventilated punnet boxes and cool rapidly—never wash until ready to eat.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'মাল্চ বেড ও চারা রোপণ', en: 'Mulch Bed & Plant' },
        window: { bn: 'অক্টোবর মধ্য – নভেম্বর', en: 'Mid Oct – Nov' },
        action: { bn: 'মাল্চ বেডে মুকুট সমান রেখে রোপণ।', en: 'Plant clean runners with crowns flush to soil.' },
      },
      {
        step: 2,
        stage: { bn: 'শিকড় ও রানার ছাঁটাই', en: 'Establish & Trim' },
        window: { bn: '২৫–৪৫ দিন', en: 'Days 25–45' },
        action: { bn: 'রানার কাটা, নিড়ানি ও পটাশ সার।', en: 'Clip runners and feed potassium lightly.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল ও খড় বিছানো', en: 'Bloom & Straw Cushion' },
        window: { bn: '৫০–৭০ দিন', en: 'Days 50–70' },
        action: { bn: 'মৌমাছি পরাগায়ন ও লাল মাকড় দেখা।', en: 'Protect bees and scout undersides for mites.' },
      },
      {
        step: 4,
        stage: { bn: 'ফল রঙ ও জাল টানানো', en: 'Netting & Ripening' },
        window: { bn: '৭৫–৮৫ দিন', en: 'Days 75–85' },
        action: { bn: 'পাখি ঠেকাতে বেডের ওপর জাল দেওয়া।', en: 'Install lightweight netting as berries color.' },
      },
      {
        step: 5,
        stage: { bn: 'ভোরে সংগ্রহ ও প্যাকিং', en: 'Morning Harvest' },
        window: { bn: '৮৫–১৪০ দিন', en: 'Days 85–140' },
        action: { bn: 'বোঁটাসহ তুলে পাঞ্জেট বক্সে দ্রুত বিপণন।', en: 'Harvest morning crops gently into punnets.' },
      },
    ],
  },
  {
    id: 'cashew-nut',
    name: { bn: 'কাজুবাদাম', en: 'Cashew Nut' },
    aliases: ['kaju badam', 'cashew', 'কাজুবাদাম', 'পার্বত্য কাজু'],
    category: 'emerging',
    categoryLabel: CROP_CATEGORY_LABELS.emerging,
    imageUrl: CROP_ASSETS.fruits,
    sourceType: 'sample_demo',
    waterDemandLevel: 'low',
    overview: {
      bn: 'কাজুবাদাম বাংলাদেশের পার্বত্য চট্টগ্রাম ও মধুপুর-বরেন্দ্র টিলাঞ্চলের দ্রুত বর্ধনশীল, অত্যন্ত খরা-সহিষ্ণু ও উচ্চ রপ্তানি-সম্ভাবনাময় বহুবর্ষজীবী বাদাম ফসল।',
      en: 'Cashew nut is an increasingly important drought-hardy commercial tree crop across Chittagong Hill Tracts and red-soil uplands with strong export value.',
    },
    suitableVarieties: {
      bn: 'BARI Kaju Badam-1, BARI Kaju Badam-2 ও ভিয়েতনাম/ভারত থেকে আনীত উচ্চফলনশীল M-23/M-44 কলম জাত।',
      en: 'BARI Kaju Badam-1, BARI Kaju Badam-2, and high-yielding grafted exotic lines (M-23/M-44).',
    },
    suitableRegions: {
      bn: 'বান্দরবান (থানচি-রুমা-রোয়াংছড়ি), খাগড়াছড়ি, রাঙ্গামাটি, সিলেট-মৌলভীবাজারের টিলা এবং টাঙ্গাইল (মধুপুর)।',
      en: 'Hubs in Bandarban, Khagrachari, Rangamati, Sylhet/Moulvibazar hillocks, and Madhupur.',
    },
    seasonAndPlanting: {
      bn: 'বর্ষার শুরুতে অর্থাৎ মে থেকে জুলাই মাস নতুন চারা রোপণের শ্রেষ্ঠ সময়।',
      en: 'Planted at monsoon onset (May through July).',
    },
    soilAndPh: {
      bn: 'পাহাড়ি ঢালু বা উঁচু সুনিষ্কাশিত লাল মাটি ও বেলে-দোআঁশ (জল জমে না এমন যেকোনো উঁচু জমি); pH ৫.০ থেকে ৬.৫।',
      en: 'Well-drained upland red laterite, hill slopes, and sandy-loams around pH 5.0 to 6.5 (never waterlogged).',
    },
    landPreparation: {
      bn: '৭×৭ বা ৮×৮ মিটার দূরত্বে পাহাড়ের ঢালে কন্টুর লাইন ধরে গর্ত তৈরি করে জৈব সার মিশিয়ে ভরাট করুন।',
      en: 'Dig 60×60×60 cm pits along hillside contours at 7–8 m spacing filled with topsoil and compost.',
    },
    seedSelectionAndTreatment: {
      bn: 'বীজ-গাছের বদলে ফলপ্রদায়ী উচ্চফলনশীল গাছের সফট-উড গ্রাফটেড (softwood graft) কলম চারা রোপণ করলে ৩ বছরেই ফল ধরে।',
      en: 'Plant certified softwood-grafted saplings (bearers in 3 years) rather than seed-grown trees.',
    },
    plantingMethod: {
      bn: 'খুঁটি দিয়ে বেঁধে রোপণ করুন, পাহাড়ে বাতাসের ক্ষতি এড়াতে গোড়ায় মাটি চেপে দিন ও ঢাল ক্ষয় রোধে মাল্চিং দিন।',
      en: 'Stake firmly against hill winds and mulch root basins to retain monsoon moisture.',
    },
    fertilizerManagement: {
      bn: 'কম সারেও হয়, তবে বর্ষার শুরু ও শেষে জৈব সারের সাথে সুষম NPK দিলে মুকুল ও বাদামের ওজন বাড়ে।',
      en: 'Even low-input trees respond well to compost plus annual pre/post-monsoon NPK splits.',
    },
    irrigationSchedule: {
      bn: 'অত্যন্ত খরা-সহিষ্ণু; কেবল রোপণের প্রথম ১–২ শীতে শুকনো পাহাড়ে পানি ও মাল্চিং দিলেই হয়।',
      en: 'Remarkably drought-tolerant; water saplings only during their first 1–2 dry winters.',
    },
    growthStageCare: [
      {
        stage: { bn: 'রুটস্টক ডাল ছাঁটাই ও কাঠামো', en: 'Pruning & Canopy Shape' },
        guidance: {
          bn: 'জোড়ের নিচের ডাল ও মাটি ঘেঁষে থাকা নিচের শাখা ছেঁটে ছাতার মতো খোলা ডালপালা তৈরি করুন।',
          en: 'Snap off suckers below the graft union and clear lowest branches for clean orchard floor picking.',
        },
      },
      {
        stage: { bn: 'টি-মসকিউটো বাগ (TMB) নজরদারি', en: 'Tea Mosquito Bug Watch' },
        guidance: {
          bn: 'শীতে নতুন কচি ডগা ও মুকুল কালচে হয়ে শুকিয়ে যাওয়া (Tea Mosquito Bug) ও কাণ্ড ছিদ্রকারী পোকা পরীক্ষা করুন।',
          en: 'Scout tender winter flushes and panicles closely for sap-sucking Tea Mosquito Bug scorching.',
        },
      },
    ],
    weedManagement: {
      bn: 'বর্ষা শেষে গাছের গোড়ার আগাছা কেটে ঢিবি পরিষ্কার রাখুন যাতে বাদাম কুড়াতে সুবিধা হয় এবং শুষ্ক মৌসুমে আগুন না লাগে।',
      en: 'Slash weeds around tree rings before dry season to aid nut collection and prevent dry brush fires.',
    },
    commonDiseasesAndPests: {
      bn: 'টি-মসকিউটো বাগ (সবচেয়ে বড় শত্রু), কাণ্ড ও মূল ছিদ্রকারী পোকা (CSRB) এবং ডাই-ব্যাক।',
      en: 'Tea Mosquito Bug (Helopeltis), Cashew Stem & Root Borer (CSRB), and Blossom Die-back.',
    },
    preventionAndSafeManagement: {
      bn: 'বাগান পরিষ্কার রাখা, আক্রান্ত ডগা ছাঁটাই এবং মুকুল অবস্থায় টি-মসকিউটো বাগ বা বোরারের জন্য ১৬১২৩ বা পাহাড়ি কৃষি অফিসের পরামর্শ নিন।',
      en: 'Keep bases weed-free, prune scorched shoots, watch trunk bases for borer frass, and consult 16123 for TMB timing.',
    },
    harvesting: {
      bn: 'মার্চ–মে মাসে রঙিন কাজু-আপেলসহ বাদাম গাছ থেকে পেকে মাটিতে ঝরে পড়লে (বা আপেল নরম রঙিন হলে) প্রতি ১–২ দিন পরপর কুড়িয়ে সংগ্রহ করুন।',
      en: 'Collect naturally fallen ripe nuts every 1–2 days during March–May once juicy cashew apples soften and color.',
    },
    postHarvestStorage: {
      bn: 'আপেল থেকে কাঁচা বাদাম আলাদা করে ২–৩ দিন কড়া রোদে শুকিয়ে ঝুনঝুন করলে শুষ্ক বস্তায় ১ বছর রাখা যায় (বাদামের ভেতরের ঝাঁঝালো তেল CNSL ত্বকে লাগাবেন না—প্রক্রিয়াজাতকরণ কারখানায় ভাজা হয়)।',
      en: 'Twist nuts cleanly off apples, sun-dry 2–3 days until kernels rattle inside shells, and store dry (raw shells contain caustic CNSL oil—process safely).',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'পাহাড়ে কলম রোপণ', en: 'Monsoon Graft Plant' },
        window: { bn: 'মে–জুলাই', en: 'May – Jul' },
        action: { bn: 'কন্টুর গর্তে গ্রাফটেড চারা রোপণ ও খুঁটি।', en: 'Plant grafted saplings along hill contours.' },
      },
      {
        step: 2,
        stage: { bn: 'তরুণ গাছ পরিচর্যা', en: 'Juvenile Frame (Yr 1–2)' },
        window: { bn: '১–২ বছর', en: 'Years 1–2' },
        action: { bn: 'নিচের ডাল ছাঁটাই ও শীতকালে মাল্চিং।', en: 'Remove rootstock shoots and dry-mulch.' },
      },
      {
        step: 3,
        stage: { bn: 'মুকুল ও টিএমবি নজরদারি', en: 'Flowering & TMB Watch' },
        window: { bn: 'ডিসেম্বর–ফেব্রুয়ারি', en: 'Dec – Feb' },
        action: { bn: 'নতুন ডগা ও মুকুলে টি-মসকিউটো দেখা।', en: 'Scout young panicles for Tea Mosquito Bug.' },
      },
      {
        step: 4,
        stage: { bn: 'কাজু আপেল ও বাদাম পুষ্ট', en: 'Nut & Apple Maturation' },
        window: { bn: 'ফেব্রুয়ারি–এপ্রিল', en: 'Feb – Apr' },
        action: { bn: 'গাছের নিচের জমি পরিষ্কার রাখা।', en: 'Clear ground beneath canopy for collection.' },
      },
      {
        step: 5,
        stage: { bn: 'সংগ্রহ ও রোদে শুকানো', en: 'Collect & Sun-Dry' },
        window: { bn: 'মার্চ–মে', en: 'Mar – May' },
        action: { bn: 'বাদাম কুড়িয়ে আপেল ছাড়িয়ে রোদে শুকানো।', en: 'Gather fallen nuts, detach apples, and dry.' },
      },
    ],
  },
  {
    id: 'chia-seed',
    name: { bn: 'চিয়া বীজ', en: 'Chia Seed' },
    aliases: ['chia', 'salvia hispanica', 'চিয়া', 'চিয়া সিড'],
    category: 'emerging',
    categoryLabel: CROP_CATEGORY_LABELS.emerging,
    imageUrl: CROP_ASSETS.oilseeds,
    sourceType: 'sample_demo',
    waterDemandLevel: 'low',
    overview: {
      bn: 'চিয়া বীজ (Salvia hispanica) বাংলাদেশে নতুন পরীক্ষামূলক ও উচ্চ চাহিদাসম্পন্ন সুপারফুড রবি ফসল। ওমেগা-৩ ও ফাইবারসমৃদ্ধ এই ফসল শীতকালীন শুষ্ক ও সুনিষ্কাশিত জমিতে কম খরচে চাষ করা সম্ভব হচ্ছে।',
      en: 'Chia seed (Salvia hispanica) is an emerging high-value winter specialty crop in Bangladesh suited to dry, well-drained Rabi soils with low water use.',
    },
    suitableVarieties: {
      bn: 'কালো ও সাদা আমদানিকৃত/অভিযোজিত রবি উপযোগী সিলেকশন লাইন (স্থানীয় কৃষি অফিস বা গবেষণা স্টেশনের প্রত্যয়িত উৎস থেকে সংগ্রহ করুন)।',
      en: 'Adapted black and white Rabi-season selections sourced from verified agricultural research stations.',
    },
    suitableRegions: {
      bn: 'পাবনা, নাটোর, রাজশাহী, নওগাঁ, বগুড়া, টাঙ্গাইল ও কুমিল্লায় পরীক্ষামূলক ও ক্ষুদ্র-বাণিজ্যিক চাষ শুরু হয়েছে।',
      en: 'Pilot and niche cultivation across Pabna, Natore, Rajshahi, Naogaon, Bogura, Tangail, and Cumilla.',
    },
    seasonAndPlanting: {
      bn: 'মধ্য অক্টোবর থেকে নভেম্বর (শীতের শুরুতে) বপনের উত্তম সময়; আলোক-সংবেদনশীল (short-day) হওয়ায় সঠিক সময়ে বোনা জরুরি।',
      en: 'Sow mid-October through November (short-day photoperiod triggers winter flowering).',
    },
    soilAndPh: {
      bn: 'সুনিষ্কাশিত হালকা বেলে-দোআঁশ ও দোআঁশ মাটি (জলাবদ্ধতা চরম ক্ষতিকর); অনুকূল pH ৬.০ থেকে ৭.৫।',
      en: 'Well-drained sandy-loam and loamy soils around pH 6.0 to 7.5 (sensitive to wet feet).',
    },
    landPreparation: {
      bn: 'তিল বা কাউনের মতো অতি মিহি ঝুরঝুরে ও আগাছামুক্ত সমতল বেড তৈরি করুন।',
      en: 'Prepare a very fine, weed-free, well-drained seedbed similar to sesame or millet.',
    },
    seedSelectionAndTreatment: {
      bn: 'চিয়া বীজ খুব ক্ষুদ্র ও পানি পেলেই পিচ্ছিল আঠালো (mucilage) হয়ে যায়—তাই ভেজাবেন না! শুকনো সূক্ষ্ম বালি বা ছাইয়ের সাথে মিশিয়ে বপন করুন।',
      en: 'NEVER soak chia seeds before sowing (they form sticky gel immediately)—mix dry seed with fine dry sand for even distribution.',
    },
    plantingMethod: {
      bn: '৩০–৪০ সেমি দূরত্বে অগভীর সারিতে (০.৫–১ সেমি গভীরে) বপন করুন এবং মই না দিয়ে ঝাঁটা বা হালকা মাটি টেনে ঢেকে দিন।',
      en: 'Sow very shallowly (0.5–1 cm) in 30–40 cm lines and brush soil lightly over seed.',
    },
    fertilizerManagement: {
      bn: 'খুব অল্প সারেই হয়; কম্পোস্ট ও সামান্য ভিত্তি সার যথেষ্ট—বেশি নাইট্রোজেন দিলে গাছ অতিরিক্ত লম্বা হয়ে নুয়ে পড়ে।',
      en: 'Low-input crop; modest compost and basal nutrients suffice—excess nitrogen causes tall stems to lodge.',
    },
    irrigationSchedule: {
      bn: 'খরা-সহনশীল ফসল; গজানোর সময় হালকা আর্দ্রতা ও ফুলের আগে ১–২টি খুব হালকা সেচ ছাড়া প্রায় পানির প্রয়োজন হয় না।',
      en: 'Drought-resilient; light moisture at emergence and 1–2 gentle checks before flowering are usually plenty.',
    },
    growthStageCare: [
      {
        stage: { bn: 'অঙ্কুরোদগম ও পাতলা', en: 'Early Emergence' },
        guidance: {
          bn: '১৫–২০ দিনের মধ্যে ঘন চারা পাতলা করে ১০–১৫ সেমি দূরত্ব বজায় রাখুন।',
          en: 'Thin dense seedlings around days 15–20 to 10–15 cm plant spacing for sturdy stalks.',
        },
      },
      {
        stage: { bn: 'শীষ পরিপক্ব ও বৃষ্টি সতর্কতা', en: 'Spike Maturity & Rain Watch' },
        guidance: {
          bn: 'বীজ পাকার সময় চৈত্রের হঠাৎ বৃষ্টিতে ভেজালে বীজ জেলি হয়ে নষ্ট হয়—তাই আবহাওয়া পূর্বাভাস দেখে নিন।',
          en: 'Monitor forecasts as spikes ripen—unseasonal spring rain on dry spikes ruins gel-coated seed.',
        },
      },
    ],
    weedManagement: {
      bn: 'বপনের ১৫ ও ৩০ দিনে ২ বার সাবধানে আগাছা পরিষ্কার করুন।',
      en: 'Hand-weed carefully twice around days 15 and 30.',
    },
    commonDiseasesAndPests: {
      bn: 'গোড়া পচা (অতিরিক্ত পানিতে), কাটুই পোকা ও পাতাখেকো পোকা (সাধারণত পাতা-কাণ্ডের তীব্র গন্ধের কারণে পোকা কম লাগে)।',
      en: 'Root rot in wet soils and occasional caterpillars (aromatic leaves naturally deter many pests).',
    },
    preventionAndSafeManagement: {
      bn: 'নতুন ফসল হিসেবে বাজার ও বীজের উৎস নিশ্চিত করে চাষ শুরু করুন এবং যেকোনো অস্বাভাবিক লক্ষণে ১৬১২৩ বা উপজেলা কৃষি অফিসের পরামর্শ নিন।',
      en: 'Confirm seed quality and local market buyers before scaling up, avoid waterlogging, and consult 16123 for local guidance.',
    },
    harvesting: {
      bn: 'বপনের ১১০–১২৫ দিন পর অধিকাংশ পাতা ঝরে ফুলের শীষ শুকনো বাদামি হলে সকালে কেটে পরিষ্কার ত্রিপলের ওপর রাখুন।',
      en: 'Cut mature dry brown flower spikes onto clean tarps in early morning at 110–125 days once leaves drop.',
    },
    postHarvestStorage: {
      bn: 'শুকনো রোদে রেখে ঝেড়ে, চালনি দিয়ে ভালোভাবে পরিষ্কার করে আর্দ্রতামুক্ত কাঁচ বা বায়ুরোধী পাত্রে রাখুন।',
      en: 'Sun-dry spikes cleanly on tarps, thresh gently, sieve chaff carefully, and store in airtight moisture-free containers.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'শুকনো বালি-মিশিয়ে বপন', en: 'Dry-Sand Sowing' },
        window: { bn: 'নভেম্বর', en: 'November' },
        action: { bn: 'ভিজানো ছাড়াই অগভীর সারিতে বপন।', en: 'Sow dry seed with sand very shallowly.' },
      },
      {
        step: 2,
        stage: { bn: 'পাতলা ও নিড়ানি', en: 'Thin & Weed' },
        window: { bn: '১৫–২৫ দিন', en: 'Days 15–25' },
        action: { bn: '১০–১৫ সেমি দূরত্বে পাতলা করা ও আগাছা দমন।', en: 'Thin cleanly and hand-weed rows.' },
      },
      {
        step: 3,
        stage: { bn: 'কাণ্ড ও বেগুনি ফুল', en: 'Flower Spikes' },
        window: { bn: '৫৫–৭৫ দিন', en: 'Days 55–75' },
        action: { bn: 'ছোট দিনের প্রভাবে বেগুনি-নীল ফুল আসা।', en: 'Winter daylength triggers purple spikes.' },
      },
      {
        step: 4,
        stage: { bn: 'বীজ গঠন ও শুকানো', en: 'Seed Set' },
        window: { bn: '৮৫–১০৫ দিন', en: 'Days 85–105' },
        action: { bn: 'বৃষ্টির পূর্বাভাস দেখা ও সেচ বন্ধ রাখা।', en: 'Watch rain forecasts; keep dry.' },
      },
      {
        step: 5,
        stage: { bn: 'ত্রিপলে সংগ্রহ ও চালনি', en: 'Tarp Harvest & Sieve' },
        window: { bn: '১১০–১২৫ দিন', en: 'Days 110–125' },
        action: { bn: 'শুকনো শীষ কেটে মাড়াই, চালনি ও সিল।', en: 'Cut dry spikes on tarps, thresh, and sieve.' },
      },
    ],
  },
];
