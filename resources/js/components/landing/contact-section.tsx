import { useLanding } from '@/components/landing/landing-context';
import {
    SectionKicker,
    sectionTitle,
} from '@/components/landing/section-kicker';
import type { Office } from '@/data/landing';
import { cn } from '@/lib/utils';

function SupervisorCard() {
    const { t, content, phone, wa } = useLanding();

    return (
        <div
            data-reveal
            className="flex flex-col gap-6 rounded-md bg-forest-900 p-[clamp(28px,3vw,44px)] text-sand"
        >
            <div className="flex items-center gap-5">
                <div className="relative size-24 flex-none overflow-hidden rounded-full border border-gold/40 bg-forest-800">
                    {content.images.supervisor ? (
                        <img
                            src={content.images.supervisor}
                            alt={t.supName}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <span
                            lang="ar"
                            className="grid h-full place-items-center font-arabic text-3xl text-gold-light"
                        >
                            حرم
                        </span>
                    )}
                </div>
                <div>
                    <div className="text-sm text-gold-light">{t.supLbl}</div>
                    <div className="mt-1 font-display text-[clamp(28px,2.6vw,36px)] leading-[1.25] font-semibold">
                        {t.supName}
                    </div>
                </div>
            </div>
            <a
                href={wa()}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col gap-1 border-y border-sand/15 py-5 text-sand hover:text-gold-light"
            >
                <span className="text-[13px] text-sand/70">imo / WhatsApp</span>
                <span className="font-display text-[clamp(34px,3.4vw,48px)] leading-[1.2] font-semibold">
                    {phone(content.mainPhone)}
                </span>
            </a>
            <div className="mt-auto flex flex-col gap-1">
                <span className="text-[13px] text-sand/70">{t.licLbl}</span>
                <span className="text-[17px] font-medium">{t.lic}</span>
            </div>
        </div>
    );
}

function OfficeRow({ office }: { office: Office }) {
    const { t, tr, phone } = useLanding();

    return (
        <div className="flex flex-col gap-2.5 border-b border-line py-[26px]">
            <span className="flex items-center gap-2.5">
                <span
                    className={cn(
                        'rounded-full px-3 py-1 text-[13px] font-semibold',
                        office.isHead
                            ? 'bg-forest-900 text-sand'
                            : 'bg-sand-3 text-ink-soft',
                    )}
                >
                    {office.isHead ? t.head : t.branch}
                </span>
                <span className="font-display text-2xl font-semibold">
                    {tr(office.area)}
                </span>
            </span>
            <span className="text-base leading-[1.7] text-ink-soft">
                {tr(office.address)}
            </span>
            <span className="flex flex-wrap gap-x-5 gap-y-2">
                {office.phones.map((p) => (
                    <a
                        key={p}
                        href={`tel:+88${p}`}
                        className="border-b border-forest-900/30 text-base font-semibold text-forest-900 hover:text-gold-dark"
                    >
                        {phone(p)}
                    </a>
                ))}
            </span>
        </div>
    );
}

export function ContactSection() {
    const { t, content } = useLanding();

    return (
        <section
            id="contact"
            className="bg-sand px-[clamp(20px,5vw,72px)] py-[clamp(88px,11vw,150px)] text-ink"
        >
            <div className="mx-auto max-w-[1320px]">
                <div data-reveal>
                    <SectionKicker arabic="تَوَاصُل" label={t.ctKick} />
                </div>
                <h2
                    data-reveal
                    className={cn(
                        sectionTitle,
                        'mt-4 mb-[clamp(40px,5vw,64px)]',
                    )}
                >
                    {t.ctTitle}
                </h2>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-stretch gap-[clamp(20px,2.4vw,36px)]">
                    <SupervisorCard />
                    <div
                        data-stagger
                        className="flex flex-col border-t border-line"
                    >
                        {content.offices.map((o) => (
                            <OfficeRow key={o.area.en} office={o} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
