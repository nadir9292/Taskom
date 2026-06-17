export const siteUrl = (
  process.env.NEXT_PUBLIC_APP_URL || 'https://flowboro.vercel.app'
).replace(/\/$/, '')

export const githubUrl = 'https://github.com/nadir9292/Taskom'

export const brand = {
  name: 'Flowboro',
  tagline: 'Le kanban open source — vos tableaux, vos sprints, votre code.',
  description:
    "Flowboro est le logiciel kanban open source qui réunit tableaux visuels et sprints agiles. Gratuit, auto-hébergeable et entièrement transparent : un outil de gestion de projet que vous contrôlez vraiment, sans vendor lock-in.",
  email: 'hello@flowboro.app',
}

export const keywords = [
  'Flowboro',
  'logiciel kanban open source',
  'kanban open source',
  'alternative open source à un outil de gestion par tableaux',
  'outil de gestion de projet open source',
  'logiciel kanban auto-hébergé',
  'gestion de sprint open source',
  'tableau kanban en ligne',
  'logiciel de gestion de projet agile',
  'outil scrum open source',
  'gestion de projet agile',
  'tableau de tâches pour équipe',
  'kanban board',
  'self-hosted kanban',
  'sprint planning',
  'product backlog',
  'team collaboration',
]

export const nav = [
  { href: '/features', label: 'Fonctionnalités' },
  { href: '/use-cases', label: "Cas d'usage" },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
]
