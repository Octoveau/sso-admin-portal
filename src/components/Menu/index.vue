<template>
  <el-menu :default-active="defaultActive" :unique-opened="true" :router="true" active-text-color="#ffffff" text-color="#ffffffa6" background-color="#000c17">
    <menu-item :menuList="menu"></menu-item>
  </el-menu>
</template>
<script>
import menuItem from './menuItem';
export default {
  name: 'Menu',
  components: { menuItem },
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    menu() {
      return this.menuList;
    },

    defaultActive() {
      const { path } = this.$route;
      if (path) {
        return path;
      }
      return 'DashBoard';
    },
  },
};
</script>
