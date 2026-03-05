import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Rates', path: '/rates' },
    { label: 'Classes', path: '/class-schedule' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Feis', path: '/feis' },
    { label: 'Registration / Parent Portal', path: '/registration' },
    { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()
    const navRef = useRef(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Close mobile menu on route change
    useEffect(() => {
        setMenuOpen(false)
    }, [location.pathname])

    // Entrance animation
    useEffect(() => {
        gsap.set(navRef.current, { opacity: 1 })
        gsap.fromTo(navRef.current,
            { y: -60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
        )
    }, [])

    const isActive = (path) =>
        path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

    return (
        <>
            <a href="#main-content" className="skip-nav">Skip to main content</a>
            <nav
                ref={navRef}
                role="navigation"
                aria-label="Main navigation"
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
                style={{
                    background: scrolled
                        ? 'rgba(10,10,10,0.97)'
                        : 'linear-gradient(to bottom, rgba(10,10,10,0.80), transparent)',
                    backdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : 'none',
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 group focus-visible:outline-accent"
                        aria-label="AVOCA Irish Dance Academy"
                    >
                        <div className="flex flex-col leading-none">
                            <span
                                className="font-display text-2xl font-light tracking-wide"
                                style={{ color: 'var(--color-accent)' }}
                            >
                                AVOCA
                            </span>
                            <span className="text-xs tracking-[0.25em] uppercase font-body font-light" style={{ color: 'var(--color-text-muted)' }}>
                                Irish Dance Academy
                            </span>
                        </div>
                    </Link>

                    {/* Desktop links */}
                    <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0" role="list">
                        {navLinks.map(({ label, path, isExternal }) => (
                            <li key={path}>
                                {isExternal ? (
                                    <a
                                        href={path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-2 rounded text-sm font-medium tracking-wide transition-colors duration-200 font-body relative group"
                                        style={{ color: 'var(--color-text)' }}
                                    >
                                        {label}
                                        <span
                                            className="absolute bottom-0 left-3 right-3 h-px transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"
                                            style={{
                                                background: 'var(--color-accent)',
                                                transformOrigin: 'left',
                                            }}
                                        />
                                    </a>
                                ) : (
                                    <Link
                                        to={path}
                                        className="px-3 py-2 rounded text-sm font-medium tracking-wide transition-colors duration-200 font-body relative group"
                                        style={{
                                            color: isActive(path) ? 'var(--color-accent)' : 'var(--color-text)',
                                        }}
                                        aria-current={isActive(path) ? 'page' : undefined}
                                    >
                                        {label}
                                        <span
                                            className="absolute bottom-0 left-3 right-3 h-px transition-all duration-300"
                                            style={{
                                                background: 'var(--color-accent)',
                                                transform: isActive(path) ? 'scaleX(1)' : 'scaleX(0)',
                                                transformOrigin: 'left',
                                            }}
                                        />
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* CTA + hamburger */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSdwHgYmBAiEpIEYMQETjLNLyoGOZvk_SUsQn_iL70zVVFS7DQ/viewform?usp=sf_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary hidden md:inline-flex text-sm py-2 px-4"
                            style={{ boxShadow: 'none', transition: 'background 0.2s, box-shadow 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(201,168,76,0.35)'}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                            aria-label="Try a Free Class"
                        >
                            Try a Free Class
                        </a>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden p-2 rounded focus-visible:outline-accent"
                            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-menu"
                            style={{ color: 'var(--color-text)' }}
                        >
                            {menuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <div
                    id="mobile-menu"
                    className="lg:hidden overflow-hidden transition-all duration-300"
                    style={{
                        maxHeight: menuOpen ? '420px' : '0',
                        background: 'rgba(10,10,10,0.98)',
                        borderTop: menuOpen ? '1px solid rgba(201,168,76,0.1)' : 'none',
                    }}
                    aria-hidden={!menuOpen}
                >
                    <ul className="list-none m-0 p-0 px-4 py-3 flex flex-col gap-1" role="list">
                        {navLinks.map(({ label, path, isExternal }) => (
                            <li key={path}>
                                {isExternal ? (
                                    <a
                                        href={path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block px-4 py-3 rounded font-medium transition-colors duration-200 font-body"
                                        style={{
                                            color: 'var(--color-text)',
                                            background: 'transparent',
                                        }}
                                        tabIndex={menuOpen ? 0 : -1}
                                    >
                                        {label}
                                    </a>
                                ) : (
                                    <Link
                                        to={path}
                                        className="block px-4 py-3 rounded font-medium transition-colors duration-200 font-body"
                                        style={{
                                            color: isActive(path) ? 'var(--color-accent)' : 'var(--color-text)',
                                            background: isActive(path) ? 'rgba(201,168,76,0.08)' : 'transparent',
                                        }}
                                        tabIndex={menuOpen ? 0 : -1}
                                        aria-current={isActive(path) ? 'page' : undefined}
                                    >
                                        {label}
                                    </Link>
                                )}
                            </li>
                        ))}
                        <li className="pt-2 pb-3">
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSdwHgYmBAiEpIEYMQETjLNLyoGOZvk_SUsQn_iL70zVVFS7DQ/viewform?usp=sf_link"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary w-full text-center justify-center"
                                tabIndex={menuOpen ? 0 : -1}
                            >
                                Try a Free Class
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
