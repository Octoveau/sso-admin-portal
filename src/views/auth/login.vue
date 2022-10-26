<template>
  <section class="main">
    <AuthBackComp>
      <template v-slot:container>
        <LoginContainerComp></LoginContainerComp>
      </template>
      <template v-slot:footer>
        <el-image :src="footerImg" class="back-img"></el-image>
      </template>
    </AuthBackComp>
    <Silder v-if="silderConfig.isShowSilder"></Silder>
  </section>
</template>

<script>
import AuthBackComp from '@/components/Admin/AuthBack.vue';
import LoginContainerComp from '@/views/login/comp/LoginContainer.vue';
import footerImg from '@/assets/images/footer.png';
import Silder from '@/components/SlideVerify';
import { silderConfig } from './help';
export default {
  components: {
    AuthBackComp,
    LoginContainerComp,
    Silder,
  },
  data() {
    return {
      silderConfig,
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
