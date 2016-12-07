"use strict";

playdate.controller('AuthCtrl', function($scope, AuthFactory, UserFactory, $location, $rootScope){
  $scope.loginContainer = true;
  console.log("what is this authctrl thing")
  $scope.registerContainer = false;
  $scope.login = {
    email: "z@z.com",
    password: "123456"
  };

  if($location.path()==="/logout"){
    AuthFactory.logout();
    $rootScope.user = {};
    $location.url("/auth");
  };

  let logMeIn = function(logInStuff){
      AuthFactory.authenticate(logInStuff).then(function(didLogin){
      // console.log("did login", didLogin);
        return UserFactory.getUser(didLogin.uid);
      }).then(function(userCreds){
        $rootScope.user = userCreds;
        $scope.login = {};
        $scope.register = {};
        $location.url("/items/list");
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

  $scope.registerUser = function(registerNewUser){
    AuthFactory.registerWithEmail(registerNewUser).then(function(didRegister){
      registerNewUser.uid = didRegister.uid;
      // console.log("didRegister", didRegister);
      return UserFactory.addUser(registerNewUser);
    }).then(function(registerComplete){
      //LOGIN
      logMeIn(registerNewUser);

    });
  };

  $scope.loginUser = function(loginNewUser){
    logMeIn(loginNewUser);
    
  };

});