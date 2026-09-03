import {defineField, defineType} from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Page Contact',
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
      name: 'formulaireTag',
      title: 'Contact',
      type: 'localizedString',
    }),
    defineField({
      name: 'title',
      title: 'Titre du formaulaire',
      type: 'localizedString',
    }),
    defineField({
      name: 'description',
      title: 'Description du formulaire',
      type: 'localizedString',
    }),
  ],
})
