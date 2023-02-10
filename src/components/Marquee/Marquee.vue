<template>
  <div class="advert-top">
    <div>
      <svg-icon icon-class="broadcast" class-name="brodcast" />
    </div>
    <!-- 滚动文字区域 -->
    <div class="marquee-wrap">
      <ul class="marquee-box" id="marquee-box">
        <li class="marquee-list" v-html="message" id="marquee"></li>
      </ul>
    </div>
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
    return {};
  },
  mounted() {
    // 延时滚动
    this.runMarquee();
  },
  methods: {
    runMarquee() {
      // 获取文字 计算后宽度
      let width = document.getElementById('marquee').getBoundingClientRect().width;
      let marquee = document.getElementById('marquee-box');
      let disx = width;
      marquee.style.right = -width + 'px';
      //设置位移
      setInterval(() => {
        disx -= 2;
        if (disx < -width) {
          disx = width; // 如果位移超过文字宽度，则回到起点  marquee-list的margin值
          marquee.style.right = -width + 'px';
        }
        marquee.style.right = -disx + 'px';
      }, 10); //滚动速度
    },
  },
};
</script>
<style>
li {
  list-style: none;
}
.advert-top {
  position: relative;
  display: flex;
  width: calc(100vw - 100px);
  height: 30px;
  background-color: #fff;
  color: #2d8cf0;
  font-size: 14px;
  align-items: center;
}
/* 以下代码与滚动相关 */
.marquee-wrap {
  position: relative;
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin-left: 16px;
}
.marquee-box {
  display: flex;
  white-space: nowrap;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>
