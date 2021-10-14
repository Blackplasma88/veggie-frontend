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
        <tr v-for="(it, index) in item" :key="index" scope="row">
          <td>{{ index+1 }}</td>
          <button @click="checkInfo(it.id)">Info</button>
          <td>{{ it.name }}</td>
          <td>{{ it.price }}</td>
          <td>{{ it.inventories }}</td>
          <td>
            <button id="btn" @click="decreaseInCart(listIndex[index],index)">-</button>
            <input type="number" v-model="v[listIndex[index]]">
            <button id="btn1" @click="addInCard(listIndex[index],index)">+</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="sumary">
      <label for="price" class="summary-1">ราคารวม : {{ price }} บาท</label>
      <b-button class="summary-1" @click="buy(1)">Card</b-button>
      <b-button class="summary-1" @click="buy(2)">Buy</b-button>
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
      item: [],
      listIndex: [],
      price:0,
      search: '',
      status: 0,
    }
  },
  created(){
    this.fetchData()
  },
  methods:{
    async fetchData(){
      await ItemApi.dispatch('fetchData')
      this.list = ItemApi.getters.data.data
      this.v = Array(this.list.length).fill(0) 
    },
    setData(){
      this.v = Array(this.list.length).fill(0)
      this.item = []
      this.listIndex = []
      this.price = 0
      this.search = ''
      this.status = 0
    },
    async buy(check){
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
        status: (check === 1) ? "รอชำระเงิน":'กำลังจัดส่ง'
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
          inventories: this.list[value[i].id - 1].inventories,
          total_sales: this.list[value[i].id - 1].total_sales + value[i].val
        }
        await ItemApi.dispatch('editVeggie',payload)
      }
      alert('Buy complete')
      this.fetchData()
      this.setData()
    },
    addInCard(index,index_1){
        // update in item
        this.item[index_1].inventories -= 1
        // update in list
        this.list[index].inventories -=1
        this.price += this.list[index].price
        this.v[index] += 1
    },
    decreaseInCart(index,index_1){
      // update in item
        this.item[index_1].inventories += 1
        // update in list
        this.list[index].inventories +=1
        this.price -= this.list[index].price
        this.v[index] -= 1
    },
    checkInfo(id){
      this.$router.push({name : 'Information',params:{ id }})
    },
    async searchName(){
      this.listIndex = []
      this.status = 1
      let res = await ItemService.searchName(this.search)
      this.item = res
      for(let i = 0; i< this.item.length; i++){
        let x = this.list.findIndex(x => x.name === this.item[i].name)
        this.listIndex.push(x)
      }
    },
    closeSearch(){
      this.listIndex = []
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