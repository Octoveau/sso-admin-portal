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
  margin: 0 0.1rem;
  position: relative;
  .main-content {
    height: 100vh;
    background-color: rgb(240, 239, 239);
    border: 1px solid rgb(248, 247, 247);
    border-radius: 4px;
  }
}
</style>
