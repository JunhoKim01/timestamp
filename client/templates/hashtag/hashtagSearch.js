Template.hashtagSearch.onRendered(function () {

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
        fields: {title: 'name'},
        searchFields: ['name'],
        searchFullText: true, // s
        onSelect: function (item) {
          let addHashtag = item.name;
          // if (addHashtag.charAt(0) === '#')
          //   addHashtag = addHashtag.slice(1);
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

    }
  });

});