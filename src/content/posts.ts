export type PostSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export type Post = {
  slug: string
  title: string
  description: string
  date: string
  readingMinutes: number
  keywords: string[]
  intro: string[]
  sections: PostSection[]
}

export const posts: Post[] = [
  {
    slug: 'alternative-outil-kanban',
    title:
      "Alternative open source à un outil de gestion par tableaux : le guide 2026",
    description:
      "Vous cherchez une alternative open source à un outil de gestion de projet par tableaux kanban ? Voici les critères à comparer et pourquoi un kanban libre, gratuit et auto-hébergeable change tout pour votre équipe.",
    date: '2026-06-10',
    readingMinutes: 7,
    keywords: [
      'alternative open source à un outil de gestion par tableaux',
      'kanban open source',
      'logiciel kanban auto-hébergé',
      'outil de gestion de projet open source',
    ],
    intro: [
      "Les outils de gestion de projet par tableaux kanban ont popularisé une idée simple : visualiser le travail sous forme de colonnes et de cartes. Mais beaucoup d'équipes finissent par chercher une alternative, parce que ces outils propriétaires deviennent vite encombrés, coûteux et enferment vos données dans un format fermé.",
      "Si vous comparez les solutions du marché, ce guide vous donne les bons critères et vous montre ce qu'un kanban open source, libre et auto-hébergeable peut apporter à votre équipe.",
    ],
    sections: [
      {
        heading: 'Pourquoi chercher une alternative à votre outil de tableaux ?',
        paragraphs: [
          "La plupart des outils propriétaires de gestion de tâches par tableaux partagent les mêmes limites une fois que l'équipe grandit. Les tableaux se multiplient, les cartes s'accumulent, le prix grimpe et vos données restent prisonnières d'un format fermé.",
          "Les équipes qui migrent recherchent généralement trois choses : reprendre le contrôle de leurs données, un coût maîtrisé, et une vue claire du sprint actif sans formation.",
        ],
        bullets: [
          'Un prix qui grimpe dès que vous ajoutez des membres',
          'Des données enfermées dans un format propriétaire',
          'Une configuration trop longue avant de voir le premier tableau utile',
          'Aucune visibilité sur ce que fait réellement le code',
        ],
      },
      {
        heading: 'Les critères pour comparer une alternative open source',
        paragraphs: [
          "Avant de choisir une alternative, évaluez chaque outil sur des critères concrets plutôt que sur la longueur de la liste de fonctionnalités. Un bon kanban open source se juge à la liberté qu'il vous laisse et à la vitesse avec laquelle votre équipe l'adopte.",
        ],
        bullets: [
          'Licence : le code est-il ouvert, libre et auditable ?',
          'Auto-hébergement : pouvez-vous garder vos données sur votre infrastructure ?',
          'Coût : l’outil reste-t-il gratuit quand l’équipe grandit ?',
          'Gestion native des sprints : pouvez-vous planifier et clôturer un sprint sans bricolage ?',
          'Communauté : la feuille de route est-elle publique et ouverte aux contributions ?',
        ],
      },
      {
        heading: 'Ce que Flowboro fait différemment',
        paragraphs: [
          "Flowboro réunit le meilleur du tableau kanban et de la cadence des sprints dans une seule interface fluide. Vous créez un tableau en quelques secondes, vous y ajoutez vos étapes, et vous lancez un sprint sans configuration interminable.",
          "Surtout, Flowboro est entièrement open source : le code est public sur GitHub, gratuit et auto-hébergeable. Là où les outils propriétaires verrouillent vos données et votre budget, Flowboro vous laisse le contrôle total, sans vendor lock-in.",
        ],
      },
      {
        heading: 'Migrer sans douleur',
        paragraphs: [
          "Changer d'outil fait peur, mais une migration vers un logiciel plus simple se fait souvent en une après-midi. Repartez de votre sprint en cours, recréez vos colonnes essentielles et invitez votre équipe.",
          "L'objectif n'est pas de transférer dix ans d'archives, mais de repartir sur une base claire qui accélère votre prochain sprint.",
        ],
      },
    ],
  },
  {
    slug: 'kanban-vs-scrum',
    title: 'Kanban ou Scrum : quelle méthode pour votre équipe ?',
    description:
      "Kanban et Scrum sont souvent opposés. Comparez les deux approches de gestion de projet agile et découvrez comment un seul outil peut combiner tableaux kanban et sprints Scrum.",
    date: '2026-06-08',
    readingMinutes: 6,
    keywords: [
      'kanban vs scrum',
      'gestion de projet agile',
      'gestion de sprint',
      'tableau kanban en ligne',
    ],
    intro: [
      "Kanban et Scrum sont les deux approches agiles les plus répandues. L'une mise sur un flux continu, l'autre sur des cycles de travail courts appelés sprints. Beaucoup d'équipes hésitent, alors qu'en réalité les deux se complètent.",
    ],
    sections: [
      {
        heading: "Kanban : le flux continu visualisé",
        paragraphs: [
          "Le kanban repose sur un tableau divisé en colonnes représentant les étapes du travail. Les cartes avancent de gauche à droite au fil de leur progression. C'est idéal pour visualiser la charge et limiter le travail en cours.",
          "Sa force est la simplicité : pas de cérémonie obligatoire, pas de cadence imposée. On ajoute une carte, on la déplace, on la termine.",
        ],
      },
      {
        heading: 'Scrum : le rythme des sprints',
        paragraphs: [
          "Scrum organise le travail en sprints, des cycles courts avec un objectif précis. L'équipe planifie le sprint, l'exécute, puis fait le point avant de recommencer.",
          "Cette cadence apporte de la prévisibilité et un moment régulier pour réajuster les priorités, ce qui manque souvent à un kanban pur.",
        ],
      },
      {
        heading: 'Pourquoi choisir, quand on peut combiner ?',
        paragraphs: [
          "La meilleure approche pour beaucoup d'équipes consiste à garder la clarté visuelle du tableau kanban tout en travaillant par sprints. C'est exactement ce que propose Flowboro, un outil open source : des tableaux visuels et une gestion native des sprints dans le même espace.",
          "Vous gardez vos colonnes lisibles, mais chaque sprint a son périmètre, ses membres et son objectif. Le flux et la cadence ne s'opposent plus, ils se renforcent.",
        ],
      },
    ],
  },
  {
    slug: 'choisir-outil-gestion-sprint',
    title: 'Comment choisir un outil de gestion de sprint pour votre équipe',
    description:
      "Planification, suivi, clôture : voici comment choisir un outil de gestion de sprint efficace et éviter les logiciels trop lourds pour votre équipe agile.",
    date: '2026-06-05',
    readingMinutes: 5,
    keywords: [
      'outil de gestion de sprint',
      'sprint planning',
      'logiciel de gestion de projet agile',
      'product backlog',
    ],
    intro: [
      "Un bon outil de gestion de sprint doit accompagner trois moments clés : la planification, le suivi quotidien et la clôture. Trop d'outils excellent sur le premier et oublient les deux autres.",
    ],
    sections: [
      {
        heading: 'Planifier un sprint sans friction',
        paragraphs: [
          "La planification doit être rapide : choisir les tâches du backlog, fixer un objectif, assigner les membres. Si cette étape prend une heure de configuration, l'outil vous ralentit déjà.",
        ],
      },
      {
        heading: 'Suivre le sprint au quotidien',
        paragraphs: [
          "Pendant le sprint, l'équipe a besoin d'une vue claire : qui fait quoi, quelles cartes avancent, lesquelles bloquent. Un tableau kanban lisible répond parfaitement à ce besoin, à condition de rester centré sur le sprint en cours.",
        ],
      },
      {
        heading: 'Clôturer et recommencer',
        paragraphs: [
          "La clôture est le moment où l'équipe mesure ce qui a été livré et réajuste. Un bon outil rend cette transition naturelle, puis enchaîne sur le sprint suivant sans repartir de zéro.",
          "Flowboro couvre ces trois temps dans une interface unique : backlog, sprints et tableaux d'étapes. Et comme il est open source et auto-hébergeable, vous gardez la maîtrise complète de l'outil et de vos données, sans le poids ni le coût des suites propriétaires.",
        ],
      },
    ],
  },
  {
    slug: 'logiciel-kanban-equipe',
    title: 'Logiciel kanban pour équipes : le guide complet',
    description:
      "Qu'est-ce qu'un logiciel kanban pour équipes, à quoi sert-il et comment le choisir ? Le guide complet pour visualiser le travail et livrer plus vite.",
    date: '2026-06-02',
    readingMinutes: 6,
    keywords: [
      'logiciel kanban pour équipes',
      'tableau de tâches pour équipe',
      'team collaboration',
      'kanban board',
    ],
    intro: [
      "Un logiciel kanban pour équipes transforme une liste de tâches en un tableau visuel où chacun voit l'avancement en un coup d'œil. C'est le socle d'une collaboration claire, surtout quand le travail s'accélère.",
    ],
    sections: [
      {
        heading: "À quoi sert un tableau kanban en équipe",
        paragraphs: [
          "Le tableau kanban donne une vue partagée du travail. Les colonnes représentent les étapes, les cartes représentent les tâches, et tout le monde lit la même information au même moment.",
          "Cette transparence réduit les réunions de statut : il suffit de regarder le tableau pour savoir où en est l'équipe.",
        ],
      },
      {
        heading: 'Les bénéfices pour la collaboration',
        paragraphs: [
          "Au-delà de la visualisation, un bon logiciel kanban clarifie les responsabilités et fluidifie la communication.",
        ],
        bullets: [
          'Chaque membre identifie ses tâches sans demander',
          'Les blocages deviennent visibles immédiatement',
          'Le travail en cours reste maîtrisé et raisonnable',
          'Les nouveaux arrivants comprennent le projet en quelques minutes',
        ],
      },
      {
        heading: 'Choisir un outil qui reste simple',
        paragraphs: [
          "La valeur d'un logiciel kanban tient à sa lisibilité. Un outil surchargé d'options finit par cacher l'essentiel. Flowboro mise sur la clarté : des tableaux épurés, des sprints intégrés et une interface fluide sur ordinateur comme sur mobile. Et parce qu'il est open source et gratuit, vous pouvez l'adopter et l'adapter sans contrainte.",
        ],
      },
    ],
  },
]

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)
