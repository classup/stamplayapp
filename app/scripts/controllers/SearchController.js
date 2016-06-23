angular.module("classupApp")
.controller("SearchController", ['$q','SearchService',function($q,SearchService){
	SearchService.coursesWiseSearch('AOAD')
	.then(function(classes){
		console.log(classes);
	},function(err){
		console.log(err);
	});
}])