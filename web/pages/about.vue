<template>
  <main class="about" :style="cssVars">
    <CanvasFullPage id="about" :color="drawingColor" class="canvas" />
    <div class="about-content">
      <!--<p class="lead">{{ lead }}</p>-->
      <BlockContent v-if="body" :blocks="body" />
      <div class="about-blocks">
        <div class="clients">
          <h2>Clients</h2>
          <BlockContent v-if="clients" :blocks="clients" />
        </div>
        <div class="exhibitions">
          <h2>Exhibitions</h2>
          <BlockContent v-if="exhibitions" :blocks="exhibitions" />
        </div>
      </div>
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
    body,
    clients,
    exhibitions,
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
  padding: var(--spacing-m) var(--spacing-l) var(--spacing-xl);
  font-size: var(--font-xl);
  color: var(--text-color);

  p {
    max-width: none;
  }

  &-content {
    position: relative;
    z-index: 10;
  }
  &-blocks {
    margin-top: var(--spacing-l);
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: var(--font-m);

    h2 {
      font-size: 1em;
      text-decoration: underline;
    }
  }
}
</style>
