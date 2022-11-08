const menuList = [
  {
    menu_name: 'DashBoard',
    menu_url: '/client/dashboard',
    menu_icon: 'el-icon-s-home',
  },
  {
    menu_name: '用户管理',
    menu_icon: 'el-icon-s-home',
    menu_url: '/client/user/detail',
    children: [
      {
        menu_name: '用户列表',
        menu_url: '/client/user/detail',
        menu_icon: 'el-icon-s-home',
      },
    ],
  },
];

export default menuList;
