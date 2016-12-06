"use strict";

playdate.factory("UserFactory", function($q, $http, FIREBASE_CONFIG){

	let addUser = (authData) => {
		return $q((resolve, reject) =>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/users.json`, JSON.stringify({
					uid: authData.uid,
					username: authData.username
				})
			)
			.success(function(storeUserSuccess){
				console.log("success")
				resolve(storeUserSuccess)
			})
			.error(function(storeUserError){
				console.log("fail");
				reject(storeUserError);
			});
		});
	};
	
	let getUser = (userId) => {
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
			.success(function(userObject){
				let users = [];
				Object.keys(userObject).forEach(function(key){
					users.push(userObject[key]);
				});
				resolve(users[0]);
			})
			.error(function(){
				reject(error);
			});
		});
	};
	return {addUser:addUser, getUser:getUser};
});