import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMeta } from '../hooks/useMeta.js'
import { UserPlus, LayoutDashboard, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Registration() {
    useMeta({
        title: 'Registration & Parent Portal | Avoca Irish Dance Academy',
        description: 'Register for Irish dance classes at Avoca Irish Dance Academy or log in to the Parent Portal to manage classes, payments, and more.',
        path: '/registration',
    })

    const contentRef = useRef(null)

    useEffect(() => {
        gsap.set('.reg-card', { opacity: 1, y: 0 })
        const ctx = gsap.context(() => {
            gsap.fromTo('.reg-card',
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0,
                    duration: 0.7,
                    stagger: 0.2,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: contentRef.current, start: 'top 75%' },
                }
            )
        }, contentRef)
        return () => ctx.revert()
    }, [])

    return (
        <div style={{ background: 'var(--color-bg)' }}>
            <div className="page-banner">
                <h1>Registration & Parent Portal</h1>
                <p>New families and returning families — start here.</p>
            </div>

            <section ref={contentRef} className="section-pad max-w-4xl mx-auto" aria-label="Registration options">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    {/* New families */}
                    <article className="reg-card card p-8 flex flex-col" aria-labelledby="new-reg-heading">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ background: 'rgba(201,168,76,0.15)' }}>
                                <UserPlus size={22} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                            </div>
                            <div>
                                <span className="text-xs font-semibold tracking-widest uppercase font-body block mb-0.5"
                                    style={{ color: 'var(--color-accent)' }}>New Students</span>
                                <h2 id="new-reg-heading" className="font-display text-2xl font-light m-0"
                                    style={{ color: 'var(--color-accent)' }}>
                                    Registration
                                </h2>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed mb-6 flex-1 font-body" style={{ color: 'var(--color-text-muted)' }}>
                            If you are enrolling for the <strong style={{ color: 'var(--color-text)' }}>first time</strong>, click below
                            to set up your family information. You'll be able to enroll in classes during the registration process.
                        </p>
                        <a
                            href="https://app.jackrabbitclass.com/regv2.asp?id=537819"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary justify-center text-center"
                            aria-label="Register your family for the first time at Avoca Irish Dance"
                        >
                            Register Now
                            <ChevronRight size={16} aria-hidden="true" />
                        </a>
                    </article>

                    {/* Existing families */}
                    <article className="reg-card card p-8 flex flex-col" aria-labelledby="portal-heading">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ background: 'rgba(201,168,76,0.15)' }}>
                                <LayoutDashboard size={22} style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                            </div>
                            <div>
                                <span className="text-xs font-semibold tracking-widest uppercase font-body block mb-0.5"
                                    style={{ color: 'var(--color-accent)' }}>Existing Families</span>
                                <h2 id="portal-heading" className="font-display text-2xl font-light m-0"
                                    style={{ color: 'var(--color-accent)' }}>
                                    Parent Portal
                                </h2>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed mb-6 flex-1 font-body" style={{ color: 'var(--color-text-muted)' }}>
                            If you have <strong style={{ color: 'var(--color-text)' }}>previously registered</strong>, log in to the
                            Parent Portal to edit contact info, view invoices, payment history, and register for new classes.
                        </p>
                        <a
                            href="https://app.jackrabbitclass.com/jr3.0/ParentPortal/Login?orgID=537819"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline justify-center text-center"
                            aria-label="Log in to the Avoca Irish Dance parent portal"
                        >
                            Parent Portal Login
                            <ChevronRight size={16} aria-hidden="true" />
                        </a>
                    </article>
                </div>

                {/* Notes */}
                <div className="card p-6" style={{ background: 'rgba(201,168,76,0.05)' }}>
                    <h3 className="font-display text-lg font-light mb-3" style={{ color: 'var(--color-accent)' }}>
                        Enrollment Notes
                    </h3>
                    <ul className="list-none m-0 p-0 space-y-2" role="list">
                        {[
                            'Class beginning and ending dates represent our entire Dance Year Session — you will be enrolled and charged monthly.',
                            'Those enrolling after the 1st class of the month will have fees pro-rated for the first month only.',
                            'If you have any questions or concerns, please do not hesitate to contact us.',
                        ].map((note, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <ChevronRight size={14} className="mt-0.5 flex-shrink-0"
                                    style={{ color: 'var(--color-accent)' }} aria-hidden="true" />
                                <span className="text-sm leading-relaxed font-body" style={{ color: 'var(--color-text-muted)' }}>
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
