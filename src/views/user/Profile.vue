<template>
    <div>
        <head-bar></head-bar>
        <div class="container">
        <div class="form-1 pic">
            <div>
                <img :src="profile.image_path" alt="" width="210" height="180"><br>
                <div>
                    <input v-if="edit === 1" type="file" @change="onFileSelected" />
                    <b-button v-if="edit === 1" @click="upload(profile.id)">onfirm</b-button><br>
                </div>
                <label for="name">Name : {{ profile.name }}</label>
            </div>
            <div>
                <label for="email">Emaile : {{ profile.email }}</label>
            </div>
            <div>
                <label v-if="edit === 0" for="address">Address: {{ profile.address }}</label>
                <label v-if="edit === 1" for="address">Address: </label><br>
                <input v-if="edit === 1" type="text" v-model="form.address" size="50">
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

            <div>
                <button v-if="edit === 0" @click="openForm()">Edit</button>
                <button v-if="edit === 1" @click="editProfile()">Confirm</button>
                <button class="button-1" v-if="edit === 1" @click="closeForm()">Cancle</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import AuthUser from '@/store/AuthUser'
import AuthService from '@/services/AuthService'
import Axios from 'axios'
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
                image:'',
            }
        },
        async created(){
            if (!AuthUser.getters.isAuthen) {
        swal('Please login','','error')
        this.$router.push("/login");
            }
            this.profile = await AuthService.getUserById( AuthUser.getters.user.id )
        },
        methods:{
            onFileSelected(event) {
                this.image = event.target.files[0]
            },
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
            },
            async upload(id){
            let headers = AuthService.getApiHeader()
            let url = "http://127.0.0.1:8000/api/user/upload-image"
            let fd = new FormData();
            fd.append('img',this.image);
            fd.append('id',id);
            let res = await Axios.post(url,fd)
            if(res.status === 200){
                alert('add veggie complete')
                location.reload()
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
.pic{
  border: 3px solid #000000;
  color: rgb(10, 10, 10);
}
</style>