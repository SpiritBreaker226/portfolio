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
      templateUrl: 'views/templates/aboutme.html',
      restrict: 'E'
    };
  });
