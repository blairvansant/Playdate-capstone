"use strict";

playdate.controller('ListPlaydateCtrl', function($scope, $rootScope, PlaydateFactory){

	$scope.playdates = [];


	let getPlaydates = function(){
		PlaydateFactory.getPlaydateList($rootScope.user.uid).then(function(fbPlaydates){
			$scope.playdates = fbPlaydates;
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

});