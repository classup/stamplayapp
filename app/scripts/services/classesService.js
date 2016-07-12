angular.module("classupApp")
.factory("ClassesService", 
  ["$q", "$http", "$stamplay","$rootScope", 
  function($q, $http, $stamplay,  $rootScope) {
    return {
      createClass : function(details) {
            var q = $q.defer();
            console.log(details);
            var owner = new CB.CloudObject('User',details.owner);
            var classes = new CB.CloudObject("classes");
            classes.set("name",details.name);
            classes.set("owner",owner);
            classes.ACL = new CB.ACL();
            classes.ACL.setUserWriteAccess(details.owner,true);
            classes.save({
                success : function(classes){
                    q.resolve(classes);
                    console.log('classes created');
                },
                error : function(err){
                    q.reject(err);
                    console.log(err);
                }
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
        getClassesDetailsById : function(id) {

            var q = $q.defer();
            var classes = new CB.CloudQuery("classes",id);
            classes.findOne({
                success : function(classes){
                    q.resolve(classes.document);
                },
                error : function(err){
                    q.reject(err);
                }
            })
            return q.promise;
        },
        getClassesDetailsByName : function(name) {

            var q = $q.defer();
            var classes = new CB.CloudQuery("classes");
            classes.equalTo("name",name);
            classes.findOne({
                success : function(classes){
                    q.resolve(classes.document);
                },
                error : function(err){
                    q.reject(err);
                }
            })
            return q.promise;
        },
        getAllClassesOfCurrentUser :function() {
            var q= $q.defer();
            console.log($rootScope.currentUser);
            var classesQ = new CB.CloudQuery("classes");
            classesQ.get("owner",$rootScope.currentUser.id);
            classesQ.selectColumn(['id','name']);
            classesQ.find({
                success : function(classes){
                    q.resolve(classes);
                    console.log(classes);
                },
                error : function(err){
                    q.reject(err);
                }
            })
            return q.promise;
        },

        updateInfo : function(classes){
            console.log(classes);
            console.log(classes.owner.id+' === '+$rootScope.currentUser.id);
            var q= $q.defer();
            if(classes.owner.id=== $rootScope.currentUser.id){
                var classesObj = new CB.CloudQuery("classes",classes.id);
                classesObj.findOne({
                    success : function(classesObj){
                        console.log(classesObj);
                        classesObj.set("name",classes.name);
                        classesObj.set("tagline",classes.tagline);
                        classesObj.set("owner",classes.owner);
                        //add more fields here
                        classesObj.save({
                            success : function(classes){
                                q.resolve(classes);
                            },
                            error : function(err){
                                q.reject(err);
                            }
                        });
                    },
                    error : function(err){
                        q.reject(err);
                    }
                })
                
            }
            else{
                q.reject(false);
            }

                return q.promise;
        },

        getDomains : function(){
            var q = $q.defer();
            var domains = new CB.CloudQuery("domain");
            domains.selectColumn(['id','name']);
            domains.find({
                success: function(domains){
                    console.log(domains);
                    console.log(domains[0].document.name);
                    q.resolve(domains);
                },
                error: function(err){
                    q.reject(err);
                }
            });
            return q.promise;

        }


}
  }])