var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var lunchbotHandler = require('./handlers/slash/lunchbot');
//var html2canvas = require('html2canvas-proxy');
var request = require('request');
var jsdom = require('jsdom');

var dotenv = require('dotenv');
dotenv.load();
 
var app = express();
var port = process.env.PORT || 3002;
var LOC_ID = process.env.LOCATION_IDENTIFIER;
var URL_ROOT = process.env.URL_ROOT;

var Global = { 
  'title': "placeholder_title",
  'text': "placeholder_text",

};
 
// body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
 
// handler mapping
app.post('/lunchbot', lunchbotHandler);

app.get('/here', function(req,res) {
  console.log("GET-ing"); 
  res.send("HERE2");
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.sendStatus(400).send(err.message);
});

app.listen(port, function () {
  console.log('Slack bot listening on port ' + port);
});


var later = require('later');

var sched = later.parse.recur().every(2).minute();
later.date.UTC();
var runTask = later.setInterval(getMenu, sched);
getMenu();

function getMenu() {
  request(URL_ROOT+LOC_ID, (reqErr, reqRes, reqBody) => {
    jsdom.env(reqBody, function(err,window) {
      var $ = require('jquery')(window);
      var $days = $("table.table_all>tbody>tr>td");
      var dayRaw = (new Date()).getDay();
      if(dayRaw == 0 || dayRaw == 6) { //sunday or saturday
        
      } else {
        var dayAdj = dayRaw-1;
        var $today = $($days[dayAdj]);
        if($today.hasClass('table_rowright')) {
            Global.title= $today.find(".right.bold")[1].innerHTML;
            Global.text= $today.find(".menu_item_text")[1].innerHTML;
        } else {

        }
      }
    });
  });
}

module.exports = Global;
