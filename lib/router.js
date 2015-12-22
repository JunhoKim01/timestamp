/*
Router.configure({
  layoutTemplate: 'app'
});
*/

Router.route('/', function () {
  this.render('app');
});


Router.route('/admin', function () {
  this.render('admin');
});



