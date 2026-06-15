import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Flowboro — Kanban open source pour équipes',
    short_name: 'Flowboro',
    description:
      'Kanban open source, gratuit et auto-hébergeable : tableaux visuels, sprints et backlog pour vos projets agiles.',
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
