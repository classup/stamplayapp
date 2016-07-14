angular.module('classupApp')
	.controller('ReviewController',['$q','$scope','$state','$stateParams','ReviewService','ClassesService',
		function($q,$scope,$state,$stateParams,ReviewService,ClassesService){

var review={
	"title":"good classes",
	"description":"good for all grade students",
	"rating":3

};
var classId = $stateParams.classId;
		console.log(classId);
			$scope.addReview = function(){
				ReviewService.addReview(classId,review)
				.then(function(review){
					console.log(review);
					calculateOverallRating(classId);
					
					
				},function(error){
					console.log(error);
				});
			};

			var calculateOverallRating = function(classId){
				var sumOfRating = 0;
				$scope.overall_rating = 0;
				var size = 0;
				ReviewService.getRatingForClasses(classId)
				.then(function(classRatingList){
					size = classRatingList.length;
					console.log('size: '+size+"  , \n"+classRatingList);
					_.each(classRatingList,function(classRating){
						console.log(classRating);
						sumOfRating += classRating.document.rating;
					});
					console.log(sumOfRating);
					if(size > 0){
						$scope.overall_rating = sumOfRating/size;	
					}
				
					console.log($scope.overall_rating);
					ClassesService.updateOverallRating(classId,$scope.overall_rating)
					.then(function(classes){
						$state.go('classes.viewProfile',{id:classes.id});
					})
			
				});
				}
		}])