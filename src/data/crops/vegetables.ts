import { CROP_ASSETS, CROP_CATEGORY_LABELS, CropCultivationGuide } from './types';

export const VEGETABLE_CROPS: CropCultivationGuide[] = [
  {
    id: 'potato',
    name: { bn: 'আলু', en: 'Potato' },
    aliases: ['alu', 'gol alu', 'গোল আলু', 'diamant', 'cardinal', 'asterix'],
    category: 'vegetable',
    categoryLabel: CROP_CATEGORY_LABELS.vegetable,
    imageUrl: CROP_ASSETS.potato,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'আলু বাংলাদেশের অন্যতম প্রধান শীতকালীন অর্থকরী ফসল। রোগমুক্ত বীজ আলু নির্বাচন ও ঘন কুয়াশায় নাবি ধসা প্রতিরোধ ভালো ফলনের প্রধান শর্ত।',
      en: 'Potato is a major winter food and cash crop in Bangladesh. Certified disease-free seed tubers and fog-season late blight vigilance drive yield stability.',
    },
    suitableVarieties: {
      bn: 'BARI Alu-7 (Diamant), BARI Alu-8 (Cardinal), BARI Alu-25 (Asterix), BARI Alu-41 এবং তাপ-লবণ সহনশীল BARI Alu-72।',
      en: 'BARI Alu-7 (Diamant), BARI Alu-8 (Cardinal), BARI Alu-25 (Asterix), BARI Alu-41, and salinity-tolerant BARI Alu-72.',
    },
    suitableRegions: {
      bn: 'মুন্সীগঞ্জ, বগুড়া, রংপুর, জয়পুরহাট, দিনাজপুর, রাজশাহী ও কুমিল্লা অঞ্চলে সর্বাধিক চাষ হয়।',
      en: 'Major production belts span Munshiganj, Bogura, Rangpur, Joypurhat, Dinajpur, Rajshahi, and Cumilla.',
    },
    seasonAndPlanting: {
      bn: 'মধ্য অক্টোবর থেকে পুরো নভেম্বর মাস পর্যন্ত রোপণের সর্বোত্তম সময়।',
      en: 'Prime planting runs mid-October through November across Bangladesh.',
    },
    soilAndPh: {
      bn: 'ঝুরঝুরে, জৈব পদার্থসমৃদ্ধ ও সুনিষ্কাশিত বেলে-দোআঁশ ও দোআঁশ মাটি; আদর্শ pH ৫.৫ থেকে ৬.৫ (ক্ষারীয় মাটিতে স্ক্যাব বাড়ে)।',
      en: 'Loose, well-drained sandy-loam and loamy soil at pH 5.5 to 6.5 (high pH increases common scab risk).',
    },
    landPreparation: {
      bn: '৪–৫ বার গভীর চাষ ও মই দিয়ে মাটি ঝুরঝুরে করে উঁচু সারিবদ্ধ ভেলি ও নালা (ridge-furrow) তৈরি করুন।',
      en: 'Deeply plough 4–5 times into fine tilth and shape raised ridges with drainage furrows.',
    },
    seedSelectionAndTreatment: {
      bn: 'BADC বা প্রত্যয়িত অঙ্কুরিত (সাদা-সবুজ ছোট চোখ গজানো) বীজ আলু ব্যবহার করুন। কাটা আলু ব্যবহার করলে পরিষ্কার ছুরি জীবাণুমুক্ত করে কাটা অংশ ছায়ায় শুকিয়ে (suberize) রোপণ করুন।',
      en: 'Use certified pre-sprouted tubers; if cutting large seed tubers, disinfect knives between cuts and cure cut faces in shade before planting.',
    },
    plantingMethod: {
      bn: '৬০×২৫ সেমি দূরত্বে সারির ভেলির মাঝে ৫–৭ সেমি গভীরে অঙ্কুর উপরের দিকে রেখে রোপণ করুন।',
      en: 'Plant sprouted tubers 5–7 cm deep along ridge centers with sprouts facing upward.',
    },
    fertilizerManagement: {
      bn: 'পচা গোবর/কম্পোস্টের পাশাপাশি সুষম ভিত্তি সার এবং ভেলি বাঁধার সময় ইউরিয়া ও পটাশ উপরি প্রয়োগ করুন। অতিরিক্ত ইউরিয়া নাবি ধসার ঝুঁকি বাড়ায়।',
      en: 'Mix compost with balanced basal nutrients and split side-dressings at hilling; avoid excess nitrogen that invites late blight.',
    },
    irrigationSchedule: {
      bn: 'অঙ্কুরোদগম, স্টোলন গজানো ও আলু বড় হওয়ার সময় নালায় হালকা সেচ দিন—উপরে প্লাবন করবেন না। তোলার ১০–১২ দিন আগে সেচ বন্ধ করুন।',
      en: 'Apply light furrow irrigation at emergence, stolon initiation, and tuber bulking; stop watering 10–12 days before digging.',
    },
    growthStageCare: [
      {
        stage: { bn: 'ভেলি বাঁধা (Earthing Up)', en: 'Hilling & Ridge Care' },
        guidance: {
          bn: '২০–৩০ দিনে গোড়ায় মাটি তুলে দিন যাতে কন্দ রোদে সবুজ ও বিষাক্ত না হয়।',
          en: 'Mound soil up ridges around 20–30 days to shield growing tubers from sunlight greening.',
        },
      },
      {
        stage: { bn: 'শীত ও কুয়াশা পর্যায়', en: 'Fog & Blight Watch' },
        guidance: {
          bn: 'ঘন কুয়াশায় প্রতিদিন সকালে নিচের পাতা পরীক্ষা করুন এবং সেচ সাময়িক কম রাখুন।',
          en: 'During winter fog spells, inspect lower foliage daily for water-soaked blight spots.',
        },
      },
    ],
    weedManagement: {
      bn: 'রোপণের ২০–৩০ দিন পর প্রথম মাটি তোলার আগেই আগাছা পরিষ্কার করুন।',
      en: 'Clear weeds thoroughly just before hilling up soil at 20–30 days.',
    },
    commonDiseasesAndPests: {
      bn: 'নাবি ধসা (Late Blight), আগাম ধসা, ব্যাকটেরিয়াল ঢলে পড়া, দাদ রোগ (Scab), কাটুই পোকা ও জাবপোকা।',
      en: 'Late Blight, Early Blight, Bacterial Wilt, Common Scab, Cutworm, and Aphids.',
    },
    preventionAndSafeManagement: {
      bn: 'প্রত্যয়িত বীজ, শস্য পর্যায় ও জাবপোকা/সাদা মাছি দমনে হলুদ ফাঁদ ব্যবহার করুন। নাবি ধসার পূর্বাভাস পেলে দ্রুত ১৬১২৩ বা কৃষি অফিসারের পরামর্শ নিন।',
      en: 'Plant certified seed, practice 2–3 year rotation, and consult 16123 immediately when fog-blight advisories trigger.',
    },
    harvesting: {
      bn: 'গাছের পাতা হলুদ হয়ে শুকিয়ে গেলে এবং আলুর খোসা আঙুলের চাপে না উঠলে পরিষ্কার রৌদ্রোজ্জ্বল দিনে তুলুন।',
      en: 'Dig on a dry sunny day once haulms die back and tuber skins resist thumb rubbing.',
    },
    postHarvestStorage: {
      bn: 'মাঠে বা ছায়ায় শুকিয়ে কাটা-পচা আলু আলাদা করুন এবং ঠান্ডা-হাওয়া চলাচলযুক্ত ঘরে মাচায় বা হিমাগারে সংরক্ষণ করুন।',
      en: 'Cure in shade, cull damaged tubers immediately, and store in ventilated racks or cold storage.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'জমি ও ভেলি রোপণ', en: 'Ridge Planting' },
        window: { bn: 'নভেম্বর', en: 'November' },
        action: { bn: 'ঝুরঝুরে ভেলিতে অঙ্কুরিত বীজ আলু রোপণ।', en: 'Plant sprouted seed tubers on loose ridges.' },
      },
      {
        step: 2,
        stage: { bn: 'নিড়ানি ও মাটি তোলা', en: 'Weeding & Hilling' },
        window: { bn: '২৫–৩০ দিন', en: 'Days 25–30' },
        action: { bn: 'উপরি সার প্রয়োগ ও ভেলি উঁচু করা।', en: 'Top-dress and earth up protective ridges.' },
      },
      {
        step: 3,
        stage: { bn: 'আলু বড় হওয়া', en: 'Tuber Bulking' },
        window: { bn: '৪০–৭০ দিন', en: 'Days 40–70' },
        action: { bn: 'নালায় হালকা সেচ ও কুয়াশা রোগ পর্যবেক্ষণ।', en: 'Furrow irrigation and daily blight checks.' },
      },
      {
        step: 4,
        stage: { bn: 'খোসা শক্ত হওয়া', en: 'Skin Set' },
        window: { bn: '৭৫–৮৫ দিন', en: 'Days 75–85' },
        action: { bn: 'সেচ বন্ধ করে গাছ শুকানো।', en: 'Withhold water so skins toughen.' },
      },
      {
        step: 5,
        stage: { bn: 'উত্তোলন ও বাছাই', en: 'Harvest & Cure' },
        window: { bn: '৯০–১০০ দিন', en: 'Days 90–100' },
        action: { bn: 'সাবধানে তুলে ছায়ায় শুকানো ও গ্রেডিং।', en: 'Dig gently, shade-cure, and grade.' },
      },
    ],
  },
  {
    id: 'tomato',
    name: { bn: 'টমেটো', en: 'Tomato' },
    aliases: ['টমেটু', 'winter tomato', 'summer tomato', 'bari tomato'],
    category: 'vegetable',
    categoryLabel: CROP_CATEGORY_LABELS.vegetable,
    imageUrl: CROP_ASSETS.tomato,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'টমেটো অত্যন্ত জনপ্রিয় ও পুষ্টিগুণসমৃদ্ধ সবজি। শীতকালে মাঠ পর্যায়ে এবং গ্রীষ্মকালে পলি-শেডে তাপসহনশীল জাত চাষ করে কৃষকেরা ভালো দাম পান।',
      en: 'Tomato is a prime commercial vegetable grown across winter fields and summer poly-tunnels with heat-tolerant varieties.',
    },
    suitableVarieties: {
      bn: 'শীতকালীন BARI Tomato-14, BARI Tomato-15, BARI Tomato-19 ও BARI Tomato-21; গ্রীষ্মকালীন BARI Hybrid Tomato-4 ও BARI Hybrid Tomato-8।',
      en: 'Winter BARI Tomato-14, 15, 19, and 21; summer heat-tolerant BARI Hybrid Tomato-4 and 8.',
    },
    suitableRegions: {
      bn: 'রাজশাহী, যশোর, বগুড়া, জামালপুর, কুমিল্লা, সিলেট ও চট্টগ্রামসহ দেশব্যাপী।',
      en: 'Major hubs in Rajshahi, Jashore, Bogura, Jamalpur, Cumilla, Sylhet, and Chattogram.',
    },
    seasonAndPlanting: {
      bn: 'শীতকালীন চারা রোপণ অক্টোবর–নভেম্বর; গ্রীষ্মকালীন পলি-শেড মে–জুলাই।',
      en: 'Winter transplanting Oct–Nov; summer protected cultivation May–Jul.',
    },
    soilAndPh: {
      bn: 'উর্বর, জৈব পদার্থসমৃদ্ধ ও পানি নিকাশযুক্ত দোআঁশ এবং বেলে-দোআঁশ মাটি; আদর্শ pH ৬.০ থেকে ৬.৮।',
      en: 'Fertile, well-drained loamy and sandy-loam soils around pH 6.0 to 6.8.',
    },
    landPreparation: {
      bn: 'গভীর চাষ দিয়ে উঁচু বেড (raised bed) ও মাঝখানে পানি নিকাশের নালা তৈরি করুন যাতে গোড়ায় জল না জমে।',
      en: 'Prepare raised beds with deep side furrows so heavy dew or rain never pools near stems.',
    },
    seedSelectionAndTreatment: {
      bn: 'রোগমুক্ত প্রত্যয়িত বীজ পোকামাকড়-প্রতিরোধী মশারি বা নেট-ঢাকা বীজতলায় বুনুন।',
      en: 'Sow certified seed inside fine insect-net nurseries to keep young seedlings virus-free.',
    },
    plantingMethod: {
      bn: '২৫–৩০ দিন বয়সী সুস্থ চারা ৬০×৪০ সেমি দূরত্বে বিকেলে রোপণ করে হালকা সেচ দিন।',
      en: 'Transplant 25–30 day seedlings at 60×40 cm spacing in late afternoon with light watering.',
    },
    fertilizerManagement: {
      bn: 'প্রচুর পচা গোবর/কেঁচো সার ও ক্যালসিয়াম-বোরন-পটাশসহ সুষম পুষ্টি বজায় রাখলে ফলের নিচের পচা (blossom-end rot) ও ফল ফাটা কমে।',
      en: 'Combine rich compost with balanced NPK, calcium, and boron based on soil guidance to curb fruit cracking and blossom-end rot.',
    },
    irrigationSchedule: {
      bn: 'গোড়ায় নিয়মিত ও পরিমিত নালা সেচ এবং খড়ের মাল্চিং দিন—মাটি শুকিয়ে হঠাৎ বেশি সেচ দিলে ফল ফেটে যায়।',
      en: 'Keep root moisture uniform via straw mulching and furrow watering; sudden dry-to-wet swings crack ripening fruit.',
    },
    growthStageCare: [
      {
        stage: { bn: 'খুঁটি ও ডাল ছাঁটাই', en: 'Staking & Lower Pruning' },
        guidance: {
          bn: 'বাঁশের খুঁটি বা মাচা দিন এবং মাটির সাথে লেগে থাকা নিচের পাতা সরিয়ে ফেলুন।',
          en: 'Stake stems early with bamboo and trim bottom leaves touching soil to block fungal splash.',
        },
      },
      {
        stage: { bn: 'ফুল ও ফল বাঁধা', en: 'Flowering & Fruit Set' },
        guidance: {
          bn: 'ফল ছিদ্রকারী পোকা ও সাদা মাছি নিয়ন্ত্রণে হলুদ আঠালো ফাঁদ রাখুন।',
          en: 'Deploy yellow sticky traps for whiteflies and inspect green fruits for fruit borer.',
        },
      },
    ],
    weedManagement: {
      bn: 'খড় বা পলিথিন মাল্চিং আগাছা কমায় ও মাটির রস ধরে রাখে; প্রথম মাসে নিড়ানি দিন।',
      en: 'Use straw or poly-mulch and hand-weed during the first month after transplanting.',
    },
    commonDiseasesAndPests: {
      bn: 'আগাম ও নাবি ধসা, পাতা কোঁকড়ানো ভাইরাস, ব্যাকটেরিয়াল ঢলে পড়া ও ফল ছিদ্রকারী পোকা।',
      en: 'Early/Late Blight, Leaf Curl Virus, Bacterial Wilt, and Tomato Fruit Borer.',
    },
    preventionAndSafeManagement: {
      bn: 'নেট-ঢাকা চারা, হলুদ ফাঁদ, আক্রান্ত গাছ দ্রুত উপড়ে মাটিতে পুঁতে ফেলা ও ফসল আবর্তন কার্যকর। চিকিৎসার আগে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Grow virus-free net seedlings, rogue infected plants immediately, use pheromone traps, and consult 16123 before spraying.',
    },
    harvesting: {
      bn: 'দূরের বাজারে পাঠাতে হালকা লালচে (breaker stage) ও স্থানীয় বাজারে পুরো লাল হলে বোঁটাসহ তুলুন।',
      en: 'Pick at pink breaker stage for distant transport or fully red for local fresh markets.',
    },
    postHarvestStorage: {
      bn: 'বাতাস চলাচলযুক্ত প্লাস্টিক ক্রেটে ছায়া স্থানে রাখুন এবং পচা বা ফাটা ফল সাথে সাথে আলাদা করুন।',
      en: 'Pack gently in ventilated plastic crates in shade and remove damaged fruits immediately.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'নেট বীজতলা', en: 'Protected Nursery' },
        window: { bn: '৩–৪ সপ্তাহ আগে', en: '3–4 wks pre-plant' },
        action: { bn: 'সাদা মাছি-মুক্ত নেটে সুস্থ চারা তৈরি।', en: 'Raise virus-free seedlings under mesh.' },
      },
      {
        step: 2,
        stage: { bn: 'বেডে রোপণ', en: 'Bed Transplant' },
        window: { bn: '০ দিন', en: 'Day 0' },
        action: { bn: 'বিকেলে উঁচু বেডে চারা লাগানো।', en: 'Transplant onto raised beds in evening.' },
      },
      {
        step: 3,
        stage: { bn: 'খুঁটি ও মাল্চিং', en: 'Staking & Mulch' },
        window: { bn: '২০–৩০ দিন', en: 'Days 20–30' },
        action: { bn: 'বাঁশের খুঁটি স্থাপন ও খড় বিছানো।', en: 'Install stakes and apply straw mulch.' },
      },
      {
        step: 4,
        stage: { bn: 'ফুল ও ফল বৃদ্ধি', en: 'Fruit Bulking' },
        window: { bn: '৪৫–৭০ দিন', en: 'Days 45–70' },
        action: { bn: 'সুষম রস রাখা ও ফাঁদ পর্যবেক্ষণ।', en: 'Steady moisture and whitefly/borer traps.' },
      },
      {
        step: 5,
        stage: { bn: 'ধাপে ধাপে তোলা', en: 'Staged Harvest' },
        window: { bn: '৭৫–১১০ দিন', en: 'Days 75–110' },
        action: { bn: 'রঙ অনুযায়ী কয়েক দফায় ফল সংগ্রহ।', en: 'Pick mature clusters over several rounds.' },
      },
    ],
  },
  {
    id: 'eggplant',
    name: { bn: 'বেগুন', en: 'Eggplant (Brinjal)' },
    aliases: ['brinjal', 'begun', 'বেগুন', 'উত্তরা', 'শিংনাথ', 'কাজলা'],
    category: 'vegetable',
    categoryLabel: CROP_CATEGORY_LABELS.vegetable,
    imageUrl: CROP_ASSETS.vegetables,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'বেগুন বাংলাদেশের প্রায় সারা বছর চাষযোগ্য প্রধান সবজি। সমন্বিত বালাই ব্যবস্থাপনায় (IPM) ডগা ও ফল ছিদ্রকারী পোকা দমন করলে বিষমুক্ত ও লাভজনক ফলন পাওয়া যায়।',
      en: 'Eggplant is a year-round staple vegetable across Bangladesh. IPM management of shoot and fruit borer enables safe, profitable harvests.',
    },
    suitableVarieties: {
      bn: 'BARI Begun-4 (কাজলা), BARI Begun-5 (নয়নতারা), BARI Begun-8, উত্তরা ও শিংনাথ এবং ঢলে পড়া প্রতিরোধী গ্রাফটেড জাত (BARI Bt/কলম চারা বা বন্য বেগুনে কলম)।',
      en: 'BARI Begun-4 (Kazla), BARI Begun-5 (Nayantara), BARI Begun-8, Uttara, Singnath, and grafted wilt-resistant seedlings.',
    },
    suitableRegions: {
      bn: 'যশোর, নরসিংদী, জামালপুর, বগুড়া, রাজশাহী ও পাবনাসহ প্রায় সব জেলায়।',
      en: 'Grown intensively in Jashore, Narsingdi, Jamalpur, Bogura, Rajshahi, Pabna, and nationwide.',
    },
    seasonAndPlanting: {
      bn: 'শীতকালীন রোপণ সেপ্টেম্বর–নভেম্বর এবং বর্ষাকালীন রোপণ ফেব্রুয়ারি–এপ্রিল।',
      en: 'Winter crops transplanted Sep–Nov; monsoon crops Feb–Apr on high beds.',
    },
    soilAndPh: {
      bn: 'জৈব পদার্থসমৃদ্ধ, গভীর ও পানি নিকাশযোগ্য দোআঁশ এবং বেলে-দোআঁশ মাটি; আদর্শ pH ৫.৮ থেকে ৬.৮।',
      en: 'Deep, fertile, well-drained loamy soils with pH 5.8 to 6.8.',
    },
    landPreparation: {
      bn: 'গভীর চাষ ও রোদে মাটি শুকিয়ে (solarization) জীবাণু কমিয়ে উঁচু বেড ও নালা তৈরি করুন।',
      en: 'Deep-plough, sun-expose soil to cut wilt pathogens, and form raised beds with drains.',
    },
    seedSelectionAndTreatment: {
      bn: 'ঢলে পড়া প্রবণ জমিতে তিতবেগুনের (Solanum torvum) মূলস্টকে কলম চারা রোপণ অত্যন্ত নিরাপদ ও কার্যকর।',
      en: 'In wilt-prone soils, choose healthy seedlings grafted onto wild Solanum rootstock.',
    },
    plantingMethod: {
      bn: '৭৫×৬০ সেমি বা জাতভেদে প্রশস্ত দূরত্বে চারা লাগান যাতে গাছের ভেতর পর্যাপ্ত আলো-বাতাস থাকে।',
      en: 'Space plants generously (75×60 cm) so canopies stay airy and easy to inspect.',
    },
    fertilizerManagement: {
      bn: 'ভালো পচা গোবর বা কেঁচো সারসহ সুষম সার ৪–৫ কিস্তিতে দিন—একবারে অতিরিক্ত নাইট্রোজেন দেবেন না।',
      en: 'Supply decomposed compost plus balanced split nutrients across the long picking season.',
    },
    irrigationSchedule: {
      bn: 'শীতকালে মাটির রস বুঝে নালায় সেচ দিন এবং বর্ষায় গোড়ায় পানি জমলে সাথে সাথে সরিয়ে দিন।',
      en: 'Give regular dry-season furrow moisture and ensure rapid runoff during monsoon downpours.',
    },
    growthStageCare: [
      {
        stage: { bn: 'ডগা বৃদ্ধি পর্যায়', en: 'Vegetative Branching' },
        guidance: {
          bn: 'পোকা আক্রান্ত নুয়ে পড়া ডগা দেখলেই কেটে মাটিতে পুঁতে দিন।',
          en: 'Clip drooping borer-damaged shoots promptly and bury or destroy them.',
        },
      },
      {
        stage: { bn: 'ফল ধারণ পর্যায়', en: 'Fruiting & Picking' },
        guidance: {
          bn: 'প্রতি বিঘায় সেক্স ফেরোমন ফাঁদ স্থাপন করুন ও পোকা লাগা ফল আলাদা করে ফেলুন।',
          en: 'Maintain pheromone traps continuously and remove infested fruits during picking.',
        },
      },
    ],
    weedManagement: {
      bn: 'প্রথম ৬ সপ্তাহ নিড়ানি ও খড়ের মাল্চিং দিয়ে আগাছা দমন করুন।',
      en: 'Hand-weed and apply straw mulch during the first 6 weeks.',
    },
    commonDiseasesAndPests: {
      bn: 'ডগা ও ফল ছিদ্রকারী পোকা (BSFB), ব্যাকটেরিয়াল ঢলে পড়া, ফোমোপসিস পচা ও মাকড়।',
      en: 'Brinjal Shoot & Fruit Borer (BSFB), Bacterial Wilt, Phomopsis Blight, and Mites.',
    },
    preventionAndSafeManagement: {
      bn: 'সাপ্তাহিক ডগা ছাঁটাই, ফেরোমন ফাঁদ, কলম চারা ও জৈব বালাইনাশক (যেমন নিম তেল) অগ্রাধিকার দিন; অযথা বিষাক্ত স্প্রে এড়িয়ে ১৬১২৩-এ জানুন।',
      en: 'Prioritize sanitation pruning, pheromone trapping, grafted plants, and neem-based IPM; avoid blind frequent spraying and consult 16123.',
    },
    harvesting: {
      bn: 'ফল কচি, চকচকে ও নরম অবস্থায় বোঁটাসহ ২–৩ দিন পরপর সংগ্রহ করুন।',
      en: 'Pick glossy, tender fruits with stalks every 2–3 days before seeds harden.',
    },
    postHarvestStorage: {
      bn: 'ছায়ায় বাতাসযুক্ত ঝুড়িতে রাখুন ও দ্রুত বাজারে পাঠান।',
      en: 'Store briefly in shaded ventilated baskets and market fresh.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'চারা বা কলম তৈরি', en: 'Nursery / Grafting' },
        window: { bn: '৪–৫ সপ্তাহ আগে', en: '4–5 wks pre-plant' },
        action: { bn: 'সুস্থ বা গ্রাফটেড চারা উৎপাদন।', en: 'Raise vigorous or grafted seedlings.' },
      },
      {
        step: 2,
        stage: { bn: 'উঁচু বেডে রোপণ', en: 'Field Planting' },
        window: { bn: '০ দিন', en: 'Day 0' },
        action: { bn: 'প্রশস্ত সারিতে চারা রোপণ।', en: 'Transplant into airy raised beds.' },
      },
      {
        step: 3,
        stage: { bn: 'ডগা ছাঁটাই ও ফাঁদ', en: 'Pruning & Pheromone' },
        window: { bn: '৩০–৫০ দিন', en: 'Days 30–50' },
        action: { bn: 'ফেরোমন ফাঁদ বসানো ও নুয়ে পড়া ডগা কাটা।', en: 'Set pheromone traps and clip infested shoots.' },
      },
      {
        step: 4,
        stage: { bn: 'ফুল ও প্রথম ফল', en: 'First Fruit Set' },
        window: { bn: '৫৫–৭৫ দিন', en: 'Days 55–75' },
        action: { bn: 'নিয়মিত সেচ ও কিস্তি সার প্রয়োগ।', en: 'Maintain moisture and split nutrition.' },
      },
      {
        step: 5,
        stage: { bn: 'ধারাবাহিক সংগ্রহ', en: 'Continuous Picking' },
        window: { bn: '৭৫–১৬০ দিন', en: 'Days 75–160' },
        action: { bn: 'কচি ও চকচকে অবস্থায় নিয়মিত তোলা।', en: 'Pick tender fruits every few days.' },
      },
    ],
  },
  {
    id: 'chili',
    name: { bn: 'মরিচ', en: 'Chili Pepper' },
    aliases: ['morich', 'green chili', 'dry chili', 'কাঁচা মরিচ', 'বগুড়ার মরিচ'],
    category: 'vegetable',
    categoryLabel: CROP_CATEGORY_LABELS.vegetable,
    imageUrl: CROP_ASSETS.vegetables,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'মরিচ বাংলাদেশে সবজি ও মসলা উভয় হিসেবেই অত্যন্ত গুরুত্বপূর্ণ। জলাবদ্ধতার প্রতি অতি সংবেদনশীল হওয়ায় পানি নিষ্কাশন ও থ্রিপস-মাকড় দমন সফলতার চাবিকাঠি।',
      en: 'Chili is essential as both a fresh vegetable and dried spice in Bangladesh. Strict drainage and thrips/mite control prevent leaf curl and die-back.',
    },
    suitableVarieties: {
      bn: 'BARI Morich-1 (বাংলা লঙ্কা), BARI Morich-2, BARI Morich-3, বগুড়া ও কুমিল্লার স্থানীয় জাত এবং বর্ষাকালীন উন্নত হাইব্রিড।',
      en: 'BARI Morich-1, 2, and 3, local Bogura/Cumilla landraces, and rainy-season hybrids.',
    },
    suitableRegions: {
      bn: 'বগুড়া, পঞ্চগড়, জামালপুর, মানিকগঞ্জ, কুমিল্লা, ভোলা ও নোয়াখালীসহ দেশের সর্বত্র।',
      en: 'Major belts in Bogura, Panchagarh, Jamalpur, Manikganj, Cumilla, Bhola, and Noakhali.',
    },
    seasonAndPlanting: {
      bn: 'রবি মরিচ অক্টোবর–নভেম্বর এবং খরিপ/বর্ষাকালীন মরিচ ফেব্রুয়ারি–এপ্রিল।',
      en: 'Rabi planting Oct–Nov; Kharif/monsoon planting Feb–Apr.',
    },
    soilAndPh: {
      bn: 'উঁচু ও সুনিষ্কাশিত বেলে-দোআঁশ এবং দোআঁশ মাটি; অনুকূল pH ৬.০ থেকে ৭.০।',
      en: 'Elevated, well-drained sandy-loam and loamy soils around pH 6.0 to 7.0.',
    },
    landPreparation: {
      bn: 'মাটি মিহি করে উঁচু বেড (অন্তত ১৫–২০ সেমি উঁচু) ও চওড়া নিকাশ নালা তৈরি করুন।',
      en: 'Prepare raised beds (15–20 cm high) flanked by deep drainage trenches.',
    },
    seedSelectionAndTreatment: {
      bn: 'অ্যানথ্রাকনোজ-মুক্ত সুস্থ ফল থেকে সংগৃহীত বা প্রত্যয়িত বীজ গরম পানি বা নিরাপদ শোধন করে বুনুন।',
      en: 'Use certified disease-free seed treated safely to prevent anthracnose and damping-off.',
    },
    plantingMethod: {
      bn: '৩০–৩৫ দিনের সুস্থ চারা ৫০×৪০ সেমি দূরত্বে রোপণ করুন।',
      en: 'Transplant 30–35 day seedlings at 50×40 cm spacing on raised beds.',
    },
    fertilizerManagement: {
      bn: 'পচা জৈব সার ও পর্যাপ্ত পটাশ, সালফার ও ক্যালসিয়াম-সমৃদ্ধ সুষম সার দিন যাতে ফুল ঝরা কমে।',
      en: 'Provide decomposed compost plus balanced potash, sulfur, and calcium to reduce flower drop.',
    },
    irrigationSchedule: {
      bn: 'শুষ্ক মৌসুমে নালায় হালকা সেচ দিন; কখনোই বেডের ওপর পানি ভাসাবেন না।',
      en: 'Apply light furrow irrigation during dry spells; never flood beds or let water stand.',
    },
    growthStageCare: [
      {
        stage: { bn: 'প্রাথমিক শাখা গঠন', en: 'Branching & Canopy' },
        guidance: {
          bn: 'কচি পাতা কুঁকড়ে যাচ্ছে কি না দেখতে থ্রিপস ও লাল মাকড় খুঁজুন।',
          en: 'Inspect young leaf undersides for thrips (upward curl) and mites (downward curl).',
        },
      },
      {
        stage: { bn: 'ফুল ও ফল ধরা', en: 'Flowering & Fruiting' },
        guidance: {
          bn: 'নিকাশ নালা পরিষ্কার রাখুন ও গোড়া পচা দেখলে তাৎক্ষণিক ব্যবস্থা নিন।',
          en: 'Keep drains clear and rogue any sudden-wilting plants early.',
        },
      },
    ],
    weedManagement: {
      bn: 'মাল্চিং ও হালকা নিড়ানি দিয়ে শিকড়ের আশেপাশে আগাছামুক্ত রাখুন (গভীর কোদাল চালাবেন না)।',
      en: 'Control weeds with mulch and shallow hand weeding without injuring shallow roots.',
    },
    commonDiseasesAndPests: {
      bn: 'পাতা কোঁকড়ানো রোগ (থ্রিপস ও মাকড়বাহিত), ডাই-ব্যাক ও ফল পচা (Anthracnose), গোড়া পচা।',
      en: 'Leaf curl complex (thrips/mites/virus), Anthracnose die-back/fruit rot, and Collar Rot.',
    },
    preventionAndSafeManagement: {
      bn: 'হলুদ ও নীল আঠালো ফাঁদ, আক্রান্ত মরিচ ও ডগা ছাঁটাই এবং নিম তেল/অনুমোদিত IPM ব্যবস্থার জন্য ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Use blue/yellow sticky traps, prune anthracnose-spotted fruits, and consult 16123 for safe thrips/mite IPM.',
    },
    harvesting: {
      bn: 'কাঁচা মরিচের জন্য সবুজ ও পুষ্ট হলে এবং শুকনো মরিচের জন্য পুরো লাল পাকলে তুলুন।',
      en: 'Harvest firm green pods for fresh market or fully crimson pods for dried spice.',
    },
    postHarvestStorage: {
      bn: 'কাঁচা মরিচ ঠান্ডা বাতাসে বস্তা/ঝুড়িতে ও শুকনো মরিচ রোদে শুকিয়ে বায়ুরোধী ড্রামে রাখুন।',
      en: 'Keep green chilies cool in breathable sacks; sun-dry red chilies thoroughly before sealing.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'বীজতলা', en: 'Seedbed' },
        window: { bn: '৪–৫ সপ্তাহ আগে', en: '4–5 wks pre-plant' },
        action: { bn: 'ড্যাম্পিং-অফ মুক্ত উঁচু বীজতলা।', en: 'Grow seedlings on elevated nursery bed.' },
      },
      {
        step: 2,
        stage: { bn: 'উঁচু বেডে রোপণ', en: 'Raised-Bed Plant' },
        window: { bn: '০ দিন', en: 'Day 0' },
        action: { bn: 'বিকেলে চারা রোপণ ও ছায়া/রস রক্ষা।', en: 'Transplant in afternoon with light water.' },
      },
      {
        step: 3,
        stage: { bn: 'মাকড়-থ্রিপস পর্যবেক্ষণ', en: 'Canopy & Traps' },
        window: { bn: '২৫–৪৫ দিন', en: 'Days 25–45' },
        action: { bn: 'মাল্চিং, আঠালো ফাঁদ ও নিড়ানি।', en: 'Mulch, place sticky traps, and weed gently.' },
      },
      {
        step: 4,
        stage: { bn: 'ফুল ও প্রথম তোলা', en: 'Flowering & Pick 1' },
        window: { bn: '৬০–৭৫ দিন', en: 'Days 60–75' },
        action: { bn: 'পরিমিত সেচ ও সবুজ মরিচ তোলা।', en: 'Balanced moisture and begin green harvests.' },
      },
      {
        step: 5,
        stage: { bn: 'দীর্ঘমেয়াদি সংগ্রহ', en: 'Extended Picking' },
        window: { bn: '৮০–১৫০+ দিন', en: 'Days 80–150+' },
        action: { bn: 'সপ্তাহে ১–২ বার তোলা ও রোগবালাই দমন।', en: 'Regular harvests with strict drainage care.' },
      },
    ],
  },
  {
    id: 'bottle-gourd',
    name: { bn: 'লাউ', en: 'Bottle Gourd' },
    aliases: ['lau', 'kaddu', 'লাউ', 'কদু', 'মাচা লাউ'],
    category: 'vegetable',
    categoryLabel: CROP_CATEGORY_LABELS.vegetable,
    imageUrl: CROP_ASSETS.vegetables,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'লাউ বাংলাদেশের গ্রামীণ গৃহস্থালি ও বাণিজ্যিক চাষের অতি জনপ্রিয় লতানো সবজি। শক্তিশালী মাচা ও হাত-পরাগায়ন ফলন উল্লেখযোগ্যভাবে বাড়ায়।',
      en: 'Bottle gourd is a cherished homestead and commercial climbing cucurbit across Bangladesh; sturdy trellising and pollination care drive heavy yields.',
    },
    suitableVarieties: {
      bn: 'BARI Lau-3, BARI Lau-4 (সারা বছর উপযোগী), হাইব্রিড মার্শাল ও ডায়না।',
      en: 'BARI Lau-3, BARI Lau-4 (year-round), and high-yielding hybrid cultivars.',
    },
    suitableRegions: {
      bn: 'নরসিংদী, গাজীপুর, কুমিল্লা, যশোর, বগুড়া ও সারা বাংলাদেশের বসতবাড়ি-মাঠ পর্যায়ে।',
      en: 'Widely grown in Narsingdi, Gazipur, Cumilla, Jashore, Bogura, and rural homesteads nationwide.',
    },
    seasonAndPlanting: {
      bn: 'শীতকালীন লাউ আগস্ট–অক্টোবর এবং গ্রীষ্মকালীন লাউ ফেব্রুয়ারি–এপ্রিল রোপণ করা হয়।',
      en: 'Winter sowing Aug–Oct; summer sowing Feb–Apr.',
    },
    soilAndPh: {
      bn: 'জৈব পদার্থসমৃদ্ধ ও পানি নিষ্কাশনযোগ্য দোআঁশ মাটি; অনুকূল pH ৬.০ থেকে ৭.০।',
      en: 'Fertile, well-drained loamy soils around pH 6.0 to 7.0.',
    },
    landPreparation: {
      bn: '২–২.৫ মিটার দূরত্বে উঁচু মাদা (pit) তৈরি করে ভেতরে প্রচুর পচা গোবর বা কম্পোস্ট মিশিয়ে কয়েক দিন রেখে দিন।',
      en: 'Dig spacious elevated pits 2–2.5 m apart, blend generous compost into pit soil, and allow settling before planting.',
    },
    seedSelectionAndTreatment: {
      bn: 'শক্ত খোলসের বীজ ১২–১৮ ঘণ্টা পরিষ্কার পানিতে ভিজিয়ে কাপড়ে পুঁটলি করে অঙ্কুর বের করে রোপণ করুন।',
      en: 'Soak hard-coated seeds overnight and pre-sprout in damp cloth for uniform emergence.',
    },
    plantingMethod: {
      bn: 'প্রতি মাদায় ২টি সুস্থ চারা রেখে পাতলা কাপড় বা কঞ্চি দিয়ে সুরক্ষা দিন এবং শক্ত বাঁশ-সুতার মাচা তৈরি করুন।',
      en: 'Maintain two strong vines per pit and train main runners onto a sturdy bamboo-and-twine trellis.',
    },
    fertilizerManagement: {
      bn: 'মাদায় জৈব সার প্রধান; লতা বড় হতে থাকলে ও ফল ধরার সময় কিস্তিতে সুষম উপরি সার মাদার চারপাশে দিন।',
      en: 'Rely on rich pit compost and apply split ring top-dressings around pit margins as vines set fruit.',
    },
    irrigationSchedule: {
      bn: 'শীতকালে ৭–১০ দিন অন্তর মাদার চারপাশে নালায় সেচ দিন; মূল কাণ্ডের ঠিক গোড়ায় জল জমতে দেবেন না।',
      en: 'Irrigate around pit rings every 7–10 days in dry weather while keeping the stem collar dry.',
    },
    growthStageCare: [
      {
        stage: { bn: 'মাচা ওঠা ও শাখা ছাঁটাই', en: 'Trellising & Training' },
        guidance: {
          bn: 'মাচায় ওঠার আগে মূল লতার নিচের অপ্রয়োজনীয় ডগা সরিয়ে দিন যাতে ওপরের শাখায় বেশি স্ত্রী ফুল আসে।',
          en: 'Trim excess side shoots below trellis height so vigorous canopy branches bear abundant female blooms.',
        },
      },
      {
        stage: { bn: 'ফল ধারণ ও পরাগায়ন', en: 'Pollination & Fruit Fly' },
        guidance: {
          bn: 'মৌমাছি কম থাকলে ভোরে পুরুষ ফুল দিয়ে স্ত্রী ফুলে হাত-পরাগায়ন করুন ও কিউ-লিউর ফেরোমন ফাঁদ বসান।',
          en: 'Hand-pollinate female blooms at dawn if bees are scarce and deploy cue-lure fruit fly traps.',
        },
      },
    ],
    weedManagement: {
      bn: 'মাদার চারপাশ আগাছামুক্ত রাখুন ও কচুরিপানা বা খড় দিয়ে মাল্চিং করুন।',
      en: 'Keep pit rings weed-free and cover with water-hyacinth or straw mulch.',
    },
    commonDiseasesAndPests: {
      bn: 'ফলের মাছি পোকা (Fruit Fly), লাল পামকিন বিটল, পাউডারি মিলডিউ ও ডাউনি মিলডিউ।',
      en: 'Cucurbit Fruit Fly, Red Pumpkin Beetle, Powdery Mildew, and Downy Mildew.',
    },
    preventionAndSafeManagement: {
      bn: 'বিষটোপ ও কিউ-লিউর ফেরোমন ফাঁদ, আক্রান্ত কচি লাউ সংগ্রহ এবং পাউডারি মিলডিউ দেখা দিলে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Use cue-lure pheromone/bait traps, bag young gourds if needed, destroy stung fruits, and consult 16123.',
    },
    harvesting: {
      bn: 'পরাগায়নের ১২–১৫ দিন পর কচি অবস্থায় নখ সহজে ঢুকলে ও গায়ের রোম থাকলে বোঁটাসহ কাটুন।',
      en: 'Cut tender gourds 12–15 days post-pollination while skins are soft and fuzzy.',
    },
    postHarvestStorage: {
      bn: 'ঠান্ডা ছায়ায় সাজিয়ে রাখুন; ঘষাঘষি এড়ালে কয়েক দিন টাটকা থাকে।',
      en: 'Store in cool shade without bruising; handle gently to preserve fresh market appearance.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'মাদা ও বীজ বপন', en: 'Pit Prep & Sowing' },
        window: { bn: '০ দিন', en: 'Day 0' },
        action: { bn: 'সারমিশ্রিত উঁচু মাদায় বীজ বপন।', en: 'Plant soaked seeds in compost-rich pits.' },
      },
      {
        step: 2,
        stage: { bn: 'মাচা তৈরি ও লতা ওঠানো', en: 'Trellis Setup' },
        window: { bn: '২০–৩০ দিন', en: 'Days 20–30' },
        action: { bn: 'বাঁশের মাচা ও মূল লতা বেঁধে দেওয়া।', en: 'Erect trellis and guide main vines up.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল ও ফেরোমন ফাঁদ', en: 'Blooming & Traps' },
        window: { bn: '৪৫–৬০ দিন', en: 'Days 45–60' },
        action: { bn: 'মাছি পোকার ফাঁদ স্থাপন ও হাত-পরাগায়ন।', en: 'Set fruit-fly traps and assist pollination.' },
      },
      {
        step: 4,
        stage: { bn: 'প্রথম ফল সংগ্রহ', en: 'First Picking' },
        window: { bn: '৬৫–৭৫ দিন', en: 'Days 65–75' },
        action: { bn: 'কচি অবস্থায় প্রথম লাউ কাটা।', en: 'Harvest first tender gourds cleanly.' },
      },
      {
        step: 5,
        stage: { bn: 'ধারাবাহিক উৎপাদন', en: 'Sustained Harvest' },
        window: { bn: '৮০–১৫০ দিন', en: 'Days 80–150' },
        action: { bn: 'নিয়মিত সেচ, সার ও তোলা অব্যাহত রাখা।', en: 'Keep picking and feeding pit margins.' },
      },
    ],
  },
  {
    id: 'pumpkin',
    name: { bn: 'মিষ্টি কুমড়া', en: 'Pumpkin (Sweet Gourd)' },
    aliases: ['misti kumra', 'sweet gourd', 'মিষ্টি কুমড়া', 'কুমড়া'],
    category: 'vegetable',
    categoryLabel: CROP_CATEGORY_LABELS.vegetable,
    imageUrl: CROP_ASSETS.vegetables,
    sourceType: 'verified_reference',
    waterDemandLevel: 'low',
    overview: {
      bn: 'মিষ্টি কুমড়া বাংলাদেশের চরাঞ্চল ও শুষ্ক মাঠে কম সেচে চাষযোগ্য একটি দীর্ঘ-সংরক্ষণযোগ্য পুষ্টিকর সবজি।',
      en: 'Sweet pumpkin thrives with modest water across Bangladesh’s chars and homesteads and stores cleanly for months after harvest.',
    },
    suitableVarieties: {
      bn: 'BARI Mistikumra-1, BARI Mistikumra-2, BARI Hybrid Mistikumra-1 এবং সুইট-মিট জাতীয় জনপ্রিয় হাইব্রিড।',
      en: 'BARI Mistikumra-1, BARI Mistikumra-2, BARI Hybrid Mistikumra-1, and adapted hybrids.',
    },
    suitableRegions: {
      bn: 'চরাঞ্চল (বগুড়া, সিরাজগঞ্জ, জামালপুর, রংপুর), কুমিল্লা ও উপকূলীয় বসতবাড়িতে ব্যাপক।',
      en: 'Major hubs in northern river chars (Bogura, Sirajganj, Jamalpur, Rangpur), Cumilla, and southern districts.',
    },
    seasonAndPlanting: {
      bn: 'চরে ও শীতকালীন চাষ অক্টোবর–ডিসেম্বর; খরিপ মৌসুম ফেব্রুয়ারি–মে।',
      en: 'River chars & Rabi sowing Oct–Dec; Kharif sowing Feb–May.',
    },
    soilAndPh: {
      bn: 'পলি-বেলে-দোআঁশ ও দোআঁশ মাটি; অনুকূল pH ৬.০ থেকে ৭.০।',
      en: 'Alluvial sandy-loam and loamy soils with pH 6.0 to 7.0.',
    },
    landPreparation: {
      bn: '২.৫–৩ মিটার দূরত্বে গভীর মাদা তৈরি করে কম্পোস্ট ও ছাই মিশিয়ে মাটি ঢিবি করে নিন।',
      en: 'Dig large pits 2.5–3 m apart, incorporate heavy compost, and mound slightly for drainage.',
    },
    seedSelectionAndTreatment: {
      bn: 'পুষ্ট বীজ হালকা পানিতে ভিজিয়ে শোধন করে মাদায় বপন করুন।',
      en: 'Pre-soak bold seeds briefly and treat safely against seedling damping-off.',
    },
    plantingMethod: {
      bn: 'চরাঞ্চলে বালু গর্তে খড় ও গোবর দিয়ে চাষ করা হয়; মাটিতে লতা ছড়াতে খড় বিছিয়ে দিলে ফল পচে না।',
      en: 'In river chars, plant in sandbar pits lined with manure and straw; spread dry straw beneath sprawling vines.',
    },
    fertilizerManagement: {
      bn: 'মাদায় প্রচুর জৈব সার ও পর্যায়ক্রমে ফসফরাস-পটাশ সমৃদ্ধ পুষ্টি দিন যাতে ফলের মিষ্টতা ও ওজন বাড়ে।',
      en: 'Use generous pit compost plus balanced potash-supported nutrition for sweetness and firm skin.',
    },
    irrigationSchedule: {
      bn: 'চারা ও ফল বড় হওয়ার সময় পরিমিত সেচ দিন; পাকার ২ সপ্তাহ আগে সেচ বন্ধ করলে সংরক্ষণ মান বাড়ে।',
      en: 'Water moderately during vine spread and fruit bulking; stop watering 2 weeks before harvest for long shelf life.',
    },
    growthStageCare: [
      {
        stage: { bn: 'লতা ও খড় বিছানো', en: 'Vine Spread & Bedding' },
        guidance: {
          bn: 'কচি ফলের নিচে খড় বা শুকনো কচুরিপানা দিন যাতে মাটির রসে তলা পচে না যায়।',
          en: 'Place dry straw pads underneath young pumpkins to prevent ground-moisture rot.',
        },
      },
      {
        stage: { bn: 'মাছি পোকা দমন', en: 'Fruit Fly Protection' },
        guidance: {
          bn: 'ফুল ফোটার সাথে সাথে কিউ-লিউর ফেরোমন ফাঁদ স্থাপন করুন।',
          en: 'Maintain cue-lure pheromone traps from first flowering onward.',
        },
      },
    ],
    weedManagement: {
      bn: 'মাদার চারপাশে ২ বার নিড়ানি দিন; লতা ছড়িয়ে পড়লে আগাছা নিজেই চাপা পড়ে।',
      en: 'Weed around pits twice before trailing vines shade the ground.',
    },
    commonDiseasesAndPests: {
      bn: 'ফলের মাছি পোকা, লাল পামকিন বিটল, পাউডারি মিলডিউ ও ভাইরাস মোজাইক।',
      en: 'Cucurbit Fruit Fly, Red Pumpkin Beetle, Powdery Mildew, and Mosaic Virus.',
    },
    preventionAndSafeManagement: {
      bn: 'ফেরোমন ফাঁদ, আক্রান্ত গাছ সরানো এবং মিলডিউ দেখা দিলে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Deploy pheromone traps, rogue virus-mottled vines early, and consult 16123 for mildew.',
    },
    harvesting: {
      bn: 'ফলের বোঁটা শুকিয়ে কাষ্ঠল হলে ও নখ সহজে না ঢুকলে পাকা অবস্থায় কাটুন (কচি কুমড়া সবজি হিসেবেও কাটা যায়)।',
      en: 'Harvest mature storage pumpkins once stems dry woody and rinds harden completely.',
    },
    postHarvestStorage: {
      bn: 'অক্ষত বোঁটাসহ মাচায় বা শুকনো ঘরে রাখলে ৪–৬ মাস পর্যন্ত ভালো থাকে।',
      en: 'Keep stems intact in cool, dry, airy racks; mature pumpkins keep 4–6 months easily.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'মাদা ও বপন', en: 'Pit Sowing' },
        window: { bn: '০ দিন', en: 'Day 0' },
        action: { bn: 'কম্পোস্টযুক্ত মাদায় বীজ বপন।', en: 'Sow seeds in fertile mounded pits.' },
      },
      {
        step: 2,
        stage: { bn: 'বিটল দমন ও নিড়ানি', en: 'Seedling Care' },
        window: { bn: '১৫–৩০ দিন', en: 'Days 15–30' },
        action: { bn: 'চারা রক্ষা ও মাদার আগাছা দমন।', en: 'Protect young leaves and weed pit rings.' },
      },
      {
        step: 3,
        stage: { bn: 'লতা ছড়ানো ও ফুল', en: 'Flowering & Traps' },
        window: { bn: '৪৫–৬৫ দিন', en: 'Days 45–65' },
        action: { bn: 'ফেরোমন ফাঁদ ও ফলের নিচে খড়।', en: 'Set fly traps and pad young fruits.' },
      },
      {
        step: 4,
        stage: { bn: 'ফল পাকা', en: 'Rind Hardening' },
        window: { bn: '৭৫–১০৫ দিন', en: 'Days 75–105' },
        action: { bn: 'শেষের দিকে সেচ কমানো।', en: 'Taper irrigation as rinds cure.' },
      },
      {
        step: 5,
        stage: { bn: 'সংগ্রহ ও গুদামজাত', en: 'Harvest & Rack Store' },
        window: { bn: '১১০–১৩০ দিন', en: 'Days 110–130' },
        action: { bn: 'শুকনো বোঁটাসহ তুলে শুকনো মাচায় রাখা।', en: 'Cut with dry stalks and store on airy racks.' },
      },
    ],
  },
  {
    id: 'bitter-gourd',
    name: { bn: 'করলা', en: 'Bitter Gourd' },
    aliases: ['korola', 'uchhe', 'করলা', 'উচ্ছে'],
    category: 'vegetable',
    categoryLabel: CROP_CATEGORY_LABELS.vegetable,
    imageUrl: CROP_ASSETS.vegetables,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'করলা ও উচ্ছে উচ্চ বাজারমূল্যের গ্রীষ্ম-বর্ষাকালীন সবজি। ভালো মাচা ও ফলের মাছি পোকা নিয়ন্ত্রণ করলে টানা কয়েক মাস ফলন দেয়।',
      en: 'Bitter gourd (Korola & Uchhe) is a high-value cucurbit in Bangladesh; overhead trellising and fruit-fly control sustain months of picking.',
    },
    suitableVarieties: {
      bn: 'BARI Korola-1, ছোট উচ্ছে (টিয়া/গজ), হাইব্রিড টিয়া ও পাপড়ি-সবুজ লম্বা জাত।',
      en: 'BARI Korola-1, local small Uchhe landraces, and adapted green hybrids.',
    },
    suitableRegions: {
      bn: 'নরসিংদী, গাজীপুর, যশোর, কুমিল্লা, রংপুর ও চট্টগ্রাম জেলায় ব্যাপক বাণিজ্যিক চাষ হয়।',
      en: 'Major commercial zones in Narsingdi, Gazipur, Jashore, Cumilla, Rangpur, and Chattogram.',
    },
    seasonAndPlanting: {
      bn: 'ফেব্রুয়ারি থেকে মে মূল মৌসুম; তবে শীতের শেষে ও শরতেও চাষ হয়।',
      en: 'Main sowing runs February to May, with late-summer/early-winter extensions.',
    },
    soilAndPh: {
      bn: 'সুনিষ্কাশিত দোআঁশ ও বেলে-দোআঁশ মাটি; অনুকূল pH ৬.০ থেকে ৬.৮।',
      en: 'Well-drained loamy and sandy-loam soils around pH 6.0 to 6.8.',
    },
    landPreparation: {
      bn: '১.৫–২ মিটার দূরে উঁচু মাদা বা বেড তৈরি করে গোবর-কম্পোস্ট মিশিয়ে দিন ও বৃষ্টির জল সরানোর নালা রাখুন।',
      en: 'Prepare raised beds or composted pits 1.5–2 m apart with clear stormwater drainage.',
    },
    seedSelectionAndTreatment: {
      bn: 'শক্ত বীজ ২৪ ঘণ্টা ভিজিয়ে গজানোর জন্য পলিথিন বা ভেজা চটের ভেতর উষ্ণ স্থানে রাখুন।',
      en: 'Soak hard-coated seeds 24 hours and pre-sprout in warm damp cloth before planting.',
    },
    plantingMethod: {
      bn: 'পলিথিন ব্যাগে চারা তৈরি করে ১৫–১৮ দিনে মাদায় রোপণ করলে মাটিতে চারা নষ্ট কম হয়; দ্রুত মাচায় তুলে দিন।',
      en: 'Raise seedlings in polybags and transplant onto beds before training vines onto overhead trellises.',
    },
    fertilizerManagement: {
      bn: 'ভিত্তি জৈব সারের পর প্রতি ২০–২৫ দিন অন্তর মাদার চারপাশে সুষম পুষ্টি কিস্তি আকারে দিলে দীর্ঘ সময় ফল ধরে।',
      en: 'Follow basal compost with light split dressings every 3–4 weeks across the extended harvest window.',
    },
    irrigationSchedule: {
      bn: 'গ্রীষ্মে ৪–৫ দিন অন্তর নালায় সেচ দিন; বর্ষায় কোনোভাবেই জলাবদ্ধতা হতে দেবেন না।',
      en: 'Irrigate furrows every 4–5 days in dry heat; ensure immediate drainage during monsoon rains.',
    },
    growthStageCare: [
      {
        stage: { bn: 'মাচায় ওঠানো', en: 'Trellis Training' },
        guidance: {
          bn: 'মূল ডগা মাচায় উঠলে নিচের দুর্বল শাখা ছেঁটে দিন।',
          en: 'Guide main vines onto netting and trim basal side shoots.',
        },
      },
      {
        stage: { bn: 'ফল পচে যাওয়া রোধ', en: 'Fruit Fly Control' },
        guidance: {
          bn: 'কচি করলায় সাদা পোকা (ম্যাগট) ঠেকাতে ফেরোমন ফাঁদ ও ব্যাগিং ব্যবহার করুন।',
          en: 'Hang cue-lure pheromone traps and collect stung fruits immediately.',
        },
      },
    ],
    weedManagement: {
      bn: 'মাদা ও বেডের চারপাশ নিড়ানি ও খড়ের মাল্চ দিয়ে পরিষ্কার রাখুন।',
      en: 'Keep pit zones clear via hand weeding and light straw mulching.',
    },
    commonDiseasesAndPests: {
      bn: 'ফলের মাছি পোকা, লাল মাকড়, জাবপোকা, ডাউনি মিলডিউ ও পাতা হলুদ ভাইরাস।',
      en: 'Fruit Fly, Red Mites, Aphids, Downy Mildew, and Mosaic Virus.',
    },
    preventionAndSafeManagement: {
      bn: 'কিউ-লিউর ফেরোমন ফাঁদ, আক্রান্ত ফল মাটিতে পুঁতে ফেলা এবং ভাইরাস-আক্রান্ত গাছ তুলে ফেলা নিরাপদ পন্থা; স্প্রের আগে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Use cue-lure traps, bury stung gourds deeply, rogue mosaic vines, and ask 16123 before spraying.',
    },
    harvesting: {
      bn: 'ফল পুষ্ট, কচি ও গাঢ় সবুজ থাকতেই (পেকে হলুদ হওয়ার আগে) ২–৩ দিন পরপর তুলুন।',
      en: 'Pick firm, green, glossy fruits every 2–3 days before seeds turn red or skins yellow.',
    },
    postHarvestStorage: {
      bn: 'ঠান্ডা ছায়ায় ঝুড়িতে রেখে দ্রুত বাজারজাত করুন; পাকা ফলের সাথে রাখবেন না।',
      en: 'Pack gently in ventilated baskets away from ripe ethylene-producing fruits.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'বীজ ভিজানো ও চারা', en: 'Soak & Nursery' },
        window: { bn: '২ সপ্তাহ আগে', en: '2 wks pre-plant' },
        action: { bn: 'পলি-ব্যাগে সুস্থ চারা তৈরি।', en: 'Pre-sprout seeds and raise in polybags.' },
      },
      {
        step: 2,
        stage: { bn: 'রোপণ ও মাচা', en: 'Plant & Trellis' },
        window: { bn: '০–২০ দিন', en: 'Days 0–20' },
        action: { bn: 'বেডে রোপণ ও সুতার মাচা নির্মাণ।', en: 'Transplant and erect string trellis.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল ও ফাঁদ', en: 'Blooming & Traps' },
        window: { bn: '৩০–৪৫ দিন', en: 'Days 30–45' },
        action: { bn: 'ফেরোমন ফাঁদ স্থাপন ও নিড়ানি।', en: 'Hang cue-lure traps and weed beds.' },
      },
      {
        step: 4,
        stage: { bn: 'প্রথম সংগ্রহ', en: 'First Harvest' },
        window: { bn: '৫০–৬০ দিন', en: 'Days 50–60' },
        action: { bn: 'কচি সবুজ করলা তোলা শুরু।', en: 'Start picking crisp green gourds.' },
      },
      {
        step: 5,
        stage: { bn: 'নিয়মিত তোলা', en: 'Multi-Round Pick' },
        window: { bn: '৬৫–১২০ দিন', en: 'Days 65–120' },
        action: { bn: 'প্রতি ২–৩ দিনে তোলা ও কিস্তি সার।', en: 'Pick every 2–3 days with light feeding.' },
      },
    ],
  },
  {
    id: 'cucumber',
    name: { bn: 'শসা', en: 'Cucumber' },
    aliases: ['shosha', 'khira', 'শসা', 'খিরা'],
    category: 'vegetable',
    categoryLabel: CROP_CATEGORY_LABELS.vegetable,
    imageUrl: CROP_ASSETS.vegetables,
    sourceType: 'verified_reference',
    waterDemandLevel: 'high',
    overview: {
      bn: 'শসা ও খিরা দ্রুত ফলনশীল জনপ্রিয় সালাদ সবজি। মাত্র ৪০–৫০ দিনে ফলন শুরু হওয়ায় কৃষকের নগদ আয় দ্রুত আসে।',
      en: 'Cucumber (Shosha & Khira) is a fast-maturing cucurbit yielding marketable fruit within 45–50 days, ideal for quick cash returns.',
    },
    suitableVarieties: {
      bn: 'বারোমাসি দেশি শসা, খিরা, শিলা ও বিভিন্ন উচ্চফলনশীল হাইব্রিড জাত।',
      en: 'All-season Baromashi, local Khira, and popular high-yielding F1 hybrids.',
    },
    suitableRegions: {
      bn: 'কুমিল্লা, নরসিংদী, গাজীপুর, ময়মনসিংহ, যশোর, বগুড়া ও কিশোরগঞ্জ।',
      en: 'Widely cultivated in Cumilla, Narsingdi, Gazipur, Mymensingh, Jashore, Bogura, and Kishoreganj.',
    },
    seasonAndPlanting: {
      bn: 'ফেব্রুয়ারি–মার্চ (গ্রীষ্ম), মে–জুন (বর্ষা) এবং সেপ্টেম্বর–অক্টোবর (আগাম শীত)।',
      en: 'Summer (Feb–Mar), monsoon high beds (May–Jun), and autumn (Sep–Oct).',
    },
    soilAndPh: {
      bn: 'জৈব পদার্থসমৃদ্ধ উর্বর ও সুনিষ্কাশিত দোআঁশ মাটি; pH ৬.০ থেকে ৬.৮।',
      en: 'Fertile, organic-rich, well-drained loamy soil around pH 6.0 to 6.8.',
    },
    landPreparation: {
      bn: 'গভীর চাষ করে উঁচু বেড ও নালা তৈরি করুন; পচা কম্পোস্ট ভালোভাবে মিশিয়ে নিন।',
      en: 'Plough deeply, enrich with well-rotted compost, and build raised beds with side drains.',
    },
    seedSelectionAndTreatment: {
      bn: 'গজানোর উচ্চ ক্ষমতাসম্পন্ন প্রত্যয়িত বীজ সরাসরি বেডে বা কোকোডাস্ট/মাটির ট্রেতে বুনুন।',
      en: 'Sow certified fresh seeds directly or raise quick plug seedlings for gap-free stands.',
    },
    plantingMethod: {
      bn: '১ মিটার × ৬০ সেমি দূরত্বে রোপণ করে দ্রুত বাঁশ-নেটের মাচায় তুলে দিলে ফল সোজা ও দাগহীন থাকে।',
      en: 'Space 1 m × 60 cm and train onto net trellises so fruits grow straight and clean.',
    },
    fertilizerManagement: {
      bn: 'স্বল্পমেয়াদি ও দ্রুত ফলনশীল হওয়ায় মূল সারের পর ২০ ও ৩৫ দিনে পরিমিত কিস্তি সার দিন।',
      en: 'Follow basal compost and balanced nutrients with light top-dressings at days 20 and 35.',
    },
    irrigationSchedule: {
      bn: 'ফলের ৯৫% পানি হওয়ায় ফুল ও ফল বৃদ্ধির সময় নিয়মিত পরিমিত আর্দ্রতা রাখুন; রস কমলে ফল তেতো ও বাঁকা হয়।',
      en: 'Maintain even moisture during flowering and fruiting; drought stress turns cucumbers bitter or crooked.',
    },
    growthStageCare: [
      {
        stage: { bn: 'মাচা ও লতা নিয়ন্ত্রণ', en: 'Vining & Trellis' },
        guidance: {
          bn: 'গোড়ার প্রথম ২–৩টি পর্বের কুঁড়ি সরিয়ে দিলে মূল লতা শক্তিশালী হয়।',
          en: 'Pinch the very lowest basal buds to strengthen the main vine climbing the net.',
        },
      },
      {
        stage: { bn: 'ডাউনি মিলডিউ ও মাছি পোকা', en: 'Leaf & Fruit Care' },
        guidance: {
          bn: 'পাতায় হলুদ কোণাকুণি দাগ ও কচি শসায় মাছি পোকার দাগ নিয়মিত দেখুন।',
          en: 'Scout leaves for angular yellow downy mildew spots and maintain fruit-fly traps.',
        },
      },
    ],
    weedManagement: {
      bn: 'প্রথম ৩–৪ সপ্তাহে নিড়ানি ও মাল্চিং দিয়ে আগাছা দমন করুন।',
      en: 'Weed gently and mulch beds within the first 3–4 weeks.',
    },
    commonDiseasesAndPests: {
      bn: 'ডাউনি ও পাউডারি মিলডিউ, ফলের মাছি পোকা, লাল পামকিন বিটল ও মাকড়।',
      en: 'Downy & Powdery Mildew, Fruit Fly, Red Pumpkin Beetle, and Spider Mites.',
    },
    preventionAndSafeManagement: {
      bn: 'সঠিক দূরত্ব রেখে বাতাস চলাচল বাড়ান, কিউ-লিউর ফাঁদ দিন ও ডাউনি মিলডিউ প্রতিরোধে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Ensure airy trellising, use cue-lure traps, and consult 16123 early at the first mildew signs.',
    },
    harvesting: {
      bn: 'শসা কচি, কচমচে ও মাঝারি আকারের হলে (বীজ শক্ত হওয়ার আগে) প্রতিদিন বা একদিন পরপর তুলুন।',
      en: 'Harvest crisp tender cucumbers every 1–2 days before seeds mature.',
    },
    postHarvestStorage: {
      bn: 'সকালের ঠান্ডায় তুলে ছায়াযুক্ত আর্দ্র কাপড়-ঢাকা ঝুড়িতে রাখুন।',
      en: 'Pick in cool morning hours and hold in shaded, ventilated baskets.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'বেড ও বপন', en: 'Bed Sowing' },
        window: { bn: '০ দিন', en: 'Day 0' },
        action: { bn: 'সারযুক্ত বেডে বীজ বা চারা রোপণ।', en: 'Plant seeds or seedlings on raised beds.' },
      },
      {
        step: 2,
        stage: { bn: 'মাচা স্থাপন', en: 'Net Trellis' },
        window: { bn: '১২–১৮ দিন', en: 'Days 12–18' },
        action: { bn: 'লতা ওঠানো ও নিড়ানি।', en: 'Erect trellis netting and clear weeds.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল ও ফাঁদ', en: 'Flowering' },
        window: { bn: '২৮–৩৮ দিন', en: 'Days 28–38' },
        action: { bn: 'নিয়মিত সেচ ও মাছি পোকার ফাঁদ।', en: 'Consistent moisture and cue-lure traps.' },
      },
      {
        step: 4,
        stage: { bn: 'প্রথম সংগ্রহ', en: 'First Harvest' },
        window: { bn: '৪৫–৫০ দিন', en: 'Days 45–50' },
        action: { bn: 'কচি শসা তোলা শুরু।', en: 'Begin frequent picking of crisp fruits.' },
      },
      {
        step: 5,
        stage: { bn: 'পূর্ণ মৌসুম তোলা', en: 'Peak Picking' },
        window: { bn: '৫৫–৮৫ দিন', en: 'Days 55–85' },
        action: { bn: 'নিয়মিত তোলা ও কিস্তি সার।', en: 'Pick every 1–2 days to encourage new blooms.' },
      },
    ],
  },
  {
    id: 'okra',
    name: { bn: 'ঢেঁড়স', en: 'Okra (Lady’s Finger)' },
    aliases: ['dherosh', 'bhindi', 'ladys finger', 'ঢেঁড়স', 'ভেন্ডি'],
    category: 'vegetable',
    categoryLabel: CROP_CATEGORY_LABELS.vegetable,
    imageUrl: CROP_ASSETS.vegetables,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'ঢেঁড়স গ্রীষ্ম-বর্ষা মৌসুমের অত্যন্ত জনপ্রিয় ও কষ্টসহিষ্ণু সবজি। হলুদ শিরা মোজাইক ভাইরাস-প্রতিরোধী জাত বেছে নিলে ফলন খুব ভালো হয়।',
      en: 'Okra is a heat-hardy spring and monsoon vegetable across Bangladesh; planting Yellow Vein Mosaic Virus (YVMV)-tolerant varieties secures high yields.',
    },
    suitableVarieties: {
      bn: 'BARI Dherosh-1, BARI Dherosh-2 (ভাইরাস-প্রতিরোধী) এবং জনপ্রিয় হাইব্রিড জাত।',
      en: 'BARI Dherosh-1, BARI Dherosh-2 (YVMV-tolerant), and vigorous F1 hybrids.',
    },
    suitableRegions: {
      bn: 'যশোর, বগুড়া, কুমিল্লা, নরসিংদী, গাজীপুর ও সারা বাংলাদেশের উঁচু ও মাঝারি উঁচু জমি।',
      en: 'Cultivated on medium-high and high lands across Jashore, Bogura, Cumilla, Narsingdi, and Gazipur.',
    },
    seasonAndPlanting: {
      bn: 'ফেব্রুয়ারি থেকে মে প্রধান মৌসুম; তবে আগাম ও শরৎকালেও (আগস্ট–সেপ্টেম্বর) চাষ হয়।',
      en: 'Main sowing Feb–May, with late-summer sowing in Aug–Sep.',
    },
    soilAndPh: {
      bn: 'সুনিকাশিত দোআঁশ, বেলে-দোআঁশ ও পলি মাটি; অনুকূল pH ৬.০ থেকে ৬.৮।',
      en: 'Well-drained loamy, sandy-loam, and silty soils around pH 6.0 to 6.8.',
    },
    landPreparation: {
      bn: '২–৩ বার চাষ দিয়ে মাটি তৈরি করে হালকা উঁচু সারি বা বেড ও নিকাশ নালা তৈরি করুন।',
      en: 'Plough 2–3 times and form slightly raised rows with drainage furrows.',
    },
    seedSelectionAndTreatment: {
      bn: 'বীজ বপনের আগে পরিষ্কার পানিতে ১২ ঘণ্টা ভিজিয়ে রাখলে দ্রুত ও সমানভাবে চারা গজায়।',
      en: 'Soak seeds in clean water for 12 hours before sowing to speed uniform germination.',
    },
    plantingMethod: {
      bn: '৪৫×৩০ সেমি দূরত্বে সারিতে ২টি বীজ পুঁতে গজানোর পর ১টি সুস্থ চারা রাখুন।',
      en: 'Sow 2 seeds per hill at 45×30 cm spacing and thin to one vigorous plant.',
    },
    fertilizerManagement: {
      bn: 'জৈব সার ও ভিত্তি সারের পাশাপাশি প্রথম ফুল আসার সময় ও ১ মাস পর হালকা নাইট্রোজেন উপরি প্রয়োগ করুন।',
      en: 'Apply compost and basal minerals, followed by split vegetative and early-flowering top-dressings.',
    },
    irrigationSchedule: {
      bn: 'গ্রীষ্মকালে ৫–৭ দিন অন্তর হালকা সেচ দিন; বর্ষায় জমিতে পানি জমতে দেবেন না।',
      en: 'Water lightly every 5–7 days in dry heat and drain excess monsoon water promptly.',
    },
    growthStageCare: [
      {
        stage: { bn: 'প্রাথমিক বৃদ্ধি', en: 'Early Vegetative' },
        guidance: {
          bn: 'চারা ৪ পাতা হলে পাতলা করে দিন ও সাদা মাছি নিয়ন্ত্রণে হলুদ ফাঁদ রাখুন।',
          en: 'Thin extra seedlings at 4-leaf stage and hang yellow sticky traps for whiteflies.',
        },
      },
      {
        stage: { bn: 'ফল ধরা পর্যায়', en: 'Pod Bearing' },
        guidance: {
          bn: 'গাছ হলুদ শিরা মোজাইকে আক্রান্ত হলে দ্রুত তুলে সরিয়ে ফেলুন যাতে পাশের গাছে না ছড়ায়।',
          en: 'Rogue YVMV-yellowed plants immediately so whiteflies do not spread the virus.',
        },
      },
    ],
    weedManagement: {
      bn: 'বপনের প্রথম মাসে ২ বার নিড়ানি দিয়ে আগাছামুক্ত রাখুন।',
      en: 'Weed twice during the first month until canopy shades the inter-rows.',
    },
    commonDiseasesAndPests: {
      bn: 'হলুদ শিরা মোজাইক ভাইরাস (YVMV), ডগা ও ফল ছিদ্রকারী পোকা, জ্যাসিড ও সাদা মাছি।',
      en: 'Yellow Vein Mosaic Virus, Shoot & Fruit Borer, Jassids, and Whiteflies.',
    },
    preventionAndSafeManagement: {
      bn: 'ভাইরাস-সহনশীল জাত চাষ, আক্রান্ত গাছ উপড়ে ফেলা ও জ্যাসিড-সাদা মাছির জন্য নিরাপদ IPM পরামর্শ নিন (১৬১২৩)।',
      en: 'Grow YVMV-resistant varieties, rogue infected plants, use traps, and consult 16123 for jassid control.',
    },
    harvesting: {
      bn: 'ফুল ফোটার ৫–৭ দিন পর কচি অবস্থায় ডগা মট করে ভেঙে যায় এমন নরম ঢেঁড়স ১ দিন পরপর তুলুন।',
      en: 'Pick tender pods 5–7 days after flowering every alternate day before they turn fibrous.',
    },
    postHarvestStorage: {
      bn: 'চট বা কাগজ-বিছানো ঝুড়িতে ছায়ায় রাখুন; গরম অবস্থায় গাদা করে রাখলে কালচে হয়।',
      en: 'Cool harvested pods in lined baskets in shade; avoid tight piling while warm.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'বীজ ভিজানো ও বপন', en: 'Soak & Sow' },
        window: { bn: '০ দিন', en: 'Day 0' },
        action: { bn: 'ভিজানো বীজ সারিতে বপন।', en: 'Sow pre-soaked seeds in spaced lines.' },
      },
      {
        step: 2,
        stage: { bn: 'পাতলা ও নিড়ানি', en: 'Thinning & Weed' },
        window: { bn: '১৫–২০ দিন', en: 'Days 15–20' },
        action: { bn: 'একটি সুস্থ গাছ রাখা ও প্রথম নিড়ানি।', en: 'Thin to single stems and weed rows.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল ও ফাঁদ', en: 'Flowering Care' },
        window: { bn: '৩০–৪০ দিন', en: 'Days 30–40' },
        action: { bn: 'উপরি সার ও সাদা মাছি পর্যবেক্ষণ।', en: 'Top-dress and inspect for whiteflies.' },
      },
      {
        step: 4,
        stage: { bn: 'প্রথম ঢেঁড়স তোলা', en: 'First Picking' },
        window: { bn: '৪৫–৫০ দিন', en: 'Days 45–50' },
        action: { bn: 'কচি ও নরম ঢেঁড়স সংগ্রহ শুরু।', en: 'Begin harvesting tender young pods.' },
      },
      {
        step: 5,
        stage: { bn: 'নিয়মিত সংগ্রহ', en: 'Continuous Harvest' },
        window: { bn: '৫৫–১০০ দিন', en: 'Days 55–100' },
        action: { bn: 'একদিন পরপর তোলা ও সেচ বজায় রাখা।', en: 'Pick every 2 days to stimulate new pods.' },
      },
    ],
  },
  {
    id: 'cauliflower',
    name: { bn: 'ফুলকপি', en: 'Cauliflower' },
    aliases: ['fulkopi', 'ফুলকপি', 'কপি', 'curd'],
    category: 'vegetable',
    categoryLabel: CROP_CATEGORY_LABELS.vegetable,
    imageUrl: CROP_ASSETS.vegetables,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'ফুলকপি বাংলাদেশের শীতকালীন সবজির বাজারে সবচেয়ে চাহিদাসম্পন্ন ফসলগুলোর একটি। বোরন-মলিবডেনামের সুষমতা ও সাদা কার্ড রক্ষা ভালো দাম এনে দেয়।',
      en: 'Cauliflower is a top winter market vegetable in Bangladesh; micronutrient balance (especially boron) and clean white curd protection maximize quality.',
    },
    suitableVarieties: {
      bn: 'BARI Fulkopi-1 (রূপা), আগাম কার্তিকা, অগ্রহায়ণী এবং তাপসহনশীল আগাম ও মধ্যম হাইব্রিড জাত।',
      en: 'BARI Fulkopi-1 (Rupa), early Kartika, Agrahayani, and heat-tolerant early hybrids.',
    },
    suitableRegions: {
      bn: 'যশোর, বগুড়া, মানিকগঞ্জ, নরসিংদী, টাঙ্গাইল, কুমিল্লা ও ময়মনসিংহে ব্যাপক চাষ।',
      en: 'Grown intensively in Jashore, Bogura, Manikganj, Narsingdi, Tangail, Cumilla, and Mymensingh.',
    },
    seasonAndPlanting: {
      bn: 'আগাম ফসল আগস্ট–সেপ্টেম্বর, প্রধান শীতকালীন রোপণ অক্টোবর–নভেম্বর।',
      en: 'Early crops Aug–Sep; main winter transplanting Oct–Nov.',
    },
    soilAndPh: {
      bn: 'জৈব পদার্থযুক্ত গভীর দোআঁশ ও পলি-দোআঁশ মাটি; আদর্শ pH ৬.০ থেকে ৭.০ (খুব অম্লীয় মাটিতে ক্লাবরুট ও হুইপটেইল হয়)।',
      en: 'Deep organic loamy and silt-loam soil with pH 6.0 to 7.0 (acidic soil raises clubroot and whiptail risk).',
    },
    landPreparation: {
      bn: '৪–৫ বার চাষ দিয়ে উঁচু ও চওড়া বেড তৈরি করুন যাতে আগাম বৃষ্টিতে চারা পচে না যায়।',
      en: 'Prepare raised beds with good drainage furrows to protect early plantings from rain.',
    },
    seedSelectionAndTreatment: {
      bn: 'কালো পচা (Black Rot) প্রতিরোধে বীজ গরম পানি শোধন (উষ্ণতা নিয়ন্ত্রিত) বা প্রত্যয়িত বীজ ব্যবহার করুন।',
      en: 'Choose certified seed or safely hot-water-treated seed to prevent Black Rot.',
    },
    plantingMethod: {
      bn: '২৫–৩০ দিনের ৪–৫ পাতাবিশিষ্ট চারা ৫০×৪৫ সেমি দূরত্বে রোপণ করে কয়েক দিন ছায়া দিন (আগাম রোপণে)।',
      en: 'Transplant 25–30 day seedlings at 50×45 cm spacing; provide light temporary shade in early warm weather.',
    },
    fertilizerManagement: {
      bn: 'কম্পোস্ট ও মূল সারের সাথে বোরন ও মলিবডেনামের ঘাটতি পূরণ করলে ফুলের বাদামি দাগ ও কাণ্ড ফাঁপা হওয়া রোধ হয়।',
      en: 'Combine compost with balanced NPK and soil-guided boron/molybdenum to prevent hollow stems and browning curds.',
    },
    irrigationSchedule: {
      bn: 'নালায় হালকা ও নিয়মিত সেচ দিন—পানির অভাবে ফুল ছোট ও আঁশযুক্ত হয়ে যায়।',
      en: 'Maintain steady furrow moisture; dry stress triggers premature small "button" curds.',
    },
    growthStageCare: [
      {
        stage: { bn: 'পাতা বৃদ্ধি পর্যায়', en: 'Leaf Frame Growth' },
        guidance: {
          bn: 'গোড়ায় মাটি তুলে দিন ও ডায়মন্ডব্যাক মথ/পাতাখেকো লেদা খুঁজুন।',
          en: 'Earth up stems gently and scout inner leaves for diamondback moth and caterpillars.',
        },
      },
      {
        stage: { bn: 'ফুল সাদা রাখা (Blanching)', en: 'Curd Blanching' },
        guidance: {
          bn: 'কচি ফুলের ওপর পাশের বড় পাতা ভাঁজ করে বা বেঁধে সূর্যের কড়া রোদ থেকে ঢেকে রাখুন।',
          en: 'Fold or tie inner wrapper leaves loosely over emerging curds to keep them snow-white.',
        },
      },
    ],
    weedManagement: {
      bn: 'রোপণের ১৫ ও ৩০ দিনে দুবার হালকা নিড়ানি ও গোড়ায় মাটি তুলুন।',
      en: 'Weed twice at 15 and 30 days while earthing up rows.',
    },
    commonDiseasesAndPests: {
      bn: 'কালো পচা (Black Rot), গোড়া পচা/ড্যাম্পিং-অফ, ডায়মন্ডব্যাক মথ (DBM), কাটুই ও জাবপোকা।',
      en: 'Black Rot, Damping-off, Diamondback Moth, Cutworm, and Aphids.',
    },
    preventionAndSafeManagement: {
      bn: 'কপি পরিবারের ফসল পরপর না করে আবর্তন করুন, ফেরোমন ফাঁদ ও জৈব দমন পদ্ধতি (Bt) নিয়ে ১৬১২৩-এ কথা বলুন।',
      en: 'Rotate away from brassicas, deploy pheromone traps, and consult 16123 for biological Bt caterpillar control.',
    },
    harvesting: {
      bn: 'ফুল সম্পূর্ণ আঁটসাঁট, সাদা ও পূর্ণ আকার পেলে (ফেটে বা আলগা হওয়ার আগেই) গোড়ার ২–৩টি সুরক্ষাকারী পাতাসহ কাটুন।',
      en: 'Cut curds while still tight, bright white, and compact with 2–3 protective outer leaves.',
    },
    postHarvestStorage: {
      bn: 'পাতা দিয়ে মুড়িয়ে ছায়ায় রাখুন যাতে পরিবহনে দাগ না পড়ে।',
      en: 'Trim outer leaves neatly to cushion curds during market transport.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'বীজতলা', en: 'Nursery' },
        window: { bn: '৪ সপ্তাহ আগে', en: '4 wks pre-plant' },
        action: { bn: 'জীবাণুমুক্ত উঁচু বীজতলায় চারা তৈরি।', en: 'Grow seedlings on raised nursery beds.' },
      },
      {
        step: 2,
        stage: { bn: 'চারা রোপণ', en: 'Transplant' },
        window: { bn: '০ দিন', en: 'Day 0' },
        action: { bn: 'বেডে রোপণ ও হালকা সেচ।', en: 'Plant in cool afternoon and water lightly.' },
      },
      {
        step: 3,
        stage: { bn: 'মাটি তোলা ও পুষ্টি', en: 'Hilling & Feed' },
        window: { bn: '২০–৩০ দিন', en: 'Days 20–30' },
        action: { bn: 'নিড়ানি, বোরন-পুষ্টি ও গোড়ায় মাটি।', en: 'Weed, top-dress, and mound soil.' },
      },
      {
        step: 4,
        stage: { bn: 'ফুল বাঁধা (Blanching)', en: 'Curd Protection' },
        window: { bn: '৫০–৬৫ দিন', en: 'Days 50–65' },
        action: { bn: 'পাতা ভাঁজ করে সাদা ফুল ঢেকে দেওয়া।', en: 'Tie wrapper leaves over white curds.' },
      },
      {
        step: 5,
        stage: { bn: 'সংগ্রহ', en: 'Harvest' },
        window: { bn: '৬৫–৮৫ দিন', en: 'Days 65–85' },
        action: { bn: 'আঁটসাঁট থাকতেই কপি কাটা।', en: 'Cut firm curds with outer wrapper leaves.' },
      },
    ],
  },
  {
    id: 'cabbage',
    name: { bn: 'বাঁধাকপি', en: 'Cabbage' },
    aliases: ['badhakopi', 'পাতা কপি', 'বাঁধাকপি'],
    category: 'vegetable',
    categoryLabel: CROP_CATEGORY_LABELS.vegetable,
    imageUrl: CROP_ASSETS.vegetables,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'বাঁধাকপি বাংলাদেশের শীতকালের একটি অতি ফলনশীল ও টেকসই সবজি, যা পরিবহনে নষ্ট কম হয় এবং তুলনামূলক বেশি দিন ভালো থাকে।',
      en: 'Cabbage is a durable, high-yielding winter crop across Bangladesh that withstands long-distance transport well.',
    },
    suitableVarieties: {
      bn: 'BARI Badhakopi-1 (প্রভাতী), এটলাস-৭০, কে-কে ক্রস ও গ্রিন করনেট।',
      en: 'BARI Badhakopi-1 (Provati), Atlas-70, K-K Cross, and Green Coronet.',
    },
    suitableRegions: {
      bn: 'যশোর, বগুড়া, কুমিল্লা, রংপুর, জামালপুর ও নরসিংদী।',
      en: 'Major production belts in Jashore, Bogura, Cumilla, Rangpur, Jamalpur, and Narsingdi.',
    },
    seasonAndPlanting: {
      bn: 'অক্টোবর থেকে ডিসেম্বর পর্যন্ত চারা রোপণ করা হয়।',
      en: 'Main transplanting runs from October through December.',
    },
    soilAndPh: {
      bn: 'পানি নিষ্কাশনযোগ্য উর্বর দোআঁশ ও পলি-দোআঁশ মাটি; অনুকূল pH ৬.০ থেকে ৬.৮।',
      en: 'Fertile, well-drained loamy and silt-loam soils around pH 6.0 to 6.8.',
    },
    landPreparation: {
      bn: 'জমি ভালোভাবে চাষ করে উঁচু বেড ও নিকাশের নালা বানান এবং জৈব সার মেশান।',
      en: 'Plough thoroughly, incorporate organic manure, and shape drained planting beds.',
    },
    seedSelectionAndTreatment: {
      bn: 'প্রত্যয়িত এফ-১ বীজ বা শোধিত বীজ ব্যবহার করলে পাতা পচা ও কাণ্ড পচা রোগ কমে।',
      en: 'Use certified F1 or safely treated seeds to keep seedbeds free from black rot.',
    },
    plantingMethod: {
      bn: '২৫–৩০ দিনের সুস্থ চারা ৬০×৪৫ সেমি দূরত্বে রোপণ করুন।',
      en: 'Transplant 25–30 day seedlings at 60×45 cm spacing for full head sizing.',
    },
    fertilizerManagement: {
      bn: 'পচা গোবরের সাথে দুই কিস্তিতে ইউরিয়া ও পটাশ দিলে মাথা শক্ত ও ভারী হয়।',
      en: 'Pair basal compost with split nitrogen and potassium top-dressings for dense, heavy heads.',
    },
    irrigationSchedule: {
      bn: 'হেড বাঁধার সময় নিয়মিত রস রাখুন; তবে পরিপক্ব হওয়ার পর হঠাৎ অতিরিক্ত সেচ দিলে বাঁধাকপি ফেটে যেতে পারে।',
      en: 'Provide steady moisture during head formation, but avoid sudden heavy watering on mature heads or they will split.',
    },
    growthStageCare: [
      {
        stage: { bn: 'মাথা বাঁধা শুরু', en: 'Head Initiation' },
        guidance: {
          bn: 'ভেতরের পাতায় পাতাখেকো পোকা ও জাবপোকা আছে কি না পরীক্ষা করুন।',
          en: 'Inspect cupping inner leaves early for caterpillars and cabbage aphids.',
        },
      },
      {
        stage: { bn: 'মাথা ভারী হওয়া', en: 'Head Tightening' },
        guidance: {
          bn: 'মাথা শক্ত হয়ে গেলে সেচের ব্যবধান বাড়িয়ে দিন।',
          en: 'Ease irrigation once heads feel solid to prevent bursting.',
        },
      },
    ],
    weedManagement: {
      bn: 'রোপণের প্রথম ৩০ দিন আগাছামুক্ত রাখুন ও গোড়ায় হালকা মাটি দিন।',
      en: 'Weed cleanly during the first 30 days and earth up around stems.',
    },
    commonDiseasesAndPests: {
      bn: 'কালো পচা (Black Rot), নরম পচা (Soft Rot), ডায়মন্ডব্যাক মথ, লেদা পোকা ও জাবপোকা।',
      en: 'Black Rot, Soft Rot, Diamondback Moth, Cabbage Looper, and Aphids.',
    },
    preventionAndSafeManagement: {
      bn: 'জৈব ফাঁদ, হাত দিয়ে ডিম-কীড়া সংগ্রহ, ফসল আবর্তন এবং নিরাপদ বালাই ব্যবস্থাপনার জন্য ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Hand-pick early larvae, use traps, rotate non-brassica crops, and consult 16123.',
    },
    harvesting: {
      bn: 'বাঁধাকপি হাত দিয়ে চাপ দিলে পাথরের মতো শক্ত ও আঁটসাঁট মনে হলে ধারালো ছুরি দিয়ে কাটুন।',
      en: 'Cut heads cleanly with a sharp knife once firm and compact to hand pressure.',
    },
    postHarvestStorage: {
      bn: 'বাইরের ২–৩টি সবুজ পাতা রেখে পরিবহন করলে মাথা ক্ষতহীন ও সতেজ থাকে।',
      en: 'Leave 2–3 outer guard leaves intact to protect heads during transport.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'বীজতলা', en: 'Nursery' },
        window: { bn: '৪ সপ্তাহ আগে', en: '4 wks pre-plant' },
        action: { bn: 'সুস্থ কপি চারা উৎপাদন।', en: 'Grow uniform seedlings on raised bed.' },
      },
      {
        step: 2,
        stage: { bn: 'চারা রোপণ', en: 'Transplant' },
        window: { bn: '০ দিন', en: 'Day 0' },
        action: { bn: 'সুষম দূরত্বে চারা রোপণ।', en: 'Transplant at 60×45 cm spacing.' },
      },
      {
        step: 3,
        stage: { bn: 'গোড়া ও পাতা বৃদ্ধি', en: 'Frame Growth' },
        window: { bn: '২০–৩৫ দিন', en: 'Days 20–35' },
        action: { bn: 'নিড়ানি, উপরি সার ও মাটি তোলা।', en: 'Weed, top-dress, and mound soil.' },
      },
      {
        step: 4,
        stage: { bn: 'মাথা বাঁধা', en: 'Head Sizing' },
        window: { bn: '৪৫–৭০ দিন', en: 'Days 45–70' },
        action: { bn: 'কীড়া পর্যবেক্ষণ ও নিয়মিত সেচ।', en: 'Scout caterpillars and keep even moisture.' },
      },
      {
        step: 5,
        stage: { bn: 'সংগ্রহ', en: 'Harvest' },
        window: { bn: '৭৫–৯৫ দিন', en: 'Days 75–95' },
        action: { bn: 'শক্ত হলে ২টি পাতাসহ কাটা।', en: 'Cut firm heads keeping outer guard leaves.' },
      },
    ],
  },
  {
    id: 'beans',
    name: { bn: 'শিম (দেশি শিম)', en: 'Country Bean (Sheem)' },
    aliases: ['sheem', 'sim', 'hyacinth bean', 'শিম', 'রূপবান', 'বারি শিম'],
    category: 'vegetable',
    categoryLabel: CROP_CATEGORY_LABELS.vegetable,
    imageUrl: CROP_ASSETS.vegetables,
    sourceType: 'verified_reference',
    waterDemandLevel: 'low',
    overview: {
      bn: 'শিম বাংলাদেশের শীতকালের অত্যন্ত পুষ্টিকর ও প্রোটিনসমৃদ্ধ আমিষজাতীয় সবজি। ডাল পরিবারের ফসল হওয়ায় এটি মাটিতে নাইট্রোজেন সংবদ্ধ করে।',
      en: 'Country bean (Sheem) is a protein-rich winter legume vegetable in Bangladesh that naturally fixes atmospheric nitrogen into soil.',
    },
    suitableVarieties: {
      bn: 'BARI Sheem-1, BARI Sheem-6, IPSA Sheem-2, রূপবান ও গ্রীষ্মকালীন/আগাম শিম BARI Sheem-7।',
      en: 'BARI Sheem-1, BARI Sheem-6, IPSA Sheem-2, Rupban, and photo-insensitive BARI Sheem-7.',
    },
    suitableRegions: {
      bn: 'যশোর, ঈশ্বরদী, সীতাকুণ্ড (চট্টগ্রাম), নরসিংদী, বগুড়া ও দেশব্যাপী বসতবাড়িতে।',
      en: 'Famous in Sitakunda (Chattogram), Ishwardi, Jashore, Narsingdi, Bogura, and homesteads everywhere.',
    },
    seasonAndPlanting: {
      bn: 'সাধারণত জুলাই–আগস্ট (শ্রাবণ–ভাদ্র) মাসে বপন করা হয়; আগাম জাত জুন মাসে বোনা যায়।',
      en: 'Main sowing runs July–August (monsoon-to-autumn); early varieties start in June.',
    },
    soilAndPh: {
      bn: 'জল-নিকাশযুক্ত দোআঁশ ও এঁটেল-দোআঁশ মাটি; অনুকূল pH ৬.০ থেকে ৭.০।',
      en: 'Well-drained loamy and clay-loam soils around pH 6.0 to 7.0.',
    },
    landPreparation: {
      bn: 'জলাবদ্ধতা এড়াতে উঁচু ঢিবি বা মাদা তৈরি করে পচা গোবর ও ছাই মেশান।',
      en: 'Prepare elevated mounds or pits with compost and wood ash so monsoon water drains away.',
    },
    seedSelectionAndTreatment: {
      bn: 'পোকা-মুক্ত পুষ্ট ও চকচকে বীজ ২–৩ ঘণ্টা ভিজিয়ে বা সরাসরি মাদায় রোপণ করুন।',
      en: 'Select bold, weevil-free seeds and sow into moist pit soil.',
    },
    plantingMethod: {
      bn: '২–৩ মিটার দূরত্বে মাদায় ২টি গাছ রেখে শক্ত বাঁশ বা বাখারি-মাচায় তুলে দিন।',
      en: 'Space pits 2–3 m apart, leave 2 vigorous vines per pit, and support with bamboo trellises.',
    },
    fertilizerManagement: {
      bn: 'শিম নিজেই বায়ু থেকে নাইট্রোজেন সংগ্রহ করে—তাই অতিরিক্ত ইউরিয়া না দিয়ে কম্পোস্ট, ফসফরাস ও পটাশে জোর দিন।',
      en: 'As a legume, avoid excess urea; emphasize compost, phosphorus, and potassium for abundant podding.',
    },
    irrigationSchedule: {
      bn: 'বর্ষায় পানি জমে না থাকলে সেচ লাগে না; শীতের শুষ্কতায় ও ফুল-শিম ধরার সময় ১৫ দিন পরপর হালকা সেচ দিন।',
      en: 'Needs no irrigation in monsoon; during dry winter podding, give light watering every 12–15 days.',
    },
    growthStageCare: [
      {
        stage: { bn: 'বাউনি ও শাখা বিস্তার', en: 'Trellising' },
        guidance: {
          bn: 'লতা দ্রুত মাচায় বেঁধে দিন ও গোড়ার শুকনো পাতা সরিয়ে পরিষ্কার রাখুন।',
          en: 'Guide vines onto bamboo supports and keep pit collars clean.',
        },
      },
      {
        stage: { bn: 'ফুল ও শিম ধরা', en: 'Flowering & Pod Set' },
        guidance: {
          bn: 'জাবপোকা (কালো পোকা) ও ফল ছিদ্রকারী পোকার আক্রমণ ডগায় দেখেই ব্যবস্থা নিন।',
          en: 'Inspect flower clusters early for black bean aphids and pod borers.',
        },
      },
    ],
    weedManagement: {
      bn: 'মাদার চারপাশ আগাছামুক্ত ও ঝুরঝুরে রাখুন।',
      en: 'Keep the base of pits weed-free and mulched.',
    },
    commonDiseasesAndPests: {
      bn: 'শিমের জাবপোকা (কালো পোকা), পড বোরার (ফল ছিদ্রকারী), অ্যানথ্রাকনোজ ও মোজাইক ভাইরাস।',
      en: 'Black Bean Aphid, Pod Borer, Anthracnose pod spot, and Mosaic Virus.',
    },
    preventionAndSafeManagement: {
      bn: 'নিম তেল/সাবান-পানি দিয়ে প্রাথমিক জাবপোকা দমন, আক্রান্ত ডগা ছাঁটাই এবং বড় আক্রমণে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Control early aphids with neem/soap sprays or shoot pruning; consult 16123 for severe pod borer.',
    },
    harvesting: {
      bn: 'শিম কচি, রসালো ও বীজ মাঝারি আকারের থাকতে থাকতেই কয়েক দিন পরপর তুলুন।',
      en: 'Harvest crisp, juicy pods regularly while seeds are plump yet tender.',
    },
    postHarvestStorage: {
      bn: 'ঝুড়িতে ছায়ায় রেখে দ্রুত বাজারজাত করুন; পাকা বীজ সংরক্ষণের জন্য শুকনো শিম রোদে শুকিয়ে নিন।',
      en: 'Market fresh pods in ventilated baskets; sun-dry fully mature pods if saving dry bean seed.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'মাদা ও বপন', en: 'Mound Sowing' },
        window: { bn: 'জুলাই–আগস্ট', en: 'Jul – Aug' },
        action: { bn: 'উঁচু মাদায় ২–৩টি বীজ বপন।', en: 'Sow seeds on elevated compost mounds.' },
      },
      {
        step: 2,
        stage: { bn: 'বাউনি দেওয়া', en: 'Bamboo Trellis' },
        window: { bn: '২৫–৩৫ দিন', en: 'Days 25–35' },
        action: { bn: 'লতা মাচায় তোলা ও নিড়ানি।', en: 'Train climbing shoots onto bamboo trellises.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল ও জাবপোকা দেখা', en: 'Flowering' },
        window: { bn: '৬৫–৯০ দিন', en: 'Days 65–90' },
        action: { bn: 'জাবপোকা পর্যবেক্ষণ ও হালকা রস রক্ষা।', en: 'Scout flower racemes for aphids.' },
      },
      {
        step: 4,
        stage: { bn: 'শিম তোলা শুরু', en: 'First Harvest' },
        window: { bn: '৯৫–১১০ দিন', en: 'Days 95–110' },
        action: { bn: 'কচি ও রসালো শিম সংগ্রহ।', en: 'Begin harvesting fresh tender pods.' },
      },
      {
        step: 5,
        stage: { bn: 'শীতব্যাপী সংগ্রহ', en: 'Winter Harvest' },
        window: { bn: '১১৫–১৮০ দিন', en: 'Days 115–180' },
        action: { bn: 'সপ্তাহে দুবার তোলা ও শুষ্কতায় হালকা সেচ।', en: 'Pick twice weekly with occasional watering.' },
      },
    ],
  },
  {
    id: 'spinach',
    name: { bn: 'পালং শাক', en: 'Spinach (Palong Shak)' },
    aliases: ['palong shak', 'palong', 'পালং', 'শাক'],
    category: 'vegetable',
    categoryLabel: CROP_CATEGORY_LABELS.vegetable,
    imageUrl: CROP_ASSETS.vegetables,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'পালং শাক অতি স্বল্পমেয়াদি ও আয়রন-ভিটামিন সমৃদ্ধ শীতকালীন পাতা জাতীয় সবজি। মাত্র ৩৫–৪৫ দিনে প্রথম ফসল কাটা যায়।',
      en: 'Spinach (Palong Shak) is a fast-growing, iron-rich winter leafy green harvested within 35–45 days across Bangladesh.',
    },
    suitableVarieties: {
      bn: 'BARI Palong Shak-1 (কপি পালং), পুষ্পজ্যোতি, দেশি সবুজ পাতার পালং ও লাল-ডাঁটা পালং।',
      en: 'BARI Palong Shak-1, Pushpajyoti, and local broad-leaved green cultivars.',
    },
    suitableRegions: {
      bn: 'সাভার, নরসিংদী, গাজীপুর, নারায়ণগঞ্জ, বগুড়া ও শহর-সংলগ্ন সবজি অঞ্চল।',
      en: 'Widely grown in peri-urban belts around Dhaka (Savar), Narsingdi, Gazipur, Bogura, and nationwide.',
    },
    seasonAndPlanting: {
      bn: 'সেপ্টেম্বর থেকে জানুয়ারি পর্যন্ত শীতকালীন মৌসুমে বপন করা হয়।',
      en: 'Sown from September through January for cool-season leafy harvests.',
    },
    soilAndPh: {
      bn: 'উর্বর ও জৈব পদার্থসমৃদ্ধ দোআঁশ এবং বেলে-দোআঁশ মাটি; অনুকূল pH ৬.০ থেকে ৭.০।',
      en: 'Fertile, organic-rich loamy and sandy-loam soils around pH 6.0 to 7.0.',
    },
    landPreparation: {
      bn: 'মাটি মিহি ও ঝুরঝুরে করে ছোট ১ মিটার চওড়া উঁচু বেড তৈরি করুন যাতে নিড়ানি ও কাটা সহজ হয়।',
      en: 'Pulverize soil into fine tilth and shape narrow 1-m raised beds for easy weeding and cutting.',
    },
    seedSelectionAndTreatment: {
      bn: 'কাঁটাযুক্ত/শক্ত খোসার পালং বীজ ১২–২৪ ঘণ্টা পানিতে ভিজিয়ে তারপর ছায়ায় শুকিয়ে বুনলে দ্রুত গজায়।',
      en: 'Soak spinach seed clusters 12–24 hours before sowing to soften coats for uniform sprouting.',
    },
    plantingMethod: {
      bn: '১৫–২০ সেমি দূরত্বে অগভীর সারিতে বা ছিটিয়ে বুনুন ও হালকা মাটি দিয়ে ঢেকে দিন।',
      en: 'Sow in shallow 15–20 cm rows or broadcast lightly, raking gently into topsoil.',
    },
    fertilizerManagement: {
      bn: 'পচা গোবর ও কম্পোস্ট প্রধান; পাতা দ্রুত সতেজ করতে গজানোর ২০ দিন পর হালকা জৈব/নাইট্রোজেন উপরি প্রয়োগ দিন।',
      en: 'Rely on rich compost plus a light vegetative boost 20 days after emergence for lush green leaves.',
    },
    irrigationSchedule: {
      bn: 'শিকড় অগভীর হওয়ায় ৭–১০ দিন পরপর হালকা সেচ দিয়ে মাটি ভেজা রাখুন।',
      en: 'Because roots are shallow, provide light, even moisture every 7–10 days.',
    },
    growthStageCare: [
      {
        stage: { bn: 'অঙ্কুরোদগম ও পাতলা করা', en: 'Thinning' },
        guidance: {
          bn: 'চারা ঘন হলে ১৫ দিনে পাতলা করে দিলে প্রতিটি গাছ বড় ও রসালো পাতা দেয়।',
          en: 'Thin crowded stands at 15 days so remaining plants develop broad leaves.',
        },
      },
      {
        stage: { bn: 'হলুদ পাতা ও লেদা দেখা', en: 'Foliage Check' },
        guidance: {
          bn: 'পাতা শাক দ্রুত কাটা হয় বলে রাসায়নিক স্প্রে পরিহার করে হাত-বাছাই বা ছাই ব্যবহার করুন।',
          en: 'Because leaves are harvested quickly, avoid harsh chemicals and use safe sanitation.',
        },
      },
    ],
    weedManagement: {
      bn: 'বীজ গজানোর ১০–১৫ দিন পর সাবধানে আগাছা পরিষ্কার করুন।',
      en: 'Weed carefully once 10–15 days after germination.',
    },
    commonDiseasesAndPests: {
      bn: 'সারকোস্পোরা পাতা দাগ, ডাউনি মিলডিউ, পাতাখেকো পোকা ও জাবপোকা।',
      en: 'Cercospora Leaf Spot, Downy Mildew, leaf caterpillars, and aphids.',
    },
    preventionAndSafeManagement: {
      bn: 'অতিরিক্ত ঘন বপন না করা, শস্য পর্যায় ও জৈব দমন মেনে চলুন; কাটার আগে কখনোই বিষ স্প্রে করবেন না।',
      en: 'Avoid overcrowding, rotate leafy beds, and never apply toxic sprays close to harvest.',
    },
    harvesting: {
      bn: 'বপনের ৩৫–৪৫ দিন পর পাতা পুষ্ট হলে শিকড়সহ তোলা যায় অথবা গোড়া রেখে পাতা কাটলে ২–৩ বার পাওয়া যায়।',
      en: 'Harvest whole plants at 35–45 days or cut outer leaves above the crown for 2–3 cuts.',
    },
    postHarvestStorage: {
      bn: 'বিকেলে বা সকালে কেটে পরিষ্কার পানি দিয়ে ধুয়ে বাঁধা আঁটি ভেজা চট দিয়ে ঢেকে বাজারে পাঠান।',
      en: 'Tie clean bundles in cool hours and cover lightly with damp cloth during transport.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'ভিজিয়ে বপন', en: 'Soak & Sow' },
        window: { bn: '০ দিন', en: 'Day 0' },
        action: { bn: 'বেডে ভিজানো বীজ সারিতে বপন।', en: 'Sow soaked seeds in narrow raised beds.' },
      },
      {
        step: 2,
        stage: { bn: 'অঙ্কুর ও পাতলা করা', en: 'Thinning' },
        window: { bn: '১০–১৫ দিন', en: 'Days 10–15' },
        action: { bn: 'ঘন চারা পাতলা ও প্রথম নিড়ানি।', en: 'Thin seedlings and clear tiny weeds.' },
      },
      {
        step: 3,
        stage: { bn: 'পাতা বিস্তার', en: 'Leaf Flush' },
        window: { bn: '২০–৩০ দিন', en: 'Days 20–30' },
        action: { bn: 'হালকা সেচ ও জৈব উপরি সার।', en: 'Light irrigation and gentle leaf boost.' },
      },
      {
        step: 4,
        stage: { bn: 'প্রথম শাক সংগ্রহ', en: 'First Cut' },
        window: { bn: '৩৫–৪৫ দিন', en: 'Days 35–45' },
        action: { bn: 'কচি ও সতেজ পাতা কাটা।', en: 'Cut crisp, broad green leaves.' },
      },
      {
        step: 5,
        stage: { bn: 'দ্বিতীয় সংগ্রহ (ঐচ্ছিক)', en: 'Second Cut' },
        window: { bn: '৫৫–৬৫ দিন', en: 'Days 55–65' },
        action: { bn: 'নতুন পাতা বড় হলে পুনরায় কাটা।', en: 'Harvest regrown leaves cleanly.' },
      },
    ],
  },
  {
    id: 'carrot',
    name: { bn: 'গাজর', en: 'Carrot' },
    aliases: ['gajor', 'গাজর', 'ক্যারট', 'শীতকালীন মূল'],
    category: 'vegetable',
    categoryLabel: CROP_CATEGORY_LABELS.vegetable,
    imageUrl: CROP_ASSETS.vegetables,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'গাজর ভিটামিন-এ সমৃদ্ধ অত্যন্ত লাভজনক শীতকালীন মূল জাতীয় সবজি। গভীর, ঢেলাহীন ঝুরঝুরে মাটি ও পাতলা গোছা ছাড়া সোজা গাজর হয় না।',
      en: 'Carrot is a profitable, beta-carotene-rich root vegetable; deep stone-free tilth and proper thinning are vital for straight, smooth roots.',
    },
    suitableVarieties: {
      bn: 'নান্টেস (Nantes), নিউ কুরোডা (New Kuroda), সানটাক ও দেশি উন্নত শীতকালীন জাত।',
      en: 'Nantes, New Kuroda, and adapted commercial winter root varieties.',
    },
    suitableRegions: {
      bn: 'সাভার, বগুড়া, পাবনা (ঈশ্বরদী), মানিকগঞ্জ, কুমিল্লা ও ময়মনসিংহে ব্যাপক চাষ হয়।',
      en: 'Major hubs in Savar, Bogura, Ishwardi (Pabna), Manikganj, Cumilla, and Mymensingh.',
    },
    seasonAndPlanting: {
      bn: 'মধ্য অক্টোবর থেকে ডিসেম্বর পর্যন্ত বপনের উত্তম সময়।',
      en: 'Prime sowing runs mid-October through December.',
    },
    soilAndPh: {
      bn: 'গভীর, ঝুরঝুরে বেলে-দোআঁশ ও দোআঁশ মাটি (শক্ত বা পাথুরে মাটিতে গাজর বেঁকে বা দ্বিখণ্ডিত হয়ে যায়); pH ৬.০ থেকে ৬.৮।',
      en: 'Deep, friable sandy-loam and loam without clods; pH 6.0 to 6.8.',
    },
    landPreparation: {
      bn: '৪–৫ বার গভীর চাষ (কমপক্ষে ২০–২৫ সেমি গভীর) ও মই দিয়ে সব ঢেলা ও কাঁচা গোবর-মুক্ত উঁচু বেড তৈরি করুন।',
      en: 'Deeply till (20–25 cm) to eliminate clods and incorporate only fully rotted compost (fresh manure forks roots).',
    },
    seedSelectionAndTreatment: {
      bn: 'ক্ষুদ্র বীজ বালির সাথে মিশিয়ে সারিতে অগভীরভাবে (১–১.৫ সেমি) বুনুন এবং মাটি দিয়ে হালকা ঢেকে দিন।',
      en: 'Mix tiny seeds with dry sand for even shallow sowing (1 cm) and keep topsoil moist until sprouting.',
    },
    plantingMethod: {
      bn: '২০ সেমি দূরত্বে সারি করে চারা গজানোর পর ৫–৭ সেমি পরপর ১টি চারা রেখে বাকিগুলো পাতলা করে দিন।',
      en: 'Sow in 20 cm lines and thin seedlings to 5–7 cm apart so roots swell evenly.',
    },
    fertilizerManagement: {
      bn: 'সঠিক পটাশ ও সম্পূর্ণ পচা জৈব সার প্রয়োগ করুন—কাঁচা গোবর বা অতিরিক্ত নাইট্রোজেন দিলে মূল ফেটে যায় ও শিকড় জটা ধরে।',
      en: 'Use well-rotted compost and balanced potash; fresh manure or excessive nitrogen causes hairy, forked roots.',
    },
    irrigationSchedule: {
      bn: 'অঙ্কুরোদগম পর্যন্ত ঝাঁঝরি দিয়ে হালকা আর্দ্র রাখুন; পরে নিয়মিত নালায় সেচ দিন—হঠাৎ বেশি সেচে গাজর ফেটে যায়।',
      en: 'Mist gently until sprouting, then keep moisture uniform; sudden heavy irrigation after dryness splits roots.',
    },
    growthStageCare: [
      {
        stage: { bn: 'পাতলা করা (Thinning)', en: 'Critical Thinning' },
        guidance: {
          bn: 'চারা ৫–৭ সেমি লম্বা হলে অবশ্যই পাতলা করে দিন, নতুবা গাজর সরু থেকে যাবে।',
          en: 'Thin crowded rows ruthlessly at 5–7 cm height so roots can thicken.',
        },
      },
      {
        stage: { bn: 'মাথা ঢেকে রাখা', en: 'Shoulder Covering' },
        guidance: {
          bn: 'গাজরের উপরের মাথা মাটি থেকে বের হয়ে সবুজ হলে হালকা মাটি দিয়ে ঢেকে দিন।',
          en: 'Draw light soil over exposed root shoulders to prevent greening.',
        },
      },
    ],
    weedManagement: {
      bn: 'প্রথম ১ মাসে চারা খুব ছোট থাকায় ধৈর্য ধরে ২ বার আগাছা পরিষ্কার করুন।',
      en: 'Hand-weed carefully twice during the first month while lacy tops establish.',
    },
    commonDiseasesAndPests: {
      bn: 'অল্টারনারিয়া পাতা ঝলসানো, শিকড় গিঁট কৃমি (Root-knot nematode) এবং নরম পচা।',
      en: 'Alternaria Leaf Blight, Root-knot Nematodes, and Soft Rot.',
    },
    preventionAndSafeManagement: {
      bn: 'কৃমি দমনে গাঁদা/ধৈঞ্চা আবর্তন, ভালো পচা জৈব সার ও রোগের লক্ষণে ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Rotate out of root crops, use decomposed compost to curb nematodes, and consult 16123 for blight.',
    },
    harvesting: {
      bn: 'বপনের ৭৫–৯০ দিন পর গাজর সুন্দর কমলা রঙ ও পুষ্ট হলে মাটি সামান্য ভিজিয়ে সাবধানে তুলুন।',
      en: 'Pull roots gently from slightly moist soil 75–90 days after sowing once fully colored.',
    },
    postHarvestStorage: {
      bn: 'পাতা কেটে ছায়ায় ঠান্ডা পরিষ্কার পানিতে ধুয়ে বাতাসযুক্ত ছিদ্রযুক্ত বস্তায় রাখুন।',
      en: 'Trim green tops promptly (they draw root moisture), wash cleanly, and pack in breathable sacks.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'গভীর চাষ ও বপন', en: 'Deep Prep & Sow' },
        window: { bn: '০ দিন', en: 'Day 0' },
        action: { bn: 'ঢেলাহীন বেডে অগভীর বপন ও ঝাঁঝরি পানি।', en: 'Sow shallowly on deep tilth; mist gently.' },
      },
      {
        step: 2,
        stage: { bn: 'গজানো ও পাতলা', en: 'Thinning & Weed' },
        window: { bn: '১৮–২৫ দিন', en: 'Days 18–25' },
        action: { bn: 'আগাছা পরিষ্কার ও চারা পাতলা করা।', en: 'Thin to 5–7 cm spacing and weed carefully.' },
      },
      {
        step: 3,
        stage: { bn: 'পাতা গঠন', en: 'Top Growth' },
        window: { bn: '৩৫–৫০ দিন', en: 'Days 35–50' },
        action: { bn: 'সুষম সেচ ও উঁচু বেড সুরক্ষা।', en: 'Steady furrow watering and weed check.' },
      },
      {
        step: 4,
        stage: { bn: 'মূল মোটা হওয়া', en: 'Root Bulking' },
        window: { bn: '৫৫–৭৫ দিন', en: 'Days 55–75' },
        action: { bn: 'বের হওয়া মাথায় মাটি দেওয়া ও সুষম রস।', en: 'Cover exposed shoulders; avoid moisture swings.' },
      },
      {
        step: 5,
        stage: { bn: 'উত্তোলন ও ধোয়া', en: 'Harvest & Wash' },
        window: { bn: '৮০–৯৫ দিন', en: 'Days 80–95' },
        action: { bn: 'মূল তুলে পাতা কাটা ও পরিষ্কার ধোয়া।', en: 'Lift smoothly, top leaves, and wash cleanly.' },
      },
    ],
  },
  {
    id: 'radish',
    name: { bn: 'মূলা', en: 'Radish' },
    aliases: ['mula', 'moola', 'মূলা', 'তাসাকিসান', 'বারি মূলা'],
    category: 'vegetable',
    categoryLabel: CROP_CATEGORY_LABELS.vegetable,
    imageUrl: CROP_ASSETS.vegetables,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'মূলা অত্যন্ত দ্রুতবর্ধনশীল ও সাশ্রয়ী শীতকালীন সবজি। বপনের মাত্র ৪০–৫৫ দিনের মধ্যে বাজারজাত উপযোগী মূল ও শাক পাওয়া যায়।',
      en: 'Radish is a rapid-maturing winter root and leafy crop in Bangladesh, ready for harvest just 40–55 days after sowing.',
    },
    suitableVarieties: {
      bn: 'BARI Mula-1 (তাসাকিসান), BARI Mula-2 (পিংকী), বারি মূলা-৩ (দ্রুতি) এবং রকি-৪৫।',
      en: 'BARI Mula-1 (Tasaki San), BARI Mula-2 (Pinky), BARI Mula-3, and Rocky-45.',
    },
    suitableRegions: {
      bn: 'দেশের প্রায় সব জেলায় বিশেষ করে যশোর, বগুড়া, কুমিল্লা, নরসিংদী ও সাভারে চাষ হয়।',
      en: 'Grown nationwide, notably in Jashore, Bogura, Cumilla, Narsingdi, and Savar.',
    },
    seasonAndPlanting: {
      bn: 'আগাম বপন সেপ্টেম্বর ও মূল শীতকালীন বপন অক্টোবর–ডিসেম্বর।',
      en: 'Early sowing in September; peak winter sowing October through December.',
    },
    soilAndPh: {
      bn: 'ঢেলাহীন ঝুরঝুরে বেলে-দোআঁশ ও পলি-দোআঁশ মাটি; pH ৬.০ থেকে ৭.০।',
      en: 'Loose, friable sandy-loam and alluvial silt-loam around pH 6.0 to 7.0.',
    },
    landPreparation: {
      bn: '৩–৪ বার গভীর চাষ দিয়ে উঁচু বেড বা সারিবদ্ধ ঢিবি তৈরি করে পচা গোবর মেশান।',
      en: 'Deep-plough 3–4 times and form raised ridges or beds with well-rotted compost.',
    },
    seedSelectionAndTreatment: {
      bn: 'উন্নত জাতের পুষ্ট ও জীবাণুমুক্ত বীজ বেছে সরাসরি জমিতে বুনুন।',
      en: 'Sow plump certified seed directly into moist prepared beds.',
    },
    plantingMethod: {
      bn: '৩০×১৫ সেমি দূরত্বে ভেলিতে বা সারিতে বীজ বপন করে গজানোর পর গোছায় ১টি চারা রাখুন।',
      en: 'Sow along ridges at 30×15 cm spacing and thin to one strong seedling per spot.',
    },
    fertilizerManagement: {
      bn: 'পচা জৈব সার ও সুষম ভিত্তি সার দিন; মাত্রাতিরিক্ত ইউরিয়া মূল ফাঁপা করে তোলে।',
      en: 'Apply rotted compost and balanced NPK; excess nitrogen leaves roots pithy or split.',
    },
    irrigationSchedule: {
      bn: '১০–১২ দিন অন্তর নিয়মিত সেচ দিন—পানির অভাব হলে মূলা ঝাঁঝালো ও আঁশযুক্ত হয়ে যায়।',
      en: 'Keep soil evenly moist every 10–12 days; dry stress makes radishes woody and overly pungent.',
    },
    growthStageCare: [
      {
        stage: { bn: 'পাতলা ও মাটি তোলা', en: 'Thinning & Ridging' },
        guidance: {
          bn: '১৫ দিনে চারা পাতলা করে গোড়ায় হালকা মাটি তুলে দিন।',
          en: 'Thin crowded plants by day 15 and firm light soil around root crowns.',
        },
      },
      {
        stage: { bn: 'মাজরা ও জাবপোকা দেখা', en: 'Pest Scouting' },
        guidance: {
          bn: 'আগাছা ও পাতায় জাবপোকা/বিছা পোকার আক্রমণ পর্যবেক্ষণ করুন।',
          en: 'Inspect foliage early for aphids and mustard sawfly/caterpillars.',
        },
      },
    ],
    weedManagement: {
      bn: 'বপনের ১৫ দিনের মধ্যে একবার নিড়ানি দিলেই পাতা দ্রুত জমি ঢেকে ফেলে।',
      en: 'One early weeding around day 15 suffices before broad leaves shade the soil.',
    },
    commonDiseasesAndPests: {
      bn: 'অল্টারনারিয়া পাতা দাগ, জাবপোকা, ফ্লি বিটল ও কাটুই পোকা।',
      en: 'Alternaria Leaf Spot, Aphids, Flea Beetle, and Cutworm.',
    },
    preventionAndSafeManagement: {
      bn: 'জাবপোকায় নিম তেল/সাবান জল বা নিরাপদ দমনে ১৬১২৩-এ পরামর্শ নিন; তোলার আগে বিষ দেবেন না।',
      en: 'Use safe neem/soap control early or consult 16123; never spray chemicals close to harvest.',
    },
    harvesting: {
      bn: 'কচি ও নরম অবস্থায় (৪০–৫৫ দিনে) মূল পুষ্ট হলেই মাটি থেকে তুলে ফেলুন—দেরি করলে ভেতর ফাঁপা হয়।',
      en: 'Pull roots promptly at 40–55 days while crisp and tender; over-mature roots turn pithy.',
    },
    postHarvestStorage: {
      bn: 'মাটি ধুয়ে পরিষ্কার আঁটি বেঁধে ছায়ায় রাখুন ও দ্রুত বাজারজাত করুন।',
      en: 'Wash cleanly, tie into fresh bundles with tops, and market without delay.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'বেড ও বপন', en: 'Ridge Sowing' },
        window: { bn: '০ দিন', en: 'Day 0' },
        action: { bn: 'ঝুরঝুরে বেডে সারিতে বীজ বপন।', en: 'Sow directly onto friable ridges.' },
      },
      {
        step: 2,
        stage: { bn: 'পাতলা ও নিড়ানি', en: 'Thin & Weed' },
        window: { bn: '১২–১৫ দিন', en: 'Days 12–15' },
        action: { bn: 'চারা পাতলা ও আগাছা পরিষ্কার।', en: 'Thin seedlings cleanly and weed once.' },
      },
      {
        step: 3,
        stage: { bn: 'দ্রুত মূল বৃদ্ধি', en: 'Rapid Swelling' },
        window: { bn: '২২–৩৫ দিন', en: 'Days 22–35' },
        action: { bn: 'সুষম আর্দ্রতা ও পাতার পোকা দেখা।', en: 'Maintain steady moisture and check aphids.' },
      },
      {
        step: 4,
        stage: { bn: 'পরিপক্বতা', en: 'Peak Tenderness' },
        window: { bn: '৪০–৫০ দিন', en: 'Days 40–50' },
        action: { bn: 'মূল ফাঁপা হওয়ার আগেই তোলার প্রস্তুতি।', en: 'Check root size before pithiness develops.' },
      },
      {
        step: 5,
        stage: { bn: 'উত্তোলন ও আঁটি', en: 'Harvest & Wash' },
        window: { bn: '৪৫–৫৫ দিন', en: 'Days 45–55' },
        action: { bn: 'তুলে ধুয়ে বাজারজাতকরণ।', en: 'Pull roots, wash cleanly, and bundle.' },
      },
    ],
  },
  {
    id: 'pointed-gourd',
    name: { bn: 'পটল', en: 'Pointed Gourd (Potol)' },
    aliases: ['potol', 'parwal', 'পটল'],
    category: 'vegetable',
    categoryLabel: CROP_CATEGORY_LABELS.vegetable,
    imageUrl: CROP_ASSETS.vegetables,
    sourceType: 'verified_reference',
    waterDemandLevel: 'moderate',
    overview: {
      bn: 'পটল বাংলাদেশের অন্যতম লাভজনক গ্রীষ্ম-বর্ষাকালীন সবজি, যা বীজ থেকে নয় বরং কাণ্ডের কাটিং/মোথা থেকে চাষ হয় এবং বহু মাস ধরে ফলন দেয়।',
      en: 'Pointed gourd (Potol) is a lucrative warm-season cucurbit propagated via vine cuttings or roots rather than seed, yielding for months.',
    },
    suitableVarieties: {
      bn: 'BARI Potol-1, BARI Potol-2 এবং কাজলী, সবুজ ডোরাকাটা ও চিকন স্থানীয় জাত।',
      en: 'BARI Potol-1, BARI Potol-2, and popular striped green cultivars (Kazli).',
    },
    suitableRegions: {
      bn: 'বগুড়া, রাজশাহী, পাবনা, যশোর, ঝিনাইদহ ও কুষ্টিয়া অঞ্চলে ব্যাপকভাবে চাষ হয়।',
      en: 'Major hubs in Bogura, Rajshahi, Pabna, Jashore, Jhenaidah, and Kushtia.',
    },
    seasonAndPlanting: {
      bn: 'অক্টোবর–নভেম্বর অথবা ফেব্রুয়ারি–মার্চ মাসে কাটিং ও মোথা রোপণের সেরা সময়।',
      en: 'Planted via cuttings/roots either Oct–Nov (overwintered) or Feb–Mar.',
    },
    soilAndPh: {
      bn: 'বন্যামুক্ত উঁচু ও সুনিষ্কাশিত বেলে-দোআঁশ এবং দোআঁশ পলি মাটি; pH ৬.০ থেকে ৭.০।',
      en: 'Flood-free, well-drained sandy-loam and silty-loam soils around pH 6.0 to 7.0.',
    },
    landPreparation: {
      bn: 'ভালোভাবে চাষ দিয়ে প্রচুর গোবর-কম্পোস্টসহ ১.৫ মিটার চওড়া উঁচু বেড ও মাঝে নালা তৈরি করুন।',
      en: 'Build 1.5-m wide raised beds enriched with compost and separated by drainage trenches.',
    },
    seedSelectionAndTreatment: {
      bn: 'রোগমুক্ত স্ত্রী ও পুরুষ (প্রতি ১০টি স্ত্রী গাছের সাথে ১টি পুরুষ গাছ পরাগায়নের জন্য!) সুস্থ লতার কাটিং/মোথা বাছাই করুন।',
      en: 'Propagate via healthy root tubers or vine cuttings, maintaining roughly 1 male plant per 10 female plants for pollination!',
    },
    plantingMethod: {
      bn: 'বেডে ১.২ মিটার দূরত্বে রিং তৈরি করে মোথা বা পেঁচানো কাটিং বসিয়ে দিন এবং মাচা বা খড়ের বিছানায় লতা ছড়িয়ে দিন।',
      en: 'Plant coiled vine cuttings or roots 1.2 m apart and train runners onto bamboo trellises or clean straw beds.',
    },
    fertilizerManagement: {
      bn: 'দীর্ঘদিন ফল দেওয়ায় জৈব সারের পর বর্ষার আগে ও পরে কিস্তি সার প্রয়োগ ফলনের ধারাবাহিকতা বজায় রাখে।',
      en: 'Because harvests last months, follow basal compost with periodic balanced top-dressings.',
    },
    irrigationSchedule: {
      bn: 'গ্রীষ্মে নিয়মিত হালকা সেচ দিন এবং বর্ষায় জমিতে একদমই পানি জমতে দেবেন না—জলাবদ্ধতায় মূল পচে গাছ মরে।',
      en: 'Give regular light moisture in dry summer months; drain monsoon excess immediately as roots rot quickly.',
    },
    growthStageCare: [
      {
        stage: { bn: 'পুরুষ ও স্ত্রী অনুপাত রক্ষা', en: 'Male:Female Ratio & Pollination' },
        guidance: {
          bn: 'পরাগায়নের জন্য পুরুষ ফুল নিশ্চিত করুন এবং ভোরে হাত-পরাগায়ন করলে ফল বড় ও সোজা হয়।',
          en: 'Ensure male vines are flowering nearby; early-morning hand-pollination boosts fruit set significantly.',
        },
      },
      {
        stage: { bn: 'মাচা ও মাকড় দমন', en: 'Trellis & Mite Watch' },
        guidance: {
          bn: 'শুকনো গরমে লাল মাকড় ও নেমাটোড (শিকড় গিঁট) হচ্ছে কি না পর্যবেক্ষণ করুন।',
          en: 'Watch leaves during dry heat for spider mites and inspect stunted vines for root-knot nematodes.',
        },
      },
    ],
    weedManagement: {
      bn: 'মাদার চারপাশে খড় বিছিয়ে ও নিড়ানি দিয়ে আগাছামুক্ত রাখুন।',
      en: 'Apply straw mulch over beds and weed manually around vine bases.',
    },
    commonDiseasesAndPests: {
      bn: 'ফলের মাছি পোকা, লাল মাকড়, শিকড় গিঁট কৃমি (Nematode), গোড়া পচা ও ডাউনি মিলডিউ।',
      en: 'Fruit Fly, Red Spider Mite, Root-Knot Nematode, Vine Rot, and Downy Mildew.',
    },
    preventionAndSafeManagement: {
      bn: 'সুস্থ কাটিং ব্যবহার, প্রতি ১০ স্ত্রী গাছে ১টি পুরুষ গাছ রাখা, কিউ-লিউর ফাঁদ ও কৃমি-রোগের জন্য ১৬১২৩-এ পরামর্শ নিন।',
      en: 'Use clean cuttings, install cue-lure traps, rotate heavily nematode-infested beds, and consult 16123.',
    },
    harvesting: {
      bn: 'পরাগায়নের ১০–১২ দিন পর ফল কচি, মসৃণ ও হালকা-গাঢ় সবুজ থাকতে থাকতে বোঁটাসহ কাটুন।',
      en: 'Harvest glossy, tender fruits 10–12 days post-pollination before seeds harden.',
    },
    postHarvestStorage: {
      bn: 'ছায়ায় চটের বস্তা বা ঝুড়িতে রাখলে ৩–৪ দিন সতেজ থাকে; রোদে রাখবেন না।',
      en: 'Keep harvested gourds cool and shaded in airy sacks or baskets for up to 3–4 days.',
    },
    timeline: [
      {
        step: 1,
        stage: { bn: 'কাটিং/মোথা রোপণ', en: 'Cutting Planting' },
        window: { bn: '০ দিন', en: 'Day 0' },
        action: { bn: 'স্ত্রী-পুরুষ (১০:১) অনুপাতে রোপণ।', en: 'Plant cuttings keeping 10:1 female-to-male ratio.' },
      },
      {
        step: 2,
        stage: { bn: 'মাচা ও লতা ছড়ানো', en: 'Trellis & Mulch' },
        window: { bn: '২৫–৪০ দিন', en: 'Days 25–40' },
        action: { bn: 'মাচা বা খড় দেওয়া ও আগাছা দমন।', en: 'Train vines onto trellis/straw and weed.' },
      },
      {
        step: 3,
        stage: { bn: 'ফুল ও পরাগায়ন', en: 'Blooming & Traps' },
        window: { bn: '৫৫–৭০ দিন', en: 'Days 55–70' },
        action: { bn: 'পরাগায়ন সহায়তা ও ফেরোমন ফাঁদ।', en: 'Monitor pollination and set fly traps.' },
      },
      {
        step: 4,
        stage: { bn: 'প্রথম সংগ্রহ', en: 'First Picking' },
        window: { bn: '৭৫–৮৫ দিন', en: 'Days 75–85' },
        action: { bn: 'কচি ও পুষ্ট পটল তোলা শুরু।', en: 'Begin harvesting tender young fruits.' },
      },
      {
        step: 5,
        stage: { bn: 'দীর্ঘ মৌসুম ফলন', en: 'Multi-Month Yield' },
        window: { bn: '৯০–২১০ দিন', en: 'Days 90–210' },
        action: { bn: 'সপ্তাহে দুবার তোলা ও বর্ষা নিষ্কাশন।', en: 'Harvest twice weekly with strict drainage.' },
      },
    ],
  },
];
