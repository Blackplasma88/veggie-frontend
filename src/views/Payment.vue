<template>
    <div>
        <div>
            <label for="data">Data : {{ order.data }}</label>
        </div>
        <div>
            <label for="amount">Balance amount : {{ order.amount }}</label>
        </div>
        <div>
            <label for="create">Created at : {{ order.created_at }}</label>
        </div>
        <div>
            <label for="status">Status : {{ order.status }}</label>
        </div>

        <b-button variant="success" @click="buy()">ยืนยันการชำระเงินชำระเงิน</b-button>
    </div>
</template>

<script>
import OrderService from '../services/OrderService'
import AuthService from "../services/AuthService";
import UserApi from "../store/UserApi";
import OrderApi from "../store/OrderApi";
    export default {
        data(){
            return{ 
                id:"",
                order:"",
                user:""
            }
        },
        async created(){
            this.id = parseInt(this.$route.params.id)
            var order = await OrderService.getOrderById(this.id)
            this.order = order
        },
        methods: {
            async buy(){
                this.user = AuthService.getUser()
                if(this.user.balance_amount >= this.order.amount){
                    this.user.balance_amount -= this.order.amount
                    let payload = {
                        id: this.user.id,
                        user: this.user,
                    }
                    let res = await UserApi.dispatch('editData',payload)
                    if(res.success) {
                        this.order.status = "ชำระเงินแล้ว"
                        payload = {
                        id: this.order.id,
                        order: this.order,
                        }
                        let res = await OrderApi.dispatch('editData',payload)
                        if(res.success){
                            alert('success')
                            this.$router.push('/orders')
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>