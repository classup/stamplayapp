angular.module("classupApp")
.factory("StreamService", 
  ["$q", "$http", "$stamplay","$rootScope", 
  function($q, $http, $stamplay,  $rootScope) {
  	return{
  		addStream : function(stream) {
  			var q = $q.defer();
            $stamplay.Object("streams").save(stream)
            .then(function(stream) {
                console.log(stream.name+ " stream created");
                q.resolve(stream);
            });
            return q.promise;
  		},

  		getStreams : function() {
  			var q = $q.defer();
  			 $stamplay.Object("streams").get({})
  			 	.then(function(streams){
  			 		q.resolve(streams);
  			 	},function(error){

  			 	});
  			 	return q.promise;
  		},

  		getStream : function(streamId){
  			var q = $q.defer();
  			 $stamplay.Object("streams").get({
  			 	id : streamId
  			 })
  			 	.then(function(streams){
  			 		q.resolve(streams);
  			 	},function(error){

  			 	});
  			 	return q.promise;
  		}
  	}
  }]);
