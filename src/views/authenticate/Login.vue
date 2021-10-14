<template>
  <div>
      <h1>LOG IN</h1>
      <form @submit.prevent="login"> 
          <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Email </label>
              <div class="col-sm-10">
                <input class="form-control" id="staticEmail" v-model="form.email" 
                    type="text" placeholder="email or Username " autocomplete="off">
              </div>
          </div>
          <div class="form-group row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Password </label>
              <div class="col-sm-10">
                  <input v-model="form.password" type="password" class="form-control" id="inputPassword"
                    placeholder="password" autocomplete="off">
              </div>
          </div>
          <div>
              <button>Log in</button>
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
                email:"",
                password:""
            }
        }
    },
    methods:{
        async login(){
            let res = await AuthUser.dispatch('login', this.form)
        }
    }
}
</script>

<style>

</style>