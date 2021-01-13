import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home2.vue'
import HomePage from '../views/homePages/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    redirect:'/index',
    component: HomePage,
    children:[
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/homePages/Home.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/main',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/main',
        name: 'mainPage',
        component: () => import('../views/main.vue')
      },
      {
        path: '/home1',
        name: 'home1',
        component: () => import('../views/Home.vue')
      },
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
      },
      {
        path: '/pageStyle',
        name: 'pageStyle',
        component: () => import('../views/pageStyle.vue')
      },
      {
        path: '/authority',
        name: 'authority',
        component: () => import('../views/authority.vue')
      },
      {
        path: '/setIndex',
        name: 'setIndex',
        component: () => import('../views/setIndex.vue')
      },
      {
        path: '/setForm',
        name: 'setForm',
        component: () => import('../views/setForm.vue')
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
