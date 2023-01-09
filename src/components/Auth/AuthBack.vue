<template>
  <section ref="backContainerRef" class="back-section">
    <div class="header-container">
      <slot name="header">
        <header class="header" ref="headerRef">
          <el-button type="text">用户管理</el-button>
          <el-button type="text">关于我们</el-button>
          <el-button type="text">帮助中心</el-button>
        </header>
      </slot>
    </div>

    <div class="container">
      <slot name="container"></slot>
    </div>
    <slot name="footer">
      <el-image :src="footerImg" class="back-img"></el-image>
    </slot>
  </section>
</template>

<script>
import footerImg from '@/assets/images/footer.png';
export default {
  data() {
    return {
      mainScreenWidth: null,
      footerImg,
    };
  },
  mounted() {
    this.mainScreenWidth = document.body.clientWidth;
    this.handlerWidth();
    window.onresize = () => {
      return (() => {
        this.mainScreenWidth = document.body.clientWidth;
        this.handlerWidth();
      })();
    };
  },
  methods: {
    handlerWidth() {
      let sectionDom = this.$refs.backContainerRef;
      if (this.mainScreenWidth <= 1500) {
        sectionDom.style.width = 1500 + 'px';
        return;
      }
      sectionDom.style.width = this.mainScreenWidth + 'px';
    },
  },
};
</script>

<style lang="less">
.back-section {
  position: relative;
  height: 100vh;
  background-image: url('../../assets/images/ssoback.png');
  background-repeat: no-repeat;
  background-position: top;
  background-size: 100% 100%;
  overflow-y: hidden;

  .header-container {
    z-index: 1000;
    position: relative;
    .el-button--text {
      color: azure;
      padding: 0 0.2rem;
    }
    .el-button--text:hover {
      color: #409eff;
    }
    .header {
      background-color: rgba(0, 0, 0, 0.5);
      height: 0.6rem;
      line-height: 0.6rem;
    }
  }
  .container {
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 2;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.5rem;
    background-color: rgba(0, 0, 0, 0.65);
    border-radius: 4px;
    box-shadow: 2px 2px 10px rgba(36, 36, 36, 0.6);
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
  .back-img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    opacity: 0.2;
  }
}
</style>
