Template.app.helpers ({
	getTabStatus: function () { 
		return Session.get('tabStatus'); 
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
	// getTabStatus: function () { 
	// 	return Session.get('tabStatus'); 
	// }

});



Template.menubar.events ({

	// -----------------------
  	// Pages
  	// -----------------------

  	"click #home": function (event) {
  		event.preventDefault();
  		// console.log(event);
  		// alert('home clicked');
  		Session.set('tabStatus', 'contents');
      Session.set('isInput', false);

      
  	},
  	"click #hashtag": function (event) {
  		event.preventDefault();
  		
  		// alert('hashtag clicked');
  		Session.set('tabStatus', 'hashtag');
  		Session.set('isEditMode', false);
  		Session.set('loadableItemCount', 3);

  	},
  	// "click .ui.menu": function (event) {
  	// 	console.log('(' + event.screenX + ', ' + event.screenY + ')');
  	// },
	
	// -----------------------
  	// Dropdown button
  	// -----------------------

	"click #toggle-edit": function (event) {
		event.preventDefault();
		Session.set('isEditMode',!Session.get('isEditMode'));
    Session.set('isInput', false);
	},
	"click #settings": function (event) {
		event.preventDefault();
		Session.set('tabStatus', 'settings');
    Session.set('editUsername', false);
	},
	"click #logout": function(event) {
		event.preventDefault();
		Meteor.logout(function(error) {
      if (error) {
        throw new Meteor.error('logout failed');
      } else {
			 Router.go('splash');
      }

		});
	}

	


});
