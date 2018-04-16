var approve = require('../routes/approve');
var approveAccount = require('../routes/approveAccount');
var login = require('../routes/login');
var loginAccount = require('../routes/loginAccount');
var redirect = require('../routes/redirect');
var redirectAccount = require('../routes/redirectAccount');
var twofactor = require('../routes/twofactor');
var twofactorAccount = require('../routes/twofactorAccount');
//var landing = require('../routes/landing');
var bodyParser = require('body-parser');
var path = require('path');


module.exports = function(server) {
  // Install a `/` route that returns server status
  console.log("boot script called: pages");

  server.set('views', path.join(__dirname, '../views'));
  server.set('view engine', 'pug');

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use('/login', login);
  server.use('/loginAccount', loginAccount);
  server.use('/approve', approve);
  server.use('/approveAccount', approveAccount);
  server.use('/redirect', redirect);
  server.use('/redirectAccount', redirectAccount);
  server.use('/twofactor', twofactor);
  server.use('/twofactorAccount', twofactorAccount);
};
