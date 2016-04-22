angular.module("classupApp")
.factory("ClassesService", 
  ["$q", "$http", "$stamplay","$rootScope", 
  function($q, $http, $stamplay,  $rootScope) {
    return {
      createClass : function(details) {
            var q = $q.defer();
            $stamplay.Object("classes").save(details)
            .then(function(classes) {
                console.log(classes.name+ " class created");
                q.resolve(classes);
            },function(err){
                console.log(err);
            })
            return q.promise;
        },
      getClasses : function(page, per_page, sortby, search) {
            var q = $q.defer();
            var query = {
                page : page ? page : 1,
                per_page: per_page || 10, 
                populate_owner : true,
                populate : true,
                sort : search ? false : sortby,
                select : ""
            };

            if(search) {
                where = JSON.stringify({ _id  : { $in :  search.hits  } })
                query.where = where;
            }

            if(search) {
                query.per_page = search.hitsPerPage;
            }

            $stamplay.Object("classes").get(query)
            .then(function(res) {

                if(search) {
                    res.pagination.total_elements = search.nbHits;
                    res.pagination.total_pages = search.nbPages;
                    res.pagination.page = search.page + 1;
                }

                q.resolve(res);

            });

            return q.promise;
        },
        getClassesDetails : function(id) {

            var q = $q.defer();

            Stamplay.Object("classes").get({
                "_id" : id,
                populate : true
            }).then(function(res) {
                var classes = res.data[0];
               q.resolve(classes);
                

            }, function(err) {
                q.reject(err);
            });
            return q.promise;
        },

        getAllClassesOfCurrentUser :function() {
            var q= $q.defer();
            console.log($rootScope.currentUser);
            Stamplay.Object("classes").get({
                "owner" : $rootScope.currentUser.id
            }).then(function(res){
                var classes = res.data;
                q.resolve(classes);
            },function(err){
                q.reject(err);
            });
            return q.promise;
        }
}
  }])