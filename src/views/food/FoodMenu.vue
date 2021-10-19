<template>
    <div>
        <head-bar></head-bar>
        Menu
    </div>
</template>

<script>
import AuthUser from "@/store/AuthUser"
import HeadBar from '@/components/headbar/HeadBar'
    export default {
        components: {
            HeadBar
        },
  created(){
      if (!AuthUser.getters.isAuthen) {
        swal('Please login','','error')
        this.$router.push("/login");
    }
  }
    }
</script>

<style lang="scss" scoped>

</style>