import axios from 'axios';
import setupInterceptors from './interceptors';
//创建axios实例'
const service = axios.create({
  timeout: 30 * 1000,
  withCredentials: true,
  baseURL: process.env.NODE_ENV === 'production' ? '/sso-login' : '/',
});
//注册axios拦截器
setupInterceptors(service);
export default service;
//  http://www.octoveau.cn/sso-login/api/auth/login
//  http://www.octoveau.cn:8888/sso-login/api/auth/login

//  http://47.109.22.178:8401/sso-login/api/auth/login

//  http://www.octoveau.cn:8401/api/auth/login
