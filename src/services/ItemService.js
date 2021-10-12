import Axios from 'axios'

const api_endpoint = "http://localhost:8000"

export default{
    async getItem(){
        try{
            let res = await Axios.get(`${api_endpoint}/rewards/${id}`)
            return res.data
        }catch(e){

        }
    }
}