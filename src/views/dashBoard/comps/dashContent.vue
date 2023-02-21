<template>
  <section class="section">
    <el-card>
      <div slot="header">sso接入详情</div>
      <div>
        <ssoScrollTableComp></ssoScrollTableComp>
      </div>
    </el-card>
    <el-card>
      <div slot="header">近7天接入详情</div>
      <contentAccessDetailComp></contentAccessDetailComp>
    </el-card>
    <el-card>
      <div slot="header">接入成功率</div>
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
    padding: 0.1rem;
    color: #fff;
    background-color: #409eff;
  }
  ::v-deep .el-card__body {
    padding: 0.1rem;
  }
}
</style>
