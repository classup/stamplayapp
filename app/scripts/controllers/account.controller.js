angular.module("classupApp")
.controller("AccountController", 
  ["$q","AccountService","$state", "$window", "$document", "$scope", "$rootScope", "$stateParams", 
  function($q,AccountService,$state, $window, $document, $scope, $rootScope, $stateParams) {

  $scope.login = function() {
    console.log($scope.user);
    AccountService.login($scope.user)
    .then(function(){
      $state.go('dashboard')
    },function(){console.log("not a great choice")});
  }

  $scope.logout = function() {
    AccountService.logout();
  }

  $scope.signup = function(){

      AccountService.signup($scope.user)
    .then(function(){
      $state.go('dashboard')
    },function(){console.log("not a great choice")});

      
    };

/*  // Toggle Header on scroll
  angular.element($window).bind("scroll", function() {
    if($window.scrollY < 4) {
      $scope.show = true;
    } else {
      $scope.show = false;
    }
    $scope.$apply()
  });*/



}]);
