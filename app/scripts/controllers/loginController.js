angular.module('classupApp')
	.controller('loginSignupController',function($scope,$state){
    $scope.user={};
		$scope.signup = function(){

      
			var signup_credentials = {
          email : 'gjg',
          password: 'mySecret',
          displayName: 'Avni Soni'
        };

        console.log($scope.user);
        
      Stamplay.User
      .signup($scope.user)
      .then(function(res) {
      console.log(res+" this is object");
      $state.go('createClass');
    }, function(err) {
    	console.log(err);
  })
		};

  $scope.ConnectWithFacebook = function(){
    Stamplay.User.socialLogin("facebook");
  }
	})