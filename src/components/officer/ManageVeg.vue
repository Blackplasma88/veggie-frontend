<template>
  <div>
    <h2>Manage Veg</h2>
    <b-button class="success" v-if="role === 'ADMIN' || role === 'OFFICER'" 
      @click="addItem()">Add Item</b-button>
      <input type="number" v-model="addTotal">
    <table class="table table-bordered">
      <thead>
        <th scope="col">#</th>
        <th scope="col">ชื่อผัก</th>
        <th scope="col">ราคา / ขีด</th>
        <th scope="col">จำนวนคงเหลือทั้งหมด</th>
        <th scope="col">Update</th>
      </thead>
      <tbody v-if="status === 0">
        <tr v-for="(item, index) in list" :key="index" scope="row">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.inventories }}</td>
          <td>
              <button @click="update(index)">update</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ItemApi from "@/store/ItemApi";
import OrderApi from "@/store/OrderApi";
import ItemService from "@/services/ItemService";
import AuthService from "@/services/AuthService";
import AuthUser from "@/store/AuthUser";

export default {
  data() {
    return {
      list: [],
      pv: [],
      v: [],
      price: 0,
      status: 0,
      addTotal:0
    };
  },
  async created() {
    if (!AuthUser.getters.isAuthen) {
      alert("Restricted Area");
      this.$router.push("/login");
    }
    this.role = AuthUser.getters.user.role
    await ItemApi.dispatch("fetchData");
    this.list = ItemApi.getters.data.data;
    for (var i in this.list) {
      this.v.push(0);
      this.pv.push(0);
    }
  },
  methods: {
    addItem() {
      this.$router.push("/add-item");
    },
    checkInfo(id) {
      this.$router.push({ name: "Information", params: { id } });
    },
    async update(index){
        this.addTotal = parseInt(this.addTotal)
        let value = this.list[index];
        if(this.addTotal > 0){
            let payload = {
            id: value.id,
            inventories: value.inventories + this.addTotal,
            total_sales: value.total_sales
            };
            let res = await ItemApi.dispatch('editData',payload)
            if(res.success) {
                location.reload();
            }
        }
    }
  }
};
</script>

<style scoped lang="scss">
</style>
