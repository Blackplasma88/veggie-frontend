<template>
    <div>
        <head-bar></head-bar>
        <b-button @click="prepaid(100)">100</b-button>ิ<br>
        <b-button @click="prepaid(500)">500</b-button><br>
        <b-button @click="prepaid(1000)">1000</b-button><br>
        <b-button variant="success" @click="deposit()">เติมเงิน</b-button>
    </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import AuthUser from "../../store/AuthUser";
    export default {
        components: {
            HeadBar
        },
        data(){
            return{
                role:""
            }
        },
        created(){
            this.role = AuthUser.getters.user.role
        },
        methods:{
            deposit(){
                
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>