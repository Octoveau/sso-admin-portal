const openLoginRoutes = [
  {
    path: '/openLogin/:sitekey',
    name: 'OpenLogin',
    meta: {
      title: '接入验证',
    },
    component: () => import('@/views/openLogin/openLogin.vue'),
  },
  {
    path: '/openLogout/:sitetoken',
    name: 'OpenLogout',
    meta: {
      title: '退出登录',
    },
    component: () => import('@/views/openLogin/openLogout.vue'),
  },
];

export default openLoginRoutes;
