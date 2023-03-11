import { searchForWorkspaceRoot } from 'vite'

export default defineNuxtConfig({
  // Enable content to leverages <ContentRendererMarkdown /> component
  modules: ['nuxt-icon', '@nuxtjs/tailwindcss'],
  vite: {
    server: {
      fs: {
        allow: [
          // search up for workspace root
          '../..'
        ],
      },
    },
  },
  // Define storage used in API routes with useStorage()
  nitro: {
    storage: {
      notes: {
        driver: 'cloudflare-kv-binding',
        binding: 'NOTES'
      }
    },
    // Overwrite notes storage in development using FS
    devStorage: {
      notes: {
        driver: 'fs',
        base: './.data/notes'
      }
    }
  },
  // Password to edit the notes
  runtimeConfig: {
    password: process.env.NUXT_PASSWORD || 'nuxt'
  },
})
