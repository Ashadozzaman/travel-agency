import { useLanding } from '@/components/landing/landing-context';
import {
    SectionKicker,
    sectionTitle,
} from '@/components/landing/section-kicker';
import type { Tier } from '@/data/landing';
import { cn } from '@/lib/utils';

const MAX_DISTANCE = 800;

function TierButton({
    tier,
    index,
    active,
    onPick,
}: {
    tier: Tier;
    index: number;
    active: boolean;
    onPick: () => void;
}) {
    const { t, tr, num, money, distance } = useLanding();
    const distLine =
        tier.makkahDistance === 0
            ? t.vipLine
            : `${t.mk} ${distance(tier.makkahDistance)} · ${t.md} ${distance(tier.madinahDistance)}`;

    return (
        <button
            type="button"
            onClick={onPick}
            className={cn(
                'grid w-full grid-cols-[40px_1fr_auto] items-center gap-4 border-0 border-b border-line py-6 pr-5 text-left transition-[background-color,color,padding] duration-[450ms]',
                active
                    ? 'bg-forest-900 pl-8 text-sand'
                    : 'bg-transparent pl-5 text-ink',
            )}
        >
            <span
                className={cn(
                    'text-sm font-semibold',
                    active ? 'text-gold-light' : 'text-ink-muted',
                )}
            >
                {num(String(index + 1).padStart(2, '0'))}
            </span>
            <span className="flex flex-col gap-1.5">
                <span className="font-display text-[28px] leading-[1.15] font-semibold">
                    {tr(tier.name)}
                </span>
                <span
                    className={cn(
                        'text-sm',
                        active ? 'text-gold-light' : 'text-ink-muted',
                    )}
                >
                    {t[tier.flight]} · {distLine}
                </span>
            </span>
            <span className="text-right text-lg font-bold">
                {money(tier.price)}
            </span>
        </button>
    );
}

function DistanceBar({ city, metres }: { city: string; metres: number }) {
    const { distance } = useLanding();
    const pct = Math.min(metres / MAX_DISTANCE, 1) * 100;

    return (
        <div>
            <div className="flex justify-between gap-3 text-base">
                <span>{city}</span>
                <span className="font-semibold text-gold-light">
                    {distance(metres)}
                </span>
            </div>
            <div className="relative mt-1.5 h-[30px]">
                <div className="absolute inset-x-0 top-3.5 h-0.5 bg-sand/20" />
                <div
                    className="absolute top-3.5 left-0 h-0.5 bg-gold transition-[width] duration-1000 ease-silk"
                    style={{ width: `${pct}%` }}
                />
                <div className="absolute top-1.5 left-0 size-[18px] rounded-full bg-gold-light shadow-[0_0_0_6px_rgba(227,200,138,.18)]" />
                <div
                    className="absolute top-1 size-[22px] rounded border-2 border-sand bg-forest-900 transition-[left] duration-1000 ease-silk"
                    style={{ left: `calc(${pct}% - ${pct ? 11 : 0}px)` }}
                />
            </div>
        </div>
    );
}

function DatePicker() {
    const { t, dates, date, setDate } = useLanding();

    return (
        <div data-tanim>
            <div className="mb-3 text-sm text-sand/75">{t.pickDate}</div>
            <div className="grid grid-cols-3 gap-2">
                {dates.map((d, i) => {
                    const active = i === date;

                    return (
                        <button
                            key={d.iso}
                            type="button"
                            onClick={() => setDate(i)}
                            className={cn(
                                'rounded-md border px-2.5 py-3.5 text-center transition-[background-color,color,border-color] duration-300',
                                active
                                    ? 'border-gold bg-gold text-forest-950'
                                    : 'border-sand/20 bg-transparent text-sand',
                            )}
                        >
                            <span className="block font-display text-[30px] leading-[1.1] font-semibold">
                                {d.day}
                            </span>
                            <span className="mt-0.5 block text-[13px]">
                                {d.month}
                            </span>
                            <span className="mt-1.5 block text-xs opacity-80">
                                {d.left}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function PackageDetail() {
    const { t, tr, content, tier, money, bookLink } = useLanding();
    const cur = content.tiers[tier] ?? content.tiers[0];

    return (
        <div className="flex flex-col gap-[30px] rounded-md bg-forest-900 p-[clamp(24px,3vw,40px)] text-sand">
            <div
                data-tanim
                className="flex flex-wrap items-start justify-between gap-4"
            >
                <div>
                    <div className="inline-flex rounded-full bg-gold-light/16 px-3 py-1.5 text-[13px] font-semibold text-gold-light">
                        {t[cur.flight]}
                    </div>
                    <div className="mt-3 font-display text-[clamp(40px,4vw,58px)] leading-[1.15] font-semibold">
                        {tr(cur.name)}
                    </div>
                </div>
                <span
                    lang="ar"
                    className="font-arabic text-[clamp(40px,4.5vw,64px)] leading-none text-gold-light/85"
                >
                    {cur.arabic}
                </span>
            </div>

            <div data-tanim className="flex flex-col gap-5">
                <div className="text-sm text-sand/75">{t.distTitle}</div>
                <DistanceBar city={t.mk} metres={cur.makkahDistance} />
                <DistanceBar city={t.md} metres={cur.madinahDistance} />
                <div className="flex justify-between text-xs text-sand/60">
                    <span>{t.haram}</span>
                    <span>{t.scaleEnd}</span>
                </div>
            </div>

            <DatePicker />

            <div data-tanim className="flex flex-wrap gap-2">
                {t.chips.map((c) => (
                    <span
                        key={c}
                        className="rounded-full border border-sand/20 px-3.5 py-2 text-sm"
                    >
                        {c}
                    </span>
                ))}
            </div>

            <div
                data-tanim
                className="flex flex-wrap items-end justify-between gap-5 border-t border-sand/15 pt-6"
            >
                <div>
                    <div className="text-sm text-sand/70">
                        {cur.price == null ? t.ask : t.perPerson}
                    </div>
                    <div className="mt-1 font-display text-[clamp(36px,3.8vw,52px)] leading-[1.2] font-semibold">
                        {money(cur.price)}
                    </div>
                </div>
                <a
                    data-mag
                    href={bookLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-gold px-6 py-4 text-[15px] font-semibold text-forest-950 hover:bg-gold-light"
                >
                    <span>{t.book}</span>
                    <span>→</span>
                </a>
            </div>
        </div>
    );
}

export function PackagesSection() {
    const { t, content, tier, setTier } = useLanding();

    return (
        <section
            id="packages"
            className="bg-sand-2 px-[clamp(20px,5vw,72px)] py-[clamp(88px,11vw,150px)] text-ink"
        >
            <div className="mx-auto max-w-[1320px]">
                <div data-reveal className="mb-[clamp(40px,5vw,64px)]">
                    <SectionKicker arabic="عُمْرَة" label={t.pkgKick} />
                    <h2 className={cn(sectionTitle, 'mt-4 max-w-[860px]')}>
                        {t.pkgTitle}
                    </h2>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-[clamp(24px,3vw,44px)]">
                    <div
                        data-stagger
                        className="flex flex-col border-t border-line"
                    >
                        {content.tiers.map((p, i) => (
                            <TierButton
                                key={p.name.en}
                                tier={p}
                                index={i}
                                active={i === tier}
                                onPick={() => setTier(i)}
                            />
                        ))}
                    </div>
                    <PackageDetail />
                </div>
            </div>
        </section>
    );
}
