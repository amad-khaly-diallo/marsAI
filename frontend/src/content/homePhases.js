/**
 * Static content for the Home page (phase 1 / phase 2 / phase 3 sections).
 *
 * This used to be fetched at runtime from Sanity (documents `homePhase1`,
 * `homePhase2`, `homePhase3`). The CMS integration was dropped for the demo
 * build, so the last live content was frozen here as plain JS. Shape matches
 * exactly what `client.fetch('*[_type == "homePhaseX"][0]')` used to return
 * (minus Sanity's internal `_id` / `_rev` / `_system` / `syncTags` metadata
 * and the unused `heroVideo` file asset reference, which no component read).
 */

export const phase1 = {
  heroTitle: {
    en: 'A festival to tell a powerful story, in one minute.',
    fr: 'Un festival pour raconter fort. ',
  },
  heroSubtitle: {
    en: 'One minute to create. One minute to shock. One minute to score.',
    fr: '1 minute pour créer. 1 minute pour choquer. 1 minute pour marquer.',
  },
  heroCtaLabel: {
    en: 'Participate in the project',
    fr: 'Participer au projet',
  },
  heroCtaLink: '/participer',

  mapBadge: { en: 'Festival venue', fr: 'Lieu du festival' },
  mapTitle: { en: 'Where to find us', fr: 'Où nous trouver' },
  mapSubtitle: {
    en: 'La Plateforme (formerly Dock des Suds) — 4000 m² in the centre of Marseille.',
    fr: 'La Plateforme (ex Dock des Suds) — 4000 m² au centre de Marseille.',
  },
  mapCaptionGta: { en: 'GTA', fr: 'GTA' },
  mapCaptionReal: { en: 'MAPS', fr: 'MAPS' },

  newsletterTitle: { en: 'Stay informed', fr: 'Restez informé' },
  newsletterSubtitle: {
    en: 'Sign up to receive festival information: program, calls for films and events.',
    fr: 'Inscrivez-vous pour recevoir les infos du festival : programmation, appels à films et événements.',
  },

  festivalBadge: { en: 'Presentation', fr: 'Présentation' },
  festivalTitle: { en: 'The festival', fr: 'Le festival' },
  festivalIntro: {
    en: 'MarsAI brings together creators and audiences around short films generated or co-created with AI. The first edition will take place in Marseille in 2026 at La Plateforme — a unique event to discover and reward audiovisual creation assisted by artificial intelligence.',
    fr: "MarsAI réunit créateurs et public autour du film court généré ou co-créé avec l'IA. Première édition à Marseille en 2026 à La Plateforme — un rendez-vous unique pour découvrir et récompenser la création audiovisuelle assistée par l'intelligence artificielle.",
  },

  selectionTitle: { en: 'Selection format', fr: 'Format de la sélection' },
  selectionItems: [
    {
      _key: 'f060c3a450d2',
      text: { en: '2-month call for projects', fr: 'Appel à projet de 2 mois' },
    },
    {
      _key: 'dd5df49d466a',
      text: {
        en: '50 one-minute short films selected for the official competition',
        fr: '50 courts-métrages d’une minute sélectionnés en compétition officielle',
      },
    },
    {
      _key: 'a1b915aca43c',
      text: {
        en: 'Online distribution of works (web and social networks)',
        fr: 'Diffusion en ligne des œuvres (web et réseaux sociaux)',
      },
    },
    {
      _key: '423ef8dbff61',
      text: {
        en: 'Distribution in cinemas and film festivals',
        fr: 'Diffusion en salles de cinéma et festivals de films',
      },
    },
  ],

  venueTitle: { en: 'The place', fr: 'Le lieu' },
  venueName: { en: 'La Plateforme', fr: 'La Plateforme' },
  venueExName: { en: 'ex Dock des Suds', fr: 'ex Dock des Suds' },
  venuePoints: [
    {
      _key: '37ccaa822f62',
      en: '4000 m² of space in the center of Marseille, to host the event',
      fr: "4000 m² d'espaces dans le centre de Marseille, pour accueillir l'événement",
    },
    {
      _key: 'b6ff276eae5a',
      en: '2 spaces for Mars.A.I: The Sugar Room (conferences and awards ceremony) • The Plaza Room (reception, entertainment, catering)',
      fr: 'Espaces pour Mars.A.I : La salle des Sucres (conférences et remise des prix) • La salle Plaza (accueil, animation, restauration)',
    },
    {
      _key: '908c1adc2bbf',
      en: 'Fully modular space',
      fr: 'Espace entièrement modulable',
    },
  ],

  conferencesTitle: {
    en: 'Two days of free conferences',
    fr: 'Deux journées de conférences gratuites',
  },
  conferencesSubtitle: {
    en: 'Engaging debates, clashes of ideas, stimulating questions.',
    fr: "De débats engagés, de confrontations d'idées, d'interrogations stimulantes.",
  },
  conferencesAudienceLabel: { en: 'Target audiences', fr: 'Publics ciblés' },
  conferencesAudiences: [
    {
      _key: '94c4ca5a769b',
      en: 'Professionals in the Cultural and Creative Industries',
      fr: 'Professionnels des Industries Culturelles et Créatives',
    },
    { _key: '4110dacc3b83', en: 'Students', fr: 'Étudiants' },
    { _key: 'eb09f605cb66', en: 'General public', fr: 'Grand public' },
  ],

  alsoTitle: { en: '… But also', fr: '… Mais aussi' },
  alsoItems: [
    {
      _key: '2f8fd11135aa',
      title: { en: 'Workshops', fr: 'Des Workshops' },
      detail: {
        en: 'Led by experts in generative AI. Topics: screenwriting, creation and post-production.',
        fr: "Animés par des experts de l'IA générative. Thématiques : scénario, création et post-production.",
      },
    },
    {
      _key: '7f1652db57a8',
      title: { en: 'Projections', fr: 'Des Projections' },
      detail: {
        en: 'Films in competition and out of competition.',
        fr: 'Des films en compétition et hors-compétition.',
      },
    },
    {
      _key: '5188e5176f8e',
      title: { en: 'An awards ceremony', fr: 'Une remise des prix' },
      detail: {
        en: 'In the presence of a prestigious jury, including renowned filmmakers, actors and content creators.',
        fr: "En présence d'un jury prestigieux, incluant des cinéastes, acteurs et créateurs de contenu renommés.",
      },
    },
  ],

  nightIntroLabel: { en: '… And finally!', fr: '… Et enfin !' },
  nightTitle: { en: 'marsAI Night', fr: 'marsAI Night' },
  nightTagline: {
    en: 'Electro party blending AI and desirable futures',
    fr: 'Fête Électro mêlant IA et futurs souhaitables',
  },
  nightType: {
    en: 'Grand closing ceremony',
    fr: 'Grande cérémonie de clôture',
  },
  nightDate: { en: 'Saturday, June 13 — from ', fr: 'Samedi 13 Juin' },
  nightTime: { en: '7 p.m.', fr: 'à partir de 19h' },

  chronologyBadge: { en: 'Timeline', fr: 'Chronologie' },
  chronologyTitle: { en: 'Event planning', fr: 'Planning des événements' },
  chronologyAnnualTitle: {
    en: 'Potential planning — from February to June',
    fr: 'Planning potentiel — de février à juin',
  },
  chronologyAnnualItems: [
    {
      _key: '869818f40f90',
      label: {
        en: 'Opening of the call for projects',
        fr: "Ouverture de l'appel à projet",
      },
      months: { en: 'February - March', fr: 'Fevrier - Mars' },
      weeks: { en: 'W1 to W9', fr: 'S1 à S9' },
      detail: {
        en: 'Applications open on the Mobile Film Festival online platform in the section dedicated to marsAI',
        fr: 'Candidatures ouvertes sur la plateforme en ligne du Mobile Film Festival dans la section dédiée à marsAI',
      },
    },
    {
      _key: '2fcb4960db4d',
      label: {
        en: 'Selection of 50 short films in official competition',
        fr: 'Sélection des 50 courts-métrages en compétition officielle',
      },
      months: { en: 'April', fr: 'Avril' },
      weeks: { en: 'W10 to W13', fr: 'S10 à S13' },
      detail: {
        en: 'Selection of around 50 videos',
        fr: 'Selection environ 50 vidéos',
      },
    },
    {
      _key: '103347452ec1',
      label: {
        en: 'Online distribution of selected short films',
        fr: 'Diffusion en ligne des courts-métrages sélectionnés',
      },
      months: { en: 'May', fr: 'Mai' },
      weeks: { en: 'W14 to W18', fr: 'S14 à S18' },
      detail: {
        en: 'Web platform and social networks',
        fr: 'Plateforme web et réseaux sociaux',
      },
    },
    {
      _key: '18c1b80fec43',
      label: { en: 'Festival marsAI', fr: 'Festival marsAI' },
      months: { en: 'Jun', fr: 'Juin' },
      weeks: { en: 'W19 to W21', fr: 'S19 à S21' },
      detail: {
        en: 'Two days at La Plateforme',
        fr: 'Deux jours à La Plateforme',
      },
    },
  ],

  chronologyProgramTitle: {
    en: 'Festival program — Friday & Saturday',
    fr: 'Programme du festival — Vendredi & Samedi',
  },
  chronologyFridayTitle: { en: 'Friday', fr: ' Vendredi' },
  chronologyFridaySlots: [
    {
      _key: 'af2d0a61d27c',
      time: '10:00 – 11:00',
      title: { en: 'Opening of the festival', fr: 'Ouverture du festival' },
      description: {
        en: 'Presentation of the Festival, partners and selections',
        fr: 'Présentation du Festival, des partenaires et des sélections',
      },
    },
    {
      _key: '9c67e248cbd6ee277164a5dd0850bdc4',
      time: '14:00 – 16:00',
      title: { en: 'Opening of the festival', fr: 'Ouverture du festival' },
      description: {
        en: 'Presentation of the Festival, partners and selections',
        fr: 'Présentation du Festival, des partenaires et des sélections',
      },
    },
    {
      _key: 'c08ac6219b99',
      time: '11:00 – 13:00',
      title: { en: 'Workshop', fr: 'Workshop' },
      description: {
        en: 'Recent AI tools dedicated to post-production',
        fr: 'Les outils IA récents dédiés à la post-production',
      },
    },
    {
      _key: '5ea6ccd96f7f',
      time: '13:00 – 14:00',
      title: { en: 'Round table', fr: 'Table ronde' },
      description: {
        en: 'Debate: current impact of generative AI on the creative industries',
        fr: "Débat : impact actuel de l'IA générative sur les industries créatives",
      },
    },
  ],
  chronologySaturdayTitle: { en: 'Saturday', fr: 'Samedi' },
  chronologySaturdaySlots: [
    {
      _key: '021237a650f9',
      time: '10:00 – 11:00',
      title: { en: 'Round table', fr: 'Table ronde' },
      description: {
        en: 'Creators who have adopted AI tools in writing and directing films',
        fr: 'Créateurs ayant adopté les outils IA dans l’écriture et la réalisation de films',
      },
    },
    {
      _key: '123d6974ab7fca6185ebef73c29ea9b3',
      time: '11:00 – 12:00',
      title: { en: 'Round table', fr: 'Table ronde' },
      description: {
        en: 'Creators who have adopted AI tools in writing and directing films',
        fr: 'Créateurs ayant adopté les outils IA dans l’écriture et la réalisation de films',
      },
    },
    {
      _key: '06fc87451fb132b2d3d0620c94b606b5',
      time: '13:00 – 14:00',
      title: { en: 'Round table', fr: 'Table ronde' },
      description: {
        en: 'Creators who have adopted AI tools in writing and directing films',
        fr: 'Créateurs ayant adopté les outils IA dans l’écriture et la réalisation de films',
      },
    },
  ],
};

export const phase2 = {
  heroTitle: {
    en: 'An AI festival, in one minute.',
    fr: 'Un festival AI, en une minute.',
  },
  heroSubtitle: {
    en: "A second wind for the festival: more films, more participants, more ambition. Discover the festival's key figures and join the adventure!",
    fr: "Un second souffle pour le festival : plus de films, plus de participants, plus d'ambition. Découvrez les chiffres clés du festival et rejoignez l'aventure !",
  },
  heroCtaLabel: { en: 'Discover the films', fr: ' Découvrir les films' },
  heroCtaLink: '/catalogue',
  projectionsBadge: 'Projections',
  projectionsTitle: {
    en: 'Key figures from the festival',
    fr: 'Chiffres clés du festival',
  },
  projectionsSubtitle: {
    en: 'A co-creation of the digital school La Plateforme and the Mobile Film Festival. Based on the results obtained by the events and selections organized.',
    fr: 'Une co-création de l’école du numérique La Plateforme et le Mobile Film Festival. En nous basant sur les résultats obtenus par les événements et sélections organisés.',
  },
};

// The `homePhase3` Sanity document had never been filled in — the live CDN
// query returned `null`. Frozen as `null` to match; Home.jsx already falls
// back to hardcoded copy ("Grand Prix" / "MarsAI") whenever phase3 is falsy.
export const phase3 = null;
