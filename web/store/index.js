import sanityClient from '~/sanityClient'

export const state = () => ({
  color: null,
  theme: 'light',
  global: {}
})

export const mutations = {
  setColor(state, color) {
    state.color = color
  },
  setTheme(state, theme) {
    state.theme = theme
  },
  setGlobal(state, global) {
    state.global = global
  }
}

export const actions = {
  async nuxtServerInit ({ commit }) {
    const query = `
      *[_id == "general"][0] {
        footer
      }
    `
    await sanityClient.fetch(query).then(response => {
      commit('setGlobal', response)
    });
  }
}
