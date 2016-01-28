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

    var username = template.$('[name=username]').val();
    var email = template.$('[name=email]').val();
    var password = template.$('[name=password]').val();
    var confirm = template.$('[name=confirm]').val();

    var errors = {};

    

    if(Session.get(isJoin)) {
      // join
      if (! username) {
        errors.username = 'User name required';
        console.log('Password required');
      }
      if (! email) {
        errors.email = 'Email required';
        console.log('Email required');
      }
      if (! password) {
        errors.password = 'Password required';
        console.log('Password required');
      } else {
        if (confirm !== password) {
          errors.confirm = 'Please confirm your password';
          console.log('Please confirm your password');
        }
      }

      Session.set(ERRORS_KEY, errors);
      if (_.keys(errors).length) {
        return;
      }

      // user create
      // var result = "";
      // result = Meteor.call("createUserProfile", email, password, username);
      //console.log("createUserProfile result : " + result);

    
      // let options = {
      //   email: email,
      //   password: password,
      //   profile: {
      //    name:username
      //   }
      // };
      
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

      

      //Meteor.call("createUserProfile", email, password, username, 

      //  function(error) {
      //  if (error) {
      //    errors.create = error.reason;
      //    Session.set(ERRORS_KEY, errors);
      //     return; 
      //   }
      //   Meteor.loginWithPassword(email, password, function(error) {
      //     if (error) {
      //       Session.set(ERRORS_KEY, errors);
      //       return; 
      //     }
           
      //     Router.go('app');
      //   });

      // });
      
      //if(result == null) {
        
        //errors.join = "Sign up failed";

        // Session.set(ERRORS_KEY, errors);
        // if (_.keys(errors).length) {
       //      return;
        // }
      //} else {
        // login 

    } else {
      // login
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

      Meteor.loginWithPassword(email, password, 
        function(error) {
          if (error) {
            return Session.set(ERRORS_KEY, {'login': error.reason});
          }
          // if(arguments.length > 0) {
          //  errors.join = "Please check your Email or Password";
          //  Session.set(ERRORS_KEY, errors);
          //  if (_.keys(errors).length) {
          //    return;
          //  }
          // } else {
          Router.go('app');
          
        });
    }

    

    },
    "click #signUpToggle": function (event) {
      event.preventDefault();
      Session.set(isJoin, ! Session.get(isJoin)); // toggle
    }

});