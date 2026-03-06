import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMeta } from '../hooks/useMeta.js'
import { MapPin, Phone, Mail, ExternalLink, Send } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
    useMeta({
        title: 'Contact Us | Avoca Irish Dance Academy',
        description: 'Get in touch with Avoca Irish Dance Academy in Longmont, Colorado. Call 303-324-4895 or email susannahirishdance@gmail.com.',
        path: '/contact',
    })

    const [formState, setFormState] = useState({ name: '', email: '', message: '' })
    const [submitted, setSubmitted] = useState(false)
    const contentRef = useRef(null)

    const handleChange = (e) =>
        setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const handleSubmit = (e) => {
        e.preventDefault()
        const { name, email, message } = formState
        const mailtoLink = `mailto:susannahirishdance@gmail.com?subject=Website Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`
        window.location.href = mailtoLink
        setSubmitted(true)
    }

    useEffect(() => {
        gsap.set('.contact-block', { opacity: 1, y: 0 })
        const ctx = gsap.context(() => {
            gsap.fromTo('.contact-block',
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: contentRef.current, start: 'top 75%' },
                }
            )
        }, contentRef)
        return () => ctx.revert()
    }, [])

    return (
        <div className="bg-bg">
            <div className="page-banner">
                <h1>Say Hello</h1>
                <p>We'd love to hear from you. Reach out with any questions.</p>
            </div>

            <section ref={contentRef} className="section-pad max-w-5xl mx-auto" aria-label="Contact information and form">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact info */}
                    <div className="space-y-5">
                        <article className="contact-block card p-6" aria-labelledby="studio-address">
                            <h2 id="studio-address" className="font-display text-xl font-light mb-4 text-accent">
                                Studio Location
                            </h2>
                            <address className="not-italic">
                                <div className="flex items-start gap-3 mb-4">
                                    <MapPin size={18} className="mt-0.5 flex-shrink-0 text-accent" aria-hidden="true" />
                                    <div>
                                        <p className="text-sm font-semibold mb-1 m-0 text-text-main">Main Studio</p>
                                        <p className="text-sm m-0 text-text-muted">
                                            1515 Main Street (North Entrance)<br />
                                            Longmont, CO 80501
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 mb-4">
                                    <MapPin size={18} className="mt-0.5 flex-shrink-0 text-text-muted" aria-hidden="true" />
                                    <div>
                                        <p className="text-sm font-semibold mb-1 m-0 text-text-main">Mailing Address</p>
                                        <p className="text-sm m-0 text-text-muted">
                                            1750 Prairie Trail Dr.<br />
                                            Loveland, CO 80537
                                        </p>
                                    </div>
                                </div>
                            </address>
                        </article>

                        <article className="contact-block card p-6" aria-labelledby="contact-details">
                            <h2 id="contact-details" className="font-display text-xl font-light mb-4 text-accent">
                                Registration Contact
                            </h2>
                            <p className="text-sm font-medium mb-3 font-body text-text-main">
                                Susannah Ruehlen
                            </p>
                            <ul className="list-none m-0 p-0 space-y-3" role="list">
                                <li>
                                    <a href="tel:3033244895"
                                        className="flex items-center gap-3 text-sm transition-colors duration-200 group font-body text-text-muted">
                                        <Phone size={16} className="text-accent" aria-hidden="true" />
                                        <span className="group-hover:underline text-inherit">303-324-4895</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:susannahirishdance@gmail.com"
                                        className="flex items-center gap-3 text-sm transition-colors duration-200 group font-body break-all text-text-muted">
                                        <Mail size={16} className="flex-shrink-0 text-accent" aria-hidden="true" />
                                        <span className="group-hover:underline">susannahirishdance@gmail.com</span>
                                    </a>
                                </li>
                            </ul>
                            <div className="mt-5">
                                <a
                                    href="https://app.jackrabbitclass.com/regv2.asp?id=537819"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary w-full justify-center text-center text-sm"
                                    aria-label="Register online for Avoca Irish Dance classes"
                                >
                                    Register Online
                                    <ExternalLink size={14} aria-hidden="true" />
                                </a>
                            </div>
                        </article>
                    </div>

                    {/* Contact form */}
                    <div className="contact-block card p-8">
                        <h2 className="font-display text-2xl font-light mb-6 text-accent">
                            Send a Message
                        </h2>
                        {submitted ? (
                            <div className="text-center py-8">
                                <p className="text-2xl mb-3" aria-live="polite">✉️</p>
                                <p className="font-display text-xl font-light mb-2 text-accent">
                                    Thanks for reaching out!
                                </p>
                                <p className="text-sm font-body text-text-muted">
                                    We'll get back to you as soon as possible.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5 font-body text-text-main">
                                            Your Name <span aria-hidden="true">*</span>
                                        </label>
                                        <input
                                            id="contact-name"
                                            name="name"
                                            type="text"
                                            required
                                            autoComplete="name"
                                            value={formState.name}
                                            onChange={handleChange}
                                            placeholder="Jane Smith"
                                            className="w-full px-4 py-3 rounded-lg text-sm font-body transition-colors duration-200 bg-surface-2 border border-accent/20 text-text-main outline-none focus:border-accent"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5 font-body text-text-main">
                                            Email Address <span aria-hidden="true">*</span>
                                        </label>
                                        <input
                                            id="contact-email"
                                            name="email"
                                            type="email"
                                            required
                                            autoComplete="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                            placeholder="jane@example.com"
                                            className="w-full px-4 py-3 rounded-lg text-sm font-body transition-colors duration-200 bg-surface-2 border border-accent/20 text-text-main outline-none focus:border-accent"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5 font-body text-text-main">
                                            Message <span aria-hidden="true">*</span>
                                        </label>
                                        <textarea
                                            id="contact-message"
                                            name="message"
                                            required
                                            rows={5}
                                            value={formState.message}
                                            onChange={handleChange}
                                            placeholder="Tell us about yourself or ask a question…"
                                            className="w-full px-4 py-3 rounded-lg text-sm font-body transition-colors duration-200 resize-none bg-surface-2 border border-accent/20 text-text-main outline-none focus:border-accent"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn-primary w-full justify-center"
                                        aria-label="Send your message to Avoca Irish Dance"
                                    >
                                        Send Message
                                        <Send size={16} aria-hidden="true" />
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Map embed */}
                <div className="contact-block mt-8">
                    <div className="relative w-full aspect-video min-h-[400px] border border-accent/15 overflow-hidden rounded-xl">
                        <iframe
                            title="Avoca Irish Dance Studio Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.0682610470794!2d-105.1031289!3d40.1852943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876bf96dfc846fbf%3A0xe69aec57c93c6628!2sAvoca%20Irish%20Dance%20Academy!5e0!3m2!1sen!2sus!4v1772733554788!5m2!1sen!2sus"
                            className="absolute inset-0 w-full h-full bg-[#e5e3df]"
                            style={{ filter: 'invert(0.9) hue-rotate(180deg) saturate(0.3)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}
