<template>
  <div class="bread-crumb-container">
    <el-breadcrumb spellcheck="/" class="breadcrumb-inner">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in breadCrumbList" :key="index">
          <a v-if="item.jump" @click.prevent="handleJumpLink(item.jump)">
            {{ item.name }}
          </a>
          <a v-else>
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
  methods: {
    // 获取面包屑列表
    getBreadCrumbList() {
      this.breadCrumbList = this.$route.meta.bread || [];
    },
    // 跳转
    handleJumpLink(name) {
      this.$router.push({
        name,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.bread-crumb-container {
  padding: 12px 0;
}
</style>
