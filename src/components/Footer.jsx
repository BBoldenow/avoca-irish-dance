import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react'
import Button from './ui/Button.jsx'

const NAV_LINKS = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Classes', to: '/class-schedule' },
    { label: 'Events', to: '/events' },
    { label: 'Rates', to: '/rates' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Feis', to: '/feis' },
    { label: 'Parent Portal', to: '/registration' },
    { label: 'Contact', to: '/contact' },
]

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="bg-ink border-t border-gold/10 pt-20 pb-10 relative overflow-hidden text-cream/80">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold-dark/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Subtle radial glow from bottom */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at bottom, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
            />

            <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                {/* Top row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex flex-col leading-none mb-5">
                            <span className="font-display text-2xl font-light tracking-[0.12em] text-gold-light">AVOCA</span>
                            <span className="font-body text-[10px] uppercase tracking-[0.3em] text-cream/40 mt-0.5">Irish Dance Academy</span>
                        </Link>
                        <p className="font-body text-cream/40 text-xs leading-relaxed font-light max-w-xs mb-5">
                            A competitive Irish dance school in Longmont, Colorado — creating excellent dancers and excellent humans.
                        </p>
                        {/* Gold accent line */}
                        <div className="w-8 h-px bg-gold/30" />
                    </div>

                    {/* Nav links */}
                    <div>
                        <p className="font-body text-[9px] uppercase tracking-[0.35em] text-gold/50 mb-5">Navigation</p>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                            {NAV_LINKS.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        className="font-body text-[10px] uppercase tracking-[0.18em] text-cream/35 hover:text-gold transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact info */}
                    <div>
                        <p className="font-body text-[9px] uppercase tracking-[0.35em] text-gold/50 mb-5">Contact</p>
                        <div className="flex flex-col gap-4">
                            <a href="tel:3033244895" className="flex items-start gap-3 group">
                                <Phone size={11} className="text-gold mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-body text-xs text-cream/50 group-hover:text-gold transition-colors duration-200">303-324-4895</p>
                                </div>
                            </a>
                            <a href="mailto:susannahirishdance@gmail.com" className="flex items-start gap-3 group">
                                <Mail size={11} className="text-gold mt-0.5 flex-shrink-0" />
                                <p className="font-body text-xs text-cream/50 group-hover:text-gold transition-colors duration-200 break-all">
                                    susannahirishdance@gmail.com
                                </p>
                            </a>
                            <a
                                href="https://www.google.com/maps/place/Avoca+Irish+Dance+Academy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 group"
                            >
                                <MapPin size={11} className="text-gold mt-0.5 flex-shrink-0" />
                                <p className="font-body text-xs text-cream/50 group-hover:text-gold transition-colors duration-200 leading-relaxed">
                                    1515 Main Street (North Entrance)<br />Longmont, CO 80501
                                </p>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="mt-4 mb-4 flex justify-center items-center gap-3">
                    <a
                        href="https://www.facebook.com/AvocaIrishDance/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-opacity duration-200 text-gold hover:opacity-80 hover:text-gold-light"
                        aria-label="Visit our Facebook page"
                    >
                        <Facebook size={24} />
                    </a>
                    <a
                        href="https://www.instagram.com/avoca_irish_dance/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-opacity duration-200 text-gold hover:opacity-80 hover:text-gold-light"
                        aria-label="Visit our Instagram page"
                    >
                        <Instagram size={24} />
                    </a>
                </div>

                {/* Divider */}
                <div className="section-divider mb-8" />

                {/* Bottom row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                    <p className="font-body text-[10px] text-cream/30 tracking-wide">
                        © {year} Avoca Irish Dance Academy · All rights reserved
                    </p>
                    <p className="font-body text-[10px] text-cream/30 tracking-wide">
                        Sister school:{' '}
                        <a
                            href="https://connollyirishdance.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gold/60 hover:text-gold transition-colors duration-200"
                        >
                            Connolly Irish Dance
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}
