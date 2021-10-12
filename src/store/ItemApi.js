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
    // edit(state,index,data){ 
    //   state.data[index].name = data.name 
    //   state.data[index].name_jp = data.name_jp
    //   state.data[index].pokemos_types = data.pokemon_types 
    //   state.data[index] = data
    // }
  },
  actions: {
    async fetchData({ commit }) {
      // let headers = AuthService.getApiHeader()
      let res = await Axios.get(api_endpoint + "/api/items")
      commit('fetch', { res })
    },
    // async addData({ commit }, payload) {
    //   let url = api_endpoint + "/rewards"
    //   let body = {
    //     item: payload.item,
    //     points: payload.points,
    //     amounts: payload.amounts
    //   }
    //   try {
    //     let headers = AuthService.getApiHeader()
    //     let res = await Axios.post(url, body, headers)
    //     if (res.status === 200) {
    //       commit('add', res.data)
    //       return {
    //         success: true,
    //         data: res.data
    //       }
    //     } else {
    //       console.error(res)
    //       return {
    //         success: false,
    //         message: "Unknown status code: " + res.status
    //       }
    //     }
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
    // },
    // async editDataInStock({ commit }, payload) {
    //   let url = api_endpoint + "/rewards/" + payload.id
    //   let body = {
    //     item: payload.item,
    //     points: payload.points,
    //     amounts: payload.amounts
    //   }
    //   let headers = AuthService.getApiHeader()
    //   let res = await Axios.put(url, body, headers) // edit data in DB โดยการ put ผ่าน url & body
    //   if (res.status === 200) { // เช็คว่าบันทึกลง DB เรียบร้อย
    //     // commit('edit',payload.index,res.data)
    //     // ใช้วืธี load หน้าใหม่เพื่อ update state จะดีกว่า
    //   } else {
    //     console.error(res)
    //   }
    // }
  },
  modules: {
  }
})
