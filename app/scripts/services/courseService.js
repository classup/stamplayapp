angular.module("classupApp")
.factory("CourseService", 
  ["$q", "$http", "$rootScope", 
  function($q, $http, $rootScope) {
  	return {
  		getCourseId : function(courseName){
  			 var q = $q.defer();
  			 var course = new CB.CloudQuery("courses");
  			 course.get("name",courseName);
  			 course.selectColumn(['id']);
  			 course.findOne({
  			 	success : function(courseId){
            console.log(courseId);
  			 		q.resolve(courseId.document._id);
  			 	},
  			 	error : function(error){
  			 		q.reject(error);
  			 	}
  			 });
  			 return q.promise;
  		}
  	}
  }
  ])