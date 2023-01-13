<template>
  <div class="login-container">
    <el-form ref="formData" :model="formData" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <el-form-item prop="phone">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model.trim="formData.phone" placeholder="手机号" maxlength="11"></el-input>
      </el-form-item>
      <span v-if="loginType === 1">
        <el-form-item prop="smsCode">
          <span class="svg-container">
            <svg-icon icon-class="edit" />
          </span>
          <el-input v-model.trim="formData.smsCode" placeholder="验证码" name="smsCode" maxlength="4" />
          <span>
            <a @click="onGetVerificationCode" class="a-verification" v-if="isCanSendCode">获取验证码</a>
            <span class="span-verification" style="color: rgb(185 185 185)" v-else>重新发送{{ timeCount }}s</span>
          </span>
        </el-form-item>
      </span>
      <span v-else>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input v-model.trim="formData.password" maxlength="20" :type="passwordType" placeholder="密码" name="password" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </span>
      <el-button :loading="loginLoading" type="primary" style="width: 100%; margin-bottom: 0.2rem" @click="openSilder">
        {{ loginLoading ? '登 录 中' : '登 录' }}
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { loginRules, silderConfig } from '../help';
import { loginUser, loginSmsUser, getAuthTicket } from '@/api/auth';
import authStorage from '@/utils/auth';
import smsCodeMixin from '@/mixins/ssoCode';
export default {
  name: 'Login',
  mixins: [smsCodeMixin],
  props: {
    loginType: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      silderConfig,
      isCanSendCode: true,
      formData: {
        phone: undefined,
        smsCode: undefined,
        password: '',
      },
      loginRules,
      openSiteKey: '',
      openRedirectUrl: '',
      passwordType: 'password',
      loginLoading: false,
    };
  },
  watch: {
    loginType() {
      //当登录方式切换的时候，做处理
      this.formData = {
        phone: undefined,
        smsCode: undefined,
        password: '',
      };
      this.$refs['formData'].resetFields();
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
        this.loginLoading = true;
        let request = {
          phone: this.formData.phone,
          smsCode: this.loginType === 1 ? this.formData.smsCode : undefined,
          password: this.loginType === 2 ? this.formData.password : undefined,
        };
        let result;
        //区别两种登录方式
        if (this.loginType === 1) {
          result = await loginSmsUser(request);
        } else {
          result = await loginUser(request);
        }
        //处理数据
        if (result.code === 200) {
          //数据写入缓存
          authStorage.setUserInfo(Object.assign(result.data.user, { token: result.data.token }));
          //5ba7b6fe36a04ce0bab97f103907123f
          //第三方接入的方式，因为存在sitekey
          if (this.openSiteKey) {
            //拿到站点的ticket
            let result = await getAuthTicket({ siteKey: this.openSiteKey });
            let { ticket, callbackUrl } = result.data;
            setTimeout(() => {
              //根据注册的sitekey地址回调回去
              this.openRedirectUrl
                ? window.open(`${callbackUrl}?ticket=${ticket}&redirecturl=${this.openRedirectUrl}`)
                : window.open(`${callbackUrl}?ticket=${ticket}`);
            }, 500);
            this.$message.success('登录成功');
          } else {
            this.$message.success('登录成功');
            //平台自己登录到管理页面
            this.$router.push({ name: 'DashBoard' });
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loginLoading = false;
        //登录成功之后，下次再次点击登录，需要弹出验证码
        this.silderConfig.isSilderSuccess = false;
      }
    },
    openSilder() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          this.silderConfig.isShowSilder = true;
        }
      });
    },
    showPwd() {
      this.passwordType === 'password' ? (this.passwordType = '') : (this.passwordType = 'password');
    },
  },
  mounted() {
    this.openSiteKey = this.$route.query.sitekey;
    this.openRedirectUrl = this.$route.query.redirecturl;
  },
};
</script>
<style lang="less" scoped>
.login-container {
  ::v-deep .el-form-item__content {
    display: flex;
    align-items: center;
    position: relative;
    .el-input {
      display: inline-block;
      height: 0.5rem;
      line-height: 0.5rem;
      width: 2.2rem;
      input {
        display: inline-block;
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: left;
        background: transparent;
        border: 0px;
        border-radius: 0px;
        min-width: 200px;
        color: #fff;
        caret-color: #fff;
        font-size: 0.2rem;
      }
    }
  }

  ::v-deep .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .login-form {
    padding: 0.2rem;
    position: relative;
    .a-verification {
      cursor: pointer;
      position: absolute;
      right: 0;
      transform: translateY(-50%);
      padding-right: 0.2rem;
    }
    .span-verification {
      color: rgb(185 185 185);
      position: absolute;
      right: 0;
      transform: translateY(-50%);
      padding-right: 0.2rem;
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
