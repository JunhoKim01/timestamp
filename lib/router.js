
Router.configure({
  //layoutTemplate: 'app'
  

});



Router.route('loading', {
	path: '/loading',

});

Router.route('seeSplash', {
	path: '/splash',

});

Router.route('splash', {
	path: '/',
	
	waitOn: function () {

		// Meteor.setTimeout(function () {


		// }, 1000); // Wati at least 1 second

		if (Meteor.user() !== undefined) {
			// the user is ready
			if (Meteor.user()) {
			    // the user is logged in
			    if (Meteor.user() && Meteor.user().profile.name) {
			     	// Go to main page if everthing is okay
			    	Router.go('app');  
			    } else {
			    	// Wate
			    	this.render();
			    }

		 	} else {
			    // User is not logged in
		    	Router.go('loginJoin');
		    }

		} else {
			// Waiting for the user to be ready
			this.render();

		}



  //   	if (Meteor.user()) {
		// 	// User exits	
		// 	console.log("Before go app");
			
		// 	Router.go('app');
		// } else {
		// 	// User does not exit
		// 	//console.log("Not exits : " + Meteor.user());
		// 	console.log("Before go loginJoin");
		// 	Router.go('loginJoin');
			
		// }	
  	}
	// onAfterAction: function () {
	// 	console.log("onAfterAction splash");
	// 	console.log(Meteor.user());
	// 	window.setTimeout(function() {
	// 		if (Meteor.user()) {
	// 			// User exits	
	// 			console.log("Before go app");
				
	// 			Router.go('app');
	// 		} else {
	// 			// User does not exit
	// 			//console.log("Not exits : " + Meteor.user());
	// 			console.log("Before go loginJoin");
	// 			Router.go('loginJoin');
				
	// 		}	
	// 	}, 10);
	// }
});



Router.route('loginJoin', {
	path: '/loginJoin',
	// onBeforeAction: function () {
	// 	// this.lender()
	// 	if (Meteor.user()) {
	// 		this.render('splash');
	// 		Router.go('app');
	// 	} else {
	// 		// User does not exits
	// 		this.next();
	// 	}
	// }
});




Router.route('app', {
	path: '/app',
	waitOn: function () {

		if (Meteor.user() !== undefined) {
			// User is ready
			if (Meteor.user()) {
			    // User is logged in
			    if (Meteor.user() && Meteor.user().profile.name) {
			     	// Go to main page if everthing is okay
			    	this.render();
			    } else {
			    	// Go to 
			    	// console.log('Is this really happen?');
			    }

		 	} else {
			    // not loggedn in
			    Router.go('loginJoin');
			    // console.log('User not logged in');
		    }

		} else {
			// waiting for the user to be ready

		}
		
	}

	// onBeforeAction: function () {
		
	// 	// if (!Meteor.user()) {
	// 	// 	// User does not exit
	// 	// 	this.render('loginJoin');
	// 	// } else {
	// 	// 	// User exits
	// 	// 	if (Meteor.loggingIn()) {
				
	// 	// 		//this.render('loading');
	// 	// 		console.log("loading");
	// 	// 	} else {
	// 	// 		this.next();
	// 	// 	}
			
	// 	// }
	// 	this.next();
	// }

});


Router.route('admin', {
  path: '/admin',
});