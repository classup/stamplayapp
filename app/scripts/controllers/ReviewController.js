angular.module('classupApp')
	.controller('ReviewController',['$q','$scope','$state','$stateParams','ReviewService','ClassesService',
		function($q,$scope,$state,$stateParams,ReviewService,ClassesService){

var review={
	"title":"good classes",
	"description":"good for all grade students",
	"rating":3

};
		console.log($stateParams.classId);
			$scope.addReview = function(){
				ReviewService.addReview($stateParams.classId,review)
				.then(function(review){
					console.log(review);
				},function(error){

				});
			}
		}])