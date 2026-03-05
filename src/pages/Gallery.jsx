import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMeta } from '../hooks/useMeta.js'
import { X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Placeholder gallery items using gradient-based image placeholders
const galleryItems = [
    { id: 1, title: 'Competition Performance', aspect: 'tall', image: '/images/gallery-1.png' },
    { id: 2, title: 'Team Dance', aspect: 'wide', image: '/images/gallery-2.png' },
    { id: 3, title: 'World Championships', aspect: 'square' },
    { id: 4, title: 'Feis Competition', aspect: 'tall' },
    { id: 5, title: 'Studio Practice', aspect: 'wide' },
    { id: 6, title: 'Award Ceremony', aspect: 'square' },
    { id: 7, title: 'Team Performance', aspect: 'tall' },
    { id: 8, title: 'Solo Dance', aspect: 'square' },
]

const gradients = [
    'linear-gradient(135deg, #1a3a2a 0%, #2d6a4f 50%, #1a3a2a 100%)',
    'linear-gradient(135deg, #2a1a0a 0%, #6a4a2d 50%, #2a1a0a 100%)',
    'linear-gradient(135deg, #0a1a2a 0%, #2d4f6a 50%, #0a1a2a 100%)',
    'linear-gradient(135deg, #1a2a0a 0%, #4f6a2d 50%, #1a2a0a 100%)',
    'linear-gradient(135deg, #2a0a1a 0%, #6a2d4f 50%, #2a0a1a 100%)',
    'linear-gradient(135deg, #0a2a1a 0%, #2d6a4f 50%, #0a2a1a 100%)',
    'linear-gradient(135deg, #1a1a2a 0%, #4f4a6a 50%, #1a1a2a 100%)',
    'linear-gradient(135deg, #2a1a1a 0%, #6a4a4a 50%, #2a1a1a 100%)',
]

function GalleryPlaceholder({ index, title, image }) {
    if (image) {
        return <img src={image} alt={title} className="w-full h-full object-cover" />
    }
    return (
        <div
            className="w-full h-full flex flex-col items-center justify-center p-4 text-center"
            style={{ background: gradients[index % gradients.length] }}
            aria-label={title}
        >
            <span className="text-4xl mb-2" aria-hidden="true">🪘</span>
            <span className="text-xs font-body font-medium" style={{ color: 'rgba(240,237,230,0.6)' }}>
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
        <div style={{ background: 'var(--color-bg)' }}>
            <div className="page-banner">
                <h1>Gallery</h1>
                <p>A glimpse into our dancers, competitions, and performances.</p>
            </div>

            <section ref={gridRef} className="section-pad max-w-6xl mx-auto" aria-label="Photo gallery">
                <div
                    className="grid gap-4"
                    style={{
                        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                        gridAutoRows: '200px',
                    }}
                >
                    {galleryItems.map((item, i) => (
                        <button
                            key={item.id}
                            className="gallery-item overflow-hidden rounded-xl transition-transform duration-300 hover:scale-105 focus-visible:outline-accent cursor-pointer"
                            style={{
                                gridRow: item.aspect === 'tall' ? 'span 2' : item.aspect === 'wide' ? 'span 1' : 'span 1',
                                background: 'var(--color-surface)',
                                border: '1px solid rgba(201,168,76,0.15)',
                            }}
                            onClick={() => setLightbox(item)}
                            aria-label={`View photo: ${item.title}`}
                        >
                            <GalleryPlaceholder index={i} title={item.title} image={item.image} />
                        </button>
                    ))}
                </div>

                <p className="text-center mt-8 text-sm font-body" style={{ color: 'var(--color-text-muted)' }}>
                    Photos coming soon! Contact us to share your Avoca dance memories.
                </p>
            </section>

            {/* Lightbox */}
            {lightbox && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Photo: ${lightbox.title}`}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ background: 'rgba(0,0,0,0.9)' }}
                    onClick={() => setLightbox(null)}
                >
                    <div
                        className="relative max-w-2xl w-full rounded-xl overflow-hidden"
                        style={{ height: 400, background: 'var(--color-surface)' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <GalleryPlaceholder
                            index={galleryItems.findIndex(g => g.id === lightbox.id)}
                            title={lightbox.title}
                            image={lightbox.image}
                        />
                        <button
                            onClick={() => setLightbox(null)}
                            className="absolute top-3 right-3 p-2 rounded-full"
                            style={{ background: 'rgba(0,0,0,0.5)', color: 'var(--color-text)' }}
                            aria-label="Close photo viewer"
                        >
                            <X size={18} />
                        </button>
                        <p
                            className="absolute bottom-0 left-0 right-0 px-4 py-3 text-sm font-body text-center"
                            style={{ background: 'rgba(0,0,0,0.6)', color: 'var(--color-text)' }}
                        >
                            {lightbox.title}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
