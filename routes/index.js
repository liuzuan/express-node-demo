var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index' });
});

router.get('/users', function (req, res, next) {
  // res.send('respond with a resource');
  res.render('index', {title: 'users'});
  
});

module.exports = router;
