<template>
    <div>
        <head-bar></head-bar>
        <h1>Register page</h1>
        <form @submit.prevent="register"> 
            <div>
              <label for="email">Email </label>
              <input v-model="form.email" type="text" placeholder="email" autocomplete="off">
          </div>
          <div>
              <label for="name">Name</label>
              <input v-model="form.name" type="text" placeholder="Name" autocomplete="off">
          </div>

          <div>
              <label for="password">Password </label>
              <input v-model="form.password" type="password" placeholder="password" autocomplete="off">
          </div>
          <div>
              <label for="password_confirmation">Confirme Password </label>
              <input v-model="form.password_confirmation" type="password" placeholder="confirm password" autocomplete="off">
          </div>
          <div>
              <label for="address">Address</label>
              <textarea v-model="form.address" name="address" id="" cols="30" rows="10"></textarea>
          </div>
          <div>
              <label for="tell">Phone Number</label>
              <input v-model="form.tell" type="text" placeholder="Phone Number" autocomplete="off">
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
                tell:""
            }
        }
    },
    methods:{
        async register(){
            let res = await AuthUser.dispatch('register', this.form)
            if(res.success){
                this.$router.push('/')
            }
            else{
                alert(JSON.stringify(this.form))
                // alert(res.message)
            }
        }
    }
}
</script>
