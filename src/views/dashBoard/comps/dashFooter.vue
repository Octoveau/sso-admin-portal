<template>
  <section class="section">
    <el-card>
      <div slot="header">
        <span class="block"></span>
        <strong>sso近7天接入状况</strong>
      </div>
      <div>
        <footerLineComp></footerLineComp>
      </div>
    </el-card>

    <el-card>
      <div slot="header">
        <span class="block"></span>
        <strong>近7天接入的地区排名及成功率</strong>
      </div>
      <div>
        <footerPieComp></footerPieComp>
        <footerPieAniComp></footerPieAniComp>
      </div>
    </el-card>
  </section>
</template>

<script>
import footerLineComp from '@/views/dashBoard/comps/footerLine';
import footerPieComp from '@/views/dashBoard/comps/footerPie';
import footerPieAniComp from '@/views/dashBoard/comps/footerPieAni';
export default {
  components: {
    footerLineComp,
    footerPieComp,
    footerPieAniComp,
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
    padding: 0.1rem 0;
    color: #409eff;
    .block {
      display: inline-block;
      height: 16px;
      width: 8px;
      background-image: linear-gradient(to bottom, #127ce7, #3384d6);
      margin-right: 0.1rem;
    }
    strong {
      vertical-align: top;
    }
  }
  ::v-deep .el-card__body {
    padding: 0.1rem;
  }
  display: flex;
}
</style>
