import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null
  },
  getters: {
    getUser (state) {
      return state.user
    }
  },
  mutations: {
    changeUser (state, user) {
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
