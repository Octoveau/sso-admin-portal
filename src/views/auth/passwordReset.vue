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
export default {
  components: {
    AuthBackComp,
    ResetFormComp,
  },
  data() {
    return {};
  },
};
</script>
