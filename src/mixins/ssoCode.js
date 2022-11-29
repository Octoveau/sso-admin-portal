/**
 * 验证码相关的统一逻辑:
 * 1.定义相关的变量
 * 2.相关的获取验证码的方法
 * 3.清除计时器
 */
import { smsCode } from '@/api/auth';
const smsCodeMixin = {
  data() {
    return {
      timer: null,
      timeCount: 60,
      isCanSendCode: true,
    };
  },
  methods: {
    //获取验证码逻辑
    onGetVerificationCode() {
      //获取验证码
      smsCode(this.registerForm.phone).then((res) => {
        if (res.code === 200) {
          this.$message.success('验证码发送成功');
          this.handleCode();
        }
      });
    },
    //处理获取验证码后续
    handleCode() {
      this.timer = setInterval(() => {
        this.timeCount--;
        if (this.timeCount === 0) {
          this.isCanSendCode = true;
          clearInterval(this.timer);
          this.timeCount = 60;
        }
      }, 1000);
      this.isCanSendCode = false;
    },
  },
};
export default smsCodeMixin;
