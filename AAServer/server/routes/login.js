var express = require('express');
var router = express.Router();
const url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(">> login request log");
  //console.log(req);
  var original_url = req.query["original-url"];
  var orig_url = url.parse(original_url, true);
  var app_name = req.query["app-name"];
  var brand = orig_url.query.brand;
  var context = orig_url.query.context;
  var channel = orig_url.query.channel;
  var state = orig_url.query.state;
  var scope = orig_url.query.scope;
  var clientid = orig_url.query.client_id;
  var intent_id = orig_url.query.openbanking_intent_id;
  process.stdout.write("In login.js\n");
  console.log("origianl url: " + original_url);
  console.log("app name: " + app_name);
  console.log("brand: " + brand);
  console.log("context: " + context);
  console.log("channel: " + channel);
  console.log("state: " + state);
  console.log("scope: " + scope);
  console.log("client id: " + clientid);
  console.log("intent id: " + intent_id);

  res.render('login', {intent_id: intent_id, original_url: original_url, app_name: app_name, brand: brand, context: context, channel: channel, state: state, scope: scope, clientid: clientid});
});

module.exports = router;
