<template>
  <menu-comp :menuList="menuList" />
</template>

<script>
import menuList from './meunConfig';
import MenuComp from '@components/Menu';
export default {
  components: {
    MenuComp,
  },
  data() {
    return {
      menuList,
    };
  },
};
</script>
