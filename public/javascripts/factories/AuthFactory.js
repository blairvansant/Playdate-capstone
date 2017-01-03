"use strict";

playdate.factory("AuthFactory", function($q, $http, $rootScope, FIREBASE_CONFIG) {
  let currentUserData = null;

  let isAuthenticated = () => {
      return firebase.auth().currentUser ? true : false;
  };

  let getUser = () => {
    return firebase.auth().currentUser;
  };

  let logout = () => {
    firebase.auth().signOut();
  };

  let authenticate = (credentials) => {
    console.log("cred", credentials);
    return $q((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(credentials.useremail, credentials.password)
        .then((authData) =>{
          resolve(authData);
        })
        .catch((error)=>{
          reject(error);
        });
    });
  };

//Firebase: Register a new user with email and password
  let registerWithEmail = (user) => {
    return $q((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(user.useremail, user.password)
        .then((authData) =>{
          resolve(authData);
        })
        .catch((error)=>{
          reject(error);
        });
    });
  };

//Firebase: GOOGLE - Use input credentials to authenticate user.
  let authenticateGoogle = () => {
    return $q((resolve, reject) => {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then((authData) => {
          currentUserData = authData.user;
          resolve(currentUserData);
        }).catch((error)=> {
          reject(error);
        });
    });
  };

  return {isAuthenticated:isAuthenticated, getUser:getUser, logout:logout, registerWithEmail:registerWithEmail, authenticate:authenticate, authenticateGoogle: authenticateGoogle};
});