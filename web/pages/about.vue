<template>
  <main class="about">
    <p class="lead">{{ lead }}</p>
    <BlockContent v-if="body" :blocks="body" :serializers="serializers" />
    <Content v-if="content" :sections="content" />
  </main>
</template>

<script>
import sanityClient from '~/sanityClient'
import EventBlock from '~/components/blockContent/EventBlock'
import Content from '~/components/Content'
import BlockContent from 'sanity-blocks-vue-component'

const query = `
  *[_id == "about"][0] {
    lead,
    body[] {
      ...,
      children[] {
        ...,
        event->
      }
    },
    content
  }
`
export default {
  components: {
    BlockContent,
    Content
  },
  data() {
    return {
      serializers: {
        types: {
          eventReference: EventBlock
        }
      }
    }
  },
  async asyncData() {
    return await sanityClient.fetch(query)
  },
  head() {
    return {
      title: 'Renate Thor: About',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.lead
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.about {
  padding: var(--spacing-m);
}
</style>
