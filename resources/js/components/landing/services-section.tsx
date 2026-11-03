import { useLanding } from '@/components/landing/landing-context';
import {
    SectionKicker,
    sectionTitle,
} from '@/components/landing/section-kicker';
import { cn } from '@/lib/utils';

export function ServicesSection() {
    const { t, content, lang, num, wa } = useLanding();
    const other = lang === 'bn' ? 'en' : 'bn';

    return (
        <section
            id="services"
            className="bg-forest-900 px-[clamp(20px,5vw,72px)] py-[clamp(88px,11vw,150px)] text-sand"
        >
            <div className="mx-auto max-w-[1320px]">
                <div className="mb-[clamp(40px,5vw,64px)] flex flex-wrap items-end justify-between gap-7">
                    <div data-reveal>
                        <SectionKicker
                            arabic="خِدْمَات"
                            label={t.svcKick}
                            tone="light"
                        />
                        <h2 className={cn(sectionTitle, 'mt-4 max-w-[760px]')}>
                            {t.svcTitle}
                        </h2>
                    </div>
                    <p
                        data-reveal
                        className="m-0 max-w-[420px] text-[17px] leading-[1.75] text-pretty text-sand/80"
                    >
                        {t.svcBody}
                    </p>
                </div>

                <div
                    data-stagger
                    className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,270px),1fr))] gap-[clamp(14px,1.6vw,24px)]"
                >
                    {content.services.map((sv, i) => (
                        <a
                            key={sv.title.en}
                            href={wa(t.svcMsg(sv.title[lang]))}
                            target="_blank"
                            rel="noreferrer"
                            className="relative flex min-h-[260px] flex-col justify-between gap-12 rounded-md border border-sand/12 bg-forest-800 p-7 text-sand transition-[background-color,color,transform] duration-[450ms] ease-silk hover:-translate-y-1.5 hover:bg-gold hover:text-forest-950"
                        >
                            <span className="flex items-center justify-between">
                                <span className="font-display text-[44px] leading-none opacity-90">
                                    {num(String(i + 1).padStart(2, '0'))}
                                </span>
                                <span className="grid size-11 place-items-center rounded-full border border-current text-lg">
                                    ↗
                                </span>
                            </span>
                            <span className="flex flex-col gap-2">
                                <span className="font-display text-[clamp(24px,2vw,30px)] leading-[1.3] font-semibold">
                                    {sv.title[lang]}
                                </span>
                                <span className="text-sm opacity-80">
                                    {sv.title[other]}
                                </span>
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
