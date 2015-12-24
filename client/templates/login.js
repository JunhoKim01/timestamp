/*
Template.login.events({
  'click button.login': function () {
    Router.go('/app');
  }
});
*/




Template.login.events ({
	"click button.login": function (event) {
        event.preventDefault();

        //alert("sdf");
    },
    "click a.join-now": function (event) {
        event.preventDefault();
		
		//var templateUsername = new Blaze.Template("username");
		var loginForm = document.getElementsByTagName('form')[0];
		var emailInput = document.getElementsByTagName('input')[0];

     	Blaze.render(Template.username, loginForm, emailInput);
     	document.getElementsByTagName('button')[0].textContent = 'Join';
    }

});