angular.module("classupApp")
.factory("ReviewService", 
  ["$q", "$http", "$rootScope", 
  function($q, $http, $rootScope) {
    return {
    	addReview : function(classId,review){
    		var q = $q.defer();
    		console.log(classId);
    		var classes = {};
    		var classesObj = new CB.CloudObject('classes',classId);
    		
    		var reviewObj = new CB.CloudObject('reviews');
    		reviewObj.set("title",review.title);
    		reviewObj.set("description",review.description);
    		reviewObj.set("rating",review.rating);
    		reviewObj.set("userId",$rootScope.currentUser);
    		//reviewObj.set("classId",classes);
    		reviewObj.relate('classId','classes',classId);
    		console.log(reviewObj);
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
            console.log(classId);
            var reviews = new CB.CloudQuery("reviews");
            console.log(reviews);
            
            reviews.get('classId',classId);
            reviews.greaterThan("rating",0);
            reviews.find({
            	success : function(classRating){
            		console.log(classRating);
            		q.resolve(classRating);
            	},
            	error : function(error){
            		q.reject(error);
            	}
            });
            return q.promise;
        },

        getReviewCount : function(classId){
            var q = $q.defer();
            var reviews = new CB.CloudQuery("reviews");
            reviews.get('classId',classId);
            reviews.count({
                success : function(reviewCount){
                    console.log(reviewCount);
                    q.resolve(reviewCount);
                },
                error : function(error){
                    q.reject(error);
                }

            });
                return q.promise;
        }
    }
}
])