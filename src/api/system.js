import service from './index';

export const createSysPerm = (data) => service.post(`/api/users`, data);

export const getAllSysPerms = () => service.get(`/api/users`);

export const updateSysPerms = (data) => service.put(`/api/users`, data);
