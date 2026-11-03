import type Lenis from 'lenis';
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import type { ReactNode, RefObject } from 'react';
import type { Bilingual, LandingContent, Lang } from '@/data/landing';
import { BD, strings } from '@/data/landing-i18n';
import type { Strings } from '@/data/landing-i18n';

export type FlightDate = {
    iso: string;
    day: string;
    month: string;
    monthLong: string;
    daysLeft: number;
    left: string;
};

type LandingCtx = {
    content: LandingContent;
    lang: Lang;
    setLang: (l: Lang) => void;
    t: Strings;
    /** Pick the current-language value of a bilingual field. */
    tr: (b: Bilingual) => string;
    /** Format a number with Bangla digits when the language is bn. */
    num: (n: string | number) => string;
    money: (n: number | null) => string;
    phone: (p: string) => string;
    distance: (m: number) => string;
    wa: (text?: string) => string;
    tier: number;
    setTier: (i: number) => void;
    date: number;
    setDate: (i: number) => void;
    dates: FlightDate[];
    bookLink: string;
    width: number;
    lenisRef: RefObject<Lenis | null>;
    scrollTo: (id: string) => (e?: { preventDefault: () => void }) => void;
};

const Ctx = createContext<LandingCtx | null>(null);

export function useLanding(): LandingCtx {
    const c = useContext(Ctx);

    if (!c) {
        throw new Error('useLanding must be used inside <LandingProvider>');
    }

    return c;
}

const dhakaMidnight = (iso: string) => new Date(`${iso}T00:00:00+06:00`);

function useWindowWidth() {
    const [w, setW] = useState(() =>
        typeof window === 'undefined' ? 1440 : window.innerWidth,
    );

    useEffect(() => {
        const onResize = () => setW(window.innerWidth);
        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);

    return w;
}

export function LandingProvider({
    content,
    defaultLang = 'bn',
    children,
}: {
    content: LandingContent;
    defaultLang?: Lang;
    children: ReactNode;
}) {
    const [lang, setLang] = useState<Lang>(defaultLang);
    const [tier, setTier] = useState(content.defaultTier);
    const [date, setDate] = useState(() => {
        const i = content.flightDates.findIndex(
            (d) => new Date(`${d}T23:59:00+06:00`).getTime() > Date.now(),
        );

        return Math.max(0, i);
    });
    const width = useWindowWidth();
    const lenisRef = useRef<Lenis | null>(null);

    const value = useMemo<LandingCtx>(() => {
        const t = strings[lang];
        const bn = lang === 'bn';
        const num = (n: string | number) => (bn ? BD(n) : String(n));
        const locale = bn ? 'bn-BD' : 'en-GB';
        const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
            new Intl.DateTimeFormat(locale, {
                timeZone: 'Asia/Dhaka',
                ...opts,
            }).format(dhakaMidnight(iso));

        const dates: FlightDate[] = content.flightDates.map((iso) => {
            const daysLeft = Math.ceil(
                (dhakaMidnight(iso).getTime() - Date.now()) / 864e5,
            );

            return {
                iso,
                day: num(Number(iso.slice(8, 10))),
                month: fmt(iso, { month: bn ? 'long' : 'short' }),
                monthLong: `${fmt(iso, { month: 'long' })} ${num(iso.slice(0, 4))}`,
                daysLeft,
                left: t.left(daysLeft),
            };
        });

        const wa = (text?: string) =>
            `https://wa.me/${content.whatsapp}` +
            (text ? `?text=${encodeURIComponent(text)}` : '');

        const current = content.tiers[tier] ?? content.tiers[0];
        const d = dates[date];
        const bookLink = wa(
            t.msg(current.name[lang], d ? `${d.day} ${d.monthLong}` : ''),
        );

        const scrollTo =
            (id: string) => (e?: { preventDefault: () => void }) => {
                e?.preventDefault();
                const el = id === 'top' ? 0 : document.getElementById(id);

                if (el === null) {
                    return;
                }

                if (lenisRef.current) {
                    lenisRef.current.scrollTo(el, {
                        offset: -10,
                        duration: 1.6,
                    });
                } else {
                    window.scrollTo({
                        top:
                            el === 0
                                ? 0
                                : el.getBoundingClientRect().top +
                                  window.scrollY,
                        behavior: 'smooth',
                    });
                }
            };

        return {
            content,
            lang,
            setLang,
            t,
            tr: (b) => b[lang],
            num,
            money: (n) =>
                n == null
                    ? t.negotiable
                    : '৳ ' + num(n.toLocaleString('en-IN')),
            phone: (p) => num(`${p.slice(0, 5)}-${p.slice(5)}`),
            distance: (m) => `${num(m)} ${t.m}`,
            wa,
            tier,
            setTier,
            date,
            setDate,
            dates,
            bookLink,
            width,
            lenisRef,
            scrollTo,
        };
    }, [content, lang, tier, date, width]);

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
