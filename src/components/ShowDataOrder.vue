<template>
    <div>
        <h1>Information order</h1><br>
        <p>ชื่อผู้สั่ง: {{ user.name }}</p><br>
        <p>อีเมลผู้สั่ง: {{ user.email }}</p><br>
        <p>สถานที่จัดส่ง: {{ user.address }}</p><br>
        <p>เบอร์โทรศัพท์: {{ user.tell }}</p><br>
        <table class="styled-table">
            <thead>
                <th>#</th>
                <th>สินค้า</th>
            </thead>
            <tbody class="active-row">
                <tr v-for="(x,index) in data" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ x }}</td>
                </tr>
            </tbody>
        </table><br>
        <p>ราคารวม: {{ order.amount }}</p>
    </div>
</template>

<script>
import OrderService from '@/services/OrderService'
import AuthService from '@/services/AuthService'
export default {
    data(){
        return{
            order: '',
            user: '',
            data: [],
        }
    },
    created(){
        this.fetchData()
    },
    methods:{
        async fetchData(){
            let id = parseInt(this.$route.params.id);
            this.order = await OrderService.getOrderById(id)
            this.user = await AuthService.getUser(this.order.user_id)
            this.data = this.order.data.split(',')
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/tableCss.scss';
</style>