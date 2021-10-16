<template>
    <div>
        <h1>Grant</h1>
        <table class="table table-bordered">
      <thead>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Balance</th>
        <th scope="col">Role</th>
        <th scope="col">Grant</th>
        <th scope="col">Created at</th>
      </thead>
      <!-- don't search -->
      <tbody >
        <tr v-for="(user, index) in users" :key="index" scope="row">
          <td>{{ index + 1 }}</td>
          <button >Info</button>
          <td>{{ user.email }}</td>
          <td>{{ user.balance_amount }}</td>
          <td>{{ user.role }}</td>
          <td> 
            <button v-if="user.role !== 'ADMIN' && user.role !== 'OFFICER'" 
                @click="grantToOfficer(user.id - 1)">grant to officer</button> 
            <button v-if="user.role !== 'ADMIN' && user.role !== 'CUSTOMER'" 
                @click="grantToCustomer(user.id - 1)">grant to customer</button>
          </td>
          <td>{{ user.created_at }}</td>
          <!-- <td>
            <button @click="decrease(index)">-</button>
            <input type="number" v-model="v[index]" />
            <button @click="increase(index)">+</button>
          </td> -->
        </tr>
      </tbody>
        </table>
    </div>
</template>

<script>
import UserApi from "@/store/UserApi"
    export default {
        data(){
            return{
                users:[]
            }
        },
        async created(){
            await UserApi.dispatch('fetchData')
            this.users = UserApi.getters.data
        },
        methods:{
            async grantToOfficer(index) {
                let payload = {
                    id: this.users[index].id,
                    name: this.users[index].name,
                    email: this.users[index].email,
                    balance_amount: this.users[index].balance_amount,
                    role: 'OFFICER'
                };
                let res = await UserApi.dispatch("editData", payload);
                if(res.success){
                    location.reload();
                }
            },
            async grantToCustomer(index) {
                let payload = {
                    id: this.users[index].id,
                    name: this.users[index].name,
                    email: this.users[index].email,
                    balance_amount: this.users[index].balance_amount,
                    role: 'CUSTOMER'
                };
                let res = await UserApi.dispatch("editData", payload);
                if(res.success){
                    location.reload();
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>