angular.module("classupApp")
.controller("AccountController", 
  ["$q","AccountService","$state", "$window", "$document", "$scope", "$rootScope", "$stateParams", 
  function($q,AccountService,$state, $window, $document, $scope, $rootScope, $stateParams) {

  $scope.login = function() {
    console.log($scope.user);
    AccountService.login($scope.user)
    .then(function(user){
      $rootScope.currentUser = user;
      $state.go('dashboard')
    },function(err)
    {
      console.log("not a great choice")
    });
  }

  $scope.logout = function() {
    console.log("logging out");
    AccountService.logout()
    .then(function(user){
      $state.go('login')
    },function(error){

      console.log(error+" system not allowing you to leave");
    });
  }

  $scope.signup = function(){
      console.log('coming inside signup');
      AccountService.signup($scope.user)
    .then(function(){
      $state.go('dashboard')
    },function(){
      console.log("not a great choice")
    });  
    };

  

    


}]);
