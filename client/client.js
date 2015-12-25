
if (Meteor.isClient) {

  Meteor.subscribe("timestamp");

  Template.contents.helpers ({
    
    /*
    timestamps: function() {
      return Timestamp.find({});
    }
    */
    
    timestamps: function() {
      var card = Timestamp.find({}).fetch(); 

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
        item.inTime = tempInTime.format('LT');
        if(item.outTime != null) { 
          item.outTime = tempOutTime.format('LT');
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
    }
    
  });


  
} // end of isClient
