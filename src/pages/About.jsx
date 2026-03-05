import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMeta } from '../hooks/useMeta.js'
import { Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const instructors = [
    {
        name: 'Susannah Ruehlen',
        title: 'TCRG, ADCRG — Owner & Teacher',
        image: '/images/about-susannah.png',
        bio: `Susannah started her Irish Dancing career at age 7 in Colorado under the instruction of Maureen Hall. In 1997, she joined Richens-Timm Academy in Columbus, Ohio, rising to the top of her competition in the Western Region, Mid-America Region, and at the North American Irish Dance Championships — qualifying and competing multiple times at the World Championships.

In 1998 she auditioned for Riverdance and joined the first American Riverdance Flying Squad, touring the United States for 3 years including finale performances with the original North American troupe, The Lee Company.

In 2009 she received her teaching certificate (TCRG) and co-founded the Moriarty-Moffitt School of Irish Dance across northern Colorado and Wyoming. In June 2022, Susannah passed her ADCRG exam and now adjudicates dance competitions across the world.`,
    },
    {
        name: 'Amanda Lebeda',
        title: 'Assistant Teacher',
        bio: `Amanda began her dancing career in 2008 as Jennifer and Susannah's very first student! She has worked hard as an Open Championship dancer with many achievements, including dancing on the Senior Ladies team and receiving 12th Place at the 2019 World Championships.

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
        <div style={{ background: 'var(--color-bg)' }}>
            {/* Banner */}
            <div className="page-banner" role="banner">
                <h1>Our Instructors</h1>
                <p>Meet the passionate teachers behind Avoca Irish Dance Academy.</p>
            </div>

            {/* Instructors */}
            <section
                ref={cardsRef}
                className="section-pad max-w-4xl mx-auto"
                aria-label="Instructor profiles"
            >
                <div className="space-y-8">
                    {instructors.map((inst) => (
                        <article key={inst.name} className="instructor-card card p-8" aria-labelledby={`instructor-${inst.name.replace(/\s/g, '-')}`}>
                            <div className="flex items-start gap-4 mb-5">
                                {inst.image ? (
                                    <img
                                        src={inst.image}
                                        alt={inst.name}
                                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                    />
                                ) : (
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{ background: 'rgba(201,168,76,0.15)' }}
                                        aria-hidden="true"
                                    >
                                        <Award size={22} style={{ color: 'var(--color-accent)' }} />
                                    </div>
                                )}
                                <div>
                                    <h2
                                        id={`instructor-${inst.name.replace(/\s/g, '-')}`}
                                        className="font-display text-2xl font-semibold m-0 mb-1"
                                        style={{ color: 'var(--color-accent)' }}
                                    >
                                        {inst.name}
                                    </h2>
                                    <p className="text-sm font-medium m-0 font-body" style={{ color: 'var(--color-text-muted)' }}>
                                        {inst.title}
                                    </p>
                                </div>
                            </div>
                            {inst.bio.split('\n\n').map((para, i) => (
                                <p key={i} className="text-sm leading-relaxed mb-3 last:mb-0 font-body"
                                    style={{ color: 'var(--color-text-muted)' }}>
                                    {para}
                                </p>
                            ))}
                        </article>
                    ))}
                </div>
            </section>

            {/* Sister Schools */}
            <section
                className="section-pad"
                style={{ background: 'var(--color-surface)' }}
                aria-labelledby="sister-schools-heading"
            >
                <div className="max-w-3xl mx-auto text-center">
                    <h2 id="sister-schools-heading" className="font-display text-3xl sm:text-4xl font-semibold mb-4"
                        style={{ color: 'var(--color-text)' }}>
                        Sister Schools with Connolly Irish Dance
                    </h2>
                    <div className="celtic-divider"><span>✦</span></div>
                    <p className="text-base leading-relaxed font-body" style={{ color: 'var(--color-text-muted)' }}>
                        Announced August 2, 2022 — Avoca Irish Dance Academy (Longmont, CO) taught by Susannah Ruehlen ADCRG
                        and the Connolly Academy of Irish Dance (Lakewood, CO) taught by Louise Connolly ADCRG have joined as
                        Sister Schools. Each school has operated separately with great success for 14+ years, and together they
                        bring shared passion, values, and a commitment to excellence.
                    </p>
                </div>
            </section>
        </div>
    )
}
