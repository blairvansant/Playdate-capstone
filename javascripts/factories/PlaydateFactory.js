"use strict";

playdate.factory("PlaydateFactory", function($q, $http, FIREBASE_CONFIG){
	
	var getPlaydateList = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/playdates.json?orderBy="uid"&equalTo="${userId}"`)
			.success(function(response){
				let playdates = [];
				Object.keys(response).forEach(function(key){
					response[key].id = key;
					playdates.push(response[key]);
				})
				resolve(playdates);
			})
			.error(function(errorResponse){
				reject(errorResponse);
			})

		})
	}

var postNewPlaydate = function(newPlaydate){
	return $q((resolve, reject)=>{
		$http.post(`${FIREBASE_CONFIG.databaseURL}/playdates.json`, JSON.stringify({
			child: newPlaydate.yourChild,
			date: newPlaydate.date,
			friend: newPlaydate.friendChild,
	  	uid: newPlaydate.parent
		})
		)
		.success(function(postResponse){
			resolve(postResponse);
		})
		.error(function(postError){
			reject(postError);
		})
	})
}

var deletePlaydate = function(playdateId){
	return $q((resolve, reject)=>{
		$http.delete(`${FIREBASE_CONFIG.databaseURL}/playdates/${playdateId}.json`)
		.success(function(deleteResponse){
			resolve(deleteResponse);
		})
		.error(function(deleteError){
			reject(deleteError);
		})
	})
};

var getSinglePlaydate = function(playdateId){
	return $q((resolve, reject)=>{
		$http.get(`${FIREBASE_CONFIG.databaseURL}/playdates/${playdateId}.json`)
		.success(function(getSingleResponse){
			resolve(getSingleResponse);
		})
		.error(function(deleteError){
			reject(deleteError);
		})
	})
};

var editPlaydate = function(editPlaydate){
	console.log("factory edit", editPlaydate);
	return $q((resolve, reject)=>{
		$http.put(`${FIREBASE_CONFIG.databaseURL}/playdates/${editPlaydate.id}.json`, JSON.stringify({
			child: newPlaydate.child,
			date: newPlaydate.date,
			friend: newPlaydate.friend,
	  	uid: newPlaydate.userId
		})
		)
		.success(function(editResponse){
		resolve(editResponse);
		})
		.error(function(editError){
			reject(editError);
		})
	})
}

	return {getPlaydateList:getPlaydateList, 
					postNewPlaydate:postNewPlaydate, 
					deletePlaydate:deletePlaydate, 
					getSinglePlaydate:getSinglePlaydate, 
					editPlaydate:editPlaydate}
})	


