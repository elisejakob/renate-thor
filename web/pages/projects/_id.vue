<template>
  <main class="project" :style="cssVars">
    <h1 class="project-title">
      {{ title }}
    </h1>
    <div class="project-lead">
      <p class="lead">{{ lead }}</p>
    </div>
    <figure v-if="image" class="project-image">
      <SanityImage :image="image" />
      <figcaption>{{ image.caption }}</figcaption>
    </figure>
    <div class="project-content">
      <BlockContent
        :blocks="description"
        v-if="description"
      />
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
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.project {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 2rem;
  background: var(--bg-color);
  color: var(--text-color);
  &-title {
    grid-column: 1 / span 12;
    font-size: $font-l;
    font-family: $sans-serif;
    margin: 0 0 4rem;

    opacity: 0;
    transform: translateY(-20px);
    animation: fadeDown .8s ease;
    animation-fill-mode: forwards;
  }
  &-subhead,
  &-type {
    opacity: .3;
  }
  &-lead {
    grid-column: 1 / span 6;
  }
  &-image {
    grid-column: 7 / span 6;
    padding-top: .6rem;

    img {
      width: 100%;
    }
  }
  &-content {
    grid-column: 1 / span 12;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 2rem;

    p, div {
      grid-column: span 6;
    }
  }
}
@keyframes fadeDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
