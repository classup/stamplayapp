exports.updateOverallRating = function(req,res){
	var classId = req.params.classId;
	console.log('coming to server');
	var sumOfRating = 0;
	var overall_rating = 0;
	var size = 0;

	var reviews = new CB.CloudQuery("reviews");
    console.log(reviews);
    
    reviews.get('classId',classId);
    reviews.greaterThan("rating",0);
    reviews.find({
    	success : function(classRatingList){
    		console.log(classRatingList);
    		size = classRatingList.length;

    		classRatingList.forEach(function(classRating,key){
    			sumOfRating += classRating.document.rating;
    		})
			
			if(size > 0){
				overall_rating = sumOfRating/size;	
			}

			var classes = new CB.CloudQuery("classes");
            classes.equalTo('id',classId);
            classes.findOne({
                success : function(classes){
                    classes.set('overall_rating',overall_rating);
                    classes.save({
                        success: function(classes){
                        	res.json({
						      classes : classes
						    });
                        },
                        error : function(error){
                        	res.json({
						      error : error
						    });
                        }
                    })
                },
                error : function(error){
                    res.json({
						      error : error
						    });
                }
            });
    	},
    	error : function(error){
    		res.json({
						      error : error
						    });
    	}
    });

	
		
}