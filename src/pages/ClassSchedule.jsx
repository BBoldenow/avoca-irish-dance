import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMeta } from '../hooks/useMeta.js'
import { Clock, Users } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'

gsap.registerPlugin(ScrollTrigger)

const schedule = [
    {
        day: 'Monday',
        classes: [
            { name: 'Intermediate Skills/Drills & Ceili', time: '4:30 – 6:00 PM' },
            { name: 'Champ Class', time: '6:00 – 8:30 PM' },
        ],
    },
    {
        day: 'Tuesday',
        classes: [
            { name: 'Intro Class (Ages 4–6)', time: '4:30 – 5:15 PM' },
            { name: 'Beginner 2 Class', time: '5:15 – 6:15 PM' },
            { name: 'Champ Class', time: '6:15 – 8:30 PM' },
        ],
    },
    {
        day: 'Wednesday',
        classes: [
            { name: 'Beginner 1 (Ages 7+)', time: '4:30 – 5:30 PM' },
            { name: 'Beginner 2 Class', time: '4:30 – 5:30 PM' },
            { name: 'Intermediate Class', time: '5:30 – 7:00 PM' },
        ],
    },
    {
        day: 'Thursday',
        classes: [
            { name: 'Champs Class', time: '4:30 – 7:00 PM' },
        ],
    },
    {
        day: 'Teams',
        classes: [{ name: 'By Invitation Only', time: '' }],
    },
    {
        day: 'Adult Basics & Ceili',
        classes: [{ name: 'Time TBD', time: '' }],
    },
]

export default function ClassSchedule() {
    useMeta({
        title: 'Class Schedule | Avoca Irish Dance Academy',
        description: 'View the Avoca Irish Dance Academy class schedule in Longmont, CO. Classes for beginners, intermediates, champions, and adults. All ages welcome.',
        path: '/class-schedule',
    })

    const scheduleRef = useRef(null)

    useEffect(() => {
        gsap.set('.day-card', { opacity: 1, y: 0 })
        const ctx = gsap.context(() => {
            gsap.fromTo('.day-card',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0,
                    duration: 0.6,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: scheduleRef.current, start: 'top 75%' },
                }
            )
        }, scheduleRef)
        return () => ctx.revert()
    }, [])

    return (
        <div className="bg-ink min-h-screen">
            <div className="bg-ink-soft border-b border-gold/10 pt-36 pb-20 px-6 text-center relative overflow-hidden">
                {/* Subtle radial glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-gold/5 blur-[100px] pointer-events-none" />

                <div className="relative z-10">
                    <SectionLabel className="mb-6">Schedule</SectionLabel>
                    <h1 className="font-display text-5xl md:text-6xl text-gold mb-6 font-light">Class Schedule</h1>
                    <p className="font-body text-cream/60 max-w-xl mx-auto font-light leading-relaxed">
                        Classes offered Monday through Thursday at our Longmont studio.
                    </p>
                </div>
            </div>

            <section ref={scheduleRef} className="section-padding max-w-5xl mx-auto" aria-label="Weekly class schedule">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16 relative">
                    {/* Background visual anchor */}
                    <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gold/5 blur-[120px] pointer-events-none" />

                    {schedule.map(({ day, classes }) => (
                        <article
                            key={day}
                            className="day-card relative p-8 border border-gold/10 bg-ink-soft/40 backdrop-blur-sm group hover:border-gold/30 transition-colors duration-500"
                            aria-labelledby={`day-${day.replace(/\s/g, '-')}`}
                        >
                            <h2
                                id={`day-${day.replace(/\s/g, '-')}`}
                                className="font-body text-xs font-medium tracking-[0.2em] uppercase mb-6 pb-4 text-gold-light border-b border-gold/10"
                            >
                                {day}
                            </h2>
                            <ul className="list-none m-0 p-0 space-y-5" role="list">
                                {classes.map((cls, i) => (
                                    <li key={i} className="flex flex-col gap-1.5">
                                        <span className="text-sm font-light font-body text-cream/90 leading-snug">
                                            {cls.name}
                                        </span>
                                        {cls.time && (
                                            <span className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-body text-gold/60">
                                                <Clock size={12} aria-hidden="true" />
                                                {cls.time}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>

                {/* Note */}
                <div className="p-8 md:p-10 mb-16 border border-gold/15 bg-gold/5 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-[50px] pointer-events-none" />
                    <div className="flex items-start gap-5 relative z-10">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gold/10 flex-shrink-0">
                            <Users size={18} className="text-gold" aria-hidden="true" />
                        </div>
                        <p className="text-[0.95rem] leading-relaxed m-0 font-body text-cream/70 font-light pt-1">
                            All classes are held at our Main Studio at 1515 Main Street (North Entrance), Longmont, CO 80501.
                            Not sure which class is right for your dancer? <Link to="/contact" className="text-gold hover:text-gold-light underline underline-offset-4 transition-colors">Contact us</Link> and we'll help you find the perfect fit.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 justify-center items-center relative z-10">
                    <Button
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdwHgYmBAiEpIEYMQETjLNLyoGOZvk_SUsQn_iL70zVVFS7DQ/viewform?usp=sf_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto"
                        aria-label="Sign up to try a free Irish dance class"
                    >
                        Try a Free Class
                    </Button>
                    <Button
                        to="/registration"
                        variant="secondary"
                        className="w-full sm:w-auto"
                        aria-label="Register for classes at Avoca Irish Dance"
                    >
                        Register Now
                    </Button>
                </div>
            </section>
        </div>
    )
}
