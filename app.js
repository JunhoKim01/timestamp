Timestamp = new Mongo.Collection("timestamp");

if (Meteor.isClient) {

  Meteor.subscribe("timestamp");

  Template.contents.helpers ({
    timestamps: function() {
      var timestamp = Timestamp.find({}).fetch(); 

      var locale = window.navigator.userLanguage || window.navigator.language;
      moment.locale(locale);

      timestamp.forEach(function (log) {
        var inTime = moment.unix(log.inTime);
        var outTime = moment.unix(log.outTime);

        log.date = inTime.format('LL');
        log.inTime = inTime.format('LT');
        if(log.outTime != null) { 
          log.outTime = outTime.format('LT');
          log.workingTime = moment.duration(outTime-inTime).humanize();
        }

      });
 

      


      return timestamp;
    }

  });



  Template.buttons.events ({
   "click .in": function (event) {
        event.preventDefault();

        Meteor.call("recordInTime");
    },

    "click .out": function (event) {
      event.preventDefault();

      Meteor.call("recordOutTime");      
    }
  });


  Template.contents.events ({
    "click .remove": function (event) {
      event.preventDefault();

      //Meteor.call("removeItem");
    },

    "click .edit": function (event) {
      event.preventDefault();

      //Meteor.call("editItem");      
    }
    
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
    "click .reset": function (event) {
      event.preventDefault();

      Meteor.call("reset"); // remove all timestamps  
    }
  });

  
} // end of isClient

if (Meteor.isServer) {
  Meteor.publish("timestamp");
}


Meteor.methods ({
  reset: function (){
    Timestamp.remove({});
  },
  recordInTime: function () {
    
    var now = moment().unix(); // unix timestamp
    
    Timestamp.insert({
        inTime: now,
        outTime: null
      });
  },
  recordOutTime: function () {
    
    var now = moment().unix(); // unix timestamp

    Timestamp.update(
      {outTime: null},
      {$set: {outTime: now}
    });
  },

  // user 
  join: function (options) {

    //console.log(options);
    if(options.username == null) {
      Meteor.loginWithPassword(options, function() {
        // welcome message
        // TODOS: re-render main page
      });
    } else {
       Accounts.createUser(options, function() {
        alert("Welcome, " + options.username +"!");
       });
    }
  },


  // develop mode methods
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






