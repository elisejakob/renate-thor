<template>
  <li class="project" :style="cssVars" :class="classes">
    <div class="project-content">
      <Canvas v-if="ready" :id="project._id" :color="drawingColor" class="canvas" />
      <!--<SanityImage v-if="project.image" :image="project.image" class="project-image" />-->
      <figure class="project-image">
        <nuxt-link :to="{ path: `/projects/${project.slug.current}` }">
        <img v-if="project.image" :src="imageUrl" @load="ready = true" />
          <!--<SanityImage v-if="project.image" @load="ready = true" :image="project.image" />-->
        </nuxt-link>
      </figure>
      <div class="project-text">
        <h2>
          {{ project.title }}
        </h2>
        <p v-if="project.lead">
          {{ project.lead }}
        </p>
      </div>
    </div>
  </li>
</template>
<script>
import Canvas from '~/components/Canvas'
import sanityClient from '~/sanityClient'
import imageUrlBuilder from '@sanity/image-url'
const builder = imageUrlBuilder(sanityClient)

export default {
  components: {
    Canvas
  },
  props: {
    project: Object
  },
  data() {
    return {
      ready: false
    }
  },
  computed: {
    columns() {
      if (this.project.columns) {
        return 'column-' + this.project.columns
      }
    },
    classes() {
      if (this.project.landscape && this.project.columns) {
        return ['landscape', this.columns]
      } else if (this.project.columns) {
        return [this.columns]
      } else if (this.project.landscape) {
        return ['landscape']
      }
    },
    cssVars() {
      if (this.project.colors && this.project.colors.darkColor && this.project.colors.lightColor) {
        if (this.$store.state.theme === 'dark') {
          return {
            '--color-text': this.project.colors.darkColor.hex,
          }
        }
        return {
          '--color-text': this.project.colors.lightColor.hex,
        }
      }
    },
    drawingColor() {
      if (this.project.colors && this.project.colors.lightColor) {
        if (this.$store.state.theme === 'dark') {
          return this.project.colors.darkColor.hex
        }
        return this.project.colors.lightColor.hex
      }
      return '#000'
    },
    imageUrl: function() {
      return builder
        .image(this.project.image)
        .auto('format')
        .fit('max')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.project {
  width: 100%;
  padding: var(--spacing-s);
  display: flex;
  align-items: stretch;
  text-align: left;

  &-content {
    display: flex;
    justify-content: space-between;
    border: 6px solid var(--color-text);
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
  &-image {
    margin: 0;
    position: relative;
    z-index: 12;
    flex: none;
    width: 50%;
    a {
      height: 100%;
      width: 100%;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }
  &-text {
    color: var(--color-text);
    padding: 1.2rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h2 {
      font-size: var(--font-m);
      margin: 0 0 .6rem;
    }

    p {
      margin: 0;
      font-size: var(--font-s);
    }
  }

  img {
    display: block;
  }

  &.column-1 {
    width: 33%;
  }
  &.column-2 {
    width: 66%;
  }
  &.column-3 {
    width: 99%;
  }

  &:nth-of-type(odd) {
    .project-image {
      order: 2;
    }
    .project-text {
      order: 1;
    }
  }

  &.landscape {
    .project-content {
      flex-direction: column;
    }
    .project-image {
      order: 2;
      max-width: none;
      width: 100%;
      a {
        height: auto;
        width: 100%;

        img {
          height: auto;
          width: 100%;
          object-fit: cover;
          object-position: 50% 50%;
        }
      }
    }
    .project-text {
      order: 1;
    }

    &:nth-of-type(odd) {
      .project-image {
        order: 1;
      }
      .project-text {
        order: 2;
      }
    }
  }
}
@media (max-width: 1200px) {
  .project {
    &.column-1 {
      width: 50%;
      .project-content {
        flex-direction: column !important;
        .project-image {
          width: 100%;
        }
      }
    }
    &.column-2 {
      width: 50%;
      .project-content {
        flex-direction: column !important;
      }
      .project-image {
        width: 100%;
      }
    }
    &.column-3 {
      width: 100%;
    }
    .project-image {
      order: 1 !important;
    }
    .project-text {
      order: 2 !important;
    }
    &:nth-of-type(even) {
      .project-image {
        order: 2 !important;
      }
      .project-text {
        order: 1 !important;
      }
    }
  }
}
@media (max-width: 800px) {
  .project {
    width: 100% !important;
    flex-direction: row !important;
    .project-image {
      order: 1 !important;
    }
    .project-text {
      order: 2 !important;
    }
    &:nth-of-type(even) {
      .project-image {
        order: 1 !important;
      }
      .project-text {
        order: 2 !important;
      }
    }
  }
}
</style>
