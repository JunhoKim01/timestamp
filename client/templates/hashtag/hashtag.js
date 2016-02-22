Template.hashtag.onCreated(function () {
  this.autorun(() => {
    this.subscribe('timestamp.stat');
    this.subscribe('hashtag');
  });
});










