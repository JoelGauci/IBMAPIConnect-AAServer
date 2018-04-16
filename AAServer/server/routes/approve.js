var express = require('express');
var router = express.Router();
var request = require("request");
var jwtDecode = require('jwt-decode');
const url2 = require('url');

/* GET home page. */
router.post('/', function(req, res, next) {
  var app = req.app;

  var intent_id = req.body.intent_id;
  if (!intent_id){
    var original_url_string = req.body.original_url;
    var orig_url = url2.parse(original_url_string, true);
    var oidc_request = orig_url.query.request;
    var oidc_request_js = jwtDecode(oidc_request);
    console.log("decoded jwt: " + JSON.stringify(oidc_request_js));
    intent_id = oidc_request_js.claims.id_token.openbanking_intent_id.value;
  }
  console.log("Value of intent_id: " + intent_id);

  var aaservices_url = process.env.AAServices;
  var aaservices_clientid = process.env.AAServices_clientID;
  console.log('Environment variables. AAServices: ' + aaservices_url + ' - clientid: ' + aaservices_clientid);

  var url = aaservices_url + '/open-banking/payments/'+ intent_id;
  console.log("url: " + url);

  var options = { method: 'GET',
  url: url,
  qs: {client_id: aaservices_clientid},
  headers:
   { authorization: 'REPLACE_THIS_VALUE',
     'x-fapi-interaction-id': 'REPLACE_THIS_VALUE',
     'x-fapi-customer-ip-address': 'REPLACE_THIS_VALUE',
     'x-fapi-customer-last-logged-time': 'REPLACE_THIS_VALUE',
     'x-fapi-financial-id': 'REPLACE_THIS_VALUE',
     accept: 'application/json' }
   };

  request(options, function (error, response, body) {
    if (error) return console.error('Failed: %s', error.message);
    console.log('Success: ', body);
    var bodyJ = JSON.parse(body);

    var InstructedAmount = 'Not available';
    var Currency =         'Not available';
    var DebtorAccount =    'Not available';
    var CreditorAccount =  'Not available';
    var Context =          'Not available';

    try{
      InstructedAmount = bodyJ.Data.Initiation.InstructedAmount.Amount;
      Currency =         bodyJ.Data.Initiation.InstructedAmount.Currency;
      DebtorAccount =    bodyJ.Data.Initiation.DebtorAccount.identification;
      CreditorAccount =  bodyJ.Data.Initiation.CreditorAccount.Name;
      Context =          bodyJ.Risk.PaymentContextCode;
    }catch(error){
      console.log(error);
      console.log('problem accessing payment data');
    }

    res.render('approve', {name: req.body.name,
                           original_url: req.body.original_url,
                           channel: req.body.channel,
                           context: req.body.context,
                           state: req.body.state,
                           scope: req.body.scope,
                           clientid: req.body.clientid,
                           app_name: req.body.app_name,
                           intent_id: intent_id,
                           amount: InstructedAmount,
                           currency: Currency,
                           debtor: DebtorAccount,
                           creditor: CreditorAccount,
                           context: Context
                          });
  });
});

module.exports = router;
