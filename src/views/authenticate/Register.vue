<template>
    <div class="container">
        <head-bar></head-bar>
        
        <form class="form-1" @submit.prevent="register"> 
            <h1>Register</h1>
            <div>
              <label class="label-1" for="email"><b>Email</b></label>
              <input v-model="form.email" type="text" placeholder="email" autocomplete="off">
          </div>
          <div>
              <label class="label-2" for="name"><b>Name</b></label>
              <input v-model="form.name" type="text" placeholder="Name" autocomplete="off">
          </div>

          <div>
              <label class="label-3" for="password"><b>Password</b></label>
              <input v-model="form.password" type="password" placeholder="password" autocomplete="off">
          </div>
          <div>
              <label class="label-4" for="password_confirmation"><b>Password confirmation</b></label>
              <input v-model="form.password_confirmation" type="password" placeholder="confirm password" autocomplete="off">
          </div>
          <div>
              <label class="label-5" for="address"><b>Address</b></label>
              <input v-model="form.address" type="text" placeholder="address" autocomplete="off" size="40">
          </div>
          <div>
              <label class="label-6" for="tell"><b>Phone number</b></label>
              <input v-model="form.tell" type="text" placeholder="Phone Number" autocomplete="off" size="20">
          </div>

          <div>
              <button type="submit">Register</button>
          </div>
      </form>
    </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import AuthUser from "@/store/AuthUser"
import swal from 'sweetalert'
export default {
    components: {
            HeadBar
        },
    data(){
        return{
            form:{
                name:"",
                email:"",
                password:"",
                password_confirmation:"",
                address:"",
                tell:"",
                balance_amount: 0
            }
        }
    },
    methods:{
        async register(){
            let res = await AuthUser.dispatch('register', this.form)
            if(res.success){
                this.$router.push('/')
                swal('Register success','','success')
            }
            else{
                alert(JSON.stringify(this.form))
                // alert(res.message)
            }
        }
    }
}
</script>

<style scoped lang='scss'>
@import '@/assets/registerCss.scss';
</style>
