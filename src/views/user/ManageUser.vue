<template>
    <div>
        <head-bar></head-bar>
        <user-manage></user-manage>
    </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import UserManage from '@/components/admin/UserManage.vue'

    export default {
        components:{
            HeadBar,
            UserManage
        }
    }
</script>

<style lang="scss" scoped>

</style>