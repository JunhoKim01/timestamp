let selectedHashtagArr = [];
let selectedConditionArr = [];
const conditionsArr = 
[
  // Date
  'today',
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'thisWeek',
  'thisMonth',
  //thisYear is set as default
  // Owner
  'my'
  ];

Session.setDefault('selectedHashtags', selectedHashtagArr);
Session.setDefault('selectedConditions', selectedConditionArr);
Session.setDefault('conditions', conditionsArr);




Template.hashtag.onCreated(function () {
  this.autorun(() => {
    this.subscribe('timestamp.stat');
    this.subscribe('hashtag');
  });
});










