angular.module("classupApp")
.factory("SubjectService", 
  ["$q", "$http", "$stamplay","$rootScope", 
  function($q, $http, $stamplay,  $rootScope) {
  	return{
  		addSubject : function(subject) {
  			var q = $q.defer();
            $stamplay.Object("subjects").save(subject)
            .then(function(subject) {
                console.log(subject.name+ " subject created");
                q.resolve(subject);
            });
            return q.promise;
  		},

  		getSubjects : function() {
  			var q = $q.defer();
  			 $stamplay.Object("subjects").get({})
  			 	.then(function(subjects){
  			 		q.resolve(subjects);
  			 	},function(error){

  			 	});
  			 	return q.promise;
  		},

  		getSubject : function(subjectId){
  			var q = $q.defer();
  			 $stamplay.Object("subjects").get({
  			 	id : subjectId
  			 })
  			 	.then(function(subjects){
  			 		q.resolve(subjects);
  			 	},function(error){

  			 	});
  			 	return q.promise;
  		}
  	}
  }]);
