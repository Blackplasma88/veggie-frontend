<template>
    <div>
        <h1>{{ item.name }}</h1>
        <label for="">Name: {{ item.name }}</label><br>
        <label for="">Price: {{ item.price }}</label><br>
        <label for="">Inventories: {{ item.inventories }}</label><br><br>

        <button @click="deleteVeggie()">Delete</button>
    </div>
</template>

<script>
import ItemService from '../services/ItemService'
import ItemApi from '@/store/ItemApi'
    export default {
        data(){
            return{
                item: '',
                id: 0
            }
        },
        async created(){
            this.id = parseInt(this.$route.params.id) 
            var item = await ItemService.getItemById(this.id)
            this.item = item.data
        },
        methods:{
            async deleteVeggie(){
                let res = await ItemApi.dispatch('deleteVeggie', this.id)
                if(res.success){
                    alert('delete complete')
                    this.$router.push('/')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>