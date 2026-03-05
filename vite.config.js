// SITE CONFIG
// SITE_NAME: Avoca Irish Dance Academy
// REPO_NAME: avoca-irish-dance
// LIVE_URL: https://www.avocairishdance.com
// CUSTOM_DOMAIN: yes (base is always '/')

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
    plugins: [
        react(),
        ViteImageOptimizer({
            png: { quality: 80 },
            jpeg: { quality: 80 },
            webp: { quality: 80 },
            avif: { quality: 70 },
        })
    ],
    base: process.env.GITHUB_REPO_NAME ? `/${process.env.GITHUB_REPO_NAME}/` : '/',
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom'],
                    router: ['react-router-dom'],
                    gsap: ['gsap'],
                },
            },
        },
    },
})
