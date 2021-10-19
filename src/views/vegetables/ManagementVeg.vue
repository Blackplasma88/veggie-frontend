<template>
    <div>
        <head-bar></head-bar>
        <veg-manage></veg-manage>
    </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import AuthUser from "@/store/AuthUser"
import VegManage from '@/components/officer/VegManage.vue'

    export default {
        components:{
            HeadBar,
            VegManage
        },
    created(){
      if (!AuthUser.getters.isAuthen) {
        swal('Please login','','error')
        this.$router.push("/login");
    }else if(AuthUser.getters.user.role !== 'OFFICER'){
        swal('You can\'t access this','','error')
        this.$router.push("/");
    }
  }
    }
</script>

<style lang="scss" scoped>

</style>