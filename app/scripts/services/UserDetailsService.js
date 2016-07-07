angular.module('classupApp')
.factory('UserDetailsService',
  ['$q','AccountService','$rootScope', function ($q,AccountService,$rootScope) {

  return {
  
    getRolesOfCurrentUser : function(){
      var q = $q.defer();

            var currentUser = CB.CloudUser.current;
            if(currentUser != null){
              console.log(currentUser.get('roles'));
              var roles = currentUser.get('roles');
             /* _.each(roles,function(role){
                var roleObj = new CB.CloudQuery('Role');
                roleObj.equalTo('id',role.document._id);
                roleObj.find({
                  success: function(role){
                    console.log(role);
                  }
                }) 
              })*/
              q.resolve(currentUser.get('roles'));
                
            }
            else{
                q.reject(false);
            }
            return q.promise;
    }
  
  };
}]);