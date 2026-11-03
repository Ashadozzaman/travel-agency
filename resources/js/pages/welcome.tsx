import { Head } from '@inertiajs/react';
import { LandingPage } from '@/components/landing/landing-page';
import { landingContent } from '@/data/landing';
import type { LandingContent } from '@/data/landing';

const FONTS =
    'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Hanken+Grotesk:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Serif+Bengali:wght@500;600;700&display=swap';

/**
 * Public landing page.
 *
 * `content` will be provided by the server (admin-managed) in Phase 2;
 * until then it falls back to the static data in `@/data/landing`.
 */
export default function Welcome({ content }: { content?: LandingContent }) {
    return (
        <>
            <Head title="Al Haramain Hajj & Umrah">
                <meta name="theme-color" content="#0b3d2e" />
                <meta
                    name="description"
                    content="Al Haramain Hajj & Umrah Ltd. — affordable Umrah packages from Dhaka. Hajj Licence 1165."
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link rel="stylesheet" href={FONTS} />
            </Head>
            <LandingPage content={content ?? landingContent} />
        </>
    );
}
