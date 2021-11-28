import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import Detail from '../views/Detail.vue'
import SettingGoal from '../views/SettingGoal.vue'
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
    component: Welcome
  },
  {
    path: '/setting-goal',
    name: 'SettingGoal',
    component: SettingGoal,
    props: true
  },
  {
    path:'/:id',
    name: 'Detail',
    component: Detail,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
