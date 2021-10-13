<template>
    <div>
        <h1>{{ item.name }}</h1>
        <label for="">Name: {{ item.name }}</label><br>
        <label for="">Price: {{ item.price }}</label><br>
        <label for="">Inventories: {{ item.inventories }}</label><br><br>

        <button v-if="this.edit === 0" @click="openForm()">Edit</button>
        <button v-if="this.edit === 1" @click="editVeggie()">Confirm</button>
        <button v-if="this.edit === 1" @click="closeForm()">Cancel</button>
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
                id: 0,
                edit: 0
            }
        },
        async created(){
            this.id = parseInt(this.$route.params.id) 
            var item = await ItemService.getItemById(this.id)
            this.item = item.data
        },
        methods:{
            openForm(){
                this.edit = 1
            },
            closeForm(){
                this.edit = 0
            },
            async editVeggie(){
                let payload = {
                    id: this.id,
                    name: this.item.name,
                    price: this.item.price,
                    inventories: this.item.inventories,
                    total_sales: this.item.total_sales
                }
            },
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