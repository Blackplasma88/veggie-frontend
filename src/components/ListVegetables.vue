<template>
  <div>
    List Vegetables
    <table class="table table-bordered">
      <thead>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Price</th>
        <th scope="col">Inventories</th>
        <th scope="col">amount</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index" scope="row">
          <td>{{ index+1 }}</td>
          <button @click="checkInfo(item.id)">Info</button>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.inventories }}</td>
          <td>
            <input type="number" v-model="v[index]">
            <button @click="addInCard(index)">+</button>
          </td>
        </tr>
      </tbody>
    </table>
    <label class="price" for="price" >ราคารวม : {{ price }}</label>
    <b-button>Card</b-button>
    <b-button @click="buy()">Buy</b-button>
  </div>
</template>

<script>
import ItemApi from '@/store/ItemApi'
export default {
  data(){
    return{
      list:[],
      v:[],
      price:0
    }
  },
  async created(){
    await ItemApi.dispatch('fetchData')
    this.list = ItemApi.getters.data.data
    for(var i in this.list){
      this.v.push(0)
    }
  },
  methods:{
    buy(){
      
    },
    addInCard(index){
      this.price += this.list[index].price
      this.v[index] += 1
    },
    checkInfo(id){
      this.$router.push({name : 'Information',params:{ id }})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
