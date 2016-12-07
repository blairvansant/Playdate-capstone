"use strict";

playdate.controller("NavCtrl", function($scope){
	$scope.navItems =[
		{
				name:"logout",
				url:"#/logout"
		},
		{
				name:"Add Playdate",
				url:"#/items/list"
		},
		{
				name:"All Playdates",
				url:"#/items/new"
		}
	];
});

