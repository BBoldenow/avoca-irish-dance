import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMeta } from '../hooks/useMeta.js'
import { Calendar, MapPin, Trophy, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const champSpecials = [
    'Ladies Masquerade Slip Jig',
    'Gents Masquerade Reel',
    'Treble Reel Special',
    '"Top Of The Box" Perpetual Cup',
    'The Martin Connolly Memorial Cup',
    'The Freestyle Special',
]

const nonChampSpecials = [
    'Future Champions — non-champ dancers competing at 2025 Oireachtas',
    'Beginner 1/2 Masquerade Reel',
    'Novice/Prizewinner Masquerade Reel',
    'Novice/Prizewinner Boys Treble Jig Special',
]

const teamEvents = [
    'Beginner Teams', 'Open Teams', 'Choreography', 'Adult Figures', 'Family Figures',
]

const nonDanceSpecials = ['Dress / Vest Design', 'Irish Baking', 'Poetry']

export default function Feis() {
    useMeta({
        title: 'Avoca Feis | Avoca Irish Dance Academy',
        description: 'The Avoca Halloween & Autumn Leaf Championship Feis — October 10–11, 2025 at Delta Hotels Marriott in Northglenn, Colorado.',
        path: '/feis',
    })

    const contentRef = useRef(null)

    useEffect(() => {
        gsap.set('.feis-block', { opacity: 1, y: 0 })
        const ctx = gsap.context(() => {
            gsap.fromTo('.feis-block',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0,
                    duration: 0.7,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: contentRef.current, start: 'top 75%' },
                }
            )
        }, contentRef)
        return () => ctx.revert()
    }, [])

    return (
        <div style={{ background: 'var(--color-bg)' }}>
            {/* Banner */}
            <div className="page-banner">
                <h1>Avoca Feis</h1>
                <p>Halloween & Autumn Leaf Championship — October 2025</p>
            </div>

            <div ref={contentRef} className="section-pad max-w-5xl mx-auto space-y-8">
                {/* Event header */}
                <header className="feis-block text-center">
                    <p className="text-sm font-semibold tracking-widest uppercase font-body mb-3"
                        style={{ color: 'var(--color-accent)' }}>
                        Presented by Avoca Irish Dance Academy & Dancers Foundation
                    </p>
                    <h2 className="font-display text-3xl sm:text-4xl font-light mb-2"
                        style={{ color: 'var(--color-text)' }}>
                        Friday, October 10<sup>th</sup> &amp; Saturday, October 11<sup>th</sup>{' '}
                        <span style={{ color: 'var(--color-accent)' }}>2025</span>
                    </h2>
                    <div className="celtic-divider"><span>✦</span></div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Location */}
                    <article className="feis-block card p-6" aria-labelledby="feis-location">
                        <div className="flex items-center gap-3 mb-4">
                            <MapPin size={20} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                            <h2 id="feis-location" className="font-display text-xl font-light m-0"
                                style={{ color: 'var(--color-accent)' }}>Location</h2>
                        </div>
                        <p className="text-sm leading-relaxed font-body m-0" style={{ color: 'var(--color-text-muted)' }}>
                            <strong style={{ color: 'var(--color-text)' }}>Delta Hotels Marriott</strong><br />
                            10 E 120th Avenue<br />
                            Northglenn, CO 80233<br /><br />
                            Discounted room rate available<br />
                            Just 25 minutes from Denver International Airport<br />
                            South of the E-470 Exchange<br />
                            20 minutes from Downtown Denver
                        </p>
                    </article>

                    {/* Register */}
                    <article className="feis-block card p-6" aria-labelledby="feis-register">
                        <div className="flex items-center gap-3 mb-4">
                            <Calendar size={20} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                            <h2 id="feis-register" className="font-display text-xl font-light m-0"
                                style={{ color: 'var(--color-accent)' }}>Register</h2>
                        </div>
                        <ul className="list-none m-0 p-0 space-y-2 text-sm font-body mb-5"
                            style={{ color: 'var(--color-text-muted)' }}>
                            <li><strong style={{ color: 'var(--color-text)' }}>Entry Deadline:</strong> September 26, 2025</li>
                            <li><strong style={{ color: 'var(--color-text)' }}>Late Fee:</strong> $25 after 9/26/2025</li>
                            <li><strong style={{ color: 'var(--color-text)' }}>Entry Cap:</strong> 350 dancers</li>
                        </ul>
                        <a
                            href="https://www.feisworx.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary w-full justify-center text-center"
                            aria-label="Register for the Avoca Feis at feisworx.com"
                        >
                            Register at feisworx.com
                            <ChevronRight size={16} aria-hidden="true" />
                        </a>
                    </article>
                </div>

                {/* Halloween Feis */}
                <article className="feis-block card p-8 overflow-hidden" aria-labelledby="halloween-heading">
                    <img src="/images/feis-banner.png" alt="Halloween Feis Banner" className="w-full h-48 object-cover mb-6 rounded-lg" />
                    <h2 id="halloween-heading" className="font-display text-2xl font-light mb-3"
                        style={{ color: 'var(--color-accent)' }}>
                        🎃 Halloween Feis — Friday, October 10th
                    </h2>
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-semibold font-body"
                        style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--color-accent)' }}>
                        CASUAL DRESS FEIS
                    </div>
                    <p className="text-sm leading-relaxed font-body" style={{ color: 'var(--color-text-muted)' }}>
                        Ditch the solo dresses, wigs, and waistcoats! All dancers are encouraged to wear casual dress with Halloween flair —
                        shorts, skirts, pants, leggings, or a full Halloween costume. Prizes for best-dressed dancers! CLRG costume rules still apply
                        (mid-thigh length minimum, no scooped necklines, no sleeveless tops, no school identification).
                    </p>
                </article>

                {/* Specials grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                        { title: 'Teams', icon: Trophy, items: teamEvents },
                        { title: 'Champ Specials', icon: Trophy, items: champSpecials },
                        { title: 'Non-Champ Specials', icon: Trophy, items: nonChampSpecials },
                        { title: 'Non-Dance Specials', icon: Trophy, items: nonDanceSpecials },
                    ].map(({ title, icon: Icon, items }) => (
                        <article key={title} className="feis-block card p-5" aria-labelledby={`section-${title.replace(/\s/g, '')}`}>
                            <h3 id={`section-${title.replace(/\s/g, '')}`}
                                className="font-display text-lg font-light mb-3 pb-2"
                                style={{ color: 'var(--color-accent)', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
                                {title}
                            </h3>
                            <ul className="list-none m-0 p-0 space-y-2" role="list">
                                {items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <ChevronRight size={13} className="mt-0.5 flex-shrink-0"
                                            style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                                        <span className="text-xs leading-relaxed font-body"
                                            style={{ color: 'var(--color-text-muted)' }}>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}
