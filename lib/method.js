

Meteor.methods ({

  // -----------------------
  // New check in & out
  // -----------------------
  
  newCheckIn: function () {
    
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var now = moment().unix(); // unix timestamp
    
    Timestamp.insert({
        owner: Meteor.userId(),
        inTime: now,
        outTime: null,
        workingTime: null
    });
  },
  newCheckOut: function (timestampId) {

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var now = moment().unix(); // unix timestamp
    var timestamp = Timestamp.findOne(timestampId); // unix timestamp
    var checkInTime = timestamp.inTime; // unix timestamp
    var newWorkingTime = now - checkInTime // unix timestamp

    Timestamp.update(timestampId,
     {$set: {
        outTime: now,
        workingTime: newWorkingTime
      }}
    );

    // gain exp
    Meteor.call("expUp", newWorkingTime);
  },

  // -----------------------
  // Edit methjods
  // -----------------------

  removeItem: function (timestampId) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    
    //var workingtime = Timestamp.findOne(timestampId).workingTime;
    
    //console.log("inside : " + timestampId);
    Timestamp.remove(timestampId,
      function(error, result){console.log("remove result : "+ result);});  
    
    
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
  setExp: function (exp) {
  // 1 exp = 1  minutes

    if(typeof exp === 'number') {

    } else {
      alert("exp should be number type")
    }

    var amount = Math.floor(exp);


    Meteor.users.update(
      Meteor.userId(), // find the user
      {$set: {"profile.exp": amount}},
    function(error, result){console.log(result)});    
  },
  

  // -----------------------
  // Profile methods : modifiers
  // -----------------------

  
  expUp: function (workingTime) {

    //console.log(workingTime);
    // 1 exp = 1  minutes
    var amount = Math.floor(moment.duration(workingTime, 'seconds').asMinutes());
    console.log(amount);

    Meteor.users.update(
      Meteor.userId(), 
      {$inc: {"profile.exp": amount}},
    function(error, result){console.log(result)});    
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

