angular.module("classupApp")
.factory("StreamService", 
  ["$q", "$http", "$stamplay","$rootScope", 
  function($q, $http, $stamplay,  $rootScope) {
  	return{
  		addStream : function(stream) {
  			var q = $q.defer();
            $stamplay.Object("courses").save(stream)
            .then(function(stream) {
                console.log(stream.name+ " stream created");
                q.resolve(stream);
            });
            return q.promise;
  		},

  		getStreams : function() {
  			var q = $q.defer();
  			 $stamplay.Object("courses").get({})
  			 	.then(function(streams){
  			 		q.resolve(streams);
  			 	},function(error){

  			 	});
  			 	return q.promise;
  		},

  		getStream : function(streamId){
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

      getOtherStreams : function(classId){
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
