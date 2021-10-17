<template>
    <div>
        <head-bar></head-bar>
        <div>
            <label for="name">Name : {{ profile.name }}</label>
        </div>
        <div>
            <label for="email">NamEmaile : {{ profile.email }}</label>
        </div>
        <div>
            <label for="create">Created at : {{ profile.created_at }}</label>
        </div>
        <div>
            <label for="balance">Balance : {{ profile.balance_amount }}</label>
        </div>
    </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import AuthService from "@/services/AuthService"
    export default {
        components: {
            HeadBar
        },
        data(){
            return{
                profile:""
            }
        },
        created(){
            this.profile= AuthService.getUser()
        }
    }
</script>

<style lang="scss" scoped>

</style>