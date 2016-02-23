Template.defaultTimeSet.onRendered(function () {
  // $('.ui.calendar').calendar({
  //   type: 'time',
  //   ampm: true,
  //   // onChange: function (date, text) {
  //   //   console.log(text);
  //   //   return true;
  //   // },
  //   onHidden: function (text) {
  //       console.log($('#defaultTime').val());
  //   },
  // });

});



Template.defaultTimeSet.helpers({
  defaultTime: function () {

    const hour = Meteor.user().profile.defaultInHour || '00'; // string
    const minute = Meteor.user().profile.defaultInMinute || '00'; // string

    const result = hour + ':' + minute;

    return result;
  }

});

Template.defaultTimeSet.events({
  "click #save-defaultTime": function () {
    //console.log($('#defaultTime').val());
    
    const hour = $('#defaultTime').val().trim().split(':')[0];
    const minute = $('#defaultTime').val().trim().split(':')[1]
    Meteor.call('setDefaultTime', Meteor.userId(), hour, minute,
     function (error) {
      if (error) 
        throw new Meteor.Error('Default time setting failed');
      else
        swal('Success!', 'Now you can use ' + hour + ':' + minute + ' as default Check-in time!', "success");
    });
  }

});


