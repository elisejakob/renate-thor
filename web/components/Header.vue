<template>
  <header :style="cssVars">
    <h1 class="site-title">
      <nuxt-link to="/" class="home">Renate Thor</nuxt-link>
    </h1>
    <nav>
      <nuxt-link to="/projects">Work</nuxt-link>
      <a href="https://renatethor.bigcartel.com/" target="_blank">Shop</a>
      <nuxt-link to="/about">About</nuxt-link>
      <a href="/" class="contact"><div class="icon"></div></a>
      <a href="/" class="contact"><div class="icon"></div></a>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    cssVars() {
      if (this.colors && this.colors.bgColor && this.colors.textColor) {
        return {
          '--bg-color': this.colors.bgColor.hex,
          '--text-color': this.colors.textColor.hex,
        }
      }
      return {
        '--bg-color': '#fff',
        '--text-color': this.$store.state.color,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
header {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-m) var(--spacing-l);
  position: relative;
  z-index: 3;
  color: var(--text-color);

  .site-title {
    font-family: var(--sans-serif);
    font-size: 1rem;
    margin: 0;
  }
  a {
    display: inline-block;
    color: inherit;
    text-decoration: none;
  }
  nav a {
    margin-left: 2rem;
    transition: all .24s ease;
    position: relative;

    &.contact {
      padding: .4rem 0;
      vertical-align: middle;
      .icon {
        background: var(--text-color);
        width: .8rem;
        height: .8rem;
        border-radius: 50%;
      }
    }

    &:after {
      content: "";
      position: absolute;
      left: 2%;
      bottom: 0;
      width: 96%;
      height: 4px;
      background: var(--text-color);
      opacity: 0;
      transform: translateY(10px);
      transition: all .1s;
    }

    &:hover {
      color: inherit;
      &:after {
        opacity: 1;
        transform: translateY(4px);
        transition: all .3s;
      }
    }

    &.nuxt-link-active {
      color: inherit;
      &:hover {
        color: inherit;
      }
      &:after {
        opacity: 1;
        transform: translateY(4px);
        transition: all .3s;
      }
    }
  }
}
</style>
