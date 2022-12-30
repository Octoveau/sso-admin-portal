<template>
  <section class="main">
    <AuthBackComp>
      <template v-slot:container>
        <h3 class="h3">Octoveau统一登录平台服务</h3>
        <LoginContainerComp></LoginContainerComp>
      </template>
    </AuthBackComp>
    <Silder v-if="silderConfig.isShowSilder"></Silder>
  </section>
</template>

<script>
import AuthBackComp from '@/components/Auth/AuthBack.vue';
import LoginContainerComp from '@/views/auth/comp/LoginContainer.vue';
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
    };
  },
};
</script>
