angular.module('classupApp')
.factory('UserDetailsService',
  ['$q','AccountService','$rootScope', function ($q,AccountService,$rootScope) {

  return {
  
    getRolesOfCurrentUser : function(){
      var q = $q.defer();

            var currentUser = CB.CloudUser.current;
            if(currentUser != null){
              console.log(currentUser.get('roles'));
              var rolesArray = currentUser.get('roles');
              var roles= [];
              currentUser.fetch();
              console.log(roles);
              q.resolve(roles);
                
            }
            else{
                q.reject(false);
            }
            return q.promise;
    }
  
  };
}]);