// session
var isJoin = 'isJoin';
Session.setDefault(isJoin, false);


var ERRORS_KEY = 'loginErrors';
Template.loginJoin.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});


/* helpers */
Template.loginJoin.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  },
  isJoin: function() {
  	return Session.get(isJoin); 
  }

});

/* events */
Template.loginJoin.events ({
	"submit.loginJoin": function (event, template) {
        event.preventDefault();

        var username = template.$('[name=username]').val();
        var email = template.$('[name=email]').val();
	    var password = template.$('[name=password]').val();
	    var confirm = template.$('[name=confirm]').val();

	    var errors = {};

		if (! email) {
	      errors.email = 'Email required';
	    }
	    if (! password) {
	      errors.password = 'Password required';
	    }

		if(Session.get(isJoin)) {
			// join
			if (! username) {
	      		errors.username = 'User name required';
	    	}
	    	if (confirm !== password) {
		    	errors.confirm = 'Please confirm your password';
		    }

		    Session.set(ERRORS_KEY, errors);
			if (_.keys(errors).length) {
		      return;
			}

			Accounts.createUser(username, email, password, function() {
        		alert("Welcome, " + username +"!");
       		});

		} else {
			// login
			Session.set(ERRORS_KEY, errors);
			if (_.keys(errors).length) {
		      return;
			}

			Meteor.loginWithPassword(email, password);
		}

		Router.go('app');

    },
    "click a.loginJoin-now": function (event) {
        event.preventDefault();
		Session.set(isJoin, ! Session.get(isJoin)); // toggle
    }

});