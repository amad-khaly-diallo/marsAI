import {defineField, defineType} from 'sanity'

export const juryPage = defineType({
  name: 'juryPage',
  title: 'Page Jury',
  type: 'document',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag du jury',
      type: 'localizedString',
    }),
    defineField({
      name: 'title',
      title: 'Titre du jury',
      type: 'localizedString',
    }),
    defineField({
      name: 'festivalName',
      title: 'Nom du festival',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description du de la page',
      type: 'localizedString',
    }),
  ],
})