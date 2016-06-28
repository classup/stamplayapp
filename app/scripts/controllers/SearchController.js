angular.module("classupApp")
.controller("SearchController", ['$q','CourseService','SearchService','$stateParams',
	function($q,CourseService,SearchService,$stateParams){
	console.log('coming in SearchController');
	CourseService.getCourseId($stateParams.course)
	.then(function(courseId){
		SearchService.coursesWiseSearch(courseId)
		.then(function(classes){
			console.log(classes);
		})
		console.log($stateParams.course+"="+courseId);
	},function(error){
		console.log(error);
	});
}])