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
    <!-- <div>
        <head-bar></head-bar>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
            >
                <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.name"
                placeholder="Enter name"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Address:" label-for="input-3">
                <b-form-input
                id="input-3"
                v-model="form.address"
                placeholder="Enter address"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Phone number:" label-for="input-4">
                <b-form-input
                id="input-4"
                v-model="form.tell"
                placeholder="Enter phone number"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-5" label="Password:" label-for="input-5">
                <b-form-input
                id="input-5"
                type="password"
                v-model="form.password"
                placeholder="Enter password"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-6" label="Password Confirmation:" label-for="input-6">
                <b-form-input
                id="input-6"
                type="password"
                v-model="form.password_confirmation"
                placeholder="Enter password confirmation"
                required
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </div> -->
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
//   export default {
//     components: {
//         HeadBar
//     },
//     data() {
//       return {
//         form:{
//             name:"",
//             email:"",
//             password:"",
//             password_confirmation:"",
//             address:"",
//             tell:""
//         },
//         show: true
//       }
//     },
//     methods: {
//       async onSubmit(event) {
//         event.preventDefault()
//         let res = await AuthUser.dispatch('register', this.form)
//             if(res.success){
//                 this.$router.push('/')
//             }
//         // alert(JSON.stringify(this.form))
//       },
//     //   onReset(event) {
//     //     event.preventDefault()
//     //     // Reset our form values
//     //     this.form.email = ''
//     //     this.form.name = ''
//     //     this.form.food = null
//     //     this.form.checked = []
//     //     // Trick to reset/clear native browser form validation state
//     //     this.show = false
//     //     this.$nextTick(() => {
//     //       this.show = true
//     //     })
//     //   }
//     }
//   }
</script>
