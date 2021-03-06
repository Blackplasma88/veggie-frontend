import Axios from 'axios'

const api_endpoint = "http://127.0.0.1:8000"
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
            return{
                headers:{
                    Authorization: "Bearer " + jwt
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
            if(e.response.status === 401){
                return{
                    success: false,
                    message: "email or password incorrect"
                }
            }
            else if(e.response.status === 402){
                return{
                    success: false,
                    message: "You are banned"
                }
            }
            else{
                return{
                    success: false,
                    message: 'please fill email and password'
                }
            }
        }    
    },
    async register(payload){ 
        try{
            let url = `${api_endpoint}/api/register`
            let body = {
                name: payload.name,
                email: payload.email,
                password: payload.password,
                password_confirmation: payload.password_confirmation,
                address: payload.address,
                tell: payload.tell,
                balance_amount: 0,
                role: "CUSTOMER"
            }
            let res = await Axios.post(url, body)
            if(res.statusText === 'Created'){
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
            if(e.response.status === 422){
                return{
                    success: false,
                    message: e.response.data.errors
                }
            }
        }
    },
    async editProfile(payload){
        let headers = this.getApiHeader()
        let url = api_endpoint + "/api/users/" + payload.id
        let body = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            tell: payload.tell,
            balance_amount: payload.balance_amount,
            status: payload.status,
            role: payload.role
        }
        let res = await Axios.put(url,body,headers)
        if(res.status === 200){
            return{
                success: true
            }
        }
    },
    async logout(){
        let url = api_endpoint + "/api/logout"
        let headers = this.getApiHeader()
        let res = await Axios.post(url, "",headers)    
        localStorage.removeItem(auth_key)
        return {
            success: true,
        }
    },
    async authorize(payload){
        let headers = this.getApiHeader()
        let url = api_endpoint + '/api/users/' + payload.id
        let body = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            tell: payload.tell,
            status: payload.status,
            balance_amount: payload.balance_amount,
            role: payload.role
        }
        let res = await Axios.put(url,body,headers)
        if(res.status === 200){
            return {
            success: true
            }
        }
    },
    async getUser(id){
        let url = api_endpoint + '/api/users/' + id
        let headers = this.getApiHeader()
        let res = await Axios.get(url,headers)
        return res.data
    },
    async getUserById(id){
        try{
            let headers = this.getApiHeader()
            let res = await Axios.get(`${api_endpoint}/api/users/${id}`,headers)
            return res.data
        }catch(e){

        }
    },
}