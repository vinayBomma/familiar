import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Chats from '../views/Chats.vue'
import Groups from '../views/Groups.vue'
import Privacy from '../views/Privacy.vue'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/chats',
    name: 'chats',
    component: Chats,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/groups',
    name: 'groups',
    component: Groups,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/privacypolicy',
    name: 'privacypolicy',
    component: Privacy,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
                      
router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        next()
      } else {
        next({name: 'login'})
      }
    })
  } else {
    next()
  }
})

export default router
