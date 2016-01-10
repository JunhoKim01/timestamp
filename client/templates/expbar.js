function getNeededEXP (level) {
	return level * 10000;
}

Template.expbar.onRendered(function () {
  
  	var exp = Meteor.user().profile.exp;
  	var level = Meteor.user().profile.level;
  	var neededExp = getNeededEXP(level);
	// initializing expbar
	$('#expbar').progress({
		percent: (exp/neededExp)*100
	});  
});


Template.expbar.helpers ({
	
	exp: function () {
		return Meteor.user().profile.exp;
	},
	expToNextLevel: function () {
		var level = Meteor.user().profile.level;
		
		var neededExp = getNeededEXP(level);

		// Meteor.call("getExpToNextLevel", level,
		// 	function(error, result){
		// 		if(error){
		// 			console.log(error.reason);
		// 			return;
		// 		}
		// 	neededExp = result;
		// 	console.log("expToNextLevel result : " + neededExp);
		// });
		// console.log("expToNextLevel result : " + neededExp);
		return neededExp;
	},
	percent: function () {
		// current percent of exp bar
		var level = Meteor.user().profile.level;
		var exp = Meteor.user().profile.exp;
		var neededExp;

		Meteor.call("getExpToNextLevel", level,
			function(error, result){
				if(error){
					console.log(error.reason);
					return;
				}
			neededExp = result;
			console.log("percent result : " + neededExp);
		});
		console.log("percent result : " + neededExp);
		return exp/neededExp*100;
	},
	level: function () {
		return Meteor.user().profile.level;
	},
	ranking: function () {
		return Meteor.user().profile.ranking;
	},
	username: function () {
		return Meteor.user().profile.name;
	}


});