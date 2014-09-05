'use strict';

/**
 * @ngdoc directive
 * @name spiritBreaker226GitHubPageApp.directive:portfolio
 * @description
 * # portfolio
 */
angular.module('spiritBreaker226GitHubPageApp')
  .controller('PortfolioCtrl', function($scope, $http){
  	var portfolio = this;

  	portfolio.projects = [];

	// checks if there is an end date for the project
	this.hideProjectEndDate = function (dateProjectEndDate) {
		return dateProjectEndDate === '';
	};// end of hideProjectEndDate())

	// calls the file 
	$http.get('scripts/siteContentProjects.json').success(function(data) {
		// loads the data into an service for data 
		// if the http gets is able to access the data
		portfolio.projects = data;
		portfolio.numberOfProjects = (Math.ceil(portfolio.projects.length / 4) + 1);

		// this scope service is for the select element in order for it to do a selction
		// when the page first loads up
		portfolio.projectOrder = 'name';
	});
  })
  .directive('portfolio', function () {
    return {
      templateUrl: 'views/templates/portfolio.html',
      restrict: 'E',
      controllerAs: 'project'
    };
  });