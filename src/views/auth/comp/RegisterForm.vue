<template>
  <div class="login-container">
    <div class="left">
      <el-image :src="loginLeftPic" style="width: 5rem"></el-image>
    </div>
    <div class="right">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
        <el-form-item prop="phoneNum">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input v-model.trim="loginForm.phoneNum" placeholder="手机号" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item prop="verificationCode">
          <span class="svg-container">
            <svg-icon icon-class="edit" />
          </span>
          <el-input ref="verificationcode" v-model.trim="loginForm.verificationCode" placeholder="验证码" name="verificationCode" maxlength="4" />
          <span>
            <a @click="getVerificationCode" class="a-verification" v-if="isCanSendCode">获取验证码</a>
            <span style="color: rgb(185 185 185)" v-else>重新发送{{ timeCount }}(s)</span>
          </span>
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input v-model.trim="loginForm.password" maxlength="20" :type="passwordType" placeholder="密码" name="password" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item prop="rePassword">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input v-model.trim="loginForm.rePassword" maxlength="20" :type="passwordType" placeholder="请再次确定密码" name="password" />
          <span class="show-pwd" @click="reShowPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 0.2rem" @click="onRegister">注 册</el-button>
      </el-form>
      <div class="footer">
        <b>已有账号?</b>
        <el-button type="text" @click="gotoLoginPage">去登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { loginRules, silderConfig } from '../help';
import loginLeftPic from '@/assets/images/loginicon4.png';
import commonUtil from '@/utils/index';
import { registerUser } from '@/api/auth';
export default {
  name: 'RegisterPage',
  data() {
    return {
      loginLeftPic,
      silderConfig,
      timer: null,
      timeCount: 60,
      isCanSendCode: true,
      loginForm: {
        phone: undefined, //11位数字的字符
        verificationCode: undefined, //验证码
        password: '', //注册密码
        rePassword: '', //再次确认密码
      },
      loginRules,
      passwordType: 'password',
      rePasswordType: 'password',
      loading: false,
    };
  },

  methods: {
    //注册
    onRegister() {
      let request = {
        phone: this.loginForm.phone,
        password: this.loginForm.password,
        nickName: commonUtil.randomlyCharacters(6), //生成随机的六位昵称，后期可以进行编辑
      };
      registerUser(request)
        .then((res) => {})
        .finally(() => {});
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
    gotoLoginPage() {
      this.$router.push({
        name: 'Login',
      });
    },
    showPwd() {
      this.passwordType === 'password' ? (this.passwordType = '') : (this.passwordType = 'password');
    },
    reShowPwd() {
      this.rePasswordType === 'password' ? (this.rePasswordType = '') : (this.rePasswordType = 'password');
    },
  },
};
</script>
<style lang="less" scoped>
.login-container {
  color: #fff;
  display: flex;
  align-items: center;
  .left {
    width: 4rem;
  }
  .right {
    ::v-deep .el-input {
      display: inline-block;
      height: 0.5rem;
      line-height: 0.5rem;
      width: 2.2rem;
      input {
        text-align: left;
        background: transparent;
        border: 0px;
        border-radius: 0px;
        padding: 0.1rem;
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

    .footer {
      text-align: center;
    }
  }
}
</style>
