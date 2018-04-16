var express = require('express');
var router = express.Router();
const url = require('url');

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(">> twofactor request log");
  //console.log(req);
  console.log("name: " + req.body.name);
  console.log("app name: " + req.body.app_name);
  console.log("brand: " + req.body.scope);


  res.render('twofactor', {name: req.body.name,
                         original_url: req.body.original_url,
                         channel: req.body.channel,
                         context: req.body.context,
                         state: req.body.state,
                         scope: req.body.scope,
                         clientid: req.body.clientid,
                         app_name: req.body.app_name,
                         intent_id: req.body.intent_id
                        });


});

module.exports = router;
