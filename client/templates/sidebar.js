Template.sidebar.helpers ({

	username: function() {
		return Meteor.user().username;
	}


});



Template.sidebar.events ({

	"click #logout": function(event) {
		//$('.ui.sidebar').sidebar('toggle');	// toglle sidebar before logout
		Meteor.logout(function() {

			Router.go('loginJoin');
		});
	}

});
