import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingShell from '@/src/components/marketing/MarketingShell'
import JsonLd from '@/src/components/marketing/JsonLd'
import { brand, siteUrl, githubUrl } from '@/src/content/site'

export const metadata: Metadata = {
  title: "Cas d'usage — Kanban open source pour chaque équipe",
  description:
    "Startups, équipes produit, agences, marketing : découvrez comment chaque équipe utilise Flowboro, le kanban open source et auto-hébergeable de gestion de sprint.",
  keywords: [
    'logiciel kanban open source',
    'kanban auto-hébergé',
    'gestion de projet agile',
    'tableau de tâches pour équipe',
    'outil de gestion de sprint open source',
  ],
  alternates: { canonical: '/use-cases' },
}

const cases = [
  {
    h: 'Startups',
    p: 'Avancez vite avec des sprints courts et un tableau clair. Flowboro garde votre petite équipe alignée sans la lourdeur ni le coût d’une grosse suite logicielle.',
    points: ['Sprints hebdomadaires', 'Backlog priorisé', 'Gratuit et open source'],
  },
  {
    h: 'Équipes produit',
    p: 'Reliez le backlog produit aux sprints de développement. Chaque cycle a son objectif, ses tâches et son équipe.',
    points: ['Roadmap par sprint', 'Étapes personnalisées', 'Suivi en temps réel'],
  },
  {
    h: 'Équipes tech',
    p: 'Auto-hébergez Flowboro à côté de vos autres outils, adaptez le code à vos process et gardez vos données sur votre infrastructure.',
    points: ['Auto-hébergement', 'Code modifiable', 'Vos données chez vous'],
  },
  {
    h: 'Agences',
    p: 'Gérez plusieurs projets clients avec des tableaux séparés. Une vue kanban par mission, des sprints pour rythmer les livrables.',
    points: ['Un tableau par client', 'Membres assignés', 'Livraisons cadencées'],
  },
]

const UseCases = () => {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: "Cas d'usage",
        item: `${siteUrl}/use-cases`,
      },
    ],
  }

  return (
    <MarketingShell>
      <JsonLd data={breadcrumb} />
      <section className="w-[92vw] max-w-4xl mx-auto text-center mt-16 sm:mt-24">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
          Un kanban open source pour chaque équipe
        </h1>
        <p className="mt-5 text-lg text-white/65 max-w-2xl mx-auto">
          {brand.name} s’adapte à la façon dont votre équipe travaille. Voici
          comment différentes équipes l’utilisent au quotidien.
        </p>
      </section>

      <section className="w-[92vw] max-w-5xl mx-auto mt-16 grid gap-6 sm:grid-cols-2">
        {cases.map((c) => (
          <div key={c.h} className="glass-card rounded-2xl p-7">
            <h2 className="text-xl font-semibold text-white">{c.h}</h2>
            <p className="mt-3 text-sm text-white/60">{c.p}</p>
            <ul className="mt-4 space-y-1.5">
              {c.points.map((pt) => (
                <li key={pt} className="text-sm text-white/55 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" aria-hidden />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="w-[92vw] max-w-3xl mx-auto mt-24 text-center">
        <div className="glass-strong rounded-3xl p-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">
            Votre équipe mérite un flux plus clair
          </h2>
          <p className="mt-4 text-white/65">{brand.tagline}</p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login"
              className="btn-violet btn-violet-lg sm:w-auto sm:px-10 inline-flex"
            >
              Commencer gratuitement
            </Link>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass px-8 py-3.5 text-[0.95rem] inline-flex items-center justify-center"
            >
              Voir sur GitHub
            </a>
          </div>
        </div>
      </section>
    </MarketingShell>
  )
}

export default UseCases
