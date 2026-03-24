/**
 * Helpers Schema.org — marsAI Festival
 * Référence : https://schema.org
 */

const SITE_URL =
  process.env.REACT_APP_SITE_URL ||
  'https://amad-khaly-diallo.students-laplateforme.io/marsai';

/** Organisation du festival */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'marsAI',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@mars-ai.com',
    availableLanguage: ['French', 'English'],
  },
};

/** Schéma WebSite global (SearchAction pour rich results) */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'marsAI — Festival de courts-métrages IA',
  url: SITE_URL,
  inLanguage: ['fr', 'en'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/catalogue?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

/**
 * Événement festival
 * @param {object} opts
 */
export function festivalEventSchema({
  name = 'marsAI Festival 2026',
  description = 'Premier festival mondial de courts-métrages de 60 secondes générés par intelligence artificielle. Projections, jury international, talks et ateliers — Marseille.',
  startDate = '2026-06-01',
  endDate = '2026-06-30',
  locationName = 'La Plateforme (ex Dock des Suds)',
  locationAddress = 'Marseille, France',
  image = `${SITE_URL}/og-image.jpg`,
  url = SITE_URL,
} = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Festival',
    name,
    description,
    startDate,
    endDate,
    image,
    url,
    location: {
      '@type': 'Place',
      name: locationName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Marseille',
        addressCountry: 'FR',
        streetAddress: locationAddress,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 43.2965,
        longitude: 5.3698,
      },
    },
    organizer: organizationSchema,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  };
}

/**
 * Film / VideoObject
 * @param {object} movie  Données du film depuis l'API
 */
export function videoObjectSchema(movie) {
  if (!movie) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: movie.original_title || movie.english_title || 'Court-métrage marsAI',
    description: movie.synopsis_original || movie.synopsis_english || '',
    thumbnailUrl: movie.thumbnail_url || `${SITE_URL}/og-image.jpg`,
    uploadDate: movie.created_at
      ? new Date(movie.created_at).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    duration: `PT${Math.round((movie.duration_minutes || 1) * 60)}S`,
    embedUrl: movie.youtube_link || undefined,
    url: `${SITE_URL}/watch/${movie.id}`,
    inLanguage: movie.language || 'fr',
    author: movie.filmmaker_name
      ? {
          '@type': 'Person',
          name: movie.filmmaker_name,
        }
      : undefined,
    productionCompany: organizationSchema,
  };
}

/**
 * Liste de films (catalogue)
 * @param {Array} movies
 */
export function movieListSchema(movies = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Catalogue — Films du festival marsAI',
    url: `${SITE_URL}/catalogue`,
    numberOfItems: movies.length,
    itemListElement: movies.slice(0, 50).map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: m.original_title || m.english_title || `Film ${i + 1}`,
      url: `${SITE_URL}/watch/${m.id}`,
    })),
  };
}

/**
 * Membres du jury
 * @param {Array} jurors  [{name, bio, image, role}]
 */
export function juryListSchema(jurors = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Jury du festival marsAI',
    url: `${SITE_URL}/jury`,
    itemListElement: jurors.map((j, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Person',
        name: j.name,
        description: j.bio || '',
        image: j.image || undefined,
        jobTitle: j.role || 'Membre du jury',
      },
    })),
  };
}

/**
 * Page "À propos"
 */
export const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'À propos — marsAI Festival',
  url: `${SITE_URL}/a-propos`,
  description:
    'marsAI est un festival de courts-métrages au format 1 minute généré par IA. Découvrez notre manifeste, notre lieu et notre équipe.',
  mainEntity: organizationSchema,
};

/**
 * Page Contact
 */
export const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact — marsAI Festival',
  url: `${SITE_URL}/contact`,
  description:
    "Contactez l'équipe marsAI pour vos questions, partenariats, presse ou programmation.",
  mainEntity: organizationSchema,
};

/**
 * Page Participer (CallForPapers / appel à films)
 */
export const participerPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Soumettre un film — marsAI Festival',
  url: `${SITE_URL}/participer`,
  description:
    "Soumettez votre court-métrage d'une minute généré par IA au festival marsAI. Ouvert aux créateurs du monde entier (+120 pays).",
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Participer',
        item: `${SITE_URL}/participer`,
      },
    ],
  },
};

/**
 * Page Partenaires
 */
export const partenairesPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Partenaires — marsAI Festival',
  url: `${SITE_URL}/partenaires`,
  description:
    "Découvrez les partenaires officiels et sponsors du festival marsAI. Soutenez l'innovation et la créativité dans le cinéma IA.",
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Partenaires',
        item: `${SITE_URL}/partenaires`,
      },
    ],
  },
};

/**
 * Page Palmarès / Winners
 */
export function winnersPageSchema(winners = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Palmarès — marsAI Festival 2026',
    url: `${SITE_URL}/winners`,
    description:
      "Découvrez les lauréats et films primés de l'édition 2026 du festival marsAI.",
    mainEntity: {
      '@type': 'ItemList',
      name: 'Palmarès marsAI 2026',
      itemListElement: winners.slice(0, 20).map((w, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: w.original_title || w.english_title || `Lauréat ${i + 1}`,
        url: `${SITE_URL}/watch/${w.id}`,
      })),
    },
  };
}
