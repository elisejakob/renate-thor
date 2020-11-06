<template>
  <li class="project">
    <div class="content">
      <SanityImage v-if="project.image" :image="project.image" />
      <h3>
        <nuxt-link :to="{ path: `/projects/${project._id}` }">{{
          project.title || 'Undefined title'
        }}</nuxt-link>
        {{ project.subhead }}
      </h3>
      <p>
        {{ project.summary }}
      </p>
    </div>
  </li>
</template>
<script>
import SanityImage from '~/components/SanityImage'

export default {
  components: { SanityImage },
  props: {
    project: {
      type: Object,
      default() {},
      project: {
        summary: {
          type: String,
          default: 'Missing summary'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.project {
  font-size: 1rem;

  h3 {
    font-size: 1rem;
  }
}
</style>
