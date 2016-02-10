

if (Meteor.isClient) {



  Meteor.startup(function () {
    // get locale
    const locale = window.navigator.userLanguage || window.navigator.language;
    moment.locale(locale);
    Session.set('locale', locale);
  });
  
  
} 



