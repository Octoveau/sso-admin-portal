import service from './index';

//登录接口验证
export const loginUser = (data) => service.post(`/api/auth/login`, data);

//注册接口
export const registerUser = (data) => service.post(`/api/users/register`, data);
//忘记密码接口

//获取验证码
export const getVerificationCode = () => {
  let code = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  return Promise.resolve({
    data: {
      code,
    },
    code: 200,
    message: '注册成功',
  });
};
