'use strict';

/**
 * @ngdoc function
 * @name classupApp.controller:createClassCtrl
 * @description
 * # createClassCtrl
 * Controller to create Classes
 */
angular.module('classupApp')
  .controller('createClassCtrl',['$q','$scope','$rootScope','$state','ClassesService',
  	function ($q,$scope,$rootScope,$state,ClassesService) {
    $scope.class={};
    $scope.createClass = function(){
    	$scope.class.owner=$rootScope.currentUser.id;
    	console.log($scope.class);
        console.log('coming inside createClass');
       ClassesService.createClass($scope.class)
       .then(function(classes){
        console.log(classes);
       $state.go('classes.viewProfile',{id:classes.id,name:classes.name});
        },function(err){
          console.log('error in creating class : '+err);
        });
       
    }
    
  }]);