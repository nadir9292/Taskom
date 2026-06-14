import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Taskom — Gestion de projet Scrum',
    short_name: 'Taskom',
    description:
      'Outil de gestion de projet spécialisé Scrum : sprints, backlog, équipes et tableaux pour vos projets agiles.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    lang: 'fr',
    dir: 'ltr',
    categories: ['productivity', 'business', 'utilities'],
    background_color: '#06061a',
    theme_color: '#2b34e2',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
