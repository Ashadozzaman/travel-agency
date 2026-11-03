import { useRef, useState } from 'react';
import { ContactSection } from '@/components/landing/contact-section';
import { FlightsSection } from '@/components/landing/flights-section';
import { HajjSection } from '@/components/landing/hajj-section';
import { HeroSection } from '@/components/landing/hero-section';
import { InclusionsSection } from '@/components/landing/inclusions-section';
import { JourneySection } from '@/components/landing/journey-section';
import {
    LandingProvider,
    useLanding,
} from '@/components/landing/landing-context';
import { PackagesSection } from '@/components/landing/packages-section';
import { ServicesSection } from '@/components/landing/services-section';
import { SiteFooter, WhatsappFab } from '@/components/landing/site-footer';
import { SiteHeader } from '@/components/landing/site-header';
import { useLandingMotion } from '@/components/landing/use-landing-motion';
import { WhySection } from '@/components/landing/why-section';
import type { LandingContent, Lang } from '@/data/landing';

type Props = {
    content: LandingContent;
    defaultLang?: Lang;
    motion?: boolean;
    smoothScroll?: boolean;
};

function LandingBody({
    motion = true,
    smoothScroll = true,
}: Pick<Props, 'motion' | 'smoothScroll'>) {
    const { lang, tier, width, content, lenisRef } = useLanding();
    const [phase, setPhase] = useState(0);
    const horizontal = width >= 900;

    const refs = {
        root: useRef<HTMLDivElement>(null),
        hero: useRef<HTMLElement>(null),
        heroWrap: useRef<HTMLDivElement>(null),
        heroImg: useRef<HTMLDivElement>(null),
        journey: useRef<HTMLElement>(null),
        track: useRef<HTMLDivElement>(null),
        progress: useRef<HTMLDivElement>(null),
        pulse: useRef<HTMLSpanElement>(null),
    };

    useLandingMotion({
        refs,
        lenisRef,
        enabled: motion,
        smoothScroll,
        horizontalJourney: horizontal,
        journeyPhases: content.journey.map((j) => j.phase),
        onPhase: setPhase,
        lang,
        tier,
    });

    return (
        <div
            ref={refs.root}
            lang={lang}
            className="landing overflow-x-clip bg-sand font-body text-ink antialiased"
        >
            <SiteHeader />
            <HeroSection
                heroRef={refs.hero}
                heroWrapRef={refs.heroWrap}
                heroImgRef={refs.heroImg}
            />
            <ServicesSection />
            <WhySection />
            <PackagesSection />
            <FlightsSection />
            <InclusionsSection />
            <JourneySection
                sectionRef={refs.journey}
                trackRef={refs.track}
                progressRef={refs.progress}
                phase={phase}
                horizontal={horizontal}
            />
            <HajjSection />
            <ContactSection />
            <SiteFooter />
            <WhatsappFab pulseRef={refs.pulse} />
        </div>
    );
}

export function LandingPage({
    content,
    defaultLang = 'bn',
    motion,
    smoothScroll,
}: Props) {
    return (
        <LandingProvider content={content} defaultLang={defaultLang}>
            <LandingBody motion={motion} smoothScroll={smoothScroll} />
        </LandingProvider>
    );
}
