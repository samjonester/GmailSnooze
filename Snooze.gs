// Run setup to create labels and triggers.

function setup() {
  // Create the labels we'll need for snoozing
  createLabel(FOLDER);
  createHourSnooze(FOLDER+"/"+TONIGHT_LABEL, TONIGHT, "unsnoozeTonight");
  createHourSnooze(FOLDER+"/"+TOMORROW_LABEL, TOMORROW, "unsnoozeTomorrow");
  createDaySnooze(FOLDER+"/"+NEXT_WEEK_LABEL, NEXT_WEEK, "unsnoozeNextWeek");
  createDaySnooze(FOLDER+"/"+WEEKEND_LABEL, WEEKEND, "unsnoozeWeekend");
}


//
//
// Customizable variables
//
//

// Main folder for labels
var FOLDER = "Snooze";

// Snooze until tonight
// Hour to snooze until (+- 15 min)
var TONIGHT = 17;
// Label for tonight
var TONIGHT_LABEL = "Tonight";

// Snooze until tomorrow
// Hour to snooze until (+- 15 min)
var TOMORROW = 8;
// Label for tonight
var TOMORROW_LABEL = "Tomorrow";

// Snooze until next week (8 am)
// Day to snooze until
var NEXT_WEEK = ScriptApp.WeekDay.MONDAY;
// Label for tonight
var NEXT_WEEK_LABEL = "Next Week";

// Snooze until this weekend (8 am)
// Day to snooze until
var WEEKEND = ScriptApp.WeekDay.FRIDAY;
// Label for tonight
var WEEKEND_LABEL = "This Weekend";





// Functions for triggers
function unsnoozeTonight() {
  unsnoozeLabel(FOLDER+"/"+TONIGHT_LABEL);
}

function unsnoozeTomorrow() {
  unsnoozeLabel(FOLDER+"/"+TOMORROW_LABEL);
}

function unsnoozeNextWeek() {
  unsnoozeLabel(FOLDER+"/"+NEXT_WEEK_LABEL);
}

function unsnoozeWeekend() {
  unsnoozeLabel(FOLDER+"/"+WEEKEND_LABEL);
}





// Meat and Potatoes
function createLabel(label) {
  GmailApp.createLabel(label);
}

function createHourSnooze(label, hour, functionName) {
  createLabel(label);
  ScriptApp.newTrigger(functionName)
   .timeBased()
   .atHour(hour)
   .everyDays(1)
   .create();
}

function createDaySnooze(label, day, functionName) {
  createLabel(label);
  ScriptApp.newTrigger(functionName)
   .timeBased()
   .onWeekDay(day)
  .atHour(TOMORROW)
   .create();
}

function unsnoozeLabel(labelToUnsnooze) {
  var oldLabel = GmailApp.getUserLabelByName(labelToUnsnooze);
  var page = null;
    while(!page || page.length == 100) {
      page = oldLabel.getThreads(0, 100);
      if (page.length > 0) {
        GmailApp.markThreadsUnread(page);
        GmailApp.moveThreadsToInbox(page);

        oldLabel.removeFromThreads(page);
      }
    }
}
