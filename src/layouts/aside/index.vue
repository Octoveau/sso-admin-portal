<template>
  <menu-comp :menuList="menuData" />
</template>

<script>
import menuList from './meunConfig';
import MenuComp from '@components/Menu';
export default {
  components: {
    MenuComp,
  },

  computed: {
    menuData() {
      return menuList;
    },
  },
};
</script>

<style lang="less" scoped>
// .aside-container {
//   height: 100%;
//   ::v-deep .el-menu {
//     background-color: #001529 !important;
//   }
//   ::v-deep .el-menu-item {
//     background-color: #001529 !important;
//   }
//   ::v-deep .el-submenu__title {
//     background-color: #001529 !important;
//   }
// }
</style>
