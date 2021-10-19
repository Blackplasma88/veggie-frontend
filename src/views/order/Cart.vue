<template>
  <div>
    <head-bar></head-bar>
    <cart-order></cart-order>
  </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import AuthUser from "@/store/AuthUser"
import CartOrder from '@/components/CartOrder.vue'

export default {
  name: 'Home',
  components: {
    HeadBar,
    CartOrder
  },
  created(){
      if (!AuthUser.getters.isAuthen) {
        swal('Please login','','error')
        this.$router.push("/login");
    }
  }
}
</script>

<style scoped lang="scss">

</style>