import Vue from 'vue'
import VueRouter from 'vue-router'
import Transactions from '../views/Transactions.vue'
import Budget from '../views/Budget.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Transactions',
    component: Transactions
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions
  },
  {
    path: '/budget',
    name: 'budget',
    component: Budget
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
