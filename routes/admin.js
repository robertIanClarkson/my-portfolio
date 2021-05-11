var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('admin', { title: 'admin' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});

module.exports = router;
