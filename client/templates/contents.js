// session
var isEditMode = 'isEditMode';
Session.setDefault(isEditMode, false);
Session.setDefault('removeItem', null);
Session.setDefault('removeTemplate', null);

// get locale
var locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale);

var removeTemplate = null;

Template.contents.helpers ({

	timestamps: function () {

		// No need to find this user 
		// because ti already filtered with publish func on server.js
	  	var card = Timestamp.find({}, {sort: {inTime: -1}}).fetch(); 


		// get data & chagne format
		card.forEach(function (item) {

			var tempInTime = moment(item.inTime);   // unix timestamp in milliseconds

			if (item.outTime != null) {
				var tempOutTime = moment(item.outTime); // unix timestamp in milliseconds		
				item.outTime = tempOutTime.format('a h:mm');
				item.workingTime = moment.preciseDiff(tempInTime, tempOutTime, locale);
			}

			item.date = tempInTime.format('LL');
			item.inTime = tempInTime.format('a h:mm');
			
			item.hashtag.forEach(function (currentValue, index, array) {
				array[index] = '#' + currentValue;
			});

		});	

		return card;
	}

	



});



Template.contents.events ({
	"click .remove": function (event) {
		event.preventDefault();

	  	//Meteor.call("removeItem");
	},

	"click .edit": function (event) {
		event.preventDefault();

	  	//Meteor.call("editItem");      
	},

	// -----------------------
  	// Check in & out buttons
  	// -----------------------	

	"click #new-checkin": function (event) {
	 	event.preventDefault();

		Meteor.call("newCheckIn");
	},
	"click #new-checkout": function (event) {
		event.preventDefault();

		Meteor.call("newCheckOut", this._id);
	},
	

	// -----------------------
  	// Edit mode buttons
  	// -----------------------	


  	



	// -----------------------
  	// Dropdown buttons
  	// -----------------------	

	"click .ui.dropdown": function (event) {
		event.preventDefault();
	  
		//$('.ui.dropdown').dropdown();

	}




});


