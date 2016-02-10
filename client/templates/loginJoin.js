// session
const isJoin = 'isJoin';
Session.setDefault(isJoin, false);


const ERRORS_KEY = 'loginErrors';
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
  },



});


/* events */
Template.loginJoin.events ({
  "click #loginJoin": function (event, template) {
    event.preventDefault();

    let username, confirm;
    const email = template.$('[name=email]').val().trim();
    const password = template.$('[name=password]').val().trim();  

    let errors = {};

    if (! email) {
      errors.email = 'Email required';
      console.log('Email required');
    }
    if (! password) {
      errors.password = 'Password required';
      console.log('Password required');
    }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }


    // Check email address. 
    const regex = /[a-zA-Z0-9]+(?:(\.|_)[A-Za-z0-9!#$%&'*+/=?^`{|}~-]+)*@(?!([a-zA-Z0-9]*\.[a-zA-Z0-9]*\.[a-zA-Z0-9]*\.))(?:[A-Za-z0-9](?:[a-zA-Z0-9-]*[A-Za-z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/g; // email regex
    if (! email.match(regex)) {
      errors.email = 'Use Appropriate Email address'
      Session.set(ERRORS_KEY, errors);
      if (_.keys(errors).length) {
        return;
      }
    }

    if (Session.get(isJoin)) {
      // Login
      username = template.$('[name=username]').val().trim();
      confirm = template.$('[name=confirm]').val().trim();

      if (! username) {
        errors.username = 'User name required';
        console.log('Password required');
      }
      if (confirm !== password) {
        errors.confirm = 'Please confirm your password';
        console.log('Please confirm your password');
      } else if (password.length < 8 || password.length > 20 ) {
        errors.confirm = 'Password must be 8~20 letters';
      }

      Session.set(ERRORS_KEY, errors);
      if (_.keys(errors).length) {
        return;
      }
      
      // Create user
      Accounts.createUser({
        email: email,
        password: password,
        profile: {
          name:username
        }
      }, function(error) {
        if (error) {
          return Session.set(ERRORS_KEY, {'create': error.reason});
        }

        Router.go('app');
      });

    } else {
      // Login
      Meteor.loginWithPassword(email, password, 
        function(error) {
          if (error) {
            return Session.set(ERRORS_KEY, {'login': error.reason});
          }
          Router.go('app');
        });
    }

  },
  "click #signUpToggle": function (event) {
    event.preventDefault();
    Session.set(isJoin, ! Session.get(isJoin)); // toggle
    Session.set(ERRORS_KEY, {}); // Clear Error key
  }

});