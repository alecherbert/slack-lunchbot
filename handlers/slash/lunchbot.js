var TOKEN = process.env.SLACK_TOKEN;
var LOC_ID = process.env.LOCATION_IDENTIFIER;
var URL_ROOT = process.env.URL_ROOT;

var request = require('request');

module.exports = function (req, res, next) {
  var token = req.body.token;
  if (token !== TOKEN) {
    return res.status(200).end();
  }
  console.log("HERE");
  var query = req.body.text;
  if (query == 'info') {
    console.log('info here');
  }

  request(URL_ROOT+LOC_ID, (err, res, body) => {
    console.log(body);
    return res.status(200).json({
      response_type: 'in_channel',
      text: 'hi',
      mrkdwn: true     
    });
  });
};

