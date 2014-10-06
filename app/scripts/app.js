'use strict';

var app = angular.module('spiritBreaker226GitHubPageApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'duScroll'
]);

// creates checks if the user wants display the project/portfolio Details
app.factory('doDisplayPortfolioDetails', function() {
	return function (boolShouldPortfolioDetailsBeDisplay) {
	  // checks if the user wants to displays the portfolio details
	  if(boolShouldPortfolioDetailsBeDisplay) {
	    // checks if projectDetails is not being display 
	    if(angular.element('#projectsDetails').hasClass('.collapse.in') === false) {
	      // removes the project list and displays the project details
	      angular.element('#projectsList').collapse('hide');
	      angular.element('#projectsDetails').collapse('show');
	    }// end of if
	  }// end of if
	  else {
	    // removes the project list and displays the project details
	    angular.element('#projectsList').collapse('show');
	    angular.element('#projectsDetails').collapse('hide');
	  }// end of else
	};// end of doDisplayPortfolioDetails()
});// end of doDisplayPortfolioDetails Service

// creates a service that will communcationed between controllers
app.factory('ProjectCommService', function(){
   var sharedService = {};// holds the data that is being shared
    
    // sets the default of the database
    sharedService.data = {};
    sharedService.data.index = -1;

    return sharedService;
});// end of ProjectCommService Service

// creates a service to get the data from a JSON file
app.factory('ProjectPortfolioHttpService', function($http) {
  return $http.get('scripts/siteContentProjects.json', { cache: true });
});// end of ProjectPortfolioHttpService Service

/**
 * @ngdoc overview
 * @name spiritBreaker226GitHubPageApp
 * @description
 * # spiritBreaker226GitHubPageApp
 *
 * Main module of the application.
 */
app.config(function () {});
