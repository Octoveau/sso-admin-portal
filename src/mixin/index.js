import { Message } from 'element-ui';
const globalMixin = {
  methods: {
    //处理API返回code为200的数据
    handleResult(res, control = false, msg) {
      if (res.code === 200) {
        if (control) {
          Message.success(res.msg || msg);
        }
        return res.data;
      }
      return res.data;
    },
  },
};
export default globalMixin;
