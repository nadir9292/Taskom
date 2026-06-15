import Link from 'next/link'
import type { Metadata } from 'next'
import MarketingShell from '@/src/components/marketing/MarketingShell'
import JsonLd from '@/src/components/marketing/JsonLd'
import { brand, siteUrl } from '@/src/content/site'

export const metadata: Metadata = {
  title: 'FAQ — Questions fréquentes sur Flowboro',
  description:
    'Toutes les réponses sur Flowboro : kanban open source, gratuit et auto-hébergeable, licence, gestion de sprint, prise en main et collaboration d’équipe.',
  keywords: [
    'faq logiciel kanban open source',
    'kanban auto-hébergé',
    'licence open source',
    'gestion de sprint',
    'outil scrum open source',
  ],
  alternates: { canonical: '/faq' },
}

const faq = [
  {
    q: 'Qu’est-ce que Flowboro ?',
    a: 'Flowboro est un kanban open source pour équipes qui combine tableaux visuels et sprints agiles. Gratuit, auto-hébergeable et transparent, il est pensé pour les équipes qui travaillent par cycles courts et veulent garder le contrôle de leur outil.',
  },
  {
    q: 'Flowboro est-il vraiment open source et gratuit ?',
    a: 'Oui. Tout le code de Flowboro est public sur GitHub sous licence libre, et l’application est gratuite : aucun abonnement, aucune fonctionnalité bloquée derrière un plan payant.',
  },
  {
    q: 'Puis-je héberger Flowboro sur mon propre serveur ?',
    a: 'Oui. Flowboro est auto-hébergeable : déployez-le sur votre infrastructure pour garder vos données entièrement chez vous, ou utilisez la version en ligne si vous préférez la simplicité.',
  },
  {
    q: 'Puis-je contribuer ou modifier le code ?',
    a: 'Absolument. Le dépôt est ouvert aux contributions : signalez des bugs, proposez des fonctionnalités ou adaptez le code à vos besoins. La feuille de route est publique.',
  },
  {
    q: 'Quelle est la différence entre kanban et sprint dans Flowboro ?',
    a: 'Le tableau kanban visualise le flux de travail en colonnes, tandis que le sprint définit un cycle court avec un objectif précis. Flowboro réunit les deux : vous gardez un tableau lisible et une cadence agile.',
  },
  {
    q: 'Faut-il une formation pour utiliser Flowboro ?',
    a: 'Non. L’interface est pensée pour une prise en main en quelques minutes. Vous créez un tableau, ajoutez vos étapes et lancez un sprint sans configuration complexe.',
  },
  {
    q: 'Flowboro fonctionne-t-il sur mobile ?',
    a: 'Oui. Flowboro offre une expérience fluide sur téléphone comme sur ordinateur, pour piloter vos tableaux et vos sprints où que vous soyez.',
  },
  {
    q: 'Puis-je inviter toute mon équipe ?',
    a: 'Oui. Vous créez une équipe, invitez vos membres et assignez les bonnes personnes à chaque sprint. Tout le monde voit les mêmes informations en temps réel.',
  },
  {
    q: 'Comment migrer depuis un autre outil de tableaux ?',
    a: 'La migration se fait souvent en une après-midi : recréez vos colonnes essentielles, repartez de votre sprint en cours et invitez votre équipe. Comme le code est ouvert, vous gardez aussi la liberté de partir avec vos données quand vous le souhaitez.',
  },
  {
    q: 'Pour quelles équipes Flowboro est-il adapté ?',
    a: 'Startups, équipes produit, équipes tech, agences : toute équipe qui travaille par sprints et veut un tableau de tâches clair, partagé et libre trouvera Flowboro adapté.',
  },
]

const Faq = () => {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${siteUrl}/faq` },
    ],
  }

  return (
    <MarketingShell>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumb} />
      <section className="w-[92vw] max-w-3xl mx-auto text-center mt-16 sm:mt-24">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
          Questions fréquentes
        </h1>
        <p className="mt-5 text-lg text-white/65">
          Tout ce qu’il faut savoir sur {brand.name}, votre kanban open source et
          outil de gestion de sprint.
        </p>
      </section>

      <section className="w-[92vw] max-w-3xl mx-auto mt-12 space-y-4">
        {faq.map((item) => (
          <div key={item.q} className="glass-card rounded-2xl p-6">
            <h2 className="text-base font-semibold text-white">{item.q}</h2>
            <p className="mt-2 text-sm text-white/60">{item.a}</p>
          </div>
        ))}
      </section>

      <section className="w-[92vw] max-w-3xl mx-auto mt-16 text-center">
        <Link
          href="/login"
          className="btn-violet btn-violet-lg sm:w-auto sm:px-10 inline-flex"
        >
          Essayer {brand.name} gratuitement
        </Link>
      </section>
    </MarketingShell>
  )
}

export default Faq
