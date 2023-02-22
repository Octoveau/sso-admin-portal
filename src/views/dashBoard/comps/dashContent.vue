<template>
  <section class="section">
    <el-card>
      <div slot="header">
        <span class="block"></span>
        <strong>sso接入详情</strong>
      </div>
      <div>
        <ssoScrollTableComp></ssoScrollTableComp>
      </div>
    </el-card>
    <el-card>
      <div slot="header">
        <span class="block"></span>
        <strong>近7天接入详情</strong>
      </div>
      <contentAccessDetailComp></contentAccessDetailComp>
    </el-card>
    <el-card>
      <div slot="header">
        <span class="block"></span>
        <strong>接入成功率</strong>
      </div>
      <echartsLiquidfillComp></echartsLiquidfillComp>
    </el-card>
  </section>
</template>

<script>
import ssoScrollTableComp from '@/views/dashBoard/comps/ssoScrollTable';
import contentAccessDetailComp from '@/views/dashBoard/comps/contentAccessDetail';
import echartsLiquidfillComp from '@/views/dashBoard/comps/echartsLiquidfill';
export default {
  components: {
    ssoScrollTableComp,
    contentAccessDetailComp,
    echartsLiquidfillComp,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
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
      background-image: linear-gradient(to bottom, #127ce7, #386796);
      margin-right: 0.1rem;
    }
    strong {
      vertical-align: top;
    }
  }
  ::v-deep .el-card__body {
    padding: 0.1rem;
  }
}
</style>
