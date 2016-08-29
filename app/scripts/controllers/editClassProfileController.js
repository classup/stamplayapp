angular.module('classupApp')
	.controller('editClassProfileCtrl',['$q','$scope','$state','$stateParams','StreamService','SubjectService','ClassesService','PageService','CourseService',
		function($q,$scope,$state,$stateParams,StreamService,SubjectService,ClassesService,PageService,CourseService){
		console.log('here it is'+ $stateParams.classDetails);
		$scope.classes = {};
		$scope.updatedClasses = {};
		$scope.streams = {};
		$scope.subjects = {};
		$scope.domains ={};

		$scope.newCourses = [];
		$scope.newCoursesIdAfterSaved = [];
		$scope.restOfCourses = [];
		$scope.presentCoursesSelected = [];

		var finalCourses = [];


		PageService.setTitle($scope.classes.name + " - Edit Class Profile");
		//console.log(StreamService.getOtherStreams($stateParams.id));

		var fillUpCoursesField = function(){
			$scope.coursesOfferred = [];
			angular.forEach($scope.classes.courses,function(course){
				console.log(course);
				$scope.coursesOfferred.push(course);
				finalCourses.push(course.id);
			})
		};

		if($stateParams.classDetails != null){
			$scope.classes= $stateParams.classDetails;
			fillUpCoursesField();
		}
		else{
			ClassesService.getClassesDetailsById($stateParams.id)
			.then(function(classes){
				$scope.classes = classes;
				console.log(classes);
				fillUpCoursesField();
			});
		}

		console.log($scope.classes);

		
		SubjectService.getSubjects()
			.then(function(subjects){
				$scope.subjects = subjects;
				
			},function(error){
				console.log('error in getting subjects: '+error);
			});
		ClassesService.getDomains()
			.then(function(domains){
				console.log(domains);
				$scope.domains = domains;
			});

		$scope.addNewCourses = function(){	
		CourseService.addCourses($scope.newCourses)
			.then(function(courses){
				console.log("courses added");
			},function(error){
				console.log("error in adding courses");
			});
		};

		CourseService.getCourses()
			.then(function(courses){
				console.log(courses);
				$scope.restOfCourses = filterRestOfCourses(courses,$scope.coursesOfferred);
				console.log($scope.restOfCourses);
			})

		var filterRestOfCourses = function(allCourses, coursesOfferred){
			var restOfCourses =[];
			angular.forEach(allCourses,function(course){
				var presentFlag = false;
				angular.forEach(coursesOfferred,function(courseOffered){
					if(course.id == courseOffered.id){
						presentFlag = true;
					}
				});
				if(presentFlag == false){
					restOfCourses.push({
						id : course.id,
						name : course.document.name
					});
				}
			});

			return restOfCourses;

		};
		$scope.addNewStream = function(){
			StreamService.addStream($scope.stream)
				.then(function(stream){
					$scope.stream.push(stream);
				});
		};

		$scope.getStreams = function(){
			
		};

		$scope.addStream = function(){
			$scope.classes.streams.push($scope.streamsOptions);
		};


		$scope.updateInfo = function(){
			
			/*makeUpdatedClassesObject($scope.classes)
			.then(function(updatedClasses){
				console.log(updatedClasses);*/
				ClassesService.updateInfo($scope.classes)
				.then(function(classes){
					console.log($scope.classes);
					if($scope.classes.logo != null){
						var logoFile = $scope.classes.logo;
						var name = $scope.classes.name+"-logo.jpg";
						var cloudFile = new CB.CloudFile(logoFile);
						cloudFile.setName('name',name);
						cloudFile.save({
							success : function(cloudFile){
								console.log(cloudFile.URL);
									$state.go('classes.viewProfile',{id:classes.id});
							},
							error : function(error){
								console.log(error);
							}
						})
					}
				
				});
			
			
		};
		function makeUpdatedClassesObject(classes){
			var q= $q.defer();
			console.log(classes);
			var updatedClasses = {};
			/*updatedClasses.id = classes.id;
			updatedClasses.owner = classes.owner;
			updatedClasses.name = classes.name; 
			updatedClasses.tagline = classes.tagline*/
			console.log(classes.courses);
			if( classes.domains != null && classes.domains != undefined){
				classes.domains = 	getIds(classes.domains);
				console.log(classes.domains);
			}
			
			if( classes.courses != null && classes.courses != undefined){
				classes.courses = 	getIds(classes.courses);
			}	
			q.resolve(classes);
			return q.promise;
		};

		function getIds(CObject){

			var ids = [];
			angular.forEach(CObject,function(value,key){
				console.log(value._id);
				ids.push(value._id);
			})
			return ids;
		}

		  $scope.coursesField =[];
		  $scope.addfield=function(){
		  	console.log($scope.classes);
		  	if($scope.classes.courses.length > 0)
		  	console.log("course : "+ $scope.classes);
		    $scope.coursesField.push({placeholder : 'Course Name'})
		  }
 
	}]);