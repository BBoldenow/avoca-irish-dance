import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer
            role="contentinfo"
            style={{ background: 'var(--color-surface)', borderTop: '1px solid rgba(201,168,76,0.15)' }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Brand */}
                    <div>
                        <p
                            className="font-display text-3xl font-light mb-2"
                            style={{ color: 'var(--color-accent)' }}
                        >
                            AVOCA
                        </p>
                        <p className="text-sm font-body mb-4" style={{ color: 'var(--color-text-muted)' }}>
                            Irish Dance Academy
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                            A competitive Irish dance school in Longmont, Colorado — creating excellent dancers and excellent humans.
                        </p>
                    </div>

                    {/* Quick links */}
                    <nav aria-label="Footer navigation">
                        <h3
                            className="text-xs font-semibold tracking-widest uppercase mb-4 font-body"
                            style={{ color: 'var(--color-accent)' }}
                        >
                            Quick Links
                        </h3>
                        <ul className="list-none m-0 p-0 space-y-2" role="list">
                            {[
                                { label: 'About', path: '/about' },
                                { label: 'Rates', path: '/rates' },
                                { label: 'Class Schedule', path: '/class-schedule' },
                                { label: 'Registration / Parent Portal', path: '/registration' },
                                { label: 'Gallery', path: '/gallery' },
                                { label: 'Feis', path: '/feis' },
                                { label: 'Contact', path: '/contact' },
                            ].map(({ label, path, isExternal }) => (
                                <li key={path}>
                                    {isExternal ? (
                                        <a
                                            href={path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm transition-colors duration-200 hover:underline font-body"
                                            style={{ color: 'var(--color-text-muted)' }}
                                            onMouseEnter={e => e.target.style.color = 'var(--color-accent)'}
                                            onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}
                                        >
                                            {label}
                                        </a>
                                    ) : (
                                        <Link
                                            to={path}
                                            className="text-sm transition-colors duration-200 hover:underline font-body"
                                            style={{ color: 'var(--color-text-muted)' }}
                                            onMouseEnter={e => e.target.style.color = 'var(--color-accent)'}
                                            onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}
                                        >
                                            {label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contact */}
                    <address style={{ fontStyle: 'normal' }}>
                        <h3
                            className="text-xs font-semibold tracking-widest uppercase mb-4 font-body"
                            style={{ color: 'var(--color-accent)' }}
                        >
                            Contact Us
                        </h3>
                        <ul className="list-none m-0 p-0 space-y-3" role="list">
                            <li className="flex items-start gap-3">
                                <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                                <p className="text-sm m-0" style={{ color: 'var(--color-text-muted)' }}>
                                    <strong style={{ color: 'var(--color-text)' }}>Studio:</strong><br />
                                    1515 Main Street (North Entrance)<br />
                                    Longmont, CO 80501
                                </p>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={16} className="flex-shrink-0" style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                                <a
                                    href="tel:3033244895"
                                    className="text-sm transition-colors duration-200"
                                    style={{ color: 'var(--color-text-muted)' }}
                                    onMouseEnter={e => e.target.style.color = 'var(--color-accent)'}
                                    onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}
                                >
                                    303-324-4895
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={16} className="flex-shrink-0" style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                                <a
                                    href="mailto:susannahirishdance@gmail.com"
                                    className="text-sm transition-colors duration-200 break-all"
                                    style={{ color: 'var(--color-text-muted)' }}
                                    onMouseEnter={e => e.target.style.color = 'var(--color-accent)'}
                                    onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}
                                >
                                    susannahirishdance@gmail.com
                                </a>
                            </li>
                        </ul>
                    </address>
                </div>

                {/* Bottom bar */}
                <div
                    className="mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
                    style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}
                >
                    <p className="text-xs m-0" style={{ color: 'var(--color-text-muted)' }}>
                        © {year} Avoca Irish Dance Academy. All rights reserved.
                    </p>
                    <p className="text-xs m-0" style={{ color: 'var(--color-text-muted)' }}>
                        Sister school:{' '}
                        <a
                            href="https://connollyirishdance.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors duration-200"
                            style={{ color: 'var(--color-accent)' }}
                        >
                            Connolly Irish Dance
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}
