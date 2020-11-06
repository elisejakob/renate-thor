<template>
  <ul class="project-list">
    <li v-for="(project, index) in projects" class="project" :key="index">
      <nuxt-link :to="{ path: `/projects/${project._id}` }">
        <SanityImage v-if="project.image" :image="project.image" class="project-image" />
        <div class="project-text">
          <h3>{{ project.title }}</h3>
          <p>
            {{ project.summary }}
          </p>
        </div>
      </nuxt-link>
    </li>
  </ul>
</template>
<script>
import SanityImage from '~/components/SanityImage'
export default {
  components: {
    SanityImage
  },
  props: {
    projects: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.project-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 2rem;
  place-items: center;
}
.project {
  grid-column: span 4;
  padding: 2rem;

  a {
    text-decoration: none;
    color: inherit;
  }
  &-image {
    z-index: 1;
  }
  &-text {
    padding: 1.4rem;
    margin: 0;
  }
  h3 {
    font-size: 1rem;
    font-weight: 500;
  }
}
@media (min-width: $media-l) {
  .project {
    grid-column: span 3;
  }
}
@media (max-width: $media-m) {
  .project {
    grid-column: span 6;
  }
}
@media (max-width: $media-s) {
  .project {
    grid-column: span 12;
  }
}
</style>
