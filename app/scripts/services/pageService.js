angular.module("classupApp").factory('PageService', [ function() {
   var title = 'Classup';
   return {
     title: function() { return title; },
     setTitle: function(newTitle) { title = newTitle }
   };
}]);