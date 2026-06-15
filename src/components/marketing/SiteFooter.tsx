import Link from 'next/link'
import { brand, githubUrl } from '@/src/content/site'

const columns = [
  {
    title: 'Produit',
    links: [
      { href: '/features', label: 'Fonctionnalités' },
      { href: '/use-cases', label: "Cas d'usage" },
      { href: '/login', label: 'Connexion' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Comparatifs',
    links: [
      { href: '/blog/alternative-outil-kanban', label: 'Alternative aux outils kanban' },
      { href: '/blog/kanban-vs-scrum', label: 'Kanban ou Scrum' },
      { href: '/blog/choisir-outil-gestion-sprint', label: 'Choisir un outil de sprint' },
    ],
  },
]

const SiteFooter = () => {
  return (
    <footer className="w-[95vw] max-w-6xl mx-auto mt-24 mb-10">
      <div className="glass rounded-2xl px-6 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="text-lg font-semibold text-white">{brand.name}</p>
            <p className="mt-3 text-sm text-white/55 max-w-xs">{brand.tagline}</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-white/80">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {col.title === 'Ressources' && (
                  <li>
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/55 hover:text-white transition-colors"
                    >
                      GitHub
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="glass-divider my-8" />
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} {brand.name}. Kanban open source, gratuit et
          auto-hébergeable pour équipes agiles.
        </p>
      </div>
    </footer>
  )
}

export default SiteFooter
