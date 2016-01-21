

Meteor.methods ({

  // -----------------------
  // New check in & out
  // -----------------------
  
  newCheckIn: function () {
    
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    //var now = moment(); // unix timestamp in milliseconds
    var now = Date.now(); // javascript date now
    
    Timestamp.insert({
        owner: Meteor.userId(),
        inTime: now,
        outTime: null,
        workingTime: null,
        hashtag: ['me'],
        //exp: null

    });
  },
  newCheckOut: function (timestampId) {

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    //var now = moment(); // unix timestamp in milliseconds
    var now = Date.now(); // javascript date now

    var timestamp = Timestamp.findOne(timestampId); // unix timestamp
    var checkInTime = timestamp.inTime; // unix timestamp
    var newWorkingTime = now - checkInTime // unix timestamp
    //console.log(now + "-" + checkInTime + "=" + newWorkingTime);
    
    // 1  minutes = 1 exp
    //var newEXP = Math.round(moment.duration(newWorkingTime).asMinutes());
    //console.log("new EXP gained : " + newEXP);

    Timestamp.update(timestampId,
     {$set: {
        outTime: now,
        workingTime: newWorkingTime
        //exp: newEXP
      }}
    );

    // gain exp
    //Meteor.call("expUp", newEXP);
    
  },
  newHashtag: function (timestampId, newHashtag, hashtagArr) {

    hashtagArr.push(newHashtag);

    Timestamp.update(timestampId,
     {$set: {
        hashtag: hashtagArr
        //exp: newEXP
      }}
    );    
  },

  // -----------------------
  // Edit methjods
  // -----------------------

  removeItem: function (timestamp) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    
    //var workingtime = Timestamp.findOne(timestampId).workingTime;
    
    //console.log("inside : " + timestampId);
    Timestamp.remove(timestamp._id,
      function(error, result){});  
    
    
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

  reset: function (){
    Timestamp.remove({});
  },
  saveInTime: function (hour, minute) {

    var now = moment().hours(hour).minutes(minute);
    
    Timestamp.insert({
        inTime: now.unix(),
        outTime: null
      });
  },
  saveOutTime: function (hour, minute) {

    var now = moment().hours(hour).minutes(minute);
    
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
    * level : user level
    * exp : experience points gained by make 'working time'
    * companey : Place where user works for.
    * ranking : user rank sort by exp desc
    *
    */
    var profile = {
      name : username,
      level: 1,
      exp: 0,
      company: null,
      ranking: null
    };

    var options = {
      email: email,
      password: password,
      profile: profile
    };

    // create new user
    Accounts.createUser(options); 

    return;
  },

  // -----------------------
  // Profile methods : getters
  // -----------------------
  
  // getUserProfile: function () {

  //   return Accounts.user().profile;
  // },
  getUserLevel: function () {
    return Meteor.user().profile.level;
  },
  getUserExp: function () {
    return Meteor.user().profile.exp;
  },
  getExpToNextLevel: function (level) {
    // determine needed exp to go to next level 
    var neededExp = level * 10000; // logic goes here
    return neededExp; 
  },
  // getUserRank: function () {
  //   return Accounts.user().profile.rank;
  // },
  // getUserName: function () {
  //   return Accounts.user().profile.name;
  // },
  // getUserCompany: function () {
  //   return Accounts.user().profile.company;
  // },

  // -----------------------
  // Profile methods : setters
  // -----------------------
  setExp: function (amount) {
  // 1 exp = 1  minutes

    if(typeof amount === 'number') {

    } else {
      alert("exp should be number type")
    }

    Meteor.users.update(
      Meteor.userId(), // find the user
      {$set: {"profile.exp": amount}},
    function(error, result){console.log(result)});    
  },
  

  // -----------------------
  // Profile methods : modifiers
  // -----------------------

  
  expUp: function (amount) {

    //console.log(workingTime);
    
    //console.log(amount);

    Meteor.users.update(
      Meteor.userId(), 
      {$inc: {"profile.exp": amount}},
    function(error, result){/*console.log(result)*/});    
  },
  levelUp: function (exp) {

    // levelup update funciton triggered by level up determine function


    var amount = exp;
    

    Meteor.users.update(
      Meteor.userId(), 
      {$inc: {"profile.level": amount}},
    function(error, result){console.log(result)});    
  },
  // rankUp: function (amount) {

  //   Profile.update(
  //     Meteor.userId(), // find the user
  //     {
  //       $inc: {rank: amount}
  //     }
  //   );    
  // }


});

