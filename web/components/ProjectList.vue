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
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
@media (max-width: 1200px) {
  .project-list {
    align-items: stretch;
    padding: 0 1rem 8rem;
  }
}
</style>
