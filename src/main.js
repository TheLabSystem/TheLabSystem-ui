import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getCookie } from '@/utils/cookie.js';

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !getCookie('camp-session')) {
    next({ path: '/login' })
  } else {
    next()
  }
})

createApp(App).use(store).use(router).mount('#app')

