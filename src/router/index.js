import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [{
  path: '/',
  redirect: '/home',
},
{
  path: '/login',
  name: '登录',
  component: () => import('@/views/auth/login.vue'),
},
{
  path: '/',
  component: () => import('@/views/layout.vue'),
  redirect: {
    path: '/home',
  },
  children: [
    {
      path: '/home',
      name: '首页',
      meta: {
        perm: 0,
      },
      component: () => import('@/views/home/home.vue'),
    },
    {
      path: '/profile',
      name: '个人中心',
      component: () => import('@/views/profile/profile.vue'),
    },
    {
      path: '/students',
      name: '学生管理',
      meta: {
        perm: 3,
      },
      component: () => import('@/views/students/students.vue'),
    },
    {
      path: '/devices',
      name: '设备管理',
      meta: {
        perm: 4,
      },
      component: () => import('@/views/devices/devices.vue'),
    },
    {
      path: '/reservation',
      name: '预约管理',
      meta: {
        perm: 1,
      },
      component: () => import('@/views/reservation/reservation.vue'),
    },
    {
      path: '/approval',
      name: '预约审批',
      meta: {
        perm: 3,
      },
      component: () => import('@/views/approval/approval.vue'),
    },
    {
      path: '/reportForm',
      name: '查看报表',
      meta: {
        perm: 5,
      },
      component: () => import('@/views/reportForm/reportForm.vue'),
    },
    {
      path: '/notice',
      name: '通知公告',
      meta: {
        perm: 0,
      },
      component: () => import('@/views/notice/notice.vue'),
    },
    {
      path: '/verify',
      name: '验证码管理',
      meta: {
        perm: 0,
      },
      component: () => import('@/views/verify/verify.vue'),
    }
  ],
}];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
