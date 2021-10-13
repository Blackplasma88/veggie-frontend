<template>
  <div>
    <order-in-cart></order-in-cart>
  </div>
</template>

<script>
// @ is an alias to /src
import OrderInCart from '@/components/OrderInCart.vue'

export default {
  name: 'Home',
  components: {
    OrderInCart
  }
}
</script>
