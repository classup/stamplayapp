'use strict';

/**
 * @ngdoc function
 * @name classupApp.controller:createClassCtrl
 * @description
 * # createClassCtrl
 * Controller to create Classes
 */
angular.module('classupApp')
  .controller('classHomepageCtrl',['$q','$scope','$rootScope','$state','ClassesService','$stateParams',
  	function ($q,$scope,$rootScope,$state,ClassesService,$stateParams) {
    	
  		console.log($stateParams.id);
    	ClassesService.getClassesDetails($stateParams.id)
    	.then(function(classDetails){
    		console.log(classDetails);
    		renderClassDetails(classDetails);
    	},function(err){
    		console.log(err+ ' : in getting the class details');
    	});

    	function renderClassDetails(classDetails){
    		$scope.classDetails = classDetails;
    	}
  }]);