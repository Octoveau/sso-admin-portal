<template>
  <div ref="advert" class="advert-top">
    <div>
      <svg-icon icon-class="broadcast" class-name="brodcast" />
    </div>
    <!-- 滚动文字区域 -->
    <div class="marquee-wrap">
      <ul class="marquee-box" id="marquee-box">
        <li class="marquee-list" v-html="message" id="marquee"></li>
      </ul>
    </div>
    <i class="el-icon-circle-close" class-name="delete" @click="onClose"></i>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      clientWidth: null,
    };
  },
  model: {
    prop: 'value',
    event: 'newValue',
  },
  mounted() {
    // 延时滚动
    window.addEventListener('resize', () => {
      this.clientWidth = document.documentElement.clientWidth;
    });
    this.clientWidth = document.documentElement.clientWidth;
    this.runMarquee();
  },
  methods: {
    onClose() {
      this.$emit('newValue', false);
    },
    runMarquee() {
      // 获取文字 计算后宽度
      let width = document.getElementById('marquee').getBoundingClientRect().width;
      let marquee = document.getElementById('marquee-box');
      let disx = width;
      marquee.style.right = -width + 'px';
      //设置位移
      setInterval(() => {
        disx -= 1.5;
        if (disx < -(this.clientWidth - 400)) {
          disx = width; // 如果位移超过文字宽度，则回到起点  marquee-list的margin值
          marquee.style.right = -width + 'px';
        }
        marquee.style.right = -disx + 'px';
      }, 10); //滚动速度
    },
  },
};
</script>
<style lang="less" scoped>
::v-deep .el-icon-circle-close {
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}
li {
  list-style: none;
}
.advert-top {
  position: relative;
  display: flex;
  height: 32px;
  padding: 0 16px;
  color: #fff;
  align-items: center;
}
/* 以下代码与滚动相关 */
.marquee-wrap {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.marquee-box {
  white-space: nowrap;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>
