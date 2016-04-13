'use strict'

angular.module('classupApp')
  .controller('homepageCtrl',['$scope','$state','$rootScope', 'ClassesService', 
  	function ($scope,$rootScope,$state,ClassesService) {
  		$scope.classes = {};
  		$scope.getClasses = function(){
  			
  		};
  		function renderClassesList(classes){
  			console.log($rootScope);
  			$scope.classes = classes;
  		}
  		var user = {};
  		user = $rootScope.currentUser;
  		//console.log($rootScope);
    	ClassesService.getAllClassesOfCurrentUser(user.id)
			    .then(function(classes){
			    	
			    },function(err){
			    	renderClassesList(classes);
			    	console.log(err+' in getting classes list of current user');
			    });
  }]);