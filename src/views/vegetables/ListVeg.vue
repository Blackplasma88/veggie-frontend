<template>
  <div>
    <head-bar></head-bar>
    <list-veg-page></list-veg-page>
  </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import ListVegPage from '@/components/ListVegPage.vue'
import AuthUser from "@/store/AuthUser"

export default {
  components: {
    HeadBar,
    ListVegPage
  },
  created(){
      if (!AuthUser.getters.isAuthen) {
        swal('Please login','','error')
        this.$router.push("/login");
    }
    console.log(AuthUser.getters.user.status)
  }
}
</script>
