angular.module("classupApp")
.factory("StreamService", 
  ["$q", "$http", "$stamplay","$rootScope", 
  function($q, $http, $stamplay,  $rootScope) {
  	return{
  		addCourse : function(course) {
  			var q = $q.defer();
            $stamplay.Object("courses").save(course)
            .then(function(course) {
                console.log(course.name+ " course created");
                q.resolve(course);
            });
            return q.promise;
  		},

  		getCourses : function() {
  			var q = $q.defer();
  			 $stamplay.Object("courses").get({})
  			 	.then(function(courses){
  			 		q.resolve(courses);
  			 	},function(error){

  			 	});
  			 	return q.promise;
  		},

  		getCourse : function(courseId){
  			var q = $q.defer();
  			 $stamplay.Object("courses").get({
  			 	id : streamId
  			 })
  			 	.then(function(streams){
            console.log(streams+' from service');
  			 		q.resolve(streams);
  			 	},function(error){

  			 	});
  			 	return q.promise;
  		},

      getOtherCourses : function(classId){
        var q = $q.defer();
         $stamplay.Query("object","streams").notEqual('id',classId)
          .then(function(streams){
            q.resolve(streams);
          },function(error){

          });
          return q.promise;
      },

      getDomains : function(){
        var q = $q.defer();
         $stamplay.Object("groups").get({})
          .then(function(domains){
            q.resolve(domains);
          },function(error){

          });
          return q.promise;
      }
  	}
  }]);
