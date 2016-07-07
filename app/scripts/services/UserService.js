angular.module('classupApp').factory('UserService',['AccountService','$rootScope', 'UserDetailsService' ,
  function (AccountService,$rootScope,UserDetailsService) {

  var currentUser = null;
  var rolesName = [];
  var adminRoles = ['admin', 'classadmin'];
  var otherRoles = ['registered'];

  UserDetailsService.getRolesOfCurrentUser()
  .then(function(roles){
    _.each(roles,function(role){
      rolesName.push(role.name);
    })
  },function(err){
    console.log(err+" :no roles");
  });
  console.log(rolesName);
  return {
  
   
    validateRoleAdmin: function () {
      return _.includes(adminRoles, rolesName);
    },

    validateRoleOther: function () {
      return _.includes(otherRoles, rolesName);
    }
  };
}]);