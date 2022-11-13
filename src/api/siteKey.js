import service from './index';

//获取站点列表
export const getsiteKeyData = (params) => service.get(`/api/sites`, { params });

//获取用户列表通过sitekey
export const getDataBySiteKey = (siteKey) => service.get(`/api/sites/${siteKey}/info`);

//通过手机号删除用户
export const deleteSiteKey = (siteKey) => service.delete(`/api/sites/${siteKey}`);

//创建站点信息
export const createSiteKeyData = (data) => service.post(`/api/sites`, data);
