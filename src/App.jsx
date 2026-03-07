import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'

// Lazy-load all pages except Home
const CoreValues = lazy(() => import('./pages/CoreValues.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Rates = lazy(() => import('./pages/Rates.jsx'))
const ClassSchedule = lazy(() => import('./pages/ClassSchedule.jsx'))
const Registration = lazy(() => import('./pages/Registration.jsx'))
const Gallery = lazy(() => import('./pages/Gallery.jsx'))
const Feis = lazy(() => import('./pages/Feis.jsx'))
const Events = lazy(() => import('./pages/Events.jsx'))
const FAQ = lazy(() => import('./pages/FAQPage.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))

function ScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [pathname])
    return null
}

function PageFallback() {
    return (
        <div
            className="flex items-center justify-center min-h-screen"
            style={{ background: 'var(--color-bg)' }}
            aria-live="polite"
            aria-label="Loading page…"
        >
            <div
                className="w-8 h-8 border-2 rounded-full animate-spin"
                style={{ borderColor: 'var(--color-accent) transparent transparent transparent' }}
            />
        </div>
    )
}

export default function App() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <ScrollToTop />
            <Navbar />
            <main id="main-content">
                <Suspense fallback={<PageFallback />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<CoreValues />} />
                        <Route path="/about/core-values" element={<CoreValues />} />
                        <Route path="/about/instructors" element={<About />} />
                        <Route path="/rates" element={<Rates />} />
                        <Route path="/class-schedule" element={<ClassSchedule />} />
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/feis" element={<Feis />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </Suspense>
            </main>
            <Footer />
        </BrowserRouter>
    )
}
