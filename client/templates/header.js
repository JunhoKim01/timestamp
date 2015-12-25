Template.header.helpers ({

	username: function() {
		return Meteor.user().username;
	}


});

Template.header.events ({


	"click a.logout": function(event) {
		Meteor.logout(function() {
			Router.go('app');
		});
	}
});