<template>
  <div class="login-form">
    <div class="left">
      <el-image :src="loginLeftPic"></el-image>
    </div>
    <div class="right">
      <div class="header">
        <span class="title">
          <P :class="this.defaultLabel === 1 ? 'p-choose' : null" @click="changeLabel(1)">手机号验证码登录</P>
          <P :class="this.defaultLabel === 2 ? 'p-choose' : null" @click="changeLabel(2)">账号密码登录</P>
        </span>
        <span>
          <LoginFormComp :loginType="defaultLabel"></LoginFormComp>
        </span>
      </div>
      <div class="footer">
        <el-button type="text" @click="gotoRegister">立即注册</el-button>
        <span></span>
        <el-button type="text" @click="resetPwd">忘记密码</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import LoginFormComp from '@/views/auth/comp/LoginForm';
export default {
  components: {
    LoginFormComp,
  },
  data() {
    return {
      loginLeftPic: `${process.env.VUE_APP_IMAGES_TARGET}/loginicon.png`,
      defaultLabel: 1,
    };
  },
  methods: {
    gotoRegister() {
      this.$router.push({
        name: 'Register',
      });
    },
    resetPwd() {
      this.$router.push({
        name: 'PasswordReset',
      });
    },
    changeLabel(val) {
      this.defaultLabel = val;
    },
  },
};
</script>

<style lang="less" scoped>
.login-form {
  color: #fff;
  display: flex;
  align-items: center;
  .left {
    width: 5rem;
    min-width: 300px;
  }
  .right {
    width: 5rem;
    min-width: 300px;
    .header {
      .title {
        display: flex;
        justify-content: space-evenly;
        margin: 0 0.6rem;
        p {
          color: #dfe0e2;
          cursor: pointer;
        }
        .p-choose {
          color: #fff;
          font-size: 0.2rem;
          padding-bottom: 0.1rem;
          border-bottom: 4px solid #409eff;
        }
      }
    }
    .footer {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0 1.5rem;
      ::v-deep .el-button--text {
        color: #dfe0e2;
      }
      ::v-deep .el-button--text:hover {
        color: #fff;
      }
      span {
        display: inline-block;
        background-color: rgb(136, 133, 133);
        width: 2px;
        height: 0.2rem;
      }
    }
  }
}
</style>
