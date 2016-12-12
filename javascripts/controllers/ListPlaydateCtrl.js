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
			getPlaydates();
		});
	};

	$scope.inputChange = function(thingy){
		PlaydateFactory.editPlaydate(thingy).then(function(response){
		})
	};

});