import type { RefObject } from 'react';
import { useLanding } from '@/components/landing/landing-context';

export function SiteFooter() {
    const { t, content } = useLanding();

    return (
        <footer className="overflow-hidden bg-forest-950 px-[clamp(20px,5vw,72px)] pt-[clamp(56px,6vw,80px)] pb-8 text-sand">
            <div className="mx-auto max-w-[1320px]">
                <div className="font-display text-[clamp(44px,8vw,128px)] leading-[1.1] font-semibold">
                    {t.brand1}{' '}
                    <span className="text-gold-light">{t.brand2}</span>
                </div>
                <div className="mt-7 flex flex-wrap gap-2.5">
                    {content.tags.map((h) => (
                        <span
                            key={h}
                            className="rounded-full border border-sand/20 px-3.5 py-2 text-[13px] text-sand/75"
                        >
                            {h}
                        </span>
                    ))}
                </div>
                <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-sand/15 pt-6 text-sm text-sand/60">
                    <span>{t.copy}</span>
                    <span
                        lang="ar"
                        className="font-arabic text-lg text-gold-light"
                    >
                        لَبَّيْكَ ٱللَّٰهُمَّ لَبَّيْكَ
                    </span>
                </div>
            </div>
        </footer>
    );
}

export function WhatsappFab({
    pulseRef,
}: {
    pulseRef: RefObject<HTMLSpanElement | null>;
}) {
    const { t, wa } = useLanding();

    return (
        <a
            href={wa()}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="fixed right-[clamp(16px,2.5vw,32px)] bottom-[clamp(16px,2.5vw,32px)] z-[60] grid size-16 place-items-center rounded-full bg-gold text-[13px] font-bold text-forest-950 shadow-[0_12px_32px_rgba(7,42,32,.35)] transition-transform duration-[400ms] ease-silk hover:scale-[1.08]"
        >
            <span
                ref={pulseRef}
                className="absolute inset-0 rounded-full border-2 border-gold"
            />
            <span className="relative">{t.chat}</span>
        </a>
    );
}
