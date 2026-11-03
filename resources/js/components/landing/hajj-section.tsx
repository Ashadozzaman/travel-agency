import { ImageSlot } from '@/components/landing/image-slot';
import { useLanding } from '@/components/landing/landing-context';

export function HajjSection() {
    const { t, content, wa } = useLanding();

    return (
        <section
            id="hajj"
            className="relative overflow-hidden bg-forest-950 px-[clamp(20px,5vw,72px)] py-[clamp(110px,13vw,190px)] text-sand"
        >
            <ImageSlot src={content.images.hajj} alt="Arafat" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(7,42,32,.6),rgba(7,42,32,.94)_75%)]" />
            <div className="pointer-events-none relative mx-auto flex max-w-[980px] flex-col items-center gap-[22px] text-center">
                <div
                    data-reveal
                    className="rounded-full bg-gold px-[18px] py-2 text-sm font-bold text-forest-950"
                >
                    {t.hjKick}
                </div>
                <h2
                    data-reveal
                    className="m-0 font-display text-[clamp(44px,6.6vw,108px)] leading-[1.15] font-semibold"
                >
                    {t.hjTitle}
                </h2>
                <p
                    data-reveal
                    className="m-0 max-w-[620px] text-[19px] leading-[1.75] text-sand/90"
                >
                    {t.hjBody}
                </p>
                <div
                    data-reveal
                    className="pointer-events-auto mt-2.5 flex flex-wrap justify-center gap-3"
                >
                    <a
                        data-mag
                        href={wa(t.hajjMsg)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3.5 rounded-full bg-gold px-8 py-5 text-base font-semibold text-forest-950 hover:bg-gold-light"
                    >
                        <span>{t.hjCta}</span>
                        <span>→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
