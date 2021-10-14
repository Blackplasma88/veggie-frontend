import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

// const api_endpoint = "http://localhost:8000"
const api_endpoint = "http://127.0.0.1:8000"

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
      state.data[index] = data
    },
    delete(state,payload){
      state.data.splice(payload,1)
    }
  },
  actions: {
    async fetchData({ commit }) {
      let res = await Axios.get(api_endpoint + "/api/items")
      commit('fetch', { res })
    },
    async addVeggie({commit},payload){
      let url = api_endpoint + '/api/items'
      let body = {
        name: payload.name,
        inventories: payload.inventories,
        price: payload.price,
        total_sales: payload.total_sales
      }
      let res = await Axios.post(url, body)
      if(res.status === 200){
        commit('add',payload)
        return{
          success: true
        }
      }
    },
    async editVeggie({ commit }, payload) {
      let url = api_endpoint + "/api/items/" + payload.id
      let body = {
        id: payload.id,
        name: payload.name,
        price: payload.price,
        inventories: payload.inventories,
        total_sales: payload.total_sales
      }
      console.log(body)
      let res = await Axios.put(url, body) // edit data in DB โดยการ put ผ่าน url & body
       if (res.status === 200) { // เช็คว่าบันทึกลง DB เรียบร้อย
        commit('edit',payload.id,res.data)
         // ใช้วืธี load หน้าใหม่เพื่อ update state จะดีกว่า
       } else {
         console.error(res)
       }
    },
    async deleteVeggie({commit},payload){
      let url = api_endpoint + '/api/items/'+ payload
      let res = await Axios.delete(url)
      if(res.status === 200){
        // commit("delete",payload)
        console.log('delete complete')
        return {
          success: true
        }
      }
    },
    // async addData({ commit }, payload) {
    //   let url = api_endpoint + "/api/items"
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
    async editVeggie({ commit }, payload) {
      let url = api_endpoint + "/api/items/" + payload.id
      let body = {
        name: payload.name,
        price: payload.price,
        inventories: payload.inventories,
        total_sales: payload.total_sales
      }
      let res = await Axios.put(url, payload) // edit data in DB โดยการ put ผ่าน url & body
      if (res.status === 200) { // เช็คว่าบันทึกลง DB เรียบร้อย
        // commit('edit',payload.index,res.data)
        return {
          success: true
        }
      } 
      else {
        console.error(res)
      }
    }
  },
  modules: {
  }
})
