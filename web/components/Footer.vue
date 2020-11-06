<template>
  <footer>
    <a href="mailto:renatethor@gmail.com" target="_blank">renatethor@gmail.com</a>
  </footer>
</template>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
footer {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  padding-bottom: 10rem;

  a {
    grid-column: span 4;
    font-size: 1.6rem;
    font-family: $sans-serif;
  }
}
</style>
