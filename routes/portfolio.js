var express = require('express');
var router = express.Router();

var { getPorfolioItems } = require('./../api/portfolio')

/* GET home page. */
router.get('/', function(req, res, next) {
  getPorfolioItems()
    .then((items) => {
      res.render('portfolio', { 
        title: 'Portfolio', 
        css: 'portfolio.css',
        js: 'porfolio.js',
        portfolioItems: items
      });
    })
    .catch((err) => {
      res.render('portfolio', { 
        title: 'Portfolio', 
        css: 'portfolio.css',
        js: 'porfolio.js'
      });
    })
});

module.exports = router;
