// session
var isEditMode = 'isEditMode';
Session.setDefault(isEditMode, false);
Session.setDefault('removeItem', null);
Session.setDefault('removeTemplate', null);

// get locale
var locale = window.navigator.userLanguage || window.navigator.language;
moment.locale(locale);

var removeTemplate = null;

Template.contents.helpers ({

    timestamps: function () {

        // No need to find this user 
        // because ti already filtered with publish func on server.js
        let card = Timestamp.find({}, {sort: {inTime: -1}}).fetch(); 


        // get data & chagne format
        card.forEach(function (item) {

            const tempInTime = moment(item.inTime);   // unix timestamp in milliseconds

            if (item.outTime != null) {
                const tempOutTime = moment(item.outTime); // unix timestamp in milliseconds       
                item.outTime = tempOutTime.format('a h:mm');
                item.workingTime = moment.preciseDiff(tempInTime, tempOutTime, locale);
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
        const text = $('#add-newCheckText').val();
        const hashtagArr = []; // extract hashtag from text
        Meteor.call('addNewCheckIn', checkInTime, checkOutTime, text, hashtagArr);
    },
    // Create new check-in & check out time once.
    'click #add-newCheckOut': function (event) {
        event.preventDefault();
        
        const checkInTime = 0; // Get it from modal
        const checkOutTime = Date.now(); // javascript date now
        const text = $('#add-newCheckText').val();
        const hashtagArr = []; // extract hashtag from text
        Meteor.call('addNewCheckOut', checkInTime, checkOutTime, text, hashtagArr);
    },
    
    
    // Add check-out log to already exist card. And, there is no 'add-
    // existingCheckIn' because check-in time will always be set when new card
    // is added.
    'click #add-existingCheckOut': function (event) {
        event.preventDefault();
        const self = this;
        const checkOutTime = Date.now(); // javascript date now
        const text = ''; 
        const hashtagArr = []; // extract hashtag from text
        Meteor.call('addExistingCheckOut', self._id, checkOutTime, text, hashtagArr);
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


