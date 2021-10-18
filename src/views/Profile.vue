<template>
    <div>
        <head-bar></head-bar>
        <div>
            <label for="name">Name : {{ profile.name }}</label>
        </div>
        <div>
            <label for="email">Emaile : {{ profile.email }}</label>
        </div>
        <div>
            <label v-if="edit === 0" for="address">Address: {{ profile.address }}</label>
            <label v-if="edit === 1" for="address">Address: </label><br>
            <textarea v-if="edit === 1" name="address" id="" cols="30" rows="10" v-model="form.address"></textarea>
        </div>
        <div>
            <label for="tell">Phone number: {{ profile.tell }}</label>
            <label v-if="edit === 1" for="tell">Phone number: </label>
            <input v-if="edit === 1" type="text" v-model="form.tell">
        </div>
        <div>
            <label for="create">Created at : {{ profile.created_at }}</label>
        </div>
        <div>
            <label for="balance">Balance : {{ profile.balance_amount }}</label>
        </div>

        <button v-if="edit === 0" @click="openForm()">Edit</button>
        <button v-if="edit === 1" @click="editProfile()">Confirm</button>
        <button v-if="edit === 1" @click="closeForm()">Cancle</button>
    </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import AuthUser from '@/store/AuthUser'
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
                    status: this.profile.status
                }
                let res = await AuthUser.dispatch('editProfile',payload)
                if(res.success){
                    alert('edit complete')
                    this.$router.push('/logout')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>