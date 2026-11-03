import { useLanding } from '@/components/landing/landing-context';
import {
    SectionKicker,
    sectionTitle,
} from '@/components/landing/section-kicker';

export function InclusionsSection() {
    const { t, content, lang, num } = useLanding();
    const other = lang === 'bn' ? 'en' : 'bn';

    return (
        <section className="bg-sand px-[clamp(20px,5vw,72px)] py-[clamp(88px,11vw,150px)] text-ink">
            <div className="mx-auto max-w-[1320px]">
                <div data-reveal className="mb-[clamp(40px,5vw,64px)]">
                    <SectionKicker arabic="أَمَانَة" label={t.incKick} />
                    <h2 className={`${sectionTitle} mt-4`}>{t.incTitle}</h2>
                </div>

                <div
                    data-stagger
                    className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] border-t border-line"
                >
                    {content.inclusions.map((c, i) => (
                        <div
                            key={c.title.en}
                            className="grid grid-cols-[52px_1fr] items-start gap-4 border-b border-line py-[30px] pr-6"
                        >
                            <span className="grid size-[52px] place-items-center rounded-full bg-forest-900 font-display text-[22px] text-gold-light">
                                {num(i + 1)}
                            </span>
                            <span className="flex flex-col gap-1.5 pt-1.5">
                                <span className="font-display text-2xl leading-[1.3] font-semibold">
                                    {c.title[lang]}
                                </span>
                                <span className="text-sm text-ink-muted">
                                    {c.title[other]}
                                </span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
