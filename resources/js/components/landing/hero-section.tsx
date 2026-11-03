import type { RefObject } from 'react';
import { ImageSlot } from '@/components/landing/image-slot';
import { useLanding } from '@/components/landing/landing-context';

export function HeroSection({
    heroRef,
    heroWrapRef,
    heroImgRef,
}: {
    heroRef: RefObject<HTMLElement | null>;
    heroWrapRef: RefObject<HTMLDivElement | null>;
    heroImgRef: RefObject<HTMLDivElement | null>;
}) {
    const { t, dates, scrollTo, wa, content } = useLanding();
    const next = dates.find((d) => d.daysLeft >= 0) ?? dates[0];

    return (
        <section
            id="top"
            ref={heroRef}
            className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-forest-950 text-sand"
        >
            <div ref={heroWrapRef} className="absolute -inset-[4%]">
                <div ref={heroImgRef} className="absolute inset-0">
                    <ImageSlot
                        src={content.images.hero}
                        alt="Masjid al-Haram"
                        eager
                    />
                </div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,42,32,.75)_0%,rgba(7,42,32,.2)_30%,rgba(7,42,32,.6)_60%,#072a20_100%)]" />

            <div className="pointer-events-none relative mx-auto w-full max-w-[1440px] px-[clamp(20px,5vw,72px)] pt-[140px] pb-[clamp(36px,5vw,64px)]">
                {next && (
                    <div
                        data-hfade
                        className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-gold-light/35 bg-forest-950/55 py-2 pr-4 pl-2.5 text-sm font-medium backdrop-blur-[10px]"
                    >
                        <span className="rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-forest-950">
                            {t.nextLbl}
                        </span>
                        <span>
                            {next.day} {next.monthLong} · {next.left}
                        </span>
                    </div>
                )}

                <h1 className="mt-6 font-display text-[clamp(52px,9vw,150px)] leading-[1.12] font-semibold tracking-[-.01em]">
                    <span className="block overflow-hidden pb-[.04em]">
                        {t.heroL1.map((w, i) => (
                            <span
                                key={`${w}-${i}`}
                                data-hw
                                className="mr-[.24em] inline-block"
                            >
                                {w}
                            </span>
                        ))}
                    </span>
                    <span className="block overflow-hidden pb-[.08em]">
                        {t.heroL2.map((w, i) => (
                            <span
                                key={`${w}-${i}`}
                                data-hw
                                className="mr-[.24em] inline-block text-gold-light"
                            >
                                {w}
                            </span>
                        ))}
                    </span>
                </h1>

                <div className="mt-[clamp(20px,3vw,36px)] flex flex-wrap items-end justify-between gap-8">
                    <p
                        data-hfade
                        className="m-0 max-w-[560px] text-[clamp(17px,1.4vw,20px)] leading-[1.7] text-pretty text-sand/90"
                    >
                        {t.heroSub}
                    </p>
                    <div
                        data-hfade
                        className="pointer-events-auto flex flex-wrap gap-3"
                    >
                        <a
                            data-mag
                            href="#packages"
                            onClick={scrollTo('packages')}
                            className="inline-flex items-center gap-3.5 rounded-full bg-gold px-[30px] py-5 text-base font-semibold text-forest-950 hover:bg-gold-light"
                        >
                            <span>{t.cta1}</span>
                            <span>→</span>
                        </a>
                        <a
                            data-mag
                            href={wa()}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-3.5 rounded-full border border-sand/45 px-[30px] py-5 text-base font-semibold text-sand hover:bg-sand/10"
                        >
                            <span>{t.cta2}</span>
                        </a>
                    </div>
                </div>

                <div
                    data-hfade
                    className="mt-[clamp(32px,4vw,56px)] flex flex-wrap gap-x-6 gap-y-2.5 border-t border-sand/20 pt-6 text-[15px] text-sand/80"
                >
                    {t.trust.map((item) => (
                        <span key={item} className="flex items-center gap-2.5">
                            <span className="text-gold">✦</span>
                            <span>{item}</span>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
