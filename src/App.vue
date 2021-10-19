<template>
  <div id="app" class="main">
    <div class="story">
          <router-view/>
    </div>
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
* {
  box-sizing: border-box;
}

.main{
    background: url(assets/images/bg-3.jpg)no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100%;
    background-position: 50% 50%;
}
</style>
