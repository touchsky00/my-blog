import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
    changeUserInfo(state, playload) {
      state.userInfo = playload;
    }
  },
  actions: {
    setUserInfo({commit}, playload) {
      commit('changeUserInfo',playload)
    }
  },
  modules: {
  }
})
