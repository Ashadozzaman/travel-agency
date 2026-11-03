import { ImageSlot } from '@/components/landing/image-slot';
import { useLanding } from '@/components/landing/landing-context';
import {
    SectionKicker,
    sectionTitle,
} from '@/components/landing/section-kicker';
import { cn } from '@/lib/utils';

export function WhySection() {
    const { t, content, tr, num, width } = useLanding();

    return (
        <section
            id="why"
            className="bg-sand px-[clamp(20px,5vw,72px)] py-[clamp(88px,11vw,150px)] text-ink"
        >
            <div className="mx-auto grid max-w-[1320px] grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-start gap-[clamp(40px,6vw,96px)]">
                <div
                    className={cn(
                        'top-[110px] z-[1] bg-sand',
                        width >= 1040 ? 'sticky' : 'relative',
                    )}
                >
                    <div data-reveal>
                        <SectionKicker arabic="أَمَانَة" label={t.whyKick} />
                    </div>
                    <h2 data-reveal className={cn(sectionTitle, 'mt-4 mb-7')}>
                        {t.whyTitle}
                    </h2>
                    <div
                        data-reveal
                        className="relative aspect-[4/3] max-h-[440px] w-full overflow-hidden rounded-md bg-forest-900"
                    >
                        <ImageSlot src={content.images.why} />
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,42,32,0)_40%,rgba(7,42,32,.88)_100%)]" />
                        <div className="pointer-events-none absolute inset-x-6 bottom-[22px] flex flex-col gap-1 text-white">
                            <span
                                lang="ar"
                                className="font-arabic text-[30px] text-gold-light"
                            >
                                أَمَانَة
                            </span>
                            <span className="font-display text-[clamp(20px,2vw,26px)] font-semibold">
                                {t.whyCap}
                            </span>
                        </div>
                    </div>
                </div>

                <ol data-stagger className="m-0 flex list-none flex-col p-0">
                    {content.reasons.map((r, i) => (
                        <li
                            key={r.title.en}
                            className="grid grid-cols-[64px_1fr] gap-5 border-t border-line py-[30px]"
                        >
                            <span className="font-display text-[40px] leading-none text-gold-deep">
                                {num(String(i + 1).padStart(2, '0'))}
                            </span>
                            <span className="flex flex-col gap-2.5">
                                <span className="font-display text-[clamp(24px,2.2vw,32px)] leading-[1.3] font-semibold">
                                    {tr(r.title)}
                                </span>
                                <span className="text-[17px] leading-[1.75] text-pretty text-ink-soft">
                                    {tr(r.description)}
                                </span>
                            </span>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
