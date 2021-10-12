import Axios from 'axios'

const api_endpoint = "http://localhost:8000"

export default{
    async getItemById(id){
        try{
            let res = await Axios.get(`${api_endpoint}/api/items/${id}`)
            return res.data
        }catch(e){

        }
    }
}