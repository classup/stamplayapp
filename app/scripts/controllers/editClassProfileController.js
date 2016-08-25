angular.module('classupApp')
	.controller('editClassProfileCtrl',['$q','$scope','$state','$stateParams','StreamService','SubjectService','ClassesService','PageService',
		function($q,$scope,$state,$stateParams,StreamService,SubjectService,ClassesService,PageService){
		console.log('here it is'+ $stateParams.classDetails);
		$scope.classes = {};
		$scope.updatedClasses = {};
		$scope.streams = {};
		$scope.subjects = {};
		$scope.domains ={};

		PageService.setTitle($scope.classes.name + " - Edit Class Profile");
		//console.log(StreamService.getOtherStreams($stateParams.id));
		if($stateParams.classDetails != null){
			$scope.classes= $stateParams.classDetails;
			fillUpCoursesField()
		}
		else{
			ClassesService.getClassesDetailsById($stateParams.id)
			.then(function(classes){
				$scope.classes = classes;
				console.log(classes);
				fillUpCoursesField();
			});
		}

		$scope.title = $scope.classes.name + " - Edit Class Profile";
		console.log($scope.classes);

		var fillUpCoursesField = function(){
			$scope.coursesOfferred = [];
			angular.forEach($scope.classes.courses,function(course){
				console.log(course);
				$scope.coursesOfferred.push({value: course.name , placeholder : course.name});
			})
		};
		SubjectService.getSubjects()
			.then(function(subjects){
				$scope.subjects = subjects;
				
			},function(error){
				console.log('error in getting subjects: '+error);
			});
		ClassesService.getDomains()
			.then(function(domains){
				console.log(domains);
				//makeDomainsListForDropdown(domains);
			});

		/*var makeDomainsListForDropdown = function(domains){
			var domainsList = [];
			_.each(domains,function(domain){
				
				domainsList.push(domain.document);
			})
			console.log(domainsList);
			$scope.domains = domainsList;
		};*/

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

		  $scope.coursesField =[];
		  $scope.addfield=function(){
		  	console.log($scope.classes.courses);
		  	if($scope.classes.courses.length > 0)
		  	console.log("course : "+ $scope.classes);
		    $scope.coursesField.push({placeholder : 'Course Name'})
		  }
 
	}]);