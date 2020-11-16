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
      name: 'publishedAt',
      title: 'Published',
      type: 'datetime'
    },
    {
      title: 'Feature',
      name: 'featured',
      type: 'boolean'
    },
    {
      name: 'colors',
      type: 'palette'
    },
    {
      name: 'image',
      type: 'mainImage',
      title: 'Image'
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
      projectType: 'projectType',
      media: 'image'
    },
    prepare ({title, media, projectType}) {
      return {
        title,
        media,
        subtitle: `${projectType}`
      }
    }
  }
}
