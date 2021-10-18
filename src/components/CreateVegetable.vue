<template>
  <div>
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
              <!-- <img v-show="imageUrl" :src="imageUrl" alt=""> -->
                <input type="file" @change="onFileSelected" />
                <button @click="addVeggie()">ADD VEGGIE</button>
          </div>
  </div>
</template>

<script>
import ItemApi from "@/store/ItemApi";
import AuthService from '@/services/AuthService'
import Axios from 'axios'
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
            alert('add veggie complete')
            this.$router.push("/manage-veg")
        }
    }
  }
}
</script>

<style>
</style>