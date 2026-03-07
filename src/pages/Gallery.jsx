import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import DiamondDivider from '../components/ui/DiamondDivider.jsx'
import { useMeta } from '../hooks/useMeta.js'
import { useGoogleDriveFolder } from '../hooks/useGoogleDriveFolder.js'

import { MasonryPhotoAlbum } from "react-photo-album"
import "react-photo-album/masonry.css"
import Lightbox from "yet-another-react-lightbox"
import Video from "yet-another-react-lightbox/plugins/video"
import "yet-another-react-lightbox/styles.css"

export default function Gallery() {
    const sectionRef = useRef(null)
    const [index, setIndex] = useState(-1)

    useMeta({
        title: 'Gallery | Avoca Irish Dance Academy',
        description: 'View photos from Avoca Irish Dance Academy competitions, performances, and studio life in Longmont, Colorado.',
        path: '/gallery',
    })

    const folderId = import.meta.env.VITE_GOOGLE_DRIVE_GALLERY_FOLDER_ID
    const { files, loading, error } = useGoogleDriveFolder(folderId)

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
        const ctx = gsap.context(() => {
            gsap.fromTo('.loc-elem', { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.2 })
        }, sectionRef)
        return () => ctx.revert()
    }, [files])

    return (
        <div ref={sectionRef} className="bg-ink min-h-screen">
            {/* Header */}
            <header className="section-header-banner">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full bg-gold/5 blur-[100px] pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <SectionLabel className="loc-elem mb-4">Moments</SectionLabel>
                    <h1 className="loc-elem font-display text-4xl md:text-5xl lg:text-7xl font-light text-cream mb-6 leading-tight">
                        Visual <span className="italic text-gold-light">Gallery</span>
                    </h1>
                    <DiamondDivider className="loc-elem mt-8 mb-8" />
                    <p className="loc-elem font-body text-cream/60 max-w-xl mx-auto font-light leading-relaxed">
                        A glimpse into our dancers, competitions, and performances.
                    </p>
                </div>
            </header>

            {/* Masonry-style grid or Loading State */}
            <div className="section-padding min-h-[50vh]">
                {loading && (
                    <div className="flex flex-col items-center justify-center text-cream/50 py-20 loc-elem">
                        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="font-body text-sm tracking-wide uppercase">Connecting to Gallery...</p>
                    </div>
                )}

                {error && (
                    <div className="max-w-xl mx-auto text-center border border-red-900/50 bg-red-950/20 p-8 loc-elem">
                        <p className="font-body text-red-400 mb-2">Notice to Administrators:</p>
                        <p className="font-body text-cream/70 text-sm font-light">{error}</p>
                    </div>
                )}

                {!loading && !error && files.length === 0 && (
                    <div className="text-center py-20 loc-elem">
                        <p className="font-body text-cream/40 italic">Gallery folder is empty.</p>
                    </div>
                )}

                {!loading && !error && files.length > 0 && (
                    <div className="loc-elem max-w-[1400px] mx-auto photos-grid px-6 md:px-12">
                        <MasonryPhotoAlbum
                            photos={files.map(f => ({
                                src: f.thumbnailUrl,
                                width: f.width,
                                height: f.height,
                                alt: f.name,
                                key: f.id,
                                isVideo: f.isVideo,
                                originalUrl: f.originalUrl
                            }))}
                            spacing={8}
                            columns={(containerWidth) => {
                                if (containerWidth < 400) return 2
                                if (containerWidth < 768) return 3
                                if (containerWidth < 1024) return 4
                                return 5
                            }}
                            onClick={({ index: clickedIndex }) => setIndex(clickedIndex)}
                            componentsProps={{
                                wrapper: { className: "group relative overflow-hidden block cursor-pointer rounded-xl bg-ink-light" },
                                image: {
                                    className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out",
                                    referrerPolicy: "no-referrer"
                                }
                            }}
                            render={{
                                extras: (_, { photo }) => (
                                    <>
                                        {photo.isVideo && (
                                            <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-ink/50 backdrop-blur-sm flex items-center justify-center border border-white/20 pointer-events-none">
                                                <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-0.5" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-500 pointer-events-none" />
                                    </>
                                )
                            }}
                        />

                        <Lightbox
                            open={index >= 0}
                            index={index}
                            close={() => setIndex(-1)}
                            plugins={[Video]}
                            carousel={{
                                imageProps: {
                                    referrerPolicy: "no-referrer"
                                }
                            }}
                            slides={files.map(f => {
                                if (f.isVideo) {
                                    return {
                                        type: "video",
                                        sources: [
                                            {
                                                src: f.originalUrl.replace(/\/view.*$/, '/preview'),
                                                type: "video/mp4",
                                            }
                                        ],
                                        autoPlay: false,
                                        controls: true
                                    }
                                }
                                return {
                                    src: f.url,
                                    alt: f.name,
                                }
                            })}
                        />
                    </div>
                )}

                {/* Disclaimer */}
                <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gold/10 text-center relative loc-elem">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                    <p className="font-body text-cream/40 text-xs tracking-wide">
                        Contact us to inquire about studio photography.
                    </p>
                </div>
            </div>
        </div>
    )
}
