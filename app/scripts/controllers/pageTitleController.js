angular.module('classupApp')
	.controller('pageTitleCtrl', ['$scope','pageService', function($scope,pageService){
		$scope.page = pageService;
	}]);