<template>
  <div class="login-container">
    <div class="div-form">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input-number
            :controls="false"
            ref="username"
            v-model.trim="loginForm.username"
            placeholder="手机号"
            name="username"
            type="number"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model.trim="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 0.2rem"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: null,
        password: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户手机号", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
        ],
      },
      passwordType: "password",
      loading: false,
    };
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
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
    width: 2.5rem;
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
