var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  var app = req.app;

  // JSON object with az settings
  var azSettings = {accounts : [] , balances : false , transactions : false};

  // get array of accounts
  var accountsList = JSON.parse(req.body.accountsList);

  for (var i = 0 ; i < accountsList.length; i++) {
    if (req.body[accountsList[i]] !== undefined ) {
      azSettings.accounts.push(req.body[accountsList[i]]);
    }
  }
  azSettings.balances = (req.body.balances !== undefined ) ? true : false;
  azSettings.transactions = (req.body.transactions !== undefined ) ? true : false;
  azSettings.coveragecontrol = (req.body.coveragecontrol !== undefined ) ? true : false;

  var azData = '&accounts='+azSettings.accounts + '&balances='+ azSettings.balances + '&transactions='+ azSettings.transactions + '&coveragecontrol='+ azSettings.coveragecontrol ;

  var redir = req.body.original_url + "&username=" + req.body.name + "&confirmation=AAA" + "&app-name=" +req.body.app_name + azData;

  res.redirect(redir);

});

module.exports = router;
