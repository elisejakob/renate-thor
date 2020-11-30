<template>
  <main class="project" :style="cssVars">
    <figure v-if="image" class="project-image">
      <SanityImage :image="image" />
      <figcaption>{{ image.caption }}</figcaption>
    </figure>
    <div class="project-text">
      <h1 class="project-title">
        {{ title }}
      </h1>
      <div class="project-lead">
        <p>{{ lead }}</p>
      </div>
    </div>
    <div class="project-content">
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

const query = groq`
  *[_type == "project" && _id == $id] {
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
    Content
  },
  async asyncData({ params }) {
    return await sanityClient.fetch(query, params)
  },
  computed: {
    cssVars() {
      if (this.colors && this.colors.bgColor && this.colors.textColor) {
        return {
          '--bg-color': this.colors.bgColor.hex,
          '--text-color': this.colors.textColor.hex,
        }
      }
      return {
        '--bg-color': '#fff',
        '--text-color': '#000',
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
    if (this.colors && this.colors.bgColor && this.colors.textColor) {
      this.$store.commit('setColor', this.colors.textColor.hex)
    } else {
      this.$store.commit('setColor', '#000')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.project {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 2rem;
  color: var(--text-color);
  padding: var(--spacing-m);
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
  &-content {
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
