<template>
  <header>
    <h1 class="site-title">
      <nuxt-link to="/" class="home">Renate Thor</nuxt-link>
    </h1>
    <nav>
      <nuxt-link to="/projects">Work</nuxt-link>
      <a href="https://renatethor.bigcartel.com/" target="_blank">Shop</a>
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
  padding: .4rem var(--spacing-m);

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
