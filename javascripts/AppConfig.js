"use strict"

let isAuth = (AuthFactory) => new Promise((resolve, reject)=>{
	if (AuthFactory.isAuthenticated()){
		resolve();
	} else {
		reject();
	};
});



playdate.run(function($rootScope, $location, FIREBASE_CONFIG, AuthFactory){
    firebase.initializeApp(FIREBASE_CONFIG);

    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
    	
    	let logged = AuthFactory.isAuthenticated();
    	let appTo = currRoute.originalPath.indexOf('/auth') !== -1;
        console.log("gewgew", currRoute)
        console.log("gewgew", currRoute.originalPath)
    	
    	console.log("appTo", appTo);
    	
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
        .when('/create', {
            templateUrl: 'partials/create-child.html',
            controller: 'CreateChildCtrl',
            resolve: {isAuth}
        })
        .when('/playdate/list', {
            templateUrl: 'partials/list.html',
            controller: 'ListPlaydateCtrl',
            resolve: {isAuth}
        })
        .when("/playdate/edit/:id", {
            templateUrl: 'partials/create-child.html',
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