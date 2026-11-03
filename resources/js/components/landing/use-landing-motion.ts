import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger);

export type MotionRefs = {
    root: RefObject<HTMLDivElement | null>;
    hero: RefObject<HTMLElement | null>;
    heroWrap: RefObject<HTMLDivElement | null>;
    heroImg: RefObject<HTMLDivElement | null>;
    journey: RefObject<HTMLElement | null>;
    track: RefObject<HTMLDivElement | null>;
    progress: RefObject<HTMLDivElement | null>;
    pulse: RefObject<HTMLSpanElement | null>;
};

type Options = {
    refs: MotionRefs;
    lenisRef: RefObject<Lenis | null>;
    enabled: boolean;
    smoothScroll: boolean;
    /** Pin the journey section and scroll it horizontally (desktop only). */
    horizontalJourney: boolean;
    /** Phase (0-2) of each journey card, used to light up the phase labels. */
    journeyPhases: number[];
    onPhase: (phase: number) => void;
    /** Changing these values replays the matching animation. */
    lang: string;
    tier: number;
};

const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateHeroWords(root: HTMLElement, delay: number) {
    gsap.fromTo(
        root.querySelectorAll('[data-hw]'),
        { yPercent: 115, rotate: 3 },
        {
            yPercent: 0,
            rotate: 0,
            duration: 1.3,
            ease: 'expo.out',
            stagger: 0.08,
            delay,
            overwrite: true,
        },
    );
}

export function useLandingMotion({
    refs,
    lenisRef,
    enabled,
    smoothScroll,
    horizontalJourney,
    journeyPhases,
    onPhase,
    lang,
    tier,
}: Options) {
    const motionOn = enabled && !prefersReducedMotion();
    const phaseRef = useRef({ phases: journeyPhases, onPhase });
    useEffect(() => {
        phaseRef.current = { phases: journeyPhases, onPhase };
    });

    // Main boot: smooth scroll + all scroll-driven animations.
    useEffect(() => {
        const root = refs.root.current;

        if (!root) {
            return;
        }

        const cleanups: Array<() => void> = [];
        const on = <K extends keyof HTMLElementEventMap>(
            el: HTMLElement,
            ev: K,
            fn: (e: HTMLElementEventMap[K]) => void,
        ) => {
            el.addEventListener(ev, fn);
            cleanups.push(() => el.removeEventListener(ev, fn));
        };

        let tick: ((t: number) => void) | null = null;

        if (smoothScroll && motionOn) {
            const lenis = new Lenis({ lerp: 0.09 });
            lenis.on('scroll', () => ScrollTrigger.update());
            tick = (t) => lenis.raf(t * 1000);
            gsap.ticker.add(tick);
            gsap.ticker.lagSmoothing(0);
            lenisRef.current = lenis;
        }

        if (!motionOn) {
            if (refs.progress.current) {
                gsap.set(refs.progress.current, { scaleX: 1 });
            }

            return () => {
                lenisRef.current?.destroy();
                lenisRef.current = null;
            };
        }

        const ctx = gsap.context(() => {
            const q = (s: string) =>
                Array.from(root.querySelectorAll<HTMLElement>(s));

            gsap.from('[data-nav]', {
                yPercent: -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.1,
            });
            animateHeroWords(root, 0.25);
            gsap.from(q('[data-hfade]'), {
                y: 28,
                opacity: 0,
                duration: 1.1,
                ease: 'power3.out',
                stagger: 0.1,
                delay: 0.7,
            });

            // Hero: slow zoom-out, scroll parallax and mouse drift.
            const hi = refs.heroImg.current;
            const hw = refs.heroWrap.current;
            const hr = refs.hero.current;

            if (hi && hw && hr) {
                gsap.fromTo(
                    hi,
                    { scale: 1.2 },
                    { scale: 1, duration: 2.8, ease: 'power2.out' },
                );
                gsap.to(hw, {
                    yPercent: 16,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: hr,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                    },
                });
                const hx = gsap.quickTo(hi, 'x', {
                    duration: 1.2,
                    ease: 'power3.out',
                });
                const hy = gsap.quickTo(hi, 'y', {
                    duration: 1.2,
                    ease: 'power3.out',
                });
                on(hr, 'mousemove', (e) => {
                    const r = hr.getBoundingClientRect();
                    hx(((e.clientX - r.left) / r.width - 0.5) * -28);
                    hy(((e.clientY - r.top) / r.height - 0.5) * -18);
                });
            }

            q('[data-reveal]').forEach((el) =>
                gsap.from(el, {
                    y: 44,
                    opacity: 0,
                    duration: 1.1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 88%' },
                }),
            );

            q('[data-stagger]').forEach((el) =>
                gsap.from(el.children, {
                    y: 36,
                    opacity: 0,
                    duration: 0.9,
                    stagger: 0.08,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 85%' },
                }),
            );

            // Magnetic buttons.
            q('[data-mag]').forEach((el) => {
                const mx = gsap.quickTo(el, 'x', {
                    duration: 0.5,
                    ease: 'power3.out',
                });
                const my = gsap.quickTo(el, 'y', {
                    duration: 0.5,
                    ease: 'power3.out',
                });
                on(el, 'mousemove', (e) => {
                    const r = el.getBoundingClientRect();
                    mx((e.clientX - r.left - r.width / 2) * 0.25);
                    my((e.clientY - r.top - r.height / 2) * 0.35);
                });
                on(el, 'mouseleave', () => {
                    mx(0);
                    my(0);
                });
            });

            // Journey: pinned horizontal scroll on desktop.
            const track = refs.track.current;
            const sec = refs.journey.current;
            const prog = refs.progress.current;

            if (horizontalJourney && track && sec) {
                const dist = () =>
                    Math.max(0, track.scrollWidth - window.innerWidth);
                const h = gsap.to(track, {
                    x: () => -dist(),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sec,
                        start: 'top top',
                        end: () => '+=' + dist(),
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (st) => {
                            if (prog) {
                                gsap.set(prog, { scaleX: st.progress });
                            }

                            const { phases, onPhase: setPhase } =
                                phaseRef.current;
                            const i = Math.min(
                                phases.length - 1,
                                Math.floor(st.progress * (phases.length + 0.2)),
                            );
                            setPhase(phases[i] ?? 0);
                        },
                    },
                });

                q('[data-jcard]').forEach((card) => {
                    const img = card.querySelector('[data-jimg]');

                    if (img) {
                        gsap.fromTo(
                            img,
                            { xPercent: 7 },
                            {
                                xPercent: -7,
                                ease: 'none',
                                scrollTrigger: {
                                    trigger: card,
                                    containerAnimation: h,
                                    start: 'left right',
                                    end: 'right left',
                                    scrub: true,
                                },
                            },
                        );
                    }
                });
            } else if (prog) {
                gsap.set(prog, { scaleX: 1 });
            }

            if (refs.pulse.current) {
                gsap.fromTo(
                    refs.pulse.current,
                    { scale: 1, opacity: 0.8 },
                    {
                        scale: 1.7,
                        opacity: 0,
                        duration: 2,
                        ease: 'power2.out',
                        repeat: -1,
                    },
                );
            }
        }, root);

        const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 600);

        return () => {
            window.clearTimeout(refresh);
            ctx.revert();
            cleanups.forEach((f) => f());

            if (tick) {
                gsap.ticker.remove(tick);
            }

            lenisRef.current?.destroy();
            lenisRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [motionOn, smoothScroll, horizontalJourney]);

    // Replay hero headline when the language changes.
    const firstLang = useRef(true);
    useEffect(() => {
        if (firstLang.current) {
            firstLang.current = false;

            return;
        }

        if (motionOn && refs.root.current) {
            animateHeroWords(refs.root.current, 0);
        }

        const id = window.setTimeout(() => ScrollTrigger.refresh(), 100);

        return () => window.clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang]);

    // Animate the package detail card when the tier changes.
    const firstTier = useRef(true);
    useEffect(() => {
        if (firstTier.current) {
            firstTier.current = false;

            return;
        }

        if (!motionOn || !refs.root.current) {
            return;
        }

        gsap.fromTo(
            refs.root.current.querySelectorAll('[data-tanim]'),
            { y: 16, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.05,
                ease: 'power3.out',
                overwrite: true,
            },
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tier]);
}
