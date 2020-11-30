<template>
  <div class="content">
    <div v-for="(section, index) in sections" :key="index" class="content-section">
      <ImageWithCaption :image="section" v-if="section._type == 'mainImage'" />
      <RichText :content="section" v-if="section._type == 'richText'" />
    </div>
  </div>
</template>

<script>
import ImageWithCaption from "~/components/ImageWithCaption.vue"
import RichText from "~/components/RichText.vue"

export default {
  props: {
    sections: Array
  },
  components: {
    ImageWithCaption,
    RichText
  }
}
</script>

<style lang="scss" scoped>
.content {
  grid-column: 1 / span 12;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 2rem;

  p, div {
    grid-column: span 6;
  }
}
</style>
