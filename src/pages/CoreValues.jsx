import { useLayoutEffect, useRef } from 'react'
import { Heart, Shield, Star, Users, Award, Zap, Anchor, Compass, Scale, Sun, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../components/ui/Button.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import DiamondDivider from '../components/ui/DiamondDivider.jsx'
import { useMeta } from '../hooks/useMeta.js'

gsap.registerPlugin(ScrollTrigger)

const VALUES = [
    {
        icon: Heart,
        title: "Generosity",
        description: "In Irish dance, we share our space, our energy, and our support. Generosity means helping a teammate who is struggling with a step and celebrating their success as if it were our own."
    },
    {
        icon: Users,
        title: "Respect",
        description: "We show respect to our teachers, our peers, and our tradition. This means listening with intent and treating the studio as a sacred space for growth and learning."
    },
    {
        icon: Shield,
        title: "Responsibility",
        description: "Taking ownership of your practice and your progress. It's about being prepared, showing up on time, and understanding that your effort directly shapes your journey."
    },
    {
        icon: Star,
        title: "Perseverance",
        description: "Irish dance is a challenge, and that's why we love it. We teach the grit to keep trying when a click doesn't land or a rhythm feels impossible—because the breakthrough is worth it."
    },
    {
        icon: Anchor,
        title: "Service",
        description: "Using our talents to bring joy to others. Whether it's performing at a community event or helping a younger dancer tie their shoes, we believe in giving back to the community that supports us."
    },
    {
        icon: Scale,
        title: "Integrity",
        description: "Doing the right thing even when no one is watching. In dance, this means maintaining proper form even when you're tired and being honest with yourself about your effort."
    },
    {
        icon: Compass,
        title: "Humility",
        description: "Staying grounded no matter how many medals you win. We recognize that there is always something new to learn and that every dancer—beginner or open champion—has value."
    },
    {
        icon: Shield,
        title: "Loyalty",
        description: "Standing by your teammates and your school. We are a family, and loyalty means showing up for each other in and out of the studio, through every high and low."
    },
    {
        icon: Zap,
        title: "Honesty",
        description: "Being truthful in our interactions and our self-reflections. Honesty builds the trust necessary for a healthy learning environment and genuine friendships."
    },
    {
        icon: Award,
        title: "Courage",
        description: "The strength to step onto the stage, to try a new trick, or to ask a question. We foster an environment where 'fear' is just an invitation to be brave."
    },
    {
        icon: Sun,
        title: "Gratitude",
        description: "Being thankful for the opportunity to dance, for our health, and for the support of our families. A grateful heart makes every practice a joy."
    }
]

export default function CoreValues() {
    useMeta({
        title: 'Core Values | Avoca Irish Dance Academy',
        description: 'Explore the core virtues that shape "Excellent Humans" at Avoca Irish Dance Academy.',
        path: '/about/core-values',
    })

    const pageRef = useRef(null)

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
        const ctx = gsap.context(() => {
            // Standard Page Entrance (loc-elem pattern)
            gsap.fromTo('.loc-elem',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    delay: 0.2
                }
            )

            // Value cards animations
            gsap.from('.value-card', {
                scrollTrigger: {
                    trigger: '.values-grid',
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out'
            })

            // Text section animations
            gsap.from('.intro-text-section', {
                scrollTrigger: {
                    trigger: '.intro-text-section',
                    start: 'top 85%',
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            })
        }, pageRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={pageRef} className="bg-ink min-h-screen">
            {/* Standard Header Banner */}
            <header className="section-header-banner">
                {/* Subtle radial glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-gold/5 blur-[100px] pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <SectionLabel className="loc-elem mb-4">Our Philosophy</SectionLabel>
                    <h1 className="loc-elem font-display text-4xl md:text-5xl lg:text-7xl font-light text-cream mb-6 leading-tight">
                        Core <span className="italic text-gold-light">Values</span>
                    </h1>
                    <DiamondDivider className="loc-elem mt-8 mb-8" />
                    <p className="loc-elem font-body text-cream/60 max-w-xl mx-auto font-light leading-relaxed">
                        At Avoca, we see every dancer as a unique individual. Our goal isn't just to build great dancers, but to help shape kind, resilient, and confident humans.
                    </p>
                </div>
            </header>

            {/* Intro Content - Reduced Padding */}
            <section className="section-padding overflow-hidden relative intro-text-section">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="font-display text-2xl md:text-3xl text-gold-light mb-8 uppercase tracking-widest font-light">Building Excellent Humans</h2>
                        <div className="font-body text-cream/80 space-y-6 leading-relaxed text-lg lg:text-xl italic font-light">
                            <p>
                                "We teach dance with our core values in mind: Generosity, Respect, Responsibility, Perseverance, Service, Integrity, Humility, Loyalty, Honesty, Courage, and Gratitude. These are all virtues, we feel, that are crucial in the development of <span className="text-gold font-normal">“Excellent Humans.”</span>"
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Divider */}
            <div className="section-divider" />

            {/* Values Grid - Reduced Padding */}
            <section className="section-padding-min bg-black/10">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 values-grid">
                        {VALUES.map((value, index) => (
                            <article key={index} className="value-card group">
                                <div className="p-8 h-full rounded-2xl border border-gold/10 bg-ink-soft/40 backdrop-blur-sm hover:border-gold/30 transition-all duration-500 relative overflow-hidden">
                                    {/* Icon with glow */}
                                    <div className="mb-6 relative inline-block">
                                        <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
                                        <value.icon className="w-10 h-10 text-gold-light relative z-10" strokeWidth={1} />
                                    </div>

                                    <h3 className="font-display text-2xl text-gold-light mb-4 group-hover:translate-x-1 transition-all duration-300">
                                        {value.title}
                                    </h3>

                                    <p className="font-body text-cream/60 leading-relaxed text-sm group-hover:text-cream/80 transition-colors duration-300">
                                        {value.description}
                                    </p>

                                    {/* Subtle corner detail */}
                                    <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-br from-transparent to-gold/5 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Divider */}
            <div className="section-divider" />

            {/* CTA Section - Reduced Padding */}
            <section className="section-padding-min relative">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <div className="max-w-4xl mx-auto rounded-3xl p-10 md:p-16 text-center relative overflow-hidden border border-gold/10 bg-ink-soft/30">
                        <div className="relative z-10">
                            <h2 className="font-display text-3xl md:text-4xl text-gold-light mb-6">Take Your First Step</h2>
                            <p className="font-body text-cream/60 mb-8 text-base max-w-lg mx-auto leading-relaxed font-light">
                                Whether you're looking for world-class competition or a fun way to build character and fitness, our family is ready to welcome yours.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button to="/registration" variant="primary">Register Now</Button>
                                <Button to="/contact" variant="outline">Ask a Question</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
