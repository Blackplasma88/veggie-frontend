<template>
  <div>
    <head-bar></head-bar>
    <!-- <list-vegetables></list-vegetables> -->
    <list-veg-page></list-veg-page>
  </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import ListVegetables from '@/components/ListVegetables.vue'
import ListVegPage from '@/components/ListVegPage.vue'

export default {
  components: {
    HeadBar,
    ListVegetables,
    ListVegPage
  }
}
</script>
