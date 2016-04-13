'use strict';

/**
 * @ngdoc overview
 * @name classupApp
 * @description
 * # classupApp
 *
 * Main module of the application.
 */
Stamplay.init("getclassup");
var app=angular
  .module('classupApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ngStamplay'
  ]);

  /*angular.module('classupApp').run(function($rootScope, User){
  $rootScope.paid = false;

  // Listen for login events
  $rootScope.$on('User::loggedIn', function(event, data){
    $rootScope.loggedIn = true;
    $rootScope.paid = data.user.instance.paid || false;
    $rootScope.user = data.user;
  });

  // Check if there's a user logged in already
  User.active().then(function(activeUser){
    if(activeUser.isLogged()){
      // Add their details to rootScope
      $rootScope.$emit('User::loggedIn', {user: activeUser});
    }
  });
});*/

  app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("main");
     $stateProvider
    .state('main', {
      url: "/main",
      templateUrl: "views/main.html",
      controller: 'MainCtrl'
    })
    .state('signup',{
      url: "/signup",
      templateUrl: "views/signup.html"
    })
    .state('login',{
      url: "/login",
      templateUrl: "views/login.html"
    })
    .state('createClass', {
      url: "/createClass",
      templateUrl: "views/createClass.html"
    })
    .state('aboutUs', { 
      url: "/aboutUs",
      templateUrl: "views/aboutUsEdit.html",
      controller: 'AboutUsCtrl'
    })
    .state('homepage',{
      url: "/",
      templateUrl: "views/classHomepage.html",
      controller: 'homepageCtrl'
    })
  })

  .run(["$rootScope", "AccountService", function($rootScope, AccountService) {
    Stamplay.init("getclassup");

    AccountService.currentUser().then(function(res) {
        $rootScope.currentUser = res;
        $rootScope.role = res ? res.givenRole.name : false;
    },function(err){
      console.log('no currentUser');
    }
    );
    
}])


          