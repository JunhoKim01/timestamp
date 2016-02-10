
if (Meteor.isServer) {

  Meteor.publish("timestamp.item", function (count) {
    return Timestamp.find({owner: this.userId}, {sort: {inTime: -1}, limit: count});
  });
  Meteor.publish("timestamp.stat", function (options) {
    return Timestamp.find({});
  });
  Meteor.publish("hashtag", function () {
    return Hashtag.find();
    // return Hashtag.find({}, {sort: {totalTime: -1}});
  });
  Meteor.publish('users', function (){ 
    return Meteor.users.find({}, {fields: {profile: 1}});
  });

}



