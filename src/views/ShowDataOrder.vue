<template>
    <div>
        <head-bar></head-bar>
        <show-data-order></show-data-order>
    </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import AuthUser from "@/store/AuthUser"
import ShowDataOrder from '@/components/ShowDataOrder'
export default {
    components:{
        HeadBar,
        ShowDataOrder
    },
  created(){
      if (!AuthUser.getters.isAuthen) {
        swal('Please login','','error')
        this.$router.push("/login");
    }
  }
}
</script>

<style>

</style>