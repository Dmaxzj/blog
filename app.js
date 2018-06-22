var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var MongoClient = require('mongoose');
var api = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  store: new MongoStore({
    url: 'mongodb://127.0.0.1:27017/session',
  }),
  cookie: {
    maxAge: 60*60*1000
  },
  saveUninitialized: true,
  resave: false,
  secret: 'something secret'
}));

app.get('/', api.index);
app.get('/api/readBlog/:id', api.readBlog);
app.get('/api/getBlog', api.getBlog);
app.get('/api/user', api.user);
app.get('/api/getComments/:id', api.getComments);
app.get('/api/search', api.search);
app.get('/cheakLogin', api.cheakLogin);
app.post('/addBlog', api.addBlog);
app.post('/regist', api.regist);
app.post('/login', api.login);
app.post('/signOut', api.signOut);
app.post('/addComment/:id', api.addComment);
app.post('/hideComments/:id', api.hideComments);
app.post('/hideOrShowPost/:id', api.hideOrShowPost);
app.put('/editBlog/:id', api.editBlog);
app.put('/editComment/:id', api.editComment);
app.delete('/deleBlog/:id', api.deleBlog);
app.post('/deleComment/:id', api.deleComment);
app.post('/cheakRight', api.cheakRight);
app.get('*', api.index);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
