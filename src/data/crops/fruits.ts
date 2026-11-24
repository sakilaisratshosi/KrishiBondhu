import { CROP_ASSETS, CROP_CATEGORY_LABELS, CropCultivationGuide } from './types';

export const FRUIT_CROPS: CropCultivationGuide[] = [
  {
    id: 'mango',
    name: { bn: 'আম', en: 'Mango' },
    aliases: ['aam', 'himsagar', 'amrapali', 'fazli', 'langra', 'হারিভাঙ্গা', 'আম্রপালি'],
    category: 'fruit',
    categoryLabel: CROP_CATEGORY_LABELS.fruit,
    imageUrl: CROP_ASSETS.fruits,
    sourceType: 'verified_reference',
    waterDemandLevel: 'low',
    overview: {
      bn: 'আম বাংলাদেশের প্রধান ও সবচেয়ে অর্থকরী মৌসুমি ফল। বৈজ্ঞানিক ডাল ছাঁটাই, মুকুল রক্ষা ও ফলের মাছি পোকা দমনের মাধ্যমে রপ্তানিযোগ্য গুণগত মানের আম উৎপাদন সম্ভব।',
      en: 'Mango is Bangladesh’s flagship seasonal orchard crop. Canopy pruning, hopper management during flowering, and fruit bagging produce clean export-grade harvests.',
    },
    suitableVarieties: {
      bn: 'BARI Aam-3 (আম্রপালি), BARI Aam-4 (হাইব্রিড), BARI Aam-8, হিমসাগর (ক্ষীরশাপাতি), ল্যাংড়া, ফজলি, হাঁড়িভাঙ্গা ও গোপালভোগ।',
      en: 'BARI Aam-3 (Amrapali), BARI Aam-4, BARI Aam-8, Himsagar (Khirshapati), Langra, Fazli, Haribhanga, and Gopalbhog.',
    },
    suitableRegions: {
      bn: 'চাঁপাইনবাবগঞ্জ, রাজশাহী, নওগাঁ, সাতক্ষীরা, রংপুর, দিনাজপুর ও পার্বত্য চট্টগ্রামে বাণিজ্যিক বাগান।',
      en: 'Major orchards span Chapainawabganj, Rajshahi, Naogaon, Satkhira, Rangpur, Dinajpur, and Chittagong Hill Tracts.',
    },
    seasonAndPlanting: {
      bn: 'নতুন চারা রোপণের উপযুক্ত সময় জুন–জুলাই (বর্ষার শুরু) এবং সেপ্টেম্বর–অক্টোবর। মুকুল আসে জানুয়ারি–ফেব্রুয়ারিতে।',
      en: 'Plant grafted saplings June–July or Sep–Oct; natural flowering occurs January–February.',
    },
    soilAndPh: {
      bn: 'জল-নিকাশযুক্ত গভীর দোআঁশ ও লালচে বরেন্দ্র মাটি; আদর্শ pH ৫.৫ থেকে ৭.০।',
      en: 'Deep, well-drained loamy and upland Barind soils around pH 5.5 to 7.0.',
    },
    landPreparation: {
      bn: 'আগে থেকে ৮–১০ মিটার (আম্রপালি ঘন বাগানে ৪–৫ মিটার) দূরত্বে ১×১×১ মিটার গর্ত খুঁড়ে পচা গোবর, ছাই ও মাটি মিশিয়ে ভরাট করে রাখুন।',
      en: 'Dig 1×1×1 m pits well ahead of planting (spaced 8–10 m for standard trees, 4–5 m for Amrapali) and fill with compost-enriched topsoil.',
    },
    seedSelectionAndTreatment: {
      bn: 'বিশ্বস্ত নার্সারি থেকে ১–১.৫ বছর বয়সী সুস্থ গ্রাফটিং/কলমের (Veneer/Cleft graft) চারা বাছাই করুন।',
      en: 'Choose certified 1-year-old grafted saplings (never seed-grown plants for commercial true-to-type yield).',
    },
    plantingMethod: {
      bn: 'গর্তের মাঝখানে কলমের জোড় (graft union) মাটির উপরে রেখে সোজা করে চারা লাগান, খুঁটি দিন ও গোড়ার মাটি চেপে দিন।',
      en: 'Plant straight keeping the graft union well above soil level, stake firmly, and water lightly.',
    },
    fertilizerManagement: {
      bn: 'বয়স অনুযায়ী বছরে ২ বার (ফল সংগ্রহের পর বর্ষায় ও শরতে) গাছের ডালপালা ছড়ানো সীমানায় (canopy drip line) রিং-ট্রেঞ্চ করে জৈব ও সুষম সার দিন; বোরন কালো দাগ কমায়।',
      en: 'Feed in two annual splits (post-harvest and post-monsoon) in circular trenches along the canopy drip line; ensure boron sufficiency.',
    },
    irrigationSchedule: {
      bn: 'মুকুল আসার ঠিক আগে সেচ বন্ধ রাখুন যাতে পাতা না গজিয়ে ফুল আসে। মটরদানা ও মার্বেল আকারের গুটি অবস্থায় শুষ্কতা থাকলে ২–৩টি সেচ ফল ঝরা কমায়।',
      en: 'Withhold water before flowering to encourage panicles, then irrigate gently at pea-size and marble-size fruit stages to curb drop.',
    },
    growthStageCare: [
      {
        stage: { bn: 'সংগ্রহ-পরবর্তী ডাল ছাঁটাই', en: 'Post-Harvest Pruning' },
        guidance: {
          bn: 'ফল পাড়ার পর মরা, রোগাক্রান্ত ও ভেতরের ঘন ডাল ছেঁটে দিলে পরের বছর ভালো মুকুল আসে।',
          en: 'Prune dead, crossed, and overly shaded inner branches right after harvest to welcome sunlight.',
        },
      },
      {
        stage: { bn: 'গুটি ও ব্যাগিং পর্যায়', en: 'Fruit Set & Bagging' },
        guidance: {
          bn: 'মার্বেল আকারের আমে ফ্রুট ব্যাগিং করলে ফলের মাছি পোকা, পচা রোগ ও বালাইনাশকের প্রয়োজন কমে।',
          en: 'Wrap marble-sized fruits in paper fruit bags to prevent fruit-fly stings and anthracnose spots cleanly.',
        },
      },
    ],
    weedManagement: {
      bn: 'গাছের গোড়ার রিং পরিষ্কার রাখুন এবং শুষ্ক মৌসুমে খড়-শুকনো পাতার মাল্চিং দিন।',
      en: 'Keep tree basins weed-free and mulch dry-season rings with straw or dried leaves.',
    },
    commonDiseasesAndPests: {
      bn: 'আমের শোষক পোকা (Mango Hopper), ফলের মাছি পোকা, অ্যানথ্রাকনোজ (ফোস্কা পচা) ও পাউডারি মিলডিউ।',
      en: 'Mango Hopper, Fruit Fly, Anthracnose, and Powdery Mildew.',
    },
    preventionAndSafeManagement: {
      bn: 'পরিচ্ছন্ন বাগান, মিথায়িল ইউজেনল ফেরোমন ফাঁদ ও ফ্রুট ব্যাগিং সবচেয়ে নিরাপদ; মুকুলের সময় ১৬১২৩ বা উদ্যানতত্ত্ববিদের পরামর্শ অনুযায়ী পদক্ষেপ নিন।',
      en: 'Practice orchard sanitation, hang methyl-eugenol fruit fly traps, use fruit bags, and consult 16123 for bloom-stage protection.',
    },
    harvesting: {
      bn: 'জাতের পরিপক্বতা অনুযায়ী বোঁটার কাছাকাছি অংশ উঁচু (shoulder rise) ও গায়ে হালকা মোমের আস্তরণ হলে জালিসহ কাটার (mango picker) মাধ্যমে নামান।',
      en: 'Harvest at full physiological maturity (raised fruit shoulders, natural bloom) using padded net pickers—never drop on soil.',
    },
    postHarvestStorage: {
      bn: 'কষ (sap) ঝরানোর জন্য বোঁটা উল্টো করে পরিষ্কার চটে রাখুন এবং প্লাস্টিক ক্রেটে স্তর করে বাতাসে রাখুন; কার্বাইড/ক্ষতিকর কেমিক্যাল ব্যবহার করবেন না।',
      en: 'De-sap fruits stem-down on clean mats and pack in ventilated crates; never use illegal artificial ripening chemicals.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'বর্ষা-পরবর্তী ছাঁটাই ও সার', en: 'Prune & Post-Harvest Feed' },
        window: { bn: 'জুলাই–সেপ্টেম্বর', en: 'Jul – Sep' },
        action: { bn: 'অপ্রয়োজনীয় ডাল ছাঁটাই ও জৈব-রাসায়নিক সার।', en: 'Prune canopy and apply annual basin nutrition.' },
      },
      {
        step: 2,
        stage: { bn: 'মুকুল বের হওয়া', en: 'Panicle Emergence' },
        window: { bn: 'জানুয়ারি–ফেব্রুয়ারি', en: 'Jan – Feb' },
        action: { bn: 'সেচ বিরতি ও শোষক পোকা পর্যবেক্ষণ।', en: 'Keep roots drier and scout for hoppers.' },
      },
      {
        step: 3,
        stage: { bn: 'গুটি ও সেচ', en: 'Marble Stage & Water' },
        window: { bn: 'মার্চ–এপ্রিল', en: 'Mar – Apr' },
        action: { bn: 'গুটি বাঁচাতে পরিমিত সেচ ও ব্যাগিং।', en: 'Support moisture and bag clean fruits.' },
      },
      {
        step: 4,
        stage: { bn: 'ফসল পরিপক্বতা', en: 'Maturation' },
        window: { bn: 'মে–জুলাই', en: 'May – Jul' },
        action: { bn: 'ফেরোমন ফাঁদ বজায় রাখা ও পরিপক্বতা দেখা।', en: 'Maintain traps and check shoulder maturity.' },
      },
      {
        step: 5,
        stage: { bn: 'সংগ্রহ ও কষ ঝরানো', en: 'Harvest & De-sap' },
        window: { bn: 'জাতভেদে মে–আগস্ট', en: 'May – Aug (by var.)' },
        action: { bn: 'জালিসহ পেড়ে ক্রেটে গ্রেডিং।', en: 'Pick cleanly, de-sap, and grade in crates.' },
      },
    ],
  },
  {
    id: 'jackfruit',
    name: { bn: 'কাঁঠাল', en: 'Jackfruit' },
    aliases: ['kathal', 'national fruit', 'কাঁঠাল', 'খাজা', 'গালা'],
    category: 'fruit',
    categoryLabel: CROP_CATEGORY_LABELS.fruit,
    imageUrl: CROP_ASSETS.fruits,
    sourceType: 'verified_reference',
    waterDemandLevel: 'low',
    overview: {
      bn: 'কাঁঠাল বাংলাদেশের জাতীয় ফল এবং অত্যন্ত পুষ্টিকর বহুবর্ষজীবী বৃক্ষ। উঁচু বন্যামুক্ত লাল মাটিতে সামান্য যত্নেই দীর্ঘ কয়েক দশক ফলন দেয়।',
      en: 'Jackfruit is Bangladesh’s national fruit—a resilient, long-lived tree thriving on flood-free uplands with minimal water inputs.',
    },
    suitableVarieties: {
      bn: 'BARI Kanthal-1, BARI Kanthal-2 (অসময়ে ফলনশীল), BARI Kanthal-3 (বারোমাসি) ও স্থানীয় খাজা/আদ্রসা জাত।',
      en: 'BARI Kanthal-1, BARI Kanthal-2 (off-season), BARI Kanthal-3 (year-round), and traditional Khaja cultivars.',
    },
    suitableRegions: {
      bn: 'গাজীপুর, নরসিংদী, টাঙ্গাইল (মধুপুর), ময়মনসিংহ, সিলেট ও পার্বত্য জেলাসমূহে ব্যাপকভাবে উৎপাদিত হয়।',
      en: 'Concentrated across Gazipur, Narsingdi, Tangail (Madhupur), Mymensingh, Sylhet, and hill districts.',
    },
    seasonAndPlanting: {
      bn: 'বর্ষা মৌসুম অর্থাৎ জুন থেকে আগস্ট মাস নতুন চারা রোপণের শ্রেষ্ঠ সময়।',
      en: 'Best planted at the onset of monsoon (June through August).',
    },
    soilAndPh: {
      bn: 'জলাবদ্ধতামুক্ত উঁচু লাল মাটি ও দোআঁশ মাটি (কাঁঠাল জলাবদ্ধতা একেবারেই সহ্য করতে পারে না); আদর্শ pH ৫.৫ থেকে ৬.৮।',
      en: 'Flood-free deep loamy and upland red terrace soils (zero tolerance for waterlogging); pH 5.5 to 6.8.',
    },
    landPreparation: {
      bn: '১০×১০ মিটার দূরত্বে ১×১×১ মিটার গর্ত করে বর্ষার আগে পচা গোবর, কাঠের ছাই ও উপরের মাটি দিয়ে ভরে রাখুন।',
      en: 'Dig 1×1×1 m pits at 10×10 m spacing before monsoon and fill with topsoil, compost, and wood ash.',
    },
    seedSelectionAndTreatment: {
      bn: 'সতেজ জাতের কলম চারা বা একদম পাকা কোষের সদ্য তোলা সুস্থ বীজ পলি-ব্যাগে রোপণ করুন (বীজ দ্রুত নষ্ট হয়)।',
      en: 'Plant grafted saplings of known Khaja/BARI lines or very fresh seed (jackfruit seeds lose viability fast).',
    },
    plantingMethod: {
      bn: 'পানি জমে না এমন ঢালু বা উঁচু স্থানে লাগান এবং ছাগল-গরু থেকে বাঁচাতে বেড়া দিন।',
      en: 'Plant on well-drained high ground and protect young saplings with sturdy bamboo guards.',
    },
    fertilizerManagement: {
      bn: 'বর্ষার শুরু ও শেষে গাছের বয়স অনুযায়ী গোবর ও সুষম সার গোড়া থেকে দূরে রিং করে প্রয়োগ করুন।',
      en: 'Feed mature trees twice around monsoon boundaries using organic manure and balanced minerals in outer ring trenches.',
    },
    irrigationSchedule: {
      bn: 'প্রথম ২–৩ বছর শুষ্ক মৌসুমে নিয়মিত পানি দিন; পূর্ণবয়স্ক গাছে শুধু তীব্র খরায় ফল বাড়ার সময় সেচ দিলে ফল ফেটে যাওয়া কমে।',
      en: 'Water saplings during dry winters for 2–3 years; mature trees need moisture mainly in severe drought while fruit swells.',
    },
    growthStageCare: [
      {
        stage: { bn: 'কাণ্ড ও ফুল বের হওয়া', en: 'Cauliflory & Fruit Thinning' },
        guidance: {
          bn: 'একই স্থানে অতিরিক্ত কচি কাঁঠাল হলে বিকৃত ও ছোটগুলো সরিয়ে দিলে বাকিগুলো বড় ও সুস্বাদু হয়।',
          en: 'Thin overcrowded or misshapen young fruits on trunks so remaining jackfruits size evenly.',
        },
      },
      {
        stage: { bn: 'বৃষ্টি নিষ্কাশন', en: 'Collar Drainage' },
        guidance: {
          bn: 'বর্ষায় মূল গাছের গোড়ায় যেন একদিনের বেশি পানি জমে না থাকে তা নিশ্চিত করুন।',
          en: 'Keep channels sloped away from tree trunks during heavy monsoon rains.',
        },
      },
    ],
    weedManagement: {
      bn: 'চারা অবস্থায় গোড়ার বৃত্ত পরিষ্কার রাখুন এবং শুকনো পাতা দিয়ে মাল্চ করুন।',
      en: 'Keep sapling rings weeded and mulched with fallen leaves.',
    },
    commonDiseasesAndPests: {
      bn: 'কচি ফল পচা (Rhizopus rot), কাণ্ড ছিদ্রকারী পোকা, মিলিবাগ ও গোড়া পচা।',
      en: 'Rhizopus Young Fruit Rot, Trunk Borer, Mealybug, and Collar Rot.',
    },
    preventionAndSafeManagement: {
      bn: 'মরা পচা কচি ফল ও মঞ্জরী গাছে না রেখে পুড়িয়ে বা পুঁতে ফেলুন; কাণ্ডে ছিদ্র দেখলে পরিষ্কার তার/১৬১২৩-এর পরামর্শে ব্যবস্থা নিন।',
      en: 'Prune and destroy rotting young fruits immediately to break Rhizopus spread; consult 16123 for trunk borer tunnels.',
    },
    harvesting: {
      bn: 'হাত দিয়ে টোকা দিলে ড্যাবড্যাবে বা গম্ভীর শব্দ, কাঁটা চওড়া হয়ে নরম ভাব ও মিষ্টি গন্ধ বের হলে ধারালো দা দিয়ে বোঁটা কাটুন।',
      en: 'Harvest when spines flatten/widen, tapping gives a dull hollow thud, and sweet aroma emerges.',
    },
    postHarvestStorage: {
      bn: 'গাছ থেকে দড়ি বা চটের সাহায্যে আলতো করে নামিয়ে ঠান্ডা ছায়াযুক্ত মেঝেতে খড়ের ওপর রাখুন।',
      en: 'Lower heavy fruits gently with ropes onto dry straw in shaded ventilated areas.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'বর্ষায় চারা রোপণ', en: 'Monsoon Planting' },
        window: { bn: 'জুন–আগস্ট', en: 'Jun – Aug' },
        action: { bn: 'উঁচু গর্তে কলম/সতেজ চারা রোপণ।', en: 'Plant grafted sapling on flood-free mound.' },
      },
      {
        step: 2,
        stage: { bn: 'তরুণ গাছ পরিচর্যা', en: 'Sapling Care (Yr 1–4)' },
        window: { bn: 'শীত ও গ্রীষ্ম', en: 'Dry Seasons' },
        action: { bn: 'খরায় পানি, বেড়া ও রিং সার প্রয়োগ।', en: 'Dry-season watering, guarding, and feeding.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল ও মুচি আসা', en: 'Flowering (Mature Trees)' },
        window: { bn: 'ডিসেম্বর–ফেব্রুয়ারি', en: 'Dec – Feb' },
        action: { bn: 'বিকৃত কচি ফল ছাঁটাই ও রাইজোপাস দেখা।', en: 'Thin deformed fruitlets and clear rot.' },
      },
      {
        step: 4,
        stage: { bn: 'ফল বড় হওয়া', en: 'Fruit Bulking' },
        window: { bn: 'মার্চ–মে', en: 'Mar – May' },
        action: { bn: 'খরায় হালকা সেচ ও কাণ্ড পোকা পরীক্ষা।', en: 'Irrigate in severe drought and check trunks.' },
      },
      {
        step: 5,
        stage: { bn: 'সংগ্রহ', en: 'Harvest Season' },
        window: { bn: 'জুন–জুলাই (প্রধান)', en: 'Jun – Jul (Peak)' },
        action: { bn: 'ড্যাবড্যাবে শব্দে নামানো ও ছায়ায় রাখা।', en: 'Lower ripe fruits gently on ropes.' },
      },
    ],
  },
  {
    id: 'banana',
    name: { bn: 'কলা', en: 'Banana' },
    aliases: ['kola', 'sagar kola', 'sabri', 'champa', 'সাগর কলা', 'সবরি'],
    category: 'fruit',
    categoryLabel: CROP_CATEGORY_LABELS.fruit,
    imageUrl: CROP_ASSETS.fruits,
    sourceType: 'verified_reference',
    waterDemandLevel: 'high',
    overview: {
      bn: 'কলা বাংলাদেশের সারা বছর পাওয়া যায় এমন একটি উচ্চফলনশীল ও লাভজনক ফল। রোগমুক্ত টিস্যু কালচার বা অসি তেউড় ব্যবহার ও অতিরিক্ত তেউড় ছাঁটাই ফলনের জন্য গুরুত্বপূর্ণ।',
      en: 'Banana is a year-round commercial fruit in Bangladesh. Clean sword suckers or tissue-culture plantlets, desuckering, and propping ensure heavy bunches.',
    },
    suitableVarieties: {
      bn: 'BARI Kola-1 (অমৃতসাগর), BARI Kola-3, BARI Kola-4, সবরি, চাপা, মেহেরসাগর ও G9 টিস্যু কালচার।',
      en: 'BARI Kola-1, BARI Kola-3, BARI Kola-4, Sabri, Champa, Mehersagar, and G9 tissue-culture lines.',
    },
    suitableRegions: {
      bn: 'নরসিংদী, টাঙ্গাইল (মধুপুর), বগুড়া, ঝিনাইদহ, যশোর, রাঙ্গামাটি ও বান্দরবান।',
      en: 'Major hubs in Narsingdi, Tangail (Madhupur), Bogura, Jhenaidah, Jashore, and hill districts.',
    },
    seasonAndPlanting: {
      bn: 'জানুয়ারি–মার্চ, মে–জুন এবং সেপ্টেম্বর–অক্টোবর এই তিন সময়েই রোপণ করা যায়; সেপ্টেম্বর–অক্টোবর সবচেয়ে ভালো।',
      en: 'Planted Jan–Mar, May–Jun, or Sep–Oct (post-monsoon Sep–Oct is ideal for cyclone avoidance).',
    },
    soilAndPh: {
      bn: 'জৈব পদার্থসমৃদ্ধ, গভীর ও পানি নিকাশযোগ্য দোআঁশ ও বেলে-দোআঁশ মাটি; আদর্শ pH ৬.০ থেকে ৭.৫।',
      en: 'Deep, fertile, well-drained loamy soil around pH 6.0 to 7.5.',
    },
    landPreparation: {
      bn: '২×২ মিটার দূরত্বে গর্ত করে পচা গোবর ও কম্পোস্ট মিশিয়ে রোপণের আগে প্রস্তুত করুন; নিকাশ নালা রাখুন।',
      en: 'Dig pits at 2×2 m spacing enriched with compost and build field drainage channels.',
    },
    seedSelectionAndTreatment: {
      bn: 'জলপাতা/চওড়া পাতার তেউড় বাদ দিয়ে ২–৩ মাস বয়সী খাঁড়া সরু পাতার "অসি তেউড়" (sword sucker) অথবা টিস্যু কালচার চারা শোধন করে নিন।',
      en: 'Select clean sword suckers (narrow leaves) or lab-grown tissue-culture plantlets to stay free of Panama wilt and bunchy top.',
    },
    plantingMethod: {
      bn: 'গর্তের মাঝে খাড়াভাবে রোপণ করে মাটি চেপে দিন ও ঝড়ের আগে বাঁশের খুঁটি (propping) দেওয়ার ব্যবস্থা রাখুন।',
      en: 'Plant upright in pit centers, firm soil cleanly, and prepare bamboo props before fruit weight increases.',
    },
    fertilizerManagement: {
      bn: 'কলার পটাশ চাহিদা খুব বেশি—পচা জৈব সারের পাশাপাশি ২–৩ মাস পরপর পটাশ ও নাইট্রোজেনসমৃদ্ধ সুষম সার দিন।',
      en: 'Bananas have high potassium demand; pair organic manure with regular split NPK applications through bunch emergence.',
    },
    irrigationSchedule: {
      bn: 'খরায় মাটির রস ধরে রাখতে ৭–১০ দিন পরপর নালায় সেচ দিন; বর্ষায় কলার বাগানে পানি জমতে দেবেন না।',
      en: 'Irrigate dry-season plots every 7–10 days; drain monsoon floods quickly to prevent root asphyxiation.',
    },
    growthStageCare: [
      {
        stage: { bn: 'তেউড় ছাঁটাই (Desuckering)', en: 'Desuckering' },
        guidance: {
          bn: 'গাছ প্রতি একটি ভালো ফলদায়ী মাতৃগাছের সাথে মাত্র ১টি সুস্থ পরবর্তী তেউড় রেখে বাকি সব কেটে ফেলুন।',
          en: 'Remove excess side suckers monthly, keeping only one healthy follower sucker per mat.',
        },
      },
      {
        stage: { bn: 'মোচা ও খুঁটি (Propping)', en: 'Propping & Denavelling' },
        guidance: {
          bn: 'কলার কাঁদি বের হওয়ার পর শেষ হ্যান্ড ধরলে নিচের ফুলের মোচা ভেঙে দিন এবং ভারী গাছে বাঁশের ঠেকা দিন।',
          en: 'Remove the male bud (mocha) after the last female hand sets, prop heavy stalks with bamboo, and bag bunches.',
        },
      },
    ],
    weedManagement: {
      bn: 'প্রথম ৪–৫ মাসে নিড়ানি ও মাল্চিং করে গোড়া আগাছামুক্ত রাখুন।',
      en: 'Weed shallowly and mulch mats heavily during the first 4–5 months.',
    },
    commonDiseasesAndPests: {
      bn: 'পানামা রোগ (সবরি কলায় বেশি), সিগাটোকা পাতা দাগ, বানচি টপ ভাইরাস, কলার ভুংরা পোকা (Beetle) ও উইভিল।',
      en: 'Panama Wilt, Sigatoka Leaf Spot, Bunchy Top Virus, Banana Scarring Beetle, and Corm Weevil.',
    },
    preventionAndSafeManagement: {
      bn: 'বানচি টপ বা পানামা আক্রান্ত গাছ গোড়াসুদ্ধ তুলে ধ্বংস করুন; ছড়া ব্যাগিং করলে বিটলের দাগ দূর হয়; প্রয়োজনে ১৬১২৩-এ জানুন।',
      en: 'Destroy bunchy-top or wilted mats immediately, cover young bunches with perforated blue/white bags against scarring beetles, and consult 16123.',
    },
    harvesting: {
      bn: 'কলার ধারালো শিরাগুলো গোলাকার ও মসৃণ হলে এবং নিচের পাতা শুকাতে থাকলে পুরো কাঁদি সবুজ অবস্থায় কাটুন।',
      en: 'Cut whole bunches green once finger angles round out smoothly and flower tips dry.',
    },
    postHarvestStorage: {
      bn: 'কাঁদি মাটিতে না ফেলে কাঁধে বা কলাপাতায় রাখুন যাতে কালো দাগ না পড়ে এবং বায়ুচলাচলযুক্ত ছায়ায় পাকতে দিন।',
      en: 'Cushion bunches on banana leaves (never drop on soil) and ripen naturally in clean ventilated rooms.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'অসি তেউড় রোপণ', en: 'Sucker Planting' },
        window: { bn: '০ দিন', en: 'Day 0' },
        action: { bn: 'গর্তে শোধিত তেউড় বা টিস্যু চারা রোপণ।', en: 'Plant clean sword suckers or TC plantlets.' },
      },
      {
        step: 2,
        stage: { bn: 'তেউড় ছাঁটাই ও সার', en: 'Desuckering' },
        window: { bn: '২–৫ মাস', en: 'Months 2–5' },
        action: { bn: 'বাড়তি তেউড় কাটা ও পটাশযুক্ত সার।', en: 'Prune extra suckers and apply split potash.' },
      },
      {
        step: 3,
        stage: { bn: 'থোড় ও কাঁদি বের হওয়া', en: 'Shooting & Prop' },
        window: { bn: '৭–৯ মাস', en: 'Months 7–9' },
        action: { bn: 'বাঁশের ঠেকা দেওয়া, মোচা ভাঙা ও ব্যাগিং।', en: 'Prop stalks, clip male buds, and bag.' },
      },
      {
        step: 4,
        stage: { bn: 'ফল পুষ্ট হওয়া', en: 'Bunch Filling' },
        window: { bn: '৯–১১ মাস', en: 'Months 9–11' },
        action: { bn: 'আর্দ্রতা বজায় রাখা ও সিগাটোকা দেখা।', en: 'Maintain moisture and inspect leaves.' },
      },
      {
        step: 5,
        stage: { bn: 'কাঁদি সংগ্রহ', en: 'Harvest' },
        window: { bn: '১১–১৩ মাস', en: 'Months 11–13' },
        action: { bn: 'কলার শিরা গোলাকার হলে কাঁদি কাটা।', en: 'Cut plump rounded bunches without bruising.' },
      },
    ],
  },
  {
    id: 'guava',
    name: { bn: 'পেয়ারা', en: 'Guava' },
    aliases: ['peyara', 'kazi peyara', 'thai peyara', 'পেয়ারা', 'থাই পেয়ারা'],
    category: 'fruit',
    categoryLabel: CROP_CATEGORY_LABELS.fruit,
    imageUrl: CROP_ASSETS.fruits,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'পেয়ারা বাংলাদেশের একটি জনপ্রিয়, ভিটামিন-সি সমৃদ্ধ ও দ্রুত ফলনশীল ফল। ডাল ছাঁটাই ও পলি-ফোম ব্যাগিংয়ের মাধ্যমে সারা বছর দাগহীন পেয়ারা উৎপাদন করা যায়।',
      en: 'Guava is a vitamin-C-rich, fast-bearing orchard fruit in Bangladesh; selective pruning and fruit bagging yield crisp, spotless off-season harvests.',
    },
    suitableVarieties: {
      bn: 'BARI Peyara-2, BARI Peyara-3, BARI Peyara-4 (বীজহীন/কম বীজ), কাজী পেয়ারা ও থাই-৫/থাই সুপার-১০।',
      en: 'BARI Peyara-2, BARI Peyara-3, BARI Peyara-4, Kazi Peyara, and crisp Thai-5 cultivars.',
    },
    suitableRegions: {
      bn: 'ঝালকাঠি, বরিশাল, পিরোজপুর, নাটোর, রাজশাহী, গাজীপুর ও চট্টগ্রাম অঞ্চলে ব্যাপক চাষ।',
      en: 'Famous in Jhalokathi, Barishal, Pirojpur, Natore, Rajshahi, Gazipur, and Chattogram.',
    },
    seasonAndPlanting: {
      bn: 'বর্ষার শুরুতে (জুন–জুলাই) এবং শরতে (সেপ্টেম্বর–অক্টোবর) চারা রোপণ করা হয়।',
      en: 'Best planted June–July or September–October.',
    },
    soilAndPh: {
      bn: 'প্রায় সব ধরনের সুনিষ্কাশিত দোআঁশ ও পলি মাটিতে জন্মে; pH ৫.০ থেকে ৭.৫ পর্যন্ত সহনশীল।',
      en: 'Thrives across well-drained loamy and alluvial soils from pH 5.0 to 7.5.',
    },
    landPreparation: {
      bn: 'জাতভেদে ৩×৩ মিটার বা ৪×৪ মিটার দূরত্বে গর্ত খুঁড়ে জৈব সার মিশিয়ে উঁচু ঢিবি বা সোরজান (ভাসমান কান্দি) বেডে রোপণ করুন।',
      en: 'Prepare composted pits at 3×3 m or 4×4 m spacing (or raised Sorjan beds in southern tidal belts).',
    },
    seedSelectionAndTreatment: {
      bn: 'বিশ্বস্ত নার্সারি থেকে গুটি কলম (air-layering) বা গ্রাফটেড চারা সংগ্রহ করুন; শিকড়ের গিঁট কৃমি (nematode) মুক্ত কিনা দেখে নিন।',
      en: 'Use disease-free air-layered or grafted saplings from clean nursery media free of root-knot nematodes.',
    },
    plantingMethod: {
      bn: 'পানি জমে না এমন স্থানে খুঁটি দিয়ে সোজা করে লাগান এবং গোড়ায় খড় দিয়ে ঢেকে দিন।',
      en: 'Plant straight on drained mounds, stake saplings, and apply organic mulch rings.',
    },
    fertilizerManagement: {
      bn: 'বর্ষা-পূর্ব ও বর্ষা-পরবর্তী দুই দফায় গোবর ও সুষম সার রিং করে প্রয়োগ করলে ফলের আকার ও মিষ্টতা বাড়ে।',
      en: 'Apply two split annual dressings (pre- and post-monsoon) with compost and balanced potassium.',
    },
    irrigationSchedule: {
      bn: 'শীতকালীন ফলের সময় (অক্টোবর–মার্চ) ১৫ দিন অন্তর সেচ দিলে ফল রসালো, বড় ও মিষ্টি হয়।',
      en: 'Irrigate every 12–15 days during dry winter fruiting so guavas stay crisp and sweet.',
    },
    growthStageCare: [
      {
        stage: { bn: 'ডাল বাঁকানো ও ছাঁটাই (Pruning)', en: 'Bending & Pruning' },
        guidance: {
          bn: 'শীতকালীন দামি পেয়ারা পেতে বর্ষার অতিরিক্ত ফুল ভেঙে ডাল ছাঁটাই ও মাটির দিকে হালকা বাঁকিয়ে (bending) দিন।',
          en: 'Prune and gently bend shoots in monsoon/late-summer to shift heavy harvests into higher-priced winter.',
        },
      },
      {
        stage: { bn: 'ফ্রুট ব্যাগিং', en: 'Foam & Poly Bagging' },
        guidance: {
          bn: 'ফল মার্বেল আকারের হলে ভেতরে ফোম নেট ও বাইরে ছিদ্রযুক্ত পলি ব্যাগ পরালে মাছি পোকা ও খোসা ফাটা বন্ধ হয়।',
          en: 'Wrap marble-sized fruits in foam sleeves and perforated bags to eliminate fruit flies cleanly.',
        },
      },
    ],
    weedManagement: {
      bn: 'গাছের গোড়া আগাছামুক্ত রাখুন ও শুষ্ক সময়ে কচুরিপানা বা খড় বিছিয়ে দিন।',
      en: 'Keep root basins clear of weeds and use water-hyacinth mulch in tidal gardens.',
    },
    commonDiseasesAndPests: {
      bn: 'পেয়ারার উইল্ট (ঢলে পড়া), অ্যানথ্রাকনোজ (খোসা পচা), ফলের মাছি পোকা ও মিলিবাগ।',
      en: 'Guava Wilt, Anthracnose fruit spot, Fruit Fly, and Mealybug.',
    },
    preventionAndSafeManagement: {
      bn: 'জলাবদ্ধতা রোধ, ব্যাগিং, মিলিবাগের জন্য কাণ্ডে গ্রিজ ব্যান্ড ও উইল্ট প্রতিরোধে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Avoid root waterlogging, bag young fruit early, control ants/mealybugs on trunks, and consult 16123 for wilt.',
    },
    harvesting: {
      bn: 'সবুজ থেকে হালকা হলুদাভ-সবুজ রঙ ধরলে ও হাত দিয়ে হালকা চাপ দিলে সামান্য নরম ভাব এলে বোঁটাসহ তুলুন।',
      en: 'Pick fruits as dark green fades to pale greenish-cream while still crisp.',
    },
    postHarvestStorage: {
      bn: 'ফোম নেটসহ প্লাস্টিক ক্রেটে সাজালে পরিবহনে ঘষা লেগে দাগ পড়ে না।',
      en: 'Keep foam sleeves on inside shallow ventilated crates during market transport.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'কলম রোপণ', en: 'Sapling Planting' },
        window: { bn: 'জুন–সেপ্টেম্বর', en: 'Jun – Sep' },
        action: { bn: 'উঁচু মাদা বা সোরজান বেডে রোপণ।', en: 'Plant grafted saplings on well-drained beds.' },
      },
      {
        step: 2,
        stage: { bn: 'কাঠামো ও ছাঁটাই', en: 'Canopy Training' },
        window: { bn: '৬–১২ মাস', en: 'Months 6–12' },
        action: { bn: 'প্রথম বছরের অপ্রয়োজনীয় ফুল ছাড়া ও শাখা গড়া।', en: 'Shape balanced low canopy branches.' },
      },
      {
        step: 3,
        stage: { bn: 'ডাল বাঁকানো ও সার', en: 'Shoot Bending' },
        window: { bn: 'ফলন চক্র শুরু', en: 'Each Crop Cycle' },
        action: { bn: 'শীতকালীন ফলনের জন্য ছাঁটাই ও পুষ্টি।', en: 'Prune and feed for winter peak crops.' },
      },
      {
        step: 4,
        stage: { bn: 'ফ্রুট ব্যাগিং', en: 'Fruit Bagging' },
        window: { bn: 'ফুলের ৪–৫ সপ্তাহ পর', en: '4–5 wks post-bloom' },
        action: { bn: 'মার্বেল আকারের পেয়ারায় ফোম-ব্যাগ পরানো।', en: 'Bag marble-sized fruits against flies.' },
      },
      {
        step: 5,
        stage: { bn: 'সংগ্রহ', en: 'Harvesting' },
        window: { bn: 'ফুলের ১১০–১৩০ দিন পর', en: '110–130 days post-bloom' },
        action: { bn: 'কচমচে হালকা-সবুজ অবস্থায় পেড়ে ক্রেটে রাখা।', en: 'Pick crisp, pale-green fruits in crates.' },
      },
    ],
  },
  {
    id: 'litchi',
    name: { bn: 'লিচু', en: 'Litchi (Lychee)' },
    aliases: ['lichu', 'bombai', 'madraji', 'china 3', 'লিচু', 'চায়না-৩'],
    category: 'fruit',
    categoryLabel: CROP_CATEGORY_LABELS.fruit,
    imageUrl: CROP_ASSETS.fruits,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'লিচু বাংলাদেশের উত্তর-পশ্চিমাঞ্চলের অত্যন্ত অর্থকরী গ্রীষ্মকালীন ফল। ফুল ও ফল বৃদ্ধির সময় মাকড় (erinose mite), বোরার পোকা ও ফল ফাটা রোধে নিয়মিত সেচ খুব জরুরি।',
      en: 'Litchi is a prized summer orchard fruit in northern Bangladesh; mite control, fruit-borer prevention, and steady moisture stop fruit cracking.',
    },
    suitableVarieties: {
      bn: 'BARI Lichu-1, BARI Lichu-2, BARI Lichu-3 (চায়না-৩), BARI Lichu-4, বোম্বাই ও মাদ্রাজী।',
      en: 'BARI Lichu-1, 2, 3 (China-3), BARI Lichu-4, Bombai, and Madraji.',
    },
    suitableRegions: {
      bn: 'দিনাজপুর, ঈশ্বরদী (পাবনা), রাজশাহী, নাটোর, সোনারগাঁও (নারায়ণগঞ্জ) ও কিশোরগঞ্জ।',
      en: 'Premier hubs in Dinajpur, Ishwardi (Pabna), Rajshahi, Natore, Sonargaon, and Kishoreganj.',
    },
    seasonAndPlanting: {
      bn: 'জুন থেকে আগস্ট (বর্ষায়) বাগানে চারা রোপণ করা হয়; ফল পাকে মে–জুন মাসে।',
      en: 'Orchard planting June–August; main summer harvests occur May–June.',
    },
    soilAndPh: {
      bn: 'গভীর, জৈব পদার্থসমৃদ্ধ ও পানি নিকাশযুক্ত দোআঁশ মাটি; আদর্শ pH ৫.৫ থেকে ৬.৫ (সামান্য অম্লীয় মাটিতে সেরা হয়)।',
      en: 'Deep, moist yet well-drained loamy soil around pH 5.5 to 6.5 (prefers mildly acidic soil).',
    },
    landPreparation: {
      bn: '৮×৮ বা ১০×১০ মিটার দূরত্বে গর্ত খুঁড়ে পচা গোবর, কম্পোস্ট এবং পুরোনো লিচু বাগানের সামান্য মাটি (মাইকোরাইজার জন্য) মেশানো উপকারী।',
      en: 'Dig 1×1×1 m pits at 8–10 m spacing, mixing compost plus a handful of soil from a healthy litchi orchard for beneficial mycorrhizae.',
    },
    seedSelectionAndTreatment: {
      bn: 'রোগ-মাকড়মুক্ত সুস্থ গুটি কলমের (air-layering) চারা বাছাই করুন।',
      en: 'Plant vigorous air-layered saplings free of velvet-gall mite foliage.',
    },
    plantingMethod: {
      bn: 'চারা রোপণের পর খুঁটি দিয়ে বেঁধে দিন ও প্রথম দুই গ্রীষ্মে হালকা ছায়া ও নিয়মিত পানি দিন।',
      en: 'Stake new air-layers firmly and provide partial shade and steady moisture for the first two summers.',
    },
    fertilizerManagement: {
      bn: 'সংগ্রহের পরপর (জুন–জুলাই) ও বর্ষা শেষে ২ কিস্তিতে গোবর, সুষম সার ও বোরন দিলে ফল ফাটা কমে।',
      en: 'Apply split basin feeds after harvest and post-monsoon, paying attention to potassium and boron to curb fruit splitting.',
    },
    irrigationSchedule: {
      bn: 'ফল বাঁধার পর থেকে পাকার আগ পর্যন্ত (মার্চ–মে) মাটিতে রস ধরে রাখা আবশ্যক—অনিয়মিত শুকিয়ে হঠাৎ বৃষ্টি/সেচ ফল ফাটায়।',
      en: 'Maintain continuous, steady moisture from fruit set through coloring (Mar–May) to prevent sudden skin cracking.',
    },
    growthStageCare: [
      {
        stage: { bn: 'মাকড় (Velvet Gall) ছাঁটাই', en: 'Mite Shoot Pruning' },
        guidance: {
          bn: 'পাতার নিচে বাদামি মখমলের মতো গল দেখলে সেসব ডগা ভেঙে পুড়িয়ে ফেলুন।',
          en: 'Prune and burn shoots showing velvety brown erinose mite galls on leaf undersides.',
        },
      },
      {
        stage: { bn: 'ফল ছিদ্রকারী ও বাদুড় রক্ষা', en: 'Borer & Bat Protection' },
        guidance: {
          bn: 'ফল লাল হতে শুরু করলে বাগানে জাল ও আলোর ব্যবস্থায় পাখি-বাদুড় থেকে রক্ষা করুন।',
          en: 'Net fruiting trees cleanly as skins blush pink to guard against fruit bats and birds.',
        },
      },
    ],
    weedManagement: {
      bn: 'গাছের গোড়ায় আগাছামুক্ত পরিষ্কার বৃত্ত ও খড়ের মাল্চিং রাখুন।',
      en: 'Keep tree drip zones weed-free and generously mulched in spring.',
    },
    commonDiseasesAndPests: {
      bn: 'লিচুর মাকড় (Erinose Mite), ফল ছিদ্রকারী পোকা (Fruit Borer), ছালখেকো পোকা ও ফল ফাটা।',
      en: 'Litchi Erinose Mite, Litchi Fruit Borer, Bark-eating Caterpillar, and Sunburn/Cracking.',
    },
    preventionAndSafeManagement: {
      bn: 'সংগ্রহের পরপর মাকড়-আক্রান্ত ডগা ছাঁটাই, পরিমিত বোরন ও সেচ এবং বোরার প্রতিরোধে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Prune mite-infested twigs right after harvest, maintain uniform moisture, and consult 16123 for fruit borer management.',
    },
    harvesting: {
      bn: 'জাত অনুযায়ী গোলাপি-লাল রঙ ধরলে ও কাণ্ডের কাঁটা সমতল হলে কয়েক পাতাসহ থোকা (cluster) ধরে কাটুন।',
      en: 'Cut whole clusters with a few attached leaves once skin turns bright pinkish-red and tubercles flatten.',
    },
    postHarvestStorage: {
      bn: 'রস ও রঙ ধরে রাখতে ঝুড়িতে তাজা লিচুর পাতা বিছিয়ে ছায়ায় দ্রুত বাজারজাত করুন।',
      en: 'Line ventilated baskets with fresh litchi leaves to preserve moisture and bright skin color.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'ডগা ছাঁটাই ও সার', en: 'Post-Harvest Prune' },
        window: { bn: 'জুন–জুলাই', en: 'Jun – Jul' },
        action: { bn: 'ফল পাড়ার সাথে মরা ও মাকড়-ডগা কাটা ও সার।', en: 'Prune mite shoots and apply main feed.' },
      },
      {
        step: 2,
        stage: { bn: 'নতুন কুশি পরিপক্ব', en: 'Flush Hardening' },
        window: { bn: 'অক্টোবর–ডিসেম্বর', en: 'Oct – Dec' },
        action: { bn: 'শীতে সেচ কমানো যাতে মুকুল আসে।', en: 'Reduce moisture so winter rest triggers blooms.' },
      },
      {
        step: 3,
        stage: { bn: 'মুকুল ও পরাগায়ন', en: 'Bloom & Bee Activity' },
        window: { bn: 'ফেব্রুয়ারি–মার্চ', en: 'Feb – Mar' },
        action: { bn: 'ফুল ফোটার সময় মৌমাছি রক্ষায় স্প্রে বন্ধ।', en: 'Protect pollinators during open bloom.' },
      },
      {
        step: 4,
        stage: { bn: 'ফল বড় ও সেচ', en: 'Fruit Sizing & Netting' },
        window: { bn: 'মার্চ–মে', en: 'Mar – May' },
        action: { bn: 'নিয়মিত সেচ (ফাটা রোধ) ও জাল টানানো।', en: 'Steady moisture to prevent cracking; hang nets.' },
      },
      {
        step: 5,
        stage: { bn: 'থোকা সংগ্রহ', en: 'Cluster Harvest' },
        window: { bn: 'মে–জুন', en: 'May – Jun' },
        action: { bn: 'সকালে পাতাসহ থোকা কাটা ও প্যাকিং।', en: 'Cut bright red clusters in cool morning hours.' },
      },
    ],
  },
  {
    id: 'papaya',
    name: { bn: 'পেঁপে', en: 'Papaya' },
    aliases: ['pepe', 'shahi pepe', 'red lady', 'পেঁপে', 'শাহী পেঁপে'],
    category: 'fruit',
    categoryLabel: CROP_CATEGORY_LABELS.fruit,
    imageUrl: CROP_ASSETS.fruits,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'পেঁপে স্বল্প সময়ে ফল দানকারী অত্যন্ত লাভজনক ফল ও সবজি। তবে কয়েক ঘণ্টার জলাবদ্ধতাতেও গোড়া পচে গাছ মারা যেতে পারে—তাই উঁচু বেড ও নিকাশ ব্যবস্থা অপরিহার্য।',
      en: 'Papaya bears fruit within 8–10 months of planting, serving as both vegetable and ripe fruit—provided strict drainage prevents fatal root rot.',
    },
    suitableVarieties: {
      bn: 'BARI Pepe-1 (শাহী পেঁপে), রেড লেডি (উভলিঙ্গী হাইব্রিড), টপ লেডি ও কাশ্মীরি জাত।',
      en: 'BARI Pepe-1 (Shahi), Red Lady (gynodioecious hybrid), and Top Lady.',
    },
    suitableRegions: {
      bn: 'ঈশ্বরদী (পাবনা), যশোর, বগুড়া, রাজশাহী, গাজীপুর ও দেশের বন্যামুক্ত উঁচু জমি।',
      en: 'Cultivated on flood-free high lands in Ishwardi, Jashore, Bogura, Rajshahi, and Gazipur.',
    },
    seasonAndPlanting: {
      bn: 'ফেব্রুয়ারি–মার্চ অথবা সেপ্টেম্বর–অক্টোবর (বর্ষার আগে/পরে) চারা রোপণের শ্রেষ্ঠ সময়।',
      en: 'Transplant either Feb–Mar or Sep–Oct to keep young roots out of peak monsoon flooding.',
    },
    soilAndPh: {
      bn: 'অতি সুনিষ্কাশিত উঁচু বেলে-দোআঁশ ও দোআঁশ মাটি; অনুকূল pH ৬.০ থেকে ৭.০।',
      en: 'Very well-drained sandy-loam and loamy upland soil around pH 6.0 to 7.0.',
    },
    landPreparation: {
      bn: '২×২ মিটার দূরত্বে উঁচু ঢিবি বা বেড তৈরি করে মাঝে চওড়া পানি নিকাশের নালা কাটুন; গর্তে কম্পোস্ট ও ছাই মেশান।',
      en: 'Build raised mounds or beds at 2×2 m spacing flanked by deep drains; blend compost and wood ash into pits.',
    },
    seedSelectionAndTreatment: {
      bn: 'পলি-ব্যাগে সুস্থ চারা তৈরি করুন; শাহী পেঁপের ক্ষেত্রে প্রতি গর্তে ৩টি চারা লাগিয়ে ফুল এলে প্রতি ১০–১২টি স্ত্রী গাছের বিপরীতে ১টি পুরুষ গাছ রেখে বাকি পুরুষ ছাঁটুন (রেড লেডিতে প্রায় সব গাছই ফল দেয়)।',
      en: 'Raise seedlings in polybags; for Shahi (dioecious), plant 3 per pit and thin excess males at flowering keeping 1 male per 10–12 females (Red Lady bears hermaphrodite/female directly).',
    },
    plantingMethod: {
      bn: '৪৫–৬০ দিন বয়সী চারা গোড়া মাটির সমান রেখে বা সামান্য উঁচু করে লাগান এবং বাঁশের খুঁটি দিন।',
      en: 'Plant 45–60 day seedlings slightly high on mounds with stakes to guard against wind lodging.',
    },
    fertilizerManagement: {
      bn: 'পচা জৈব সারের পাশাপাশি ২ মাস অন্তর বোরন-জিংক ও পটাশ-সমৃদ্ধ সুষম সার দিলে ফল ঝকঝকে ও মিষ্টি হয়।',
      en: 'Provide generous compost plus balanced split NPK with periodic boron every 2 months so fruits stay smooth.',
    },
    irrigationSchedule: {
      bn: 'শীত ও গ্রীষ্মে রিং নালায় হালকা সেচ দিন—মূল কাণ্ড ভেজাবেন না। বর্ষায় একদমই জল জমতে দেবেন না।',
      en: 'Irrigate dry-season outer rings gently without wetting stem collars; drain monsoon rain immediately.',
    },
    growthStageCare: [
      {
        stage: { bn: 'পুরুষ-স্ত্রী নির্বাচন ও ছাঁটাই', en: 'Sex Thinning & Fruit Spacing' },
        guidance: {
          bn: 'ফুল আসার সাথে সাথে অতিরিক্ত পুরুষ গাছ সরিয়ে দিন এবং একই গিঁটে গাদাগাদি ছোট ফল পাতলা করুন।',
          en: 'Thin extra male dioecious plants at first bloom and thin crowded twin fruits along the trunk.',
        },
      },
      {
        stage: { bn: 'ভাইরাস ও মিলিবাগ পর্যবেক্ষণ', en: 'Virus & Mealybug Check' },
        guidance: {
          bn: 'রিং স্পট ভাইরাস আক্রান্ত পাতা কুঁকড়ে যাওয়া গাছ দেখলে দ্রুত সরিয়ে ফেলুন।',
          en: 'Inspect canopies for Papaya Ringspot Virus (shoestring leaves) and remove severely infected trees.',
        },
      },
    ],
    weedManagement: {
      bn: 'অগভীর শিকড় থাকায় কোদাল না দিয়ে হাত নিড়ানি ও খড়ের মাল্চিং ব্যবহার করুন।',
      en: 'Use shallow hand weeding and mulch rings so surface feeder roots are never sliced.',
    },
    commonDiseasesAndPests: {
      bn: 'গোড়া ও কাণ্ড পচা (Collar Rot), পেঁপের রিং স্পট ভাইরাস (PRSV), পেঁপের মিলিবাগ ও মাকড়।',
      en: 'Collar/Root Rot, Papaya Ringspot Virus (PRSV), Papaya Mealybug, and Red Mite.',
    },
    preventionAndSafeManagement: {
      bn: 'উঁচু বেড ও দ্রুত নিকাশই গোড়া পচার মূল সমাধান; মিলিবাগ নিয়ন্ত্রণে জৈব পরভোজী পোকা বা ১৬১২৩-এর পরামর্শ নিন।',
      en: 'Raised beds and strict drainage prevent collar rot; ask 16123 for biological mealybug control and mite care.',
    },
    harvesting: {
      bn: 'সবজির জন্য পূর্ণ আকারের সবুজ পেঁপে এবং পাকা ফলের জন্য নিচের দিকে হলুদ ডোরা (streak) দেখা দিলে তুলুন।',
      en: 'Pick full-sized green fruits for culinary use, or wait for the first yellow blossom-end streak for sweet ripening.',
    },
    postHarvestStorage: {
      bn: 'সংবাদপত্র দিয়ে মুড়িয়ে ক্রেটে রাখলে আঘাত না পেয়ে ৪–৫ দিনে সুন্দরভাবে পেকে যায়।',
      en: 'Wrap fruits individually in soft paper inside crates to ripen evenly without bruising.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'পলি-ব্যাগ বীজতলা', en: 'Polybags Nursery' },
        window: { bn: '৬–৭ সপ্তাহ আগে', en: '6–7 wks pre-plant' },
        action: { bn: 'জীবাণুমুক্ত দোআঁশ-বালি মাটিতে চারা।', en: 'Grow seedlings in well-drained bags.' },
      },
      {
        step: 2,
        stage: { bn: 'উঁচু মাদা রোপণ', en: 'Mound Planting' },
        window: { bn: '০ দিন', en: 'Day 0' },
        action: { bn: 'জল-নিকাশযুক্ত মাদায় রোপণ ও খুঁটি।', en: 'Plant on raised mounds with wind stakes.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল ও লিঙ্গ নির্বাচন', en: 'Bloom & Sex Selection' },
        window: { bn: '৪–৫ মাস', en: 'Months 4–5' },
        action: { bn: 'বাড়তি পুরুষ গাছ ছাঁটাই ও কিস্তি সার।', en: 'Thin extra males (if dioecious) and feed.' },
      },
      {
        step: 4,
        stage: { bn: 'কাঁচা সবজি সংগ্রহ', en: 'Green Fruit Thin/Pick' },
        window: { bn: '৬–৭ মাস', en: 'Months 6–7' },
        action: { bn: 'ভিড় কমাতে সবজি পেঁপে তোলা।', en: 'Thin crowded nodes as green vegetable.' },
      },
      {
        step: 5,
        stage: { bn: 'পাকা ফল উৎপাদন', en: 'Continuous Ripe Yield' },
        window: { bn: '৮–২৪ মাস', en: 'Months 8–24' },
        action: { bn: 'হলুদ ডোরা দেখে তোলা ও বর্ষায় নিকাশ রক্ষা।', en: 'Harvest yellow-streaked fruit; guard drains.' },
      },
    ],
  },
  {
    id: 'pineapple',
    name: { bn: 'আনারস', en: 'Pineapple' },
    aliases: ['anarosh', 'honey queen', 'giant kew', 'আনারস', 'মধুপুর'],
    category: 'fruit',
    categoryLabel: CROP_CATEGORY_LABELS.fruit,
    imageUrl: CROP_ASSETS.fruits,
    sourceType: 'verified_reference',
    waterDemandLevel: 'low',
    overview: {
      bn: 'আনারস পাহাড়ি ঢালু জমি ও মধুপুর গড়ের অম্লীয় লাল মাটির অত্যন্ত লাভজনক ফল। চারা রোপণের প্রায় ১৫–১৮ মাস পর ফল সংগ্রহযোগ্য হয়।',
      en: 'Pineapple thrives in acidic upland red soils and hill slopes of Bangladesh (Madhupur & CHT), yielding sweet harvests 15–18 months after planting.',
    },
    suitableVarieties: {
      bn: 'জায়ান্ট কিউ (ক্যালেন্ডার), হানি কুইন (জলডুগি) এবং ঘোড়াশাল জাত।',
      en: 'Giant Kew (Calendar), Honey Queen (Joldugi), and Ghorashal cultivars.',
    },
    suitableRegions: {
      bn: 'টাঙ্গাইল (মধুপুর), সিলেট (শ্রীমঙ্গল-মৌলভীবাজার), রাঙ্গামাটি, খাগড়াছড়ি, বান্দরবান ও নরসিংদী।',
      en: 'Hubs include Madhupur (Tangail), Sreemangal/Moulvibazar, Rangamati, Khagrachari, Bandarban, and Narsingdi.',
    },
    seasonAndPlanting: {
      bn: 'আগাম বা মূল বর্ষার শেষে আগস্ট থেকে অক্টোবর পর্যন্ত চারা রোপণ করলে সবচেয়ে ভালো হয়।',
      en: 'Best planted August through October as peak monsoon rains subside.',
    },
    soilAndPh: {
      bn: 'জল-নিকাশযুক্ত অম্লীয় বেলে-দোআঁশ ও লালচে টিলা মাটি; আদর্শ pH ৪.৫ থেকে ৫.৮ (ক্ষারীয় মাটিতে ভালো হয় না)।',
      en: 'Well-drained acidic sandy-loam and red hill soils at pH 4.5 to 5.8 (dislikes alkaline/waterlogged clay).',
    },
    landPreparation: {
      bn: 'জমি ভালোভাবে চাষ ও আগাছামুক্ত করে সমতল জমিতে সারি ও নিকাশ নালা করুন; পাহাড়ে ঢালের আড়াআড়ি (contour) সারিতে লাগান।',
      en: 'Plough deeply on flat uplands with drainage beds, or plant along contour lines across hill slopes to curb erosion.',
    },
    seedSelectionAndTreatment: {
      bn: 'কাণ্ডের চারা (slip বা sucker—ক্রাউন নয়) বেছে নিচের শুকনো পাতা ছাড়িয়ে রোদে ২–৩ দিন শুকিয়ে (curing) রোপণ করলে হার্ট রট হয় না।',
      en: 'Select healthy slips or side suckers (faster than crowns), strip lower dry leaves, and sun-cure 2–3 days before planting to prevent heart rot.',
    },
    plantingMethod: {
      bn: 'দুই সারির বেডে ৪৫×৩০ সেমি দূরত্বে অগভীর গর্তে পাতার খাঁজে মাটি না ঢুকিয়ে চারা বসিয়ে দিন।',
      en: 'Plant in double-row beds (45×30 cm) carefully keeping soil particles out of the central leaf whorl.',
    },
    fertilizerManagement: {
      bn: 'পচা গোবর ও কিস্তিতে সুষম পটাশ-নাইট্রোজেন সার প্রয়োগ করলে ফলের মিষ্টতা ও ওজন ভালো হয়।',
      en: 'Apply basal compost plus split potash and nitrogen applications up to flowering.',
    },
    irrigationSchedule: {
      bn: 'অত্যন্ত খরা-সহনশীল; শীত-বসন্তে তীব্র খরায় হালকা সেচ ও খড়ের মাল্চিং যথেষ্ট। জলাবদ্ধতা প্রাণঘাতী।',
      en: 'Highly drought-hardy; dry-season mulching and occasional light watering suffice, while standing water causes root rot.',
    },
    growthStageCare: [
      {
        stage: { bn: 'অঙ্গজ ও মাল্চিং', en: 'Vegetative Mulching' },
        guidance: {
          bn: 'সারির মাঝে শুকনো পাতা বা খড় বিছিয়ে মাটির রস ও আগাছা নিয়ন্ত্রণ করুন।',
          en: 'Spread dry grass or leaf mulch between double rows to hold moisture and stop weeds.',
        },
      },
      {
        stage: { bn: 'রোদ-পোড়া রক্ষা (Sunburn)', en: 'Sunburn Shielding' },
        guidance: {
          bn: 'গরমে বড় হতে থাকা আনারস পাতা দিয়ে হালকা ঢেকে বা খড় দিয়ে রোদ থেকে বাঁচান।',
          en: 'Tie outer leaves loosely or place dry grass caps over maturing fruits in peak May heat.',
        },
      },
    ],
    weedManagement: {
      bn: 'কাঁটাযুক্ত পাতার কারণে প্রাথমিক অবস্থায় ও মাল্চিং করে আগাছা দমন সহজ।',
      en: 'Control weeds early before spiky leaves interlock, then rely on thick mulching.',
    },
    commonDiseasesAndPests: {
      bn: 'হার্ট রট (হৃদপিণ্ড পচা), মিলিবাগ উইল্ট এবং ইঁদুর-কাঠবিড়ালির উপদ্রব।',
      en: 'Phytophthora Heart Rot, Mealybug Wilt, and rodent/squirrel damage.',
    },
    preventionAndSafeManagement: {
      bn: 'চারা ২–৩ দিন শুকিয়ে রোপণ, পাতার মাঝে মাটি না ঢোকানো, নিকাশ ব্যবস্থা এবং মিলিবাগ/হার্ট রটের জন্য ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Cure suckers before planting, keep soil out of leaf hearts, maintain drainage, and ask 16123 if mealybug wilt appears.',
    },
    harvesting: {
      bn: 'ফলের গোড়ার ১–২ সারি চোখ হালকা হলুদ হলে ও সুগন্ধ বের হলে বোঁটার ২–৩ সেমি রেখে ধারালো দা দিয়ে কাটুন।',
      en: 'Cut when the bottom 1–2 rows of fruitlets ("eyes") turn golden-yellow and emit sweet aroma.',
    },
    postHarvestStorage: {
      bn: 'পাতার মুকুটসহ ছায়ায় খাড়া রেখে পরিবহন করুন; তীব্র রোদে বা গাদা করে রাখবেন না।',
      en: 'Transport upright in cushioned shade with crowns intact; avoid piling deeply.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'চারা শুকানো ও রোপণ', en: 'Cure & Plant' },
        window: { bn: 'আগস্ট–অক্টোবর', en: 'Aug – Oct' },
        action: { bn: 'সাকার শুকিয়ে দ্বি-সারি বেডে রোপণ।', en: 'Sun-cure slips and plant in double rows.' },
      },
      {
        step: 2,
        stage: { bn: 'অঙ্গজ ও মাল্চিং', en: 'Vegetative & Mulch' },
        window: { bn: '২–৯ মাস', en: 'Months 2–9' },
        action: { bn: 'আগাছা দমন, খড়ের মাল্চ ও কিস্তি সার।', en: 'Mulch heavily and split-feed nitrogen/potash.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল ফোটা', en: 'Inflorescence' },
        window: { bn: '১০–১২ মাস', en: 'Months 10–12' },
        action: { bn: 'নতুন ফুল দেখা ও পিঁপড়া-মিলিবাগ নজরদারি।', en: 'Scout red heart emerges for mealybugs.' },
      },
      {
        step: 4,
        stage: { bn: 'ফল পাকা ও ছায়া', en: 'Fruit Sizing' },
        window: { bn: '১৩–১৬ মাস', en: 'Months 13–16' },
        action: { bn: 'রোদ-পোড়া ঠেকাতে পাতা/খড়ে ঢাকা।', en: 'Shield swelling fruit from intense sunburn.' },
      },
      {
        step: 5,
        stage: { bn: 'সংগ্রহ', en: 'Harvest' },
        window: { bn: '১৫–১৮ মাস', en: 'Months 15–18' },
        action: { bn: 'নিচের চোখ হলুদ হলে কাটা।', en: 'Cut cleanly once basal eyes yellow.' },
      },
    ],
  },
  {
    id: 'lemon',
    name: { bn: 'লেবু', en: 'Lemon & Lime' },
    aliases: ['lebu', 'kagoji lebu', 'elachi lebu', 'jara lebu', 'কাগজি লেবু', 'এলাচি লেবু', 'কলম্বো'],
    category: 'fruit',
    categoryLabel: CROP_CATEGORY_LABELS.fruit,
    imageUrl: CROP_ASSETS.fruits,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'লেবু বাংলাদেশের বসতবাড়ি ও বাণিজ্যিক বাগানের অন্যতম জনপ্রিয় সাইট্রাস ফসল। কাগজি, এলাচি ও বারোমাসি বীজবিহীন লেবুর চাহিদা সারা বছর থাকে।',
      en: 'Lemon and lime (Kagoji, Elachi, Seedless BARI Lebu) are high-demand citrus crops thriving in well-drained homestead and commercial orchards.',
    },
    suitableVarieties: {
      bn: 'BARI Lebu-1 (এলাচি), BARI Lebu-2, BARI Lebu-4 (বারোমাসি ও সুগন্ধি), BARI Lebu-5 (কাগজি) ও বীজবিহীন সিডলেস জাত।',
      en: 'BARI Lebu-1 (Elachi), BARI Lebu-2, BARI Lebu-4 (year-round), BARI Lebu-5 (Kagoji), and seedless varieties.',
    },
    suitableRegions: {
      bn: 'শ্রীমঙ্গল (মৌলভীবাজার), টাঙ্গাইল, নরসিংদী, পাবনা, সিলেট, নাটোর ও পার্বত্য জেলাসমূহে।',
      en: 'Major hubs in Sreemangal, Tangail, Narsingdi, Pabna, Sylhet, Natore, and hill tracts.',
    },
    seasonAndPlanting: {
      bn: 'মে থেকে সেপ্টেম্বর (বর্ষা মৌসুম) নতুন কলম রোপণের উত্তম সময়।',
      en: 'Planted during monsoon (May through September).',
    },
    soilAndPh: {
      bn: 'জলাবদ্ধতামুক্ত উঁচু দোআঁশ ও বেলে-দোআঁশ মাটি; আদর্শ pH ৫.৫ থেকে ৬.৮।',
      en: 'Well-drained loamy and sandy-loam uplands around pH 5.5 to 6.8.',
    },
    landPreparation: {
      bn: '২.৫–৩ মিটার দূরত্বে গর্ত করে পচা গোবর, কাঠের ছাই ও জৈব সার দিয়ে ভরে উঁচু ঢিবি তৈরি করুন।',
      en: 'Prepare composted mounds 2.5–3 m apart so rainwater drains smoothly away from trunks.',
    },
    seedSelectionAndTreatment: {
      bn: 'ক্যাংকার ও ডাই-ব্যাক মুক্ত সুস্থ গুটি কলম (air-layering) বা বাডিং চারা রোপণ করুন।',
      en: 'Plant healthy canker-free air-layered or budded saplings.',
    },
    plantingMethod: {
      bn: 'ঢিবির মাঝখানে লাগিয়ে খুঁটি দিন ও প্রথম ১ বছরে অতিরিক্ত শাখা ছেঁটে সুন্দর ঝোপালো আকৃতি গড়ে তুলুন।',
      en: 'Plant upright on raised mounds, stake firmly, and train a neat open bush frame.',
    },
    fertilizerManagement: {
      bn: 'বছরে ২–৩ বার জৈব সার, সুষম NPK ও জিংক-বোরন-ম্যাগনেসিয়ামের ঘাটতি পূরণ করলে পাতা হলুদ হওয়া কমে।',
      en: 'Apply split seasonal compost plus balanced NPK and zinc/boron/magnesium checks via local advice to curb leaf chlorosis.',
    },
    irrigationSchedule: {
      bn: 'শুকনো শীতে ও বসন্তে ফুল-গুটি ধরে রাখতে ৮–১২ দিন পরপর পানি দিন; জলাবদ্ধতায় ডাই-ব্যাক ও শিকড় পচা হয়।',
      en: 'Water every 8–12 days during dry winter/spring fruit set; avoid collar standing water.',
    },
    growthStageCare: [
      {
        stage: { bn: 'মরা ডাল ও চুষক ডাল ছাঁটাই', en: 'Sanitation Pruning' },
        guidance: {
          bn: 'শুকনো, রোগাক্রান্ত ও মূল কাণ্ডের নিচের অপ্রয়োজনীয় ডাল কেটে বর্দো পেস্ট লাগিয়ে দিন।',
          en: 'Prune dead twigs, water sprouts, and crossing inner branches cleanly.',
        },
      },
      {
        stage: { bn: 'লিফ মাইনার ও স্কেল পর্যবেক্ষণ', en: 'Flush Protection' },
        guidance: {
          bn: 'নতুন কচি পাতা গজানোর সময় লিফ মাইনার (পাতার সুড়ঙ্গকারী পোকা) পাতা কুঁকড়ে দেয় কি না দেখুন।',
          en: 'Watch fresh young leaf flushes closely for citrus leaf miner trails.',
        },
      },
    ],
    weedManagement: {
      bn: 'গোড়ার বৃত্তে খড়ের মাল্চ ও হাত নিড়ানি দিয়ে আগাছা দমন করুন।',
      en: 'Mulch drip zones and hand-weed gently without damaging shallow citrus roots.',
    },
    commonDiseasesAndPests: {
      bn: 'সাইট্রাস ক্যাংকার (খসখসে ফোস্কা দাগ), ডাই-ব্যাক, গামোসিস (আঠা ঝরা), লিফ মাইনার ও অরেঞ্জ ডগ ক্যাটারপিলার।',
      en: 'Citrus Canker, Die-back, Gummosis, Citrus Leaf Miner, and Lemon Butterfly Caterpillar.',
    },
    preventionAndSafeManagement: {
      bn: 'আক্রান্ত পাতা-ডাল ছাঁটাই, বর্ষার আগে কাণ্ডের গোড়ায় চুন-তুতে পেস্ট (Bordeaux) ও লিফ মাইনার-ক্যাংকারের জন্য ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Prune cankered twigs, protect lower trunks with Bordeaux paste pre-monsoon, and consult 16123 for leaf miner.',
    },
    harvesting: {
      bn: 'খোসা চকচকে, মসৃণ ও রসালো হয়ে হালকা সবুজাভ-হলুদ ভাব ধরলে বোঁটাসহ কাটুন।',
      en: 'Clip lemons once rinds turn glossy, plump, and pale greenish-yellow.',
    },
    postHarvestStorage: {
      bn: 'ঠান্ডা ছায়াযুক্ত ও শুষ্ক ঝুড়িতে রাখলে ১–২ সপ্তাহ তাজা থাকে।',
      en: 'Hold in cool, dry, ventilated crates for 1–2 weeks cleanly.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'বর্ষায় কলম রোপণ', en: 'Monsoon Plant' },
        window: { bn: 'মে–সেপ্টেম্বর', en: 'May – Sep' },
        action: { bn: 'উঁচু ঢিবিতে সুস্থ গুটি কলম লাগানো।', en: 'Plant canker-free air layers on mounds.' },
      },
      {
        step: 2,
        stage: { bn: 'গাছের কাঠামো গঠন', en: 'Frame Pruning' },
        window: { bn: '১ম বছর', en: 'Year 1' },
        action: { bn: 'সুষম ডাল রাখা ও প্রথম ফুল অপসারণ।', en: 'Shape sturdy limbs and encourage root growth.' },
      },
      {
        step: 3,
        stage: { bn: 'কচি পাতা ও ফুল', en: 'Spring Bloom' },
        window: { bn: 'জানুয়ারি–মার্চ', en: 'Jan – Mar' },
        action: { bn: 'লিফ মাইনার রক্ষা ও শুষ্কতায় সেচ।', en: 'Irrigate lightly and guard new flushes.' },
      },
      {
        step: 4,
        stage: { bn: 'বর্ষার ফল পুষ্ট', en: 'Fruit Sizing' },
        window: { bn: 'এপ্রিল–জুলাই', en: 'Apr – Jul' },
        action: { bn: 'নিকাশ নালা রক্ষা ও কিস্তি সার।', en: 'Keep drains open and apply monsoon feed.' },
      },
      {
        step: 5,
        stage: { bn: 'বছরব্যাপী সংগ্রহ', en: 'Year-Round Pick' },
        window: { bn: 'বারোমাসি', en: 'Multi-Flush Harvest' },
        action: { bn: 'রসালো ও চকচকে লেবু বোঁটাসহ কাটা।', en: 'Clip plump glossy lemons across flushes.' },
      },
    ],
  },
  {
    id: 'orange',
    name: { bn: 'মাল্টা ও কমলা', en: 'Sweet Orange (Malta & Mandarin)' },
    aliases: ['malta', 'komola', 'bari malta 1', 'বারি মাল্টা ১', 'কমলা', 'মাল্টা'],
    category: 'fruit',
    categoryLabel: CROP_CATEGORY_LABELS.fruit,
    imageUrl: CROP_ASSETS.fruits,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'বারি মাল্টা-১ প্রবর্তনের পর সমতল বাংলাদেশেও সুস্বাদু মাল্টা ও কমলা চাষ ব্যাপক জনপ্রিয় হয়েছে। জিংক-বোরন পুষ্টি ও গ্রিনিং রোগ প্রতিরোধ বাগানের দীর্ঘায়ু নিশ্চিত করে।',
      en: 'Following the release of BARI Malta-1, sweet orange and mandarin orchards have boomed across flat and hilly Bangladesh.',
    },
    suitableVarieties: {
      bn: 'BARI Malta-1 (পয়সা-চিহ্নিত নিচ, অতি মিষ্টি), BARI Malta-2, BARI Komola-2 ও ছাতক-সিলেট কমলা।',
      en: 'BARI Malta-1 (famous coin-ring base), BARI Malta-2, BARI Komola-2, and Sylhet mandarin.',
    },
    suitableRegions: {
      bn: 'পঞ্চগড়, ঠাকুরগাঁও, চুয়াডাঙ্গা, যশোর, মৌলভীবাজার, সিলেট, খাগড়াছড়ি, বান্দরবান ও পিরোজপুর।',
      en: 'Thriving in Panchagarh, Thakurgaon, Chuadanga, Jashore, Sylhet, hill tracts, and Pirojpur.',
    },
    seasonAndPlanting: {
      bn: 'মে–জুলাই এবং সেপ্টেম্বর–অক্টোবর কলমের চারা রোপণের সেরা সময়।',
      en: 'Best planted May–July or September–October.',
    },
    soilAndPh: {
      bn: 'গভীর, সুনিষ্কাশিত দোআঁশ ও বেলে-দোআঁশ মাটি; আদর্শ pH ৫.৫ থেকে ৬.৫।',
      en: 'Deep, very well-drained loamy soil around pH 5.5 to 6.5.',
    },
    landPreparation: {
      bn: '৩×৩ বা ৩.৫×৩.৫ মিটার দূরত্বে গর্ত করে জৈব সার ও ডলোমাইট/ছাই (অম্লতা অনুযায়ী) মিশিয়ে উঁচু বেডে প্রস্তুত করুন।',
      en: 'Prepare compost-enriched mounds 3–3.5 m apart with clean stormwater channels.',
    },
    seedSelectionAndTreatment: {
      bn: 'রংপুরা লাইম বা ট্রাইফোলিয়েট রুটে বাডিং/গ্রাফটিং করা রোগমুক্ত BARI প্রত্যয়িত চারা কিনুন।',
      en: 'Plant certified budded/grafted saplings on Rangpur lime or disease-tolerant rootstock.',
    },
    plantingMethod: {
      bn: 'কলমের জোড় মাটির অন্তত ১৫ সেমি উপরে রেখে রোপণ করুন যাতে মাটি থেকে গামোসিস না ধরে।',
      en: 'Keep the graft union at least 15 cm above soil level to prevent collar gummosis.',
    },
    fertilizerManagement: {
      bn: 'জৈব সার, NPK-এর পাশাপাশি মাল্টা-কমলায় জিংক, বোরন ও ম্যাগনেসিয়াম খুবই দরকারি—মাটি ও পাতা দেখে কৃষি অফিসের পরামর্শে দিন।',
      en: 'Combine compost and NPK with zinc, boron, and magnesium checks per extension guidance so fruits stay sweet and foliage green.',
    },
    irrigationSchedule: {
      bn: 'মার্চ–মে মাসে ফুল ও ছোট ফল ধরে রাখতে সেচ অত্যন্ত জরুরি; পানি জমতে দিলে শিকড় পচে গাছ মরে।',
      en: 'Ensure regular moisture March–May during fruit sizing; never permit standing water.',
    },
    growthStageCare: [
      {
        stage: { bn: 'মূল কাণ্ডের ডাল ছাঁটাই', en: 'Rootstock Sprout Removal' },
        guidance: {
          bn: 'কলমের জোড়ের নিচে গজানো অবাঞ্ছিত ডাল (rootstock suckers) দেখলেই কেটে ফেলুন।',
          en: 'Snap off vigorous thorny shoots sprouting below the graft union immediately.',
        },
      },
      {
        stage: { bn: 'ফল ব্যাগিং ও রসালো হওয়া', en: 'Fruit Sizing & Protection' },
        guidance: {
          bn: 'ফলের রঙ ধরা ও রস বাড়ার সময় ফলের মাছি ও স্কেল পোকা পরীক্ষা করুন।',
          en: 'Check ripening fruits for fruit flies and citrus psylla (vector of greening).',
        },
      },
    ],
    weedManagement: {
      bn: 'গোড়ায় মাল্চিং ও হাত নিড়ানি বজায় রাখুন।',
      en: 'Maintain clean mulched basins without deep hoeing near feeder roots.',
    },
    commonDiseasesAndPests: {
      bn: 'সাইট্রাস গ্রিনিং (HLB), ডাই-ব্যাক, গামোসিস, সাইট্রাস সিলা ও লিফ মাইনার।',
      en: 'Citrus Greening (HLB), Die-back, Gummosis, Asian Citrus Psylla, and Leaf Miner.',
    },
    preventionAndSafeManagement: {
      bn: 'রোগমুক্ত চারা, গ্রিনিং বাহক সিলা পোকা নিয়ন্ত্রণ এবং আঠা ঝরা (গামোসিস) দেখলে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Use certified clean nursery stock, manage psylla vectors early, keep graft unions dry, and consult 16123.',
    },
    harvesting: {
      bn: 'অক্টোবর–ডিসেম্বর মাসে ফল পূর্ণ রসালো হয়ে নিচে হলুদাভ-সবুজ বা কমলা রঙ ধরলে কাঁচি দিয়ে বোঁটাসহ কাটুন।',
      en: 'Clip mature juicy fruits with secateurs between October and December once skin develops subtle warm tint.',
    },
    postHarvestStorage: {
      bn: 'শুকনো ছায়ায় ক্রেটে সাজালে ২–৩ সপ্তাহ স্বাভাবিকভাবেই রসালো ও তাজা থাকে।',
      en: 'Store in cool ventilated crates in shade for 2–3 weeks cleanly.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'কলম রোপণ', en: 'Grafted Plant' },
        window: { bn: 'মে–অক্টোবর', en: 'May – Oct' },
        action: { bn: 'কলমের জোড় উপরে রেখে উঁচু ঢিবিতে রোপণ।', en: 'Plant high keeping graft union well clear.' },
      },
      {
        step: 2,
        stage: { bn: 'বৃদ্ধি ও ডাল ছাঁটাই', en: 'Canopy Shaping' },
        window: { bn: '১–২ বছর', en: 'Years 1–2' },
        action: { bn: 'জোড়ের নিচের ডাল কাটা ও কাঠামো গড়া।', en: 'Remove rootstock suckers and build frame.' },
      },
      {
        step: 3,
        stage: { bn: 'বসন্তে ফুল ও গুটি', en: 'Spring Bloom' },
        window: { bn: 'ফেব্রুয়ারি–মার্চ', en: 'Feb – Mar' },
        action: { bn: 'খরায় সেচ ও লিফ মাইনার-সিলা দেখা।', en: 'Water gently and protect young flushes.' },
      },
      {
        step: 4,
        stage: { bn: 'ফল বড় ও রসালো', en: 'Summer Sizing' },
        window: { bn: 'এপ্রিল–সেপ্টেম্বর', en: 'Apr – Sep' },
        action: { bn: 'মাল্চিং, অণুপুষ্টি ও বর্ষা নিষ্কাশন।', en: 'Ensure micronutrient care and drainage.' },
      },
      {
        step: 5,
        stage: { bn: 'সংগ্রহ', en: 'Autumn Harvest' },
        window: { bn: 'অক্টোবর–ডিসেম্বর', en: 'Oct – Dec' },
        action: { bn: 'রস ও মিষ্টতা এলে কাঁচি দিয়ে কাটা।', en: 'Clip ripe sweet oranges neatly in crates.' },
      },
    ],
  },
  {
    id: 'dragon-fruit',
    name: { bn: 'ড্রাগন ফল', en: 'Dragon Fruit' },
    aliases: ['dragon', 'pitaya', 'ড্রাগন', 'রঙিন ফল'],
    category: 'fruit',
    categoryLabel: CROP_CATEGORY_LABELS.fruit,
    imageUrl: CROP_ASSETS.fruits,
    sourceType: 'verified_reference',
    waterDemandLevel: 'low',
    overview: {
      bn: 'ড্রাগন ফল বাংলাদেশের নতুন প্রজন্মের অত্যন্ত লাভজনক ক্যাকটাস জাতীয় ফল। কংক্রিটের পিলার-টায়ার সাপোর্ট, খরা-সহনশীলতা এবং মে থেকে নভেম্বর পর্যন্ত একটানা ফলনের কারণে কৃষকের কাছে ব্যাপক জনপ্রিয়।',
      en: 'Dragon fruit is a booming high-value climbing cactus across Bangladesh, fruiting from May to November on concrete pillar-and-ring supports.',
    },
    suitableVarieties: {
      bn: 'BARI Dragon Fruit-1 (লাল শাঁস), পিঙ্ক রোজ, লাল-সাদা হাইব্রিড এবং হলুদ ড্রাগন।',
      en: 'BARI Dragon Fruit-1 (red-fleshed), Pink Rose, Thai Red, and yellow-skinned types.',
    },
    suitableRegions: {
      bn: 'ঝিনাইদহ, যশোর, নাটোর, রাজশাহী, গাজীপুর, ময়মনসিংহ ও পার্বত্য জেলাসমূহে ব্যাপক বাণিজ্যিক বাগান।',
      en: 'Major hubs across Jhenaidah, Jashore, Natore, Rajshahi, Gazipur, Mymensingh, and hill districts.',
    },
    seasonAndPlanting: {
      bn: 'বছরের যেকোনো সময় রোপণ করা গেলেও মার্চ–এপ্রিল এবং সেপ্টেম্বর–অক্টোবর সবচেয়ে ভালো।',
      en: 'Can be planted year-round, with March–April and September–October optimal.',
    },
    soilAndPh: {
      bn: 'অবশ্যই জলাবদ্ধতামুক্ত বেলে-দোআঁশ ও দোআঁশ মাটি; অনুকূল pH ৫.৫ থেকে ৭.০।',
      en: 'Strictly well-drained sandy-loam and loamy soil around pH 5.5 to 7.0.',
    },
    landPreparation: {
      bn: '২.৫×২.৫ মিটার দূরত্বে মাটির নিচে খুঁটিসহ আরসিসি পিলার ও মাথায় টায়ার/রিং স্থাপন করুন এবং পিলারের চারপাশে কম্পোস্ট মিশিয়ে উঁচু ঢিবি তৈরি করুন।',
      en: 'Erect concrete pillars topped with rings/tires at 2.5×2.5 m spacing and form compost-rich raised mounds around each pillar base.',
    },
    seedSelectionAndTreatment: {
      bn: 'ফল-প্রদায়ী সুস্থ মাতৃগাছ থেকে ৪০–৫০ সেমি লম্বা পরিপক্ব কাণ্ডের কাটিং কেটে ছায়ায় ৫–৭ দিন শুকিয়ে (callusing) রোপণ করলে পচা ধরে না।',
      en: 'Take 40–50 cm mature stem cuttings from fruiting mother plants and shade-cure for 5–7 days so cut ends seal before planting.',
    },
    plantingMethod: {
      bn: 'প্রতি পিলারের ৪ পাশে ৪টি শুকানো কাটিং ৩–৫ সেমি গভীরে লাগিয়ে পিলারের সাথে বেঁধে দিন ও ছাতার মতো ছড়িয়ে পড়া ডাল রিংয়ের ওপর দিয়ে ঝুলতে দিন।',
      en: 'Plant 4 cured cuttings around each pillar, tie stems vertically up the post, and let branches drape cleanly over the top ring.',
    },
    fertilizerManagement: {
      bn: 'জৈব সার (গোবর/কেঁচো সার) ড্রাগনের প্রাণ; বর্ষার আগে ও ফলের মৌসুমে সুষম পটাশ-সমৃদ্ধ জৈব-রাসায়নিক সার পিলারের চারপাশে দিন।',
      en: 'Rely heavily on organic compost/vermicompost plus split potash-oriented feeds during the May–November fruiting waves.',
    },
    irrigationSchedule: {
      bn: 'ক্যাকটাস জাতীয় হওয়ায় কম পানি লাগে—শীত-গ্রীষ্মে ১০–১৫ দিন পরপর হালকা সেচ ও খড়ের মাল্চ যথেষ্ট; বর্ষায় জলাবদ্ধতা শিকড় পচায়।',
      en: 'Low water demand as a cactus—light watering every 10–15 days in dry weather suffices; waterlogging rots shallow stems.',
    },
    growthStageCare: [
      {
        stage: { bn: 'ছাতা আকৃতি ছাঁটাই (Canopy Pruning)', en: 'Umbrella Training' },
        guidance: {
          bn: 'রিংয়ের নিচে মূল কাণ্ড থেকে বের হওয়া বাড়তি কুঁড়ি ভেঙে দিন যাতে শক্তি সরাসরি মাথার ছাতায় যায়।',
          en: 'Snap off side shoots below the pillar ring so growth shoots up and drapes cleanly like an umbrella.',
        },
      },
      {
        stage: { bn: 'রাতের ফুল ও ফল পাতলা', en: 'Pollination & Fruit Thinning' },
        guidance: {
          bn: 'ফুল রাতেই ফোটে—একই ডালের মাথায় ২টির বেশি ফল না রেখে বাছাই করলে আকার বড় হয়; রৌদ্রে সানবার্ন এড়ান।',
          en: 'Blooms open at night; thin to 1–2 fruits per branch tip for market sizing and watch for summer sunburn.',
        },
      },
    ],
    weedManagement: {
      bn: 'পিলারের গোড়ায় খড় বা শুকনো পাতার মাল্চ দিয়ে হাত নিড়ানি দিন।',
      en: 'Mulch mounds generously with straw and pull weeds gently by hand.',
    },
    commonDiseasesAndPests: {
      bn: 'স্টেম ও ফ্রুট রট (কাণ্ড-ফল পচা), সানবার্ন (রোদে হলুদ হওয়া), পিঁপড়া ও মিলিবাগ।',
      en: 'Stem/Fruit Rot (fungal/bacterial), Sunburn yellowing, Ants, and Mealybugs.',
    },
    preventionAndSafeManagement: {
      bn: 'সুস্থ-শুকানো কাটিং রোপণ, পচা অংশ ধারালো পরিষ্কার ছুরি দিয়ে কেটে ফেলা, পিঁপড়া দমন ও জৈব দমনের জন্য ১৬১২৩-এ জানুন। কৃত্রিম টনিক/হরমোন অতিব্যবহার বর্জন করুন।',
      en: 'Cure cuttings, excise wet stem rot with clean blades, avoid misuse of growth hormones, and consult 16123 for safe blight care.',
    },
    harvesting: {
      bn: 'ফল ফোটার ৩০–৩৫ দিন পর সবুজ রঙ পুরো গোলাপি-লাল হয়ে কচি পাখনাগুলো সামান্য শুকিয়ে গেলে বোঁটা সমেত ছুরি দিয়ে কাটুন।',
      en: 'Clip cleanly 30–35 days after flowering once skin turns deep magenta-pink and scale tips begin drying.',
    },
    postHarvestStorage: {
      bn: 'কাঁটা বা গা ঘষা না লাগিয়ে প্লাস্টিক ক্রেটে এক স্তরে সাজালে ১ সপ্তাহের বেশি তাজা থাকে।',
      en: 'Arrange single layers in cushioned crates in shade; fruits keep fresh over a week easily.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'পিলার ও কাটিং শুকানো', en: 'Pillar & Cure Cuttings' },
        window: { bn: '১ সপ্তাহ আগে', en: '1 wk pre-plant' },
        action: { bn: 'পিলার-রিং স্থাপন ও কাটিং ছায়ায় শুকানো।', en: 'Set pillars/rings and cure stem cuttings.' },
      },
      {
        step: 2,
        stage: { bn: 'উপরে ওঠা ও ডাল গড়া', en: 'Vertical Training' },
        window: { bn: '১–৮ মাস', en: 'Months 1–8' },
        action: { bn: 'নিচের শাখা ছেঁটে রিংয়ের ওপর ছাতা তৈরি।', en: 'Train main stems up and form umbrella.' },
      },
      {
        step: 3,
        stage: { bn: 'প্রথম ফুল আসা', en: 'Night Blooming' },
        window: { bn: '১২–১৫ মাস', en: 'Months 12–15' },
        action: { bn: 'মে–অক্টোবরে রাতের ফুল ও পরাগায়ন দেখা।', en: 'Monitor May–Oct bloom waves.' },
      },
      {
        step: 4,
        stage: { bn: 'ফল রঙ ধরা', en: 'Fruit Ripening' },
        window: { bn: 'ফুলের ২৫–৩৫ দিন', en: '25–35 days post-bloom' },
        action: { bn: 'অতিরিক্ত ফল পাতলা ও রোদ-পোড়া দেখা।', en: 'Thin clusters and inspect for rot/sunburn.' },
      },
      {
        step: 5,
        stage: { bn: 'দফায় দফায় সংগ্রহ', en: 'Wave Harvests' },
        window: { bn: 'মে–নভেম্বর', en: 'May – Nov' },
        action: { bn: 'লালচে-গোলাপি পাকা ফল ছুরি দিয়ে কাটা।', en: 'Clip deep-pink fruits across multiple waves.' },
      },
    ],
  },
  {
    id: 'coconut',
    name: { bn: 'নারকেল', en: 'Coconut' },
    aliases: ['narikel', 'daab', 'coconut', 'ডাব', 'নারকেল', 'ভিয়েতনাম'],
    category: 'fruit',
    categoryLabel: CROP_CATEGORY_LABELS.fruit,
    imageUrl: CROP_ASSETS.fruits,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'নারকেল বাংলাদেশের উপকূলীয় ও বসতবাড়ির অর্থনীতি ও পরিবেশ সুরক্ষার প্রধান বহুবার্ষিক ফসল। ডাব ও শুকনো নারকেল উভয়ই সারা বছর আয় দেয়।',
      en: 'Coconut is an iconic perennial crop anchoring coastal livelihoods and homesteads across Bangladesh, yielding green tender nuts (Daab) and mature copra year-round.',
    },
    suitableVarieties: {
      bn: 'BARI Narikel-1, BARI Narikel-2, খাটো-মাঝারি হাইব্রিড (ভিয়েতনামি সিয়াম গ্রিন/অরেঞ্জ) ও দেশি লম্বা জাত।',
      en: 'BARI Narikel-1, BARI Narikel-2, dwarf/hybrid lines (Siam Green), and hardy Tall local cultivars.',
    },
    suitableRegions: {
      bn: 'বাগেরহাট, খুলনা, বরিশাল, পটুয়াখালী, ভোলা, নোয়াখালী, লক্ষ্মীপুর, কক্সবাজার ও যশোর।',
      en: 'Concentrated in Bagerhat, Khulna, Barishal, Patuakhali, Bhola, Noakhali, Lakshmipur, Cox’s Bazar, and Jashore.',
    },
    seasonAndPlanting: {
      bn: 'মে থেকে সেপ্টেম্বর (বর্ষা মৌসুম) নতুন চারা রোপণের উত্তম সময়।',
      en: 'Planted during monsoon months (May through September).',
    },
    soilAndPh: {
      bn: 'গভীর, সুনিষ্কাশিত বেলে-দোআঁশ, পলি-দোআঁশ ও হালকা লবণাক্ত উপকূলীয় মাটি; আদর্শ pH ৫.৫ থেকে ৭.৫।',
      en: 'Deep sandy-loam, alluvial silt, and mildly saline coastal soils from pH 5.5 to 7.5.',
    },
    landPreparation: {
      bn: 'লম্বা জাতে ৭.৫–৮ মিটার (খাটো জাতে ৬×৬ মিটার) দূরত্বে ১×১×১ মিটার গর্ত করে কম্পোস্ট, শুকনো নারকেল ছোবড়া (আর্দ্রতার জন্য) ও মাটি দিয়ে ভরাট করুন।',
      en: 'Dig 1×1×1 m pits at 6–8 m spacing; layering coconut husks at pit bottoms retains moisture and softens clay.',
    },
    seedSelectionAndTreatment: {
      bn: '১২ মাস বয়সী মাঝারি-চওড়া, সুস্থ ও গজানো (৯–১২ মাসের চারা) পুরু কাণ্ডযুক্ত চারা নার্সারি থেকে বাছাই করুন।',
      en: 'Choose stout, thick-collared 9–12 month seedlings from certified mother palms.',
    },
    plantingMethod: {
      bn: 'নারকেলের বাদাম (seed nut) গর্তের মাঝখানে বসিয়ে অঙ্কুরের গলা মাটির উপরে রাখুন যাতে জল জমে কুঁড়ি না পচে।',
      en: 'Plant seed nuts cleanly in pit centers keeping the emerging collar just above surrounding soil.',
    },
    fertilizerManagement: {
      bn: 'বর্ষার শুরু ও শেষে বছরে ২ বার গাছ থেকে ১.৫–২ মিটার দূরে গোল রিং করে গোবর, লবণ/পটাশ ও বোরনসহ সুষম সার দিন (ফল ঝরা ঠেকাতে পটাশ ও বোরন জরুরি)।',
      en: 'Feed twice yearly in circular trenches 1.5–2 m from trunk with compost, potash, and boron awareness to reduce premature button shedding.',
    },
    irrigationSchedule: {
      bn: 'চারা অবস্থায় প্রথম ৩ গ্রীষ্মে নিয়মিত পানি ও গোড়ায় ছোবড়া/খড় মাল্চিং দিন; বড় গাছে শুকনো চৈত্র-বৈশাখে সেচ ফলন বাড়ায়।',
      en: 'Water saplings regularly in dry summers; mulching basins with husks and dry leaves conserves moisture.',
    },
    growthStageCare: [
      {
        stage: { bn: 'মাথা পরিষ্কার (Crown Cleaning)', en: 'Crown Sanitation' },
        guidance: {
          bn: 'শুকনো ডাঁটা, আগাছা ও বাদামি মরা কচি নারকেল সরিয়ে দিন যাতে গন্ডার পোকা আশ্রয় না পায়।',
          en: 'Remove dry fronds, debris, and fallen nuts from crowns to discourage rhinoceros beetle breeding.',
        },
      },
      {
        stage: { bn: 'সাদা মাছি ও ছিদ্র পোকা নজরদারি', en: 'Whitefly & Weevil Care' },
        guidance: {
          bn: 'পাতার নিচে সাদা তুলার মতো স্পাইরালিং হোয়াইটফ্লাই দেখলে জোরালো পানি স্প্রে বা নিম তেল ব্যবহার করুন।',
          en: 'Monitor frond undersides for rugose spiraling whitefly and keep trunks free of cuts that attract red palm weevil.',
        },
      },
    ],
    weedManagement: {
      bn: 'গাছের ২ মিটার চারপাশ পরিষ্কার রাখুন; মাঝের খালি জমিতে আদা, হলুদ বা সবজি সাথী ফসল করা যায়।',
      en: 'Keep 2-m basins clear and intercrop open shade spaces with turmeric, ginger, or pineapple.',
    },
    commonDiseasesAndPests: {
      bn: 'গন্ডার পোকা (Rhinoceros Beetle), লাল পাম উইভিল, রুগোজ স্পাইরালিং সাদা মাছি, মাকড় ও কুঁড়ি পচা (Bud Rot)।',
      en: 'Rhinoceros Beetle, Red Palm Weevil, Rugose Spiraling Whitefly, Eriophyid Mite, and Bud Rot.',
    },
    preventionAndSafeManagement: {
      bn: 'কম্পোস্টের স্তূপ পরিষ্কার রাখা (গন্ডার পোকার ডিম নষ্ট), ডগার পাতায় বালি-নিমখোল প্রাকৃতিক বাধা এবং কুঁড়ি পচায় ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Destroy beetle grubs in manure pits, avoid wounding trunks, and consult 16123 promptly if central spear leaves wilt.',
    },
    harvesting: {
      bn: 'খাটো জাত ৩–৪ বছরে ও লম্বা জাত ৫–৭ বছরে ফল ধরে; ডাবের জন্য ৬–৭ মাসের এবং শুকনো নারকেলের জন্য ১১–১২ মাসের ছড়া কাটুন।',
      en: 'Dwarf hybrids bear in 3–4 years, Tall lines in 5–7 years; cut bunches at 6–7 months for tender Daab or 11–12 months for mature nuts.',
    },
    postHarvestStorage: {
      bn: 'শুকনো নারকেল বায়ুচলাচলযুক্ত শুষ্ক মেঝেতে স্তূপ করে রাখলে কয়েক মাস ভালো থাকে।',
      en: 'Stack mature husked or unhusked coconuts in dry, ventilated sheds.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'গর্ত ও চারা রোপণ', en: 'Pit & Sapling Plant' },
        window: { bn: 'বর্ষা (জুন–আগস্ট)', en: 'Monsoon (Jun–Aug)' },
        action: { bn: 'ছোবড়া-কম্পোস্ট গর্তে সুস্থ চারা রোপণ।', en: 'Plant stout seedling in husk-lined pit.' },
      },
      {
        step: 2,
        stage: { bn: 'তরুণ গাছ পরিচর্যা', en: 'Juvenile Upkeep' },
        window: { bn: '১–৩ বছর', en: 'Years 1–3' },
        action: { bn: 'গ্রীষ্মে পানি, মাল্চিং ও গরু-ছাগল বেড়া।', en: 'Dry-season watering, mulching, and fencing.' },
      },
      {
        step: 3,
        stage: { bn: 'প্রথম ছড়া আসা', en: 'First Flowering' },
        window: { bn: '৩.৫–৬ বছর (জাতভেদে)', en: 'Yrs 3.5–6 (by var.)' },
        action: { bn: 'পটাশ-বোরন পুষ্টি ও গন্ডার পোকা দেখা।', en: 'Support potash/boron and crown hygiene.' },
      },
      {
        step: 4,
        stage: { bn: 'ডাব সংগ্রহ', en: 'Tender Daab Cut' },
        window: { bn: 'ফুলের ৬–৭ মাস পর', en: '6–7 mos post-bloom' },
        action: { bn: 'মিষ্টি পানি ভরা ডাবের ছড়া নামানো।', en: 'Harvest green bunches cleanly by rope.' },
      },
      {
        step: 5,
        stage: { bn: 'পরিপক্ব নারকেল', en: 'Mature Nut Harvest' },
        window: { bn: '১১–১২ মাস (ধারাবাহিক)', en: '11–12 mos (Ongoing)' },
        action: { bn: 'প্রতি ৪৫–৬০ দিনে পাকা ছড়া সংগ্রহ।', en: 'Harvest dry brown bunches every 45–60 days.' },
      },
    ],
  },
  {
    id: 'watermelon',
    name: { bn: 'তরমুজ', en: 'Watermelon' },
    aliases: ['tormuj', 'tarbuz', 'তরমুজ', 'উপকূলীয়'],
    category: 'fruit',
    categoryLabel: CROP_CATEGORY_LABELS.fruit,
    imageUrl: CROP_ASSETS.fruits,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'তরমুজ বাংলাদেশের উপকূলীয় অঞ্চল ও চরাঞ্চলের অতি লাভজনক রবি-গ্রীষ্মকালীন ফল। কালচে-সবুজ গোল ও বড় জাত কৃষকের প্রধান অর্থকরী ফসলে পরিণত হয়েছে।',
      en: 'Watermelon is a premier cash fruit across southern coastal plains and river chars during late winter and spring.',
    },
    suitableVarieties: {
      bn: 'বারি তরমুজ-১, বাংলালিংক, পাকিজা, জাগুয়ার, ভিক্টর সুপার ও গোল কালো হাইব্রিড জাত।',
      en: 'BARI Tormuj-1 and popular dark-green commercial F1 hybrids.',
    },
    suitableRegions: {
      bn: 'পটুয়াখালী, ভোলা, বরগুনা, খুলনা, বরিশাল, চট্টগ্রাম (পতেঙ্গা-আনোয়ারা), রাজশাহী ও নদী-চরাঞ্চল।',
      en: 'Major commercial belts in Patuakhali, Bhola, Barguna, Khulna, Barishal, Chattogram, and river chars.',
    },
    seasonAndPlanting: {
      bn: 'জানুয়ারি থেকে ফেব্রুয়ারি (মাঘ–ফাল্গুন) মূল রোপণের সময় যাতে এপ্রিলের গরমে বাজার পাওয়া যায়।',
      en: 'Planted January to February for peak April–May summer harvests.',
    },
    soilAndPh: {
      bn: 'গভীর, সুনিষ্কাশিত বেলে-দোআঁশ ও চরের পলি-বেলে মাটি; অনুকূল pH ৬.০ থেকে ৭.০।',
      en: 'Deep, warm, well-drained sandy-loam and riverine silt-sand soils around pH 6.0 to 7.0.',
    },
    landPreparation: {
      bn: '২×২ মিটার বা ২.৫×১.৫ মিটার দূরত্বে প্রশস্ত বেড ও মাদা তৈরি করে পচা গোবর ও কম্পোস্ট মিশিয়ে মাল্চিংয়ের ব্যবস্থা করুন।',
      en: 'Prepare wide beds with composted pits spaced 2–2.5 m apart and perimeter drainage furrows.',
    },
    seedSelectionAndTreatment: {
      bn: 'অঙ্কুরোদগম ত্বরান্বিত করতে বীজ রাতভর ভিজিয়ে ভেজা চট বা পলি-কাপড়ে গজিয়ে মাদায় বা পলি-ব্যাগে রোপণ করুন।',
      en: 'Soak seeds overnight and pre-sprout in warm damp cloth or small polybags for uniform early stands.',
    },
    plantingMethod: {
      bn: 'পলিমাল্চ বা শুকনো খড়ের ওপর লতা ছড়াতে দিন; প্রতি মাদায় ২টি সুস্থ গাছ রাখুন।',
      en: 'Keep 2 healthy vines per pit and allow runners to spread cleanly over straw or plastic mulch.',
    },
    fertilizerManagement: {
      bn: 'মাদায় জৈব সার ও পর্যাপ্ত পটাশ-সালফার-বোরন দিলে ফল ভারী ও অত্যন্ত মিষ্টি হয়।',
      en: 'Pair pit compost with balanced potassium and boron support during fruit expansion for deep color and sweetness.',
    },
    irrigationSchedule: {
      bn: 'ফুল ও ফল বৃদ্ধির সময় নিয়মিত হালকা সেচ দিন; ফল পাকার ৭–১০ দিন আগে সেচ বন্ধ করলে মিষ্টতা (Brix) বাড়ে ও ফল ফাটা কমে।',
      en: 'Water lightly and steadily until full sizing, then stop watering 7–10 days before harvest to boost sweetness and prevent bursting.',
    },
    growthStageCare: [
      {
        stage: { bn: 'লতা ছাঁটাই ও ফল রাখা', en: 'Vine & Fruit Thinning' },
        guidance: {
          bn: 'অতিরিক্ত ও বাঁকা কচি ফল সরিয়ে প্রতি গাছে ২–৩টি সুগঠিত ফল রাখলে ওজন ও দাম ভালো পাওয়া যায়।',
          en: 'Keep only 2–3 well-shaped fruits per vine and place straw pads underneath against soil rot.',
        },
      },
      {
        stage: { bn: 'ফলের গায়ে খড় ও ঘোরানো', en: 'Sunburn & Fly Protection' },
        guidance: {
          bn: 'কড়া রোদে ফলের ওপরে সামান্য শুকনো লতা/খড় দিন ও কিউ-লিউর ফেরোমন ফাঁদ রাখুন।',
          en: 'Shade swelling melons lightly with dry grass caps and maintain cue-lure fly traps.',
        },
      },
    ],
    weedManagement: {
      bn: 'মাদার গোড়া ও সারির আগাছা লতা ছড়ানোর আগেই নিড়ানি দিয়ে পরিষ্কার করুন।',
      en: 'Weed pits cleanly before trailing vines cover the bed surface.',
    },
    commonDiseasesAndPests: {
      bn: 'গামি স্টেম ব্লাইট (আঠা ঝরা রোগ), ফিউসারিয়াম উইল্ট, ডাউনি মিলডিউ, ফলের মাছি পোকা ও লাল পামকিন বিটল।',
      en: 'Gummy Stem Blight, Fusarium Wilt, Downy Mildew, Fruit Fly, and Red Pumpkin Beetle.',
    },
    preventionAndSafeManagement: {
      bn: 'একই জমিতে পরপর তরমুজ না করা (ফসল আবর্তন), ভালো নিকাশ ব্যবস্থা এবং উইল্ট/স্টেম ব্লাইটের লক্ষণে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Rotate out of cucurbits annually, avoid wetting leaves during irrigation, and consult 16123 for gummy stem blight.',
    },
    harvesting: {
      bn: 'ফলের বোঁটার কাছের আকর্ষী (tendril) শুকিয়ে গেলে, মাটির অংশে হলদেটে রঙ ও টোকা দিলে গম্ভীর ঢোল-শব্দ হলে কাটুন।',
      en: 'Cut when the tendril nearest the fruit stem dries brown, the ground spot turns creamy yellow, and tapping sounds deep and dull.',
    },
    postHarvestStorage: {
      bn: 'ট্রাক বা ভ্যানে খড় বিছিয়ে সাবধানে সাজিয়ে রাখুন; ধাক্কা বা ফাটা তরমুজ আলাদা করুন।',
      en: 'Pad transport floors generously with straw and separate any cracked melons immediately.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'গজানো বীজ রোপণ', en: 'Pre-Sprout & Plant' },
        window: { bn: 'জানুয়ারি–ফেব্রুয়ারি', en: 'Jan – Feb' },
        action: { bn: 'কম্পোস্টযুক্ত মাদায় অঙ্কুরিত বীজ বপন।', en: 'Plant sprouted seed in composted pits.' },
      },
      {
        step: 2,
        stage: { bn: 'লতা ছড়ানো ও খড়', en: 'Vining & Straw Bed' },
        window: { bn: '২০–৩০ দিন', en: 'Days 20–30' },
        action: { bn: 'বিটল দমন, নিড়ানি ও খড় বিছানো।', en: 'Weed pits and lay dry straw bedding.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল ও পরাগায়ন', en: 'Blooming & Traps' },
        window: { bn: '৪০–৫৫ দিন', en: 'Days 40–55' },
        action: { bn: 'মৌমাছি রক্ষা, ফাঁদ ও কচি ফল বাছাই।', en: 'Set fly traps and select 2–3 uniform fruits.' },
      },
      {
        step: 4,
        stage: { bn: 'ফল পুষ্ট ও পাকা', en: 'Maturation' },
        window: { bn: '৬৫–৮০ দিন', en: 'Days 65–80' },
        action: { bn: 'শেষ ৭–১০ দিন সেচ বন্ধ করে মিষ্টতা বৃদ্ধি।', en: 'Withhold water late to concentrate sweetness.' },
      },
      {
        step: 5,
        stage: { bn: 'সংগ্রহ ও পরিবহন', en: 'Harvest & Haul' },
        window: { bn: '৮৫–৯৫ দিন', en: 'Days 85–95' },
        action: { bn: 'আকর্ষী শুকালে ও গম্ভীর শব্দে কাটা।', en: 'Cut ripe melons cleanly onto straw pads.' },
      },
    ],
  },
];
