<template>
  <section class="section">
    <RingLoader v-if="!progressControl" :loading="true" :color="color" :size="size"></RingLoader>
  </section>
</template>

<script>
import RingLoader from '@/components/RingLoader';
export default {
  data() {
    return {
      color: '#409eff',
      size: '100px',
    };
  },
  components: {
    RingLoader,
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="less">
.section {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
