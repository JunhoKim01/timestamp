let selectedHashtagArr = [];
let selectedConditionArr = [];
const conditionsArr = 
[
  // Date
  'today',
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'thisWeek',
  'thisMonth',
  //thisYear is set as default
  // Owner
  'my'
  ];

Session.setDefault('selectedHashtags', selectedHashtagArr);
Session.setDefault('selectedConditions', selectedConditionArr);
Session.setDefault('conditions', conditionsArr);




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
          mySession.insert('selectedHashtags', addHashtag);
          // let selectedHashtagArr = Session.get('selectedHashtags');
          // if (! _.contains(selectedHashtagArr, addHashtag)) {
          //   selectedHashtagArr.push(addHashtag);
          //   Session.set('selectedHashtags', selectedHashtagArr);
          // } else {
          //   return;
          // }
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

    // Get current selected hashtags & conditions
    let selectedHashtagArr = Session.get('selectedHashtags');
    let selectedConditionArr = Session.get('selectedConditions');

    if(selectedHashtagArr.length === 0)
      return result;

    let sumCount = 0;
    let sumTotalTime = 0;
    let findingHashtagArr = [];
    let findingConditionArr = [];

    // Get timestamps that contain selected hashtags.
    // 
    for (let i = 0; i < selectedHashtagArr.length; i++) { 
      findingHashtagArr.push({hashtag: selectedHashtagArr[i]});
    }

    // findingConditionArr = [{inTime: {$gte: conditionalMinTime}}, {inTime: {$lte: conditionalMaxTime}}];



    // Need to search timestamp that matches to conditions
    // OR conditions 
    
    // days of week 
    if (_.contains(selectedConditionArr, 'tuesday') && ! _.contains(findingConditionArr, 'tuesday')) {
      findingConditionArr.push({ISOweekday: 2});
    }
    if (_.contains(selectedConditionArr, 'monday') && ! _.contains(findingConditionArr, 'monday')) {
      findingConditionArr.push({ISOweekday: 1});
    }

    
    // thisMonth, thisWeek

    // my


    const resultArr = findingHashtagArr.concat(findingConditionArr);
    const options = {
      $and: resultArr
    };

    const item = Timestamp.find(options).fetch();

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

Template.selectedConditions.helpers ({
  
  selectedConditions: function () {
    let conditionArr = Session.get('conditions');

    return conditionArr;
  },
  isSelected: function (condition) {
  
    if (_.contains(Session.get('selectedConditions'), condition)) {
      return true;
    } else {
      return false;
    }
    
  }
  
});

Template.selectedConditions.events ({
  "click #add-condition": function (event) {
    event.preventDefault();
    
    let selectedCondition = event.currentTarget.textContent.trim();
    let selectedConditionArr = Session.get('selectedConditions');

    // If selected condition is already in the selectedConditions Session, return false;
    if (_.contains(selectedConditionArr, selectedCondition))
      return false;

    //const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    // Deselect some condition keywords that mis-matches
    // Ex. today <--> monday
    // If 'today' is selected, monday~sunday should be deselected
    switch (selectedCondition) {
      case 'today':
        selectedConditionArr = _.without(selectedConditionArr, 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'); // Deselect weekdays

        break;
      case 'sunday':
      case 'monday':
      case 'tuesday':
      case 'wednesday':
      case 'thursday':
      case 'friday':
      case 'saturday':
        selectedConditionArr = _.without(selectedConditionArr, 'today');  // Deselect today
        break;
      case 'thisWeek':
        // 
        break;
      case 'thisMonth':
        // 
        break;
      case 'my':
        // 
        break;
      default: 
        // some code..
        break;
    }

    // Add this conditions to selectedConditions Session
    selectedConditionArr.push(selectedCondition);
    Session.set('selectedConditions', selectedConditionArr);

    return false;
  },
  "click #remove-condition": function (event) {
    event.preventDefault();
    
    let removeCondition = event.currentTarget.textContent.trim();

    try {
      mySession.remove('selectedConditions', removeCondition);
    } catch (e) {
      Meteor.myFunctions.logError(e);
    }


    // let selectedConditionArr = Session.get('selectedConditions');
    // selectedConditionArr = _.without(selectedConditionArr, removeCondition);
    // Session.set('selectedConditions', selectedConditionArr);
    
    return false;
  }

});


Template.suggestedHashtags.events ({
  "click #add-hashtag": function (event) {
    event.preventDefault();

    let selectedHashtag = event.currentTarget.textContent.trim();
    if(selectedHashtag.charAt(0) === '#') 
      selectedHashtag = selectedHashtag.slice(1);
    
    mySession.insert('selectedHashtags', selectedHashtag);
    // let selectedHashtagArr = Session.get('selectedHashtags');
    // if (! _.contains(selectedHashtagArr, selectedHashtag)) {
    //   selectedHashtagArr.push(selectedHashtag);
    //   Session.set('selectedHashtags', selectedHashtagArr);
    // } else {
      
    // }
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