var validator = require('../model/validator');
var db = require('../model/dbhandler');
var dbBlogs = require('../model/dbBlogs');



/* GET home page. */

var api = {
	index: function(req, res) {
		res.render('index', { title: 'My Blog' });
	},
	getBlog: function(req, res) {
  		dbBlogs.getBlog(req, res);
	},
	addBlog: function(req, res) {
		if (!req.session.username) {
			res.json(false);
		} else {
			dbBlogs.addBlog(req, res);
		}
	},
	readBlog: function(req, res) {
		dbBlogs.readBlog(req, res);
	},
	editBlog: function(req, res) {
		dbBlogs.editBlog(req, res);
	},
	deleBlog: function(req, res) {
		dbBlogs.deleBlog(req, res);
	},
	getComments: function(req, res) {
  		dbBlogs.getComments(req, res);
	},
	addComment: function(req, res) {
		if (req.session.username) {
			dbBlogs.addComment(req, res);
		} else {
			res.json(false);
		}
	},
	editComment: function(req, res) {
		dbBlogs.editComment(req, res);
	},
	deleComment: function(req, res) {
		dbBlogs.deleComment(req, res);
	},
	hideComments: function(req, res) {
		if (req.session.username == 'admini') {
			dbBlogs.hideComments(req, res);
		} else {
			res.json(false);
		}
	},
	hideOrShowPost: function(req, res) {
		if (req.session.username == 'admini') {
			dbBlogs.hideOrShowPost(req, res);
		} else {
			res.json(false);
		}
	},
	search: function(req, res) {
		dbBlogs.search(req, res);
	},	
	regist: async function(req, res) {
		try {
		  cheakUserForm(req.body);
		  await cheakUserUnique(req.body);
		  await db.regist(req.body);
		  console.log('success creat');
		  req.session.username = req.body.username;
		  res.json({msg: 'success'});
		} catch (err) {
		  console.log(err);
		  res.json({msg: err});
		}
	},
	login: async function(req, res) {
		try {
		   console.log('login: ' + req.body.username);
		   await cheakLogin(req.body);
		   console.log('login success');
		   req.session.username = req.body.username;
		   res.json({msg: 'success'});
		 } catch (err) {
		 	console.log(err);
		   res.json({msg:err});
		 }
	},
	cheakLogin: function(req, res) {
		if (req.session.username) {
			res.json({username: req.session.username});
		} else {
			res.json(false);
		}
	},
	cheakRight: function(req, res) {
		if (req.session.username == req.body.author || req.session.username == "admini") {
			res.json(true);
		} else {
			res.json(false);
		}
	},
	user: function(req, res) {
		if (req.session.username) {
    		showUser(res, req.session.username);
  		} else {
    		res.json(false);
  		}
	},
	signOut: function(req, res) {
		delete req.session.username;
		res.json(true);
	}
}

cheakLogin = async function(user) {
  var correct = await db.cheakLogin(user);
  if (correct) {
    return;
  } else {
    throw '用户名或密码错误';
  }
}

cheakUserForm = function(user) {
  var err = {};
  for (var key in user) {
    validator.cheakUserForm(key, user[key], err);
  }
  if (Object.keys(err).length != 0) {
  	throw err;
  }
}

cheakUserUnique = async function(user) {
  await db.cheakUserUnique(user);
}


showUser = function(res, username) {
  db.findUser(username, function(err, data) {
    if (err) {
		console.log(err);
		res.json({msg: "err"});
    } else {
    	console.log(data);
	    res.json({
	      user: {
	            username: data[0].username,
	            studentId: data[0].studentId,
	            phone: data[0].phone,
	            email: data[0].email}
	    })
    }
  });
}

module.exports = api;