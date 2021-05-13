var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:filename', function(req, res, next) {
  let filename = req.params.filename;
});


module.exports = router;
