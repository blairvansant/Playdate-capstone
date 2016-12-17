"use strict";

playdate.factory("WeatherFactory", function($q, $http, WEATHER_CONFIG){
	
	var getWeatherIcon = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`http://api.wunderground.com/api/${WEATHER_CONFIG.apiKey}/forecast10day/q/TN/Nashville.json`)
			.success(function(response){
				let weatherIcons = [];
				Object.keys(response).forEach(function(key){
					response[key].id = key;
					weatherIcons.push(response[key]);
				});
				resolve(weatherIcons);
				console.log("weatherIcons", weatherIcons);
			})
			.error(function(errorResponse){
				reject(errorResponse);
			});
		});
	};