<template>
  <div class="container mt-5">
      <h2>List Vegetables</h2>
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
        <template #cell(actions)="row">
          <b-button size="sm" @click="row.toggleDetails">
            {{ row.detailsShowing ? "Hide" : "Show" }} Details
          </b-button>
        </template>

        <!-- detail row -->
        <template #row-details="row"> 
          <b-card>
            <ul>
              <li>
                <img :src="row.item.image_path" alt="" width="210" height="180">
                  <h4>{{ row.item.name }}</h4>
                    <label for="">Name: {{ row.item.name }}</label><br> 
                    <label for="">Price: {{ row.item.price }}</label><br>
                    <label >Inventories: {{ row.item.inventories }}</label><br><br>
                    <div>
                      <button @click="decrease(row.index)">-</button>
                      <input type="text" v-model="v[row.index]"/>
                      <button @click="increase(row.index)">+</button>
                    </div><br>
                    <label for="price">ราคารวม : {{ price }} บาท</label>
                    <b-button size="sm" @click="cart()">Cart</b-button>
                    <b-button size="sm" @click="buy()">Buy</b-button>
              </li>
            </ul>
          </b-card>
        </template>
      </b-table>
    </b-container>
  </div>
</template>

<script>
import ItemApi from "@/store/ItemApi";
import AuthService from '@/services/AuthService'
import AuthUser from "../store/AuthUser";
import OrderApi from "@/store/OrderApi";
import swal from 'sweetalert';
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
        { key: "actions", label: "Actions" },
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
      pv: [],
      v: [],
      price: 0,
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
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async buy() {
      // add item to order table
      let tmp = [];
      for (let i = 0; i < this.v.length; i++) {
        if (this.v[i] !== 0) {
          let data = this.items[i].id + " " + this.items[i].name + " : " + this.v[i] + " ขีด";
          tmp.push(data);
        }
      }
      let payload = {
        user_id: AuthUser.getters.user.id,
        text: tmp.join(),
        amount: this.price,
        status: "รอชำระเงิน",
      };
      let res = await OrderApi.dispatch('addData',payload)
      if (res.success) {
        let id = res.data.id;
        this.$router.push({name : 'Payment',params:{ id }});

      }

      
    },
    async cart() {
      // add item to order table
      let tmp = [];
      for (let i = 0; i < this.v.length; i++) {
        if (this.v[i] !== 0) {
          let data = this.items[i].id + " " + this.items[i].name + " : " + this.v[i] + " ขีด";
          tmp.push(data);
        }
      }
      let payload = {
        user_id: AuthUser.getters.user.id,
        text: tmp.join(),
        amount: this.price,
        status: "รอชำระเงิน",
      };
      let res = await OrderApi.dispatch("addData", payload);
      if (res.success) {
        this.$router.push("/cart");
        swal('add to cart complete','','success')
      }
    },
    increase(index) {
      this.v[index] = parseInt(this.v[index]);
      if (this.v[index] < this.items[index].inventories) {
        this.price -= this.pv[index] * this.items[index].price;
        this.v[index] = this.v[index] + 1;
        this.price += this.v[index] * this.items[index].price;
        this.pv[index] = this.v[index];
      }
    },
    decrease(index) {
      this.v[index] = parseInt(this.v[index]);
      if (this.price > 0 && this.v[index] > 0) {
        this.price -= this.pv[index] * this.items[index].price;
        this.v[index] = this.v[index] - 1;
        this.price += this.v[index] * this.items[index].price;
        this.pv[index] = this.v[index];
      }
    },
  },
  async created() {
    if (!AuthUser.getters.isAuthen) {
      alert("Restricted Area");
      this.$router.push("/login");
    }
    await ItemApi.dispatch("fetchData");
    this.items = ItemApi.getters.data.data;
    for (var i in this.items) {
      this.v.push(0);
      this.pv.push(0);
    }
    this.totalRows = this.items.length;
  }
};
</script>