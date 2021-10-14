<template>
    <div>
        <h1>Register page</h1>
        <form @submit.prevent="register"> 
            <div>
              <label for="email">Email </label>
              <input v-model="form.email" type="text" placeholder="email" autocomplete="off">
          </div>
          <div>
              <label for="username">User Name</label>
              <input v-model="form.username" type="text" placeholder="User Name" autocomplete="off">
          </div>

          <div>
              <label for="password">Password </label>
              <input v-model="form.password" type="password" placeholder="password" autocomplete="off">
          </div>
          <div>
              <label for="confirm_password">Confirme Password </label>
              <input v-model="form.confirm_password" type="password" placeholder="confirm password" autocomplete="off">
          </div>

          <div>
              <label for="name">Name</label>
              <input v-model="form.name" type="text" placeholder="Name" autocomplete="off">
          </div>
          <div>
              <label for="gender">Gender</label>
              <input v-model="form.gender" type="text" placeholder="Gender" autocomplete="off">
          </div>
          <div>
              <label for="birthday">Birthday</label>
              <input v-model="form.birthday" type="date" placeholder="Birthday" autocomplete="off">
          </div>
          <div>
              <label for="address">Address</label>
              <input v-model="form.address" type="text" placeholder="Address" autocomplete="off">
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
import AuthUser from "@/store/AuthUser"
export default {
    data(){
        return{
            form:{
                username:"",
                email:"",
                password:"",
                password_confirmation:"",
                name:"",
                gender:"",
                birthday:"",
                address:"",
                tell:""
            }
        }
    },
    methods:{
        async register(){
            console.log(this.form)
            // let res = await AuthUser.dispatch('register', this.form)
        }
    }

}
</script>
