var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	slackUsername: String,
	defaultMeetingMins: Number,
	slackId: String,
	googleTokens: Object,
	slackEmail: String,
	slackDmIds: Array
});

var ReminderSchema = new Schema({
    summary:{
        type:String,
        required: true
    },
    location:{
        type: String
    },
    description:{
        type:String
    },
    start_Datetime:{
        type:Date,
        required:true
    },
    end_Datetime:{
        type:Date,
    },
    attendees:{
        type:String,
    }
});

var User = mongoose.model('User', userSchema);
var Reminder = mongoose.model('Reminder', ReminderSchema);

module.exports = { User, Reminder };
