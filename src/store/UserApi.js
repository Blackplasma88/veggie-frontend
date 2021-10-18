import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import AuthService from '@/services/AuthService'

let api_endpoint = "http://localhost:8000"
const auth_key = "auth-user"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data:[]
  },
  getters:{
    data: (state) => state.data // ส่ง state แล้ว return data เพื่อเอาข้อมูลไปใช้งาน
  },
  mutations: {
    fetch(state,{res}){ 
      state.data = res.data
    },
    add(state,payload){ // ถ้าไม่ใส่ {} เราสามารถตั้งชื่อไม่เหมือนเดิมได้
      state.data.push(payload)
    },
//     edit(state,index,data){ // แก้ไขข้อมูลใน state
//       // state.data[index].name = data.name // เราต้องเอาค่า index มาด้วยเพื่อให้รู้ส่าจะแก้ที่ตัวไหน
//       // state.data[index].name_jp = data.name_jp
//       // state.data[index].pokemos_types = data.pokemon_types 
//       state.data[index] = data
//     }
  },
  actions: {
    async fetchData({ commit }){ 
      let headers = AuthService.getApiHeader()
      let res = await Axios.get(api_endpoint+"/api/users",headers) 
      commit('fetch',{res})  
    },
    // async addData({commit},payload){
    //   let url = api_endpoint + "/rewards" 
    //   let body = { 
    //     item: payload.item,
    //     points: payload.points,
    //     amounts: payload.amounts
    //   }
    //   try{
    //     let headers = AuthService.getApiHeader()
    //   let res = await Axios.post(url,body,headers) 
    //   if(res.status === 200){ 
    //     commit('add',res.data) 
    //     return {
    //       success: true,
    //       data: res.data
    //     }
    //   }else{
    //     console.error(res)
    //     return {
    //       success: false,
    //       message: "Unknown status code: " + res.status 
    //     }
    //   }
    //  }catch(e){
    //    if(e.response.status === 403){
    //      console.error(e.response.data.message)
    //      return {
    //       success: false,
    //       message: e.response.data.message
    //     }
    //    }else{
    //     return {
    //       success: false,
    //       message: "Unknown error: " + res.response.data
    //     }
    //    }
    //  }
    // },
    async editData({commit},payload){
        let headers = AuthService.getApiHeader()
      let url = api_endpoint + "/api/users/" + payload.id 
      let body = {  
        id: payload.id,
        name: payload.name,
        email: payload.email,
        balance_amount:payload.balance_amount,
        role: payload.role
      }
      let res = await Axios.put(url,body,headers) 
      if(res.status === 200){
          let res = await Axios.get(url,headers)
          localStorage.setItem(auth_key, "{\"user\":" + JSON.stringify(res.data) + ",\"token\":\"" + 
            AuthService.getJwt() + "\"}") 
        return {
            success: true,
            data: res.data
        }
      }else{
        console.error(res)
      }
    }
  },
  modules: {
  }
})
