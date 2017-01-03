
"use strict";

playdate.controller("NavbarCtrl", function($scope){
	$scope.navPlaydates =[
		{
				name:"logout",
				url:"#/logout"
		},
		{
				name:"Add Playdate",
				url:"#/playdates/list"
		},
		{
				name:"All Playdates",
				url:"#/playdates/new"
		}
	];
});

