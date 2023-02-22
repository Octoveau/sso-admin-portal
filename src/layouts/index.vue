<template>
  <section>
    <el-container direction="vertical">
      <el-header>
        <header-comp />
      </el-header>
      <el-container>
        <el-aside style="width: 200px">
          <aside-comp />
        </el-aside>
        <el-main>
          <content-comp />
        </el-main>
      </el-container>
    </el-container>
  </section>
</template>

<script>
import HeaderComp from './header';
import ContentComp from './content';
import AsideComp from './aside';

export default {
  components: {
    HeaderComp,
    ContentComp,
    AsideComp,
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
::v-deep .el-header {
  height: 40px !important;
  background-color: #001529;
  border: 0;
  padding: 0;
}
</style>
