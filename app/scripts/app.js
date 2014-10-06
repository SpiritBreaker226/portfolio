'use strict';

var app = angular.module('spiritBreaker226GitHubPageApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'duScroll'
]);

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
