<template>
  <section class="section" ref="footerPieAniRef"></section>
</template>

<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
      timer: null,
    };
  },
  methods: {
    randerEcharts() {
      let option = {
        textStyle: {
          fontSize: 12,
        },
        series: [
          {
            radius: '100%',
            type: 'gauge',
            detail: {
              offsetCenter: [0, '30%'],
              fontSize: 16,
              formatter: '{value}%',
            },
            data: [
              {
                value: 50,
                name: '成功率',
              },
            ],
            axisLine: {
              show: true,
              lineStyle: {
                color: [
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0.1,
                        color: '#FFC600',
                      },
                      {
                        offset: 0.6,
                        color: '#30D27C',
                      },
                      {
                        offset: 1,
                        color: '#0B95FF',
                      },
                    ]),
                  ],
                ],
              },
            },
          },
        ],
      };
      this.timer = setInterval(function () {
        option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        myChart.setOption(option, true);
      }, 2000);
      let chartDom = this.$refs[`footerPieAniRef`];
      let myChart = echarts.init(chartDom);
      myChart.setOption(option, true);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    },
  },
  mounted() {
    this.randerEcharts();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="less" scoped>
.section {
  height: 200px;
  width: 350px;
}
</style>
