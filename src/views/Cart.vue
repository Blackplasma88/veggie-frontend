<template>
  <div>
    <head-bar></head-bar>
    <order-in-cart></order-in-cart>
  </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import OrderInCart from '@/components/OrderInCart.vue'

export default {
  name: 'Home',
  components: {
    HeadBar,
    OrderInCart
  }
}
</script>
