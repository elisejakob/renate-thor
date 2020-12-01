<template>
  <li class="project" :style="cssVars">
    <div class="project-content">
      <Canvas :id="project._id" :color="drawingColor" class="canvas" />
      <figure class="project-image">
        <nuxt-link :to="{ path: `/projects/${project._id}` }">
          <SanityImage v-if="project.image" :image="project.image" />
        </nuxt-link>
      </figure>
      <div class="project-text">
        <h2>
          {{ project.title }}
        </h2>
        <p v-if="project.lead">
          <!--{{ project.lead }}-->
          En kortere tekst enn lorem ipsum som var lagt inn før. Renate har lovet å gjøre leksa si.
        </p>
      </div>
    </div>
  </li>
</template>
<script>
import Canvas from '~/components/Canvas'
import SanityImage from '~/components/SanityImage'

export default {
  components: {
    Canvas,
    SanityImage
  },
  props: {
    project: Object
  },
  computed: {
    cssVars() {
      if (this.project.colors && this.project.colors.darkColor && this.project.colors.lightColor) {
        return {
          '--bg-color': this.project.colors.darkColor.hex,
          '--text-color': this.project.colors.lightColor.hex,
        }
      }
      return {
        '--bg-color': '#fff',
        '--text-color': '#000',
      }
    },
    drawingColor() {
      if (this.project.colors && this.project.colors.lightColor) {
        return this.project.colors.lightColor.hex
      }
      return '#000'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.project {
  width: 66%;
  padding: var(--spacing-s);
  display: flex;
  align-items: stretch;

  &-content {
    display: flex;
    justify-content: space-between;
    border: 6px solid var(--text-color);
    position: relative;
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
    flex: 1;
  }
  &-text {
    color: var(--text-color);
    padding: 1.2rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h2 {
      font-size: var(--font-m);
    }

    p {
      margin: 0;
      font-size: var(--font-s);
    }
  }

  img {
    display: block;
  }

  &:nth-child(odd) {
    width: 33%;
    .project-content {
      flex-direction: column;
    }
    .project-image {
      order: 2;
    }
    .project-text {
      order: 1;

      p {
        display: none;
      }
    }
  }
}
</style>
