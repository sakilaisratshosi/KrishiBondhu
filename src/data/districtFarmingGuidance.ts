import {
  BANGLADESH_DISTRICTS,
  BangladeshDistrict,
  findDistrictById,
} from './bangladeshDistricts';
import { BilingualText } from '../types/krishi';

export interface DistrictFarmingSuggestion {
  district: BangladeshDistrict;
  zoneLabel: BilingualText;
  soilAndClimateNote: BilingualText;
  seasonalTip: BilingualText;
  recommendedCropIds: string[];
  sourceLabel: BilingualText;
  lastReviewed: BilingualText;
}

const DISTRICT_SPECIFIC_OVERRIDES: Record<
  string,
  {
    zoneLabel: BilingualText;
    soilAndClimateNote: BilingualText;
    seasonalTip: BilingualText;
    recommendedCropIds: string[];
  }
> = {
  bogura: {
    zoneLabel: {
      bn: 'করতোয়া ও লেভেল বরেন্দ্র অঞ্চল (AEZ-4/25)',
      en: 'Karatoya Floodplain & Level Barind (AEZ-4/25)',
    },
    soilAndClimateNote: {
      bn: 'দোআঁশ থেকে এঁটেল-দোআঁশ উর্বর মাটি; বোরো ধান, আলু ও শীতকালীন সবজি চাষের জন্য বিশেষভাবে সমৃদ্ধ।',
      en: 'Fertile loamy to clay-loam soils strongly suited to Boro rice, potato, and intensive winter vegetables.',
    },
    seasonalTip: {
      bn: 'রবি মৌসুমে আলু ও মরিচ ক্ষেতে ভোরের কুয়াশার পর পাতা পর্যবেক্ষণ এবং বোরো ধানে AWD সেচ উপযোগী।',
      en: 'Monitor potato and chili plots after morning winter fog and apply Alternate Wetting & Drying (AWD) in Boro paddy.',
    },
    recommendedCropIds: ['rice', 'potato', 'chili', 'banana', 'mustard'],
  },
  rangpur: {
    zoneLabel: {
      bn: 'তিস্তা প্লাবনভূমি অঞ্চল (AEZ-3)',
      en: 'Active Teesta Floodplain (AEZ-3)',
    },
    soilAndClimateNote: {
      bn: 'পলি ও বেলে-দোআঁশ মাটি, শীতল সকাল—আলু, ভুট্টা, আমন-বোরো ধান এবং শীতকালীন সবজির জন্য পরিচিত।',
      en: 'Silty and sandy-loam soils with cool winters—ideal for potato, maize, rice, and winter vegetables.',
    },
    seasonalTip: {
      bn: 'শীতকালীন ঘন কুয়াশায় আলুর মড়ক রোগের ঝুঁকি বাড়ে; প্রত্যয়িত বীজ ও গোড়ায় মাটি তুলে দেওয়া জরুরি।',
      en: 'Dense fog increases potato late blight risk—prioritize certified seed tubers, proper hilling, and morning scouting.',
    },
    recommendedCropIds: ['potato', 'maize', 'rice', 'ginger', 'wheat'],
  },
  rajshahi: {
    zoneLabel: {
      bn: 'উচ্চ বরেন্দ্র ও গঙ্গা প্লাবনভূমি (AEZ-11/26)',
      en: 'High Barind Tract & Ganges Floodplain (AEZ-11/26)',
    },
    soilAndClimateNote: {
      bn: 'শুষ্ক গ্রীষ্ম, অপেক্ষাকৃত কম বৃষ্টি ও দোআঁশ-লালচে মাটি—আম, পান-মসলা, গম ও ডাল ফসলের জন্য উপযোগী।',
      en: 'Drier summers and terraced loam soils highly suited to mango orchards, wheat, pulses, and tomato.',
    },
    seasonalTip: {
      bn: 'সাশ্রয়ী সেচ ও গাছের গোড়ায় খড়ের মাল্চিং মাটির রস দীর্ঘক্ষণ ধরে রাখতে সহায়তা করে।',
      en: 'Use straw mulching and morning/evening irrigation to conserve moisture during dry Barind spells.',
    },
    recommendedCropIds: ['mango', 'wheat', 'tomato', 'lentil', 'chickpea'],
  },
  chapainawabganj: {
    zoneLabel: {
      bn: 'মহানন্দা ও উচ্চ বরেন্দ্র অঞ্চল',
      en: 'Mahananda & High Barind Belt',
    },
    soilAndClimateNote: {
      bn: 'উঁচু দোআঁশ মাটি আম, লিচু, গম ও মসুর চাষের জন্য দেশের অন্যতম প্রধান অঞ্চল।',
      en: 'Well-drained upland loams renowned for mango, wheat, and winter pulse cultivation.',
    },
    seasonalTip: {
      bn: 'আম বাগানে মুকুল আসার সময় সেচ ও পোকামাকড় পর্যবেক্ষণ এবং ধান-পরবর্তী পতিত জমিতে ডাল চাষ উপকারী।',
      en: 'Scout mango panicles carefully at flowering and rotate post-Aman land with drought-tolerant pulses.',
    },
    recommendedCropIds: ['mango', 'wheat', 'lentil', 'rice', 'dragon-fruit'],
  },
  dinajpur: {
    zoneLabel: {
      bn: 'পুরাতন হিমালয় পাদদেশীয় সমভূমি (AEZ-1)',
      en: 'Old Himalayan Piedmont Plain (AEZ-1)',
    },
    soilAndClimateNote: {
      bn: 'বেলে-দোআঁশ ও মাঝারি উঁচু জমি—লিচু, সুগন্ধি ধান, ভুট্টা, গম এবং আলুর জন্য উপযোগী।',
      en: 'Well-drained sandy loam uplands ideal for litchi, aromatic rice, maize, wheat, and potato.',
    },
    seasonalTip: {
      bn: 'অম্লীয় উঁচু জমিতে SRDI মাটি পরীক্ষা করে জৈব সার ও অনুমোদিত চুন ব্যবস্থাপনা ফলন বাড়ায়।',
      en: 'Test upland soil pH via SRDI and pair organic compost with officer-advised amendments.',
    },
    recommendedCropIds: ['litchi', 'rice', 'maize', 'wheat', 'potato'],
  },
  sylhet: {
    zoneLabel: {
      bn: 'সুরমা-কুশিয়ারা প্লাবনভূমি ও টিলা অঞ্চল (AEZ-20/22)',
      en: 'Surma-Kushiyara Floodplain & Piedmont (AEZ-20/22)',
    },
    soilAndClimateNote: {
      bn: 'অধিক বৃষ্টিপাত ও হাওর-টিলা মিশ্র ভূমি—বোরো-আমন ধান, সাইট্রাস ফল, আদা-হলুদ ও শীতকালীন শিমের উপযোগী।',
      en: 'High rainfall belt combining haor basins and hillocks—suited to rice, citrus, ginger/turmeric, and winter beans.',
    },
    seasonalTip: {
      bn: 'বর্ষার আগে দ্রুত পানি নিষ্কাশন নালা প্রস্তুত রাখুন এবং বোরো ধান ৮০% পাকলেই সংগ্রহের পরিকল্পনা নিন।',
      en: 'Maintain clear drainage channels on piedmont plots and schedule timely Boro harvest ahead of early flash rains.',
    },
    recommendedCropIds: ['rice', 'orange', 'lemon', 'pineapple', 'turmeric'],
  },
  sunamganj: {
    zoneLabel: {
      bn: 'সিলেট অববাহিকা ও হাওর অঞ্চল (AEZ-21)',
      en: 'Sylhet Basin / Haor Belt (AEZ-21)',
    },
    soilAndClimateNote: {
      bn: 'নিচু হাওর অববাহিকা—স্বল্পমেয়াদি বোরো ধান, সরিষা, মরিচ ও পানি-সহনশীল সবজির জন্য বিশেষ গুরুত্বপূর্ণ।',
      en: 'Low-lying haor basin focused on early-maturing Boro rice and quick winter oilseeds on higher ridges.',
    },
    seasonalTip: {
      bn: 'আগাম পাহাড়ি ঢলের ঝুঁকি এড়াতে স্বল্প জীবনকালের বোরো জাত নির্বাচন ও আবহাওয়া সতর্কতা নিয়মিত দেখুন।',
      en: 'Prefer short-duration Boro cultivars and watch early pre-monsoon rainfall advisories.',
    },
    recommendedCropIds: ['rice', 'mustard', 'chili', 'bottle-gourd', 'sweet-potato'],
  },
  khulna: {
    zoneLabel: {
      bn: 'গঙ্গা জোয়ার-ভাটা ও উপকূলীয় অঞ্চল (AEZ-13)',
      en: 'Ganges Tidal Floodplain & Coastal Belt (AEZ-13)',
    },
    soilAndClimateNote: {
      bn: 'শুষ্ক মৌসুমে মৃদু লবণাক্ততার ঝুঁকি—লবণসহিষ্ণু ধান, তরমুজ, সূর্যমুখী, মুগডাল ও চিংড়ি-ঘের পাড়ে সবজি উপযোগী।',
      en: 'Coastal tidal soils with dry-season salinity watch—suited to salt-tolerant rice, watermelon, sunflower, and mung bean.',
    },
    seasonalTip: {
      bn: 'জোয়ার-ভাটার লবণাক্ততা এড়াতে ঘেরের পাড়ে উঁচু বেড, মাল্চিং এবং লবণসহনশীল জাত ব্যবহার করুন।',
      en: 'Grow dike vegetables on mulched raised beds and choose salt-tolerant cultivars during dry Rabi months.',
    },
    recommendedCropIds: ['rice', 'watermelon', 'sunflower', 'mung-bean', 'coconut'],
  },
  jashore: {
    zoneLabel: {
      bn: 'উচ্চ গঙ্গা প্লাবনভূমি (AEZ-11)',
      en: 'High Ganges River Floodplain (AEZ-11)',
    },
    soilAndClimateNote: {
      bn: 'উর্বর দোআঁশ ও পলি-দোআঁশ মাটি—সারা বছর সবজি, পেঁয়াজ, খেজুর-কুল, ধান এবং উদ্যান ফসলের অগ্রণী এলাকা।',
      en: 'Fertile loams leading year-round vegetable, onion, papaya, guava, and high-value horticulture.',
    },
    seasonalTip: {
      bn: 'সবজি ক্ষেতে ফেরোমন ফাঁদ ও মাচা পদ্ধতি ব্যবহারে পোকামাকড় ও মাটিবাহিত রোগ কমে।',
      en: 'Use pheromone traps and trellising/staking to protect year-round vegetable yields cleanly.',
    },
    recommendedCropIds: ['eggplant', 'tomato', 'onion', 'papaya', 'rice'],
  },
  cumilla: {
    zoneLabel: {
      bn: 'মধ্য মেঘনা ও টিপ্পেরা সমভূমি (AEZ-16/19)',
      en: 'Middle Meghna & Old Meghna Estuarine Plain (AEZ-16/19)',
    },
    soilAndClimateNote: {
      bn: 'দোআঁশ ও পলি-এঁটেল মাটি—টমেটো, বেগুন, লাউ, ধান ও আলুর নিবিড় চাষাবাদের উপযোগী।',
      en: 'Productive alluvial plains supporting intensive tomato, eggplant, gourds, potato, and double-cropped rice.',
    },
    seasonalTip: {
      bn: 'সবজি বাগানে খড়ের মাল্চিং ও সকালের গোড়ায় সেচ দিলে পাতা দাগ রোগ অনেকটাই নিয়ন্ত্রণে থাকে।',
      en: 'Combine straw mulching with early-morning root watering to keep foliar blight low.',
    },
    recommendedCropIds: ['tomato', 'eggplant', 'rice', 'potato', 'bottle-gourd'],
  },
  rangamati: {
    zoneLabel: {
      bn: 'পার্বত্য চট্টগ্রাম পাহাড়ি অঞ্চল (AEZ-29)',
      en: 'Northern & Eastern Hills / CHT (AEZ-29)',
    },
    soilAndClimateNote: {
      bn: 'ঢালু ও টিলা ভূমি—আনারস, কলা, কাজুবাদাম, আদা, হলুদ, কমলা ও ড্রাগন ফলের জন্য বিশেষ উপযোগী।',
      en: 'Sloping hill terrain suited to pineapple, banana, cashew nut, ginger, turmeric, citrus, and dragon fruit.',
    },
    seasonalTip: {
      bn: 'পাহাড়ের ঢালে ধাপ (কনট্যুর) চাষ ও জৈব মাল্চিং ব্যবহার করলে বর্ষায় ভূমিক্ষয় রোধ হয়।',
      en: 'Plant along contours with heavy organic mulching to stop monsoon topsoil erosion.',
    },
    recommendedCropIds: ['pineapple', 'cashew-nut', 'ginger', 'banana', 'dragon-fruit'],
  },
  bandarban: {
    zoneLabel: {
      bn: 'পার্বত্য চট্টগ্রাম পাহাড়ি অঞ্চল (AEZ-29)',
      en: 'Northern & Eastern Hills / CHT (AEZ-29)',
    },
    soilAndClimateNote: {
      bn: 'উঁচু টিলা ও উপত্যকার মাটি—কাজুবাদাম, কমলা, আদা, হলুদ, আনারস ও কলা চাষের উপযোগী।',
      en: 'Hill slopes and valleys highly suited to cashew nut, orange, ginger, turmeric, and orchard fruits.',
    },
    seasonalTip: {
      bn: 'আদা ও হলুদে রাইজোম পচা রোধে পানি নিষ্কাশনযুক্ত উঁচু বেড ও শোধিত কন্দ ব্যবহার করুন।',
      en: 'Plant ginger and turmeric on well-drained raised beds with clean seed rhizomes.',
    },
    recommendedCropIds: ['cashew-nut', 'orange', 'ginger', 'turmeric', 'pineapple'],
  },
  khagrachhari: {
    zoneLabel: {
      bn: 'পার্বত্য চট্টগ্রাম পাহাড়ি অঞ্চল (AEZ-29)',
      en: 'Northern & Eastern Hills / CHT (AEZ-29)',
    },
    soilAndClimateNote: {
      bn: 'পাহাড়ি টিলা ও উপত্যকা—আম, আনারস, হলুদ, আদা ও কলা চাষের জন্য উপযোগী।',
      en: 'Upland hills and valleys favorable for mango, pineapple, turmeric, ginger, and banana.',
    },
    seasonalTip: {
      bn: 'শুষ্ক শীতে নতুন চারায় মাল্চিং ও গর্তে কম্পোস্ট দিলে গাছ দ্রুত প্রতিষ্ঠিত হয়।',
      en: 'Mulch orchard basins and enrich planting pits with compost before winter dry spells.',
    },
    recommendedCropIds: ['mango', 'turmeric', 'ginger', 'pineapple', 'banana'],
  },
  pabna: {
    zoneLabel: {
      bn: 'চলনবিল ও গঙ্গা প্লাবনভূমি (AEZ-11/12)',
      en: 'Chalan Beel & Ganges Floodplain (AEZ-11/12)',
    },
    soilAndClimateNote: {
      bn: 'উর্বর পলি ও দোআঁশ মাটি—পেঁয়াজ, রসুন, কালোজিরা, মসুর ডাল ও বোরো ধানের অন্যতম প্রধান অঞ্চল।',
      en: 'Rich alluvial plains famous for onion, garlic, black seed (kalojira), lentil, and Boro rice.',
    },
    seasonalTip: {
      bn: 'বর্ষার পানি নামার পরপরই বিনা চাষ বা হালকা চাষে রসুন ও পেঁয়াজ রোপণে ভালো ফলন মেলে।',
      en: 'Plant garlic and onion promptly as floodwaters recede to utilize residual soil moisture.',
    },
    recommendedCropIds: ['onion', 'garlic', 'lentil', 'black-seed', 'rice'],
  },
  natore: {
    zoneLabel: {
      bn: 'চলনবিল ও উচ্চ গঙ্গা সমভূমি',
      en: 'Chalan Beel & High Ganges Basin',
    },
    soilAndClimateNote: {
      bn: 'পলি-দোআঁশ মাটি—রসুন, পেঁয়াজ, আখ, খেজুর, মসুর ও বোরো ধানের জন্য প্রসিদ্ধ।',
      en: 'Alluvial loam soils widely known for garlic, onion, sugarcane, lentil, and rice.',
    },
    seasonalTip: {
      bn: 'রসুন ক্ষেতে পলি/খড়ের মাল্চিং ব্যবহারে আগাছা কমে ও কন্দের আকার ভালো হয়।',
      en: 'Mulch garlic beds with clean paddy straw to suppress weeds and boost bulb size.',
    },
    recommendedCropIds: ['garlic', 'onion', 'sugarcane', 'lentil', 'rice'],
  },
  faridpur: {
    zoneLabel: {
      bn: 'নিম্ন গঙ্গা নদী প্লাবনভূমি (AEZ-12)',
      en: 'Low Ganges River Floodplain (AEZ-12)',
    },
    soilAndClimateNote: {
      bn: 'নদীর পলি সমৃদ্ধ মাটি—পাট, পেঁয়াজ, মসুর, সরিষা ও ধানের জন্য বিশেষভাবে উপযোগী।',
      en: 'Riverine alluvial soils renowned for jute, onion, lentil, mustard, and paddy.',
    },
    seasonalTip: {
      bn: 'পাট কাটার পর একই জমিতে আমন বা রবি মৌসুমে পেঁয়াজ-মসুর চাষ করে মাটির স্বাস্থ্য রক্ষা করুন।',
      en: 'Rotate jute with monsoon rice or winter onion and lentil to maintain topsoil fertility.',
    },
    recommendedCropIds: ['jute', 'onion', 'lentil', 'mustard', 'rice'],
  },
  tangail: {
    zoneLabel: {
      bn: 'মধুপুর গড় ও যমুনা প্লাবনভূমি (AEZ-8/28)',
      en: 'Madhupur Tract & Jamuna Floodplain (AEZ-8/28)',
    },
    soilAndClimateNote: {
      bn: 'লালচে টিলা ও পলি সমভূমির মিশ্রণ—আনারস, কলা, সরিষা, ধান ও পেঁপে চাষের উপযোগী।',
      en: 'Blend of Madhupur uplands and alluvial plains suited to pineapple, banana, mustard, rice, and papaya.',
    },
    seasonalTip: {
      bn: 'অম্লীয় গড় এলাকায় কম্পোস্ট বাড়ান এবং বর্ষায় নিচু সমভূমিতে জলাবদ্ধতা নিয়ন্ত্রণ রাখুন।',
      en: 'Enrich acidic Madhupur terraces with compost and keep floodplain drainage clear.',
    },
    recommendedCropIds: ['pineapple', 'banana', 'mustard', 'rice', 'papaya'],
  },
};

const DIVISION_FALLBACKS: Record<
  string,
  {
    zoneLabel: BilingualText;
    soilAndClimateNote: BilingualText;
    seasonalTip: BilingualText;
    recommendedCropIds: string[];
  }
> = {
  Dhaka: {
    zoneLabel: {
      bn: 'মধ্যাঞ্চলীয় প্লাবনভূমি ও গড় অঞ্চল',
      en: 'Central Alluvial Plains & Uplands',
    },
    soilAndClimateNote: {
      bn: 'পলি-দোআঁশ ও উঁচু বেলে-দোআঁশ মাটি; ধান, শীত-গ্রীষ্মের সবজি, পেঁপে, সরিষা ও পাটের জন্য উপযোগী।',
      en: 'Alluvial loam and upland terraces suited to rice, year-round vegetables, papaya, mustard, and jute.',
    },
    seasonalTip: {
      bn: 'উঁচু বেডে সবজি চাষ ও বৃষ্টির পূর্বাভাস দেখে স্প্রে-সেচ সময়সূচি ঠিক করলে ক্ষতি কমে।',
      en: 'Use raised beds for vegetables and align irrigation/sprays with local rainfall checks.',
    },
    recommendedCropIds: ['rice', 'tomato', 'eggplant', 'papaya', 'mustard'],
  },
  Rajshahi: {
    zoneLabel: {
      bn: 'বরেন্দ্র ও গঙ্গা প্লাবনভূমি অঞ্চল',
      en: 'Barind Tract & Ganges Plains',
    },
    soilAndClimateNote: {
      bn: 'দোআঁশ ও পলি মাটি, শুষ্ক শীত-গ্রীষ্ম—ধান, আলু, পেঁয়াজ, আম, গম ও ডাল ফসলের জন্য উপযোগী।',
      en: 'Productive loams with dry winter-summer windows—ideal for rice, potato, onion, mango, wheat, and pulses.',
    },
    seasonalTip: {
      bn: 'সাশ্রয়ী সেচ ও মাল্চিং পদ্ধতি অনুসরণ করলে শুষ্ক মৌসুমে উৎপাদন খরচ কমে।',
      en: 'Pair water-saving irrigation with straw mulching during dry seasonal spells.',
    },
    recommendedCropIds: ['rice', 'potato', 'mango', 'wheat', 'onion'],
  },
  Rangpur: {
    zoneLabel: {
      bn: 'তিস্তা ও উত্তর-পশ্চিম প্লাবনভূমি',
      en: 'Teesta & Northwest Alluvial Belt',
    },
    soilAndClimateNote: {
      bn: 'বেলে-দোআঁশ ও পলি মাটি, দীর্ঘ শীত—আলু, ভুট্টা, ধান, বাদাম ও শীতকালীন শস্যের জন্য সমৃদ্ধ।',
      en: 'Cool-winter sandy loams strongly suited to potato, maize, rice, groundnut, and winter cereals.',
    },
    seasonalTip: {
      bn: 'ভোরের ঘন কুয়াশায় আলু ও টমেটো ক্ষেতে নাবি ধসা প্রতিরোধে প্রতিদিন পাতা পরীক্ষা করুন।',
      en: 'Scout potato and tomato foliage daily during foggy spells to catch early blight signs.',
    },
    recommendedCropIds: ['potato', 'maize', 'rice', 'groundnut', 'cauliflower'],
  },
  Sylhet: {
    zoneLabel: {
      bn: 'সুরমা-কুশিয়ারা, হাওর ও টিলা অঞ্চল',
      en: 'Northeast Haor & Piedmont Belt',
    },
    soilAndClimateNote: {
      bn: 'অধিক বৃষ্টিপাত ও আর্দ্র আবহাওয়া—স্বল্পমেয়াদি বোরো-আমন ধান, সাইট্রাস, আদা, হলুদ ও শিম উপযোগী।',
      en: 'High-rainfall humid zone suited to early Boro/Aman rice, citrus, ginger, turmeric, and country beans.',
    },
    seasonalTip: {
      bn: 'অতিরিক্ত আর্দ্রতায় পানি নিষ্কাশন ও আগাম ধান সংগ্রহের প্রস্তুতি রাখুন।',
      en: 'Maintain clear drainage on uplands and schedule timely harvests before heavy pre-monsoon rains.',
    },
    recommendedCropIds: ['rice', 'lemon', 'orange', 'ginger', 'beans'],
  },
  Khulna: {
    zoneLabel: {
      bn: 'দক্ষিণ-পশ্চিম গঙ্গা ও উপকূলীয় অঞ্চল',
      en: 'Southwest Ganges & Coastal Belt',
    },
    soilAndClimateNote: {
      bn: 'পলি-দোআঁশ ও উপকূলীয় মাটি—ধান, সবজি, তরমুজ, মুগডাল, সূর্যমুখী ও কুল/পেয়ারা চাষের উপযোগী।',
      en: 'Alluvial and coastal plains suited to rice, vegetables, watermelon, mung bean, sunflower, and guava.',
    },
    seasonalTip: {
      bn: 'উপকূলীয় এলাকায় শুষ্ক মৌসুমে লবণ-সহনশীল জাত ও মাল্চিং ব্যবহারে শিকড় সুরক্ষিত থাকে।',
      en: 'In coastal unions, use salt-tolerant varieties and mulch beds during dry Rabi months.',
    },
    recommendedCropIds: ['rice', 'watermelon', 'mung-bean', 'tomato', 'guava'],
  },
  Barishal: {
    zoneLabel: {
      bn: 'দক্ষিণাঞ্চলীয় জোয়ার-ভাটা প্লাবনভূমি',
      en: 'Southern Tidal Floodplain',
    },
    soilAndClimateNote: {
      bn: 'পলি-এঁটেল জোয়ার-ভাটার মাটি—আমন ধান, মুগডাল, খেসারি, পেয়ারা, নারিকেল ও তরমুজ চাষের জন্য পরিচিত।',
      en: 'Tidal alluvial soils renowned for Aman rice, mung bean, grass pea, guava, coconut, and watermelon.',
    },
    seasonalTip: {
      bn: 'সোরজান (ভাসমান/উঁচু বেড) পদ্ধতিতে সবজি ও ফল চাষ করলে জোয়ারের পানিতে ক্ষতি কম হয়।',
      en: 'Raised sorjan beds protect high-value vegetables and fruit trees from tidal waterlogging.',
    },
    recommendedCropIds: ['rice', 'mung-bean', 'guava', 'watermelon', 'coconut'],
  },
  Chattogram: {
    zoneLabel: {
      bn: 'দক্ষিণ-পূর্ব উপকূলীয় ও পার্বত্য অঞ্চল',
      en: 'Southeast Coastal & Foothill Belt',
    },
    soilAndClimateNote: {
      bn: 'পলি, উপকূলীয় ও পাহাড়ি মাটি—ধান, শীত ও গ্রীষ্মকালীন সবজি, মরিচ, শসা, পেয়ারা ও আম চাষের উপযোগী।',
      en: 'Diverse coastal and foothill soils suited to rice, chili, cucumber, gourds, guava, and mango.',
    },
    seasonalTip: {
      bn: 'বৃষ্টির পূর্বাভাস অনুযায়ী জমির নালা পরিষ্কার রাখুন এবং ঘূর্ণিঝড় মৌসুমে আগাম সংগ্রহ করুন।',
      en: 'Keep furrow outlets clear ahead of heavy coastal showers and time harvests cleanly.',
    },
    recommendedCropIds: ['rice', 'chili', 'cucumber', 'guava', 'bitter-gourd'],
  },
  Mymensingh: {
    zoneLabel: {
      bn: 'পুরাতন ব্রহ্মপুত্র প্লাবনভূমি (AEZ-9)',
      en: 'Old Brahmaputra Floodplain (AEZ-9)',
    },
    soilAndClimateNote: {
      bn: 'উর্বর পলি-দোআঁশ মাটি—বোরো ও আমন ধান, পাট, সরিষা, শসা, বেগুন ও কাঁঠাল-কলার জন্য অত্যন্ত উপযোগী।',
      en: 'Fertile Brahmaputra alluvial soils strongly suited to Boro/Aman rice, jute, mustard, eggplant, and banana.',
    },
    seasonalTip: {
      bn: 'ধানের জমিতে লিফ কালার চার্ট (LCC) মেনে ইউরিয়া প্রয়োগ করলে ব্লাস্ট রোগের ঝুঁকি কমে।',
      en: 'Use Leaf Color Charts (LCC) for split rice urea applications to keep leaf blast risk low.',
    },
    recommendedCropIds: ['rice', 'jute', 'eggplant', 'mustard', 'banana'],
  },
};

export function getDistrictFarmingSuggestion(
  districtId?: string,
  upazila?: string
): DistrictFarmingSuggestion {
  const district =
    findDistrictById(districtId) ||
    BANGLADESH_DISTRICTS.find((d) => d.id === 'bogura') ||
    BANGLADESH_DISTRICTS[0];

  const base =
    DISTRICT_SPECIFIC_OVERRIDES[district.id] ||
    DIVISION_FALLBACKS[district.divisionEn] ||
    DIVISION_FALLBACKS.Dhaka;

  const cleanUpazila = upazila?.trim();

  const seasonalTip: BilingualText = cleanUpazila
    ? {
        bn: `${cleanUpazila} (${district.bn}) এলাকার জন্য নমুনা পরামর্শ: ${base.seasonalTip.bn}`,
        en: `Sample tip for ${cleanUpazila} (${district.en}): ${base.seasonalTip.en}`,
      }
    : base.seasonalTip;

  return {
    district,
    zoneLabel: base.zoneLabel,
    soilAndClimateNote: base.soilAndClimateNote,
    seasonalTip,
    recommendedCropIds: base.recommendedCropIds,
    sourceLabel: {
      bn: 'নমুনা আঞ্চলিক কৃষি মডেল (BARI/DAE AEZ ভিত্তিক প্রোটোটাইপ)',
      en: 'Sample Regional Agronomy Model (BARI/DAE AEZ Prototype)',
    },
    lastReviewed: {
      bn: 'সর্বশেষ পর্যালোচনা: নভেম্বর ২০২৬',
      en: 'Last Reviewed: Nov 2026',
    },
  };
}
