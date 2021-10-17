<template>
    <div class="summary">
        <b-button class="summary-1" href="/">List Vegetables</b-button>
        <b-button class="summary-1" href="/cart">Cart</b-button>
        <b-button class="summary-1" href="/orders">Order Status</b-button>
        <b-button class="summary-1" href="/manage-orders">Management order</b-button>
        <b-button class="summary-1" href="/menu">Food menu</b-button>
        <b-button class="summary-1" href="/profile">My</b-button>
        <b-button class="summary-1" href="/setup">Set up</b-button>
        <b-button class="summary-1" href="/login">Login</b-button>
        <b-button class="summary-1" href="/register">Register</b-button>
        <b-button class="summary-1" href="/logout">Logout</b-button>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.sumary {
  display: flex;
  justify-content: right;
  align-items: center;
  margin-right: 10px;
}
</style>