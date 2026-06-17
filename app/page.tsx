import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import MarketingShell from '@/src/components/marketing/MarketingShell'
import JsonLd from '@/src/components/marketing/JsonLd'
import { brand, siteUrl, keywords, githubUrl } from '@/src/content/site'

export const metadata: Metadata = {
  title:
    'Flowboro — Logiciel kanban open source pour équipes agiles',
  description: brand.description,
  keywords,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Flowboro — Logiciel kanban open source pour équipes agiles',
    description: brand.description,
    url: siteUrl,
    type: 'website',
  },
}

const features = [
  {
    title: 'Tableaux kanban clairs',
    body: "Visualisez chaque tâche en colonnes et faites avancer vos cartes d'un coup d'œil. Un tableau kanban en ligne qui reste lisible, même avec beaucoup de tâches.",
  },
  {
    title: 'Sprints intégrés',
    body: 'Planifiez, suivez et clôturez vos sprints sans bricolage. La cadence agile et la clarté du tableau réunies dans un seul outil de gestion de sprint.',
  },
  {
    title: 'Code 100% ouvert',
    body: 'Tout le code est public sur GitHub, sous licence libre. Auditez-le, modifiez-le, contribuez : aucune boîte noire, aucune surprise.',
  },
  {
    title: 'Auto-hébergeable',
    body: 'Déployez Flowboro sur votre propre serveur et gardez le contrôle total de vos données. Vos tableaux et vos sprints restent chez vous.',
  },
  {
    title: 'Gratuit, sans lock-in',
    body: 'Aucun abonnement, aucune fonctionnalité réservée à un plan payant. Vous n’êtes jamais prisonnier d’un fournisseur ni d’un format propriétaire.',
  },
  {
    title: 'Porté par la communauté',
    body: 'Feuille de route publique, contributions ouvertes et retours pris en compte. Flowboro évolue avec les équipes qui l’utilisent.',
  },
]

const steps = [
  {
    title: 'Créez votre tableau',
    body: 'Ajoutez vos colonnes et vos étapes en quelques clics, sans paramétrage complexe.',
  },
  {
    title: 'Planifiez un sprint',
    body: 'Choisissez les tâches du backlog, fixez un objectif et assignez votre équipe.',
  },
  {
    title: 'Avancez ensemble',
    body: 'Déplacez les cartes, suivez la progression et clôturez le sprint pour recommencer plus fort.',
  },
]

const faq = [
  {
    q: 'Flowboro est-il vraiment open source ?',
    a: "Oui. Tout le code de Flowboro est public sur GitHub sous licence libre. Vous pouvez le lire, le modifier, le déployer et contribuer sans aucune restriction.",
  },
  {
    q: 'Puis-je héberger Flowboro moi-même ?',
    a: "Oui. Flowboro est auto-hébergeable : déployez-le sur votre propre serveur pour garder un contrôle total de vos données, ou utilisez la version en ligne si vous préférez.",
  },
  {
    q: 'Flowboro est-il gratuit ?',
    a: "Oui. Flowboro est gratuit et open source, sans abonnement ni fonctionnalité bloquée derrière un plan payant. Aucun vendor lock-in.",
  },
]

const Hero = () => (
  <section className="w-[92vw] max-w-5xl mx-auto text-center mt-16 sm:mt-24 animate-fade-in-up">
    <span className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 text-xs text-white/70">
      Open source · Kanban + gestion de sprint
    </span>
    <h1 className="mt-6 text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-[1.1]">
      Le kanban open source
      <br className="hidden sm:block" /> pour équipes agiles
    </h1>
    <p className="mt-5 text-lg text-white/65 max-w-2xl mx-auto">
      {brand.name} réunit vos tableaux et vos sprints dans un seul flux. Gratuit,
      auto-hébergeable et entièrement transparent : un outil de gestion de projet
      que vous contrôlez vraiment.
    </p>
    <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
      <Link href="/login" className="btn-violet btn-violet-lg sm:w-auto sm:px-8">
        Commencer gratuitement
      </Link>
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-glass px-8 py-3.5 text-[0.95rem]"
      >
        Voir sur GitHub
      </a>
    </div>
    <p className="mt-4 text-xs text-white/35">{brand.tagline}</p>

    <div
      className="mt-14 glass-strong rounded-3xl p-3 sm:p-6 max-w-4xl mx-auto"
      role="img"
      aria-label="Aperçu d'un tableau kanban Flowboro avec des colonnes À faire, En cours et Terminé"
    >
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {[
          { name: 'À faire', cards: ['Maquette landing', 'API sprints', 'Onboarding'] },
          { name: 'En cours', cards: ['Tableau kanban', 'Invitations équipe'] },
          { name: 'Terminé', cards: ['Connexion', 'Backlog'] },
        ].map((col) => (
          <div key={col.name} className="glass-col rounded-xl sm:rounded-2xl p-2 sm:p-3 text-left">
            <p className="text-[9px] sm:text-xs font-medium text-white/55 mb-2 sm:mb-3 truncate">{col.name}</p>
            <div className="space-y-1.5 sm:space-y-2.5">
              {col.cards.map((c) => (
                <div
                  key={c}
                  className="glass-card rounded-lg sm:rounded-xl px-1.5 py-1 sm:px-3 sm:py-2.5 text-[9px] sm:text-[13px] text-white/80 leading-tight"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const Home = () => {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: brand.name,
    url: siteUrl,
    inLanguage: 'fr',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: brand.name,
    applicationCategory: 'ProjectManagementApplication',
    operatingSystem: 'Web',
    inLanguage: 'fr',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    url: siteUrl,
    description: brand.description,
  }

  return (
    <MarketingShell>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={softwareJsonLd} />

      <Hero />

      <section className="w-[92vw] max-w-5xl mx-auto mt-28">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center">
          Pourquoi choisir un kanban open source ?
        </h2>
        <p className="mt-4 text-white/60 text-center max-w-2xl mx-auto">
          Les outils propriétaires verrouillent vos données et votre budget.
          Flowboro repart de l’essentiel : un code ouvert, des données chez vous
          et une équipe alignée.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            {
              t: 'Transparent',
              b: 'Le code est public et auditable. Vous savez exactement ce que fait l’outil et où vont vos données, sans boîte noire.',
            },
            {
              t: 'Vos données chez vous',
              b: 'Auto-hébergez Flowboro et gardez la maîtrise complète de vos tableaux, vos sprints et vos informations d’équipe.',
            },
            {
              t: 'Sans coût caché',
              b: 'Gratuit, sans abonnement ni fonctionnalité réservée à un plan payant. Aucun vendor lock-in, jamais.',
            },
          ].map((card) => (
            <div key={card.t} className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white">{card.t}</h3>
              <p className="mt-2 text-sm text-white/60">{card.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-[92vw] max-w-5xl mx-auto mt-28">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center">
          Tout ce qu’un kanban open source doit offrir
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-white/60">{f.body}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/features" className="btn-glass px-6 py-3">
            Explorer toutes les fonctionnalités
          </Link>
        </div>
      </section>

      <section className="w-[92vw] max-w-5xl mx-auto mt-28">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center">
          Du backlog au sprint livré, en trois étapes
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="glass-card rounded-2xl p-6">
              <div className="text-violet-300 text-sm font-semibold">
                Étape {i + 1}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-[92vw] max-w-5xl mx-auto mt-28">
        <div className="glass rounded-3xl p-8 sm:p-12 grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              Conçu pour les équipes agiles
            </h2>
            <p className="mt-4 text-white/65">
              Startups, équipes produit, agences ou équipes marketing : Flowboro
              s’adapte à toutes les équipes qui travaillent par sprints et veulent
              un tableau de tâches clair, partagé et libre.
            </p>
            <Link href="/use-cases" className="btn-glass px-6 py-3 mt-6">
              Découvrir les cas d’usage
            </Link>
          </div>
          <div className="flex justify-center">
            <Image
              src="/icon-512x512.png"
              alt="Logo Flowboro, logiciel kanban et gestion de sprint pour équipes"
              width={160}
              height={160}
              className="rounded-3xl border border-white/10"
            />
          </div>
        </div>
      </section>

      <section className="w-[92vw] max-w-3xl mx-auto mt-28">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center">
          Questions fréquentes
        </h2>
        <div className="mt-8 space-y-4">
          {faq.map((item) => (
            <div key={item.q} className="glass-card rounded-2xl p-6">
              <h3 className="text-base font-semibold text-white">{item.q}</h3>
              <p className="mt-2 text-sm text-white/60">{item.a}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/faq" className="btn-glass px-6 py-3">
            Voir toutes les questions
          </Link>
        </div>
      </section>

      <section className="w-[92vw] max-w-3xl mx-auto mt-28 text-center">
        <div className="glass-strong rounded-3xl p-10 sm:p-14">
          <h2 className="text-3xl font-semibold text-white">
            Prêt à passer à un flux plus clair ?
          </h2>
          <p className="mt-4 text-white/65">
            Adoptez {brand.name} et donnez à votre équipe un kanban open source
            centré sur les sprints. {brand.tagline}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
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

export default Home
