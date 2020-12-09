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
      title: 'Feature',
      name: 'featured',
      type: 'boolean'
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
      title: 'Lead'
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'richText',
          title: 'Text'
        },
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
