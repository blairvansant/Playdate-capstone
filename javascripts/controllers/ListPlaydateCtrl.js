"use strict";

playdate.controller('ListPlaydateCtrl', function($scope, $rootScope, PlaydateFactory, $location){

	$scope.playdates = [];


	let getPlaydates = function(){
		PlaydateFactory.getPlaydateList($rootScope.user.uid).then(function(fbPlaydates){
			$scope.playdates = fbPlaydates;
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