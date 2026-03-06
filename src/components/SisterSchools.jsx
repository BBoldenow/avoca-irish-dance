import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import SectionLabel from './ui/SectionLabel.jsx'
import Button from './ui/Button.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function SisterSchool() {
    const sectionRef = useRef(null)

    useEffect(() => {
        gsap.set('.sister-elem', { opacity: 1, y: 0 })
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.sister-elem',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden border-t border-gold/10"
            aria-labelledby="sister-heading"
        >
            {/* Rich background with layered gradients */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(135deg, #1e1e19 0%, #161612 40%, #0d0d0b 100%)',
                }}
            />
            {/* Gold radial glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
            />
            {/* Decorative top/bottom hairlines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

            <div className="relative z-10 section-padding">
                <div className="max-w-6xl mx-auto">
                    {/* Two-column layout on large screens */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">

                        {/* Left: stat pillars */}
                        <div className="sister-elem lg:col-span-2 grid grid-cols-2 gap-px bg-gold/10">
                            {[
                                { value: '28+', label: 'Years Combined\nExperience' },
                                { value: '2', label: 'ADCRG\nCertified Schools' },
                                { value: 'CO', label: 'Colorado Front\nRange Coverage' },
                                { value: '∞', label: 'Passion for\nIrish Dance' },
                            ].map(({ value, label }) => (
                                <div
                                    key={value}
                                    className="flex flex-col items-center justify-center p-8 text-center"
                                    style={{ backgroundColor: 'rgba(22, 22, 18, 0.7)' }} // mapping to --surface
                                >
                                    <span className="font-display text-4xl md:text-5xl font-light text-gold mb-2">{value}</span>
                                    <span className="font-body text-[9px] uppercase tracking-[0.2em] text-cream/40 whitespace-pre-line leading-relaxed">{label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Right: content */}
                        <div className="lg:col-span-3 text-center lg:text-left">
                            <div className="sister-elem inline-flex items-center gap-2.5 mb-6">
                                <div className="w-4 h-px bg-gold/50" />
                                <SectionLabel>Partnership Announcement</SectionLabel>
                                <div className="w-4 h-px bg-gold/50" />
                            </div>

                            <h2
                                id="sister-heading"
                                className="sister-elem font-display text-3xl md:text-4xl lg:text-5xl font-light text-cream leading-tight mb-6"
                            >
                                Avoca is Sister Schools with{' '}
                                <span className="italic text-gold-light">Connolly Irish Dance</span>
                            </h2>

                            <p className="sister-elem font-body text-cream/65 text-sm md:text-base leading-relaxed font-light mb-8 max-w-2xl lg:max-w-none">
                                We are thrilled about the association between the Connolly Academy of Irish Dance
                                (Lakewood, CO) taught by Louise Connolly ADCRG and the Avoca Irish Dance Academy
                                (Longmont, CO) taught by Susannah Ruehlen ADCRG. Two schools with like-minded
                                passion and values, combining over 28 years of experience to bring the best out of
                                our dancers across the Colorado Front Range.
                            </p>

                            <Button
                                href="https://www.connollyirishdance.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="secondary"
                                className="sister-elem group gap-2"
                                aria-label="Visit the Connolly Irish Dance Academy website"
                            >
                                Visit Connolly Irish Dance
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
