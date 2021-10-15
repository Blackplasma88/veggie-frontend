<template>
  <div>
    List Orders
    <table class="table table-boradered">
      <thead>
        <th scope="col">#</th>
        <th scope="col">ผู้ซื้อ</th>
        <th scope="col">ของที่ซื้อ</th>
        <th scope="col">ราคา / บาท</th>
        <th scope="col">สถานะ</th>
        <th scope="col">เช็คข้อมูล</th>
      </thead>
      <tbody>
        <tr v-for="(order, index) in list" :key="index">
            <td>{{ index+1 }}</td>
            <td>{{ order.user_id }}</td>
            <td>{{ order.data }}</td>
            <td>{{ order.amount }}</td>
            <td>{{ order.status }}</td>
            <td>
                <button>ข้อมูล</button>
                <button>ชำระเงิน</button>
                <button @click="deleteOrder(order,index)">ยกเลิก</button>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import OrderApi from "@/store/OrderApi";
export default {
  data() {
    return {
      list: [],
    };
  },
  async created() {
    await OrderApi.dispatch("fetchData");
    let tmp = OrderApi.getters.data.data;
    for(let i in tmp){
      if(tmp[i].status !== "รอชำระเงิน"){
        this.list.push(tmp[i])
      }
    }
    // for (var i in this.list) {
    //   this.v.push(0);
  },
  methods:{
    async deleteOrder(order,index){
      let res = await OrderApi.dispatch('deleteOrder',order.id)
      if(res.success){
        alert('delete Order complete')
        this.list.splice(index,1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>