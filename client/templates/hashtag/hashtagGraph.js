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

    if (item.length === 0) 
      return result;

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


