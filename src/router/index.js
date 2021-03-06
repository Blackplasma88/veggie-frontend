import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ListVeg from '../views/vegetables/ListVeg.vue'
import Cart from '../views/order/Cart.vue'
import Payment from '../views/management/Payment.vue'
import ListOrder from '../views/order/OrderStatus.vue'
import Profile from '../views/user/Profile.vue'
import FoodMenu from '../views/food/FoodMenu.vue'
import Login from '../views/authenticate/Login'
import Logout from '../views/authenticate/Logout'
import Register from '../views/authenticate/Register'
import AddItem from '../views/vegetables/AddItem.vue'
import SetUp from '../views/management/SetUp.vue'
import ManageUser from '../views/user/ManageUser.vue'
import ManagementOrder from '../views/order/ManagementOrder.vue'
import ManagementVeg from '../views/vegetables/ManagementVeg.vue'
import ChangeStatusOrder from '../views/order/ChangeStatusOrder.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/list-veg',
    name: 'ListVeg',
    component: ListVeg
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
  },
  {
    path: '/setup',
    name: 'SetUp',
    component: SetUp
  },
  {
    path: '/manage-user',
    name: 'ManageUser',
    component: ManageUser
  },
  {
    path: '/manage-orders',
    name: 'ManagementOrder',
    component: ManagementOrder
  },
  {
    path: '/manage-veg',
    name: 'ManagementVeg',
    component: ManagementVeg
  },
  {
    path: '/change-status/:id',
    name: 'ChangeStatusOrder',
    component: ChangeStatusOrder
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
