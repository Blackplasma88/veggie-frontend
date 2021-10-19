<template>
  <div>
    <head-bar></head-bar>
    <div class="story">
      <div>
      <label for="data">Data : {{ order.data }}</label>
    </div>
    <div>
      <label for="amount">Balance amount : {{ order.amount }}</label>
    </div>
    <div>
      <label for="create">Created at : {{ callTime(order.created_at) }}</label>
    </div>
    <div>
      <label for="status">Status : {{ order.status }}</label>
    </div>

    <b-button variant="success" @click="buy()"
      >ยืนยันการชำระเงินชำระเงิน</b-button>
    </div>
  </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import OrderService from "../../services/OrderService";
import UserApi from "../../store/UserApi";
import ItemApi from "../../store/ItemApi";
import ItemService from "../../services/ItemService";
import OrderApi from "../../store/OrderApi";
import AuthUser from '../../store/AuthUser'
import swal from 'sweetalert'
import moment from 'moment'
export default {
  components: {
            HeadBar
        },
  data() {
    return {
      id: "",
      order: "",
      user: "",
    };
  },
  async created() {
    if (!AuthUser.getters.isAuthen) {
        swal('Please login','','error')
        this.$router.push("/login");
    }
    this.id = parseInt(this.$route.params.id);
    var order = await OrderService.getOrderById(this.id);
    this.order = order;
  },
  methods: {
    callTime(time){
      return moment(time).format('MMMM Do YYYY, h:mm:ss a')
    },
    async buy() {
      this.user = AuthUser.getters.user
      if (this.user.balance_amount >= this.order.amount) {
        this.user.balance_amount -= this.order.amount;
        let payload = {
          id: this.user.id,
          name: this.user.name,
          email: this.user.email,
          address: this.user.address,
          tell: this.user.tell,
          balance_amount: this.user.balance_amount,
          role: this.user.role,
          status: "AUTHORIZE"
        }
        let res = await UserApi.dispatch("editData", payload);
        if (res.success) {
          this.order.status = "ชำระเงินแล้ว";
          payload = {
            id: this.order.id,
            order: this.order,
          };
          let res = await OrderApi.dispatch("editData", payload);

          //   update data in item table
          let value = res.data.data.split(',');
          let tmp = []
          for (let i = 0; i < value.length; i++) {
            let v = value[i].split(':');
            let first = v[0].trim().split(' ');
            let second = v[1].trim().split(' ');
            let data = {
              id: first[0],
              val: second[0],
            };
            tmp.push(data);
          }
          for (let i = 0; i < tmp.length; i++) {
            let res = await ItemService.getItemById(tmp[i].id)
            payload = {
              id: tmp[i].id,
              inventories: res.data.inventories - parseInt(tmp[i].val),
              total_sales: res.data.total_sales + parseInt(tmp[i].val)
            };
            res = await ItemApi.dispatch('editData',payload)
          }
          if (res.success) {
            swal('Buy success','','success')
            this.$router.push("/orders")
          }
        }
      }
      else{
        swal("Don't have enough money",'','warning')
      }
    },
  },
};
</script>

<style scoped>
.story{
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0, 0.4); /* Black w/opacity/see-through */
  color: rgb(10, 10, 10);
  font-weight: bold;
  border: 3px solid #000000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 80%;
  padding: 20px;
  text-align: center;
}
</style>