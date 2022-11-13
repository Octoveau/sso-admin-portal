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
  margin: 0 0.2rem;
  position: relative;
  .main-content {
    height: calc(100vh - 1.2rem);
    background-color: rgb(251, 251, 251);
    border: 1px solid rgb(245, 243, 243);
    border-radius: 4px;
  }
}
</style>
