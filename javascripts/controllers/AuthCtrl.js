"use strict";

playdate.controller('AuthCtrl', function($scope, AuthFactory, UserFactory, $location, $rootScope){
  console.log("#1", $scope.register);
  $scope.loginContainer = true;
  console.log("what is this authctrl thing");
  $scope.registerContainer = false;


  if($location.path()==="/logout"){
    AuthFactory.logout();
    $rootScope.user = {};
    $location.url("/auth");
  }

  let logMeIn = function(logInStuff){
      AuthFactory.authenticate(logInStuff).then(function(didLogin){
      // console.log("did login", didLogin);
        return UserFactory.getUser(didLogin.uid);
      }).then(function(userCreds){
        $rootScope.user = userCreds;
        $scope.login = {};
        $scope.register = {};
        $location.url("/playdate/list");
    });
  };


  $scope.setLoginContainer = function(){
    $scope.loginContainer = true;
    $scope.registerContainer = false;
  };

  $scope.setRegisterContainer = function(){
    $scope.loginContainer = false;
    $scope.registerContainer = true;
  };

  $scope.registerUser = function(){
      console.log("#2", $scope.register);
    
    AuthFactory.registerWithEmail($scope.register).then(function(didRegister){
      $scope.register.uid = didRegister.uid;

     console.log("didRegister", didRegister);
      return UserFactory.addUser($scope.register);
    }).then(function(registerComplete){
      //LOGIN
      logMeIn($scope.register);

    });
  };

  $scope.loginUser = function(){
    logMeIn($scope.login);
    
  };

});