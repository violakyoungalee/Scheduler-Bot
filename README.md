# Scheduler-Bot

### What are we building?
A slackbot that can schedule meetings for you and your team.

### Who is our immediate customer?
Teams who use Slack and actively schedule meetings on Google Calendar.

Examples:
- Engineering Teams
- Sales Teams
- Marketing Teams
- Agencies
- Consulting Firms
- Middle Management across the board.

### Why are we building this now?

Productivity is hard to come by in fast-paced work environments. Dozens of browsers tabs, desktop apps,  and mobile notifications drown your ability to focus and concentrate. As companies like Google, Facebook, Amazon and IBM continue to build powerful AI-based platforms and tools, the barrier to applying machine learning to real user problems is becoming dramatically reduced.

Scheduler Bot solves a real customer problem by streamlining workflow for a very large, immediately addressable market (teams who schedules meetings and use Slack) at the exact right time (advent of new powerful, easy-to-use AI technologies + proliferation of software tools used on job)

##### Process
Milestones: A complete, relatively shippable set of features that we can use to mark team progress
Components: A chunky, self-contained set of engineering tasks that are used to breakdown milestones

Policies (these only makes sense when you read everything, but are for references later):
Availability Policy: Used to find suggestions of available times on calendar between invitees
Incomplete Access Policy: Used when bot cannot obtain Google Calendar access from all invitees within 2 hours (time subject to change)
Pending Access Policy: Used when requesting Google Calendar access from many meeting invitees (implemented via Cron Job in v1).

Data
Requester: The person who asks the bot something.
Query: The thing you ask a bot. “API.AI” refers to these as “User Expressions”
Invitees: People you invite to meetings.
Meetings: Will be represented as Google Calendar Events.
Task: To do list items at the top of Google Calendar. They do not have Invitees in the way we are using Tasks (though Google permits them). To do list items are “All Day” Events in Google’s data model.

### Functionality:
- Milestone 1: Simple Reminder System
- Milestone 2: Basic Meeting Scheduling
- Milestone 3: Time Conflicts
- Milestone 4: Time Conflicts & New Invitees
- Milestone 5: Ask invitees for confirmation before scheduling
- Milestone 6: Customization of meeting length, default timezone and options to add more Google Calendars.
- Milestone 7: Algorithm to efficiently suggest available times
- Milestone 8: When are people free?

### Data Flow
1. User sends a direct message to SchedulerBot:
   - Samples: `Schedule a meeting with @Franky at 2pm next Tuesday`, `Remind me to buy grocery tomorrow`
   - **For first-time users**:
      - SchedulerBot provides a URL for user to authorize access to user's Google Calendar
2. SchedulerBot sends user's message to Dialogflow via an express server hosted on Heroku
3. Dialogflow analyzes the message and returns a JSON object of parsed information
4. Express server tells SchedulerBot to prompt user for confirmation of the new meeting/reminder based on returned intent & parameters
5. User can either confirm or cancel
6. (**If user confirms**) SchedulerBot signals the express server to go ahead with the request
7. Express server uses Calendar API to create new reminder/meeting on user's Google Calendar
8. SchedulerBot sends user a message when the new reminder/meeting is successfully created.

### API References
- [Slack API](https://api.slack.com/)
  - Incoming Webhooks
  - Interactive Components
  - Real Time Messaging (RTM)
  - Web APIs
- [Google Calendar API](https://developers.google.com/calendar/v3/reference/)
- [Dialogflow](https://dialogflow.com/docs/getting-started/basics) (formerly API.AI)
