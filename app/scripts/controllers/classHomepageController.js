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
        console.log($scope.classDetails);
    	}
    /*  console.log($("[data-animation-effect]").length);
    if ($("[data-animation-effect]").length>0) {
      $("[data-animation-effect]").each(function() {
        if(Modernizr.csstransitions) {
          var waypoints = $(this).waypoint(function(direction) {
            var appearDelay = $(this.element).attr("data-effect-delay"),
            animatedObject = $(this.element);
            setTimeout(function() {
              console.log('it is coming here');
              animatedObject.addClass('animated object-visible ' + animatedObject.attr("data-animation-effect"));
            }, appearDelay);
            this.destroy();
          },{
            offset: '90%'
          });
        } else {
          $(this).addClass('object-visible');
        }
      });
    };*/
  }]);