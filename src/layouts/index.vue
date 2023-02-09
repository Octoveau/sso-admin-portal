<template>
  <section>
    <MarqueeComp content="wowoo我我我"></MarqueeComp>
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
import MarqueeComp from '@/components/Marquee/Marquee.vue';
export default {
  components: {
    HeaderComp,
    ContentComp,
    AsideComp,
    MarqueeComp,
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
::v-deep .el-header {
  height: 0.6rem !important;
  min-height: 32px;
  line-height: 0.6rem !important;
  vertical-align: middle;
  background-color: #001529;
  border: 0;
}
</style>
