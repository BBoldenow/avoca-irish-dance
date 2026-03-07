import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import { Calendar, MapPin } from 'lucide-react'
import { useMeta } from '../hooks/useMeta.js'
import DiamondDivider from '../components/ui/DiamondDivider.jsx'
import { useGoogleCalendar } from '../hooks/useGoogleCalendar.js'

export default function Events() {
    const sectionRef = useRef(null)

    const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID
    const { events: calendarEvents, loading, error } = useGoogleCalendar(calendarId, 10)

    useMeta({
        title: 'Irish Dance Events & Competitions | Avoca Irish Dance Academy',
        description: 'Irish dance events, competitions, and St. Patrick\u2019s Day performances from Avoca Irish Dance Academy in Longmont, CO. Western US Oireachtas and local Feiseanna.',
        path: '/events',
    })

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.loc-elem', { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.2 })
        }, sectionRef)
        return () => ctx.revert()
    }, [calendarEvents])

    return (
        <div ref={sectionRef} className="bg-ink min-h-screen">
            {/* Header */}
            <div className="bg-ink-soft border-b border-gold/10 pt-36 pb-20 px-6 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-gold/5 blur-[100px] pointer-events-none" />
                <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="text-center loc-elem">
                        <SectionLabel className="mb-4">
                            What's On
                        </SectionLabel>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-light text-cream mb-6 leading-tight">
                            Events &amp; <span className="italic text-gold-light">Competitions</span>
                        </h1>
                        <p className="font-body text-cream/55 text-sm md:text-base leading-relaxed font-light mx-auto max-w-xl">
                            Irish dance is meant to be shared! From local <em>Feiseanna</em> (competitions) to St. Patrick's Day shows, our dancers love to perform and compete all year round.
                        </p>
                    </div>
                </div>
            </div>

            {/* Events list */}
            <div className="section-padding min-h-[50vh]">
                <div className="max-w-6xl mx-auto loc-elem">
                    {loading && (
                        <div className="flex flex-col items-center justify-center text-cream/50 py-20">
                            <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mb-4" />
                            <p className="font-body text-sm tracking-wide uppercase">Connecting to Google Calendar...</p>
                        </div>
                    )}

                    {error && (
                        <div className="max-w-xl mx-auto text-center border border-red-900/50 bg-red-950/20 p-8">
                            <p className="font-body text-red-400 mb-2">Notice to Administrators:</p>
                            <p className="font-body text-cream/70 text-sm font-light">{error}</p>
                        </div>
                    )}

                    {!loading && !error && calendarEvents.length === 0 && (
                        <div className="text-center py-20 border border-gold/10 p-8" style={{ backgroundColor: 'rgba(14,14,14,0.5)' }}>
                            <p className="font-display text-2xl font-light text-cream/60 mb-3">No upcoming events right now</p>
                            <p className="font-body text-cream/50 font-light">
                                Check back later, or contact Susannah for updates on performances and competitions.
                            </p>
                        </div>
                    )}

                    {!loading && !error && calendarEvents.length > 0 && (
                        <div className="flex flex-col gap-6">
                            {calendarEvents.map((ev, i) => {
                                // Default colors alternating for aesthetics
                                const isOdd = i % 2 !== 0
                                const accentClass = isOdd ? 'from-cream/5 to-transparent' : 'from-gold/10 to-transparent'

                                // Parse custom tags from title or description like [Competition] or [Performance]
                                let typeBadge = 'Event'
                                let displayTitle = ev.title
                                let displayDesc = ev.description || ''

                                // Check description for [Tag] pattern FIRST (wins)
                                const descTagMatch = displayDesc.match(/^\[(.*?)\]\s*(.*)$/is)
                                if (descTagMatch) {
                                    typeBadge = descTagMatch[1].trim()
                                    displayDesc = descTagMatch[2].trim()
                                    // Also strip it from the title just in case they put it in both
                                    displayTitle = displayTitle.replace(/^\[.*?\]\s*/i, '')
                                } else {
                                    // Check title for [Tag] pattern SECOND
                                    const titleTagMatch = displayTitle.match(/^\[(.*?)\]\s*(.*)$/i)
                                    if (titleTagMatch) {
                                        typeBadge = titleTagMatch[1].trim()
                                        displayTitle = titleTagMatch[2].trim()
                                    } else {
                                        // Automated Fallback based on Keywords LAST
                                        const lowerTitle = displayTitle.toLowerCase()
                                        if (lowerTitle.includes('feis') ||
                                            lowerTitle.includes('oireachtas') ||
                                            lowerTitle.includes('championship') ||
                                            lowerTitle.includes('nationals') ||
                                            lowerTitle.includes('worlds')) {
                                            typeBadge = 'Competition'
                                        } else if (lowerTitle.includes('performance') || lowerTitle.includes('show')) {
                                            typeBadge = 'Performance'
                                        } else if (lowerTitle.includes('camp') || lowerTitle.includes('workshop')) {
                                            typeBadge = 'Workshop'
                                        }
                                    }
                                }

                                // Format dates and times
                                const isMultipleDays = ev.end.getTime() - ev.start.getTime() > 1000 * 60 * 60 * 24 * 1.5
                                const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' })
                                const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' })

                                let formattedDate = ''
                                let formattedTime = ''

                                if (ev.isAllDay) {
                                    formattedDate = isMultipleDays
                                        ? `${dateFormatter.format(ev.start)} – ${dateFormatter.format(ev.end)}`
                                        : dateFormatter.format(ev.start)
                                } else {
                                    formattedDate = isMultipleDays
                                        ? `${dateFormatter.format(ev.start)} – ${dateFormatter.format(ev.end)}`
                                        : dateFormatter.format(ev.start)
                                    // If start and end are on the same day, display the time range nicely
                                    // Make sure it handles "3:00 PM - 4:00 PM"
                                    formattedTime = `${timeFormatter.format(ev.start)} – ${timeFormatter.format(ev.end)}`
                                }

                                const year = ev.start.getFullYear()

                                // Parse generic location into specific chunks if possible (comma separated)
                                let locStr = ev.location || ''
                                let cityStr = ''
                                if (ev.location && ev.location.includes(',')) {
                                    const parts = ev.location.split(',').map(s => s.trim())
                                    if (parts.length >= 2) {
                                        cityStr = parts.slice(-2).join(', ') // Usually "City, State Zip"
                                        locStr = parts.slice(0, parts.length - 2).join(', ') || parts[0]
                                    }
                                }

                                return (
                                    <div
                                        key={ev.id}
                                        className="relative overflow-hidden border border-gold/15 hover:border-gold/35 transition-all duration-500 group"
                                        style={{ backgroundColor: 'rgba(20,20,20,0.6)' }}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${accentClass} opacity-60 pointer-events-none`} />

                                        <div className="relative z-10 p-5 md:p-6">
                                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                                <div className="flex-1">
                                                    <span className="inline-block font-body text-[8px] uppercase tracking-[0.25em] text-gold border border-gold/30 bg-gold/5 px-2 py-0.5 mb-3">
                                                        {typeBadge}
                                                    </span>

                                                    <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-light text-cream mb-3 group-hover:text-gold-light transition-colors duration-300">
                                                        {displayTitle}
                                                    </h2>

                                                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 flex items-center justify-center border border-gold/25 flex-shrink-0">
                                                                <Calendar size={10} className="text-gold" />
                                                            </div>
                                                            <div>
                                                                <p className="font-body text-xs text-cream/70 tracking-wide">{formattedDate}</p>
                                                                {formattedTime ? (
                                                                    <p className="font-body text-[10px] text-gold/80 tracking-wide mt-0.5">{formattedTime}</p>
                                                                ) : (
                                                                    <p className="font-body text-[9px] text-cream/35 tracking-wide">{year}</p>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {ev.location && (
                                                            <div className="flex items-center gap-2 sm:border-l sm:border-gold/15 sm:pl-4">
                                                                <div className="w-6 h-6 flex items-center justify-center border border-gold/25 flex-shrink-0">
                                                                    <MapPin size={10} className="text-gold" />
                                                                </div>
                                                                <div>
                                                                    <a
                                                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.location)}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="group/loc flex flex-col"
                                                                    >
                                                                        <p className="font-body text-xs text-gold hover:text-gold-light underline underline-offset-4 tracking-wide transition-colors duration-300 relative z-20">
                                                                            {locStr}
                                                                        </p>
                                                                        {cityStr && (
                                                                            <p className="font-body text-[9px] text-cream/40 tracking-wide mt-0.5 group-hover/loc:text-cream/70 transition-colors duration-300">
                                                                                {cityStr}
                                                                            </p>
                                                                        )}
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {(displayDesc || ev.htmlLink) && <div className="w-8 h-px bg-gold/30 mb-3" />}
                                                    {displayDesc && <p className="font-body text-cream/55 text-sm leading-relaxed font-light max-w-xl whitespace-pre-line mb-2">{displayDesc}</p>}
                                                    {ev.htmlLink && (
                                                        <a href={ev.htmlLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-1 font-body text-xs text-gold hover:text-gold-light underline underline-offset-4 tracking-wide transition-colors">
                                                            View in Google Calendar &rarr;
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {/* Coming soon notice */}
                    <div className="mt-12 border border-gold/10 p-8 md:p-10 text-center" style={{ backgroundColor: 'rgba(14,14,14,0.5)' }}>
                        <div className="w-8 h-px bg-gold/30 mx-auto mb-6" />
                        <p className="font-display text-xl md:text-2xl font-light text-cream/60 mb-3">More events coming soon</p>
                        <p className="font-body text-cream/40 text-sm font-light">
                            Follow us or{' '}
                            <a href="tel:3033244895" className="text-gold hover:text-gold-light underline underline-offset-4 transition-colors duration-200">
                                call Susannah
                            </a>{' '}
                            for the latest schedule.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
