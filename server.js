var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var RTMClient = require('@slack/client');
var WebClient = require('@slack/client')
// const sessionId = 'demi-chat-1';
// const dialogflow = require('dialogflow');
// const sessionClient = new dialogflow.SessionsClient();
// const sessionPath = sessionClient.sessionPath(process.env.DIALOGFLOW_PROJECT_ID, sessionId);

const token = process.env.SLACK_TOKEN;
const web = new WebClient(token);
const rtm = new RTMClient(token);

rtm.start();

rtm.on('message', function(event) {
  console.log(event);
  if (event.bot_id === 'BBVFS88A1') return;
  web.chat.postMessage({
        channel: event.channel,
        as_user: true,
        "text": "Welcome to ScheduleBot! Here, we make it easy for you to set reminders for your important tasks and schedule events that are synced to your GCal.",
        "attachments": [
            {
                "text": "Are you ready to get started?",
                "fallback": "Shame... buttons aren't supported in this land",
                "callback_id": "button_tutorial",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "yes",
                        "text": "yes",
                        "type": "button",
                        "value": "yes"
                    },
                    {
                        "name": "no",
                        "text": "no",
                        "type": "button",
                        "value": "no"
                    },
                    {
                        "name": "maybe",
                        "text": "maybe",
                        "type": "button",
                        "value": "maybe"
                    }
                ]
            }
        ]
  })
})

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function(req, res) {
    res.send('Ngrok is working! Path Hit: ' + req.url);
});

app.post('/slack/slash-commands/send-me-buttons', urlencodedParser, (req, res) =>{
  console.log(req.body);
    res.status(200).end() // best practice to respond with empty 200 status code
    var reqBody = req.body
    var responseURL = reqBody.response_url
    if (reqBody.token !== process.env.SLACK_TOKEN){
        res.status(403).end("Access forbidden")
    }else{
        //
        sendMessageToSlackResponseURL(responseURL, message)
    }
})

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
