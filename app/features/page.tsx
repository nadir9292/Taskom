import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingShell from '@/src/components/marketing/MarketingShell'
import JsonLd from '@/src/components/marketing/JsonLd'
import { brand, siteUrl, githubUrl } from '@/src/content/site'

export const metadata: Metadata = {
  title: 'Fonctionnalités — Kanban open source, sprints et backlog',
  description:
    "Découvrez les fonctionnalités de Flowboro : tableaux kanban en ligne, gestion de sprint, product backlog et collaboration d'équipe. Le kanban open source, gratuit et auto-hébergeable pour équipes agiles.",
  keywords: [
    'fonctionnalités logiciel kanban open source',
    'gestion de sprint',
    'tableau kanban en ligne',
    'kanban auto-hébergé',
    'product backlog',
    'collaboration équipe agile',
  ],
  alternates: { canonical: '/features' },
}

const groups = [
  {
    title: 'Tableaux kanban',
    items: [
      {
        h: 'Colonnes et étapes personnalisées',
        p: 'Structurez votre flux avec les étapes qui correspondent à votre équipe : à faire, en cours, en revue, terminé.',
      },
      {
        h: 'Cartes claires et lisibles',
        p: 'Chaque tâche devient une carte que l’on déplace au fil de sa progression. Le tableau reste lisible, même chargé.',
      },
      {
        h: 'Vue centrée sur le sprint',
        p: 'Affichez uniquement le sprint en cours pour garder le focus, sans noyer l’équipe sous les tâches futures.',
      },
    ],
  },
  {
    title: 'Gestion de sprint',
    items: [
      {
        h: 'Planification rapide',
        p: 'Sélectionnez les tâches du backlog, fixez un objectif et lancez votre sprint en quelques clics.',
      },
      {
        h: 'Membres assignés',
        p: 'Assignez les bonnes personnes à chaque sprint pour que chacun sache exactement sur quoi avancer.',
      },
      {
        h: 'Clôture et reprise',
        p: 'Terminez un sprint et enchaînez sur le suivant sans repartir de zéro.',
      },
    ],
  },
  {
    title: 'Backlog et collaboration',
    items: [
      {
        h: 'Product backlog organisé',
        p: 'Rassemblez idées et priorités dans un backlog propre, prêt à alimenter vos prochains sprints.',
      },
      {
        h: 'Équipe synchronisée',
        p: 'Tout le monde voit les mêmes informations en temps réel. Moins de réunions de statut, plus d’action.',
      },
      {
        h: 'Mobile et bureau',
        p: 'Une expérience fluide sur téléphone comme sur ordinateur, pour piloter vos sprints partout.',
      },
    ],
  },
  {
    title: 'Open source et contrôle',
    items: [
      {
        h: 'Code ouvert et auditable',
        p: 'Tout le code est public sur GitHub sous licence libre. Lisez-le, modifiez-le et adaptez-le à vos besoins.',
      },
      {
        h: 'Auto-hébergement',
        p: 'Déployez Flowboro sur votre infrastructure et gardez vos données entièrement chez vous.',
      },
      {
        h: 'Sans vendor lock-in',
        p: 'Pas de format propriétaire ni d’abonnement obligatoire. Vous restez libre de partir avec vos données à tout moment.',
      },
    ],
  },
]

const Features = () => {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Fonctionnalités',
        item: `${siteUrl}/features`,
      },
    ],
  }

  return (
    <MarketingShell>
      <JsonLd data={breadcrumb} />
      <section className="w-[92vw] max-w-4xl mx-auto text-center mt-16 sm:mt-24">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
          Les fonctionnalités de {brand.name}
        </h1>
        <p className="mt-5 text-lg text-white/65 max-w-2xl mx-auto">
          Un kanban open source qui combine tableaux visuels, gestion de sprint et
          backlog dans une interface fluide — gratuit et auto-hébergeable.
        </p>
      </section>

      {groups.map((group) => (
        <section key={group.title} className="w-[92vw] max-w-5xl mx-auto mt-20">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">
            {group.title}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {group.items.map((item) => (
              <div key={item.h} className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white">{item.h}</h3>
                <p className="mt-2 text-sm text-white/60">{item.p}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="w-[92vw] max-w-3xl mx-auto mt-24 text-center">
        <div className="glass-strong rounded-3xl p-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">
            Testez {brand.name} avec votre équipe
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

export default Features
