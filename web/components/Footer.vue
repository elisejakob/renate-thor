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
  </footer>
</template>

<script>
import BlockContent from 'sanity-blocks-vue-component'

export default {
  components: {
    BlockContent
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
footer {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-m) var(--spacing-l);
  flex-wrap: wrap;
  position: relative;
  z-index: 12;

  .contact {
    display: block;
    font-size: var(--font-m);
  }

  .credit {
    width: 100%;
    margin-top: 1rem;
    opacity: .4;
  }
}
</style>
