var hashtagArray = ['me', 'you'];
Session.setDefault('selectedHashtags', hashtagArray);




// helpers

Template.hashtag.helpers ({
	
	totalWorkingtime: function (string) {
		return string + " in Total";
	},
	avgWorkingtime: function (string) {
		return string + " in Average.";
	},
	topWorkingtime: function (string) {
		return string + " is TOP.";
	},


});

Template.selectedHashtags.helpers ({
	
	selectedHashtags: function () {
		var hashtagArr = Session.get('selectedHashtags');
		hashtagArr.forEach(function (currentValue, index, array) {
			array[index] = '#' + currentValue;
			//console.log(array[index]);
		});
		//var hashtagArr = [{hashtag:"one"},{hashtag:"two"}];


		//var hashtag = hashtagArray
		//this.hashtag = "test";
		

		return hashtagArr;
	}, 
	showSelectedHashtags: function (string) {
		//var hashtagObj = Session.get('selectedHashtags');


		return;
	},


});




Template.hashtag.events ({


});