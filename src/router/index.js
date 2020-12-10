import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/main',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/searchResult1',
        name: 'searchResult1',
        component: () => import('../views/searchResult1.vue')
      },
      {
        path: '/priceList',
        name: 'priceList',
        component: () => import('../views/priceList.vue')
      },
      {
        path: '/priceInfo',
        name: 'priceInfo',
        component: () => import('../views/priceInfo.vue')
      },
      {
        path: '/price',
        name: 'price',
        component: () => import('../views/price.vue')
      },
      {
        path: '/approval',
        name: 'approval',
        component: () => import('../views/approval.vue')
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('../views/article.vue')
      }
    ]
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
