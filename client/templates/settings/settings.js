Template.settings.onCreated(function () {
  this.autorun(() => {
    this.subscribe('hashtag');
  });
});


