const menuList = [
  {
    menu_name: '概览',
    menu_url: '/client/dashboard',
    menu_icon: 'el-icon-s-home',
  },
  {
    menu_name: '用户管理',
    menu_icon: 'el-icon-user-solid',
    menu_url: '',
    children: [
      {
        menu_name: '用户列表',
        menu_url: '/client/user/detail',
      },
      {
        menu_name: '个人管理',
        menu_url: '/client/user/update',
      },
    ],
  },
  {
    menu_name: '站点信息',
    menu_icon: 'el-icon-s-platform',
    menu_url: '',
    children: [
      {
        menu_name: '站点列表',
        menu_url: '/client/site/detail',
      },
      {
        menu_name: '创建站点',
        menu_url: '/client/site/create',
      },
    ],
  },

  {
    menu_name: '系统设置',
    menu_icon: 'el-icon-s-tools',
    menu_url: '',
    children: [
      {
        menu_name: '角色管理',
        menu_url: '/client/system/role/management',
      },
      {
        menu_name: '权限管理',
        menu_url: '/client/system/perm/management',
      },
      {
        menu_name: '新建权限',
        menu_url: '/client/system/perm/create',
      },
    ],
  },
];

export default menuList;
