<template>
    <div class="container">
        <head-bar></head-bar>
        <div class="form-1">
            <div>
                <label for="name">Name : {{ profile.name }}</label>
            </div>
            <div>
                <label for="email">Emaile : {{ profile.email }}</label>
            </div>
            <div>
                <label v-if="edit === 0" for="address">Address: {{ profile.address }}</label>
                <label v-if="edit === 1" for="address">Address: </label><br>
                <input v-if="edit === 1" type="text" v-model="form.address" size="50">
                <!-- <textarea v-if="edit === 1" name="address" id="" cols="30" rows="10" v-model="form.address"></textarea> -->
            </div>
            <div>
                <label v-if="edit === 0" for="tell">Phone number: {{ profile.tell }}</label>
                <label v-if="edit === 1" for="tell">Phone number: </label>
                <input v-if="edit === 1" type="text" v-model="form.tell" size="10">
            </div>
            <div>
                <label for="create">Created at : {{ profile.created_at }}</label>
            </div>
            <div>
                <label for="balance">Balance : {{ profile.balance_amount }}</label>
            </div>

            <button v-if="edit === 0" @click="openForm()">Edit</button>
            <button v-if="edit === 1" @click="editProfile()">Confirm</button>
            <button class="button-1" v-if="edit === 1" @click="closeForm()">Cancle</button>
        </div>
    </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import AuthUser from '@/store/AuthUser'
import swal from 'sweetalert'
    export default {
        components: {
            HeadBar
        },
        data(){
            return{
                form:{
                    address: '',
                    tell: ''
                },
                profile:"",
                edit: 0,
            }
        },
        created(){
            this.profile= AuthUser.getters.user
        },
        methods:{
            openForm(){
                this.edit = 1
                let clone = JSON.parse(JSON.stringify(this.profile))
                this.form.address = clone.address
                this.form.tell = clone.tell
            },
            closeForm(){
                this.edit = 0
            },
            async editProfile(){
                let payload = {
                    id: this.profile.id,
                    name: this.profile.name,
                    email: this.profile.email,
                    address: this.form.address,
                    tell: this.form.tell,
                    balance_amount: this.profile.balance_amount,
                    status: this.profile.status,
                    role: this.profile.role
                }
                let res = await AuthUser.dispatch('editProfile',payload)
                if(res.success){
                    swal('Edit profile complete','please login again','success')
                    this.$router.push('/logout')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '@/assets/loginCss.scss';
.button-1{
    margin: 2rem;
    margin-bottom: 1.5rem;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 1rem;
    border: none;
    font-size: 1.1rem;
    font-weight: bolder;
    color: #fff;
    background: red;
}
</style>