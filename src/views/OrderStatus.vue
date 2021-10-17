<template>
  <div>
    <head-bar></head-bar>
    <list-orders></list-orders>
  </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import ListOrders from '@/components/ListOrders.vue'

export default {
  name: 'Home',
  components: {
    HeadBar,
    ListOrders
  }
}
</script>
