import { cn } from '@/lib/utils';

export function SectionKicker({
    arabic,
    label,
    tone = 'dark',
    className,
}: {
    arabic: string;
    label: string;
    /** `light` = gold-light on dark backgrounds, `dark` = gold-dark on sand. */
    tone?: 'light' | 'dark';
    className?: string;
}) {
    return (
        <div
            className={cn(
                'flex items-center gap-3.5 text-sm font-semibold whitespace-nowrap',
                tone === 'light' ? 'text-gold-light' : 'text-gold-dark',
                className,
            )}
        >
            <span lang="ar" className="font-arabic text-[22px]">
                {arabic}
            </span>
            <span
                className={cn(
                    'h-px w-8',
                    tone === 'light' ? 'bg-gold-light' : 'bg-gold-dark',
                )}
            />
            <span>{label}</span>
        </div>
    );
}

export const sectionTitle =
    'font-display text-[clamp(38px,5vw,76px)] leading-[1.18] font-semibold';
