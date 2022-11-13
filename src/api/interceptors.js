import { Message } from 'element-ui';
import authStorage from '@/utils/auth';
const ERROE_MSG = '请求异常,请重试';
const ERROR_MSG_400 = '请求参数异常';
const ERROR_MSG_401 = '没有权限访问';
const ERROR_MSG_500 = '服务器异常';
const ERROR_MSG_COMMON = '请求异常，请重试';
const WHITE_API = ['/api/auth/login', '/api/users/register'];
const handleRespCode = (respData) => {
  switch (respData?.code) {
    case 400:
      Message.error(respData.message || ERROR_MSG_400);
      break;
    case 401:
      Message.error(respData.message || ERROR_MSG_401);
      break;
    case 500:
      Message.error(respData.message || ERROR_MSG_500);
      break;
    default:
      Message.error(respData.message || ERROR_MSG_COMMON);
      break;
  }
};
const setupInterceptors = (request) => {
  // 请求拦截器
  request.interceptors.request.use(
    (config) => {
      if (WHITE_API.includes(config.url)) {
        return config;
      }
      //需要鉴权的接口
      let user = JSON.parse(authStorage.getUserInfo() || null);
      if (!user) {
        Message.error('登录信息已丢失，请先登录');
        window.location.replace(`/login`);
        return;
      }
      //加上token
      config.headers.Authorization = `Bearer ${user?.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error || ERROE_MSG);
    }
  );

  // 响应拦截器
  request.interceptors.response.use(
    (resp) => {
      //从xios里取出api返回的data
      let respData = resp.data;
      if (respData.code !== 200) {
        handleRespCode(respData);
      }
      return Promise.resolve(respData);
    },
    //httpcode不在200-300时候会到异常拦截器，请求异常
    (error) => {
      let message = error?.message || error?.message || ERROE_MSG;
      Message.error(message);
      return Promise.reject(error);
    }
  );
};
export default setupInterceptors;
