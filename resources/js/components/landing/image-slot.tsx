import { cn } from '@/lib/utils';

/**
 * Cover image that fills its (positioned) parent.
 * Falls back to a subtle patterned placeholder when no `src` is set
 * (images will be uploaded from the admin panel in Phase 2).
 */
export function ImageSlot({
    src,
    alt = '',
    className,
    eager = false,
}: {
    src: string | null | undefined;
    alt?: string;
    className?: string;
    eager?: boolean;
}) {
    if (!src) {
        return (
            <div
                aria-hidden
                className={cn(
                    'absolute inset-0 bg-forest-900 bg-[radial-gradient(circle_at_30%_30%,rgba(227,200,138,.14),transparent_60%)]',
                    className,
                )}
            />
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            className={cn(
                'absolute inset-0 h-full w-full object-cover',
                className,
            )}
        />
    );
}
