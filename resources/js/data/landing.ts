/**
 * Landing page content.
 *
 * Everything here is plain, serialisable data so that in Phase 2 the admin panel
 * can store it in the database and pass it to the page as Inertia props
 * (see `LandingContent`). Bilingual fields use `{ bn, en }` pairs.
 */

export type Lang = 'bn' | 'en';
export type Bilingual = { bn: string; en: string };

export type Tier = {
    name: Bilingual;
    arabic: string;
    flight: 'transit' | 'direct';
    /** Price per person in BDT. `null` = price on request. */
    price: number | null;
    /** Hotel distance to the Haram in metres. */
    makkahDistance: number;
    madinahDistance: number;
};

export type Service = { title: Bilingual };
export type Inclusion = { title: Bilingual };
export type Reason = { title: Bilingual; description: Bilingual };

export type Office = {
    isHead: boolean;
    area: Bilingual;
    address: Bilingual;
    phones: string[];
};

export type JourneyStep = {
    image: string;
    /** 0 = preparation, 1 = performing Umrah, 2 = Madinah & return */
    phase: 0 | 1 | 2;
    day: Bilingual;
    label: Bilingual;
    route: Bilingual;
    title: Bilingual;
    description: Bilingual;
};

export type LandingContent = {
    whatsapp: string;
    mainPhone: string;
    defaultTier: number;
    /** ISO dates (YYYY-MM-DD) of upcoming departures. */
    flightDates: string[];
    images: {
        hero: string | null;
        why: string | null;
        hajj: string | null;
        supervisor: string | null;
    };
    tiers: Tier[];
    services: Service[];
    inclusions: Inclusion[];
    reasons: Reason[];
    offices: Office[];
    journey: JourneyStep[];
    tags: string[];
};

const IMG = 'https://amintravels.com.bd';

export const landingContent: LandingContent = {
    whatsapp: '8801813240342',
    mainPhone: '01813240342',
    defaultTier: 1,
    flightDates: ['2026-11-11', '2026-11-18', '2026-11-25'],
    images: {
        hero: `${IMG}/landing/hero/hero-01.webp`,
        why: `${IMG}/images/kaaba.jpg`,
        hajj: null,
        supervisor: null,
    },
    tiers: [
        {
            name: { bn: 'ইকোনমি', en: 'Economy' },
            arabic: 'اِقْتِصَادِي',
            flight: 'transit',
            price: 130500,
            makkahDistance: 600,
            madinahDistance: 700,
        },
        {
            name: { bn: 'স্ট্যান্ডার্ড', en: 'Standard' },
            arabic: 'قِيَاسِي',
            flight: 'direct',
            price: 145500,
            makkahDistance: 500,
            madinahDistance: 700,
        },
        {
            name: { bn: 'প্রিমিয়াম', en: 'Premium' },
            arabic: 'مُمْتَاز',
            flight: 'direct',
            price: 170500,
            makkahDistance: 300,
            madinahDistance: 200,
        },
        {
            name: { bn: 'ভি আই পি', en: 'VIP' },
            arabic: 'كِبَار',
            flight: 'direct',
            price: null,
            makkahDistance: 0,
            madinahDistance: 0,
        },
    ],
    services: [
        { title: { bn: 'গ্রুপ উমরাহ কাফেলা', en: 'Group Umrah caravan' } },
        {
            title: {
                bn: 'ফ্যামেলী কাস্টমাইজড প্যাকেজ',
                en: 'Customised family package',
            },
        },
        {
            title: {
                bn: 'কাপল / স্বামী-স্ত্রী কাস্টমাইজড প্যাকেজ',
                en: 'Customised couple package',
            },
        },
        {
            title: {
                bn: '৭ / ১০ দিনের কাস্টমাইজড প্যাকেজ',
                en: '7 / 10-day custom package',
            },
        },
    ],
    inclusions: [
        { title: { bn: 'ভিসা ও এয়ার টিকেট', en: 'Visa & air ticket' } },
        {
            title: {
                bn: 'মক্কা ও মদিনায় মানসম্মত হোটেল',
                en: 'Quality hotels in Makkah & Madinah',
            },
        },
        {
            title: {
                bn: 'ট্রান্সপোর্ট ও সম্পূর্ণ জিয়ারাহ',
                en: 'Transport & full Ziyarah',
            },
        },
        {
            title: {
                bn: 'রিয়াজুল জান্নাহ ভিজিটের বিশেষ ব্যবস্থা',
                en: 'Arranged Riyad al-Jannah visit',
            },
        },
        {
            title: {
                bn: 'প্রতিদিন ৩ বেলা মানসম্মত খাবার',
                en: 'Three quality meals daily',
            },
        },
        {
            title: {
                bn: 'রুমে ৪ জন (সকল প্যাকেজে)',
                en: '4 per room (all packages)',
            },
        },
    ],
    reasons: [
        {
            title: { bn: 'বিশ্বস্ততা ও আমানতদারীতা', en: 'Honesty and trust' },
            description: {
                bn: 'দীর্ঘদিন যাবত বিশ্বস্ততা ও আমানতদারীতার সাথে হজ ও উমরাহ হাজিদের স্বপ্ন পূরণ করে আসছি।',
                en: 'For many years we have fulfilled the dreams of Hajj and Umrah pilgrims with honesty and trustworthiness.',
            },
        },
        {
            title: { bn: 'লাইসেন্সপ্রাপ্ত প্রতিষ্ঠান', en: 'A licensed agency' },
            description: {
                bn: 'সারাহ জান্নাহ ট্রাভেলস এন্ড ট্যুরস, হজ লাইসেন্স ১১৬৫ — সরকার অনুমোদিত।',
                en: 'Sarah Jannah Travels & Tours, Hajj Licence 1165 — government approved.',
            },
        },
        {
            title: { bn: 'হারামের কাছে হোটেল', en: 'Hotels near the Haram' },
            description: {
                bn: 'মক্কায় ৩০০–৬০০ মিটার, মদিনায় ২০০–৭০০ মিটার; ভি আই পি প্যাকেজে হারামাইন থেকে ০ মিটার।',
                en: '300–600 m in Makkah, 200–700 m in Madinah; 0 m from the Haramain on VIP.',
            },
        },
        {
            title: { bn: 'ডিরেক্ট ফ্লাইটের সুবিধা', en: 'Direct flights' },
            description: {
                bn: 'স্ট্যান্ডার্ড, প্রিমিয়াম ও ভি আই পি প্যাকেজে ঢাকা থেকে সরাসরি ফ্লাইট।',
                en: 'Standard, Premium and VIP packages fly direct from Dhaka.',
            },
        },
        {
            title: { bn: 'রিয়াজুল জান্নাহ ভিজিট', en: 'Riyad al-Jannah visit' },
            description: {
                bn: 'মসজিদে নববীর রিয়াজুল জান্নাহ ভিজিটের বিশেষ ব্যবস্থা প্রতিটি প্যাকেজে।',
                en: 'A special arranged visit to Riyad al-Jannah in Masjid an-Nabawi, in every package.',
            },
        },
        {
            title: { bn: 'সার্বিক তত্ত্বাবধান', en: 'Personal supervision' },
            description: {
                bn: 'মো: গিয়াসউদ্দিন পাটওয়ারীর সরাসরি তত্ত্বাবধানে — ঢাকা, কুমিল্লা ও চাঁদপুরে অফিস।',
                en: 'Overseen directly by Md. Giasuddin Patwari — offices in Dhaka, Cumilla and Chandpur.',
            },
        },
    ],
    offices: [
        {
            isHead: true,
            area: { bn: 'নয়াপল্টন, ঢাকা', en: 'Naya Paltan, Dhaka' },
            address: {
                bn: '৬১/১ পল্টন চায়না টাউনের পশ্চিম পাশে, লিফট ১১, রুম ১২/০৬, নয়াপল্টন, ঢাকা ১০০০',
                en: '61/1 Paltan, west side of China Town, Lift 11, Room 12/06, Naya Paltan, Dhaka 1000',
            },
            phones: ['01813240342'],
        },
        {
            isHead: false,
            area: { bn: 'বরুড়া, কুমিল্লা', en: 'Barura, Cumilla' },
            address: {
                bn: 'বাঘমারা বাজার, মহিলা কলেজ রোড, ছোটতুলাগাও, বরুড়া, কুমিল্লা',
                en: 'Baghmara Bazar, Mohila College Road, Chhototulagao, Barura, Cumilla',
            },
            phones: ['01686096372', '01911182679'],
        },
        {
            isHead: false,
            area: { bn: 'কচুয়া, চাঁদপুর', en: 'Kachua, Chandpur' },
            address: {
                bn: 'ঘাগড়া বাজার, কচুয়া, চাঁদপুর',
                en: 'Ghagra Bazar, Kachua, Chandpur',
            },
            phones: ['01631176813', '01616584701'],
        },
    ],
    journey: [
        {
            image: `${IMG}/landing/time-line/time-line-01.webp`,
            phase: 0,
            day: { bn: '১', en: '1' },
            label: { bn: 'যাত্রা', en: 'Departure' },
            route: { bn: 'ঢাকা → জেদ্দা', en: 'Dhaka → Jeddah' },
            title: { bn: 'ঢাকা থেকে যাত্রা', en: 'Leaving Dhaka' },
            description: {
                bn: 'হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দরে ব্রিফিং ও ইহরামের প্রস্তুতি।',
                en: 'Briefing and Ihram preparation at Hazrat Shahjalal International Airport.',
            },
        },
        {
            image: `${IMG}/landing/time-line/time-line-02.webp`,
            phase: 0,
            day: { bn: '২', en: '2' },
            label: { bn: 'আগমন', en: 'Arrival' },
            route: { bn: 'জেদ্দা → মক্কা', en: 'Jeddah → Makkah' },
            title: { bn: 'মক্কায় পৌঁছানো', en: 'Arriving in Makkah' },
            description: {
                bn: 'ইমিগ্রেশন শেষে হোটেলে চেক-ইন ও বিশ্রাম।',
                en: 'Clear immigration, check in to the hotel and rest.',
            },
        },
        {
            image: `${IMG}/images/kaaba.jpg`,
            phase: 1,
            day: { bn: '২', en: '2' },
            label: { bn: 'উমরাহ', en: 'Umrah' },
            route: { bn: 'মসজিদুল হারাম', en: 'Masjid al-Haram' },
            title: { bn: 'উমরাহ পালন', en: 'Performing Umrah' },
            description: {
                bn: 'তাওয়াফ, সাফা-মারওয়ার মাঝে সাঈ এবং হলক বা কসর — অভিজ্ঞ গাইডের সাথে।',
                en: "Tawaf, Sa'i between Safa and Marwa, then Halq or Qasr — with an experienced guide.",
            },
        },
        {
            image: `${IMG}/landing/time-line/time-line-03.webp`,
            phase: 1,
            day: { bn: '৩+', en: '3+' },
            label: { bn: 'মক্কা', en: 'Makkah' },
            route: { bn: 'মক্কা', en: 'Makkah' },
            title: { bn: 'মক্কা জিয়ারাহ', en: 'Makkah Ziyarah' },
            description: {
                bn: 'জাবালে নূর, জাবালে সাওর, মিনা, আরাফাহ ও মুজদালিফা পরিদর্শন।',
                en: 'Visits to Jabal al-Nour, Jabal Thawr, Mina, Arafah and Muzdalifah.',
            },
        },
        {
            image: `${IMG}/landing/time-line/time-line-08.webp`,
            phase: 2,
            day: { bn: '৬+', en: '6+' },
            label: { bn: 'মদিনা', en: 'Madinah' },
            route: { bn: 'মক্কা → মদিনা', en: 'Makkah → Madinah' },
            title: { bn: 'মদিনা মুনাওয়ারা', en: 'Madinah al-Munawwarah' },
            description: {
                bn: 'মসজিদে নববীতে সালাত ও রওজা মোবারক জিয়ারত।',
                en: 'Prayer in Masjid an-Nabawi and visiting the Rawdah.',
            },
        },
        {
            image: `${IMG}/landing/time-line/time-line-07.webp`,
            phase: 2,
            day: { bn: '৭+', en: '7+' },
            label: { bn: 'রিয়াজুল জান্নাহ', en: 'Rawdah' },
            route: { bn: 'মসজিদে নববী', en: 'Masjid an-Nabawi' },
            title: { bn: 'রিয়াজুল জান্নাহ', en: 'Riyad al-Jannah' },
            description: {
                bn: 'রিয়াজুল জান্নাহ ভিজিটের বিশেষ ব্যবস্থা।',
                en: 'A specially arranged visit to Riyad al-Jannah.',
            },
        },
        {
            image: `${IMG}/landing/time-line/time-line-06.webp`,
            phase: 2,
            day: { bn: '৮+', en: '8+' },
            label: { bn: 'জিয়ারাহ', en: 'Ziyarah' },
            route: { bn: 'মদিনা', en: 'Madinah' },
            title: { bn: 'মদিনা জিয়ারাহ', en: 'Madinah Ziyarah' },
            description: {
                bn: 'মসজিদে কুবা, জান্নাতুল বাকি, উহুদ ও মসজিদে কিবলাতাইন।',
                en: "Masjid Quba, Jannat al-Baqi', Uhud and Masjid al-Qiblatayn.",
            },
        },
        {
            image: `${IMG}/landing/time-line/time-line-09.webp`,
            phase: 2,
            day: { bn: 'শেষ', en: 'Last' },
            label: { bn: 'প্রত্যাবর্তন', en: 'Return' },
            route: { bn: 'মদিনা → ঢাকা', en: 'Madinah → Dhaka' },
            title: { bn: 'দেশে ফেরা', en: 'Returning home' },
            description: {
                bn: 'ইনশাআল্লাহ মাকবুল উমরাহ নিয়ে প্রিয়জনদের কাছে ফেরা।',
                en: "Home to your loved ones — insha'Allah with an accepted Umrah.",
            },
        },
    ],
    tags: [
        '#উমরাহ_২০২৬',
        '#Umrah2026',
        '#UmrahPackages',
        '#উমরাহ_প্যাকেজ',
        '#হজ_২০২৮_প্রাক_নিবন্ধন',
        '#AlHaramain',
    ],
};
