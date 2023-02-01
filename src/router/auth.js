const loginRoutes = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
    },
    component: () => import('@/views/auth/login'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: '注册',
    },
    component: () => import('@/views/auth/register'),
  },
  {
    path: '/passwordReset',
    name: 'PasswordReset',
    meta: {
      title: '找回密码',
    },
    component: () => import('@/views/auth/passwordReset'),
  },
  {
    path: '/clinet/logout',
    name: 'ClientLogout',
    meta: {
      title: '客户端退出登录',
    },
    component: () => import('@/views/openLogin/openLogout'),
  },
];

export default loginRoutes;
