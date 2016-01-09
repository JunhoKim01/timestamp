// session
var expAmount = 'expAmount';
Session.setDefault(expAmount, 0);

// profile class

// var profile = {}
// 	name: "",
// 	level: ,
// 	exp: 0,
// 	company: null,
// 	ranking: null,
// }

// var gainExp = function () {

// }; 


// helpers

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