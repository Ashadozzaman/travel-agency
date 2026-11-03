import type { RefObject } from 'react';
import { ImageSlot } from '@/components/landing/image-slot';
import { useLanding } from '@/components/landing/landing-context';
import {
    SectionKicker,
    sectionTitle,
} from '@/components/landing/section-kicker';
import type { JourneyStep } from '@/data/landing';

function JourneyCard({ step }: { step: JourneyStep }) {
    const { tr } = useLanding();

    return (
        <article
            data-jcard
            className="flex flex-[0_0_clamp(280px,27vw,400px)] flex-col gap-3.5"
        >
            <div className="relative h-[clamp(240px,38vh,420px)] overflow-hidden rounded bg-forest-900">
                <div
                    data-jimg
                    className="absolute top-0 -left-[10%] h-full w-[120%]"
                >
                    <ImageSlot src={step.image} alt={tr(step.title)} />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,42,32,0)_45%,rgba(7,42,32,.9))]" />
                <span className="pointer-events-none absolute bottom-3 left-5 font-display text-[56px] leading-[1.1] font-semibold">
                    {tr(step.day)}
                </span>
                <span className="pointer-events-none absolute top-3.5 right-3.5 rounded-full bg-forest-950/60 px-3 py-1.5 text-[13px] font-semibold backdrop-blur-[8px]">
                    {tr(step.label)}
                </span>
            </div>
            <span className="text-sm font-semibold text-gold-light">
                {tr(step.route)}
            </span>
            <h3 className="m-0 font-display text-[28px] leading-[1.3] font-semibold">
                {tr(step.title)}
            </h3>
            <p className="m-0 text-[15px] leading-[1.75] text-pretty text-sand/75">
                {tr(step.description)}
            </p>
        </article>
    );
}

export function JourneySection({
    sectionRef,
    trackRef,
    progressRef,
    phase,
    horizontal,
}: {
    sectionRef: RefObject<HTMLElement | null>;
    trackRef: RefObject<HTMLDivElement | null>;
    progressRef: RefObject<HTMLDivElement | null>;
    phase: number;
    horizontal: boolean;
}) {
    const { t, content, bookLink } = useLanding();

    return (
        <section
            id="journey"
            ref={sectionRef}
            className={`flex flex-col overflow-hidden bg-forest-950 text-sand ${horizontal ? 'min-h-screen' : ''}`}
        >
            <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-end justify-between gap-6 px-[clamp(20px,5vw,72px)] pt-[clamp(96px,9vw,120px)] pb-8">
                <div>
                    <SectionKicker arabic="لَبَّيْكَ" label={t.jKick} tone="light" />
                    <h2 className={`${sectionTitle} mt-4`}>{t.jTitle}</h2>
                </div>
                <div className="flex min-w-[min(100%,420px)] flex-col gap-3.5">
                    <div className="flex gap-6 text-sm font-semibold">
                        {t.phases.map((label, i) => (
                            <span
                                key={label}
                                className={`transition-colors duration-[400ms] ${i === phase ? 'text-gold-light' : 'text-sand/55'}`}
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                    <div className="h-0.5 overflow-hidden bg-sand/15">
                        <div
                            ref={progressRef}
                            className="h-full origin-left scale-x-0 bg-gold"
                        />
                    </div>
                </div>
            </div>

            <div
                className={`flex flex-1 items-center pb-[clamp(40px,5vw,64px)] ${horizontal ? 'overflow-x-visible' : 'overflow-x-auto'}`}
            >
                <div
                    ref={trackRef}
                    className="flex w-max gap-[clamp(20px,2.4vw,40px)] px-[clamp(20px,5vw,72px)]"
                >
                    {content.journey.map((step, i) => (
                        <JourneyCard key={i} step={step} />
                    ))}
                    <a
                        href={bookLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-[0_0_clamp(240px,20vw,300px)] flex-col items-start justify-center gap-5 self-stretch rounded border border-sand/25 p-8 text-sand transition-[background-color,border-color] duration-[400ms] hover:border-gold hover:bg-forest-900"
                    >
                        <span
                            lang="ar"
                            className="font-arabic text-4xl text-gold-light"
                        >
                            عُمْرَة مَقْبُولَة
                        </span>
                        <span className="font-display text-[30px] leading-[1.3] font-semibold">
                            {t.jEnd}
                        </span>
                        <span className="grid size-14 place-items-center rounded-full bg-gold text-xl text-forest-950">
                            →
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
}
