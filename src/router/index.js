import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [{
  path: '/',
  redirect: '/home',
}, {
  path: '/login',
  component: () => import('@/views/auth/login.vue'),
}, {
  path: '/home',
  component: () => import('@/views/layout.vue'),
  children: [],
}];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
