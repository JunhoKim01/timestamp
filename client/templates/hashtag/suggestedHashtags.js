Template.suggestedHashtags.helpers ({
    suggestedHashtags: function () {
      return Hashtag.find(
        // selector
        { count: 
            {$gte: 1}
        },
        // options
        {
          sort: {count: -1},
          limit: 5
        }); 
      }
});


Template.suggestedHashtags.events ({
  "click #add-hashtag": function (event) {
    event.preventDefault();



    let selectedHashtag = event.currentTarget.textContent.trim();
    //addHashtag();
    // if(selectedHashtag.charAt(0) === '#') 
    //   selectedHashtag = selectedHashtag.slice(1);
    
    mySession.insert('selectedHashtags', selectedHashtag, MAX_SELECTED_HASHTAGS);
    // let selectedHashtagArr = Session.get('selectedHashtags');
    // if (! _.contains(selectedHashtagArr, selectedHashtag)) {
    //   selectedHashtagArr.push(selectedHashtag);
    //   Session.set('selectedHashtags', selectedHashtagArr);
    // } else {
      
    // }
    return false;
  }
});