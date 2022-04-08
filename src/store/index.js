import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null
  },
  getters: {
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
