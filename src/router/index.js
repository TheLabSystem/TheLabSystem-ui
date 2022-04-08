import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/view/login.vue'
import MainView from '@/view/mainView.vue'
const routes = [{
  path: '/',
  redirect: '/login'
}, {
  path: '/login',
  component: Login
}, {
  path: '/home',
  component: MainView
}]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
