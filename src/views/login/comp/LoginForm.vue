<template>
  <div class="login-container">
    <div class="div-form">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
        <el-form-item prop="phoneNum">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input v-model.trim="loginForm.phoneNum" placeholder="手机号" maxlength="11"></el-input>
        </el-form-item>

        <span v-show="registerType === 1">
          <el-form-item prop="verificationCode">
            <span class="svg-container">
              <svg-icon icon-class="edit" />
            </span>
            <el-input ref="verificationcode" v-model.trim="loginForm.verificationCode" placeholder="验证码" name="verificationCode" maxlength="4" />
            <span @click="showPwd">
              <a @click="openSilder" class="a-verification" v-if="isCanSendCode">获取验证码</a>
              <span style="color: rgb(185 185 185)" v-else>重新发送{{ timeCount }}(s)</span>
            </span>
          </el-form-item>
        </span>
        <span v-show="registerType === 2">
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input ref="password" v-model.trim="loginForm.password" maxlength="20" :type="passwordType" placeholder="密码" name="password" />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </span>
        <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 0.2rem">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginRules, silderConfig } from '../help';
export default {
  name: 'Login',
  props: {
    registerType: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      silderConfig,
      timer: null,
      timeCount: 60,
      isCanSendCode: true,
      loginForm: {
        phoneNum: undefined,
        verificationCode: undefined,
        password: '',
      },
      loginRules,
      passwordType: 'password',
      loading: false,
    };
  },
  watch: {
    registerType() {
      //当登录方式切换的时候，做处理
      this.loginForm = {
        phoneNum: undefined,
        verificationCode: undefined,
        password: '',
      };
      this.$refs['loginForm'].resetFields();
    },
    silderConfig: {
      handler() {
        //如果验证成功，发送验证码
        if (this.silderConfig.isSilderSuccess) {
          this.getVerificationCode();
        }
      },
      deep: true,
    },
  },
  methods: {
    openSilder() {
      this.silderConfig.isShowSilder = true;
    },
    getVerificationCode() {
      this.timer = setInterval(() => {
        this.timeCount--;
        if (this.timeCount === 0) {
          this.isCanSendCode = true;
          clearInterval(this.timer);
          this.timeCount = 60;
        }
      }, 1000);
      this.isCanSendCode = false;
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login-container {
  ::v-deep .el-input {
    display: inline-block;
    height: 0.5rem;
    width: 2rem;
    input {
      text-align: left;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 0.15rem 0.0625rem 0.15rem 0.1875rem;
      color: #fff;
      caret-color: #fff;
    }
  }
  ::v-deep .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .div-form {
    .login-form {
      padding: 0.3rem 0.375rem;
      padding-bottom: 0;
      position: relative;
      width: 4rem;
      max-width: 100%;
      margin: 0 auto;
      overflow: hidden;
      .a-verification {
        cursor: pointer;
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: rgb(83, 81, 81);
      vertical-align: middle;
      width: 0.2rem;
      display: inline-block;
    }

    .show-pwd {
      position: absolute;
      right: 0.125rem;
      top: 0.0875rem;
      font-size: 0.2rem;
      color: #fff;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
