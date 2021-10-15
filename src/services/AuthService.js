import Axios from 'axios'

const api_endpoint = "http://localhost:8000"
const auth_key = "auth-user" // keyName
let auth_service = JSON.parse(localStorage.getItem(auth_key))
const user = auth_service ? auth_service.user: "" 
const jwt = auth_service ? auth_service.token: ""

export default{ 
    isAuthen(){ 
        return (user !== "") && (jwt !== "") 
    },
    getApiHeader(){
        if(jwt !== ""){
            let tk = jwt.split("|")
            return{
                headers:{
                    Authorization: "Bearer " + tk[1]
                }
            }
        }
        return {}
    },
    getUser(){ 
        return user
    },
    getJwt(){
        return jwt
    },
    async login({email,password}){  
        try{ 
            let url = api_endpoint + "/api/login"
            let body = {
                email: email,
                password: password,
            }
            let res = await Axios.post(url, body) 
            if(res.status === 200){ // log in success
                localStorage.setItem(auth_key, JSON.stringify(res.data)) 
                return{
                    success: true,
                    user: res.data.user,
                    jwt: res.data.jwt
                }
            }else{
                console.log("NOT 200", res)
            }
            
        }catch(e){
            if(e.response.status === 400){
                console.error(e.response.data.message[0].messages[0].message)
                return{
                    success: false,
                    message: e.response.data.message[0].messages[0].message 
                }
            }
        }    
    },
    async register({username, email, password}){ 
        try{
            let url = `${api_endpoint}/api/register`
            let body = {
                username: payload.username,
                email: payload.email,
                password: payload.password,
                password_confirmation: payload.password_confirmation,
                // name: payload.name,
                // gender: payload.gender,
                // birthday: payload.birthday,
                // address: payload.address,
                // tell: payload.tell,
                // role: "CUSTOMER"
            }
            let res = await Axios.post(url, body)
            if(res.status === 200){
                localStorage.setItem(auth_key, JSON.stringify(res.data))
                return{
                    success: true,
                    user: res.data.user,
                    jwt: res.data.jwt
                }
            }else{
                console.log("NOT 200", res)
            }
        }catch(e){
            if(e.response.status === 400){
                console.error(e.response.data.message[0].messages[0].message)
                return{
                    success: false,
                    message: e.response.data.message[0].messages[0].message 
                }
            }else{
                return{
                    success: false,
                    message: "Unknown error: " + e.response.data
                }
            }
        }
    },
    async logout(){
        let url = api_endpoint + "/api/logout"
        let tk = jwt.split("|")
        let config = {
            headers:{
                Authorization: "Bearer " + tk[1]
            }
        }
        let res = await Axios.post(url, config)
        localStorage.removeItem(auth_key)
        return {
            success: true,
        }
    }

}