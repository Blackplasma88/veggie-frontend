<template>
  <div class="container mt-5">
      
    <div class="story">
      <h1>List Vegetables</h1>
      <b-container fluid>
      <!-- User Interface controls -->
      <b-row>
        <!-- tab filter -->
        <b-col class="col-4  my-1" >
          <b-form-group label="Filter" label-for="filter-input" label-cols-sm="3" label-align-sm="right"
            label-size="sm" class="mb-0">
            <b-input-group size="sm">
              <b-form-input id="filter-input" v-model="filter" type="search" placeholder="Type to Search"></b-form-input>
        <!-- button clear filter -->
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <div class="mt-1">
            <label for="">Add Vegetable : </label>
            <b-button class="success" @click="addItem()">Add</b-button>
          </div>
        </b-col>

          <!-- tab sort -->
        <b-col class="col  my-1" >
          <b-form-group label="Sort" label-for="sort-by-select" label-cols-sm="3" label-align-sm="right"
            label-size="sm" class="mb-0" v-slot="{ ariaDescribedby }">
            <b-input-group size="md" class="mt-2">
              <b-form-select id="sort-by-select" v-model="sortBy" :options="sortOptions"
                :aria-describedby="ariaDescribedby">
                <template #first><option value="">-- none --</option></template>
              </b-form-select>
              <b-form-select v-model="sortDesc" :disabled="!sortBy" :aria-describedby="ariaDescribedby"
                size="sm" class="mb-2 mr-sm-2 mb-sm-0">
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>

        <!-- tab to select page -->
        <b-col class="col-5 my-1" >
          <b-form-group label="Per page" label-for="per-page-select" label-cols-sm="6" label-cols-md="4"
            label-cols-lg="3" label-align-sm="right" label-size="sm" class="mb-0">
            <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions" size="sm"></b-form-select>
          </b-form-group>
        <!-- button to select page -->
          <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill"
            size="sm" class="my-0"></b-pagination>
        </b-col>
      </b-row>

      <!-- Main table element -->
      <b-table :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter"
        :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
        stacked="md" show-empty small @filtered="onFiltered" border="true">
        <template #cell(name)="row">
          {{ row.value }}
        </template>

        <!-- button action -->
        <template #cell(manage)="row">
          <b-button size="sm" @click="row.toggleDetails">
            {{ row.detailsShowing ? "cancel" : "manage" }} 
          </b-button>
        </template>

        <!-- detail row -->
        <template #row-details="row"> 
          <b-card>
            <ul>
              <li>
                <img :src="row.item.image_path" alt="" width="210" height="180"><br><br>
                <input v-if="idit === 1" type="file" @change="onFileSelected" />
                <b-button class="mt-1" @click="upload(row.item.id)">change picture</b-button><br><br>

                  <h2>{{ row.item.name }}</h2><br>
                    <label for="">Name: {{ row.item.name }}</label><br> 
                    <label v-if="idit === 1" for="">ชื่อที่ต้องการแก้ไข : </label>
                    <input v-if="idit === 1" type="text" placeholder="Name" v-model="form.name">

                    <label for="">Price: {{ row.item.price }}</label><br>
                    <label v-if="idit === 1" for="">ราคาที่ต้องการแก้ไข : </label>
                    <input v-if="idit === 1" type="text" placeholder="price" v-model="form.price">

                    <label >Inventories: {{ row.item.inventories }}</label><br>
                    <label v-if="idit === 1" for="price">จำนวนที่ต้องการแก้ไข : </label>
                    <input v-if="idit === 1" type="text" placeholder="inventories" v-model="form.inventories">

                    <div><br>
                      <b-button v-if="idit === 0" @click="changeFormValue(row.item, 0)">Edit</b-button>
                      <b-button v-if="idit === 1" @click="updateValue(row.item.id - 1)">Update</b-button>
                      <b-button v-if="idit === 1" @click="changeFormValue(row.item, 1)">Cancel</b-button>
                    </div>
              </li>
            </ul>
          </b-card>
        </template>
      </b-table>
    </b-container>
    </div>
  </div>
</template>

<script>
import ItemApi from "@/store/ItemApi";
import AuthService from '@/services/AuthService'
import AuthUser from "@/store/AuthUser";
import Axios from 'axios'
export default {
  data() {
    return {
      items: [],
      fields: [
        {
          key: "name",
          label: "Vegetable name",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "price",
          label: "price",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "inventories",
          label: "inventories",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "total_sales",
          label: "total_sales",
          sortable: true,
          sortDirection: "desc",
        },
        { key: "manage", label: "Manage" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      image:'',
      idit:0,
      form:{
        name:'',
        price:'',
        inventories:''
      }
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields.filter((f) => f.sortable).map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  methods: {
    onFileSelected(event) {
      this.image = event.target.files[0]
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    addItem() {
      this.$router.push("/add-item");
    },
    changeFormValue(user, id){
      if(id === 0){
        this.idit = 1
        this.form.name = user.name;
        this.form.price = user.price;
        this.form.inventories = user.inventories;
      }else{
        this.idit = 0
        this.form = {
        name:'',
        price:'',
        inventories:''
        }
      }
    },
    async updateValue(index){
        let addTotal = parseInt(this.form.inventories)
        let value = this.items[index];
        if(addTotal > 0){
            let payload = {
            id: value.id,
            name: this.form.name,
            inventories: this.form.inventories,
            price: this.form.price,
            total_sales: value.total_sales
            };
            let res = await ItemApi.dispatch('editData',payload)
            if(res.success) {
                location.reload();
            }
        }
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
            location.reload()
        }
    }
  },
  async created() {
    if (!AuthUser.getters.isAuthen) {
      alert("Restricted Area");
      this.$router.push("/login");
    }
    await ItemApi.dispatch("fetchData");
    this.items = ItemApi.getters.data.data;
    this.totalRows = this.items.length;
    this.image = this.items[0].image_path
  }
};
</script>

<style lang="scss" scoped>
.story{
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0, 0.4); /* Black w/opacity/see-through */
  color: white;
  font-weight: bold;
  border: 3px solid #f1f1f1;
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