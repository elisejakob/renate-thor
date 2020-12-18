<template>
  <main>
    <ProjectList v-if="projects" :projects="projects" />
  </main>
</template>

<script>
import sanityClient from '~/sanityClient'
import ProjectList from '~/components/ProjectList'

const query = `
  {
    "projects": *[_type == "project"] | order(publishedAt desc),
    "about": *[_id == "about"][0] {
      lead
    }
  }
`

export default {
  components: { ProjectList },
  async asyncData() {
    return await sanityClient.fetch(query)
  },
  head() {
    return {
      title: 'Renate Thor: Projects',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.about.lead
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Projects | Renate Thor'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.lead
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.$store.state.global.ogimage
        }
      ]
    }
  },
  mounted() {
    this.$store.commit('setColors', this.$store.state.global.colors)
  }
}
</script>

