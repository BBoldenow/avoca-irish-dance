import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight, Star, Heart } from 'lucide-react'
import SectionLabel from './ui/SectionLabel.jsx'
import BrandDivider from './BrandDivider.jsx'

gsap.registerPlugin(ScrollTrigger)

const excellentDancers = [
    'Elevated dance curriculum — competitive and world-class program for all levels.',
    'Performance opportunities to share the love of Irish culture and dance history.',
    'Team dancing at all levels with a quality team curriculum.',
    'Guided journey through the Grade Exam process, opening many opportunities.',
]

const excellentHumans = [
    'We teach with core values at the center of everything: generosity, respect, perseverance, integrity, and gratitude — among others.',
    'Dancers leave Avoca as team players with strong work ethic, discipline, and a genuine sense of community.',
    'Service is woven into our program; we believe giving back is part of what it means to be a dancer here.',
]

export default function WhyDance() {
    const whyRef = useRef(null)

    useEffect(() => {
        gsap.set('.why-card', { opacity: 1, y: 0 })
        const ctx = gsap.context(() => {
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

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={whyRef}
            className="section-padding max-w-7xl mx-auto"
            aria-labelledby="why-heading"
        >
            <div className="text-center mb-16 md:mb-24">
                <SectionLabel className="mb-4">Why Us</SectionLabel>
                <h2
                    id="why-heading"
                    className="font-display text-4xl sm:text-6xl font-light mb-6 text-cream"
                >
                    Why Dance at Avoca?
                </h2>
                <BrandDivider />
                <p className="mt-6 text-[1.05rem] font-body text-cream/60 font-light max-w-2xl mx-auto">
                    We invite you to take a look around and see what we’re all about. We offer classes to most ages and all levels at our beautiful Longmont studio.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 relative">
                <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

                <article className="why-card relative p-8 md:p-12 border border-gold/10 bg-ink-soft/50 backdrop-blur-sm group hover:border-gold/30 transition-colors duration-500" aria-labelledby="dancers-heading">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gold/10 group-hover:bg-gold/20 transition-colors duration-500">
                            <Star size={20} className="text-gold" aria-hidden="true" />
                        </div>
                        <h3 id="dancers-heading" className="font-display text-3xl font-light m-0 text-gold-light group-hover:text-gold transition-colors duration-500">
                            Excellent Dancers
                        </h3>
                    </div>
                    <ul className="list-none m-0 p-0 space-y-6" role="list">
                        {excellentDancers.map((item, i) => (
                            <li key={i} className="flex items-start gap-4">
                                <ChevronRight size={14} className="mt-1 flex-shrink-0 text-gold/50" aria-hidden="true" />
                                <span className="text-sm leading-relaxed font-body text-cream/70 font-light">{item}</span>
                            </li>
                        ))}
                    </ul>
                </article>

                <article className="why-card relative p-8 md:p-12 border border-gold/10 bg-ink-soft/50 backdrop-blur-sm group hover:border-gold/30 transition-colors duration-500" aria-labelledby="humans-heading">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gold/10 group-hover:bg-gold/20 transition-colors duration-500">
                            <Heart size={20} className="text-gold" aria-hidden="true" />
                        </div>
                        <h3 id="humans-heading" className="font-display text-3xl font-light m-0 text-gold-light group-hover:text-gold transition-colors duration-500">
                            Excellent Humans
                        </h3>
                    </div>
                    <ul className="list-none m-0 p-0 space-y-6" role="list">
                        {excellentHumans.map((item, i) => (
                            <li key={i} className="flex items-start gap-4">
                                <ChevronRight size={14} className="mt-1 flex-shrink-0 text-gold/50" aria-hidden="true" />
                                <span className="text-sm leading-relaxed font-body text-cream/70 font-light">{item}</span>
                            </li>
                        ))}
                    </ul>
                </article>
            </div>
        </section>
    )
}
