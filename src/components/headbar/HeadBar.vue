<template>
  <div>
    <b-navbar type="dark" variant="primary">
      <b-navbar-brand>LOGO</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/">List Vegetables</b-nav-item>
          <b-nav-item href="/menu">Food menu</b-nav-item>
          <b-nav-item-dropdown text="Order">
            <b-dropdown-item href="/cart">Cart</b-dropdown-item>
            <b-dropdown-item href="/orders">Order Status</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Management" v-if="user.role === 'OFFICER'">
            <b-dropdown-item href="/manage-orders">order</b-dropdown-item>
            <b-dropdown-item href="/manage-veg">vegetables</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item href="/setup">Set up</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" align="right">
          <b-nav-item-dropdown right text="User">
            <b-dropdown-item href="/profile" v-if="isLogin === true">Profile</b-dropdown-item>
            <b-dropdown-item class="summary-1" href="/login" v-if="isLogin === false"
              >Login</b-dropdown-item
            >
            <b-dropdown-item class="summary-1" href="/register" v-if="isLogin === false"
              >Register</b-dropdown-item
            >
            <b-dropdown-item class="summary-1" href="/logout" v-if="isLogin === true"
              >Logout</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <label for="balance_amount">Amount: {{ user.balance_amount }}</label>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import AuthUser from "@/store/AuthUser"
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
    console.log('user: ',this.user)
    console.log('isLogin: ',this.isLogin)
  },
};
</script>

<style lang="scss" scoped></style>
