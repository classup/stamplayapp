'use strict'

angular.module('classupApp')
	.controller('classHomepageCtrl',["$scope","$state","$stateParams","ClassesService","$q",
		function($scope,$state,$stateParams,ClassesService,$q){
		console.log($stateParams.id);

		ClassesService.getClassesDetails($stateParams.id)
		.then(function(classDetails){
			renderClassDetails(classDetails);
		},function(err){
			console.log(err);
		});


		function renderClassDetails(classDetails){
			$scope.class = classDetails;
		}

	}]);