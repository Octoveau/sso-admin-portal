<template>
  <div class="v-spinner" v-show="loading">
    <div class="v-ring v-ring1" :style="spinnerBasicStyle">
      <div class="v-ring v-ring2" :style="spinnerStyle"></div>
      <div class="v-ring v-ring3" :style="spinnerStyle"></div>
    </div>
    <div class="footer" data-text="正在验证中...">正在验证中...</div>
  </div>
</template>

<script>
export default {
  name: 'RingLoader',
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: '#409eff',
    },
    size: {
      type: String,
      default: '60px',
    },
    radius: {
      type: String,
      default: '100%',
    },
  },
  computed: {
    spinnerStyle() {
      return {
        height: this.size,
        width: this.size,
        border: parseFloat(this.size) / 10 + 'px solid' + this.color,
        opacity: 0.8,
        borderRadius: this.radius,
      };
    },
    spinnerBasicStyle() {
      return {
        height: this.size,
        width: this.size,
        position: 'relative',
      };
    },
  },
};
</script>

<style lang="less" scoped>
.footer {
  margin-top: 32px;
  position: relative;
  font-size: 20px;
  color: #ffffff;
}
.footer::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  color: #409eff;
  overflow: hidden;
  -webkit-text-stroke: 0vw #383d52;
  animation: animate 3s linear infinite;
}
.v-spinner {
  text-align: center;
  .v-ring2 {
    -webkit-animation: v-ringRightRotate 2s 0s infinite linear;
    animation: v-ringRightRotate 2s 0s infinite linear;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    perspective: 800px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .v-ring3 {
    -webkit-animation: v-ringLeftRotate 2s 0s infinite linear;
    animation: v-ringLeftRotate 2s 0s infinite linear;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
    perspective: 800px;
    position: absolute;
    top: 0;
    left: 0;
  }
}

@-webkit-keyframes v-ringRightRotate {
  0% {
    -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg);
    transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg);
  }
}

@keyframes v-ringRightRotate {
  0% {
    -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg);
    transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg);
  }
}

@-webkit-keyframes v-ringLeftRotate {
  0% {
    -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg);
    transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg);
  }
}

@keyframes v-ringLeftRotate {
  0% {
    -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg);
    transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg);
  }
}
@keyframes animate {
  0%,
  10%,
  100% {
    width: 0;
  }

  70%,
  90% {
    width: 100%;
  }
}
</style>
