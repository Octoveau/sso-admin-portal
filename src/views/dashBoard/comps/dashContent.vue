<template>
  <section class="section">
    <div class="section-left">
      <el-card>
        <div ref="chinaMapRef" class="china" id="china"></div>
      </el-card>
    </div>
    <div class="section-right"></div>
  </section>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts/map/js/china.js';
export default {
  data() {
    return {};
  },
  mounted() {
    this.handleChinaMap();
  },
  methods: {
    handleChinaMap() {
      var chinaGeoCoordMap = {
        黑龙江: [127.9688, 45.368],
        内蒙古: [110.3467, 41.4899],
        吉林: [125.8154, 44.2584],
        北京市: [116.4551, 40.2539],
        辽宁: [123.1238, 42.1216],
        河北: [114.4995, 38.1006],
        天津: [117.4219, 39.4189],
        山西: [112.3352, 37.9413],
        陕西: [109.1162, 34.2004],
        甘肃: [103.5901, 36.3043],
        宁夏: [106.3586, 38.1775],
        青海: [101.4038, 36.8207],
        新疆: [87.9236, 43.5883],
        西藏: [91.11, 29.97],
        四川: [103.9526, 30.7617],
        重庆: [108.384366, 30.439702],
        山东: [117.1582, 36.8701],
        河南: [113.4668, 34.6234],
        江苏: [118.8062, 31.9208],
        安徽: [117.29, 32.0581],
        湖北: [114.3896, 30.6628],
        浙江: [119.5313, 29.8773],
        福建: [119.4543, 25.9222],
        江西: [116.0046, 28.6633],
        湖南: [113.0823, 28.2568],
        贵州: [106.6992, 26.7682],
        云南: [102.9199, 25.4663],
        广东: [113.12244, 23.009505],
        广西: [108.479, 23.1152],
        海南: [110.3893, 19.8516],
        上海: [121.4648, 31.2891],
      };
      var chinaDatas = [
        [
          {
            name: '黑龙江',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '内蒙古',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '吉林',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '辽宁',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '河北',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '天津',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '山西',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '陕西',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '甘肃',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '宁夏',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '青海',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '新疆',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '西藏',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '四川',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '重庆',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '山东',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '河南',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '江苏',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '安徽',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '湖北',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '浙江',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '福建',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '江西',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '湖南',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '贵州',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '广西',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
        [
          {
            name: '海南',
            value: 0,
            price: 100,
            num: 2,
          },
        ],
      ];
      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          // 			console.log('dataItem',dataItem) //第二个数据
          var fromCoord = [116.4551, 40.2539];
          var toCoord = chinaGeoCoordMap[dataItem[0].name];
          // 			console.log('toCoord',toCoord);//第一个地址
          if (fromCoord && toCoord) {
            res.push([
              {
                coord: fromCoord,
                value: dataItem[0].value,
              },
              {
                coord: toCoord,
                dataItem: dataItem,
              },
            ]);
          }
        }
        return res;
      };
      let redName = '新疆';
      var series = [];
      [['北京市', chinaDatas]].forEach(function (item, i) {
        series.push(
          {
            type: 'lines',
            zlevel: 2,
            effect: {
              // 括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.1, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'circle', //箭头图标
              symbolSize: 3, //图标大小
              color: '#fff',
            },

            // symbol: ['none', 'arrow'],
            lineStyle: {
              normal: {
                // shadowBlur: .5,
                // // shadowColor: 'rgba(221, 244, 253, 1)',
                // shadowColor: 'rgba(221, 244, 253, 1)',
                // // shadowOffsetX: -5,
                // shadowOffsetY: 5,

                width: 0.7, //尾迹线条宽度
                opacity: 0.5, //尾迹线条透明度
                curveness: 0.2, //尾迹线条曲直度
                color: function (params) {
                  //圆环显示文字
                  // console.log('redName',redName)

                  return '#ffa022';
                },
              },
              color: 'red',
            },
            tooltip: {
              //  show:false,
              trigger: 'item',
              backgroundColor: 'rgba(8, 18, 42, 0.85)',
              borderColor: '#040616',
              showDelay: 0,
              hideDelay: 0,
              enterable: true,
              transitionDuration: 0,
              extraCssText: 'z-index:100',
              formatter: function (params, ticket, callback) {
                //根据业务自己拓展要显示的内容
                //console.log('params--1',params)
                let res = '';
                let name = params.data.dataItem[0].name;
                let price = params.data.dataItem[0].price;
                let num = params.data.dataItem[0].num;
                // res = "<div style='color:#fff;'><span>北京->" + name + "</span><br/><span>均价：" + price + "</span><br/><span>线路数：" + num + "</span></div>";
                res = "<div style='color:#fff;'><span>北京->" + name + '</span><br/><span>均价：' + price + '</span>,<span>线路数：' + num + '</span></div>';

                let html =
                  '<div class="mapTableContent"><div class="tableTop">北京 -> 新疆</div> <div class="tableList"> <div class="item itemTop"> <p>城市</p> <p>均价</p> <p>线路数</p> </div> <div class="item"> <p>新疆-1</p> <p>100</p> <p>1</p> </div> <div class="item"> <p>新疆-2</p> <p>200</p> <p>2</p> </div> </div> </div>';
                if (name == redName) {
                  return html;
                } else {
                  return res;
                }
              },
            },
            data: convertData(item[1]),
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              //涟漪特效
              period: 4, //动画时间，值越小速度越快
              brushType: 'fill', //波纹绘制方式 stroke, fill
              scale: 2.2, //波纹圆环最大限制，值越大波纹越大
            },

            // 括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
            // symbol: 'none',
            symbol: 'circle',
            symbolSize: function (val) {
              return 5; //圆环大小
            },
            itemStyle: {
              normal: {
                show: false,
                // color: '#f00'
                color: function (params) {
                  //圆环显示文字
                  // console.log('redName',redName)

                  return '#ffa022';
                },
                borderWidth: 0,
                shadowColor: '#b5e8fa', //发光?效果
                shadowBlur: 4,
              },
            },
            tooltip: {
              //  show:false,
              trigger: 'item',
              backgroundColor: 'rgba(8, 18, 42, 0.85)',
              borderColor: '#040616',
              showDelay: 0,
              hideDelay: 0,
              enterable: true,
              transitionDuration: 0,
              extraCssText: 'z-index:100',
              formatter: function (params, ticket, callback) {
                // 根据业务自己拓展要显示的内容
                //console.log('params--2',params)
                let res = '';
                let name = params.data.dataItem[0].name;
                let price = params.data.dataItem[0].price;
                let num = params.data.dataItem[0].num;
                res =
                  "<div style='color:#fff;padding:10px;'><span>北京->" +
                  name +
                  '</span><br/><span>均价：' +
                  price +
                  '</span><br/><span>线路数：' +
                  num +
                  '</span></div>';
                return res;
              },
            },
            data: item[1].map(function (dataItem) {
              // 	console.log('dataItem',dataItem[0]);
              return {
                dataItem: dataItem,
                name: dataItem[0].name,
                value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value]),
              };
            }),
          },
          //被攻击点
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 1,
            rippleEffect: {
              period: 4,
              brushType: 'stroke',
              scale: 4,
            },

            symbol: 'circle',
            color: 'rgba(128, 220, 251, .6)',
            symbolSize: 20,
            data: [
              {
                name: item[0],
                value: chinaGeoCoordMap[item[0]].concat([10]),
              },
            ],
          }
        );
      });
      let option = {
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(166, 200, 76, 0.82)',
          borderColor: '#040616',
          showDelay: 0,
          hideDelay: 0,
          enterable: true,
          transitionDuration: 0,
          extraCssText: 'z-index:100',
        },
        backgroundColor: '#fff',
        geo: {
          map: 'china',
          zoom: 1,
          label: {
            emphasis: {
              show: false,
            },
          },
          roam: false, //是否允许缩放
          itemStyle: {
            normal: {
              color: '#092765', //地图背景色
              borderColor: '#6481a0', //省市边界线00fcff 516a89
              borderWidth: 1,
            },
            emphasis: {
              color: 'rgba(37, 43, 61, .5)', //悬浮背景
            },
          },
        },
        series: series,
      };
      var chartDom = document.getElementById('china');
      console.log(2222, chartDom);
      var myChart = echarts.init(chartDom);
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.section {
  display: flex;
  .section-left {
    .china {
      height: 400px;
      width: 600px;
    }
  }
  .section-right {
  }
  ::v-deep .el-card__header {
    padding: 0.1rem 0.2rem;
    color: #fff;
    background-color: #629cd6;
  }
  ::v-deep .el-card__body {
    padding: 0;
  }
}
</style>
