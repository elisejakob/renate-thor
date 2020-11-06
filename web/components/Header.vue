<template>
  <header>
    <h1 class="site-title">
      <nuxt-link to="/" class="home">Renate Thor</nuxt-link>
    </h1>
    <nav>
      <nuxt-link to="/projects">Work</nuxt-link>
      <nuxt-link to="/">Shop</nuxt-link>
      <nuxt-link to="/about">About</nuxt-link>
      <nuxt-link to="/">Contact</nuxt-link>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
header {
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;

  .site-title {
    font-family: $sans-serif;
    font-weight: 400;
    font-size: $font-l;
    margin: 0;
    line-height: 1;
  }
  a {
    display: inline-block;
    color: inherit;
    text-decoration: none;
  }
  nav a {
    margin-left: 2rem;
    transition: all .24s ease;
    font-size: $font-m;

    &:hover {
      color: inherit;
    }

    &.nuxt-link-active {
      color: inherit;
      &:hover {
        color: inherit;
      }
    }
  }
}
</style>
