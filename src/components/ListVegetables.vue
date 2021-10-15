<template>
  <div>
    List Vegetables
    <b-button class="success" @click="addItem()">Add Item</b-button>
    <table class="table table-bordered">
      <thead>
        <th scope="col">#</th>
        <th scope="col">ดูข้อมูล</th>
        <th scope="col">ชื่อผัก</th>
        <th scope="col">ราคา / ขีด</th>
        <th scope="col">จำนวนคงเหลือทั้งหมด</th>
        <th scope="col">จำนวนที่ซื้อ / ขีด</th>
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
            <button @click="increase(index)">+</button>
            <button @click="decrease(index)">-</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="sumary">
      <label for="price" class="summary-1">ราคารวม : {{ price }} บาท</label>
      <b-button class="summary-1" @click="cart()">Card</b-button>
      <b-button class="summary-1" @click="buy()">Buy</b-button>
    </div>
  </div>
</template>

<script>
import ItemApi from '@/store/ItemApi'
import OrderApi from '@/store/OrderApi'

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
      // let res = await OrderApi.dispatch('addData',payload)
      
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
          inventories: this.list[value[i].id - 1].inventories - ( value[i].val * 100 ),
          total_sales: this.list[value[i].id - 1].total_sales + value[i].val
        }
        // let res = await OrderApi.dispatch('editData',payload)
      }

    },
    async cart(){
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
      let res = await OrderApi.dispatch('addData',payload)
      if(res.success) {
        this.$router.push('/cart')
      }
    },
    increase(index){
      this.price += this.list[index].price
      this.v[index] += 1
    },
    decrease(index){
      this.price -= this.list[index].price
      this.v[index] -= 1
    },
    addItem(){
      this.$router.push('/add-item')
    },
    checkInfo(id){
      this.$router.push({name : 'Information',params:{ id }})
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
