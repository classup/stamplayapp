var CB = require('cloudboost');
var gzippo = require('gzippo');
var express = require('express');
var app = express();
var morgan = require('morgan');         
var bodyParser = require('body-parser');    
var methodOverride = require('method-override'); 


 app.use(express.static(__dirname + "/dist"));
/* app.use('/bower_components',  express.static(__dirname + '/bower_components'));
 app.use('/node_modules',  express.static(__dirname + '/node_modules'));*/
 app.get('/', function(req, res) {
    res.sendfile('index.html', {root: __dirname })
});

  CB.CloudApp.init('nrzbkowpwcpq', '1f822c28-d9cc-4100-b023-7520ddec6300');
  var classes = require('./routes/classes');

app.use(morgan('dev'));   
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.put('/api/classes/updateOverallRating',function(req,res){
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

	
		
});

  //app.use(gzippo.staticGzip("" + __dirname + "/dist"));
  app.listen(process.env.PORT || 5000);