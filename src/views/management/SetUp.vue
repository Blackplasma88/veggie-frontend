<template>
    <div>
        <head-bar></head-bar>
        <b-button variant="success" v-if="role === 'ADMIN'" @click="manage()">Manage User</b-button><br>
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
            manage() {
                this.$router.push('/manage-user')
            },
            deposit(){
                
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>