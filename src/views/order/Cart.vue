<template>
  <div>
    <head-bar></head-bar>
    <cart-order></cart-order>
  </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import CartOrder from '@/components/CartOrder.vue'

export default {
  name: 'Home',
  components: {
    HeadBar,
    CartOrder
  }
}
</script>

<style scoped lang="scss">

</style>