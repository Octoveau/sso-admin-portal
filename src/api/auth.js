import service from './index';

//密码登录接口
export const loginUser = (data) => service.post(`/api/auth/login`, data);

//验证码登录接口
export const loginSmsUser = (data) => service.post(`/api/auth/sms/login`, data);

//注册接口
export const registerUser = (data) => service.post(`/api/users/register`, data);

//忘记密码接口
export const resetUserPwd = (data) => service.put(`/api/users/password`, data);

//获取验证码
export const smsCode = (phone) =>
  service.post(`/api/sms/send`, null, {
    params: {
      phone,
    },
  });

//根据siteKey登录之后获取ticket
export const getAuthTicket = (data) => service.post('/api/auth/ticket', data);
