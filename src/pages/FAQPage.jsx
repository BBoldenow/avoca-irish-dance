import { useRef, useLayoutEffect, useState } from 'react'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import DiamondDivider from '../components/ui/DiamondDivider.jsx'
import { useMeta } from '../hooks/useMeta.js'
import gsap from 'gsap'
import { Plus, Minus } from 'lucide-react'

const FAQ_ITEMS = [
    {
        category: 'Terminology',
        question: 'How do I pronounce "Feis"?',
        answer: 'A "Feis" (pronounced "fesh") is a traditional Irish dance competition. The plural is "Feiseanna" (pronounced "fesh-ANA"). They range from small local events to large major championships.'
    },
    {
        category: 'Terminology',
        question: 'What is an "Oireachtas"?',
        answer: 'The "Oireachtas" (pronounced "o-RECK-tus") refers to a regional championship. At Avoca, we prepare our dancers for these milestones with dedicated coaching and conditioning.'
    },
    {
        category: 'Classes',
        question: 'What is the difference between Soft Shoes and Hard Shoes?',
        answer: 'Soft shoes (ghillies) are flexible, leather slippers used for athletic heights and graceful movements. Hard shoes are weighted with fiberglass tips to create the powerful rhythmic sounds synonymous with Irish dance.'
    },
    {
        category: 'Classes',
        question: 'Can I try a class for free?',
        answer: 'Absolutely! We offer a free trial class for all new students. It\'s the best way to experience our studio culture and see if Irish dance is the right fit for your family.'
    },
    {
        category: 'Philosophy',
        question: 'What does "Excellent Dancers, Excellent Humans" mean?',
        answer: 'At Avoca, we believe dance is a vehicle for character building. While we strive for technical excellence, we prioritize teaching generosity, respect, and perseverance. Our goal is to see our dancers succeed both on the stage and in life.'
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
                    <p className="font-body text-cream/60 leading-relaxed font-light text-sm md:text-base max-w-2xl">
                        {item.answer}
                    </p>
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
                        We're here to help! If you have a question that isn't covered here, please reach out.
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
