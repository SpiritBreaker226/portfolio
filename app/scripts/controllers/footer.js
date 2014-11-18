'use strict';

/**
 * @ngdoc function
 * @name spiritBreaker226GitHubPageApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the spiritBreaker226GitHubPageApp
 */
angular.module('spiritBreaker226GitHubPageApp')
  .controller('FooterCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // sets dates date in order to allow the copyright to change each year
    $scope.todaysDate = new Date();
});
