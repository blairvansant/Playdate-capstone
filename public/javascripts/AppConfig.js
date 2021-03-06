"use strict";

let isAuth = (AuthFactory) => new Promise((resolve, reject)=>{
	if (AuthFactory.isAuthenticated()){
		resolve();
	} else {
		reject();
	}
});

playdate.run(function($rootScope, $location, FIREBASE_CONFIG, AuthFactory){
    firebase.initializeApp(FIREBASE_CONFIG);

    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
    	
    	let logged = AuthFactory.isAuthenticated();
    	let appTo = currRoute.originalPath.indexOf('/auth') !== -1;
      
    	if(!appTo && !logged){
    		event.preventDefault();
    		$location.path('/auth');
    	}
    });
});

playdate.config(function($routeProvider){
    $routeProvider
        .when('/auth', {
            templateUrl: 'partials/auth.html',
            controller: 'AuthCtrl'
        })
        .when('/playdate/list', {
            templateUrl: 'partials/list.html',
            controller: 'ListPlaydateCtrl',
            resolve: {isAuth}
        })
        .when('/create', {
            templateUrl: 'partials/create-playdate.html',
            controller: 'CreatePlaydateCtrl',
            resolve: {isAuth}
        })
        .when('/playdate/edit/:id', {
            templateUrl: 'partials/edit.html',
            controller: 'EditCtrl',
            resolve: {isAuth}
        })
        .when('/logout', {
            templateUrl: 'partials/auth.html',
            controller: 'AuthCtrl',
            resolve: {isAuth}
        })
        .otherwise('/auth');
});