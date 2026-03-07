import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMeta } from '../hooks/useMeta.js'
import { Calendar, MapPin, Trophy } from 'lucide-react'
import feisBanner from '../assets/images/feis-banner.png'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import Button from '../components/ui/Button.jsx'

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
    'Future Champions — non-champ dancers competing at Oireachtas',
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
        <div className="bg-ink min-h-screen">
            {/* Banner */}
            <div className="bg-ink-soft border-b border-gold/10 pt-36 pb-20 px-6 text-center relative overflow-hidden">
                {/* Subtle radial glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-gold/5 blur-[100px] pointer-events-none" />

                <div className="relative z-10 feis-block">
                    <SectionLabel className="mb-6">Competition</SectionLabel>
                    <h1 className="font-display text-5xl md:text-6xl text-gold mb-6 font-light">Avoca Feis</h1>
                    <p className="font-body text-cream/60 max-w-xl mx-auto font-light leading-relaxed">
                        Halloween & Autumn Leaf Championship — October 2025
                    </p>
                </div>
            </div>

            <div ref={contentRef} className="section-padding max-w-6xl mx-auto relative">
                {/* Ambient background glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-[500px] bg-gold/5 blur-[120px] pointer-events-none" />

                <div className="space-y-8 relative z-10">
                    {/* Event header */}
                    <header className="feis-block text-center py-6">
                        <p className="text-[10px] uppercase tracking-[0.3em] font-medium font-body mb-5 text-gold/60">
                            Presented by Avoca Irish Dance Academy & Dancers Foundation
                        </p>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-cream leading-tight">
                            Friday, October 10<sup>th</sup> &amp; Saturday, October 11<sup>th</sup>{' '}
                            <span className="italic text-gold-light">2025</span>
                        </h2>
                    </header>

                    <div className="section-divider my-10 max-w-2xl mx-auto" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        {/* Location */}
                        <article className="feis-block relative p-8 md:p-10 border border-gold/10 bg-ink-soft/40 backdrop-blur-sm group hover:border-gold/30 transition-colors duration-500" aria-labelledby="feis-location">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gold/10 group-hover:bg-gold/20 transition-colors duration-500 border border-gold/10">
                                    <MapPin size={16} className="text-gold" aria-hidden="true" />
                                </div>
                                <h2 id="feis-location" className="font-display text-2xl font-light m-0 text-gold-light group-hover:text-gold transition-colors duration-500">
                                    Location
                                </h2>
                            </div>
                            <p className="text-[0.95rem] leading-[1.8] font-body m-0 text-cream/70 font-light pl-14">
                                <strong className="text-cream font-medium">Delta Hotels Marriott</strong><br />
                                10 E 120th Avenue<br />
                                Northglenn, CO 80233<br /><br />
                                <span className="text-gold/80 italic">Discounted room rate available</span><br />
                                Just 25 minutes from Denver International Airport<br />
                                South of the E-470 Exchange<br />
                                20 minutes from Downtown Denver
                            </p>
                        </article>

                        {/* Register */}
                        <article className="feis-block relative p-8 md:p-10 border border-gold/10 bg-ink-soft/40 backdrop-blur-sm group hover:border-gold/30 transition-colors duration-500 flex flex-col" aria-labelledby="feis-register">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gold/10 group-hover:bg-gold/20 transition-colors duration-500 border border-gold/10">
                                    <Calendar size={16} className="text-gold" aria-hidden="true" />
                                </div>
                                <h2 id="feis-register" className="font-display text-2xl font-light m-0 text-gold-light group-hover:text-gold transition-colors duration-500">
                                    Register
                                </h2>
                            </div>
                            <ul className="flex-1 list-none m-0 p-0 space-y-3 text-[0.95rem] font-body font-light mb-8 text-cream/70 pl-14">
                                <li><strong className="text-cream font-medium mr-2">Entry Deadline:</strong> September 26, 2025</li>
                                <li><strong className="text-cream font-medium mr-2">Late Fee:</strong> $25 after 9/26/2025</li>
                                <li><strong className="text-cream font-medium mr-2">Entry Cap:</strong> 350 dancers</li>
                            </ul>
                            <div className="mt-auto pl-14">
                                <Button
                                    href="https://www.feisworx.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full text-center"
                                >
                                    Register at feisworx.com
                                </Button>
                            </div>
                        </article>
                    </div>

                    {/* Halloween Feis */}
                    <article className="feis-block relative p-8 md:p-10 border border-gold/10 bg-ink-soft/40 backdrop-blur-sm overflow-hidden group" aria-labelledby="halloween-heading">
                        <img src={feisBanner} alt="Halloween Feis Banner" className="w-full h-[250px] object-cover mb-8 rounded-sm opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <h2 id="halloween-heading" className="font-display text-3xl font-light m-0 text-gold-light">
                                🎃 Halloween Feis — Friday, October 10th
                            </h2>
                            <div className="inline-flex items-center px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.25em] font-medium font-body bg-gold/10 border border-gold/20 text-gold whitespace-nowrap">
                                Casual Dress Feis
                            </div>
                        </div>
                        <p className="text-[0.95rem] leading-[1.8] font-body text-cream/70 font-light">
                            Ditch the solo dresses, wigs, and waistcoats! All dancers are encouraged to wear casual dress with Halloween flair —
                            shorts, skirts, pants, leggings, or a full Halloween costume. Prizes for best-dressed dancers! CLRG costume rules still apply
                            (mid-thigh length minimum, no scooped necklines, no sleeveless tops, no school identification).
                        </p>
                    </article>

                    <div className="section-divider my-10 max-w-2xl mx-auto" />

                    {/* Specials grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'Teams', icon: Trophy, items: teamEvents },
                            { title: 'Champ Specials', icon: Trophy, items: champSpecials },
                            { title: 'Non-Champ Specials', icon: Trophy, items: nonChampSpecials },
                            { title: 'Non-Dance Specials', icon: Trophy, items: nonDanceSpecials },
                        ].map(({ title, icon: Icon, items }) => (
                            <article key={title} className="feis-block relative p-6 border border-gold/10 bg-ink-soft/20 group hover:border-gold/30 transition-colors duration-500" aria-labelledby={`section-${title.replace(/\s/g, '')}`}>
                                <h3 id={`section-${title.replace(/\s/g, '')}`}
                                    className="font-body text-[10px] uppercase tracking-[0.25em] font-medium mb-6 pb-4 text-gold/80 border-b border-gold/10">
                                    {title}
                                </h3>
                                <ul className="list-none m-0 p-0 space-y-4" role="list">
                                    {items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold/60 transition-colors duration-500" aria-hidden="true" />
                                            <span className="text-[0.85rem] leading-[1.6] font-body text-cream/60 font-light group-hover:text-cream/80 transition-colors duration-500">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
