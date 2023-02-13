<template>
  <div class="header-container">
    <div>
      <div class="logo-title">
        <!-- <el-image :src="logo"></el-image> -->
        <span>Octovean用户管理平台</span>
      </div>
    </div>
    <div class="marquee">
      <MarqueeComp v-model="value" v-if="isShowMarquee" :message="message"></MarqueeComp>
    </div>
    <div>
      <div class="header-logout">
        <el-image
          slot="reference"
          style="height: 32px; vertical-align: middle"
          :preview-src-list="['http://www.octoveau.cn/file-sso-avatar/looper-avatar.png']"
          src="http://www.octoveau.cn/file-sso-avatar/looper-avatar.png"
        ></el-image>

        <div>
          <el-dropdown>
            <span class="el-dropdown-link">
              <span>{{ userInfo.nickName }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item key="0">
                <span @click="handleJumpToPersonal">个人设置</span>
              </el-dropdown-item>
              <el-dropdown-item key="1">
                <span @click="handleLogout">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authStorage from '@/utils/auth';
import MarqueeComp from '@/components/Marquee/Marquee.vue';
import logo from '@/assets/icons/logo.png';
export default {
  data() {
    return {
      logo,
      value: null,
      userInfo: null,
      isShowMarquee: true,
      message: 'vue2-sso-login已经上线,线上地址http://www.octoveau.cn/sso-login/,目前正在增加权限功能',
    };
  },
  components: {
    MarqueeComp,
  },
  created() {
    this.userInfo = JSON.parse(authStorage.getUserInfo() || '{}');
  },
  watch: {
    // 下面这个监听只是为了打印显示
    value(newValue) {
      this.isShowMarquee = newValue;
    },
  },
  methods: {
    handleJumpToPersonal() {
      this.$router.push({
        name: 'UserUpdate',
      });
    },

    handleLogout() {
      this.$router.push({
        name: 'ClientLogout',
      });
    },
  },
};
</script>
<style lang="less" scoped>
.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .logo-title {
    color: #fff;
    font-weight: bold;
    font-size: 0.3rem;
    width: 180px;
    text-align: center;
  }
  .marquee {
    flex: 1;
  }

  .header-logout {
    display: flex;
    align-items: center;
    justify-content: right;
    width: 180px;
  }

  .el-dropdown-link {
    margin-left: 0.2rem;
    cursor: pointer;
    color: #fff;
  }

  .el-col {
    border: 1px solid transparent;
  }
}

.el-dropdown-menu {
  top: 0.5rem !important;
}
</style>
