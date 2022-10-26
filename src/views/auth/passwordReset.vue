<template>
  <section class="main">
    <AuthBackComp>
      <template v-slot:container>
        <RegisterFormComp></RegisterFormComp>
      </template>
      <template v-slot:footer>
        <el-image :src="footerImg" class="back-img"></el-image>
      </template>
    </AuthBackComp>
  </section>
</template>

<script>
import AuthBackComp from '@/components/Admin/AuthBack.vue';
import RegisterFormComp from '@/views/login/comp/RegisterForm.vue';
import footerImg from '@/assets/images/footer.png';
export default {
  components: {
    AuthBackComp,
    RegisterFormComp,
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
  .back-img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    opacity: 0.3;
  }
}
</style>
