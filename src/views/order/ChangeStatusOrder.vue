<template>
    <div>
        <head-bar></head-bar>
        <change-status-order></change-status-order>
    </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import AuthUser from "@/store/AuthUser"
import ChangeStatusOrder from '@/components/officer/ChangeStatusOrder.vue'
    export default {
        components:{
            HeadBar,
            ChangeStatusOrder
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