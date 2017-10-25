var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport      = require('passport');



app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({ extended: true }));







// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


 //require ("./test/app.js")(app);
require ("./project/app.js")(app);
//require ("./assignment/app.js")(app);

//var connectionString = 'mongodb://127.0.0.1:27017/wam-fall-2016';
//var connectionString = 'mongodb://'+ process.env.HEROKU_MONGODB_DB_USERNAME + ":"
 //   + process.env.HEROKU_MONGODB_DB_PASSWORD +'@ds031835.mlab.com:31835/dishadata'
var connectionString = 'mongodb://dishaMongo:08051@ds@ds031835.mlab.com:31835/dishadata';

// if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
//     connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//         process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//         process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
//         process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
//         process.env.OPENSHIFT_APP_NAME;
// }

console.log("Connection String : "  + connectionString);
var mongoose = require("mongoose");
mongoose.connect(connectionString);


//var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.Port || 3000;

app.listen(port);
