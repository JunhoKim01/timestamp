
Router.configure({
  //layoutTemplate: 'app'
  loadingTemplate: 'loading'
});




/*
Router.route('loginJoin', {
	path: '/loginjoin',
	onBeforeAction: function () {
		this.render('loading');
		if (Meteor.user()) {
			Router.go('app');
			// if (Meteor.loggingIn()) {
			// 	// show loading template

			// } else {
			// 	Router.go('loginjoin');
			// }
		} else {
			this.next();
		}
	}

});
*/


Router.route('app', {
	path: '/'
	/*
	onBeforeAction: function () {
		this.render('loading');
		if (! Meteor.user()) {
			Router.go('loginJoin');
			// if (Meteor.loggingIn()) {
			// 	// show loading template

			// } else {
			// 	Router.go('loginjoin');
			// }
		} else {
			this.next();
		}
	}*/

});


Router.route('admin', {
  path: '/admin',
});