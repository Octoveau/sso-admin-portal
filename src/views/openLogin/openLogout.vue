<template>
  <section class="section">
    <PacmanLoader :loading="true"></PacmanLoader>
  </section>
</template>

<script>
import PacmanLoader from '@/components/Loading/PacmanLoader';
import authStorage from '@/utils/auth';
import { logoutSso } from '@/api/auth';
export default {
  data() {
    return {
      openSiteToken: '',
      openRedirectUrl: '',
      logoutTimer: null,
      logoutNoUserTimer: null,
    };
  },
  components: {
    PacmanLoader,
  },
  beforeDestroy() {
    clearTimeout(this.logoutTimer);
    clearTimeout(this.logoutNoUserTimer);
  },
  mounted() {
    if (this.$route.name === 'ClientLogout') {
      return this.handleLogoutClient();
    }
    this.openSiteToken = this.$route.params.sitetoken;
    this.openRedirectUrl = this.$route.query.redirecturl;
    this.handleLogout();
  },

  methods: {
    //客户端退出登录
    handleLogoutClient() {
      authStorage.removeUserInfo();
      this.$router.push({
        name: 'Login',
      });
    },
    async handleLogout() {
      //判断是否已经是登录过
      if (!this.openRedirectUrl) {
        return this.$$message.warning('请提供回调的redirecturl，以?redirecturl=xxx方式');
      }
      let userInfo = JSON.parse(authStorage.getUserInfo());
      if (userInfo) {
        const result = await logoutSso(this.openSiteToken);
        if (result.code === 200) {
          this.logoutTimer = setTimeout(() => {
            window.open(`${this.openRedirectUrl}`);
          }, 500);
          authStorage.removeUserInfo();
          this.$message.success('退出登录成功');
        }
      } else {
        this.logoutNoUserTimer = setTimeout(() => {
          window.open(`${this.openRedirectUrl}`);
        }, 500);
        this.$message.success('当前用户还没进行登录');
      }
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
