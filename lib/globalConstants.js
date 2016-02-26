// Contant variables





// Sessions


// Session - login & Join

// # What    : Show states of join or login
// # Default : false
// # Values  : true, false
// # Limit   : N/A
isJoin = 'isJoin';


// Session - tab

// # What    : Show which where user is
// # Default : contents
// # Values  : contens, hashtag, settings
// # Limit   : N/A
tabStatus = 'tabStatus'; 

// # What    : States of removing itmes
// # Default : false
// # Values  : true, false
// # Limit   : N/A
removeItem = 'removeItem';

// # What    : 
// # Default : 
// # Values  : 
// # Limit   :
removeTemplate = 'removeTemplate';

// # What    : Number of itmes currently loaded on screen 
// # Default : 0
// # Values  : 0 ~ infinite
// # Limit   : none    
loadedItemCount = 'loadedItemCount';

// # What    : Number of items that can be loaded on screen
// # Default : 3
// # Values  : 3, 6, 9, ... 
// # Limit   : none
loadableItemCount = 'loadableItemCount';
LOADABLE_ITEM_COUNT = 3;

// Session - Hashtag page

// # What    : Selected hashtags
// # Default : an emtpy array
// # Values  : Hashtags that user selected
// # Limit   : MAX_SELECTED_HASHTAGS
MAX_SELECTED_HASHTAGS = 2; // Number of hashtags can be selected at the same time
selectedHashtags = 'selectedHashtags'; 

// # What    : Selected conditions 
// # Default : an empty array
// # Values  : Keyword selected from conditionsArr
// # Limit   : Curretnly, none
selectedConditions = 'selectedConditions'; 

// # What    : Basic conditions
// # Default : An array that contains condition keyword
// # Values  : Keywords that in conditionsArr
// # Limit   : none
//const conditions = 'conditions'; // Contain condition keyword
conditionsArr = 
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
  'thisYear',
  // Owner
  'my' // Shows only my timestamps 
  ];
//Session.setDefault('conditions', conditionsArr);

// Session - settings

// # What    : States of editing user name
// # Default : false
// # Values  : true, false
// # Limit  : none
editUsername = 'editUsername';

// Session - contents page
// # What    : States of show input new timestamp
// # Default : false
// # Values  : true, false
// # Limit  : none
isInput = 'isInput';



initSession = function () {
  Session.setDefault(isJoin, false);  
  Session.setDefault('tabStatus', 'contents');
  Session.setDefault('isEditMode', false);
  Session.setDefault('loadedItemCount', 0);
  Session.setDefault('loadableItemCount', LOADABLE_ITEM_COUNT);
  Session.setDefault('selectedHashtags', []);
  Session.setDefault('selectedConditions', []);
  Session.setDefault('editUsername', false); // home or profile
  Session.setDefault('isInput', false);

};


reInitSession = function () {
  Session.set(isJoin, false);  
  Session.set('tabStatus', 'contents');
  Session.set('isEditMode', false);
  Session.set('loadedItemCount', 0);
  Session.set('loadableItemCount', LOADABLE_ITEM_COUNT);
  Session.set('selectedHashtags', []);
  Session.set('selectedConditions', []);
  Session.set('editUsername', false); // home or profile
  Session.setDefault('isInput', false);

};







