'use strict';

var app = angular.module('spiritBreaker226GitHubPageApp');

app.factory('ProjectCommService', function(){
   var sharedService = {};
    
    sharedService.data = {};
    sharedService.data.index = -1;

    return sharedService;
});

/**
 * @ngdoc directive
 * @name spiritBreaker226GitHubPageApp.directive:portfolio
 * @description
 * # portfolio
 */
app
  .controller('PortfolioCtrl', function($scope, $http, ProjectCommService){
  	$scope.sharedData = ProjectCommService.data;

	// checks if there is an end date for the project
	$scope.hideProjectEndDate = function (dateProjectEndDate) {
		return dateProjectEndDate === '';
	};// end of hideProjectEndDate())

  	// sets the current project index
  	$scope.setProjectIndex = function(intProjectIndex) {
  		ProjectCommService.data.index = intProjectIndex;
  	};// end of setProjectIndex()

	// calls the file 
	$http.get('scripts/siteContentProjects.json').success(function(data) {
		// loads the data into an service for data 
		// if the http gets is able to access the data
		$scope.projects = data;
		$scope.numberOfProjects = (Math.ceil($scope.projects.length / 4) + 1);

		// this scope service is for the select element in order for it to do a selction
		// when the page first loads up
		$scope.projectOrder = 'name';
	});
  })
  .directive('portfolio', function () {
    return {
      templateUrl: 'views/templates/portfolio.html',
      restrict: 'E',
      controllerAs: 'project'
    };
  });

 /** 
 * @ngdoc directive
 * @name spiritBreaker226GitHubPageApp.directive:portfolio
 * @description
 * # project details
  */
 
app
  .controller('ProjectDetailsCtrl', function($scope, $http, ProjectCommService){
  	$scope.sharedData = ProjectCommService.data;

	// calls the file 
	$http.get('scripts/siteContentProjects.json').success(function(data) {
		// loads the data into an service for data 
		// if the http gets is able to access the data
		$scope.projects = data;
	    $scope.$watch('sharedData.index', function(index) {
			$scope.itemIndex = index;
	    });

	});
  })
  .directive('portfolioDetails', function () {
    return {
      templateUrl: 'views/templates/portfolioDetails.html',
      restrict: 'E'
    };
  });