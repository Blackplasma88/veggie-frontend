<template>
  <div class="container mt-5">
      <h1>User Management</h1>
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
        <template #cell(change)="row">
          <b-button v-if="row.item.role !== 'ADMIN'" size="sm" @click="changeRole(row.item.id - 1)">Change</b-button>
        </template>
        <template #cell(ban)="row">
          <b-button style="background-color: red;" v-if="row.item.role !== 'ADMIN' && row.item.status !== 'BAN'" size="sm" @click="authorize(row.item,-1)">Ban</b-button>
          <b-button style="background-color: green;" v-if="row.item.role !== 'ADMIN' && row.item.status === 'BAN'" size="sm" @click="authorize(row.item,1)">Un ban</b-button>
        </template>

        <!-- detail row -->
        <template #row-details="row"> 
          <b-card>
            <ul>
              <li>
                  <h4>{{ "Order Number "+ row.item.id }}</h4>
                    <label for="">Name: {{ row.item.name }}</label><br> 
                    <label for="">Email: {{ row.item.email }}</label><br>
                    <label >Role: {{ row.item.role }}</label><br>
                    <label >Balance: {{ row.item.balance_amount }}</label><br>
                    <label >Status: {{ row.item.status }}</label><br>
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
import UserApi from "@/store/UserApi"
import AuthUser from '@/store/AuthUser'
import swal from 'sweetalert'
import moment from 'moment'
export default {
  data() {
    return {
      items: [],
      fields: [
        {
          key: "name",
          label: "Name",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "email",
          label: "Email",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "role",
          label: "Role",
          sortable: true,
          
        },
        {
          key: "balance_amount",
          label: "Balance amount",
          sortable: true,
          
        },
        {
          key: "created_at",
          label: "Created at",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "status",
          label: "Banned",
          sortable: true,
          sortDirection: "desc",
        },
        { key: "actions", label: "Detail" },
        { key: "change", label: "Change Role" },
        { key: "ban", label: "Ban User" },
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
    callTime(){
      for(let i=0;i< this.items.length;i++){
        this.items[i].created_at = moment(this.items[i].created_at).format('MMMM Do YYYY, h:mm:ss a')
      }
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async changeRole(index){
        if(this.items[index].role === 'CUSTOMER'){
            let payload = {
            id: this.items[index].id,
            name: this.items[index].name,
            email: this.items[index].email,
            balance_amount: this.items[index].balance_amount,
            address: this.items[index].address,
            role: 'OFFICER',
            tell: this.items[index].tell,
            status:this.items[index].status
        }
        let res = await UserApi.dispatch("editData", payload);
        if(res.success){
            location.reload();
        }
        }else if(this.items[index].role === 'OFFICER'){
            let payload = {
            id: this.items[index].id,
            name: this.items[index].name,
            email: this.items[index].email,
            balance_amount: this.items[index].balance_amount,
            address: this.items[index].address,
            role: 'CUSTOMER',
            tell: this.items[index].tell,
            status:this.items[index].status
        };
        let res = await UserApi.dispatch("editData", payload);
          if(res.success){
              swal('Change role complete','','success')
              location.reload()
          }
        }
    },
    async authorize(user,check){
        let payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
            balance_amount: user.balance_amount,
            tell: user.tell,
            role: user.role,
            status: (check === 1) ? "AUTHORIZE":"BAN"
        }
        let res = await AuthUser.dispatch('authorize',payload)
        if(res.success){
            if(check === 1){
                swal('Authorize complete','','success')
            }
            else{
                swal('Ban complete','','success')
            }
            location.reload()
        }
    }
  },
  async created() {
    await UserApi.dispatch('fetchData')
    this.items = UserApi.getters.data
    this.totalRows = this.items.length
    this.callTime()
  }
};
</script>

<style scoped>
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