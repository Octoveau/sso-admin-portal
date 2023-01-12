const openLoginRoutes = [
  {
    path: '/openLogin/:sitekey',
    name: 'OpenLogin',
    meta: {
      title: '接入验证',
    },
    component: () => import('@/views/openLogin/openLogin.vue'),
  },
];

export default openLoginRoutes;
