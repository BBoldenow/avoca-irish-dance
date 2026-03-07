import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import Button from './ui/Button.jsx'

const NAV_LINKS = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Rates', to: '/rates' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Parent Portal', to: '/registration' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Contact', to: '/contact' },
]

const SCHEDULE_LINKS = [
    { label: 'Class Schedule', to: '/class-schedule' },
    { label: 'Avoca Feis', to: '/feis' },
    { label: 'Events', to: '/events' },
]

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const navRef = useRef(null)
    const logoRef = useRef(null)
    const location = useLocation()
    const navigate = useNavigate()

    // Close menus on route change
    useEffect(() => {
        setMenuOpen(false)
    }, [location.pathname])

    useEffect(() => {
        gsap.set(navRef.current, { opacity: 1, y: 0 })

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.1 })
            tl.from(navRef.current, { y: -60, opacity: 0, duration: 0.7, ease: 'power3.out' })
            tl.from(logoRef.current, { opacity: 0, x: -16, duration: 0.4, ease: 'power2.out' }, '-=0.3')
            tl.from('.nav-link', { opacity: 0, y: -8, stagger: 0.05, duration: 0.35, ease: 'power2.out' }, '-=0.25')
        }, navRef)

        const handleScroll = () => {
            setScrolled(window.scrollY > 60)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()

        return () => {
            ctx.revert()
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const isActive = (to) => {
        if (to === '/') return location.pathname === '/'
        return location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
    }

    return (
        <>
            <a href="#main-content" className="skip-nav">Skip to main content</a>
            <nav
                ref={navRef}
                className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24"
                style={{
                    backgroundColor: scrolled ? 'rgba(30, 30, 25, 0.97)' : 'rgba(30, 30, 25, 0.3)',
                    backdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'blur(4px)',
                    borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : '1px solid transparent',
                    transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
                }}
            >
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link ref={logoRef} to="/" className="flex flex-col leading-none group" aria-label="AVOCA&#10;IRISH DANCE ACADEMY">
                        <span className="font-display text-2xl md:text-3xl font-light tracking-[0.12em] text-gold-light group-hover:text-gold transition-colors duration-300">
                            AVOCA
                        </span>
                        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-cream/60 group-hover:text-cream/90 transition-colors duration-300">
                            Irish Dance Academy
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <ul className="hidden lg:flex items-center gap-7">
                        <li>
                            <Link
                                to="/"
                                className={`nav-link font-body text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 relative group ${isActive('/') ? 'text-gold' : 'text-cream/60 hover:text-gold'}`}
                            >
                                Home
                                <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className={`nav-link font-body text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 relative group ${isActive('/about') ? 'text-gold' : 'text-cream/60 hover:text-gold'}`}
                            >
                                About
                                <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${isActive('/about') ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/rates"
                                className={`nav-link font-body text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 relative group ${isActive('/rates') ? 'text-gold' : 'text-cream/60 hover:text-gold'}`}
                            >
                                Rates
                                <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${isActive('/rates') ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                            </Link>
                        </li>
                        {/* Schedule & Events Dropdown */}
                        <li className="relative group">
                            <button className="nav-link font-body text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 relative text-cream/60 hover:text-gold flex items-center gap-1">
                                Schedule & Events
                                <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                            </button>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                                <ul className="bg-ink/95 backdrop-blur-md border border-gold/10 p-4 flex flex-col gap-4 min-w-[180px]">
                                    {SCHEDULE_LINKS.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                to={link.to}
                                                className={`block font-body text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${isActive(link.to) ? 'text-gold' : 'text-cream/60 hover:text-gold'}`}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                        {NAV_LINKS.slice(3).map((link) => (
                            <li key={link.label}>
                                <Link
                                    to={link.to}
                                    className={`nav-link font-body text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 relative group ${isActive(link.to) ? 'text-gold' : 'text-cream/60 hover:text-gold'}`}
                                >
                                    {link.label}
                                    <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* CTA phone pill */}
                    {/*<span className="hidden lg:flex items-center">
                        <Button href="tel:3033244895" className="flex-shrink-0 whitespace-nowrap">
                            Call: 303-324-4895
                        </Button>
                    </span>*/}

                    {/* Mobile hamburger */}
                    <button
                        className="lg:hidden text-cream/70 hover:text-gold transition-colors duration-200 p-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Mobile dropdown */}
                {menuOpen && (
                    <div
                        className="lg:hidden absolute top-full left-0 right-0 border-t border-white/10 px-6 py-6"
                        style={{ backgroundColor: 'rgba(30, 30, 25, 0.98)', backdropFilter: 'blur(16px)' }}
                    >
                        <ul className="flex flex-col gap-1">
                            {NAV_LINKS.slice(0, 3).map((link) =>
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        className="block font-body text-sm uppercase tracking-[0.2em] text-cream/70 hover:text-gold py-3 transition-colors duration-200"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            )}

                            {/* Schedule & Events Mobile */}
                            <li className="py-2">
                                <span className="block font-body text-[10px] uppercase tracking-[0.3em] text-gold/50 mb-3 mt-2">Schedule & Events</span>
                                <ul className="flex flex-col gap-1 pl-4 border-l border-gold/20">
                                    {SCHEDULE_LINKS.map(link => (
                                        <li key={link.label}>
                                            <Link
                                                to={link.to}
                                                className="block font-body text-sm uppercase tracking-[0.2em] text-cream/70 hover:text-gold py-2 transition-colors duration-200"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {NAV_LINKS.slice(3).map((link) =>
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        className="block font-body text-sm uppercase tracking-[0.2em] text-cream/70 hover:text-gold py-3 transition-colors duration-200"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            )}
                        </ul>
                        <div className="mt-4 flex items-center justify-center">
                            <Button href="tel:3033244895" className="w-full">
                                Call: 303-324-4895
                            </Button>
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}
