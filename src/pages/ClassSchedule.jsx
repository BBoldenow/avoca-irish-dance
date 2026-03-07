import { useLayoutEffect, useRef, useState, useMemo } from 'react'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import DiamondDivider from '../components/ui/DiamondDivider.jsx'
import gsap from 'gsap'
import { Clock, MapPin, CalendarDays, List } from 'lucide-react'
import { useMeta } from '../hooks/useMeta.js'
import { useGoogleCalendar } from '../hooks/useGoogleCalendar.js'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export default function ClassSchedule() {
    const sectionRef = useRef(null)
    const [selectedDate, setSelectedDate] = useState(new Date())
    // Mobile tab state: 'calendar' | 'schedule'
    const [mobileTab, setMobileTab] = useState('calendar')

    useMeta({
        title: 'Class Schedule | Avoca Irish Dance Academy',
        description: 'View the monthly and weekly class schedule for Avoca Irish Dance Academy in Longmont, Colorado.',
        path: '/class-schedule',
    })

    const classesCalendarId = import.meta.env.VITE_GOOGLE_CLASSES_CALENDAR_ID
    const { events: classEvents, loading, error } = useGoogleCalendar(classesCalendarId, 250)

    const normalizeDate = (d) => {
        const nd = new Date(d)
        nd.setHours(0, 0, 0, 0)
        return nd.getTime()
    }

    const weeklySchedule = useMemo(() => {
        const scheduleByDay = {}
        if (!classEvents || classEvents.length === 0) return scheduleByDay

        const startDate = new Date(selectedDate)
        startDate.setHours(0, 0, 0, 0)

        const endDate = new Date(startDate)
        endDate.setDate(endDate.getDate() + 7)

        const upcomingClasses = classEvents.filter(ev => ev.start >= startDate && ev.start < endDate)

        upcomingClasses.forEach(ev => {
            const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).format(ev.start)
            if (!scheduleByDay[dayName]) scheduleByDay[dayName] = []
            scheduleByDay[dayName].push(ev)
        })

        return scheduleByDay
    }, [classEvents, selectedDate])

    const activeDays = Object.keys(weeklySchedule).sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime()
    })

    const tileContent = ({ date, view }) => {
        if (view === 'month' && classEvents && classEvents.length > 0) {
            const time = normalizeDate(date)
            const hasClasses = classEvents.some(ev => normalizeDate(ev.start) === time)
            if (hasClasses) {
                return <div className="w-1.5 h-1.5 bg-gold rounded-full mx-auto mt-1" />
            }
        }
        return null
    }

    // When user picks a date on mobile, auto-switch to schedule tab
    const handleDateChange = (date) => {
        setSelectedDate(date)
        setMobileTab('schedule')
    }

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
        const ctx = gsap.context(() => {
            gsap.fromTo('.loc-elem', { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.2 })
        }, sectionRef)
        return () => ctx.revert()
    }, [classEvents])

    // Shared schedule list markup (used in both mobile and desktop)
    const ScheduleList = () => (
        <>
            {loading && (
                <div className="flex flex-col items-center justify-center text-cream/50 py-12">
                    <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="font-body text-xs tracking-wide uppercase">Syncing Classes...</p>
                </div>
            )}

            {error && (
                <div className="border border-red-900/50 bg-red-950/20 p-6 text-center">
                    <p className="font-body text-red-400 text-sm mb-1">Notice to Administrators:</p>
                    <p className="font-body text-cream/70 text-xs font-light">{error}</p>
                </div>
            )}

            {!loading && !error && activeDays.length === 0 && (
                <div className="text-center py-10 border border-gold/10 p-8" style={{ backgroundColor: 'rgba(14,14,14,0.5)' }}>
                    <p className="font-display text-2xl font-light text-cream/60 mb-2">No upcoming classes</p>
                    <p className="font-body text-cream/50 font-light text-sm">
                        There are no classes scheduled for the week of{' '}
                        {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(selectedDate)}.
                    </p>
                </div>
            )}

            {!loading && !error && activeDays.length > 0 && (
                <div className="flex flex-col gap-8">
                    {activeDays.map(day => (
                        <div key={day} className="border border-gold/20 overflow-hidden group">
                            <div className="bg-gold/10 px-6 py-4 border-b border-gold/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <h3 className="font-display text-2xl font-light text-gold-light tracking-wide">{day}</h3>
                            </div>
                            <div className="flex flex-col divide-y divide-gold/10 bg-black-mid/40">
                                {weeklySchedule[day].map(ev => {
                                    const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' })
                                    const timeString = ev.isAllDay ? 'All Day' : `${timeFormatter.format(ev.start)} – ${timeFormatter.format(ev.end)}`

                                    let badge = 'Class'
                                    let title = ev.title
                                    const tagMatch = title.match(/^\[(.*?)\]\s*(.*)$/)
                                    if (tagMatch) {
                                        badge = tagMatch[1]
                                        title = tagMatch[2]
                                    }

                                    return (
                                        <div key={ev.id} className="p-6 md:p-8 hover:bg-gold/5 transition-colors duration-300">
                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="inline-block font-body text-[9px] uppercase tracking-[0.2em] text-gold border border-gold/20 px-2 py-0.5">
                                                            {badge}
                                                        </span>
                                                        <div className="flex items-center gap-1.5 text-cream/60">
                                                            <Clock size={12} className="text-gold/70" />
                                                            <span className="font-body text-xs tracking-wide">{timeString}</span>
                                                        </div>
                                                    </div>
                                                    <h4 className="font-display text-xl md:text-2xl text-cream font-light mb-2">{title}</h4>
                                                    {ev.location && (
                                                        <div className="flex items-center gap-1.5 text-cream/40 mt-3 border-t border-gold/10 pt-3 inline-flex">
                                                            <MapPin size={12} className="text-gold/50" />
                                                            <span className="font-body text-xs">{ev.location}</span>
                                                        </div>
                                                    )}
                                                    {ev.description && (
                                                        <p className="font-body text-sm text-cream/50 mt-3 max-w-lg leading-relaxed">{ev.description}</p>
                                                    )}
                                                </div>
                                                {ev.htmlLink && (
                                                    <a href={ev.htmlLink} target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-wider text-gold hover:text-gold-light border-b border-gold/30 hover:border-gold-light transition-all pb-0.5 mt-2 md:mt-0 flex-shrink-0 self-start">
                                                        Add to Calendar
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )

    return (
        <div ref={sectionRef} className="pt-20 bg-ink min-h-screen">
            <header className="section-header-banner">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-gold/5 blur-[100px] pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <SectionLabel className="loc-elem mb-4">
                        Live Calendar
                    </SectionLabel>
                    <h1 className="loc-elem font-display text-4xl md:text-5xl lg:text-7xl font-light text-cream mb-6 leading-tight">
                        Class <span className="italic text-gold-light">Schedule</span>
                    </h1>
                    <DiamondDivider className="loc-elem mt-8 mb-8" />
                    <p className="loc-elem font-body text-cream/60 max-w-xl mx-auto font-light leading-relaxed">
                        Check out our weekly class schedule below. Click on any class for more details and to add it to your personal calendar.
                    </p>
                </div>
            </header>

            <div className="section-padding">
                <div className="max-w-6xl mx-auto">

                    {/* ── Mobile Tab Bar (hidden on lg+) ── */}
                    <div className="lg:hidden mb-6 loc-elem">
                        <div className="flex border border-gold/20 overflow-hidden">
                            <button
                                onClick={() => setMobileTab('calendar')}
                                aria-pressed={mobileTab === 'calendar'}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 font-body text-xs uppercase tracking-widest transition-colors duration-300 ${mobileTab === 'calendar'
                                    ? 'bg-gold/20 text-gold-light'
                                    : 'bg-transparent text-cream/50 hover:text-cream/80 hover:bg-gold/5'
                                    }`}
                            >
                                <CalendarDays size={14} />
                                Calendar
                            </button>
                            <div className="w-px bg-gold/20" />
                            <button
                                onClick={() => setMobileTab('schedule')}
                                aria-pressed={mobileTab === 'schedule'}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 font-body text-xs uppercase tracking-widest transition-colors duration-300 ${mobileTab === 'schedule'
                                    ? 'bg-gold/20 text-gold-light'
                                    : 'bg-transparent text-cream/50 hover:text-cream/80 hover:bg-gold/5'
                                    }`}
                            >
                                <List size={14} />
                                Schedule
                            </button>
                        </div>
                    </div>

                    {/* ── Mobile: Calendar Panel ── */}
                    <div className={`lg:hidden loc-elem ${mobileTab === 'calendar' ? 'block' : 'hidden'}`}>
                        <div className="border border-gold/20 bg-black-mid/30 p-6 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                            <h3 className="font-display text-2xl font-light text-gold-light tracking-wide mb-6">Select a Date</h3>
                            <div className="custom-calendar-container">
                                <Calendar
                                    onChange={handleDateChange}
                                    value={selectedDate}
                                    tileContent={tileContent}
                                    prev2Label={null}
                                    next2Label={null}
                                    minDetail="month"
                                />
                            </div>
                            <p className="font-body text-cream/40 text-xs mt-4 text-center tracking-wide">
                                Tap a date to view that week's classes
                            </p>
                        </div>
                    </div>

                    {/* ── Mobile: Schedule Panel ── */}
                    <div className={`lg:hidden loc-elem ${mobileTab === 'schedule' ? 'block' : 'hidden'}`}>
                        {/* Small "back to calendar" hint */}
                        <div className="flex items-center justify-between mb-4">
                            <p className="font-body text-cream/50 text-xs tracking-wide uppercase">
                                Week of {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(selectedDate)}
                            </p>
                            <button
                                onClick={() => setMobileTab('calendar')}
                                className="font-body text-[10px] uppercase tracking-widest text-gold border-b border-gold/30 hover:text-gold-light transition-colors pb-0.5"
                            >
                                ← Change Date
                            </button>
                        </div>
                        <ScheduleList />
                    </div>

                    {/* ── Desktop: Side-by-side (shown on lg+) ── */}
                    <div className="hidden lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                        {/* Left Column: Calendar */}
                        <div className="lg:col-span-5 loc-elem sticky top-32">
                            <div className="border border-gold/20 bg-black-mid/30 p-6 md:p-8 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                                <h3 className="font-display text-2xl font-light text-gold-light tracking-wide mb-6">Select a Date</h3>
                                <div className="custom-calendar-container">
                                    <Calendar
                                        onChange={setSelectedDate}
                                        value={selectedDate}
                                        tileContent={tileContent}
                                        prev2Label={null}
                                        next2Label={null}
                                        minDetail="month"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Schedule */}
                        <div className="lg:col-span-7 loc-elem">
                            <ScheduleList />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
