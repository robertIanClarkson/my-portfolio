var express = require('express');
var router = express.Router();
const { getAdmin } = require('../db/helpers');
const { passport } = require('../passport/index');

router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render('admin', { title: 'admin' });
  } else {
    res.redirect('/admin/login');
  }
});

router.get('/login', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/admin');
  } else {
    res.render('login', { title: 'Login' });
  }
});

router.post('/login', function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  if(username.length < 6 || username.length > 32) res.sendStatus(500);
  if(password.length < 6 || password.length > 32) res.sendStatus(500);

  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      // FAILED
      return res.render('login', {
        title: 'Login',
        error: 'username or Password Incorrect'
      }); 
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      // SUCCESS
      return res.redirect('/admin')
    });
  })(req, res, next);
});

router.post('/logout', function(req, res, next) {
  if (req.isAuthenticated()) {
    req.logout();
    res.redirect('/');
  }
});

module.exports = router;
