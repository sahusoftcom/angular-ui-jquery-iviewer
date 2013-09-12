'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }])
  .controller('ImageCropperCtrl', [function(){
  	
  }]);

  function jqyiviewerCtrl($scope){
  	console.log('init');
  	$scope.display_data = {};
  	$scope.data = {};
  	$scope.data.width = 400;
  	$scope.data.height = 400;
  	$scope.update = function(){
  		console.log('clicked');
  		console.log($scope.data);
  		$scope.display_data = JSON.stringify($scope.data);
  	};
  }
