import { useState, useEffect } from 'react'

const CACHE_KEY_PREFIX = 'avoca_calendar_cache_v1_'
const CACHE_DURATION_MS = 1000 * 60 * 15 // 15 minutes

export function useGoogleCalendar(calendarId, maxResults = 50) {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true

        const fetchEvents = async () => {
            if (!calendarId) {
                if (isMounted) {
                    setError('No calendar ID provided.')
                    setLoading(false)
                }
                return
            }

            const apiKey = import.meta.env.VITE_GOOGLE_API_KEY
            if (!apiKey || apiKey === 'YOUR_GOOGLE_CLOUD_API_KEY_HERE') {
                if (isMounted) {
                    setError('Google API Key is missing. Please add it to your .env file.')
                    setLoading(false)
                }
                return
            }

            // Check Cache
            const cacheKey = `${CACHE_KEY_PREFIX}${calendarId}`
            const cachedData = localStorage.getItem(cacheKey)
            if (cachedData) {
                try {
                    const parsed = JSON.parse(cachedData)
                    if (Date.now() - parsed.timestamp < CACHE_DURATION_MS) {
                        try {
                            const reconstructedEvents = parsed.events.map(ev => ({
                                ...ev,
                                start: new Date(ev.start),
                                end: new Date(ev.end)
                            }))
                            if (isMounted) {
                                setEvents(reconstructedEvents)
                                setLoading(false)
                            }
                            return
                        } catch (e) {
                            console.warn('Failed to reconstruct dates from cache:', e)
                        }
                    }
                } catch (e) {
                    console.warn('Failed to parse cached calendar data:', e)
                }
            }

            try {
                // Fetch from Google Calendar API v3
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                const timeMin = today.toISOString()

                const sixMonthsFromNow = new Date()
                sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6)
                const timeMax = sixMonthsFromNow.toISOString()

                const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime&maxResults=${maxResults}`

                const response = await fetch(url)

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}))
                    throw new Error(errorData.error?.message || `HTTP error ${response.status}: Failed to fetch Calendar events`)
                }

                const data = await response.json()

                const processedEvents = (data.items || []).map(item => {
                    const isAllDay = !!item.start.date
                    let startDate, endDate;

                    if (isAllDay) {
                        const [sYear, sMonth, sDay] = item.start.date.split('-').map(Number)
                        startDate = new Date(sYear, sMonth - 1, sDay)

                        if (item.end && item.end.date) {
                            const [eYear, eMonth, eDay] = item.end.date.split('-').map(Number)
                            endDate = new Date(eYear, eMonth - 1, eDay)
                            endDate.setDate(endDate.getDate() - 1)
                        } else {
                            endDate = startDate
                        }
                    } else {
                        startDate = new Date(item.start.dateTime)
                        endDate = new Date(item.end.dateTime || item.start.dateTime)
                    }

                    return {
                        id: item.id,
                        title: item.summary || 'Untitled Event',
                        description: item.description || '',
                        location: item.location || '',
                        start: startDate,
                        end: endDate,
                        isAllDay,
                        htmlLink: item.htmlLink
                    }
                })

                if (isMounted) {
                    setEvents(processedEvents)
                    setLoading(false)
                    localStorage.setItem(cacheKey, JSON.stringify({
                        timestamp: Date.now(),
                        events: processedEvents
                    }))
                }

            } catch (err) {
                console.error("Error fetching Google Calendar events:", err)
                if (isMounted) {
                    setError(err.message)
                    setLoading(false)
                }
            }
        }

        fetchEvents()

        return () => {
            isMounted = false
        }
    }, [calendarId, maxResults])

    return { events, loading, error }
}
