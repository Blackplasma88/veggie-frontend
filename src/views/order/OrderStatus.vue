<template>
  <div>
    <head-bar></head-bar>
    <order-list></order-list>
  </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import AuthUser from "@/store/AuthUser"
import OrderList from '@/components/OrderList.vue'

export default {
  components: {
    HeadBar,
    OrderList
  },
  created(){
      if (!AuthUser.getters.isAuthen) {
        swal('Please login','','error')
        this.$router.push("/login");
    }
  }
}
</script>
