var express = require('express');
var router = express.Router();
var request = require('request');
var jwtDecode = require('jwt-decode');
const url2 = require('url');

// var mfaUrl = https://api.eu.apiconnect.ibmcloud.com/jog-psd2/dev/api/MFACodes/mybank/verifyCode
//var mfaUrl = process.env.MFA_URL;
var mfaUrl = "http://mfa-service:3000/api/MFACodes/myBank/verifyCode";
// https://api.think.ibm/think/prod/api/Accounts?filter[where][psu]
//var bankAccountsUrl = process.env.BANK_ACCOUNTS_URL;
var bankAccountsUrl = "http://accounts-service:3300/api/Accounts?filter[where][psu]";

console.log('****trace variables****');
console.log(mfaUrl);
console.log(bankAccountsUrl);

/* GET home page. */
router.post('/', function(req, res, next) {

    // 6 digit code
    var code = req.body.code;

    var options = { method: 'GET',
        url: mfaUrl + '/' + code,
        rejectUnauthorized : false,
        headers:
            {   accept: 'application/json' }
    };

        request(options, function (error, respo, data) {

            // get the code verification status
            var result = JSON.parse ( data );
            var delta = result.delta;

            // check that 2fa 6 digit code has been verified
            if ( delta === -1 || delta === 0  ) {

                var psuName = ( req.body.name.toLowerCase() === 'anne-dubois' ) ? 'anne-dubois' : 'jean-martin';
                var options = { method: 'GET',
                    url: bankAccountsUrl + '=' + psuName,
                    rejectUnauthorized : false,
                    headers:
                        {   accept: 'application/json' }
                };

                request(options, function (error, response, body) {
                    if (error) return console.error('Failed: %s', error.message);

                    res.render('approveAccount', {name: psuName,
                        original_url: req.body.original_url,
                        channel: req.body.channel,
                        context: req.body.context,
                        state: req.body.state,
                        scope: req.body.scope,
                        brand: req.body.brand,
                        clientid: req.body.clientid,
                        app_name: req.body.app_name,
                        accounts: body
                    });
                });

            } else {
                res.render('loginAccount', {
                    original_url: req.body.original_url,
                    channel: req.body.channel,
                    context: req.body.context,
                    state: req.body.state,
                    scope: req.body.scope,
                    brand: req.body.brand,
                    clientid: req.body.clientid,
                    app_name: req.body.app_name
                });
            }
        });

});

module.exports = router;
