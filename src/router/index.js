import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Info from '../views/Info.vue'
import ListOrder from '../views/OrderStatus.vue'
import Profile from '../views/Profile.vue'
import CreateVeggie from '../views/CreateVeggie.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/item/:id',
    name: 'Information',
    component: Info
  },
  {
    path: '/orders',
    name: 'ListOrder',
    component: ListOrder
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/vegetable/create',
    name: 'CreateVeggie',
    component: CreateVeggie
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
