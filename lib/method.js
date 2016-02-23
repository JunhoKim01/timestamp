

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

    const inTimeMoment = moment(checkInTime);
    const YYYY = inTimeMoment.format('YYYY');
    const MM = inTimeMoment.format('MM');
    const DD = inTimeMoment.format('DD');
    const ISOweek = inTimeMoment.isoWeek();       // 01 ~ 53
    const ISOweekday = inTimeMoment.isoWeekday(); // 1 ~ 7 (mon ~ sun)
    
    // Add new check in timestamp. 
    Timestamp.insert({
        owner: Meteor.userId(),
        inTime: checkInTime, 
        outTime: checkOutTime,
        workingTime: null,
        YYYY: YYYY,
        MM: MM,
        DD: DD,
        ISOWeek: ISOweek,
        ISOweekday: ISOweekday,
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

    const inTimeMoment = moment(checkInTime);
    const YYYY = inTimeMoment.format('YYYY');
    const MM = inTimeMoment.format('MM');
    const DD = inTimeMoment.format('DD');
    const ISOweek = inTimeMoment.isoWeek();       // 01 ~ 53
    const ISOweekday = inTimeMoment.isoWeekday(); // 1 ~ 7 (mon ~ sun)
    const newWorkingTime = checkOutTime - checkInTime;

    // Add new check in & out. 
    Timestamp.insert({
        owner: Meteor.userId(),
        inTime: checkInTime, 
        outTime: checkOutTime,
        workingTime: newWorkingTime,
        YYYY: YYYY,
        MM: MM,
        DD: DD,
        ISOWeek: ISOweek,
        ISOweekday: ISOweekday,
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
  addDefaultHashtag: function (userId, hashtag) {
    let hashtagArr = Meteor.user().profile.defaultHashtag;
    if (hashtagArr === undefined)
      hashtagArr = [];

    if (hashtagArr.indexOf(hashtag) === -1) {
      hashtagArr.push(hashtag);
      Meteor.users.update(userId, {$set: {'profile.defaultHashtag': hashtagArr}});
      return true;
    } else {
      // Exists
      return false;
    }

  },
  removeDefaultHashtag: function (userId, hashtag) {
    let hashtagArr = Meteor.user().profile.defaultHashtag;
    if (hashtagArr === undefined)
      return false;

    if (hashtagArr.indexOf(hashtag) !== -1) {
      hashtagArr = _.without(hashtagArr, hashtag);
      Meteor.users.update(userId, {$set: {'profile.defaultHashtag': hashtagArr}});
      return true;
    } else {
      // Exists
      return false;
    }

  },

  // -----------------------
  // Timestamp edit methods
  // -----------------------

  removeItem: function (timestamp) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    
    let hashtagArr = timestamp.hashtag;
    
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
  

  // -----------------------
  // Settings methods
  // -----------------------

  setDefaultTime: function (userId, hour, minute){ 
    if (! Meteor.userId() || ! userId || userId !== Meteor.userId()) {
      // Un-authorized action detected
      Router.go('loginJoin');
      throw new Meteor.Error('not-authorized');
    }

    Meteor.users.update(userId, 
      {
        $set: {
        'profile.defaultInHour': hour,
        'profile.defaultInMinute': minute
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
  resetDefaultHashtag: function (){

    Meteor.users.update(Meteor.userId(), {$set: {'profile.defaultHashtag': []}});
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

  // Deprecated
  // 
  createUserProfile: function (email, password, username) {

    /* 
    * Set new profile
    *
    * name : user`s name. Not unique
    */
    let profile = {
      name: username,
      defaultHashtag: []
    };

    let options = {
      email: email,
      password: password,
      profile: profile
    };

    // create new user & return user id
    return Accounts.createUser(options);
  },

  changeUsername: function (userId, newUsername) {
    Meteor.users.update(userId, {$set: {"profile.name": newUsername}});
  }, 
  deleteAccount: function (userId) {
    if (Meteor.userId() === userId) { // User ID Double check 
      


      Meteor.users.remove(userId, function (error) {
        if (error)
          throw new Meteor.Error("Delete account failed");
        else
          Router.go('splash'); // Move to the very fist page  
      });
      

    } else {
      throw new Meteor.Error("Invalid user ID", "Inserted ID does not matche logged-in user`s ID");
    }

  },
  
  
 


});

