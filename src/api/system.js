import service from './index';
//创建权限组
export const createSysPerm = (data) => service.post(`/api/perm/add`, data);
//获取所有的权限组展示
export const getAllSysPerms = (params) =>
  service.get(`/api/perms/query`, {
    params,
  });
//删除权限组
export const delateSysPerm = (data) =>
  service.delete('/api/perm/del', {
    data,
  });
//修改权限组
export const updateSysPerm = (data) => service.put(`/api/perm/update/${data.id}`, data);

//创建角色
export const createSysRole = (data) => service.post(`/api/create/role`, data);
//删除角色
export const delateSysRole = (params) => service.delete('/api/role');
//修改角色权限
export const updateSysRole = (data) => service.put(`/api/role`, data);
//获取所有角色
export const getAllSysRoles = () => service.get(`/api/roles`);
