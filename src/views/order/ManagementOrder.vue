<template>
    <div>
        <head-bar></head-bar>
        <order-manage></order-manage>
    </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import OrderManage from '@/components/officer/OrderManage.vue'
    export default {
        components:{
            HeadBar,
            OrderManage
        }
    }
</script>

<style lang="scss" scoped>

</style>