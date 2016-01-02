// // session
// var isEdit = 'isEdit';
// Session.setDefault(isEdit, false);



if (Meteor.isClient) {


  Meteor.startup(function () {
    

  });


  Meteor.subscribe("timestamp");

  Template.contents.helpers ({
    
    /*
    timestamps: function() {
      return Timestamp.find({});
    }
    */
    
    timestamps: function() {
      var card = Timestamp.find({}, {sort: {inTime: -1}}).fetch(); 

      if(card == null) {
        console.log("Nothing fetched");
        return ;
      }
      
      var locale = window.navigator.userLanguage || window.navigator.language;
      moment.locale(locale);
      
      card.forEach(function (item) {
        
        var tempInTime = moment.unix(item.inTime);
        var tempOutTime = moment.unix(item.outTime);

        item.date = tempInTime.format('LL');
        // item.inTime = tempInTime.format('LT');
        item.inTime = tempInTime.format('a h:mm');
        if(item.outTime != null) { 
          // item.outTime = tempOutTime.format('LT');
          item.outTime = tempOutTime.format('a h:mm');
          item.workingTime = moment.duration(tempOutTime-tempInTime).humanize();
        }

      });

      return card;
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
    },
    "click #new-checkin": function (event) {
      event.preventDefault();

      Meteor.call("recordInTime");
    },
    "click div.ui.green.inverted.segment.timestamp": function (event) {
      event.preventDefault();

      Meteor.call("recordOutTime", this._id);
    },

    /* eidt */
    "click #toggle-eidt": function (event) {
      event.preventDefault();
      Session.set(isEdit,!Session.get(isEdit));
    },

    "click label.remove": function (event) {
      event.preventDefault();

      Meteor.call("removeItem", this._id);
    },

    /* card dropdown */

    "click .ui.dropdown": function (event) {
      event.preventDefault();
      
      $('.ui.dropdown').dropdown();

    }



    
  });


  
} // end of isClient
