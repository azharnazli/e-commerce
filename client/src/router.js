import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from './views/login.vue'
import register from './views/register.vue'
import admin from './views/admin.vue'
import dashboard from './views/dashboard.vue'
import edit from './views/edit.vue'
import addProduct from './views/addProduct.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/admin',
      component: admin,
      children: [{
        path: '',
        component: dashboard
      }, {
        path: 'edit/:productId',
        component: edit
      }, {
        path: 'addProduct',
        component: addProduct
      }]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
