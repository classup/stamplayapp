angular.module('classupApp')
	.controller('editClassProfileCtrl',['$q','$scope','$state','$stateParams','StreamService','SubjectService','ClassesService',
		function($q,$scope,$state,$stateParams,StreamService,SubjectService,ClassesService){
		console.log('here it is'+ $stateParams.classDetails);
		$scope.classes = {
			courses:[]
		};
		$scope.updatedClasses = {};
		$scope.streams = {};
		$scope.subjects = {};
		$scope.domains ={};
		
		//console.log(StreamService.getOtherStreams($stateParams.id));
		if($stateParams.classDetails != null){
			$scope.classes= $stateParams.classDetails;
		}
		else{
			ClassesService.getClassesDetailsById($stateParams.id)
			.then(function(classes){
			$scope.classes = classes;
			console.log($scope.classes);
			});
		}
		
		StreamService.getCourses()
			.then(function(courses){
				$scope.courses = courses;
				/*console.log($scope.streams);
				_.each($scope.classes.courses,function(course){
					_.each($scope.streams,function(stream){
						console.log(stream);
						if(course.id === stream.id){
							_.extend(stream,{ticked = true});
						}
					})
				})
				console.log($scope.streams);

				angular.forEach($scope.classes.courses,function(course,key){
					console.log(course);
					angular.forEach($scope.streams.data,function(stream,streamKey){
						if(course.id === stream.id){
							console.log('ticked true');
							stream.ticked = true;
						}
						else{
							console.log('ticked false');
							stream.ticked = false;
						}
					});
				});
				console.log($scope.streams);
				*/
			},function(error){
				console.log('error in getting streams: '+error);
			});
		SubjectService.getSubjects()
			.then(function(subjects){
				$scope.subjects = subjects;
				
			},function(error){
				console.log('error in getting subjects: '+error);
			});
		ClassesService.getDomains()
			.then(function(domains){
				console.log(domains);
				makeDomainsListForDropdown(domains);
			});

		var makeDomainsListForDropdown = function(domains){
			var domainsList = [];
			_.each(domains,function(domain){
				
				domainsList.push(domain.document);
			})
			console.log(domainsList);
			$scope.domains = domainsList;
		};

		var makeCoursesListForDropdown = function(courses){
			var coursesList = [];
			_.each(courses,function(course){
				coursesList.push(course.document);
			})
			$scope.courses = coursesList;
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

		  $scope.coursesField = [];
		  angular.forEach($scope.courses,function(course){
		  	$scope.coursesField.push({value: course.name , placeholder : 'Course Name'})
		  })
		  $scope.addfield=function(){
		  	if($scope.classes.courses.length > 0)
		  	console.log("course : "+ $scope.classes.courses[0].name);
		    $scope.coursesField.push({value: 'hello',placeholder : 'Course Name'})
		  }
 
	}]);