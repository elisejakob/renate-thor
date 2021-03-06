// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// document types
import about from './documents/about'
import project from './documents/project'
import general from './documents/general'

// Object types
import mainImage from './objects/mainImage'
import richText from './objects/richText'
import palette from './objects/palette'
import footer from './objects/footer'
import bioPortableText from './objects/bioPortableText'
import bodyPortableText from './objects/bodyPortableText'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'event',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    about,
    project,
    general,

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    mainImage,
    richText,
    palette,
    footer,
    bioPortableText,
    bodyPortableText
  ])
})
