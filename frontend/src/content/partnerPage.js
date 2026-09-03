/**
 * Static content for Partenaires.jsx (formerly Sanity document `partnerPage`).
 * Frozen from the live CDN content — see migration notes in
 * src/content/homePhases.js for context.
 *
 * Note: `ctaTitle` was never filled in Sanity (Partenaires.jsx falls back to
 * the i18n key `partners.ctaTitle` for it). The live `partnersSectionTitle`
 * value ("Become a Partner?") is what the CMS actually had — it renders
 * as the heading above the partner logos, which reads a little oddly next
 * to "Become a Partner?" further down; that's a pre-existing content
 * mismatch in the CMS, not something introduced by this migration.
 */
export const partnerPage = {
  pageTitle: { en: 'Our Partners', fr: 'Nos Partenaires' },
  intro: {
    en: 'They support innovation and creativity. Discover the organizations that make the MarsAI festival possible.',
    fr: "Ils soutiennent l'innovation et la créativité. Découvrez les organisations qui rendent le festival MarsAI possible.",
  },
  partnersSectionTitle: { en: 'Become a Partner?', fr: 'Devenir Partenaire ?' },
  partnersSectionDescription: {
    en: 'Join the MarsAI adventure and associate your brand with the future of cinema and artificial intelligence.',
    fr: "Rejoignez l'aventure MarsAI et associez votre marque à l'avenir du cinéma et de l'intelligence artificielle.",
  },
  ctaText: { en: 'Contact us', fr: 'Nous contacter' },
};
