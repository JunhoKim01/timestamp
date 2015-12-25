Timestamp = new Mongo.Collection("timestamp");

if (Meteor.isClient) {

  Meteor.subscribe("timestamp");

  Template.contents.helpers ({
    timestamps: function() {
      var card = Timestamp.find({owner: Meteor.userId()}).fetch(); 

      //console.log(card);

      var locale = window.navigator.userLanguage || window.navigator.language;
      moment.locale(locale);

      card.forEach(function (log) {
        var inTime = moment.unix(log.inTime);
        var outTime = moment.unix(log.outTime);

        log.date = inTime.format('LL');
        log.inTime = inTime.format('LT');
        if(log.outTime != null) { 
          log.outTime = outTime.format('LT');
          log.workingTime = moment.duration(outTime-inTime).humanize();
        }

      });
 

      


      return card;
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
        owner: Meteor.userId(),
        inTime: now,
        outTime: null
      });
    console.log({
        owner: Meteor.userId(),
        inTime: now,
        outTime: null
      });
  },
  recordOutTime: function () {
    
    var now = moment().unix(); // unix timestamp

    Timestamp.update(
      { outTime: null,
        owner: Meteor.userId()},
      {$set: {outTime: now}
    });
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






