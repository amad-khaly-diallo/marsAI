import { defineField, defineType } from "sanity";

export const participerPage = defineType({
    name: 'participerPage',
    title: 'Page Participer',
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
            name: 'tag',
            title: 'Tag du formulaire',
            type: 'localizedString',
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