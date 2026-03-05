import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroBg from '../assets/images/hero-bg.png'
import { useMeta } from '../hooks/useMeta.js'
import { ChevronRight, Star, Heart, Users } from 'lucide-react'

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
        <div style={{ background: 'var(--color-bg)' }}>
            {/* ── Hero ── */}
            <section
                ref={heroRef}
                className="relative min-h-screen flex items-center justify-center overflow-hidden"
                aria-label="Welcome to Avoca Irish Dance Academy"
            >
                {/* Background image */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${heroBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.4,
                    }}
                    aria-hidden="true"
                />
                {/* Decorative orb */}
                <div
                    className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #2d6a4f 0%, transparent 70%)' }}
                    aria-hidden="true"
                />
                <div
                    className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)' }}
                    aria-hidden="true"
                />

                {/* Content */}
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <div className="hero-badge inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase font-body"
                        style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--color-accent)' }}>
                        <Star size={12} aria-hidden="true" />
                        Longmont, Colorado
                        <Star size={12} aria-hidden="true" />
                    </div>

                    <h1
                        className="hero-title font-display font-light leading-tight mb-6"
                        style={{
                            fontSize: 'clamp(3rem, 8vw, 6rem)',
                            color: 'var(--color-text)',
                        }}
                    >
                        Welcome to{' '}
                        <span className="gradient-text block sm:inline">Avoca</span>
                        <span className="block text-lg sm:text-2xl font-body font-light tracking-[0.3em] uppercase mt-2"
                            style={{ color: 'var(--color-text-muted)' }}>
                            Irish Dance Academy
                        </span>
                    </h1>

                    <p
                        className="hero-sub text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl mx-auto font-body"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        Your dancer's safe space and home away from home. We are invested in all our students — creating{' '}
                        <em style={{ color: 'var(--color-accent-light)' }}>excellent dancers</em> and{' '}
                        <em style={{ color: 'var(--color-accent-light)' }}>excellent humans</em>.
                    </p>

                    <div className="hero-ctas flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSdwHgYmBAiEpIEYMQETjLNLyoGOZvk_SUsQn_iL70zVVFS7DQ/viewform?usp=sf_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-base px-8 py-3"
                            aria-label="Sign up to try an Irish dance class for free"
                        >
                            Try a Free Class
                            <ChevronRight size={18} aria-hidden="true" />
                        </a>
                        <Link
                            to="/class-schedule"
                            className="btn-outline text-base px-8 py-3"
                            aria-label="View the class schedule"
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
                        className="font-display text-4xl sm:text-5xl font-light mb-4"
                        style={{ color: 'var(--color-text)' }}
                    >
                        Why Dance at Avoca?
                    </h2>
                    <div className="celtic-divider"><span>✦</span></div>
                    <p className="text-lg font-body" style={{ color: 'var(--color-text-muted)' }}>
                        We create <strong style={{ color: 'var(--color-accent)' }}>Excellent Dancers</strong> AND <strong style={{ color: 'var(--color-accent)' }}>Excellent Humans</strong>
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Excellent Dancers */}
                    <article className="why-card card p-8" aria-labelledby="dancers-heading">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ background: 'rgba(201,168,76,0.15)' }}>
                                <Star size={20} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                            </div>
                            <h3 id="dancers-heading" className="font-display text-2xl font-light m-0"
                                style={{ color: 'var(--color-accent)' }}>
                                Excellent Dancers
                            </h3>
                        </div>
                        <ul className="list-none m-0 p-0 space-y-4" role="list">
                            {excellentDancers.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <ChevronRight size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                                    <span className="text-sm leading-relaxed font-body" style={{ color: 'var(--color-text-muted)' }}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </article>

                    {/* Excellent Humans */}
                    <article className="why-card card p-8" aria-labelledby="humans-heading">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ background: 'rgba(201,168,76,0.15)' }}>
                                <Heart size={20} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                            </div>
                            <h3 id="humans-heading" className="font-display text-2xl font-light m-0"
                                style={{ color: 'var(--color-accent)' }}>
                                Excellent Humans
                            </h3>
                        </div>
                        <ul className="list-none m-0 p-0 space-y-4" role="list">
                            {excellentHumans.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <ChevronRight size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                                    <span className="text-sm leading-relaxed font-body" style={{ color: 'var(--color-text-muted)' }}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </article>
                </div>
            </section>

            {/* ── Sister Schools ── */}
            <section
                ref={sisterRef}
                aria-labelledby="sister-heading"
                style={{ background: 'var(--color-surface)' }}
            >
                <div className="section-pad max-w-4xl mx-auto text-center sister-content">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Users size={24} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                        <span className="text-xs font-semibold tracking-widest uppercase font-body"
                            style={{ color: 'var(--color-accent)' }}>
                            Partnership Announcement
                        </span>
                    </div>
                    <h2 id="sister-heading" className="font-display text-3xl sm:text-4xl font-light mb-4"
                        style={{ color: 'var(--color-text)' }}>
                        Avoca is Sister Schools with{' '}
                        <span className="gradient-text">Connolly Irish Dance</span>
                    </h2>
                    <p className="text-base leading-relaxed mb-6 font-body" style={{ color: 'var(--color-text-muted)' }}>
                        We are thrilled about the association between the Avoca Irish Dance Academy (Longmont, CO) taught by Susannah Ruehlen ADCRG
                        and the Connolly Academy of Irish Dance (Lakewood, CO) taught by Louise Connolly ADCRG. Two schools with like-minded
                        passion and values, combining 28+ years of combined experience.
                    </p>
                    <a
                        href="https://connollyirishdance.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline"
                        aria-label="Visit the Connolly Irish Dance Academy website"
                    >
                        Visit Connolly Irish Dance
                        <ChevronRight size={16} aria-hidden="true" />
                    </a>
                </div>
            </section>

            {/* ── Location CTA ── */}
            <section
                ref={locationRef}
                className="section-pad max-w-7xl mx-auto"
                aria-labelledby="location-heading"
            >
                <h2 id="location-heading" className="font-display text-4xl sm:text-5xl font-light text-center mb-12"
                    style={{ color: 'var(--color-text)' }}>
                    Find Us
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    <div className="card p-6 text-center">
                        <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-body"
                            style={{ color: 'var(--color-accent)' }}>Main Studio</p>
                        <p className="font-body" style={{ color: 'var(--color-text-muted)' }}>
                            1515 Main Street (North Entrance)<br />
                            Longmont, Colorado 80501
                        </p>
                    </div>
                    <div className="card p-6 text-center">
                        <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-body"
                            style={{ color: 'var(--color-accent)' }}>Get In Touch</p>
                        <p className="font-body" style={{ color: 'var(--color-text-muted)' }}>
                            <a href="tel:3033244895" className="block hover:underline" style={{ color: 'var(--color-accent)' }}>303-324-4895</a>
                            <a href="mailto:susannahirishdance@gmail.com" className="block text-sm mt-1 hover:underline" style={{ color: 'inherit' }}>
                                susannahirishdance@gmail.com
                            </a>
                        </p>
                    </div>
                </div>

                {/* Map embed */}
                <div className="mt-12 max-w-4xl mx-auto">
                    <div className="relative w-full aspect-[21/9] min-h-[300px] border border-[rgba(201,168,76,0.15)] overflow-hidden rounded-xl">
                        <iframe
                            title="Avoca Irish Dance Studio Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.0682610470794!2d-105.1031289!3d40.1852943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876bf96dfc846fbf%3A0xe69aec57c93c6628!2sAvoca%20Irish%20Dance%20Academy!5e0!3m2!1sen!2sus!4v1772733554788!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) saturate(0.3)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 w-full h-full bg-[#e5e3df]"
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
