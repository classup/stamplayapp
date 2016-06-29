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
    'ngStamplay',
    'ngImgCrop',
    'flow',
    'isteven-multi-select'
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
    $urlRouterProvider.otherwise("dashboard");
     $stateProvider
    .state('main', {
      url: "/main",
      templateUrl: "views/main.html"
    })
    .state('signup',{
      url: "/signup",
      controller:"AccountController",
      templateUrl: "views/signup.html"
    })
    .state('login',{
      url: "/login",
      controller:"AccountController",
      templateUrl: "views/login.html"
    })
    .state('logout',{
      url:"/logout",
      controller:"AccountController",
      onEnter: function() {
         alert('Hi');
      }
    })
    .state('dashboard', {
      url: "/dashboard",
      controller: 'homepageCtrl',
      templateUrl: "views/userDashBoard.html",
    })
    .state('aboutUs', { 
      url: "/aboutUs",
      templateUrl: "views/aboutUsEdit.html",
      controller: 'AboutUsCtrl'
    })
    .state('homepage',{
      url: "/",
      templateUrl: "views/newClassHomepage.html"
      
    })
    .state('classes',{
      url:"/classes/:name",
      abstract:true,
      templateUrl:'views/classHeader.html'
    })
    .state('classes.viewProfile',{
      url: '',
      parent:'classes',
      controller: 'classHomepageCtrl',
      templateUrl: 'views/newClassHomepage.html',
      params: {
        id:null,
        name:null
      }
    })
    .state('classes.editClassProfile',{
      url:"/editClassProfile",
      parent:'classes',
      controller: "editClassProfileCtrl",
      templateUrl: "views/editProfilePage.html",
      params:{
        classDetails:null
      }
    })
    .state('classes.editClassProfile.editProfile',{
      url:"",
      parent:'classes.editClassProfile',
      templateUrl: 'views/editProfilePage.html'

    })
    .state('searchCourseWise',{
      url:"/course/:course",
      controller:'SearchController',
      templateUrl: 'views/newClassHomepage.html'
    })
    .state('yogicTales',{
      url:'/yogic_tales',
      controller:'yogicTalesController',
      templateUrl: 'views/newClassHomepage.html'
    })
    .state('search',{
      url:'/search',
      controller:'SearchController'
    })

  })
  .run(["$rootScope", "AccountService", function($rootScope, AccountService) {
    //Stamplay.init("getclassup");
    CB.CloudApp.init('nrzbkowpwcpq', '0828bc2b-111e-4051-9ab1-f1f64c5f4b13');
    AccountService.currentUser().then(function(res) {
        $rootScope.currentUser = res;/*
        $rootScope.role = res ? res.givenRole.name : false;*/
    },function(err){
      console.log('no currentUser');
    }
    );
    
}])


          