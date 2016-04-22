angular.module('classupApp')
	.controller('editClassProfileCtrl',['$scope','$state','$stateParams','StreamService','SubjectService',
		function($scope,$state,$stateParams,StreamService,SubjectService){
		console.log('here it is');
		$scope.classes = {};
		console.log('yo'+$stateParams.classDetails);
		$scope.classes = $stateParams.classDetails;
		$scope.streams = {};
		$scope.subjects = {};
		

		StreamService.getStreams()
			.then(function(streams){
				$scope.streams = streams;
				console.log($scope.streams.data[0]);
			},function(error){
				console.log('error in getting streams: '+error);
			});
		StreamService.getSubjects()
			.then(function(subjects){
				$scope.subjects = subjects;
				console.log($scope.subjects.data[0]);
			},function(error){
				console.log('error in getting subjects: '+error);
			});
		$scope.addStream = function(){
			StreamService.addStream($scope.stream)
				.then(function(stream){
					$scope.stream.push(stream);
				});
		};

		$scope.getStreams = function(){
			
		};
	}]);