<template>
  <div class="register-container">
    <div class="left">
      <el-image :src="registerLeftPic" style="width: 5rem"></el-image>
    </div>
    <div class="right">
      <el-form ref="formData" :model="formData" :rules="registerRules" class="regisetr-form" autocomplete="on" label-position="left">
        <el-form-item prop="phone">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input v-model.trim="formData.phone" placeholder="手机号" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item prop="smsCode">
          <span class="svg-container">
            <svg-icon icon-class="edit" />
          </span>
          <el-input ref="smsCode" v-model.trim="formData.smsCode" placeholder="验证码" name="smsCode" maxlength="4" />
          <span>
            <a @click="onGetVerificationCode" class="a-verification" v-if="isCanSendCode">获取验证码</a>
            <span style="color: rgb(185 185 185)" v-else>重新发送{{ timeCount }}(s)</span>
          </span>
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input v-model.trim="formData.password" maxlength="20" :type="passwordType" placeholder="密码" name="password" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item prop="rePassword">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input v-model.trim="formData.rePassword" maxlength="20" :type="rePasswordType" placeholder="请再次确定密码" name="password" />
          <span class="show-pwd" @click="reShowPwd">
            <svg-icon :icon-class="rePasswordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-button :loading="registerLoading" type="primary" style="width: 100%; margin-bottom: 0.2rem" @click="onRegister">
          {{ registerLoading ? '注 册 中...' : '注 册' }}
        </el-button>
      </el-form>
      <div class="footer">
        <b>已有账号?</b>
        <el-button type="text" @click="gotoLoginPage">去登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { registerRules } from '../help';
import registerLeftPic from '@/assets/images/loginicon4.png';
import commonUtil from '@/utils/index';
import { registerUser } from '@/api/auth';
import smsCodeMixin from '@/mixins/ssoCode';
export default {
  name: 'RegisterPage',
  mixins: [smsCodeMixin],
  data() {
    return {
      registerLeftPic,
      formData: {
        phone: undefined, //11位数字的字符
        smsCode: undefined, //验证码
        password: '', //注册密码
        rePassword: '', //再次确认密码
      },
      registerRules,
      passwordType: 'password',
      rePasswordType: 'password',
      registerLoading: false,
    };
  },

  methods: {
    //注册
    onRegister() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          //验证两次密码是否一致
          if (this.formData.password !== this.formData.rePassword) {
            return this.$message.warning('两次输入的密码不一致，请重新输入!');
          }
          let request = {
            phone: this.formData.phone,
            password: this.formData.password,
            smsCode: this.formData.smsCode,
            nickName: commonUtil.randomlyCharacters(6), //生成随机的六位昵称，后期可以进行编辑
          };
          this.registerLoading = true;
          registerUser(request)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success('注册成功');
                clearInterval(this.timer);
                this.gotoLoginPage();
              }
            })
            .finally(() => {
              this.registerLoading = false;
            });
        }
      });
    },
    //跳转登录界面
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
.register-container {
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

    .regisetr-form {
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
