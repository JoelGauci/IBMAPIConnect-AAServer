var express = require('express');
var router = express.Router();


/* GET home page. */
router.post('/', function(req, res, next) {
  var app = req.app;
  console.log(req.body.original_url);
  var redir = req.body.original_url + "&username=" + req.body.name + "&confirmation=AAA" + "&app-name=" +req.body.app_name;
  console.log(redir);

  res.redirect(redir);
});

module.exports = router;
