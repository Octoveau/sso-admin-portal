<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <el-form-item prop="phone">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model.trim="loginForm.phone" placeholder="手机号" maxlength="11"></el-input>
      </el-form-item>
      <span v-if="loginType === 1">
        <el-form-item prop="smsCode">
          <span class="svg-container">
            <svg-icon icon-class="edit" />
          </span>
          <el-input v-model.trim="loginForm.smsCode" placeholder="验证码" name="smsCode" maxlength="4" />
          <span>
            <a @click="onGetVerificationCode" class="a-verification" v-if="isCanSendCode" :loading="verCodeLoading">获取验证码</a>
            <span style="color: rgb(185 185 185)" v-else>重新发送{{ timeCount }}(s)</span>
          </span>
        </el-form-item>
      </span>
      <span v-else>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input v-model.trim="loginForm.password" maxlength="20" :type="passwordType" placeholder="密码" name="password" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </span>
      <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 0.2rem" @click="openSilder">
        {{ loading ? '登 录 中' : '登 录' }}
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { loginRules, silderConfig } from '../help';
import { loginUser, smsCode, loginSmsUser } from '@/api/auth';
import authStorage from '@/utils/auth';
export default {
  name: 'Login',
  props: {
    loginType: {
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
        phone: undefined,
        smsCode: undefined,
        password: '',
      },
      loginRules,
      passwordType: 'password',
      loading: false,
      verCodeLoading: false,
    };
  },
  watch: {
    loginType() {
      //当登录方式切换的时候，做处理
      this.loginForm = {
        phone: undefined,
        smsCode: undefined,
        password: '',
      };
      this.$refs['loginForm'].resetFields();
    },
    silderConfig: {
      handler() {
        //如果验证成功，发送验证码
        if (this.silderConfig.isSilderSuccess === true) {
          this.onLogin();
        }
      },
      deep: true,
    },
  },
  methods: {
    //登录逻辑
    async onLogin() {
      try {
        this.loading = true;
        let result = '';
        //区别两种登录方式
        if (this.loginType === 1) {
          result = await loginSmsUser({
            phone: this.loginForm.phone,
            smsCode: this.loginForm.smsCode,
          });
        } else {
          result = await loginUser({
            phone: this.loginForm.phone,
            password: this.loginForm.password,
          });
        }
        //处理数据
        if (result.code === 200) {
          this.$message.success('登录成功');
          //数据写入缓存
          authStorage.setUserInfo(Object.assign(result.data.user, { token: result.data.token }));
          //分两种情况，1.登录该平台，2.作为单点登录平台
          // eslint-disable-next-line no-constant-condition
          if (true) {
            //跳转到管理页
            this.$router.push({ name: 'DashBoard' });
          }
        }
      } catch (error) {
        this.loading = false;
        //登录成功之后，下次再次点击登录，需要弹出验证码
        this.silderConfig.isSilderSuccess = false;
        console.error(error);
      }
    },
    openSilder() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.silderConfig.isShowSilder = true;
        }
      });
    },
    onGetVerificationCode() {
      //获取验证码
      this.verCodeLoading = true;
      smsCode(this.loginForm.phone)
        .then((res) => {
          if (res.code === 200) {
            this.$message.success('验证码发送成功');
            this.handleCode();
          }
        })
        .finally(() => {
          this.verCodeLoading = false;
        });
    },
    //处理获取验证码后续
    handleCode() {
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
      this.passwordType === 'password' ? (this.passwordType = '') : (this.passwordType = 'password');
    },
  },
};
</script>
<style lang="less" scoped>
.login-container {
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
}
</style>
