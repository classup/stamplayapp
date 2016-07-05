angular.module('classupApp').factory('UserService','AccountService', function (UserService,AccountService) {

  var currentUser = null;

  var adminRoles = ['admin', 'editor'];
  var otherRoles = ['user'];

  return {
  
    currentUser = AccountService.currentUser();
    validateRoleAdmin: function () {
      return _.contains(adminRoles, currentUser.role);
    },

    validateRoleOther: function () {
      return _.contains(otherRoles, currentUser.role);
    }
  };
});