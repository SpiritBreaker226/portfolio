'use strict';

/**
 * @ngdoc directive
 * @name spiritBreaker226GitHubPageApp.directive:aboutMe
 * @description
 * # aboutMe
 */
angular.module('spiritBreaker226GitHubPageApp')
  .directive('aboutMe', function () {
    return {
      templateUrl: 'views/aboutme.html',
      restrict: 'E'
    };
  });
