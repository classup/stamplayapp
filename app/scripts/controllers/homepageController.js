'use strict'

angular.module('classupApp')
  .controller('homepageCtrl',['$scope','$rootScope','$state', 'ClassesService', 
  	function ($scope,$rootScope,$state,ClassesService) {
  		$scope.classes = {};
  		$scope.getClasses = function(){
  			
  		};
  		function renderClassesList(classes){
  			console.log($rootScope);
  			$scope.classes = classes;
  		}
  		$rootScope.$watch('currentUser',function(){
      console.log($rootScope.currentUser);
      if($rootScope.currentUser != undefined){
    	ClassesService.getAllClassesOfCurrentUser()
			    .then(function(classes){
			    	renderClassesList(classes);
			    },function(err){
			    	renderClassesList(classes);
			    	console.log(err+' in getting classes list of current user');
			    });
      }
      else{

        console.log($rootScope.currentUser+' still undefined');
      }
    });
  }]);