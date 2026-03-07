import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMeta } from '../hooks/useMeta.js'
import { UserPlus, LayoutDashboard, ChevronRight } from 'lucide-react'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import Button from '../components/ui/Button.jsx'
import DiamondDivider from '../components/ui/DiamondDivider.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Registration() {
    useMeta({
        title: 'Registration & Parent Portal | Avoca Irish Dance Academy',
        description: 'Register for Irish dance classes at Avoca Irish Dance Academy or log in to the Parent Portal to manage classes, payments, and more.',
        path: '/registration',
    })

    const pageRef = useRef(null)

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
                gsap.fromTo('.reg-card',
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.7,
                        stagger: 0.2,
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
                    <SectionLabel className="loc-elem mb-4">Enrollment</SectionLabel>
                    <h1 className="loc-elem font-display text-4xl md:text-5xl lg:text-7xl font-light text-cream mb-6 leading-tight">
                        Start Your <span className="italic text-gold-light">Journey</span>
                    </h1>
                    <DiamondDivider className="loc-elem mt-8 mb-8" />
                    <p className="loc-elem font-body text-cream/60 max-w-xl mx-auto font-light leading-relaxed">
                        Join our community of dancers. Secure your spot in our upcoming classes.
                    </p>
                </div>
            </header>

            <section className="section-padding max-w-5xl mx-auto relative" aria-label="Registration options">
                {/* Ambient background glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-[500px] bg-gold/5 blur-[120px] pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative z-10">
                    {/* New families */}
                    <article className="reg-card relative p-8 md:p-10 border border-gold/10 bg-ink-soft/40 backdrop-blur-sm group hover:border-gold/30 transition-colors duration-500 flex flex-col" aria-labelledby="new-reg-heading">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gold/10 group-hover:bg-gold/20 transition-colors duration-500 border border-gold/10 relative">
                                <div className="absolute inset-0 bg-gold/20 rounded-full blur-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <UserPlus size={20} className="text-gold relative z-10" aria-hidden="true" />
                            </div>
                            <div>
                                <span className="text-[10px] font-medium tracking-[0.25em] uppercase font-body block mb-1 text-gold/60">
                                    New Students
                                </span>
                                <h2 id="new-reg-heading" className="font-display text-2xl font-light m-0 text-gold-light group-hover:text-gold transition-colors duration-500">
                                    Registration
                                </h2>
                            </div>
                        </div>
                        <p className="text-[0.95rem] leading-[1.8] mb-8 flex-1 font-body text-cream/70 font-light">
                            If you are enrolling for the <strong className="text-cream font-medium">first time</strong>, click below
                            to set up your family information. You'll be able to enroll in classes during the registration process.
                        </p>
                        <Button
                            href="https://app.jackrabbitclass.com/regv2.asp?id=537819"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center"
                        >
                            Register Now
                        </Button>
                    </article>

                    {/* Existing families */}
                    <article className="reg-card relative p-8 md:p-10 border border-gold/10 bg-ink-soft/40 backdrop-blur-sm group hover:border-gold/30 transition-colors duration-500 flex flex-col" aria-labelledby="portal-heading">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gold/10 group-hover:bg-gold/20 transition-colors duration-500 border border-gold/10 relative">
                                <div className="absolute inset-0 bg-gold/20 rounded-full blur-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <LayoutDashboard size={20} className="text-gold relative z-10" aria-hidden="true" />
                            </div>
                            <div>
                                <span className="text-[10px] font-medium tracking-[0.25em] uppercase font-body block mb-1 text-gold/60">
                                    Existing Families
                                </span>
                                <h2 id="portal-heading" className="font-display text-2xl font-light m-0 text-gold-light group-hover:text-gold transition-colors duration-500">
                                    Parent Portal
                                </h2>
                            </div>
                        </div>
                        <p className="text-[0.95rem] leading-[1.8] mb-8 flex-1 font-body text-cream/70 font-light">
                            If you have <strong className="text-cream font-medium">previously registered</strong>, log in to the
                            Parent Portal to edit contact info, view invoices, payment history, and register for new classes.
                        </p>
                        <Button
                            href="https://app.jackrabbitclass.com/jr3.0/ParentPortal/Login?orgID=537819"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="secondary"
                            className="w-full text-center"
                        >
                            Parent Portal Login
                        </Button>
                    </article>
                </div>

                <div className="section-divider my-8" />

                {/* Notes */}
                <div className="reg-card relative p-8 md:p-10 border border-gold/10 bg-ink-soft/20 group hover:border-gold/20 transition-colors duration-500 relative z-10">
                    <h3 className="font-display text-2xl font-light mb-6 text-gold-light group-hover:text-gold transition-colors duration-500">
                        Enrollment Notes
                    </h3>
                    <ul className="list-none m-0 p-0 space-y-4" role="list">
                        {[
                            'Class beginning and ending dates represent our entire Dance Year Session — you will be enrolled and charged monthly.',
                            'Those enrolling after the 1st class of the month will have fees pro-rated for the first month only.',
                            'If you have any questions or concerns, please do not hesitate to contact us.',
                        ].map((note, i) => (
                            <li key={i} className="flex items-start gap-4">
                                <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold/60 transition-colors duration-500" aria-hidden="true" />
                                <span className="text-[0.95rem] leading-[1.6] font-body text-cream/70 font-light">
                                    {note}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    )
}
