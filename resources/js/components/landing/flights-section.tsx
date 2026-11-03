import { useLanding } from '@/components/landing/landing-context';
import {
    SectionKicker,
    sectionTitle,
} from '@/components/landing/section-kicker';

export function FlightsSection() {
    const { t, dates, setDate, scrollTo } = useLanding();

    return (
        <section
            id="flights"
            className="bg-forest-950 px-[clamp(20px,5vw,72px)] py-[clamp(88px,11vw,150px)] text-sand"
        >
            <div className="mx-auto max-w-[1320px]">
                <div className="mb-[clamp(40px,5vw,64px)] flex flex-wrap items-end justify-between gap-6">
                    <div data-reveal>
                        <SectionKicker
                            arabic="رِحْلَة"
                            label={t.flKick}
                            tone="light"
                        />
                        <h2 className={`${sectionTitle} mt-4`}>{t.flTitle}</h2>
                    </div>
                    <p
                        data-reveal
                        className="m-0 max-w-[380px] text-[17px] leading-[1.75] text-sand/80"
                    >
                        {t.flBody}
                    </p>
                </div>

                <div
                    data-stagger
                    className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-px border border-sand/15 bg-sand/15"
                >
                    {dates.map((d, i) => (
                        <button
                            key={d.iso}
                            type="button"
                            onClick={() => {
                                setDate(i);
                                scrollTo('packages')();
                            }}
                            className="flex flex-col gap-5 border-0 bg-forest-950 p-[clamp(28px,3vw,44px)] text-left text-sand transition-colors duration-[450ms] hover:bg-forest-900"
                        >
                            <span className="flex items-center justify-between text-sm text-gold-light">
                                <span>✈ {t.dhakaJeddah}</span>
                                <span>{d.left}</span>
                            </span>
                            <span className="font-display text-[clamp(88px,9vw,140px)] leading-none font-semibold">
                                {d.day}
                            </span>
                            <span className="flex items-center justify-between gap-3 border-t border-sand/15 pt-[18px]">
                                <span className="text-lg">{d.month}</span>
                                <span className="text-sm font-semibold text-gold-light">
                                    {t.choose} →
                                </span>
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
