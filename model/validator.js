var validator = {
  form: {
    username: {
      form: /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/,
      msg:'用户名为6~18位英文字母、数字或下划线'
    },
    password: {
      form: /^[a-zA-Z0-9_-]{6,12}$/,
      msg: '密码为6~12位数字、大小写字母、中划线、下划线'
    },
    studentId: {
      form: /^[1-9][0-9]{7}$/,
      msg: '学号为不为0开头的8位数字'
    },
    phone: {
      form: /^[1-9][0-9]{10}$/,
      msg: '电话为不为0开头的11位数字'
    },
    email: {
      form: /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/,
      msg: '邮箱格式例如：abC-X_x@qq.com'
    }
  },
  cheakUserForm: function(key, data, err) {
    if (!data.match(this.form[key].form)) err[key] = this.form[key].msg;
  }
/*  cheakUsername: function(val) {
    if (val.match(/^[a-zA-Z][a-zA-Z0-9_]{5,17}$/)) {
      return '';
    } else {
      if (val && val[0].match(/[^a-zA-Z]/)) {
        return '必须以英文字母开头';
      } else if (val.length > 18 || val.match(/[^a-zA-Z0-9_]/)) {
        return '用户名为6~18位英文字母、数字或下划线';
      } else {
        return '';
      }
    }
  },
  cheakPassword: function(val) {
    if (val.match(/^[a-zA-Z0-9_-]{6,12}$/)) {
      return "";
    } else {
      cuowu
      if (val.match(/[^a-zA-Z0-9_]/)) {
        return '密码为数字、大小写字母、中划线、下划线';
      } else if (val.length > 12) {
        return "密码为6~12位";
      } else {
        return '';
      }
    }
  },
  cheakStudentId: function(val) {
    if (val.match(/^[1-9][0-9]{7}$/)) {
      return "";
    } else {
      if (val.match(/[^0-9]/)) {
        return '学号只能是数字';
      } else if (val && val[0].match(/[^1-9]/)) {
        return '学号不能以0开头';
      } else if (val.length > 8) {
        return '学号为8位数字';
      } else {
        return '';
      }
    }
  },
  cheakPhone: function(val) {
    if (val.match(/^[1-9][0-9]{10}$/)) {
      return '';
    } else {
      if (val.match(/[^0-9]/)) {
        return '电话只能为数字';
      } else if (val && val[0].match(/[^1-9]/)) {
        return '电话不能已0开头';
      } else if (val.length > 11) {
        return '电话为11位数字';
      } else {
        return '';
      }
    }
  },
  cheakEmail: function(val) {
    if (val.match(/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/)) {
      return '';
    } else {
      return '例如：abC-X_x@qq.com';
    }
  }*/
}

module.exports = validator;