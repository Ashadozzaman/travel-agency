import { useEffect, useState } from 'react';
import { useLanding } from '@/components/landing/landing-context';
import { cn } from '@/lib/utils';

const NAV_IDS = ['packages', 'flights', 'journey', 'hajj', 'contact'];

export function SiteHeader() {
    const { t, lang, setLang, width, scrollTo, phone, wa, content } =
        useLanding();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const langBtn = (active: boolean) =>
        cn(
            'rounded-full border-0 px-3 py-2 text-[13px] font-semibold transition-colors duration-300',
            active ? 'bg-gold text-forest-950' : 'bg-transparent text-sand',
        );

    return (
        <header
            data-nav
            className={cn(
                'fixed inset-x-0 top-0 z-50 px-[clamp(16px,4vw,48px)] py-3.5 transition-[background-color] duration-500',
                scrolled
                    ? 'bg-forest-950/85 backdrop-blur-[14px]'
                    : 'bg-transparent',
            )}
        >
            <nav className="mx-auto flex max-w-[1440px] items-center justify-between gap-5">
                <a
                    href="#top"
                    onClick={scrollTo('top')}
                    className="flex items-center gap-3 text-sand"
                >
                    <span
                        lang="ar"
                        className="grid size-12 flex-none place-items-center rounded-full border border-gold font-arabic text-xl text-gold-light"
                    >
                        حرم
                    </span>
                    <span className="flex flex-col leading-[1.15]">
                        <span className="font-display text-[21px] font-semibold">
                            {t.brand1}
                        </span>
                        <span className="mt-0.5 text-xs text-gold-light">
                            {t.brand2}
                        </span>
                    </span>
                </a>

                {width >= 1100 && (
                    <div className="flex items-center gap-[30px]">
                        {NAV_IDS.map((id, i) => (
                            <a
                                key={id}
                                href={`#${id}`}
                                onClick={scrollTo(id)}
                                className="text-[15px] font-medium whitespace-nowrap text-sand opacity-85 transition-[opacity,color] duration-300 hover:text-gold-light hover:opacity-100"
                            >
                                {t.nav[i]}
                            </a>
                        ))}
                    </div>
                )}

                <div className="flex items-center gap-2.5">
                    <div className="flex gap-0.5 rounded-full border border-sand/30 p-1">
                        <button
                            type="button"
                            onClick={() => setLang('bn')}
                            className={langBtn(lang === 'bn')}
                        >
                            বাং
                        </button>
                        <button
                            type="button"
                            onClick={() => setLang('en')}
                            className={langBtn(lang === 'en')}
                        >
                            EN
                        </button>
                    </div>
                    {width >= 640 && (
                        <a
                            data-mag
                            href={wa()}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2.5 rounded-full bg-gold px-5 py-3 text-sm font-semibold whitespace-nowrap text-forest-950 hover:bg-gold-light"
                        >
                            <span className="size-2 rounded-full bg-forest-900" />
                            <span>{phone(content.mainPhone)}</span>
                        </a>
                    )}
                </div>
            </nav>
        </header>
    );
}
