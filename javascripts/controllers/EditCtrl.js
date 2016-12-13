"use strict";

playdate.controller('EditCtrl', function($scope, $routeParams, PlaydateFactory, $location){
	$scope.newPlaydate = {};
	let playdateId = $routeParams.id;

	PlaydateFactory.getSinglePlaydate(playdateId).then(function(onePlaydate){
		onePlaydate.id = playdateId;
		$scope.newPlaydate = onePlaydate;
	});
	$scope.addNewPlaydate = function(){
		PlaydateFactory.editPlaydate($scope.newPlaydate).then(function(response){
			$scope.newPlaydate = {};
			$location.url('/playdate/edit/:id"');
		});
	};
});