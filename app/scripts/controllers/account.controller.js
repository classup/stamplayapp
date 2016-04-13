angular.module("classupApp")
.controller("AccountController", 
  ["AccountService", "$window", "$document", "$scope", "$rootScope", "$stateParams", 
  function(AccountService, $window, $document, $scope, $rootScope, $stateParams) {

  $scope.login = function() {
    AccountService.login();
  }

  $scope.logout = function() {
    AccountService.logout();
  }

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
