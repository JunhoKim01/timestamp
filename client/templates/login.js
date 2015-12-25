/*
Template.login.events({
  'click button.login': function () {
    Router.go('/app');
  }
});
*/

var ERRORS_KEY = 'joinErrors';

Template.join.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.join.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});


Template.login.events ({
	"submit": function (event, template) {
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

	    if (confirm !== password) {
	      errors.confirm = 'Please confirm your password';
	    }

		Session.set(ERRORS_KEY, errors);
			if (_.keys(errors).length) {
		      return;
		    }


		var options = new Object();
		if(event.target.username != null) {
			options.username = event.target.username.value;
		}
		if(event.target.email.value != "") {
			options.email = event.target.email.value;
		} else {
			alert("Invalid email address!");
			return;
		}
		if(event.target.password.value != "") {
			options.password = event.target.password.value;
		} else {
			alert("Invalid password!");
			return;
		}
		
		/*
		if(event.target.username != null)
	    	options.username = event.target.username.value;
	    if(event.target.email.value != null) {
	    	options.email = event.target.email.value;
	    	return;
	    }	
	    if(event.target.upassword != null)
	    	options.password = event.target.password.value;
	    
	    */
		console.log(options);
	    Meteor.call("join", options);
		
        
    },
    "click a.join-now": function (event) {
        event.preventDefault();
		
		//var templateUsername = new Blaze.Template("username");
		var loginForm = document.getElementsByTagName('form')[0];
		var emailInput = document.getElementsByTagName('input')[0];

     	Blaze.render(Template.username, loginForm, emailInput);
     	document.getElementsByTagName('input')[3].value = 'Join';
    }

});