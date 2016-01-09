// profile.js

Template.profile.helpers ({
	
	exp: function () {
		return Meteor.user().profile.exp;
	},
	level: function () {
		return Meteor.user().profile.level;
	},
	ranking: function () {
		return Meteor.user().profile.ranking;
	},
	username: function () {
		return Meteor.user().profile.name;
	}


});


Template.profile.events ({



});