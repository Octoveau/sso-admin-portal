//验证手机号码
const validatePhone = (rule, value, callback) => {
  let regExp = new RegExp('^1\\d{10}$');
  if (regExp.test(value)) {
    callback();
  } else {
    callback(new Error('请输入正确的手机号'));
  }
};
//验证密码至少8位且必有数字+特殊字符+字母
const validatePwd = (rule, value, callback) => {
  // eslint-disable-next-line no-useless-escape
  let regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]])[A-Za-z\d`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]]{8,}$/;
  if (regExp.test(value)) {
    callback();
  } else {
    callback(new Error('密码至少8位且必有数字+特殊字符+字母'));
  }
};

//验证是否是数字
const validateNum = (rule, value, callback) => {
  let regExp = /^[0-9]+.?[0-9]*/;
  if (regExp.test(value)) {
    callback();
  } else {
    callback(new Error('请输入正确的数值'));
  }
};
export const loginRules = {
  phoneNum: [
    { required: true, message: '请输入用户手机号', trigger: 'blur' },
    { validator: validateNum, trigger: 'blur' },
    { validator: validatePhone, trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入用户密码', trigger: 'blur' },
    { validator: validatePwd, trigger: 'blur' },
  ],
  repassword: [
    { required: true, message: '请再次确认密码', trigger: 'blur' },
    { validator: validatePwd, trigger: 'blur' },
  ],
  verificationCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { validator: validateNum, trigger: 'blur' },
  ],
};

//Silder控制器
export const silderConfig = {
  isShowSilder: false,
  isSilderSuccess: false,
};
