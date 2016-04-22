angular.module('classupApp')
	.controller('editClassProfileCtrl',function($scope,$state,$stateParams){
		console.log('here it is');
		$scope.classes = {};
		$scope.classes = $stateParams.classDetails;
		console.log($stateParams.classDetails);
	});