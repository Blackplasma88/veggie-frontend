<template>
  <div>
    <head-bar></head-bar>
    <list-veg-page></list-veg-page>
  </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import ListVegPage from '@/components/ListVegPage.vue'

export default {
  components: {
    HeadBar,
    ListVegPage
  }
}
</script>
