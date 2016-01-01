

Template.header.events ({


	"click a.logout": function(event) {
		Meteor.logout(function() {
			Router.go('app');
		});
	},
	"click a.launch.icon.item": function(event) {
		
		$('.ui.sidebar').sidebar('toggle');		
		
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
