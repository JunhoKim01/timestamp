
if (Meteor.isServer) {

	Meteor.publish("timestamp", function() {
		return Timestamp.find({owner: this.userId});
		//return Timestamp.find({});
	});

}



