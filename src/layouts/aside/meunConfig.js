const menuList = [
  {
    menu_name: 'DashBoard',
    menu_url: '/client/dashboard',
    menu_icon: 'el-icon-s-home',
  },
  {
    menu_name: '用户管理',
    menu_icon: 'el-icon-s-home',
    menu_url: '',
    children: [
      {
        menu_name: '用户列表',
        menu_url: '/client/user/detail',
        menu_icon: 'el-icon-s-home',
      },
    ],
  },
  {
    menu_name: '站点信息',
    menu_icon: 'el-icon-s-home',
    menu_url: '',
    children: [
      {
        menu_name: '站点列表',
        menu_url: '/client/site/detail',
        menu_icon: 'el-icon-s-home',
      },
      {
        menu_name: '创建站点',
        menu_url: '/client/site/create',
        menu_icon: 'el-icon-s-home',
      },
    ],
  },
];

export default menuList;
