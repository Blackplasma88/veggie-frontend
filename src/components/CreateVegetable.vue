<template>
  <div class="story">
    <h1>Create Veggie</h1>
      <div class="box">
        <label for="name">Name: </label><br />
        <input type="text" v-model="form.name" />
        <br /><br />
        <label for="inventories">Inventories: </label>
        <input type="number" v-model="form.inventories" min="1" />
        <label for="price">Price: </label>
        <input type="number" v-model="form.price" min="1" /><br>
        <br /><br />
      </div>
          <div>
                <input type="file" @change="onFileSelected" />
                <b-button @click="addVeggie()">ADD VEGGIE</b-button>
          </div>
  </div>
</template>

<script>
import ItemApi from "@/store/ItemApi";
import AuthService from '@/services/AuthService'
import Axios from 'axios'
import swal from 'sweetalert'
export default {
  data() {
    return {
      form: {
        name: "",
        price: 0,
        inventories: 0,
        total_sales: 0,
      },
      image:"-"
    };
  },
  methods: {
    async addVeggie() {
      if(this.form.name === "" && this.form.price === 0 && this.form.inventories === 0){
        swal('Please fill data','','warning')
      }else{
        let fd = new FormData();
        fd.append('img',this.image);
      let payload = {
        name: this.form.name,
        inventories: this.form.inventories,
        price: this.form.price,
        total_sales: 0,
        image_path: "-"
      };
      let res = await ItemApi.dispatch('addVeggie',payload)
      let id = res.data.id
      if(res.success){
          if(this.form.image === "-"){
            alert('add veggie complete')
            this.$router.push("/manage-veg")
          }else{
            this.upload(id);
          }
      }
      }
    },
    onFileSelected(event) {
      this.image = event.target.files[0]
    },
    async upload(id){
        let headers = AuthService.getApiHeader()
        let url = "http://127.0.0.1:8000/api/item/upload-image"
        let fd = new FormData();
        fd.append('img',this.image);
        fd.append('id',id);
        let res = await Axios.post(url,fd)
        if(res.status === 200){
            swal('Add success','','success')
            this.$router.push("/manage-veg")
        }
    }
  }
}
</script>

<style scoped>
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