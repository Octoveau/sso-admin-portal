<template>
  <section class="main">
    <AuthBackComp>
      <template v-slot:container>
        <h3 class="h3">Octoveau统一找回密码端</h3>
        <ResetFormComp></ResetFormComp>
      </template>
    </AuthBackComp>
  </section>
</template>

<script>
import AuthBackComp from '@/components/Auth/AuthBack.vue';
import ResetFormComp from '@/views/auth/comp/ResetForm.vue';
import footerImg from '@/assets/images/footer.png';
export default {
  components: {
    AuthBackComp,
    ResetFormComp,
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
