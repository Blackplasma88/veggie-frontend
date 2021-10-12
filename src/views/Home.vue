<template>
  <div>
    <list-vegetables></list-vegetables>
  </div>
</template>

<script>
// @ is an alias to /src
import ListVegetables from '@/components/ListVegetables.vue'

export default {
  name: 'Home',
  components: {
    ListVegetables
  }
}
</script>
