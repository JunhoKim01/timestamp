myHashtagClass = class MyHashtag { 
  constructor() {}

  // Client & Server

  // Hashtag validation
  _isValidHashtag (hashtag) {
    if (hashtag && (typeof hashtag === 'string')) {
      if (hashtag.charAt(0) === '#')
        return true;
      else
        return false; // Hashtag without '#' 
    } else {
      return false;
    }
  }
  
  // Get Hashtag Regular expression
  get getRegexp () {
    const regexp = /#[가-힣a-z\d][가-힣a-z\d]*/ig;  
    // const regex = /#[가-힣a-zㄱ-ㅎ\d][가-힣a-zㄱ-ㅎ\d\_\?]*/ig; // This can find #ㅋㅋㅋㅋ
    // const regex = /(^|)*#(.+?)(?=[\s#.,:)]|$)/ig; // Another regextp that matches more launguage but even '##''
    return regexp;
  }

  // Find all hashtag from input as an array
  // Return an emtpy array if there are no hashtag
  find (input) {
    if (input) {
      const result = input.trim().match(this.getRegexp);
      
      if (result === null)
        return [];
      else
        return result;
    } else {
      // If there are no input
      return null;
    }
  }

  findReplace (input) {
    if (input && input !== '') {
      const result = input.replace(this.getRegexp, '<a class="hashtag">$&</a>');

      if (result === null)
        return input; // No replace happens
      else {
        return result;
      }
        
    } else {
      // If there are no input
      return null;
    }
  }

  log (input) {
    return input;
  }


  // Server only
  insert () {

  }
  update () {

  }


}