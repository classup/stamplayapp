angular.module("classupApp")
.factory("SearchService", 
  ["$q", "$http", "$stamplay","$rootScope", 
  function($q, $http, $stamplay,  $rootScope) {
  	return {
  		coursesWiseSearch : function(area){
  			var q = $q.defer();
  			var cs = new CB.CloudSearch('classes');
  			cs.searchQuery = new CB.SearchQuery();
  			cs.searchQuery.searchOn('courses');
  		}
  	}
  }]);