export default {
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'The slug is the end of the URL for this page. It should be short and can not contain any spaces or special characters. Ex. renatethor.com/projects/slug-goes-here',
      validation: Rule => Rule.error('The page needs a slug.').required(),
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'publishedAt',
      title: 'Published',
      type: 'datetime',
      validation: Rule => Rule.error('Missing publish date.').required(),
    },
    {
      title: 'Featured',
      name: 'featured',
      type: 'boolean',
      description: 'Featured projects are displayed on the front page.'
    },
    {
      title: 'Landscape image',
      name: 'landscape',
      type: 'boolean',
      description: 'Image and text is stacked vertically.'
    },
    {
      title: 'Columns',
      name: 'columns',
      type: 'number',
      description: 'From 1 up to 3. The number of columns this project takes up in the projects overview grid. If no number is set, the project will take up 3 columns.',
      validation: Rule => Rule.error('Column must be a number from 1 to 3.').min(1).max(3),
    },
    {
      name: 'colors',
      type: 'palette',
      validation: Rule => Rule.error('Missing color palette.').required(),
    },
    {
      name: 'image',
      type: 'mainImage',
      title: 'Image',
      validation: Rule => Rule.error('Missing main image.').required(),
    },
    {
      name: 'lead',
      type: 'text',
      title: 'Lead',
      description: 'Only appears on the front page / project overview.'
    },
    {
      type: 'bodyPortableText',
      name: 'description',
      title: 'Description',
      description: 'Appears on the page for this project and not in the overview.'
    },
    {
      type: 'bodyPortableText',
      name: 'meta',
      title: 'Details',
      description: 'Meta information about the project. Client, size, etc. Year is shown automatically based on publishing date (above).'
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'mainImage',
          title: 'Image'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    },
    prepare ({title, media}) {
      return {
        title,
        media
      }
    }
  }
}
