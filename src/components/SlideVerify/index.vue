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
import slideImg1 from '@/assets/images/slider/1.png';
import slideImg2 from '@/assets/images/slider/2.png';
export default {
  name: 'App',
  data() {
    return {
      dialogVisible: true,
      imgsList: [slideImg1, slideImg2],
    };
  },
  created() {
    //   for (let i = 0; i < 6; i++) {
    //     import(`@/assets/images/slider/${i + 1}.png`).then((res) => {
    //       this.imgsList.push(res);
    //     });
    //   }
  },
  methods: {
    onSuccess() {
      console.log('滑块验证通过');
    },
    onFail() {
      console.log('滑块验证不通过');
    },
    onClose() {
      console.log('关闭');
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
