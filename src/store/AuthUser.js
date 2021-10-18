import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from '@/services/AuthService'

Vue.use(Vuex)

const auth_key = "auth-user"
let auth_service = JSON.parse(localStorage.getItem(auth_key))

const initialState = { 
    user: auth_service ? auth_service.user: "",
    jwt: auth_service ? auth_service.jwt: "",
    isAuthen: auth_service ? true: false
}

export default new Vuex.Store({
  state: initialState,
  mutations: {
    editSuccess(state, user){
      state.user = user
      state.isAuthen = true
    },
    loginSuccess(state, user, jwt){
      state.user = user
      state.jwt = jwt
      state.isAuthen = true
    },
    logoutSuccess(state){
      state.user = ""
      state.jwt = ""
      state.isAuthen = false
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      let res = await AuthService.login({email, password})
      if(res.success){
        commit('loginSuccess', res.user, res.jwt)
      }
      return res
    },
    async register({ commit }, payload) {
      let res = await AuthService.register(payload)
      if(res.success){
        commit('loginSuccess', res.user, res.jwt)
      }
      return res
    },
    async editProfile({commit},payload){
      let res = await AuthService.editProfile(payload)
      if(res.success){
        commit('editSuccess', res.data)
        return {
          success: true,
          data: res.data
        }
      }
    },
    async logout(){
        AuthService.logout()
        this.commit('logoutSuccess')
        return {
          success: true,
      }
    },
    async authorize({commit},payload){
      let res = await AuthService.authorize(payload)
      if(res.success){
        return {
          success: true
        }
      }
    },
  },
  getters: {
    user: (state) => state.user,
    jwt: (state) => state.jwt,
    isAuthen: (state) => state.isAuthen
  },
  modules: {
  }
})
