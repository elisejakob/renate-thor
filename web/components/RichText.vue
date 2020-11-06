<template>
  <div class="richtext">
     <BlockContent
        :blocks="content.body"
        :v-if="content.body"
      />
  </div>
</template>

<script>
import BlockContent from 'sanity-blocks-vue-component'

export default {
  props: {
    content: Object
  },
  components: {
    BlockContent
  }
}
</script>

<style lang="scss">
.richtext {
  margin: 0 auto 7rem;
  width: 100%;
  max-width: 36rem;

  h1, h2, h3, h4, h5, h6 {
    margin-top: 5rem;
    &:first-child {
      margin-top: 0;
    }
  }

  p {
    margin-bottom: .75rem;
  }

  ul {
    font-family: 'Montserrat', sans-serif;
    list-style: square;
    li {
      margin-bottom: .75rem;
    }
  }
}
</style>
