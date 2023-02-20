<template>
  <section class="section">
    <dashHeaderComp></dashHeaderComp>
    <dashContentComp></dashContentComp>
  </section>
</template>

<script>
import dashHeaderComp from '@/views/dashBoard/comps/dashHeader';
import dashContentComp from '@/views/dashBoard/comps/dashContent';
export default {
  components: {
    dashHeaderComp,
    dashContentComp,
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.section {
  padding: 0.2rem;
}
</style>
