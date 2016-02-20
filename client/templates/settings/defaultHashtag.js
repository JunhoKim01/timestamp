Template.defaultHashtag.onCreated (function () {

  this.autorun(() => {
    
    if (this.subscriptionsReady()) {
      // Make local hashtag
      const hashtagDB = Hashtag.find({ count: { $gte: 1 } }).fetch();
      // const hashtagDB = _.map(Hashtag.find({ count: { $gte: 1 } }).fetch(), function (tag) {
      //   tag.name = '#' + tag.name;
      //   return tag;
      // });

      const options = {
        source: hashtagDB,
        fields: {
          title: 'name'
        },
        searchFields: ['name'],
        searchFullText: true,
        onSelect: function (item) {
          let addHashtag = item.name;
          if(addHashtag) 
            Meteor.call('addDefaultHashtag', Meteor.userId(), addHashtag);
          else 
            return false;

        }
      };

      $('.ui.search').search(options);
    }
  });
});

Template.defaultHashtag.helpers ({
  "defaultHashtags": function () {

    return Meteor.user().profile.defaultHashtag;

  },
});


Template.defaultHashtag.events ({
  "click #add-defaulthashtag": function (event) {
    event.preventDefault();

    // Add hashtag manually  
    let text = $('.prompt').val().trim();
    let hashtagArr = [];
    if (text !== '') {
      if (text.charAt(0) !== '#')
        text = '#' + text;
        
      hashtagArr = myHashtag.find(text);  
    } else {
      return false;
    }

    // Add hashtag as default hashtag 
    // Add the first hashtag even if there are many of them
    Meteor.call('addDefaultHashtag', Meteor.userId(), hashtagArr[0]);
      
    // Claer 
    $('.prompt').val('');
    
  },
  "click #remove-defaulthashtag": function (event) {
    event.preventDefault();
    let removeHashtag = event.currentTarget.textContent.trim();
    Meteor.call('removeDefaultHashtag', Meteor.userId(), removeHashtag);

  }



});