Session.setDefault('editUsername', false); // home or profile

Template.settings.helpers ({

  editUsername: function () {
    return Session.get('editUsername');
  },

	userName: function() {
		return Meteor.user().profile.name;
	},
  userEmail: function() {
    return Meteor.user().emails[0].address;
  }

	

});


Template.settings.events ({
  "click #edit-username": function (event) {
    event.preventDefault();
    Session.set('editUsername', true);
    
  },
  // "blur #edit-username": function (event) {
  //   event.preventDefault();
  //   // Change user`s name 
  //   Meteor.call('changeUsername', Meteor.userId(), $('#input-username').val());
  //   Session.set('editUsername', false);
  // },
  "click #done-username": function (event) {
    event.preventDefault();
    Meteor.call('changeUsername', Meteor.userId(), $('#input-username').val().trim());
    Session.set('editUsername', false);
    
  },
  "click #reset-password": function (event) {
    event.preventDefault();
    //Meteor.call('resetPasswordWithEmail', Meteor.userId());
    Accounts.forgotPassword({email: Meteor.user().emails[0].address});
    
  },



});