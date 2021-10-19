<template>
    <div>
        <head-bar></head-bar>
        <order-manage></order-manage>
    </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import AuthUser from "@/store/AuthUser"
import OrderManage from '@/components/officer/OrderManage.vue'
    export default {
        components:{
            HeadBar,
            OrderManage
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