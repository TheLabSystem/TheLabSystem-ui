import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    noticeTitle: '',
    noticeContent: '',
    deviceTypeId: -1,
    deviceInfo: '',
    deviceStatus: 0,
    deviceNumber: 1,
    addedMoney: 0,
    newDisplayName: '',
    newPassword: '',
    deviceMoney: 0
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
    },
    changeDevice (state, device) {
      const { type_id, info, status, num, money } = device
      if (type_id || type_id === -1) state.deviceTypeId = type_id
      if (info || info === '') state.deviceInfo = info
      if (status || status === 0) state.deviceStatus = status
      if (num || num === 1) state.deviceNumber = num
      if (money || money === 0) state.deviceMoney = money

    },
    changeUserInfo (state, Info) {
      const { name, password, money } = Info
      if (name || name === '') state.newDisplayName = name
      if (password || password === '') state.newPassword = password
      if (money || money === 0) state.addedMoney = money
    }
  },
  actions: {
  },
  modules: {
  }
})
