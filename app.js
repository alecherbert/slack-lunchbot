var express = require('express');
var bodyParser = require('body-parser');
var lunchbotHandler = require('./handlers/slash/lunchbot');
var dotenv = require('dotenv');
dotenv.load();
 
var app = express();
var port = process.env.PORT || 3000;
 
// body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
 
// handler mapping
app.post('/slash/lunchbot', lunchbotHandler);
 
// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});
 
app.listen(port, function () {
  console.log('Slack bot listening on port ' + port);
});
