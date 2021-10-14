<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">List Vegetables</router-link>  
      <router-link to="/cart">Cart</router-link>  
      <router-link to="/orders">Order Status</router-link>  
      <router-link to="/menu">Food menu</router-link>
      <router-link to="/profile">My</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
      <router-link to="/logout">Logout</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: #2b9fe2;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      text-decoration: none;
      border: 1px solid;
      padding: 10px;
      margin: 0px 10px;
    }
  }
}
</style>
