import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroBg from '../assets/images/hero-bg.webp'
import { useMeta } from '../hooks/useMeta.js'
import { ChevronRight, Star, Heart } from 'lucide-react'
import SisterSchools from '../components/SisterSchools.jsx'
import BrandDivider from '../components/BrandDivider.jsx'

gsap.registerPlugin(ScrollTrigger)

const excellentDancers = [
    'Elevated dance curriculum — competitive and world-class program for all levels.',
    'Performance opportunities to share the love of Irish culture and dance history.',
    'Team dancing at all levels with a quality team curriculum.',
    'Guided journey through the Grade Exam process, opening many opportunities.',
]

const excellentHumans = [
    'We teach with core values: Generosity, Respect, Responsibility, Perseverance, Service, Integrity, Humility, Loyalty, Honesty, Courage, and Gratitude.',
    'Dancers become team players with strong work ethic, discipline, and pride.',
    'Community service is a key element — we encourage our dancers to give back.',
]

export default function Home() {
    useMeta({
        title: 'Avoca Irish Dance Academy | Longmont, Colorado',
        description: 'Avoca Irish Dance Academy — competitive Irish dance school in Longmont, CO. World-class instruction for all ages and levels. Try a free class today!',
        path: '/',
    })

    const heroRef = useRef(null)
    const whyRef = useRef(null)
    const sisterRef = useRef(null)
    const locationRef = useRef(null)

    useEffect(() => {
        // Hero animation
        gsap.set(['.hero-title', '.hero-sub', '.hero-ctas', '.hero-badge'], { opacity: 1, y: 0 })
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

            // Subtle parallax on hero background
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

        // Why dance section
        gsap.set('.why-card', { opacity: 1, y: 0 })
        const ctx2 = gsap.context(() => {
            gsap.fromTo('.why-card',
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: whyRef.current, start: 'top 75%' },
                }
            )
        }, whyRef)

        // Sister schools
        gsap.set('.sister-content', { opacity: 1, y: 0 })
        const ctx3 = gsap.context(() => {
            gsap.fromTo('.sister-content',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: sisterRef.current, start: 'top 80%' }
                }
            )
        }, sisterRef)

        return () => { ctx.revert(); ctx2.revert(); ctx3.revert() }
    }, [])

    return (
        <div className="bg-bg">
            {/* ── Hero ── */}
            <section
                ref={heroRef}
                className="relative min-h-screen flex items-end overflow-hidden"
                aria-label="Welcome to Avoca Irish Dance Academy"
            >
                {/* Background image with parallax */}
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
                {/* Layered overlays for depth */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0A0A0A]/95 via-[#0A0A0A]/30 to-[#0A0A0A]/10" aria-hidden="true" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0A0A0A]/60 to-transparent" aria-hidden="true" />

                {/* Hard bottom vignette */}
                <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-[#0A0A0A] to-transparent" aria-hidden="true" />

                {/* Content — bottom-left like Connolly */}
                <div className="relative z-10 px-6 md:px-12 lg:px-24 pb-24 md:pb-32 max-w-4xl">
                    <p className="hero-badge font-body text-[0.56rem] uppercase tracking-[0.5em] mb-4 text-accent drop-shadow-md">
                        Longmont, Colorado
                    </p>

                    <h1 className="hero-title font-display font-light leading-[0.95] mb-2 tracking-[0.06em]">
                        <span className="block text-[clamp(4rem,10vw,8rem)] text-text-main drop-shadow-lg">
                            Avoca
                        </span>
                        <span className="block text-[clamp(3.5rem,8vw,6.5rem)] text-accent-light drop-shadow-lg italic">
                            Irish Dance
                        </span>
                    </h1>

                    <div className="hero-sub mt-8 mb-6 w-20 h-px bg-accent/50" />

                    <p className="hero-sub font-body font-light text-[0.9rem] leading-[1.85] text-text-main/85 max-w-[60ch] drop-shadow-md">
                        Your dancer's safe space and home away from home — creating{' '}
                        <em className="text-accent-light not-italic">excellent dancers</em> and{' '}
                        <em className="text-accent-light not-italic">excellent humans</em>.
                    </p>

                    <div className="hero-ctas flex flex-col sm:flex-row gap-4 mt-10">
                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSdwHgYmBAiEpIEYMQETjLNLyoGOZvk_SUsQn_iL70zVVFS7DQ/viewform?usp=sf_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            aria-label="Try a Free Class"
                        >
                            Try a Free Class
                            <ChevronRight size={15} aria-hidden="true" />
                        </a>
                        <Link
                            to="/class-schedule"
                            className="btn-outline"
                            aria-label="View Schedule"
                        >
                            View Schedule
                        </Link>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    aria-hidden="true"
                >
                    <span className="text-xs tracking-widest uppercase font-body" style={{ color: 'var(--color-text-muted)' }}>Scroll</span>
                    <div className="w-px h-8 opacity-40" style={{ background: 'var(--color-accent)' }} />
                </div>
            </section>

            {/* ── Why Dance at Avoca ── */}
            <section
                ref={whyRef}
                className="section-pad max-w-7xl mx-auto"
                aria-labelledby="why-heading"
            >
                <div className="text-center mb-12">
                    <h2
                        id="why-heading"
                        className="font-display text-4xl sm:text-5xl font-light mb-4 text-text-main"
                    >
                        Why Dance at Avoca?
                    </h2>
                    <BrandDivider />
                    <p className="text-lg font-body text-text-muted">
                        We create <strong className="text-accent">Excellent Dancers</strong> AND <strong className="text-accent">Excellent Humans</strong>
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Excellent Dancers */}
                    <article className="why-card card p-8" aria-labelledby="dancers-heading">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent/15">
                                <Star size={20} className="text-accent" aria-hidden="true" />
                            </div>
                            <h3 id="dancers-heading" className="font-display text-2xl font-light m-0 text-accent">
                                Excellent Dancers
                            </h3>
                        </div>
                        <ul className="list-none m-0 p-0 space-y-4" role="list">
                            {excellentDancers.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <ChevronRight size={16} className="mt-0.5 flex-shrink-0 text-accent" aria-hidden="true" />
                                    <span className="text-sm leading-relaxed font-body text-text-muted">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </article>

                    {/* Excellent Humans */}
                    <article className="why-card card p-8" aria-labelledby="humans-heading">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent/15">
                                <Heart size={20} className="text-accent" aria-hidden="true" />
                            </div>
                            <h3 id="humans-heading" className="font-display text-2xl font-light m-0 text-accent">
                                Excellent Humans
                            </h3>
                        </div>
                        <ul className="list-none m-0 p-0 space-y-4" role="list">
                            {excellentHumans.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <ChevronRight size={16} className="mt-0.5 flex-shrink-0 text-accent" aria-hidden="true" />
                                    <span className="text-sm leading-relaxed font-body text-text-muted">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </article>
                </div>
            </section>

            {/* ── Sister Schools ── */}
            <div ref={sisterRef} className="sister-content">
                <SisterSchools />
            </div>

            {/* ── Location CTA ── */}
            <section
                ref={locationRef}
                className="section-pad max-w-7xl mx-auto"
                aria-labelledby="location-heading"
            >
                <h2 id="location-heading" className="font-display text-4xl sm:text-5xl font-light text-center mb-12 text-text-main">
                    Find Us
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    <div className="card p-6 text-center">
                        <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-body text-accent">Main Studio</p>
                        <p className="font-body text-text-muted">
                            1515 Main Street (North Entrance)<br />
                            Longmont, Colorado 80501
                        </p>
                    </div>
                    <div className="card p-6 text-center">
                        <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-body text-accent">Get In Touch</p>
                        <p className="font-body text-text-muted">
                            <a href="tel:3033244895" className="block hover:underline text-accent">303-324-4895</a>
                            <a href="mailto:susannahirishdance@gmail.com" className="block text-sm mt-1 hover:underline text-inherit">
                                susannahirishdance@gmail.com
                            </a>
                        </p>
                    </div>
                </div>

                {/* Map embed */}
                <div className="mt-12 max-w-4xl mx-auto">
                    <div className="relative w-full aspect-[21/9] min-h-[300px] border border-accent/15 overflow-hidden rounded-xl">
                        <iframe
                            title="Avoca Irish Dance Studio Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.0682610470794!2d-105.1031289!3d40.1852943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876bf96dfc846fbf%3A0xe69aec57c93c6628!2sAvoca%20Irish%20Dance%20Academy!5e0!3m2!1sen!2sus!4v1772733554788!5m2!1sen!2sus"
                            className="absolute inset-0 w-full h-full bg-[#e5e3df]"
                            style={{ filter: 'invert(0.9) hue-rotate(180deg) saturate(0.3)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>

                <div className="text-center mt-10">
                    <Link to="/contact" className="btn-primary">
                        Contact Us
                        <ChevronRight size={18} aria-hidden="true" />
                    </Link>
                </div>
            </section>
        </div>
    )
}
