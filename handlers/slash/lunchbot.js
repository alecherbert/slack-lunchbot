var dotenv = require('dotenv');
dotenv.load();

var TOKEN = process.env.SLACK_TOKEN;
var LOC_ID = process.env.LOCATION_IDENTIFIER;
var URL_ROOT = process.env.URL_ROOT;

module.exports = function (req, res, next) {
  console.log("SLASH");
  var token = req.body.token;

  if (token !== TOKEN) {
    console.log('invalid token');
    return res.sendStatus(200).end();
  }
  console.log("HERE");
  var query = req.body.text;
  if (query == 'info') {
    console.log('info here');
  }

  var Global = require ('../../app');
  console.log(JSON.stringify(Global));
  var payload = {
    response_type: 'in_channel',
    mrkdwn: true,
    attachments: Global.attachments
  };
  return res.json(payload);
};
