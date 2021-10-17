<template>
    <div>
        <h1>Order Number {{ order.id }}</h1>
        <label for="buyer">ID Buyer : {{ order.user_id }}</label><br>
        <label for="data">Data : {{ order.data }}</label><br>
        <label for="amount">Balance amount : {{ order.amount }}</label><br>
        <label for="status">Status : {{ order.status }}</label><br>
        <label for="created">When : {{ order.created_at }}</label><br>
        <button @click="update()">ทำการจัดส่ง</button>
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

</style>