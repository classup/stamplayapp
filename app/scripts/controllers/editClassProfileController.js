angular.module('classupApp')
	.controller('editClassProfileCtrl',['$scope','$state','$stateParams','StreamService','SubjectService','ClassesService',
		function($scope,$state,$stateParams,StreamService,SubjectService,ClassesService){
		console.log('here it is'+ $stateParams.id);
		$scope.classes = {};
		
		$scope.streams = {};
		$scope.subjects = {};
		
		//console.log(StreamService.getOtherStreams($stateParams.id));
		ClassesService.getClassesDetails($stateParams.id)
		.then(function(classes){
			$scope.classes = classes;
		});
		StreamService.getStreams()
			.then(function(streams){
				$scope.streams = streams;
				console.log($scope.streams.data[0]);
			},function(error){
				console.log('error in getting streams: '+error);
			});
		SubjectService.getSubjects()
			.then(function(subjects){
				$scope.subjects = subjects;
				console.log($scope.subjects.data[0]);
			},function(error){
				console.log('error in getting subjects: '+error);
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

	}]);