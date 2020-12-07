<template>
  <main class="about" :style="cssVars">
    <CanvasFullPage id="about" :color="drawingColor" class="canvas" />
    <div class="about-content">
      <p class="lead">{{ lead }}</p>
      <Content v-if="content" :sections="content" />
    </div>
  </main>
</template>

<script>
import sanityClient from '~/sanityClient'
import Content from '~/components/Content'
import CanvasFullPage from '~/components/CanvasFullPage'
import BlockContent from 'sanity-blocks-vue-component'

const query = `
  *[_id == "about"][0] {
    lead,
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
    CanvasFullPage
  },
  computed: {
    cssVars() {
      if (this.colors && this.colors.darkColor && this.colors.lightColor) {
        return {
          '--bg-color': this.colors.darkColor.hex,
          '--text-color': this.colors.lightColor.hex,
        }
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

  &-content {
    position: relative;
    z-index: 10;
  }
}
</style>
