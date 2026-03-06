import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMeta } from '../hooks/useMeta.js'
import { DollarSign, ChevronRight } from 'lucide-react'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import Button from '../components/ui/Button.jsx'

gsap.registerPlugin(ScrollTrigger)

const discounts = [
    { child: '2nd child', pct: '10% off' },
    { child: '3rd child', pct: '15% off' },
    { child: '4th child', pct: '20% off' },
]

export default function Rates() {
    useMeta({
        title: 'Rates & Tuition | Avoca Irish Dance Academy',
        description: 'Competitive Irish dance tuition rates at Avoca Irish Dance Academy in Longmont, CO. Monthly billing, family discounts, and flexible payment options.',
        path: '/rates',
    })

    const contentRef = useRef(null)

    useEffect(() => {
        gsap.set('.rate-block', { opacity: 1, y: 0 })
        const ctx = gsap.context(() => {
            gsap.fromTo('.rate-block',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: contentRef.current, start: 'top 75%' },
                }
            )
        }, contentRef)
        return () => ctx.revert()
    }, [])

    return (
        <div className="bg-ink min-h-screen">
            <div className="bg-ink-soft border-b border-gold/10 pt-36 pb-20 px-6 text-center relative overflow-hidden">
                {/* Subtle radial glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-gold/5 blur-[100px] pointer-events-none" />

                <div className="relative z-10 rate-block">
                    <SectionLabel className="mb-6">Investment</SectionLabel>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-gold mb-6 font-light">Rates & Tuition</h1>
                    <p className="font-body text-cream/60 max-w-xl mx-auto font-light leading-relaxed">
                        Competitive pricing for a world-class Irish dance experience.
                    </p>
                </div>
            </div>

            <div ref={contentRef} className="section-padding max-w-4xl mx-auto space-y-12 relative">
                {/* Ambient background glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-[500px] bg-gold/5 blur-[120px] pointer-events-none" />

                <div className="space-y-10 relative z-10">
                    {/* How tuition works */}
                    <article className="rate-block relative p-8 md:p-12 border border-gold/10 bg-ink-soft/40 backdrop-blur-sm group hover:border-gold/30 transition-colors duration-500" aria-labelledby="tuition-heading">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gold/10 group-hover:bg-gold/20 transition-colors duration-500 border border-gold/10 relative">
                                <div className="absolute inset-0 bg-gold/20 rounded-full blur-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <DollarSign size={20} className="text-gold relative z-10" aria-hidden="true" />
                            </div>
                            <h2 id="tuition-heading" className="font-display text-3xl font-light m-0 text-gold-light group-hover:text-gold transition-colors duration-500">
                                How Tuition Works
                            </h2>
                        </div>
                        <ul className="list-none m-0 p-0 space-y-5" role="list">
                            {[
                                'Tuition fees are based on the number of hours per week at the studio — not number of classes.',
                                'Tuition is paid monthly via our online registration portal by Credit Card, ACH, or Bank Draft.',
                                'Checks and Cash are accepted at our Main Studio location.',
                                'Tuition is based on a 4-week month. If a month has five weeks, that 5th week is complimentary — replacing classes missed for holidays and snow days.',
                                'There are no refunds for missed classes.',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold/60 transition-colors duration-500" aria-hidden="true" />
                                    <span className="text-[1rem] leading-[1.6] font-body text-cream/70 font-light group-hover:text-cream/80 transition-colors duration-500">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </article>

                    {/* Family discounts */}
                    <article className="rate-block relative p-8 md:p-12 border border-gold/10 bg-ink-soft/40 backdrop-blur-sm group hover:border-gold/30 transition-colors duration-500" aria-labelledby="family-discount-heading">
                        <h2 id="family-discount-heading" className="font-display text-3xl font-light mb-6 text-gold-light group-hover:text-gold transition-colors duration-500">
                            Family Discounts
                        </h2>
                        <p className="text-[1rem] mb-8 font-body text-cream/70 font-light">
                            Discounts apply to the child of equal or lesser tuition rate:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" role="table" aria-label="Family discount rates">
                            <div role="row" className="contents">
                                {discounts.map(({ child, pct }) => (
                                    <div
                                        key={child}
                                        role="cell"
                                        className="flex flex-col items-center justify-center p-8 rounded-sm bg-ink-soft/30 border border-gold/10 group-hover:border-gold/20 transition-colors duration-500 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        <span className="text-3xl font-display font-light mb-2 text-gold-light relative z-10">{pct}</span>
                                        <span className="text-[0.65rem] uppercase tracking-[0.2em] font-medium font-body text-gold/60 relative z-10">{child}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>

                    <div className="section-divider my-12 max-w-2xl mx-auto" />

                    {/* CTA */}
                    <div className="rate-block text-center pt-6 pb-12">
                        <p className="mb-8 font-body text-cream/70 font-light text-[1.05rem]">
                            Have questions about tuition? We'd love to help.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Button
                                href="https://docs.google.com/forms/d/e/1FAIpQLSdwHgYmBAiEpIEYMQETjLNLyoGOZvk_SUsQn_iL70zVVFS7DQ/viewform?usp=sf_link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Try a Free Class
                            </Button>
                            <Button to="/contact" variant="secondary">
                                Contact Us
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
