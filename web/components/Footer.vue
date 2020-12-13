<template>
  <footer>
    <a :href="`https://instagram.com/${$store.state.global.footer.instagram}`" target="_blank" class="contact">@{{$store.state.global.footer.instagram}}</a>
    <a :href="`mailto:${$store.state.global.footer.email}?subject=🔴🔴🔴`" target="_blank" class="contact">{{$store.state.global.footer.email}}</a>
    <div class="credit">
      <BlockContent
        :blocks="$store.state.global.footer.credit"
        :v-if="$store.state.global.footer.credit"
      />
    </div>
    <div class="totop" @click="toTop()">
      To top &uarr;
    </div>
  </footer>
</template>

<script>
import BlockContent from 'sanity-blocks-vue-component'

export default {
  components: {
    BlockContent
  },
  methods: {
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
footer {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-l) var(--spacing-l) var(--spacing-m);
  flex-wrap: wrap;
  position: relative;
  z-index: 12;

  .contact {
    display: block;
    font-size: var(--font-m);
  }

  .credit {
    margin-top: 1rem;
    opacity: .4;
  }
  .totop {
    margin-top: 1rem;
    opacity: .4;
    cursor: pointer;
  }
}
</style>
