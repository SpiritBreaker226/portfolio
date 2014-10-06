'use strict';

/**
 * @ngdoc directive
 * @name spiritBreaker226GitHubPageApp.directive:caruselFeature
 * @description
 * # caruselFeature
 */
angular.module('spiritBreaker226GitHubPageApp')
  .controller('caruselFeatureCtrl', function($scope, $document, ProjectCommService, ProjectPortfolioHttpService, doDisplayPortfolioDetails) {
  	// sets the sharing of the communcation service for this controller
  	$scope.sharedData = ProjectCommService.data;

    // gets the data from the JSON
    ProjectPortfolioHttpService.success(function(data) {
      // loads the data into an service for data 
      // if the http gets is able to access the data
      $scope.projects = data;

      // dispalys the randome number of projects for the banner
      $scope.bannerProjects = $scope.getNumberOfProjectBanners(2);
    });

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

    // gets the need banenrs to display to the user
    $scope.getNumberOfProjectBanners = function (intNumberOfProjectsToDisplay) {
      var arrNumberOfProjectBanners = [];
      var arrProjectsOnSite = $scope.projects.slice(0);

      // checks if intNumberOfProjectsToDisplay is zero or lesser or is more then number of projects
      // if so then only display one banner in order to just show  something
      if(intNumberOfProjectsToDisplay <= 0 || intNumberOfProjectsToDisplay > arrProjectsOnSite.length) {
        intNumberOfProjectsToDisplay = 1;
      }// end of if

      // goes aorund goes around for each time the user wants to display a banner
      // which will be random in order not to show favitations but still allow for the site to load quickly
      for (var intIndex = intNumberOfProjectsToDisplay; intIndex > 0; intIndex--) {
        var intRandomIndexNumber = Math.floor((Math.random() * arrProjectsOnSite.length));

        // pushs the random banner into arrNumberOfProjectBanners
        arrNumberOfProjectBanners.push(arrProjectsOnSite[intRandomIndexNumber]);

        // removes the random banner from arrProjectsOnSite in order not to be selected again
        arrProjectsOnSite.splice(intRandomIndexNumber, 1);
      }// end of for loop
      
      return arrNumberOfProjectBanners;
    };// end of getNumberOfProjectBanners()
  })
  .directive('carouselFeature', function () {
    return {
      templateUrl: 'views/templates/carouselFeature.html',
      restrict: 'E'
    };
  });
