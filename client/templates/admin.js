Template.admin.onCreated(function () {
  this.autorun(() => {
    this.subscribe('users');
    this.subscribe('hashtag');
  });

});

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

    Meteor.call("resetRecords"); // remove all timestamps  
  },
  "click #resetHashtags": function (event) {
    event.preventDefault();

    Meteor.call("resetHashtags"); // remove all hashtags
  },
  "click .resetDefaultHashtag": function (event) {
    event.preventDefault();

    Meteor.call("resetDefaultHashtag"); // remove all hashtags
  },
  

  "click .resetUsers": function (event) {
    event.preventDefault();

    Meteor.call("resetUser"); // remove all users
  }


});

Template.admin.helpers ({
  users: function () {
    //let user = Meteor.users.find({}).fetch(); 
    // if(user.emails[0].address)
    //   user.emailAddr = user.emails[0].address;

    return Meteor.users.find({});
  },
  hashtags: function () {
    //let hahstag = Hashtag.find({}).fetch(); 
    // if(user.emails[0].address)
    //   user.emailAddr = user.emails[0].address;

    return Hashtag.find({}, {sort: {count: -1}}); 
  },

});