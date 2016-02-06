
if (Meteor.isServer) {

  Meteor.publish("timestamp", function() {
    return Timestamp.find({owner: this.userId});
    //return Timestamp.find({});
  });
  Meteor.publish("hashtag", function() {
    return Hashtag.find({});
  });
  Meteor.publish('users', function (){ 
    return Meteor.users.find({});
  });

}



