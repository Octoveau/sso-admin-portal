<template>
  <div class="bread-crumb-container" v-if="getIsHideBread">
    <el-breadcrumb spellcheck="/" class="breadcrumb-inner">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in breadCrumbList" :key="index">
          <a>
            {{ item.name }}
          </a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadCrumbList: [],
    };
  },
  watch: {
    $route() {
      return this.getBreadCrumbList();
    },
  },
  created() {
    this.getBreadCrumbList();
  },
  computed: {
    getIsHideBread() {
      return this.$route.meta.isHideBread ? false : true;
    },
  },
  methods: {
    // 获取面包屑列表
    getBreadCrumbList() {
      this.breadCrumbList = this.$route.meta.bread || [];
    },
  },
};
</script>

<style lang="less" scoped>
.bread-crumb-container {
  padding: 12px 0;
}
</style>
