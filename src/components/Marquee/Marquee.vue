<template>
  <div class="marquee" :style="{ backgroundColor: bgColor, height }">
    <span><svg-icon icon-class="broadcast" class-name="brodcast" /></span>
    <span class="marquee__title" ref="marqueeTitle" :style="{ color, fontSize, animationDuration: speed + 's', '--speed': speed }" v-html="title"></span>
    <i class="i-deleteel-icon-circle-close"></i>
  </div>
</template>

<script>
/**
 * NoticeBar 公告栏跑马灯
 * @description 从右往左的跑马灯
 * @property {String} content 显示的内容，支持html
 * @property {String} color 文字颜色，默认#EFF0DB
 * @property {Number} fontSize 文字大小，默认40
 * @property {Number} speed 滚动速度，单位s（播放一次所用时间，默认根据内容宽度计算时间）
 * @property {String} bgColor 背景颜色，默认#CC2529
 * @property {Number} height 背景高度，默认78
 */
export default {
  name: 'NoticeBar',
  props: {
    content: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#E6A23C',
    },
    fontSize: {
      type: String,
      default: '16px',
    },
    speed: {
      type: Number,
      default: 0,
    },
    bgColor: {
      type: String,
      default: 'rgb(250 236 216)',
    },
    height: {
      type: String,
      default: '0.5rem',
    },
  },
  data() {
    return {
      DEFAULT_SPEED: 143, // 默认速度，每秒跑的距离，单位：px/s
      title: '',
    };
  },
  watch: {
    content(value) {
      this.title = value;
      this.calcSpeed();
    },
  },
  created() {
    if (this.content) {
      this.title = this.content;
      this.calcSpeed();
    }
  },
  methods: {
    calcSpeed() {
      if (this.title !== '' && this.speed === 0) {
        this.$nextTick(() => {
          let width = this.$refs.marqueeTitle.clientWidth;
          this.speed = Number(width / this.DEFAULT_SPEED).toFixed(2);
        });
      }
    },
  },
};
</script>

<style scoped="scoped">
.i-delete {
  color: #e6a23c;
  position: absolute;
  right: 0;
}
.marquee {
  padding: 0 0.4rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
}
.marquee__title {
  letter-spacing: 3px;
  cursor: default;
  display: inline-block;
  padding-left: 100%;
  animation: marqueeMove calc(var(--speed) * 1s) linear infinite;
}
.marquee:hover .marquee__title {
  animation-play-state: paused;
}
@keyframes marqueeMove {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>
