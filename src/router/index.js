import Vue from 'vue'
import VueRouter from 'vue-router'
import Top from '@/components/Top.vue'
import Signup from '@/components/Signup.vue'
import Signin from '@/components/Signin.vue'
import Regist from '@/components/SakeRegist.vue'
import Search from '@/components/SakeSearch.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Top',
    component: Top
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/regist',
    name: 'Regist',
    component: Regist
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
