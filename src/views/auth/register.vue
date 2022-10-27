<template>
  <section class="main">
    <AuthBackComp>
      <template v-slot:container>
        <h3 class="h3">Octoveau统一注册端</h3>
        <RegisterFormComp></RegisterFormComp>
      </template>
    </AuthBackComp>
  </section>
</template>

<script>
import AuthBackComp from '@/components/Auth/AuthBack.vue';
import RegisterFormComp from '@/views/auth/comp/RegisterForm.vue';
export default {
  components: {
    AuthBackComp,
    RegisterFormComp,
  },
  data() {
    return {};
  },
};
</script>
