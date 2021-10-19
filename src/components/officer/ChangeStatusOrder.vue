<template>
    <div class="story">
        <h1>Order Number {{ order.id }}</h1>
        <label for="buyer">ID Buyer : {{ order.user_id }}</label><br>
        <label for="data">Data : {{ order.data }}</label><br>
        <label for="amount">Balance amount : {{ order.amount }}</label><br>
        <label for="status">Status : {{ order.status }}</label><br>
        <label for="created">When : {{ order.created_at }}</label><br>
        <b-button @click="update()">ทำการจัดส่ง</b-button>
    </div>
</template>

<script>
import OrderService from '@/services/OrderService'
import OrderApi from "@/store/OrderApi";
    export default {
        data(){
            return{
                id:"",
                order:""
            }
        },
        async created(){
            this.id = parseInt(this.$route.params.id) 
            this.order = await OrderService.getOrderById(this.id)
        },
        methods:{
            async update(){
                this.order.status = "กำลังจัดส่ง";
                let payload = {
                    id: this.order.id,
                    order: this.order,
                };
                let res = await OrderApi.dispatch("editData", payload);
                if(res.success){
                    this.$router.push("/manage-orders");
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.story{
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0, 0.25); /* Black w/opacity/see-through */
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