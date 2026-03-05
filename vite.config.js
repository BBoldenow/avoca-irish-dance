// SITE CONFIG
// SITE_NAME: Avoca Irish Dance Academy
// REPO_NAME: avoca-irish-dance
// LIVE_URL: https://www.avocairishdance.com
// CUSTOM_DOMAIN: yes (base is always '/')

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/',
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
