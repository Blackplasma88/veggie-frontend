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

        <b-button variant="success">ยืนยันการชำระเงินชำระเงิน</b-button>
    </div>
</template>

<script>
import OrderService from '../services/OrderService'
    export default {
        data(){
            return{ 
                id:"",
                order:""
            }
        },
        async created(){
            this.id = parseInt(this.$route.params.id)
            var order = await OrderService.getOrderById(this.id)
            this.order = order
        }
    }
</script>

<style lang="scss" scoped>

</style>