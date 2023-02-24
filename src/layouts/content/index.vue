<template>
  <div class="main-container">
    <bread-crumb />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import BreadCrumb from '@components/BreadCrumb';
export default {
  components: {
    BreadCrumb,
  },
};
</script>

<style lang="less" scoped>
.main-container {
  position: relative;
  .main-content {
    height: calc(100vh - 60px);
  }
}
</style>
