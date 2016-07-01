angular.module("classupApp")
.factory("SearchService", 
  ["$q", "$http", "$stamplay","$rootScope", 
  function($q, $http, $stamplay,  $rootScope) {
  	return {
  		coursesWiseSearch : function(courseId){
  			var q = $q.defer();
  			var cs = new CB.CloudQuery('classes');
        cs.equalTo('courses',courseId);
        cs.find({
        success : function(list){
          console.log(list);
        },error : function(error){
          console.log(error);
        }
        });
        return q.promise;
  		},


  	}
  }]);