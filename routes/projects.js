var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('projects', { 
    title: 'Projects', 
    css: 'projects.css',
    js: 'projects.js'
  });
});

module.exports = router;
