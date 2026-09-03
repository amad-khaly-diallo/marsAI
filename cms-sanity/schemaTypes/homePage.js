import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Page d’accueil',
  type: 'document',
  fields: [
    defineField({
      name: 'internalTitle',
      title: 'Titre interne',
      type: 'string',
      description: 'Pour vous repérer dans le Studio (non affiché).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phase1',
      title: 'Phase 1',
      type: 'homePhase1',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phase2',
      title: 'Phase 2',
      type: 'homePhase2',
    }),
    defineField({
      name: 'phase3',
      title: 'Phase 3',
      type: 'homePhase3',
    }),
  ],
})

