import sanityClient from '~/sanityClient'

export const state = () => ({
  colors: {},
  theme: 'light',
  global: {},
  imagesLoaded: []
})

export const mutations = {
  setColors(state, colors) {
    state.colors = colors
  },
  setTheme(state, theme) {
    state.theme = theme
  },
  setGlobal(state, global) {
    state.global = global
  },
  setImagesLoaded(state, image) {
    state.imagesLoaded.push(image)
  },
  emptyImagesLoaded(state) {
    state.imagesLoaded = []
  }
}

export const actions = {
  async nuxtServerInit ({ commit }) {
    const query = `
      *[_id == "general"][0] {
        footer,
        colors,
        "ogimage": ogimg.asset->url
      }
    `
    await sanityClient.fetch(query).then(response => {
      commit('setGlobal', response)
    });
  }
}
