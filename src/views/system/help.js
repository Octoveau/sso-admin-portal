//验证手机号码
const validateStrCallback = (rule, value, callback) => {
  let regExp = /^[A-Za-z0-9]+$/;
  if (regExp.test(value)) {
    callback();
  } else {
    callback(new Error('只能输入字母和数字'));
  }
};
const permRules = {
  permGroupName: [
    { required: true, message: '请输入权限组名称', trigger: 'blur' },
    { validator: validateStrCallback, trigger: 'blur' },
  ],
  action: [{ required: true, message: '请选择权限行为', trigger: 'blur' }],
  permValue: [
    { required: true, message: '请输入权限值', trigger: 'blur' },
    { validator: validateStrCallback, trigger: 'blur' },
  ],
  permName: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
};
const actionOptions = [
  {
    value: 'GET',
    label: 'GET',
  },
  {
    value: 'POST',
    label: 'POST',
  },
  {
    value: 'PUT',
    label: 'PUT',
  },
  {
    value: 'DELETE',
    label: 'DELETE',
  },
];
export { permRules, actionOptions };
