Template.admin.events ({

  // develop mode methods
  "submit .new-inTime": function (event) {
    event.preventDefault();

    Meteor.call("saveInTime", event.target.hour.value, event.target.minute.value);  
  },
  "submit .new-outTime": function (event) {
    event.preventDefault();

    Meteor.call("saveOutTime", event.target.hour.value, event.target.minute.value);  
  },
  "click .resetRecords": function (event) {
    event.preventDefault();

    Meteor.call("reset"); // remove all timestamps  
  },
  "click .resetUsers": function (event) {
    event.preventDefault();

    Meteor.call("resetUser"); // remove all timestamps  
  }


});