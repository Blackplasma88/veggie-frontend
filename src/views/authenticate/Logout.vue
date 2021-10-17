<template>
  
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import AuthUser from "@/store/AuthUser"
export default {
    components: {
            HeadBar
        },
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