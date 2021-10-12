<template>
    <div>
        <h1>Info</h1>
        <label for="">Name: {{ item.name }}</label><br>
        <label for="">Price: {{ item.price }}</label><br>
        <label for="">Inventories: {{ item.inventories }}</label>
    </div>
</template>

<script>
import ItemService from '../services/ItemService'
    export default {
        data(){
            return{
                item:{}
            }
        },
        async created(){
            var id = this.$route.params.id 
            var item = await ItemService.getItemById(id)
            this.item = item.data
        },
    }
</script>

<style lang="scss" scoped>

</style>