'use strict';

/**
 * @ngdoc function
 * @name classupApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the classupApp
 */
angular.module('classupApp')
  .controller('MainCtrl', ["$rootScope", "AccountService","$q", function($rootScope, AccountService,$q) {
    //Stamplay.init("getclassup");
    var q = $q.defer();
    AccountService.currentUser().then(function(res) {
        $rootScope.currentUser = res;
        $rootScope.role = res ? res.givenRole.name : false;
        q.resolve($rootScope);
        //console.log('rootScope seted '+ $rootScope.currentUser.displayName);
    },function(err){
      console.log('no currentUser');
      q.reject();
    }
    );
    return q.promise;
    
}]);
