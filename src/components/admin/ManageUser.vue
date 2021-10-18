<template>
    <div>
        <h1>User Management</h1>
        <table class="table table-bordered">
      <thead>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Balance</th>
        <th scope="col">Role</th>
        <th scope="col">Grant</th>
        <th scope="col">Created at</th>
        <th scope="col">Manage</th>
      </thead>
      <!-- don't search -->
      <tbody >
        <tr v-for="(user, index) in users" :key="index" scope="row">
            <td>{{ index + 1 }}</td>
            <button @click="viewUser(user.id)">Info</button>
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
            <td>
                <!-- ban -->
                <button @click="authorize(user,-1)" v-if="user.role !== 'ADMIN' && user.status !== 'BAN'">ban</button>

                <!-- cancle ban -->
                <button @click="authorize(user,1)" v-if="user.role !== 'ADMIN' && user.status === 'BAN'">Grant</button> 
            </td>
        </tr>
      </tbody>
        </table>
    </div>
</template>

<script>
import UserApi from "@/store/UserApi"
import AuthService from '../../services/AuthService'
import AuthUser from '../../store/AuthUser'
    export default {
        data(){
            return{
                users:[]
            }
        },
        async created(){
            this.fetchData()
        },
        methods:{
            async fetchData(){
                await UserApi.dispatch('fetchData')
                this.users = UserApi.getters.data
            },
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
            },
            viewUser(id){
                this.$router.push({ name: "InfoUser", params: { id } });
            },
            async authorize(user,check){
                let payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    address: user.address,
                    balance_amount: user.balance_amount,
                    tell: user.tell,
                    status: (check === 1) ? "AUTHORIZE":"BAN"
                }
                let res = await AuthUser.dispatch('authorize',payload)
                if(res.success){
                    if(check === 1){
                        alert('authorize complete')
                    }
                    else{
                        alert('ban complete')
                    }
                    this.fetchData()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>