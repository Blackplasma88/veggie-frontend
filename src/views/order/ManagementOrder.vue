<template>
    <div>
        <head-bar></head-bar>
        <management-orders></management-orders>
    </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import ManagementOrders from '@/components/officer/ManagementOrders.vue'

    export default {
        components:{
            HeadBar,
            ManagementOrders
        }
    }
</script>

<style lang="scss" scoped>

</style>