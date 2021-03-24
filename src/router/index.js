import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import('../views/Reg.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/Logout.vue')
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('../views/Upload.vue')
  },
  {
    path: '/update/:id',
    name: 'Update',
    component: () => import('../views/Update.vue')
  },
  {
    path: '/get',
    name: 'Get',
    component: () => import('../views/Get.vue')
  },
  {
    path: '/getUsers',
    name: 'GetUsers',
    component: () => import('../views/GetUsers.vue')
  }
]

const router = new VueRouter({
  routes
  // eslint-disable-next-line no-use-before-define
})

// eslint-disable-next-line no-unused-vars
localStorage.setItem('url', 'http://u104386.test-handyhost.ru/api/')

export default router
