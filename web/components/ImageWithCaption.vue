<template>
  <figure class="journal-image">
    <SanityImage :image="image" />
    <figcaption>{{ image.caption }}</figcaption>
  </figure>
</template>

<script>
import SanityImage from '~/components/SanityImage'

export default {
  props: {
    image: Object
  },
  components: {
    SanityImage
  }
}
</script>

<style lang="scss" scoped>
.journal-image {
  img {
    width: 100%;
  }
}
</style>