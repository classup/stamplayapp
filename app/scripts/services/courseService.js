angular.module("classupApp")
.factory("CourseService", 
  ["$q", "$http", "$rootScope", 
  function($q, $http, $rootScope) {
  	return {
  		getCourseId : function(courseName){
  			 var q = $q.defer();
  			 var course = new CB.CloudQuery("courses");
  			 course.get("name",courseName);
  			 course.selectColumn(['id']);
  			 course.findOne({
  			 	success : function(courseId){
            console.log(courseId);
  			 		q.resolve(courseId.document._id);
  			 	},
  			 	error : function(error){
  			 		q.reject(error);
  			 	}
  			 });
  			 return q.promise;
  		},

      getCourses : function(){
        var q = $q.defer();
        var courses = new CB.CloudQuery("courses");
        courses.selectColumn(['id','name']);
        courses.find({
          success : function(courses){
            console.log(courses);
            q.resolve(courses);
          },
          error : function(error){
            q.reject(error);
          }
        })
        return q.promise;
      },

      addCourses : function(newCourses){
        var q = $q.defer();
        var coursesArray = [];
        angular.forEach(newCourses,function(newCourse,key){
          if(newCourse.name != ""){
            var course = new CB.CloudObject('courses');
            course.set('name',newCourse.name);
            coursesArray.push(course);
          }
        });
        console.log(coursesArray);
        if(coursesArray.length > 0){
          CB.CloudObject.saveAll(coursesArray,{
            success : function(courses){
              q.resolve(courses);
            },
            error : function(error){
              q.reject(error);
            }
          });
        }
        return q.promise;
      }
  	}
  }
  ])