<template>
  <div class="container mt-5">
    List Orders
    <table class="table table-boradered">
      <thead>
        <th scope="col">#</th>
        <th scope="col">ผู้ซื้อ</th>
        <th scope="col">ของที่ซื้อ</th>
        <th scope="col">ราคา / บาท</th>
        <th scope="col">สถานะ</th>
        <th scope="col">เมื่อ</th>
        <th scope="col">ดำเนินการ</th>
      </thead>
      <tbody>
        <tr v-for="(order, index) in list" :key="index" scope="row">
            <td>{{ index+1 }}</td>
            <td>{{ order.user_id }}</td>
            <td>{{ order.data }}</td>
            <td>{{ order.amount }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.created_at }}</td>
            <td>
                <button @click="payment(order.id)">ชำระเงิน</button>
                <button>ยกเลิก</button>
            </td>
        </tr>
      </tbody>
    </table>
    <b-button variant="success">ชำระเงินทั้งหมด</b-button>
  </div>
</template>

<script>
import OrderApi from "@/store/OrderApi";
import AuthService from '@/services/AuthService'
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
      if(tmp[i].user_id === AuthService.getUser().id && tmp[i].status === "รอชำระเงิน"){
        this.list.push(tmp[i])
      }
    }
    // for (var i in this.list) {
    //   this.v.push(0);
  },
  methods:{
    payment(id){
      this.$router.push({name : 'Payment',params:{ id }})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>