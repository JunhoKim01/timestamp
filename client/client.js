

if (Meteor.isClient) {



  Meteor.startup(function () {
    
  });


  Meteor.subscribe("timestamp");
  Meteor.subscribe("users");
  
} 



