<template>
  <div class="v-spinner" v-show="loading">
    <div class="v-pacman v-pacman2" v-bind:style="[spinnerStyle, animationStyle, spinnerDelay2]"></div>
    <div class="v-pacman v-pacman3" v-bind:style="[spinnerStyle, animationStyle, spinnerDelay3]"></div>
    <div class="v-pacman v-pacman4" v-bind:style="[spinnerStyle, animationStyle, spinnerDelay4]"></div>
    <div class="v-pacman v-pacman5" v-bind:style="[spinnerStyle, animationStyle, spinnerDelay5]"></div>
    <div class="shanxing">
      <div class="sx1"></div>
      <div class="sx2"></div>
    </div>
    <div class="footer" data-text="正在退出中...">正在退出中...</div>
  </div>
</template>

<script>
export default {
  name: 'PacmanLoader',
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
      default: '40px',
    },
    margin: {
      type: String,
      default: '2px',
    },
    radius: {
      type: String,
      default: '100%',
    },
  },
  data() {
    return {
      spinnerDelay2: {
        animationDelay: '0.25s',
      },
      spinnerDelay3: {
        animationDelay: '0.50s',
      },
      spinnerDelay4: {
        animationDelay: '0.75s',
      },
      spinnerDelay5: {
        animationDelay: '1s',
      },
    };
  },
  computed: {
    spinnerStyle() {
      return {
        backgroundColor: this.color,
        width: this.size,
        height: this.size,
        margin: this.margin,
        borderRadius: this.radius,
      };
    },
    border1() {
      return this.size + ' solid transparent';
    },
    border2() {
      return this.size + ' solid ' + this.color;
    },
    spinnerStyle1() {
      return {
        width: 0,
        height: 0,
        borderTop: this.border2,
        borderRight: this.border1,
        borderBottom: this.border2,
        borderLeft: this.border2,
        borderRadius: this.size,
      };
    },
    animationStyle() {
      return {
        width: '16px',
        height: '16px',
        transform: 'translate(0, ' + -parseFloat(this.size) / 4 + 'px)',
        position: 'absolute',
        'z-index': 100,
        top: '75px',
        left: '220px',
        animationName: 'v-pacmanStretchDelay',
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        animationFillMode: 'both',
      };
    },
  },
};
</script>

<style>
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
.shanxing {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-color: rgb(255, 255, 255);
}
.sx1 {
  position: absolute;
  width: 150px;
  height: 150px;
  clip: rect(0px, 75px, 150px, 0px);
  border-radius: 100px;
  background-color: #409eff;
  animation: animate1 0.3s linear infinite;
}
@keyframes animate1 {
  0%,
  10%,
  100% {
    transform: rotate(-75deg);
  }

  70%,
  90% {
    transform: rotate(-30deg);
  }
}

.sx2 {
  position: absolute;
  width: 150px;
  height: 150px;
  clip: rect(0px, 75px, 150px, 0px);
  border-radius: 75px;
  background-color: #409eff;
  animation: animate2 0.3s linear infinite;
}
@keyframes animate2 {
  0%,
  10%,
  100% {
    transform: rotate(75deg);
  }

  70%,
  90% {
    transform: rotate(30deg);
  }
}

.v-spinner {
  text-align: center;
  position: relative;
}

/*TODO computed transform */
@-webkit-keyframes v-pacmanStretchDelay {
  75% {
    -webkit-opacity: 0.7;
    opacity: 0.7;
  }
  100% {
    -webkit-transform: translate(-100px, -6.25px);
    transform: translate(-100px, -6.25px);
  }
}

@keyframes v-pacmanStretchDelay {
  75% {
    -webkit-opacity: 0.7;
    opacity: 0.7;
  }
  100% {
    -webkit-transform: translate(-100px, -6.25px);
    transform: translate(-100px, -6.25px);
  }
}
</style>
