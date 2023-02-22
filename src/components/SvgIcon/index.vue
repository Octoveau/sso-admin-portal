<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
  },
  computed: {
    isExternal() {
      return $validate.isExternal(this.iconClass);
    },
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon-' + this.className;
      } else {
        return 'svg-icon';
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`,
      };
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 0.2rem;
  height: 0.2rem;
  min-width: 16px;
  min-height: 16px;
  fill: currentColor;
  overflow: hidden;
  vertical-align: middle;
}
.svg-icon-delete {
  width: 24px;
  height: 24px;
  fill: currentColor;
  overflow: hidden;
  vertical-align: middle;
}
.svg-icon-brodcast {
  width: 24px;
  height: 24px;
  fill: currentColor;
  overflow: hidden;
  vertical-align: middle;
}
.svg-icon-logo {
  width: 200px;
  height: 180px;
  overflow: hidden;
  vertical-align: middle;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
