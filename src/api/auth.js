import service from './index';

//注册接口
export const registerUser = (data) => service.post(`/api/users/register`, data);

//获取验证码
export const getVerificationCode = () => {
  let code = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  return Promise.resolve({
    data: {
      code,
    },
    code: 200,
    msg: '注册成功',
  });
};
