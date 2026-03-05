import { useEffect } from 'react'

export function useMeta({ title, description, path, siteUrl = 'https://www.avocairishdance.com' }) {
    useEffect(() => {
        document.title = title

        let metaDesc = document.querySelector('meta[name="description"]')
        if (!metaDesc) {
            metaDesc = document.createElement('meta')
            metaDesc.setAttribute('name', 'description')
            document.head.appendChild(metaDesc)
        }
        metaDesc.setAttribute('content', description)

        let canonical = document.querySelector('link[rel="canonical"]')
        if (!canonical) {
            canonical = document.createElement('link')
            canonical.setAttribute('rel', 'canonical')
            document.head.appendChild(canonical)
        }
        canonical.setAttribute('href', `${siteUrl}${path}`)
    }, [title, description, path, siteUrl])
}
