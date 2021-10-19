<template>
  <div class="container mt-5">
      <h1>Order in cart</h1>
    <div class="story">
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
            {{ row.detailsShowing ? "Hide" : "Show" }}
          </b-button>
        </template>
        <template #cell(manage)="row">
          <b-button size="sm" @click="manage(row.item.id)">manage</b-button>
        </template>

        <!-- detail row -->
        <template #row-details="row"> 
          <b-card>
            <ul>
              <li>
                  <h4>{{ "Order Number "+ row.item.id }}</h4>
                    <label for="">Data: {{ row.item.data }}</label><br> 
                    <label for="">Amount: {{ row.item.amount }}</label><br>
                    <label >Status: {{ row.item.status }}</label><br>
                    <label >Add when: {{ row.item.created_at }}</label><br>
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
import AuthService from '@/services/AuthService'
import OrderApi from "@/store/OrderApi";
export default {
  data() {
    return {
      items: [],
      fields: [
        {
          key: "data",
          label: "Data in order",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "amount",
          label: "Amount",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "status",
          label: "Status",
          sortable: true,
          
        },
        {
          key: "created_at",
          label: "Buy when",
          sortable: true,
          sortDirection: "desc",
        },
        { key: "actions", label: "Detail" },
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
    async manage(id){
        this.$router.push({ name: "ChangeStatusOrder", params: { id } });
    }
  },
  async created() {
    await OrderApi.dispatch("fetchData");
    let tmp = OrderApi.getters.data.data;
    for(let i in tmp){
      if(tmp[i].status !== "รอชำระเงิน"){
        this.items.push(tmp[i])
      }
    }
    this.totalRows = this.items.length;
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