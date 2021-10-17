<template>
    <div>
        <b-button variant="success" v-if="role === 'ADMIN'" @click="grant()">grant</b-button>
        <b-button variant="success" @click="deposit()">เติมเงิน</b-button>
    </div>
</template>

<script>
import AuthUser from "../store/AuthUser";
    export default {
        data(){
            return{
                role:""
            }
        },
        created(){
            this.role = AuthUser.getters.user.role
        },
        methods:{
            grant() {
                this.$router.push('/grant')
            },
            deposit(){
                
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>