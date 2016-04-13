angular.module('classupApp').factory('loginInterceptor', ['$q',  function($q) {  
    var requestInterceptor = {
        request: function(config) {
            var deferred = $q.defer();
            
            return deferred.promise;
        }
    };

    return requestInterceptor;
}]);