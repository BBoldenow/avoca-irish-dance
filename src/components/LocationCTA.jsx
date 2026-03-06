import { useRef } from 'react'
import Button from './ui/Button.jsx'
import SectionLabel from './ui/SectionLabel.jsx'

export default function LocationCTA() {
    const locationRef = useRef(null)

    return (
        <section
            ref={locationRef}
            className="section-padding max-w-7xl mx-auto relative"
            aria-labelledby="location-heading"
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gold/5 blur-[120px] pointer-events-none" />

            <div className="text-center mb-16">
                <SectionLabel className="mb-4">Location</SectionLabel>
                <h2 id="location-heading" className="font-display text-4xl sm:text-6xl font-light text-cream">
                    Find Us
                </h2>
                <p className="mt-6 text-[1.05rem] font-body text-cream/60 font-light max-w-2xl mx-auto">
                    We look forward to meeting you. Please do not hesitate to reach out with your questions.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto relative z-10">
                <div className="p-8 text-center border border-gold/10 bg-ink-soft/50 backdrop-blur-sm">
                    <SectionLabel className="mb-5 !tracking-[0.3em]">Main Studio</SectionLabel>
                    <p className="font-body text-cream/70 font-light leading-relaxed">
                        1515 Main Street (North Entrance)<br />
                        Longmont, Colorado 80501
                    </p>
                </div>
                <div className="p-8 text-center border border-gold/10 bg-ink-soft/50 backdrop-blur-sm">
                    <SectionLabel className="mb-5 !tracking-[0.3em]">Get In Touch</SectionLabel>
                    <p className="font-body text-cream/70 font-light leading-relaxed">
                        <a href="tel:3033244895" className="block hover:text-gold transition-colors duration-300">303-324-4895</a>
                        <a href="mailto:susannahirishdance@gmail.com" className="block mt-1 hover:text-gold transition-colors duration-300">
                            susannahirishdance@gmail.com
                        </a>
                    </p>
                </div>
            </div>

            <div className="mt-16 max-w-5xl mx-auto relative z-10">
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

            <div className="text-center mt-16 relative z-10">
                <Button to="/contact">
                    Contact Us
                </Button>
            </div>
        </section>
    )
}
