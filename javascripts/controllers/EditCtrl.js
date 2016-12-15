"use strict";

playdate.controller('EditCtrl', function($scope, $routeParams, PlaydateFactory, $location){
	
	$scope.editedPlaydate = {};
	let playdateId = $routeParams.id;
	
	console.log("Edit Ctrl");
	
	PlaydateFactory.getSinglePlaydate(playdateId).then(function(onePlaydate){
		onePlaydate.id = playdateId;
		$scope.editedPlaydate = onePlaydate;

	
		console.log($scope.editedPlaydate, "editedPlaydate");
	});


	$scope.editSinglePlaydate = function(){
		PlaydateFactory.editPlaydate($scope.editedPlaydate).then(function(response){
			$scope.editedPlaydate = {};
			$location.url('/playdate/list/');
		});
	};
});