// session

var tabStatus = 'tabStatus';
Session.setDefault(tabStatus, 'contents'); // home or profile




Template.app.helpers ({
	getTabStatus: function() { 
		return Session.get(tabStatus); 
	}
});

Template.menubar.onRendered(function () {
  
	// initializing dropdown menu
	$('.ui.dropdown.item').dropdown();  
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


	"clic ui.dropdown.item": function() {

	},
	"click #logout": function(event) {
		//$('.ui.sidebar').sidebar('toggle');	// toglle sidebar before logout
		Meteor.logout(function() {

			Router.go('app');
		});
	},
	"click #home": function(event) {
		Session.set(tabStatus,'contents');
	},
	"click #profile": function(event) {
		Session.set(tabStatus,'profile');	
	}


});
