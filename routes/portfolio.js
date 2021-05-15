var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('portfolio', { 
    title: 'Portfolio', 
    css: 'portfolio.css',
    js: 'porfolio.js'
  });
});

module.exports = router;
