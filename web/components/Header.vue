<template>
  <header :style="cssVars">
    <h1 class="site-title">
      <nuxt-link to="/" class="home">
      Renate Thor
        <!--<img src="/title.svg" alt="Renate Thor" class="logo" />-->
      </nuxt-link>
    </h1>
    <nav>
      <nuxt-link to="/projects">Work</nuxt-link>
      <a href="https://renatethor.bigcartel.com/" target="_blank">Shop</a>
      <nuxt-link to="/about">About</nuxt-link>
      <a :href="`mailto:${$store.state.global.footer.email}?subject=🔴🔴🔴`" target="_blank" class="contact"><div class="icon email"></div></a>
      <a :href="`https://instagram.com/${$store.state.global.footer.instagram}`" target="_blank" class="contact"><div class="icon instagram"></div></a>
      <a class="contact theme" @click="changeTheme()"><div class="icon"></div></a>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    cssVars() {
      if (this.$store.state.theme === 'dark') {
        if (this.$store.state.colors.darkColor) {
          return {
            '--color-text': this.$store.state.colors.darkColor.hex
          }
        }
      } else {
        if (this.$store.state.colors.lightColor) {
          return {
            '--color-text': this.$store.state.colors.lightColor.hex
          }
        }
      }
    }
  },
  methods: {
    changeTheme: function() {
      document.body.classList.toggle('dark');
      if (this.$store.state.theme === 'light') {
        this.$store.commit('setTheme', 'dark');
      } else {
        this.$store.commit('setTheme', 'light');
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
  color: var(--color-text);

  .site-title {
    font-family: var(--sans-serif);
    font-size: 1rem;
    margin: 0;
    transition: all .24s ease;
    &:hover {
      color: var(--color-hover);
    }
    .logo {
      width: 36rem;
      position: absolute;
      top: -.5rem;
      left: -.5rem;
    }
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
        background: var(--color-text);
        width: .8rem;
        height: .8rem;
        border-radius: 50%;
        transition: all .24s ease;
      }
      &:hover {
        .icon {
          background: var(--color-hover);
        }
      }
    }

    &.theme {
      cursor: pointer;

      .icon {
        background: linear-gradient(90deg, var(--color-text) 50%, transparent 51%);
        width: .8rem;
        height: .8rem;
        border-radius: 50%;
        border: 4px solid var(--color-text);
        transition: all .24s ease;
      }
      &:hover {
        .icon {
          background: linear-gradient(90deg, var(--color-hover) 50%, transparent 51%);
          width: .8rem;
          height: .8rem;
          border-radius: 50%;
          border: 4px solid var(--color-hover);
          transition: all .24s ease;
        }
      }
    }

    &:after {
      content: "";
      position: absolute;
      left: 2%;
      bottom: 0;
      width: 96%;
      height: 4px;
      background: var(--color-text);
      opacity: 0;
      transform: translateY(10px);
      transition: all .1s;
    }

    &:hover {
      color: var(--color-hover);
      &:after {
        opacity: 1;
        transform: translateY(4px);
        transition: all .3s;
        background: var(--color-hover);
      }
    }

    &.nuxt-link-active {
      &:after {
        opacity: 1;
        transform: translateY(4px);
        transition: all .3s;
      }
    }
  }
}
</style>
