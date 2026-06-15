import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingShell from '@/src/components/marketing/MarketingShell'
import JsonLd from '@/src/components/marketing/JsonLd'
import { siteUrl } from '@/src/content/site'
import { posts } from '@/src/content/posts'

export const metadata: Metadata = {
  title: 'Blog — Kanban, sprints et gestion de projet agile',
  description:
    'Guides et conseils sur le kanban, les sprints et la gestion de projet agile : alternatives open source aux outils de tableaux, choix d’un outil de sprint et collaboration d’équipe.',
  keywords: [
    'blog gestion de projet agile',
    'kanban open source',
    'gestion de sprint',
    'logiciel kanban pour équipes',
  ],
  alternates: { canonical: '/blog' },
}

const Blog = () => {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${siteUrl}/blog/${p.slug}`,
      name: p.title,
    })),
  }

  return (
    <MarketingShell>
      <JsonLd data={itemList} />
      <section className="w-[92vw] max-w-4xl mx-auto text-center mt-16 sm:mt-24">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
          Le blog Flowboro
        </h1>
        <p className="mt-5 text-lg text-white/65 max-w-2xl mx-auto">
          Guides pratiques sur le kanban, les sprints et la gestion de projet
          agile pour aider votre équipe à livrer plus vite.
        </p>
      </section>

      <section className="w-[92vw] max-w-4xl mx-auto mt-14 grid gap-6 sm:grid-cols-2">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="glass-card rounded-2xl p-7 block"
          >
            <p className="text-xs text-white/40">{p.readingMinutes} min de lecture</p>
            <h2 className="mt-2 text-xl font-semibold text-white">{p.title}</h2>
            <p className="mt-3 text-sm text-white/60">{p.description}</p>
            <span className="mt-4 inline-block text-sm text-violet-300">
              Lire l’article →
            </span>
          </Link>
        ))}
      </section>
    </MarketingShell>
  )
}

export default Blog
