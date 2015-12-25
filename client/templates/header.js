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



Template.buttons.events ({
"click .in": function (event) {
    event.preventDefault();

    Meteor.call("recordInTime");
},

"click .out": function (event) {
  event.preventDefault();

  Meteor.call("recordOutTime");      
}
});
