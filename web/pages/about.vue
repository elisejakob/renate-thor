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
      if (this.$store.state.theme === 'dark') {
        if (this.$store.state.colors.darkColor) {
          return {
            '--color-text': this.$store.state.colors.darkColor.hex
          }
        }
      } else {
        if (this.$store.state.colors.lightColor) {
          return {
            '--color-text': this.$store.state.colors.lightColor.hex
          }
        }
      }
    },
    drawingColor() {
      if (this.$store.state.theme === 'dark') {
        if (this.$store.state.colors.darkColor) {
          return this.$store.state.colors.darkColor.hex
        }
      } else {
        if (this.$store.state.colors.lightColor) {
          return this.$store.state.colors.lightColor.hex
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
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'About | Renate Thor'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.lead
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.$store.state.global.ogimage
        }
      ]
    }
  },
  mounted() {
    if (this.colors && this.colors.darkColor && this.colors.lightColor) {
      this.$store.commit('setColors', this.colors)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.about {
  padding: var(--spacing-m) var(--spacing-l) var(--spacing-xl);
  font-size: var(--font-xl);
  color: var(--color-text);
  max-width: 1400px;

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
      font-weight: inherit;
    }
  }
}
@media (max-width: 1200px) {
  .about {
    padding: 1rem 2rem 8rem;
    &-blocks {
      display: block;
      div {
        margin-bottom: 2rem;
      }
    }
  }
}
@media (max-width: 800px) {
  .about {
    padding: 1rem 1rem 8rem;
    font-size: var(--font-m);
    &-blocks {
      display: block;
      font-size: 1rem;
      div {
        margin-bottom: 2rem;
      }
    }
  }
}
</style>
