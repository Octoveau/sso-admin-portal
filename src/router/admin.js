const adminRoutes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/client',
    name: 'Layout',
    component: () => import('@/layouts'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'DashBoard',
        component: () => import('@/views/dashBoard'),
        meta: {
          title: 'DashBoard',
          bread: [{ name: 'DashBoard' }],
        },
      },
      {
        path: 'user/detail',
        name: 'UserDetail',
        component: () => import('@/views/user/userDetail'),
        meta: {
          title: '用户列表',
          bread: [{ name: '用户列表' }],
        },
      },
    ],
  },
];

export default adminRoutes;
