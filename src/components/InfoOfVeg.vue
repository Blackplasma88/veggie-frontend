<template>
    <div>
        <h1>{{ item.name }}</h1>
        <label for="">Name: {{ item.name }}</label><br>

        <label v-if="this.edit === 1" for="price">Price</label>
        <input v-if="this.edit === 1" v-model="form.price" type="number">
        <label v-if="this.edit === 0" for="">Price: {{ item.price }}</label><br>

        <label v-if="this.edit === 1" for="inventories">Inventories</label>
        <input v-if="this.edit === 1" v-model="form.inventories" type="number">
        <label v-if="this.edit === 0" for="inventories">Inventories: {{ item.inventories }}</label><br><br>

        <button v-if="this.edit === 0" @click="openForm()">Edit</button>
        <button v-if="this.edit === 1" @click="editVeggie()">Confirm</button>
        <button v-if="this.edit === 1" @click="closeForm()">Cancel</button>
        <button @click="deleteVeggie()">Delete</button><br><br><br>
    </div>
</template>

<script>
import ItemService from '@/services/ItemService'
import ItemApi from '@/store/ItemApi'
    export default {
        data(){
            return{
                form:{
                    value: 0,
                    price: 0,
                    inventories:0
                },
                item: '',
                // id: 0,
                edit: 0,
                // list: [],
                // v: [],
                // index: 0,
                // price: 0
            }
        },
        async created(){
            this.id = parseInt(this.$route.params.id) 
            var item = await ItemService.getItemById(this.id)
            this.item = item.data

            // storage item
            // this.list = JSON.parse(localStorage.getItem('list'))

            // set index for add v
            // let x = this.list.findIndex(x => x.name === this.item.name)
            // this.index = x

            // load v 
            // this.v = Array(this.list.length).fill(0) 
            // this.v = JSON.parse(localStorage.getItem('v'))

            // set data
            // this.price = JSON.parse(localStorage.getItem('price'))
            // this.form.value = this.v[this.index]
            // console.log('v: ',this.v)
            // console.log('id: ',this.id)
            // console.log('value: ',this.form.value)
            // console.log('price: ',this.price)
        },
        methods:{
            openForm(){
                this.edit = 1
                let clone = JSON.parse(JSON.stringify(this.item))
                this.form.price = clone.price
                this.form.inventories = clone.inventories
            },
            closeForm(){
                this.edit = 0
            },
            async editVeggie(){
                let payload = {
                    id: this.id,
                    name: this.item.name,
                    price: this.form.price,
                    inventories: this.form.inventories,
                    total_sales: this.item.total_sales
                }
                let res = await ItemApi.dispatch('editVeggie',payload)
                if(res.success){
                    this.closeForm()
                    alert('edit complete')
                    this.item = payload
                }
            },
            async deleteVeggie(){
                let res = await ItemApi.dispatch('deleteVeggie', this.id)
                if(res.success){
                    alert('delete complete')
                    this.$router.push('/')
                }
            },
            // increase(){
            //     if(this.form.value + 1 <= this.item.inventories){
            //         this.form.value +=1
            //         this.v[this.index] += 1
            //         document.getElementById('deBtn').disabled = false
            //     }
            //     else{
            //         document.getElementById('inBtn').disabled = true
            //     }
            // },
            // decrease(){
            //     if(this.form.value - 1 >= 0){
            //         this.form.value -=1
            //         this.v[this.index] -= 1
            //         document.getElementById('inBtn').disabled = false
            //     }
            //     else{
            //         document.getElementById('deBtn').disabled = true
            //     }
            // },
            // async addOrder(){
            //     this.price += this.form.value * this.item.price
            //     localStorage.setItem('price',JSON.stringify(this.price))
            //     localStorage.setItem('v',JSON.stringify(this.v))
            //     this.$router.push("/")
            //     console.log(this.v)
            // }
        }
    }
</script>

<style lang="scss" scoped>

</style>