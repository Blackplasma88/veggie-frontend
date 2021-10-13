<template>
  <div>
    <list-orders></list-orders>
  </div>
</template>

<script>
// @ is an alias to /src
import ListOrders from '@/components/ListOrders.vue'

export default {
  name: 'Home',
  components: {
    ListOrders
  }
}
</script>
