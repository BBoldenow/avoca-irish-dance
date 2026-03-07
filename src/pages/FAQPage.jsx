import { useRef, useLayoutEffect, useState } from 'react'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import DiamondDivider from '../components/ui/DiamondDivider.jsx'
import { useMeta } from '../hooks/useMeta.js'
import gsap from 'gsap'
import { Plus, Minus } from 'lucide-react'

const FAQ_ITEMS = [
    {
        category: 'Getting Started',
        question: 'Do I need any dance experience to start?',
        answer: 'Not at all — and we mean that. Beginners are warmly welcome at every age. Introduction classes are built from the very ground up, so you\'ll never feel lost or behind. You don\'t need to know a reel from a jig. You just need to show up.'
    },
    {
        category: 'Getting Started',
        question: 'What age can kids start?',
        answer: 'Classes are open from age 4. Little ones begin with basic movement, rhythm, and footwork in a fun, game-based environment — think tippy toes, clapping games, and lots of giggling. The goal at this stage isn\'t perfection; it\'s building a love of music and movement that lasts.'
    },
    {
        category: 'Getting Started',
        question: 'Can adults learn Irish dance?',
        answer: 'Absolutely — and honestly, adult beginners often surprise themselves. Adults bring focus, commitment, and genuine curiosity that makes them wonderful students. Whether you\'re dancing for fitness, cultural connection, or simply because you\'ve always wanted to try, there\'s a place for you here.'
    },
    {
        category: 'Terminology',
        question: 'How do I pronounce "Feis"?',
        answer: 'A "Feis" (pronounced "fesh") is a traditional Irish dance competition, organized by age and level. The plural is "Feiseanna" (pronounced "fesh-ANA"). They range from small local events to large major championships.'
    },
    {
        category: 'Terminology',
        question: 'What is an "Oireachtas"?',
        answer: 'The "Oireachtas" (pronounced "o-RECK-tus") refers to a regional or national championship. At Avoca, we prepare our dancers for these milestones with dedicated coaching and conditioning.'
    },
    {
        category: 'Terminology',
        question: 'What are "Ghillies"?',
        answer: 'Soft shoes — called ghillies (pronounced "GILL-eez") for girls and reel shoes for boys — are lightweight leather shoes, a bit like a ballet flat. They\'re used for dances like reels and jigs, and they make soft, quiet sounds.'
    },
    {
        category: 'Shoes & Gear',
        question: 'What\'s the difference between soft shoes and hard shoes?',
        answer: 'Soft shoes (ghillies) are flexible, leather slippers used for athletic heights and graceful movements. Hard shoes have fiberglass tips and heels that create a loud, rhythmic percussion — think tap shoes, but with a very different technique. All beginners start in soft shoes; hard shoes come later as your footwork develops.'
    },
    {
        category: 'Shoes & Gear',
        question: 'Do I need to buy shoes right away?',
        answer: 'No — hold off for the first few classes. Give yourself (or your child) a chance to fall in love with it first. When the time comes, we\'ll point you in the right direction for where to buy and what to look for.'
    },
    {
        category: 'Progression',
        question: 'How do dancers move up levels?',
        answer: 'Advancement in Irish dance is based on official CLRG rules. Dancers progress through levels — Beginner, Advanced Beginner, Novice, Prizewinner, Preliminary Championship, and Open Championship — by placing in competitions. Susannah tracks each dancer\'s individual progress through their "grades" and will let you know when they are ready for the next level.'
    },
    {
        category: 'History',
        question: 'Why do Irish dancers hold their arms down?',
        answer: (
            <div className="space-y-4">
                <p>It\'s one of the first things people notice — and one of the most beautiful things about the art form. There are a few reasons for this unique style:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>The "Dancing Through the Window" Story:</strong> Legend says that during British rule, when Irish culture was suppressed, dancers performed near windows; keeping their arms still made them look less like they were dancing to passing authorities.</li>
                    <li><strong>Traveling Dance Masters:</strong> In the 18th century, competing dance masters developed a rigid, upright carriage as a marker of refinement and serious training.</li>
                    <li><strong>Solo vs. Ceili:</strong> While social "Ceili" dancing uses arms freely, solo step dancing evolved to focus all artistry below the waist, creating a visual tension that makes intricate footwork even more impressive by contrast.</li>
                </ul>
            </div>
        )
    },
    {
        category: 'Health',
        question: 'Is Irish dance a good workout?',
        answer: 'It really is — and people are often caught off guard by just how much it demands. Irish dance builds cardiovascular fitness, leg strength, balance, and coordination. Championship-level dancers are serious athletes.'
    },
    {
        category: 'Contact',
        question: 'How do I get started?',
        answer: 'Just reach out to Susannah — a call or an email is all it takes. She\'ll talk with you about your goals and find the right class. No audition, no prior experience required. Just come and give it a try.'
    }
]

function FAQItem({ item, isOpen, onClick }) {
    return (
        <div className="faq-item border-b border-gold/10 overflow-hidden">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left group"
                aria-expanded={isOpen}
            >
                <div>
                    <span className="block font-body text-[10px] uppercase tracking-[0.2em] text-gold/50 mb-1">{item.category}</span>
                    <h3 className="font-display text-xl md:text-2xl font-light text-cream group-hover:text-gold-light transition-colors duration-300">
                        {item.question}
                    </h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                    {isOpen ? <Minus size={20} className="text-gold" /> : <Plus size={20} className="text-gold/50 group-hover:text-gold transition-colors duration-300" />}
                </div>
            </button>
            <div
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-8' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <div className="font-body text-cream/60 leading-relaxed font-light text-sm md:text-base max-w-2xl">
                        {item.answer}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function FAQPage() {
    const sectionRef = useRef(null)
    const [openIndex, setOpenIndex] = useState(0)

    useMeta({
        title: 'FAQ | Avoca Irish Dance Academy',
        description: 'Explore common questions about classes, terminology, and our philosophy at Avoca Irish Dance Academy in Longmont, CO.',
        path: '/faq'
    })

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
        const ctx = gsap.context(() => {
            gsap.fromTo('.faq-elem',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <div ref={sectionRef} className="pt-20 bg-ink min-h-screen">
            {/* Header */}
            <div className="section-padding-min border-b border-gold/10 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <SectionLabel className="faq-elem mb-4">Questions & Answers</SectionLabel>
                    <h1 className="faq-elem font-display text-5xl md:text-6xl font-light text-cream leading-tight">
                        Common <span className="italic text-gold-light">Questions</span>
                    </h1>
                    <DiamondDivider className="faq-elem mt-8" />
                    <p className="faq-elem font-body text-cream/60 text-sm md:text-base leading-relaxed font-light mt-6 mx-auto max-w-2xl">
                        Find answers to common questions about starting your journey with Avoca Irish Dance Academy.
                    </p>
                </div>
            </div>

            {/* FAQ List */}
            <div className="section-padding">
                <div className="max-w-3xl mx-auto">
                    <div className="faq-elem">
                        {FAQ_ITEMS.map((item, index) => (
                            <FAQItem
                                key={index}
                                item={item}
                                isOpen={openIndex === index}
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Still have questions? */}
            <div className="section-padding border-t border-gold/10 bg-black-mid/30">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="faq-elem font-display text-3xl font-light text-cream mb-6">Still Have Questions?</h2>
                    <p className="faq-elem font-body text-cream/60 leading-relaxed font-light mb-8 max-w-xl mx-auto">
                        We\'re here to help! If you have a question that isn\'t covered here, please reach out.
                    </p>
                    <div className="faq-elem">
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-4 border border-gold/30 text-gold text-[10px] uppercase tracking-[0.3em] hover:bg-gold/5 hover:border-gold transition-all duration-300"
                        >
                            Get In Touch
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
