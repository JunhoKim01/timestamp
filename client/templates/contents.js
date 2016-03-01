//Session.setDefault('removeItem', null);
//Session.setDefault('removeTemplate', null);
//var removeTemplate = null;


Template.contents.onCreated(function () {
  this.autorun(() => {
    this.subscribe('timestamp.item', Session.get('loadableItemCount'));
  });

});

Template.contents.helpers ({

  timestamps: function () {

    // No need to find this user 
    // because ti already filtered with publish func on server.js
    let card = Timestamp.find({}, {sort: {inTime: -1}}).fetch(); 
    
    // Set loadable item count for loadMore button
    Session.set('loadedItemCount', card.length);


    // Get data & change format
    card.forEach(function (item) {
      const tempInTime = moment(item.inTime);   // unix timestamp in milliseconds

      if (item.outTime != null) {
          const tempOutTime = moment(item.outTime); // unix timestamp in milliseconds       
          item.outTime = tempOutTime.format('a h:mm');
          item.workingTime = moment.preciseDiff(tempInTime, tempOutTime, Session.get('locale'));
        }

        // item.date = tempInTime.format('YYYY MMMM Do ddd');
        item.date = tempInTime.format('LL') + ' (' + tempInTime.format('ddd') + ')';
        item.inTime = tempInTime.format('a h:mm');

        // item.hashtag.forEach(function (currentValue, index, array) {
        //   array[index] = '#' + currentValue;
        // });

        item.text = item.text.replace(myHashtag.getRegexp, '<a class="hashtag">$&</a>');

      }); 



    return card;
  },
  replace: function (text) {
    return text.replace(myHashtag.getRegexp, '<a class="hashtag">$&</a>');
  },
  
  
  canLoadMore: function () {
    // Return true if there are more loadable items.
    if (Session.get('loadedItemCount') >= Session.get('loadableItemCount'))
      return true;
    else
      return false;
  }

});



Template.contents.events ({

  // -----------------------
  // Edit timestamp
  // -----------------------  

  "click .remove": function (event) {

    event.preventDefault();


      //Meteor.call("removeItem");
    },

    "click .edit": function (event) {
      event.preventDefault();

      //Meteor.call("editItem");      
    },



    // -----------------------
    // Check in & out buttons
    // -----------------------  

    // Create new check-in.
    'click #add-newCheckIn': function (event) {
      event.preventDefault();

      const checkInTime = Date.now(); // javascript date now
      const checkOutTime = null; 
      const text = $('#add-newCheckText').text().trim();
      // When there is no text
      if (text === '') { 
        Meteor.call('addNewCheckIn', checkInTime, checkOutTime, text,[]);  
        // Clear the textarea & set default hashtag\
        $('#add-newCheckText').text(Meteor.user().profile.defaultHashtag);
        return;  
      }

      // Extract hashtag from text
      const hashtagArr = myHashtag.find(text);
      // Method call
      Meteor.call('addNewCheckIn', checkInTime, checkOutTime, text, hashtagArr);
      // Clear the textarea & set default hashtag
      $('#add-newCheckText').text(Meteor.user().profile.defaultHashtag);
    },

    // Create new check-in & check out time at once.
    'click #add-newCheckOut': function (event) {
      event.preventDefault();

      const checkOutTime = Date.now(); // Javascript date now
      let checkInTimeObj = new Date(checkOutTime); // Default (work) checkInTime 

      ///
      // Have bug here : Default check in time should be prior to check out time
      // 


      // Set hours as defaultHour:defaultMinute:00:000
      const defaultHour = Meteor.user().profile.defaultInHour || 9;
      const defaultMinute = Meteor.user().profile.defaultInMinute || 0;
      checkInTimeObj.setHours(defaultHour, defaultMinute, 0, 0);


      const checkInTime = checkInTimeObj.getTime();

      const text = $('#add-newCheckText').text().trim();
      // When there is no text
      if (text === '') { 
        Meteor.call('addNewCheckOut', checkInTime, checkOutTime, text,[]);  
        // Clear the textarea
        $('#add-newCheckText').text(Meteor.user().profile.defaultHashtag);
        return;  
      }

      // Extract hashtag from text
      const hashtagArr = myHashtag.find(text);
      //const html = text.replace(myHashtag.getRegexp, '<a class="hashtag">$&</a>');
      //console.log(hashtagArr);
      // Method call
      Meteor.call('addNewCheckOut', checkInTime, checkOutTime, text, hashtagArr);
      // Clear the textarea & set default hashtag

      $('#add-newCheckText').text(Meteor.user().profile.defaultHashtag);
    },

    // Add check-out log to already exist card. 
    // Cf. There is no 'add-existingCheckIn' because check-in time will always be set when new card
    // is added.
    'click #add-existingCheckOut': function (event) {
      event.preventDefault();
      const self = this;
      const checkOutTime = Date.now(); // javascript date now
      const text = self.text.trim();

      // When there is no text
      if (text === '') {
        Meteor.call('addExistingCheckOut', self._id, checkOutTime, text, []);
        return;
      } 

      // Extract hashtag from text
      const hashtagArr = myHashtag.find(text);
      // Method call
      Meteor.call('addExistingCheckOut', self._id, checkOutTime, text, hashtagArr);
    },

    // -----------------------
    // New input
    // -----------------------  

    
    "click .ui.top.attached.segment": function (event) {
      event.preventDefault();
      Session.set('isInput', ! Session.get('isInput'));
    },

    // -----------------------
    // Dropdown buttons
    // -----------------------  

    "click .ui.dropdown": function (event) {
      event.preventDefault();
      
        //$('.ui.dropdown').dropdown();

    },

    // -----------------------
    // Load more items
    // -----------------------  
    "click #loadMoreItems": function (event) {
      event.preventDefault();
      Session.set('loadableItemCount', Session.get('loadableItemCount') + 3);
    }




});


