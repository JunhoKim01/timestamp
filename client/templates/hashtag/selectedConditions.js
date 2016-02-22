Template.selectedConditions.helpers ({
  selectedConditions: function () {
    //return Session.get('conditions');
    return conditionsArr;
  },
  isSelected: function (condition) {
    if (_.contains(Session.get('selectedConditions'), condition))
      return true;
    else 
      return false;
  }
  
});

Template.selectedConditions.events ({
  "click #add-condition": function (event) {
    event.preventDefault();
    
    let selectedCondition = event.currentTarget.textContent.trim();
    let selectedConditionArr = Session.get('selectedConditions');

    // If selected condition is already in the selectedConditions Session, return false;
    if (_.contains(selectedConditionArr, selectedCondition))
      return false;

    //const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    // Deselect some condition keywords that mis-matches
    // Ex. today <--> monday
    // If 'today' is selected, monday~sunday should be deselected
    switch (selectedCondition) {
      case 'today':
        selectedConditionArr = _.without(selectedConditionArr, 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'); // Deselect weekdays

        break;
      case 'sunday':
      case 'monday':
      case 'tuesday':
      case 'wednesday':
      case 'thursday':
      case 'friday':
      case 'saturday':
        selectedConditionArr = _.without(selectedConditionArr, 'today');  // Deselect today
        break;
      case 'thisWeek':
        // 
        break;
      case 'thisMonth':
        // 
        break;
      case 'my':
        // 
        break;
      default: 
        // some code..
        break;
    }

    // Add this conditions to selectedConditions Session
    selectedConditionArr.push(selectedCondition);
    Session.set('selectedConditions', selectedConditionArr);

    return false;
  },
  "click #remove-condition": function (event) {
    event.preventDefault();
    
    let removeCondition = event.currentTarget.textContent.trim();

    try {
      mySession.remove('selectedConditions', removeCondition);
    } catch (e) {
      Meteor.myFunctions.logError(e);
    }


    // let selectedConditionArr = Session.get('selectedConditions');
    // selectedConditionArr = _.without(selectedConditionArr, removeCondition);
    // Session.set('selectedConditions', selectedConditionArr);
    
    return false;
  }

});

