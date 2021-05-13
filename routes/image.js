var express = require('express');
var router = express.Router();

const { getImage } = require('./../db/helpers')

/* GET home page. */
router.get('/:filename', function(req, res, next) {
  if (req.fresh) {
    res.statusCode = 304
    res.end()
    return
  }

  if (req.method === 'HEAD') {
    res.statusCode = 200
    res.end()
    return
  }

  let filename = req.params.filename;
  getImage(filename)
    .then((data) => {
      console.log(data)
      res.setHeader('Content-Length', data.ContentLength)
      res.setHeader('Content-Type', data.ContentType)
      res.send(data.Body)
    })
    .catch(err => {
      var err = new Error()
      err.status = 404
      next(err)
      return
    }) 
});


module.exports = router;
