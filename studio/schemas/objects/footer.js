export default {
  name: 'footer',
  type: 'object',
  title: 'Footer',
  description: 'Content that is displayed on the bottom of every page.',
  fields: [
    {
      name: 'email',
      type: 'string',
      title: 'E-mail address'
    },
    {
      name: 'instagram',
      type: 'string',
      title: 'Instagram username'
    },
    {
      name: 'credit',
      type: 'bioPortableText',
      title: 'Credits'
    }
  ]
}