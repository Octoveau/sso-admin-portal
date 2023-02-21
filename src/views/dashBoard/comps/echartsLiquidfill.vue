<template>
  <section class="section" ref="liquid"></section>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-liquidfill';
export default {
  name: 'LeftMainCompPage',
  data() {
    return {
      isLoading: false,
    };
  },
  mounted() {
    this.randerEcharts();
  },
  methods: {
    randerEcharts() {
      let option = {
        series: [
          {
            type: 'liquidFill',
            radius: '95%',
            data: [0.74],
            color: 'rgba(67,209,100,1)',
            label: {
              normal: {
                color: '#fff',
                insideColor: 'transparent',
                textStyle: {
                  fontSize: 28,
                  fontWeight: 'bold',
                },
              },
            },
            outline: {
              show: true,
              borderDistance: 5,
              itemStyle: {
                borderColor: '#E6A23C',
                borderWidth: 2,
              },
            },
            backgroundStyle: {
              color: 'rgba(67,209,100,1)',
            },
          },
        ],
      };
      let chartDom = this.$refs[`liquid`];
      let myChart = echarts.init(chartDom);
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.section {
  height: 220px;
  width: 280px;
}
</style>
