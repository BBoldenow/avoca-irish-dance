import { useState, useEffect } from 'react'

const CACHE_KEY_PREFIX = 'avoca_drive_cache_v1_'
const CACHE_DURATION_MS = 1000 * 60 * 60 // 1 hour

export function useGoogleDriveFolder(folderId) {
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true

        const fetchFiles = async () => {
            if (!folderId) {
                if (isMounted) {
                    setError('No folder ID provided.')
                    setLoading(false)
                }
                return
            }

            const apiKey = import.meta.env.VITE_GOOGLE_API_KEY
            if (!apiKey || apiKey === 'YOUR_GOOGLE_CLOUD_API_KEY_HERE') {
                if (isMounted) {
                    setError('Google API Key is missing. Please add it to your .env file.')
                    setLoading(false)
                }
                return
            }

            // Check Cache
            const cacheKey = `${CACHE_KEY_PREFIX}${folderId}`
            const cachedData = localStorage.getItem(cacheKey)
            if (cachedData) {
                try {
                    const parsed = JSON.parse(cachedData)
                    if (Date.now() - parsed.timestamp < CACHE_DURATION_MS) {
                        if (isMounted) {
                            setFiles(parsed.files)
                            setLoading(false)
                        }
                        return
                    }
                } catch (e) {
                    console.warn('Failed to parse cached drive data:', e)
                }
            }

            try {
                // Fetch from Google Drive API v3
                const q = encodeURIComponent(`'${folderId}' in parents and mimeType != 'application/vnd.google-apps.folder' and trashed = false`)
                const fields = encodeURIComponent('files(id, name, mimeType, thumbnailLink, webContentLink, webViewLink, videoMediaMetadata, imageMediaMetadata)')
                const orderBy = encodeURIComponent('createdTime desc')
                const url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&orderBy=${orderBy}&key=${apiKey}`

                const response = await fetch(url)

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}))
                    throw new Error(errorData.error?.message || `HTTP error ${response.status}: Failed to fetch Drive contents`)
                }

                const data = await response.json()

                const processedFiles = (data.files || []).map(file => {
                    const isVideo = file.mimeType.startsWith('video/')

                    let fullUrl = file.webViewLink
                    let thumbnailUrl = file.webViewLink
                    let width = 1920
                    let height = 1080

                    if (!isVideo) {
                        if (file.thumbnailLink) {
                            fullUrl = file.thumbnailLink.replace(/=s\d+/, '=s2000')
                            thumbnailUrl = file.thumbnailLink.replace(/=s\d+/, '=s600')
                        }
                        if (file.imageMediaMetadata) {
                            width = file.imageMediaMetadata.width || 1920
                            height = file.imageMediaMetadata.height || 1080
                        }
                    } else if (file.videoMediaMetadata) {
                        width = file.videoMediaMetadata.width || 1920
                        height = file.videoMediaMetadata.height || 1080
                    }

                    return {
                        id: file.id,
                        name: file.name,
                        type: isVideo ? 'video' : 'image',
                        mimeType: file.mimeType,
                        url: fullUrl,
                        thumbnailUrl,
                        originalUrl: file.webViewLink,
                        isVideo,
                        width,
                        height
                    }
                })

                if (isMounted) {
                    setFiles(processedFiles)
                    setLoading(false)
                    localStorage.setItem(cacheKey, JSON.stringify({
                        timestamp: Date.now(),
                        files: processedFiles
                    }))
                }

            } catch (err) {
                console.error("Error fetching Google Drive folder:", err)
                if (isMounted) {
                    setError(err.message)
                    setLoading(false)
                }
            }
        }

        fetchFiles()

        return () => {
            isMounted = false
        }
    }, [folderId])

    return { files, loading, error }
}
