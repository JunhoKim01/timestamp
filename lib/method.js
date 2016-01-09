

Meteor.methods ({

  // -----------------------
  // Collection Timestamp
  // -----------------------
  reset: function (){
    Timestamp.remove({});
  },
  recordInTime: function () {
    
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var now = moment().unix(); // unix timestamp
    
    Timestamp.insert({
        owner: Meteor.userId(),
        inTime: now,
        outTime: null
    });
  },
  recordOutTime: function (timestampId) {

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var now = moment().unix(); // unix timestamp

    Timestamp.update(timestampId, {$set: {outTime: now}});
  },

  // edit methods 
  removeItem: function (timestampId) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Timestamp.remove(timestampId, {});
  },




  // admin methods
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
  // getUserLevel: function () {
  //   return Accounts.user().profile.exp;
  // },
  // getUserExp: function () {
  //   return Accounts.user().profile.level;
  // },
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

  

  // -----------------------
  // Profile methods : modifiers
  // -----------------------

  // levelUp: function (amount) {

  //   Profile.update(
  //     Meteor.userId(), // find the user
  //     {
  //       $inc: {level: amount}
  //     }
  //   );    
  // },
  // expUp: function (amount) {

  //   Profile.update(
  //     Meteor.userId(), // find the user
  //     {
  //       $inc: {exp: amount}
  //     }
  //   );    
  // },
  // rankUp: function (amount) {

  //   Profile.update(
  //     Meteor.userId(), // find the user
  //     {
  //       $inc: {rank: amount}
  //     }
  //   );    
  // }


});

