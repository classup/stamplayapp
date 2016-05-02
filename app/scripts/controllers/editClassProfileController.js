angular.module('classupApp')
	.controller('editClassProfileCtrl',['$q','$scope','$state','$stateParams','StreamService','SubjectService','ClassesService',
		function($q,$scope,$state,$stateParams,StreamService,SubjectService,ClassesService){
		console.log('here it is'+ $stateParams.id);
		$scope.classes = {};
		$scope.updatedClasses = {};
		$scope.streams = {};
		$scope.subjects = {};
		$scope.domains ={};
		
		//console.log(StreamService.getOtherStreams($stateParams.id));
		ClassesService.getClassesDetails($stateParams.id)
		.then(function(classes){
			$scope.classes = classes;
			console.log($scope.classes.courses);
		});
		StreamService.getStreams()
			.then(function(streams){
				$scope.streams = streams;
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
		StreamService.getDomains()
			.then(function(domains){
				$scope.domains = domains;
			});
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

		$scope.updateInfo = function(e){
			console.log($scope.classes);
			var data = new FormData();
			data.append("banner",$scope.classes.banner);

			var xhr = new XMLHttpRequest();

			  xhr.open('PUT', 'https://getclassup.stamplayapp.com/api/cobject/v1/classes', true);

			  xhr.onload = function(e) {
			    if(xhr.status >= 200 && xhr.status < 400) {
			      console.log(JSON.parse(xhr.response));
			    } else {
			      console.error(xhr.status + " (" + xhr.statusText + ")" + ": " + xhr.responseText);
			    }
			  }

			  xhr.send(data);
			makeUpdatedClassesObject($scope.classes)
			.then(function(updatedClasses){
				ClassesService.updateInfo(updatedClasses)
				.then(function(classes){
				$state.go('classes.viewProfile',{id:classes.id});
			});
			})
			
		};
		function makeUpdatedClassesObject(classes){
			var q= $q.defer();
			var updatedClasses = {};
			updatedClasses.id = classes.id;
			updatedClasses.owner = classes.owner;
			updatedClasses.name = classes.name; 
			updatedClasses.tagline = classes.tagline
			console.log(classes.courses);
			if( classes.domains != null && classes.domains != undefined){
				updatedClasses.domains = 	getIds(classes.domains);
				console.log(updatedClasses.domains);
			}
			
			if( classes.courses != null && classes.courses != undefined){
				updatedClasses.courses = 	getIds(classes.courses);
			}	
			q.resolve(updatedClasses);
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
	}]);