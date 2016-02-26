Template.inputCard.onRendered(function () {
	// Set default hashtags
	const hashtagArr = Meteor.user().profile.defaultHashtag;
	$('#add-newCheckText').text(hashtagArr);
});



Template.inputCard.helpers({
	date: function () {
	  return moment().format('LL') + ' (' + moment().format('ddd') + ')';
	}
});

Template.inputCard.events({
	// "keyup #add-newCheckText": function () {
		
	// 	let text = $('#add-newCheckText').text();
	// 	let result = text.replace(myHashtag.getRegexp, '<a class="hashtag">$1</a>');


	// 	$('#add-newCheckText').text(result);
		


	// }
});




Template.card.helpers({
	isEditMode: function () {
		return Session.get('isEditMode');
	},
	editable: function () {
		const self = this;

		if (self.inTime && self.outTime)
			return 'false';
		else
			return 'true';
	}
});

Template.card.events ({
	"click #remove-item": function (event, template) {
		event.preventDefault();
		
		const self = this;
		
		template.$('.card').transition({
		    animation  : 'fade left',
		    duration   : '600ms',
		    onComplete : function() {
		    	// remove this item when scale transition is completed
		    	Meteor.call("removeItem", self, function () {
            //Decrease seenable item count by 1. (Because 1 card just removed) 
		        //Session.set('loadableItemCount', Session.get('loadableItemCount') - 1);
		    	});
		    }
		});
	},
	"click #new-hashtag": function (event, template) {
		event.preventDefault();
		//Session.set('hashtag', insert);

		// this.hashtag.forEach(function (currentValue, index, array) {
		// 	if (currentValue.charAt(0) === '#' ) {
		// 		array[index] = currentValue.slice( 1 );
		// 	}
		// });

		//Meteor.call("newHashtag", this._id, newHashtag);
		//$('.ui.modal').modal('show');
		// if(template.$('.ui.modal') == null)
		// 	console.log("null");
		// else 
		// 	console.log(template.$('.ui.modal'));

		let self = this;
		// $('.ui.modal')
		// .modal({
		//     closable  : true,
		//     blurring  : true,
		//     onHidden  : function() {
		//     	$('#input-hashtag').attr("placeholder", "Type new hashtag...");
		//     },
		//     onApprove : function() {
		//     	// go ahead
		//     	//console.log(this);
		//     	let newHashtag = $('#input-hashtag').val().trim();
		// 		let re = /#[가-힣a-z\d][가-힣a-z\d]*/;

		// 		//if(!re.test("#" + newHashtag) || newHashtag == "") {
		// 		if(newHashtag == "") {
		// 			// hashtag not found
		// 			$('#input-hashtag').attr("placeholder", "Type new hashtag, please");
		// 			$('#input-hashtag').val("");	

		// 			$('.ui.modal')
		//     		.transition({
		//     			animation : 'shake',
		// 			    duration  : 750
		// 			  });
		    		
		//     		return false;

		// 		} else {
		//     		// check validation 

		//     		if (newHashtag.length > 26 ) {
		//     			$('#input-hashtag').attr("placeholder", "It should be under 26 characters");
		//     			$('#input-hashtag').val("");

		//     			return false;
		//     		}
		//     		//newHashtag = newHashtag.split(' ', 1);
		//     		//let input = re.exec('#' + newHashtag)[0];
		//     		//console.log(newHashtag);
		//     		//console.log(input.slice(1));	

		//     		Meteor.call("newHashtag", self._id, newHashtag, function() {
		// 	    		$('#input-hashtag').val("");
		// 	    	});
		// 		}


		//     }
		// })
		// .modal('show');  
	},
	// Deprecated
	"click #remove-hashtag":function (event) {
		event.preventDefault();
		let removeHashtag = event.currentTarget.previousSibling.wholeText.trim();

		// if (removeHashtag.charAt(0) === '#' ) {
		// 	removeHashtag = removeHashtag.slice( 1 );
		// }
		
		Meteor.call("removeHashtag", Template.parentData(0)._id, removeHashtag);		
	}


});