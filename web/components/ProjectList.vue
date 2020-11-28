<template>
  <ul class="project-list">
    <ProjectItem
      v-for="(project, index) in projects"
      class="project"
      :project="project"
      :index="index"
      :key="index"
    />
  </ul>
</template>
<script>
import ProjectItem from '~/components/ProjectItem'

export default {
  components: {
    ProjectItem
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
  padding: 0 var(--spacing-m);
  list-style: none;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: var(--spacing-m);
}
</style>
