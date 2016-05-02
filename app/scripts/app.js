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
    'isteven-multi-select',
    'flow'
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
      templateUrl: "views/signup.html"
    })
    .state('login',{
      url: "/login",
      templateUrl: "views/login.html"
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
      url:"/classes/:id",
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
    .state('classes.editClassProfile.editStreams',{
      url:"",
      parent:'classes.editClassProfile',
      templateUrl: 'views/editStreamsPage.html'

    })
    .state('classes.editClassProfile.editSubjects',{
      url:"",
      parent:'classes.editClassProfile',
      templateUrl: 'views/editSubjectPage.html'

    })
    .state('classes.editClassProfile.editTeachers',{
      url:"",
      parent:'classes.editClassProfile',
      templateUrl: 'views/editTeachersPage.html'

    })
    .state('classes.editClassProfile.editContact',{
      url:"",
      parent:'classes.editClassProfile',
      templateUrl: 'views/editContactPage.html'

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


          