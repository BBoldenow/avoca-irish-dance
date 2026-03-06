import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMeta } from '../hooks/useMeta.js'
import { X } from 'lucide-react'
import gallery1 from '../assets/images/gallery-1.png'
import gallery2 from '../assets/images/gallery-2.png'
import SectionLabel from '../components/ui/SectionLabel.jsx'

gsap.registerPlugin(ScrollTrigger)

// Placeholder gallery items using gradient-based image placeholders
const galleryItems = [
    { id: 1, title: 'Competition Performance', aspect: 'tall', image: gallery1 },
    { id: 2, title: 'Team Dance', aspect: 'wide', image: gallery2 },
    { id: 3, title: 'World Championships', aspect: 'square' },
    { id: 4, title: 'Feis Competition', aspect: 'tall' },
    { id: 5, title: 'Studio Practice', aspect: 'wide' },
    { id: 6, title: 'Award Ceremony', aspect: 'square' },
    { id: 7, title: 'Team Performance', aspect: 'tall' },
    { id: 8, title: 'Solo Dance', aspect: 'square' },
]

const gradients = [
    'linear-gradient(135deg, #0A0A08 0%, #161612 100%)',
    'linear-gradient(135deg, #11110E 0%, #20201A 100%)',
    'linear-gradient(135deg, #0D0D0B 0%, #1A1A15 100%)',
    'linear-gradient(135deg, #141411 0%, #0A0A08 100%)',
]

function GalleryPlaceholder({ index, title, image }) {
    if (image) {
        return <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    }
    return (
        <div
            className="w-full h-full flex flex-col items-center justify-center p-4 text-center transition-transform duration-700 group-hover:scale-105"
            style={{ background: gradients[index % gradients.length] }}
            aria-label={title}
        >
            <span className="text-4xl mb-4 opacity-50 drop-shadow-lg" aria-hidden="true">🪘</span>
            <span className="text-[10px] font-body font-medium uppercase tracking-[0.2em] text-cream/40">
                {title}
            </span>
        </div>
    )
}

export default function Gallery() {
    useMeta({
        title: 'Gallery | Avoca Irish Dance Academy',
        description: 'View photos from Avoca Irish Dance Academy competitions, performances, and studio life in Longmont, Colorado.',
        path: '/gallery',
    })

    const [lightbox, setLightbox] = useState(null)
    const gridRef = useRef(null)

    useEffect(() => {
        gsap.set('.gallery-item', { opacity: 1, scale: 1 })
        const ctx = gsap.context(() => {
            gsap.fromTo('.gallery-item',
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1, scale: 1,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
                }
            )
        }, gridRef)
        return () => ctx.revert()
    }, [])

    // Trap focus / close on Escape
    useEffect(() => {
        if (!lightbox) return
        const onKey = (e) => { if (e.key === 'Escape') setLightbox(null) }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [lightbox])

    return (
        <div className="bg-ink min-h-screen">
            <div className="bg-ink-soft border-b border-gold/10 pt-36 pb-20 px-6 text-center relative overflow-hidden">
                {/* Subtle radial glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-gold/5 blur-[100px] pointer-events-none" />

                <div className="relative z-10 gallery-item">
                    <SectionLabel className="mb-6">Moments</SectionLabel>
                    <h1 className="font-display text-5xl md:text-6xl text-gold mb-6 font-light">Gallery</h1>
                    <p className="font-body text-cream/60 max-w-xl mx-auto font-light leading-relaxed">
                        A glimpse into our dancers, competitions, and performances.
                    </p>
                </div>
            </div>

            <section ref={gridRef} className="section-padding max-w-7xl mx-auto" aria-label="Photo gallery">
                <div
                    className="grid gap-4"
                    style={{
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gridAutoRows: '250px',
                    }}
                >
                    {galleryItems.map((item, i) => (
                        <button
                            key={item.id}
                            className="group gallery-item overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold cursor-pointer relative"
                            style={{
                                gridRow: item.aspect === 'tall' ? 'span 2' : item.aspect === 'wide' ? 'span 1' : 'span 1',
                            }}
                            onClick={() => setLightbox(item)}
                            aria-label={`View photo: ${item.title}`}
                        >
                            <div className="absolute inset-0 border border-gold/15 bg-ink-soft/40 backdrop-blur-sm group-hover:border-gold/30 transition-colors duration-500 z-10 pointer-events-none" />
                            <GalleryPlaceholder index={i} title={item.title} image={item.image} />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-ink/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
                                <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-gold font-body border border-gold/30 px-6 py-2.5 bg-ink-soft/50 backdrop-blur-sm">
                                    View Image
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-20 pt-10 border-t border-gold/10 text-center relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                    <p className="text-sm font-body font-light text-cream/60">
                        Photos coming soon! Contact us to share your Avoca dance memories.
                    </p>
                </div>
            </section>

            {/* Lightbox */}
            {lightbox && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Photo: ${lightbox.title}`}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12"
                    style={{ background: 'rgba(10,10,8,0.95)', backdropFilter: 'blur(10px)' }}
                    onClick={() => setLightbox(null)}
                >
                    <div
                        className="relative max-w-5xl w-full h-full max-h-[85vh] overflow-hidden border border-gold/20 flex flex-col bg-ink"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex-1 relative bg-black/50 overflow-hidden flex items-center justify-center">
                            <GalleryPlaceholder
                                index={galleryItems.findIndex(g => g.id === lightbox.id)}
                                title={lightbox.title}
                                image={lightbox.image}
                            />
                        </div>

                        <div className="bg-ink-soft border-t border-gold/15 flex items-center justify-between px-6 py-4">
                            <p className="text-[11px] uppercase tracking-[0.2em] font-medium font-body text-cream">
                                {lightbox.title}
                            </p>
                            <button
                                onClick={() => setLightbox(null)}
                                className="flex items-center gap-2 text-cream/50 hover:text-gold transition-colors duration-300"
                                aria-label="Close photo viewer"
                            >
                                <span className="text-[10px] uppercase tracking-[0.1em] font-medium font-body hidden sm:inline-block">Close</span>
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
