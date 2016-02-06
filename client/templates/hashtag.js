var selectedHashtagArr = [];
Session.setDefault('selectedHashtags', selectedHashtagArr);

// helpers


Template.hashtag.onRendered(function () {

  let hashtags = _.map(Hashtag.find({count: {$gte: 1} }).fetch(), function (obj) {
    obj.name = '#' + obj.name;
    return obj;
  });

  $('.ui.search').search({
    source: hashtags,
    fields: {
      title           : 'name'
    },
    searchFields: ['name'],
    searchFullText: true,
    onSelect : function(item) {
      let addHashtag = item.name;
      if (addHashtag.charAt(0) === '#')
        addHashtag = addHashtag.slice(1);
      // Add selected hashtag to Session selectedHashtags. (Check existence of hashtag fist)
      let selectedHashtagArr = Session.get('selectedHashtags');
      if (selectedHashtagArr.indexOf(addHashtag) === -1) {
        selectedHashtagArr.push(addHashtag);
        Session.set('selectedHashtags', selectedHashtagArr);
      } else {
        return;
      }

    }
  }, );

});


Template.hashtag.helpers ({
	
  hashtagInfo: function () {
    let selectedHashtagArr = Session.get('selectedHashtags');

    let sumCount = 0;
    let sumTotalTime = 0;

    for (let i = 0; i < selectedHashtagArr.length; i++) {
      let item = Hashtag.find({name:selectedHashtagArr[i]}).fetch()[0];
      if(item && item.count && item.totalTime) {
        sumCount += item.count;
        sumTotalTime += item.totalTime;
      } else
        sumCount += 0;
        sumTotalTime += 0;
    };

    let result = {
      totalTime: moment.preciseDiff(0, sumTotalTime, Session.get('locale')) || "Empty",
      count: sumCount || "Empty",
      avgTime: moment.preciseDiff(0, sumTotalTime/sumCount, Session.get('locale')) || "Empty"
    };

    return result;
	}


});

Template.suggestedHashtags.helpers ({
    suggestedHashtags: function () {
      let tag = Hashtag.find({count: {$gte: 1}}, {sort: {count: -1}, limit:10}).fetch(); 
      return tag;
    }
});


Template.selectedHashtags.helpers ({
	
	selectedHashtags: function () {
		let hashtagArr = Session.get('selectedHashtags');
		hashtagArr.forEach(function (currentValue, index, array) {
			array[index] = '#' + currentValue;
		});

    return hashtagArr;
	}
	
});


Template.suggestedHashtags.events ({
  "click #add-hashtag": function (event) {
    event.preventDefault();

    let selectedHashtag = event.currentTarget.innerText.trim();
    if(selectedHashtag.charAt(0) === '#') 
      selectedHashtag = selectedHashtag.slice(1);
    
    let selectedHashtagArr = Session.get('selectedHashtags');
    if (selectedHashtagArr.indexOf(selectedHashtag) === -1) {
      selectedHashtagArr.push(selectedHashtag);
      Session.set('selectedHashtags', selectedHashtagArr);
    } else {
      return;
    }
  },

});





Template.hashtag.events ({
  "click #remove-hashtag": function (event) {
    event.preventDefault();
    let removeHashtag = event.currentTarget.previousSibling.wholeText.trim();
    if(removeHashtag.charAt(0) === '#')
      removeHashtag = removeHashtag.slice(1);
    // Remove the hashtag from Session.
    let selectedHashtagArr = Session.get('selectedHashtags');
    selectedHashtagArr = _.without(selectedHashtagArr, removeHashtag);
    Session.set('selectedHashtags', selectedHashtagArr);
  }
  
});