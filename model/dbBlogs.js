var mongoose = require('mongoose');
var DB_URL = 'mongodb://127.0.0.1:27017/myBlogs';

const singlePageNumber = 8;

mongoose.connect(DB_URL, {
});

mongoose.connection.on('connected', function() {
  console.log('Mongoose connection open to ' + DB_URL);
});

// mongoose.connection.error('connected', function() {
//   console.log('Mongoose connection error');
// });

Schema = mongoose.Schema;


var Blog = new Schema({
  author: String,
  title: String,
  isHide: Boolean,
  body: String,
  comments: [{author: String, body: String, isHide: Boolean}]
})

var MyBlog = mongoose.model('MyBlog', Blog);


exports.search = async function(req, res) {
  var key = eval('/'+ req.query.key + '/i');
  var page = 0;
  var total = 0;
  if (!isNaN(req.query.page)) {
    page = parseInt(req.query.page)-1;
  }
  page = page < 0 ? 0 : page;
  total = await MyBlog.find({
    $or: [
         {author: key}, {title: key}, {body: key}
      ]
  }).count();
  console.log('page:' + page)
  total = parseInt(total/singlePageNumber + (total%singlePageNumber == 0?0:1));
  console.log('totalpag:' + total)
  page = page > total ? total : page;
  var posts = [];
  MyBlog.find({
    $or: [
         {author: key}, {title: key}, {body: key}
      ]
  }).sort({_id: -1}).skip(page*singlePageNumber).limit(singlePageNumber).exec(function(err, docs) {
    if (err) {
      res.json(false);
    } else {
      docs.forEach(function(post) {
        if (post.isHide) {
          post.body = "该内容已被管理员隐藏";
        } else {
          post.body = post.body.substr(0, 50) + "...";          
        }
          posts.push(post);
      })
      res.json({blogs: posts,
                page: {
                  currentPage: page+1,
                  totalPage: total
                }});
    }
  })
}

exports.getBlog = async function(req, res) {
  var page = 0;
  var total = 0;
  if (!isNaN(req.query.page)) {
    page = parseInt(req.query.page)-1;
  }
  page = page < 0 ? 0 : page;
  total = await MyBlog.find().count();
  total = parseInt(total/singlePageNumber + (total%singlePageNumber == 0?0:1));
  page = page > total ? total : page;
  var posts = [];
  MyBlog.find().sort({_id: -1}).skip(page*singlePageNumber).limit(singlePageNumber).exec(function(err, docs) {
    if (err) {
      res.json(false);
    } else {
      docs.forEach(function(post) {
        if (post.isHide) {
          post.body = "该内容已被管理员隐藏";
        } else {
          post.body = post.body.substr(0, 50) + "...";          
        }
          posts.push(post);
      })
      res.json({blogs: posts,
                page: {
                  currentPage: page+1,
                  totalPage: total
                }});
    }
  })
}

exports.addBlog = function(req, res) {
  var temp = req.body.post;
  temp.author = req.session.username;
  temp.isHide = false;
  var blog = new MyBlog(temp);
  blog.save(function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.json({_id: doc._id});
    }
  })
}

exports.readBlog = function(req, res) {
  MyBlog.find({_id: req.params.id}, function(err, docs) {
    if (err) {
      res.json(false);
    } else {
      if (docs[0].isHide) {
        docs[0].body = "该内容已被管理员隐藏";
      }
      res.json({
          post: docs[0]
      })        
    }
  })
}

exports.deleBlog = function(req, res) {
  if (req.session.username == 'admini') {
    MyBlog.remove({_id: req.params.id}, function(err) {
      if (err) res.json(false);
      else res.json(true);
    })   
  } else {
    MyBlog.remove({_id: req.params.id, author: req.session.username}, function(err) {
      if (err) res.json(false);
      else res.json(true);
    })   
  }
}

exports.editBlog = function(req, res) {
  var temp = {
    title: req.body.post.title,
    body: req.body.post.body
  }
  MyBlog.findOneAndUpdate({_id: req.params.id, author: req.session.username}, temp, function(err, docs) {
    if (err) res.json(false);
    else res.json(true);
  })
}

exports.getComments = function(req, res) {
  MyBlog.findById(req.params.id, function(err, docs) {
    if (err) {
      res.json(false);
    } else {
      docs.comments.forEach(function(comment) {
        if (comment.isHide) {
          comment.body = "该内容已被管理员隐藏";
        }
      })
      res.json({comments: docs.comments});
    }
  })
}

exports.addComment = function(req, res) {
  var temp = {
    body: req.body.body,
    author: req.session.username,
    isHide: false
  }
  MyBlog.findByIdAndUpdate(req.params.id, {$push:{"comments": temp}}, function(err, docs) {
    if (err) {
      res.json(false);
    } else {
      res.json(true);   
    }
  })
}

exports.deleComment = function(req, res) {
  MyBlog.findOneAndUpdate({
      _id: req.params.id,
      "comments.author": req.session.username
    },{$pull:{"comments": {_id:req.body.id, author: req.session.username}}}, function(err, docs) {
     if (err) {
       res.json(false);
     } else {
       if (docs) {
          res.json(true);
       } else {
          res.json(false);
       }
     }
    })
}

exports.editComment = function(req, res) {
 MyBlog.findById(req.params.id, function(err, docs) {
  if (err) {
    console.log(err);
    res.json(err);
  } else {
    var isFind = false;
    docs.comments.forEach(function(comment) {
      if (comment.id == req.body.id && comment.author == req.session.username && !comment.isHide) {
        comment.body = req.body.newComment;
        isFind = true;
      }
    })
    if (isFind) {
      docs.save(function(err, docs) {
        if (err) {
          console.log(err);
          res.json(false);
        } else {
          console.log(docs);
          res.json(true)
        }
      })
    } else {
      console.log("cannot find");
      res.json(false)
    }
  }
 })
}


exports.hideOrShowPost = function(req, res) {
  MyBlog.findByIdAndUpdate(req.params.id, {isHide: true}, function(err, docs) {
    if (err) {
      res.json(false);
    } else {
      console.log(docs);
      res.json(true);   
    }
  })
}

exports.hideComments = function(req, res) {
   MyBlog.findOneAndUpdate({_id:req.params.id, "comments._id": req.body.id},{$set:{"comments.$.isHide": true}}, function(err, docs) {
    if (err) {
      res.json(false);
    } else {
      if (docs) {
          res.json(true);
       } else {
          res.json(false);
       }
    }
  })
}
