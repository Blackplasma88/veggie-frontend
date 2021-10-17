<template>
    <div>
        <head-bar></head-bar>
        <manage-user></manage-user>
    </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import ManageUser from '@/components/admin/ManageUser'
    export default {
        components:{
            HeadBar,
            ManageUser
        }
    }
</script>

<style lang="scss" scoped>

</style>