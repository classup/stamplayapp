angular.module("classupApp")
.factory("SearchService", 
  ["$q", "$http", "$stamplay","$rootScope", 
  function($q, $http, $stamplay,  $rootScope) {
  	return {
  		coursesWiseSearch : function(course){
  			var q = $q.defer();
  			var cq = new CB.CloudQuery('class_courses');
        console.log(cq);
  		  cq.equalTo('classes._id','qGhX2C5I');	
        cq.find({
          success : function(classes){
            console.log(classes);
            q.resolve(classes);
          },
          error : function(err){
            console.log(err);
            q.reject(err);
          }
        });
        return q.promise;
  		},


  	}
  }]);