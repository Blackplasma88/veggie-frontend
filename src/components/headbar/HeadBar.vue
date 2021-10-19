<template>
  <div class="header">
    <div class="container">
    <b-navbar>
        <b-navbar-brand href="/">LOGO</b-navbar-brand>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="/list-veg">List Vegetables</b-nav-item>
            <b-nav-item href="/menu">Food menu</b-nav-item>
            <b-nav-item-dropdown text="Order">
              <b-dropdown-item href="/cart">Cart</b-dropdown-item>
              <b-dropdown-item href="/orders">Order Status</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="Management" v-if="user.role === 'OFFICER'">
              <b-dropdown-item href="/manage-orders">order</b-dropdown-item>
              <b-dropdown-item href="/manage-veg">vegetables</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item href="/manage-user" v-if="user.role === 'ADMIN'">Manage User</b-nav-item>
            <!-- <b-nav-item v-if="isLogin === true" href="/setup">Prepaid</b-nav-item> -->
            <b-nav-item-dropdown v-if="isLogin === true" right text="Prepaid">
              <b-dropdown-item @click="prepaid(50)">50</b-dropdown-item>
              <b-dropdown-item class="summary-1" @click="prepaid(100)">100</b-dropdown-item>
              <b-dropdown-item class="summary-1" @click="prepaid(500)">500</b-dropdown-item>
              <b-dropdown-item class="summary-1" @click="prepaid(1000)">1000</b-dropdown-item>
            </b-nav-item-dropdown> 
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto" align="right">
            <b-nav-item-dropdown right text="User">
              <b-dropdown-item href="/profile" v-if="isLogin === true">Profile</b-dropdown-item>
              <b-dropdown-item class="summary-1" href="/login" v-if="isLogin === false">Login</b-dropdown-item>
              <b-dropdown-item class="summary-1" href="/register" v-if="isLogin === false">Register</b-dropdown-item>
              <b-dropdown-item class="summary-1" href="/logout" v-if="isLogin === true">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser"
import UserApi from '@/store/UserApi'
export default {
  data() {
    return {
      isLogin: false,
      user: "",
    };
  },
  created() {
    this.isLogin = AuthUser.getters.isAuthen;
    this.user = AuthUser.getters.user;
  },
  methods:{
    async prepaid(amount){
      let payload = {
          id: this.user.id,
          name: this.user.name,
          email: this.user.email,
          address: this.user.address,
          tell: this.user.tell,
          balance_amount: this.user.balance_amount += amount,
          role: this.user.role,
          status: 'AUTHORIZE'
      }
      let res = await UserApi.dispatch('prepaid',payload)
      if(res.success){
          swal('prepaid complete','','success')
          AuthUser.dispatch('setData',res.data)
          let x = JSON.parse(localStorage.getItem('auth-user'))
          x.user.balance_amount += amount
          localStorage.setItem('auth-user',JSON.stringify(x))
          this.user = payload
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.header{
  background-color: #FFBED2;
}
</style>
