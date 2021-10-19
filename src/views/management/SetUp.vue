<template>
    <div class="bg">
        <head-bar></head-bar>
        <b-button @click="prepaid(50)">50</b-button>
        <b-button @click="prepaid(100)">100</b-button><br>
        <b-button @click="prepaid(500)">500</b-button><br>
        <b-button @click="prepaid(1000)">1000</b-button><br>
        <b-button variant="success" @click="deposit()">เติมเงิน</b-button>
    </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import AuthUser from "../../store/AuthUser"
import UserApi from '../../store/UserApi'
import swal from 'sweetalert'
    export default {
        components: {
            HeadBar
        },
        data(){
            return{
                user: '',
                role: ''
            }
        },
        created(){
            this.fetchData()
        },
        methods:{
            fetchData(){
                this.user = AuthUser.getters.user
                this.role = AuthUser.getters.user.role
            },
            manage() {
                this.$router.push('/manage-user')
            },
            async prepaid(amount){
                let payload = {
                    id: this.user.id,
                    name: this.user.name,
                    email: this.user.email,
                    address: this.user.address,
                    tell: this.user.tell,
                    balance_amount: this.user.balance_amount += amount,
                    role: this.user.role,
                    status: 'AUTHORIZE'
                }
                let res = await UserApi.dispatch('prepaid',payload)
                if(res.success){
                    console.log(res.data)
                    swal('prepaid complete','','success')
                    AuthUser.dispatch('setData',res.data)
                    let x = JSON.parse(localStorage.getItem('auth-user'))
                    x.user.balance_amount += amount
                    localStorage.setItem('auth-user',JSON.stringify(x))
                    this.fetchData()
                }
            }
            // deposit(){
                
            // }
        }
    }
</script>

<style scoped lang='scss'>
@import '@/assets/cardCss.scss';
.bg{
    background:#88D5D5;
    height: 100%;
    background-repeat: repeat;
    background-size: cover;
}
</style>