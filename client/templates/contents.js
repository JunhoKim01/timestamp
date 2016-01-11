// session
var isEditMode = 'isEditMode';
Session.setDefault(isEditMode, false);

Template.contents.helpers ({

	timestamps: function () {

		// No need to find this user 
		// because ti already filtered with publish func on server.js
	  	var card = Timestamp.find({}, {sort: {inTime: -1}}).fetch(); 


		// if(card == null) {
		//   console.log("Nothing fetched");
		//   return ;
		// }
	  
	  	// get locale
		var locale = window.navigator.userLanguage || window.navigator.language;
		moment.locale(locale);

		// get data & chagne format
		card.forEach(function (item) {

			var tempInTime = moment.unix(item.inTime); // Change unix timestamp to moment.
			var tempOutTime = moment.unix(item.outTime);

			item.date = tempInTime.format('LL');
			// item.inTime = tempInTime.format('LT');
			item.inTime = tempInTime.format('a h:mm');
			if(item.outTime != null) { 
			  // item.outTime = tempOutTime.format('LT');
				item.outTime = tempOutTime.format('a h:mm');
				item.workingTime = moment.duration(tempOutTime - tempInTime).humanize();
			}
		});	

		return card;
	}

	



});


Template.card.helpers({
	isEditMode: function () {
		return Session.get(isEditMode);
	}
});

Template.modalremove.onRendered(function () {
	$('.ui.basic.modal')
			.modal({
			    closable  : true,
			    blurring: true,
			    onDeny    : function(){
			    	// exit
			    	return;
			    },
			    onApprove : function() {
			    	// go ahead
			    	//console.log("remove approved : " + Session.get('removeItem'));
			    	Meteor.call("removeItemWithEXP", Session.get('removeItem'));
			    }
			  });  
	
});


Template.contents.events ({
	"click #remove-item": function (event) {
		event.preventDefault();
		console.log(this);
		if (this.exp == null) {
			Meteor.call("removeItem", this);
		} else {
			// If EXP gained with this timestamp
			Session.set('removeItem',this); // save this item to Session
			$('.ui.basic.modal').modal('show');		
		}
		
		
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

	"click label.remove": function (event) {
		event.preventDefault();

		Meteor.call("removeItem", this._id);
	},

	/* card dropdown */

	"click .ui.dropdown": function (event) {
		event.preventDefault();
	  
		//$('.ui.dropdown').dropdown();

	}




});


