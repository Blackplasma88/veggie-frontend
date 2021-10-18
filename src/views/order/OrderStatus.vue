<template>
  <div>
    <head-bar></head-bar>
    <order-list></order-list>
  </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import OrderList from '@/components/OrderList.vue'

export default {
  components: {
    HeadBar,
    OrderList
  }
}
</script>
