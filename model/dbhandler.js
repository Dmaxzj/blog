const crypto = require('crypto');
var mongoose = require('mongoose');
var DB_URL = 'mongodb://127.0.0.1:27017/myUsers';
mongoose.connect(DB_URL, {
});

mongoose.connection.on('connected', function() {
  console.log('Mongoose connection open to ' + DB_URL);
});

// mongoose.connection.error('connected', function() {
//   console.log('Mongoose connection error');
// });

Schema = mongoose.Schema;

var User = new Schema({
  username: String,
  password: String,
  studentId: String,
  phone: String,
  email: String
});


var MyModel = mongoose.model('MyModel', User);


exports.regist = async function(user) {
  var hash = crypto.createHash('sha256');
  hash.update(user.password.toString());
  user.password = hash.digest('hex');
  var newuser = new MyModel(user);
  var promise = await new Promise(function(resolve, reject) {
    newuser.save(function(err, doc) {
      if (err) {
        reject("注册失败")
      } else {
        console.log('save user');
        console.log(doc);
        resolve();
      }
    });
  }).then(function (argument) {
    console.log(argument);
  }).catch(function (err) {
    throw {err: err};
  })
  return promise;
}

exports.cheakLogin = async function(user) {
  var correct = false;
  var hash = crypto.createHash('sha256');
  hash.update(user.password.toString());
  user.password = hash.digest('hex');
  await MyModel.find({
    username: user.username,
    password: user.password
  }, function(err, mymodels) {
    correct = !!mymodels.length;
  });
  return correct;
}

exports.findUser = function(username, callback) {
  MyModel.find({
    username: username
  }, function(err, mymodels) {
    console.log(mymodels.length);
    if (err || mymodels.length == 0) callback('cannot find user', 0);
    else callback(0, mymodels);
  });
}

cheakUsernameUnique = function(val) {
  var promise = new Promise(function(resolve, reject) {
    MyModel.find({
      username: val
    }, function(err, mymodels) {
      if (mymodels.length) {
        reject('用户名重复');
      } else {
        resolve();
      }
    });
  });
  return promise;
}

cheakStudentIdUnique = function(val) {
  var promise = new Promise(function(resolve, reject) {
    MyModel.find({
      studentId: val
    }, function(err, mymodels) {
      if (mymodels.length) {
        reject('学号重复');
      } else {
        resolve();
      }
    });
  });
  return promise;
}

cheakPhoneUnique = function(val) {
  var promise = new Promise(function(resolve, reject) {
    MyModel.find({
      phone: val
    }, function(err, mymodels) {
      if (mymodels.length) {
        reject('电话重复');
      } else {
        resolve();
      }
    });
  });
  return promise;
}

cheakEmailUnique = function(val) {
  var promise = new Promise(function(resolve, reject) {
    MyModel.find({
      email: val
    }, function(err, mymodels) {
      if (mymodels.length) {
        reject('邮箱重复');
      } else {
        resolve();
      }
    });
  });
  return promise;
}

exports.cheakUserUnique = async function(user) {
  await Promise.all([cheakUsernameUnique(user.username), cheakStudentIdUnique(user.studentId),
      cheakPhoneUnique(user.phone), cheakEmailUnique(user.email)
    ])
    .then(function(results) {
      console.log(results);
    })
    .catch(function(msg) {
      throw {err: msg};
    })
}