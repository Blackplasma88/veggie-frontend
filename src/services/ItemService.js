import Axios from 'axios'
import AuthService from '@/services/AuthService'

const api_endpoint = "http://localhost:8000"

export default{
    async getItemById(id){
        try{
            let headers = AuthService.getApiHeader()
            let res = await Axios.get(`${api_endpoint}/api/items/${id}`,headers)
            return res.data
        }catch(e){

        }
    },
    async searchName(name){
        let res = await Axios.get(`${api_endpoint}/api/search/${name}`)
        return res.data
    }
}