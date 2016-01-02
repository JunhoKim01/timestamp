// session

var tabStatus = 'tabStatus';
Session.setDefault(tabStatus, 'contents'); // home or stat


Template.app.helpers ({
	getTabStatus: function() { 
		return Session.get(tabStatus); 
	}
});


Template.menubar.helpers ({


	// username: function() {
	// 	return Meteor.user().username;
	// }
	getTabStatus: function() { 
		return Session.get(tabStatus); 
	}

});



Template.menubar.events ({

	"click #logout": function(event) {
		//$('.ui.sidebar').sidebar('toggle');	// toglle sidebar before logout
		Meteor.logout(function() {

			Router.go('app');
		});
	},
	"click #home": function(event) {
		Session.set(tabStatus,'contents');
	},
	"click #stat": function(event) {
		Session.set(tabStatus,'stat');	
	}


});
