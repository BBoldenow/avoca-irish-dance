import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMeta } from '../hooks/useMeta.js'
import { DollarSign, ChevronRight } from 'lucide-react'

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
        <div style={{ background: 'var(--color-bg)' }}>
            <div className="page-banner">
                <h1>Rates & Tuition</h1>
                <p>Competitive pricing for a world-class Irish dance experience.</p>
            </div>

            <div ref={contentRef} className="section-pad max-w-3xl mx-auto space-y-8">
                {/* How tuition works */}
                <article className="rate-block card p-8" aria-labelledby="tuition-heading">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ background: 'rgba(201,168,76,0.15)' }}>
                            <DollarSign size={20} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                        </div>
                        <h2 id="tuition-heading" className="font-display text-2xl font-semibold m-0"
                            style={{ color: 'var(--color-accent)' }}>
                            How Tuition Works
                        </h2>
                    </div>
                    <ul className="list-none m-0 p-0 space-y-3" role="list">
                        {[
                            'Tuition fees are based on the number of hours per week at the studio — not number of classes.',
                            'Tuition is paid monthly via our online registration portal by Credit Card, ACH, or Bank Draft.',
                            'Checks and Cash are accepted at our Main Studio location.',
                            'Tuition is based on a 4-week month. If a month has five weeks, that 5th week is complimentary — replacing classes missed for holidays and snow days.',
                            'There are no refunds for missed classes.',
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <ChevronRight size={16} className="mt-0.5 flex-shrink-0"
                                    style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                                <span className="text-sm leading-relaxed font-body" style={{ color: 'var(--color-text-muted)' }}>
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </article>

                {/* Family discounts */}
                <article className="rate-block card p-8" aria-labelledby="family-discount-heading">
                    <h2 id="family-discount-heading" className="font-display text-2xl font-semibold mb-5"
                        style={{ color: 'var(--color-accent)' }}>
                        Family Discounts
                    </h2>
                    <p className="text-sm mb-6 font-body" style={{ color: 'var(--color-text-muted)' }}>
                        Discounts apply to the child of equal or lesser tuition rate:
                    </p>
                    <div className="grid grid-cols-3 gap-4" role="table" aria-label="Family discount rates">
                        <div role="row" className="contents">
                            {discounts.map(({ child, pct }) => (
                                <div
                                    key={child}
                                    role="cell"
                                    className="flex flex-col items-center justify-center p-5 rounded-lg text-center"
                                    style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
                                >
                                    <span className="text-2xl font-display font-semibold mb-1"
                                        style={{ color: 'var(--color-accent)' }}>{pct}</span>
                                    <span className="text-xs font-body" style={{ color: 'var(--color-text-muted)' }}>{child}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </article>

                {/* CTA */}
                <div className="rate-block text-center pt-4">
                    <p className="mb-6 font-body" style={{ color: 'var(--color-text-muted)' }}>
                        Have questions about tuition? We'd love to help.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSdwHgYmBAiEpIEYMQETjLNLyoGOZvk_SUsQn_iL70zVVFS7DQ/viewform?usp=sf_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            aria-label="Sign up to try a free Irish dance class"
                        >
                            Try a Free Class
                        </a>
                        <Link to="/contact" className="btn-outline"
                            aria-label="Contact Avoca Irish Dance Academy">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
