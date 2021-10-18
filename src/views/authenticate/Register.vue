<template>
    <div class="container">
        <head-bar></head-bar>
        
        <form class="form-1" @submit.prevent="register"> 
            <h1>Register</h1>
            <div>
              <label class="label-1" for="email"><b>Email</b></label>
              <input v-model="form.email" type="text" placeholder="example@gmail.com" autocomplete="off"><br>

              <label class="label-error" v-if="errors.email" for="error-1">{{ errors.email[0] }}</label>
          </div>
          <div>
              <label class="label-2" for="name"><b>Name</b></label>
              <input v-model="form.name" type="text" placeholder="Name" autocomplete="off"><br>

              <label class="label-error" v-if="errors.name" for="error-1">{{ errors.name[0] }}</label>
          </div>

          <div>
              <label class="label-3" for="password"><b>Password</b></label>
              <input v-model="form.password" type="password" placeholder="password" autocomplete="off"><br>

              <label class="label-error" v-if="errors.password" for="error-1">{{ errors.password[0] }}</label>
          </div>
          <div>
              <label class="label-4" for="password_confirmation"><b>Password confirmation</b></label>
              <input v-model="form.password_confirmation" type="password" placeholder="confirm password" autocomplete="off"><br>

              <label class="label-error" v-if="errors.password" for="error-1">{{ errors.password[0] }}</label>
          </div>
          <div>
              <label class="label-5" for="address"><b>Address</b></label>
              <input v-model="form.address" type="text" placeholder="address" autocomplete="off" size="40"><br>

              <label class="label-error" v-if="errors.address" for="error-1">{{ errors.address[0] }}</label>
          </div>
          <div>
              <label class="label-6" for="tell"><b>Phone number</b></label>
              <input v-model="form.tell" type="text" placeholder="ex: 0911111111" autocomplete="off" size="20"><br>

              <label class="label-error" v-if="errors.tell" for="error-1">{{ errors.tell[0] }}</label>
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
            },
            errors: [],
            status_error: 1
        }
    },
    methods:{
        async register(){
            console.log(this.errors)
            let res = await AuthUser.dispatch('register', this.form)
            if(res.success){
                this.$router.push('/')
                swal('Register success','','success')
            }
            else{
                this.status_error = -1
                swal('something wrong','','warning')
                this.errors = res.message
                console.log(this.errors.email)
            }
        }
    }
}
</script>

<style scoped lang='scss'>
@import '@/assets/registerCss.scss';

.label-error{
    font-size: 10px;
    color: red;
}
</style>