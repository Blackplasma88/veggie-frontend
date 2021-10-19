<template>
    <div>
        <head-bar></head-bar>
        <user-manage></user-manage>
    </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import AuthUser from "@/store/AuthUser"
import UserManage from '@/components/admin/UserManage.vue'

    export default {
        components:{
            HeadBar,
            UserManage
        },
  created(){
      if (!AuthUser.getters.isAuthen) {
        swal('Please login','','error')
        this.$router.push("/login");
    }else if(AuthUser.getters.user.role !== 'ADMIN'){
        swal('You can\'t access this','','error')
        this.$router.push("/");
    }
  }
    }
</script>

<style lang="scss" scoped>

</style>