<template>
  <div>
    <h1>List Orders</h1>
      <b-dropdown id="dropdown-1" text="ค้นหา" class="m-md-2">
        <b-dropdown-item @click="searchByStatus('ชำระเงินแล้ว')">ชำระเงินแล้ว</b-dropdown-item>
        <b-dropdown-item @click="searchByStatus('กำลังจัดส่ง')">กำลังจัดส่ง</b-dropdown-item>
      </b-dropdown>
      <button @click="searchByStatus('ยกเลิก')">ยกเลิกการค้นหา</button>
      <b-dropdown id="dropdown-1" text="เลียงลำดับ" class="m-md-2">
        <b-dropdown-item @click="sortBy('ราคาน้อยไปมาก')">ราคาน้อยไปมาก</b-dropdown-item>
        <b-dropdown-item @click="sortBy('ราคามากไปน้อย')">ราคามากไปน้อย</b-dropdown-item>
      </b-dropdown>
      <button @click="sortBy('ยกเลิก')">ยกเลิกการเลียงลำดับ</button>
    <table class="table table-boradered">
      <thead>
        <th scope="col">#</th>
        <th scope="col">Order Number</th>
        <th scope="col">ผู้ซื้อ</th>
        <th scope="col">ของที่ซื้อ</th>
        <th scope="col">ราคา / บาท</th>
        <th scope="col">สถานะ</th>
        <th scope="col">เช็คข้อมูล</th>
      </thead>
      <tbody v-if="checkSearch.check === 0 && checkSort.check === 0">
        <tr v-for="(order, index) in list" :key="index">
            <td>{{ index+1 }}</td>
            <td>{{ order.id }}</td>
            <td>{{ order.user_id }}</td>
            <td>{{ order.data }}</td>
            <td>{{ order.amount }}</td>
            <td>{{ order.status }}</td>
            <td>
                <button>ข้อมูล</button>
            </td>
        </tr>
      </tbody>
      <tbody v-if="checkSearch.check === 1 || checkSort.check === 1">
        <tr v-for="(order, index) in tmp" :key="index">
            <td>{{ index+1 }}</td>
            <td>{{ order.id }}</td>
            <td>{{ order.user_id }}</td>
            <td>{{ order.data }}</td>
            <td>{{ order.amount }}</td>
            <td>{{ order.status }}</td>
            <td>
                <button>ข้อมูล</button>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import OrderApi from "@/store/OrderApi";
import AuthService from '@/services/AuthService'
export default {
  data() {
    return {
      list: [],
      tmp:[],
      checkSearch:{
        check:0,
        status:''
      },
      checkSort:{
        check:0,
        status:''
      }
    };
  },
  async created() {
    await OrderApi.dispatch("fetchData");
    let tmp = OrderApi.getters.data.data;
    for(let i in tmp){
      if(tmp[i].user_id === AuthService.getUser().id && tmp[i].status !== "รอชำระเงิน"){
        this.list.push(tmp[i])
      }
    }
  },
  methods:{
    searchByStatus(status){
      if(status === 'ยกเลิก'){
        this.checkSearch.check = 0
        this.checkSearch.status = ""
        if(this.checkSort.check === 0){
          this.tmp = []
        }else{
          this.sortBy(this.checkSort.status)
        }
      }else if(status === 'ชำระเงินแล้ว'){
        if(this.checkSort.check === 0){
          this.checkSearch.check = 1
          this.checkSearch.status = 'ชำระเงินแล้ว'
          this.tmp = []
          for(var i in this.list){
            if(this.list[i].status === 'ชำระเงินแล้ว'){
            this.tmp.push(this.list[i])
            }
          }
        }else{
          this.checkSearch.check = 1
          this.checkSearch.status = 'ชำระเงินแล้ว'
          this.tmp = []
          for(var i in this.list){
            if(this.list[i].status === 'ชำระเงินแล้ว'){
            this.tmp.push(this.list[i])
            }
          }
          this.sortBy(this.checkSort.status)
        }
      }else if(status === 'กำลังจัดส่ง'){
        if(this.checkSort.check === 0){
          this.checkSearch.check = 1
          this.checkSearch.status = 'กำลังจัดส่ง'
          this.tmp = []
          for(var i in this.list){
            if(this.list[i].status === 'กำลังจัดส่ง'){
            this.tmp.push(this.list[i])
            }
          }
        }else{
          this.checkSearch.check = 1
          this.checkSearch.status = 'กำลังจัดส่ง'
          this.tmp = []
          for(var i in this.list){
            if(this.list[i].status === 'กำลังจัดส่ง'){
            this.tmp.push(this.list[i])
            }
          }
          this.sortBy(this.checkSort.status)
        }
      }
    },
    sortBy(con){
      if(con === 'ยกเลิก'){
        this.checkSort.check = 0
        this.checkSort.status = ""
        if(this.checkSearch.check === 0){
          this.tmp = []
        }else{
          this.searchByStatus(this.checkSearch.status)
        }
      }else if(con === 'ราคาน้อยไปมาก'){
         if(this.checkSearch.check === 0){
          this.checkSort.check = 1
          this.checkSort.status = 'ราคาน้อยไปมาก'
          this.tmp = []
          for(var i in this.list){
            this.tmp.push(this.list[i])
          }
          this.tmp.sort(function(a, b){return a.amount - b.amount})
         }else{
           this.checkSort.check = 1
          this.checkSort.status = 'ราคาน้อยไปมาก'
           this.tmp.sort(function(a, b){return a.amount - b.amount})
         }
      }else if(con === 'ราคามากไปน้อย'){
        if(this.checkSearch.check === 0){
           this.checkSort.check = 1
          this.checkSort.status = 'ราคามากไปน้อย'
          this.tmp = []
          for(var i in this.list){
            this.tmp.push(this.list[i])
          }
          this.tmp.sort(function(a, b){return b.amount - a.amount})
         }else{
            this.checkSort.check = 1
          this.checkSort.status = 'ราคามากไปน้อย'
           this.tmp.sort(function(a, b){return b.amount - a.amount})
         }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>