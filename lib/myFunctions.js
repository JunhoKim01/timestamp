// My custom functions 

Meteor.myFunctions = {
	// Error handling 
	clientException: function (message, code) {
	   this.message = message;
	   this.name = "clientException";
	   this.code = code;
	},
	logError: function (error) {
		console.log('clientException: ' + error.message + ' [' + error.code + ']');
	}
}