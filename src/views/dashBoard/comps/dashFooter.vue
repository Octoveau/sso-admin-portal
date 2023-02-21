<template>
  <section class="section">
    <div class="left">
      <el-card>
        <div slot="header">sso近7天接入状况</div>
        <div>
          <footerLineComp></footerLineComp>
        </div>
      </el-card>
    </div>
    <div class="right"></div>
  </section>
</template>

<script>
import footerLineComp from '@/views/dashBoard/comps/footerLine';
export default {
  components: {
    footerLineComp,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.section {
  display: flex;
  flex-wrap: wrap;
  margin: 0 0.1rem;
  ::v-deep .el-card {
    margin: 0.1rem;
  }
  ::v-deep .el-card__header {
    padding: 0.1rem;
    color: #fff;
    background-color: #409eff;
  }
  ::v-deep .el-card__body {
    padding: 0.1rem;
  }
  display: flex;
  .left {
  }
  .right {
  }
}
</style>
