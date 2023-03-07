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
          bread: [{ name: '概览' }, { name: 'DashBoard' }],
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
      {
        path: 'user/update',
        name: 'UserUpdate',
        component: () => import('@/views/user/updateUserInfo'),
        meta: {
          title: '用户设置',
          bread: [{ name: '用户管理' }, { name: '用户设置' }],
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

      //系统配置相关
      {
        path: 'system/role/management',
        name: 'RoleManagement',
        component: () => import('@/views/system/roleManagement'),
        meta: {
          title: '角色管理',
          bread: [{ name: '系统配置' }, { name: '角色管理' }],
        },
      },

      {
        path: 'system/perm/management',
        name: 'PermManagement',
        component: () => import('@/views/system/permManagement'),
        meta: {
          title: '权限管理',
          bread: [{ name: '系统配置' }, { name: '权限管理' }],
        },
      },
      {
        path: 'system/perm/create',
        name: 'CreatePerm',
        component: () => import('@/views/system/createOrUpdatePerm'),
        meta: {
          title: '创建权限',
          bread: [{ name: '系统配置' }, { name: '创建权限' }],
        },
      },
      {
        path: 'system/perm/update',
        name: 'updatePerm',
        component: () => import('@/views/system/createOrUpdatePerm'),
        meta: {
          title: '修改权限',
          bread: [{ name: '系统配置' }, { name: '修改权限' }],
        },
      },
      //创建或者修改role
      {
        path: 'system/role/create',
        name: 'CreateRole',
        component: () => import('@/views/system/createOrUpdateRole'),
        meta: {
          title: '创建角色',
          bread: [{ name: '系统配置' }, { name: '创建角色' }],
        },
      },
      {
        path: 'system/role/update',
        name: 'updateRole',
        component: () => import('@/views/system/createOrUpdateRole'),
        meta: {
          title: '修改角色',
          bread: [{ name: '系统配置' }, { name: '修改角色' }],
        },
      },
    ],
  },
];

export default adminRoutes;
