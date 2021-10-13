<template>
    <div>
        <h1>Create Veggie</h1>
        <div>
            <!-- <input class="form" type="file" @change="processFile"> -->

            <div>   
                <label for="name">Name: </label><br>
                <input type="text" v-model="form.name">
            </div>

            <div>
                <br><br>
                <label for="inventories">Inventories: </label>
                <input type="number" v-model="form.inventories" min="0.25">
                <label for="price">Price: </label>
                <input type="number" v-model="form.price" min="0.25">
            </div>

            <br><br>
            <button @click="addVeggie">ADD VEGGIE</button>

        </div>
    </div>
</template>

<script>
import ItemApi from '@/store/ItemApi'
export default {
    data(){
        return {
            form:{
                name: '',
                price: 0,
                inventories: 0,
                total_sales: 0
            }
        }
    },
    methods:{
        async addVeggie(){
            let payload = {
                name: this.form.name,
                inventories: this.form.inventories,
                price: this.form.price,
                total_sales: 0
            }
            let res = await ItemApi.dispatch('addVeggie',payload)
            // if(res.success){
                alert('add veggie complete')
                this.$router.push("/")
            // }
        }
    }
}
</script>

<style>

</style>