<template>
  <main class="project" :style="cssVars">
    <CanvasFullPage id="project" :color="drawingColor" class="canvas" v-if="imagesLoaded" />
    <div class="project-content">
      <figure v-if="image" class="project-image">
        <SanityImage :image="image" />
        <figcaption>{{ image.caption }}</figcaption>
      </figure>
      <div class="project-text">
        <h1 class="project-title">
          {{ title }}
        </h1>
        <!--<div class="project-lead" v-if="lead">
          <p>{{ lead }}</p>
        </div>-->
      </div>
    </div>
    <div class="project-details">
      <div class="project-description">
        <BlockContent v-if="description" :blocks="description" />
      </div>
      <div class="project-meta">
        Year: <Date :rawDate="publishedAt" yearonly />
        <BlockContent v-if="meta" :blocks="meta" />
      </div>
    </div>
    <div class="project-gallery">
      <Content v-if="content" :sections="content" />
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
          asset->,
          "ogimage": asset->url
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
    },
    imagesLoaded() {
      if (this.content && (this.$store.state.imagesLoaded.length === this.content.length)) {
        return true
      }
      return false
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
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.title + ' | Renate Thor'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.lead
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.image.ogimage
        }
      ]
    }
  },
  mounted() {
    if (this.colors && this.colors.darkColor && this.colors.lightColor) {
      this.$store.commit('setColors', this.colors)
    }
  },
  destroyed() {
    this.$store.commit('emptyImagesLoaded')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.project {
  padding-top: 1rem;
  color: var(--color-text);
  max-width: 1400px;
  &-content {
    position: relative;
    z-index: 10;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 2rem;
    padding: 0 var(--spacing-m);
    align-items: center;
  }
  &-image {
    grid-column: 1 / span 8;
    align-self: flex-start;
    margin-bottom: 2rem;

    img {
      width: 100%;
    }
  }
  &-text {
    grid-column: 9 / span 4;
    margin-bottom: 2rem;
  }
  &-title {
    font-size: var(--font-l);
    margin: 0;
  }
  &-details {
    padding: 0 var(--spacing-l);
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 2rem;
    margin: 0 auto 2rem;
  }
  &-meta {
    grid-column: 1 / span 4;
    opacity: .6;
    font-size: var(--font-s);
    order: 1;
  }
  &-description {
    grid-column: 5 / span 8;
    order: 2;
  }
  &-gallery {
    padding: 0 var(--spacing-m);
    position: relative;
    z-index: 1;
  }
}
@keyframes fadeDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 1200px) {
  .project-details, .project-content {
    display: block;
    padding: 0 2rem;
  }
  .project-meta {
    margin: 1rem 0;
  }
  .project {
    padding-bottom: 8rem;
  }
}
@media (max-width: 800px) {
  .project-details, .project-content {
    display: block;
    padding: 0 1rem;
  }
  .project-meta {
    margin: 1rem 0;
  }
  .project {
    padding-bottom: 8rem;
    &-title {
      font-size: var(--font-m);
    }
  }
  .project-gallery {
    width: 100%;
  }
}
</style>
