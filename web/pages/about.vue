<template>
  <main class="about" :style="cssVars">
    <Canvas id="about" color="drawingColor" class="canvas" />
    <p class="lead">{{ lead }}</p>
    <BlockContent v-if="body" :blocks="body" :serializers="serializers" />
    <Content v-if="content" :sections="content" />
  </main>
</template>

<script>
import sanityClient from '~/sanityClient'
import EventBlock from '~/components/blockContent/EventBlock'
import Content from '~/components/Content'
import Canvas from '~/components/Canvas'
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
    content,
    colors {
      lightColor,
      darkColor
    }
  }
`
export default {
  components: {
    BlockContent,
    Content,
    Canvas
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
  computed: {
    cssVars() {
      if (this.colors && this.colors.darkColor && this.colors.lightColor) {
        return {
          '--bg-color': this.colors.darkColor.hex,
          '--text-color': this.colors.lightColor.hex,
        }
      }
      return {
        '--bg-color': '#fff',
        '--text-color': this.$store.state.color,
      }
    },
    drawingColor() {
      if (this.colors.lightColor) {
        return this.colors.lightColor.hex
      }
      return '#000'
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
  },
  mounted() {
    if (this.colors && this.colors.darkColor && this.colors.lightColor) {
      this.$store.commit('setColor', this.colors.lightColor.hex)
    } else {
      this.$store.commit('setColor', '#000')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.about {
  padding: var(--spacing-m);
  font-size: var(--font-xl);
  color: var(--text-color);
}
</style>
