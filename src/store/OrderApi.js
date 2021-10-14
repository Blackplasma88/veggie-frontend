import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const api_endpoint = "http://localhost:8000"

export default new Vuex.Store({
  state: {
    data: []
  },
  getters: {
    data: (state) => state.data
  },
  mutations: {
    fetch(state, { res }) {
      state.data = res.data
    },
    add(state, payload) {
      state.data.push(payload)
    },
    edit(state,index,data){ 
      state.data[index].name = data.name 
      state.data[index].name_jp = data.name_jp
      state.data[index].pokemos_types = data.pokemon_types 
      state.data[index] = data
    }
  },
  actions: {
    async fetchData({ commit }) {
      // let headers = AuthService.getApiHeader()
      let res = await Axios.get(api_endpoint + "/api/orders")
      commit('fetch', { res })
    },
    async addData({ commit }, payload) {
      let url = api_endpoint + "/api/orders"
      let body = { 
        user_id: payload.user_id,
        data: payload.text,
        amount: payload.amount,
        status: payload.status,
      }
      let res = await Axios.post(url, body)
      if(res.status === 200){
        commit('add', res.data)
      }
      //  try {
      //   let headers = AuthService.getApiHeader()
      //   let res = await Axios.post(url, body)
      //    if (res.status === 200) {
      //      commit('add', res.data)
      //      return {
      //        success: true,
      //        data: res.data
      //      }
      //    } else {
      //      console.error(res)
      //      return {
      //        success: false,
      //        message: "Unknown status code: " + res.status
      //      }
      //    }
      //  } catch (e) {
      //    if (e.response.status === 403) {
      //      console.error(e.response.data.message)
      //      return {
      //        success: false,
      //        message: e.response.data.message
      //      }
      //    } else {
      //      return {
      //        success: false,
      //        message: "Unknown error: " + res.response.data
      //      }
      //    }
      //  }
    },
    async deleteOrder({commit},payload){
      let url = api_endpoint + '/api/orders/' + payload
      let res = await Axios.delete(url)
      if(res.status === 200){
        return {
          success: true
        }
      }
    }
  },
//   modules: {
//   }
})
