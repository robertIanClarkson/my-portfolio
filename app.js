var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require("express-session");
var bodyParser = require("body-parser");
var passport = require("passport");

var indexRouter = require('./routes/index');
var projectRouter = require('./routes/projects');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var adminRouter = require('./routes/admin');
var imageRouter = require('./routes/image');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: "Josie" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/projects', projectRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/admin', adminRouter);
app.use('/images', imageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
