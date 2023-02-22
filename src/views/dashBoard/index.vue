<template>
  <section class="main-section">
    <dashHeaderComp></dashHeaderComp>
    <dashContentComp></dashContentComp>
    <dashFooterComp></dashFooterComp>
  </section>
</template>

<script>
import dashHeaderComp from '@/views/dashBoard/comps/dashHeader';
import dashContentComp from '@/views/dashBoard/comps/dashContent';
import dashFooterComp from '@/views/dashBoard/comps/dashFooter';
export default {
  components: {
    dashHeaderComp,
    dashContentComp,
    dashFooterComp,
  },
};
</script>
<style lang="less" scoped>
.main-section {
  padding: 0.1rem 0;
}
</style>
