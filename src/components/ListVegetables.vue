<template>
  <div>
    <br><br>
    <input v-model="search" type="text" placeholder="search">
    <button v-if="status === 0" @click="searchName()">Search</button>
    <button v-if="status === 1" @click="closeSearch()">Cancel</button>
    <br><br>List Vegetables<br><br>
    <table class="table table-bordered">
      <thead>
        <th scope="col">#</th>
        <th scope="col">ดูข้อมูล</th>
        <th scope="col">ชื่อผัก</th>
        <th scope="col">ราคา / ขีด</th>
        <th scope="col">จำนวนคงเหลือทั้งหมด (ขีด)</th>
        <th scope="col">จำนวนที่ซื้อ</th>
      </thead>
      <!-- don't search -->
      <tbody v-if="status === 0">
        <tr v-for="(item, index) in list" :key="index" scope="row">
          <td>{{ index+1 }}</td>
          <button @click="checkInfo(item.id)">Info</button>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.inventories }}</td>
          <td>
            <button id="btn" @click="decreaseInCart(index)">-</button>
            <input type="number" v-model="v[index]">
            <button id="btn1" @click="addInCard(index)">+</button>
          </td>
        </tr>
      </tbody>

      <!-- search -->
      <tbody v-if="status === 1">
        <tr scope="row">
          <td>1</td>
          <button @click="checkInfo(this.item[0].id)">Info</button>
          <td>{{ this.item[0].name }}</td>
          <td>{{ this.item[0].price }}</td>
          <td>{{ this.item[0].inventories }}</td>
          <!-- <td>
            <button id="btn" @click="decreaseInCart()">-</button>
            <input type="number" v-model="v[0]">
            <button id="btn1" @click="addInCard()">+</button>
          </td> -->
        </tr>
      </tbody>
    </table>
    <div class="sumary">
      <label for="price" class="summary-1">ราคารวม : {{ price }} บาท</label>
      <b-button class="summary-1">Card</b-button>
      <b-button class="summary-1" @click="buy()">Buy</b-button>
    </div>
  </div>
</template>

<script>
import ItemApi from '@/store/ItemApi'
import OrderApi from '@/store/OrderApi'
import ItemService from '../services/ItemService';

export default {
  data(){
    return{
      list:[],
      v:[],
      price:0,
      search: '',
      status: 0,
      item: ''
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
    async buy(){
      // add item to order table
      let tmp = []
      for(let i=0;i < this.v.length;i++){
        if(this.v[i] !== 0){
          let data = this.list[i].name + " : " + this.v[i] + " ขีด"
          tmp.push(data)
        }
      }
      let payload = {
        user_id: 1,
        text: tmp.join(),
        amount: this.price,
        status: "รอชำระเงิน"
      }
      await OrderApi.dispatch('addData',payload)
      
      // update data in item table
      let value = []
      for(let i=0;i < this.v.length;i++){
        if(this.v[i] !== 0){
          let data = {
            id: this.list[i].id,
            val:this.v[i]
          }
          value.push(data)
        }
      }
      for(let i=0;i < value.length;i++){
        payload = {
          id: value[i].id,
          name: this.list[value[i].id - 1].name,
          price: this.list[value[i].id - 1].price,
          inventories: this.list[value[i].id - 1].inventories - value[i].val,
          total_sales: this.list[value[i].id - 1].total_sales + value[i].val
        }
        await OrderApi.dispatch('editData',payload)
      }
      location.reload()
    },
    addInCard(index){
        this.price += this.list[index].price
        this.v[index] += 1
    },
    decreaseInCart(index){
        this.price -= this.list[index].price
        this.v[index] -= 1
    },
    checkInfo(id){
      this.$router.push({name : 'Information',params:{ id }})
    },
    async searchName(){
      this.status = 1
      let res = await ItemService.searchName(this.search)
      this.item = res
    },
    closeSearch(){
      this.status = 0
      this.search = ''
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sumary{
  display: flex;
  justify-content:right;
  align-items: center;
  margin-right: 10px;
}
</style>
