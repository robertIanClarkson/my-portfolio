var express = require('express');
var router = express.Router();
const { getAllItems, getAdmin } = require('../db/helpers');

router.get('/', function(req, res, next) {
  res.render('admin', { title: 'admin' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});

router.post('/login', function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  if(username.length < 6 || username.length > 32) res.sendStatus(500);
  if(password.length < 6 || password.length > 32) res.sendStatus(500);

  getAdmin(username)
    .then((admin) => {
      if(admin.password == password) {
        res.redirect('/admin');
      } else {
        res.sendStatus(403);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(403);
    })
});

module.exports = router;
