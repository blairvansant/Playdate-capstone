"use strict";

playdate.controller('ListPlaydateCtrl', function($scope, $rootScope, PlaydateFactory, $location){

	$scope.playdates = [];

	let getPlaydates = function(){
		PlaydateFactory.getPlaydateList($rootScope.user.uid).then(function(fbPlaydates){
			$scope.playdates = fbPlaydates;
			// for (var i = 0; i < fbPlaydates.length; i++) {
			// 	console.log("iso date", fbPlaydates[i].date)
			// 	var someDate = new Date(fbPlaydates[i].date);
			// 	var ISOparsedNewStringDate = someDate.toISOString();
			// 	var parsedDate = Date.parse(fbPlaydates[i].date);
			// 	var newestDate = new Date(parsedDate);
			// 	console.log("newestDate date", newestDate)
			// 	console.log("parsed date", parsedDate)
			// 	console.log("new date", newDate)
			// 	console.log(newDate.getUTCHours()); 
			// 	console.log(newDate.getUTCMinutes());
			// 	console.log(newDate.getUTCSeconds());
			// }
			console.log("fbPlaydates", fbPlaydates);
		});
	};
	getPlaydates();

	$scope.deletePlaydate = function(playdateId){
		PlaydateFactory.deletePlaydate(playdateId).then(function(response){
			console.log("playdateId", playdateId);
			getPlaydates();
		});
	};

	$scope.inputChange = function(edit){
		PlaydateFactory.editPlaydate(edit).then(function(response){
		});
	};

	$scope.editThePlaydate = function(playdate_Id){
		console.log("we made it ok", playdate_Id);
		var newUrl = `playdate/edit/${playdate_Id}`;
		$location.url(newUrl);
	};

});