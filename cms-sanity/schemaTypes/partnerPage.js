import {defineField, defineType} from 'sanity'

export const partnerPage = defineType({
  name: 'partnerPage',
  title: 'Page Partenaires',
  type: 'document',
  fields: [
    defineField({
      name: 'internalTitle',
      title: 'Titre interne',
      type: 'string',
      description: 'Juste pour vous repérer dans le Studio (non affiché sur le site).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageTitle',
      title: 'Titre de la page',
      type: 'localizedString',
      description: 'Titre principal affiché sur la page Partenaires.',
    }),
    defineField({
      name: 'intro',
      title: 'Texte d’introduction',
      type: 'localizedString',
      description: 'Texte d’introduction au-dessus de la liste des partenaires.',
    }),
    defineField({
      name: 'partnersSectionTitle',
      title: 'Titre de la section partenaires',
      type: 'localizedString',
      description: 'Titre de la section qui liste les partenaires.',
    }),
    defineField({
      name: 'partnersSectionDescription',
      title: 'Description de la section partenaires',
      type: 'localizedString',
      description: 'Texte descriptif pour expliquer la relation avec les partenaires.',
    }),
    defineField({
      name: 'ctaTitle',
      title: 'Titre de la section appel à l’action',
      type: 'localizedString',
      description: 'Titre affiché au-dessus du bloc d’appel à l’action (ex: “Devenir partenaire ?”).',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texte du bouton / appel à l’action',
      type: 'localizedString',
      description: 'Texte d’un éventuel bouton (ex: “Devenir partenaire”).',
    }),
  ],
})

