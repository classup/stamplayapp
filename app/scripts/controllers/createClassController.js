'use strict';

/**
 * @ngdoc function
 * @name classupApp.controller:createClassCtrl
 * @description
 * # createClassCtrl
 * Controller to create Classes
 */
angular.module('classupApp')
  .controller('createClassCtrl',['$scope','$rootScope','$state','ClassesService',
  	function ($scope,$rootScope,$state,ClassesService) {
    $scope.class={};
    $scope.createClass = function(){
    	$scope.class.owner=$rootScope.currentUser.id;
    	console.log($rootScope);
        console.log('coming inside createClass');
       ClassesService.createClass($scope.class);
       console.log($scope.class);
       $state.go('homepage',{class:$scope.class});
    }
  }]);