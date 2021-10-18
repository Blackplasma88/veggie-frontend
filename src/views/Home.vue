<template>
    <div>
        <head-bar></head-bar>
        <start></start>
        <veg-pop></veg-pop>
        <food-pop></food-pop>
    </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import Start from '@/components/public/Start'
import VegPop from '@/components/public/VegPop'
import FoodPop from '@/components/public/FoodPop'
    export default {
        components: {
            HeadBar,
            Start,
            VegPop,
            FoodPop
        }
    }
</script>

<style lang="scss" scoped>

</style>