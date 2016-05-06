'use strict';

/**
 * @ngdoc function
 * @name classupApp.controller:createClassCtrl
 * @description
 * # createClassCtrl
 * Controller to create Classes
 */
angular.module('classupApp')
  .controller('yogicTalesController',['$q','$scope','$rootScope','$state',
  	function ($q,$scope,$rootScope,$state) {
    	$scope.subjectList = {};
   
    	var classDetails = {
        name : 'Yogic Tales',
        tagLine: '',
        teachers:[
        {
          name : 'Pooja Gala',
          exp : '2 years'
        },
        {
          name : 'Pooja Gala',
          exp : '2 years'
        }
        ],
        courses : [
          {
            name : 'Yoga',
            description : 'Good For Health'
          }
        ],
        contact : '9029352272',
        email : 'rusamgr8@gmail.com',
        studentCallingName : 'Client',
        teacherCallingName : 'Mentor',
        studentCount : 25,
        logo : "images/static/yogic_tales_logo.jpg",
        bannerPic : "images/static/yogic-tales-banner.jpg"
      };
      renderClassDetails(classDetails);
    	function renderClassDetails(classDetails){

    		$scope.classDetails = classDetails;
        
        console.log($scope.classDetails);
    	}

/*
      function makeSubjectStreamList(classDetails){
        var subjects = classDetails.subjects;
        var streamSubject = {};
        
        angular.forEach(subjects, function(key, value){
            
        })
        
        
      }*/

      /*function makeSubjectStreamList(classDetails){
        var subjects = classDetails.subjects;var streams = classDetails.streams;
        var streamSubject = {};
        var streams = [];
          angular.forEach(subjects, function(value, key){
            console.log('streamid'+subjects[key].streams);
            StreamService.getStream(subjects[key].streams)
            .then(function(stream){
              console.log(stream);
              streams.push(stream);
            });
           
           console.log('streams: '+streams);
        });
        };
     */
      

    /*  console.log($("[data-animation-effect]").length);
    if ($("[data-animation-effect]").length>0) {
      $("[data-animation-effect]").each(function() {
        if(Modernizr.csstransitions) {
          var waypoints = $(this).waypoint(function(direction) {
            var appearDelay = $(this.element).attr("data-effect-delay"),
            animatedObject = $(this.element);
            setTimeout(function() {
              console.log('it is coming here');
              animatedObject.addClass('animated object-visible ' + animatedObject.attr("data-animation-effect"));
            }, appearDelay);
            this.destroy();
          },{
            offset: '90%'
          });
        } else {
          $(this).addClass('object-visible');
        }
      });
    };*/
  }]);