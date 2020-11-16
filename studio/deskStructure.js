import S from '@sanity/desk-tool/structure-builder'

const hiddenDocTypes = listItem =>
  !['project', 'about', 'general'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Projects')
        .schemaType('project')
        .child(S.documentTypeList('project').title('Projects')),
      S.listItem()
        .title('About')
        .child(
          S.editor()
            .id('about')
            .schemaType('about')
            .documentId('about')
        ),
      S.listItem()
        .title('General')
        .child(
          S.editor()
            .id('general')
            .schemaType('general')
            .documentId('general')
        ),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
