<template>
  <main class="project" :style="cssVars">
    <CanvasFullPage id="project" :color="drawingColor" class="canvas" />
    <div class="project-content">
      <figure v-if="image" class="project-image">
        <SanityImage :image="image" />
        <figcaption>{{ image.caption }}</figcaption>
      </figure>
      <div class="project-text">
        <h1 class="project-title">
          {{ title }}
        </h1>
        <Date :rawDate="publishedAt" yearonly />
        <div class="project-lead" v-if="lead">
          <p>{{ lead }}</p>
        </div>
      </div>
      <div class="project-gallery">
        <Content v-if="content" :sections="content" />
      </div>
    </div>
  </main>
</template>

<script>
import BlockContent from 'sanity-blocks-vue-component'
import groq from 'groq'
import sanityClient from '~/sanityClient'
import SanityImage from '~/components/SanityImage'
import Content from '~/components/Content'
import CanvasFullPage from '~/components/CanvasFullPage'
import Date from '~/components/Date'

const query = groq`
  *[_type == "project" && slug.current == $slug] {
    ...,
    projects[] {
      project-> {
        ...,
        image {
          ...,
          asset->
        },
        content
      }
    }
  }[0]
`

export default {
  components: {
    BlockContent,
    SanityImage,
    Content,
    CanvasFullPage,
    Date
  },
  async asyncData({ params }) {
    return await sanityClient.fetch(query, params)
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
  head() {
    return {
      title: 'Renate Thor: ' + this.title,
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
      this.$store.commit('setColors', this.colors)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.project {
  &-content {
    position: relative;
    z-index: 10;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 2rem;
    color: var(--color-text);
    padding: 0 var(--spacing-m);
    align-items: center;
  }
  &-image {
    grid-column: 1 / span 6;

    img {
      width: 100%;
    }
  }
  &-text {
    grid-column: 7 / span 6;
  }
  &-title {
    font-size: var(--font-l);
    font-family: var(--sans-serif);
    margin: 0 0 4rem;
  }
  &-gallery {
    grid-column: 1 / span 12;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 2rem;
  }
}
@keyframes fadeDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
