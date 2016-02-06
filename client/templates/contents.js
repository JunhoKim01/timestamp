// session
const isEditMode = 'isEditMode';
Session.setDefault(isEditMode, false);
Session.setDefault('removeItem', null);
Session.setDefault('removeTemplate', null);



var removeTemplate = null;

Template.contents.helpers ({

  timestamps: function () {

    // No need to find this user 
    // because ti already filtered with publish func on server.js
    let card = Timestamp.find({}, {sort: {inTime: -1}}).fetch(); 

    // Get data & change format
    card.forEach(function (item) {
      const tempInTime = moment(item.inTime);   // unix timestamp in milliseconds

      if (item.outTime != null) {
          const tempOutTime = moment(item.outTime); // unix timestamp in milliseconds       
          item.outTime = tempOutTime.format('a h:mm');
          item.workingTime = moment.preciseDiff(tempInTime, tempOutTime, Session.get('locale'));
        }

        item.date = tempInTime.format('LL');
        item.inTime = tempInTime.format('a h:mm');

        item.hashtag.forEach(function (currentValue, index, array) {
          array[index] = '#' + currentValue;
        });
      }); 

    return card;
  },
  date: function () {
    return moment().format('LL');
  }

});



Template.contents.events ({
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
        const text = $('#add-newCheckText').val().trim();
        //let newHashtag = text;
        const regex = /#[가-힣a-zㄱ-ㅎ\d][가-힣a-zㄱ-ㅎ\d\_\?]*/ig; // Regexp for English/Korean hashtag
        // const regex = /(^|)*#(.+?)(?=[\s#.,:)]|$)/ig; // Another regextp that matches more launguage but even '##''
      
        // Extract hashtag from text & remove #
        const hashtagArr = _.map(text.match(regex), function (hashtag) {
          if( hashtag.charAt(0) === '#' )
            hashtag = hashtag.slice(1);
          return hashtag;
        }); 
        console.log(hashtagArr);
        Meteor.call('addNewCheckIn', checkInTime, checkOutTime, text, hashtagArr);

        $('#add-newCheckText').val(''); // Clear the textarea
      },
    // Create new check-in & check out time at once.
    'click #add-newCheckOut': function (event) {
      event.preventDefault();

        const checkOutTime = Date.now(); // Javascript date now
        let checkInTimeObj = new Date(checkOutTime); // Default (work) checkInTime 
        checkInTimeObj.setHours(9, 0, 0, 0); // Set checkInTime`s hours/minutes/seconds/ms to 09:00:00:000 (default)
        const checkInTime = checkInTimeObj.getTime();

        const text = $('#add-newCheckText').val().trim();
        //let newHashtag = text;
        const regex = /#[가-힣a-zㄱ-ㅎ\d][가-힣a-zㄱ-ㅎ\d\_\?]*/ig; // Regexp for English/Korean hashtag
        // const regex = /(^|)*#(.+?)(?=[\s#.,:)]|$)/ig; // Another regextp that matches more launguage but even '##''
        
        // Extract hashtag from text & remove #
        const hashtagArr = _.map(text.match(regex), function (hashtag) {
          if( hashtag.charAt(0) === '#' )
            hashtag = hashtag.slice( 1 );
          return hashtag;
        }); 

        console.log(hashtagArr);
        Meteor.call('addNewCheckOut', checkInTime, checkOutTime, text, hashtagArr);

        $('#add-newCheckText').val(''); // Clear the textarea
      },


    // Add check-out log to already exist card. 
    // Cf. There is no 'add-existingCheckIn' because check-in time will always be set when new card
    // is added.
    'click #add-existingCheckOut': function (event) {
      event.preventDefault();
      const self = this;
        //console.log(self);
        const checkOutTime = Date.now(); // javascript date now
        const text = self.text.trim();
        //let newHashtag = text;
        const regex = /#[가-힣a-zㄱ-ㅎ\d][가-힣a-zㄱ-ㅎ\d\_\?]*/ig; // Regexp for English/Korean hashtag
        // const regex = /(^|)*#(.+?)(?=[\s#.,:)]|$)/ig; // Another regextp that matches more launguage but even '##''
        
        // Extract hashtag from text & remove #
        const hashtagArr = _.map(text.match(regex), function (hashtag) {
          if( hashtag.charAt(0) === '#' )
            hashtag = hashtag.slice( 1 );
          return hashtag;
        }); 
        console.log(hashtagArr);
        Meteor.call('addExistingCheckOut', self._id, checkOutTime, text, hashtagArr);

        //self.// Set the textarea non editable
      },



    // -----------------------
    // Edit mode buttons
    // -----------------------  


    



    // -----------------------
    // Dropdown buttons
    // -----------------------  

    "click .ui.dropdown": function (event) {
      event.preventDefault();
      
        //$('.ui.dropdown').dropdown();

      }




    });


