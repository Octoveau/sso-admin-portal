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
      //用户相关
      {
        path: 'user/detail',
        name: 'UserDetail',
        component: () => import('@/views/user/userDetail'),
        meta: {
          title: '用户列表',
          bread: [{ name: '用户管理' }, { name: '用户列表' }],
        },
      },
      //sitekey相关
      {
        path: 'site/detail',
        name: 'SiteDetail',
        component: () => import('@/views/siteKey/siteKeyDetail'),
        meta: {
          title: '站点列表',
          bread: [{ name: '站点信息' }, { name: '站点列表' }],
        },
      },
      {
        path: 'site/create',
        name: 'SiteCreate',
        component: () => import('@/views/siteKey/createSiteKey'),
        meta: {
          title: '创建站点',
          bread: [{ name: '站点信息' }, { name: '创建站点' }],
        },
      },
    ],
  },
];

export default adminRoutes;
