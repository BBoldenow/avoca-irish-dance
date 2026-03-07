import { useRef, useLayoutEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMeta } from '../hooks/useMeta.js'
import { MapPin, Phone, Mail, ExternalLink, Send, Facebook, Instagram, Share2 } from 'lucide-react'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import Button from '../components/ui/Button.jsx'
import DiamondDivider from '../components/ui/DiamondDivider.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
    useMeta({
        title: 'Contact Us | Avoca Irish Dance Academy',
        description: 'Get in touch with Avoca Irish Dance Academy in Longmont, Colorado. Call 303-324-4895 or email susannahirishdance@gmail.com.',
        path: '/contact',
    })

    const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' })
    const [submitted, setSubmitted] = useState(false)
    const pageRef = useRef(null)

    const handleChange = (e) =>
        setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const handleSubmit = (e) => {
        e.preventDefault()
        const { name, email, message } = formState
        const mailtoLink = `mailto:susannahirishdance@gmail.com?subject=Website Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`
        window.location.href = mailtoLink
        setSubmitted(true)
    }

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
        const ctx = gsap.context(() => {
            gsap.fromTo('.loc-elem',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    delay: 0.2
                }
            )

            if (pageRef.current) {
                gsap.fromTo('.contact-block',
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.7,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: pageRef.current, start: 'top 75%' },
                    }
                )
            }
        }, pageRef)
        return () => ctx.revert()
    }, [])

    return (
        <div ref={pageRef} className="bg-ink min-h-screen">
            <header className="section-header-banner">
                {/* Subtle radial glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-gold/5 blur-[100px] pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <SectionLabel className="loc-elem mb-4">Say Hello</SectionLabel>
                    <h1 className="loc-elem font-display text-4xl md:text-5xl lg:text-6xl font-light text-cream mb-6 leading-tight tracking-tight">
                        We'd Love to Hear <span className="italic text-gold-light">From You</span>
                    </h1>
                    <DiamondDivider className="loc-elem mt-8 mb-8" />
                    <p className="loc-elem font-body text-cream/60 max-w-xl mx-auto font-light leading-relaxed">
                        Whether you have a question about classes, performances, or starting your journey, we're here to help.
                    </p>
                </div>
            </header>

            <section className="section-padding bg-ink relative" aria-label="Contact information and form">
                {/* Ambient glow */}
                <div className="absolute top-10 right-[10%] w-[500px] h-[500px] bg-gold/5 blur-[120px] pointer-events-none" />

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative z-10">
                    {/* Contact info */}
                    <div className="flex flex-col gap-8">
                        <div className="contact-block">
                            <h2 className="font-display text-3xl font-light text-cream mb-8 pb-3 border-b border-gold/10 inline-block pr-12">Direct Contact</h2>
                            <div className="flex flex-col gap-5">
                                {/* Call */}
                                <a href="tel:3033244895" className="group flex items-center gap-5 border border-gold/10 bg-ink-soft/40 backdrop-blur-sm hover:border-gold/30 p-6 transition-all duration-300">
                                    <div className="w-12 h-12 flex items-center justify-center border border-gold/20 group-hover:bg-gold/5 group-hover:border-gold/40 flex-shrink-0 transition-all duration-300 rounded-full">
                                        <Phone size={16} className="text-gold" />
                                    </div>
                                    <div>
                                        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold/60 mb-1">Call Susannah</p>
                                        <p className="font-display text-2xl font-light text-cream group-hover:text-gold-light transition-colors duration-300">303-324-4895</p>
                                    </div>
                                </a>

                                {/* Email */}
                                <a href="mailto:susannahirishdance@gmail.com" className="group flex items-center gap-5 border border-gold/10 bg-ink-soft/40 backdrop-blur-sm hover:border-gold/30 p-6 transition-all duration-300">
                                    <div className="w-12 h-12 flex items-center justify-center border border-gold/20 group-hover:bg-gold/5 group-hover:border-gold/40 flex-shrink-0 transition-all duration-300 rounded-full">
                                        <Mail size={16} className="text-gold" />
                                    </div>
                                    <div>
                                        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold/60 mb-1">Email Us</p>
                                        <p className="font-display text-xl font-light text-cream group-hover:text-gold-light transition-colors duration-300 break-all">susannahirishdance@gmail.com</p>
                                    </div>
                                </a>

                                {/* Main Studio */}
                                <div className="flex items-center gap-5 border border-gold/10 bg-ink-soft/40 backdrop-blur-sm p-6">
                                    <div className="w-12 h-12 flex items-center justify-center border border-gold/20 flex-shrink-0 rounded-full">
                                        <MapPin size={16} className="text-gold" />
                                    </div>
                                    <div>
                                        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold/60 mb-1.5">Main Studio</p>
                                        <p className="font-body text-[0.95rem] text-cream/70 font-light leading-[1.6]">1515 Main Street (North Entrance)<br />Longmont, CO 80501</p>
                                    </div>
                                </div>

                                {/* Mailing Address */}
                                <div className="flex items-center gap-5 border border-gold/10 bg-ink-soft/40 backdrop-blur-sm p-6">
                                    <div className="w-12 h-12 flex items-center justify-center border border-gold/20 flex-shrink-0 rounded-full">
                                        <MapPin size={16} className="text-gold" />
                                    </div>
                                    <div>
                                        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold/60 mb-1.5">Mailing Address</p>
                                        <p className="font-body text-[0.95rem] text-cream/70 font-light leading-[1.6]">1750 Prairie Trail Dr.<br />Loveland, CO 80537</p>
                                    </div>
                                </div>

                                {/* Registration Portal */}
                                <a href="https://app.jackrabbitclass.com/regv2.asp?id=537819" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 border border-gold/10 bg-ink-soft/40 backdrop-blur-sm hover:border-gold/30 p-6 transition-all duration-300">
                                    <div className="w-12 h-12 flex items-center justify-center border border-gold/20 group-hover:bg-gold/5 group-hover:border-gold/40 flex-shrink-0 transition-all duration-300 rounded-full">
                                        <ExternalLink size={16} className="text-gold" />
                                    </div>
                                    <div>
                                        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold/60 mb-1">Student Portal</p>
                                        <p className="font-body text-sm font-light text-cream/90 group-hover:text-gold-light transition-colors duration-300">Register Online</p>
                                    </div>
                                </a>

                                {/* Social Media */}
                                <div className="flex items-center gap-5 border border-gold/10 bg-ink-soft/40 backdrop-blur-sm p-6">
                                    <div className="w-12 h-12 flex items-center justify-center border border-gold/20 flex-shrink-0 rounded-full">
                                        <Share2 size={16} className="text-gold" />
                                    </div>
                                    <div>
                                        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold/60 mb-2">Follow Us</p>
                                        <div className="flex gap-4 items-center">
                                            <a href="https://www.facebook.com/AvocaIrishDance/" target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-gold transition-colors duration-200" aria-label="Facebook">
                                                <Facebook size={18} />
                                            </a>
                                            <a href="https://www.instagram.com/avoca_irish_dance/?hl=en" target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-gold transition-colors duration-200" aria-label="Instagram">
                                                <Instagram size={18} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact form */}
                    <div className="contact-block">
                        <h2 className="font-display text-3xl font-light text-cream mb-8 pb-3 border-b border-gold/10 inline-block pr-12">Send a Message</h2>
                        {submitted ? (
                            <div className="border border-gold/20 bg-ink-soft/30 p-12 text-center rounded-sm">
                                <p className="font-display text-3xl font-light text-gold-light mb-3">Thank you!</p>
                                <p className="font-body text-cream/60 font-light text-[0.95rem]">We'll be in touch shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                {[
                                    { id: 'name', label: 'Your Name', type: 'text', required: true },
                                    { id: 'email', label: 'Email Address', type: 'email', required: true },
                                    { id: 'phone', label: 'Phone Number', type: 'tel', required: false },
                                ].map(({ id, label, type, required }) => (
                                    <div key={id}>
                                        <label htmlFor={id} className="block font-body text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-2.5">{label}{required && ' *'}</label>
                                        <input
                                            id={id}
                                            name={id}
                                            type={type}
                                            required={required}
                                            value={formState[id]}
                                            onChange={handleChange}
                                            className="w-full border-b border-gold/20 bg-transparent focus:border-gold outline-none px-2 py-3 font-body font-light text-[0.95rem] text-cream placeholder-cream/20 transition-all duration-300"
                                            placeholder={label}
                                        />
                                    </div>
                                ))}
                                <div className="mt-2">
                                    <label htmlFor="message" className="block font-body text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-2.5">Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={formState.message}
                                        onChange={handleChange}
                                        className="w-full border border-gold/20 bg-ink-soft/30 focus:border-gold/50 focus:bg-ink-soft/50 outline-none px-4 py-4 font-body font-light text-[0.95rem] text-cream placeholder-cream/20 transition-all duration-300 resize-none mt-2 rounded-sm"
                                        placeholder="Tell us about yourself and what you're looking for…"
                                    />
                                </div>
                                <div className="mt-4">
                                    <button type="submit" className="w-full bg-gold hover:bg-gold-light text-black font-body text-[11px] font-medium tracking-[0.2em] uppercase py-4 px-8 transition-colors duration-300 flex items-center justify-center gap-2">
                                        <span>Send Message</span>
                                        <Send size={14} />
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Section Divider */}
                <div className="section-divider mt-16 mb-12 max-w-6xl mx-auto" />

                {/* Map embed */}
                <div className="contact-block max-w-6xl mx-auto">
                    <div className="relative w-full aspect-[21/9] min-h-[350px] border border-gold/20 overflow-hidden">
                        <iframe
                            title="Avoca Irish Dance Studio Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.0682610470794!2d-105.1031289!3d40.1852943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876bf96dfc846fbf%3A0xe69aec57c93c6628!2sAvoca%20Irish%20Dance%20Academy!5e0!3m2!1sen!2sus!4v1772733554788!5m2!1sen!2sus"
                            className="absolute inset-0 w-full h-full bg-[#161612]"
                            style={{ filter: 'invert(1) hue-rotate(180deg) opacity(0.85) grayscale(0.5)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                        <div className="absolute inset-0 border border-gold/10 pointer-events-none" />
                    </div>
                </div>
            </section>
        </div>
    )
}
