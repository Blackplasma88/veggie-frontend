<template>
    <div>
        <head-bar></head-bar>
        <create-vegetable></create-vegetable>
    </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import AuthUser from "@/store/AuthUser";
import CreateVegetable from '@/components/CreateVegetable'
export default {
    components:{
        HeadBar,
        CreateVegetable
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

<style>

</style>