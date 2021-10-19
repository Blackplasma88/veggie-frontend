<template class='background'>
  <div>
      <head-bar></head-bar>
      <div class="container">
      <form class="form-1 story" @submit.prevent="login">
          <h1>LOG IN</h1> 
          <div class="form-group row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Email </label>
              <div class="col-sm-10">
                <input class="form-control" id="staticEmail" v-model="form.email" 
                    type="text" placeholder="email" autocomplete="off">
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
  </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import AuthUser from "@/store/AuthUser"
import swal from 'sweetalert';
export default {
    components: {
            HeadBar
        },
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
            if(res.success){
                if(AuthUser.getters.user.status !== 'BAN'){
                    this.$router.push('/')
                    swal('login success','','success')
                }else{
                    swal('You got banned','','error')
                    this.$router.push('/logout')
                }
            }
            else{
                swal(res.message,'','warning')
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/loginCss.scss';
.story{
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0, 0.25); /* Black w/opacity/see-through */
  color: rgb(10, 10, 10);
  font-weight: bold;
  border: 3px solid #000000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 80%;
  padding: 20px;
  text-align: center;
}
</style>