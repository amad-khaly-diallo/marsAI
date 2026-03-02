import { defineField, defineType } from "sanity"

export const cataloguePage = defineType({
    name: 'cataloguePage',
    title: 'Page Catalogue',
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
            name: 'title',
            title: 'Titre de la page',
            type: 'localizedString',
        }),
        defineField({
            name: 'description',
            title: 'Description de la page',
            type: 'localizedString',
        }),
    ],
})
