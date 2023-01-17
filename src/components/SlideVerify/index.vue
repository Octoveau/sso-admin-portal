<template>
  <section class="section">
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible">
      <div class="slide-title">
        <span>安全验证</span>
        <i @click="onClose" class="el-icon-circle-close icon"></i>
      </div>
      <div class="slider">
        <slide-verify
          :show="false"
          :imgs="imgsList"
          :l="42"
          :r="10"
          :w="600"
          :h="300"
          slider-text="拖动左边滑块完成上方拼图"
          @success="onSuccess"
          @fail="onFail"
        ></slide-verify>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { silderConfig } from '@/views/auth/help';
export default {
  name: 'App',
  data() {
    return {
      dialogVisible: true,
      imgsList: [
        `${process.env.VUE_APP_IMAGES_TARGET}/slider1.png`,
        `${process.env.VUE_APP_IMAGES_TARGET}/slider2.png`,
        `${process.env.VUE_APP_IMAGES_TARGET}/slider3.png`,
        `${process.env.VUE_APP_IMAGES_TARGET}/slider4.png`,
        `${process.env.VUE_APP_IMAGES_TARGET}/slider5.png`,
        `${process.env.VUE_APP_IMAGES_TARGET}/slider6.png`,
      ],
    };
  },
  methods: {
    onSuccess() {
      silderConfig.isSilderSuccess = true;
      silderConfig.isShowSilder = false;
    },
    onFail() {
      silderConfig.isSilderSuccess = false;
    },
    onClose() {
      silderConfig.isShowSilder = false;
    },
  },
};
</script>

<style lang="less" scoped>
.slide-verify-slider {
  top: -68px;
}
.section {
  background-color: antiquewhite;
  ::v-deep .el-dialog__header {
    display: none;
  }
  ::v-deep .el-dialog__body {
    padding: 0;
  }
  ::v-deep .el-dialog {
    width: 600px;
  }
  .slide-title {
    background-color: rgb(236, 233, 233);
    height: 50px;
    line-height: 50px;
    text-align: start;
    padding: 0 16px;
  }
  .icon {
    height: 50px;
    line-height: 50px;
    font-size: 24px;
    float: right;
  }
  .slider {
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
