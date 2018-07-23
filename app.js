const {google} = require('googleapis');
const express = require ('express');
const bodyParser = require('body-parser');

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const scopes = [
    'https://www.googleapis.com/auth/calendar'
];

const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    state: 'myId',
    // If you only need one scope you can pass it as a string
    scope: scopes
  });

console.log(url);


app.get('/oauthcallback',(req,res)=>{
    res.send('okay');
    oauth2Client.getToken(req.query.code, function(error,token){
        if(error){
            console.log("Error!"+error)
        }else{
            console.log(token)
            makeCalendarAPICall(token)
        }
    })
})

function makeCalendarAPICall(token) {
    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URL
    )
  
    oauth2Client.setCredentials(token)
  
    oauth2Client.on('tokens', (tokens) => {
      if (tokens.refresh_token) {
        // store the refresh_token in my database!
        console.log(tokens.refresh_token);
      }
      console.log(tokens.access_token);
    });
  
    const calendar = google.calendar({version: 'v3', auth: oauth2Client});
  /*
    calendar.events.insert({
      calendarId: 'primary', // Go to setting on your calendar to get Id
      'resource': {
        'summary': 'Google I/O 2015',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
          'dateTime': '2018-07-04T02:00:35.462Z',
          'timeZone': 'America/Los_Angeles'
        },
        'end': {
          'dateTime': '2018-07-04T02:10:35.462Z',
          'timeZone': 'America/Los_Angeles'
        },
        'attendees': [
          {'email': 'lpage@example.com'},
          {'email': 'sbrin@example.com'}
        ]
      }
    }, (err, {data}) => {
      if (err) return console.log('The API returned an error: ' + err);
      console.log(data)
    })
    return;
  */
  
    calendar.events.list({
      calendarId: 'primary', // Go to setting on your calendar to get Id
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, {data}) => {
      if (err) return console.log('The API returned an error: ' + err);
      const events = data.items;
      if (events.length) {
        console.log('Upcoming 10 events:');
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log('No upcoming events found.');
      }
    });
  }

// function listEvents(auth){
//     const calendar = google.calendar({version: 'v3', auth});
//     calendar.events.list({
//       calendarId: 'primary',
//       timeMin: (new Date()).toISOString(),
//       maxResults: 10,
//       singleEvents: true,
//       orderBy: 'startTime',
//     }, (err, res) => {
//       if (err) return console.log('The API returned an error: ' + err);
//       const events = res.data.items;
//       if (events.length) {
//         console.log('Upcoming 10 events:');
//         events.map((event, i) => {
//           const start = event.start.dateTime || event.start.date;
//           console.log(`${start} - ${event.summary}`);
//         });
//       } else {
//         console.log('No upcoming events found.');
//       }
//     });
//   }

app.listen(1337)