Template.selectedHashtags.helpers ({
	
	selectedHashtags: function () {
		let hashtagArr = Session.get('selectedHashtags');
		hashtagArr.forEach(function (currentValue, index, array) {
			array[index] = '#' + currentValue;
		});

    return hashtagArr;
	},
  selectedLeftHashtag: function () {
    let hashtagArr = Session.get('selectedHashtags');
    hashtagArr.forEach(function (currentValue, index, array) {
      array[index] = '#' + currentValue;
    });

    return hashtagArr[0];
  },
  selectedRightHashtag: function () {
    let hashtagArr = Session.get('selectedHashtags');
    hashtagArr.forEach(function (currentValue, index, array) {
      array[index] = '#' + currentValue;
    });

    return hashtagArr[1];
  },

  isSelectedMax: function (number) {

    if (Session.get('selectedHashtags').length === MAX_SELECTED_HASHTAGS)
      return true;
    else
      return false;

  }
	
});



Template.selectedHashtags.events ({
  "click #remove-hashtag": function (event) {
    event.preventDefault();

    let removeHashtag = event.currentTarget.textContent.trim();
    if(removeHashtag.charAt(0) === '#')
      removeHashtag = removeHashtag.slice(1);
    // Remove the hashtag from Session.
    mySession.remove('selectedHashtags', removeHashtag);
    // let selectedHashtagArr = Session.get('selectedHashtags');
    // selectedHashtagArr = _.without(selectedHashtagArr, removeHashtag);
    // Session.set('selectedHashtags', selectedHashtagArr);
    return false;
  }
  
});