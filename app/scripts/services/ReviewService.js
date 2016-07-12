angular.module("classupApp")
.factory("ReviewService", 
  ["$q", "$http", "$rootScope", 
  function($q, $http, $rootScope) {
    return {
    	addReview(classId,review){
    		var q = $q.defer();
    		console.log(classId);
    		var reviewObj = new CB.CloudObject('reviews');
    		reviewObj.set("title",review.title);
    		reviewObj.set("description",review.description);
    		reviewObj.set("rating",review.rating);
    		reviewObj.set("userId",$rootScope.currentUser);
    		reviewObj.relate('classId','classes',classId);
    		reviewObj.save({
    			success : function(review){

    				/*var classQuery = new CB.CloudQuery('classes',classId);
    				classQuery.findOne({
    					success : function(classes){
    						console.log(classes);
    						classes.relate('reviews','review',review.id);
    						classes.save({
    							success: function(classes){
    								console.log(classes);
    							},error: function(error){
    								console.log(error);
    							}
    						});
    					},
    					error : function(error){
    						console.log("classes not found: "+error);
    					}
    				});*/
    				q.resolve(review);
    			},
    			error : function(error){
    				console.log('review not saved: '+error);
    				q.reject(error);
    			}
    		});
    		return q.promise;
    	},

    	getRatingForClasses : function(classId){
            var q = $q.defer();
            
            var classes = new CB.CloudQuery("reviews");
            classes.equalTo("classId",classId);
            classes.greaterThan("rating",0);
            classes.selectColumns([rating]);
            classes.find({
            	success : function(classRating){
            		q.resolve(classRating);
            	},
            	error : function(error){
            		q.reject(error);
            	}
            });
        }
    }
}
])