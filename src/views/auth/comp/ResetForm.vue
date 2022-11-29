<template>
  <div class="reset-container">
    <div class="left">
      <el-image :src="resetLeftPic" style="width: 5rem"></el-image>
    </div>
    <div class="right">
      <el-form ref="resetForm" :model="resetForm" :rules="resetRules" class="reset-form" autocomplete="on" label-position="left">
        <el-form-item prop="phone">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input v-model.trim="resetForm.phone" placeholder="手机号" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item prop="smsCode">
          <span class="svg-container">
            <svg-icon icon-class="edit" />
          </span>
          <el-input ref="smsCode" v-model.trim="resetForm.smsCode" placeholder="验证码" name="smsCode" maxlength="4" />
          <span>
            <a @click="onGetVerificationCode" class="a-verification" v-if="isCanSendCode">获取验证码</a>
            <span style="color: rgb(185 185 185)" v-else>重新发送{{ timeCount }}(s)</span>
          </span>
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input v-model.trim="resetForm.password" maxlength="20" :type="passwordType" placeholder="密码" name="password" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-button :loading="resetLoading" type="primary" style="width: 100%; margin-bottom: 0.2rem" @click="onReset">
          {{ resetLoading ? '提 交 中...' : '提 交' }}
        </el-button>
      </el-form>
      <div class="footer">
        <b>还没注册?</b>
        <el-button type="text" @click="gotoRegisterPage">去注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { resetRules } from '../help';
import resetLeftPic from '@/assets/images/loginicon4.png';
import { resetUserPwd } from '@/api/auth';
import smsCodeMixin from '@/mixins/ssoCode';
export default {
  name: 'ResetPage',
  mixins: [smsCodeMixin],
  data() {
    return {
      resetLeftPic,
      isCanSendCode: true,
      resetForm: {
        phone: undefined, //11位数字的字符
        smsCode: undefined, //验证码
        password: '',
      },
      resetRules,
      passwordType: 'password',
      resetLoading: false,
    };
  },

  methods: {
    //注册
    onReset() {
      this.$refs['resetForm'].validate((valid) => {
        if (valid) {
          let request = {
            phone: this.resetForm.phone,
            password: this.resetForm.password,
            smsCode: this.resetForm.smsCode, //生成随机的六位昵称，后期可以进行编辑
          };
          this.resetLoading = true;
          resetUserPwd(request)
            .then((res) => {
              if (res.code === 200) {
                //注册成功进行跳转
                this.$message.success('密码重置成功');
                clearInterval(this.timer);
                this.gotoRegisterPage();
              }
            })
            .finally(() => {
              this.resetLoading = false;
            });
        }
      });
    },
    //跳转登录界面
    gotoRegisterPage() {
      this.$router.push({
        name: 'Register',
      });
    },
    showPwd() {
      this.passwordType === 'password' ? (this.passwordType = '') : (this.passwordType = 'password');
    },
  },
};
</script>
<style lang="less" scoped>
.reset-container {
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
    .reset-form {
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
