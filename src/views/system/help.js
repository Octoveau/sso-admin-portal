//验证手机号码
const validateStrCallback = (rule, value, callback) => {
  let regExp = /^[A-Za-z0-9-]+$/;
  if (regExp.test(value)) {
    callback();
  } else {
    callback(new Error('只能输入字母和数字'));
  }
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
export { actionOptions, validateStrCallback };
