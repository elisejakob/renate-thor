export default {
  name: 'about',
  type: 'document',
  title: 'About',
  fields: [
    {
      name: 'lead',
      type: 'text',
      title: 'Lead'
    },
    {
      name: 'body',
      type: 'bodyPortableText',
      title: 'Body'
    },
    {
      name: 'clients',
      type: 'bodyPortableText',
      title: 'Clients'
    },
    {
      name: 'exhibitions',
      type: 'bodyPortableText',
      title: 'Exhibitions'
    },
    {
      name: 'colors',
      type: 'palette'
    }
  ],
  preview: {
    select: {
      body: 'body'
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
