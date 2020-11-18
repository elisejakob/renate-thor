<template>
  <div>
    <Canvas />
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Canvas from '~/components/Canvas.vue'

export default {
  components: {
    Header,
    Footer,
    Canvas
  }
}
</script>
