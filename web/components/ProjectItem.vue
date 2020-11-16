<template>
  <li class="project" :style="cssVars">
    <figure class="project-image">
      <SanityImage v-if="project.image" :image="project.image" />
    </figure>
    <div class="project-text">
      <h3>
        <nuxt-link :to="{ path: `/projects/${project._id}` }">
          {{ project.title }}
        </nuxt-link>
      </h3>
      <p v-if="project.lead">
        {{ project.lead }}
      </p>
    </div>
  </li>
</template>
<script>
import SanityImage from '~/components/SanityImage'

export default {
  components: { SanityImage },
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
  background: var(--bg-color);
  padding: 1rem;

  a {
    text-decoration: none;
    color: inherit;
  }
  &-image {
    margin: 0;
    width: 60%;
  }
  &-text {
    color: var(--text-color);
  }

  &:nth-child(odd) {
    .project-image {
      order: 2;
    }
    .project-text {
      order: 1;
    }
  }
}
</style>
