import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import Detail from '../views/Detail.vue'
import SettingGoal from '../views/SettingGoal.vue'
import NotFound from '../views/NotFound.vue'
import { projectAuth } from '../firebase/config'

// auth guard
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if(!user) {
    next({ name: 'Welcome' })
  } else {
    next()
  }
}

const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if(user) {
    next({ name: 'Home'})
  } else {
    next()
  }
}

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    beforeEnter: requireNoAuth
  },
  {
    path: '/setting-goal',
    name: 'SettingGoal',
    component: SettingGoal,
    props: true,
    beforeEnter: requireAuth
  },
  // catchall 404
  {
    path:  '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path:'/detail/:id',
    name: 'Detail',
    component: Detail,
    props: true,
    beforeEnter: requireAuth
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
