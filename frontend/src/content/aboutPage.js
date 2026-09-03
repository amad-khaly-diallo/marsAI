/**
 * Static content for AProposPage.jsx (formerly Sanity document `aboutPage`).
 * Frozen from the live CDN content — see migration notes in
 * src/content/homePhases.js for context. Sanity system metadata dropped.
 */
export const aboutPage = {
  heroBadge: { en: 'About — Marseille', fr: 'À propos — Marseille' },
  heroTitlePart1: {
    en: 'A festival to tell a powerful story, in one minute.',
    fr: 'Un festival pour raconter fort, en une minute.',
  },
  // heroTitleHighlight / heroTitlePart2 were never filled in Sanity —
  // AProposPage.jsx falls back to i18n copy (about.heroTitle.highlight / .part2) for these.
  heroParagraph: {
    en: 'marsAI is a festival of 1-minute short films. Screenings, talks and workshops: a contemporary cultural experience conceived as an editorial event — not as a tech product.',
    fr: 'marsAI est un festival de courts-métrages au format 1 minute. Projections, talks et ateliers : une expérience culturelle contemporaine pensée comme un rendez-vous éditorial — pas comme un produit tech.',
  },
  heroInfoFormatLabel: { en: 'Format ', fr: 'Format ' },
  heroInfoFormatValue: { en: '≈ 60 sec', fr: '≈ 60 sec' },
  heroInfoAccessLabel: { en: 'Access', fr: 'Accès' },
  heroInfoAccessValue: { en: 'Open', fr: 'Ouvert' },
  heroInfoCityLabel: { en: 'City', fr: 'Ville' },
  heroInfoCityValue: { en: 'Marseille', fr: 'Marseille' },
  heroCtaContactLabel: { en: 'Contact the team', fr: 'Contacter l’équipe' },
  heroCtaContactLink: '/contact',
  heroCtaProgramLabel: { en: 'See the program', fr: 'Voir la programmation' },
  heroCtaProgramLink: '/programme',

  manifestoLabel: { en: 'Manifest', fr: 'Manifeste' },
  manifestoTitlePart1: {
    en: 'Technology is not the issue. Intention is.',
    fr: 'La technologie n’est pas le sujet. L’intention l’est.',
  },
  manifestoTitleHighlight: {
    en: 'Technology is not the subject. The intention is. The intention is.',
    fr: 'La technologie n’est pas le sujet. L’intention l’est. L’intention l’est.',
  },
  manifestoBody: {
    en: 'We value writing, directing, editing, image and sound. AI can be part of the process, but what matters is still the film: a clear idea, a direction, a rhythm.',
    fr: 'Nous valorisons l’écriture, la mise en scène, le montage, l’image et le son. L’IA peut faire partie du processus, mais ce qui compte reste le film : une idée claire, une direction, un rythme.',
  },
  manifestoInfoRows: [
    {
      _key: '056e22a19039',
      label: { en: 'What we look at', fr: 'Ce qu’on regarde' },
      value: {
        en: 'Direction / Narrative / Image / Sound',
        fr: 'Direction / Récit / Image / Son',
      },
    },
    {
      _key: '8fc133268bb3',
      label: { en: 'Duration', fr: 'Durée' },
      value: { en: '1 minute', fr: '1 minute' },
    },
    {
      _key: '4084cfbf8545',
      label: { en: 'Mind', fr: 'Esprit' },
      value: {
        en: 'Cinema • Editorial • Modern',
        fr: 'Ciné • Éditorial • Moderne',
      },
    },
  ],
  manifestoCards: [
    {
      _key: '71ff02da2417',
      title: { en: 'For who?', fr: 'Pour qui ?' },
      text: {
        en: 'Professionals, students, enthusiasts. The event is designed to be welcoming, readable, and open.',
        fr: 'Professionnels, étudiants, passionnés. L’événement est pensé pour être accueillant, lisible, et ouvert.',
      },
    },
    {
      _key: '2d89895bac10',
      title: { en: 'On site', fr: 'Sur place' },
      text: {
        en: 'Screenings, talks and workshops. A short but complete program: watch, understand, experiment.',
        fr: 'Projections, talks et ateliers. Une programmation courte mais complète : regarder, comprendre, expérimenter.',
      },
    },
    {
      _key: 'b19d943eb1b5',
      title: { en: 'Ambition', fr: 'Ambition' },
      text: {
        en: 'Créer un rendez-vous culturel à Marseille, avec une identité forte et une expérience simple, bien produite.',
        fr: 'Créer un rendez-vous culturel à Marseille, avec une identité forte et une expérience simple, bien produite.',
      },
    },
  ],

  locationLabel: { en: 'Place', fr: 'Lieu' },
  locationTitle: {
    en: 'Marseille, as decor and energy',
    fr: 'Marseille, comme décor et énergie',
  },
  locationBody: {
    en: 'Marseille sets the tone: contrasts, light, stories. The festival is anchored there and invites us to look differently.',
    fr: 'Marseille donne le ton : contrastes, lumière, récits. Le festival s’y ancre et invite à regarder autrement.',
  },
  // locationCtaInfoLabel/Link and locationMapTitle/Address were never filled
  // in Sanity — AProposPage.jsx already falls back to i18n copy / hardcoded
  // defaults ("Marseille", the La Plateforme address) when these are absent.
};
