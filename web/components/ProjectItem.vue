<template>
  <li class="project" :style="cssVars">
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
  padding: .4rem;

  a {
    text-decoration: none;
    color: inherit;
  }
  &-image {
    margin: 0;
    height: 80vh;

    img {
      height: 80vh;
      width: auto;
    }
  }
  &-text {
    color: var(--text-color);

    p {
      margin: 0;
    }
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
