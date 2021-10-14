<template>
  
</template>

<script>
import AuthUser from "@/store/AuthUser"
export default {
    methods: {
        async logout(){
            let res = await AuthUser.dispatch('logout')
            if(res.success){
                this.$router.push('/login')
            }
        }
    },
    async created(){ 
        this.logout()
    }
}
</script>

<style>

</style>