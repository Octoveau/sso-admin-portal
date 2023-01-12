<template>
  <section class="section">
    <RingLoader :loading="true" :color="color" :size="size"></RingLoader>
  </section>
</template>

<script>
import RingLoader from '@/components/RingLoader';
export default {
  data() {
    return {
      color: '#409eff',
      size: '100px',
    };
  },
  components: {
    RingLoader,
  },
  mounted() {
    //登录过，判断是否过期

    //没有登录过，需要带上
    this.handleRouter();
  },
  methods: {
    handleRouter() {
      let sitekey = this.$route.params.sitekey;
      let redirecturl = this.$route.query.redirecturl;
      this.$router.push({
        name: 'Login',
        query: {
          redirecturl,
          sitekey,
        },
      });
    },
  },
};
</script>
<style scoped lang="less">
.section {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
