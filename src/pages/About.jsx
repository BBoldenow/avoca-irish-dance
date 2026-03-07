import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMeta } from '../hooks/useMeta.js'
import { Award } from 'lucide-react'
import susannahImg from '../assets/images/susannah.avif'
import SisterSchools from '../components/SisterSchools.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'

gsap.registerPlugin(ScrollTrigger)

const instructors = [
    {
        name: 'Susannah Ruehlen',
        title: 'TCRG, ADCRG — Owner & Teacher',
        image: susannahImg,
        bio: `Susannah started her Irish Dancing career at age 7 in Colorado under the instruction of Maureen Hall. In 1997, she joined Richens-Timm Academy in Columbus, Ohio, rising to the top of her competition in the Western Region, Mid-America Region, and at the North American Irish Dance Championships — qualifying and competing multiple times at the World Championships.

In 1998 she auditioned for Riverdance and joined the first American Riverdance Flying Squad, touring the United States for 3 years including finale performances with the original North American troupe, The Lee Company.

In 2009 she received her teaching certificate (TCRG) and co-founded the Moriarty-Moffitt School of Irish Dance across northern Colorado and Wyoming. In June 2022, Susannah passed her ADCRG exam and now adjudicates dance competitions across the world.`,
    },
    {
        name: 'Amanda Lebeda',
        title: 'Assistant Teacher',
        bio: `Amanda began her dancing career in 2008 as Susannah's very first student! She has worked hard as an Open Championship dancer with many achievements, including dancing on the Senior Ladies team and receiving 12th Place at the 2019 World Championships.

Amanda has spent two summers dancing with the Riverdance Summer Camp in Boston. She has completed her 12 Grade Exams and looks forward to earning her TCRG Certification. She especially loves teaching our beginner dancers.`,
    },
    {
        name: 'Dayna Spence',
        title: 'Assistant Teacher',
        bio: `Dayna has been dancing since age 10, when Susannah came to her elementary school to teach an Irish dancing after-school camp — and she's loved it ever since. She is currently competing at the highest level, traveling across the world for competitions and camps.

Dayna loves dancing on 8-hand teams and has a passion for performing. She is working toward earning her TCRG to become a certified Irish dance teacher.`,
    },
]

export default function About() {
    useMeta({
        title: 'About Us | Avoca Irish Dance Academy',
        description: 'Meet Susannah Ruehlen (ADCRG), Amanda Lebeda, Dayna Spence — the passionate instructors of Avoca Irish Dance Academy in Longmont, Colorado.',
        path: '/about',
    })

    const cardsRef = useRef(null)

    useEffect(() => {
        gsap.set('.instructor-card', { opacity: 1, y: 0 })
        const ctx = gsap.context(() => {
            gsap.fromTo('.instructor-card',
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
                }
            )
        }, cardsRef)
        return () => ctx.revert()
    }, [])

    return (
        <div className="bg-ink min-h-screen">
            {/* Banner */}
            <div className="bg-ink-soft border-b border-gold/10 pt-36 pb-20 px-6 text-center relative overflow-hidden">
                {/* Subtle radial glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-gold/5 blur-[100px] pointer-events-none" />

                <div className="relative z-10">
                    <SectionLabel className="mb-6">About Us</SectionLabel>
                    <h1 className="font-display text-5xl md:text-6xl text-gold mb-6 font-light">Our Instructors</h1>
                    <p className="font-body text-cream/60 max-w-xl mx-auto font-light leading-relaxed">
                        Meet the passionate teachers behind Avoca Irish Dance Academy.
                    </p>
                </div>
            </div>

            {/* Instructors */}
            <section
                ref={cardsRef}
                className="section-padding max-w-4xl mx-auto"
                aria-label="Instructor profiles"
            >
                <div className="space-y-8 relative">
                    {/* Background glow behind cards */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-gold/5 blur-[120px] pointer-events-none" />

                    {instructors.map((inst) => (
                        <article
                            key={inst.name}
                            className="instructor-card relative p-8 md:p-10 border border-gold/10 bg-ink-soft/40 backdrop-blur-sm group hover:border-gold/30 transition-colors duration-500"
                            aria-labelledby={`instructor-${inst.name.replace(/\s/g, '-')}`}
                        >
                            <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8 mb-8">
                                {inst.image ? (
                                    <div className="relative flex-shrink-0">
                                        <div className="absolute inset-0 bg-gold/20 rounded-full blur-[20px] group-hover:bg-gold/40 transition-colors duration-500 pointer-events-none" />
                                        <img
                                            src={inst.image}
                                            alt={inst.name}
                                            className="relative w-24 h-24 rounded-full object-cover border border-gold/20 shadow-lg shadow-black/50"
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="relative w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 bg-gold/10 group-hover:bg-gold/20 transition-colors duration-500 border border-gold/10"
                                        aria-hidden="true"
                                    >
                                        <Award size={32} className="text-gold" />
                                    </div>
                                )}
                                <div className="pt-2">
                                    <h2
                                        id={`instructor-${inst.name.replace(/\s/g, '-')}`}
                                        className="font-display text-3xl font-light m-0 mb-2 text-gold-light group-hover:text-gold transition-colors duration-500"
                                    >
                                        {inst.name}
                                    </h2>
                                    <p className="text-[11px] uppercase tracking-[0.2em] font-medium font-body text-cream/50 m-0">
                                        {inst.title}
                                    </p>
                                </div>
                            </div>
                            <div className="pl-0 sm:pl-[128px]">
                                {inst.bio.split('\n\n').map((para, i) => (
                                    <p key={i} className="text-[0.95rem] leading-[1.8] mb-4 last:mb-0 font-body text-cream/70 font-light">
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Section Divider */}
            <div className="section-divider" />

            {/* Sister Schools */}
            <div className="section-padding">
                <SisterSchools />
            </div>

            {/* Section Divider */}
            <div className="section-divider" />
        </div>
    )
}
