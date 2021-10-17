<template>
  <div>
    <head-bar></head-bar>
    <list-vegetables></list-vegetables>
  </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import ListVegetables from '@/components/ListVegetables.vue'

export default {
  components: {
    HeadBar,
    ListVegetables
  }
}
</script>
