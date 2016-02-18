mySession = new mySessionClass();

if (Meteor.isClient) {



  Meteor.startup(function () {
    // Locale setting
    let locale = window.navigator.userLanguage || window.navigator.language;
    // Chrome: ko, Firefox: ko-KR, Safaru: ko-kr
    // And, moment only coded for'ko'
    if (locale === 'ko-KR' || locale === 'ko-kr')
      locale = 'ko';  
    
    moment.locale(locale);
    Session.set('locale', locale);


    // Session 
    


  });
  
  
} 



