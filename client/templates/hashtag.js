var selectedHashtagArr = [];
Session.setDefault('selectedHashtags', selectedHashtagArr);

// Template.hashtagSearch.onCreated(function () {
//   this.autorun(() => {
//     //this.subscribe('timestamp.stat');
//     this.subscribe('hashtag');

//   });
// });

// Template.suggestedHashtags.onCreated(function () {
//   this.autorun(() => {
//     //this.subscribe('timestamp.stat');
//     this.subscribe('hashtag');
//   });
// });

// Template.hashtagGraph.onCreated(function () {
//   this.autorun(() => {
//     this.subscribe('timestamp.stat');
//     //this.subscribe('hashtag');
//   });
// });

Template.hashtag.onCreated(function () {
  this.autorun(() => {
    this.subscribe('timestamp.stat');
    this.subscribe('hashtag');
  });
});



Template.hashtagSearch.onRendered(function () {

  this.autorun(() => {
    if (this.subscriptionsReady()) {
      // body...
      const hashtagDB = _.map(Hashtag.find({ count: { $gte: 1 } }).fetch(), function (tag) {
        tag.name = '#' + tag.name;
        return tag;
      });

      const options = {
        source: hashtagDB,
        fields: {
          title: 'name'
        },
        searchFields: ['name'],
        searchFullText: true,
        onSelect: function (item) {
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
      };

      $('.ui.search').search(options);

      console.log('Initialized Search');
    }
  });

});


Template.hashtagGraph.helpers ({	
  hashtagInfo: function () {
    let result = {
      totalTime: 'None',
      count: 'None',
      avgTime: 'None'
    };

    // Get current selected hashtags.
    let selectedHashtagArr = Session.get('selectedHashtags');

    if(selectedHashtagArr.length === 0)
      return result;

    let sumCount = 0;
    let sumTotalTime = 0;
    let findingHashtagArr = [];

    // Get timestamps that contain selected hashtags.
    for (let i = 0; i < selectedHashtagArr.length; i++) { 
      findingHashtagArr.push({hashtag: selectedHashtagArr[i]});
    }
    const query = {
      $and: findingHashtagArr
    };
    const item = Timestamp.find(query).fetch();

    if (item.length === 0) {
      return result;
    }

    // Accumulation 
    for (let i = 0; i < item.length; i++) {
      if(item[i]) {
        sumCount += 1;
        sumTotalTime += item[i].workingTime;
      } else
        sumCount += 0;
        sumTotalTime += 0;
    };

    result = {
      totalTime: moment.preciseDiff(0, sumTotalTime, Session.get('locale')) || 'None',
      count: sumCount || 'None',
      avgTime: moment.preciseDiff(0, sumTotalTime/sumCount, Session.get('locale')) || 'None'
    };

    return result;
	}


});

Template.suggestedHashtags.helpers ({
    suggestedHashtags: function () {
      return Hashtag.find(
        // selector
        {
          count: 
            {$gte: 1}
        },
        // options
        {
          sort: {count: -1},
          limit: 5
        }); 
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

    let selectedHashtag = event.currentTarget.textContent.trim();
    if(selectedHashtag.charAt(0) === '#') 
      selectedHashtag = selectedHashtag.slice(1);
    
    let selectedHashtagArr = Session.get('selectedHashtags');
    if (selectedHashtagArr.indexOf(selectedHashtag) === -1) {
      selectedHashtagArr.push(selectedHashtag);
      Session.set('selectedHashtags', selectedHashtagArr);
    } else {
      
    }
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
    let selectedHashtagArr = Session.get('selectedHashtags');
    selectedHashtagArr = _.without(selectedHashtagArr, removeHashtag);
    Session.set('selectedHashtags', selectedHashtagArr);
    return false;
  }
  
});