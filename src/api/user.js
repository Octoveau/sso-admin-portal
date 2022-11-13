import service from './index';

//获取用户列表
export const getUserData = (params) => service.get(`/api/users`, { params });

//获取用户列表通过手机号
export const getUserDataByPhone = (phone) => service.get(`/api/users/${phone}`);

//通过手机号删除用户
export const deleteUserByPhone = (phone) => service.delete(`/api/users/${phone}`);
