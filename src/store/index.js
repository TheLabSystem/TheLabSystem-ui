import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    noticeTitle: '',
    noticeContent: ''
  },
  getters: {
    getUser (state) {
      return state.user
    },

  },
  mutations: {
    changeUser (state, user) {
      state.user = user
    },
    changeNotice (state, notice) {
      const { title, content } = notice
      if (title || title === '') state.noticeTitle = title
      if (content || content === '') state.noticeContent = content
    }
  },
  actions: {
  },
  modules: {
  }
})
