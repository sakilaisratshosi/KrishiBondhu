import { BilingualText } from '../types/krishi';
import { CropCultivationGuide } from './cropCultivationData';

export type SoilTypeKey =
  | 'loamy'
  | 'clay'
  | 'sandy'
  | 'silty'
  | 'terrace_loam';

export type GrowthStageKey =
  | 'planting'
  | 'vegetative'
  | 'flowering'
  | 'ripening';

export type SoilMoistureKey = 'dry' | 'moist' | 'waterlogged';

export interface SoilTypeProfile {
  key: SoilTypeKey;
  name: BilingualText;
  waterRetention: BilingualText;
  drainageSpeed: BilingualText;
  characteristics: BilingualText;
  suitableCrops: BilingualText;
  careTips: BilingualText[];
}

export const SOIL_TYPE_PROFILES: SoilTypeProfile[] = [
  {
    key: 'clay',
    name: { bn: 'এঁটেল মাটি (Clay Soil)', en: 'Clay Soil' },
    waterRetention: { bn: 'অত্যধিক পানি ধারণক্ষমতা', en: 'Very High Retention' },
    drainageSpeed: { bn: 'ধীর নিষ্কাশন', en: 'Slow Drainage' },
    characteristics: {
      bn: 'কণা খুব মিহি হওয়ায় পানি ধরে রাখে দীর্ঘক্ষণ, শুকালে শক্ত হয়ে ফেটে যায় এবং ভেজা অবস্থায় আঠালো থাকে।',
      en: 'Fine particles hold water tightly; soil turns sticky when wet and hard or cracked when dry.',
    },
    suitableCrops: {
      bn: 'বোরো ও আমন ধান, পাট এবং বর্ষা-পরবর্তী পর্যাপ্ত নিষ্কাশনযুক্ত ডাল ও তৈলবীজ।',
      en: 'Boro & Aman rice, jute, and post-monsoon crops where drainage channels are maintained.',
    },
    careTips: [
      {
        bn: 'জৈব সার ও পচা গোবর মেশালে মাটি ঝুরঝুরে হয় ও বায়ু চলাচল বাড়ে।',
        en: 'Add compost or well-rotted manure to loosen heavy particles and improve root aeration.',
      },
      {
        bn: 'খুব ভেজা অবস্থায় চাষ দেবেন না—মাটি চাকা বেঁধে শক্ত হতে পারে।',
        en: 'Avoid ploughing when overly wet to prevent clodding and soil compaction.',
      },
      {
        bn: 'সবজি বা শুষ্ক ফসলের জন্য উঁচু বেড ও চারপাশে পানি নিকাশের নালা তৈরি করুন।',
        en: 'Form raised beds with perimeter drainage trenches for vegetables and upland crops.',
      },
    ],
  },
  {
    key: 'sandy',
    name: { bn: 'বেলে মাটি (Sandy Soil)', en: 'Sandy Soil' },
    waterRetention: { bn: 'কম পানি ধারণক্ষমতা', en: 'Low Water Retention' },
    drainageSpeed: { bn: 'দ্রুত নিষ্কাশন', en: 'Fast Drainage' },
    characteristics: {
      bn: 'কণা বড় ও ফাঁকা হওয়ায় পানি ও পুষ্টি দ্রুত নিচে চলে যায়। চরাঞ্চল ও নদীর তীরবর্তী এলাকায় বেশি দেখা যায়।',
      en: 'Coarse texture drains water and mobile nutrients rapidly; common along riverbanks and char lands.',
    },
    suitableCrops: {
      bn: 'তরমুজ, বাদাম, মিষ্টি আলু, পেঁয়াজ, রসুন ও আগাম সবজি (জৈব সারসহ)।',
      en: 'Watermelon, groundnut, sweet potato, onion, garlic, and upland vegetables when enriched with compost.',
    },
    careTips: [
      {
        bn: 'কম্পোস্ট, কেঁচো সার বা ধৈঞ্চা সবুজ সার মেশালে মাটির রস ধরে রাখার ক্ষমতা বাড়ে।',
        en: 'Incorporate compost, vermicompost, or green manure to boost water and nutrient holding.',
      },
      {
        bn: 'মাটির উপরিভাগ খড় বা শুকনো পাতা দিয়ে ঢেকে (মাল্চিং) বাষ্পীভবন কমান।',
        en: 'Apply straw or leaf mulch to slow moisture evaporation and keep roots cool.',
      },
      {
        bn: 'একবারে বেশি সেচ না দিয়ে প্রয়োজন বুঝে হালকা ও ঘনঘন সেচ দিন।',
        en: 'Prefer lighter, well-timed irrigations and split nutrient applications rather than heavy soaking.',
      },
    ],
  },
  {
    key: 'loamy',
    name: { bn: 'দোআঁশ মাটি (Loamy Soil)', en: 'Loamy Soil' },
    waterRetention: { bn: 'সুষম পানি ধারণক্ষমতা', en: 'Balanced Retention' },
    drainageSpeed: { bn: 'স্বাভাবিক ও সুষম নিষ্কাশন', en: 'Well-Balanced Drainage' },
    characteristics: {
      bn: 'বালি, পলি ও কাদার সুষম মিশ্রণ থাকায় অধিকাংশ ফসলের শিকড় বৃদ্ধি ও পুষ্টি গ্রহণের জন্য এটি আদর্শ মাটি।',
      en: 'A balanced blend of sand, silt, and clay offering ideal aeration, moisture holding, and root penetration.',
    },
    suitableCrops: {
      bn: 'ধান, গম, ভুট্টা, আলু, টমেটো, বেগুন, মরিচ, সরিষা, পেঁপে ও আমসহ প্রায় সব ফসল।',
      en: 'Rice, wheat, maize, potato, tomato, eggplant, chili, mustard, papaya, mango, and most crops.',
    },
    careTips: [
      {
        bn: 'নিয়মিত জৈব সার ও শস্য আবর্তন (যেমন ডাল ফসল) বজায় রেখে মাটির স্বাস্থ্য ধরে রাখুন।',
        en: 'Preserve fertility through regular compost additions and legume crop rotations.',
      },
      {
        bn: 'ফসলের অবশিষ্টাংশ না পুড়িয়ে মাটিতে মিশিয়ে দিলে জৈব পদার্থ বাড়ে।',
        en: 'Incorporate crop residues instead of burning to sustain beneficial soil microbes.',
      },
    ],
  },
  {
    key: 'silty',
    name: { bn: 'পলি মাটি (Silty Soil)', en: 'Silty Soil' },
    waterRetention: { bn: 'মধ্যম থেকে উচ্চ ধারণক্ষমতা', en: 'Moderate-High Retention' },
    drainageSpeed: { bn: 'মাঝারি নিষ্কাশন', en: 'Moderate Drainage' },
    characteristics: {
      bn: 'বন্যার পলি জমে তৈরি উর্বর ও মসৃণ মাটি; খনিজ পুষ্টিতে সমৃদ্ধ, তবে ভারী বৃষ্টিতে উপরের স্তরে শক্ত পাতলা আস্তরণ পড়তে পারে।',
      en: 'Alluvial floodplain soil rich in natural minerals; smooth and fertile, though heavy rain can crust the surface.',
    },
    suitableCrops: {
      bn: 'পাট, ধান, পেঁয়াজ, রসুন, সরিষা, মসুর ডাল ও শীতকালীন সবজি।',
      en: 'Jute, rice, onion, garlic, mustard, lentil, and winter vegetables.',
    },
    careTips: [
      {
        bn: 'বৃষ্টি বা সেচের পর মাটির উপরিভাগ শক্ত হলে হালকা নিড়ানি দিয়ে ভেঙে দিন।',
        en: 'Break surface crusting lightly after rain or irrigation so seedlings breathe easily.',
      },
      {
        bn: 'মাল্চিং ও জৈব সার ব্যবহার করলে মাটির গঠন আরও টেকসই হয়।',
        en: 'Use organic mulch and compost to stabilize soil structure.',
      },
    ],
  },
  {
    key: 'terrace_loam',
    name: {
      bn: 'বেলে-দোআঁশ, এঁটেল-দোআঁশ ও লালচে অম্লীয় মাটি',
      en: 'Sandy Loam, Clay Loam & Terrace Soils',
    },
    waterRetention: { bn: 'মাটি ভেদে পরিবর্তনশীল', en: 'Varies by Blend' },
    drainageSpeed: { bn: 'মাঝারি থেকে দ্রুত', en: 'Moderate to Good' },
    characteristics: {
      bn: 'বরেন্দ্র, মধুপুর গড় ও পাহাড়ি অঞ্চলের লালচে বা দোআঁশ মিশ্রিত মাটি অনেক সময় অম্লীয় (কম pH) ও জৈব পদার্থে ঘাটতিযুক্ত হতে পারে।',
      en: 'Upland terrace and piedmont soils (such as Barind and Madhupur tracts) may lean slightly acidic and lower in organic matter.',
    },
    suitableCrops: {
      bn: 'আম, কলা, পেঁপে, ভুট্টা, আলু, সবজি ও রোপা আমন ধান।',
      en: 'Mango, banana, papaya, maize, potato, vegetables, and rain-fed Aman rice.',
    },
    careTips: [
      {
        bn: 'অম্লতা যাচাই করতে মাটি পরীক্ষা করুন এবং কৃষি অফিসের পরামর্শে চুন বা ডলোমাইট ব্যবহার করুন।',
        en: 'Test soil pH locally; if acidic, agricultural lime/dolomite may be advised by officers.',
      },
      {
        bn: 'মাটিতে প্রচুর কম্পোস্ট ও মাল্চিং দিলে খরা সহনশীলতা বাড়ে।',
        en: 'Generous compost and surface mulching buffer moisture during dry upland spells.',
      },
    ],
  },
];

export interface SoilHealthCardItem {
  id: string;
  title: BilingualText;
  summary: BilingualText;
  keyPoints: BilingualText[];
}

export const SOIL_HEALTH_TOPICS: SoilHealthCardItem[] = [
  {
    id: 'ph',
    title: { bn: 'মাটির অম্ল-ক্ষার মাত্রা (Soil pH)', en: 'Soil pH Balance' },
    summary: {
      bn: 'অধিকাংশ ফসল সামান্য অম্লীয় থেকে নিরপেক্ষ মাটিতে (প্রায় pH ৬.০–৭.০) সবচেয়ে ভালো পুষ্টি গ্রহণ করতে পারে।',
      en: 'Most crops absorb nutrients best in slightly acidic to neutral soil (around pH 6.0–7.0).',
    },
    keyPoints: [
      {
        bn: 'মাটি অতিরিক্ত অম্লীয় হলে ফসফরাস ও ক্যালসিয়াম আটকে যায় এবং শিকড় দুর্বল হয়।',
        en: 'Strongly acidic soil locks up phosphorus and stresses root development.',
      },
      {
        bn: 'চুন বা সংশোধন ব্যবহারের আগে মৃত্তিকা সম্পদ উন্নয়ন ইনস্টিটিউট (SRDI) বা উপজেলা কৃষি অফিসে মাটি পরীক্ষা করান।',
        en: 'Always verify soil pH via SRDI or Upazila testing before applying lime or sulfur amendments.',
      },
    ],
  },
  {
    id: 'organic-matter',
    title: {
      bn: 'জৈব পদার্থ ও মাটির উর্বরতা',
      en: 'Soil Fertility & Organic Matter',
    },
    summary: {
      bn: 'মাটির প্রাণ হলো জৈব পদার্থ। এটি বেলে মাটিতে পানি ধরে রাখে এবং এঁটেল মাটিকে নরম ও বাতাস চলাচলযোগ্য করে।',
      en: 'Organic matter acts as a living sponge—boosting moisture retention in sandy plots and loosening tight clay.',
    },
    keyPoints: [
      {
        bn: 'ভালো পচা গোবর, কম্পোস্ট ও কেঁচো সার নিয়মিত দিলে রাসায়নিক সারের কার্যকারিতা বাড়ে।',
        en: 'Well-decomposed cow dung, compost, and vermicompost make mineral nutrients more effective.',
      },
      {
        bn: 'ফসলের মাঝে ডাল ফসল বা ধৈঞ্চা চাষ করলে প্রাকৃতিকভাবে উর্বরতা ফিরে আসে।',
        en: 'Rotating pulses or Dhaincha green manure naturally rebuilds soil fertility.',
      },
    ],
  },
  {
    id: 'nutrients',
    title: {
      bn: 'উদ্ভিদের অত্যাবশ্যকীয় পুষ্টি উপাদান',
      en: 'Essential Plant Nutrients',
    },
    summary: {
      bn: 'গাছের সুস্থ বৃদ্ধির জন্য মুখ্য পুষ্টি (নাইট্রোজেন, ফসফরাস, পটাশ) এবং গৌণ ও অণুপুষ্টি (সালফার, জিংক, বোরন) সুষমভাবে থাকা দরকার।',
      en: 'Crops require balanced primary nutrients (N, P, K) alongside critical secondary and micronutrients (S, Zn, B).',
    },
    keyPoints: [
      {
        bn: 'নাইট্রোজেন পাতার সবুজ বৃদ্ধি, ফসফরাস শিকড় ও ফুল এবং পটাশ রোগ প্রতিরোধ ও দানার ওজন বাড়ায়।',
        en: 'Nitrogen drives leafy growth, phosphorus supports roots/flowers, and potassium strengthens disease resistance and grain weight.',
      },
      {
        bn: 'সালফার, জিংক বা বোরনের ঘাটতি ফসল ও অঞ্চলভেদে ভিন্ন হয়—অনুমান করে নয়, মাটি পরীক্ষার আলোকে প্রয়োগ করুন।',
        en: 'Sulfur, zinc, and boron needs vary by plot and variety—rely on soil tests rather than guesswork.',
      },
    ],
  },
  {
    id: 'prep-maintenance',
    title: {
      bn: 'মাটি তৈরি ও দীর্ঘমেয়াদি পরিচর্যা',
      en: 'Soil Preparation & Maintenance',
    },
    summary: {
      bn: 'অতিরিক্ত বা অসময়ে চাষ মাটির গঠন নষ্ট করে। উপযুক্ত জো (রস) থাকা অবস্থায় জমি তৈরি করলে বীজ ভালো গজায়।',
      en: 'Preparing land at optimal soil moisture ("Jo" condition) prevents clods and gives uniform germination.',
    },
    keyPoints: [
      {
        bn: 'ফসলের শিকড়ের গভীরতা অনুযায়ী শস্য পর্যায় (যেমন ধান–সরিষা–পাট বা ধান–আলু) অনুসরণ করুন।',
        en: 'Alternate shallow- and deep-rooted crops across seasons to balance topsoil nutrients.',
      },
      {
        bn: 'উঁচু জমিতে বৃষ্টির পানি ধরে রাখতে আইল ও খড়ের মাল্চ ব্যবহার করুন।',
        en: 'Use straw mulching and intact bunds to protect topsoil from erosion.',
      },
    ],
  },
];

export interface IrrigationStageGuide {
  stage: BilingualText;
  waterNeed: BilingualText;
  guidance: BilingualText;
}

export const IRRIGATION_STAGE_GUIDES: IrrigationStageGuide[] = [
  {
    stage: { bn: '১. বীজ বপন ও চারা প্রতিষ্ঠা', en: '1. Planting & Establishment' },
    waterNeed: { bn: 'হালকা ও সমান আর্দ্রতা', en: 'Light, Even Moisture' },
    guidance: {
      bn: 'অঙ্কুরোদগম ও শিকড় গজানোর সময় মাটি যেন শুকিয়ে কাঠ না হয়, আবার ডুবে গিয়ে বীজ পচেও না যায়।',
      en: 'Keep the top root zone gently moist for sprouting without drowning seeds or young roots.',
    },
  },
  {
    stage: { bn: '২. কুশি ও শাখা-পাতা বৃদ্ধি', en: '2. Vegetative Growth' },
    waterNeed: { bn: 'নিয়মিত সহনীয় রস', en: 'Steady Moderate Supply' },
    guidance: {
      bn: 'মাটির ধরন দেখে (বেলে মাটিতে ঘনঘন হালকা, এঁটেল-দোআঁশে ব্যবধান রেখে) সেচ দিন। বোরো ধানে AWD পদ্ধতি অনুসরণযোগ্য।',
      en: 'Adjust intervals by soil texture; Boro paddy benefits from Alternate Wetting and Drying (AWD) water saving.',
    },
  },
  {
    stage: { bn: '৩. ফুল, থোড় ও ফল/দানা বাঁধা', en: '3. Flowering & Grain/Fruit Set' },
    waterNeed: { bn: 'সবচেয়ে সংবেদনশীল পর্যায়', en: 'Most Moisture-Sensitive Stage' },
    guidance: {
      bn: 'এ সময়ের খরা ফল বা দানা ঝরিয়ে দিতে পারে—বৃষ্টির অভাব হলে অগ্রাধিকার ভিত্তিতে পরিমিত সেচ নিশ্চিত করুন।',
      en: 'Dry stress during flowering or fruit sizing directly lowers yields—prioritize timely irrigation if rain is absent.',
    },
  },
  {
    stage: { bn: '৪. পরিপক্বতা ও ফসল সংগ্রহ পূর্ব', en: '4. Ripening & Pre-Harvest' },
    waterNeed: { bn: 'সেচ কমানো বা বন্ধ করা', en: 'Taper Off or Drain' },
    guidance: {
      bn: 'ধান, গম, আলু, পেঁয়াজ ও তরমুজ পাকার আগে সেচ বন্ধ করলে গুণমান, মিষ্টতা ও সংরক্ষণ ক্ষমতা বাড়ে।',
      en: 'Gradually stop irrigation before harvest for rice, wheat, potato, onion, and watermelon to improve storage and quality.',
    },
  },
];

export const SOIL_IMPROVEMENT_PILLARS: {
  id: string;
  title: BilingualText;
  description: BilingualText;
  practices: BilingualText[];
}[] = [
  {
    id: 'compost',
    title: { bn: 'কম্পোস্ট ও জৈব পদার্থ বৃদ্ধি', en: 'Compost & Organic Matter' },
    description: {
      bn: 'কৃত্রিম সারের ওপর একক নির্ভরতা কমিয়ে মাটির প্রাণশক্তি ও উপকারী অণুজীব ফিরিয়ে আনুন।',
      en: 'Build long-term soil life and moisture resilience while reducing over-reliance on synthetic inputs.',
    },
    practices: [
      {
        bn: 'খামারের গোবর, খড়, কচুরিপানা ও সবজির উচ্ছিষ্ট পচিয়ে কম্পোস্ট বা কেঁচো সার তৈরি করুন।',
        en: 'Compost farmyard manure, straw, water hyacinth, and kitchen scraps into dark, crumbly humus.',
      },
      {
        bn: 'বর্ষার আগে বা দুই ফসলের মাঝে ধৈঞ্চা চাষ করে ফুল আসার আগে মাটিতে মিশিয়ে দিন।',
        en: 'Grow Dhaincha green manure between crops and plough it under before flowering.',
      },
    ],
  },
  {
    id: 'nutrients',
    title: {
      bn: 'দায়িত্বশীল পুষ্টি ও সার ব্যবস্থাপনা',
      en: 'Responsible Nutrient Management',
    },
    description: {
      bn: 'অতিরিক্ত ইউরিয়া গাছ নরম করে রোগ-পোকা বাড়ায় এবং ভূগর্ভস্থ পানি দূষিত করে।',
      en: 'Excess nitrogen softens crops, attracts pests and fungal disease, and wastes farmer money.',
    },
    practices: [
      {
        bn: 'মাটির স্বাস্থ্য পরীক্ষা ও লিফ কালার চার্ট (LCC) বা কৃষি অফিসের পরামর্শ মেনে সার ব্যবহার করুন।',
        en: 'Base nutrient decisions on SRDI soil testing, Leaf Color Charts (LCC), and local extension officers.',
      },
      {
        bn: 'একবারে সব সার না দিয়ে ফসলের চাহিদা অনুযায়ী ২–৩ কিস্তিতে প্রয়োগ করুন।',
        en: 'Split nitrogen across growth stages instead of dumping large single applications.',
      },
    ],
  },
  {
    id: 'conservation',
    title: { bn: 'মাটি ও পানি সংরক্ষণ চর্চা', en: 'Soil & Water Conservation' },
    description: {
      bn: 'ক্ষয় রোধ ও আর্দ্রতা সংরক্ষণ করলে জলবায়ু পরিবর্তনের ঝুঁকি (SDG 2.4) মোকাবিলা সহজ হয়।',
      en: 'Conserving topsoil and moisture directly builds climate resilience under UN SDG 2.4.',
    },
    practices: [
      {
        bn: 'সবজি ও ফল বাগানে খড়ের মাল্চিং ব্যবহার করে বাষ্পীভবন ও আগাছা কমান।',
        en: 'Spread organic straw mulch around vegetables and orchards to cut evaporation and weed pressure.',
      },
      {
        bn: 'বৃষ্টি শুরু হওয়ার আগে উঁচু বেডের পাশের নালা পরিষ্কার রাখুন যাতে জলাবদ্ধতা না হয়।',
        en: 'Keep perimeter drainage furrows clear ahead of monsoon or forecast downpours.',
      },
    ],
  },
];

export interface SoilPlannerDemoResult {
  irrigationAction: BilingualText;
  soilCareAction: BilingualText;
  nutrientNote: BilingualText;
  drainageWatch: BilingualText;
}

export function generateSoilIrrigationDemoPlan(
  crop: CropCultivationGuide,
  soilKey: SoilTypeKey,
  stage: GrowthStageKey,
  moisture: SoilMoistureKey
): SoilPlannerDemoResult {
  const soil =
    SOIL_TYPE_PROFILES.find((s) => s.key === soilKey) || SOIL_TYPE_PROFILES[2];

  // Irrigation logic based on moisture + stage + soil + crop water sensitivity
  let irrigationAction: BilingualText;
  if (moisture === 'waterlogged') {
    irrigationAction =
      crop.id === 'rice' && stage !== 'ripening'
        ? {
            bn: `${crop.name.bn} জমিতে অতিরিক্ত গভীর পানি থাকলে হালকা মাত্রায় নামিয়ে আনুন এবং নতুন করে সেচ দেবেন না।`,
            en: `Lower excess deep standing water in ${crop.name.en} to a shallow level and hold any new irrigation.`,
          }
        : {
            bn: `${crop.name.bn} জমিতে এখনই কোনো সেচ দেবেন না। দ্রুত অতিরিক্ত পানি সরিয়ে শিকড় বাঁচান।`,
            en: `Do NOT irrigate ${crop.name.en} right now. Drain standing water promptly to protect roots from rot.`,
          };
  } else if (stage === 'ripening') {
    irrigationAction = {
      bn: `${crop.name.bn} পরিপক্বতা পর্যায়ে রয়েছে—সংগ্রহের আগে সেচ কমিয়ে বা বন্ধ করে দিন যাতে ফলন ও সংরক্ষণ মান ভালো থাকে।`,
      en: `${crop.name.en} is nearing maturity—gradually reduce or stop irrigation so harvest quality and storage stay high.`,
    };
  } else if (moisture === 'dry') {
    irrigationAction =
      soilKey === 'sandy'
        ? {
            bn: `বেলে মাটি দ্রুত শুকায় এবং ${crop.name.bn} বর্তমানে শুষ্ক অবস্থায় আছে—বৃষ্টির পূর্বাভাস না থাকলে হালকা সেচ ও খড়ের মাল্চিং দিন।`,
            en: `Sandy soil dries quickly and ${crop.name.en} shows dry conditions—if no rain is forecast, apply light irrigation plus mulch.`,
          }
        : {
            bn: `${crop.name.bn} ও ${soil.name.bn}-এ মাটি শুষ্ক হওয়ায় বৃষ্টির পূর্বাভাস যাচাই করে গোড়ায় বা নালায় পরিমিত সেচ দিন।`,
            en: `Check the local rain forecast, then provide measured root-zone or furrow moisture for ${crop.name.en} on ${soil.name.en}.`,
          };
  } else {
    irrigationAction = {
      bn: `মাটিতে সহনীয় রস রয়েছে। অযথা সেচ না দিয়ে বৃষ্টির পূর্বাভাস ও গাছের পাতা পর্যবেক্ষণ করুন।`,
      en: `Soil moisture is currently balanced. Hold irrigation for now and watch upcoming rainfall forecasts.`,
    };
  }

  // Soil care tailored to soil type
  const soilCareAction: BilingualText =
    soilKey === 'clay'
      ? {
          bn: 'এঁটেল মাটি শক্ত হওয়া বা জল জমা রোধে জৈব কম্পোস্ট মেশান এবং সবজির জন্য উঁচু সারিবদ্ধ বেড বজায় রাখুন।',
          en: 'Blend compost into clay soil to improve aeration and maintain raised beds for upland crops.',
        }
      : soilKey === 'sandy'
      ? {
          bn: 'বেলে মাটির রস ধরে রাখতে কম্পোস্ট বা কেঁচো সার বাড়ান এবং গাছের গোড়ায় শুকনো খড়ের মাল্চিং দিন।',
          en: 'Boost organic matter with compost or vermicompost and spread dry straw mulch to reduce evaporation.',
        }
      : soilKey === 'silty'
      ? {
          bn: 'পলি মাটির উপরিভাগে শক্ত আস্তরণ জমলে হালকা নিড়ানি দিয়ে ভেঙে দিন এবং জৈব পদার্থ যোগ করুন।',
          en: 'Break any post-rain surface crust lightly and maintain organic matter for steady root breathing.',
        }
      : soilKey === 'terrace_loam'
      ? {
          bn: 'লালচে বা উঁচু মাটিতে অম্লতা থাকতে পারে—SRDI মাটি পরীক্ষা করিয়ে কৃষি অফিসারের পরামর্শে জৈব ও চুন ব্যবস্থাপনা করুন।',
          en: 'Upland terrace soils can lean acidic—test pH via SRDI and pair generous compost with officer-advised amendments.',
        }
      : {
          bn: 'দোআঁশ মাটির স্বাভাবিক উর্বরতা ধরে রাখতে ফসলের অবশিষ্টাংশ মাটিতে মেশান ও ডাল ফসলের আবর্তন রাখুন।',
          en: 'Preserve loamy soil balance by returning crop residues and rotating with nitrogen-fixing pulses.',
        };

  // Qualitative nutrient note (no invented dosages)
  const isPulseOrBean = crop.category === 'pulse' || crop.id === 'beans';
  const isFruitOrPerennial = crop.category === 'fruit' || crop.id === 'cashew-nut';
  const isSpiceOrTuber =
    crop.category === 'spice' ||
    crop.id === 'potato' ||
    crop.id === 'sweet-potato' ||
    crop.id === 'taro';

  let nutrientNote: BilingualText;
  if (crop.sourceType === 'user_requested') {
    nutrientNote = {
      bn: `${crop.name.bn} একটি ব্যবহারকারী-যুক্ত নমুনা ফসল। সাধারণ ভিত্তি জৈব সার ছাড়া নির্দিষ্ট সার মাত্রা জানতে SRDI মাটি পরীক্ষা বা ১৬১২৩-এ পরামর্শ নিন।`,
      en: `${crop.name.en} is a user-requested demo entry. Beyond general organic compost, verify exact nutrient plans via SRDI soil testing or 16123.`,
    };
  } else if (stage === 'planting') {
    nutrientNote = isPulseOrBean
      ? {
          bn: 'ডাল ও শিমজাতীয় ফসল শিকড়ে নাইট্রোজেন জমা করে—রাইজোবিয়াম জীবাণু সার ও ভিত্তি ফসফরাস-সালফার ব্যবহারে গুরুত্ব দিন।',
          en: 'Legumes fix nitrogen in root nodules—focus on Rhizobium inoculation, basal phosphorus, and sulfur instead of heavy urea.',
        }
      : {
          bn: 'রোপণ পর্যায়ে ভালো পচা জৈব সার ও ভিত্তি পুষ্টি গুরুত্বপূর্ণ। প্রকৃত মাত্রা মাটি পরীক্ষা ও ফসলের জাত অনুযায়ী কৃষি অফিস থেকে জেনে নিন।',
          en: 'Focus on decomposed compost and balanced basal preparation at planting. Confirm exact amounts via soil testing and local officers.',
        };
  } else if (stage === 'flowering') {
    nutrientNote = isFruitOrPerennial
      ? {
          bn: 'ফল ও বহুবার্ষিক গাছে ফুল-গুটি ধরে রাখতে ডালপালা ছড়ানো রিং বরাবর পটাশ ও বোরন ব্যবস্থাপনা জরুরি (১৬১২৩-এ যাচাই করুন)।',
          en: 'Around orchard fruit set, canopy drip-line potassium and boron balance help curb flower and fruitlet drop (confirm locally).',
        }
      : {
          bn: 'ফুল ও দানা/ফল গঠনের সময় পটাশ ও অণুপুষ্টির ভারসাম্য জরুরি; অতিরিক্ত ইউরিয়া এড়িয়ে চলুন।',
          en: 'Balanced potassium and micronutrients matter during flowering/fruit set; avoid heavy late nitrogen.',
        };
  } else if (stage === 'ripening') {
    nutrientNote = {
      bn: 'পরিপক্বতা পর্যায়ে নতুন করে নাইট্রোজেন/ইউরিয়া প্রয়োগ করবেন না—এতে রোগ বাড়তে ও ফসল পাকতে দেরি হতে পারে।',
      en: 'Avoid applying nitrogen during ripening so maturity stays timely and disease susceptibility stays low.',
    };
  } else {
    nutrientNote = {
      bn: 'বাড়ন্ত পর্যায়ে গাছের পাতার রঙ ও অবস্থা দেখে স্থানীয় পরামর্শ অনুযায়ী কিস্তিতে পুষ্টি সমন্বয় করুন।',
      en: 'Adjust split vegetative nutrients based on leaf health, rainfall, and local extension recommendations.',
    };
  }

  const drainageWatch: BilingualText =
    moisture === 'waterlogged' || soilKey === 'clay' || isSpiceOrTuber
      ? {
          bn: `${
            isSpiceOrTuber
              ? `${crop.name.bn}-এ কন্দ/শিকড় পচা এড়াতে `
              : ''
          }জমি থেকে দ্রুত পানি সরানোর জন্য উঁচু বেড, আইল ও পাশের নিকাশ নালা সবসময় পরিষ্কার রাখুন।`,
          en: `${
            isSpiceOrTuber
              ? `To protect ${crop.name.en} bulbs/rhizomes from soft rot, keep `
              : 'Keep '
          }raised beds, bund outlets, and perimeter drainage trenches clear at all times.`,
        }
      : {
          bn: 'ভারী বৃষ্টির পূর্বাভাস থাকলে আগাম নালা পরিষ্কার রাখুন এবং বৃষ্টির পরপর স্প্রে বা সার প্রয়োগ পিছিয়ে দিন।',
          en: 'Keep drainage channels clear ahead of rain forecasts and delay sprays or top-dressing before downpours.',
        };

  return {
    irrigationAction,
    soilCareAction,
    nutrientNote,
    drainageWatch,
  };
}
