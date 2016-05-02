angular.module("classupApp")
.factory("SubjectService", 
  ["$q", "$http", "$stamplay","$rootScope", 
  function($q, $http, $stamplay,  $rootScope) {
  	return{

  		addTeacher : function(teacher){
  			var q = $q.defer();
            $stamplay.Object("teachers").save(teacher)
            .then(function(teacher) {
                console.log(teacher.name+ " teacher created");
                q.resolve(teacher);
            });
            return q.promise;

  		},
  		getTeachers : function(){
  			var q = $q.defer();
  			 $stamplay.Object("teachers").get({})
  			 	.then(function(teachers){
  			 		q.resolve(teachers);
  			 	},function(error){
  			 		q.reject(error);
  			 	});
  			 	return q.promise;
  		},
  		getTeacherById : function(teacherId){
  			var q = $q.defer();
  			 $stamplay.Object("teachers").get({
  			 	id:teacherId
  			 })
  			 	.then(function(teacher){
  			 		q.resolve(teacher);
  			 	},function(error){
  			 		q.reject(error);
  			 	});
  			 	return q.promise;
  		}


  	}
  }]);