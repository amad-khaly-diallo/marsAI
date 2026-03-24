import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL =
  process.env.REACT_APP_SITE_URL ||
  'https://amad-khaly-diallo.students-laplateforme.io/marsai';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const SITE_NAME = 'marsAI — Festival de courts-métrages IA';

/**
 * Composant SEO universel.
 *
 * Props :
 *   title        {string}  Titre de la page (sans suffixe site)
 *   description  {string}  Meta description (max ~160 car.)
 *   canonical    {string}  URL canonique de la page (chemin ex: "/a-propos")
 *   image        {string}  URL absolue de l'image Open Graph
 *   schema       {object|object[]}  Données JSON-LD Schema.org
 *   noindex      {bool}    true = noindex, nofollow
 *   lang         {string}  "fr" | "en"
 */
export default function SEOHead({
  title,
  description,
  canonical,
  image,
  schema,
  noindex = false,
  lang = 'fr',
}) {
  const fullTitle = title ? `${title} — marsAI` : SITE_NAME;
  const metaDesc =
    description ||
    "marsAI est le premier festival mondial de courts-métrages d'une minute générés par intelligence artificielle. Projections, jury, palmarès — Marseille.";
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const ogImage = image || DEFAULT_IMAGE;

  // Normalise schema en tableau
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      {/* Langue */}
      <html lang={lang} />

      {/* Titres & description */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : 'fr_FR'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Schema.org */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
