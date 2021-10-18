import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import AuthService from '@/services/AuthService'

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
    edit(state, index, data) {
      state.data[index].name = data.name
      state.data[index].name_jp = data.name_jp
      state.data[index].pokemos_types = data.pokemon_types
      state.data[index] = data
    }
  },
  actions: {
    async fetchData({ commit }) {
      let headers = AuthService.getApiHeader()
      let res = await Axios.get(api_endpoint + "/api/orders", headers)
      commit('fetch', { res })
    },
    async addData({ commit }, payload) {
      let headers = AuthService.getApiHeader()
      let url = api_endpoint + "/api/orders"
      let body = {
        user_id: payload.user_id,
        data: payload.text,
        amount: payload.amount,
        status: payload.status,
      }
      //   try {
      // let headers = AuthService.getApiHeader()
      console.log(body)
      let res = await Axios.post(url, body, headers)
      if (res.statusText === "Created") {
        return {
          success: true,
          data: res.data
        }
      } else {
        console.error(res)
        return {
          success: false,
          message: "Unknown status code: " + res.status
        }
      }
      //   } catch (e) {
      //     if (e.response.status === 403) {
      //       console.error(e.response.data.message)
      //       return {
      //         success: false,
      //         message: e.response.data.message
      //       }
      //     } else {
      //       return {
      //         success: false,
      //         message: "Unknown error: " + res.response.data
      //       }
      //     }
      //   }
    },
    async editData({ commit }, payload) {
      let headers = AuthService.getApiHeader()
      let url = api_endpoint + "/api/orders/" + payload.id
      let body = {
        id: payload.id,
        status: payload.order.status
      }
      let res = await Axios.put(url, body, headers)
      if (res.status === 200) {
        return {
          success: true,
          data: res.data
        }
      } else {
        console.error(res)
      }
    },
    async deleteOrder({ commit }, payload) {
      let url = api_endpoint + '/api/orders/' + payload
      let res = await Axios.delete(url)
      if (res.status === 200) {
        return {
          success: true
        }
      }
    }
  },
  //   modules: {
  //   }
})
