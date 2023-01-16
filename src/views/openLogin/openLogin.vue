<template>
  <section class="section">
    <RingLoader :loading="true" :color="color"></RingLoader>
  </section>
</template>

<script>
import RingLoader from '@/components/Loading/RingLoader';
import authStorage from '@/utils/auth';
import { getAuthTicket } from '@/api/auth';
export default {
  data() {
    return {
      color: '#409eff',
      openSiteKey: '',
      openRedirectUrl: '',
      loginTimer: null,
      reLoginTimer: null,
    };
  },
  components: {
    RingLoader,
  },
  beforeDestroy() {
    clearTimeout(this.loginTimer);
    clearTimeout(this.reLoginTimer);
  },
  mounted() {
    this.openSiteKey = this.$route.params.sitekey;
    this.openRedirectUrl = this.$route.query.redirecturl;
    this.handleLogin();
  },
  methods: {
    async handleLogin() {
      //判断是否已经是登录过
      let userInfo = JSON.parse(authStorage.getUserInfo());
      if (userInfo) {
        let result = await getAuthTicket({ siteKey: this.openSiteKey });
        if (result.code === 200) {
          let { ticket, callbackUrl } = result.data;
          this.loginTimer = setTimeout(() => {
            //根据注册的sitekey地址回调回去
            this.openRedirectUrl
              ? window.open(`${callbackUrl}?ticket=${ticket}&redirecturl=${this.openRedirectUrl}`)
              : window.open(`${callbackUrl}?ticket=${ticket}`);
          }, 500);
          this.$message.success('验证成功');
        }
        if (result.code === 401) {
          //token已经过期，需要重新登录
          this.reLoginTimer = setTimeout(() => {
            this.gotoLogin();
          }, 500);
          this.$message.warning('登录已经过期，请重新登录');
        }
        return;
      }
      this.gotoLogin();
    },
    gotoLogin() {
      //没有登录过，跳转到登录
      this.$router.push({
        name: 'Login',
        query: {
          redirecturl: this.openRedirectUrl,
          sitekey: this.openSiteKey,
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
