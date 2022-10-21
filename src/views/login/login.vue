<template>
  <section class="main">
    <AuthBackComp>
      <template v-slot:header>
        <header class="header">
          <el-button type="text">用户管理</el-button>
          <el-button type="text">关于我们</el-button>
          <el-button type="text">帮助中心</el-button>
        </header>
      </template>
      <template v-slot:container>
        <LoginContainerComp></LoginContainerComp>
      </template>
      <template v-slot:footer>
        <el-image :src="footerImg" class="back-img"></el-image>
      </template>
    </AuthBackComp>
  </section>
</template>

<script>
import AuthBackComp from "@/components/Admin/AuthBack.vue";
import LoginContainerComp from "@/views/login/comp/LoginContainer.vue";
import footerImg from "@/assets/images/footer.png";
export default {
  components: {
    AuthBackComp,
    LoginContainerComp,
  },
  data() {
    return {
      footerImg,
    };
  },
};
</script>

<style lang="less" scoped>
.main {
  position: inherit;
  .header {
    background-color: rgba(0, 0, 0, 0.5);
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: end;
    padding-right: 0.75rem;
  }
  .back-img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    opacity: 0.3;
  }
}
</style>
