import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroBg from '../assets/images/hero-bg.webp'
import Button from './ui/Button.jsx'
import SectionLabel from './ui/SectionLabel.jsx'
import DiamondDivider from './ui/DiamondDivider.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
    const heroRef = useRef(null)

    useEffect(() => {
        gsap.set(['.hero-title', '.hero-sub', '.hero-ctas', '.hero-badge', '.hero-divider', '.hero-scroll-indicator'], { opacity: 1, y: 0, scaleX: 1 })
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 })
            tl.fromTo('.hero-badge',
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            )
                .fromTo('.hero-title',
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
                    '-=0.2'
                )
                .fromTo('.hero-divider',
                    { scaleX: 0, transformOrigin: 'left center' },
                    { scaleX: 1, duration: 0.7, ease: 'power3.out' },
                    '-=0.4'
                )
                .fromTo('.hero-sub',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
                    '-=0.5'
                )
                .fromTo('.hero-ctas',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
                    '-=0.3'
                )
                .fromTo('.hero-scroll-indicator',
                    { opacity: 0, y: 8 },
                    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
                    '-=0.2'
                )

            gsap.to('.hero-scroll', {
                opacity: 0,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: '50% top',
                    scrub: true,
                },
            })

            gsap.to('.hero-bg-layer', {
                y: '15%',
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            })
        }, heroRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-end overflow-hidden"
            aria-label="Welcome to Avoca Irish Dance Academy"
        >
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                <img
                    src={heroBg}
                    alt=""
                    fetchpriority="high"
                    decoding="async"
                    className="hero-bg-layer w-full h-[115%] -top-[7.5%] relative object-cover object-center"
                    style={{ opacity: 0.45 }}
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0b]/80 via-transparent to-[#0d0d0b]/90 pointer-events-none" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0b]/70 via-[#0d0d0b]/20 to-transparent pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-t from-[#0d0d0b] to-transparent" aria-hidden="true" />

            <div className="relative z-10 px-6 md:px-12 lg:px-24 pb-24 md:pb-32 max-w-4xl">
                <div className="hero-badge mb-6">
                    <SectionLabel>Longmont, Colorado</SectionLabel>
                </div>

                <h1 className="hero-title font-display font-light leading-[0.95] mb-2 tracking-[0.02em]">
                    <span className="block text-[clamp(4rem,10vw,8rem)] text-cream">
                        Avoca
                    </span>
                    <span className="block text-[clamp(3.5rem,8vw,6.5rem)] text-gold-light italic -mt-2">
                        Irish Dance
                    </span>
                </h1>

                <DiamondDivider className="hero-divider mt-8 mb-6 justify-start" />

                <div className="hero-sub font-body font-light text-[0.95rem] leading-[1.85] text-cream/70 max-w-[65ch] space-y-4">
                    <p>
                        At Avoca Irish Dance Academy, we believe a great dance studio shapes more than technique — it shapes character. Our goal is simple: to develop <em className="text-gold-light not-italic font-normal">excellent dancers</em> and <em className="text-gold-light not-italic font-normal">excellent humans</em>, in a studio where every student feels known, supported, and challenged.
                    </p>
                </div>

                <div className="hero-ctas flex flex-col sm:flex-row gap-5 mt-10">
                    <Button
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdwHgYmBAiEpIEYMQETjLNLyoGOZvk_SUsQn_iL70zVVFS7DQ/viewform?usp=sf_link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Try a Free Class
                    </Button>
                    <Button
                        to="/class-schedule"
                        variant="secondary"
                    >
                        View Schedule
                    </Button>
                </div>
            </div>

            <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
                <div className="hero-scroll-indicator flex flex-col items-center gap-3">
                    <span className="text-[9px] tracking-[0.3em] uppercase font-body text-cream/40">Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent" />
                </div>
            </div>
        </section>
    )
}
