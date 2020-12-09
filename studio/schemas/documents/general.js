export default {
  name: 'general',
  type: 'document',
  title: 'General',
  fields: [
    {
      name: 'colors',
      type: 'palette',
      validation: Rule => Rule.error('Missing color palette.').required(),
    },
    {
      name: 'footer',
      type: 'footer',
      title: 'Footer',
      validation: Rule => Rule.error('Missing footer info.').required()
    },
    {
      name: 'ogimg',
      type: 'image',
      title: 'Facebook image',
      description: 'Displayed when sharing the website on Facebook and other social media platforms if no other image is available.',
      validation: Rule => Rule.error('Missing Facebook image.').required(),
    }
  ],
  preview: {
    select: {
      body: 'lead'
    },
    prepare ({body = []}) {
      const block = body.find(block => block._type === 'block')
      return {
        title: block
          ? block.children
            .filter(child => child._type === 'span')
            .map(span => span.text)
            .join('')
          : 'No title'
      }
    }
  }
}
