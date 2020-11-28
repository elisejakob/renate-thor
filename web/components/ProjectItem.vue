<template>
  <li class="project" :style="cssVars">
    <Canvas :id="project._id" :color="project.colors.textColor.hex" class="canvas" />
    <figure class="project-image">
      <SanityImage v-if="project.image" :image="project.image" />
    </figure>
    <div class="project-text">
      <h2>
        <nuxt-link :to="{ path: `/projects/${project._id}` }">
          {{ project.title }}
        </nuxt-link>
      </h2>
      <p v-if="project.lead">
        <!--{{ project.lead }}-->
        En kortere tekst enn lorem ipsum som var lagt inn før. Renate har lovet å gjøre leksa si.
      </p>
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
      if (this.project.colors && this.project.colors.bgColor && this.project.colors.textColor) {
        return {
          '--bg-color': this.project.colors.bgColor.hex,
          '--text-color': this.project.colors.textColor.hex,
        }
      }
      return {
        '--bg-color': '#fff',
        '--text-color': '#000',
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.project {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 6px solid var(--text-color);
  grid-column: span 12;
  position: relative;

  a {
    text-decoration: none;
    color: inherit;
  }
  &-image {
    margin: 0;
    height: 80vh;
    position: relative;
    z-index: 12;

    img {
      height: 80vh;
      width: auto;
    }
  }
  &-text {
    color: var(--text-color);
    padding: var(--spacing-s);
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

  &:nth-child(odd) {
    grid-column: span 6;
    .project-image {
      order: 2;
    }
    .project-text {
      order: 1;
    }
  }
}
</style>
