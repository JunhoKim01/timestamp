mySessionClass = class MySession { 
  // Constructor  
  constructor() {}

  set (key, value) {
    if (key && value)
      return Session.set(key, value);
    else 
      throw new Meteor.myFunctions.clientException('Key or Value undefined', 001);
  }

  
  // Argument validation
  _isValid (key, value) {
    if (!key) 
      return false;

    if (value || (typeof value === 'number' || typeof value === 'stirng'))
      return true;
    else
      return false;
    
  }
  // Insert a value to selected session variable which is an array (push & set)
  // value: number, string
  insert (key, value, MAX) {
    // Input validation
    if(!this._isValid(key, value))
      throw new Meteor.myFunctions.clientException('Invalid key or value', 101);



    // Get current array value
    let arr = Session.get(key);
    // Check maximum insterable number
    if (MAX && arr.length >= MAX)
      return false // Should emits messages


    if (arr && arr.constructor === Array) {
      if (arr.indexOf(value) === -1 ) {
        // Push the value to array only when there is no same value
        arr.push(value);
        return Session.set(key, arr);
      } else {
        //throw new Meteor.myFunctions.clientException('Value does exist already', 102);
        return false;
      }
    } else {
      // Current value is not an array or does not exist
      throw new Meteor.myFunctions.clientException('This is not an array', 103);
    }
  }

  // Remove a value from selected session variable which is an array (remove & set)
  // value: number, string
  remove (key, value) {
    // Input validation
    if(!this._isValid(key, value))
      throw new Meteor.myFunctions.clientException('Invalid key or value', 201);

    // Get current array value
    let arr = Session.get(key);
    if (arr && arr.constructor === Array) {
      if (arr.indexOf(value) !== -1 ) {
        // Remove the value to array only when there is no same value
        arr.splice(arr.indexOf(value), 1);
        if (arr)
          return Session.set(key, arr);
        else
          throw new Meteor.myFunctions.clientException('Missing arr', 202);
      } else {
        //throw new Meteor.myFunctions.clientException('Value does not exist', 203);
        return false;
      }
    } else {
      // Current value is not an array or does not exist
      throw new Meteor.myFunctions.clientException('This is not an array', 203);
    }
  }
}