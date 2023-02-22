/**
 * 做一些echarts的公共逻辑
 */
import { smsCode } from '@/api/auth';
const echartsMixin = {
  data() {
    return {
      timer: null,
      timeCount: 60,
      isCanSendCode: true,
    };
  },
  methods: {},
};
export default echartsMixin;
