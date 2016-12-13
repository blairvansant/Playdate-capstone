"use strict";

playdate.controller("CreatePlaydateCtrl", function($scope, AuthFactory, UserFactory, $location, $rootScope, PlaydateFactory){
	console.log("go");
	$scope.welcome = "hello";
	$scope.showPlaydateView = true;
	$scope.newPlaydate = {};
	$scope.playdates = [];


	$scope.addNewPlaydate = function() {
		$scope.newPlaydate.parent = $rootScope.user.uid;
		console.log($scope.newPlaydate);
		PlaydateFactory.postNewPlaydate($scope.newPlaydate).then(function(playDateData){
			console.log("possibly sucessful", playDateData)
			// $location.url("/auth");
			$location.url('/playdate/list');
		})
	};
});













	// $scope.addNewItem = function(){
	// 	$scope.newTask.isCompleted = false;
	// 	$scope.newTask.uid = $rootScope.user.uid;
	// 	ItemFactory.postNewItem($scope.newTask).then(function(itemId){
	// 	$location.url(" ");
	// 	$scope.newTask ={};
	// 	});