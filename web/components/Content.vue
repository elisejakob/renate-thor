<template>
  <div class="content">
    <VueMasonryWall :items="sections" :options="options">
      <template v-slot:default="{item}">
        <ImageWithCaption :image="item" v-if="item._type == 'mainImage'" />
        <RichText :content="item" v-if="item._type == 'richText'" />
      </template>
    </VueMasonryWall>
  </div>
</template>

<script>
import VueMasonryWall from "vue-masonry-wall";
import ImageWithCaption from "~/components/ImageWithCaption.vue"
import RichText from "~/components/RichText.vue"

export default {
  props: {
    sections: Array
  },
  components: {
    VueMasonryWall,
    ImageWithCaption,
    RichText
  },
  data() {
    return {
      options: {
        width: 600,
        padding: {
          default: 20,
          1: 20,
          2: 20
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  max-width: 100%;
  grid-column: 1 / span 12;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 2rem;

  div {
    grid-column: span 12;
  }
}
@media (max-width: 1200px) {
  .content {
    display: block;
  }
}
</style>
