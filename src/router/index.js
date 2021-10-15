import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Info from '../views/Information.vue'
import Cart from '../views/Cart.vue'
import Payment from '../views/Payment.vue'
import ListOrder from '../views/OrderStatus.vue'
import Profile from '../views/Profile.vue'
import FoodMenu from '../views/FoodMenu.vue'
import Login from '../views/authenticate/Login'
import Logout from '../views/authenticate/Logout'
import Register from '../views/authenticate/Register'
import AddItem from '../views/AddItem.vue'

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
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/menu',
    name: 'FoodMenu',
    component: FoodMenu
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/add-item',
    name: 'AddItem',
    component: AddItem
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
