import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Clés des espèces marines',
        short_name: 'Espèces marines',
        description: 'Application interactive des espèces marines',
        theme_color: '#0077cc',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '.',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
    })
  ],
  server: {
    host: '0.0.0.0',           // écoute sur toutes les interfaces réseau
    port: 5173,                // ton port habituel
    strictPort: true,
    allowedHosts: ['clesmarines.loca.lt'], // ⚠️ IMPORTANT : au niveau Vite, pas PWA
  },
})
