<template>
  <section class="back-section">
    <div class="header">
      <slot name="header"> </slot>
    </div>
    <div class="container">
      <h3 class="h3">Octoveau统一登录平台</h3>
      <slot name="container"></slot>
    </div>
    <slot name="footer"></slot>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less">
.back-section {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets//images/ssoback.png");
  background-repeat: no-repeat;
  background-position: top;
  background-size: 100% 100%;
  .header {
    .el-button--text {
      color: azure;
      padding: 0 0.2rem;
    }
    .el-button--text :hover {
      color: #409eff;
    }
  }
  .container {
    position: absolute;
    left: 10%;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.2rem;
    min-width: 5rem;
    min-height: 2rem;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    box-shadow: 2px 2px 10px rgba(66, 66, 66, 0.6);
    .h3 {
      color: #dfe0e2;
      position: absolute;
      top: -1rem;
      left: 0;
      font-size: 0.5rem;
      width: 100%;
      letter-spacing: 0.1rem;
    }
    .h3:hover {
      color: #fff;
    }
  }
}
</style>
