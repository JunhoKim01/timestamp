

Meteor.methods ({
  reset: function (){
    Timestamp.remove({});
  },
  recordInTime: function () {
    
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var now = moment().unix(); // unix timestamp
    
    Timestamp.insert({
        owner: Meteor.userId(),
        inTime: now,
        outTime: null
    });
  },
  recordOutTime: function (timestampId) {

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var now = moment().unix(); // unix timestamp

    Timestamp.update(timestampId, {$set: {outTime: now}});
  },

  // edit methods 
  removeItem: function (timestampId) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Timestamp.remove(timestampId, {});
  },




  // admin methods
  saveInTime: function (hour, minute) {

    var now = moment().hours(hour).minutes(minute);
    
    Timestamp.insert({
        inTime: now.unix(),
        outTime: null
      });
  },
  saveOutTime: function (hour, minute) {

    var now = moment().hours(hour).minutes(minute);
    
    Timestamp.update(
      {outTime: null},
      {$set: {outTime: now.unix()}
    });
  }


});

