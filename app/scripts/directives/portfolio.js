'use strict';

var app = angular.module('spiritBreaker226GitHubPageApp');

/**
 * @ngdoc directive
 * @name spiritBreaker226GitHubPageApp.directive:portfolio
 * @description
 * # portfolio
 */
app
  .controller('PortfolioCtrl', function($scope, $document, ProjectCommService, ProjectPortfolioHttpService, doDisplayPortfolioDetails){
  	// sets the sharing of the communcation service for this controller
  	$scope.sharedData = ProjectCommService.data;
    
    // gets the data from the JSON
    ProjectPortfolioHttpService.success(function(data) {
      // loads the data into an service for data 
      // if the http gets is able to access the data
      $scope.projects = data;
    });

    // this scope service is for the select element in order for it to do a selction
    // when the page first loads up
    $scope.projectOrder = 'name';

  	// checks if there is an end date for the project
  	$scope.hideProjectEndDate = function (dateProjectEndDate) {
  		return dateProjectEndDate === '';
  	};// end of hideProjectEndDate())

  	// sets the current project index
  	$scope.setProjectIndex = function(intProjectIndex) {
  		// sets the selected index the user has selcted to the serivce to communcated between 
  		// controllers
  		ProjectCommService.data.index = intProjectIndex;

  		// scrolls to the top of the portfolio in order for the user to see the details clearly
  		$document.scrollToElement(angular.element(document.getElementById('portfolio')), 70);

      // display the project details
      doDisplayPortfolioDetails(true);
  	};// end of setProjectIndex()
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
  .controller('ProjectDetailsCtrl', function($scope, ProjectCommService, ProjectPortfolioHttpService, doDisplayPortfolioDetails) {
  	// sets the sharing of the communcation service for this controller
  	$scope.sharedData = ProjectCommService.data;

    // gets the data from the JSON
    ProjectPortfolioHttpService.success(function(data) {
      // loads the data into an service for data 
      // if the http gets is able to access the data
      $scope.projects = data;
    });

    // sets the index that has been set in PortfolioCtrl
    $scope.$watch('sharedData.index', function(index) {
      $scope.itemIndex = index;
    });

  	// checks if there is a URL for this project
  	$scope.showProjectURL = function (strProjectURL) {
		  return strProjectURL !== '';
	  };// end of hideProjectTeamSize())

  	// checks if there is team size is lesser 
  	$scope.hideProjectTeamSize = function (intTeamSize) {
  		return intTeamSize > 1;
  	};// end of hideProjectTeamSize())

    // sets the closing of the project details
    $scope.setProjectDetailsClose = function() {
      // display the project details
      doDisplayPortfolioDetails(false);
    };// end of setProjectIndex()
  })
  .directive('portfolioDetails', function () {
    return {
      templateUrl: 'views/templates/portfolioDetails.html',
      restrict: 'E'
    };
  });