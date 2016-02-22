Template.deleteAccount.events({
  'click #deleteAccount': function (event) {
    event.preventDefault();

    // show modal
    $('.ui.basic.modal').modal('show');
  }

});


Template.modalDeleteAccount.onRendered(function () {
  
  $('.ui.basic.modal')
      .modal({
          closable  : true,
          blurring  : true,
          onDeny    : function(){
            // exit
            return true;
          },
          onApprove : function() {
            Meteor.call('deleteAccount', Meteor.userId());
            return true;
          }
      });  

});