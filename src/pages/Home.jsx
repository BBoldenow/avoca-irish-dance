import { useMeta } from '../hooks/useMeta.js'
import Hero from '../components/Hero.jsx'
import WhyDance from '../components/WhyDance.jsx'
import SisterSchools from '../components/SisterSchools.jsx'
import LocationCTA from '../components/LocationCTA.jsx'
import BrandDivider from '../components/BrandDivider.jsx'

export default function Home() {
    useMeta({
        title: 'Avoca Irish Dance Academy | Longmont, Colorado',
        description: 'Avoca Irish Dance Academy — competitive Irish dance school in Longmont, CO. World-class instruction for all ages and levels. Try a free class today!',
        path: '/',
    })

    return (
        <main className="bg-ink min-h-screen" id="main-content">
            <Hero />
            <WhyDance />

            <div className="section-divider" />

            <div>
                <SisterSchools />
            </div>

            <LocationCTA />
        </main>
    )
}
