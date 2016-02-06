

Meteor.methods ({

  // -----------------------
  // New check in & out
  // -----------------------
  
  addNewCheckIn: function (checkInTime, checkOutTime, text, hashtagArr) {
    // Make sure the user is logged in before inserting a task.
    if (! Meteor.userId()) {
      Router.go('loginJoin');
      throw new Meteor.Error('not-authorized');
    }
    
    // Add new check in timestamp. 
    Timestamp.insert({
        owner: Meteor.userId(),
        inTime: checkInTime, 
        outTime: checkOutTime,
        workingTime: null,
        text: text,
        hashtag: hashtagArr
    }, function (error) {
      if (error)
        throw new Meteor.Error(error.reason);
    });
  },
  addNewCheckOut: function (checkInTime, checkOutTime, text, hashtagArr) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      Router.go('loginJoin');
      throw new Meteor.Error('not-authorized');
    }

    const newWorkingTime = checkOutTime - checkInTime;
    
    // Add new check in & out. 
    Timestamp.insert({
        owner: Meteor.userId(),
        inTime: checkInTime, 
        outTime: checkOutTime,
        workingTime: newWorkingTime,
        text: text,
        hashtag: hashtagArr
    }, function (error) {
      if (error)
        throw new Meteor.Error(error.reason);
    });


    // Update new hashtag dictionary
    for (let i = 0; i < hashtagArr.length; i++) {
      // Check if this hashtag tag already exists.
      const hashtagFind = Hashtag.findOne({name: hashtagArr[i]});
      if(hashtagFind === undefined) {
        // Insert hashtag
        Hashtag.insert({
          name: hashtagArr[i],
          count: 1,
          totalTime: newWorkingTime
        }, function (error) {
          if (error)
            throw new Meteor.Error(error.reason);
          else
            console.log('Hashtag insert success:' + hashtagArr[i]);
        });
      } else {
        // Update hashtag
        Hashtag.update(hashtagFind._id,
          {$inc: {
            count: 1,
            totalTime: newWorkingTime
          }},
          function (error) {
            if (error)
              throw new Meteor.Error(error.reason);
          });
      }
    }

  },
  addExistingCheckOut: function (timestampId, checkOutTime, text, hashtagArr) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      Router.go('loginJoin');
      throw new Meteor.Error("not-authorized");
    }

    const timestamp = Timestamp.findOne(timestampId); 
    const newWorkingTime = checkOutTime - timestamp.inTime; 

    Timestamp.update(timestampId,
      {$set: {
        outTime: checkOutTime,
        workingTime: newWorkingTime,
        text: text,
        hashtagArr: hashtagArr
      }}, function (error) {
        if (error)
          throw new Meteor.Error(error.reason);
      });

    // Update new hashtag dictionary
    for (let i = 0; i < hashtagArr.length; i++) {
      // Check if this hashtag tag already exists.
      const hashtagFind = Hashtag.findOne({name: hashtagArr[i]});
      if(hashtagFind === undefined) {
        // Insert hashtag
        Hashtag.insert({
          name: hashtagArr[i],
          count: 1,
          totalTime: newWorkingTime
        }, function (error) {
          if (error)
            throw new Meteor.Error(error.reason);
          else
            console.log('Hashtag insert success :' + hashtagArr[i]);
        });
      } else {
        // Update hashtag
        Hashtag.update(hashtagFind._id,
          {$inc: {
            count: 1,
            totalTime: newWorkingTime
          }},
          function (error) {
            if (error)
              throw new Meteor.Error(error.reason);
            else
              console.log('Hashtag update success : ' + hashtagArr[i]);
          });
      }
    }

  },

  // -----------------------
  // Hashtag methods
  // -----------------------

  newHashtag: function (timestampId, newHashtag) {
    Timestamp.update(timestampId,
     {$push: {
        hashtag: newHashtag
      }}
    );    
  },
  removeHashtag: function (timestampId, removingHashtag) {
    Timestamp.update(timestampId,
     {$pullAll: {
        hashtag: [removingHashtag]
        //exp: newEXP
      }}
    );    
  },

  // -----------------------
  // Edit methods
  // -----------------------

  removeItem: function (timestamp) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    
    let hashtagArr = timestamp.hashtag;
    hashtagArr = _.map(hashtagArr, function (hashtag) {
      if (hashtag.charAt(0) === '#')
        hashtag = hashtag.slice(1);
      return hashtag;
    });

    const removeWorkingTime = Timestamp.findOne(timestamp._id).workingTime * -1;

    for (let i = 0; i < hashtagArr.length; i++) {
      Hashtag.update({name: hashtagArr[i]},
        {$inc: {
          count: -1,
          totalTime: removeWorkingTime
        }},
        function (error) {
          if (error)
            throw new Meteor.Error(error.reason);
        });
    }
    
    Timestamp.remove(timestamp._id, function (error, result){});  

  },
  
  removeItemWithEXP: function (timestamp) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    //var amount = -1 * timestamp.exp; // get minus value of this exp

    Timestamp.remove(timestamp._id,
      function (error, result) {
        if(result == 1) {
          
          Meteor.users.update(
            Meteor.userId(),
            {$inc: {"profile.exp": amount}}, 
            function (error, result) {
              if(result == 0) {
                console.log("Failed to decrease EXP");  
              } else {

              }
            }
          );

        } else {
          console.log("Failed to remove item with EXP");
        }
      });  
  },




  // -----------------------
  // Admin methods
  // -----------------------

  resetRecords: function (){
    Timestamp.remove({});
  },
  resetHashtags: function (){

    Hashtag.remove({});
  },

  saveInTime: function (hour, minute) {

    let now = moment().hours(hour).minutes(minute);
    
    Timestamp.insert({
        inTime: now.unix(),
        outTime: null
      });
  },
  saveOutTime: function (hour, minute) {

    let now = moment().hours(hour).minutes(minute);
    
    Timestamp.update(
      {outTime: null},
      {$set: {outTime: now.unix()}
    });
  },


  // -----------------------
  // User Accounts & Profiles
  // -----------------------

  createUserProfile: function (email, password, username) {

    /* 
    * Set new profile
    *
    * name : user`s name. Not unique
    */
    let profile = {
      name : username
    };

    let options = {
      email: email,
      password: password,
      profile: profile
    };

    // create new user & return user id
    return Accounts.createUser(options);
  },

 


});

