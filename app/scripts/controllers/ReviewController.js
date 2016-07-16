angular.module('classupApp')
	.controller('ReviewController',['$q','$http','$routeParams','$scope','$state','$stateParams','ReviewService','ClassesService',
		function($q,$http,$routeParams,$scope,$state,$stateParams,ReviewService,ClassesService){

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
				var reviewDetails = {

					classId : classId,
					overall_rating : 0,
					noOfVotes : 0,
					noOfReviews : 0

				};
				console.log(classId);
				ReviewService.getReviewCount(classId)
				.then(function(reviewCount){
					
					reviewDetails.noOfReviews = reviewCount;
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
						reviewDetails.overall_rating = sumOfRating/size;
						reviewDetails.noOfVotes = size;
					}
					reviewDetails
					console.log($scope.overall_rating);
					ClassesService.updateOverallRating(reviewDetails)
					.then(function(classes){
						$state.go('classes.viewProfile',{id:classes.id});
					})
			
				});
				},function(error){
					console.log(error);
				});
				
				}
		}])