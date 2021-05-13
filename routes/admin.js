var express = require('express');
var router = express.Router();
const { passport } = require('../passport/index');
const { createProject, getProjects } = require('./../db/helpers');

router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    getProjects()
    .then(data => {
      res.render('admin', { 
        title: 'Admin Console', 
        css: 'admin.css',
        projects: data
      });
    })
  } else {
    res.redirect('/admin/login');
  }
  
});

router.get('/login', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/admin');
  } else {
    res.render('login', { title: 'Admin Login', css: 'login.css' });
  }
});

router.post('/login', function(req, res, next) {
  if(!req.body.username || !req.body.password) res.sendStatus(500);

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

router.post('/project', function(req, res, next) {
  if (!req.body.name || !req.body.description) res.sendStatus(500);
  if (req.isAuthenticated()) {
    let name = req.body.name;
    let desc = req.body.description;
    createProject(name, desc)
      .then(() => {
        res.render('admin', { title: 'Admin Console', css: 'admin.css' });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
});

module.exports = router;
