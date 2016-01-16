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




		// if(card == null) {
		//   console.log("Nothing fetched");
		//   return ;
		// }
	  
	  	

		// get data & chagne format
		card.forEach(function (item) {

			var tempInTime = moment(item.inTime);   // unix timestamp in milliseconds

			//console.log(tempInTime);
			//console.log(tempOutTime);

			if (item.outTime != null) {
				var tempOutTime = moment(item.outTime); // unix timestamp in milliseconds		
				item.outTime = tempOutTime.format('a h:mm');
				//var workingMinutes = Math.round(moment.duration(item.workingTime).asMinutes());
				//console.log(workingMinutes);
				//var hours = Math.floor(workingMinutes/60);
				//var minutes = workingMinutes%60;
				//item.workingTime = moment.duration(item.workingTime).hours() + ":" + moment.duration(item.workingTime).minutes();
				item.workingTime = moment.preciseDiff(tempInTime, tempOutTime);

				//console.log(moment.duration(item.workingTime).hours() + " : " + moment.duration(item.workingTime).minutes());

				//console.log(item.workingTime);
			}

			item.date = tempInTime.format('LL');
			item.inTime = tempInTime.format('a h:mm');

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
			    blurring  : true,
			    onDeny    : function(){
			    	// exit
			    	return;
			    },
			    onApprove : function() {
			    	// go ahead
			    	//console.log("remove approved : " + Session.get('removeItem'));
					//var thisTemplate = Session.get('removeTemplate');		    	

					if (removeTemplate == null) {
						console.log("removeTemplate is null");
						return;
					}

			    	removeTemplate.$('.card').transition({
			    		animation  : 'fade left',
		    		    duration   : '650ms',
		    		    onComplete : function() {
		    		    	// remove this item when scale transition is completed
		    		    	Meteor.call("removeItemWithEXP", Session.get('removeItem'));
		    		    	removeTemplate = null; // destory removeTemplate object;
		    		    }
		    		});
			    }
			});  
	
});




Template.card.events ({
	"click #remove-item": function (event, template) {
		event.preventDefault();
		//console.log(template.$('.card'));
		//console.log(template.$('.card')[0]);
		var thisCard = this; // set data context
		if (thisCard.exp == null) {
			//console.log(template.$('.card')[0]);

			template.$('.card').transition({
			    animation  : 'fade left',
			    duration   : '650ms',
			    onComplete : function() {
			    	// remove this item when scale transition is completed
			    	Meteor.call("removeItem", thisCard);
			    }
			});
			


			
		} else {
			
			// If EXP gained with this timestamp
			
			//console.log(template);
			//console.log(template.$('.card'));
			removeTemplate = template;		// save this template instance to removeTemplate global variable
			Session.set('removeItem',this); // save this data context to Session
			
			
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


  	



	// -----------------------
  	// Dropdown buttons
  	// -----------------------	

	"click .ui.dropdown": function (event) {
		event.preventDefault();
	  
		//$('.ui.dropdown').dropdown();

	}




});


