import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMeta } from '../hooks/useMeta.js'
import { Clock, Users, ChevronRight } from 'lucide-react'

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
        <div style={{ background: 'var(--color-bg)' }}>
            <div className="page-banner">
                <h1>Class Schedule</h1>
                <p>Classes offered Monday through Thursday at our Longmont studio.</p>
            </div>

            <section ref={scheduleRef} className="section-pad max-w-4xl mx-auto" aria-label="Weekly class schedule">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                    {schedule.map(({ day, classes }) => (
                        <article key={day} className="day-card card p-6" aria-labelledby={`day-${day.replace(/\s/g, '-')}`}>
                            <h2
                                id={`day-${day.replace(/\s/g, '-')}`}
                                className="font-display text-xl font-semibold mb-4 pb-3"
                                style={{
                                    color: 'var(--color-accent)',
                                    borderBottom: '1px solid rgba(201,168,76,0.2)',
                                }}
                            >
                                {day}
                            </h2>
                            <ul className="list-none m-0 p-0 space-y-3" role="list">
                                {classes.map((cls, i) => (
                                    <li key={i} className="flex flex-col gap-1">
                                        <span className="text-sm font-medium font-body" style={{ color: 'var(--color-text)' }}>
                                            {cls.name}
                                        </span>
                                        {cls.time && (
                                            <span className="flex items-center gap-1.5 text-xs font-body" style={{ color: 'var(--color-text-muted)' }}>
                                                <Clock size={11} aria-hidden="true" />
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
                <div className="card p-6 mb-8" style={{ background: 'rgba(201,168,76,0.06)' }}>
                    <div className="flex items-start gap-3">
                        <Users size={18} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                        <p className="text-sm leading-relaxed m-0 font-body" style={{ color: 'var(--color-text-muted)' }}>
                            All classes are held at our Main Studio at 1515 Main Street (North Entrance), Longmont, CO 80501.
                            Not sure which class is right for your dancer? Contact us and we'll help you find the perfect fit.
                        </p>
                    </div>
                </div>

                <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdwHgYmBAiEpIEYMQETjLNLyoGOZvk_SUsQn_iL70zVVFS7DQ/viewform?usp=sf_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        aria-label="Sign up to try a free Irish dance class"
                    >
                        Try a Free Class
                        <ChevronRight size={16} aria-hidden="true" />
                    </a>
                    <Link to="/registration" className="btn-outline"
                        aria-label="Register for classes at Avoca Irish Dance">
                        Register Now
                    </Link>
                </div>
            </section>
        </div>
    )
}
